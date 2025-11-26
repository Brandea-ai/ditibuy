'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLayout } from '@/components/layout/SectionLayout'
import { STATUS_INFO, getStatusSteps, getProgressPercentage } from '@/lib/workflow'
import { formatEuro } from '@/lib/calculator'
import { OfferStatus } from '@/types'
import {
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Loader2,
  ChevronRight,
  Printer,
  Eye,
  XCircle,
  Search,
  Filter,
  RefreshCw,
  Smartphone,
  Truck,
  CreditCard,
  CheckCircle2,
  Circle,
} from 'lucide-react'

/* ============================================
   DASHBOARD PAGE
   Phase 5: Payments & Workflows
   ============================================ */

interface Offer {
  id: string
  referenceCode: string
  deviceModel: {
    brand: string
    modelName: string
    storageGb?: number
  }
  conditionLevel: string
  preliminaryOfferEuro: number
  finalOfferEuro?: number
  status: OfferStatus
  createdAt: string
  updatedAt: string
}

interface DashboardStats {
  total: number
  pending: number
  completed: number
  totalValue: number
}

export default function DashboardPage() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()
  const [offers, setOffers] = useState<Offer[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    pending: 0,
    completed: 0,
    totalValue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  // Redirect if not authenticated
  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard')
    }
  }, [authStatus, router])

  // Fetch offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers')
        const data = await response.json()
        if (data.success) {
          setOffers(data.data)

          // Calculate stats
          const total = data.data.length
          const pending = data.data.filter(
            (o: Offer) =>
              !['AUSGEZAHLT', 'ABGELEHNT', 'STORNIERT'].includes(o.status)
          ).length
          const completed = data.data.filter(
            (o: Offer) => o.status === 'AUSGEZAHLT'
          ).length
          const totalValue = data.data.reduce(
            (sum: number, o: Offer) =>
              sum + (o.finalOfferEuro || o.preliminaryOfferEuro),
            0
          )

          setStats({ total, pending, completed, totalValue })
        }
      } catch (error) {
        console.error('Failed to fetch offers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (authStatus === 'authenticated') {
      fetchOffers()
    }
  }, [authStatus])

  // Filter offers
  const filteredOffers = offers.filter((offer) => {
    if (filter === 'active') {
      return !['AUSGEZAHLT', 'ABGELEHNT', 'STORNIERT'].includes(offer.status)
    }
    if (filter === 'completed') {
      return ['AUSGEZAHLT', 'ABGELEHNT', 'STORNIERT'].includes(offer.status)
    }
    return true
  })

  if (authStatus === 'loading' || isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (authStatus === 'unauthenticated') {
    return null
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SectionLayout
        id="dashboard"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Dashboard
              </h1>
              <p className="text-muted">
                Willkommen zurück, {session?.user?.name || 'Benutzer'}!
              </p>
            </div>
            <Link
              href="/verkaufen"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors shadow-lg shadow-accent/30"
            >
              <Plus className="w-5 h-5" />
              Neues Gerät verkaufen
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Package}
              value={stats.total}
              label="Angebote gesamt"
              color="primary"
            />
            <StatCard
              icon={Clock}
              value={stats.pending}
              label="In Bearbeitung"
              color="yellow"
            />
            <StatCard
              icon={CheckCircle}
              value={stats.completed}
              label="Abgeschlossen"
              color="green"
            />
            <StatCard
              icon={CreditCard}
              value={formatEuro(stats.totalValue)}
              label="Gesamtwert"
              color="blue"
              isPrice
            />
          </div>

          {/* Offers List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* List Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Meine Angebote
                </h2>
                <div className="flex items-center gap-2">
                  <FilterButton
                    active={filter === 'all'}
                    onClick={() => setFilter('all')}
                  >
                    Alle
                  </FilterButton>
                  <FilterButton
                    active={filter === 'active'}
                    onClick={() => setFilter('active')}
                  >
                    Aktiv
                  </FilterButton>
                  <FilterButton
                    active={filter === 'completed'}
                    onClick={() => setFilter('completed')}
                  >
                    Abgeschlossen
                  </FilterButton>
                </div>
              </div>
            </div>

            {/* List Content */}
            {filteredOffers.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Keine Angebote
                </h3>
                <p className="text-muted mb-6">
                  {filter === 'all'
                    ? 'Sie haben noch keine Angebote erstellt.'
                    : filter === 'active'
                    ? 'Keine aktiven Angebote vorhanden.'
                    : 'Keine abgeschlossenen Angebote vorhanden.'}
                </p>
                <Link
                  href="/verkaufen"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Erstes Angebot erstellen
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredOffers.map((offer) => (
                  <OfferRow
                    key={offer.id}
                    offer={offer}
                    onSelect={() => setSelectedOffer(offer)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {offers.length > 0 && (
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <QuickActionCard
                icon={Truck}
                title="Versandlabel drucken"
                description="Kostenloser DHL-Versand"
                href="/versand"
              />
              <QuickActionCard
                icon={CreditCard}
                title="Bankdaten verwalten"
                description="Für schnelle Auszahlung"
                href="/profil?tab=bank"
              />
              <QuickActionCard
                icon={RefreshCw}
                title="Status aktualisieren"
                description="Sendungsverfolgung"
                onClick={() => window.location.reload()}
              />
            </div>
          )}
        </div>
      </SectionLayout>

      {/* Offer Detail Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <OfferDetailModal
            offer={selectedOffer}
            onClose={() => setSelectedOffer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Stat Card Component
function StatCard({
  icon: Icon,
  value,
  label,
  color,
  isPrice,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: number | string
  label: string
  color: 'primary' | 'yellow' | 'green' | 'blue'
  isPrice?: boolean
}) {
  const colors = {
    primary: 'text-primary bg-primary/10',
    yellow: 'text-yellow-600 bg-yellow-100',
    green: 'text-green-600 bg-green-100',
    blue: 'text-blue-600 bg-blue-100',
  }

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className={`text-2xl font-bold ${isPrice ? 'text-gray-900' : colors[color].split(' ')[0]}`}>
        {value}
      </p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  )
}

// Filter Button Component
function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

// Offer Row Component
function OfferRow({
  offer,
  onSelect,
}: {
  offer: Offer
  onSelect: () => void
}) {
  const statusInfo = STATUS_INFO[offer.status]
  const progress = getProgressPercentage(offer.status)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 truncate">
                {offer.deviceModel.brand} {offer.deviceModel.modelName}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
            </div>
            <p className="text-sm text-muted mt-0.5">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                {offer.referenceCode}
              </code>
              <span className="mx-2">·</span>
              {new Date(offer.createdAt).toLocaleDateString('de-DE')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {formatEuro(offer.finalOfferEuro || offer.preliminaryOfferEuro)}
            </p>
            <p className="text-xs text-muted">
              {offer.finalOfferEuro ? 'Endpreis' : 'Vorläufig'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${
              offer.status === 'ABGELEHNT' || offer.status === 'STORNIERT'
                ? 'bg-red-500'
                : offer.status === 'AUSGEZAHLT'
                ? 'bg-green-500'
                : 'bg-primary'
            }`}
          />
        </div>
      </div>
    </motion.div>
  )
}

// Quick Action Card Component
function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href?: string
  onClick?: () => void
}) {
  const content = (
    <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-muted">{description}</p>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return <button onClick={onClick} className="w-full text-left">{content}</button>
}

// Offer Detail Modal Component
function OfferDetailModal({
  offer,
  onClose,
}: {
  offer: Offer
  onClose: () => void
}) {
  const statusInfo = STATUS_INFO[offer.status]
  const steps = getStatusSteps(offer.status)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {offer.deviceModel.brand} {offer.deviceModel.modelName}
              </h2>
              <p className="text-muted mt-1">
                Referenz: {offer.referenceCode}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className={`p-4 rounded-xl ${statusInfo.bgColor}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center`}>
                <CheckCircle2 className={`w-5 h-5 ${statusInfo.color}`} />
              </div>
              <div>
                <p className={`font-semibold ${statusInfo.color}`}>
                  {statusInfo.label}
                </p>
                <p className={`text-sm ${statusInfo.color} opacity-80`}>
                  {statusInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                {offer.finalOfferEuro ? 'Endpreis' : 'Vorläufiges Angebot'}
              </span>
              <span className="text-2xl font-bold text-primary">
                {formatEuro(offer.finalOfferEuro || offer.preliminaryOfferEuro)}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Fortschritt</h3>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : step.status === 'current'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      step.status === 'current'
                        ? 'font-medium text-gray-900'
                        : step.status === 'completed'
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {offer.status === 'ANGEBOT_ERSTELLT' && (
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors">
                <Printer className="w-5 h-5" />
                Versandlabel drucken
              </button>
            )}
            {offer.status === 'ANGEBOT_ANGEPASST' && (
              <>
                <button className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                  Annehmen
                </button>
                <button className="flex-1 h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-colors">
                  Ablehnen
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="px-6 h-12 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium transition-colors"
            >
              Schließen
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
