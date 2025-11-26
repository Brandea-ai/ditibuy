'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Star, Clock, Award, MapPin } from 'lucide-react'
import { SectionLayout, SectionHeader } from '@/components/layout/SectionLayout'

/* ============================================
   TRUST SECTION
   Phase 1: Landing Page Sections

   Alignment: CENTER
   Purpose: Siegel, Zahlen, Bayern-Fokus
   ============================================ */

const stats = [
  {
    icon: Users,
    value: '10.000+',
    label: 'Zufriedene Kunden',
    color: 'text-primary',
  },
  {
    icon: Star,
    value: '4,9',
    label: 'Sterne Bewertung',
    color: 'text-accent',
  },
  {
    icon: Clock,
    value: '48h',
    label: 'Schnelle Auszahlung',
    color: 'text-secondary',
  },
  {
    icon: MapPin,
    value: '100%',
    label: 'Regional in Bayern',
    color: 'text-success',
  },
]

const trustBadges = [
  {
    icon: Shield,
    title: 'SSL Verschlüsselt',
    description: 'Sichere Datenübertragung',
  },
  {
    icon: Award,
    title: 'DSGVO Konform',
    description: 'Datenschutz garantiert',
  },
  {
    icon: Users,
    title: 'Geprüfter Anbieter',
    description: 'Trusted Shops zertifiziert',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function TrustSection() {
  return (
    <SectionLayout
      id="vertrauen"
      alignment="center"
      background="surface"
      paddingY="lg"
    >
      <SectionHeader
        badge="Warum BayernAnkauf?"
        title="Vertrauen Sie dem"
        titleHighlight="Marktführer"
        description="Tausende zufriedene Kunden in Bayern vertrauen uns bereits ihre Geräte an."
        alignment="center"
      />

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="text-center"
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 mb-4 ${stat.color}`}
            >
              <stat.icon className="w-8 h-8" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="flex flex-wrap justify-center gap-6 md:gap-8"
      >
        {trustBadges.map((badge, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl"
          >
            <badge.icon className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-gray-900">{badge.title}</p>
              <p className="text-sm text-muted">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bayern Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex justify-center"
      >
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
          <span className="text-4xl">🏔️</span>
          <div>
            <p className="font-bold text-gray-900">100% Bayern</p>
            <p className="text-sm text-muted">
              Regional verwurzelt, persönlicher Service
            </p>
          </div>
        </div>
      </motion.div>
    </SectionLayout>
  )
}

export default TrustSection
