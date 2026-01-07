"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, Check, Car, ClipboardCheck, HandshakeIcon, Menu, X, Star, Quote, Upload, ImageIcon, Loader2, Sun, Moon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"
import { Logo } from "@/components/Logo"

// Car models by brand
const carModels: Record<string, string[]> = {
  audi: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron", "RS3", "RS4", "RS5", "RS6", "RS7"],
  bmw: ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "8er", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX", "M3", "M4", "M5"],
  mercedes: ["A-Klasse", "B-Klasse", "C-Klasse", "E-Klasse", "S-Klasse", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Klasse", "AMG GT", "EQA", "EQB", "EQC", "EQE", "EQS"],
  volkswagen: ["Polo", "Golf", "Passat", "Arteon", "T-Cross", "T-Roc", "Tiguan", "Touareg", "ID.3", "ID.4", "ID.5", "Caddy", "Transporter", "Multivan", "Touran", "Sharan", "up!"],
  opel: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Zafira", "Combo", "Vivaro", "Movano", "Adam", "Karl"],
  ford: ["Fiesta", "Focus", "Mondeo", "Puma", "Kuga", "Explorer", "Mustang", "Ranger", "Transit", "Galaxy", "S-Max", "EcoSport", "Edge"],
  toyota: ["Yaris", "Corolla", "Camry", "Prius", "C-HR", "RAV4", "Highlander", "Land Cruiser", "Supra", "Aygo", "Proace", "Hilux"],
  honda: ["Jazz", "Civic", "Accord", "HR-V", "CR-V", "e", "NSX", "Insight"],
  hyundai: ["i10", "i20", "i30", "i40", "Kona", "Tucson", "Santa Fe", "Ioniq", "Ioniq 5", "Ioniq 6", "Nexo", "Bayon"],
  kia: ["Picanto", "Rio", "Ceed", "Stinger", "Niro", "Sportage", "Sorento", "EV6", "Soul", "Stonic", "XCeed"],
  nissan: ["Micra", "Juke", "Qashqai", "X-Trail", "Ariya", "Leaf", "GT-R", "370Z", "Navara", "Pathfinder"],
  mazda: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-60", "MX-5", "MX-30"],
  peugeot: ["108", "208", "308", "408", "508", "2008", "3008", "5008", "Rifter", "Traveller", "Partner", "Expert"],
  renault: ["Twingo", "Clio", "Megane", "Talisman", "Captur", "Kadjar", "Koleos", "Scenic", "Espace", "Zoe", "Kangoo", "Trafic", "Master"],
  fiat: ["500", "500X", "500L", "Panda", "Tipo", "Punto", "Doblo", "Ducato", "Fiorino"],
  skoda: ["Fabia", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq", "Citigo"],
  seat: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco", "Mii", "Alhambra"],
  volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40", "EX30", "EX90"],
  porsche: ["911", "718 Boxster", "718 Cayman", "Panamera", "Cayenne", "Macan", "Taycan"],
  mini: ["Mini 3-Türer", "Mini 5-Türer", "Mini Cabrio", "Mini Clubman", "Mini Countryman", "Mini Electric"],
  citroen: ["C1", "C3", "C4", "C5 X", "C3 Aircross", "C5 Aircross", "Berlingo", "SpaceTourer", "Jumpy", "Jumper"],
  dacia: ["Sandero", "Logan", "Duster", "Jogger", "Spring"],
  smart: ["fortwo", "forfour", "EQ fortwo", "EQ forfour", "#1"],
  tesla: ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck", "Roadster"],
  andere: ["Sonstiges Modell"]
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { theme, toggleTheme } = useTheme()
  const [formData, setFormData] = useState({
    // Step 1 - Vehicle info
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    // Step 2 - Personal info
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      // Filter files larger than 2MB
      const validFiles = newFiles.filter(file => {
        if (file.size > 2 * 1024 * 1024) {
          alert(`Die Datei "${file.name}" ist zu groß. Maximale Größe: 2 MB`)
          return false
        }
        return true
      })
      setSelectedImages(prev => [...prev, ...validFiles].slice(0, 5)) // Max 5 images
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleBrandChange = (brand: string) => {
    setFormData({ ...formData, brand, model: "" }) // Reset model when brand changes
  }

  const handleNextStep = () => {
    if (formData.brand && formData.model && formData.year && formData.mileage && formData.fuel) {
      setCurrentStep(2)
    } else {
      alert("Bitte füllen Sie alle Fahrzeugdaten aus.")
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(1)
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.")
      return
    }

    setIsSubmitting(true)

    try {
      // Send directly to Web3Forms from client-side
      const emailContent = `
Neue Auto-Ankauf Anfrage

FAHRZEUGDATEN:
- Marke: ${formData.brand?.toUpperCase()}
- Modell: ${formData.model}
- Baujahr: ${formData.year}
- Kilometerstand: ${formData.mileage} km
- Kraftstoff: ${formData.fuel}

KONTAKTDATEN:
- Name: ${formData.name}
- E-Mail: ${formData.email}
- Telefon: ${formData.phone}
- Standort: ${formData.location}

NACHRICHT:
${formData.message || 'Keine Nachricht'}

BILDER:
${selectedImages.length > 0 ? `${selectedImages.length} Bild(er) wurden hochgeladen` : 'Keine Bilder'}

---
Gesendet über frankenautoankauf.de
      `.trim()

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'e8acefc7-aec2-4eb2-96c7-b2bbb664d5be',
          subject: `Neue Anfrage: ${formData.brand?.toUpperCase()} ${formData.model} (${formData.year})`,
          from_name: formData.name,
          replyto: formData.email,
          message: emailContent,
          kunde_name: formData.name,
          kunde_email: formData.email,
          kunde_telefon: formData.phone,
          kunde_standort: formData.location,
          fahrzeug: `${formData.brand?.toUpperCase()} ${formData.model} ${formData.year}`
        })
      })

      const result = await response.json()
      console.log('Web3Forms response:', result)

      if (result.success) {
        setFormSubmitted(true)
      } else {
        console.error('Web3Forms error:', result)
        alert("Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.")
      }
    } catch (error) {
      console.error('Error:', error)
      alert("Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen relative bg-background text-foreground">
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center text-sm">
          <div>Wir kaufen Ihr Auto</div>
          <div className="flex gap-4 flex-wrap">
            <a href="mailto:info@frankenautoankauf.de" className="flex items-center gap-2 hover:text-orange-600">
              <Mail className="w-4 h-4" />
              Schreiben Sie uns
            </a>
            <a href="tel:+4917632333561" className="flex items-center gap-2 hover:text-orange-600">
              <Phone className="w-4 h-4" />
              0176 - 323 335 61
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="w-12 h-12" />
              <div>
                <h1 className="font-bold text-xl">Auto Ankauf</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Franken</p>
              </div>
            </Link>
            <nav className="hidden md:flex gap-6">
              <a href="#form" className="hover:text-orange-600 transition">Auto verkaufen</a>
              <Link href="/unfall-auto" className="hover:text-orange-600 transition">Unfall Auto verkaufen</Link>
              <Link href="/ohne-tuev" className="hover:text-orange-600 transition">Auto verkaufen ohne TÜV</Link>
              <Link href="/defektes-auto" className="hover:text-orange-600 transition">Defektes Auto verkaufen</Link>
            </nav>
            <div className="flex items-center gap-2">
              {/* Theme Toggle Button */}
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
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <a href="#form" className="hover:text-orange-600 transition py-2 border-t dark:border-gray-700" onClick={() => setMobileMenuOpen(false)}>Auto verkaufen</a>
              <Link href="/unfall-auto" className="hover:text-orange-600 transition py-2 border-t dark:border-gray-700">Unfall Auto verkaufen</Link>
              <Link href="/ohne-tuev" className="hover:text-orange-600 transition py-2 border-t dark:border-gray-700">Auto verkaufen ohne TÜV</Link>
              <Link href="/defektes-auto" className="hover:text-orange-600 transition py-2 border-t border-b dark:border-gray-700">Defektes Auto verkaufen</Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
            Autoankauf in Nürnberg – seriös & fair
          </h2>
          <p className="text-xl md:text-2xl opacity-90 animate-fade-in-up delay-200">
            Wir kaufen Ihr Auto zum Bestpreis!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-16 bg-gray-50 dark:bg-gray-900 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className={`${currentStep === 1 ? 'bg-orange-600' : 'bg-gray-400 dark:bg-gray-600'} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold transition-colors`}>
                  1
                </div>
                <p className={`font-semibold ${currentStep === 1 ? 'text-foreground' : 'text-gray-400'}`}>FAHRZEUG</p>
              </div>
              <div className={`text-center ${currentStep === 2 ? '' : 'opacity-50'}`}>
                <div className={`${currentStep === 2 ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-700'} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold transition-colors`}>
                  2
                </div>
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
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ihre Anfrage:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Fahrzeug: <span className="font-medium">{formData.brand.toUpperCase()} {formData.model} ({formData.year})</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Kilometerstand: <span className="font-medium">{formData.mileage} km</span>
                      </p>
                      {selectedImages.length > 0 && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Bilder: <span className="font-medium">{selectedImages.length} Bild(er) hochgeladen</span>
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                      Eine Bestätigung wurde an <span className="font-medium">{formData.email}</span> gesendet.
                    </p>
                  </div>
                ) : currentStep === 1 ? (
                  <>
                    <h3 className="text-2xl font-bold mb-4 text-orange-600">Kostenlose Autobewertung</h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">Wir kaufen Ihr Auto noch heute bei Ihnen!</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {/* Brand Select */}
                      <Select onValueChange={handleBrandChange} value={formData.brand}>
                        <SelectTrigger>
                          <SelectValue placeholder="Bitte Automarke wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="audi">Audi</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                          <SelectItem value="volkswagen">Volkswagen</SelectItem>
                          <SelectItem value="opel">Opel</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="hyundai">Hyundai</SelectItem>
                          <SelectItem value="kia">Kia</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="mazda">Mazda</SelectItem>
                          <SelectItem value="peugeot">Peugeot</SelectItem>
                          <SelectItem value="renault">Renault</SelectItem>
                          <SelectItem value="fiat">Fiat</SelectItem>
                          <SelectItem value="skoda">Skoda</SelectItem>
                          <SelectItem value="seat">Seat</SelectItem>
                          <SelectItem value="volvo">Volvo</SelectItem>
                          <SelectItem value="porsche">Porsche</SelectItem>
                          <SelectItem value="mini">Mini</SelectItem>
                          <SelectItem value="citroen">Citroën</SelectItem>
                          <SelectItem value="dacia">Dacia</SelectItem>
                          <SelectItem value="smart">Smart</SelectItem>
                          <SelectItem value="tesla">Tesla</SelectItem>
                          <SelectItem value="andere">Andere</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Model Select - Dynamic based on brand */}
                      <Select
                        onValueChange={(value) => setFormData({...formData, model: value})}
                        value={formData.model}
                        disabled={!formData.brand}
                      >
                        <SelectTrigger className={!formData.brand ? "opacity-50" : ""}>
                          <SelectValue placeholder={formData.brand ? "Bitte Modell wählen" : "Erst Marke wählen"} />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.brand && carModels[formData.brand]?.map((model) => (
                            <SelectItem key={model} value={model}>{model}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Year Select */}
                      <Select onValueChange={(value) => setFormData({...formData, year: value})} value={formData.year}>
                        <SelectTrigger>
                          <SelectValue placeholder="Bitte Baujahr wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="2019">2019</SelectItem>
                          <SelectItem value="2018">2018</SelectItem>
                          <SelectItem value="2017">2017</SelectItem>
                          <SelectItem value="2016">2016</SelectItem>
                          <SelectItem value="2015">2015</SelectItem>
                          <SelectItem value="2014">2014</SelectItem>
                          <SelectItem value="2013">2013</SelectItem>
                          <SelectItem value="2012">2012</SelectItem>
                          <SelectItem value="2011">2011</SelectItem>
                          <SelectItem value="2010">2010</SelectItem>
                          <SelectItem value="2009">2009</SelectItem>
                          <SelectItem value="2008">2008</SelectItem>
                          <SelectItem value="2007">2007</SelectItem>
                          <SelectItem value="2006">2006</SelectItem>
                          <SelectItem value="2005">2005</SelectItem>
                          <SelectItem value="older">Älter</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* Mileage Input */}
                      <Input
                        placeholder="Ihr Kilometerstand (ungefähr)"
                        type="number"
                        value={formData.mileage}
                        onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                      />

                      {/* Fuel Type Select */}
                      <Select onValueChange={(value) => setFormData({...formData, fuel: value})} value={formData.fuel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Bitte Kraftstoffart wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="benzin">Benzin</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="elektro">Elektro</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="plugin-hybrid">Plug-in Hybrid</SelectItem>
                          <SelectItem value="gas">Gas (LPG/CNG)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700 hover:scale-[1.02] transition-transform"
                      onClick={handleNextStep}
                    >
                      Weiter
                    </Button>
                  </>
                ) : (
                  /* Step 2 - Personal Information */
                  <>
                    <h3 className="text-2xl font-bold mb-4 text-orange-600">Persönliche Angaben</h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <Input
                        placeholder="Ihr Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="border-gray-300"
                      />
                      <Input
                        placeholder="Ihre E-Mail Adresse"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="border-gray-300"
                      />
                      <Input
                        placeholder="Ihre Telefonnummer"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="border-gray-300"
                      />
                      <Input
                        placeholder="Wo befindet sich Ihr Auto? (PLZ oder Ort)"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="border-gray-300"
                      />
                    </div>

                    <Textarea
                      placeholder="Möchten Sie uns sonst noch etwas mitteilen?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="mb-4 min-h-[100px] border-gray-300"
                    />

                    <div className="mb-6">
                      <p className="font-semibold mb-3">Möchten Sie Bilder und Dateien hochladen?</p>
                      <div className="flex gap-6 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="wantUpload"
                            value="ja"
                            checked={formData.wantUpload === "ja"}
                            onChange={(e) => setFormData({...formData, wantUpload: e.target.value})}
                            className="w-4 h-4 text-orange-600"
                          />
                          <span>Ja</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="wantUpload"
                            value="nein"
                            checked={formData.wantUpload === "nein"}
                            onChange={(e) => {
                              setFormData({...formData, wantUpload: e.target.value})
                              setSelectedImages([])
                            }}
                            className="w-4 h-4 text-orange-600"
                          />
                          <span>Nein</span>
                        </label>
                      </div>

                      {/* Image Upload Section */}
                      {formData.wantUpload === "ja" && (
                        <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 bg-orange-50 dark:bg-gray-800">
                          <div className="text-center mb-4">
                            <Upload className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300">Laden Sie bis zu 5 Bilder Ihres Fahrzeugs hoch</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">(JPG, PNG - max. 5 MB pro Bild)</p>
                          </div>

                          <label className="block">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={selectedImages.length >= 5}
                            />
                            <div className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg cursor-pointer transition-colors ${
                              selectedImages.length >= 5
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-orange-600 text-white hover:bg-orange-700'
                            }`}>
                              <ImageIcon className="w-5 h-5" />
                              <span>{selectedImages.length >= 5 ? 'Maximum erreicht' : 'Bilder auswählen'}</span>
                            </div>
                          </label>

                          {/* Preview selected images */}
                          {selectedImages.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Ausgewählte Bilder ({selectedImages.length}/5):
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {selectedImages.map((file, index) => (
                                  <div key={index} className="relative group">
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                                      <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Bild ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeImage(index)}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-md"
                                    >
                                      ×
                                    </button>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{file.name}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Detaillierte Informationen zum Umgang mit Nutzerdaten finden Sie in unserer{" "}
                      <a href="#" className="text-orange-600 hover:underline">Datenschutzbestimmungen</a>
                    </p>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={handlePrevStep}
                        disabled={isSubmitting}
                      >
                        Zurück
                      </Button>
                      <Button
                        className="flex-1 bg-orange-600 hover:bg-orange-700 hover:scale-[1.02] transition-transform disabled:opacity-70"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Wird gesendet...
                          </>
                        ) : (
                          'Kostenloses Angebot einholen'
                        )}
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
          <h2 className="text-3xl font-bold text-center mb-4">
            So funktionierts - In nur 3 Schritten Ihren Gebrauchtwagen verkaufen
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-2xl group-hover:bg-orange-700 transition-colors">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-orange-600">DAS ANFRAGENFORMULAR AUSFÜLLEN</h3>
              <div className="mb-4">
                <ClipboardCheck className="w-24 h-24 mx-auto text-orange-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-2xl group-hover:bg-orange-700 transition-colors">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-orange-600">KOSTENLOSE AUTOBEWERTUNG VON UNSEREN EXPERTEN VOR ORT</h3>
              <div className="mb-4">
                <Car className="w-24 h-24 mx-auto text-orange-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-bold text-2xl group-hover:bg-orange-700 transition-colors">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-orange-600">WIR KAUFEN IHR AUTO NOCH AM GLEICHEN TAG AN</h3>
              <div className="mb-4">
                <HandshakeIcon className="w-24 h-24 mx-auto text-orange-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-200 dark:border-gray-700 dark:bg-gray-800 hover:border-orange-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Kostenloses Abtransport Ihres verkauften PKWs</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Beim Autoankauf in Nürnberg übernehmen wir den kostenlosen Abtransport Ihres verkauften PKWs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 dark:border-gray-700 dark:bg-gray-800 hover:border-orange-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Stressfreier Autoverkauf durch unser umfangreiches Serviceangebot</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Den dazugehörigen Schriftverkehr und die Abmeldung Ihres Fahrzeuges bei der Zulassungsstelle übernehmen wir für Sie.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 dark:border-gray-700 dark:bg-gray-800 hover:border-orange-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Freie Fahrt!</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Möchten Sie den Verkaufserlös Ihres Autos in ein neues Modell investieren. Auch hier sind Sie bei Auto Ankauf Franken richtig!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Unser Ziel ist Ihre Zufriedenheit</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Lassen Sie jetzt Ihr<br />Auto bewerten!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">kostenlos & unverbindlich</p>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6">
            Kostenlose Autobewertung
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Verkaufen auch Sie Ihren PKW zum Höchstpreis</p>
            <h2 className="text-3xl font-bold mb-8">Nürnberger <span className="text-orange-600">Gebrauchtwagenankauf</span></h2>

            <div className="prose max-w-none dark:prose-invert">
              <p className="mb-4">
                Professioneller <strong>Autoankauf in Nürnberg</strong>: Sie möchten Ihr Auto verkaufen? Dann sind Sie bei Auto Ankauf Franken in Nürnberg genau richtig. Wir haben uns auf den Ankauf und Verkauf aller Automarken und Modelle spezialisiert. Langjährige Marktkenntnis und viele Serviceleistungen zu Ihrem Autoverkauf haben schon viele unserer Stammkunden begeistert. Ihre Zufriedenheit liegt uns am Herzen.
              </p>

              <h3 className="text-2xl font-bold my-6">
                <span className="text-orange-600">Wir</span> <span className="text-orange-600">kaufen</span> <span className="text-orange-600">Unfallwagen</span> <span className="text-orange-600">Auto</span>
              </h3>

              <p className="mb-4">
                Ihre Zufriedenheit hat bei uns allerhöchsten Stellenwert. Möchten Sie Ihr Auto verkaufen in Nürnberg? Handelt es sich um ein defektes Auto oder um einen Unfallwagen? Wir von Auto Ankauf Franken kaufen Ihr <strong>Auto</strong> sicher an. Wir sind Ihr zuverlässiger Ansprechpartner im Bereich Autoankauf und <strong>Verkauf</strong>. Mit unseren Serviceleistungen wird der <strong>Autoverkauf</strong> für Sie ganz bequem von statten gehen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-xl font-bold mb-4">Unser Service</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Kostenlose Beratung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Sofortige Auszahlung des Kaufpreises, auf Wunsch in bar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Kostenlose transparente Wertermittlung des Fahrzeuges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Kostenlose vor Ort Besichtigung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Kostenlose Abholung des Fahrzeuges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Kostenlose Abmeldung bei der Zulassungsstelle</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">Ihre Vorteile</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Sofortiger Autoankauf</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Kostenlose Abholung Ihres Autos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Schnelle und einfache Kaufabwicklung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Zeitersparnis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Kostenersparnis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>evtl. Aufbereitung Ihres Autos</span>
                  </li>
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
          <p className="text-lg max-w-3xl mx-auto">
            Ihre Zufriedenheit hat bei uns allerhöchste Priorität. Sie möchten uns mit dem Kauf Ihres Autos beauftragen? Wir freuen uns. Über unser online Autoankaufsformular, telefonisch oder per E-Mail können Sie uns jederzeit erreichen.
          </p>
        </div>
      </section>

      {/* Car Gallery */}
      <section className="py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Unsere Ankäufe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop", alt: "BMW Ankauf" },
              { src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop", alt: "Mercedes Ankauf" },
              { src: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop", alt: "Audi Ankauf" },
              { src: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop", alt: "Volkswagen Ankauf" },
              { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop", alt: "Porsche Ankauf" },
              { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop", alt: "Sports Car Ankauf" },
              { src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop", alt: "Luxury Car Ankauf" },
              { src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop", alt: "SUV Ankauf" },
            ].map((car, i) => (
              <div key={i} className="aspect-video bg-gray-200 dark:bg-gray-900 rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <img
                  src={car.src}
                  alt={car.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Das sagen unsere Kunden</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Über 1000 zufriedene Kunden vertrauen uns</p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-orange-200 mb-2" />
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "Super schnelle und unkomplizierte Abwicklung! Mein Auto wurde fair bewertet und ich hatte das Geld noch am gleichen Tag. Absolut zu empfehlen!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    MK
                  </div>
                  <div>
                    <p className="font-semibold">Michael K.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nürnberg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-orange-200 mb-2" />
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "Ich war skeptisch, aber Auto Ankauf Franken hat mich überzeugt. Professionell, freundlich und der beste Preis den ich gefunden habe. Vielen Dank!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    SB
                  </div>
                  <div>
                    <p className="font-semibold">Sandra B.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fürth</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-orange-200 mb-2" />
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "Mein Unfallwagen wurde problemlos angekauft. Die Abmeldung haben sie auch komplett übernommen. Besser geht es nicht! 5 Sterne!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    TW
                  </div>
                  <div>
                    <p className="font-semibold">Thomas W.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Erlangen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Der Ablauf beim Autoankauf in Nürnberg</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Schritt 1 – Kostenloses Preisangebot</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Durch Angabe Ihrer Daten im online Autoankaufsformular erhalten Sie ein kostenloses und unverbindliches Erstangebot zu Ihrem Fahrzeug.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Schritt 2 – Der Kaufvertrag und die Auszahlung</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Wir führen eine kostenlose Fahrzeugbewertung Ihres Autos vor Ort durch. Den Wert Ihres Autos nehmen wir als Anhaltspunkt, um so den Kaufpreis für Ihr Auto gemeinsam mit Ihnen zu erstellen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Schritt 3 – Fahrzeugabmeldung</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Wir übernehmen die Abmeldung Ihres Autos bei der Zulassungsbehörde. Ebenso erledigen wir den anfallenden Schriftverkehr für Sie.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Jetzt kontaktieren!</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Wir sind nur ein Anruf entfernt.</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Phone className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Telefon</h3>
              <a href="tel:+4917632333561" className="text-orange-600 hover:underline">
                +49 (0) 176 32333561
              </a>
            </div>

            <div className="text-center">
              <Mail className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <a href="mailto:info@frankenautoankauf.de" className="text-orange-600 hover:underline">
                info@frankenautoankauf.de
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 text-orange-600 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Öffnungszeiten</h3>
              <p className="text-gray-600 dark:text-gray-400">Montag – Samstag</p>
              <p className="text-gray-600 dark:text-gray-400">09:00 Uhr – 22:00 Uhr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Kontakt</h3>
              <p className="mb-2">Auto Ankauf Franken</p>
              <p className="mb-2">0176 – 323 335 61</p>
              <p>info@frankenautoankauf.de</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Seiten</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-orange-400">Startseite</Link></li>
                <li><a href="#form" className="hover:text-orange-400">Kostenlose Autobewertung</a></li>
                <li><Link href="/impressum" className="hover:text-orange-400">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-orange-400">Datenschutz</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Meistgesucht</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-400">Audi Ankauf</a></li>
                <li><a href="#" className="hover:text-orange-400">BMW Ankauf</a></li>
                <li><a href="#" className="hover:text-orange-400">Mercedes Ankauf</a></li>
                <li><a href="#" className="hover:text-orange-400">VW Ankauf</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p className="mb-4">© 2024 Auto Ankauf Franken | Professioneller Autoankauf in Nürnberg & Franken</p>
            <div className="flex justify-center gap-6">
              <Link href="/impressum" className="hover:text-orange-400 transition">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-orange-400 transition">Datenschutz</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a
          href="https://wa.me/4917632333561"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
        <a
          href="tel:+4917632333561"
          onClick={(e) => {
            // For mobile devices, the tel: link works directly
            // For desktop, show the number in an alert
            if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
              e.preventDefault()
              alert("Rufen Sie uns an: +49 176 32333561")
            }
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="Anrufen"
          title="Anrufen: +49 176 32333561"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </div>
  )
}
