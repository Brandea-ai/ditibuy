/* ============================================
   PAYMENT PROVIDER FACTORY
   Phase 5: Payments & Workflows

   Erstellt den konfigurierten Payment Provider
   ============================================ */

import { IPaymentProvider, PaymentProvider } from './index'
import { MockPaymentProvider } from './mock-provider'

// Factory function
export function createPaymentProvider(type: PaymentProvider): IPaymentProvider {
  switch (type) {
    case 'MOCK':
      return new MockPaymentProvider()

    case 'STRIPE':
      // TODO: Implement Stripe provider
      console.warn('Stripe provider not implemented, using Mock')
      return new MockPaymentProvider()

    case 'MOLLIE':
      // TODO: Implement Mollie provider
      console.warn('Mollie provider not implemented, using Mock')
      return new MockPaymentProvider()

    case 'SEPA':
      // TODO: Implement SEPA direct transfer
      console.warn('SEPA provider not implemented, using Mock')
      return new MockPaymentProvider()

    default:
      throw new Error(`Unknown payment provider: ${type}`)
  }
}

// Get configured provider from environment
export function getPaymentProvider(): IPaymentProvider {
  const providerType = (process.env.PAYMENT_PROVIDER || 'MOCK') as PaymentProvider
  return createPaymentProvider(providerType)
}
