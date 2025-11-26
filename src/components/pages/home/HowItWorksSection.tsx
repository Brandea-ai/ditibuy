'use client'

import { motion } from 'framer-motion'
import { Calculator, Package, CreditCard, ArrowRight } from 'lucide-react'
import { SectionLayout, SectionHeader } from '@/components/layout/SectionLayout'
import { ButtonLink } from '@/components/ui'

/* ============================================
   HOW IT WORKS SECTION
   Phase 1: Landing Page Sections

   Alignment: CENTER
   Purpose: 3 Schritte visuell erklärt
   ============================================ */

const steps = [
  {
    number: 1,
    icon: Calculator,
    title: 'Gerät bewerten',
    description:
      'Wählen Sie Ihr Gerät aus und beantworten Sie ein paar Fragen zum Zustand. Sie erhalten sofort ein unverbindliches Angebot.',
    color: 'from-primary to-primary-600',
  },
  {
    number: 2,
    icon: Package,
    title: 'Gerät einsenden',
    description:
      'Senden Sie Ihr Gerät kostenlos an uns. Wir prüfen es sorgfältig und bestätigen den Ankaufswert innerhalb von 24 Stunden.',
    color: 'from-secondary to-secondary-600',
  },
  {
    number: 3,
    icon: CreditCard,
    title: 'Geld erhalten',
    description:
      'Nach Ihrer Bestätigung überweisen wir den Betrag innerhalb von 48 Stunden auf Ihr Konto. Schnell, sicher, zuverlässig.',
    color: 'from-success to-emerald-600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function HowItWorksSection() {
  return (
    <SectionLayout
      id="wie-es-funktioniert"
      alignment="center"
      background="default"
      paddingY="lg"
    >
      <SectionHeader
        badge="So einfach geht's"
        title="In 3 Schritten"
        titleHighlight="zum Geld"
        description="Der Verkauf Ihrer Elektronik war noch nie so einfach. Transparent, schnell und fair."
        alignment="center"
      />

      {/* Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid md:grid-cols-3 gap-8 relative"
      >
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-secondary to-success" />

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            variants={cardVariants}
            className="relative"
          >
            {/* Step Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 relative z-10 h-full">
              {/* Number Badge */}
              <div
                className={`absolute -top-4 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div className="mt-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-gray-700" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-muted leading-relaxed">{step.description}</p>
            </div>

            {/* Arrow (Mobile) */}
            {index < steps.length - 1 && (
              <div className="flex justify-center my-4 md:hidden">
                <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <ButtonLink href="/verkaufen" variant="primary" size="xl">
          Jetzt starten
          <ArrowRight className="w-5 h-5" />
        </ButtonLink>
        <p className="mt-4 text-sm text-muted">
          Kostenlos und unverbindlich – in unter 2 Minuten
        </p>
      </motion.div>
    </SectionLayout>
  )
}

export default HowItWorksSection
