'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Smartphone, Tablet, Laptop, Watch, Gamepad2, Camera, Package, ArrowRight, Star, TrendingUp } from 'lucide-react'

/* ============================================
   KATEGORIEN ÜBERSICHT - PREMIUM DESIGN
   Alle Produkt-Kategorien auf einen Blick
   ============================================ */

const categories = [
  {
    id: 'smartphone',
    name: 'Smartphones',
    description: 'iPhone, Samsung Galaxy, Google Pixel und mehr',
    icon: Smartphone,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    count: '180+',
    topBrands: ['Apple', 'Samsung', 'Google', 'OnePlus'],
    popularModel: 'iPhone 16 Pro Max',
    maxPrice: '980€',
  },
  {
    id: 'tablet',
    name: 'Tablets',
    description: 'iPad, Galaxy Tab, Surface und mehr',
    icon: Tablet,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    count: '50+',
    topBrands: ['Apple', 'Samsung', 'Microsoft'],
    popularModel: 'iPad Pro 13" (M4)',
    maxPrice: '1.600€',
  },
  {
    id: 'laptop',
    name: 'Laptops',
    description: 'MacBook, ThinkPad, Surface und mehr',
    icon: Laptop,
    color: 'from-slate-600 to-slate-800',
    bgColor: 'bg-slate-50',
    count: '40+',
    topBrands: ['Apple', 'Lenovo', 'Dell', 'HP'],
    popularModel: 'MacBook Pro 16" (M3 Max)',
    maxPrice: '3.400€',
  },
  {
    id: 'smartwatch',
    name: 'Smartwatches',
    description: 'Apple Watch, Galaxy Watch, Garmin und mehr',
    icon: Watch,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    count: '35+',
    topBrands: ['Apple', 'Samsung', 'Garmin', 'Google'],
    popularModel: 'Apple Watch Ultra 2',
    maxPrice: '520€',
  },
  {
    id: 'konsole',
    name: 'Konsolen',
    description: 'PlayStation, Xbox, Nintendo Switch und mehr',
    icon: Gamepad2,
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    count: '25+',
    topBrands: ['Sony', 'Microsoft', 'Nintendo', 'Valve'],
    popularModel: 'PlayStation 5 Pro',
    maxPrice: '550€',
  },
  {
    id: 'kamera',
    name: 'Kameras',
    description: 'Sony Alpha, Canon EOS, DJI Drohnen und mehr',
    icon: Camera,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    count: '60+',
    topBrands: ['Sony', 'Canon', 'Nikon', 'DJI'],
    popularModel: 'Sony Alpha 7R V',
    maxPrice: '4.500€',
  },
  {
    id: 'sonstiges',
    name: 'Sonstiges',
    description: 'AirPods, VR Headsets, E-Reader und mehr',
    icon: Package,
    color: 'from-cyan-500 to-teal-600',
    bgColor: 'bg-cyan-50',
    count: '50+',
    topBrands: ['Apple', 'Sony', 'Meta', 'Bose'],
    popularModel: 'Apple Vision Pro',
    maxPrice: '2.900€',
  },
]

export default function KategorienPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full mb-6">
              Über 400 Geräte zum Verkauf
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Alle Kategorien
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
              Wählen Sie Ihre Produktkategorie und erhalten Sie sofort ein faires Angebot für Ihr Gerät
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/kategorien/${category.id}`}>
                  <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full">
                    {/* Category Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Count Badge */}
                    <span className="absolute top-8 right-8 px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                      {category.count} Geräte
                    </span>

                    {/* Title & Description */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {category.description}
                    </p>

                    {/* Top Brands */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Top Marken</p>
                      <div className="flex flex-wrap gap-2">
                        {category.topBrands.map((brand) => (
                          <span key={brand} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-lg">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Popular Model Highlight */}
                    <div className={`${category.bgColor} rounded-2xl p-4 mb-6`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-amber-500" />
                            <span className="text-xs text-gray-500">Beliebtestes Modell</span>
                          </div>
                          <p className="font-semibold text-gray-900">{category.popularModel}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">bis zu</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                            {category.maxPrice}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                        Jetzt verkaufen
                      </span>
                      <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Gerät nicht gefunden?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Kontaktieren Sie uns und wir erstellen Ihnen ein individuelles Angebot für Ihr Gerät
          </p>
          <Link
            href="/verkaufen"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-600 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-colors shadow-xl"
          >
            Direkt zum Preiskalkulator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
