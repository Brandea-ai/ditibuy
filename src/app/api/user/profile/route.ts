/* ============================================
   API: USER PROFILE
   GET /api/user/profile - Get user profile
   PATCH /api/user/profile - Update profile
   Phase 2: API Stubs
   ============================================ */

import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // TODO Phase 2: Implement after database connection
    // const user = await prisma.user.findUnique({
    //   where: { id: session.user.id },
    //   select: {
    //     id: true,
    //     email: true,
    //     firstName: true,
    //     lastName: true,
    //     phone: true,
    //     streetAddress: true,
    //     postalCode: true,
    //     city: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     // Never expose hashedPassword
    //   },
    // })

    // Mock response
    const mockUser = {
      id: 'mock-user-1',
      email: 'max.mustermann@example.com',
      firstName: 'Max',
      lastName: 'Mustermann',
      phone: '+49 89 123 456 78',
      streetAddress: 'Musterstraße 123',
      postalCode: '80331',
      city: 'München',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-15T10:30:00Z',
    }

    return NextResponse.json({
      success: true,
      data: mockUser,
    })
  } catch (error) {
    console.error('GET /api/user/profile error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { firstName, lastName, phone, streetAddress, postalCode, city } = body

    // Validate Bavarian postal code if provided
    if (postalCode) {
      const bavarianPLZRanges = [
        [80000, 87999], // München, Oberbayern
        [90000, 96999], // Nürnberg, Franken
        [97000, 97999], // Unterfranken (Teil)
      ]

      const plz = parseInt(postalCode, 10)
      const isBavarian = bavarianPLZRanges.some(
        ([min, max]) => plz >= min && plz <= max
      )

      if (!isBavarian) {
        return NextResponse.json(
          {
            success: false,
            error: 'Postleitzahl außerhalb Bayerns. Wir sind derzeit nur in Bayern verfügbar.'
          },
          { status: 400 }
        )
      }
    }

    // TODO Phase 2: Implement after database connection
    // const updatedUser = await prisma.user.update({
    //   where: { id: session.user.id },
    //   data: {
    //     ...(firstName && { firstName }),
    //     ...(lastName && { lastName }),
    //     ...(phone && { phone }),
    //     ...(streetAddress && { streetAddress }),
    //     ...(postalCode && { postalCode }),
    //     ...(city && { city }),
    //   },
    //   select: {
    //     id: true,
    //     email: true,
    //     firstName: true,
    //     lastName: true,
    //     phone: true,
    //     streetAddress: true,
    //     postalCode: true,
    //     city: true,
    //     updatedAt: true,
    //   },
    // })

    // Mock response
    const mockUpdatedUser = {
      id: 'mock-user-1',
      email: 'max.mustermann@example.com',
      firstName: firstName || 'Max',
      lastName: lastName || 'Mustermann',
      phone: phone || '+49 89 123 456 78',
      streetAddress: streetAddress || 'Musterstraße 123',
      postalCode: postalCode || '80331',
      city: city || 'München',
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockUpdatedUser,
    })
  } catch (error) {
    console.error('PATCH /api/user/profile error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
