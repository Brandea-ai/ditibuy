/* ============================================
   SHIPPING & LABEL SERVICE
   Phase 5: Payments & Workflows

   Mock-Implementation für Versandlabels
   (DHL/DPD Integration in Produktion)
   ============================================ */

export interface ShippingLabel {
  labelId: string
  trackingNumber: string
  carrier: 'DHL' | 'DPD' | 'HERMES'
  labelUrl: string
  qrCodeUrl?: string
  expiresAt: Date
  createdAt: Date
}

export interface CreateLabelRequest {
  offerId: string
  senderAddress: {
    name: string
    street: string
    city: string
    postalCode: string
    country: string
  }
}

export interface TrackingInfo {
  trackingNumber: string
  carrier: string
  status: TrackingStatus
  events: TrackingEvent[]
  estimatedDelivery?: Date
}

export type TrackingStatus =
  | 'LABEL_CREATED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'RETURNED'

export interface TrackingEvent {
  timestamp: Date
  status: TrackingStatus
  location: string
  description: string
}

// Mock shipping label storage
const mockLabels = new Map<string, ShippingLabel>()
const mockTracking = new Map<string, TrackingInfo>()

/**
 * Create a shipping label for an offer
 */
export async function createShippingLabel(
  request: CreateLabelRequest
): Promise<ShippingLabel> {
  // Simulate API delay
  await delay(500)

  const labelId = `LBL-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
  const trackingNumber = `JD${Math.random().toString().substring(2, 14)}DE`

  const label: ShippingLabel = {
    labelId,
    trackingNumber,
    carrier: 'DHL',
    labelUrl: `/api/shipping/label/${labelId}`,
    qrCodeUrl: `/api/shipping/qr/${labelId}`,
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    createdAt: new Date(),
  }

  // Store mock data
  mockLabels.set(labelId, label)

  // Initialize tracking
  mockTracking.set(trackingNumber, {
    trackingNumber,
    carrier: 'DHL',
    status: 'LABEL_CREATED',
    events: [
      {
        timestamp: new Date(),
        status: 'LABEL_CREATED',
        location: request.senderAddress.city,
        description: 'Versandlabel wurde erstellt',
      },
    ],
  })

  return label
}

/**
 * Get tracking information for a shipment
 */
export async function getTrackingInfo(
  trackingNumber: string
): Promise<TrackingInfo | null> {
  await delay(200)

  return mockTracking.get(trackingNumber) || null
}

/**
 * Simulate tracking updates (for demo purposes)
 */
export function simulateTrackingProgress(trackingNumber: string): void {
  const tracking = mockTracking.get(trackingNumber)
  if (!tracking) return

  const progressSequence: {
    status: TrackingStatus
    description: string
    delayMs: number
  }[] = [
    { status: 'PICKED_UP', description: 'Paket wurde abgeholt', delayMs: 5000 },
    {
      status: 'IN_TRANSIT',
      description: 'Paket ist im Transit zum Verteilzentrum',
      delayMs: 10000,
    },
    {
      status: 'IN_TRANSIT',
      description: 'Paket im Verteilzentrum angekommen',
      delayMs: 15000,
    },
    {
      status: 'OUT_FOR_DELIVERY',
      description: 'Paket ist in Zustellung',
      delayMs: 20000,
    },
    { status: 'DELIVERED', description: 'Paket wurde zugestellt', delayMs: 25000 },
  ]

  progressSequence.forEach(({ status, description, delayMs }) => {
    setTimeout(() => {
      tracking.status = status
      tracking.events.push({
        timestamp: new Date(),
        status,
        location: status === 'DELIVERED' ? 'München' : 'Verteilzentrum',
        description,
      })
      if (status === 'DELIVERED') {
        tracking.estimatedDelivery = new Date()
      }
    }, delayMs)
  })
}

/**
 * Get shipping label by ID
 */
export async function getShippingLabel(
  labelId: string
): Promise<ShippingLabel | null> {
  await delay(100)
  return mockLabels.get(labelId) || null
}

/**
 * Generate printable label HTML
 */
export function generateLabelHtml(label: ShippingLabel): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .label { border: 2px solid #000; padding: 20px; max-width: 400px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 10px; }
        .logo { font-size: 24px; font-weight: bold; color: #FFCC00; }
        .tracking { font-size: 18px; font-weight: bold; margin: 15px 0; }
        .barcode { text-align: center; margin: 20px 0; }
        .address { margin-top: 20px; }
        .address-label { font-size: 12px; color: #666; }
        .address-text { font-size: 14px; margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="label">
        <div class="header">
          <div class="logo">DHL</div>
          <div>Paketmarke - Kostenloser Versand</div>
        </div>
        <div class="tracking">
          ${label.trackingNumber}
        </div>
        <div class="barcode">
          [BARCODE PLACEHOLDER]
        </div>
        <div class="address">
          <div class="address-label">EMPFÄNGER:</div>
          <div class="address-text">
            BayernAnkauf GmbH<br>
            Ankaufzentrum<br>
            Musterstraße 123<br>
            80331 München
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; text-align: center;">
          Label gültig bis: ${label.expiresAt.toLocaleDateString('de-DE')}
        </div>
      </div>
    </body>
    </html>
  `
}

// Helper
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
