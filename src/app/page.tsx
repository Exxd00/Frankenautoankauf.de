"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, Check, Car, ClipboardCheck, HandshakeIcon, Menu, X, Star, Quote, Upload, ImageIcon, Loader2, Sun, Moon } from "lucide-react"
import { useState, useRef } from "react"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"
import { carBrands, generateYears, fuelTypes } from "@/data/carData"
import { navItems } from "@/lib/navItems"
import { setLeadSource, getLeadSource, clearLeadSource, gtagEvent } from "@/lib/leadTracking"

// GA4 Event tracking helper
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void
  }
}

const trackEvent = (eventName: string, params?: Record<string, string>) => {
  gtagEvent(eventName, params)
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { theme, toggleTheme } = useTheme()
  const [selectedFeaturedBrand, setSelectedFeaturedBrand] = useState<string | null>(null)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customBrandModel, setCustomBrandModel] = useState("")
  const formRef = useRef<HTMLDivElement>(null)
  const years = generateYears()

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    priceExpectation: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    wantUpload: ""
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const scrollToFormWithBrand = (brandName: string) => {
    setSelectedFeaturedBrand(brandName)
    setFormData(prev => ({ ...prev, brand: brandName, model: "" }))
    setShowCustomInput(false)
    trackEvent('brand_logo_click', { car_brand: brandName })
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      const validFiles = newFiles.filter(file => {
        if (file.size > 2 * 1024 * 1024) {
          setFormError(`Die Datei "${file.name}" ist zu groß. Maximale Größe: 2 MB`)
          return false
        }
        return true
      })
      setSelectedImages(prev => [...prev, ...validFiles].slice(0, 5))
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleBrandChange = (brand: string) => {
    setFormData({ ...formData, brand, model: "" })
    setSelectedFeaturedBrand(brand)
  }

  const handleNextStep = () => {
    setFormError(null)
    if (showCustomInput) {
      if (customBrandModel && formData.year && formData.mileage && formData.fuel) {
        setFormData(prev => ({ ...prev, brand: customBrandModel, model: "Manuell eingegeben" }))
        setCurrentStep(2)
        trackEvent('form_step_1_complete', { car_brand: customBrandModel, input_type: 'custom' })
      } else {
        setFormError("Bitte füllen Sie alle Fahrzeugdaten aus.")
      }
    } else {
      if (formData.brand && formData.model && formData.year && formData.mileage && formData.fuel) {
        setCurrentStep(2)
        trackEvent('form_step_1_complete', { car_brand: formData.brand, car_model: formData.model })
      } else {
        setFormError("Bitte füllen Sie alle Fahrzeugdaten aus.")
      }
    }
  }

  const handlePrevStep = () => {
    setFormError(null)
    setCurrentStep(1)
  }

  const handleSubmit = async () => {
    setFormError(null)
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      setFormError("Bitte füllen Sie alle Pflichtfelder aus.")
      return
    }
    setIsSubmitting(true)
    try {
      const vehicleBrand = showCustomInput ? customBrandModel : formData.brand
      const vehicleModel = showCustomInput ? 'Manuell eingegeben' : formData.model

      trackEvent('form_submit', {
        car_brand: vehicleBrand || 'unknown',
        car_model: vehicleModel || 'unknown',
        has_images: selectedImages.length > 0 ? 'yes' : 'no'
      })

      // Send as multipart/form-data to our Next.js API route
      const payload = new FormData()
      payload.append('brand', vehicleBrand || '')
      payload.append('model', vehicleModel || '')
      payload.append('year', formData.year)
      payload.append('mileage', formData.mileage)
      payload.append('fuel', formData.fuel)
      payload.append('priceExpectation', formData.priceExpectation)
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('phone', formData.phone)
      payload.append('location', formData.location)
      payload.append('message', formData.message)
      payload.append('wantUpload', formData.wantUpload)

      // Lead/source tracking fields (for GA4 + Google Sheet)
      const leadSource = getLeadSource()
      const referrer = typeof document !== 'undefined' ? document.referrer : ''
      const deviceType = typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown'

      payload.append('page_url', typeof window !== 'undefined' ? window.location.href : '')
      payload.append('page_path', typeof window !== 'undefined' ? window.location.pathname : '')
      payload.append('referrer', referrer)
      payload.append('device_type', deviceType)
      payload.append('timestamp', new Date().toISOString())
      payload.append('lead_source_url', leadSource?.source_url || '')
      payload.append('lead_source_path', leadSource?.source_path || '')
      payload.append('click_source', leadSource?.click_source || '')

      // keep source for next submit? clear after successful submission

      // Images (up to 5)
      selectedImages.slice(0, 5).forEach(file => {
        payload.append('images', file)
      })

      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        body: payload
      })

      const result = await response.json()
      if (result.success) {
        // GA4 conversion event (single source of truth for lead tracking)
        type GtagFn = (command: "event", eventName: string, params?: Record<string, unknown>) => void
        const gtag = typeof window !== "undefined" ? (window as unknown as { gtag?: GtagFn }).gtag : undefined
        if (typeof gtag === "function") {
          gtag("event", "lead_submit", {
            event_category: "Lead",
            event_label: window.location.pathname,
          })
        }
        clearLeadSource()
        setFormSubmitted(true)
      } else {
        setFormError("Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.")
      }
    } catch (error) {
      console.error('Error:', error)
      setFormError("Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-2 flex justify-center items-center">
          <div className="flex gap-4 items-center">
            <a href="mailto:info@frankenautoankauf.de" className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-800 transition-all hover:scale-110" title="E-Mail senden" onClick={() => trackEvent('contact_click', { contact_type: 'email' })}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#EA4335"/></svg>
            </a>
            <a href="tel:+4917632333561" className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-all hover:scale-110" title="Anrufen" onClick={() => trackEvent('contact_click', { contact_type: 'phone' })}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#0066FF"/></svg>
            </a>
            <a href="https://wa.me/4917632333561" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-green-50 dark:hover:bg-gray-800 transition-all hover:scale-110" title="WhatsApp" onClick={() => trackEvent('contact_click', { contact_type: 'whatsapp' })}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b dark:border-gray-800">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link href="/#form" className="flex items-center" onClick={() => { setLeadSource("home_header_logo"); trackEvent("logo_click_to_form", { click_source: "home_header_logo" }); }}>
              {/* Franken Auto Ankauf Logo - Exact replica */}
              <div className="bg-[#2d333b] rounded-lg p-2 md:p-3">
                <img src="/brand/logo-main.webp" alt="Franken Auto Ankauf" className="w-28 h-16 md:w-36 md:h-20 object-contain" />
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="px-3 py-2 hover:text-orange-600 transition">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Direkt-Verkauf Section with Brand Logos */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center md:text-left leading-tight">
            Direkt-Verkauf:<br />
            Innerhalb von 24 Stunden<br />
            erfolgreich verkaufen
          </h2>

          <p className="text-gray-700 dark:text-white text-lg mb-6">Beliebte Marken</p>

          {/* Brand Logos Grid - Using mobile.de logos */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-5xl">
            {/* VW */}
            <button onClick={() => scrollToFormWithBrand("Volkswagen")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Volkswagen" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="https://ext.same-assets.com/1493698612/3578160969.png" alt="Volkswagen" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </button>

            {/* BMW */}
            <button onClick={() => scrollToFormWithBrand("BMW")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "BMW" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="https://ext.same-assets.com/1493698612/2880173070.png" alt="BMW" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </button>

            {/* Mercedes-Benz */}
            <button onClick={() => scrollToFormWithBrand("Mercedes-Benz")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Mercedes-Benz" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="https://ext.same-assets.com/1493698612/365396571.png" alt="Mercedes-Benz" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </button>

            {/* Audi */}
            <button onClick={() => scrollToFormWithBrand("Audi")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Audi" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="https://ext.same-assets.com/1493698612/1249359374.png" alt="Audi" className="w-20 h-10 md:w-32 md:h-16 object-contain" />
            </button>

            {/* Opel */}
            <button onClick={() => scrollToFormWithBrand("Opel")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Opel" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="https://ext.same-assets.com/1493698612/4107142477.png" alt="Opel" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </button>

            {/* Ford */}
            <button onClick={() => scrollToFormWithBrand("Ford")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Ford" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="https://ext.same-assets.com/1493698612/2625615857.png" alt="Ford" className="w-20 h-10 md:w-32 md:h-16 object-contain" />
            </button>
          </div>

          <button onClick={scrollToForm} className="mt-8 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-white transition-colors underline">
            Andere Marke wählen
          </button>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" ref={formRef} className="py-16 bg-gray-50 dark:bg-gray-900 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Trust Signals (helps conversion) */}
            <div className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span aria-hidden>✔</span>
                  <span>Kostenlose Abholung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden>✔</span>
                  <span>Barzahlung oder Überweisung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden>✔</span>
                  <span>Keine Verpflichtung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden>✔</span>
                  <span>Seriöser Autoankauf</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">🔒 Ihre Daten werden vertraulich behandelt.</p>
            </div>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className={`${currentStep === 1 ? 'bg-orange-600' : 'bg-gray-400 dark:bg-gray-600'} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold transition-colors`}>1</div>
                <p className={`font-semibold ${currentStep === 1 ? 'text-foreground' : 'text-gray-400'}`}>FAHRZEUG</p>
              </div>
              <div className={`text-center ${currentStep === 2 ? '' : 'opacity-50'}`}>
                <div className={`${currentStep === 2 ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-700'} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold transition-colors`}>2</div>
                <p className={`font-semibold ${currentStep === 2 ? 'text-foreground' : 'text-gray-400'}`}>INFORMATIONEN</p>
              </div>
            </div>

            <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-8">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-green-600 mb-2">Anfrage erfolgreich gesendet!</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen.</p>
                  </div>
                ) : currentStep === 1 ? (
                  <>
                    <h3 className="text-2xl font-bold mb-4 text-orange-600">Kostenlose Autobewertung</h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">Wir kaufen Ihr Auto noch heute bei Ihnen!</p>

                    {!showCustomInput ? (
                      <>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <Select onValueChange={handleBrandChange} value={formData.brand}>
                            <SelectTrigger><SelectValue placeholder="Bitte Automarke wählen" /></SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {Object.keys(carBrands).sort().map((brand) => (
                                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select onValueChange={(value) => setFormData({...formData, model: value})} value={formData.model} disabled={!formData.brand}>
                            <SelectTrigger className={!formData.brand ? "opacity-50" : ""}>
                              <SelectValue placeholder={formData.brand ? "Bitte Modell wählen" : "Erst Marke wählen"} />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {formData.brand && carBrands[formData.brand]?.map((model) => (
                                <SelectItem key={model} value={model}>{model}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select onValueChange={(value) => setFormData({...formData, year: value})} value={formData.year}>
                            <SelectTrigger><SelectValue placeholder="Bitte Baujahr wählen" /></SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {years.map((year) => (
                                <SelectItem key={year} value={year}>{year}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input placeholder="Kilometerstand (ungefähr)" type="number" value={formData.mileage} onChange={(e) => setFormData({...formData, mileage: e.target.value})} />

                          <Select onValueChange={(value) => setFormData({...formData, fuel: value})} value={formData.fuel}>
                            <SelectTrigger><SelectValue placeholder="Kraftstoffart wählen" /></SelectTrigger>
                            <SelectContent>
                              {fuelTypes.map((fuel) => (
                                <SelectItem key={fuel.value} value={fuel.value}>{fuel.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input placeholder="Preisvorstellung in € (optional)" type="number" value={formData.priceExpectation} onChange={(e) => setFormData({...formData, priceExpectation: e.target.value})} />
                        </div>

                        <button type="button" onClick={() => setShowCustomInput(true)} className="w-full text-center text-sm text-orange-600 hover:text-orange-700 underline mb-4">
                          Mein Fahrzeug ist nicht gelistet
                        </button>
                      </>
                    ) : (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Geben Sie Ihre Fahrzeugdaten manuell ein:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input placeholder="Marke und Modell (z.B. Opel Astra)" value={customBrandModel} onChange={(e) => setCustomBrandModel(e.target.value)} />
                          <Select onValueChange={(value) => setFormData({...formData, year: value})} value={formData.year}>
                            <SelectTrigger><SelectValue placeholder="Baujahr" /></SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {years.map((year) => (<SelectItem key={year} value={year}>{year}</SelectItem>))}
                            </SelectContent>
                          </Select>
                          <Input placeholder="Kilometerstand" type="number" value={formData.mileage} onChange={(e) => setFormData({...formData, mileage: e.target.value})} />
                          <Select onValueChange={(value) => setFormData({...formData, fuel: value})} value={formData.fuel}>
                            <SelectTrigger><SelectValue placeholder="Kraftstoffart" /></SelectTrigger>
                            <SelectContent>
                              {fuelTypes.map((fuel) => (<SelectItem key={fuel.value} value={fuel.value}>{fuel.label}</SelectItem>))}
                            </SelectContent>
                          </Select>
                        </div>
                        <button type="button" onClick={() => { setShowCustomInput(false); setCustomBrandModel("") }} className="mt-3 text-sm text-gray-600 hover:text-gray-800 underline">← Zurück zur Markenauswahl</button>
                      </div>
                    )}

                    {formError && (
                      <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                        {formError}
                      </div>
                    )}
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 hover:scale-[1.02] transition-transform" onClick={handleNextStep}>Weiter</Button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-4 text-orange-600">Persönliche Angaben</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <Input placeholder="Ihr Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      <Input placeholder="Ihre E-Mail Adresse" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      <Input placeholder="Ihre Telefonnummer" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      <Input placeholder="Wo befindet sich Ihr Auto? (PLZ oder Ort)" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                    </div>
                    <Textarea placeholder="Möchten Sie uns sonst noch etwas mitteilen?" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="mb-4 min-h-[100px]" />

                    <div className="mb-6">
                      <p className="font-semibold mb-3">Möchten Sie Bilder hochladen?</p>
                      <div className="flex gap-6 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="wantUpload" value="ja" checked={formData.wantUpload === "ja"} onChange={(e) => setFormData({...formData, wantUpload: e.target.value})} className="w-4 h-4" />
                          <span>Ja</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="wantUpload" value="nein" checked={formData.wantUpload === "nein"} onChange={(e) => { setFormData({...formData, wantUpload: e.target.value}); setSelectedImages([]) }} className="w-4 h-4" />
                          <span>Nein</span>
                        </label>
                      </div>
                      {formData.wantUpload === "ja" && (
                        <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 bg-orange-50 dark:bg-gray-800">
                          <div className="text-center mb-4">
                            <Upload className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">Laden Sie bis zu 5 Bilder hoch</p>
                          </div>
                          <label className="block">
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={selectedImages.length >= 5} />
                            <div className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg cursor-pointer transition-colors ${selectedImages.length >= 5 ? 'bg-gray-200 text-gray-500' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
                              <ImageIcon className="w-5 h-5" />
                              <span>{selectedImages.length >= 5 ? 'Maximum erreicht' : 'Bilder auswählen'}</span>
                            </div>
                          </label>
                          {selectedImages.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-3">
                              {selectedImages.map((file, index) => (
                                <div key={index} className="relative">
                                  <img src={URL.createObjectURL(file)} alt={`Bild ${index + 1}`} className="w-full h-20 object-cover rounded" />
                                  <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm">×</button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {formError && (
                      <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                        {formError}
                      </div>
                    )}
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1" onClick={handlePrevStep} disabled={isSubmitting}>Zurück</Button>
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Wird gesendet...</> : 'Kostenloses Angebot einholen'}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3 Steps Process */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">So funktionierts - In nur 3 Schritten Ihren Gebrauchtwagen verkaufen</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-2xl">1</div>
              <h3 className="text-xl font-bold mb-3 text-orange-600">DAS ANFRAGENFORMULAR AUSFÜLLEN</h3>
              <ClipboardCheck className="w-24 h-24 mx-auto text-orange-600" />
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-2xl">2</div>
              <h3 className="text-xl font-bold mb-3 text-orange-600">KOSTENLOSE AUTOBEWERTUNG VON UNSEREN EXPERTEN VOR ORT</h3>
              <Car className="w-24 h-24 mx-auto text-orange-600" />
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-2xl">3</div>
              <h3 className="text-xl font-bold mb-3 text-orange-600">WIR KAUFEN IHR AUTO NOCH AM GLEICHEN TAG AN</h3>
              <HandshakeIcon className="w-24 h-24 mx-auto text-orange-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-200 dark:border-gray-700 dark:bg-gray-800 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Kostenloses Abtransport Ihres verkauften PKWs</h3>
                <p className="text-gray-700 dark:text-gray-300">Beim Autoankauf in Nürnberg übernehmen wir den kostenlosen Abtransport Ihres verkauften PKWs.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-200 dark:border-gray-700 dark:bg-gray-800 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Stressfreier Autoverkauf durch unser umfangreiches Serviceangebot</h3>
                <p className="text-gray-700 dark:text-gray-300">Den dazugehörigen Schriftverkehr und die Abmeldung Ihres Fahrzeuges bei der Zulassungsstelle übernehmen wir für Sie.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-200 dark:border-gray-700 dark:bg-gray-800 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Freie Fahrt!</h3>
                <p className="text-gray-700 dark:text-gray-300">Möchten Sie den Verkaufserlös Ihres Autos in ein neues Modell investieren. Auch hier sind Sie bei Auto Ankauf Franken richtig!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Unser Ziel ist Ihre Zufriedenheit</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Lassen Sie jetzt Ihr<br />Auto bewerten!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">kostenlos & unverbindlich</p>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-6" onClick={scrollToForm}>Kostenlose Autobewertung</Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Verkaufen auch Sie Ihren PKW zum Höchstpreis</p>
            <h2 className="text-3xl font-bold mb-8">Nürnberger <span className="text-orange-600">Gebrauchtwagenankauf</span></h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Professioneller <strong>Autoankauf in Nürnberg</strong>: Sie möchten Ihr Auto verkaufen? Dann sind Sie bei Auto Ankauf Franken in Nürnberg genau richtig. Wir haben uns auf den Ankauf und Verkauf aller Automarken und Modelle spezialisiert.</p>
            <h3 className="text-2xl font-bold my-6 text-orange-600">Wir kaufen Unfallwagen Auto</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Ihre Zufriedenheit hat bei uns allerhöchsten Stellenwert. Möchten Sie Ihr Auto verkaufen in Nürnberg? Handelt es sich um ein defektes Auto oder um einen Unfallwagen? Wir von Auto Ankauf Franken kaufen Ihr Auto sicher an.</p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-xl font-bold mb-4">Unser Service</h4>
                <ul className="space-y-2">
                  {["Kostenlose Beratung", "Sofortige Auszahlung des Kaufpreises", "Kostenlose Wertermittlung", "Kostenlose vor Ort Besichtigung", "Kostenlose Abholung", "Kostenlose Abmeldung"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Ihre Vorteile</h4>
                <ul className="space-y-2">
                  {["Sofortiger Autoankauf", "Kostenlose Abholung", "Schnelle Kaufabwicklung", "Zeitersparnis", "Kostenersparnis", "Aufbereitung Ihres Autos"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kundenzufriedenheit Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Kundenzufriedenheit</h2>
          <p className="text-lg max-w-3xl mx-auto">Ihre Zufriedenheit hat bei uns allerhöchste Priorität. Sie möchten uns mit dem Kauf Ihres Autos beauftragen? Wir freuen uns. Über unser online Autoankaufsformular, telefonisch oder per E-Mail können Sie uns jederzeit erreichen.</p>
        </div>
      </section>

      {/* Car Gallery */}
      <section className="py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Unsere Ankäufe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/ankaeufe/ankauf-1.webp",
              "/ankaeufe/ankauf-2.webp",
              "/ankaeufe/ankauf-3.webp",
              "/ankaeufe/ankauf-4.webp",
              "/ankaeufe/ankauf-5.webp",
              "/ankaeufe/ankauf-6.webp",
              "/ankaeufe/ankauf-7.webp",
              "/ankaeufe/ankauf-8.webp",
            ].map((src, i) => (
              <a
                key={i}
                href="#form"
                className="block aspect-video bg-gray-200 dark:bg-gray-900 rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label={`Zum Anfrageformular (Fahrzeug ${i + 1})`}
                onClick={() => {
                  setLeadSource(`purchase_image_${i + 1}`)
                  trackEvent("click_to_form", { click_source: `purchase_image_${i + 1}` })
                }}
              >
                <img
                  src={src}
                  alt={`Ankauf Fahrzeug ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section (no fake reviews, no ratings) */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Warum FrankenAutoAnkauf?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10">
              Transparent, schnell und unverbindlich – so verkaufen Sie Ihr Fahrzeug in Franken ohne Stress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Schnell & unkompliziert", text: "Anfrage senden, Preisvorschlag erhalten, Abholung vereinbaren – oft noch am selben Tag." },
              { title: "Fair & transparent", text: "Klare Kommunikation und nachvollziehbare Bewertung – ohne versteckte Kosten." },
              { title: "Flexible Auszahlung", text: "Barzahlung oder Überweisung – Sie entscheiden, was für Sie am besten passt." },
              { title: "Kostenlose Abholung", text: "Wir holen Ihr Auto bei Ihnen ab – in Nürnberg, Fürth, Erlangen und Umgebung." },
              { title: "Abmeldung auf Wunsch", text: "Wenn Sie möchten, kümmern wir uns um die Abmeldung – schnell und zuverlässig." },
              { title: "Unverbindlich", text: "Sie bleiben jederzeit frei in Ihrer Entscheidung – das Angebot ist kostenlos und unverbindlich." },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-left bg-gray-50 dark:bg-gray-900">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#form"
              onClick={() => {
                setLeadSource("trust_cta")
                trackEvent("click_to_form", { click_source: "trust_cta" })
              }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold transition"
            >
              Jetzt unverbindliches Angebot erhalten
            </a>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Antwort in der Regel innerhalb kurzer Zeit.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Das sagen unsere Kunden</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Beispielhafte Rückmeldungen aus der Region</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ name: "Michael K.", city: "Nürnberg", initials: "MK", text: "Super schnelle und unkomplizierte Abwicklung! Mein Auto wurde fair bewertet." }, { name: "Sandra B.", city: "Fürth", initials: "SB", text: "Ich war skeptisch, aber Auto Ankauf Franken hat mich überzeugt. Professionell und freundlich." }, { name: "Thomas W.", city: "Erlangen", initials: "TW", text: "Mein Unfallwagen wurde problemlos angekauft. Die Abmeldung haben sie auch übernommen." }].map((review, i) => (
              <Card key={i} className="hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-orange-200 mb-2" />
                  <p className="text-gray-700 dark:text-gray-300 mb-4">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 font-bold">{review.initials}</div>
                    <div><p className="font-semibold">{review.name}</p><p className="text-sm text-gray-500">{review.city}</p></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Jetzt kontaktieren!</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Phone className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Telefon</h3>
              <a href="tel:+4917632333561" className="text-orange-600 hover:underline">+49 (0) 176 32333561</a>
            </div>
            <div className="text-center">
              <Mail className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <a href="mailto:info@frankenautoankauf.de" className="text-orange-600 hover:underline">info@frankenautoankauf.de</a>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 text-orange-600 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-bold mb-2">Öffnungszeiten</h3>
              <p className="text-gray-600 dark:text-gray-400">Mo – Sa: 09:00 – 22:00 Uhr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Kontakt</h3>
              <p className="mb-2">Auto Ankauf Franken</p>
              <p className="mb-2">0176 – 323 335 61</p>
              <p className="mb-4">info@frankenautoankauf.de</p>
              <div className="flex gap-3">
                <a href="https://wa.me/4917632333561" className="text-green-400 hover:text-green-300">WhatsApp</a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Städte</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/autoankauf-nuernberg" className="hover:text-orange-400">Autoankauf Nürnberg</Link></li>
                <li><Link href="/autoankauf-fuerth" className="hover:text-orange-400">Autoankauf Fürth</Link></li>
                <li><Link href="/autoankauf-erlangen" className="hover:text-orange-400">Autoankauf Erlangen</Link></li>
                <li><Link href="/autoankauf-bamberg" className="hover:text-orange-400">Autoankauf Bamberg</Link></li>
                <li><Link href="/autoankauf-wuerzburg" className="hover:text-orange-400">Autoankauf Würzburg</Link></li>
                <li><Link href="/autoankauf-regensburg" className="hover:text-orange-400">Autoankauf Regensburg</Link></li>
                <li><Link href="/autoankauf-ingolstadt" className="hover:text-orange-400">Autoankauf Ingolstadt</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Rechtliches</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-orange-400">Startseite</Link></li>
                <li><a href="#form" className="hover:text-orange-400">Kostenlose Bewertung</a></li>
                <li><Link href="/impressum" className="hover:text-orange-400">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-orange-400">Datenschutz</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p className="mb-4">© 2024 Auto Ankauf Franken | Professioneller Autoankauf in Nürnberg & Franken</p>
            <div className="flex justify-center gap-6">
              <Link href="/impressum" className="hover:text-orange-400">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-orange-400">Datenschutz</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a href="https://wa.me/4917632333561" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110" aria-label="WhatsApp">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <a href="tel:+4917632333561" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110" aria-label="Anrufen">
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </div>
  )
}
