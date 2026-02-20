"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, Check, Car, ClipboardCheck, HandshakeIcon, Menu, X, Upload, ImageIcon, Loader2, Sun, Moon } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"
import { carBrands, generateYears, fuelTypes } from "@/data/carData"
import { navItems } from "@/lib/navItems"
import { setLeadSource, getLeadSource, clearLeadSource, gtagEvent } from "@/lib/leadTracking"
import { compressImage } from "@/lib/imageCompression"

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
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { theme, toggleTheme } = useTheme()
  const [selectedFeaturedBrand, setSelectedFeaturedBrand] = useState<string | null>(null)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customBrandModel, setCustomBrandModel] = useState("")
  const formRef = useRef<HTMLDivElement>(null)
  const years = generateYears()
  const [cookieConsent, setCookieConsent] = useState(false)

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
  const [isCompressing, setIsCompressing] = useState(false)

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)

      // Filter valid image files (allow up to 10MB before compression)
      const validFiles = newFiles.filter(file => {
        if (file.size > 10 * 1024 * 1024) {
          setFormError(`Die Datei "${file.name}" ist zu groß. Maximale Größe: 10 MB`)
          return false
        }
        if (!file.type.startsWith('image/')) {
          setFormError(`Die Datei "${file.name}" ist kein gültiges Bild.`)
          return false
        }
        return true
      })

      if (validFiles.length === 0) return

      // Compress images
      setIsCompressing(true)
      setFormError(null)

      try {
        const compressedFiles: File[] = []
        for (const file of validFiles) {
          const compressed = await compressImage(file, { maxSizeMB: 0.5, maxWidthOrHeight: 1920 })
          compressedFiles.push(compressed)
        }

        setSelectedImages(prev => [...prev, ...compressedFiles].slice(0, 5))
      } catch (error) {
        console.error('Compression error:', error)
        setFormError('Fehler beim Komprimieren der Bilder.')
      } finally {
        setIsCompressing(false)
      }
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
    if (!cookieConsent) {
      setFormError("Bitte stimmen Sie der Datenschutzerklärung zu.")
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
        // Set flag for thank you page
        sessionStorage.setItem("form_submitted", "true")
        // Redirect to thank you page
        router.push("/danke")
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


      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg hover:text-orange-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/#form"
                  className="mt-2 px-4 py-3 bg-orange-600 text-white rounded-lg text-center font-semibold hover:bg-orange-700 transition"
                  onClick={() => { setMobileMenuOpen(false); setLeadSource("mobile_menu_cta"); }}
                >
                  Jetzt Angebot anfordern
                </Link>
              </nav>
            </div>
          )}
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
              <img src="/brand-logos/vw.webp" alt="Volkswagen" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </button>

            {/* BMW */}
            <button onClick={() => scrollToFormWithBrand("BMW")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "BMW" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="/brand-logos/bmw.webp" alt="BMW" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </button>

            {/* Mercedes-Benz */}
            <button onClick={() => scrollToFormWithBrand("Mercedes-Benz")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Mercedes-Benz" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="/brand-logos/mercedes.webp" alt="Mercedes-Benz" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </button>

            {/* Audi */}
            <button onClick={() => scrollToFormWithBrand("Audi")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Audi" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="/brand-logos/audi.webp" alt="Audi" className="w-20 h-10 md:w-32 md:h-16 object-contain" />
            </button>

            {/* Opel */}
            <button onClick={() => scrollToFormWithBrand("Opel")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Opel" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="/brand-logos/opel.webp" alt="Opel" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </button>

            {/* Ford */}
            <button onClick={() => scrollToFormWithBrand("Ford")} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl md:rounded-2xl p-4 md:p-8 transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md flex items-center justify-center min-h-[100px] md:min-h-[140px] ${selectedFeaturedBrand === "Ford" ? 'ring-2 ring-orange-500' : ''}`}>
              <img src="/brand-logos/ford.webp" alt="Ford" className="w-20 h-10 md:w-32 md:h-16 object-contain" />
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
                            <p className="text-sm text-gray-600 dark:text-gray-300">Laden Sie bis zu 5 Bilder hoch (werden automatisch komprimiert)</p>
                          </div>
                          <label className="block">
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={selectedImages.length >= 5 || isCompressing} />
                            <div className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg cursor-pointer transition-colors ${selectedImages.length >= 5 || isCompressing ? 'bg-gray-200 text-gray-500' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
                              {isCompressing ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  <span>Bilder werden komprimiert...</span>
                                </>
                              ) : (
                                <>
                                  <ImageIcon className="w-5 h-5" />
                                  <span>{selectedImages.length >= 5 ? 'Maximum erreicht' : 'Bilder auswählen'}</span>
                                </>
                              )}
                            </div>
                          </label>
                          {selectedImages.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-3">
                              {selectedImages.map((file, index) => (
                                <div key={index} className="relative">
                                  <img src={URL.createObjectURL(file)} alt={`Bild ${index + 1}`} className="w-full h-20 object-cover rounded" />
                                  <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm">×</button>
                                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">{(file.size / 1024).toFixed(0)}KB</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Cookie/Privacy Consent Checkbox */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookieConsent}
                          onChange={(e) => setCookieConsent(e.target.checked)}
                          className="w-5 h-5 mt-0.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                          <Link href="/datenschutz" className="text-orange-600 hover:underline" target="_blank">
                            Datenschutzerklärung
                          </Link>{" "}
                          zu und akzeptiere die Verwendung von Cookies. *
                        </span>
                      </label>
                    </div>

                    {formError && (
                      <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                        {formError}
                      </div>
                    )}
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1" onClick={handlePrevStep} disabled={isSubmitting}>Zurück</Button>
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleSubmit} disabled={isSubmitting || !cookieConsent}>
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

      {/* 3 Steps Process - Compact */}
      <section className="py-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">So funktionierts - 3 Schritte</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div><ClipboardCheck className="w-6 h-6 text-orange-600 inline mr-2" /><span className="font-semibold">Formular ausfüllen</span></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div><Car className="w-6 h-6 text-orange-600 inline mr-2" /><span className="font-semibold">Kostenlose Bewertung</span></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div><HandshakeIcon className="w-6 h-6 text-orange-600 inline mr-2" /><span className="font-semibold">Sofortiger Ankauf</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Compact */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
              <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div><span className="font-semibold">Kostenloser Abtransport</span> - Wir holen Ihr Auto ab.</div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
              <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div><span className="font-semibold">Stressfreier Verkauf</span> - Abmeldung inklusive.</div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
              <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div><span className="font-semibold">Sofortige Auszahlung</span> - Bar oder Überweisung.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-10 bg-orange-600 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Jetzt Auto bewerten lassen!</h2>
            <p className="opacity-90">Kostenlos & unverbindlich</p>
          </div>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold" onClick={scrollToForm}>Kostenlose Bewertung</Button>
        </div>
      </section>

      {/* Main Content - Compact */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Autoankauf <span className="text-orange-600">Nürnberg & Franken</span></h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Professioneller Autoankauf - Unfallwagen, defekte Autos, ohne TÜV. Wir kaufen alle Marken und Modelle.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Kostenlose Beratung", "Sofortige Auszahlung", "Kostenlose Abholung", "Kostenlose Abmeldung", "Alle Marken", "Unfallwagen", "Ohne TÜV", "Motorschaden"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700">
                  <Check className="w-4 h-4 text-orange-600 flex-shrink-0" /><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Car Gallery */}
      <section className="py-10 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Unsere Ankäufe</h2>
          {/* Mobile: 2 columns x 2 rows = 4 images, Desktop: 4 columns x 2 rows = 8 images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            {["/ankaeufe/ankauf-1.webp","/ankaeufe/ankauf-2.webp","/ankaeufe/ankauf-3.webp","/ankaeufe/ankauf-4.webp","/ankaeufe/ankauf-5.webp","/ankaeufe/ankauf-6.webp","/ankaeufe/ankauf-7.webp","/ankaeufe/ankauf-8.webp"].map((src, i) => (
              <a
                key={i}
                href="#form"
                className="block aspect-[4/3] rounded-xl overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                onClick={() => { setLeadSource(`purchase_image_${i + 1}`); trackEvent("click_to_form", { click_source: `purchase_image_${i + 1}` }) }}
              >
                <img src={src} alt={`Ankauf ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Compact */}
      <section className="py-8 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-4">Warum wir?</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {["Schnell", "Fair", "Flexibel", "Kostenlos", "Zuverlässig", "Unverbindlich"].map((item, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border dark:border-gray-800">
                <span className="font-semibold text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Häufige Fragen</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {[
              { q: "Wie schnell kann ich mein Auto verkaufen?", a: "Oft noch am selben Tag - kontaktieren Sie uns für einen schnellen Termin." },
              { q: "Kaufen Sie auch Unfallwagen?", a: "Ja, wir kaufen Unfallwagen, defekte Autos und Fahrzeuge ohne TÜV." },
              { q: "Wie erfolgt die Zahlung?", a: "Sofortige Barzahlung oder Überweisung - Sie entscheiden." },
              { q: "Muss ich mein Auto selbst abmelden?", a: "Nein, wir übernehmen die kostenlose Abmeldung für Sie." },
              { q: "Welche Marken kaufen Sie an?", a: "Alle Marken und Modelle - von VW bis Mercedes, BMW bis Opel." },
              { q: "Ist die Bewertung kostenlos?", a: "Ja, die Bewertung ist immer kostenlos und unverbindlich." }
            ].map((faq, i) => (
              <details key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 group overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-orange-600 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <p className="px-4 pb-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Compact */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-4">Kundenstimmen</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[{ name: "Michael K.", city: "Nürnberg", text: "Schnelle Abwicklung, faire Bewertung!" }, { name: "Sandra B.", city: "Fürth", text: "Professionell und freundlich." }, { name: "Thomas W.", city: "Erlangen", text: "Unfallwagen problemlos verkauft." }].map((review, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">"{review.text}"</p>
                <p className="text-xs text-gray-500">{review.name} - {review.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Compact */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:+4917632333561" className="flex items-center gap-2 hover:text-orange-400">
              <Phone className="w-5 h-5" /><span>0176 32333561</span>
            </a>
            <a href="mailto:info@frankenautoankauf.de" className="flex items-center gap-2 hover:text-orange-400">
              <Mail className="w-5 h-5" /><span>info@frankenautoankauf.de</span>
            </a>
            <span className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Mo-Sa: 09:00-22:00</span>
            </span>
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

    </div>
  )
}
