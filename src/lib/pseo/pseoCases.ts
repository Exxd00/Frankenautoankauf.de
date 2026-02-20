export type PSEOCase = {
  /** slug segment used in /auto-verkaufen/[case]/... */
  key: string
  /** H1/meta core phrase */
  title: string
  /** Short label used in headlines (e.g., "ohne TÜV", "mit Motorschaden") */
  shortLabel: string
  /** A compact keyword used inside some sentences */
  keyword: string
}

// 68 cases (kept intentionally granular so every case can get its own angle).
export const pseoCasesList: PSEOCase[] = [
  // Mechanical
  { key: 'motorschaden', title: 'Auto verkaufen mit Motorschaden', shortLabel: 'mit Motorschaden', keyword: 'Motor' },
  { key: 'getriebeschaden', title: 'Auto verkaufen mit Getriebeschaden', shortLabel: 'mit Getriebeschaden', keyword: 'Getriebe' },
  { key: 'turboschaden', title: 'Auto verkaufen mit Turboschaden', shortLabel: 'mit Turboschaden', keyword: 'Turbo' },
  { key: 'kupplung-defekt', title: 'Auto verkaufen mit defekter Kupplung', shortLabel: 'mit Kupplungsdefekt', keyword: 'Kupplung' },
  { key: 'zahnriemen-gerissen', title: 'Auto verkaufen mit gerissenem Zahnriemen', shortLabel: 'mit Zahnriemenschaden', keyword: 'Zahnriemen' },
  { key: 'motorklopfen', title: 'Auto verkaufen bei Motorklopfen', shortLabel: 'bei Motorklopfen', keyword: 'Motorklopfen' },
  { key: 'oelleck', title: 'Auto verkaufen mit Ölverlust', shortLabel: 'mit Ölverlust', keyword: 'Öl' },
  { key: 'kuehlwasserschaden', title: 'Auto verkaufen mit Kühlwasserschaden', shortLabel: 'mit Kühlwasserschaden', keyword: 'Kühlwasser' },
  { key: 'motoraussetzer', title: 'Auto verkaufen bei Motoraussetzern', shortLabel: 'bei Motoraussetzern', keyword: 'Aussetzer' },
  { key: 'motor-totalschaden', title: 'Auto verkaufen mit Motortotalschaden', shortLabel: 'mit Motortotalschaden', keyword: 'Totalschaden' },
  { key: 'agr-defekt', title: 'Auto verkaufen mit AGR-Defekt', shortLabel: 'mit AGR-Defekt', keyword: 'AGR' },
  { key: 'steuerkette', title: 'Auto verkaufen mit Steuerkettenschaden', shortLabel: 'mit Steuerkettenschaden', keyword: 'Steuerkette' },

  // Electronic
  { key: 'elektronik-defekt', title: 'Auto verkaufen mit Elektronik-Defekt', shortLabel: 'mit Elektronik-Defekt', keyword: 'Elektronik' },
  { key: 'steuergeraet-defekt', title: 'Auto verkaufen mit defektem Steuergerät', shortLabel: 'mit Steuergerät-Problem', keyword: 'Steuergerät' },
  { key: 'abs-defekt', title: 'Auto verkaufen mit ABS-Defekt', shortLabel: 'mit ABS-Defekt', keyword: 'ABS' },
  { key: 'airbag-fehler', title: 'Auto verkaufen mit Airbag-Fehler', shortLabel: 'mit Airbag-Fehler', keyword: 'Airbag' },
  { key: 'bordcomputer-fehler', title: 'Auto verkaufen mit Bordcomputer-Fehler', shortLabel: 'mit Bordcomputer-Fehler', keyword: 'Bordcomputer' },
  { key: 'sensoren-defekt', title: 'Auto verkaufen mit defekten Sensoren', shortLabel: 'mit Sensorfehlern', keyword: 'Sensoren' },
  { key: 'batterieprobleme', title: 'Auto verkaufen mit Batterieproblemen', shortLabel: 'mit Batterieproblemen', keyword: 'Batterie' },
  { key: 'softwarefehler', title: 'Auto verkaufen mit Softwarefehler', shortLabel: 'mit Softwarefehler', keyword: 'Software' },

  // Accidents / damage
  { key: 'unfallwagen', title: 'Unfallwagen verkaufen', shortLabel: 'als Unfallwagen', keyword: 'Unfall' },
  { key: 'unfallschaden', title: 'Auto verkaufen mit Unfallschaden', shortLabel: 'mit Unfallschaden', keyword: 'Schaden' },
  { key: 'blechschaden', title: 'Auto verkaufen mit Blechschaden', shortLabel: 'mit Blechschaden', keyword: 'Blech' },
  { key: 'rahmenschaden', title: 'Auto verkaufen mit Rahmenschaden', shortLabel: 'mit Rahmenschaden', keyword: 'Rahmen' },
  { key: 'hagelschaden', title: 'Auto verkaufen mit Hagelschaden', shortLabel: 'mit Hagelschaden', keyword: 'Hagel' },
  { key: 'wasserschaden', title: 'Auto verkaufen mit Wasserschaden', shortLabel: 'mit Wasserschaden', keyword: 'Wasser' },
  { key: 'brandschaden', title: 'Auto verkaufen mit Brandschaden', shortLabel: 'mit Brandschaden', keyword: 'Brand' },
  { key: 'wildschaden', title: 'Auto verkaufen mit Wildschaden', shortLabel: 'mit Wildschaden', keyword: 'Wild' },
  { key: 'parkschaden', title: 'Auto verkaufen mit Parkschaden', shortLabel: 'mit Parkschaden', keyword: 'Parken' },

  // Legal / paperwork
  { key: 'ohne-tuev', title: 'Auto verkaufen ohne TÜV', shortLabel: 'ohne TÜV', keyword: 'TÜV' },
  { key: 'abgemeldet', title: 'Abgemeldetes Auto verkaufen', shortLabel: 'abgemeldet', keyword: 'Abmeldung' },
  { key: 'kein-fahrzeugschein', title: 'Auto verkaufen ohne Fahrzeugschein', shortLabel: 'ohne Fahrzeugschein', keyword: 'Fahrzeugschein' },
  { key: 'kein-fahrzeugbrief', title: 'Auto verkaufen ohne Fahrzeugbrief', shortLabel: 'ohne Fahrzeugbrief', keyword: 'Fahrzeugbrief' },
  { key: 'erbschaft', title: 'Auto aus Erbschaft verkaufen', shortLabel: 'aus Erbschaft', keyword: 'Erbschaft' },
  { key: 'leasingruecklaeufer', title: 'Leasingrückläufer verkaufen', shortLabel: 'als Leasingrückläufer', keyword: 'Leasing' },
  { key: 'firmenwagen', title: 'Firmenwagen verkaufen', shortLabel: 'als Firmenwagen', keyword: 'Firma' },

  // Age / use
  { key: 'hohe-laufleistung', title: 'Auto verkaufen mit hoher Laufleistung', shortLabel: 'mit hoher Laufleistung', keyword: 'Kilometer' },
  { key: 'altes-auto', title: 'Altes Auto verkaufen', shortLabel: 'als altes Auto', keyword: 'Alter' },
  { key: 'lange-gestanden', title: 'Auto verkaufen das lange stand', shortLabel: 'nach langer Standzeit', keyword: 'Standzeit' },
  { key: 'bastlerfahrzeug', title: 'Bastlerfahrzeug verkaufen', shortLabel: 'als Bastlerfahrzeug', keyword: 'Bastler' },
  { key: 'youngtimer', title: 'Youngtimer verkaufen', shortLabel: 'als Youngtimer', keyword: 'Youngtimer' },
  { key: 'oldtimer', title: 'Oldtimer verkaufen', shortLabel: 'als Oldtimer', keyword: 'Oldtimer' },

  // Financial / commercial
  { key: 'trotz-kredit', title: 'Auto verkaufen trotz Kredit', shortLabel: 'trotz Kredit', keyword: 'Kredit' },
  { key: 'restschuld', title: 'Auto verkaufen mit Restschuld', shortLabel: 'mit Restschuld', keyword: 'Restschuld' },
  { key: 'unter-zeitdruck', title: 'Auto verkaufen unter Zeitdruck', shortLabel: 'unter Zeitdruck', keyword: 'Zeitdruck' },
  { key: 'sofort-verkaufen', title: 'Auto sofort verkaufen', shortLabel: 'sofort', keyword: 'sofort' },
  { key: 'barzahlung', title: 'Autoankauf mit Barzahlung', shortLabel: 'mit Barzahlung', keyword: 'Barzahlung' },
  { key: 'notverkauf', title: 'Auto Notverkauf', shortLabel: 'im Notverkauf', keyword: 'Notverkauf' },

  // Urgent intent
  { key: 'heute-verkaufen', title: 'Auto heute verkaufen', shortLabel: 'heute', keyword: 'heute' },
  { key: 'morgen-verkaufen', title: 'Auto morgen verkaufen', shortLabel: 'morgen', keyword: 'morgen' },
  { key: 'schneller-ankauf', title: 'Schneller Autoankauf', shortLabel: 'schnell', keyword: 'schnell' },
  { key: 'express-ankauf', title: 'Express Autoankauf', shortLabel: 'express', keyword: 'express' },

  // Fuel / tech
  { key: 'diesel', title: 'Diesel verkaufen', shortLabel: 'als Diesel', keyword: 'Diesel' },
  { key: 'benziner', title: 'Benziner verkaufen', shortLabel: 'als Benziner', keyword: 'Benzin' },
  { key: 'elektroauto', title: 'Elektroauto verkaufen', shortLabel: 'als Elektroauto', keyword: 'Elektro' },
  { key: 'hybrid', title: 'Hybrid verkaufen', shortLabel: 'als Hybrid', keyword: 'Hybrid' },
  { key: 'umweltplakette-problem', title: 'Auto verkaufen mit Umweltplakette-Problem', shortLabel: 'mit Umweltplakette-Problem', keyword: 'Umweltplakette' },
  { key: 'ohne-umweltplakette', title: 'Auto verkaufen ohne Umweltplakette', shortLabel: 'ohne Umweltplakette', keyword: 'Plakette' },

  // Interior / exterior
  { key: 'innenraum-beschaedigt', title: 'Auto verkaufen mit stark beschädigtem Innenraum', shortLabel: 'mit beschädigtem Innenraum', keyword: 'Innenraum' },
  { key: 'raucherauto', title: 'Raucherauto verkaufen', shortLabel: 'als Raucherauto', keyword: 'Rauch' },
  { key: 'tierfahrzeug', title: 'Auto verkaufen (Tierhaare/Haustiere)', shortLabel: 'mit Tierhaaren', keyword: 'Tierhaare' },
  { key: 'lackschaden', title: 'Auto verkaufen mit Lackschäden', shortLabel: 'mit Lackschäden', keyword: 'Lack' },
  { key: 'rostschaden', title: 'Auto verkaufen mit Rostschäden', shortLabel: 'mit Rostschäden', keyword: 'Rost' },
  { key: 'ungepflegt', title: 'Ungepflegtes Auto verkaufen', shortLabel: 'ungepflegt', keyword: 'Pflege' },

  // Very special
  { key: 'importfahrzeug', title: 'Importfahrzeug verkaufen', shortLabel: 'als Importfahrzeug', keyword: 'Import' },
  { key: 'exportfahrzeug', title: 'Exportfahrzeug verkaufen', shortLabel: 'für Export', keyword: 'Export' },
  { key: 'rechtslenker', title: 'Rechtslenker verkaufen', shortLabel: 'als Rechtslenker', keyword: 'Rechtslenker' },
  { key: 'sonderumbauten', title: 'Fahrzeug mit Sonderumbauten verkaufen', shortLabel: 'mit Sonderumbauten', keyword: 'Umbau' }
]

export const pseoCases = Object.fromEntries(pseoCasesList.map(c => [c.key, c])) as Record<string, PSEOCase>
export type PSEOCaseKey = (typeof pseoCasesList)[number]['key']
