import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alle Kategorien – Elektronik verkaufen | BayernAnkauf',
  description: 'Wählen Sie Ihre Produktkategorie: Smartphones, Tablets, Laptops, Smartwatches, Spielkonsolen, Kameras und mehr. Über 400 Geräte zum Verkaufen.',
  keywords: [
    'Elektronik verkaufen',
    'Handy Ankauf',
    'Tablet Ankauf',
    'Laptop Ankauf',
    'Smartwatch Ankauf',
    'Konsole Ankauf',
    'Kamera Ankauf',
  ],
  openGraph: {
    title: 'Alle Kategorien – Elektronik verkaufen',
    description: 'Wählen Sie Ihre Produktkategorie und erhalten Sie sofort ein faires Angebot.',
    type: 'website',
    locale: 'de_DE',
  },
  alternates: {
    canonical: 'https://bayernankauf.de/kategorien',
  },
}

export default function KategorienLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
