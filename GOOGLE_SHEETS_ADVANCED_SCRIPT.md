# 🚗 Frankenautoankauf24.de - Google Sheets Advanced Script

## 🎨 Eure Markenfarben
| Farbe | HEX | Verwendung |
|-------|-----|------------|
| **Primär Orange** | `#F97316` | Hauptfarbe, Header |
| **Dunkel Orange** | `#EA580C` | Buttons, Akzente |
| **Warm Weiß** | `#FFF7ED` | Hintergründe |
| **Amber Dunkel** | `#78350F` | Text, Kontrast |

---

## 📋 SCHRITT 1: Google Sheet erstellen

1. Öffne [Google Sheets](https://sheets.google.com)
2. Klicke auf **+ Leere Tabelle**
3. Benenne sie: `Frankenautoankauf24 - Anfragen`

---

## 📋 SCHRITT 2: Apps Script öffnen

1. Klicke auf **Erweiterungen** → **Apps Script**
2. Lösche den kompletten Code im Editor
3. Kopiere den **gesamten Code** unten und füge ihn ein:

---

## 💻 DER KOMPLETTE CODE

```javascript
// =====================================================
// FRANKENAUTOANKAUF24.DE - GOOGLE SHEETS FORM HANDLER
// =====================================================
//
// 🎨 MARKENFARBEN:
//    Primär Orange:   #F97316 (Energie, Vertrauen)
//    Dunkel Orange:   #EA580C (Action, CTA)
//    Warm Weiß:       #FFF7ED (Hintergrund)
//    Akzent Amber:    #78350F (Text, Kontrast)
//
// 🌐 Website: frankenautoankauf24.de
// 📍 Region:  Franken, Nürnberg & Umgebung
// =====================================================

// ====== KONFIGURATION - HIER ANPASSEN! ======
const CONFIG = {
  SHEET_NAME: 'Sheet1',
  TIMEZONE: 'Europe/Berlin',

  // 📧 E-Mail Einstellungen - HIER DEINE E-MAIL EINTRAGEN!
  EMAIL_ENABLED: true,
  EMAIL_TO: 'info@frankenautoankauf24.de',  // ← ÄNDERN!
  EMAIL_CC: '',  // Optional: Kopie an weitere Adresse
  EMAIL_SUBJECT_PREFIX: '🚗 Neue Anfrage',

  // 🎨 Markenfarben (bereits für euch angepasst)
  COLORS: {
    PRIMARY:        '#F97316',  // Orange - Hauptfarbe
    PRIMARY_DARK:   '#EA580C',  // Dunkelorange - Headers
    PRIMARY_DARKER: '#C2410C',  // Tiefes Orange - Sekundär
    ACCENT:         '#78350F',  // Amber dunkel - Text
    BACKGROUND:     '#FFF7ED',  // Warmes Weiß
    BACKGROUND_ALT: '#FFEDD5',  // Orange 100
    WHITE:          '#FFFFFF',

    // Status Farben (Orange Palette für Workflow)
    STATUS_NEU:         '#FFF7ED',  // Warm Weiß
    STATUS_KONTAKTIERT: '#FFEDD5',  // Orange 100
    STATUS_TERMIN:      '#FED7AA',  // Orange 200
    STATUS_BESICHTIGT:  '#FDBA74',  // Orange 300
    STATUS_ANGEBOT:     '#FB923C',  // Orange 400
    STATUS_ABSCHLUSS:   '#D1FAE5',  // Grün - Erfolg!
    STATUS_WARTET:      '#F3F4F6',  // Grau
    STATUS_ABGELEHNT:   '#FEE2E2',  // Rot

    // Priorität Farben
    PRIORITY_URGENT:  '#FEE2E2',
    PRIORITY_HIGH:    '#FEF3C7',
    PRIORITY_NORMAL:  '#D1FAE5',

    // Text Farben
    TEXT_URGENT:  '#DC2626',
    TEXT_HIGH:    '#D97706',
    TEXT_NORMAL:  '#059669'
  }
};

// ====== STATUS OPTIONEN ======
const STATUS_OPTIONS = [
  '🆕 Neu',
  '📞 Kontaktiert',
  '📅 Termin vereinbart',
  '👁️ Besichtigt',
  '💰 Angebot gemacht',
  '✅ Abgeschlossen',
  '⏳ Wartet auf Kunde',
  '❌ Abgelehnt'
];

// ====== WEBHOOK EMPFANGEN (POST) ======
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    ensureHeaders(sheet);

    const row = [
      Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "dd.MM.yyyy HH:mm:ss"),
      '🆕 Neu',
      data.name || '',
      data.phone || '',
      data.email || '',
      data.location || '',
      formatVehicleInfo(data),
      formatMileage(data.mileage),
      data.fuel || '',
      formatPrice(data.priceExpectation),
      getPriorityLevel(data),
      data.message || '',
      formatImageCount(data.image_urls),
      getSourceInfo(data)
    ];

    sheet.appendRow(row);
    const lastRow = sheet.getLastRow();

    addStatusDropdown(sheet, lastRow);
    highlightNewRow(sheet, lastRow);
    formatPriorityCell(sheet, lastRow);

    if (CONFIG.EMAIL_ENABLED) {
      sendEmailNotification(data, lastRow);
    }

    Logger.log('✅ Neuer Lead: ' + data.name + ' - Zeile ' + lastRow);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        row: lastRow,
        message: 'Lead erfolgreich gespeichert'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('❌ Fehler: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ====== WEBHOOK TESTEN (GET) ======
function doGet(e) {
  return ContentService
    .createTextOutput("✅ Frankenautoankauf24.de API läuft! 🚗\nAutoankauf Franken | Nürnberg & Umgebung")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ====== HEADERS PRÜFEN ======
function ensureHeaders(sheet) {
  const a1 = sheet.getRange("A1").getValue();
  const b1 = sheet.getRange("B1").getValue();

  if (a1 !== "Datum" || b1 !== "Status") {
    sheet.clear();
    createHeaders(sheet);
  }
}

// ====== HEADERS ERSTELLEN ======
function createHeaders(sheet) {
  const headers = [
    ["Datum",          "📅 Eingangsdatum"],
    ["Status",         "📊 Bearbeitungsstatus"],
    ["Name",           "👤 Kundenname"],
    ["Telefon",        "📱 Telefonnummer"],
    ["E-Mail",         "✉️ E-Mail-Adresse"],
    ["Ort",            "📍 Stadt/PLZ"],
    ["Fahrzeug",       "🚗 Marke/Modell/Jahr"],
    ["Kilometer",      "🛣️ Kilometerstand"],
    ["Kraftstoff",     "⛽ Antriebsart"],
    ["Preiswunsch",    "💰 Preisvorstellung"],
    ["Priorität",      "⚡ Dringlichkeit"],
    ["Nachricht",      "💬 Kundennachricht"],
    ["Bilder",         "📷 Anzahl Fotos"],
    ["Quelle",         "🌐 Herkunft"]
  ];

  const headerRow1 = headers.map(h => h[0]);
  sheet.getRange(1, 1, 1, headers.length).setValues([headerRow1]);

  const headerRow2 = headers.map(h => h[1]);
  sheet.getRange(2, 1, 1, headers.length).setValues([headerRow2]);

  // Zeile 1 - Primär Orange #F97316
  const range1 = sheet.getRange(1, 1, 1, headers.length);
  range1.setBackground(CONFIG.COLORS.PRIMARY);
  range1.setFontColor(CONFIG.COLORS.WHITE);
  range1.setFontWeight("bold");
  range1.setFontSize(11);
  range1.setHorizontalAlignment("center");
  range1.setVerticalAlignment("middle");

  // Zeile 2 - Dunkel Orange #EA580C
  const range2 = sheet.getRange(2, 1, 1, headers.length);
  range2.setBackground(CONFIG.COLORS.PRIMARY_DARK);
  range2.setFontColor(CONFIG.COLORS.WHITE);
  range2.setFontSize(9);
  range2.setHorizontalAlignment("center");
  range2.setVerticalAlignment("middle");

  sheet.setFrozenRows(2);

  // Spaltenbreiten
  sheet.setColumnWidth(1, 155);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 160);
  sheet.setColumnWidth(4, 140);
  sheet.setColumnWidth(5, 200);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 220);
  sheet.setColumnWidth(8, 120);
  sheet.setColumnWidth(9, 100);
  sheet.setColumnWidth(10, 130);
  sheet.setColumnWidth(11, 120);
  sheet.setColumnWidth(12, 300);
  sheet.setColumnWidth(13, 90);
  sheet.setColumnWidth(14, 110);

  sheet.setRowHeight(1, 38);
  sheet.setRowHeight(2, 28);
}

// ====== STATUS DROPDOWN ======
function addStatusDropdown(sheet, row) {
  const statusCell = sheet.getRange(row, 2);
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  statusCell.setDataValidation(rule);
}

// ====== NEUE ZEILE HERVORHEBEN ======
function highlightNewRow(sheet, row) {
  const range = sheet.getRange(row, 1, 1, sheet.getLastColumn());
  range.setBackground(CONFIG.COLORS.STATUS_NEU);
  range.setVerticalAlignment("middle");
}

// ====== PRIORITÄT FORMATIEREN ======
function formatPriorityCell(sheet, row) {
  const priorityCell = sheet.getRange(row, 11);
  const priority = priorityCell.getValue();

  if (priority.includes("SOFORT") || priority.includes("DRINGEND")) {
    priorityCell.setBackground(CONFIG.COLORS.PRIORITY_URGENT);
    priorityCell.setFontColor(CONFIG.COLORS.TEXT_URGENT);
    priorityCell.setFontWeight("bold");
  } else if (priority.includes("Hoch")) {
    priorityCell.setBackground(CONFIG.COLORS.PRIORITY_HIGH);
    priorityCell.setFontColor(CONFIG.COLORS.TEXT_HIGH);
    priorityCell.setFontWeight("bold");
  } else {
    priorityCell.setBackground(CONFIG.COLORS.PRIORITY_NORMAL);
    priorityCell.setFontColor(CONFIG.COLORS.TEXT_NORMAL);
  }
}

// ====== STATUS ÄNDERUNG = FARBE ÄNDERN ======
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;

  if (range.getColumn() !== 2 || range.getRow() <= 2) return;

  const status = range.getValue();
  const rowRange = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn());

  switch (status) {
    case '🆕 Neu':
      rowRange.setBackground(CONFIG.COLORS.STATUS_NEU);
      break;
    case '📞 Kontaktiert':
      rowRange.setBackground(CONFIG.COLORS.STATUS_KONTAKTIERT);
      break;
    case '📅 Termin vereinbart':
      rowRange.setBackground(CONFIG.COLORS.STATUS_TERMIN);
      break;
    case '👁️ Besichtigt':
      rowRange.setBackground(CONFIG.COLORS.STATUS_BESICHTIGT);
      break;
    case '💰 Angebot gemacht':
      rowRange.setBackground(CONFIG.COLORS.STATUS_ANGEBOT);
      break;
    case '✅ Abgeschlossen':
      rowRange.setBackground(CONFIG.COLORS.STATUS_ABSCHLUSS);
      break;
    case '⏳ Wartet auf Kunde':
      rowRange.setBackground(CONFIG.COLORS.STATUS_WARTET);
      break;
    case '❌ Abgelehnt':
      rowRange.setBackground(CONFIG.COLORS.STATUS_ABGELEHNT);
      break;
    default:
      rowRange.setBackground(CONFIG.COLORS.WHITE);
  }
}

// ====== FAHRZEUG FORMATIEREN ======
function formatVehicleInfo(data) {
  const parts = [
    data.brand || '',
    data.model || '',
    data.year ? '(' + data.year + ')' : ''
  ].filter(Boolean);

  if (parts.length === 0) return '❓ Nicht angegeben';

  const icons = {
    'BMW': '🔵', 'Mercedes': '⭐', 'Mercedes-Benz': '⭐',
    'Audi': '🔴', 'Volkswagen': '🔷', 'VW': '🔷',
    'Porsche': '🏎️', 'Ford': '🔵', 'Opel': '⚡',
    'Toyota': '🔴', 'Honda': '🔴', 'Skoda': '🟢',
    'Seat': '🟠', 'Renault': '🟡', 'Peugeot': '🦁',
    'Fiat': '🇮🇹', 'Hyundai': '🔷', 'Kia': '🔶',
    'Volvo': '🛡️', 'Mazda': '🔴', 'Nissan': '🔵',
    'Tesla': '⚡', 'Mini': '🇬🇧', 'Dacia': '🟢'
  };

  const icon = icons[data.brand] || '🚗';
  return icon + ' ' + parts.join(' ');
}

// ====== KILOMETER FORMATIEREN ======
function formatMileage(mileage) {
  if (!mileage) return '-';
  const km = parseInt(mileage);
  if (isNaN(km)) return mileage;

  const formatted = km.toLocaleString('de-DE');
  if (km < 50000) return '🟢 ' + formatted + ' km';
  if (km < 100000) return '🟡 ' + formatted + ' km';
  if (km < 150000) return '🟠 ' + formatted + ' km';
  return '🔴 ' + formatted + ' km';
}

// ====== PREIS FORMATIEREN ======
function formatPrice(price) {
  if (!price) return '-';
  const amount = parseInt(price);
  if (isNaN(amount)) return price;
  return '💰 ' + amount.toLocaleString('de-DE') + ' €';
}

// ====== BILDER ZÄHLEN ======
function formatImageCount(imageUrls) {
  const count = Array.isArray(imageUrls) ? imageUrls.length : 0;
  if (count === 0) return '📷 0';
  if (count <= 2) return '📷 ' + count;
  if (count <= 5) return '📸 ' + count;
  return '🖼️ ' + count;
}

// ====== PRIORITÄT BESTIMMEN ======
function getPriorityLevel(data) {
  const message = (data.message || '').toLowerCase();
  const urgentKeywords = ['sofort', 'dringend', 'heute', 'schnell', 'eilig', 'asap', 'notfall'];
  const highKeywords = ['morgen', 'diese woche', 'bald', 'zeitnah'];

  const price = parseInt(data.priceExpectation) || 0;
  const hasImages = Array.isArray(data.image_urls) && data.image_urls.length > 0;

  for (const keyword of urgentKeywords) {
    if (message.includes(keyword)) return '🔴 SOFORT';
  }

  for (const keyword of highKeywords) {
    if (message.includes(keyword)) return '🟡 Hoch';
  }

  if (hasImages && price > 10000) return '🟡 Hoch';
  if (hasImages && price > 0) return '🟢 Normal+';

  return '🟢 Normal';
}

// ====== QUELLE BESTIMMEN ======
function getSourceInfo(data) {
  if (data.source) return data.source;

  const referrer = (data.referrer || '').toLowerCase();

  if (referrer.includes('google')) {
    if (referrer.includes('ads') || referrer.includes('gclid')) return '🎯 Google Ads';
    return '🔍 Google';
  }
  if (referrer.includes('facebook') || referrer.includes('fb')) return '📘 Facebook';
  if (referrer.includes('instagram')) return '📷 Instagram';
  if (referrer.includes('mobile.de')) return '🚗 mobile.de';
  if (referrer.includes('autoscout')) return '🔎 AutoScout24';
  if (referrer.includes('kleinanzeigen')) return '📦 Kleinanzeigen';

  return '🌐 Website';
}

// ====== E-MAIL SENDEN ======
function sendEmailNotification(data, rowNumber) {
  const vehicleInfo = formatVehicleInfo(data).replace(/^[^\s]+\s/, '');
  const priority = getPriorityLevel(data);

  const subject = CONFIG.EMAIL_SUBJECT_PREFIX + ' - ' + vehicleInfo + ' | ' + (data.name || 'Unbekannt');

  const mileage = data.mileage ? parseInt(data.mileage).toLocaleString('de-DE') + ' km' : '-';
  const price = data.priceExpectation ? parseInt(data.priceExpectation).toLocaleString('de-DE') + ' €' : '-';

  const imageLinks = Array.isArray(data.image_urls) && data.image_urls.length > 0
    ? data.image_urls.map((url, i) => '   📷 Bild ' + (i + 1) + ': ' + url).join('\n')
    : '   Keine Bilder';

  const urgencyBanner = priority.includes('SOFORT')
    ? '\n⚠️ ═══════════ DRINGENDE ANFRAGE ═══════════ ⚠️\n'
    : '';

  const body = `
${urgencyBanner}
╔══════════════════════════════════════════════════════════════╗
║  🚗  NEUE AUTO-ANKAUF ANFRAGE  #${rowNumber}
╚══════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│  👤  KONTAKTDATEN                                           │
├─────────────────────────────────────────────────────────────┤
│  Name:       ${data.name || '-'}
│  Telefon:    ${data.phone || '-'}
│  E-Mail:     ${data.email || '-'}
│  Ort:        ${data.location || '-'}
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🚙  FAHRZEUGDATEN                                          │
├─────────────────────────────────────────────────────────────┤
│  Marke:           ${data.brand || '-'}
│  Modell:          ${data.model || '-'}
│  Baujahr:         ${data.year || '-'}
│  Kilometerstand:  ${mileage}
│  Kraftstoff:      ${data.fuel || '-'}
│  Preisvorstellung: ${price}
│
│  Priorität:       ${priority}
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  💬  NACHRICHT                                              │
├─────────────────────────────────────────────────────────────┤
${data.message ? '   ' + data.message : '   Keine Nachricht'}
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  📷  FAHRZEUGBILDER (${Array.isArray(data.image_urls) ? data.image_urls.length : 0})
├─────────────────────────────────────────────────────────────┤
${imageLinks}
└─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
📅 Eingegangen:  ${Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'dd.MM.yyyy, HH:mm')} Uhr
🔗 Zur Tabelle:  ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
═══════════════════════════════════════════════════════════════

--
🚗 Frankenautoankauf24.de
   Autoankauf Franken | Nürnberg & Umgebung
   Bargeld sofort • Abholung heute • Faire Preise
`;

  try {
    const mailOptions = {
      to: CONFIG.EMAIL_TO,
      subject: subject,
      body: body,
      replyTo: data.email || ''
    };
    if (CONFIG.EMAIL_CC) mailOptions.cc = CONFIG.EMAIL_CC;

    MailApp.sendEmail(mailOptions);
    Logger.log('📧 E-Mail an: ' + CONFIG.EMAIL_TO);
  } catch (error) {
    Logger.log('❌ E-Mail Fehler: ' + error.toString());
  }
}

// ====== MENÜ ======
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🚗 Frankenautoankauf')
    .addItem('📋 Sheet einrichten', 'setupSheet')
    .addSeparator()
    .addItem('🧪 Test-Lead hinzufügen', 'addTestLead')
    .addItem('📧 Test-E-Mail senden', 'sendTestEmail')
    .addSeparator()
    .addItem('🎨 Farben zurücksetzen', 'resetColors')
    .addItem('📊 Statistik anzeigen', 'showStatistics')
    .addToUi();
}

// ====== SETUP ======
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  createHeaders(sheet);
  sheet.setName("🚗 Anfragen");
  addConditionalFormatting(sheet);

  SpreadsheetApp.getUi().alert(
    '✅ Sheet eingerichtet!\n\n' +
    '• Headers erstellt (Orange Design)\n' +
    '• Spaltenbreiten angepasst\n' +
    '• Status-Dropdown aktiviert\n\n' +
    'Bereit für Anfragen!'
  );
}

// ====== BEDINGTE FORMATIERUNG ======
function addConditionalFormatting(sheet) {
  const urgentRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("SOFORT")
    .setBackground(CONFIG.COLORS.PRIORITY_URGENT)
    .setFontColor(CONFIG.COLORS.TEXT_URGENT)
    .setBold(true)
    .setRanges([sheet.getRange("K:K")])
    .build();

  const highRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("Hoch")
    .setBackground(CONFIG.COLORS.PRIORITY_HIGH)
    .setFontColor(CONFIG.COLORS.TEXT_HIGH)
    .setBold(true)
    .setRanges([sheet.getRange("K:K")])
    .build();

  const doneRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains("✅")
    .setBackground(CONFIG.COLORS.STATUS_ABSCHLUSS)
    .setRanges([sheet.getRange("B:B")])
    .build();

  const rules = sheet.getConditionalFormatRules();
  rules.push(urgentRule, highRule, doneRule);
  sheet.setConditionalFormatRules(rules);
}

// ====== FARBEN ZURÜCKSETZEN ======
function resetColors() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow <= 2) {
    SpreadsheetApp.getUi().alert('Keine Daten vorhanden.');
    return;
  }

  for (let row = 3; row <= lastRow; row++) {
    const status = sheet.getRange(row, 2).getValue();
    const rowRange = sheet.getRange(row, 1, 1, sheet.getLastColumn());
    formatPriorityCell(sheet, row);

    switch (status) {
      case '🆕 Neu': rowRange.setBackground(CONFIG.COLORS.STATUS_NEU); break;
      case '📞 Kontaktiert': rowRange.setBackground(CONFIG.COLORS.STATUS_KONTAKTIERT); break;
      case '📅 Termin vereinbart': rowRange.setBackground(CONFIG.COLORS.STATUS_TERMIN); break;
      case '👁️ Besichtigt': rowRange.setBackground(CONFIG.COLORS.STATUS_BESICHTIGT); break;
      case '💰 Angebot gemacht': rowRange.setBackground(CONFIG.COLORS.STATUS_ANGEBOT); break;
      case '✅ Abgeschlossen': rowRange.setBackground(CONFIG.COLORS.STATUS_ABSCHLUSS); break;
      case '⏳ Wartet auf Kunde': rowRange.setBackground(CONFIG.COLORS.STATUS_WARTET); break;
      case '❌ Abgelehnt': rowRange.setBackground(CONFIG.COLORS.STATUS_ABGELEHNT); break;
      default: rowRange.setBackground(CONFIG.COLORS.WHITE);
    }
  }
  SpreadsheetApp.getUi().alert('✅ Farben aktualisiert!');
}

// ====== STATISTIK ======
function showStatistics() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow <= 2) {
    SpreadsheetApp.getUi().alert('📊 Keine Daten vorhanden.');
    return;
  }

  const statusColumn = sheet.getRange(3, 2, lastRow - 2, 1).getValues();

  const stats = { total: lastRow - 2, neu: 0, kontaktiert: 0, termin: 0,
                  besichtigt: 0, angebot: 0, abgeschlossen: 0, wartet: 0, abgelehnt: 0 };

  statusColumn.forEach(row => {
    const s = row[0];
    if (s.includes('Neu')) stats.neu++;
    if (s.includes('Kontaktiert')) stats.kontaktiert++;
    if (s.includes('Termin')) stats.termin++;
    if (s.includes('Besichtigt')) stats.besichtigt++;
    if (s.includes('Angebot')) stats.angebot++;
    if (s.includes('Abgeschlossen')) stats.abgeschlossen++;
    if (s.includes('Wartet')) stats.wartet++;
    if (s.includes('Abgelehnt')) stats.abgelehnt++;
  });

  const rate = stats.total > 0 ? ((stats.abgeschlossen / stats.total) * 100).toFixed(1) : 0;

  SpreadsheetApp.getUi().alert(`
📊 STATISTIK
════════════════════

📥 Gesamt: ${stats.total}

🆕 Neu: ${stats.neu}
📞 Kontaktiert: ${stats.kontaktiert}
📅 Termin: ${stats.termin}
👁️ Besichtigt: ${stats.besichtigt}
💰 Angebot: ${stats.angebot}
✅ Abgeschlossen: ${stats.abgeschlossen}
⏳ Wartet: ${stats.wartet}
❌ Abgelehnt: ${stats.abgelehnt}

════════════════════
📈 Conversion: ${rate}%
`);
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
        model: '3er Touring',
        year: '2020',
        mileage: '85000',
        fuel: 'Diesel',
        priceExpectation: '22000',
        message: 'Möchte mein Auto schnell verkaufen!',
        image_urls: ['https://example.com/foto1.jpg', 'https://example.com/foto2.jpg'],
        source: 'Test'
      })
    }
  };

  const result = doPost(testData);
  const response = JSON.parse(result.getContent());
  SpreadsheetApp.getUi().alert('✅ Test-Lead hinzugefügt!\nZeile: ' + response.row);
}

function sendTestEmail() {
  sendEmailNotification({
    name: 'Test Benutzer',
    phone: '0176 99999999',
    email: 'test@example.com',
    location: 'Erlangen',
    brand: 'Mercedes',
    model: 'C-Klasse',
    year: '2019',
    mileage: '120000',
    fuel: 'Benzin',
    priceExpectation: '18000',
    message: 'Test-Nachricht',
    image_urls: []
  }, 'TEST');

  SpreadsheetApp.getUi().alert('📧 Test-E-Mail gesendet an:\n' + CONFIG.EMAIL_TO);
}
```

---

## 📋 SCHRITT 3: E-Mail Adresse anpassen

Ändere in **Zeile 18** deine E-Mail:
```javascript
EMAIL_TO: 'deine@email.de',  // ← DEINE E-MAIL!
```

---

## 📋 SCHRITT 4: Script speichern

1. Drücke **Strg + S** (oder Cmd + S auf Mac)
2. Warte bis "Projekt gespeichert" erscheint

---

## 📋 SCHRITT 5: Sheet einrichten

1. Gehe zurück zur **Google Tabelle** (Tab wechseln)
2. **Seite neu laden** (F5 oder Strg + R)
3. Warte 5 Sekunden - oben erscheint: **🚗 Frankenautoankauf**
4. Klicke auf **🚗 Frankenautoankauf** → **📋 Sheet einrichten**
5. Klicke auf **Berechtigungen überprüfen**
6. Wähle dein Google-Konto
7. Klicke auf **Erweitert** → **Zu ... wechseln (unsicher)**
8. Klicke auf **Zulassen**

✅ Das Sheet sollte jetzt orange Header haben!

---

## 📋 SCHRITT 6: Als Web App bereitstellen

1. Zurück zum **Apps Script** Tab
2. Klicke oben rechts auf **Bereitstellen** → **Neue Bereitstellung**
3. Klicke auf das Zahnrad ⚙️ → wähle **Web-App**
4. Einstellungen:
   - **Beschreibung:** `Frankenautoankauf Webhook v1`
   - **Ausführen als:** `Ich`
   - **Wer hat Zugriff:** `Jeder`
5. Klicke **Bereitstellen**
6. **KOPIERE DIE URL** - sie sieht so aus:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## 📋 SCHRITT 7: URL in deiner Website eintragen

Füge die URL in deine `.env.local` Datei ein:

```env
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEINE-ID/exec
```

---

## ✅ FERTIG!

### Testen:
1. **🚗 Frankenautoankauf** → **🧪 Test-Lead hinzufügen**
2. **🚗 Frankenautoankauf** → **📧 Test-E-Mail senden**

### So sieht es aus:

| Status | Farbe |
|--------|-------|
| 🆕 Neu | Warm Weiß `#FFF7ED` |
| 📞 Kontaktiert | Orange 100 `#FFEDD5` |
| 📅 Termin | Orange 200 `#FED7AA` |
| 👁️ Besichtigt | Orange 300 `#FDBA74` |
| 💰 Angebot | Orange 400 `#FB923C` |
| ✅ Abgeschlossen | Grün `#D1FAE5` |
| ⏳ Wartet | Grau `#F3F4F6` |
| ❌ Abgelehnt | Rot `#FEE2E2` |

---

## 🆘 Probleme?

| Problem | Lösung |
|---------|--------|
| Menü erscheint nicht | Seite neu laden (F5) |
| "Berechtigung verweigert" | Schritte 5-8 wiederholen |
| E-Mail kommt nicht | Spam-Ordner prüfen |
| 403 Fehler | "Jeder" muss Zugriff haben |

---

**🚗 Viel Erfolg mit Frankenautoankauf24.de!**
