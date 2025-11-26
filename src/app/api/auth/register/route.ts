/* ============================================
   API: REGISTER
   POST /api/auth/register - Create new user
   Phase 3: Authentication
   ============================================ */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { z } from 'zod'

// Validation schema
const registerSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z
    .string()
    .min(8, 'Passwort muss mindestens 8 Zeichen haben')
    .regex(/[A-Z]/, 'Passwort muss mindestens einen Großbuchstaben enthalten')
    .regex(/[0-9]/, 'Passwort muss mindestens eine Zahl enthalten'),
  firstName: z.string().min(2, 'Vorname muss mindestens 2 Zeichen haben'),
  lastName: z.string().min(2, 'Nachname muss mindestens 2 Zeichen haben'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Sie müssen die AGB akzeptieren' }),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = registerSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validierungsfehler',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email, password, firstName, lastName } = validationResult.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ein Konto mit dieser E-Mail existiert bereits',
        },
        { status: 409 }
      )
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        hashedPassword,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    })

    // Log registration for audit
    await prisma.workflowLog.create({
      data: {
        entityType: 'User',
        entityId: user.id,
        action: 'USER_REGISTERED',
        performedBy: user.id,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: 'Konto erfolgreich erstellt. Sie können sich jetzt anmelden.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/auth/register error:', error)
    return NextResponse.json(
      { success: false, error: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
}
