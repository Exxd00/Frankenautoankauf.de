import fs from 'fs'
import path from 'path'

export interface Lead {
  id: string
  timestamp: string
  // Vehicle data
  brand: string
  model: string
  year: string
  mileage: string
  fuel: string
  priceExpectation: string
  // Contact data
  name: string
  email: string
  phone: string
  location: string
  message: string
  // Tracking data
  page_url: string
  page_path: string
  referrer: string
  device_type: string
  lead_source_url: string
  lead_source_path: string
  click_source: string
  // Images
  image_urls: string[]
}

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(LEADS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Get all leads
export function getLeads(): Lead[] {
  ensureDataDir()
  if (!fs.existsSync(LEADS_FILE)) {
    return []
  }
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save a new lead
export function saveLead(lead: Omit<Lead, 'id'>): Lead {
  ensureDataDir()
  const leads = getLeads()

  const newLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  leads.unshift(newLead) // Add to beginning (newest first)

  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2))

  return newLead
}

// Delete a lead
export function deleteLead(id: string): boolean {
  const leads = getLeads()
  const filteredLeads = leads.filter(l => l.id !== id)

  if (filteredLeads.length === leads.length) {
    return false // Lead not found
  }

  fs.writeFileSync(LEADS_FILE, JSON.stringify(filteredLeads, null, 2))
  return true
}

// Export leads to CSV format
export function leadsToCSV(leads: Lead[]): string {
  if (leads.length === 0) return ''

  const headers = [
    'ID',
    'Datum',
    'Name',
    'E-Mail',
    'Telefon',
    'Standort',
    'Marke',
    'Modell',
    'Baujahr',
    'Kilometerstand',
    'Kraftstoff',
    'Preisvorstellung',
    'Nachricht',
    'Quelle',
    'Seite',
    'Bilder'
  ]

  const rows = leads.map(lead => [
    lead.id,
    lead.timestamp,
    lead.name,
    lead.email,
    lead.phone,
    lead.location,
    lead.brand,
    lead.model,
    lead.year,
    lead.mileage,
    lead.fuel,
    lead.priceExpectation,
    lead.message?.replace(/"/g, '""') || '',
    lead.click_source || lead.lead_source_path || '',
    lead.page_url || '',
    lead.image_urls?.join('; ') || ''
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(','))
  ].join('\n')

  return csvContent
}
