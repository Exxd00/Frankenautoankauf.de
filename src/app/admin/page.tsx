"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Lock,
  Download,
  Image as ImageIcon,
  Palette,
  Map,
  Link as LinkIcon,
  Copy,
  Check,
  LogOut,
  FileText,
  Folder,
  ExternalLink,
  Car
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ADMIN_PASSWORD = "Leavemealone2003+"

// Brand Colors
const brandColors = [
  { name: "Primary Orange", hex: "#EA580C", hsl: "24.6 95% 53.1%", usage: "Buttons, CTAs, Highlights" },
  { name: "Orange Dark", hex: "#C2410C", hsl: "21 90% 41%", usage: "Hover states" },
  { name: "Orange Light", hex: "#FED7AA", hsl: "27 96% 83%", usage: "Backgrounds, Badges" },
  { name: "Green Success", hex: "#22C55E", hsl: "142 71% 45%", usage: "WhatsApp, Success states" },
  { name: "Dark Background", hex: "#0F172A", hsl: "222 47% 11%", usage: "Footer, Dark mode" },
  { name: "Gray Text", hex: "#6B7280", hsl: "220 9% 46%", usage: "Secondary text" },
  { name: "White", hex: "#FFFFFF", hsl: "0 0% 100%", usage: "Backgrounds" },
  { name: "Light Gray", hex: "#F3F4F6", hsl: "220 14% 96%", usage: "Section backgrounds" },
]

// Logo files
const logoFiles = [
  { name: "Logo Main (PNG)", path: "/brand/logo-main.png", size: "Original" },
  { name: "Logo Main (WebP)", path: "/brand/logo-main.webp", size: "Optimized" },
  { name: "Logo Light", path: "/brand/logo-light.png", size: "Light version" },
  { name: "Logo Dark", path: "/brand/logo-dark.png", size: "Dark version" },
  { name: "Logo SVG", path: "/brand/logo.svg", size: "Vector" },
  { name: "Logo 512x512", path: "/brand/logo-512.png", size: "512px" },
  { name: "Logo 256x256", path: "/brand/logo-256.png", size: "256px" },
  { name: "Logo 128x128", path: "/brand/logo-128.png", size: "128px" },
  { name: "Apple Touch Icon", path: "/brand/apple-180.png", size: "180px" },
  { name: "Favicon", path: "/favicon.ico", size: "ICO" },
]

// Site images (Ankäufe)
const siteImages = [
  { name: "Ankauf 1", path: "/ankaeufe/ankauf-1.webp" },
  { name: "Ankauf 2", path: "/ankaeufe/ankauf-2.webp" },
  { name: "Ankauf 3", path: "/ankaeufe/ankauf-3.webp" },
  { name: "Ankauf 4", path: "/ankaeufe/ankauf-4.webp" },
  { name: "Ankauf 5", path: "/ankaeufe/ankauf-5.webp" },
  { name: "Ankauf 6", path: "/ankaeufe/ankauf-6.webp" },
  { name: "Ankauf 7", path: "/ankaeufe/ankauf-7.webp" },
  { name: "Ankauf 8", path: "/ankaeufe/ankauf-8.webp" },
]

// Brand logos
const brandLogos = [
  { name: "VW", path: "/brand-logos/vw.webp" },
  { name: "BMW", path: "/brand-logos/bmw.webp" },
  { name: "Mercedes", path: "/brand-logos/mercedes.webp" },
  { name: "Audi", path: "/brand-logos/audi.webp" },
  { name: "Opel", path: "/brand-logos/opel.webp" },
  { name: "Ford", path: "/brand-logos/ford.webp" },
]

// Sitemaps
const sitemaps = [
  { name: "Main Sitemap Index", path: "/sitemap.xml" },
  { name: "Static Pages", path: "/sitemap-pages.xml" },
  { name: "Cities", path: "/sitemap-cities.xml" },
  { name: "Cases", path: "/sitemap-cases.xml" },
  { name: "Intent Pages", path: "/sitemap-intent.xml" },
  { name: "Case + City (Part 1)", path: "/sitemap-case-city-1.xml" },
  { name: "Case + City (Part 2)", path: "/sitemap-case-city-2.xml" },
  { name: "Case + City (Part 3)", path: "/sitemap-case-city-3.xml" },
]

// Important Links
const importantLinks = [
  { name: "Leads Dashboard", path: "/admin/dashboard", description: "View and manage leads" },
  { name: "Homepage", path: "/", description: "Main website" },
  { name: "Impressum", path: "/impressum", description: "Legal information" },
  { name: "Datenschutz", path: "/datenschutz", description: "Privacy policy" },
  { name: "All Cities", path: "/staedte", description: "City pages overview" },
  { name: "All Cases", path: "/faelle", description: "Case pages overview" },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_resources_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_resources_auth", "true")
      setPasswordError("")
    } else {
      setPasswordError("Falsches Passwort")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_resources_auth")
  }

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(colorName)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const handleDownload = (path: string, filename: string) => {
    const link = document.createElement("a")
    link.href = path
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-gray-700 bg-gray-800/50 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-orange-600/20 rounded-2xl flex items-center justify-center mb-4 border border-orange-500/30">
              <Lock className="w-10 h-10 text-orange-500" />
            </div>
            <CardTitle className="text-2xl text-white">Admin Resources</CardTitle>
            <p className="text-gray-400 text-sm mt-2">frankenautoankauf24.de</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center text-lg bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-2 text-center">{passwordError}</p>
                )}
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Access Resources
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Resources Dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white">Admin Resources</h1>
              <p className="text-xs text-gray-500">frankenautoankauf24.de</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                Leads
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">

        {/* Quick Links */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-orange-600" />
            Quick Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {importantLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{link.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-orange-600" />
            Brand Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {brandColors.map((color) => (
              <Card key={color.name} className="overflow-hidden">
                <div
                  className="h-24 flex items-end p-3"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="text-white text-xs font-mono bg-black/30 px-2 py-1 rounded">
                    {color.hex}
                  </span>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{color.name}</p>
                      <p className="text-xs text-gray-500">{color.usage}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(color.hex, color.name)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedColor === color.name ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-mono text-gray-600 dark:text-gray-400">HEX: {color.hex}</p>
                    <p className="font-mono text-gray-600 dark:text-gray-400">HSL: {color.hsl}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Logo Downloads */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5 text-orange-600" />
            Logo Files
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {logoFiles.map((logo) => (
              <Card key={logo.path} className="group hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center p-4 relative overflow-hidden">
                    <Image
                      src={logo.path}
                      alt={logo.name}
                      width={100}
                      height={100}
                      className="object-contain max-h-full"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDownload(logo.path, logo.name.replace(/\s+/g, '-').toLowerCase() + logo.path.substring(logo.path.lastIndexOf('.')))}
                        className="gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{logo.name}</p>
                  <p className="text-xs text-gray-500">{logo.size}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Site Images (Ankäufe) */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-orange-600" />
            Site Images (Ankäufe)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteImages.map((img) => (
              <Card key={img.path} className="group hover:shadow-md transition-all overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={img.path}
                    alt={img.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownload(img.path, img.name.toLowerCase().replace(/\s+/g, '-') + '.webp')}
                      className="gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{img.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Brand Logos (Car Brands) */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-orange-600" />
            Car Brand Logos
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {brandLogos.map((logo) => (
              <Card key={logo.path} className="group hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="aspect-square bg-white rounded-lg mb-2 flex items-center justify-center p-4 relative overflow-hidden border">
                    <Image
                      src={logo.path}
                      alt={logo.name}
                      width={80}
                      height={80}
                      className="object-contain"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDownload(logo.path, logo.name.toLowerCase() + '.webp')}
                        className="gap-1 text-xs"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-center text-gray-900 dark:text-white">{logo.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sitemaps */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Map className="w-5 h-5 text-orange-600" />
            Sitemaps
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {sitemaps.map((sitemap) => (
                  <div key={sitemap.path} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{sitemap.name}</p>
                        <p className="text-xs text-gray-500 font-mono">https://frankenautoankauf24.de{sitemap.path}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`https://frankenautoankauf24.de${sitemap.path}`, sitemap.name)}
                      >
                        {copiedColor === sitemap.name ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <a href={sitemap.path} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Open
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Important Info */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Important Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Domain & Hosting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Domain:</strong> frankenautoankauf24.de</p>
                <p><strong>Email:</strong> info@frankenautoankauf24.de</p>
                <p><strong>Phone:</strong> +49 176 32333561</p>
                <p><strong>Google Analytics:</strong> G-8B77QCJ58V</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Framework:</strong> Next.js 16</p>
                <p><strong>Styling:</strong> Tailwind CSS</p>
                <p><strong>UI:</strong> shadcn/ui</p>
                <p><strong>Package Manager:</strong> Bun</p>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>FrankenAutoAnkauf24 Admin Resources</p>
        </div>
      </footer>
    </div>
  )
}
