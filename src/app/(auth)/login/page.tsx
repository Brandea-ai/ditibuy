import { Metadata } from 'next'
import Link from 'next/link'
import { SectionLayout } from '@/components/layout/SectionLayout'

/* ============================================
   LOGIN PAGE
   Phase 1: Auth Pages (Dummy)
   ============================================ */

export const metadata: Metadata = {
  title: 'Anmelden',
  description: 'Melden Sie sich bei Ihrem BayernAnkauf-Konto an.',
}

export default function LoginPage() {
  return (
    <div className="pt-20">
      <SectionLayout
        id="login"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 block">🔐</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Willkommen zurück
            </h1>
            <p className="text-muted">
              Melden Sie sich an, um Ihre Angebote zu verwalten.
            </p>
          </div>

          {/* Login Form Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse
                </label>
                <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-400">
                  ihre@email.de
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
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" disabled />
                  Angemeldet bleiben
                </label>
                <Link
                  href="/passwort-vergessen"
                  className="text-sm text-primary hover:underline"
                >
                  Passwort vergessen?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                disabled
                className="w-full h-12 bg-primary text-white rounded-xl font-semibold opacity-50 cursor-not-allowed"
              >
                Anmelden (Phase 3)
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

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Noch kein Konto?{' '}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Jetzt registrieren
              </Link>
            </p>
          </div>

          {/* Info */}
          <p className="text-center text-sm text-muted mt-6">
            Auth-System wird in Phase 3 implementiert.
          </p>
        </div>
      </SectionLayout>
    </div>
  )
}
