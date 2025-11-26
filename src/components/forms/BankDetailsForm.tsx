'use client'

import { useState, useEffect } from 'react'
import {
  CreditCard,
  User,
  Building2,
  Loader2,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react'

/* ============================================
   BANK DETAILS FORM
   Phase 3: Bank Details Management
   ============================================ */

interface BankDetails {
  id: string
  accountHolder: string
  maskedIBAN: string
  bic: string | null
}

interface BankDetailsFormProps {
  onSaved?: () => void
}

export function BankDetailsForm({ onSaved }: BankDetailsFormProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showIBAN, setShowIBAN] = useState(false)

  const [existingData, setExistingData] = useState<BankDetails | null>(null)
  const [formData, setFormData] = useState({
    accountHolder: '',
    iban: '',
    bic: '',
  })

  // Fetch existing bank details
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await fetch('/api/user/bank')
        const data = await response.json()
        if (data.success && data.data) {
          setExistingData(data.data)
          setFormData({
            accountHolder: data.data.accountHolder,
            iban: '', // Never show real IBAN
            bic: data.data.bic || '',
          })
        }
      } catch {
        // No existing data, that's okay
      } finally {
        setIsLoading(false)
      }
    }

    fetchBankDetails()
  }, [])

  // Format IBAN for display (add spaces every 4 chars)
  const formatIBAN = (value: string) => {
    const clean = value.replace(/\s/g, '').toUpperCase()
    const chunks = clean.match(/.{1,4}/g) || []
    return chunks.join(' ')
  }

  const handleIBANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIBAN(e.target.value)
    // German IBAN max length: DE + 20 digits + 5 spaces = 27 chars
    if (formatted.replace(/\s/g, '').length <= 22) {
      setFormData((prev) => ({ ...prev, iban: formatted }))
    }
    setError(null)
    setSuccess(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    // Validate IBAN
    const cleanIBAN = formData.iban.replace(/\s/g, '')
    if (!cleanIBAN.startsWith('DE') || cleanIBAN.length !== 22) {
      setError('Bitte geben Sie eine gültige deutsche IBAN ein (DE + 20 Ziffern)')
      setIsSaving(false)
      return
    }

    try {
      const response = await fetch('/api/user/bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountHolder: formData.accountHolder,
          iban: cleanIBAN,
          bic: formData.bic || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Speichern fehlgeschlagen')
        return
      }

      setExistingData(data.data)
      setFormData((prev) => ({ ...prev, iban: '' }))
      setSuccess('Bankdaten erfolgreich gespeichert')
      onSaved?.()
    } catch {
      setError('Ein Fehler ist aufgetreten')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Möchten Sie Ihre Bankdaten wirklich löschen?')) {
      return
    }

    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch('/api/user/bank', {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Löschen fehlgeschlagen')
        return
      }

      setExistingData(null)
      setFormData({ accountHolder: '', iban: '', bic: '' })
      setSuccess('Bankdaten erfolgreich gelöscht')
    } catch {
      setError('Ein Fehler ist aufgetreten')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-green-700">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{success}</p>
        </div>
      )}

      {/* Existing Bank Details Display */}
      {existingData && (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Gespeicherte Bankverbindung
                </h3>
                <p className="text-sm text-muted">
                  Ihre Daten werden verschlüsselt gespeichert
                </p>
              </div>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Bankdaten löschen"
            >
              {isDeleting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{existingData.accountHolder}</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="font-mono text-gray-700">
                {existingData.maskedIBAN}
              </span>
            </div>
            {existingData.bic && (
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="font-mono text-gray-700">{existingData.bic}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="accountHolder"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kontoinhaber
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="accountHolder"
              name="accountHolder"
              type="text"
              value={formData.accountHolder}
              onChange={handleChange}
              placeholder="Max Mustermann"
              required
              className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="iban"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            IBAN {existingData && '(neu eingeben zum Ändern)'}
          </label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="iban"
              name="iban"
              type={showIBAN ? 'text' : 'password'}
              value={formData.iban}
              onChange={handleIBANChange}
              placeholder="DE89 3704 0044 0532 0130 00"
              required={!existingData}
              className="w-full h-12 pl-12 pr-12 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
            />
            <button
              type="button"
              onClick={() => setShowIBAN(!showIBAN)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showIBAN ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted mt-1">
            Deutsche IBAN: DE + 20 Ziffern
          </p>
        </div>

        <div>
          <label
            htmlFor="bic"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            BIC / SWIFT (optional)
          </label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="bic"
              name="bic"
              type="text"
              value={formData.bic}
              onChange={handleChange}
              placeholder="COBADEFFXXX"
              maxLength={11}
              className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono uppercase"
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Ihre Daten sind sicher
            </p>
            <p className="text-xs text-muted">
              Bankdaten werden verschlüsselt übertragen und gemäß DSGVO
              gespeichert. Sie können Ihre Daten jederzeit löschen.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSaving || (!formData.iban && !existingData)}
          className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Speichern...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {existingData ? 'Bankdaten aktualisieren' : 'Bankdaten speichern'}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
