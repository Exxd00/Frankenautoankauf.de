"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Check, Phone, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gtagEvent, trackWhatsAppClick, trackPhoneClick } from "@/lib/leadTracking"

export default function DankePage() {
  const router = useRouter()
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Check if user came from form submission
    const formSubmitted = sessionStorage.getItem("form_submitted")
    if (formSubmitted === "true") {
      setIsValid(true)
      sessionStorage.removeItem("form_submitted")
      // Track thank you page view
      gtagEvent("thank_you_page_view", { page: "/danke" })
    } else {
      // Redirect to home if accessed directly
      router.replace("/")
    }
  }, [router])

  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
              <Check className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
            {/* Pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-green-400 animate-ping opacity-20" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Vielen Dank!
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
            Ihre Anfrage wurde erfolgreich gesendet.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              Was passiert jetzt?
            </h2>
            <ul className="text-left space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 font-bold">1</span>
                <span>Unsere Experten prüfen Ihre Anfrage sorgfältig.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 font-bold">2</span>
                <span>Sie erhalten innerhalb kurzer Zeit eine Rückmeldung.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 font-bold">3</span>
                <span>Wir vereinbaren einen Termin zur kostenlosen Fahrzeugbewertung.</span>
              </li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div className="bg-orange-50 dark:bg-gray-800 rounded-2xl p-6 mb-8 border border-orange-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Haben Sie Fragen? Kontaktieren Sie uns direkt:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/4917632333561?text=Hallo, ich habe gerade eine Anfrage über Ihre Website gesendet und möchte mehr erfahren."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp schreiben
              </a>
              <a
                href="tel:+4917632333561"
                onClick={() => trackPhoneClick()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Jetzt anrufen
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="gap-2 px-6">
                <Home className="w-5 h-5" />
                Zur Startseite
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2024 Auto Ankauf Franken | Professioneller Autoankauf in Nürnberg & Franken</p>
      </footer>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
