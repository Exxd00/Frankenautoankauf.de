import { NextRequest, NextResponse } from 'next/server'
import { del, list } from '@vercel/blob'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PREFIX = 'uploads/'
const RETENTION_DAYS = 30

function isAuthorized(req: NextRequest) {
  // Vercel Cron calls include this header
  if (req.headers.get('x-vercel-cron') === '1') return true

  // Optional manual trigger protection
  const secret = process.env.CRON_SECRET
  if (!secret) return false

  const header = req.headers.get('x-cron-secret')
  const q = req.nextUrl.searchParams.get('secret')
  return header === secret || q === secret
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const now = Date.now()
  const cutoff = now - RETENTION_DAYS * 24 * 60 * 60 * 1000

  let cursor: string | undefined = undefined
  let scanned = 0
  let deleted = 0
  const deletedUrls: string[] = []

  try {
    while (true) {
      // Explicitly type the response to satisfy strict TypeScript settings in production builds.
      const res: Awaited<ReturnType<typeof list>> = await list({ prefix: PREFIX, cursor, limit: 1000 })
      cursor = res.cursor ?? undefined

      for (const b of res.blobs) {
        scanned += 1
        const uploadedAt = (b as unknown as { uploadedAt?: string | Date }).uploadedAt
        const ts = uploadedAt ? new Date(uploadedAt).getTime() : NaN
        if (!Number.isFinite(ts)) continue

        if (ts < cutoff) {
          await del(b.url)
          deleted += 1
          deletedUrls.push(b.url)
        }
      }

      if (!cursor) break
    }

    return NextResponse.json({ ok: true, retentionDays: RETENTION_DAYS, scanned, deleted, deletedUrls })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'unknown error'
    return NextResponse.json({ ok: false, retentionDays: RETENTION_DAYS, scanned, deleted, error: msg }, { status: 500 })
  }
}
