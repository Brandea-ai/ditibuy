'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Smartphone, Tablet, Laptop, Watch, Gamepad2, Camera, Package,
  ArrowRight, Search, Filter, X, ChevronDown, Star, Shield, Zap,
  Loader2, ArrowLeft
} from 'lucide-react'
import { DeviceModel, DeviceCategory, CATEGORY_LABELS } from '@/types'

/* ============================================
   DYNAMISCHE KATEGORIEN-SEITE
   Zeigt alle Geräte einer Kategorie
   ============================================ */

const CATEGORY_CONFIG: Record<string, {
  id: DeviceCategory
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgGradient: string
  seoText: string
}> = {
  smartphone: {
    id: 'SMARTPHONE',
    name: 'Smartphones',
    description: 'iPhone, Samsung Galaxy, Google Pixel und mehr verkaufen',
    icon: Smartphone,
    color: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-950 via-indigo-950 to-slate-900',
    seoText: 'Verkaufen Sie Ihr gebrauchtes Smartphone zum Bestpreis. Wir kaufen alle gängigen Modelle von Apple iPhone, Samsung Galaxy, Google Pixel, OnePlus und mehr.',
  },
  tablet: {
    id: 'TABLET',
    name: 'Tablets',
    description: 'iPad, Galaxy Tab, Surface und mehr verkaufen',
    icon: Tablet,
    color: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-950 via-violet-950 to-slate-900',
    seoText: 'Tablet verkaufen leicht gemacht. Wir kaufen iPad Pro, iPad Air, Samsung Galaxy Tab, Microsoft Surface und weitere Tablets zu fairen Preisen.',
  },
  laptop: {
    id: 'LAPTOP',
    name: 'Laptops',
    description: 'MacBook, ThinkPad, Surface und mehr verkaufen',
    icon: Laptop,
    color: 'from-slate-600 to-slate-800',
    bgGradient: 'from-slate-900 via-gray-900 to-slate-950',
    seoText: 'Laptop verkaufen - schnell und sicher. Wir kaufen Apple MacBook, Lenovo ThinkPad, Dell XPS, HP Spectre und viele weitere Notebooks.',
  },
  smartwatch: {
    id: 'SMARTWATCH',
    name: 'Smartwatches',
    description: 'Apple Watch, Galaxy Watch, Garmin und mehr verkaufen',
    icon: Watch,
    color: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-950 via-emerald-950 to-slate-900',
    seoText: 'Smartwatch verkaufen zum Bestpreis. Wir kaufen Apple Watch, Samsung Galaxy Watch, Garmin, Google Pixel Watch und weitere Wearables.',
  },
  konsole: {
    id: 'KONSOLE',
    name: 'Spielkonsolen',
    description: 'PlayStation, Xbox, Nintendo Switch und mehr verkaufen',
    icon: Gamepad2,
    color: 'from-red-500 to-rose-600',
    bgGradient: 'from-red-950 via-rose-950 to-slate-900',
    seoText: 'Gaming-Konsole verkaufen? Wir kaufen PlayStation 5, Xbox Series X|S, Nintendo Switch, Steam Deck und mehr zu Top-Preisen.',
  },
  kamera: {
    id: 'KAMERA',
    name: 'Kameras',
    description: 'Sony Alpha, Canon EOS, DJI Drohnen und mehr verkaufen',
    icon: Camera,
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-950 via-orange-950 to-slate-900',
    seoText: 'Kamera verkaufen - DSLR, Systemkamera oder Drohne. Wir kaufen Sony Alpha, Canon EOS, Nikon Z, Fujifilm X und DJI Produkte.',
  },
  sonstiges: {
    id: 'SONSTIGES',
    name: 'Sonstiges',
    description: 'AirPods, VR Headsets, E-Reader und mehr verkaufen',
    icon: Package,
    color: 'from-cyan-500 to-teal-600',
    bgGradient: 'from-cyan-950 via-teal-950 to-slate-900',
    seoText: 'Weiteres Elektronik-Zubehör verkaufen. Wir kaufen AirPods, Kopfhörer, VR-Brillen, E-Reader und viele weitere Geräte.',
  },
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string
  const config = CATEGORY_CONFIG[categorySlug]

  const [devices, setDevices] = useState<DeviceModel[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Fetch devices
  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/devices?category=${categorySlug}`)
        const data = await response.json()
        if (data.success) {
          setDevices(data.data)
          setBrands(data.meta.brands || [])
        }
      } catch (error) {
        console.error('Failed to fetch devices:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (config) {
      fetchDevices()
    }
  }, [categorySlug, config])

  // Filter devices
  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      const matchesBrand = !selectedBrand || device.brand === selectedBrand
      const matchesSearch = !searchQuery ||
        device.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesBrand && matchesSearch
    })
  }, [devices, selectedBrand, searchQuery])

  // Group devices by brand for display
  const devicesByBrand = useMemo(() => {
    const grouped: Record<string, DeviceModel[]> = {}
    filteredDevices.forEach(device => {
      if (!grouped[device.brand]) {
        grouped[device.brand] = []
      }
      grouped[device.brand].push(device)
    })
    return grouped
  }, [filteredDevices])

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategorie nicht gefunden</h1>
          <Link href="/kategorien" className="text-amber-600 hover:text-amber-700 font-medium">
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`relative py-20 lg:py-28 bg-gradient-to-br ${config.bgGradient} overflow-hidden`}>
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-r ${config.color} opacity-20 rounded-full blur-[100px]`} />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Back Link */}
          <Link
            href="/kategorien"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Kategorien
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            <div className="max-w-2xl">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${config.color} mb-6`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                {config.name} <span className="text-amber-400">verkaufen</span>
              </h1>
              <p className="text-xl text-white/70 mb-6">
                {config.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-white/60">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Sicher & Seriös</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Auszahlung in 24-48h</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>4,9/5 Bewertung</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{devices.length}+</p>
                  <p className="text-white/60 text-sm">Geräte</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{brands.length}</p>
                  <p className="text-white/60 text-sm">Marken</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`${config.name} suchen...`}
                className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              />
            </div>

            {/* Brand Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 h-12 px-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{selectedBrand || 'Alle Marken'}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl border border-gray-200 shadow-xl p-2 z-50"
                >
                  <button
                    onClick={() => { setSelectedBrand(null); setShowFilters(false) }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${!selectedBrand ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'}`}
                  >
                    Alle Marken
                  </button>
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => { setSelectedBrand(brand); setShowFilters(false) }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedBrand === brand ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Clear Filters */}
            {(selectedBrand || searchQuery) && (
              <button
                onClick={() => { setSelectedBrand(null); setSearchQuery('') }}
                className="flex items-center gap-2 h-12 px-4 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
                Filter zurücksetzen
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Devices Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            </div>
          ) : filteredDevices.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Keine Geräte gefunden</h3>
              <p className="text-gray-600">Versuchen Sie es mit anderen Suchbegriffen oder Filtern.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(devicesByBrand).map(([brand, brandDevices]) => (
                <div key={brand}>
                  {/* Brand Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{brand}</h2>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                      {brandDevices.length} Geräte
                    </span>
                  </div>

                  {/* Devices Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {brandDevices.map((device, index) => (
                      <motion.div
                        key={device.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <Link href={`/verkaufen?device=${device.id}`}>
                          <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                            {/* Device Icon */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} mb-4 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Device Info */}
                            <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors mb-1">
                              {device.modelName}
                            </h3>
                            {device.storageGb && (
                              <p className="text-sm text-gray-500 mb-3">{device.storageGb} GB</p>
                            )}

                            {/* Price */}
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-400">bis zu</p>
                                <p className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                  {device.basePriceEuro} €
                                </p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {config.name} verkaufen bei BayernAnkauf
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {config.seoText}
            </p>
            <div className="prose prose-gray">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ihre Vorteile:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Faire Preise - bis zu 30% mehr als bei der Konkurrenz
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Blitzschnelle Auszahlung innerhalb von 24-48 Stunden
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Kostenloser und versicherter Versand
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  TÜV-geprüft und DSGVO-konform
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Über 50.000 zufriedene Kunden
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Jetzt {config.name} verkaufen
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Wählen Sie Ihr Gerät aus der Liste oder nutzen Sie unseren Preiskalkulator
          </p>
          <Link
            href="/verkaufen"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-600 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-colors shadow-xl"
          >
            Zum Preiskalkulator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
