"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Car,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  Euro,
  MessageSquare,
  ArrowLeft,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from "lucide-react"
import Link from "next/link"

interface Lead {
  id: string
  timestamp: string
  brand: string
  model: string
  year: string
  mileage: string
  fuel: string
  priceExpectation: string
  name: string
  email: string
  phone: string
  location: string
  message: string
  image_urls: string[]
  page_url?: string
  referrer?: string
  device_type?: string
}

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [showLightbox, setShowLightbox] = useState(false)

  useEffect(() => {
    // Check auth
    const auth = sessionStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/admin/dashboard")
      return
    }

    fetchLead()
  }, [params.id])

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/admin/dashboard/leads/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setLead(data.lead)
      } else {
        setError("Anfrage nicht gefunden")
      }
    } catch (err) {
      setError("Fehler beim Laden")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return date.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    } catch {
      return timestamp
    }
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  const openWhatsApp = () => {
    if (lead?.phone) {
      const phone = lead.phone.replace(/[^0-9+]/g, "")
      const message = `Hallo ${lead.name}, vielen Dank für Ihre Anfrage bezüglich Ihres ${lead.brand} ${lead.model}. Wann wäre ein guter Zeitpunkt für einen Rückruf?`
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank")
    }
  }

  const callPhone = () => {
    if (lead?.phone) {
      window.location.href = `tel:${lead.phone}`
    }
  }

  const sendEmail = () => {
    if (lead?.email) {
      const subject = `Ihre Anfrage: ${lead.brand} ${lead.model}`
      const body = `Hallo ${lead.name},\n\nvielen Dank für Ihre Anfrage bezüglich Ihres ${lead.brand} ${lead.model} (${lead.year}).\n\nWir werden uns schnellstmöglich bei Ihnen melden.\n\nMit freundlichen Grüßen,\nFrankenAutoAnkauf`
      window.location.href = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-700 mb-4">{error || "Anfrage nicht gefunden"}</p>
            <Link href="/admin/dashboard">
              <Button variant="outline">Zurück zum Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="font-bold text-lg">{lead.brand} {lead.model}</h1>
              <p className="text-sm text-gray-500">{formatDate(lead.timestamp)}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button onClick={callPhone} className="bg-green-600 hover:bg-green-700">
            <Phone className="w-4 h-4 mr-2" />
            Anrufen
          </Button>
          <Button onClick={openWhatsApp} className="bg-[#25D366] hover:bg-[#128C7E]">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            WhatsApp
          </Button>
          <Button onClick={sendEmail} variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            E-Mail
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Vehicle Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="w-5 h-5 text-orange-600" />
                Fahrzeugdaten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Marke</p>
                  <p className="font-semibold">{lead.brand || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Modell</p>
                  <p className="font-semibold">{lead.model || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Baujahr</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {lead.year || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kilometerstand</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Gauge className="w-4 h-4 text-gray-400" />
                    {lead.mileage ? `${Number(lead.mileage).toLocaleString("de-DE")} km` : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kraftstoff</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Fuel className="w-4 h-4 text-gray-400" />
                    {lead.fuel || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Preisvorstellung</p>
                  <p className="font-semibold flex items-center gap-1 text-green-600">
                    <Euro className="w-4 h-4" />
                    {lead.priceExpectation ? `${Number(lead.priceExpectation).toLocaleString("de-DE")} €` : "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-orange-600" />
                Kontaktdaten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => copyToClipboard(lead.name, "name")}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{lead.name}</span>
                </div>
                {copiedField === "name" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </div>

              <div
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => copyToClipboard(lead.phone, "phone")}
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{lead.phone}</span>
                </div>
                {copiedField === "phone" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </div>

              <div
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => copyToClipboard(lead.email, "email")}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-sm">{lead.email}</span>
                </div>
                {copiedField === "email" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{lead.location}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message */}
        {lead.message && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                Nachricht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{lead.message}</p>
            </CardContent>
          </Card>
        )}

        {/* Images */}
        {lead.image_urls && lead.image_urls.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImageIcon className="w-5 h-5 text-orange-600" />
                Bilder ({lead.image_urls.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {lead.image_urls.map((url, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      setSelectedImage(index)
                      setShowLightbox(true)
                    }}
                  >
                    <img
                      src={url}
                      alt={`Bild ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tracking Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Tracking-Informationen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Gerät</p>
                <p className="font-medium">{lead.device_type || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500">Seite</p>
                <p className="font-medium truncate">{lead.page_url || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500">Referrer</p>
                <p className="font-medium truncate">{lead.referrer || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Lightbox */}
      {showLightbox && lead.image_urls && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2"
            onClick={() => setShowLightbox(false)}
          >
            <X className="w-8 h-8" />
          </button>

          {lead.image_urls.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white p-2"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(prev => prev === 0 ? lead.image_urls!.length - 1 : prev - 1)
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="absolute right-4 text-white p-2"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(prev => prev === lead.image_urls!.length - 1 ? 0 : prev + 1)
                }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <img
            src={lead.image_urls[selectedImage]}
            alt={`Bild ${selectedImage + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 text-white text-sm">
            {selectedImage + 1} / {lead.image_urls.length}
          </div>
        </div>
      )}
    </div>
  )
}
