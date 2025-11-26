'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { SectionLayout, SectionHeader } from '@/components/layout/SectionLayout'

/* ============================================
   TESTIMONIALS SECTION
   Phase 1: Landing Page Sections

   Alignment: CENTER
   Purpose: Social Proof
   ============================================ */

const testimonials = [
  {
    id: '1',
    name: 'Thomas M.',
    location: 'München',
    text: 'Super unkompliziert! Habe mein altes iPhone 13 verkauft und innerhalb von 2 Tagen war das Geld auf meinem Konto. Der Preis war fair und die Kommunikation top.',
    rating: 5,
    deviceSold: 'iPhone 13 Pro',
    avatar: null,
  },
  {
    id: '2',
    name: 'Sarah K.',
    location: 'Nürnberg',
    text: 'Endlich ein seriöser Ankäufer aus Bayern! Die Bewertung war transparent und der gesamte Prozess sehr professionell. Kann ich nur weiterempfehlen.',
    rating: 5,
    deviceSold: 'MacBook Air M1',
    avatar: null,
  },
  {
    id: '3',
    name: 'Michael B.',
    location: 'Augsburg',
    text: 'Hatte erst Bedenken, mein Gerät einzuschicken, aber alles lief perfekt. Der Kundenservice hat alle meine Fragen schnell beantwortet. Top Service!',
    rating: 5,
    deviceSold: 'Samsung Galaxy S23',
    avatar: null,
  },
  {
    id: '4',
    name: 'Lisa W.',
    location: 'Regensburg',
    text: 'Schneller und fairer Ankauf. Das Angebot entsprach genau dem, was online kalkuliert wurde. Keine versteckten Abzüge. So muss das sein!',
    rating: 4,
    deviceSold: 'iPad Pro 11"',
    avatar: null,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <SectionLayout
      id="bewertungen"
      alignment="center"
      background="default"
      paddingY="lg"
    >
      <SectionHeader
        badge="Kundenstimmen"
        title="Das sagen unsere"
        titleHighlight="Kunden"
        description="Über 10.000 zufriedene Verkäufer vertrauen BayernAnkauf"
        alignment="center"
      />

      {/* Testimonial Carousel */}
      <div className="relative max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Testimonial Card */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < testimonials[currentIndex].rating
                        ? 'text-accent fill-accent'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center">
                {/* Avatar Placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>

                <p className="font-bold text-gray-900">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-sm text-muted">
                  {testimonials[currentIndex].location}
                </p>

                {testimonials[currentIndex].deviceSold && (
                  <p className="mt-2 text-sm text-primary">
                    Verkauft: {testimonials[currentIndex].deviceSold}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
      >
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">4,9</p>
          <p className="text-sm text-muted">Durchschnittliche Bewertung</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">10.000+</p>
          <p className="text-sm text-muted">Bewertungen</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">98%</p>
          <p className="text-sm text-muted">Weiterempfehlungen</p>
        </div>
      </motion.div>
    </SectionLayout>
  )
}

export default TestimonialsSection
