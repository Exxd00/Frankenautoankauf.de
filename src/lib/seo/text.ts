import type { Case } from "./cases"
import type { City } from "./cities"

// Small deterministic PRNG based on string hash (stable across builds)
export function hash32(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function pick<T>(arr: T[], seed: number, offset = 0): T {
  const idx = (seed + offset) % arr.length
  return arr[idx]
}

export function buildIntro(city: City, c: Case, seed: number): string {
  const openings = [
    `In ${city.name} ist das Thema „${c.title}“ erstaunlich häufig – ${city.hook}.`,
    `Gerade in ${city.name} hören wir oft: „${c.title}“. Ein Grund: ${city.hook}.`,
    `Wer in ${city.name} ein Fahrzeug abgeben möchte, stolpert bei „${c.title}“ schnell über Hürden – ${city.hook}.`,
    `In ${city.name} spielt Zeit eine große Rolle: Bei „${c.title}“ wird aus einer Anzeige schnell ein Marathon – ${city.hook}.`,
  ]
  const localAngle = [
    `Viele Verkäufer möchten hier keine langen Wege, keine Diskussionen und vor allem keine unsicheren Besichtigungstermine.`,
    `Dazu kommt: Je lokaler der Ankauf, desto einfacher sind Übergabe, Abmeldung und der Papierkram zu lösen.`,
    `Deshalb setzen wir auf einen Ablauf, der in ${city.name} wirklich alltagstauglich ist: schnell, klar und fair.`,
    `Wir kombinieren lokale Abwicklung in ${city.name} mit einer Bewertung, die den Zustand realistisch einordnet.`,
  ]
  return `${pick(openings, seed)} ${pick(localAngle, seed, 7)}`
}

export function buildProblemParagraph(city: City, c: Case, seed: number): string {
  const variants = [
    `${c.pain} In ${city.name} erleben viele, dass Interessenten kurzfristig abspringen oder den Preis nachträglich drücken wollen.`,
    `${c.pain} Gerade in ${city.name} führen solche Unsicherheiten häufig zu „Besichtigungstourismus“ ohne echtes Angebot.`,
    `${c.pain} In ${city.name} wird das oft zum Stressfaktor – denn jeder zusätzliche Termin kostet Zeit und Nerven.`,
    `${c.pain} In ${city.name} ist der Markt zwar aktiv, aber bei Problemfällen sind Privatverkäufe oft zäh.`,
  ]
  return pick(variants, seed, 13)
}

export function buildWhyLocal(city: City, c: Case, seed: number): string {
  const variants = [
    `Der beste Hebel ist ein lokaler Ankauf in ${city.name}: kurze Wege, klare Bewertung und ein sauberer Vertrag – passend zu Ihrer Situation.`,
    `Wenn Sie in ${city.name} verkaufen, ist ein strukturierter Ablauf Gold wert: Wir machen aus „${c.title}“ eine planbare Übergabe statt einer Lotterie.`,
    `In ${city.name} lohnt sich der direkte Weg: keine endlosen Chats, kein Feilschen vor Ort – stattdessen ein nachvollziehbares Angebot.`,
    `Gerade in ${city.name} ist „lokal“ ein Vorteil: Übergabe & Abholung lassen sich schnell koordinieren – auch wenn das Auto nicht optimal fährt.`,
  ]
  return pick(variants, seed, 21)
}

export function buildSteps(city: City, c: Case, seed: number): string[] {
  const step1 = [
    `Daten senden (online): Marke/Modell, Zustand und kurze Notiz zu „${c.title}“.`,
    `Kurze Anfrage: Fahrzeugdaten + Hinweis auf „${c.title}“.`,
    `Online bewerten lassen: Basisdaten + Problemhinweis „${c.title}“.`,
  ]
  const step2 = [
    `Rückmeldung in kurzer Zeit – wir klären Fragen zu ${c.docsHint.toLowerCase()}.`,
    `Wir melden uns zeitnah und besprechen Dokumente & Details (z. B. ${c.docsHint}).`,
    `Sie erhalten ein klares Angebot, inklusive Hinweisen zu ${c.docsHint}.`,
  ]
  const step3 = [
    `Übergabe in ${city.name} (oder Abholung): Kaufvertrag, Zahlung und auf Wunsch Abmeldung.`,
    `Schnelle Übergabe in ${city.name}: wir bringen den Ablauf auf den Punkt – ohne Überraschungen.`,
    `Abwicklung in ${city.name}: fairer Preis, Vertrag, Zahlung – fertig.`,
  ]
  return [pick(step1, seed, 1), pick(step2, seed, 2), pick(step3, seed, 3)]
}

export function buildUSPs(city: City, c: Case, seed: number): string[] {
  const options = [
    `Kostenlose Bewertung – auch bei „${c.title}“`,
    `Schnelle Abwicklung in ${city.name}`,
    `Transparenter Preis statt Nachverhandeln`,
    `Abholung möglich (auch wenn das Auto nicht zuverlässig fährt)`,
    `Auf Wunsch: Abmeldung & Papierkram`,
    `Seriöser Kaufvertrag – klar, verständlich, ohne Kleingedrucktes`,
  ]
  // rotate for variety
  const start = seed % options.length
  return [...options.slice(start), ...options.slice(0, start)].slice(0, 5)
}

export function buildFaq(city: City, c: Case, seed: number): { question: string; answer: string }[] {
  const faqs = [
    {
      q: `Kann ich mein Auto in ${city.name} trotz „${c.title}“ sofort verkaufen?`,
      a: `Ja. Sie senden kurz die Fahrzeugdaten – wir geben Ihnen ein klares Angebot und koordinieren die Übergabe in ${city.name}.`,
    },
    {
      q: `Welche Unterlagen brauche ich in ${city.name}?`,
      a: `In der Regel reichen Fahrzeugschein/-brief und ein Ausweis. Hilfreich sind außerdem: ${c.docsHint}`,
    },
    {
      q: `Gibt es eine Abholung in ${city.name}, wenn das Auto nicht sicher fährt?`,
      a: `Ja, in vielen Fällen organisieren wir eine Abholung im Raum ${city.name}. Das spart Stress und Zeit.`,
    },
    {
      q: `Wie vermeide ich Nachverhandlungen?`,
      a: `Wichtig sind ehrliche Angaben und Fotos. Dann kalkulieren wir „${c.title}“ direkt ein und bleiben beim vereinbarten Rahmen.`,
    },
    {
      q: `Wie schnell bekomme ich mein Geld?`,
      a: `Bei der Übergabe in ${city.name} erfolgt die Zahlung direkt – transparent und nachvollziehbar.`,
    },
    {
      q: `Was ist, wenn ich heute noch verkaufen muss?`,
      a: `Dann nutzen Sie unsere „Sofort“-Option. In ${city.name} lässt sich häufig am selben Tag ein Termin finden, je nach Lage.`,
    },
  ]

  // Select 3–6 deterministically with slight re-ordering
  const count = 3 + (seed % 4) // 3..6
  const rotated = [...faqs.slice(seed % faqs.length), ...faqs.slice(0, seed % faqs.length)]
  return rotated.slice(0, count).map((x, i) => ({
    question: pick([x.q, x.q.replace("sofort", "zügig")], seed, i) as string,
    answer: x.a,
  }))
}

export function buildCTASubtitle(city: City, c: Case): string {
  return `Senden Sie jetzt die Daten – wir melden uns mit einem Angebot für „${c.title}“ in ${city.name}.`
}
