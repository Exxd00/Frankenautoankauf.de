import { CASE_BY_SLUG, CASES } from "./cases"
import { CITY_BY_SLUG, CITIES } from "./cities"

export type ResolvedPage =
  | { kind: "case"; caseSlug: string }
  | { kind: "case_city"; caseSlug: string; citySlug: string }

/**
 * Accepts:
 * - case page: /auto-verkaufen-ohne-tuev
 * - combo page: /auto-verkaufen-ohne-tuev-nuernberg
 */
export function resolveSlug(slug: string): ResolvedPage | null {
  if (CASE_BY_SLUG.has(slug)) return { kind: "case", caseSlug: slug }

  // Try split by last '-' block(s) matching a city slug
  // City slugs can contain dashes (bad-windsheim, neustadt-an-der-aisch, ...)
  for (const city of CITIES) {
    const suffix = `-${city.slug}`
    if (slug.endsWith(suffix)) {
      const caseSlug = slug.slice(0, -suffix.length)
      if (CASE_BY_SLUG.has(caseSlug)) {
        return { kind: "case_city", caseSlug, citySlug: city.slug }
      }
    }
  }
  return null
}

export function getCase(caseSlug: string) {
  return CASE_BY_SLUG.get(caseSlug) || null
}

export function getCity(citySlug: string) {
  return CITY_BY_SLUG.get(citySlug) || null
}

export function allCaseSlugs(): string[] {
  return CASES.map(c => c.slug)
}

export function allComboSlugs(): string[] {
  const out: string[] = []
  for (const c of CASES) {
    for (const city of CITIES) {
      out.push(`${c.slug}-${city.slug}`)
    }
  }
  return out
}
