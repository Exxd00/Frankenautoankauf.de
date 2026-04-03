import { NextResponse } from "next/server"

import { urlsetXml, type UrlEntry } from "@/lib/pseo/sitemapHelpers"
import { getBaseUrl, getNowIso, intentCityPathsCore } from "@/lib/pseo/sitemapData"

export const runtime = "nodejs"

export function GET() {
  const base = getBaseUrl()
  const lastmod = getNowIso()

  const core = ["/auto-verkaufen-heute", "/auto-verkaufen-sofort"]
  const entries: UrlEntry[] = [
    ...core.map(
      (p): UrlEntry => ({
        loc: base + p,
        lastmod,
        changefreq: "weekly",
        priority: 0.8,
      })
    ),
    ...intentCityPathsCore().map(
      (p): UrlEntry => ({
        loc: base + p,
        lastmod,
        changefreq: "weekly",
        priority: 0.65,
      })
    ),
  ]

  const xml = urlsetXml(entries)

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
