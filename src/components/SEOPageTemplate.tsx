"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Phone, Mail, ChevronDown, ChevronUp, MapPin, Clock, Shield, Car, Banknote, FileCheck } from "lucide-react"
import Link from "next/link"
import MainHeader from "@/components/MainHeader"
import { useState } from "react"
import { setLeadSource, gtagEvent, trackPhoneClick } from "@/lib/leadTracking"

interface FAQ {
  question: string
  answer: string
}

interface SEOPageProps {
  heroIcon: React.ReactNode
  heroTitle: string
  heroSubtitle: string
  mainTitle: string
  mainContent: React.ReactNode
  benefits: string[]
  features: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
  faqs: FAQ[]
  ctaTitle: string
  ctaSubtitle: string
  relatedLinks?: { href: string; label: string }[]
  /** Optional JSON-LD structured data objects to embed on the page */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

export default function SEOPageTemplate({
  heroIcon,
  heroTitle,
  heroSubtitle,
  mainTitle,
  mainContent,
  benefits,
  features,
  faqs,
  ctaTitle,
  ctaSubtitle,
  relatedLinks = [],
  jsonLd
}: SEOPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const goToForm = (click_source: string) => {
    setLeadSource(click_source)
    gtagEvent("click_to_form", { click_source })
    window.location.href = '/#form'
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* JSON-LD Structured Data (Google can parse it anywhere in the HTML) */}
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Franken Auto Ankauf",
              url: "https://frankenautoankauf.de",
              telephone: "+49 176 32333561",
              email: "info@frankenautoankauf.de",
              areaServed: "Franken",
              sameAs: ["https://frankenautoankauf.de"],
            }),
          }}
        />
      )}
      <MainHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">{heroIcon}</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => goToForm("cta_cta")}
              className="bg-orange-600 text-white hover:bg-orange-700 hover:scale-105 transition-all text-lg px-8"
            >
              Kostenlose Bewertung
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8"
            >
              <a href="tel:+4917632333561" aria-label="Anrufen" onClick={() => trackPhoneClick()}>
                <Phone className="w-5 h-5 mr-2" />
                0176 - 323 335 61
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange-600" />
              <span className="font-semibold">Kostenlose Bewertung</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-600" />
              <span className="font-semibold">Ankauf in 24 Stunden</span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote className="w-6 h-6 text-orange-600" />
              <span className="font-semibold">Sofortige Barzahlung</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-orange-600" />
              <span className="font-semibold">Kostenlose Abmeldung</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{mainTitle}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              {mainContent}
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Check className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Vorteile</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <Card key={i} className="dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Häufig gestellte Fragen</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="p-5 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">{ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => goToForm("cta_cta")}
              className="bg-orange-600 text-white hover:bg-orange-700 text-lg px-8"
            >
              Jetzt Angebot erhalten
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white text-lg px-8">
              <a href="tel:+4917632333561" aria-label="Jetzt anrufen" className="inline-flex items-center justify-center" onClick={() => trackPhoneClick()}>
                <Phone className="w-5 h-5 mr-2" />
                Jetzt anrufen
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Links */}
      {relatedLinks.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold mb-6 text-center">Weitere Ankauf-Seiten</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {relatedLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors border dark:border-gray-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Kontakt</h3>
              <p className="mb-2">Auto Ankauf Franken</p>
              <p className="mb-2">0176 – 323 335 61</p>
              <p>info@frankenautoankauf.de</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Zustand</h3>
              <ul className="space-y-2">
                <li><Link href="/auto-verkaufen-ohne-tuev" className="hover:text-orange-400">Ohne TÜV</Link></li>
                <li><Link href="/auto-verkaufen-mit-motorschaden" className="hover:text-orange-400">Mit Motorschaden</Link></li>
                <li><Link href="/auto-verkaufen-unfallschaden" className="hover:text-orange-400">Unfallschaden</Link></li>
                <li><Link href="/auto-verkaufen-defektes-auto" className="hover:text-orange-400">Defektes Auto</Link></li>
                <li><Link href="/faelle" className="hover:text-orange-400">Alle Fälle</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Städte</h3>
              <ul className="space-y-2">
                <li><Link href="/autoankauf-nuernberg" className="hover:text-orange-400">Nürnberg</Link></li>
                <li><Link href="/autoankauf-fuerth" className="hover:text-orange-400">Fürth</Link></li>
                <li><Link href="/autoankauf-erlangen" className="hover:text-orange-400">Erlangen</Link></li>
                <li><Link href="/autoankauf-wuerzburg" className="hover:text-orange-400">Würzburg</Link></li>
                <li><Link href="/staedte" className="hover:text-orange-400">Alle Städte</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Rechtliches</h3>
              <ul className="space-y-2">
                <li><Link href="/impressum" className="hover:text-orange-400">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-orange-400">Datenschutz</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Auto Ankauf Franken | Professioneller Autoankauf in Nürnberg & Franken</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
