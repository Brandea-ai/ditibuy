/* ============================================
   UNIT TESTS: Price Calculator
   Phase 6: Tests
   ============================================ */

import {
  calculatePrice,
  formatEuro,
  generateReferenceCode,
  getConditionDescription,
  getDamageDescription,
} from '@/lib/calculator'
import { ConditionLevel, DamageFlag, CONDITION_FACTORS, DAMAGE_DEDUCTIONS } from '@/types'

describe('Price Calculator', () => {
  describe('calculatePrice', () => {
    // Test 1: Base price with best condition (no deductions)
    it('returns base price for SEHR_GUT condition without damages', () => {
      const result = calculatePrice(1000, 'SEHR_GUT', [])

      expect(result.basePriceEuro).toBe(1000)
      expect(result.conditionFactor).toBe(1.0)
      expect(result.conditionDeductionEuro).toBe(0)
      expect(result.totalDamageDeductionEuro).toBe(0)
      expect(result.finalPriceEuro).toBe(1000)
    })

    // Test 2: Apply condition factor correctly
    it('applies condition factor for GUT condition', () => {
      const result = calculatePrice(1000, 'GUT', [])

      expect(result.conditionFactor).toBe(0.85)
      expect(result.conditionDeductionEuro).toBe(150)
      expect(result.finalPriceEuro).toBe(850)
    })

    // Test 3: Apply condition factor for GEBRAUCHT
    it('applies condition factor for GEBRAUCHT condition', () => {
      const result = calculatePrice(1000, 'GEBRAUCHT', [])

      expect(result.conditionFactor).toBe(0.7)
      expect(result.conditionDeductionEuro).toBe(300)
      expect(result.finalPriceEuro).toBe(700)
    })

    // Test 4: Apply condition factor for STARK_GEBRAUCHT
    it('applies condition factor for STARK_GEBRAUCHT condition', () => {
      const result = calculatePrice(1000, 'STARK_GEBRAUCHT', [])

      expect(result.conditionFactor).toBe(0.5)
      expect(result.conditionDeductionEuro).toBe(500)
      expect(result.finalPriceEuro).toBe(500)
    })

    // Test 5: Apply condition factor for DEFEKT
    it('applies condition factor for DEFEKT condition', () => {
      const result = calculatePrice(1000, 'DEFEKT', [])

      expect(result.conditionFactor).toBe(0.2)
      expect(result.conditionDeductionEuro).toBe(800)
      expect(result.finalPriceEuro).toBe(200)
    })

    // Test 6: Single damage deduction
    it('applies single damage deduction correctly', () => {
      const result = calculatePrice(1000, 'SEHR_GUT', ['DISPLAY_KRATZER'])

      // DISPLAY_KRATZER = 5% of price after condition (1000 * 0.05 = 50)
      expect(result.damageDeductions).toHaveLength(1)
      expect(result.damageDeductions[0].flag).toBe('DISPLAY_KRATZER')
      expect(result.damageDeductions[0].deductionPercent).toBe(0.05)
      expect(result.damageDeductions[0].deductionEuro).toBe(50)
      expect(result.totalDamageDeductionEuro).toBe(50)
      expect(result.finalPriceEuro).toBe(950)
    })

    // Test 7: Multiple damage deductions
    it('applies multiple damage deductions correctly', () => {
      const result = calculatePrice(1000, 'SEHR_GUT', [
        'DISPLAY_KRATZER',
        'GEHAEUSE_KRATZER',
      ])

      // DISPLAY_KRATZER = 5%, GEHAEUSE_KRATZER = 5% = 10% total = 100
      expect(result.damageDeductions).toHaveLength(2)
      expect(result.totalDamageDeductionEuro).toBe(100)
      expect(result.finalPriceEuro).toBe(900)
    })

    // Test 8: Combined condition and damage deductions
    it('combines condition factor and damage deductions correctly', () => {
      const result = calculatePrice(1000, 'GUT', ['DISPLAY_RISS'])

      // GUT = 85% = 850, DISPLAY_RISS = 20% of 850 = 170
      expect(result.conditionDeductionEuro).toBe(150)
      expect(result.damageDeductions[0].deductionEuro).toBe(170)
      expect(result.finalPriceEuro).toBe(680)
    })

    // Test 9: Minimum price is 0 (never negative)
    it('returns minimum 0 for heavily damaged defect devices', () => {
      const result = calculatePrice(100, 'DEFEKT', [
        'WASSERSCHADEN',
        'DISPLAY_DEFEKT',
      ])

      // DEFEKT = 20% = 20, WASSERSCHADEN = 50% of 20 = 10, DISPLAY_DEFEKT = 40% of 20 = 8
      expect(result.finalPriceEuro).toBeGreaterThanOrEqual(0)
    })

    // Test 10: Handles zero base price
    it('handles zero base price correctly', () => {
      const result = calculatePrice(0, 'SEHR_GUT', [])

      expect(result.finalPriceEuro).toBe(0)
    })

    // Test 11: Handles empty damage flags array
    it('handles empty damage flags array', () => {
      const result = calculatePrice(500, 'GUT', [])

      expect(result.damageFlags).toEqual([])
      expect(result.damageDeductions).toEqual([])
      expect(result.totalDamageDeductionEuro).toBe(0)
    })

    // Test 12: Rounds to two decimal places
    it('rounds final price to two decimal places', () => {
      // 333 * 0.85 = 283.05, 283.05 * 0.05 = 14.1525
      const result = calculatePrice(333, 'GUT', ['DISPLAY_KRATZER'])

      expect(result.finalPriceEuro.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2)
    })

    // Test 13: All condition levels are defined
    it('handles all condition levels', () => {
      const conditions: ConditionLevel[] = [
        'SEHR_GUT',
        'GUT',
        'GEBRAUCHT',
        'STARK_GEBRAUCHT',
        'DEFEKT',
      ]

      conditions.forEach((condition) => {
        const result = calculatePrice(1000, condition, [])
        expect(result.conditionFactor).toBe(CONDITION_FACTORS[condition])
      })
    })

    // Test 14: All damage flags are defined
    it('handles all damage flags', () => {
      const damages: DamageFlag[] = [
        'DISPLAY_KRATZER',
        'DISPLAY_RISS',
        'DISPLAY_DEFEKT',
        'GEHAEUSE_KRATZER',
        'GEHAEUSE_DELLE',
        'AKKU_SCHWACH',
        'KAMERA_DEFEKT',
        'WASSERSCHADEN',
        'KEINE_ORIGINALVERPACKUNG',
      ]

      damages.forEach((damage) => {
        const result = calculatePrice(1000, 'SEHR_GUT', [damage])
        expect(result.damageDeductions[0].deductionPercent).toBe(
          DAMAGE_DEDUCTIONS[damage]
        )
      })
    })
  })

  describe('formatEuro', () => {
    it('formats whole numbers correctly', () => {
      const formatted = formatEuro(1000)
      expect(formatted).toContain('1.000')
      expect(formatted).toContain('€')
    })

    it('formats decimal numbers correctly', () => {
      const formatted = formatEuro(1234.56)
      expect(formatted).toContain('1.234,56')
    })

    it('formats zero correctly', () => {
      const formatted = formatEuro(0)
      expect(formatted).toContain('0')
      expect(formatted).toContain('€')
    })

    it('formats small amounts correctly', () => {
      const formatted = formatEuro(0.99)
      expect(formatted).toContain('0,99')
    })
  })

  describe('generateReferenceCode', () => {
    it('generates code with correct prefix', () => {
      const code = generateReferenceCode()
      expect(code).toMatch(/^BY-/)
    })

    it('generates code with year and month', () => {
      const code = generateReferenceCode()
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      expect(code).toContain(`${year}${month}`)
    })

    it('generates code with correct format', () => {
      const code = generateReferenceCode()
      // Format: BY-YYYYMM-XXXXXX (where X is alphanumeric uppercase)
      expect(code).toMatch(/^BY-\d{6}-[A-Z0-9]{6}$/)
    })

    it('generates unique codes', () => {
      const codes = new Set<string>()
      for (let i = 0; i < 100; i++) {
        codes.add(generateReferenceCode())
      }
      // All 100 should be unique
      expect(codes.size).toBe(100)
    })
  })

  describe('getConditionDescription', () => {
    it('returns description for SEHR_GUT', () => {
      const desc = getConditionDescription('SEHR_GUT')
      expect(desc).toContain('wie neu')
    })

    it('returns description for GUT', () => {
      const desc = getConditionDescription('GUT')
      expect(desc).toContain('sehr guter Zustand')
    })

    it('returns description for GEBRAUCHT', () => {
      const desc = getConditionDescription('GEBRAUCHT')
      expect(desc).toContain('Gebrauchsspuren')
    })

    it('returns description for STARK_GEBRAUCHT', () => {
      const desc = getConditionDescription('STARK_GEBRAUCHT')
      expect(desc).toContain('Deutliche')
    })

    it('returns description for DEFEKT', () => {
      const desc = getConditionDescription('DEFEKT')
      expect(desc).toContain('defekt')
    })
  })

  describe('getDamageDescription', () => {
    it('returns description for each damage flag', () => {
      const damages: DamageFlag[] = [
        'DISPLAY_KRATZER',
        'DISPLAY_RISS',
        'DISPLAY_DEFEKT',
        'GEHAEUSE_KRATZER',
        'GEHAEUSE_DELLE',
        'AKKU_SCHWACH',
        'KAMERA_DEFEKT',
        'WASSERSCHADEN',
        'KEINE_ORIGINALVERPACKUNG',
      ]

      damages.forEach((damage) => {
        const desc = getDamageDescription(damage)
        expect(desc.length).toBeGreaterThan(0)
      })
    })
  })
})
