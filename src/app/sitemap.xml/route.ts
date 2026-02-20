import { NextResponse } from "next/server"

import { sitemapIndexXml } from "@/lib/pseo/sitemapHelpers"
import { getBaseUrl, getNowIso } from "@/lib/pseo/sitemapData"

export const runtime = "nodejs"

export function GET() {
  const base = getBaseUrl()
  const lastmod = getNowIso()

  const xml = sitemapIndexXml([
    { loc: base + "/sitemap-pages.xml", lastmod },
    { loc: base + "/sitemap-cases.xml", lastmod },
    { loc: base + "/sitemap-cities.xml", lastmod },
    { loc: base + "/sitemap-intent.xml", lastmod },
    { loc: base + "/sitemap-case-city-1.xml", lastmod },
    { loc: base + "/sitemap-case-city-2.xml", lastmod },
    { loc: base + "/sitemap-case-city-3.xml", lastmod },
  ])

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8", 
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
