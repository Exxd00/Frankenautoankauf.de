import Link from "next/link"
import { pseoCities } from "@/lib/pseo/pseoCities"

export const metadata = {
  title: "Auto Ankauf Städte – Franken Auto Ankauf",
  description:
    "Auto verkaufen in allen Städten in Franken. Wir kaufen Ihr Auto schnell, seriös und unkompliziert – auch ohne TÜV oder mit Schaden.",
}

type CityItem = {
  cityKey: string
  name: string
}

export default function StaedtePage() {
  const cities: CityItem[] = Object.keys(pseoCities)
    .map((k) => ({
      cityKey: k,
      name: (pseoCities as Record<string, { name: string }>)[k].name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "de"))

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Auto Ankauf in allen Städten</h1>

      <p className="mb-10 text-muted-foreground">
        Wählen Sie Ihre Stadt aus. Wir kaufen Ihr Auto schnell und zuverlässig –
        unabhängig von Zustand oder Laufleistung.
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cities.map((c) => (
          <li key={c.cityKey} className="rounded-lg border p-4 transition hover:bg-muted">
            <Link href={`/autoankauf/${c.cityKey}`} className="block font-medium hover:underline">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
