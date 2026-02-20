import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { pseoCasesList } from "@/lib/pseo/pseoCases"

export const metadata: Metadata = {
  title: "Auto verkaufen in Franken | Fälle & schnelle Abwicklung",
  description:
    "Alle häufigen Fälle rund um den Autoverkauf in Franken: Motorschaden, Unfallwagen, ohne TÜV, Export & mehr. Jetzt in 2 Minuten Anfrage senden.",
  alternates: {
    canonical: "https://frankenautoankauf.de/auto-verkaufen",
  },
}

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-10 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Auto verkaufen in Franken – alle Fälle auf einen Blick
        </h1>
        <p className="text-lg text-muted-foreground">
          Wähle deinen passenden Fall aus. Jede Seite erklärt kurz die Situation und führt dich
          direkt zum Anfrage-Formular.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/#form">Jetzt Anfrage senden</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auto-verkaufen-sofort">Sofort verkaufen</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/staedte">Städte & Regionen</Link>
          </Button>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pseoCasesList.map((c) => (
          <Link
            key={c.key}
            href={`/auto-verkaufen/${c.key}`}
            className="group rounded-xl border bg-card p-5 transition hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold group-hover:underline">{c.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.shortLabel}</div>
              </div>
              <span className="text-sm text-muted-foreground">→</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-12 rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold">Du bist dir unsicher?</h2>
        <p className="mt-2 text-muted-foreground">
          Kein Problem – sende einfach eine kurze Anfrage. Wir melden uns schnell mit einem fairen
          Angebot und übernehmen bei Bedarf Abholung & Abmeldung.
        </p>
        <div className="mt-4">
          <Button asChild>
            <Link href="/#form">Zum Formular</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
