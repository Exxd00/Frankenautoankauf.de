type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export type UrlEntry = {
  loc: string
  lastmod?: string
  changefreq?: ChangeFreq
  priority?: number
}

export type SitemapRef = {
  loc: string
  lastmod?: string
}

function esc(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function urlsetXml(entries: UrlEntry[]) {
  const parts: string[] = []
  parts.push('<?xml version="1.0" encoding="UTF-8"?>')
  parts.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

  for (const e of entries) {
    const loc = esc(e.loc)
    parts.push('<url>')
    parts.push(`<loc>${loc}</loc>`) 
    if (e.lastmod) parts.push(`<lastmod>${esc(e.lastmod)}</lastmod>`)
    if (e.changefreq) parts.push(`<changefreq>${esc(e.changefreq)}</changefreq>`)
    if (typeof e.priority === 'number') parts.push(`<priority>${e.priority.toFixed(2)}</priority>`)
    parts.push('</url>')
  }

  parts.push('</urlset>')
  return parts.join('')
}

export function sitemapIndexXml(entries: SitemapRef[]) {
  const parts: string[] = []
  parts.push('<?xml version="1.0" encoding="UTF-8"?>')
  parts.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

  for (const e of entries) {
    parts.push('<sitemap>')
    parts.push(`<loc>${esc(e.loc)}</loc>`) 
    if (e.lastmod) parts.push(`<lastmod>${esc(e.lastmod)}</lastmod>`)
    parts.push('</sitemap>')
  }

  parts.push('</sitemapindex>')
  return parts.join('')
}

export function isoDate(d: Date) {
  return d.toISOString()
}
