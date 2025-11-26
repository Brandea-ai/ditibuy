'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Euro } from 'lucide-react'
import { SectionLayout } from '@/components/layout/SectionLayout'
import { Button, ButtonLink } from '@/components/ui'
import { cn } from '@/lib/utils'

/* ============================================
   HERO SECTION
   Phase 1: Landing Page Sections

   Alignment: LEFT
   Purpose: Klare Value Proposition & Haupt-CTA
   ============================================ */

const features = [
  { icon: Euro, text: 'Faire Preise' },
  { icon: Zap, text: 'Schnelle Auszahlung' },
  { icon: Shield, text: 'Sicher & DSGVO' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function HeroSection() {
  return (
    <SectionLayout
      id="hero"
      alignment="full"
      background="gradient"
      paddingY="xl"
      className="relative min-h-[90vh] flex items-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <span className="text-lg">🏔️</span>
                Exklusiv für Bayern
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
            >
              Elektronik verkaufen
              <span className="block text-accent mt-2">einfach & fair</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-white/90 max-w-xl"
            >
              Verkaufen Sie Ihre gebrauchten Smartphones, Tablets und Laptops
              schnell und sicher. Transparente Preise, schnelle Auszahlung –
              regional in Bayern.
            </motion.p>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-8"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm"
                >
                  <feature.icon className="w-5 h-5 text-accent" />
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <ButtonLink
                href="/verkaufen"
                variant="accent"
                size="xl"
                className="group"
              >
                Jetzt Gerät verkaufen
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </ButtonLink>

              <ButtonLink
                href="#wie-es-funktioniert"
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                So funktioniert&apos;s
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Device Mockup Placeholder */}
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    iPhone 15 Pro
                  </h3>
                  <p className="text-white/70 mb-6">Zustand: Sehr gut</p>

                  <div className="bg-white/20 rounded-2xl p-6">
                    <p className="text-sm text-white/70 mb-1">Unser Angebot</p>
                    <p className="text-4xl font-bold text-accent">
                      bis zu 850 €
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-6 -right-6 bg-accent text-gray-900 rounded-2xl px-4 py-2 font-bold shadow-lg"
              >
                +15% Bonus
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">
                    Auszahlung in 48h
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </SectionLayout>
  )
}

export default HeroSection
