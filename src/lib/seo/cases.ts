export type Case = {
  /** H1 핵 phrase without city */
  title: string
  /** slug part used in URLs (without city) */
  slug: string
  /** A short problem descriptor to tailor copy */
  pain: string
  /** Typical documents / notes for the case */
  docsHint: string
  /** Used for internal linking to a “different case” in same city */
  siblingSlug: string
}

/**
 * Basis-Fälle (breit genug für „USE ALL“ Kategorien).
 * Du kannst die Liste jederzeit erweitern – Build bleibt stabil.
 */
export const CASES: Case[] = [
  {
    title: "Auto verkaufen ohne TÜV",
    slug: "auto-verkaufen-ohne-tuev",
    pain: "Ohne gültige HU sinkt die Nachfrage – viele Käufer wollen keine Risiken.",
    docsHint: "HU-Bericht (falls vorhanden), Fahrzeugschein/-brief, ggf. Mängelliste.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit Motorschaden",
    slug: "auto-verkaufen-mit-motorschaden",
    pain: "Ein Motorschaden macht Probefahrten schwierig und schreckt Privatkäufer ab.",
    docsHint: "Werkstattdiagnose, Fehlercodes/Protokoll, letzte Rechnungen.",
    siblingSlug: "auto-verkaufen-unfallwagen",
  },
  {
    title: "Unfallwagen verkaufen",
    slug: "auto-verkaufen-unfallwagen",
    pain: "Unfallschäden sind oft schwer zu bewerten – Preisverhandlungen werden zäh.",
    docsHint: "Gutachten, Reparaturrechnungen, Fotos, Unfallbericht.",
    siblingSlug: "auto-verkaufen-ohne-tuev",
  },
  {
    title: "Auto verkaufen mit Getriebeschaden",
    slug: "auto-verkaufen-mit-getriebeschaden",
    pain: "Schalt-/Automatikprobleme führen zu hohem Reparaturrisiko und Wertverlust.",
    docsHint: "Diagnosebericht, Fehlerspeicher, Serviceheft.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Defektes Auto verkaufen",
    slug: "auto-verkaufen-defektes-auto",
    pain: "Mehrere kleine Defekte summieren sich – privat wird es oft zum Zeitfresser.",
    docsHint: "Liste der Defekte, letzte Rechnungen, Fahrzeugschein/-brief.",
    siblingSlug: "auto-verkaufen-bastlerfahrzeug",
  },
  {
    title: "Bastlerfahrzeug verkaufen",
    slug: "auto-verkaufen-bastlerfahrzeug",
    pain: "Bastlerfahrzeuge haben eine kleine Zielgruppe – viele Absagen, viel Aufwand.",
    docsHint: "Teileliste, Umbauten, vorhandene Papiere/Abmeldebescheinigung.",
    siblingSlug: "auto-verkaufen-defektes-auto",
  },
  {
    title: "Auto verkaufen für Export",
    slug: "auto-verkaufen-export",
    pain: "Bei Exportfragen (Abmeldung, Dokumente, Übergabe) ist Sicherheit entscheidend.",
    docsHint: "Fahrzeugbrief/-schein, ggf. COC, Abmeldewunsch.",
    siblingSlug: "auto-verkaufen-sofort",
  },
  {
    title: "Auto sofort verkaufen",
    slug: "auto-verkaufen-sofort",
    pain: "Wenn es schnell gehen muss, zählt ein klarer Prozess ohne Besichtigungstourismus.",
    docsHint: "Fahrzeugschein/-brief, 2 Schlüssel, letzter Service.",
    siblingSlug: "auto-verkaufen-barzahlung",
  },
  {
    title: "Auto verkaufen mit Barzahlung",
    slug: "auto-verkaufen-barzahlung",
    pain: "Viele Verkäufer wollen sofort Klarheit – ohne Zahlungstricks oder Nachverhandlungen.",
    docsHint: "Ausweis, Fahrzeugpapiere, Kaufvertrag/Abmeldung.",
    siblingSlug: "auto-verkaufen-sofort",
  },
  {
    title: "Auto verkaufen mit hoher Laufleistung",
    slug: "auto-verkaufen-hohe-laufleistung",
    pain: "Hohe Kilometerstände lösen bei Privatkäufern oft Misstrauen aus.",
    docsHint: "Servicehistorie, TÜV-Bericht, Rechnungen.",
    siblingSlug: "auto-verkaufen-altes-auto",
  },
  {
    title: "Altes Auto verkaufen",
    slug: "auto-verkaufen-altes-auto",
    pain: "Bei älteren Fahrzeugen zählen Transparenz und ein fairer Restwert.",
    docsHint: "Papiere, Service-/Reparaturbelege, Schlüssel.",
    siblingSlug: "auto-verkaufen-hohe-laufleistung",
  },
  {
    title: "Auto verkaufen mit abgelaufenem Leasing",
    slug: "auto-verkaufen-leasingruecklaeufer",
    pain: "Beim Leasing-Rückläufer sind Zustand & Dokumente entscheidend.",
    docsHint: "Leasingunterlagen, Rücknahmeprotokoll (falls vorhanden), Papiere.",
    siblingSlug: "auto-verkaufen-finanzierung",
  },
  {
    title: "Auto verkaufen trotz Finanzierung",
    slug: "auto-verkaufen-finanzierung",
    pain: "Bei laufender Finanzierung braucht es einen sauberen Ablauf mit Ablöse.",
    docsHint: "Ablösebescheinigung, Kreditvertrag, Bankdaten.",
    siblingSlug: "auto-verkaufen-leasingruecklaeufer",
  },
  {
    title: "Auto verkaufen nach Erbschaft",
    slug: "auto-verkaufen-nach-erbschaft",
    pain: "Nachlass-Fahrzeuge stehen oft lange – schnelle Abwicklung entlastet.",
    docsHint: "Erbnachweis/Vollmacht, Papiere, Schlüssel.",
    siblingSlug: "auto-verkaufen-sofort",
  },
  {
    title: "Auto verkaufen mit Totalschaden",
    slug: "auto-verkaufen-totalschaden",
    pain: "Bei Totalschaden zählt eine realistische Bewertung und klare Abholung.",
    docsHint: "Gutachten, Versicherungsunterlagen, Fotos.",
    siblingSlug: "auto-verkaufen-unfallwagen",
  },
  {
    title: "Auto verkaufen mit Elektronikfehler",
    slug: "auto-verkaufen-elektronikfehler",
    pain: "Elektronikfehler sind schwer einzuschätzen – privat oft endlose Diagnose.",
    docsHint: "Fehlerspeicher, Werkstattbericht, letzte Rechnungen.",
    siblingSlug: "auto-verkaufen-defektes-auto",
  },
  {
    title: "Diesel verkaufen mit (möglichen) Abgas-Themen",
    slug: "auto-verkaufen-diesel-abgas",
    pain: "Unsicherheit bei Abgas/Themen drückt Preise – ein direkter Ankauf spart Zeit.",
    docsHint: "Servicehistorie, ggf. Rückruf-/Werkstattnachweise.",
    siblingSlug: "auto-verkaufen-ohne-tuev",
  },
  {
    title: "Elektroauto verkaufen",
    slug: "auto-verkaufen-elektroauto",
    pain: "Bei E-Autos zählen Batterie-Infos und ein transparenter Zustand.",
    docsHint: "Ladezubehör, Service, ggf. Batteriebericht.",
    siblingSlug: "auto-verkaufen-hybrid",
  },
  {
    title: "Hybridauto verkaufen",
    slug: "auto-verkaufen-hybrid",
    pain: "Hybridtechnik wirft Fragen zu Batterie/Service auf – klare Infos helfen.",
    docsHint: "Serviceheft, Batterie-/Hybridchecks, Zubehör.",
    siblingSlug: "auto-verkaufen-elektroauto",
  },
  {
    title: "Auto verkaufen mit Motorkontrollleuchte",
    slug: "auto-verkaufen-motorkontrollleuchte",
    pain: "Leuchtende MKL führt zu Misstrauen – ohne Diagnose wird es schwierig.",
    docsHint: "Fehlercodes, Diagnosebericht, letzte Rechnungen.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },
  {
    title: "Auto verkaufen mit Hagelschaden",
    slug: "auto-verkaufen-hagelschaden",
    pain: "Optische Schäden drücken den Preis – privat wird oft hart verhandelt.",
    docsHint: "Fotos, ggf. Gutachten/Versicherung.",
    siblingSlug: "auto-verkaufen-unfallwagen",
  },
  {
    title: "Auto verkaufen mit Wasserschaden",
    slug: "auto-verkaufen-wasserschaden",
    pain: "Wasserschäden betreffen Elektronik/Innenraum – privat extrem schwer zu vermitteln.",
    docsHint: "Fotos, Werkstattbericht, Versicherungspapiere.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },

  // ------------------------------
  // توسعة قصوى: Mechanik / Antrieb
  {
    title: "Auto verkaufen mit Getriebeschaden",
    slug: "auto-verkaufen-mit-getriebeschaden",
    pain: "Ein Getriebeschaden macht das Fahren unsicher und sorgt bei Privatkäufern für Angst vor Folgekosten.",
    docsHint: "Diagnose/Fehlercode, Werkstattangebot, letzte Servicebelege.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit Kupplungsschaden",
    slug: "auto-verkaufen-mit-kupplungsschaden",
    pain: "Rutschende Kupplung oder Defekt am Zweimassenschwungrad führt zu teuren Reparaturen – privat schwer zu erklären.",
    docsHint: "Werkstattdiagnose, letzte Rechnungen, ggf. Probefahrtprotokoll.",
    siblingSlug: "auto-verkaufen-mit-getriebeschaden",
  },
  {
    title: "Auto verkaufen mit Turboschaden",
    slug: "auto-verkaufen-mit-turboschaden",
    pain: "Leistungsverlust/Rauchentwicklung schreckt Käufer ab – oft drohen Folgeschäden.",
    docsHint: "Fehlercodes, Werkstattbericht, Ölwechselhistorie.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit Zylinderkopfdichtungsschaden",
    slug: "auto-verkaufen-zylinderkopfdichtungsschaden",
    pain: "Kühlwasserverlust und Überhitzung machen den Verkauf privat extrem zäh.",
    docsHint: "Diagnose, Kompressionstest/CO2-Test, Kostenvoranschlag.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit DSG-Schaden",
    slug: "auto-verkaufen-dsg-schaden",
    pain: "Ruckeln/Notlauf beim DSG gilt als teuer – viele springen beim Wort DSG schon ab.",
    docsHint: "Diagnoseprotokoll, Serviceheft (Ölwechsel), Rechnungen.",
    siblingSlug: "auto-verkaufen-mit-getriebeschaden",
  },
  {
    title: "Auto verkaufen mit Steuerkettenschaden",
    slug: "auto-verkaufen-steuerkettenschaden",
    pain: "Rasseln/Kaltstartprobleme wirken riskant – privat wird sofort der ‚Worst Case‘ eingepreist.",
    docsHint: "Werkstattbefund, Servicehistorie, Ölwechselintervalle.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit Zahnriemenproblem",
    slug: "auto-verkaufen-zahnriemenproblem",
    pain: "Unklarer Zahnriemenwechsel sorgt für Misstrauen – Käufer rechnen sofort mit Motorschaden.",
    docsHint: "Nachweis Zahnriemenwechsel, Serviceheft, Rechnungen.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit Bremsenschaden",
    slug: "auto-verkaufen-mit-bremsenschaden",
    pain: "Sicherheitsrelevant: Geräusche/Vibrationen oder ungleiches Bremsen schrecken ab.",
    docsHint: "Bremsenprüfung, Werkstattangebot, HU-Mängelliste.",
    siblingSlug: "auto-verkaufen-ohne-tuev",
  },
  {
    title: "Auto verkaufen mit Fahrwerksschaden",
    slug: "auto-verkaufen-mit-fahrwerksschaden",
    pain: "Poltern, ausgeschlagene Lager oder Dämpfer wirken auf Käufer wie ein Fass ohne Boden.",
    docsHint: "Werkstattbericht, HU-Bericht, Teileliste.",
    siblingSlug: "auto-verkaufen-ohne-tuev",
  },
  {
    title: "Auto verkaufen mit Klimaanlagen-Defekt",
    slug: "auto-verkaufen-klimaanlage-defekt",
    pain: "Gerade im Sommer ist eine kaputte Klima ein Dealbreaker – privat wird stark gedrückt.",
    docsHint: "Diagnose (Kompressor/Leck), letzter Service, Rechnungen.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },

  // Elektronik / Sensorik
  {
    title: "Auto verkaufen mit ABS-Fehler",
    slug: "auto-verkaufen-abs-fehler",
    pain: "ABS/ESP-Warnlampen wirken sicherheitskritisch – Käufer fürchten teure Steuergeräte.",
    docsHint: "Fehlercodes, Diagnosebericht, letzte Rechnungen.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },
  {
    title: "Auto verkaufen mit Airbag-Fehler",
    slug: "auto-verkaufen-airbag-fehler",
    pain: "Airbag-Warnung bedeutet Unsicherheit – privat wird oft gar nicht mehr gekauft.",
    docsHint: "Fehlercodes, Diagnose, ggf. Rückruf/Herstellerinfos.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },
  {
    title: "Auto verkaufen mit Batterieproblem",
    slug: "auto-verkaufen-batterieproblem",
    pain: "Startprobleme und Elektronik-Aussetzer wirken unzuverlässig – Käufer springen ab.",
    docsHint: "Batterietest, letzte Rechnungen, Start-Stopp-Infos.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },
  {
    title: "Auto verkaufen mit Steuergeräte-Defekt",
    slug: "auto-verkaufen-steuergeraet-defekt",
    pain: "Steuergeräte sind schwer zu diagnostizieren – privat entsteht sofort Misstrauen.",
    docsHint: "Diagnoseprotokoll, Fehlercodes, Werkstattangebot.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },

  // Unfall / Karosserie
  {
    title: "Totalschaden verkaufen",
    slug: "totalschaden-verkaufen",
    pain: "Beim Totalschaden ist der Markt privat klein – Bewertung & Abholung müssen schnell gehen.",
    docsHint: "Gutachten, Fotos, Versicherungsunterlagen.",
    siblingSlug: "auto-verkaufen-unfallwagen",
  },
  {
    title: "Auto verkaufen mit Rahmenschaden",
    slug: "auto-verkaufen-rahmenschaden",
    pain: "Rahmenschäden gelten als heikel – privat extrem schwer zu vermitteln.",
    docsHint: "Gutachten, Vermessungsprotokoll, Fotos.",
    siblingSlug: "auto-verkaufen-unfallwagen",
  },
  {
    title: "Auto verkaufen mit Rostschaden",
    slug: "auto-verkaufen-mit-rostschaden",
    pain: "Rost (Schweller/Unterboden) wirkt nach viel Arbeit – Käufer rechnen sofort mit HU-Problemen.",
    docsHint: "Fotos Unterboden, HU-Mängelliste, Werkstattangebot.",
    siblingSlug: "auto-verkaufen-ohne-tuev",
  },
  {
    title: "Auto verkaufen mit Lackschaden",
    slug: "auto-verkaufen-lackschaden",
    pain: "Optische Schäden senken den Eindruck – privat wird aggressiv verhandelt.",
    docsHint: "Fotos, ggf. Kostenvoranschlag Lackierer.",
    siblingSlug: "auto-verkaufen-hagelschaden",
  },

  // Recht / Papiere
  {
    title: "Auto verkaufen ohne Fahrzeugbrief",
    slug: "auto-verkaufen-ohne-fahrzeugbrief",
    pain: "Ohne Zulassungsbescheinigung II entsteht Misstrauen – privat fast unmöglich.",
    docsHint: "Zulassungsbescheinigung I, Ausweisdokument, ggf. Verlustanzeige/Antrag.",
    siblingSlug: "auto-verkaufen-ohne-tuev",
  },
  {
    title: "Auto verkaufen bei Erbschaft",
    slug: "auto-verkaufen-erbschaft",
    pain: "Erbschaftsfälle brauchen klare Dokumente – privat sind viele unsicher.",
    docsHint: "Erbschein/Verfügungen, Fahrzeugpapiere, Vollmachten.",
    siblingSlug: "auto-verkaufen-firmenwagen",
  },
  {
    title: "Auto verkaufen trotz Finanzierung",
    slug: "auto-verkaufen-trotz-finanzierung",
    pain: "Offene Finanzierung/Restschuld macht den Verkauf kompliziert – privat selten sauber lösbar.",
    docsHint: "Kreditvertrag, Restschuldbestätigung, Ablöseinformationen.",
    siblingSlug: "auto-verkaufen-leasingruecklaeufer",
  },
  {
    title: "Leasingrückläufer verkaufen",
    slug: "auto-verkaufen-leasingruecklaeufer",
    pain: "Leasing verlangt klare Übergabe- und Ablösewege – privat oft zu aufwendig.",
    docsHint: "Leasingvertrag, Rücknahmebedingungen, Servicehistorie.",
    siblingSlug: "auto-verkaufen-trotz-finanzierung",
  },

  // Dringend
  {
    title: "Auto heute verkaufen",
    slug: "auto-verkaufen-heute",
    pain: "Wenn es schnell gehen muss, sind Privatkäufer zu langsam – Termine & Verhandlungen dauern.",
    docsHint: "Fahrzeugpapiere, Ausweis, ggf. IBAN für Überweisung.",
    siblingSlug: "auto-verkaufen-sofort",
  },
  {
    title: "Auto sofort verkaufen",
    slug: "auto-verkaufen-sofort",
    pain: "Sofortverkauf bedeutet: klare Angaben, schnelle Bewertung, zügige Abwicklung.",
    docsHint: "Fahrzeugpapiere, Schlüssel, kurze Zustandsbeschreibung.",
    siblingSlug: "auto-verkaufen-heute",
  },

  // Kraftstoff / Technik
  {
    title: "Dieselauto verkaufen",
    slug: "dieselauto-verkaufen",
    pain: "Diesel-Themen wie Umweltzonen, DPF und Fahrverbote beeinflussen Nachfrage und Preis.",
    docsHint: "Servicehistorie, AU/HU, ggf. DPF-/AdBlue-Hinweise.",
    siblingSlug: "benzinauto-verkaufen",
  },
  {
    title: "Benzinauto verkaufen",
    slug: "benzinauto-verkaufen",
    pain: "Auch bei Benzinern zählen Wartung und Verbrauch – privat wird oft über Kleinigkeiten verhandelt.",
    docsHint: "Serviceheft, Rechnungen, HU/AU.",
    siblingSlug: "dieselauto-verkaufen",
  },
  {
    title: "Elektroauto verkaufen",
    slug: "elektroauto-verkaufen",
    pain: "Akkuzustand, Ladeverhalten und Garantiefragen machen Privatverkäufe oft kompliziert.",
    docsHint: "Batteriezertifikat (falls vorhanden), Ladezubehör, Serviceunterlagen.",
    siblingSlug: "hybridauto-verkaufen",
  },
  {
    title: "Hybridauto verkaufen",
    slug: "hybridauto-verkaufen",
    pain: "Hybridtechnik wirkt komplex – Käufer fragen Akku, Wartung und Fehlerspeicher.",
    docsHint: "Servicehistorie, ggf. Batteriestatus, Fehlerspeicher-Ausdruck.",
    siblingSlug: "elektroauto-verkaufen",
  },

  // Besonderes
  {
    title: "Firmenwagen verkaufen",
    slug: "auto-verkaufen-firmenwagen",
    pain: "Bei Firmenwagen zählen saubere Dokumente, MwSt.-Themen und schnelle Abwicklung.",
    docsHint: "Rechnungen, Servicehistorie, ggf. USt.-Angaben.",
    siblingSlug: "auto-verkaufen-erbschaft",
  },
  {
    title: "Taxi verkaufen",
    slug: "taxi-verkaufen",
    pain: "Hohe Laufleistung und Nutzungsspuren schrecken Privatkäufer ab – Profiabwicklung hilft.",
    docsHint: "Wartungsnachweise, HU, ggf. Taxiumrüstung.",
    siblingSlug: "auto-verkaufen-firmenwagen",
  },
  {
    title: "Auto verkaufen mit Marderschaden",
    slug: "auto-verkaufen-marderschaden",
    pain: "Kabel-/Schlauchschäden führen zu sporadischen Fehlern – privat schwer zu vermitteln.",
    docsHint: "Werkstattbericht, Fotos, ggf. Versicherung.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },

  // ----------------------
  // توسعة قصوى: المزيد من الحالات (تقنية/قانونية/مالية/عاجلة...)
  // Mechanik & Antrieb
  {
    title: "Auto verkaufen mit Getriebeschaden",
    slug: "auto-verkaufen-mit-getriebeschaden",
    pain: "Schaltprobleme oder Geräusche machen Probefahrten heikel – privat sinkt das Vertrauen sofort.",
    docsHint: "Werkstattdiagnose, Fehlercodes, letzte Rechnungen.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit Turboschaden",
    slug: "auto-verkaufen-mit-turboschaden",
    pain: "Leistungsverlust und Notlauf sorgen für Unsicherheit – viele Käufer brechen ab.",
    docsHint: "Diagnosebericht, Ölservice-Nachweise, Fehlercode-Protokoll.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit Kupplungsschaden",
    slug: "auto-verkaufen-mit-kupplungsschaden",
    pain: "Rutschende Kupplung oder schweres Schalten wirkt wie ein großes Risiko – privat wird stark gedrückt.",
    docsHint: "Werkstattbefund, letzte Reparaturrechnungen.",
    siblingSlug: "auto-verkaufen-mit-getriebeschaden",
  },
  {
    title: "Auto verkaufen mit Zylinderkopfdichtungsschaden",
    slug: "auto-verkaufen-zylinderkopfdichtung",
    pain: "Überhitzung und Kühlmittelverlust sind für Privatkäufer ein K.o.-Kriterium.",
    docsHint: "Diagnose, Fotos, Werkstattbericht.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit Motorkontrollleuchte",
    slug: "auto-verkaufen-motorkontrollleuchte",
    pain: "Eine aktive MKL signalisiert unbekannte Folgekosten – privat entsteht sofort Misstrauen.",
    docsHint: "Fehlercodes/Diagnose, letzte Wartungsbelege.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },
  {
    title: "Auto verkaufen mit Ölverlust",
    slug: "auto-verkaufen-oelverlust",
    pain: "Ölspuren bedeuten Reparaturrisiko – viele Interessenten springen ab.",
    docsHint: "Werkstattcheck, Fotos, letzte Reparaturen.",
    siblingSlug: "auto-verkaufen-motorkontrollleuchte",
  },
  {
    title: "Auto verkaufen mit Kühlwasserverlust",
    slug: "auto-verkaufen-kuehlwasserverlust",
    pain: "Kühlprobleme können zu Motorschäden führen – privat wird extrem vorsichtig gehandelt.",
    docsHint: "Diagnose, ggf. Drucktest, Fotos.",
    siblingSlug: "auto-verkaufen-zylinderkopfdichtung",
  },
  {
    title: "Auto verkaufen mit defekter Steuerkette",
    slug: "auto-verkaufen-steuerkette-defekt",
    pain: "Rasseln/Timing-Probleme sind teuer – Privatkäufer wollen das Risiko nicht.",
    docsHint: "Werkstattbefund, Geräuschprotokoll, Wartungsbelege.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit defektem Zahnriemen",
    slug: "auto-verkaufen-zahnriemen-defekt",
    pain: "Wenn der Zahnriemen reißt, drohen Folgeschäden – privat schwer vermittelbar.",
    docsHint: "Serviceheft, Wechselintervalle, Werkstattbericht.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },
  {
    title: "Auto verkaufen mit DPF-Problemen",
    slug: "auto-verkaufen-dpf-probleme",
    pain: "Regenerationsprobleme und Notlauf schrecken Privatkäufer ab.",
    docsHint: "Fehlercodes, Diagnose, letzte Langstrecken-Nutzung.",
    siblingSlug: "dieselauto-verkaufen",
  },
  {
    title: "Auto verkaufen mit AGR-Ventil defekt",
    slug: "auto-verkaufen-agr-defekt",
    pain: "Ruckeln, Notlauf und Fehlermeldungen führen zu Preisdrückerei im Privatverkauf.",
    docsHint: "Fehlerspeicher, Werkstattbericht.",
    siblingSlug: "auto-verkaufen-dpf-probleme",
  },

  // Elektronik & Assistenz
  {
    title: "Auto verkaufen mit ABS-Fehler",
    slug: "auto-verkaufen-abs-fehler",
    pain: "ABS/ESP-Warnungen wirken sicherheitsrelevant – privat sinkt die Nachfrage drastisch.",
    docsHint: "Fehlercodes, Werkstattdiagnose.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },
  {
    title: "Auto verkaufen mit Airbag-Fehler",
    slug: "auto-verkaufen-airbag-fehler",
    pain: "Airbag-Warnleuchten sind ein rotes Tuch – privat wird oft sofort abgebrochen.",
    docsHint: "Diagnosebericht, Reparaturangebote.",
    siblingSlug: "auto-verkaufen-abs-fehler",
  },
  {
    title: "Auto verkaufen mit defekter Klimaanlage",
    slug: "auto-verkaufen-klimaanlage-defekt",
    pain: "Kompressor/Leckagen sind teuer – privat wird das gerne als ‚Großbaustelle‘ bewertet.",
    docsHint: "Werkstattbefund, Dichtigkeitsprüfung.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },
  {
    title: "Auto verkaufen mit defektem Navigationssystem",
    slug: "auto-verkaufen-navi-defekt",
    pain: "Infotainment-Ausfälle drücken den Wert, besonders bei höherer Ausstattung.",
    docsHint: "Fehlerbeschreibung, ggf. Diagnose.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },
  {
    title: "Auto verkaufen mit Batterieproblemen",
    slug: "auto-verkaufen-batterieprobleme",
    pain: "Startprobleme wirken wie Elektronikfehler – privat wird das schnell misstrauisch beäugt.",
    docsHint: "Batterietest, Rechnung, Fehlercodes.",
    siblingSlug: "auto-verkaufen-elektronikfehler",
  },

  // Recht & Papiere
  {
    title: "Auto verkaufen ohne Fahrzeugbrief",
    slug: "auto-verkaufen-ohne-fahrzeugbrief",
    pain: "Ohne Zulassungsbescheinigung Teil II ist Privatverkauf praktisch blockiert.",
    docsHint: "Zulassungsbescheinigung Teil I, Eigentumsnachweis, ggf. Verlustanzeige.",
    siblingSlug: "auto-verkaufen-finanzierung",
  },
  {
    title: "Auto verkaufen mit Finanzierung",
    slug: "auto-verkaufen-finanzierung",
    pain: "Ablöse, Bankfreigabe und Eigentumsfragen schrecken Privatkäufer ab.",
    docsHint: "Finanzierungsvertrag, Ablösebetrag, Bankkontakt.",
    siblingSlug: "auto-verkaufen-ohne-fahrzeugbrief",
  },
  {
    title: "Auto verkaufen aus Leasing",
    slug: "auto-verkaufen-leasing",
    pain: "Leasing verlangt saubere Abläufe und Freigaben – privat oft zu kompliziert.",
    docsHint: "Leasingvertrag, Kaufoption/Restwert, Rückgabeprotokoll.",
    siblingSlug: "auto-verkaufen-firmenwagen",
  },
  {
    title: "Auto verkaufen nach Scheidung",
    slug: "auto-verkaufen-nach-scheidung",
    pain: "Bei Trennung zählt eine schnelle, konfliktarme Abwicklung – privat zieht es sich.",
    docsHint: "Fahrzeugpapiere, ggf. Vollmacht/Einverständnis.",
    siblingSlug: "auto-verkaufen-sofort",
  },
  {
    title: "Auto verkaufen nach Todesfall",
    slug: "auto-verkaufen-nach-todesfall",
    pain: "Erbschein, Vollmachten und Abmeldung kosten Zeit – ein strukturierter Ablauf hilft.",
    docsHint: "Erbschein/Vollmacht, Fahrzeugpapiere, Ausweis.",
    siblingSlug: "auto-verkaufen-erbschaft",
  },

  // Nutzung, Alter, Zustand
  {
    title: "Auto verkaufen mit hoher Laufleistung",
    slug: "auto-verkaufen-hohe-laufleistung",
    pain: "Viele Kilometer bedeuten Unsicherheit über Folgekosten – privat wird stark verhandelt.",
    docsHint: "Servicehistorie, HU, letzte Reparaturen.",
    siblingSlug: "auto-verkaufen-firmenwagen",
  },
  {
    title: "Auto verkaufen mit Rost",
    slug: "auto-verkaufen-mit-rost",
    pain: "Rost wirkt nach ‚versteckten Baustellen‘ – privat ist Vertrauen schnell weg.",
    docsHint: "Fotos, HU-Bericht, ggf. Reparaturangebote.",
    siblingSlug: "auto-verkaufen-hagelschaden",
  },
  {
    title: "Auto verkaufen mit starken Gebrauchsspuren",
    slug: "auto-verkaufen-starke-gebrauchsspuren",
    pain: "Innenraum/Optik drücken den Preis – privat wird oft übertrieben abgewertet.",
    docsHint: "Fotos, Servicebelege.",
    siblingSlug: "auto-verkaufen-mit-rost",
  },
  {
    title: "Auto verkaufen als Bastlerfahrzeug",
    slug: "auto-verkaufen-bastlerfahrzeug",
    pain: "Unklarer Zustand, keine Garantie – privat hohe Rückfragen und viel Aufwand.",
    docsHint: "Fehlerliste, Fotos, bekannte Mängel.",
    siblingSlug: "auto-verkaufen-mit-motorschaden",
  },

  // Finanziell & schnell
  {
    title: "Auto verkaufen gegen Barzahlung",
    slug: "auto-verkaufen-barzahlung",
    pain: "Viele wollen sofort Geld – privat ist das oft unsicher oder umständlich.",
    docsHint: "Ausweis, Fahrzeugpapiere, IBAN optional.",
    siblingSlug: "auto-verkaufen-sofort",
  },
  {
    title: "Auto verkaufen heute",
    slug: "auto-verkaufen-heute",
    pain: "Wenn es schnell gehen muss, ist ein klarer Prozess wichtiger als lange Inserate.",
    docsHint: "Fahrzeugpapiere, HU, letzte Rechnungen.",
    siblingSlug: "auto-verkaufen-sofort",
  },

  // Kraftstoff/Technik
  {
    title: "Dieselauto verkaufen",
    slug: "dieselauto-verkaufen",
    pain: "Umweltzonen, DPF und Kurzstrecken machen Diesel-Privatverkauf oft zäh.",
    docsHint: "HU, Service, ggf. DPF/AGR-Diagnose.",
    siblingSlug: "auto-verkaufen-dpf-probleme",
  },
  {
    title: "Benziner verkaufen",
    slug: "benziner-verkaufen",
    pain: "Auch beim Benziner zählen Service & Zustand – privat wird gern über Kleinigkeiten verhandelt.",
    docsHint: "Serviceheft, HU, Rechnungen.",
    siblingSlug: "dieselauto-verkaufen",
  },
  {
    title: "Auto verkaufen mit Gas (LPG/CNG)",
    slug: "auto-verkaufen-lpg-cng",
    pain: "Gasanlagen sind erklärungsbedürftig – privat viele Rückfragen und Unsicherheit.",
    docsHint: "Gasanlagenpapiere, Prüfberichte, Wartungsnachweise.",
    siblingSlug: "benziner-verkaufen",
  },

  // Spezial
  {
    title: "Oldtimer verkaufen",
    slug: "oldtimer-verkaufen",
    pain: "Bei Klassikern zählen Historie und Details – privat kostet das viel Zeit.",
    docsHint: "Gutachten, Historie, Rechnungen, Fotos.",
    siblingSlug: "auto-verkaufen-starke-gebrauchsspuren",
  },
  {
    title: "Auto verkaufen als Unfallflucht-Fahrzeug (Dokumentation nötig)",
    slug: "auto-verkaufen-unfall-dokumentation",
    pain: "Ohne klare Dokumentation wird es privat schnell heikel – Transparenz ist Pflicht.",
    docsHint: "Fotos, Gutachten, Reparaturbelege.",
    siblingSlug: "auto-verkaufen-unfallwagen",
  },
]

export const CASE_BY_SLUG = new Map(CASES.map(c => [c.slug, c]))
