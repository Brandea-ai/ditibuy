'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Clock, CreditCard, Truck, HeadphonesIcon, BadgeCheck, Lock, Users, Star, MapPin } from 'lucide-react'

/* ============================================
   TRUST SECTION - PREMIUM VERTRAUENSBILDUNG
   Psychologisch optimiert für Conversions
   Apple-Style 4K Design
   ============================================ */

const stats = [
  { value: '50.000+', label: 'Zufriedene Kunden', sublabel: 'seit 2020' },
  { value: '12 Mio €', label: 'Ausgezahlt', sublabel: 'an unsere Kunden' },
  { value: '4,9/5', label: 'Bewertung', sublabel: 'auf Google & Trustpilot' },
  { value: '< 48h', label: 'Auszahlung', sublabel: 'garantiert' },
]

const trustBadges = [
  { icon: BadgeCheck, label: 'TÜV geprüft', desc: 'Zertifizierte Sicherheit' },
  { icon: Lock, label: 'SSL verschlüsselt', desc: '256-bit Verschlüsselung' },
  { icon: Shield, label: 'DSGVO konform', desc: 'Datenschutz garantiert' },
  { icon: Award, label: 'Trusted Shops', desc: 'Käuferschutz' },
]

const benefits = [
  {
    icon: CreditCard,
    title: 'Sofortige Auszahlung',
    description: 'Nach Prüfung Ihres Geräts überweisen wir den Betrag innerhalb von 24-48 Stunden auf Ihr Konto.',
    highlight: '24-48h',
  },
  {
    icon: Truck,
    title: 'Kostenloser Versand',
    description: 'Wir übernehmen alle Versandkosten. Sie erhalten ein vorfrankiertes Versandlabel per E-Mail.',
    highlight: '0€',
  },
  {
    icon: HeadphonesIcon,
    title: 'Persönlicher Service',
    description: 'Unser Support-Team steht Ihnen bei Fragen jederzeit zur Verfügung - auch am Wochenende.',
    highlight: '7 Tage',
  },
  {
    icon: Shield,
    title: 'Sichere Abwicklung',
    description: 'Ihre Daten werden auf dem Gerät professionell und DSGVO-konform gelöscht. 100% sicher.',
    highlight: '100%',
  },
]

const mediaLogos = [
  'CHIP', 'FOCUS', 'Handelsblatt', 'Süddeutsche', 't3n', 'Gründerszene'
]

export function TrustSection() {
  return (
    <section id="vertrauen" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">

        {/* Stats Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4">
              Warum uns vertrauen?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Zahlen, die für sich sprechen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tausende Kunden haben uns bereits ihr Vertrauen geschenkt.
              Werden auch Sie Teil unserer Erfolgsgeschichte.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.sublabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-[2rem] p-10 lg:p-14">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ihre Sicherheit ist unsere Priorität
              </h3>
              <p className="text-white/60 max-w-2xl mx-auto">
                Wir sind zertifiziert und geprüft - für Ihre absolute Sicherheit
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/15 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl mb-4">
                    <badge.icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <div className="font-semibold text-white mb-1">{badge.label}</div>
                  <div className="text-sm text-white/50">{badge.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Das erwartet Sie bei uns
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wir machen den Verkauf Ihrer Elektronik so einfach und angenehm wie möglich
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <benefit.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {benefit.title}
                      </h3>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-bold rounded-full">
                        {benefit.highlight}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bayern Regional Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center">
                  <span className="text-6xl lg:text-7xl">🏔️</span>
                </div>
              </div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  100% aus Bayern - 100% persönlich
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Als regionaler Anbieter kennen wir die Bedürfnisse unserer bayerischen Kunden.
                  Persönlicher Service, kurze Wege und ein Team, das für Sie da ist.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-semibold text-blue-900">München, Bayern</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Media Mentions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-8">
            Bekannt aus den Medien
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {mediaLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl lg:text-3xl font-bold text-gray-300 hover:text-gray-400 transition-colors"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default TrustSection
