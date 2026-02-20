"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"
import { gtagEvent } from "@/lib/leadTracking"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    localStorage.setItem("cookie_consent_date", new Date().toISOString())
    gtagEvent("cookie_consent", { consent_type: "accept" })
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined")
    gtagEvent("cookie_consent", { consent_type: "decline" })
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg animate-slide-up">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
          <Cookie className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <span>
            Wir nutzen Cookies für eine bessere Erfahrung.{" "}
            <Link href="/datenschutz" className="text-orange-600 hover:underline">Mehr erfahren</Link>
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={handleDecline} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
            Ablehnen
          </button>
          <button onClick={handleAccept} className="px-4 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
            Akzeptieren
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  )
}
