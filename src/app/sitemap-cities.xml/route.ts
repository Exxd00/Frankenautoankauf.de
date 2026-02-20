import { NextResponse } from "next/server"

import { urlsetXml, type UrlEntry } from "@/lib/pseo/sitemapHelpers"
import { cityOnlyPathsAll, getBaseUrl, getNowIso } from "@/lib/pseo/sitemapData"

export const runtime = "nodejs"

export function GET() {
  const base = getBaseUrl()
  const lastmod = getNowIso()

  const entries: UrlEntry[] = cityOnlyPathsAll().map((p): UrlEntry => ({
    loc: base + p,
    lastmod,
    changefreq: "monthly",
    priority: 0.6,
  }))

  const xml = urlsetXml(entries)

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
