export type PSEOCity = {
  key: string
  name: string
  regionLabel: string
  mobilityContextPool: string[]
  typicalUsePool: string[]
  localPainPointsPool: string[]
  nearbyPool: string[]
}

// City/region pool phrases are intentionally short. The generator combines them with
// case-specific text so the final sentences remain unique per (case, city).

type CitySeed = { key: string; name: string; regionLabel: string }

// 40 "core" cities from your list + 120 expansion locations (Stadt/Landkreis/Ort)
// in the 200–250km corridor around Nuernberg. You can freely add/remove entries later.
const CORE_CITY_COUNT = 40

const citySeeds: CitySeed[] = [
  // Core list (40)
  { key: 'nuernberg', name: 'Nürnberg', regionLabel: 'Mittelfranken' },
  { key: 'erlangen', name: 'Erlangen', regionLabel: 'Mittelfranken' },
  { key: 'fuerth', name: 'Fürth', regionLabel: 'Mittelfranken' },
  { key: 'schwabach', name: 'Schwabach', regionLabel: 'Mittelfranken' },
  { key: 'bamberg', name: 'Bamberg', regionLabel: 'Oberfranken' },
  { key: 'bayreuth', name: 'Bayreuth', regionLabel: 'Oberfranken' },
  { key: 'ansbach', name: 'Ansbach', regionLabel: 'Mittelfranken' },
  { key: 'neumarkt', name: 'Neumarkt i.d.OPf.', regionLabel: 'Oberpfalz' },
  { key: 'forchheim', name: 'Forchheim', regionLabel: 'Oberfranken' },
  { key: 'roth', name: 'Roth', regionLabel: 'Mittelfranken' },
  { key: 'herzogenaurach', name: 'Herzogenaurach', regionLabel: 'Mittelfranken' },
  { key: 'hoechstadt', name: 'Höchstadt a.d.Aisch', regionLabel: 'Mittelfranken' },
  { key: 'gunzenhausen', name: 'Gunzenhausen', regionLabel: 'Mittelfranken' },
  { key: 'weissenburg', name: 'Weißenburg i.Bay.', regionLabel: 'Mittelfranken' },
  { key: 'dinkelsbuehl', name: 'Dinkelsbühl', regionLabel: 'Mittelfranken' },
  { key: 'wuerzburg', name: 'Würzburg', regionLabel: 'Unterfranken' },
  { key: 'coburg', name: 'Coburg', regionLabel: 'Oberfranken' },
  { key: 'schweinfurt', name: 'Schweinfurt', regionLabel: 'Unterfranken' },
  { key: 'ingolstadt', name: 'Ingolstadt', regionLabel: 'Oberbayern' },
  { key: 'regensburg', name: 'Regensburg', regionLabel: 'Oberpfalz' },
  { key: 'amberg', name: 'Amberg', regionLabel: 'Oberpfalz' },
  { key: 'weiden', name: 'Weiden i.d.OPf.', regionLabel: 'Oberpfalz' },
  { key: 'hof', name: 'Hof', regionLabel: 'Oberfranken' },
  { key: 'kulmbach', name: 'Kulmbach', regionLabel: 'Oberfranken' },
  { key: 'lichtenfels', name: 'Lichtenfels', regionLabel: 'Oberfranken' },
  { key: 'kitzingen', name: 'Kitzingen', regionLabel: 'Unterfranken' },
  { key: 'bad-windsheim', name: 'Bad Windsheim', regionLabel: 'Mittelfranken' },
  { key: 'neustadt-aisch', name: 'Neustadt a.d.Aisch', regionLabel: 'Mittelfranken' },
  { key: 'lauf-pegnitz', name: 'Lauf a.d.Pegnitz', regionLabel: 'Mittelfranken' },
  { key: 'altdorf', name: 'Altdorf b. Nürnberg', regionLabel: 'Mittelfranken' },
  { key: 'feucht', name: 'Feucht', regionLabel: 'Mittelfranken' },
  { key: 'zirndorf', name: 'Zirndorf', regionLabel: 'Mittelfranken' },
  { key: 'stein', name: 'Stein', regionLabel: 'Mittelfranken' },
  { key: 'oberasbach', name: 'Oberasbach', regionLabel: 'Mittelfranken' },
  { key: 'langenzenn', name: 'Langenzenn', regionLabel: 'Mittelfranken' },
  { key: 'uffenheim', name: 'Uffenheim', regionLabel: 'Mittelfranken' },
  { key: 'ochsenfurt', name: 'Ochsenfurt', regionLabel: 'Unterfranken' },
  { key: 'karlstadt', name: 'Karlstadt', regionLabel: 'Unterfranken' },
  { key: 'hassfurt', name: 'Haßfurt', regionLabel: 'Unterfranken' },
  { key: 'bad-kissingen', name: 'Bad Kissingen', regionLabel: 'Unterfranken' },

  // Expansion (120) – realistic Orte/Landkreise/Städte in the corridor
  // Mittelfranken / Nürnberg area
  { key: 'nuernberger-land', name: 'Landkreis Nürnberger Land', regionLabel: 'Mittelfranken' },
  { key: 'erlangen-hoechstadt', name: 'Landkreis Erlangen-Höchstadt', regionLabel: 'Mittelfranken' },
  { key: 'fuerth-land', name: 'Landkreis Fürth', regionLabel: 'Mittelfranken' },
  { key: 'roth-landkreis', name: 'Landkreis Roth', regionLabel: 'Mittelfranken' },
  { key: 'ansbach-landkreis', name: 'Landkreis Ansbach', regionLabel: 'Mittelfranken' },
  { key: 'weissenburg-gunzenhausen', name: 'Landkreis Weißenburg-Gunzenhausen', regionLabel: 'Mittelfranken' },
  { key: 'neustadt-aisch-badwindsheim', name: 'Landkreis Neustadt a.d.Aisch-Bad Windsheim', regionLabel: 'Mittelfranken' },
  { key: 'nuernberg-sued', name: 'Nürnberg Süd', regionLabel: 'Mittelfranken' },
  { key: 'nuernberg-nord', name: 'Nürnberg Nord', regionLabel: 'Mittelfranken' },
  { key: 'nuernberg-ost', name: 'Nürnberg Ost', regionLabel: 'Mittelfranken' },
  { key: 'nuernberg-west', name: 'Nürnberg West', regionLabel: 'Mittelfranken' },
  { key: 'nuernberg-innenstadt', name: 'Nürnberg Innenstadt', regionLabel: 'Mittelfranken' },
  { key: 'nuernberg-suedstadt', name: 'Nürnberg Südstadt', regionLabel: 'Mittelfranken' },
  { key: 'nuernberg-goho', name: 'Nürnberg Gostenhof', regionLabel: 'Mittelfranken' },
  { key: 'nuernberg-zoell', name: 'Nürnberg Ziegelstein', regionLabel: 'Mittelfranken' },

  // Around Fürth / Erlangen
  { key: 'cadolzburg', name: 'Cadolzburg', regionLabel: 'Mittelfranken' },
  { key: 'veitsbronn', name: 'Veitsbronn', regionLabel: 'Mittelfranken' },
  { key: 'seukendorf', name: 'Seukendorf', regionLabel: 'Mittelfranken' },
  { key: 'tuchenbach', name: 'Tuchenbach', regionLabel: 'Mittelfranken' },
  { key: 'puschendorf', name: 'Puschendorf', regionLabel: 'Mittelfranken' },
  { key: 'oberreichenbach', name: 'Oberreichenbach', regionLabel: 'Mittelfranken' },
  { key: 'veitsbronn-siegelsdorf', name: 'Siegelsdorf', regionLabel: 'Mittelfranken' },
  { key: 'bubenreuth', name: 'Bubenreuth', regionLabel: 'Mittelfranken' },
  { key: 'spardorf', name: 'Spardorf', regionLabel: 'Mittelfranken' },
  { key: 'taufkirchen-aisch', name: 'Taufkirchen (Aisch)', regionLabel: 'Mittelfranken' },
  { key: 'gremsdorf', name: 'Gremsdorf', regionLabel: 'Mittelfranken' },
  { key: 'heßdorf', name: 'Heßdorf', regionLabel: 'Mittelfranken' },
  { key: 'baiersdorf', name: 'Baiersdorf', regionLabel: 'Mittelfranken' },
  { key: 'neunkirchen-brand', name: 'Neunkirchen a.Brand', regionLabel: 'Mittelfranken' },

  // Upper Franconia
  { key: 'bamberg-landkreis', name: 'Landkreis Bamberg', regionLabel: 'Oberfranken' },
  { key: 'forchheim-landkreis', name: 'Landkreis Forchheim', regionLabel: 'Oberfranken' },
  { key: 'bayreuth-landkreis', name: 'Landkreis Bayreuth', regionLabel: 'Oberfranken' },
  { key: 'kulmbach-landkreis', name: 'Landkreis Kulmbach', regionLabel: 'Oberfranken' },
  { key: 'lichtenfels-landkreis', name: 'Landkreis Lichtenfels', regionLabel: 'Oberfranken' },
  { key: 'coburg-landkreis', name: 'Landkreis Coburg', regionLabel: 'Oberfranken' },
  { key: 'hof-landkreis', name: 'Landkreis Hof', regionLabel: 'Oberfranken' },
  { key: 'kronach', name: 'Kronach', regionLabel: 'Oberfranken' },
  { key: 'kronach-landkreis', name: 'Landkreis Kronach', regionLabel: 'Oberfranken' },
  { key: 'marktredwitz', name: 'Marktredwitz', regionLabel: 'Oberfranken' },
  { key: 'wunsiedel', name: 'Wunsiedel', regionLabel: 'Oberfranken' },
  { key: 'wunsiedel-landkreis', name: 'Landkreis Wunsiedel i.Fichtelgebirge', regionLabel: 'Oberfranken' },
  { key: 'selb', name: 'Selb', regionLabel: 'Oberfranken' },
  { key: 'kulmbach-stadt', name: 'Kulmbach (Stadt)', regionLabel: 'Oberfranken' },
  { key: 'forchheim-stadt', name: 'Forchheim (Stadt)', regionLabel: 'Oberfranken' },

  // Lower Franconia
  { key: 'wuerzburg-landkreis', name: 'Landkreis Würzburg', regionLabel: 'Unterfranken' },
  { key: 'schweinfurt-landkreis', name: 'Landkreis Schweinfurt', regionLabel: 'Unterfranken' },
  { key: 'hassberge', name: 'Landkreis Haßberge', regionLabel: 'Unterfranken' },
  { key: 'kitzingen-landkreis', name: 'Landkreis Kitzingen', regionLabel: 'Unterfranken' },
  { key: 'main-spessart', name: 'Landkreis Main-Spessart', regionLabel: 'Unterfranken' },
  { key: 'miltenberg', name: 'Miltenberg', regionLabel: 'Unterfranken' },
  { key: 'aschaffenburg', name: 'Aschaffenburg', regionLabel: 'Unterfranken' },
  { key: 'aschaffenburg-landkreis', name: 'Landkreis Aschaffenburg', regionLabel: 'Unterfranken' },
  { key: 'lohr-main', name: 'Lohr a.Main', regionLabel: 'Unterfranken' },
  { key: 'marktheidenfeld', name: 'Marktheidenfeld', regionLabel: 'Unterfranken' },
  { key: 'wertheim', name: 'Wertheim', regionLabel: 'Unterfranken' },
  { key: 'volkach', name: 'Volkach', regionLabel: 'Unterfranken' },
  { key: 'gerolzhofen', name: 'Gerolzhofen', regionLabel: 'Unterfranken' },
  { key: 'bad-neustadt', name: 'Bad Neustadt a.d.Saale', regionLabel: 'Unterfranken' },
  { key: 'rhoen-grabfeld', name: 'Landkreis Rhön-Grabfeld', regionLabel: 'Unterfranken' },

  // Upper Palatinate
  { key: 'amberg-sulzbach', name: 'Landkreis Amberg-Sulzbach', regionLabel: 'Oberpfalz' },
  { key: 'neumarkt-landkreis', name: 'Landkreis Neumarkt i.d.OPf.', regionLabel: 'Oberpfalz' },
  { key: 'regensburg-landkreis', name: 'Landkreis Regensburg', regionLabel: 'Oberpfalz' },
  { key: 'schwandorf', name: 'Schwandorf', regionLabel: 'Oberpfalz' },
  { key: 'schwandorf-landkreis', name: 'Landkreis Schwandorf', regionLabel: 'Oberpfalz' },
  { key: 'tirschenreuth', name: 'Tirschenreuth', regionLabel: 'Oberpfalz' },
  { key: 'tirschenreuth-landkreis', name: 'Landkreis Tirschenreuth', regionLabel: 'Oberpfalz' },
  { key: 'neustadt-waldnaab', name: 'Landkreis Neustadt a.d.Waldnaab', regionLabel: 'Oberpfalz' },
  { key: 'cham', name: 'Cham', regionLabel: 'Oberpfalz' },
  { key: 'cham-landkreis', name: 'Landkreis Cham', regionLabel: 'Oberpfalz' },
  { key: 'kelheim', name: 'Kelheim', regionLabel: 'Niederbayern' },
  { key: 'kelheim-landkreis', name: 'Landkreis Kelheim', regionLabel: 'Niederbayern' },
  { key: 'neutraubling', name: 'Neutraubling', regionLabel: 'Oberpfalz' },
  { key: 'straubing', name: 'Straubing', regionLabel: 'Niederbayern' },

  // Upper Bavaria (within corridor)
  { key: 'ingolstadt-landkreis', name: 'Landkreis Eichstätt', regionLabel: 'Oberbayern' },
  { key: 'pfaffenhofen-ilm', name: 'Pfaffenhofen a.d.Ilm', regionLabel: 'Oberbayern' },
  { key: 'neuburg-donau', name: 'Neuburg a.d.Donau', regionLabel: 'Oberbayern' },
  { key: 'donauwoerth', name: 'Donauwörth', regionLabel: 'Schwaben' },
  { key: 'augsburg', name: 'Augsburg', regionLabel: 'Schwaben' },

  // Thuringia / Saxony edge (still relevant for corridor searches)
  { key: 'suhl', name: 'Suhl', regionLabel: 'Thüringen' },
  { key: 'meiningen', name: 'Meiningen', regionLabel: 'Thüringen' },
  { key: 'coburg-umland', name: 'Coburg Umland', regionLabel: 'Oberfranken' },
  { key: 'plauen', name: 'Plauen', regionLabel: 'Sachsen' },
  { key: 'zwickau', name: 'Zwickau', regionLabel: 'Sachsen' },
  { key: 'chemnitz', name: 'Chemnitz', regionLabel: 'Sachsen' },
  { key: 'jena', name: 'Jena', regionLabel: 'Thüringen' },
  { key: 'erfurt', name: 'Erfurt', regionLabel: 'Thüringen' },

  // Baden-Württemberg / Hesse north (close enough to be searched from Franken)
  { key: 'heilbronn', name: 'Heilbronn', regionLabel: 'Baden-Württemberg' },
  { key: 'crailsheim', name: 'Crailsheim', regionLabel: 'Baden-Württemberg' },
  { key: 'schwaebisch-hall', name: 'Schwäbisch Hall', regionLabel: 'Baden-Württemberg' },
  { key: 'bad-mergentheim', name: 'Bad Mergentheim', regionLabel: 'Baden-Württemberg' },
  { key: 'tauberbischofsheim', name: 'Tauberbischofsheim', regionLabel: 'Baden-Württemberg' },
  { key: 'fulda', name: 'Fulda', regionLabel: 'Hessen' },
  { key: 'hammelburg', name: 'Hammelburg', regionLabel: 'Unterfranken' },

  // More local Orte (to reach ~160 total)
  { key: 'schwanstetten', name: 'Schwanstetten', regionLabel: 'Mittelfranken' },
  { key: 'wendelstein', name: 'Wendelstein', regionLabel: 'Mittelfranken' },
  { key: 'burgthann', name: 'Burgthann', regionLabel: 'Mittelfranken' },
  { key: 'winkelhaid', name: 'Winkelhaid', regionLabel: 'Mittelfranken' },
  { key: 'roethenbach', name: 'Röthenbach a.d.Pegnitz', regionLabel: 'Mittelfranken' },
  { key: 'hersbruck', name: 'Hersbruck', regionLabel: 'Mittelfranken' },
  { key: 'altdorf-umland', name: 'Altdorf Umland', regionLabel: 'Mittelfranken' },
  { key: 'oberferrieden', name: 'Oberferrieden', regionLabel: 'Mittelfranken' },
  { key: 'feucht-umland', name: 'Feucht Umland', regionLabel: 'Mittelfranken' },
  { key: 'rothenburg-tauber', name: 'Rothenburg o.d.Tauber', regionLabel: 'Mittelfranken' },
  { key: 'windsbach', name: 'Windsbach', regionLabel: 'Mittelfranken' },
  { key: 'heilbad-heiligenstadt', name: 'Heilbad Heiligenstadt', regionLabel: 'Thüringen' },
  { key: 'bamberg-umland', name: 'Bamberg Umland', regionLabel: 'Oberfranken' },
  { key: 'ebersdorf', name: 'Ebersdorf b.Coburg', regionLabel: 'Oberfranken' },
  { key: 'neustadt-coburg', name: 'Neustadt b.Coburg', regionLabel: 'Oberfranken' },
  { key: 'kronach-stadt', name: 'Kronach (Stadt)', regionLabel: 'Oberfranken' },
  { key: 'ludwigsstadt', name: 'Ludwigsstadt', regionLabel: 'Oberfranken' },
  { key: 'steinwiesen', name: 'Steinwiesen', regionLabel: 'Oberfranken' },
  { key: 'bad-staffelstein', name: 'Bad Staffelstein', regionLabel: 'Oberfranken' },
  { key: 'hirschaid', name: 'Hirschaid', regionLabel: 'Oberfranken' },
  { key: 'heiligenstadt-oberfranken', name: 'Heiligenstadt i.OFr.', regionLabel: 'Oberfranken' },
  { key: 'ebermannstadt', name: 'Ebermannstadt', regionLabel: 'Oberfranken' },
  { key: 'heilsbronn', name: 'Heilsbronn', regionLabel: 'Mittelfranken' },
  { key: 'lichtenau', name: 'Lichtenau', regionLabel: 'Mittelfranken' },
  { key: 'petersaurach', name: 'Petersaurach', regionLabel: 'Mittelfranken' },
  { key: 'wassertruedingen', name: 'Wassertrüdingen', regionLabel: 'Mittelfranken' },

]

// Only the 40 core cities get dedicated "heute" and "sofort" intent pages,
// matching the page-count logic we calculated earlier.
export const coreCityKeys = citySeeds.slice(0, CORE_CITY_COUNT).map(s => s.key)

function makeCity(seed: CitySeed, all: CitySeed[]): PSEOCity {
  const sameRegion = all.filter(x => x.regionLabel === seed.regionLabel && x.key !== seed.key)
  const nearby = (sameRegion.length ? sameRegion : all.filter(x => x.key !== seed.key))
    .slice(0, 8)
    .map(x => x.key)

  const mobilityContextPool = [
    'viel Pendelverkehr und kurze Wege',
    'eine Mischung aus Stadt- und Umlandfahrten',
    'regelmäßige Strecken über Bundesstraßen und Autobahn',
    'dichte Alltagsmobilität mit vielen Kurzstrecken',
    'stark genutzte Fahrzeuge durch Beruf und Familie'
  ]

  const typicalUsePool = [
    'Pendlerfahrzeuge',
    'Familienautos',
    'Zweitwagen',
    'Firmen- und Dienstwagen',
    'Fahrzeuge für Studium und Ausbildung'
  ]

  const localPainPointsPool = [
    'Zeitdruck durch HU/AU-Termine',
    'Unsicherheit beim Privatverkauf',
    'lange Inseratsdauer und Preisverhandlungen',
    'komplizierte Abwicklung mit Abmeldung/Unterlagen',
    'Terminchaos bei Probefahrten'
  ]

  return {
    key: seed.key,
    name: seed.name,
    regionLabel: seed.regionLabel,
    mobilityContextPool,
    typicalUsePool,
    localPainPointsPool,
    nearbyPool: nearby
  }
}

export const pseoCitiesList: PSEOCity[] = citySeeds.map(s => makeCity(s, citySeeds))
export const pseoCities = Object.fromEntries(pseoCitiesList.map(c => [c.key, c])) as Record<string, PSEOCity>
export type PSEOCityKey = (typeof pseoCitiesList)[number]['key']
