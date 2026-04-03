import { NextRequest, NextResponse } from 'next/server'

// Google Sheets webhook URL for tracking events
const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || ''

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate event type
    const validEventTypes = ['whatsapp_click', 'phone_click', 'form_submit']
    if (!data.event_type || !validEventTypes.includes(data.event_type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid event type' },
        { status: 400 }
      )
    }

    // Log the event
    console.log(`=== TRACKING EVENT: ${data.event_type.toUpperCase()} ===`)
    console.log('Page:', data.page_url)
    console.log('Device:', data.device_type)
    console.log('Timestamp:', data.timestamp)
    console.log('==========================================')

    // Forward to Google Sheets if webhook is configured
    if (SHEETS_WEBHOOK_URL) {
      try {
        const sheetsPayload = {
          // Add event_type as first field for Google Sheets
          event_type: data.event_type,
          timestamp: data.timestamp || new Date().toISOString(),
          page_url: data.page_url || '',
          page_path: data.page_path || '',
          referrer: data.referrer || '',
          device_type: data.device_type || '',
          click_source: data.click_source || '',
          // Form data (only for form_submit events)
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          location: data.location || '',
          brand: data.brand || '',
          model: data.model || '',
          year: data.year || '',
          mileage: data.mileage || '',
          fuel: data.fuel || '',
          message: data.message || '',
        }

        const sheetsRes = await fetch(SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetsPayload),
        })

        console.log('✅ Sheets webhook sent for tracking event, status:', sheetsRes.status)
      } catch (err) {
        console.error('❌ Sheets webhook failed for tracking event:', err)
      }
    } else {
      console.log('⚠️ SHEETS_WEBHOOK_URL not configured, event not sent to Google Sheets')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing tracking event:', error)
    return NextResponse.json(
      { success: false, message: 'Error processing event' },
      { status: 500 }
    )
  }
}

// Force dynamic rendering
export const dynamic = "force-dynamic"
