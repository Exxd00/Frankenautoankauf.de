"use client"

import * as React from "react"
import Link from "next/link"

type Letter = string

const DEFAULT_LETTERS: Letter[] = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  "Ä",
  "Ö",
  "Ü",
  "#",
]

function getFirstLetter(value: string): Letter {
  const s = (value || "").trim()
  if (!s) return "#"

  // Normalize German umlauts consistently.
  const first = s[0].toUpperCase()
  if (/[A-ZÄÖÜ]/.test(first)) return first
  return "#"
}

export type AlphabetItem = {
  id: string
  label: string
  /** Optional short line under the title (e.g., region). */
  subLabel?: string
  /** Optional description text shown in the card. */
  description?: string
  /** Optional primary link (card title becomes a link if provided). */
  href?: string
  /** Optional list of links displayed at the bottom of the card. */
  links?: Array<{ href: string; label: string }>
}

export function AlphabetFilter<T extends AlphabetItem>(props: {
  items: T[]
  letters?: Letter[]
  allLabel?: string
  className?: string
}) {
  const { items, letters = DEFAULT_LETTERS, allLabel = "Alle", className } = props

  const [active, setActive] = React.useState<Letter | "ALL">("ALL")

  const filtered = React.useMemo(() => {
    if (active === "ALL") return items
    return items.filter(i => getFirstLetter(i.label) === active)
  }, [items, active])

  // Compute which letters have results (for disabling buttons)
  const available = React.useMemo(() => {
    const set = new Set<Letter>()
    for (const i of items) set.add(getFirstLetter(i.label))
    return set
  }, [items])

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActive("ALL")}
          className={
            active === "ALL"
              ? "px-3 py-1 rounded-md bg-orange-600 text-white text-sm"
              : "px-3 py-1 rounded-md border text-sm hover:bg-muted"
          }
        >
          {allLabel}
        </button>

        {letters.map(letter => {
          const isActive = active === letter
          const isDisabled = letter !== "#" ? !available.has(letter) : !available.has("#")
          return (
            <button
              key={letter}
              type="button"
              disabled={isDisabled}
              onClick={() => setActive(letter)}
              className={
                isActive
                  ? "px-2.5 py-1 rounded-md bg-orange-600 text-white text-sm"
                  : isDisabled
                    ? "px-2.5 py-1 rounded-md border text-sm opacity-40 cursor-not-allowed"
                    : "px-2.5 py-1 rounded-md border text-sm hover:bg-muted"
              }
              aria-pressed={isActive}
            >
              {letter}
            </button>
          )
        })}

        <div className="ml-auto text-sm text-muted-foreground">
          {filtered.length} Ergebnis{filtered.length === 1 ? "" : "se"}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-sm text-muted-foreground">Keine Einträge für diesen Buchstaben.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(i => (
            <div key={i.id} className="border rounded-lg p-4 hover:shadow-sm transition">
              {i.href ? (
                <Link className="font-semibold text-lg mb-1 text-orange-600 underline" href={i.href}>
                  {i.label}
                </Link>
              ) : (
                <div className="font-semibold text-lg mb-1">{i.label}</div>
              )}

              {i.subLabel ? <div className="text-sm text-muted-foreground mb-2">{i.subLabel}</div> : null}
              {i.description ? <p className="text-sm text-muted-foreground mb-3">{i.description}</p> : null}

              {i.links && i.links.length > 0 ? (
                <div className="flex flex-wrap gap-3 text-sm">
                  {i.links.map(l => (
                    <Link key={l.href} className="text-orange-600 underline" href={l.href}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
