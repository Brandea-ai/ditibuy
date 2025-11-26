import { Metadata } from 'next'
import Link from 'next/link'
import { SectionLayout } from '@/components/layout/SectionLayout'
import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react'

/* ============================================
   DASHBOARD PAGE
   Phase 1: App Pages (Dummy)
   ============================================ */

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Verwalten Sie Ihre Angebote und Verkäufe.',
}

// Mock data for demonstration
const mockOffers = [
  {
    id: '1',
    referenceCode: 'BY-202501-A1B2C3',
    device: 'iPhone 14 Pro',
    status: 'IN_PRUEFUNG',
    price: 550,
    date: '2025-01-20',
  },
  {
    id: '2',
    referenceCode: 'BY-202501-D4E5F6',
    device: 'MacBook Air M2',
    status: 'AUSGEZAHLT',
    price: 780,
    date: '2025-01-15',
  },
  {
    id: '3',
    referenceCode: 'BY-202501-G7H8I9',
    device: 'Samsung Galaxy S23',
    status: 'ANGEBOT_ERSTELLT',
    price: 420,
    date: '2025-01-22',
  },
]

const statusConfig = {
  ANGEBOT_ERSTELLT: { label: 'Angebot erstellt', color: 'bg-blue-100 text-blue-700', icon: Clock },
  IN_PRUEFUNG: { label: 'In Prüfung', color: 'bg-yellow-100 text-yellow-700', icon: Package },
  AUSGEZAHLT: { label: 'Ausgezahlt', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  ABGELEHNT: { label: 'Abgelehnt', color: 'bg-red-100 text-red-700', icon: AlertCircle },
}

export default function DashboardPage() {
  return (
    <div className="pt-20">
      <SectionLayout
        id="dashboard"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-muted">
              Willkommen zurück! Hier sehen Sie Ihre aktuellen Angebote.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-sm text-muted">Angebote gesamt</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <p className="text-2xl font-bold text-yellow-600">1</p>
              <p className="text-sm text-muted">In Bearbeitung</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <p className="text-2xl font-bold text-success">1</p>
              <p className="text-sm text-muted">Abgeschlossen</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">1.750 €</p>
              <p className="text-sm text-muted">Gesamtwert</p>
            </div>
          </div>

          {/* Offers List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Meine Angebote</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {mockOffers.map((offer) => {
                const status = statusConfig[offer.status as keyof typeof statusConfig]
                const StatusIcon = status.icon

                return (
                  <div
                    key={offer.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {offer.device}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted">
                          Referenz: <code className="bg-gray-100 px-2 py-0.5 rounded">{offer.referenceCode}</code>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          {offer.price} €
                        </p>
                        <p className="text-sm text-muted">{offer.date}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/verkaufen"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              + Neues Gerät verkaufen
            </Link>
          </div>

          {/* Phase Info */}
          <p className="text-center text-sm text-muted mt-8">
            Dashboard-Funktionalität wird in Phase 3-4 implementiert.
          </p>
        </div>
      </SectionLayout>
    </div>
  )
}
