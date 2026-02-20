# Frankenautoankauf.de TODOs

## Current Tasks
- [x] Import project from GitHub
- [x] Create Thank You page (/danke) - noindex, only after form submission
- [x] Add Cookie Consent banner on site entry
- [x] Add Cookie consent checkbox in the form
- [x] Create animated floating WhatsApp/Phone buttons (pulse effect)
- [x] Add pre-filled WhatsApp message
- [x] Change top bar to "Download our app now" + PWA setup
- [x] Create floating back button on all pages
- [x] Maintain leads and events tracking
- [x] Push to GitHub repository
- [x] Add automatic image compression before upload
- [x] Improve PWA install flow (native modals for iOS/Android)
- [x] Create Google Sheets script documentation
- [x] Fix E-Mail Spam Problem (DKIM/SPF/Subdomain)
- [x] Remove AppBanner from top, add floating PWA install button

## Latest Update (20.02.2026)
**Floating PWA Install Button:**
- Removed the top AppBanner completely
- Added floating install button ABOVE WhatsApp button
- Auto-install when clicked (uses beforeinstallprompt)
- Animated pulse effect (blue/purple gradient)
- "NEU" badge with bounce animation
- Event tracking: pwa_install_click, pwa_install_result, pwa_installed
- Works on Chrome/Edge/Samsung Browser (auto-install)
- For iOS: tracked as pwa_install_attempt_ios

**GitHub:** https://github.com/Exxd00/Frankenautoankauf.de.git

## E-Mail Spam Fix (19.02.2026)
**Problem:** E-Mails landeten im Spam-Ordner

**Ursache:** Die Absender-Adresse `anfrage@frankenautoankauf.de` nutzte die Root-Domain, aber:
- Die Root-Domain hat Hostinger MX-Einträge (für info@frankenautoankauf.de)
- Resend DNS-Einträge waren für die `send` Subdomain konfiguriert

**Lösung:**
- Absender geändert zu: `anfrage@send.frankenautoankauf.de`
- Diese Subdomain hat korrekte SPF, MX und DKIM für Resend/Amazon SES

**Wichtig - Zusätzliche DNS-Einträge benötigt:**
Für `send.frankenautoankauf.de` Subdomain DKIM hinzufügen:
```
TXT   resend._domainkey.send   "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDF83x4R1Sg0bn8CPOuNvU9dNHFqxiMbJ1Otmh7vAh7ws2XsfUDkDMOEcpcltcwozNCr1AHd3azBMNnlt1JLu6N4uNiJk6D3Sdy4yVNm8FQCf8ALRciY/pl14UmJtn0z08Xu4BtqIY6p7R/e0xPCuBCVA05UorYX/+IuNSILtYOgQIDAQAB"
```

Oder Resend Dashboard prüfen für die korrekten DKIM-Einträge der Subdomain.

## Completed Features
1. **Thank You Page** (`/danke`)
   - Noindex metadata
   - Only accessible after form submission (sessionStorage check)
   - Redirects to home if accessed directly
   - Shows next steps and contact options

2. **Cookie Consent**
   - Compact banner with accept/decline
   - Saves preferences to localStorage
   - Links to privacy policy

3. **Animated Floating Buttons**
   - WhatsApp button with pulse animation and pre-filled message
   - Phone button with pulse animation
   - Back button on non-home pages
   - Tooltips on hover

4. **PWA Support**
   - manifest.json with app icons
   - Native install modal for iOS (shows share icon instructions)
   - Native install modal for Android
   - Auto-install prompt on supported browsers
   - Shortcuts for quick actions

5. **Form Updates**
   - Cookie consent checkbox required
   - Redirect to /danke on success
   - Event tracking maintained
   - **Automatic image compression** (max 500KB, JPEG conversion)
   - Shows file size after compression

6. **GitHub Export**
   - Pushed to https://github.com/Exxd00/Frankenautoankauf.de.git

7. **Google Sheets Integration**
   - Created GOOGLE_SHEETS_SCRIPT.md with full setup instructions
   - Apps Script code to receive form data
   - Auto-formats date/time in German
   - Status dropdown support

## Notes
- Reference site: rohrreinigungkraft.de
- All tracking (leads, events) preserved
- Image compression library: browser-image-compression
