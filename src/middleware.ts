/* ============================================
   MIDDLEWARE
   Phase 3: Route Protection
   Phase 6: Security & Rate Limiting
   ============================================ */

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in-memory for edge runtime)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
const RATE_LIMITS = {
  auth: { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 min
  api: { maxRequests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
}

function getClientIP(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  const realIP = req.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  return 'anonymous'
}

function checkRateLimit(
  key: string,
  config: { maxRequests: number; windowMs: number }
): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs })
    return { allowed: true, remaining: config.maxRequests - 1 }
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000),
    }
  }

  entry.count++
  return { allowed: true, remaining: config.maxRequests - entry.count }
}

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    const ip = getClientIP(req)

    // Rate limiting for auth endpoints
    if (pathname.startsWith('/api/auth') && pathname !== '/api/auth/session') {
      const key = `auth:${ip}`
      const result = checkRateLimit(key, RATE_LIMITS.auth)

      if (!result.allowed) {
        return new NextResponse(
          JSON.stringify({
            error: 'Zu viele Anfragen',
            message: `Bitte warten Sie ${result.retryAfter} Sekunden`,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(result.retryAfter),
              'X-RateLimit-Remaining': '0',
            },
          }
        )
      }
    }

    // Rate limiting for API endpoints
    if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
      const userId = token?.sub || ip
      const key = `api:${userId}`
      const result = checkRateLimit(key, RATE_LIMITS.api)

      if (!result.allowed) {
        return new NextResponse(
          JSON.stringify({
            error: 'Zu viele Anfragen',
            message: `Bitte warten Sie ${result.retryAfter} Sekunden`,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(result.retryAfter),
              'X-RateLimit-Remaining': '0',
            },
          }
        )
      }
    }

    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Add security headers to response
    const response = NextResponse.next()
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-XSS-Protection', '1; mode=block')

    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/login',
          '/register',
          '/verkaufen',
          '/agb',
          '/datenschutz',
          '/impressum',
          '/widerrufsrecht',
          '/passwort-vergessen',
        ]

        // API routes that don't require authentication
        const publicApiRoutes = [
          '/api/auth',
          '/api/devices',
        ]

        // Check if it's a public route
        if (publicRoutes.includes(pathname)) {
          return true
        }

        // Check if it's a public API route
        if (publicApiRoutes.some((route) => pathname.startsWith(route))) {
          return true
        }

        // Check if it's a static file or Next.js internal route
        if (
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon') ||
          pathname.includes('.')
        ) {
          return true
        }

        // All other routes require authentication
        return !!token
      },
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/auth).*)',
  ],
}
