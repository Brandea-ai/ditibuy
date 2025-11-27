import { Metadata } from 'next'

/* ============================================
   KATEGORIEN LAYOUT MIT DYNAMISCHEN METADATEN
   SEO-optimiert für jede Kategorie
   ============================================ */

const CATEGORY_META: Record<string, {
  title: string
  description: string
  keywords: string[]
}> = {
  smartphone: {
    title: 'Smartphone verkaufen – iPhone, Samsung & mehr | Sofort Bargeld',
    description: 'Gebrauchtes Smartphone verkaufen zum Bestpreis. iPhone 16, Samsung Galaxy S24, Google Pixel – alle Modelle. Auszahlung in 24-48h. Kostenloser Versand.',
    keywords: [
      'Handy verkaufen', 'iPhone verkaufen', 'Samsung verkaufen',
      'Smartphone Ankauf', 'gebrauchtes Handy verkaufen', 'altes iPhone verkaufen',
      'kaputtes iPhone verkaufen', 'Google Pixel verkaufen', 'OnePlus verkaufen'
    ],
  },
  tablet: {
    title: 'Tablet verkaufen – iPad, Galaxy Tab & mehr | Sofort Bargeld',
    description: 'Tablet verkaufen zum Bestpreis. iPad Pro, iPad Air, Samsung Galaxy Tab, Microsoft Surface – alle Modelle. Schnelle Auszahlung in 24-48h.',
    keywords: [
      'iPad verkaufen', 'Tablet verkaufen', 'iPad Pro verkaufen',
      'Samsung Tab verkaufen', 'Surface verkaufen', 'gebrauchtes iPad verkaufen',
      'Tablet Ankauf', 'iPad Ankauf'
    ],
  },
  laptop: {
    title: 'Laptop verkaufen – MacBook, ThinkPad & mehr | Sofort Bargeld',
    description: 'Laptop verkaufen zum Bestpreis. MacBook Pro, MacBook Air, ThinkPad, Dell XPS – alle Modelle. Auszahlung in 24-48h. Kostenloser Versand.',
    keywords: [
      'MacBook verkaufen', 'Laptop verkaufen', 'Notebook verkaufen',
      'MacBook Pro verkaufen', 'ThinkPad verkaufen', 'gebrauchter Laptop verkaufen',
      'Laptop Ankauf', 'MacBook Ankauf'
    ],
  },
  smartwatch: {
    title: 'Smartwatch verkaufen – Apple Watch, Galaxy Watch & mehr',
    description: 'Smartwatch verkaufen zum Bestpreis. Apple Watch Ultra, Series 9, Samsung Galaxy Watch, Garmin – alle Modelle. Schnelle Auszahlung.',
    keywords: [
      'Apple Watch verkaufen', 'Smartwatch verkaufen', 'Galaxy Watch verkaufen',
      'Garmin verkaufen', 'Smartwatch Ankauf', 'gebrauchte Apple Watch verkaufen'
    ],
  },
  konsole: {
    title: 'Spielkonsole verkaufen – PS5, Xbox, Nintendo Switch & mehr',
    description: 'Gaming-Konsole verkaufen zum Bestpreis. PlayStation 5, Xbox Series X, Nintendo Switch, Steam Deck – alle Modelle. Auszahlung in 24-48h.',
    keywords: [
      'PS5 verkaufen', 'PlayStation verkaufen', 'Xbox verkaufen',
      'Nintendo Switch verkaufen', 'Spielkonsole verkaufen', 'Steam Deck verkaufen',
      'Konsole Ankauf', 'Gaming Ankauf'
    ],
  },
  kamera: {
    title: 'Kamera verkaufen – Sony Alpha, Canon EOS, DJI & mehr',
    description: 'Kamera verkaufen zum Bestpreis. Sony Alpha, Canon EOS, Nikon Z, Fujifilm X, DJI Drohnen – alle Modelle. Schnelle Auszahlung.',
    keywords: [
      'Kamera verkaufen', 'Sony Alpha verkaufen', 'Canon EOS verkaufen',
      'Nikon verkaufen', 'DJI Drohne verkaufen', 'DSLR verkaufen',
      'Systemkamera verkaufen', 'Kamera Ankauf'
    ],
  },
  sonstiges: {
    title: 'Elektronik verkaufen – AirPods, VR Headset & mehr',
    description: 'Elektronik-Zubehör verkaufen zum Bestpreis. AirPods Pro, Sony Kopfhörer, Meta Quest, Kindle – alle Modelle. Schnelle Auszahlung.',
    keywords: [
      'AirPods verkaufen', 'Kopfhörer verkaufen', 'VR Brille verkaufen',
      'Meta Quest verkaufen', 'Kindle verkaufen', 'Elektronik Ankauf'
    ],
  },
}

type Props = {
  params: Promise<{ category: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const meta = CATEGORY_META[category]

  if (!meta) {
    return {
      title: 'Kategorie nicht gefunden',
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://bayernankauf.de/kategorien/${category}`,
    },
  }
}

export default function CategoryLayout({ children }: Props) {
  return <>{children}</>
}
