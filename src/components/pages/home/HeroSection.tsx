'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Euro, CheckCircle2, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ============================================
   HERO SECTION - APPLE-STYLE 4K PREMIUM
   Vertrauensbildend, Modern, Hochwertig
   ============================================ */

const trustIndicators = [
  { value: '50.000+', label: 'Zufriedene Kunden' },
  { value: '4,9', label: 'Google Bewertung', icon: Star },
  { value: '48h', label: 'Express Auszahlung' },
  { value: '100%', label: 'Sichere Abwicklung' },
]

const features = [
  { icon: Euro, text: 'Faire Marktpreise', desc: 'Bis zu 30% mehr als Konkurrenz' },
  { icon: Zap, text: 'Blitzschnell', desc: 'Auszahlung in 24-48 Stunden' },
  { icon: Shield, text: 'Sicher & Seriös', desc: 'DSGVO-konform & TÜV-geprüft' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Trust Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">TÜV-geprüft</span>
                </span>
                <span className="w-px h-4 bg-white/20" />
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">4,9/5 Sterne</span>
                </span>
              </span>
            </motion.div>

            {/* Headline - Apple Style Large */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
            >
              Elektronik
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                fair verkaufen.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-8 text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed"
            >
              Deutschlands vertrauenswürdigster Ankauf-Service.
              Erhalten Sie in Sekunden ein faires Angebot und Ihr Geld innerhalb von 48 Stunden.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{feature.text}</p>
                    <p className="text-white/50 text-xs">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/verkaufen"
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-bold text-lg rounded-2xl shadow-2xl shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-[1.02]"
              >
                Jetzt Gerät bewerten
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#wie-es-funktioniert"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg rounded-2xl transition-all duration-300"
              >
                So funktioniert's
              </Link>
            </motion.div>

            {/* Trust Micro-stats */}
            <motion.div
              variants={itemVariants}
              className="mt-16 pt-10 border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {trustIndicators.map((stat, index) => (
                  <div key={index} className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        {stat.value}
                      </span>
                      {stat.icon && (
                        <stat.icon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Premium Device Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-[80px] rounded-full" />

            {/* Main Card */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-[2rem] p-10 border border-white/20 shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="px-4 py-1.5 bg-green-500/20 text-green-400 text-sm font-medium rounded-full">
                  Sofortangebot
                </span>
                <span className="text-white/40 text-sm">Heute aktualisiert</span>
              </div>

              {/* Device Display */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl mb-6 shadow-xl">
                  <span className="text-6xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  iPhone 16 Pro Max
                </h3>
                <p className="text-white/50">256 GB · Titan Schwarz</p>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Unser Angebot</span>
                  <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    +12% über Markt
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">980</span>
                  <span className="text-2xl font-bold text-white/70">€</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <Zap className="w-5 h-5 text-amber-400 mb-2" />
                  <p className="text-white font-medium text-sm">Express</p>
                  <p className="text-white/40 text-xs">Geld in 24h</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <Shield className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-white font-medium text-sm">Versichert</p>
                  <p className="text-white/40 text-xs">Kostenloser Versand</p>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/verkaufen"
                className="w-full flex items-center justify-center gap-2 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-white/90 transition-colors"
              >
                Preis berechnen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-6 -right-6 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-green-500/30"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Auszahlung garantiert</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute -bottom-4 -left-4 px-5 py-3 bg-white rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['bg-blue-500', 'bg-green-500', 'bg-purple-500'].map((color, i) => (
                    <div key={i} className={cn('w-8 h-8 rounded-full border-2 border-white', color)} />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">+2.847</p>
                  <p className="text-xs text-gray-500">Verkäufe diese Woche</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
