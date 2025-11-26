/* ============================================
   UNIT TESTS: Workflow Management
   Phase 6: Tests
   ============================================ */

import {
  isValidTransition,
  getNextStatuses,
  isTerminalStatus,
  getProgressPercentage,
  getStatusSteps,
  STATUS_INFO,
  generateTimeline,
} from '@/lib/workflow'
import { OfferStatus } from '@/types'

describe('Workflow Management', () => {
  describe('isValidTransition', () => {
    // Valid transitions from ENTWURF
    it('allows ENTWURF → ANGEBOT_ERSTELLT', () => {
      expect(isValidTransition('ENTWURF', 'ANGEBOT_ERSTELLT')).toBe(true)
    })

    it('allows ENTWURF → STORNIERT', () => {
      expect(isValidTransition('ENTWURF', 'STORNIERT')).toBe(true)
    })

    // Valid transitions from ANGEBOT_ERSTELLT
    it('allows ANGEBOT_ERSTELLT → GERAET_EINGESENDET', () => {
      expect(isValidTransition('ANGEBOT_ERSTELLT', 'GERAET_EINGESENDET')).toBe(true)
    })

    it('allows ANGEBOT_ERSTELLT → STORNIERT', () => {
      expect(isValidTransition('ANGEBOT_ERSTELLT', 'STORNIERT')).toBe(true)
    })

    // Valid transitions from IN_PRUEFUNG
    it('allows IN_PRUEFUNG → ANGEBOT_ANGEPASST', () => {
      expect(isValidTransition('IN_PRUEFUNG', 'ANGEBOT_ANGEPASST')).toBe(true)
    })

    it('allows IN_PRUEFUNG → AKZEPTIERT', () => {
      expect(isValidTransition('IN_PRUEFUNG', 'AKZEPTIERT')).toBe(true)
    })

    it('allows IN_PRUEFUNG → ABGELEHNT', () => {
      expect(isValidTransition('IN_PRUEFUNG', 'ABGELEHNT')).toBe(true)
    })

    // Valid transitions from AKZEPTIERT
    it('allows AKZEPTIERT → AUSZAHLUNG_INITIIERT', () => {
      expect(isValidTransition('AKZEPTIERT', 'AUSZAHLUNG_INITIIERT')).toBe(true)
    })

    // Valid transitions from AUSZAHLUNG_INITIIERT
    it('allows AUSZAHLUNG_INITIIERT → AUSGEZAHLT', () => {
      expect(isValidTransition('AUSZAHLUNG_INITIIERT', 'AUSGEZAHLT')).toBe(true)
    })

    // Invalid transitions
    it('forbids backwards transitions', () => {
      expect(isValidTransition('AUSGEZAHLT', 'AKZEPTIERT')).toBe(false)
      expect(isValidTransition('AKZEPTIERT', 'ENTWURF')).toBe(false)
      expect(isValidTransition('IN_PRUEFUNG', 'ANGEBOT_ERSTELLT')).toBe(false)
    })

    it('forbids skipping states', () => {
      expect(isValidTransition('ENTWURF', 'AUSGEZAHLT')).toBe(false)
      expect(isValidTransition('ANGEBOT_ERSTELLT', 'AUSGEZAHLT')).toBe(false)
    })

    it('forbids transitions from terminal states', () => {
      expect(isValidTransition('AUSGEZAHLT', 'STORNIERT')).toBe(false)
      expect(isValidTransition('ABGELEHNT', 'AKZEPTIERT')).toBe(false)
      expect(isValidTransition('STORNIERT', 'ENTWURF')).toBe(false)
    })
  })

  describe('getNextStatuses', () => {
    it('returns correct next statuses for ENTWURF', () => {
      const next = getNextStatuses('ENTWURF')
      expect(next).toContain('ANGEBOT_ERSTELLT')
      expect(next).toContain('STORNIERT')
      expect(next).toHaveLength(2)
    })

    it('returns correct next statuses for IN_PRUEFUNG', () => {
      const next = getNextStatuses('IN_PRUEFUNG')
      expect(next).toContain('ANGEBOT_ANGEPASST')
      expect(next).toContain('AKZEPTIERT')
      expect(next).toContain('ABGELEHNT')
      expect(next).toHaveLength(3)
    })

    it('returns empty array for terminal states', () => {
      expect(getNextStatuses('AUSGEZAHLT')).toEqual([])
      expect(getNextStatuses('ABGELEHNT')).toEqual([])
      expect(getNextStatuses('STORNIERT')).toEqual([])
    })
  })

  describe('isTerminalStatus', () => {
    it('identifies terminal states correctly', () => {
      expect(isTerminalStatus('AUSGEZAHLT')).toBe(true)
      expect(isTerminalStatus('ABGELEHNT')).toBe(true)
      expect(isTerminalStatus('STORNIERT')).toBe(true)
    })

    it('identifies non-terminal states correctly', () => {
      expect(isTerminalStatus('ENTWURF')).toBe(false)
      expect(isTerminalStatus('ANGEBOT_ERSTELLT')).toBe(false)
      expect(isTerminalStatus('IN_PRUEFUNG')).toBe(false)
      expect(isTerminalStatus('AKZEPTIERT')).toBe(false)
    })
  })

  describe('getProgressPercentage', () => {
    it('returns correct percentage for each status', () => {
      expect(getProgressPercentage('ENTWURF')).toBe(10)
      expect(getProgressPercentage('ANGEBOT_ERSTELLT')).toBe(20)
      expect(getProgressPercentage('GERAET_EINGESENDET')).toBe(40)
      expect(getProgressPercentage('IN_PRUEFUNG')).toBe(60)
      expect(getProgressPercentage('ANGEBOT_ANGEPASST')).toBe(70)
      expect(getProgressPercentage('AKZEPTIERT')).toBe(80)
      expect(getProgressPercentage('AUSZAHLUNG_INITIIERT')).toBe(90)
      expect(getProgressPercentage('AUSGEZAHLT')).toBe(100)
      expect(getProgressPercentage('ABGELEHNT')).toBe(100)
      expect(getProgressPercentage('STORNIERT')).toBe(100)
    })

    it('returns values between 0 and 100', () => {
      const statuses: OfferStatus[] = [
        'ENTWURF',
        'ANGEBOT_ERSTELLT',
        'GERAET_EINGESENDET',
        'IN_PRUEFUNG',
        'ANGEBOT_ANGEPASST',
        'AKZEPTIERT',
        'ABGELEHNT',
        'AUSZAHLUNG_INITIIERT',
        'AUSGEZAHLT',
        'STORNIERT',
      ]

      statuses.forEach((status) => {
        const percentage = getProgressPercentage(status)
        expect(percentage).toBeGreaterThanOrEqual(0)
        expect(percentage).toBeLessThanOrEqual(100)
      })
    })
  })

  describe('getStatusSteps', () => {
    it('marks all steps as upcoming for ENTWURF', () => {
      const steps = getStatusSteps('ENTWURF')
      steps.forEach((step) => {
        expect(step.status).toBe('upcoming')
      })
    })

    it('marks current step correctly', () => {
      const steps = getStatusSteps('IN_PRUEFUNG')
      const currentStep = steps.find((s) => s.status === 'current')
      expect(currentStep).toBeDefined()
      expect(currentStep?.label).toBe('In Prüfung')
    })

    it('marks previous steps as completed', () => {
      const steps = getStatusSteps('IN_PRUEFUNG')
      const completedSteps = steps.filter((s) => s.status === 'completed')
      expect(completedSteps.length).toBeGreaterThan(0)
    })

    it('marks future steps as upcoming', () => {
      const steps = getStatusSteps('ANGEBOT_ERSTELLT')
      const upcomingSteps = steps.filter((s) => s.status === 'upcoming')
      expect(upcomingSteps.length).toBeGreaterThan(0)
    })

    it('handles STORNIERT status', () => {
      const steps = getStatusSteps('STORNIERT')
      const currentStep = steps.find((s) => s.status === 'current')
      expect(currentStep?.label).toBe('Storniert')
    })

    it('handles ABGELEHNT status', () => {
      const steps = getStatusSteps('ABGELEHNT')
      const currentStep = steps.find((s) => s.status === 'current')
      expect(currentStep?.label).toBe('Abgelehnt')
    })
  })

  describe('STATUS_INFO', () => {
    it('has info for all statuses', () => {
      const statuses: OfferStatus[] = [
        'ENTWURF',
        'ANGEBOT_ERSTELLT',
        'GERAET_EINGESENDET',
        'IN_PRUEFUNG',
        'ANGEBOT_ANGEPASST',
        'AKZEPTIERT',
        'ABGELEHNT',
        'AUSZAHLUNG_INITIIERT',
        'AUSGEZAHLT',
        'STORNIERT',
      ]

      statuses.forEach((status) => {
        expect(STATUS_INFO[status]).toBeDefined()
        expect(STATUS_INFO[status].label).toBeTruthy()
        expect(STATUS_INFO[status].description).toBeTruthy()
        expect(STATUS_INFO[status].color).toBeTruthy()
        expect(STATUS_INFO[status].bgColor).toBeTruthy()
        expect(STATUS_INFO[status].icon).toBeTruthy()
      })
    })
  })

  describe('generateTimeline', () => {
    it('generates timeline from status history', () => {
      const history = [
        { status: 'ENTWURF' as OfferStatus, timestamp: new Date('2025-01-01') },
        { status: 'ANGEBOT_ERSTELLT' as OfferStatus, timestamp: new Date('2025-01-02') },
        { status: 'GERAET_EINGESENDET' as OfferStatus, timestamp: new Date('2025-01-03') },
      ]

      const timeline = generateTimeline(history)

      expect(timeline).toHaveLength(3)
      expect(timeline[0].title).toBe('Entwurf')
      expect(timeline[1].title).toBe('Angebot erstellt')
      expect(timeline[2].title).toBe('Gerät eingesendet')
    })

    it('includes descriptions in timeline', () => {
      const history = [
        { status: 'AKZEPTIERT' as OfferStatus, timestamp: new Date() },
      ]

      const timeline = generateTimeline(history)

      expect(timeline[0].description).toContain('Auszahlung')
    })

    it('handles empty history', () => {
      const timeline = generateTimeline([])
      expect(timeline).toEqual([])
    })
  })
})
