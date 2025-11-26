import { Metadata } from 'next'
import Link from 'next/link'
import { SectionLayout } from '@/components/layout/SectionLayout'

/* ============================================
   REGISTER PAGE
   Phase 1: Auth Pages (Dummy)
   ============================================ */

export const metadata: Metadata = {
  title: 'Registrieren',
  description: 'Erstellen Sie Ihr kostenloses BayernAnkauf-Konto.',
}

export default function RegisterPage() {
  return (
    <div className="pt-20">
      <SectionLayout
        id="register"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 block">🏔️</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Konto erstellen
            </h1>
            <p className="text-muted">
              Registrieren Sie sich kostenlos und starten Sie sofort.
            </p>
          </div>

          {/* Register Form Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vorname
                  </label>
                  <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-400">
                    Max
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nachname
                  </label>
                  <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-400">
                    Mustermann
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse
                </label>
                <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-400">
                  ihre@email.de
                </div>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PLZ
                  </label>
                  <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-400">
                    80331
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stadt
                  </label>
                  <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-400">
                    München
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort
                </label>
                <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-400">
                  ••••••••
                </div>
                <p className="text-xs text-muted mt-1">
                  Min. 8 Zeichen, 1 Zahl, 1 Sonderzeichen
                </p>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded mt-1" disabled />
                <span>
                  Ich akzeptiere die{' '}
                  <Link href="/agb" className="text-primary hover:underline">
                    AGB
                  </Link>{' '}
                  und{' '}
                  <Link href="/datenschutz" className="text-primary hover:underline">
                    Datenschutzbestimmungen
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                disabled
                className="w-full h-12 bg-primary text-white rounded-xl font-semibold opacity-50 cursor-not-allowed"
              >
                Konto erstellen (Phase 3)
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">oder</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Bereits ein Konto?{' '}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Jetzt anmelden
              </Link>
            </p>
          </div>

          {/* Bayern Badge */}
          <div className="text-center mt-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary">
              🏔️ Nur für Kunden in Bayern verfügbar
            </span>
          </div>
        </div>
      </SectionLayout>
    </div>
  )
}
