import { NextRequest, NextResponse } from 'next/server'

// API Keys from environment
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const IMGBB_API_KEY = process.env.IMGG_API_KEY || ''
const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || ''
const RECIPIENT_EMAIL = 'info@frankenautoankauf.de'
const FROM_EMAIL = 'anfrage@send.frankenautoankauf.de' // Subdomain für Resend (DKIM/SPF konfiguriert)

// Generate unique lead ID
function generateLeadId() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `lead_${timestamp}_${random}`
}

// Format date in German
function formatDate() {
  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`
}

// Upload image to ImgBB
async function uploadToImgBB(file: File): Promise<string | null> {
  try {
    const formData = new FormData()

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    formData.append('key', IMGBB_API_KEY)
    formData.append('image', base64)
    formData.append('name', file.name.replace(/\.[^/.]+$/, ''))

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      return result.data.url
    }
    console.error('ImgBB upload failed:', result)
    return null
  } catch (error) {
    console.error('ImgBB upload error:', error)
    return null
  }
}

// Generate HTML email template
function generateEmailHTML(data: {
  brand: string
  model: string
  year: string
  mileage: string
  fuel: string
  name: string
  phone: string
  email: string
  location: string
  message: string
  imageUrls: string[]
  priceExpectation?: string
}) {
  const vehicleInfo = `${data.brand || '-'} ${data.model || '-'} (${data.year || '-'})`
  const imageCount = data.imageUrls.length

  // Generate image HTML
  const imagesHTML = data.imageUrls.length > 0
    ? `
      <div style="background-color: #3d4f3d; border-radius: 8px; padding: 12px 16px; margin: 20px 0;">
        <span style="color: #ffffff; font-size: 14px;">📎 ${imageCount} Bild(er) angehängt</span>
      </div>
      <div style="margin: 20px 0;">
        ${data.imageUrls.map((url, i) => `
          <a href="${url}" target="_blank" style="display: inline-block; margin: 5px;">
            <img src="${url}" alt="Bild ${i + 1}" style="width: 150px; height: 100px; object-fit: cover; border-radius: 8px; border: 1px solid #444;" />
          </a>
        `).join('')}
      </div>
    `
    : ''

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #2d2d2d; border-radius: 12px; overflow: hidden; max-width: 600px;">

          <!-- Header -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center;">
              <h1 style="color: #EA580C; margin: 0; font-size: 28px; font-weight: bold;">Neue Anfrage</h1>
              <p style="color: #888888; margin: 8px 0 0 0; font-size: 14px;">Auto Ankauf Franken</p>
            </td>
          </tr>

          <!-- Vehicle Info Box -->
          <tr>
            <td style="padding: 0 30px;">
              <div style="background-color: #3d4a3d; border-radius: 8px; padding: 16px; text-align: center;">
                <span style="color: #EA580C; font-size: 16px; font-weight: 600;">Fahrzeug: ${vehicleInfo}</span>
                ${data.mileage ? `<br><span style="color: #aaaaaa; font-size: 13px;">${Number(data.mileage).toLocaleString('de-DE')} km | ${data.fuel || '-'}</span>` : ''}
                ${data.priceExpectation ? `<br><span style="color: #aaaaaa; font-size: 13px;">Preisvorstellung: ${data.priceExpectation} €</span>` : ''}
              </div>
            </td>
          </tr>

          <!-- Form Data -->
          <tr>
            <td style="padding: 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #444444;">
                    <span style="color: #888888; font-size: 14px;">Name:</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #444444; text-align: right;">
                    <span style="color: #ffffff; font-size: 14px; font-weight: 600;">${data.name || '-'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #444444;">
                    <span style="color: #888888; font-size: 14px;">Telefon:</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #444444; text-align: right;">
                    <a href="tel:${data.phone}" style="color: #EA580C; font-size: 14px; font-weight: 600; text-decoration: none;">${data.phone || '-'}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #444444;">
                    <span style="color: #888888; font-size: 14px;">E-Mail:</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #444444; text-align: right;">
                    <a href="mailto:${data.email}" style="color: #EA580C; font-size: 14px; text-decoration: none;">${data.email || '-'}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #444444;">
                    <span style="color: #888888; font-size: 14px;">Stadt/PLZ:</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #444444; text-align: right;">
                    <span style="color: #ffffff; font-size: 14px;">${data.location || '-'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          ${data.message ? `
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h3 style="color: #ffffff; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Nachricht:</h3>
              <div style="background-color: #383838; border-radius: 8px; padding: 16px;">
                <p style="color: #cccccc; margin: 0; font-size: 14px; line-height: 1.5; text-align: center;">${data.message}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Images -->
          <tr>
            <td style="padding: 0 30px;">
              ${imagesHTML}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px 30px 30px; text-align: center;">
              <p style="color: #666666; margin: 0; font-size: 12px;">
                Diese E-Mail wurde automatisch generiert von<br>
                frankenautoankauf.de
              </p>
              <p style="color: #666666; margin: 10px 0 0 0; font-size: 12px;">
                Datum: ${formatDate()}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

// Send email via Resend
async function sendEmailViaResend(data: {
  to: string
  subject: string
  html: string
  replyTo?: string
  customerName?: string
}) {
  // Use customer name as sender name so it shows in inbox
  const senderName = data.customerName || 'Neue Anfrage'

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${senderName} <${FROM_EMAIL}>`,
      to: [data.to],
      subject: data.subject,
      html: data.html,
      reply_to: data.replyTo,
    }),
  })

  return response.json()
}

// Send to Google Sheets - formatted for the spreadsheet
async function sendToGoogleSheets(data: {
  brand: string
  model: string
  year: string
  mileage: string
  fuel: string
  priceExpectation: string
  name: string
  email: string
  phone: string
  location: string
  message: string
  image_urls: string[]
}) {
  if (!SHEETS_WEBHOOK_URL) {
    console.log('⚠️ SHEETS_WEBHOOK_URL not configured')
    return
  }

  try {
    // Format vehicle info
    const vehicleInfo = [data.brand, data.model, data.year ? `(${data.year})` : '']
      .filter(Boolean)
      .join(' ') || '-'

    // Send to Google Sheets
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name || '-',
        phone: data.phone || '-',
        email: data.email || '-',
        location: data.location || '-',
        brand: data.brand || '-',
        model: data.model || '-',
        year: data.year || '-',
        mileage: data.mileage || '-',
        fuel: data.fuel || '-',
        priceExpectation: data.priceExpectation || '-',
        message: data.message || '-',
        image_urls: data.image_urls || [],
      }),
    })
    console.log('✅ Google Sheets webhook sent, status:', response.status)
  } catch (error) {
    console.error('❌ Google Sheets webhook failed:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const leadId = generateLeadId()

    // Extract form fields
    const brand = formData.get('brand') as string || ''
    const model = formData.get('model') as string || ''
    const year = formData.get('year') as string || ''
    const mileage = formData.get('mileage') as string || ''
    const fuel = formData.get('fuel') as string || ''
    const priceExpectation = formData.get('priceExpectation') as string || ''
    const name = formData.get('name') as string || ''
    const email = formData.get('email') as string || ''
    const phone = formData.get('phone') as string || ''
    const location = formData.get('location') as string || ''
    const message = formData.get('message') as string || ''

    // Tracking fields
    const page_url = formData.get('page_url') as string || ''
    const page_path = formData.get('page_path') as string || ''
    const referrer = formData.get('referrer') as string || ''
    const device_type = formData.get('device_type') as string || ''
    const timestamp = formData.get('timestamp') as string || new Date().toISOString()
    const lead_source_url = formData.get('lead_source_url') as string || ''
    const lead_source_path = formData.get('lead_source_path') as string || ''
    const click_source = formData.get('click_source') as string || ''

    // Upload images to ImgBB
    const files = formData.getAll('images') as File[]
    const validFiles = files.filter(f => f && typeof f.size === 'number' && f.size > 0)
    const imageUrls: string[] = []

    if (validFiles.length > 0 && IMGBB_API_KEY) {
      console.log(`📷 Uploading ${validFiles.length} images to ImgBB...`)
      for (const file of validFiles) {
        const url = await uploadToImgBB(file)
        if (url) {
          imageUrls.push(url)
          console.log('✅ Image uploaded:', url)
        }
      }
    }

    // Log the inquiry
    console.log('=== NEUE AUTO-ANKAUF ANFRAGE ===')
    console.log('Von:', name, '-', email, '-', phone)
    console.log('Fahrzeug:', brand, model, year)
    console.log('Bilder:', imageUrls.length)
    console.log('================================')

    // Check if Resend API key is configured
    if (!RESEND_API_KEY) {
      console.log('⚠️ Resend API Key nicht konfiguriert!')
      // Still send to Google Sheets
      await sendToGoogleSheets({
        brand, model, year, mileage, fuel, priceExpectation,
        name, email, phone, location, message,
        image_urls: imageUrls,
      })
      return NextResponse.json({ success: true, message: 'Anfrage erfolgreich gesendet!' })
    }

    // Generate email HTML
    const emailHTML = generateEmailHTML({
      brand, model, year, mileage, fuel,
      name, phone, email, location, message,
      imageUrls, priceExpectation,
    })

    // Send email via Resend
    const vehicleInfo = `${brand || '-'} ${model || '-'} (${year || '-'})`
    const emailResult = await sendEmailViaResend({
      to: RECIPIENT_EMAIL,
      subject: `Neue Anfrage: ${vehicleInfo} - ${name}`,
      html: emailHTML,
      replyTo: email,
      customerName: name, // Show customer name in inbox
    })

    console.log('📧 Resend response:', emailResult)

    // Send to Google Sheets (without images)
    await sendToGoogleSheets({
      brand, model, year, mileage, fuel, priceExpectation,
      name, email, phone, location, message,
      image_urls: [], // Don't save images to Google Sheets
    })

    if (emailResult.id) {
      console.log('✅ E-Mail erfolgreich gesendet!')
      return NextResponse.json({ success: true, message: 'Anfrage erfolgreich gesendet!' })
    } else {
      console.error('❌ Resend Fehler:', emailResult)
      return NextResponse.json({ success: true, message: 'Anfrage erfolgreich gesendet!' })
    }

  } catch (error) {
    console.error('Error processing inquiry:', error)
    return NextResponse.json({
      success: false,
      message: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
    }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
