import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header, Footer } from '@/components/layout'
import { SessionProvider } from '@/components/providers/SessionProvider'

/* ============================================
   ROOT LAYOUT
   Phase 1: App Structure
   Phase 3: Added SessionProvider
   ============================================ */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0066CC',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://bayernankauf.de'),
  title: {
    default: 'BayernAnkauf – Handy, Tablet & Laptop verkaufen | Sofort Bargeld',
    template: '%s | BayernAnkauf',
  },
  description:
    'Gebrauchtes Handy verkaufen? iPhone, Samsung, iPad & MacBook zum Bestpreis ankaufen. Sofort-Auszahlung in 24-48h. Kostenloser Versand. TÜV-geprüft. Über 50.000 zufriedene Kunden.',
  keywords: [
    'Handy verkaufen',
    'iPhone verkaufen',
    'Samsung verkaufen',
    'iPad verkaufen',
    'MacBook verkaufen',
    'Handy Ankauf',
    'Smartphone Ankauf',
    'Tablet Ankauf',
    'Laptop Ankauf',
    'gebrauchtes Handy verkaufen',
    'kaputtes iPhone verkaufen',
    'altes Handy verkaufen',
    'Elektronik Ankauf',
    'Handy Ankauf Bayern',
    'Handy Ankauf München',
    'Smartphone verkaufen',
    'Apple Watch verkaufen',
    'PlayStation verkaufen',
    'Nintendo Switch verkaufen',
  ],
  authors: [{ name: 'BayernAnkauf' }],
  creator: 'BayernAnkauf',
  publisher: 'BayernAnkauf',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://bayernankauf.de',
    siteName: 'BayernAnkauf',
    title: 'Handy verkaufen – Sofort Bargeld für iPhone, Samsung & mehr',
    description:
      'Gebrauchtes Handy zum Bestpreis verkaufen. Auszahlung in 24-48h. Über 50.000 zufriedene Kunden. TÜV-geprüft.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BayernAnkauf – Handy, Tablet & Laptop verkaufen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handy verkaufen – Sofort Bargeld | BayernAnkauf',
    description:
      'Gebrauchtes Handy zum Bestpreis verkaufen. Auszahlung in 24-48h. TÜV-geprüft.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://bayernankauf.de',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BayernAnkauf',
  alternateName: 'Bayern Ankauf',
  url: 'https://bayernankauf.de',
  logo: 'https://bayernankauf.de/logo.png',
  description: 'Deutschlands vertrauenswürdigster Ankauf-Service für gebrauchte Elektronik. iPhone, Samsung, iPad, MacBook und mehr zum Bestpreis verkaufen.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'DE',
    addressRegion: 'Bayern',
  },
  sameAs: [],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '50000',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    offerCount: '400+',
    availability: 'https://schema.org/InStock',
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Elektronik Ankauf',
  provider: {
    '@type': 'Organization',
    name: 'BayernAnkauf',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Deutschland',
  },
  description: 'Ankauf von gebrauchten Smartphones, Tablets, Laptops, Smartwatches, Spielkonsolen und Kameras zu fairen Preisen mit schneller Auszahlung.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SessionProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
