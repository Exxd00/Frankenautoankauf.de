"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Car, Phone, Mail, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"

export default function ImpressumPage() {
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
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-6">
                <Link href="/" className="hover:text-orange-600 transition">Startseite</Link>
                <Link href="/impressum" className="text-orange-600 font-semibold">Impressum</Link>
                <Link href="/datenschutz" className="hover:text-orange-600 transition">Datenschutz</Link>
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
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Impressum</h1>
          <p className="text-lg opacity-90 mt-2">Rechtliche Informationen</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8 prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">Angaben gemäß § 5 TMG</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Firmenname und Anschrift</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Auto Ankauf Franken<br />
                    Nürnberg<br />
                    Deutschland
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Kontakt</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-orange-600" />
                      Telefon: +49 176 32333561
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-orange-600" />
                      E-Mail: info@frankenautoankauf.de
                    </span>
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Auto Ankauf Franken<br />
                    Nürnberg, Deutschland
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Haftungsausschluss</h3>

                  <h4 className="text-lg font-medium mt-4 mb-2">Haftung für Inhalte</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>

                  <h4 className="text-lg font-medium mt-4 mb-2">Haftung für Links</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                  </p>

                  <h4 className="text-lg font-medium mt-4 mb-2">Urheberrecht</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                    Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Streitschlichtung</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                    <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline ml-1">
                      https://ec.europa.eu/consumers/odr
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Link href="/" className="text-orange-600 hover:underline">
                ← Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Auto Ankauf Franken. Alle Rechte vorbehalten.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/impressum" className="text-orange-400 hover:text-orange-300">Impressum</Link>
            <Link href="/datenschutz" className="text-orange-400 hover:text-orange-300">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
