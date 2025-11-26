'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  Smartphone,
  Check,
  AlertCircle,
  ArrowRight,
  Loader2,
  Printer,
  Mail,
  Copy,
  CheckCircle2,
  LogIn,
} from 'lucide-react'
import { DeviceModel, ConditionLevel, DamageFlag, CONDITION_LABELS, DAMAGE_LABELS } from '@/types'
import { PriceBreakdown, formatEuro, generateReferenceCode } from '@/lib/calculator'
import Link from 'next/link'

/* ============================================
   OFFER SUMMARY
   Phase 4: Calculator Components
   ============================================ */

interface OfferSummaryProps {
  device: DeviceModel
  condition: ConditionLevel
  damageFlags: DamageFlag[]
  priceBreakdown: PriceBreakdown
  onBack: () => void
}

export function OfferSummary({
  device,
  condition,
  damageFlags,
  priceBreakdown,
  onBack,
}: OfferSummaryProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [referenceCode, setReferenceCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    if (status !== 'authenticated') {
      // Redirect to login with callback
      router.push(`/login?callbackUrl=/verkaufen`)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceModelId: device.id,
          conditionLevel: condition,
          damageFlags,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Angebot konnte nicht erstellt werden')
        return
      }

      setReferenceCode(data.data.referenceCode)
      setSuccess(true)
    } catch {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyCode = () => {
    if (referenceCode) {
      navigator.clipboard.writeText(referenceCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Success State
  if (success && referenceCode) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Angebot erstellt!</h2>
          <p className="text-green-100">
            Ihr Angebot wurde erfolgreich gespeichert.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Reference Code */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-sm text-muted mb-2">Ihre Angebotsnummer</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-mono font-bold text-primary">
                {referenceCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2 text-gray-400 hover:text-primary transition-colors"
                title="Kopieren"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Gerät</span>
              <span className="font-medium">
                {device.brand} {device.modelName}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Zustand</span>
              <span className="font-medium">{CONDITION_LABELS[condition]}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Vorläufiges Angebot</span>
              <span className="text-xl font-bold text-primary">
                {formatEuro(priceBreakdown.finalPriceEuro)}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-xl p-5">
            <h3 className="font-semibold text-blue-900 mb-3">Nächste Schritte</h3>
            <ol className="space-y-3 text-sm text-blue-800">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 text-blue-800 font-medium">
                  1
                </span>
                <span>
                  Gehen Sie zu Ihrem Dashboard und drucken Sie das Versandlabel aus.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 text-blue-800 font-medium">
                  2
                </span>
                <span>
                  Verpacken Sie Ihr Gerät sicher und kleben Sie das Label auf.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 text-blue-800 font-medium">
                  3
                </span>
                <span>
                  Geben Sie das Paket bei einer DHL-Filiale ab (kostenlos).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 text-blue-800 font-medium">
                  4
                </span>
                <span>
                  Nach Prüfung erhalten Sie Ihre Auszahlung innerhalb von 48h.
                </span>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors"
            >
              Zum Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 h-12 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium transition-colors"
            >
              <Printer className="w-5 h-5" />
              Drucken
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Zusammenfassung Ihres Angebots
          </h2>
          <p className="text-muted mt-1">
            Bitte überprüfen Sie Ihre Angaben vor dem Absenden.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Device */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {device.brand} {device.modelName}
              </p>
              {device.storageGb && (
                <p className="text-sm text-muted">{device.storageGb} GB</p>
              )}
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Zustand</h3>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Check className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800">{CONDITION_LABELS[condition]}</span>
            </div>
          </div>

          {/* Damages */}
          {damageFlags.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Gemeldete Schäden</h3>
              <div className="flex flex-wrap gap-2">
                {damageFlags.map((flag) => (
                  <span
                    key={flag}
                    className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm"
                  >
                    {DAMAGE_LABELS[flag]}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="p-5 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Vorläufiges Angebot</span>
              <span className="text-3xl font-bold text-primary">
                {formatEuro(priceBreakdown.finalPriceEuro)}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Not logged in warning */}
          {status === 'unauthenticated' && (
            <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-yellow-800">
              <LogIn className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Anmeldung erforderlich</p>
                <p className="text-sm">
                  Bitte melden Sie sich an oder erstellen Sie ein Konto, um das
                  Angebot zu speichern.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={onBack}
              className="px-6 h-12 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium transition-colors"
            >
              Zurück bearbeiten
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 h-12 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Wird gespeichert...
                </>
              ) : status === 'unauthenticated' ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Anmelden & Angebot erstellen
                </>
              ) : (
                <>
                  Angebot annehmen
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-2xl mb-1">🚚</div>
          <p className="text-xs text-muted">Kostenloser Versand</p>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-2xl mb-1">💰</div>
          <p className="text-xs text-muted">48h Auszahlung</p>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-2xl mb-1">🔒</div>
          <p className="text-xs text-muted">Sichere Abwicklung</p>
        </div>
      </div>
    </div>
  )
}
