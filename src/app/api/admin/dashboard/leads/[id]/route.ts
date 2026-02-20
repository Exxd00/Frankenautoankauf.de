import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Try to fetch from Google Sheets if webhook is configured
    const sheetsUrl = process.env.SHEETS_WEBHOOK_URL

    if (sheetsUrl) {
      try {
        const getUrl = `${sheetsUrl.replace('/exec', '/exec')}?action=getLead&id=${id}`
        const response = await fetch(getUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.lead) {
            return NextResponse.json({ lead: data.lead })
          }
        }
      } catch (err) {
        console.error('Failed to fetch lead from Google Sheets:', err)
      }
    }

    // Fallback: Return mock data for demonstration
    if (id === 'demo_1') {
      return NextResponse.json({
        lead: {
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
          message: 'Möchte mein Auto schnell verkaufen. Das Fahrzeug ist in gutem Zustand und hat eine vollständige Servicehistorie.',
          image_urls: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'
          ],
          device_type: 'desktop',
          page_url: 'https://frankenautoankauf.de',
          referrer: 'Google'
        }
      })
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
