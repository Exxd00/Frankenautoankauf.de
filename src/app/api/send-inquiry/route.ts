import { NextRequest, NextResponse } from 'next/server'

// API Keys from environment
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const IMGBB_API_KEY = process.env.IMGBB_API_KEY || process.env.IMGG_API_KEY || ''
const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || ''
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'info@frankenautoankauf.de'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev' // Fallback to Resend test email

// Generate unique lead ID
function generateLeadId() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `lead_${timestamp}_${random}`
}

// Validate email format
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  // Basic email regex that checks for standard email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
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
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Use customer name as sender name so it shows in inbox
    const senderName = data.customerName || 'Neue Anfrage'

    console.log('📧 Sending email via Resend...')
    console.log('  From:', `${senderName} <${FROM_EMAIL}>`)
    console.log('  To:', data.to)
    console.log('  Subject:', data.subject)

    // Build email payload, only include reply_to if valid
    const emailPayload: {
      from: string
      to: string[]
      subject: string
      html: string
      reply_to?: string
    } = {
      from: `${senderName} <${FROM_EMAIL}>`,
      to: [data.to],
      subject: data.subject,
      html: data.html,
    }

    // Only add reply_to if it's a valid email
    if (data.replyTo) {
      emailPayload.reply_to = data.replyTo
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    const result = await response.json()
    console.log('📧 Resend API response:', JSON.stringify(result))

    if (result.id) {
      return { success: true, id: result.id }
    } else {
      return { success: false, error: result.message || JSON.stringify(result) }
    }
  } catch (error) {
    console.error('❌ Resend API error:', error)
    return { success: false, error: String(error) }
  }
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
}): Promise<boolean> {
  if (!SHEETS_WEBHOOK_URL) {
    console.log('⚠️ SHEETS_WEBHOOK_URL not configured')
    return false
  }

  try {
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
    return response.ok
  } catch (error) {
    console.error('❌ Google Sheets webhook failed:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  console.log('=== NEW FORM SUBMISSION ===')
  console.log('Environment check:')
  console.log('  RESEND_API_KEY:', RESEND_API_KEY ? '✅ Set (' + RESEND_API_KEY.substring(0, 10) + '...)' : '❌ Not set')
  console.log('  FROM_EMAIL:', FROM_EMAIL)
  console.log('  RECIPIENT_EMAIL:', RECIPIENT_EMAIL)
  console.log('  SHEETS_WEBHOOK_URL:', SHEETS_WEBHOOK_URL ? '✅ Set' : '❌ Not set')
  console.log('  IMGBB_API_KEY:', IMGBB_API_KEY ? '✅ Set' : '❌ Not set')

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

    // Log the inquiry
    console.log('=== NEUE AUTO-ANKAUF ANFRAGE ===')
    console.log('Lead ID:', leadId)
    console.log('Von:', name, '-', email, '-', phone)
    console.log('Fahrzeug:', brand, model, year)
    console.log('Ort:', location)
    console.log('================================')

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

    let emailSent = false
    let sheetsSent = false

    // Send email via Resend
    if (RESEND_API_KEY) {
      const emailHTML = generateEmailHTML({
        brand, model, year, mileage, fuel,
        name, phone, email, location, message,
        imageUrls, priceExpectation,
      })

      const vehicleInfo = `${brand || '-'} ${model || '-'} (${year || '-'})`

      // Only include reply_to if email is valid
      const validReplyTo = isValidEmail(email) ? email.trim() : undefined
      if (!validReplyTo && email) {
        console.log('⚠️ Invalid email format for reply_to, skipping:', email)
      }

      const emailResult = await sendEmailViaResend({
        to: RECIPIENT_EMAIL,
        subject: `Neue Anfrage: ${vehicleInfo} - ${name}`,
        html: emailHTML,
        replyTo: validReplyTo,
        customerName: name,
      })

      emailSent = emailResult.success
      if (!emailSent) {
        console.error('❌ Email failed:', emailResult.error)
      } else {
        console.log('✅ Email sent successfully! ID:', emailResult.id)
      }
    } else {
      console.log('⚠️ RESEND_API_KEY not configured, skipping email')
    }

    // Send to Google Sheets
    sheetsSent = await sendToGoogleSheets({
      brand, model, year, mileage, fuel, priceExpectation,
      name, email, phone, location, message,
      image_urls: imageUrls,
    })

    // Return success if at least one method worked
    if (emailSent || sheetsSent) {
      console.log('✅ Form submission successful!')
      console.log('  Email:', emailSent ? '✅' : '❌')
      console.log('  Sheets:', sheetsSent ? '✅' : '❌')
      return NextResponse.json({
        success: true,
        message: 'Anfrage erfolgreich gesendet!',
        emailSent,
        sheetsSent
      })
    } else {
      console.error('❌ Both email and sheets failed!')
      return NextResponse.json({
        success: false,
        message: 'Fehler beim Senden. Bitte rufen Sie uns direkt an: 0176 32333561'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('❌ Error processing inquiry:', error)
    return NextResponse.json({
      success: false,
      message: 'Beim Senden ist ein Fehler aufgetreten. Bitte rufen Sie uns an: 0176 32333561'
    }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
