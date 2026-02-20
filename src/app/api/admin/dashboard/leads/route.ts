import { NextResponse } from 'next/server'

// This API fetches leads - for now from local storage
// In production, you would fetch from Google Sheets or a database

export async function GET() {
  try {
    // For demonstration, we'll create a simple in-memory store
    // In production, integrate with Google Sheets API or database

    // Try to fetch from Google Sheets if webhook is configured
    const sheetsUrl = process.env.SHEETS_WEBHOOK_URL

    if (sheetsUrl) {
      try {
        // Google Apps Script should have a doGet function that returns leads
        const getUrl = sheetsUrl.replace('/exec', '/exec?action=getLeads')
        const response = await fetch(getUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.leads) {
            return NextResponse.json({ leads: data.leads })
          }
        }
      } catch (err) {
        console.error('Failed to fetch from Google Sheets:', err)
      }
    }

    // Fallback: Return empty array or mock data for development
    const mockLeads = [
      {
        id: 'demo_1',
        timestamp: new Date().toISOString(),
        brand: 'BMW',
        model: '5er',
        year: '2020',
        mileage: '85000',
        fuel: 'Diesel',
        priceExpectation: '25000',
        name: 'Max Mustermann',
        email: 'max@example.com',
        phone: '+49 176 12345678',
        location: 'Nürnberg',
        message: 'Möchte mein Auto schnell verkaufen.',
        image_urls: [],
        device_type: 'desktop',
        page_url: 'https://frankenautoankauf.de',
        referrer: 'Google'
      }
    ]

    return NextResponse.json({ leads: mockLeads })

  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ leads: [] })
  }
}

export const dynamic = 'force-dynamic'
