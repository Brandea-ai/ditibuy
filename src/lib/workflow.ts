/* ============================================
   WORKFLOW MANAGEMENT
   Phase 5: Payments & Workflows

   Status-Übergänge und Workflow-Logik
   ============================================ */

import { OfferStatus } from '@/types'

// Valid status transitions
const STATUS_TRANSITIONS: Record<OfferStatus, OfferStatus[]> = {
  ENTWURF: ['ANGEBOT_ERSTELLT', 'STORNIERT'],
  ANGEBOT_ERSTELLT: ['GERAET_EINGESENDET', 'STORNIERT'],
  GERAET_EINGESENDET: ['IN_PRUEFUNG'],
  IN_PRUEFUNG: ['ANGEBOT_ANGEPASST', 'AKZEPTIERT', 'ABGELEHNT'],
  ANGEBOT_ANGEPASST: ['AKZEPTIERT', 'ABGELEHNT', 'STORNIERT'],
  AKZEPTIERT: ['AUSZAHLUNG_INITIIERT'],
  ABGELEHNT: [], // Terminal state
  AUSZAHLUNG_INITIIERT: ['AUSGEZAHLT'],
  AUSGEZAHLT: [], // Terminal state
  STORNIERT: [], // Terminal state
}

// Status display information
export const STATUS_INFO: Record<
  OfferStatus,
  {
    label: string
    description: string
    color: string
    bgColor: string
    icon: string
  }
> = {
  ENTWURF: {
    label: 'Entwurf',
    description: 'Angebot wurde erstellt, aber noch nicht abgeschlossen',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: 'edit',
  },
  ANGEBOT_ERSTELLT: {
    label: 'Angebot erstellt',
    description: 'Ihr Angebot wurde erstellt. Bitte senden Sie das Gerät ein.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: 'check-circle',
  },
  GERAET_EINGESENDET: {
    label: 'Gerät eingesendet',
    description: 'Wir haben Ihre Sendung erhalten und werden sie prüfen.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: 'package',
  },
  IN_PRUEFUNG: {
    label: 'In Prüfung',
    description: 'Unser Team prüft aktuell Ihr Gerät.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    icon: 'search',
  },
  ANGEBOT_ANGEPASST: {
    label: 'Angebot angepasst',
    description:
      'Der Preis wurde nach Prüfung angepasst. Bitte überprüfen Sie das neue Angebot.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: 'alert-circle',
  },
  AKZEPTIERT: {
    label: 'Akzeptiert',
    description: 'Angebot wurde akzeptiert. Auszahlung wird vorbereitet.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: 'check',
  },
  ABGELEHNT: {
    label: 'Abgelehnt',
    description:
      'Das Angebot wurde abgelehnt. Ihr Gerät wird zurückgesendet.',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: 'x',
  },
  AUSZAHLUNG_INITIIERT: {
    label: 'Auszahlung eingeleitet',
    description: 'Die Auszahlung wurde gestartet. Das Geld ist unterwegs.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: 'credit-card',
  },
  AUSGEZAHLT: {
    label: 'Ausgezahlt',
    description: 'Die Auszahlung ist abgeschlossen. Vielen Dank!',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: 'check-circle',
  },
  STORNIERT: {
    label: 'Storniert',
    description: 'Dieser Vorgang wurde storniert.',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: 'x-circle',
  },
}

/**
 * Check if a status transition is valid
 */
export function isValidTransition(
  from: OfferStatus,
  to: OfferStatus
): boolean {
  return STATUS_TRANSITIONS[from]?.includes(to) ?? false
}

/**
 * Get possible next statuses
 */
export function getNextStatuses(current: OfferStatus): OfferStatus[] {
  return STATUS_TRANSITIONS[current] || []
}

/**
 * Check if status is terminal (no further transitions possible)
 */
export function isTerminalStatus(status: OfferStatus): boolean {
  return STATUS_TRANSITIONS[status]?.length === 0
}

/**
 * Get workflow progress percentage
 */
export function getProgressPercentage(status: OfferStatus): number {
  const progressMap: Record<OfferStatus, number> = {
    ENTWURF: 10,
    ANGEBOT_ERSTELLT: 20,
    GERAET_EINGESENDET: 40,
    IN_PRUEFUNG: 60,
    ANGEBOT_ANGEPASST: 70,
    AKZEPTIERT: 80,
    ABGELEHNT: 100,
    AUSZAHLUNG_INITIIERT: 90,
    AUSGEZAHLT: 100,
    STORNIERT: 100,
  }
  return progressMap[status] || 0
}

/**
 * Get status steps for progress display
 */
export function getStatusSteps(currentStatus: OfferStatus): {
  label: string
  status: 'completed' | 'current' | 'upcoming' | 'skipped'
}[] {
  const mainFlow: OfferStatus[] = [
    'ANGEBOT_ERSTELLT',
    'GERAET_EINGESENDET',
    'IN_PRUEFUNG',
    'AKZEPTIERT',
    'AUSZAHLUNG_INITIIERT',
    'AUSGEZAHLT',
  ]

  const currentIndex = mainFlow.indexOf(currentStatus)

  // Handle special cases
  if (currentStatus === 'ENTWURF') {
    return mainFlow.map((s) => ({
      label: STATUS_INFO[s].label,
      status: 'upcoming' as const,
    }))
  }

  if (
    currentStatus === 'STORNIERT' ||
    currentStatus === 'ABGELEHNT' ||
    currentStatus === 'ANGEBOT_ANGEPASST'
  ) {
    return [
      ...mainFlow.slice(0, 3).map((s, i) => ({
        label: STATUS_INFO[s].label,
        status: 'completed' as const,
      })),
      {
        label: STATUS_INFO[currentStatus].label,
        status: 'current' as const,
      },
    ]
  }

  return mainFlow.map((s, i) => ({
    label: STATUS_INFO[s].label,
    status:
      i < currentIndex
        ? ('completed' as const)
        : i === currentIndex
        ? ('current' as const)
        : ('upcoming' as const),
  }))
}

/**
 * Generate tracking timeline events
 */
export interface TimelineEvent {
  status: OfferStatus
  timestamp: Date
  title: string
  description: string
}

export function generateTimeline(
  statusHistory: { status: OfferStatus; timestamp: Date }[]
): TimelineEvent[] {
  return statusHistory.map((entry) => ({
    status: entry.status,
    timestamp: entry.timestamp,
    title: STATUS_INFO[entry.status].label,
    description: STATUS_INFO[entry.status].description,
  }))
}
