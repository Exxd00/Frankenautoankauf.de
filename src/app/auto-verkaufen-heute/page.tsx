import type { Metadata } from 'next'

import SEOPageTemplate from '@/components/SEOPageTemplate'
import { Clock, Shield, Banknote, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Auto heute verkaufen | Schneller Autoankauf in Franken',
  description: 'Auto heute verkaufen: kostenlos anfragen, zügige Rückmeldung, schnelle Abwicklung. Direkter Autoankauf in Franken.'
}

export default function AutoVerkaufenHeutePage() {
  const faqs = [
    {
      question: 'Geht ein Verkauf wirklich heute?',
      answer: 'Oft ja – je nach Fahrzeug, Zustand und Erreichbarkeit. Senden Sie die Daten über das Formular und wir sagen Ihnen schnell, was heute möglich ist.'
    },
    {
      question: 'Wie schnell bekomme ich ein Angebot?',
      answer: 'In der Regel sehr zügig. Je vollständiger Ihre Angaben sind, desto schneller ist die Einschätzung.'
    },
    {
      question: 'Ist die Bewertung kostenlos?',
      answer: 'Ja, Anfrage und Angebot sind kostenlos und unverbindlich.'
    }
  ]

  const features = [
    {
      icon: <Clock className="w-12 h-12 text-orange-600" />,
      title: 'Heute planen',
      description: 'Schnelle Terminfindung und klare Schritte.'
    },
    {
      icon: <Banknote className="w-12 h-12 text-orange-600" />,
      title: 'Zahlung bei Übergabe',
      description: 'Bar oder Überweisung – transparent abgestimmt.'
    },
    {
      icon: <Shield className="w-12 h-12 text-orange-600" />,
      title: 'Seriöse Abwicklung',
      description: 'Kein Stress mit Inseraten, Probefahrten und Verhandlungen.'
    }
  ]

  const benefits = [
    'Anfrage heute – zügige Rückmeldung',
    'Kein Inserat, kein Termindruck mit Interessenten',
    'Abholung möglich (je nach Region)',
    'Transparente Bewertung',
    'Unterstützung bei Unterlagen/Abmeldung'
  ]

  const relatedLinks = [
    { href: '/auto-verkaufen-sofort', label: 'Auto sofort verkaufen' },
    { href: '/auto-verkaufen-ohne-tuev', label: 'Ohne TÜV verkaufen' },
    { href: '/auto-verkaufen-mit-motorschaden', label: 'Mit Motorschaden verkaufen' },
    { href: '/staedte', label: 'Städte & Regionen' },
    { href: '/#form', label: 'Zum Formular' }
  ]

  return (
    <SEOPageTemplate
      heroIcon={<Zap className="w-20 h-20 mx-auto" />}
      heroTitle="Auto heute verkaufen"
      heroSubtitle="Schnell, fair und ohne Privatverkauf-Stress – Anfrage in 1 Minute."
      mainTitle="Heute verkaufen: der strukturierte Weg"
      mainContent={
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Wenn Sie Ihr Auto <strong>heute</strong> verkaufen möchten, braucht es einen klaren Ablauf: Daten senden, Angebot erhalten, Übergabe planen.
            Wir helfen Ihnen dabei, ohne wochenlange Inserate und ohne endlose Verhandlungen.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Für die schnellste Rückmeldung nutzen Sie bitte das Formular. Je genauer die Angaben, desto schneller können wir einschätzen, was heute möglich ist.
          </p>
        </>
      }
      benefits={benefits}
      features={features}
      faqs={faqs}
      ctaTitle="Jetzt Angebot für heute anfordern"
      ctaSubtitle="Fahrzeugdaten senden – wir melden uns schnell zurück."
      relatedLinks={relatedLinks}
    />
  )
}
