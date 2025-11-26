/* ============================================
   MOCK PAYMENT PROVIDER
   Phase 5: Payments & Workflows

   Simuliert Zahlungen für Entwicklung und Tests
   ============================================ */

import {
  IPaymentProvider,
  PaymentRequest,
  PaymentResult,
  PaymentStatus,
} from './index'

// In-memory storage for mock payments
const mockPayments = new Map<
  string,
  {
    request: PaymentRequest
    status: PaymentStatus
    createdAt: Date
  }
>()

export class MockPaymentProvider implements IPaymentProvider {
  name = 'MOCK' as const

  async initiateTransfer(request: PaymentRequest): Promise<PaymentResult> {
    // Simulate API delay
    await this.delay(500)

    // Generate mock reference
    const providerReference = `MOCK-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)
      .toUpperCase()}`

    // Store payment
    mockPayments.set(providerReference, {
      request,
      status: 'INITIATED',
      createdAt: new Date(),
    })

    // Simulate async processing
    this.simulateProcessing(providerReference)

    return {
      success: true,
      providerReference,
      status: 'INITIATED',
      estimatedArrival: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
    }
  }

  async checkStatus(providerReference: string): Promise<PaymentStatus> {
    await this.delay(100)

    const payment = mockPayments.get(providerReference)
    if (!payment) {
      return 'FAILED'
    }

    return payment.status
  }

  async cancelTransfer(providerReference: string): Promise<boolean> {
    await this.delay(200)

    const payment = mockPayments.get(providerReference)
    if (!payment) {
      return false
    }

    // Can only cancel if not yet completed
    if (payment.status === 'COMPLETED' || payment.status === 'FAILED') {
      return false
    }

    payment.status = 'CANCELLED'
    return true
  }

  // Simulate async payment processing
  private async simulateProcessing(providerReference: string) {
    const payment = mockPayments.get(providerReference)
    if (!payment) return

    // After 2 seconds: PENDING
    setTimeout(() => {
      if (payment.status === 'INITIATED') {
        payment.status = 'PENDING'
      }
    }, 2000)

    // After 5 seconds: PROCESSING
    setTimeout(() => {
      if (payment.status === 'PENDING') {
        payment.status = 'PROCESSING'
      }
    }, 5000)

    // After 10 seconds: COMPLETED (90% success rate)
    setTimeout(() => {
      if (payment.status === 'PROCESSING') {
        payment.status = Math.random() > 0.1 ? 'COMPLETED' : 'FAILED'
      }
    }, 10000)
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// Singleton instance
let mockProviderInstance: MockPaymentProvider | null = null

export function getMockPaymentProvider(): MockPaymentProvider {
  if (!mockProviderInstance) {
    mockProviderInstance = new MockPaymentProvider()
  }
  return mockProviderInstance
}
