import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BayernAnkauf - Elektronik verkaufen in Bayern',
  description: 'Verkaufen Sie Ihre gebrauchten Smartphones, Tablets und Laptops schnell und sicher in Bayern. Faire Preise, schnelle Auszahlung.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
