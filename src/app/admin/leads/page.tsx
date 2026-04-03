"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Trash2, RefreshCw, Phone, Mail, MapPin, Car, Calendar, Loader2, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

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
  page_url: string
  click_source: string
  image_urls: string[]
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const authHeader = `Basic ${btoa(`admin:${password}`)}`

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { 'Authorization': authHeader }
      })

      if (res.status === 401) {
        setIsAuthenticated(false)
        setError('Falsches Passwort')
        setLoading(false)
        return
      }

      const data = await res.json()
      setLeads(data.leads || [])
      setIsAuthenticated(true)
    } catch {
      setError('Fehler beim Laden der Leads')
    }
    setLoading(false)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLeads()
  }

  const exportCSV = async () => {
    try {
      const res = await fetch('/api/admin/leads?format=csv', {
        headers: { 'Authorization': authHeader }
      })
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch {
      alert('Export fehlgeschlagen')
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Lead wirklich löschen?')) return

    setDeleting(id)
    try {
      await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': authHeader }
      })
      setLeads(leads.filter(l => l.id !== id))
    } catch {
      alert('Löschen fehlgeschlagen')
    }
    setDeleting(null)
  }

  const formatDate = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return timestamp
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Passwort</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg pr-10 dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Admin-Passwort eingeben"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Anmelden'}
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Standard-Passwort: franken2024
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Lead-Verwaltung
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {leads.length} {leads.length === 1 ? 'Anfrage' : 'Anfragen'} insgesamt
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={fetchLeads} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Aktualisieren
            </Button>
            <Button onClick={exportCSV} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              CSV Export
            </Button>
            <Link href="/">
              <Button variant="outline">Zur Website</Button>
            </Link>
          </div>
        </div>

        {/* Leads Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        ) : leads.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <p>Noch keine Leads vorhanden.</p>
              <p className="text-sm mt-2">Neue Anfragen erscheinen hier automatisch.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leads.map((lead) => (
              <Card key={lead.id} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{lead.name || 'Unbekannt'}</CardTitle>
                      <p className="text-sm text-gray-500">{formatDate(lead.timestamp)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteLead(lead.id)}
                      disabled={deleting === lead.id}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      {deleting === lead.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Vehicle Info */}
                  <div className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    <Car className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">
                      {lead.brand?.toUpperCase()} {lead.model}
                    </span>
                    {lead.year && (
                      <span className="text-gray-500">({lead.year})</span>
                    )}
                  </div>

                  {lead.mileage && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lead.mileage} km • {lead.fuel}
                    </p>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-1 text-sm">
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </a>
                    )}
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </a>
                    )}
                    {lead.location && (
                      <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {lead.location}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  {lead.message && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-2 rounded italic">
                      "{lead.message}"
                    </p>
                  )}

                  {/* Images */}
                  {lead.image_urls && lead.image_urls.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {lead.image_urls.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={url}
                            alt={`Bild ${i + 1}`}
                            className="w-16 h-16 object-cover rounded border hover:opacity-80"
                          />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Source */}
                  {lead.click_source && (
                    <p className="text-xs text-gray-400">
                      Quelle: {lead.click_source}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
