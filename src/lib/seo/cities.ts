export type City = {
  /** Display name shown on page */
  name: string
  /** URL-safe slug (without leading slash) */
  slug: string
  /** Short local hook used to make intros unique */
  hook: string
  /** A nearby / related city slug used for internal linking */
  neighbor: string
  /** 1 = wichtigste Städte (werden vorgerendert), 2 = mittel, 3 = klein */
  tier?: 1 | 2 | 3
}

/**
 * Städte & Orte im Umkreis ~200–250 km rund um Nürnberg.
 * Hinweis: Die Liste ist bewusst „praktisch“ für Programmatic SEO aufgebaut.
 */
export const CITIES: City[] = [
  // Tier 1 (wird vorgerendert)
  { name: "Nürnberg", slug: "nuernberg", hook: "rund um den Frankenschnellweg (A73) und die Südstadt", neighbor: "fuerth", tier: 1 },
  { name: "Fürth", slug: "fuerth", hook: "zwischen Innenstadt, Hardhöhe und der U-Bahn Richtung Nürnberg", neighbor: "nuernberg", tier: 1 },
  { name: "Erlangen", slug: "erlangen", hook: "mit Pendelverkehr Richtung Nürnberg und vielen Dienstwagen", neighbor: "herzogenaurach", tier: 1 },
  { name: "Schwabach", slug: "schwabach", hook: "nahe A6/A9 und kurzen Wegen zur Abmeldung", neighbor: "roth", tier: 1 },
  { name: "Bamberg", slug: "bamberg", hook: "mit Altstadt & Umland – viele Zweitwagen", neighbor: "forchheim", tier: 1 },
  { name: "Bayreuth", slug: "bayreuth", hook: "zwischen A9 und dem Fichtelgebirge – oft längere Standzeiten", neighbor: "kulmbach", tier: 1 },
  { name: "Würzburg", slug: "wuerzburg", hook: "A3-Knoten – viele Pendler & Dienstwagen", neighbor: "kitzingen", tier: 1 },
  { name: "Regensburg", slug: "regensburg", hook: "Donauraum – viele Langstreckenfahrzeuge", neighbor: "amberg", tier: 1 },
  { name: "Ingolstadt", slug: "ingolstadt", hook: "Autostadt – viele Fahrzeuge mit hoher Ausstattung", neighbor: "regensburg", tier: 1 },
  { name: "Augsburg", slug: "augsburg", hook: "zwischen B17 und A8 – viele Pendler & Firmenfahrzeuge", neighbor: "muenchen", tier: 1 },
  { name: "München", slug: "muenchen", hook: "Großstadt-Verkehr – oft hoher Bedarf an schnellen Lösungen", neighbor: "augsburg", tier: 1 },
  { name: "Stuttgart", slug: "stuttgart", hook: "Ballungsraum & Umweltzone – Diesel-Themen sind häufig", neighbor: "esslingen", tier: 1 },
  { name: "Frankfurt am Main", slug: "frankfurt-am-main", hook: "Messe- & Pendlerstadt – schnelle Abwicklung zählt", neighbor: "offenbach", tier: 1 },

  // Tier 2 (wichtige Region/kreisfreie Städte)
  { name: "Ansbach", slug: "ansbach", hook: "als Behördenstadt – oft klare Papierlage wichtig", neighbor: "neustadt-an-der-aisch", tier: 2 },
  { name: "Neumarkt i.d.OPf.", slug: "neumarkt", hook: "an der A3 – viele Pendlerfahrzeuge", neighbor: "altdorf", tier: 2 },
  { name: "Forchheim", slug: "forchheim", hook: "zwischen Bamberg & Erlangen – viele Familienautos", neighbor: "erlangen", tier: 2 },
  { name: "Roth", slug: "roth", hook: "im Seenland-Gebiet – häufig Saisonfahrzeuge", neighbor: "schwabach", tier: 2 },
  { name: "Herzogenaurach", slug: "herzogenaurach", hook: "mit vielen Firmenwagen & Leasingrückläufern", neighbor: "erlangen", tier: 2 },
  { name: "Höchstadt a.d.Aisch", slug: "hoechstadt", hook: "kurze Wege zur A3 – oft schnelle Abholung gefragt", neighbor: "herzogenaurach", tier: 2 },
  { name: "Coburg", slug: "coburg", hook: "nahe Thüringen – häufig Export/Abmeldefragen", neighbor: "lichtenfels", tier: 2 },
  { name: "Schweinfurt", slug: "schweinfurt", hook: "Industrie & Schichtbetrieb – schnelle Termine wichtig", neighbor: "hassfurt", tier: 2 },
  { name: "Amberg", slug: "amberg", hook: "Oberpfalz – oft Fahrzeuge mit HU-Themen", neighbor: "weiden", tier: 2 },
  { name: "Weiden i.d.OPf.", slug: "weiden", hook: "Grenznähe – Export & Abmeldung häufige Themen", neighbor: "amberg", tier: 2 },
  { name: "Hof", slug: "hof", hook: "nahe A9 – oft schnelle Abholung überregional", neighbor: "bayreuth", tier: 2 },
  { name: "Kulmbach", slug: "kulmbach", hook: "zwischen Hof & Bayreuth – häufig Gebrauchtwagen aus Umland", neighbor: "bayreuth", tier: 2 },
  { name: "Lichtenfels", slug: "lichtenfels", hook: "im Obermaintal – viele Alltagsautos", neighbor: "coburg", tier: 2 },
  { name: "Kitzingen", slug: "kitzingen", hook: "nahe Würzburg – viele Pendlerstrecken", neighbor: "wuerzburg", tier: 2 },
  { name: "Aschaffenburg", slug: "aschaffenburg", hook: "Rhein-Main-Nähe – viele Pendler und Leasingfahrzeuge", neighbor: "frankfurt-am-main", tier: 2 },
  { name: "Heilbronn", slug: "heilbronn", hook: "Neckarregion – oft schnelle Abwicklung gewünscht", neighbor: "stuttgart", tier: 2 },
  { name: "Ulm", slug: "ulm", hook: "an der Donau – viele Langstreckenfahrzeuge", neighbor: "neu-ulm", tier: 2 },
  { name: "Neu-Ulm", slug: "neu-ulm", hook: "direkt neben Ulm – kurze Wege", neighbor: "ulm", tier: 2 },
  { name: "Nördlingen", slug: "noerdlingen", hook: "Riesregion – viele Fahrzeuge aus dem Umland", neighbor: "donauwoerth", tier: 2 },
  { name: "Donauwörth", slug: "donauwoerth", hook: "B2/B16 – viele Pendler & Werkstattfahrzeuge", neighbor: "augsburg", tier: 2 },
  { name: "Landshut", slug: "landshut", hook: "A92 – viel Pendlerverkehr Richtung München", neighbor: "muenchen", tier: 2 },
  { name: "Rosenheim", slug: "rosenheim", hook: "Inntal – viele Fahrzeuge mit Alpen-/Wintereinsatz", neighbor: "muenchen", tier: 2 },
  { name: "Passau", slug: "passau", hook: "Grenzlage – Export & Abmeldung oft relevant", neighbor: "regensburg", tier: 2 },
  { name: "Baden-Baden", slug: "baden-baden", hook: "Kurstadt – oft wenig Kilometer, aber lange Standzeiten", neighbor: "karlsruhe", tier: 2 },
  { name: "Karlsruhe", slug: "karlsruhe", hook: "A5/A8 – schnelle Übergabe möglich", neighbor: "baden-baden", tier: 2 },
  { name: "Mannheim", slug: "mannheim", hook: "Rhein-Neckar – viele Firmen- und Pendlerfahrzeuge", neighbor: "heidelberg", tier: 2 },
  { name: "Heidelberg", slug: "heidelberg", hook: "Rhein-Neckar – viele Kleinwagen & Studentenfahrzeuge", neighbor: "mannheim", tier: 2 },
  { name: "Darmstadt", slug: "darmstadt", hook: "Südhessen – viele Pendlerfahrzeuge", neighbor: "frankfurt-am-main", tier: 2 },
  { name: "Wiesbaden", slug: "wiesbaden", hook: "Rhein-Main – häufig Dienstwagen & Leasingrückläufer", neighbor: "mainz", tier: 2 },
  { name: "Mainz", slug: "mainz", hook: "Rheinlage – schnelle Abwicklung zählt", neighbor: "wiesbaden", tier: 2 },
  { name: "Heidenheim", slug: "heidenheim", hook: "Ostalb – oft Autos mit hoher Laufleistung", neighbor: "aalen", tier: 2 },
  { name: "Aalen", slug: "aalen", hook: "Ostalbkreis – viele Pendler und Handwerkerfahrzeuge", neighbor: "heidenheim", tier: 2 },
  { name: "Eisenach", slug: "eisenach", hook: "Thüringen-West – viele Autos aus dem Umland", neighbor: "erfurt", tier: 2 },
  { name: "Erfurt", slug: "erfurt", hook: "Zentrale Lage – viele Pendler und Dienstwagen", neighbor: "jena", tier: 2 },
  { name: "Jena", slug: "jena", hook: "Uni & Forschung – viele Kleinwagen und Leasingfahrzeuge", neighbor: "erfurt", tier: 2 },
  { name: "Leipzig", slug: "leipzig", hook: "Großstadtverkehr – schnelle Abholung gefragt", neighbor: "halle-saale", tier: 2 },
  { name: "Halle (Saale)", slug: "halle-saale", hook: "Pendlerregion – oft schnelle Termine wichtig", neighbor: "leipzig", tier: 2 },

  // Tier 3 (Orte/Landkreis-Städte – sehr breit, werden on-demand gerendert)
  { name: "Bad Windsheim", slug: "bad-windsheim", hook: "Kurstadt – oft Fahrzeuge mit wenig Jahreskilometern", neighbor: "uffenheim", tier: 3 },
  { name: "Neustadt a.d.Aisch", slug: "neustadt-an-der-aisch", hook: "zwischen Ansbach & Nürnberg – HU & Anmeldung oft Thema", neighbor: "bad-windsheim", tier: 3 },
  { name: "Lauf a.d.Pegnitz", slug: "lauf-an-der-pegnitz", hook: "direkt an der A9 – schnelle Übergabe möglich", neighbor: "nuernberg", tier: 3 },
  { name: "Altdorf b. Nürnberg", slug: "altdorf", hook: "nahe A3 – viele Pendlerfahrzeuge", neighbor: "neumarkt", tier: 3 },
  { name: "Feucht", slug: "feucht", hook: "S-Bahn-Gürtel – kurze Wege zur Abholung", neighbor: "nuernberg", tier: 3 },
  { name: "Zirndorf", slug: "zirndorf", hook: "im Landkreis Fürth – häufig Familienautos", neighbor: "fuerth", tier: 3 },
  { name: "Stein", slug: "stein", hook: "direkt an Nürnberg – schnelle Besichtigung", neighbor: "nuernberg", tier: 3 },
  { name: "Oberasbach", slug: "oberasbach", hook: "zwischen Fürth & Zirndorf – kurze Wege", neighbor: "zirndorf", tier: 3 },
  { name: "Langenzenn", slug: "langenzenn", hook: "Umlandverkehr – oft Autos mit hoher Laufleistung", neighbor: "fuerth", tier: 3 },
  { name: "Uffenheim", slug: "uffenheim", hook: "A7-Nähe – häufig schnelle Abholung gefragt", neighbor: "bad-windsheim", tier: 3 },
  { name: "Ochsenfurt", slug: "ochsenfurt", hook: "Mainfranken – viele Pendlerfahrzeuge", neighbor: "wuerzburg", tier: 3 },
  { name: "Karlstadt", slug: "karlstadt", hook: "zwischen Würzburg & Spessart – oft ältere Fahrzeuge", neighbor: "wuerzburg", tier: 3 },
  { name: "Haßfurt", slug: "hassfurt", hook: "Main-Rhön – häufig Barzahlung & Abmeldung gefragt", neighbor: "schweinfurt", tier: 3 },
  { name: "Bad Kissingen", slug: "bad-kissingen", hook: "Kurort – oft wenig KM, aber lange Standzeiten", neighbor: "schweinfurt", tier: 3 },
  { name: "Gunzenhausen", slug: "gunzenhausen", hook: "im Fränkischen Seenland – oft ältere Zweitwagen", neighbor: "weissenburg", tier: 3 },
  { name: "Weißenburg i.Bay.", slug: "weissenburg", hook: "im Altmühltal – viele Fahrzeuge mit Langstrecke", neighbor: "gunzenhausen", tier: 3 },
  { name: "Dinkelsbühl", slug: "dinkelsbuehl", hook: "touristisch geprägt – oft Saison & Standfahrzeuge", neighbor: "ansbach", tier: 3 },
  { name: "Rothenburg ob der Tauber", slug: "rothenburg-ob-der-tauber", hook: "Tourismus – häufig Zweitwagen & Saisonfahrzeuge", neighbor: "dinkelsbuehl", tier: 3 },
  { name: "Erlangen-Tennenlohe", slug: "tennenlohe", hook: "Schnittstelle Nürnberg/Erlangen – viele Pendler", neighbor: "erlangen", tier: 3 },
  { name: "Nürnberg-Langwasser", slug: "langwasser", hook: "Wohngebiet mit vielen Alltagsautos", neighbor: "nuernberg", tier: 3 },
  { name: "Nürnberg-Gostenhof", slug: "gostenhof", hook: "Innenstadt-Nähe – oft Parkplatz-/Standthemen", neighbor: "nuernberg", tier: 3 },
  { name: "Ebermannstadt", slug: "ebermannstadt", hook: "Fränkische Schweiz – viele Fahrzeuge aus dem Umland", neighbor: "forchheim", tier: 3 },
  { name: "Pegnitz", slug: "pegnitz", hook: "A9-Lage – schnelle Abholung oft gefragt", neighbor: "bayreuth", tier: 3 },
  { name: "Marktredwitz", slug: "marktredwitz", hook: "Fichtelgebirge – oft Export- und Abmeldefragen", neighbor: "hof", tier: 3 },
  { name: "Wunsiedel", slug: "wunsiedel", hook: "Fichtelgebirge – häufig Fahrzeuge mit Rostthemen", neighbor: "marktredwitz", tier: 3 },
  { name: "Bad Neustadt a.d.Saale", slug: "bad-neustadt-an-der-saale", hook: "Rhönregion – viele Alltagsfahrzeuge", neighbor: "bad-kissingen", tier: 3 },
  { name: "Rhön-Grabfeld", slug: "rhoen-grabfeld", hook: "Landkreis – viele Fahrzeuge aus ländlichem Raum", neighbor: "bad-neustadt-an-der-saale", tier: 3 },
  { name: "Freising", slug: "freising", hook: "Flughafen-Nähe – viele Firmen- und Mietwagen", neighbor: "muenchen", tier: 3 },
  { name: "Erding", slug: "erding", hook: "zwischen München & Landshut – Pendlerfahrzeuge", neighbor: "muenchen", tier: 3 },
  { name: "Pfaffenhofen a.d.Ilm", slug: "pfaffenhofen", hook: "A9-Korridor – viele Pendlerautos", neighbor: "ingolstadt", tier: 3 },
  { name: "Dachau", slug: "dachau", hook: "Münchner Norden – viele Alltags- und Familienautos", neighbor: "muenchen", tier: 3 },
  { name: "Fürstenfeldbruck", slug: "fuerstenfeldbruck", hook: "Münchner Westen – viele Pendlerfahrzeuge", neighbor: "muenchen", tier: 3 },
  { name: "Garmisch-Partenkirchen", slug: "garmisch", hook: "Alpenregion – Wintereinsatz & Standzeiten", neighbor: "muenchen", tier: 3 },
  { name: "Kempten (Allgäu)", slug: "kempten", hook: "Allgäu – viele Fahrzeuge mit Winter-/Bergprofil", neighbor: "memmingen", tier: 3 },
  { name: "Memmingen", slug: "memmingen", hook: "A7/A96 – schnelle Abholung auch überregional", neighbor: "kempten", tier: 3 },
  { name: "Lindau (Bodensee)", slug: "lindau", hook: "Grenznähe – Export & Abmeldung", neighbor: "friedrichshafen", tier: 3 },
  { name: "Friedrichshafen", slug: "friedrichshafen", hook: "Bodensee – häufig Saisonfahrzeuge", neighbor: "lindau", tier: 3 },
  { name: "Reutlingen", slug: "reutlingen", hook: "Schwaben – viele Pendlerautos", neighbor: "tuebingen", tier: 3 },
  { name: "Tübingen", slug: "tuebingen", hook: "Uni-Stadt – viele Kleinwagen", neighbor: "reutlingen", tier: 3 },
  { name: "Esslingen am Neckar", slug: "esslingen", hook: "Stuttgart-Umland – oft Umweltzonen-Themen", neighbor: "stuttgart", tier: 3 },
  { name: "Ludwigsburg", slug: "ludwigsburg", hook: "Stuttgart-Nord – schnelle Abwicklung gefragt", neighbor: "stuttgart", tier: 3 },
  { name: "Pforzheim", slug: "pforzheim", hook: "zwischen Karlsruhe & Stuttgart – viele Pendler", neighbor: "stuttgart", tier: 3 },
  { name: "Offenbach am Main", slug: "offenbach", hook: "direkt neben Frankfurt – viele Alltagsautos", neighbor: "frankfurt-am-main", tier: 3 },
  { name: "Hanau", slug: "hanau", hook: "Rhein-Main-Ost – Pendlerverkehr", neighbor: "frankfurt-am-main", tier: 3 },
  { name: "Gießen", slug: "giessen", hook: "Mittelhessen – viele Studentenfahrzeuge", neighbor: "marburg", tier: 3 },
  { name: "Marburg", slug: "marburg", hook: "Uni-Stadt – viele Kleinwagen", neighbor: "giessen", tier: 3 },
]

export const CITY_BY_SLUG = new Map(CITIES.map(c => [c.slug, c]))
