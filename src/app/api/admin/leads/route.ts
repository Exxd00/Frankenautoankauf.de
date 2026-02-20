import { NextRequest, NextResponse } from 'next/server'
import { getLeads, deleteLead, leadsToCSV } from '@/lib/leads'

// Simple admin password protection
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'franken2024'

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false

  const [type, credentials] = authHeader.split(' ')
  if (type !== 'Basic') return false

  try {
    const decoded = atob(credentials)
    const [, password] = decoded.split(':')
    return password === ADMIN_PASSWORD
  } catch {
    return false
  }
}

// GET /api/admin/leads - Get all leads
// GET /api/admin/leads?format=csv - Export as CSV
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' }
      }
    )
  }

  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format')

  const leads = getLeads()

  if (format === 'csv') {
    const csv = leadsToCSV(leads)
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })
  }

  return NextResponse.json({
    success: true,
    count: leads.length,
    leads
  })
}

// DELETE /api/admin/leads?id=xxx - Delete a lead
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' }
      }
    )
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
  }

  const deleted = deleteLead(id)

  if (!deleted) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: 'Lead deleted' })
}

export const dynamic = 'force-dynamic'
