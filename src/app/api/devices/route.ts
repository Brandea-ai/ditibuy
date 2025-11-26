/* ============================================
   API: DEVICE MODELS
   GET /api/devices - List all device models
   Phase 2: API Stubs
   ============================================ */

import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')

    // TODO Phase 2: Implement after database connection
    // const devices = await prisma.deviceModel.findMany({
    //   where: {
    //     isActive: true,
    //     ...(category && { category: category as DeviceCategory }),
    //     ...(brand && { brand }),
    //   },
    //   orderBy: [{ brand: 'asc' }, { modelName: 'asc' }],
    // })

    // Mock response for now
    const mockDevices = [
      {
        id: 'mock-1',
        category: 'SMARTPHONE',
        brand: 'Apple',
        modelName: 'iPhone 15 Pro Max',
        storageGb: 256,
        basePriceEuro: 850,
        isActive: true,
      },
      {
        id: 'mock-2',
        category: 'SMARTPHONE',
        brand: 'Samsung',
        modelName: 'Galaxy S24 Ultra',
        storageGb: 256,
        basePriceEuro: 720,
        isActive: true,
      },
    ]

    return NextResponse.json({
      success: true,
      data: mockDevices,
      meta: {
        total: mockDevices.length,
        filters: { category, brand },
      },
    })
  } catch (error) {
    console.error('GET /api/devices error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
