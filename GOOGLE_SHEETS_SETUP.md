# Google Sheets Lead Speicherung (Webhook)

Dieses Projekt kann Leads und Tracking-Events in ein Google Sheet schreiben. Dafür nutzt du ein Google Apps Script als Webhook.

## Tracking Events

Das System trackt automatisch folgende Events:
- **whatsapp_click** - Klick auf WhatsApp-Button
- **phone_click** - Klick auf Anruf-Button
- **form_submit** - Absenden des Kontaktformulars

## 1) Google Sheet erstellen
- Google Drive → Neues Google Sheet
- Tab-Name z.B. `Events` (für alle Tracking-Events)
- Spalten in Zeile 1 anlegen (Empfehlung):
  - event_type (whatsapp_click, phone_click, form_submit)
  - timestamp
  - name
  - phone
  - email
  - location
  - brand
  - model
  - year
  - mileage
  - fuel
  - message
  - image_urls
  - page_url
  - page_path
  - referrer
  - device_type
  - lead_source_url
  - lead_source_path
  - click_source
  - upload_error

## 2) Apps Script Webhook
Im Google Sheet: **Erweiterungen → Apps Script** und den Inhalt von `Code.gs` mit folgendem Code ersetzen:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Events') || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents || '{}');

    var row = [
      data.event_type || 'form_submit',
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.location || '',
      data.brand || '',
      data.model || '',
      data.year || '',
      data.mileage || '',
      data.fuel || '',
      data.message || '',
      Array.isArray(data.image_urls) ? data.image_urls.join('\n') : (data.image_urls || ''),
      data.page_url || '',
      data.page_path || '',
      data.referrer || '',
      data.device_type || '',
      data.lead_source_url || '',
      data.lead_source_path || '',
      data.click_source || '',
      data.upload_error || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3) Deploy
- **Bereitstellen → Neue Bereitstellung**
- Typ: **Web-App**
- Ausführen als: **Ich**
- Zugriff: **Jeder** (oder *Jeder mit Link*)
- Deploy → Web-App URL kopieren

## 4) Vercel Environment Variable setzen
In Vercel:
- Project → Settings → Environment Variables
- `SHEETS_WEBHOOK_URL` = **deine Web-App URL**

Dann neu deployen.

## Test
Nach dem:
- Klick auf WhatsApp-Button → Zeile mit `event_type = whatsapp_click`
- Klick auf Anruf-Button → Zeile mit `event_type = phone_click`
- Absenden des Formulars → Zeile mit `event_type = form_submit` + alle Formulardaten
