/* ============================================
   API: BANK DETAILS
   GET /api/user/bank - Get bank details
   POST /api/user/bank - Add/Update bank details
   DELETE /api/user/bank - Remove bank details
   Phase 2: API Stubs

   SECURITY NOTE: IBAN/BIC must be encrypted at rest
   ============================================ */

import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { encrypt, decrypt, maskIBAN } from '@/lib/crypto'

// Helper: Mask IBAN for display (DE89 **** **** **** **** 00)
function maskIBAN(iban: string): string {
  if (!iban || iban.length < 8) return iban
  const clean = iban.replace(/\s/g, '')
  return `${clean.slice(0, 4)} **** **** **** **** ${clean.slice(-2)}`
}

// Helper: Validate German IBAN format
function isValidGermanIBAN(iban: string): boolean {
  const clean = iban.replace(/\s/g, '').toUpperCase()
  // German IBAN: DE + 2 check digits + 18 alphanumeric
  return /^DE\d{20}$/.test(clean)
}

export async function GET() {
  try {
    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // TODO Phase 2: Implement after database connection
    // const bankDetails = await prisma.bankDetails.findUnique({
    //   where: { userId: session.user.id },
    // })
    //
    // if (!bankDetails) {
    //   return NextResponse.json({
    //     success: true,
    //     data: null,
    //   })
    // }
    //
    // // Decrypt and mask IBAN for response
    // const decryptedIBAN = decrypt(bankDetails.iban)
    // const maskedIBAN = maskIBAN(decryptedIBAN)

    // Mock response
    const mockBankDetails = {
      id: 'bank-1',
      accountHolder: 'Max Mustermann',
      maskedIBAN: maskIBAN('DE89370400440532013000'),
      bic: 'COBADEFFXXX',
      createdAt: '2025-01-10T00:00:00Z',
      updatedAt: '2025-01-10T00:00:00Z',
    }

    return NextResponse.json({
      success: true,
      data: mockBankDetails,
    })
  } catch (error) {
    console.error('GET /api/user/bank error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { accountHolder, iban, bic } = body

    // Validate required fields
    if (!accountHolder || !iban) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: accountHolder, iban' },
        { status: 400 }
      )
    }

    // Validate German IBAN
    if (!isValidGermanIBAN(iban)) {
      return NextResponse.json(
        { success: false, error: 'Ungültige deutsche IBAN. Format: DE + 20 Ziffern' },
        { status: 400 }
      )
    }

    // TODO Phase 2: Implement after database connection
    // const encryptedIBAN = encrypt(iban.replace(/\s/g, '').toUpperCase())
    //
    // const bankDetails = await prisma.bankDetails.upsert({
    //   where: { userId: session.user.id },
    //   update: {
    //     accountHolder,
    //     iban: encryptedIBAN,
    //     bic: bic || null,
    //   },
    //   create: {
    //     userId: session.user.id,
    //     accountHolder,
    //     iban: encryptedIBAN,
    //     bic: bic || null,
    //   },
    // })
    //
    // // Log for DSGVO audit
    // await prisma.workflowLog.create({
    //   data: {
    //     entityType: 'BankDetails',
    //     entityId: bankDetails.id,
    //     action: 'BANK_DETAILS_SAVED',
    //     performedBy: session.user.id,
    //   },
    // })

    // Mock response
    const mockBankDetails = {
      id: 'bank-new',
      accountHolder,
      maskedIBAN: maskIBAN(iban),
      bic: bic || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockBankDetails,
      message: 'Bankverbindung erfolgreich gespeichert',
    }, { status: 201 })
  } catch (error) {
    console.error('POST /api/user/bank error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    // TODO Phase 3: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // TODO Phase 2: Implement after database connection
    // const bankDetails = await prisma.bankDetails.findUnique({
    //   where: { userId: session.user.id },
    // })
    //
    // if (!bankDetails) {
    //   return NextResponse.json(
    //     { success: false, error: 'Keine Bankverbindung vorhanden' },
    //     { status: 404 }
    //   )
    // }
    //
    // // Log for DSGVO audit before deletion
    // await prisma.workflowLog.create({
    //   data: {
    //     entityType: 'BankDetails',
    //     entityId: bankDetails.id,
    //     action: 'BANK_DETAILS_DELETED',
    //     performedBy: session.user.id,
    //   },
    // })
    //
    // await prisma.bankDetails.delete({
    //   where: { userId: session.user.id },
    // })

    return NextResponse.json({
      success: true,
      message: 'Bankverbindung erfolgreich gelöscht',
    })
  } catch (error) {
    console.error('DELETE /api/user/bank error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
