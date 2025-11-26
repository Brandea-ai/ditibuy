'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, Tablet, Laptop, Watch, Gamepad2 } from 'lucide-react'
import { SectionLayout } from '@/components/layout/SectionLayout'
import { ButtonLink } from '@/components/ui'

/* ============================================
   CALCULATOR TEASER SECTION
   Phase 1: Landing Page Sections

   Alignment: RIGHT
   Purpose: Vorschau des Kalkulators
   ============================================ */

const categories = [
  { icon: Smartphone, label: 'Smartphones', count: '500+', popular: true },
  { icon: Tablet, label: 'Tablets', count: '200+', popular: false },
  { icon: Laptop, label: 'Laptops', count: '300+', popular: false },
  { icon: Watch, label: 'Smartwatches', count: '100+', popular: false },
  { icon: Gamepad2, label: 'Konsolen', count: '50+', popular: false },
]

const popularDevices = [
  { name: 'iPhone 15 Pro Max', price: 'bis 950 €' },
  { name: 'iPhone 14 Pro', price: 'bis 650 €' },
  { name: 'Samsung Galaxy S24', price: 'bis 700 €' },
  { name: 'MacBook Air M2', price: 'bis 850 €' },
]

export function CalculatorTeaserSection() {
  return (
    <SectionLayout
      id="kalkulator"
      alignment="full"
      background="default"
      paddingY="lg"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Categories */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-secondary mb-4">Über 1.000 Geräte</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Welches Gerät
              <span className="block gradient-text">möchten Sie verkaufen?</span>
            </h2>
            <p className="text-lg text-muted mb-8 max-w-md">
              Wählen Sie aus über 1.000 Gerätemodellen und erhalten Sie
              sofort ein unverbindliches Angebot.
            </p>

            {/* Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {categories.map((category, index) => (
                <motion.a
                  key={index}
                  href="/verkaufen"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-colors ${
                    category.popular
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-100 bg-white hover:border-primary/50'
                  }`}
                >
                  {category.popular && (
                    <span className="absolute -top-2 right-2 px-2 py-0.5 bg-primary text-white text-xs font-medium rounded-full">
                      Beliebt
                    </span>
                  )}
                  <category.icon
                    className={`w-8 h-8 mb-2 ${
                      category.popular ? 'text-primary' : 'text-gray-600'
                    }`}
                  />
                  <span className="font-medium text-gray-900">
                    {category.label}
                  </span>
                  <span className="text-sm text-muted">{category.count}</span>
                </motion.a>
              ))}
            </div>

            <ButtonLink href="/verkaufen" variant="primary" size="lg">
              Alle Kategorien ansehen
              <ArrowRight className="w-5 h-5" />
            </ButtonLink>
          </motion.div>

          {/* Right: Calculator Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Calculator Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Preiskalkulator</h3>
                <p className="text-white/80 text-sm">
                  Sofort-Angebot in 30 Sekunden
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Popular Devices */}
                <p className="text-sm font-medium text-gray-500 mb-4">
                  Beliebte Geräte heute:
                </p>
                <div className="space-y-3">
                  {popularDevices.map((device, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          📱
                        </div>
                        <span className="font-medium text-gray-900">
                          {device.name}
                        </span>
                      </div>
                      <span className="font-bold text-success">
                        {device.price}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <ButtonLink
                    href="/verkaufen"
                    variant="accent"
                    size="lg"
                    className="w-full"
                  >
                    Mein Gerät bewerten
                    <ArrowRight className="w-5 h-5" />
                  </ButtonLink>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-4 -right-4 bg-accent text-gray-900 px-4 py-2 rounded-xl font-bold shadow-lg"
            >
              🎉 +10% Bonus diese Woche
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default CalculatorTeaserSection
