import {
  HeroSection,
  TrustSection,
  HowItWorksSection,
  CalculatorTeaserSection,
  BavariaFocusSection,
  TestimonialsSection,
  FAQSection,
} from '@/components/pages/home'

/* ============================================
   LANDING PAGE
   Phase 1: Home Page with all Sections

   Section Order (psychologically optimized):
   1. Hero (left) – Value Proposition, Main CTA
   2. Trust (center) – Badges, Stats, Bavaria Focus
   3. How It Works (center) – 3 Steps
   4. Calculator Teaser (right) – Preview Calculator
   5. Bavaria Focus (left) – Regional Differentiation
   6. Testimonials (center) – Social Proof
   7. FAQ (left) – Common Questions
   ============================================ */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <CalculatorTeaserSection />
      <BavariaFocusSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  )
}
