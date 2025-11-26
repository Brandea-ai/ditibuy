import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with Tailwind CSS conflict resolution
 * @param inputs - Class names to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as Euro currency
 * @param amount - The amount to format
 * @returns Formatted string like "1.234,56 €"
 */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

/**
 * Formats a date in German locale
 * @param date - Date to format
 * @returns Formatted string like "24. Januar 2025"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

/**
 * Formats a date with time in German locale
 * @param date - Date to format
 * @returns Formatted string like "24. Januar 2025, 14:30 Uhr"
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d) + ' Uhr'
}

/**
 * Generates a reference code for offers
 * Format: BY-YYYYMM-XXXXXX
 * @returns Reference code string
 */
export function generateReferenceCode(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()

  return `BY-${year}${month}-${random}`
}

/**
 * Masks an IBAN for display
 * @param iban - Full IBAN
 * @returns Masked IBAN like "DE** **** **** **** **34 56"
 */
export function maskIBAN(iban: string): string {
  if (!iban || iban.length < 6) return iban
  const clean = iban.replace(/\s/g, '')
  const country = clean.slice(0, 2)
  const lastFour = clean.slice(-4)
  const masked = '*'.repeat(clean.length - 6)

  // Format with spaces every 4 characters
  const full = `${country}**${masked}${lastFour}`
  return full.match(/.{1,4}/g)?.join(' ') || full
}

/**
 * Validates a German IBAN (simplified)
 * @param iban - IBAN to validate
 * @returns Boolean indicating validity
 */
export function isValidGermanIBAN(iban: string): boolean {
  const clean = iban.replace(/\s/g, '').toUpperCase()

  // German IBANs are 22 characters and start with DE
  if (clean.length !== 22 || !clean.startsWith('DE')) {
    return false
  }

  // Check if rest are alphanumeric
  return /^DE\d{20}$/.test(clean)
}

/**
 * Validates if a PLZ is in Bavaria
 * @param plz - German postal code
 * @returns Boolean indicating if in Bavaria
 */
export function isBavarianPLZ(plz: string): boolean {
  const num = parseInt(plz, 10)

  // Bayerische PLZ-Bereiche
  const ranges: [number, number][] = [
    [80000, 87999],  // München, Oberbayern
    [88000, 89999],  // Schwaben (teilweise)
    [90000, 96999],  // Franken, Oberpfalz
    [97000, 97999],  // Unterfranken (teilweise)
  ]

  return ranges.some(([min, max]) => num >= min && num <= max)
}

/**
 * Debounce function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle function
 * @param fn - Function to throttle
 * @param limit - Limit in milliseconds
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Sleep utility for async operations
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
