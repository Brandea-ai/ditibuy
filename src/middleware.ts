/* ============================================
   MIDDLEWARE
   Phase 3: Route Protection
   ============================================ */

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
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
