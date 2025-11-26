/* ============================================
   RATE LIMITING
   Phase 6: Security

   In-memory rate limiting for development
   (Use Redis in production for distributed systems)
   ============================================ */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
  retryAfter?: number
}

// Default configurations for different endpoints
export const RATE_LIMITS = {
  // Auth endpoints - strict limits
  auth: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  // API endpoints - moderate limits
  api: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
  },
  // Webhook endpoints - generous limits
  webhooks: {
    maxRequests: 1000,
    windowMs: 60 * 1000, // 1 minute
  },
} as const

/**
 * Check rate limit for a given identifier
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const key = identifier

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    cleanupExpiredEntries()
  }

  const entry = rateLimitStore.get(key)

  // No existing entry or window expired
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs
    rateLimitStore.set(key, { count: 1, resetTime })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime,
    }
  }

  // Within window, check count
  if (entry.count >= config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter,
    }
  }

  // Increment counter
  entry.count++
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  }
}

/**
 * Generate rate limit key from request
 */
export function getRateLimitKey(
  ip: string | null,
  endpoint: string,
  userId?: string
): string {
  const identifier = userId || ip || 'anonymous'
  return `ratelimit:${endpoint}:${identifier}`
}

/**
 * Clean up expired entries to prevent memory leak
 */
function cleanupExpiredEntries(): void {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Reset rate limit for a specific key (for testing)
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key)
}

/**
 * Clear all rate limits (for testing)
 */
export function clearAllRateLimits(): void {
  rateLimitStore.clear()
}
