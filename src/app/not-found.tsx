"use client"

import Link from "next/link"
import MainHeader from "@/components/MainHeader"
import { Button } from "@/components/ui/button"
import { Home, FileText, MapPin, Send, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainHeader />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/30">
              <AlertCircle className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            404 – Seite nicht gefunden
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Die angeforderte Seite existiert nicht oder wurde verschoben.
            Kein Problem – Sie können direkt eine Anfrage senden oder zur Startseite zurück.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link href="/#form">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
                <Send className="w-4 h-4" />
                Zum Anfrage-Formular
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Home className="w-4 h-4" />
                Startseite
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="border-t pt-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Vielleicht suchen Sie:
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/faelle"
                className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                <FileText className="w-4 h-4" />
                Alle Fahrzeugzustände
              </Link>
              <Link
                href="/staedte"
                className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                <MapPin className="w-4 h-4" />
                Alle Städte
              </Link>
              <Link
                href="/auto-verkaufen"
                className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                <Send className="w-4 h-4" />
                Auto verkaufen
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Franken Auto Ankauf. Alle Rechte vorbehalten.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/impressum" className="hover:text-orange-600 hover:underline">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-orange-600 hover:underline">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
