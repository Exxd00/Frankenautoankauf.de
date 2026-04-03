# Google Sheets Script für Frankenautoankauf.de

## Schnelle Einrichtung (2 Minuten)

### 1. Google Sheet erstellen
1. Gehen Sie zu [Google Sheets](https://sheets.google.com)
2. Erstellen Sie eine neue leere Tabelle
3. Benennen Sie sie z.B. "Frankenautoankauf Leads"

### 2. Apps Script hinzufügen
1. Klicken Sie auf **Erweiterungen** > **Apps Script**
2. Löschen Sie den bestehenden Code
3. Fügen Sie den folgenden Code ein:

```javascript
/**
 * Franken Auto Ankauf - Google Sheets Webhook
 * ✅ Headers automatisch erstellen
 * ✅ Leads speichern
 * ✅ E-Mail Benachrichtigung
 */

// ====== EINSTELLUNGEN ======
const SHEET_NAME = 'Sheet1';
const STATUS_OPTIONS = ['Neu', 'Kontaktiert', 'Termin', 'Abgeschlossen', 'Abgelehnt'];

// 📧 E-MAIL EINSTELLUNGEN - HIER ANPASSEN!
const EMAIL_ENABLED = true;  // true = E-Mail senden, false = keine E-Mail
const EMAIL_TO = 'info@frankenautoankauf24.de';  // Empfänger E-Mail
const EMAIL_SUBJECT_PREFIX = '🚗 Neue Anfrage:';  // Betreff-Präfix

// ====== HEADERS AUTOMATISCH ERSTELLEN ======
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  const headers = [
    'Datum/Uhrzeit',
    'Name',
    'Telefon',
    'E-Mail',
    'Ort',
    'Fahrzeug',
    'Kilometerstand',
    'Kraftstoff',
    'Preisvorstellung',
    'Nachricht',
    'Bilder',
    'Status'
  ];

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);

  headerRange.setBackground('#EA580C');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 130);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 200);
  sheet.setColumnWidth(7, 120);
  sheet.setColumnWidth(8, 100);
  sheet.setColumnWidth(9, 120);
  sheet.setColumnWidth(10, 250);
  sheet.setColumnWidth(11, 300);
  sheet.setColumnWidth(12, 120);

  sheet.setFrozenRows(1);

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('L2:L1000').setDataValidation(statusRule);

  SpreadsheetApp.getUi().alert('✅ Sheet erfolgreich eingerichtet!');
}

// ====== E-MAIL BENACHRICHTIGUNG ======
function sendEmailNotification(data) {
  if (!EMAIL_ENABLED) return;

  const vehicleInfo = [data.brand, data.model, data.year ? '(' + data.year + ')' : '']
    .filter(Boolean).join(' ') || 'Unbekannt';

  const subject = EMAIL_SUBJECT_PREFIX + ' ' + vehicleInfo + ' - ' + (data.name || 'Unbekannt');

  const mileage = data.mileage
    ? parseInt(data.mileage).toLocaleString('de-DE') + ' km'
    : '-';

  const price = data.priceExpectation
    ? parseInt(data.priceExpectation).toLocaleString('de-DE') + ' €'
    : '-';

  const imageLinks = Array.isArray(data.image_urls) && data.image_urls.length > 0
    ? data.image_urls.map((url, i) => '• Bild ' + (i+1) + ': ' + url).join('\n')
    : 'Keine Bilder';

  const body = `
═══════════════════════════════════════
🚗 NEUE AUTO-ANKAUF ANFRAGE
═══════════════════════════════════════

📋 KONTAKTDATEN
────────────────────────────────────────
Name:      ${data.name || '-'}
Telefon:   ${data.phone || '-'}
E-Mail:    ${data.email || '-'}
Ort:       ${data.location || '-'}

🚙 FAHRZEUGDATEN
────────────────────────────────────────
Fahrzeug:       ${vehicleInfo}
Kilometerstand: ${mileage}
Kraftstoff:     ${data.fuel || '-'}
Preisvorstellung: ${price}

💬 NACHRICHT
────────────────────────────────────────
${data.message || 'Keine Nachricht'}

📷 BILDER
────────────────────────────────────────
${imageLinks}

═══════════════════════════════════════
📅 Eingegangen: ${Utilities.formatDate(new Date(), 'Europe/Berlin', 'dd.MM.yyyy, HH:mm')} Uhr
🔗 Zur Tabelle: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
═══════════════════════════════════════

--
Auto Ankauf Franken
https://frankenautoankauf24.de
`;

  try {
    MailApp.sendEmail({
      to: EMAIL_TO,
      subject: subject,
      body: body,
      replyTo: data.email || ''
    });
    Logger.log('📧 E-Mail gesendet an: ' + EMAIL_TO);
  } catch (error) {
    Logger.log('❌ E-Mail Fehler: ' + error.toString());
  }
}

// ====== WEBHOOK EMPFANGEN ======
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return createResponse(false, 'Sheet nicht gefunden');
    }

    if (sheet.getLastRow() === 0) {
      setupSheet();
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return createResponse(false, 'Ungültiges JSON Format');
    }

    const now = new Date();
    const dateStr = Utilities.formatDate(now, 'Europe/Berlin', 'dd.MM.yyyy, HH:mm');

    const vehicleParts = [
      data.brand || '',
      data.model || '',
      data.year ? '(' + data.year + ')' : ''
    ].filter(Boolean);
    const vehicleInfo = vehicleParts.length > 0 ? vehicleParts.join(' ') : '-';

    const mileage = data.mileage
      ? parseInt(data.mileage).toLocaleString('de-DE') + ' km'
      : '-';

    const price = data.priceExpectation
      ? parseInt(data.priceExpectation).toLocaleString('de-DE') + ' €'
      : '-';

    const images = Array.isArray(data.image_urls) && data.image_urls.length > 0
      ? data.image_urls.join('\n')
      : '-';

    const rowData = [
      dateStr,
      data.name || '-',
      data.phone || '-',
      data.email || '-',
      data.location || '-',
      vehicleInfo,
      mileage,
      data.fuel || '-',
      price,
      data.message || '-',
      images,
      'Neu'
    ];

    sheet.appendRow(rowData);

    // 📧 E-Mail Benachrichtigung senden
    sendEmailNotification(data);

    Logger.log('✅ Neuer Lead: ' + data.name + ' - ' + data.phone);

    return createResponse(true, 'Lead erfolgreich gespeichert');

  } catch (error) {
    Logger.log('❌ Fehler: ' + error.toString());
    return createResponse(false, error.toString());
  }
}

function doGet(e) {
  return createResponse(true, 'Webhook ist aktiv');
}

function createResponse(success, message) {
  return ContentService.createTextOutput(JSON.stringify({
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚗 Auto Ankauf')
    .addItem('📋 Sheet einrichten', 'setupSheet')
    .addItem('🧪 Test-Lead hinzufügen', 'addTestLead')
    .addItem('📧 Test-E-Mail senden', 'sendTestEmail')
    .addToUi();
}

// ====== TEST FUNKTIONEN ======
function addTestLead() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Max Mustermann',
        phone: '0176 12345678',
        email: 'max@example.com',
        location: 'Nürnberg',
        brand: 'BMW',
        model: '3er',
        year: '2020',
        mileage: '85000',
        fuel: 'Diesel',
        priceExpectation: '22000',
        message: 'Bitte schnell melden!',
        image_urls: ['https://example.com/bild1.jpg', 'https://example.com/bild2.jpg']
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
  SpreadsheetApp.getUi().alert('✅ Test-Lead wurde hinzugefügt!\n\nE-Mail gesendet an: ' + EMAIL_TO);
}

function sendTestEmail() {
  const testData = {
    name: 'Test Benutzer',
    phone: '0176 99999999',
    email: 'test@example.com',
    location: 'Teststadt',
    brand: 'Mercedes',
    model: 'C-Klasse',
    year: '2019',
    mileage: '120000',
    fuel: 'Benzin',
    priceExpectation: '18000',
    message: 'Dies ist eine Test-Nachricht.',
    image_urls: []
  };

  sendEmailNotification(testData);
  SpreadsheetApp.getUi().alert('📧 Test-E-Mail gesendet an:\n' + EMAIL_TO);
}
```

### 3. E-Mail Adresse anpassen
Ändern Sie in Zeile 10:
```javascript
const EMAIL_TO = 'info@frankenautoankauf24.de';  // Ihre E-Mail hier
```

### 4. Sheet automatisch einrichten
1. Speichern Sie das Script (Strg+S)
2. Laden Sie die Tabelle neu (F5)
3. Klicken Sie auf **🚗 Auto Ankauf** > **📋 Sheet einrichten**
4. Erlauben Sie die Berechtigungen

### 5. Test-E-Mail senden
1. Klicken Sie auf **🚗 Auto Ankauf** > **📧 Test-E-Mail senden**
2. Prüfen Sie Ihren Posteingang

### 6. Als Web App bereitstellen
1. **Bereitstellen** > **Neue Bereitstellung**
2. Wählen Sie **Web-App**
3. **Ausführen als**: Ich | **Wer hat Zugriff**: Jeder
4. **Bereitstellen** und URL kopieren

### 7. URL in Vercel/Netlify eintragen
```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/IHRE-ID/exec
```

---

## 📧 E-Mail sieht so aus:

```
═══════════════════════════════════════
🚗 NEUE AUTO-ANKAUF ANFRAGE
═══════════════════════════════════════

📋 KONTAKTDATEN
────────────────────────────────────────
Name:      Max Mustermann
Telefon:   0176 12345678
E-Mail:    max@example.com
Ort:       Nürnberg

🚙 FAHRZEUGDATEN
────────────────────────────────────────
Fahrzeug:       BMW 3er (2020)
Kilometerstand: 85.000 km
Kraftstoff:     Diesel
Preisvorstellung: 22.000 €

💬 NACHRICHT
────────────────────────────────────────
Bitte schnell melden!

📷 BILDER
────────────────────────────────────────
• Bild 1: https://...
• Bild 2: https://...

═══════════════════════════════════════
📅 Eingegangen: 19.02.2026, 14:30 Uhr
🔗 Zur Tabelle: [Link]
═══════════════════════════════════════
```

---

## ⚙️ Einstellungen

| Einstellung | Beschreibung |
|-------------|--------------|
| `EMAIL_ENABLED` | `true` = E-Mail senden, `false` = deaktiviert |
| `EMAIL_TO` | Empfänger E-Mail Adresse |
| `EMAIL_SUBJECT_PREFIX` | Präfix für den Betreff |

---

## Fehlerbehebung

| Problem | Lösung |
|---------|--------|
| Keine E-Mail | EMAIL_ENABLED = true prüfen |
| E-Mail im Spam | Absender zu Kontakten hinzufügen |
| 403 Forbidden | "Jeder" muss Zugriff haben |
| Quota erreicht | Google limitiert auf 100 E-Mails/Tag |
