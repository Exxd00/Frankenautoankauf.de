import type { Metadata } from 'next'

import { pseoCases, type PSEOCaseKey } from '@/lib/pseo/pseoCases'
import { pseoCities, coreCityKeys, type PSEOCityKey } from '@/lib/pseo/pseoCities'

export interface PSEOGeneratedPage {
  metadata: Metadata
  heroTitle: string
  heroSubtitle: string
  mainTitle: string
  intro: string
  problem: string
  cityWhy: string
  stepsTitle: string
  stepsBullets: string[]
  benefits: string[]
  features: Array<{ icon: 'shield' | 'clock' | 'banknote'; title: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  ctaTitle: string
  ctaSubtitle: string
  relatedLinks: Array<{ href: string; label: string }>
}

function hashString(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

function pick<T>(arr: T[], seed: string): T {
  const idx = hashString(seed) % arr.length
  return arr[idx]
}

function fmt(s: string, vars: Record<string, string>): string {
  let out = s
  for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, v)
  return out
}

export function normalizeSlug(slug: string) {
  // Be tolerant: handle encoded URLs and normalize common variants.
  let s = slug
  try { s = decodeURIComponent(s) } catch {}
  return s
    .trim()
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
}

export function isPSEOCaseKey(v: string): v is PSEOCaseKey {
  const k = normalizeSlug(v)
  return Object.prototype.hasOwnProperty.call(pseoCases, k)
}
export function isPSEOCityKey(v: string): v is PSEOCityKey {
  const k = normalizeSlug(v)
  return Object.prototype.hasOwnProperty.call(pseoCities, k)
}
type Pools = {
  h1Variants: string[]
  introPool: string[]
  problemPool: string[]
  cityWhyPool: string[]
  stepsPool: Array<{ title: string; bullets: string[] }>
  uspPool: string[]
  faqPool: Array<{ q: string; a: string }>
  metaTitleVariants: string[]
  metaDescVariants: string[]
}

// Global pools. Sentences contain BOTH the {CASE} and {CITY} variables so even if the
// template repeats, the final string will never be verbatim-identical between pages.
const pools: Pools = {
  h1Variants: [
    'Auto verkaufen {CASE} in {CITY}',
    '{CASE}: Autoankauf in {CITY} – schnell & unkompliziert',
    'Autoankauf {CITY}: {CASE} ohne Stress verkaufen',
    '{CITY} Autoankauf – {CASE} fair bewerten lassen'
  ],
  introPool: [
    'In {CITY} sieht man täglich {USE}. Dadurch tauchen Fälle wie {CASE} häufiger auf, als viele denken – besonders wenn {MOB} typisch ist.',
    '{CITY} ist geprägt von {MOB}. Wenn Ihr Wagen {CASE} hat, wird ein Privatverkauf schnell zäh – wir machen es planbar und sauber.',
    'Viele Halter in {CITY} nutzen ihr Auto als {USE}. Bei {CASE} entsteht oft {PAIN} – genau dafür ist ein direkter Autoankauf gemacht.',
    'Ob Innenstadt oder Umland: In {CITY} gilt – {CASE} kostet Zeit und Nerven. Wir fokussieren uns auf eine schnelle Lösung statt Diskussionen.'
  ],
  problemPool: [
    'Bei {CASE} springen viele Interessenten in {CITY} ab: Unsicherheit, zusätzliche Kosten und das Gefühl, „ins Risiko“ zu kaufen, drücken den Preis.',
    '{CASE} bedeutet meist: mehr Rückfragen, weniger Probefahrten und härtere Verhandlungen. In {CITY} verlängert sich so die Inseratsdauer deutlich.',
    'Privat wirkt {CASE} wie ein Warnsignal. Gerade in {CITY} wollen Käufer klare Fakten – sonst wird aus einem Verkauf ein endloser Chatverlauf.',
    'Mit {CASE} ist die Wertermittlung schwerer. In {CITY} wird dann oft „auf Verdacht“ runtergehandelt – wir bewerten transparent und nachvollziehbar.'
  ],
  cityWhyPool: [
    'Der Vorteil in {CITY}: kurze Wege. Wir koordinieren Abholung und Übergabe so, dass {CASE} Sie nicht weiter ausbremst.',
    'In {CITY} profitieren Sie von regionaler Abwicklung: Termin flexibel, Abholung möglich – und bei {CASE} sparen Sie sich die typische Käuferunsicherheit.',
    'Gerade in {CITY} lohnt sich ein direkter Ankauf: statt lange zu inserieren, bekommen Sie bei {CASE} schnell ein realistisches Angebot.',
    '{CITY} ist ideal für schnelle Übergaben. Bei {CASE} zählt Zeit – wir strukturieren den Prozess, damit Sie zügig abschließen können.'
  ],
  stepsPool: [
    {
      title: 'So läuft der Ankauf bei {CASE} in {CITY} ab',
      bullets: [
        'Formular ausfüllen (Marke, Modell, Baujahr, Zustand) – speziell zu {CASE}',
        'Sie erhalten ein Angebot mit nachvollziehbarer Bewertung für {CITY}',
        'Termin & Abholung in {CITY} oder Umgebung vereinbaren',
        'Zahlung bei Übergabe – danach ist {CASE} nicht mehr Ihr Thema'
      ]
    },
    {
      title: '{CASE} verkaufen in {CITY}: 4 einfache Schritte',
      bullets: [
        'Daten senden (inkl. Hinweis zu {CASE})',
        'Rückmeldung mit Angebot für {CITY}',
        'Abholung/Übergabe koordinieren',
        'Bezahlung + Übergabe der Unterlagen'
      ]
    },
    {
      title: 'Schneller Verkauf trotz {CASE} – Ablauf in {CITY}',
      bullets: [
        'Kurze Anfrage (1 Minute) – {CASE} kurz beschreiben',
        'Wir prüfen Markt + Zustand und erstellen ein Angebot',
        'Abholung in {CITY} möglich (auch kurzfristig)',
        'Abschluss ohne lange Verhandlungen'
      ]
    }
  ],
  uspPool: [
    'Kostenloses, unverbindliches Angebot für {CASE} in {CITY}',
    'Transparente Bewertung: {CASE} wird realistisch berücksichtigt',
    'Abholung in {CITY} und Umgebung möglich',
    'Bezahlung bei Übergabe (Bar oder Überweisung)',
    'Unterstützung bei Abmeldung/Unterlagen',
    'Schnelle Kommunikation – klare nächste Schritte',
    'Kein Inserat, keine Probefahrten, keine „letzter Preis“-Chats'
  ],
  faqPool: [
    {
      q: 'Kann ich {CASE} in {CITY} auch ohne Probefahrt verkaufen?',
      a: 'Ja. Bei {CASE} ist eine Probefahrt nicht immer sinnvoll. Wir klären die Details im Vorfeld und organisieren die Übergabe in {CITY} strukturiert.'
    },
    {
      q: 'Welche Unterlagen brauche ich in {CITY} bei {CASE}?',
      a: 'In der Regel reichen Zulassungsbescheinigung Teil I/II und ein Ausweis. Bei {CASE} helfen zusätzliche Berichte (z. B. HU/AU) – falls vorhanden.'
    },
    {
      q: 'Wie schnell geht der Verkauf in {CITY}, wenn {CASE} vorliegt?',
      a: 'Oft sehr schnell: Anfrage → Angebot → Termin. Gerade in {CITY} sind kurze Wege möglich, sodass {CASE} nicht zu wochenlangem Stillstand führt.'
    },
    {
      q: 'Wirkt sich {CASE} in {CITY} stark auf den Preis aus?',
      a: 'Ja, {CASE} beeinflusst den Marktwert. Wichtig ist eine saubere Einschätzung – wir bewerten transparent, statt pauschal zu drücken.'
    },
    {
      q: 'Übernehmt ihr die Abholung in {CITY} bei {CASE}?',
      a: 'Je nach Lage und Zustand ja. Sagen Sie uns kurz, was bei {CASE} relevant ist – wir planen die Abholung in {CITY} passend.'
    },
    {
      q: 'Was ist, wenn ich in {CITY} sehr dringend verkaufen muss (heute/sofort)?',
      a: 'Dann nutzen Sie die Express-Option. Bei {CASE} priorisieren wir Termine – prüfen Sie auch unsere Seite „sofort verkaufen“.'
    }
  ],
  metaTitleVariants: [
    '{CASE} in {CITY} verkaufen | Franken Auto Ankauf',
    'Autoankauf {CITY}: {CASE} schnell & fair | FrankenAutoAnkauf',
    '{CASE} verkaufen {CITY} – Angebot in 1 Minute | FrankenAutoAnkauf'
  ],
  metaDescVariants: [
    'Auto verkaufen {CASE} in {CITY}: kostenloses Angebot, transparente Bewertung, Abholung möglich. Jetzt anfragen.',
    '{CASE} in {CITY} schnell verkaufen: kein Inserat, kein Stress. Anfrage senden und Angebot erhalten.',
    'Direkter Autoankauf in {CITY} bei {CASE}: fair, unkompliziert, zügige Abwicklung. Jetzt Formular nutzen.'
  ]
}

export function generatePSEOPage(caseKey: PSEOCaseKey, cityKey: PSEOCityKey): PSEOGeneratedPage {
  const c = pseoCases[caseKey]
  const city = pseoCities[cityKey]
  const seed = `${caseKey}::${cityKey}`

  const vars = {
    CITY: city.name,
    CASE: c.shortLabel,
    CASETITLE: c.title,
    REGION: city.regionLabel,
    MOB: pick(city.mobilityContextPool, seed + 'mob'),
    USE: pick(city.typicalUsePool, seed + 'use'),
    PAIN: pick(city.localPainPointsPool, seed + 'pain')
  }

  const heroTitle = fmt(pick(pools.h1Variants, seed + 'h1'), vars)
  const heroSubtitle = fmt(
    'Direkter Autoankauf in {CITY} ({REGION}): fair, transparent und ohne Stress – Anfrage in 1 Minute.',
    vars
  )
  const mainTitle = fmt(
    'Warum {CASE} privat schwer ist – und wie es in {CITY} trotzdem schnell klappt',
    vars
  )

  const intro = fmt(pick(pools.introPool, seed + 'intro'), vars)
  const problem = fmt(pick(pools.problemPool, seed + 'problem'), vars)
  const cityWhy = fmt(pick(pools.cityWhyPool, seed + 'why'), vars)

  const stepBlock = pick(pools.stepsPool, seed + 'steps')
  const stepsTitle = fmt(stepBlock.title, vars)
  const stepsBullets = stepBlock.bullets.map(b => fmt(b, vars))

  const benefits = [
    fmt(pick(pools.uspPool, seed + 'usp1'), vars),
    fmt(pick(pools.uspPool, seed + 'usp2'), vars),
    fmt(pick(pools.uspPool, seed + 'usp3'), vars),
    fmt('Schnelle Terminfindung in {CITY} – passend zu {CASE}', vars),
    fmt('Abholung flexibel – auch rund um {CITY}', vars),
    fmt('Klare Abwicklung in {CITY}: wir führen Sie Schritt für Schritt', vars)
  ]

  // FAQ: select 3–6 deterministically
  const faqCount = 3 + (hashString(seed + 'faqCount') % 4) // 3..6
  const faqs = Array.from({ length: faqCount }, (_, i) => pools.faqPool[(hashString(seed + 'faq' + i) % pools.faqPool.length)])
    .map(({ q, a }) => ({ question: fmt(q, vars), answer: fmt(a, vars) }))

  const ctaTitle = fmt('Jetzt {CASE} in {CITY} verkaufen', vars)
  const ctaSubtitle = fmt(
    'Senden Sie die Fahrzeugdaten – wir melden uns schnell mit einem realistischen Angebot. Abholung in {CITY} möglich.',
    vars
  )

  // Mandatory internal linking
  const otherCityKey = pick(city.nearbyPool, seed + 'near')
  const otherCity = pseoCities[otherCityKey]

  // pick another case (different)
  const allCaseKeys = Object.keys(pseoCases) as PSEOCaseKey[]
  let otherCaseKey = allCaseKeys[hashString(seed + 'otherCase') % allCaseKeys.length]
  if (otherCaseKey === caseKey) otherCaseKey = allCaseKeys[(hashString(seed + 'otherCase2') + 7) % allCaseKeys.length]

  const hasCityIntent = coreCityKeys.includes(cityKey)
  const relatedLinks = [
    {
      href: `/auto-verkaufen/${caseKey}/${otherCityKey}`,
      label: `${c.title} in ${otherCity.name}`
    },
    {
      href: `/auto-verkaufen/${otherCaseKey}/${cityKey}`,
      label: `${pseoCases[otherCaseKey].title} in ${city.name}`
    },
    hasCityIntent
      ? { href: `/auto-verkaufen-sofort/${cityKey}`, label: `Auto sofort verkaufen in ${city.name}` }
      : { href: `/auto-verkaufen-sofort`, label: `Auto sofort verkaufen (heute/sofort)` },
    {
      href: `/#form`,
      label: `Zum Formular (kostenloses Angebot)`
    }
  ]

  const metaTitle = fmt(pick(pools.metaTitleVariants, seed + 'mt'), vars)
  const metaDesc = fmt(pick(pools.metaDescVariants, seed + 'md'), vars)

  return {
    metadata: {
      title: metaTitle,
      description: metaDesc,
      alternates: {
        canonical: `https://frankenautoankauf.de/auto-verkaufen/${caseKey}/${cityKey}`
      }
    },
    heroTitle,
    heroSubtitle,
    mainTitle,
    intro,
    problem,
    cityWhy,
    stepsTitle,
    stepsBullets,
    benefits,
    features: [
      {
        icon: 'shield',
        title: 'Seriös & transparent',
        description: fmt('Klare Kommunikation und eine nachvollziehbare Bewertung – auch bei {CASE} in {CITY}.', vars)
      },
      {
        icon: 'clock',
        title: 'Schnell in der Region',
        description: fmt('Kurze Wege in {CITY} ({REGION}) – Termin und Abholung flexibel möglich.', vars)
      },
      {
        icon: 'banknote',
        title: 'Zahlung bei Übergabe',
        description: fmt('Bar oder Überweisung – passend zu Ihrer Situation in {CITY}.', vars)
      }
    ],
    faqs,
    ctaTitle,
    ctaSubtitle,
    relatedLinks
  }
}