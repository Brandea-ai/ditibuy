/* ============================================
   API: SINGLE OFFER
   GET /api/offers/[id] - Get offer details
   PATCH /api/offers/[id] - Update offer
   Phase 2: API Stubs
   ============================================ */

import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params

    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // TODO Phase 2: Implement after database connection
    // const offer = await prisma.offer.findFirst({
    //   where: {
    //     id,
    //     userId: session.user.id,
    //   },
    //   include: {
    //     deviceModel: true,
    //     payment: true,
    //   },
    // })
    //
    // if (!offer) {
    //   return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    // }

    // Mock response
    const mockOffer = {
      id,
      referenceCode: 'BY-202501-ABC123',
      deviceModel: {
        id: 'device-1',
        brand: 'Apple',
        modelName: 'iPhone 15 Pro Max',
        storageGb: 256,
        basePriceEuro: 850,
      },
      conditionLevel: 'SEHR_GUT',
      damageFlags: {
        displayScratches: false,
        backDamage: false,
        batteryWeak: false,
      },
      preliminaryOfferEuro: 765.0,
      finalOfferEuro: null,
      status: 'ANGENOMMEN',
      shippingLabelUrl: null,
      trackingNumber: null,
      createdAt: '2025-01-15T10:30:00Z',
      updatedAt: '2025-01-15T10:30:00Z',
    }

    return NextResponse.json({
      success: true,
      data: mockOffer,
    })
  } catch (error) {
    console.error('GET /api/offers/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()

    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { status, conditionLevel, damageFlags } = body

    // Validate status transitions
    const validStatuses = [
      'ENTWURF',
      'ANGENOMMEN',
      'VERSENDET',
      'EINGEGANGEN',
      'GEPRUEFT',
      'BESTAETIGT',
      'AUSGEZAHLT',
      'ABGELEHNT',
      'STORNIERT',
    ]

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
    }

    // TODO Phase 2: Implement after database connection
    // const offer = await prisma.offer.findFirst({
    //   where: {
    //     id,
    //     userId: session.user.id,
    //   },
    // })
    //
    // if (!offer) {
    //   return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    // }
    //
    // // Log workflow change
    // await prisma.workflowLog.create({
    //   data: {
    //     entityType: 'Offer',
    //     entityId: id,
    //     action: 'STATUS_CHANGE',
    //     oldValue: { status: offer.status },
    //     newValue: { status },
    //     performedBy: session.user.id,
    //   },
    // })
    //
    // const updatedOffer = await prisma.offer.update({
    //   where: { id },
    //   data: {
    //     ...(status && { status }),
    //     ...(conditionLevel && { conditionLevel }),
    //     ...(damageFlags && { damageFlags }),
    //   },
    // })

    // Mock response
    const mockUpdatedOffer = {
      id,
      referenceCode: 'BY-202501-ABC123',
      status: status || 'ANGENOMMEN',
      conditionLevel: conditionLevel || 'SEHR_GUT',
      damageFlags: damageFlags || {},
      preliminaryOfferEuro: 765.0,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockUpdatedOffer,
    })
  } catch (error) {
    console.error('PATCH /api/offers/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
