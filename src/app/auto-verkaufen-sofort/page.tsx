import { Metadata } from 'next'
import SEOPageTemplate from '@/components/SEOPageTemplate'
import { Zap, Clock, Shield, Banknote, Car, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Auto sofort verkaufen | Heute noch Bargeld | Auto Ankauf Franken',
  description: 'Auto sofort verkaufen in Franken. Heute anfragen, heute verkaufen! Schnellste Abwicklung, Barzahlung vor Ort. Jetzt kostenloses Angebot erhalten!',
}

export default function AutoVerkaufenSofortPage() {
  const faqs = [
    {
      question: "Kann ich mein Auto wirklich heute noch verkaufen?",
      answer: "Ja! Wenn Sie uns vormittags kontaktieren, können wir in den meisten Fällen noch am selben Tag zu Ihnen kommen, das Fahrzeug bewerten und bei Einigung sofort kaufen."
    },
    {
      question: "Wie schnell erhalte ich mein Geld?",
      answer: "Sofort bei Übergabe! Wir zahlen bar oder können den Betrag auf Wunsch auch direkt überweisen. Bei Barzahlung haben Sie das Geld unmittelbar in der Hand."
    },
    {
      question: "Was muss ich für den Sofortverkauf vorbereiten?",
      answer: "Halten Sie Fahrzeugschein, Fahrzeugbrief, Ihren Personalausweis und alle Fahrzeugschlüssel bereit. Mehr brauchen Sie nicht – wir kümmern uns um alles Weitere."
    },
    {
      question: "Muss mein Auto fahrtüchtig sein für den Sofortankauf?",
      answer: "Nein, wir kaufen auch nicht fahrbare Fahrzeuge. In dem Fall bringen wir ein Abschleppfahrzeug mit und holen Ihr Auto direkt ab."
    },
    {
      question: "Gibt es versteckte Gebühren beim Sofortankauf?",
      answer: "Nein, bei uns gibt es keine versteckten Kosten. Die Bewertung ist kostenlos, die Abholung ist kostenlos, und auch die Abmeldung übernehmen wir ohne Zusatzkosten."
    }
  ]

  const features = [
    {
      icon: <Zap className="w-12 h-12 text-orange-600" />,
      title: "Express-Ankauf",
      description: "Vom Anruf bis zur Barzahlung oft in wenigen Stunden."
    },
    {
      icon: <Banknote className="w-12 h-12 text-orange-600" />,
      title: "Sofort Bargeld",
      description: "Barzahlung direkt bei Fahrzeugübergabe – garantiert."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-orange-600" />,
      title: "Alles inklusive",
      description: "Abholung, Abmeldung und Formalitäten – wir erledigen alles."
    }
  ]

  const benefits = [
    "Anfrage heute – Verkauf heute möglich",
    "Barzahlung sofort bei Übergabe",
    "Keine Wartezeit auf Käufer",
    "Verbindliches Angebot am Telefon",
    "Kostenlose Fahrzeugbewertung vor Ort",
    "Kostenlose Abholung in ganz Franken",
    "Abmeldung inklusive",
    "Kein Papierkram für Sie"
  ]

  // Keep links aligned with the real routes used in this project.
  const relatedLinks = [
    { href: "/auto-verkaufen/ohne-tuev", label: "Ohne TÜV" },
    { href: "/auto-verkaufen/motorschaden", label: "Mit Motorschaden" },
    { href: "/auto-verkaufen/unfallwagen", label: "Unfallwagen" },
    { href: "/autoankauf/nuernberg", label: "Autoankauf Nürnberg" },
    { href: "/autoankauf/fuerth", label: "Autoankauf Fürth" }
  ]

  return (
    <SEOPageTemplate
      heroIcon={<Zap className="w-20 h-20 mx-auto" />}
      heroTitle="Auto sofort verkaufen"
      heroSubtitle="Keine Zeit zu verlieren? Verkaufen Sie Ihr Auto noch heute und erhalten Sie sofort Bargeld!"
      mainTitle="Sofortankauf – Heute anfragen, heute verkaufen"
      mainContent={
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Sie möchten Ihr <strong>Auto sofort verkaufen</strong>? Bei Auto Ankauf Franken bieten wir Ihnen den schnellsten Weg zum Autoverkauf. Keine wochenlangen Inserate, keine Besichtigungstouristen, keine Preisverhandlungen – nur schnelle und faire Abwicklung.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Wenn Sie uns vormittags kontaktieren, können wir oft noch am selben Tag zu Ihnen kommen. Nach der Fahrzeugbewertung vor Ort erhalten Sie ein verbindliches Angebot. Bei Einigung zahlen wir <strong>sofort bar</strong> und nehmen das Fahrzeug direkt mit.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-orange-600">So funktioniert der Sofortankauf:</h3>
          <ol className="list-decimal pl-6 text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-3">
            <li><strong>Kontaktieren Sie uns</strong> – per Telefon, WhatsApp oder Formular</li>
            <li><strong>Erste Einschätzung</strong> – Sie erhalten sofort eine Preisindikation</li>
            <li><strong>Termin vor Ort</strong> – Wir kommen zu Ihnen, oft noch am selben Tag</li>
            <li><strong>Fahrzeugbewertung</strong> – Unsere Experten prüfen Ihr Auto</li>
            <li><strong>Verbindliches Angebot</strong> – Fair und transparent</li>
            <li><strong>Sofortige Barzahlung</strong> – Bei Einigung direkt Geld in der Hand</li>
            <li><strong>Abholung & Abmeldung</strong> – Wir erledigen alles</li>
          </ol>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-orange-600">Warum Sofortankauf wählen?</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Der private Autoverkauf kann Wochen oder Monate dauern. Inserate schalten, auf Anfragen warten, Besichtigungstermine koordinieren, Probefahrten durchführen, Preisverhandlungen führen – das alles kostet Zeit und Nerven. Beim Sofortankauf sparen Sie sich all das.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Ob Sie schnell ein neues Auto brauchen, einen Umzug planen oder einfach keine Lust auf den Verkaufsstress haben – unser Sofortankauf ist die Lösung. Sie erhalten einen fairen Preis und haben das Geld noch heute in der Tasche.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Wir sind im gesamten Großraum Franken blitzschnell bei Ihnen: Nürnberg, Fürth, Erlangen, Ansbach, Bamberg, Würzburg und alle umliegenden Orte. Rufen Sie jetzt an!
          </p>
        </>
      }
      benefits={benefits}
      features={features}
      faqs={faqs}
      ctaTitle="Jetzt Auto sofort verkaufen!"
      ctaSubtitle="Rufen Sie an oder füllen Sie das Formular aus – wir melden uns umgehend und kaufen Ihr Auto noch heute!"
      relatedLinks={relatedLinks}
    />
  )
}
