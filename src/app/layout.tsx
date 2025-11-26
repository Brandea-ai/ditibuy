import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Header, Footer } from '@/components/layout'
import { SessionProvider } from '@/components/providers/SessionProvider'

/* ============================================
   ROOT LAYOUT
   Phase 1: App Structure
   Phase 3: Added SessionProvider
   ============================================ */

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BayernAnkauf – Elektronik verkaufen in Bayern',
    template: '%s | BayernAnkauf',
  },
  description:
    'Verkaufen Sie Ihre gebrauchten Smartphones, Tablets und Laptops schnell und sicher in Bayern. Faire Preise, schnelle Auszahlung – 100% regional.',
  keywords: [
    'Elektronik verkaufen',
    'Handy Ankauf',
    'iPhone verkaufen',
    'Samsung verkaufen',
    'Laptop Ankauf',
    'Bayern',
    'München',
    'Nürnberg',
    'Augsburg',
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
    title: 'BayernAnkauf – Elektronik verkaufen in Bayern',
    description:
      'Verkaufen Sie Ihre gebrauchten Smartphones, Tablets und Laptops schnell und sicher. Faire Preise, schnelle Auszahlung.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BayernAnkauf',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BayernAnkauf – Elektronik verkaufen in Bayern',
    description:
      'Verkaufen Sie Ihre gebrauchten Smartphones, Tablets und Laptops schnell und sicher.',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#0066CC',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${plusJakarta.variable}`}>
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
