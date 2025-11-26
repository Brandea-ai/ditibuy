import { Metadata } from 'next'
import { SectionLayout, SectionHeader } from '@/components/layout/SectionLayout'

/* ============================================
   VERKAUFEN PAGE
   Phase 1: Kalkulator-Einstieg (Dummy)
   ============================================ */

export const metadata: Metadata = {
  title: 'Gerät verkaufen',
  description:
    'Verkaufen Sie Ihr gebrauchtes Smartphone, Tablet oder Laptop. Sofort-Angebot in 30 Sekunden.',
}

export default function VerkaufenPage() {
  return (
    <div className="pt-20">
      <SectionLayout
        id="verkaufen"
        alignment="center"
        background="gradient"
        paddingY="lg"
      >
        <SectionHeader
          badge="Preiskalkulator"
          title="Gerät verkaufen"
          titleHighlight="& Geld erhalten"
          description="Wählen Sie Ihr Gerät aus und erhalten Sie sofort ein unverbindliches Angebot."
          alignment="center"
        />

        {/* Calculator Placeholder */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 text-center">
            <div className="text-6xl mb-6">🧮</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Preiskalkulator
            </h3>
            <p className="text-white/80 mb-8">
              Der interaktive Preiskalkulator wird in Phase 4 implementiert.
              Hier können Nutzer ihr Gerät auswählen, den Zustand angeben und
              sofort ein Angebot erhalten.
            </p>

            {/* Placeholder Form */}
            <div className="space-y-4 text-left">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/60 mb-2">Schritt 1</p>
                <p className="text-white font-medium">Kategorie wählen</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/60 mb-2">Schritt 2</p>
                <p className="text-white font-medium">Gerät auswählen</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/60 mb-2">Schritt 3</p>
                <p className="text-white font-medium">Zustand bewerten</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm text-white/60 mb-2">Schritt 4</p>
                <p className="text-white font-medium">Angebot erhalten</p>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>
    </div>
  )
}
