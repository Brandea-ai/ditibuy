import { Metadata } from 'next'
import { SectionLayout } from '@/components/layout/SectionLayout'

/* ============================================
   IMPRESSUM PAGE
   Phase 1: Legal Pages
   ============================================ */

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Angaben gemäß § 5 TMG.',
}

export default function ImpressumPage() {
  return (
    <div className="pt-20">
      <SectionLayout
        id="impressum"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1>Impressum</h1>

          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>BayernAnkauf GmbH</strong>
            <br />
            Musterstraße 123
            <br />
            80331 München
            <br />
            Deutschland
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: +49 89 123 456 78
            <br />
            E-Mail: info@bayernankauf.de
          </p>

          <h2>Vertreten durch</h2>
          <p>Geschäftsführer: Max Mustermann</p>

          <h2>Registereintrag</h2>
          <p>
            Eintragung im Handelsregister
            <br />
            Registergericht: Amtsgericht München
            <br />
            Registernummer: HRB XXXXXX
          </p>

          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
            <br />
            DE XXX XXX XXX
          </p>

          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Max Mustermann
            <br />
            Musterstraße 123
            <br />
            80331 München
          </p>

          <h2>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            <br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800 m-0">
              <strong>Hinweis:</strong> Dies ist ein Platzhalter-Impressum.
              Die finalen rechtlichen Angaben werden vor dem Go-Live ergänzt.
            </p>
          </div>
        </div>
      </SectionLayout>
    </div>
  )
}
