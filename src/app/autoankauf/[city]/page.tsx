import type { Metadata } from "next";
import Link from "next/link";

import SEOPageTemplate from "@/components/SEOPageTemplate";
import { Banknote, Clock, MapPin, Shield } from "lucide-react";

import { pseoCasesList, type PSEOCaseKey, pseoCases } from "@/lib/pseo/pseoCases";
import { pseoCities, type PSEOCityKey } from "@/lib/pseo/pseoCities";
import { isPSEOCityKey, normalizeSlug } from "@/lib/pseo/pseoGenerator";

export const revalidate = 1209600; // 14 days

type Params = { city: string };

function hash32(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pickN<T>(arr: T[], seed: string, n: number): T[] {
  const out: T[] = [];
  const used = new Set<number>();
  for (let i = 0; i < n && used.size < arr.length; i++) {
    const idx = (hash32(seed + "::" + i) + i * 7) % arr.length;
    if (used.has(idx)) continue;
    used.add(idx);
    out.push(arr[idx]);
  }
  return out;
}

export async function generateStaticParams(): Promise<Params[]> {
  return (Object.keys(pseoCities) as PSEOCityKey[]).map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  
  const p = await params
const citySlug = normalizeSlug(p.city)
  if (!isPSEOCityKey(citySlug)) {
    return { title: "Seite nicht gefunden | Franken Auto Ankauf", robots: { index: false, follow: false } };
  }
  const city = pseoCities[citySlug as any];
  return {
    title: `Autoankauf ${city.name} | Franken Auto Ankauf`,
    description: `Auto verkaufen in ${city.name} (${city.regionLabel}): kostenloses Angebot, schnelle Abwicklung, Abholung möglich. Jetzt anfragen.`,
    alternates: { canonical: `https://frankenautoankauf.de/autoankauf/${citySlug}` },
  };
}

function featureIcon(name: "shield" | "clock" | "banknote") {
  if (name === "clock") return <Clock className="w-12 h-12 text-orange-600" />;
  if (name === "banknote") return <Banknote className="w-12 h-12 text-orange-600" />;
  return <Shield className="w-12 h-12 text-orange-600" />;
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  
  const p = await params
const citySlug = normalizeSlug(p.city)
  if (!isPSEOCityKey(citySlug)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-3">Seite nicht gefunden</h1>
          <p className="text-gray-600 dark:text-gray-300">Bitte prüfen Sie die URL.</p>
          <p className="mt-4">
            <Link className="text-orange-600 underline" href="/">
              Zur Startseite
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const cityKey = p.city as PSEOCityKey;
  const city = pseoCities[cityKey];
  const seed = `city::${cityKey}`;

  const popular = pickN(pseoCasesList, seed, 6).map((c) => c.key as PSEOCaseKey);

  const benefits = [
    `Kostenloses Angebot für den Autoankauf in ${city.name}`,
    `Regionale Abwicklung in ${city.regionLabel} – kurze Wege`,
    "Keine Inserate, keine Probefahrten, kein Verhandlungsstress",
    "Abholung möglich (je nach Zustand und Lage)",
    "Zahlung bei Übergabe (Bar oder Überweisung)",
  ];

  const features = [
    {
      icon: "shield" as const,
      title: "Seriös & transparent",
      description: `Klare Kommunikation und eine nachvollziehbare Bewertung – passend für ${city.name}.`,
    },
    {
      icon: "clock" as const,
      title: "Schnell in der Region",
      description: `Termin & Abwicklung in ${city.name} und Umgebung – ohne Umwege.`,
    },
    {
      icon: "banknote" as const,
      title: "Zahlung bei Übergabe",
      description: `Bar oder Überweisung – Sie entscheiden, was in ${city.name} am besten passt.`,
    },
  ].map((f) => ({ icon: featureIcon(f.icon), title: f.title, description: f.description }));

  const faqs = [
    {
      question: `Wie schnell kann ich mein Auto in ${city.name} verkaufen?`,
      answer: `Oft geht es zügig: Anfrage → Angebot → Termin. In ${city.name} sind kurze Wege möglich – das hilft bei einer schnellen Übergabe.`,
    },
    {
      question: `Welche Unterlagen brauche ich in ${city.name}?`,
      answer: "In der Regel: Zulassungsbescheinigung Teil I/II (Schein/Brief) und ein Ausweis. Wenn vorhanden: Serviceheft, HU/AU, Rechnungen.",
    },
    {
      question: `Kann mein Auto in ${city.name} auch abgeholt werden?`,
      answer: `Je nach Zustand und Entfernung ja. Schreiben Sie kurz dazu, ob das Fahrzeug fahrbereit ist – dann planen wir die Abholung im Raum ${city.name}.`,
    },
    {
      question: `Muss ich vorher reparieren?`,
      answer: "Meist nicht. Reparaturen lohnen sich nicht immer – wir bewerten den aktuellen Zustand fair und transparent.",
    },
  ];

  const relatedLinks = [
    { href: "/#form", label: "Zum Formular (kostenloses Angebot)" },
    { href: `/auto-verkaufen-sofort/${cityKey}`, label: `Auto sofort verkaufen in ${city.name}` },
    ...popular.slice(0, 3).map((k) => ({
      href: `/auto-verkaufen/${k}/${cityKey}`,
      label: `${pseoCases[k].title} in ${city.name}`,
    })),
  ];

  return (
    <SEOPageTemplate
      heroIcon={<MapPin className="w-20 h-20 mx-auto" />}
      heroTitle={`Autoankauf in ${city.name}`}
      heroSubtitle={`Direkter Autoankauf in ${city.name} (${city.regionLabel}): fair, transparent und ohne Stress – Anfrage in 1 Minute.`}
      mainTitle={`Auto verkaufen in ${city.name}: so einfach geht's`}
      mainContent={
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            In <strong>{city.name}</strong> nutzen viele ihr Auto für {city.typicalUsePool?.[0] ?? "Alltag und Beruf"}. Wenn ein Verkauf ansteht,
            lohnt sich ein klarer Ablauf ohne Inserate und Besichtigungstourismus.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Sie senden kurz die Fahrzeugdaten, wir bewerten realistisch und koordinieren die Übergabe in {city.name} oder Umgebung.
            Besonders bei Problemfällen sparen Sie sich Diskussionen und unnötige Termine.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-orange-600">Beliebte Fälle in {city.name}</h3>
          <ul className="list-disc pl-6 text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-2">
            {popular.map((k) => (
              <li key={k}>
                <Link className="text-orange-600 underline" href={`/auto-verkaufen/${k}/${cityKey}`}>
                  {pseoCases[k].title} in {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      }
      benefits={benefits}
      features={features}
      faqs={faqs}
      ctaTitle={`Jetzt Angebot für ${city.name} anfordern`}
      ctaSubtitle={`Senden Sie die Fahrzeugdaten – wir melden uns schnell mit einem realistischen Angebot für ${city.name}.`}
      relatedLinks={relatedLinks}
    />
  );
}
