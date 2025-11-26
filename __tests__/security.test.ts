/* ============================================
   UNIT TESTS: Security Utilities
   Phase 6: Tests
   ============================================ */

import {
  sanitizeString,
  isValidEmail,
  validatePassword,
  anonymizeIP,
  maskIBAN,
  maskEmail,
  maskPhone,
  isSensitiveField,
  redactSensitiveData,
  generateCSRFToken,
  validateCSRFToken,
} from '@/lib/security'

describe('Security Utilities', () => {
  describe('sanitizeString', () => {
    it('escapes HTML special characters', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).not.toContain('<')
      expect(sanitizeString('<script>alert("xss")</script>')).not.toContain('>')
    })

    it('escapes quotes', () => {
      const result = sanitizeString('test "quoted" \'value\'')
      expect(result).not.toContain('"')
      expect(result).not.toContain("'")
    })

    it('escapes ampersands', () => {
      expect(sanitizeString('a & b')).toContain('&amp;')
    })

    it('handles empty strings', () => {
      expect(sanitizeString('')).toBe('')
    })

    it('handles strings without special characters', () => {
      expect(sanitizeString('normal text')).toBe('normal text')
    })
  })

  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('user+tag@example.org')).toBe(true)
    })

    it('rejects invalid email formats', () => {
      expect(isValidEmail('not-an-email')).toBe(false)
      expect(isValidEmail('missing@domain')).toBe(false)
      expect(isValidEmail('@nodomain.com')).toBe(false)
      expect(isValidEmail('spaces in@email.com')).toBe(false)
    })

    it('rejects overly long emails', () => {
      const longEmail = 'a'.repeat(250) + '@b.com'
      expect(isValidEmail(longEmail)).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('validates strong passwords', () => {
      const result = validatePassword('SecureP@ss123')
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('requires minimum length', () => {
      const result = validatePassword('Sh0rt!')
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Mindestens 8 Zeichen erforderlich')
    })

    it('requires uppercase letter', () => {
      const result = validatePassword('lowercase123!')
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('Großbuchstabe'))).toBe(true)
    })

    it('requires lowercase letter', () => {
      const result = validatePassword('UPPERCASE123!')
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('Kleinbuchstabe'))).toBe(true)
    })

    it('requires number', () => {
      const result = validatePassword('NoNumbers!')
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('Zahl'))).toBe(true)
    })

    it('requires special character', () => {
      const result = validatePassword('NoSpecial123')
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('Sonderzeichen'))).toBe(true)
    })
  })

  describe('anonymizeIP', () => {
    it('anonymizes IPv4 addresses', () => {
      expect(anonymizeIP('192.168.1.100')).toBe('192.168.1.0')
      expect(anonymizeIP('10.0.0.1')).toBe('10.0.0.0')
    })

    it('anonymizes IPv6 addresses', () => {
      const result = anonymizeIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
      expect(result).toMatch(/^2001:0db8:85a3:0000::$/)
    })

    it('handles invalid IP formats', () => {
      expect(anonymizeIP('invalid')).toBe('anonymous')
      expect(anonymizeIP('')).toBe('anonymous')
    })
  })

  describe('maskIBAN', () => {
    it('masks German IBAN correctly', () => {
      const masked = maskIBAN('DE89370400440532013000')
      expect(masked).toContain('DE89')
      expect(masked).toContain('3000')
      expect(masked).toContain('****')
    })

    it('handles short IBANs', () => {
      expect(maskIBAN('DE12')).toBe('****')
    })

    it('removes spaces before masking', () => {
      const masked = maskIBAN('DE89 3704 0044 0532 0130 00')
      expect(masked).toContain('DE89')
    })
  })

  describe('maskEmail', () => {
    it('masks email correctly', () => {
      const masked = maskEmail('john.doe@example.com')
      expect(masked).toContain('@example.com')
      expect(masked).not.toContain('john.doe')
    })

    it('handles short local parts', () => {
      const masked = maskEmail('ab@example.com')
      expect(masked).toContain('@example.com')
    })

    it('handles invalid formats', () => {
      expect(maskEmail('invalid')).toBe('***@***')
    })
  })

  describe('maskPhone', () => {
    it('masks phone number showing last 4 digits', () => {
      const masked = maskPhone('+49 170 1234567')
      expect(masked).toContain('4567')
      expect(masked).not.toContain('1234')
    })

    it('handles various formats', () => {
      const masked = maskPhone('(089) 123-4567')
      expect(masked.slice(-4)).toBe('4567')
    })

    it('handles short numbers', () => {
      expect(maskPhone('123')).toBe('****')
    })
  })

  describe('isSensitiveField', () => {
    it('identifies password fields', () => {
      expect(isSensitiveField('password')).toBe(true)
      expect(isSensitiveField('userPassword')).toBe(true)
      expect(isSensitiveField('PASSWORT')).toBe(true)
    })

    it('identifies banking fields', () => {
      expect(isSensitiveField('iban')).toBe(true)
      expect(isSensitiveField('bic')).toBe(true)
      expect(isSensitiveField('bankDetails')).toBe(true)
    })

    it('identifies token fields', () => {
      expect(isSensitiveField('token')).toBe(true)
      expect(isSensitiveField('apiKey')).toBe(true)
      expect(isSensitiveField('secretKey')).toBe(true)
    })

    it('does not flag normal fields', () => {
      expect(isSensitiveField('email')).toBe(false)
      expect(isSensitiveField('name')).toBe(false)
      expect(isSensitiveField('address')).toBe(false)
    })
  })

  describe('redactSensitiveData', () => {
    it('redacts sensitive fields', () => {
      const data = {
        email: 'test@example.com',
        password: 'secret123',
        iban: 'DE89370400440532013000',
      }

      const redacted = redactSensitiveData(data)

      expect(redacted.email).toBe('test@example.com')
      expect(redacted.password).toBe('[REDACTED]')
      expect(redacted.iban).toBe('[REDACTED]')
    })

    it('handles nested objects', () => {
      const data = {
        user: {
          name: 'John',
          credentials: {
            password: 'secret123',
          },
        },
      }

      const redacted = redactSensitiveData(data)

      // credentials.password should be redacted
      expect((redacted.user as { name: string; credentials: { password: string } }).credentials.password).toBe('[REDACTED]')
      // non-sensitive fields should be preserved
      expect((redacted.user as { name: string }).name).toBe('John')
    })

    it('handles empty objects', () => {
      expect(redactSensitiveData({})).toEqual({})
    })
  })

  describe('CSRF Token', () => {
    describe('generateCSRFToken', () => {
      it('generates 64 character hex string', () => {
        const token = generateCSRFToken()
        expect(token).toMatch(/^[a-f0-9]{64}$/)
      })

      it('generates unique tokens', () => {
        const tokens = new Set<string>()
        for (let i = 0; i < 100; i++) {
          tokens.add(generateCSRFToken())
        }
        expect(tokens.size).toBe(100)
      })
    })

    describe('validateCSRFToken', () => {
      it('validates matching tokens', () => {
        const token = generateCSRFToken()
        expect(validateCSRFToken(token, token)).toBe(true)
      })

      it('rejects non-matching tokens', () => {
        const token1 = generateCSRFToken()
        const token2 = generateCSRFToken()
        expect(validateCSRFToken(token1, token2)).toBe(false)
      })

      it('rejects tokens of different lengths', () => {
        expect(validateCSRFToken('short', 'muchlonger')).toBe(false)
      })

      it('uses timing-safe comparison', () => {
        // Test that similar tokens are rejected properly
        const token = 'a'.repeat(64)
        const almostSame = 'a'.repeat(63) + 'b'
        expect(validateCSRFToken(token, almostSame)).toBe(false)
      })
    })
  })
})
