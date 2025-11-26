import { Metadata } from 'next'
import { SectionLayout } from '@/components/layout/SectionLayout'
import { User, CreditCard, Bell, Shield } from 'lucide-react'

/* ============================================
   PROFIL PAGE
   Phase 1: App Pages (Dummy)
   ============================================ */

export const metadata: Metadata = {
  title: 'Mein Profil',
  description: 'Verwalten Sie Ihre persönlichen Daten und Einstellungen.',
}

const tabs = [
  { id: 'personal', label: 'Persönliche Daten', icon: User },
  { id: 'bank', label: 'Bankdaten', icon: CreditCard },
  { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
  { id: 'security', label: 'Sicherheit', icon: Shield },
]

export default function ProfilPage() {
  return (
    <div className="pt-20">
      <SectionLayout
        id="profil"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mein Profil
            </h1>
            <p className="text-muted">
              Verwalten Sie Ihre persönlichen Daten und Einstellungen.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                <nav className="space-y-1">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        index === 0
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Persönliche Daten
                </h2>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    MM
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Max Mustermann
                    </h3>
                    <p className="text-muted">max@mustermann.de</p>
                    <p className="text-sm text-muted mt-1">
                      Mitglied seit Januar 2025
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vorname
                      </label>
                      <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-600">
                        Max
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nachname
                      </label>
                      <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-600">
                        Mustermann
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail-Adresse
                    </label>
                    <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-600">
                      max@mustermann.de
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon (optional)
                    </label>
                    <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-400">
                      +49 ...
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PLZ
                      </label>
                      <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-600">
                        80331
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stadt
                      </label>
                      <div className="h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-4 text-gray-600">
                        München
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4">
                    <button
                      disabled
                      className="px-6 py-3 bg-primary text-white rounded-xl font-semibold opacity-50 cursor-not-allowed"
                    >
                      Änderungen speichern (Phase 3)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase Info */}
          <p className="text-center text-sm text-muted mt-8">
            Profil-Funktionalität wird in Phase 3 implementiert.
          </p>
        </div>
      </SectionLayout>
    </div>
  )
}
