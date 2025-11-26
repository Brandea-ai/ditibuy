import { Metadata } from 'next'
import { SectionLayout } from '@/components/layout/SectionLayout'

/* ============================================
   DATENSCHUTZ PAGE
   Phase 1: Legal Pages
   ============================================ */

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von BayernAnkauf.',
}

export default function DatenschutzPage() {
  return (
    <div className="pt-20">
      <SectionLayout
        id="datenschutz"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1>Datenschutzerklärung</h1>

          <h2>1. Datenschutz auf einen Blick</h2>

          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </strong>
            <br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
            dieser Website entnehmen.
          </p>

          <h2>2. Hosting</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei Vercel Inc., 440 N
            Barranca Ave #4133, Covina, CA 91723, USA.
          </p>

          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

          <h3>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
            Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend den gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3>Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser
            Website ist:
          </p>
          <p>
            BayernAnkauf GmbH
            <br />
            Musterstraße 123
            <br />
            80331 München
            <br />
            <br />
            Telefon: +49 89 123 456 78
            <br />
            E-Mail: datenschutz@bayernankauf.de
          </p>

          <h2>4. Datenerfassung auf dieser Website</h2>

          <h3>Cookies</h3>
          <p>
            Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind
            kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an.
            Sie werden entweder vorübergehend für die Dauer einer Sitzung
            (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem
            Endgerät gespeichert.
          </p>

          <h3>Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
            Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
            Fall von Anschlussfragen bei uns gespeichert.
          </p>

          <h2>5. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht:</p>
          <ul>
            <li>
              Auskunft über Ihre bei uns gespeicherten Daten zu erhalten
            </li>
            <li>Berichtigung unrichtiger Daten zu verlangen</li>
            <li>Löschung Ihrer Daten zu verlangen</li>
            <li>Einschränkung der Verarbeitung zu verlangen</li>
            <li>Der Verarbeitung zu widersprechen</li>
            <li>Datenübertragbarkeit zu verlangen</li>
          </ul>

          <h2>6. DSGVO-Löschfristen</h2>
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Datenkategorie</th>
                <th className="border border-gray-300 p-2">Aufbewahrung</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Benutzerdaten (aktiv)</td>
                <td className="border border-gray-300 p-2">Bis zur Löschung durch Nutzer</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Benutzerdaten (inaktiv)</td>
                <td className="border border-gray-300 p-2">3 Jahre nach letzter Aktivität</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Angebotsdaten</td>
                <td className="border border-gray-300 p-2">10 Jahre (Steuerrecht)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Bankdaten</td>
                <td className="border border-gray-300 p-2">30 Tage nach Auszahlung</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800 m-0">
              <strong>Hinweis:</strong> Dies ist eine Platzhalter-Datenschutzerklärung.
              Die finale Version wird vor dem Go-Live durch einen Rechtsbeistand
              geprüft und ergänzt.
            </p>
          </div>
        </div>
      </SectionLayout>
    </div>
  )
}
