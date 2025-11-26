/* ============================================
   PAYMENT PROVIDER INTERFACE
   Phase 5: Payments & Workflows

   Abstraktion für verschiedene Zahlungsanbieter
   (Stripe, Mollie, SEPA Überweisung)
   ============================================ */

export interface PaymentRecipient {
  accountHolder: string
  iban: string
  bic?: string
}

export interface PaymentRequest {
  amount: number // in EUR
  currency: 'EUR'
  recipient: PaymentRecipient
  reference: string // Offer reference code
  description?: string
}

export interface PaymentResult {
  success: boolean
  providerReference: string
  status: PaymentStatus
  error?: string
  estimatedArrival?: Date
}

export type PaymentStatus =
  | 'INITIATED'
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'

export type PaymentProvider = 'MOCK' | 'STRIPE' | 'MOLLIE' | 'SEPA'

// Payment Provider Interface
export interface IPaymentProvider {
  name: PaymentProvider
  initiateTransfer(request: PaymentRequest): Promise<PaymentResult>
  checkStatus(providerReference: string): Promise<PaymentStatus>
  cancelTransfer(providerReference: string): Promise<boolean>
}

// Export implementations
export { MockPaymentProvider } from './mock-provider'
export { createPaymentProvider, getPaymentProvider } from './factory'
