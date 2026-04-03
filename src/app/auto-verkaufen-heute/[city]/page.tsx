import type { Metadata } from 'next'
import Link from "next/link"


import SEOPageTemplate from '@/components/SEOPageTemplate'
import { Zap, Clock, Shield, Banknote } from 'lucide-react'

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
    title: `Auto heute verkaufen in ${city.name} | Schneller Autoankauf`,
    description: `Auto heute verkaufen in ${city.name} (${city.regionLabel}): Anfrage senden, Angebot erhalten, Übergabe planen. Jetzt kostenlos anfragen.`
  }
}

function icon(kind: 'clock' | 'banknote' | 'shield') {
  if (kind === 'clock') return <Clock className="w-12 h-12 text-orange-600" />
  if (kind === 'banknote') return <Banknote className="w-12 h-12 text-orange-600" />
  return <Shield className="w-12 h-12 text-orange-600" />
}

export default async function AutoHeuteCityPage({ params }: { params: Promise<Params> }) {
  
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

  const cityKey = p.city as PSEOCityKey
  const city = pseoCities[cityKey]

  const faqs = [
    {
      question: `Was brauche ich für einen Verkauf heute in ${city.name}?`,
      answer: `Am besten: Zulassungsbescheinigung Teil I/II, Ausweis und Schlüssel. Je genauer die Fahrzeugdaten, desto schneller können wir die Abwicklung in ${city.name} planen.`
    },
    {
      question: `Wie schnell erhalte ich in ${city.name} eine Rückmeldung?`,
      answer: `In der Regel zügig. Bei hoher Auslastung priorisieren wir vollständige Anfragen – nutzen Sie deshalb das Formular.`
    },
    {
      question: `Kann auch eine Abholung in ${city.name} organisiert werden?`,
      answer: `Oft ja – abhängig von Standort und Zustand. Wir stimmen den Ablauf transparent mit Ihnen ab.`
    }
  ]

  const features = [
    { icon: icon('clock'), title: 'Heute machbar planen', description: `Kurze Wege in ${city.name} – wir koordinieren die nächsten Schritte.` },
    { icon: icon('banknote'), title: 'Zahlung bei Übergabe', description: 'Bar oder Überweisung – Sie wählen.' },
    { icon: icon('shield'), title: 'Ohne Privatverkauf-Stress', description: 'Keine Inserate, keine Probefahrten, keine endlosen Verhandlungen.' }
  ]

  const benefits = [
    `Schnelle Rückmeldung für ${city.name}`,
    `Klare Schritte statt Chaos beim Privatverkauf in ${city.name}`,
    'Kostenloses, unverbindliches Angebot',
    'Transparente Bewertung',
    'Unterstützung bei Unterlagen/Abmeldung'
  ]

  const relatedLinks = [
    { href: `/auto-verkaufen-sofort/${cityKey}`, label: `Auto sofort verkaufen in ${city.name}` },
    { href: `/auto-verkaufen/ohne-tuev/${cityKey}`, label: `Ohne TÜV in ${city.name}` },
    { href: `/auto-verkaufen/motorschaden/${cityKey}`, label: `Motorschaden in ${city.name}` },
    { href: '/auto-verkaufen-heute', label: 'Auto heute verkaufen (Allgemein)' },
    { href: '/#form', label: 'Zum Formular' }
  ]

  return (
    <SEOPageTemplate
      heroIcon={<Zap className="w-20 h-20 mx-auto" />}
      heroTitle={`Auto heute verkaufen in ${city.name}`}
      heroSubtitle={`Direkter Autoankauf in ${city.name} (${city.regionLabel}) – schnell, fair, unkompliziert.`}
      mainTitle={`Heute verkaufen in ${city.name}: so funktioniert's`}
      mainContent={
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            In <strong>{city.name}</strong> führt Zeitdruck beim Autoverkauf oft zu unnötigem Stress: Inserate, viele Anfragen, Terminkollisionen.
            Unser Ablauf ist einfacher: Anfrage senden, Angebot erhalten, Übergabe planen – heute, wenn es passt.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Für die schnellste Rückmeldung nutzen Sie bitte das Formular. Je vollständiger die Angaben sind, desto schneller lässt sich der Ablauf in {city.name} koordinieren.
          </p>
        </>
      }
      benefits={benefits}
      features={features}
      faqs={faqs}
      ctaTitle={`Jetzt Angebot für ${city.name} anfordern`}
      ctaSubtitle={`Fahrzeugdaten senden – wir melden uns schnell und planen die nächsten Schritte in ${city.name}.`}
      relatedLinks={relatedLinks}
    />
  )
}
