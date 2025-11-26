/* ============================================
   SECURITY UTILITIES
   Phase 6: Security

   Centralized security functions
   ============================================ */

export * from './rate-limit'

// ============================================
// INPUT SANITIZATION
// ============================================

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Mindestens 8 Zeichen erforderlich')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Mindestens ein Großbuchstabe erforderlich')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Mindestens ein Kleinbuchstabe erforderlich')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Mindestens eine Zahl erforderlich')
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Mindestens ein Sonderzeichen erforderlich')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// ============================================
// IP ADDRESS UTILITIES
// ============================================

/**
 * Extract IP address from request headers
 */
export function getClientIP(headers: Headers): string | null {
  // Check X-Forwarded-For header (common for proxies)
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    // Take the first IP in the list
    const ip = forwardedFor.split(',')[0].trim()
    return anonymizeIP(ip)
  }

  // Check X-Real-IP header
  const realIP = headers.get('x-real-ip')
  if (realIP) {
    return anonymizeIP(realIP)
  }

  return null
}

/**
 * Anonymize IP address for GDPR compliance
 * Removes last octet for IPv4, last 80 bits for IPv6
 */
export function anonymizeIP(ip: string): string {
  // IPv4
  if (ip.includes('.')) {
    const parts = ip.split('.')
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`
    }
  }

  // IPv6
  if (ip.includes(':')) {
    const parts = ip.split(':')
    if (parts.length >= 4) {
      return `${parts.slice(0, 4).join(':')}::`
    }
  }

  return 'anonymous'
}

// ============================================
// CSRF PROTECTION
// ============================================

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Validate CSRF token timing-safe comparison
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (token.length !== storedToken.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i)
  }

  return result === 0
}

// ============================================
// DATA MASKING
// ============================================

/**
 * Mask IBAN for display (shows first 4 and last 4 characters)
 */
export function maskIBAN(iban: string): string {
  const clean = iban.replace(/\s/g, '')
  if (clean.length < 8) return '****'

  return `${clean.slice(0, 4)} **** **** **** ${clean.slice(-4)}`
}

/**
 * Mask email for display
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***@***'

  const maskedLocal =
    local.length > 2 ? `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}` : '**'

  return `${maskedLocal}@${domain}`
}

/**
 * Mask phone number for display
 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) return '****'

  return `${'*'.repeat(digits.length - 4)}${digits.slice(-4)}`
}

// ============================================
// SENSITIVE DATA HANDLING
// ============================================

/**
 * Check if a field name might contain sensitive data
 */
export function isSensitiveField(fieldName: string): boolean {
  const sensitivePatterns = [
    'password',
    'passwort',
    'secret',
    'token',
    'key',
    'iban',
    'bic',
    'bank',
    'credit',
    'card',
    'ssn',
    'steuer',
    'tax',
  ]

  const lowerField = fieldName.toLowerCase()
  return sensitivePatterns.some((pattern) => lowerField.includes(pattern))
}

/**
 * Redact sensitive fields from an object (for logging)
 */
export function redactSensitiveData<T extends Record<string, unknown>>(obj: T): T {
  const redacted = { ...obj }

  for (const key of Object.keys(redacted)) {
    if (isSensitiveField(key)) {
      redacted[key as keyof T] = '[REDACTED]' as T[keyof T]
    } else if (typeof redacted[key] === 'object' && redacted[key] !== null) {
      redacted[key as keyof T] = redactSensitiveData(
        redacted[key] as Record<string, unknown>
      ) as T[keyof T]
    }
  }

  return redacted
}
