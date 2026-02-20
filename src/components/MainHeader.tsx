"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useTheme } from "@/components/ThemeProvider"
import { navItems } from "@/lib/navItems"

export default function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const scrollToForm = () => {
    window.location.href = '/#form'
  }

  const handleLogoClick = () => {
    // GA4 event: logo click leading to the central form
    type GtagFn = (command: "event", eventName: string, params?: Record<string, unknown>) => void
    const gtag = typeof window !== "undefined" ? (window as unknown as { gtag?: GtagFn }).gtag : undefined
    if (typeof gtag === "function") {
      gtag("event", "logo_click_to_form", {
        event_category: "engagement",
        event_label: "header_logo",
      })
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-2 flex justify-center items-center">
          <div className="flex gap-4 items-center">
            <a href="mailto:info@frankenautoankauf.de" className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-800 transition-all hover:scale-110" title="E-Mail senden">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#EA4335"/></svg>
            </a>
            <a href="tel:+4917632333561" className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-all hover:scale-110" title="Anrufen">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#0066FF"/></svg>
            </a>
            <a href="https://wa.me/4917632333561" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-gray-800 transition-all hover:scale-110" title="WhatsApp">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b dark:border-gray-800">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            {/* Logo click should always lead directly to the central inquiry form */}
            <Link
              href="/#form"
              onClick={handleLogoClick}
              className="flex items-center"
              aria-label="Zum Anfrageformular"
            >
              <div className="rounded-lg p-1 md:p-2">
                <Image
                  src="/brand/logo-main.webp"
                  alt="FrankenAutoAnkauf Logo"
                  width={240}
                  height={80}
                  priority
                  className="h-12 w-auto md:h-16"
                />
              </div>
            </Link>

            {/* Desktop Navigation (same items as mobile) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 hover:text-orange-600 transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <Button onClick={scrollToForm} className="hidden sm:flex bg-orange-600 hover:bg-orange-700">
                <Phone className="w-4 h-4 mr-2" />
                Angebot erhalten
              </Button>
              <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t dark:border-gray-700 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 hover:text-orange-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Button
                onClick={() => {
                  scrollToForm()
                  setMobileMenuOpen(false)
                }}
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
              >
                Jetzt Angebot erhalten
              </Button>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
