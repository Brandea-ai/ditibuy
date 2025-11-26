'use client'

import { motion } from 'framer-motion'
import {
  TrendingDown,
  Check,
  Info,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { PriceBreakdown, formatEuro } from '@/lib/calculator'
import { CONDITION_LABELS, DAMAGE_LABELS } from '@/types'

/* ============================================
   PRICE DISPLAY
   Phase 4: Calculator Components
   ============================================ */

interface PriceDisplayProps {
  breakdown: PriceBreakdown | null
  deviceName?: string
  isCalculating?: boolean
}

export function PriceDisplay({
  breakdown,
  deviceName,
  isCalculating,
}: PriceDisplayProps) {
  if (!breakdown) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ihr Angebot wird berechnet
          </h3>
          <p className="text-muted">
            Wählen Sie ein Gerät und den Zustand aus, um Ihr persönliches Angebot
            zu sehen.
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-primary/5 via-white to-accent/5 rounded-2xl border border-primary/20 overflow-hidden"
    >
      {/* Header with Final Price */}
      <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
        <p className="text-primary-foreground/80 text-sm mb-1">
          {deviceName || 'Ihr Angebot'}
        </p>
        <div className="flex items-baseline gap-2">
          <motion.span
            key={breakdown.finalPriceEuro}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold"
          >
            {formatEuro(breakdown.finalPriceEuro)}
          </motion.span>
          <span className="text-primary-foreground/70 text-sm">
            vorläufiges Angebot
          </span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-6 space-y-4">
        {/* Base Price */}
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600">Neupreis-Basis</span>
          <span className="font-medium text-gray-900">
            {formatEuro(breakdown.basePriceEuro)}
          </span>
        </div>

        {/* Condition Deduction */}
        <div className="flex items-center justify-between py-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-orange-500" />
            <span className="text-gray-600">
              Zustand: {CONDITION_LABELS[breakdown.conditionLevel]}
            </span>
          </div>
          <span className="font-medium text-orange-600">
            -{formatEuro(breakdown.conditionDeductionEuro)}
          </span>
        </div>

        {/* Damage Deductions */}
        {breakdown.damageDeductions.length > 0 && (
          <div className="border-t border-gray-100 pt-2">
            <p className="text-sm text-gray-500 mb-2">Schäden:</p>
            <div className="space-y-2">
              {breakdown.damageDeductions.map((damage) => (
                <div
                  key={damage.flag}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {DAMAGE_LABELS[damage.flag]}
                  </span>
                  <span className="text-red-600">
                    -{formatEuro(damage.deductionEuro)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between py-3 border-t-2 border-gray-200">
          <span className="font-semibold text-gray-900">Ihr Angebot</span>
          <span className="text-2xl font-bold text-primary">
            {formatEuro(breakdown.finalPriceEuro)}
          </span>
        </div>

        {/* Info Note */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Hinweis zum Preis</p>
            <p>
              Dies ist ein vorläufiges Angebot basierend auf Ihren Angaben. Der
              endgültige Preis wird nach Prüfung des Geräts festgelegt.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500" />
            Kostenloser Versand mit DHL
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500" />
            Auszahlung innerhalb von 48 Stunden
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500" />
            14 Tage Widerrufsrecht
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ============================================
   COMPACT PRICE DISPLAY (for sticky sidebar)
   ============================================ */

interface CompactPriceDisplayProps {
  finalPrice: number
  onContinue: () => void
  disabled?: boolean
}

export function CompactPriceDisplay({
  finalPrice,
  onContinue,
  disabled,
}: CompactPriceDisplayProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600">Ihr Angebot:</span>
        <motion.span
          key={finalPrice}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold text-primary"
        >
          {formatEuro(finalPrice)}
        </motion.span>
      </div>
      <button
        onClick={onContinue}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-2 h-12 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Weiter
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
}
