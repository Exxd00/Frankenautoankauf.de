"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Phone, Mail, Car, AlertTriangle, Shield, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"

export default function UnfallAutoPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Car className="w-10 h-10 text-orange-600" />
              <div>
                <h1 className="font-bold text-xl">Auto Ankauf</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Franken</p>
              </div>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="hover:text-orange-600 transition">Startseite</Link>
              <Link href="/unfall-auto" className="text-orange-600 font-semibold">Unfall Auto</Link>
              <Link href="/defektes-auto" className="hover:text-orange-600 transition">Defektes Auto</Link>
              <Link href="/ohne-tuev" className="hover:text-orange-600 transition">Ohne TÜV</Link>
            </nav>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-orange-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="w-20 h-20 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unfallwagen Ankauf
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Wir kaufen Ihr Unfallfahrzeug zum Bestpreis!
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 transition-transform">
            Jetzt Angebot erhalten
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Unfallwagen verkaufen in Nürnberg</h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Sie hatten einen Unfall und möchten Ihr beschädigtes Fahrzeug verkaufen? Kein Problem!
              Bei Auto Ankauf Franken kaufen wir Unfallfahrzeuge aller Art – unabhängig vom Schadensausmaß.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Ob leichter Blechschaden oder Totalschaden – wir machen Ihnen ein faires Angebot und
              übernehmen alle Formalitäten für Sie.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-4">Unsere Garantie</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Faire Bewertung durch Experten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Sofortige Barauszahlung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Kostenlose Abholung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Abmeldung inklusive</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <AlertTriangle className="w-12 h-12 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-4">Wir kaufen</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Fahrzeuge mit Frontschaden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Fahrzeuge mit Heckschaden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Fahrzeuge mit Seitenschaden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Totalschäden</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Zurück zur Startseite
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 dark:bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Jetzt kontaktieren!</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <a href="tel:+4917632333561" className="flex items-center justify-center gap-2 text-orange-400 hover:text-orange-300">
              <Phone className="w-6 h-6" />
              +49 (0) 176 32333561
            </a>
            <a href="mailto:info@frankenautoankauf.de" className="flex items-center justify-center gap-2 text-orange-400 hover:text-orange-300">
              <Mail className="w-6 h-6" />
              info@frankenautoankauf.de
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
