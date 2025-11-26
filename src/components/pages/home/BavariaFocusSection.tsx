'use client'

import { motion } from 'framer-motion'
import { MapPin, Heart, Users, Leaf } from 'lucide-react'
import { SectionLayout } from '@/components/layout/SectionLayout'

/* ============================================
   BAVARIA FOCUS SECTION
   Phase 1: Landing Page Sections

   Alignment: LEFT
   Purpose: Regionale Differenzierung
   ============================================ */

const benefits = [
  {
    icon: MapPin,
    title: 'Regionale Nähe',
    description:
      'Wir sind in Bayern verwurzelt und verstehen die Bedürfnisse unserer lokalen Kunden.',
  },
  {
    icon: Heart,
    title: 'Persönlicher Service',
    description:
      'Bei uns sind Sie keine Nummer. Persönliche Betreuung von Anfang bis Ende.',
  },
  {
    icon: Users,
    title: 'Lokale Arbeitsplätze',
    description:
      'Mit Ihrem Verkauf unterstützen Sie Arbeitsplätze direkt hier in Bayern.',
  },
  {
    icon: Leaf,
    title: 'Nachhaltig & Regional',
    description:
      'Kurze Wege, weniger CO₂. Gemeinsam für eine bessere Umwelt.',
  },
]

const cities = [
  'München',
  'Nürnberg',
  'Augsburg',
  'Regensburg',
  'Würzburg',
  'Ingolstadt',
  'Fürth',
  'Erlangen',
]

export function BavariaFocusSection() {
  return (
    <SectionLayout
      id="bayern"
      alignment="full"
      background="surface"
      paddingY="lg"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-primary mb-4">🏔️ Made in Bavaria</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Warum regional
              <span className="block gradient-text">besser ist</span>
            </h2>
            <p className="text-lg text-muted mb-8">
              BayernAnkauf ist mehr als ein Ankaufsportal. Wir sind Teil der
              bayerischen Gemeinschaft und stolz darauf, lokale Werte zu leben.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-muted">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bavaria Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Bavaria Map Placeholder */}
            <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/10">
              {/* Stylized Map */}
              <div className="aspect-square relative">
                {/* Center Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center"
                  >
                    <div className="text-center">
                      <span className="text-4xl">🏔️</span>
                      <p className="text-sm font-bold text-gray-900 mt-1">
                        Bayern
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* City Dots */}
                {cities.map((city, index) => {
                  const angle = (index / cities.length) * Math.PI * 2
                  const radius = 40 // percentage from center
                  const x = 50 + Math.cos(angle) * radius
                  const y = 50 + Math.sin(angle) * radius

                  return (
                    <motion.div
                      key={city}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="relative group cursor-pointer">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          {city}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Connecting Lines (decorative) */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  {cities.map((_, index) => {
                    const angle = (index / cities.length) * Math.PI * 2
                    const radius = 40
                    const x = 50 + Math.cos(angle) * radius
                    const y = 50 + Math.sin(angle) * radius

                    return (
                      <motion.line
                        key={index}
                        x1="50"
                        y1="50"
                        x2={x}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="0.2"
                        className="text-primary/30"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                      />
                    )
                  })}
                </svg>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">8+</p>
                  <p className="text-xs text-muted">Städte</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">10K+</p>
                  <p className="text-xs text-muted">Kunden</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-xs text-muted">Bayern</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default BavariaFocusSection
