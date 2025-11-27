/* ============================================
   API: DEVICE MODELS
   GET /api/devices - List all device models
   ============================================ */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DeviceCategory } from '@/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')

    // Build where clause
    const where: {
      isActive: boolean
      category?: DeviceCategory
      brand?: string
      modelName?: { contains: string; mode: 'insensitive' }
    } = {
      isActive: true,
    }

    if (category) {
      where.category = category.toUpperCase() as DeviceCategory
    }
    if (brand) {
      where.brand = brand
    }
    if (search) {
      where.modelName = { contains: search, mode: 'insensitive' }
    }

    // Fetch devices from database
    const devices = await prisma.deviceModel.findMany({
      where,
      orderBy: [{ brand: 'asc' }, { basePriceEuro: 'desc' }, { modelName: 'asc' }],
      take: limit ? parseInt(limit) : undefined,
    })

    // Get unique brands for the category
    const brands = category
      ? await prisma.deviceModel.findMany({
          where: {
            isActive: true,
            category: category.toUpperCase() as DeviceCategory,
          },
          select: { brand: true },
          distinct: ['brand'],
          orderBy: { brand: 'asc' },
        })
      : []

    return NextResponse.json({
      success: true,
      data: devices,
      meta: {
        total: devices.length,
        filters: { category, brand },
        brands: brands.map(b => b.brand),
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
