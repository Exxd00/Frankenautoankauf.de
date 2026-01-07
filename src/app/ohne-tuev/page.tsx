"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Phone, Mail, Car, FileX, Clock, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"

export default function OhneTuevPage() {
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
              <Link href="/unfall-auto" className="hover:text-orange-600 transition">Unfall Auto</Link>
              <Link href="/defektes-auto" className="hover:text-orange-600 transition">Defektes Auto</Link>
              <Link href="/ohne-tuev" className="text-orange-600 font-semibold">Ohne TÜV</Link>
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
          <FileX className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Auto verkaufen ohne TÜV
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            TÜV abgelaufen? Kein Problem für uns!
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
            <h2 className="text-3xl font-bold mb-8">Auto ohne TÜV verkaufen in Nürnberg</h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Ihr TÜV ist abgelaufen und eine erneute Prüfung würde sich nicht mehr lohnen?
              Oder Ihr Fahrzeug würde den TÜV gar nicht bestehen? Wir kaufen Ihr Auto auch ohne gültige HU!
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Sparen Sie sich die Kosten für TÜV-Reparaturen und verkaufen Sie Ihr Fahrzeug direkt an uns.
              Wir bieten faire Preise und eine schnelle Abwicklung.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <Clock className="w-16 h-16 text-orange-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Schnell & Unkompliziert</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Keine lange Wartezeit, keine aufwendigen Reparaturen.
                  Wir kaufen Ihr Auto so wie es ist.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Ankauf innerhalb von 24h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Keine versteckten Kosten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Bargeld sofort</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-gray-800 rounded-lg p-8">
                <FileX className="w-16 h-16 text-orange-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Auch ohne TÜV</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Der TÜV-Status spielt für uns keine Rolle.
                  Wir kaufen Fahrzeuge unabhängig von der HU.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>TÜV abgelaufen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Würde TÜV nicht bestehen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Stillgelegte Fahrzeuge</span>
                  </li>
                </ul>
              </div>
            </div>

            <Card className="bg-gray-900 dark:bg-black text-white mb-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Rufen Sie uns jetzt an!</h3>
                <p className="text-lg mb-6">Wir beraten Sie gerne und machen Ihnen ein unverbindliches Angebot.</p>
                <a href="tel:+4917632333561">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    +49 (0) 176 32333561
                  </Button>
                </a>
              </CardContent>
            </Card>

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
