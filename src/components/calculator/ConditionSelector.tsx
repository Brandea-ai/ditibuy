'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ThumbsUp,
  Minus,
  AlertTriangle,
  XCircle,
  Check,
  Info,
} from 'lucide-react'
import {
  ConditionLevel,
  DamageFlag,
  CONDITION_LABELS,
  DAMAGE_LABELS,
} from '@/types'
import { getConditionDescription, getDamageDescription } from '@/lib/calculator'

/* ============================================
   CONDITION SELECTOR
   Phase 4: Calculator Components
   ============================================ */

const CONDITION_ICONS: Record<ConditionLevel, React.ComponentType<{ className?: string }>> = {
  SEHR_GUT: Sparkles,
  GUT: ThumbsUp,
  GEBRAUCHT: Minus,
  STARK_GEBRAUCHT: AlertTriangle,
  DEFEKT: XCircle,
}

const CONDITION_COLORS: Record<ConditionLevel, string> = {
  SEHR_GUT: 'border-green-500 bg-green-50 text-green-700',
  GUT: 'border-blue-500 bg-blue-50 text-blue-700',
  GEBRAUCHT: 'border-yellow-500 bg-yellow-50 text-yellow-700',
  STARK_GEBRAUCHT: 'border-orange-500 bg-orange-50 text-orange-700',
  DEFEKT: 'border-red-500 bg-red-50 text-red-700',
}

interface ConditionSelectorProps {
  onConditionChange: (condition: ConditionLevel) => void
  onDamageFlagsChange: (flags: DamageFlag[]) => void
  selectedCondition: ConditionLevel | null
  selectedDamageFlags: DamageFlag[]
}

export function ConditionSelector({
  onConditionChange,
  onDamageFlagsChange,
  selectedCondition,
  selectedDamageFlags,
}: ConditionSelectorProps) {
  const [showDamageInfo, setShowDamageInfo] = useState<DamageFlag | null>(null)

  const handleDamageToggle = (flag: DamageFlag) => {
    if (selectedDamageFlags.includes(flag)) {
      onDamageFlagsChange(selectedDamageFlags.filter((f) => f !== flag))
    } else {
      onDamageFlagsChange([...selectedDamageFlags, flag])
    }
  }

  const conditionOrder: ConditionLevel[] = [
    'SEHR_GUT',
    'GUT',
    'GEBRAUCHT',
    'STARK_GEBRAUCHT',
    'DEFEKT',
  ]

  const damageOrder: DamageFlag[] = [
    'DISPLAY_KRATZER',
    'DISPLAY_RISS',
    'DISPLAY_DEFEKT',
    'GEHAEUSE_KRATZER',
    'GEHAEUSE_DELLE',
    'AKKU_SCHWACH',
    'KAMERA_DEFEKT',
    'WASSERSCHADEN',
    'KEINE_ORIGINALVERPACKUNG',
  ]

  return (
    <div className="space-y-8">
      {/* Condition Selection */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          In welchem Zustand ist Ihr Gerät?
        </h3>
        <p className="text-muted mb-6">
          Wählen Sie die Beschreibung, die am besten passt.
        </p>

        <div className="space-y-3">
          {conditionOrder.map((condition) => {
            const Icon = CONDITION_ICONS[condition]
            const isSelected = selectedCondition === condition

            return (
              <motion.button
                key={condition}
                onClick={() => onConditionChange(condition)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? CONDITION_COLORS[condition]
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/50' : 'bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? 'text-current' : 'text-gray-500'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {CONDITION_LABELS[condition]}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-current rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      isSelected ? 'opacity-80' : 'text-gray-500'
                    }`}
                  >
                    {getConditionDescription(condition)}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Damage Flags */}
      {selectedCondition && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Hat Ihr Gerät folgende Schäden?
          </h3>
          <p className="text-muted mb-6">
            Wählen Sie alle zutreffenden Schäden aus. Dies hilft uns, ein genaues
            Angebot zu erstellen.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {damageOrder.map((flag) => {
              const isSelected = selectedDamageFlags.includes(flag)

              return (
                <div key={flag} className="relative">
                  <button
                    onClick={() => handleDamageToggle(flag)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span
                      className={`font-medium ${
                        isSelected ? 'text-red-700' : 'text-gray-700'
                      }`}
                    >
                      {DAMAGE_LABELS[flag]}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDamageInfo(showDamageInfo === flag ? null : flag)
                      }}
                      className="ml-auto p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </button>

                  {/* Info Tooltip */}
                  {showDamageInfo === flag && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 left-0 right-0 mt-2 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl"
                    >
                      {getDamageDescription(flag)}
                      <div className="absolute -top-2 left-6 w-4 h-4 bg-gray-900 rotate-45" />
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Selected damages summary */}
          {selectedDamageFlags.length > 0 && (
            <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <p className="text-sm text-orange-700">
                <strong>{selectedDamageFlags.length} Schaden/Schäden</strong>{' '}
                ausgewählt. Diese werden bei der Preisberechnung berücksichtigt.
              </p>
            </div>
          )}

          {selectedDamageFlags.length === 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-700">
                Keine Schäden ausgewählt. Das wirkt sich positiv auf Ihren Preis aus!
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
