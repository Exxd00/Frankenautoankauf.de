import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vielen Dank | Auto Ankauf Franken",
  description: "Ihre Anfrage wurde erfolgreich gesendet.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
}

export default function DankeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
