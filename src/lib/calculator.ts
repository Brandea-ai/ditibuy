/* ============================================
   PRICE CALCULATOR LOGIC
   Phase 4: Calculator & Offer Logic
   ============================================ */

import {
  ConditionLevel,
  DamageFlag,
  CONDITION_FACTORS,
  DAMAGE_DEDUCTIONS,
} from '@/types'

export interface PriceBreakdown {
  basePriceEuro: number
  conditionLevel: ConditionLevel
  conditionFactor: number
  conditionDeductionEuro: number
  damageFlags: DamageFlag[]
  damageDeductions: {
    flag: DamageFlag
    deductionPercent: number
    deductionEuro: number
  }[]
  totalDamageDeductionEuro: number
  finalPriceEuro: number
}

/**
 * Calculate the offer price based on device base price, condition, and damages
 */
export function calculatePrice(
  basePriceEuro: number,
  conditionLevel: ConditionLevel,
  damageFlags: DamageFlag[]
): PriceBreakdown {
  // Step 1: Apply condition factor
  const conditionFactor = CONDITION_FACTORS[conditionLevel]
  const priceAfterCondition = basePriceEuro * conditionFactor
  const conditionDeductionEuro = basePriceEuro - priceAfterCondition

  // Step 2: Calculate damage deductions (applied to price after condition)
  const damageDeductions = damageFlags.map((flag) => {
    const deductionPercent = DAMAGE_DEDUCTIONS[flag]
    const deductionEuro = priceAfterCondition * deductionPercent
    return {
      flag,
      deductionPercent,
      deductionEuro,
    }
  })

  const totalDamageDeductionEuro = damageDeductions.reduce(
    (sum, d) => sum + d.deductionEuro,
    0
  )

  // Step 3: Calculate final price (minimum 0)
  const finalPriceEuro = Math.max(
    0,
    Math.round((priceAfterCondition - totalDamageDeductionEuro) * 100) / 100
  )

  return {
    basePriceEuro,
    conditionLevel,
    conditionFactor,
    conditionDeductionEuro: Math.round(conditionDeductionEuro * 100) / 100,
    damageFlags,
    damageDeductions: damageDeductions.map((d) => ({
      ...d,
      deductionEuro: Math.round(d.deductionEuro * 100) / 100,
    })),
    totalDamageDeductionEuro: Math.round(totalDamageDeductionEuro * 100) / 100,
    finalPriceEuro,
  }
}

/**
 * Format price in Euro
 */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

/**
 * Generate a unique reference code for offers
 */
export function generateReferenceCode(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BY-${year}${month}-${random}`
}

/**
 * Get condition description text
 */
export function getConditionDescription(level: ConditionLevel): string {
  const descriptions: Record<ConditionLevel, string> = {
    SEHR_GUT:
      'Gerät ist wie neu, keine sichtbaren Gebrauchsspuren, volle Funktionsfähigkeit',
    GUT: 'Leichte Gebrauchsspuren möglich, volle Funktionsfähigkeit, sehr guter Zustand',
    GEBRAUCHT:
      'Normale Gebrauchsspuren sichtbar, volle Funktionsfähigkeit, guter Gesamtzustand',
    STARK_GEBRAUCHT:
      'Deutliche Gebrauchsspuren, kleine Einschränkungen möglich, grundsätzlich funktionsfähig',
    DEFEKT:
      'Gerät ist defekt oder hat erhebliche Funktionseinschränkungen',
  }
  return descriptions[level]
}

/**
 * Get damage description text
 */
export function getDamageDescription(flag: DamageFlag): string {
  const descriptions: Record<DamageFlag, string> = {
    DISPLAY_KRATZER: 'Sichtbare Kratzer auf dem Display',
    DISPLAY_RISS: 'Display hat einen oder mehrere Risse',
    DISPLAY_DEFEKT: 'Display funktioniert nicht mehr oder hat tote Pixel',
    GEHAEUSE_KRATZER: 'Kratzer am Gehäuse/Rahmen',
    GEHAEUSE_DELLE: 'Dellen oder Verformungen am Gehäuse',
    AKKU_SCHWACH: 'Akku hält weniger als 80% der Originalkapazität',
    KAMERA_DEFEKT: 'Kamera funktioniert nicht oder liefert unscharfe Bilder',
    WASSERSCHADEN: 'Gerät hatte Kontakt mit Wasser/Flüssigkeit',
    KEINE_ORIGINALVERPACKUNG: 'Originalverpackung nicht vorhanden',
  }
  return descriptions[flag]
}
