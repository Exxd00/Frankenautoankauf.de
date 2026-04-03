import type { Metadata } from 'next'

import SEOPageTemplate from '@/components/SEOPageTemplate'
import { Zap, Clock, Shield, Banknote } from 'lucide-react'
import Link from 'next/link'

import { pseoCities, coreCityKeys, type PSEOCityKey } from '@/lib/pseo/pseoCities'
import { isPSEOCityKey, normalizeSlug } from '@/lib/pseo/pseoGenerator'

type Params = { city: string }

export async function generateStaticParams(): Promise<Params[]> {
  return (coreCityKeys as PSEOCityKey[]).map(city => ({ city }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = await params
  const citySlug = normalizeSlug(p.city)
  if (!isPSEOCityKey(citySlug)) {
    return { title: 'Seite nicht gefunden | Franken Auto Ankauf', robots: { index: false, follow: false } }
  }
  const city = pseoCities[citySlug as any]
  return {
    title: `Auto sofort verkaufen in ${city.name} | Heute noch Abschluss`,
    description: `Auto sofort verkaufen in ${city.name} (${city.regionLabel}): schnelles Angebot, zügige Abwicklung, Abholung möglich. Jetzt kostenlos anfragen.`
  }
}

function featureIcon(kind: 'shield' | 'clock' | 'banknote') {
  if (kind === 'clock') return <Clock className="w-12 h-12 text-orange-600" />
  if (kind === 'banknote') return <Banknote className="w-12 h-12 text-orange-600" />
  return <Shield className="w-12 h-12 text-orange-600" />
}

export default async function AutoSofortCityPage({ params }: { params: Promise<Params> }) {
  
  const p = await params
  const citySlug = normalizeSlug(p.city)
  if (!isPSEOCityKey(citySlug)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-3">Seite nicht gefunden</h1>
          <p className="text-gray-600 dark:text-gray-300">Bitte prüfen Sie die URL.</p>
          <p className="mt-4"><Link className="text-orange-600 underline" href="/">Zur Startseite</Link></p>
        </div>
      </div>
    )
  }

  // Use the normalized slug for consistent lookups and links.
  const cityKey = citySlug as PSEOCityKey
  const city = pseoCities[cityKey]

  const faqs = [
    {
      question: `Kann ich mein Auto in ${city.name} wirklich sofort verkaufen?`,
      answer: `Ja – in vielen Fällen geht es sehr schnell. Senden Sie die Daten über das Formular, wir melden uns zeitnah mit einem Angebot und koordinieren die Abholung in ${city.name} und Umgebung.`
    },
    {
      question: `Welche Unterlagen brauche ich in ${city.name}?`,
      answer: `Meist genügen Zulassungsbescheinigung Teil I/II, Ausweis und Schlüssel. Wenn etwas fehlt, sagen Sie es im Formular – wir finden eine Lösung.`
    },
    {
      question: `Wie bekomme ich mein Geld?`,
      answer: `Sie wählen: Barzahlung bei Übergabe oder Überweisung. Wir stimmen das transparent mit Ihnen ab.`
    }
  ]

  const features = [
    { icon: <Zap className="w-12 h-12 text-orange-600" />, title: 'Express-Abwicklung', description: `Kurze Wege in ${city.name}: Anfrage → Angebot → Termin.` },
    { icon: featureIcon('banknote'), title: 'Zahlung bei Übergabe', description: 'Bar oder Überweisung – Sie entscheiden.' },
    { icon: featureIcon('shield'), title: 'Seriös & nachvollziehbar', description: 'Klare Kommunikation, keine versteckten Gebühren.' }
  ]

  const benefits = [
    `Schnelles Angebot für ${city.name}`,
    `Abholung in ${city.name} und Umgebung möglich`,
    'Keine Inserate, keine Probefahrten, kein Stress',
    'Transparente Bewertung statt pauschaler Abschläge',
    'Unterstützung bei Abmeldung/Unterlagen'
  ]

  const relatedLinks = [
    { href: `/auto-verkaufen-heute/${cityKey}`, label: `Auto heute verkaufen in ${city.name}` },
    { href: `/auto-verkaufen/ohne-tuev/${cityKey}`, label: `Ohne TÜV in ${city.name}` },
    { href: `/auto-verkaufen/motorschaden/${cityKey}`, label: `Motorschaden in ${city.name}` },
    { href: '/auto-verkaufen-sofort', label: 'Sofortverkauf (Allgemein)' },
    { href: '/#form', label: 'Zum Formular' }
  ]

  return (
    <SEOPageTemplate
      heroIcon={<Zap className="w-20 h-20 mx-auto" />}
      heroTitle={`Auto sofort verkaufen in ${city.name}`}
      heroSubtitle={`Schnell verkaufen ohne Inserat – direkter Autoankauf in ${city.name} (${city.regionLabel}).`}
      mainTitle={`Sofortverkauf in ${city.name}: so geht's`}
      mainContent={
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Wenn Sie Ihr Auto in <strong>{city.name}</strong> sofort verkaufen möchten, zählt vor allem eins: ein klarer Ablauf.
            Wir machen aus dem Privatverkauf (Termine, Probefahrten, Verhandlungen) eine strukturierte Abwicklung.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Anfrage senden, Angebot erhalten und Übergabe planen – in {city.name} sind kurze Wege möglich.
            Nutzen Sie für die schnellste Rückmeldung direkt unser Formular.
          </p>
        </>
      }
      benefits={benefits}
      features={features}
      faqs={faqs}
      ctaTitle={`Jetzt Angebot für ${city.name} anfordern`}
      ctaSubtitle={`Fahrzeugdaten senden – wir melden uns schnell und koordinieren die Abholung in ${city.name}.`}
      relatedLinks={relatedLinks}
    />
  )
}
