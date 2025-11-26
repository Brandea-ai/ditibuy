/* ============================================
   API: PAYMENTS
   POST /api/payments - Initiate payment
   GET /api/payments - Get payment status
   Phase 2: API Stubs

   NOTE: Phase 5 will implement actual payment providers
   (Stripe/Mollie with PaymentProvider interface)
   ============================================ */

import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { PaymentProvider } from '@/lib/payments'

export async function POST(request: NextRequest) {
  try {
    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { offerId } = body

    if (!offerId) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: offerId' },
        { status: 400 }
      )
    }

    // TODO Phase 5: Implement payment provider integration
    // const offer = await prisma.offer.findFirst({
    //   where: {
    //     id: offerId,
    //     userId: session.user.id,
    //     status: 'BESTAETIGT', // Only confirmed offers can be paid
    //   },
    //   include: {
    //     user: {
    //       include: {
    //         bankDetails: true,
    //       },
    //     },
    //   },
    // })
    //
    // if (!offer) {
    //   return NextResponse.json(
    //     { error: 'Offer not found or not ready for payment' },
    //     { status: 404 }
    //   )
    // }
    //
    // if (!offer.user.bankDetails) {
    //   return NextResponse.json(
    //     { error: 'No bank details on file' },
    //     { status: 400 }
    //   )
    // }
    //
    // // Use PaymentProvider interface for flexibility
    // const paymentProvider = new PaymentProvider(process.env.PAYMENT_PROVIDER)
    // const paymentResult = await paymentProvider.initiateTransfer({
    //   amount: offer.finalOfferEuro || offer.preliminaryOfferEuro,
    //   currency: 'EUR',
    //   recipient: offer.user.bankDetails,
    //   reference: offer.referenceCode,
    // })
    //
    // const payment = await prisma.payment.create({
    //   data: {
    //     offerId: offer.id,
    //     amountEuro: offer.finalOfferEuro || offer.preliminaryOfferEuro,
    //     provider: process.env.PAYMENT_PROVIDER || 'MOCK',
    //     providerReference: paymentResult.reference,
    //     status: 'INITIATED',
    //   },
    // })
    //
    // // Log workflow
    // await prisma.workflowLog.create({
    //   data: {
    //     entityType: 'Payment',
    //     entityId: payment.id,
    //     action: 'PAYMENT_INITIATED',
    //     newValue: { amount: payment.amountEuro, provider: payment.provider },
    //     performedBy: session.user.id,
    //   },
    // })

    // Mock response
    const mockPayment = {
      id: 'payment-' + Date.now(),
      offerId,
      amountEuro: 765.0,
      provider: 'MOCK',
      providerReference: 'MOCK-REF-' + Math.random().toString(36).substring(7),
      status: 'INITIATED',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockPayment,
      message: 'Auszahlung wurde initiiert. Sie erhalten den Betrag innerhalb von 48 Stunden.',
    }, { status: 201 })
  } catch (error) {
    console.error('POST /api/payments error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const offerId = searchParams.get('offerId')
    const paymentId = searchParams.get('paymentId')

    // TODO Phase 5: Implement after database connection
    // let payments
    //
    // if (paymentId) {
    //   payments = await prisma.payment.findMany({
    //     where: {
    //       id: paymentId,
    //       offer: { userId: session.user.id },
    //     },
    //     include: {
    //       offer: {
    //         select: {
    //           referenceCode: true,
    //           deviceModel: {
    //             select: { brand: true, modelName: true },
    //           },
    //         },
    //       },
    //     },
    //   })
    // } else if (offerId) {
    //   payments = await prisma.payment.findMany({
    //     where: {
    //       offerId,
    //       offer: { userId: session.user.id },
    //     },
    //   })
    // } else {
    //   // Get all user payments
    //   payments = await prisma.payment.findMany({
    //     where: {
    //       offer: { userId: session.user.id },
    //     },
    //     include: {
    //       offer: {
    //         select: {
    //           referenceCode: true,
    //           deviceModel: {
    //             select: { brand: true, modelName: true },
    //           },
    //         },
    //       },
    //     },
    //     orderBy: { createdAt: 'desc' },
    //   })
    // }

    // Mock response
    const mockPayments = [
      {
        id: 'payment-1',
        offerId: 'offer-1',
        offer: {
          referenceCode: 'BY-202501-ABC123',
          deviceModel: {
            brand: 'Apple',
            modelName: 'iPhone 15 Pro Max',
          },
        },
        amountEuro: 765.0,
        provider: 'MOCK',
        providerReference: 'MOCK-REF-123456',
        status: 'COMPLETED',
        createdAt: '2025-01-16T10:00:00Z',
        completedAt: '2025-01-16T14:30:00Z',
      },
    ]

    return NextResponse.json({
      success: true,
      data: mockPayments,
      meta: {
        total: mockPayments.length,
        filters: { offerId, paymentId },
      },
    })
  } catch (error) {
    console.error('GET /api/payments error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
