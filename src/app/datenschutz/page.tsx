"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Car, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"

export default function DatenschutzPage() {
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
                <Link href="/impressum" className="hover:text-orange-600 transition">Impressum</Link>
                <Link href="/datenschutz" className="text-orange-600 font-semibold">Datenschutz</Link>
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
          <h1 className="text-4xl font-bold">Datenschutzerklärung</h1>
          <p className="text-lg opacity-90 mt-2">Informationen zum Datenschutz</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8 prose dark:prose-invert max-w-none">

                <h2 className="text-2xl font-bold mb-6">1. Datenschutz auf einen Blick</h2>

                <h3 className="text-xl font-semibold mb-3">Allgemeine Hinweise</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                  Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit
                  denen Sie persönlich identifiziert werden können.
                </p>

                <h2 className="text-2xl font-bold mb-6 mt-8">2. Datenerfassung auf unserer Website</h2>

                <h3 className="text-xl font-semibold mb-3">Wer ist verantwortlich für die Datenerfassung?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                  können Sie dem Impressum dieser Website entnehmen.
                </p>

                <h3 className="text-xl font-semibold mb-3">Wie erfassen wir Ihre Daten?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
                  z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind
                  vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>

                <h3 className="text-xl font-semibold mb-3">Wofür nutzen wir Ihre Daten?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                  Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>

                <h3 className="text-xl font-semibold mb-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                  gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung,
                  Sperrung oder Löschung dieser Daten zu verlangen.
                </p>

                <h2 className="text-2xl font-bold mb-6 mt-8">3. Kontaktformular</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                  Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                  Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung der in das
                  Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung.
                </p>

                <h2 className="text-2xl font-bold mb-6 mt-8">4. Cookies</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem
                  Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher zu gestalten.
                  Wir verwenden ausschließlich technisch notwendige Cookies, um Ihre Theme-Präferenz (hell/dunkel)
                  zu speichern.
                </p>

                <h2 className="text-2xl font-bold mb-6 mt-8">5. Kontakt</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften,
                  Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  <strong>Auto Ankauf Franken</strong><br />
                  E-Mail: info@frankenautoankauf.de<br />
                  Telefon: +49 176 32333561
                </p>

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
