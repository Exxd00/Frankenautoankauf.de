import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SEOPageTemplate from '@/components/SEOPageTemplate'
import { Shield, Settings, Car, Clock, Banknote, Wrench, AlertTriangle, CheckCircle, Truck, FileText } from 'lucide-react'
import { pseoCases, type PSEOCaseKey } from '@/lib/pseo/pseoCases'
import { pseoCities, coreCityKeys } from '@/lib/pseo/pseoCities'
import { isPSEOCaseKey, normalizeSlug } from '@/lib/pseo/pseoGenerator'

type Params = { case: string }

export async function generateStaticParams(): Promise<Params[]> {
  return (Object.keys(pseoCases) as PSEOCaseKey[]).map(c => ({ case: c }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = await params
  const caseSlug = normalizeSlug(p.case)

  if (!isPSEOCaseKey(caseSlug)) {
    return {
      title: 'Seite nicht gefunden | Franken Auto Ankauf',
      robots: { index: false, follow: false }
    }
  }

  const c = pseoCases[caseSlug as PSEOCaseKey]
  const description = `${c.title} in Franken: Wir kaufen Ihr Auto ${c.shortLabel} zum fairen Preis. Kostenlose Bewertung, Abholung & sofortige Bezahlung. Jetzt Angebot anfordern!`

  return {
    title: `${c.title} | Franken Auto Ankauf`,
    description,
    alternates: {
      canonical: `https://frankenautoankauf.de/auto-verkaufen/${caseSlug}`
    },
    openGraph: {
      title: `${c.title} | Franken Auto Ankauf`,
      description,
      type: 'website',
      locale: 'de_DE',
    }
  }
}

function heroIcon(caseKey: PSEOCaseKey) {
  const iconClass = "w-20 h-20 mx-auto"
  switch (caseKey) {
    case 'motorschaden':
    case 'getriebeschaden':
    case 'turboschaden':
    case 'motor-totalschaden':
      return <Settings className={iconClass} />
    case 'unfallwagen':
    case 'unfallschaden':
    case 'blechschaden':
    case 'rahmenschaden':
      return <Car className={iconClass} />
    case 'ohne-tuev':
    case 'abgemeldet':
      return <FileText className={iconClass} />
    case 'hagelschaden':
    case 'wasserschaden':
    case 'brandschaden':
      return <AlertTriangle className={iconClass} />
    default:
      return <Shield className={iconClass} />
  }
}

function featureIcon(name: 'shield' | 'clock' | 'banknote' | 'truck' | 'check') {
  const iconClass = "w-12 h-12 text-orange-600"
  switch (name) {
    case 'clock': return <Clock className={iconClass} />
    case 'banknote': return <Banknote className={iconClass} />
    case 'truck': return <Truck className={iconClass} />
    case 'check': return <CheckCircle className={iconClass} />
    default: return <Shield className={iconClass} />
  }
}

export default async function CaseGeneralPage({ params }: { params: Promise<Params> }) {
  const p = await params
  const caseSlug = normalizeSlug(p.case)

  if (!isPSEOCaseKey(caseSlug)) {
    notFound()
  }

  const caseKey = caseSlug as PSEOCaseKey
  const c = pseoCases[caseKey]

  // Link targets: use core cities to keep pages stable
  const nbgKey = coreCityKeys[0] || 'nuernberg'
  const furKey = coreCityKeys[1] || 'fuerth'
  const erlKey = coreCityKeys[2] || 'erlangen'
  const nbg = pseoCities[nbgKey]
  const fur = pseoCities[furKey]
  const erl = pseoCities[erlKey]

  const benefits = [
    `Kostenlose & unverbindliche Bewertung für Ihr Auto ${c.shortLabel}`,
    'Faire Preise basierend auf aktuellem Marktwert',
    'Schnelle Abwicklung innerhalb von 24 Stunden möglich',
    'Barzahlung oder Überweisung bei Übergabe',
    'Kostenlose Abholung in ganz Franken',
    'Wir übernehmen alle Formalitäten und die Abmeldung'
  ]

  const features = [
    {
      icon: 'shield' as const,
      title: 'Seriös & Transparent',
      description: `Wir bewerten Ihr Auto ${c.shortLabel} ehrlich und nachvollziehbar. Keine versteckten Kosten oder böse Überraschungen.`
    },
    {
      icon: 'clock' as const,
      title: 'Schnelle Abwicklung',
      description: 'Von der Anfrage bis zur Auszahlung vergehen oft nur 24-48 Stunden. Wir wissen, dass Zeit wichtig ist.'
    },
    {
      icon: 'banknote' as const,
      title: 'Sofortige Bezahlung',
      description: 'Sie erhalten Ihr Geld direkt bei Übergabe - bar oder per Sofortüberweisung, wie Sie es wünschen.'
    },
    {
      icon: 'truck' as const,
      title: 'Kostenlose Abholung',
      description: 'Wir holen Ihr Fahrzeug kostenlos bei Ihnen ab - egal ob in Nürnberg, Fürth, Erlangen oder Umgebung.'
    }
  ].map(f => ({ ...f, iconEl: featureIcon(f.icon) }))

  const faqs = [
    {
      question: `Was ist mein Auto ${c.shortLabel} noch wert?`,
      answer: `Der Wert eines Autos ${c.shortLabel} hängt von verschiedenen Faktoren ab: Marke, Modell, Baujahr, Kilometerstand und Gesamtzustand. Wir erstellen Ihnen eine kostenlose, unverbindliche Bewertung basierend auf aktuellen Marktdaten. Senden Sie uns einfach die Fahrzeugdaten über unser Formular.`
    },
    {
      question: `Kaufen Sie wirklich jedes Auto ${c.shortLabel}?`,
      answer: `Ja, wir kaufen nahezu jedes Fahrzeug ${c.shortLabel} an - unabhängig von Marke, Alter oder Zustand. Ob PKW, Transporter oder Kleinwagen: Senden Sie uns Ihre Anfrage und wir machen Ihnen ein faires Angebot.`
    },
    {
      question: `Muss ich das Auto ${c.shortLabel} vorher reparieren lassen?`,
      answer: `Nein, auf keinen Fall! Wir kaufen Ihr Auto im aktuellen Zustand. Eine Reparatur vor dem Verkauf lohnt sich in den meisten Fällen nicht, da die Kosten oft höher sind als der Wertzuwachs. Sparen Sie sich Zeit und Geld - wir übernehmen das Fahrzeug so wie es ist.`
    },
    {
      question: 'Wie läuft der Verkauf genau ab?',
      answer: '1. Formular ausfüllen oder anrufen. 2. Sie erhalten unser Angebot (meist innerhalb weniger Stunden). 3. Bei Einigung vereinbaren wir einen Termin. 4. Wir holen das Auto ab und bezahlen sofort. 5. Wir kümmern uns um die Abmeldung. Fertig!'
    },
    {
      question: 'Welche Unterlagen benötige ich für den Verkauf?',
      answer: 'Sie benötigen: Fahrzeugschein (Zulassungsbescheinigung Teil I), Fahrzeugbrief (Zulassungsbescheinigung Teil II), Ihren Personalausweis und alle vorhandenen Fahrzeugschlüssel. Falls Unterlagen fehlen, sprechen Sie uns an - oft finden wir eine Lösung.'
    },
    {
      question: 'Ist der Service wirklich kostenlos?',
      answer: 'Ja, absolut! Die Fahrzeugbewertung, Abholung und Abmeldung sind für Sie komplett kostenlos. Es gibt keine versteckten Gebühren. Sie erhalten den vereinbarten Kaufpreis in voller Höhe.'
    }
  ]

  const relatedLinks = [
    { href: `/auto-verkaufen/${caseKey}/${nbgKey}`, label: `${c.title} in ${nbg?.name ?? 'Nürnberg'}` },
    { href: `/auto-verkaufen/${caseKey}/${furKey}`, label: `${c.title} in ${fur?.name ?? 'Fürth'}` },
    { href: `/auto-verkaufen/${caseKey}/${erlKey}`, label: `${c.title} in ${erl?.name ?? 'Erlangen'}` },
    { href: '/auto-verkaufen-sofort', label: 'Auto sofort verkaufen' },
    { href: '/faelle', label: 'Alle Fahrzeugzustände' },
    { href: '/#form', label: 'Jetzt Angebot anfordern' }
  ]

  return (
    <SEOPageTemplate
      heroIcon={heroIcon(caseKey)}
      heroTitle={c.title}
      heroSubtitle={`Verkaufen Sie Ihr Auto ${c.shortLabel} schnell, einfach und zum fairen Preis. Kostenlose Bewertung & Abholung in Franken.`}
      mainTitle={`${c.title} - So funktioniert's`}
      mainContent={
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Sie möchten Ihr <strong>Auto {c.shortLabel}</strong> verkaufen? Bei Franken Auto Ankauf sind Sie genau richtig!
            Wir kaufen Fahrzeuge in jedem Zustand - schnell, unkompliziert und zu fairen Preisen.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Ein Privatverkauf bei einem Fahrzeug {c.shortLabel} ist oft schwierig: Interessenten sind skeptisch,
            Verhandlungen ziehen sich hin, und am Ende bleibt oft weniger als erhofft.
            <strong> Wir bieten Ihnen eine bessere Alternative:</strong> Professionelle Bewertung, faire Preise und schnelle Abwicklung.
          </p>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-3">
              Unser Versprechen an Sie:
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span>Ehrliche Bewertung ohne versteckte Abzüge</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span>Verbindliches Angebot - was wir sagen, gilt</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span>Keine Nachverhandlungen vor Ort</span>
              </li>
            </ul>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            Egal ob Ihr Fahrzeug {c.shortLabel} noch fahrbereit ist oder nicht - wir machen Ihnen ein Angebot.
            Nutzen Sie unser <Link href="/#form" className="text-orange-600 hover:underline font-medium">kostenloses Anfrageformular</Link> oder
            rufen Sie uns direkt an unter <a href="tel:+4917632333561" className="text-orange-600 hover:underline font-medium">0176 - 323 335 61</a>.
          </p>
        </>
      }
      benefits={benefits}
      features={features.map(f => ({ icon: f.iconEl, title: f.title, description: f.description }))}
      faqs={faqs}
      ctaTitle="Jetzt kostenloses Angebot anfordern"
      ctaSubtitle={`Senden Sie uns Ihre Fahrzeugdaten und erhalten Sie innerhalb weniger Stunden ein faires Angebot für Ihr Auto ${c.shortLabel}.`}
      relatedLinks={relatedLinks}
    />
  )
}
