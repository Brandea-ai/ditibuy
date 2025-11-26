'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Gamepad2,
  Camera,
  Package,
  ChevronRight,
  Search,
  Check,
  Loader2,
} from 'lucide-react'
import { DeviceCategory, DeviceModel, CATEGORY_LABELS } from '@/types'

/* ============================================
   DEVICE SELECTOR
   Phase 4: Calculator Components
   ============================================ */

const CATEGORY_ICONS: Record<DeviceCategory, React.ComponentType<{ className?: string }>> = {
  SMARTPHONE: Smartphone,
  TABLET: Tablet,
  LAPTOP: Laptop,
  SMARTWATCH: Watch,
  KONSOLE: Gamepad2,
  KAMERA: Camera,
  SONSTIGES: Package,
}

interface DeviceSelectorProps {
  onSelect: (device: DeviceModel) => void
  selectedDevice?: DeviceModel | null
}

export function DeviceSelector({ onSelect, selectedDevice }: DeviceSelectorProps) {
  const [step, setStep] = useState<'category' | 'brand' | 'model'>('category')
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [devices, setDevices] = useState<DeviceModel[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch devices from API
  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedCategory) params.set('category', selectedCategory)
        if (selectedBrand) params.set('brand', selectedBrand)

        const response = await fetch(`/api/devices?${params}`)
        const data = await response.json()
        if (data.success) {
          setDevices(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch devices:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDevices()
  }, [selectedCategory, selectedBrand])

  // Get unique brands for selected category
  const brands = useMemo(() => {
    if (!selectedCategory) return []
    const categoryDevices = devices.filter((d) => d.category === selectedCategory)
    const uniqueBrands = [...new Set(categoryDevices.map((d) => d.brand))]
    return uniqueBrands.sort()
  }, [devices, selectedCategory])

  // Get models for selected brand
  const models = useMemo(() => {
    if (!selectedCategory || !selectedBrand) return []
    return devices
      .filter((d) => d.category === selectedCategory && d.brand === selectedBrand)
      .filter((d) =>
        searchQuery
          ? d.modelName.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      )
      .sort((a, b) => b.basePriceEuro - a.basePriceEuro)
  }, [devices, selectedCategory, selectedBrand, searchQuery])

  const handleCategorySelect = (category: DeviceCategory) => {
    setSelectedCategory(category)
    setSelectedBrand(null)
    setStep('brand')
  }

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand)
    setStep('model')
  }

  const handleModelSelect = (device: DeviceModel) => {
    onSelect(device)
  }

  const handleBack = () => {
    if (step === 'model') {
      setSelectedBrand(null)
      setStep('brand')
    } else if (step === 'brand') {
      setSelectedCategory(null)
      setStep('category')
    }
  }

  // If device is already selected, show summary
  if (selectedDevice) {
    const Icon = CATEGORY_ICONS[selectedDevice.category]
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Ausgewähltes Gerät</p>
              <p className="text-lg font-semibold text-gray-900">
                {selectedDevice.brand} {selectedDevice.modelName}
              </p>
              {selectedDevice.storageGb && (
                <p className="text-sm text-gray-500">{selectedDevice.storageGb} GB</p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              onSelect(null as unknown as DeviceModel)
              setStep('category')
              setSelectedCategory(null)
              setSelectedBrand(null)
            }}
            className="px-4 py-2 text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors"
          >
            Ändern
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: step === 'category' ? '33%' : step === 'brand' ? '66%' : '100%',
          }}
        />
      </div>

      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm text-muted mb-2">
          {step !== 'category' && (
            <button
              onClick={handleBack}
              className="hover:text-primary transition-colors"
            >
              Zurück
            </button>
          )}
          {step !== 'category' && <ChevronRight className="w-4 h-4" />}
          {selectedCategory && (
            <>
              <span>{CATEGORY_LABELS[selectedCategory]}</span>
              {selectedBrand && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span>{selectedBrand}</span>
                </>
              )}
            </>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          {step === 'category' && 'Was möchten Sie verkaufen?'}
          {step === 'brand' && 'Welche Marke?'}
          {step === 'model' && 'Welches Modell?'}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Category Selection */}
          {step === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {(Object.keys(CATEGORY_LABELS) as DeviceCategory[]).map((category) => {
                const Icon = CATEGORY_ICONS[category]
                return (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-primary/10 rounded-xl flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
                      {CATEGORY_LABELS[category]}
                    </span>
                  </button>
                )
              })}
            </motion.div>
          )}

          {/* Brand Selection */}
          {step === 'brand' && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandSelect(brand)}
                      className="flex items-center justify-center p-5 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all font-medium text-gray-700 hover:text-primary"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Model Selection */}
          {step === 'model' && (
            <motion.div
              key="model"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Modell suchen..."
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Models List */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {models.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => handleModelSelect(device)}
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left group"
                    >
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                          {device.modelName}
                        </p>
                        {device.storageGb && (
                          <p className="text-sm text-gray-500">{device.storageGb} GB</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-primary">
                          bis {device.basePriceEuro} €
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                    </button>
                  ))}
                  {models.length === 0 && (
                    <p className="text-center text-muted py-8">
                      Keine Modelle gefunden
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
