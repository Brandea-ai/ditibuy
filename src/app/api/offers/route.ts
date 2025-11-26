/* ============================================
   API: OFFERS
   POST /api/offers - Create new offer
   GET /api/offers - List user's offers
   Phase 2: API Stubs
   ============================================ */

import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'

// Helper: Generate reference code (BY-YYYYMM-XXXXXX)
function generateReferenceCode(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BY-${year}${month}-${random}`
}

export async function POST(request: NextRequest) {
  try {
    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { deviceModelId, conditionLevel, damageFlags } = body

    // Validate required fields
    if (!deviceModelId || !conditionLevel) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: deviceModelId, conditionLevel' },
        { status: 400 }
      )
    }

    // TODO Phase 2: Implement after database connection
    // const deviceModel = await prisma.deviceModel.findUnique({
    //   where: { id: deviceModelId },
    // })
    //
    // if (!deviceModel) {
    //   return NextResponse.json({ error: 'Device not found' }, { status: 404 })
    // }
    //
    // // Calculate preliminary offer based on condition
    // const conditionMultiplier = {
    //   WIE_NEU: 1.0,
    //   SEHR_GUT: 0.85,
    //   GUT: 0.70,
    //   AKZEPTABEL: 0.50,
    //   DEFEKT: 0.20,
    // }
    //
    // const preliminaryOffer = deviceModel.basePriceEuro * conditionMultiplier[conditionLevel]
    //
    // const offer = await prisma.offer.create({
    //   data: {
    //     referenceCode: generateReferenceCode(),
    //     userId: session.user.id,
    //     deviceModelId,
    //     conditionLevel,
    //     damageFlags: damageFlags || {},
    //     preliminaryOfferEuro: preliminaryOffer,
    //     status: 'ENTWURF',
    //   },
    // })

    // Mock response
    const mockOffer = {
      id: 'mock-offer-' + Date.now(),
      referenceCode: generateReferenceCode(),
      deviceModelId,
      conditionLevel,
      damageFlags: damageFlags || {},
      preliminaryOfferEuro: 650.0,
      status: 'ENTWURF',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockOffer,
    }, { status: 201 })
  } catch (error) {
    console.error('POST /api/offers error:', error)
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
    const status = searchParams.get('status')

    // TODO Phase 2: Implement after database connection
    // const offers = await prisma.offer.findMany({
    //   where: {
    //     userId: session.user.id,
    //     ...(status && { status: status as OfferStatus }),
    //   },
    //   include: {
    //     deviceModel: true,
    //   },
    //   orderBy: { createdAt: 'desc' },
    // })

    // Mock response
    const mockOffers = [
      {
        id: 'mock-1',
        referenceCode: 'BY-202501-ABC123',
        deviceModel: {
          brand: 'Apple',
          modelName: 'iPhone 15 Pro Max',
          storageGb: 256,
        },
        conditionLevel: 'SEHR_GUT',
        preliminaryOfferEuro: 765.0,
        status: 'ANGENOMMEN',
        createdAt: '2025-01-15T10:30:00Z',
      },
      {
        id: 'mock-2',
        referenceCode: 'BY-202501-DEF456',
        deviceModel: {
          brand: 'Samsung',
          modelName: 'Galaxy S24 Ultra',
          storageGb: 512,
        },
        conditionLevel: 'GUT',
        preliminaryOfferEuro: 504.0,
        status: 'ENTWURF',
        createdAt: '2025-01-20T14:15:00Z',
      },
    ]

    return NextResponse.json({
      success: true,
      data: mockOffers,
      meta: {
        total: mockOffers.length,
        filters: { status },
      },
    })
  } catch (error) {
    console.error('GET /api/offers error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
