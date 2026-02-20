import type { City } from "@/lib/seo/cities"
import type { Case } from "@/lib/seo/cases"

type FAQ = { question: string; answer: string }

type JsonLdObject = Record<string, unknown>

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://frankenautoankauf.de").replace(/\/$/, "")
}

function pageUrl(pathname: string): string {
  const base = siteUrl()
  return `${base}${pathname.startsWith("/") ? "" : "/"}${pathname}`
}

function idFor(pathname: string, suffix: string) {
  return `${pageUrl(pathname)}#${suffix}`
}

export function buildJsonLd(opts: {
  pathname: string
  title: string
  description: string
  city?: City | null
  caze?: Case | null
  faqs?: FAQ[]
}) {
  const { pathname, title, description, city, caze, faqs = [] } = opts
  const url = pageUrl(pathname)

  const localBusinessId = idFor(pathname, "localbusiness")
  const serviceId = idFor(pathname, "service")
  const breadcrumbId = idFor(pathname, "breadcrumb")

  const localBusiness: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": localBusinessId,
    name: "Franken Auto Ankauf",
    url: siteUrl(),
    telephone: "+49 176 32333561",
    email: "info@frankenautoankauf.de",
    areaServed: city?.name ? city.name : "Franken",
    image: [pageUrl("/favicon.ico")],
  }

  const service: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: title,
    description,
    provider: { "@id": localBusinessId },
    areaServed: city?.name ? city.name : "Franken",
    serviceType: "Autoankauf",
    url,
  }

  const breadcrumb: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: pageUrl("/"),
      },
      ...(city?.name
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: `Autoankauf ${city.name}`,
              item: pageUrl(`/autoankauf-${city.slug}`),
            },
          ]
        : []),
      ...(caze?.title
        ? [
            {
              "@type": "ListItem",
              position: city?.name ? 3 : 2,
              name: caze.title,
              item: pageUrl(`/${caze.slug}`),
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: city?.name && caze?.title ? 4 : city?.name || caze?.title ? 3 : 2,
        name: title,
        item: url,
      },
    ],
  }

  const faqPage: JsonLdObject | null = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": idFor(pathname, "faq"),
        mainEntity: faqs.slice(0, 10).map(f => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null

  // Return an array so we can embed everything in one JSON-LD block.
  return [localBusiness, service, breadcrumb, ...(faqPage ? [faqPage] : [])]
}
