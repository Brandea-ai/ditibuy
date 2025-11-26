import { Metadata } from 'next'
import { SectionLayout } from '@/components/layout/SectionLayout'

/* ============================================
   AGB PAGE
   Phase 1: Legal Pages
   ============================================ */

export const metadata: Metadata = {
  title: 'AGB',
  description: 'Allgemeine Geschäftsbedingungen von BayernAnkauf.',
}

export default function AGBPage() {
  return (
    <div className="pt-20">
      <SectionLayout
        id="agb"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1>Allgemeine Geschäftsbedingungen</h1>

          <h2>§ 1 Geltungsbereich</h2>
          <p>
            (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
            Verträge, die zwischen der BayernAnkauf GmbH (nachfolgend
            „BayernAnkauf") und dem Verkäufer über die Website bayernankauf.de
            geschlossen werden.
          </p>
          <p>
            (2) Abweichende Bedingungen des Verkäufers werden nicht anerkannt,
            es sei denn, BayernAnkauf stimmt ihrer Geltung ausdrücklich
            schriftlich zu.
          </p>

          <h2>§ 2 Vertragsschluss</h2>
          <p>
            (1) Die auf der Website dargestellten Ankaufsangebote stellen
            unverbindliche Preisauskünfte dar und sind kein verbindliches
            Angebot zum Abschluss eines Kaufvertrages.
          </p>
          <p>
            (2) Der Verkäufer gibt durch die Einsendung seines Geräts ein
            verbindliches Angebot ab.
          </p>
          <p>
            (3) BayernAnkauf prüft das eingesandte Gerät und unterbreitet dem
            Verkäufer ein verbindliches Ankaufsangebot. Der Kaufvertrag kommt
            erst mit der Annahme dieses Angebots durch den Verkäufer zustande.
          </p>

          <h2>§ 3 Geräteprüfung</h2>
          <p>
            (1) Nach Eingang des Geräts bei BayernAnkauf wird dieses einer
            optischen und technischen Prüfung unterzogen.
          </p>
          <p>
            (2) Weicht der tatsächliche Zustand des Geräts von den Angaben des
            Verkäufers ab, behält sich BayernAnkauf das Recht vor, ein
            angepasstes Angebot zu unterbreiten.
          </p>
          <p>
            (3) Der Verkäufer kann das angepasste Angebot annehmen oder
            ablehnen. Bei Ablehnung wird das Gerät kostenlos zurückgesendet.
          </p>

          <h2>§ 4 Preise und Zahlung</h2>
          <p>
            (1) Die genannten Ankaufspreise sind Bruttopreise und verstehen
            sich als Endpreise inklusive gesetzlicher Umsatzsteuer.
          </p>
          <p>
            (2) Die Auszahlung erfolgt innerhalb von 48 Stunden nach Annahme
            des Angebots durch den Verkäufer auf das vom Verkäufer angegebene
            Bankkonto.
          </p>

          <h2>§ 5 Versand</h2>
          <p>
            (1) Der Versand des Geräts an BayernAnkauf erfolgt auf Kosten von
            BayernAnkauf mittels eines vorfrankierten Versandlabels.
          </p>
          <p>
            (2) Das Risiko des zufälligen Untergangs oder der zufälligen
            Verschlechterung des Geräts geht mit der Übergabe an das
            Transportunternehmen auf BayernAnkauf über.
          </p>

          <h2>§ 6 Datenlöschung</h2>
          <p>
            (1) Der Verkäufer ist verpflichtet, vor der Einsendung alle
            persönlichen Daten vom Gerät zu löschen und das Gerät auf
            Werkseinstellungen zurückzusetzen.
          </p>
          <p>
            (2) BayernAnkauf führt zusätzlich eine professionelle
            Datenlöschung nach DSGVO-Standards durch.
          </p>

          <h2>§ 7 Haftung</h2>
          <p>
            (1) BayernAnkauf haftet unbeschränkt für Schäden aus der Verletzung
            des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich
            oder grob fahrlässig verursachte Schäden.
          </p>
          <p>
            (2) Für leicht fahrlässig verursachte Schäden haftet BayernAnkauf
            nur bei Verletzung wesentlicher Vertragspflichten.
          </p>

          <h2>§ 8 Schlussbestimmungen</h2>
          <p>
            (1) Es gilt das Recht der Bundesrepublik Deutschland unter
            Ausschluss des UN-Kaufrechts.
          </p>
          <p>
            (2) Erfüllungsort und ausschließlicher Gerichtsstand ist München,
            sofern der Verkäufer Kaufmann ist.
          </p>
          <p>
            (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt
            die Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>

          <p className="text-sm text-muted mt-8">
            Stand: Januar 2025
          </p>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800 m-0">
              <strong>Hinweis:</strong> Dies sind Platzhalter-AGB.
              Die finalen AGB werden vor dem Go-Live durch einen Rechtsbeistand
              erstellt und geprüft.
            </p>
          </div>
        </div>
      </SectionLayout>
    </div>
  )
}
