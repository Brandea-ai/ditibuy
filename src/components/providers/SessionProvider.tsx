'use client'

/* ============================================
   SESSION PROVIDER
   Phase 3: Authentication
   Wraps the app with NextAuth SessionProvider
   ============================================ */

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
