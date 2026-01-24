import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto Ankauf Franken | Autoankauf Nürnberg - Bestpreis Garantie",
  description: "Autoankauf in Nürnberg und Franken. Wir kaufen Ihr Auto zum Bestpreis! Unfallwagen, defekte Autos, ohne TÜV - sofortige Barauszahlung. Kostenlose Bewertung & Abholung. ☎ +49 176 32333561",
  keywords: [
    "Autoankauf Nürnberg",
    "Auto verkaufen Nürnberg",
    "Gebrauchtwagen Ankauf",
    "Unfallwagen Ankauf",
    "Auto Ankauf Franken",
    "PKW Ankauf",
    "Fahrzeugankauf",
    "Auto verkaufen ohne TÜV",
    "Defektes Auto verkaufen",
    "Motorschaden Ankauf",
    "Autoankauf Fürth",
    "Autoankauf Erlangen",
    "Autoankauf Bayern"
  ],
  authors: [{ name: "Auto Ankauf Franken" }],
  creator: "Auto Ankauf Franken",
  publisher: "Auto Ankauf Franken",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://frankenautoankauf.de",
    siteName: "Auto Ankauf Franken",
    title: "Auto Ankauf Franken | Autoankauf Nürnberg zum Bestpreis",
    description: "Verkaufen Sie Ihr Auto schnell und einfach! Wir kaufen alle Fahrzeuge - auch Unfallwagen, defekte Autos & ohne TÜV. Sofortige Barauszahlung!",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Auto Ankauf Franken - Autoankauf Nürnberg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Ankauf Franken | Autoankauf Nürnberg",
    description: "Verkaufen Sie Ihr Auto zum Bestpreis! Kostenlose Bewertung & sofortige Auszahlung.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://frankenautoankauf.de",
  },
  category: "Automotive",
};

// Structured Data for Google Rich Snippets
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Auto Ankauf Franken",
  "description": "Professioneller Autoankauf in Nürnberg und Franken. Wir kaufen Ihr Auto zum Bestpreis - auch Unfallwagen, defekte Autos und Fahrzeuge ohne TÜV.",
  "url": "https://frankenautoankauf.de",
  "telephone": "+49-176-32333561",
  "email": "info@frankenautoankauf.de",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nürnberg",
    "addressRegion": "Bayern",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "49.4521",
    "longitude": "11.0767"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "22:00"
  },
  "priceRange": "€€",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "49.4521",
      "longitude": "11.0767"
    },
    "geoRadius": "100000"
  },
  "sameAs": [],
  // Hinweis: Kein AggregateRating ohne verifizierbare, öffentlich einsehbare Reviews.
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Auto Ankauf Franken",
  "image": "https://frankenautoankauf.de/brand/logo-light.png",
  "telephone": "+49-176-32333561",
  "email": "info@frankenautoankauf.de",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nürnberg",
    "addressRegion": "Bayern",
    "postalCode": "90402",
    "addressCountry": "DE"
  },
  "priceRange": "€€",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "22:00"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#EA580C" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YGLT1K9TFD"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-YGLT1K9TFD');
          `}
        </Script>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
        />

        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
