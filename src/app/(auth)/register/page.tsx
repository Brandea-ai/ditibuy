'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SectionLayout } from '@/components/layout/SectionLayout'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
  CheckCircle2,
  MapPin,
} from 'lucide-react'

/* ============================================
   REGISTER PAGE
   Phase 3: Authentication
   ============================================ */

interface FormErrors {
  email?: string[]
  password?: string[]
  firstName?: string[]
  lastName?: string[]
  acceptTerms?: string[]
}

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState(false)

  // Password strength checks
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    match: formData.password === formData.confirmPassword && formData.password !== '',
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear field errors on change
    if (fieldErrors[name as keyof FormErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)
    setFieldErrors({})

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwörter stimmen nicht überein')
      setIsLoading(false)
      return
    }

    if (!formData.acceptTerms) {
      setFormError('Sie müssen die AGB akzeptieren')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          acceptTerms: formData.acceptTerms,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.details) {
          setFieldErrors(data.details)
        }
        setFormError(data.error || 'Registrierung fehlgeschlagen')
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login?registered=true')
      }, 2000)
    } catch {
      setFormError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
        <SectionLayout
          id="register-success"
          alignment="center"
          background="default"
          paddingY="lg"
        >
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Konto erfolgreich erstellt!
            </h1>
            <p className="text-muted mb-6">
              Sie werden zur Anmeldung weitergeleitet...
            </p>
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
          </div>
        </SectionLayout>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SectionLayout
        id="register"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Konto erstellen
            </h1>
            <p className="text-muted">
              Registrieren Sie sich kostenlos und starten Sie sofort.
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {formError && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{formError}</p>
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Vorname
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Max"
                    required
                    className={`w-full h-12 px-4 bg-gray-50 rounded-xl border ${
                      fieldErrors.firstName
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary'
                    } focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  />
                  {fieldErrors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.firstName[0]}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nachname
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Mustermann"
                    required
                    className={`w-full h-12 px-4 bg-gray-50 rounded-xl border ${
                      fieldErrors.lastName
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary'
                    } focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  />
                  {fieldErrors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.lastName[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-Mail-Adresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ihre@email.de"
                    required
                    className={`w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border ${
                      fieldErrors.email
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary'
                    } focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Passwort
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ihr sicheres Passwort"
                    required
                    className={`w-full h-12 pl-12 pr-12 bg-gray-50 rounded-xl border ${
                      fieldErrors.password
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary'
                    } focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  <PasswordCheck
                    met={passwordChecks.length}
                    text="Mindestens 8 Zeichen"
                  />
                  <PasswordCheck
                    met={passwordChecks.uppercase}
                    text="Ein Großbuchstabe"
                  />
                  <PasswordCheck
                    met={passwordChecks.number}
                    text="Eine Zahl"
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Passwort bestätigen
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Passwort wiederholen"
                    required
                    className={`w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border ${
                      formData.confirmPassword && !passwordChecks.match
                        ? 'border-red-300'
                        : 'border-gray-200 focus:border-primary'
                    } focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  />
                </div>
                {formData.confirmPassword && !passwordChecks.match && (
                  <p className="text-xs text-red-500 mt-1">
                    Passwörter stimmen nicht überein
                  </p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                  Ich akzeptiere die{' '}
                  <Link href="/agb" className="text-primary hover:underline">
                    AGB
                  </Link>{' '}
                  und{' '}
                  <Link
                    href="/datenschutz"
                    className="text-primary hover:underline"
                  >
                    Datenschutzbestimmungen
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !Object.values(passwordChecks).every(Boolean) ||
                  !formData.acceptTerms
                }
                className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Konto wird erstellt...
                  </>
                ) : (
                  'Konto erstellen'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">oder</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Bereits ein Konto?{' '}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Jetzt anmelden
              </Link>
            </p>
          </div>

          {/* Bayern Badge */}
          <div className="text-center mt-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary">
              <MapPin className="w-4 h-4" />
              Nur für Kunden in Bayern verfügbar
            </span>
          </div>
        </div>
      </SectionLayout>
    </div>
  )
}

// Password check component
function PasswordCheck({ met, text }: { met: boolean; text: string }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        met ? 'text-green-600' : 'text-gray-400'
      }`}
    >
      <CheckCircle2
        className={`w-3.5 h-3.5 ${met ? 'opacity-100' : 'opacity-50'}`}
      />
      <span>{text}</span>
    </div>
  )
}
