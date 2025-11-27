'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { SectionLayout } from '@/components/layout/SectionLayout'
import { DeviceSelector } from '@/components/calculator/DeviceSelector'
import { ConditionSelector } from '@/components/calculator/ConditionSelector'
import { PriceDisplay, CompactPriceDisplay } from '@/components/calculator/PriceDisplay'
import { OfferSummary } from '@/components/calculator/OfferSummary'
import { calculatePrice, PriceBreakdown } from '@/lib/calculator'
import { DeviceModel, ConditionLevel, DamageFlag } from '@/types'
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'

/* ============================================
   VERKAUFEN PAGE - CALCULATOR WIZARD
   Phase 4: Calculator & Offer Logic
   ============================================ */

type WizardStep = 'device' | 'condition' | 'summary'

const STEPS: { id: WizardStep; label: string; number: number }[] = [
  { id: 'device', label: 'Gerät wählen', number: 1 },
  { id: 'condition', label: 'Zustand', number: 2 },
  { id: 'summary', label: 'Angebot', number: 3 },
]

function VerkaufenContent() {
  const searchParams = useSearchParams()
  const deviceId = searchParams.get('device')

  const [currentStep, setCurrentStep] = useState<WizardStep>('device')
  const [selectedDevice, setSelectedDevice] = useState<DeviceModel | null>(null)
  const [selectedCondition, setSelectedCondition] = useState<ConditionLevel | null>(null)
  const [selectedDamageFlags, setSelectedDamageFlags] = useState<DamageFlag[]>([])
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null)
  const [isLoadingDevice, setIsLoadingDevice] = useState(false)

  // Load device from URL parameter
  useEffect(() => {
    const loadDeviceFromUrl = async () => {
      if (deviceId && !selectedDevice) {
        setIsLoadingDevice(true)
        try {
          const response = await fetch(`/api/devices`)
          const data = await response.json()
          if (data.success) {
            const device = data.data.find((d: DeviceModel) => d.id === deviceId)
            if (device) {
              setSelectedDevice(device)
              setCurrentStep('condition')
            }
          }
        } catch (error) {
          console.error('Failed to load device from URL:', error)
        } finally {
          setIsLoadingDevice(false)
        }
      }
    }

    loadDeviceFromUrl()
  }, [deviceId, selectedDevice])

  // Calculate price whenever inputs change
  useEffect(() => {
    if (selectedDevice && selectedCondition) {
      const breakdown = calculatePrice(
        selectedDevice.basePriceEuro,
        selectedCondition,
        selectedDamageFlags
      )
      setPriceBreakdown(breakdown)
    } else {
      setPriceBreakdown(null)
    }
  }, [selectedDevice, selectedCondition, selectedDamageFlags])

  const handleDeviceSelect = (device: DeviceModel | null) => {
    setSelectedDevice(device)
    if (device) {
      // Auto-advance to condition step
      setCurrentStep('condition')
    }
  }

  const handleConditionChange = (condition: ConditionLevel) => {
    setSelectedCondition(condition)
  }

  const handleDamageFlagsChange = (flags: DamageFlag[]) => {
    setSelectedDamageFlags(flags)
  }

  const handleContinueToSummary = () => {
    if (selectedDevice && selectedCondition && priceBreakdown) {
      setCurrentStep('summary')
    }
  }

  const handleBack = () => {
    if (currentStep === 'summary') {
      setCurrentStep('condition')
    } else if (currentStep === 'condition') {
      setCurrentStep('device')
    }
  }

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep)

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-primary via-primary-dark to-gray-900">
      {/* Header */}
      <SectionLayout
        id="verkaufen-header"
        alignment="center"
        background="none"
        paddingY="md"
      >
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm font-medium text-white/90 mb-4">
            Preiskalkulator
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Gerät verkaufen{' '}
            <span className="text-accent">& Geld erhalten</span>
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Wählen Sie Ihr Gerät aus und erhalten Sie sofort ein unverbindliches
            Angebot.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const isActive = step.id === currentStep
              const isComplete = index < currentStepIndex

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        isComplete
                          ? 'bg-accent text-white'
                          : isActive
                          ? 'bg-white text-primary'
                          : 'bg-white/20 text-white/50'
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        isActive ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-16 sm:w-24 h-0.5 mx-2 ${
                        index < currentStepIndex
                          ? 'bg-accent'
                          : 'bg-white/20'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </SectionLayout>

      {/* Main Content */}
      <div className="bg-gray-50 rounded-t-3xl min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Loading State for URL Device */}
          {isLoadingDevice && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-gray-600">Gerät wird geladen...</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Device Selection */}
            {currentStep === 'device' && !isLoadingDevice && (
              <motion.div
                key="device"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <DeviceSelector
                      onSelect={handleDeviceSelect}
                      selectedDevice={selectedDevice}
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      <PriceDisplay
                        breakdown={null}
                        deviceName={selectedDevice
                          ? `${selectedDevice.brand} ${selectedDevice.modelName}`
                          : undefined}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Condition Assessment */}
            {currentStep === 'condition' && (
              <motion.div
                key="condition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Back Button & Device Info */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                      </button>
                      {selectedDevice && (
                        <div className="text-sm text-muted">
                          <span className="font-medium text-gray-900">
                            {selectedDevice.brand} {selectedDevice.modelName}
                          </span>
                          {selectedDevice.storageGb && (
                            <span> · {selectedDevice.storageGb} GB</span>
                          )}
                        </div>
                      )}
                    </div>

                    <ConditionSelector
                      onConditionChange={handleConditionChange}
                      onDamageFlagsChange={handleDamageFlagsChange}
                      selectedCondition={selectedCondition}
                      selectedDamageFlags={selectedDamageFlags}
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-4">
                      <PriceDisplay
                        breakdown={priceBreakdown}
                        deviceName={
                          selectedDevice
                            ? `${selectedDevice.brand} ${selectedDevice.modelName}`
                            : undefined
                        }
                      />

                      {/* Continue Button */}
                      {selectedCondition && priceBreakdown && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={handleContinueToSummary}
                          className="w-full flex items-center justify-center gap-2 h-14 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors shadow-lg shadow-accent/30"
                        >
                          Weiter zur Zusammenfassung
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Summary & Submit */}
            {currentStep === 'summary' && selectedDevice && selectedCondition && priceBreakdown && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-2xl mx-auto">
                  <OfferSummary
                    device={selectedDevice}
                    condition={selectedCondition}
                    damageFlags={selectedDamageFlags}
                    priceBreakdown={priceBreakdown}
                    onBack={handleBack}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Wrap in Suspense for useSearchParams
export default function VerkaufenPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary via-primary-dark to-gray-900">
        <Loader2 className="w-10 h-10 animate-spin text-white" />
      </div>
    }>
      <VerkaufenContent />
    </Suspense>
  )
}
