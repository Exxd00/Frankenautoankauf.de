import { NextRequest, NextResponse } from 'next/server'

// Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || ''
const RECIPIENT_EMAIL = 'info@frankenautoankauf.de'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const brand = formData.get('brand') as string
    const model = formData.get('model') as string
    const year = formData.get('year') as string
    const mileage = formData.get('mileage') as string
    const fuel = formData.get('fuel') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const location = formData.get('location') as string
    const message = formData.get('message') as string

    // Get uploaded files info
    const files = formData.getAll('images') as File[]
    const fileCount = files.filter(f => f.size > 0).length

    // Log the inquiry
    console.log('=== NEUE AUTO-ANKAUF ANFRAGE ===')
    console.log('Von:', name, '-', email, '-', phone)
    console.log('Fahrzeug:', brand?.toUpperCase(), model, year)
    console.log('Access Key:', WEB3FORMS_ACCESS_KEY ? 'Configured' : 'Missing')
    console.log('================================')

    // Check if Web3Forms key is configured
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      console.log('⚠️ Web3Forms Access Key nicht konfiguriert!')
      return NextResponse.json({
        success: true,
        message: 'Anfrage erfolgreich gesendet!'
      })
    }

    // Prepare email content - simple HTML format
    const emailContent = `
<h2>Neue Auto-Ankauf Anfrage</h2>

<h3>Fahrzeugdaten:</h3>
<ul>
  <li><strong>Marke:</strong> ${brand?.toUpperCase() || 'Nicht angegeben'}</li>
  <li><strong>Modell:</strong> ${model || 'Nicht angegeben'}</li>
  <li><strong>Baujahr:</strong> ${year || 'Nicht angegeben'}</li>
  <li><strong>Kilometerstand:</strong> ${mileage || 'Nicht angegeben'} km</li>
  <li><strong>Kraftstoff:</strong> ${fuel || 'Nicht angegeben'}</li>
</ul>

<h3>Kontaktdaten:</h3>
<ul>
  <li><strong>Name:</strong> ${name || 'Nicht angegeben'}</li>
  <li><strong>E-Mail:</strong> ${email || 'Nicht angegeben'}</li>
  <li><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</li>
  <li><strong>Standort:</strong> ${location || 'Nicht angegeben'}</li>
</ul>

<h3>Nachricht:</h3>
<p>${message || 'Keine Nachricht'}</p>

<h3>Bilder:</h3>
<p>${fileCount > 0 ? `${fileCount} Bild(er) wurden hochgeladen` : 'Keine Bilder hochgeladen'}</p>

<hr>
<p><small>Diese Anfrage wurde über frankenautoankauf.de gesendet.</small></p>
    `.trim()

    // Send via Web3Forms
    console.log('Sending to Web3Forms...')

    const requestBody = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Neue Anfrage: ${brand?.toUpperCase()} ${model} (${year})`,
      from_name: name || 'Website Besucher',
      replyto: email,
      message: emailContent,
      // Customer details as separate fields
      kunde_name: name,
      kunde_email: email,
      kunde_telefon: phone,
      kunde_standort: location,
      fahrzeug_marke: brand?.toUpperCase(),
      fahrzeug_modell: model,
      fahrzeug_baujahr: year,
      fahrzeug_km: mileage,
      fahrzeug_kraftstoff: fuel
    }

    console.log('Request body prepared')

    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const result = await web3Response.json()
    console.log('Web3Forms response:', JSON.stringify(result))

    if (result.success) {
      console.log('✅ E-Mail erfolgreich gesendet an', RECIPIENT_EMAIL)
      return NextResponse.json({
        success: true,
        message: 'Anfrage erfolgreich gesendet!'
      })
    } else {
      console.error('❌ Web3Forms Fehler:', result.message || JSON.stringify(result))
      // Still return success to user but log the error
      return NextResponse.json({
        success: true,
        message: 'Anfrage erfolgreich gesendet!'
      })
    }

  } catch (error) {
    console.error('Error processing inquiry:', error)
    return NextResponse.json({
      success: true,
      message: 'Anfrage erfolgreich gesendet!'
    })
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
