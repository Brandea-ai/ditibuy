'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { SectionLayout, SectionHeader } from '@/components/layout/SectionLayout'
import { ButtonLink } from '@/components/ui'

/* ============================================
   FAQ SECTION
   Phase 1: Landing Page Sections

   Alignment: LEFT
   Purpose: Häufige Fragen beantworten
   ============================================ */

const faqs = [
  {
    question: 'Wie funktioniert der Ankaufsprozess?',
    answer:
      'Ganz einfach: Wählen Sie Ihr Gerät aus, beantworten Sie ein paar Fragen zum Zustand und erhalten Sie sofort ein Angebot. Wenn es Ihnen gefällt, senden Sie das Gerät kostenlos an uns. Nach der Prüfung erhalten Sie Ihr Geld innerhalb von 48 Stunden.',
  },
  {
    question: 'Welche Geräte kaufen Sie an?',
    answer:
      'Wir kaufen Smartphones, Tablets, Laptops, Smartwatches, Spielkonsolen und Kameras aller gängigen Marken. Über 1.000 Gerätemodelle sind in unserem Katalog – von Apple über Samsung bis hin zu Sony und Microsoft.',
  },
  {
    question: 'Wie wird der Preis berechnet?',
    answer:
      'Der Preis basiert auf dem Gerätemodell, dem Speicher, dem Zustand und eventuellen Schäden. Unser Kalkulator zeigt Ihnen transparent, wie sich der Preis zusammensetzt. Es gibt keine versteckten Abzüge.',
  },
  {
    question: 'Ist der Versand kostenlos?',
    answer:
      'Ja, der Versand ist für Sie komplett kostenlos. Nach der Bestätigung Ihres Angebots erhalten Sie ein vorfrankiertes Versandlabel per E-Mail. Einfach aufkleben und zur nächsten Paketstation bringen.',
  },
  {
    question: 'Was passiert mit meinen Daten auf dem Gerät?',
    answer:
      'Wir empfehlen, alle persönlichen Daten vor dem Versand zu löschen und das Gerät auf Werkseinstellungen zurückzusetzen. Zusätzlich führen wir eine professionelle Datenlöschung nach DSGVO-Standards durch.',
  },
  {
    question: 'Wie schnell erhalte ich mein Geld?',
    answer:
      'Nach Eingang und Prüfung Ihres Geräts (in der Regel 1-2 Werktage) überweisen wir den Betrag innerhalb von 48 Stunden auf Ihr Bankkonto. Bei Expressauszahlung sogar noch schneller.',
  },
  {
    question: 'Was, wenn der Zustand anders bewertet wird?',
    answer:
      'Sollte unser Prüfteam den Zustand anders bewerten, erhalten Sie ein angepasstes Angebot. Sie können dann entscheiden, ob Sie es annehmen oder Ihr Gerät kostenlos zurückerhalten möchten.',
  },
  {
    question: 'Kaufen Sie auch defekte Geräte an?',
    answer:
      'Ja, auch defekte Geräte haben bei uns noch einen Wert. Geben Sie im Kalkulator einfach die entsprechenden Schäden an und Sie erhalten ein faires Angebot für Ihr Gerät.',
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors pr-4">
          {question}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionLayout
      id="faq"
      alignment="full"
      background="surface"
      paddingY="lg"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Header */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <span className="badge-primary mb-4">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Häufig gestellte
                <span className="block gradient-text">Fragen</span>
              </h2>
              <p className="text-muted mb-8">
                Hier finden Sie Antworten auf die wichtigsten Fragen rund um den
                Verkauf Ihrer Elektronik.
              </p>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Noch Fragen?
                    </p>
                    <p className="text-sm text-muted">
                      Wir helfen Ihnen gerne weiter
                    </p>
                  </div>
                </div>
                <ButtonLink href="/kontakt" variant="primary" size="md" className="w-full">
                  Kontakt aufnehmen
                </ButtonLink>
              </div>
            </motion.div>
          </div>

          {/* Right: FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default FAQSection
