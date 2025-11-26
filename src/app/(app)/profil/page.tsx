'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SectionLayout } from '@/components/layout/SectionLayout'
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Loader2,
  Save,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'
import { BankDetailsForm } from '@/components/forms/BankDetailsForm'

/* ============================================
   PROFIL PAGE
   Phase 3: Profile Management
   ============================================ */

type TabId = 'personal' | 'bank' | 'notifications' | 'security'

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'personal', label: 'Persönliche Daten', icon: User },
  { id: 'bank', label: 'Bankdaten', icon: CreditCard },
  { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
  { id: 'security', label: 'Sicherheit', icon: Shield },
]

interface ProfileData {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  streetAddress: string
  postalCode: string
  city: string
}

export default function ProfilPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>('personal')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [profileData, setProfileData] = useState<ProfileData>({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    streetAddress: '',
    postalCode: '',
    city: '',
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/profil')
    }
  }, [status, router])

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile')
        const data = await response.json()
        if (data.success) {
          setProfileData(data.data)
        }
      } catch {
        setError('Profil konnte nicht geladen werden')
      } finally {
        setIsLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
    setError(null)
    setSuccess(null)
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          streetAddress: profileData.streetAddress,
          postalCode: profileData.postalCode,
          city: profileData.city,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Speichern fehlgeschlagen')
        return
      }

      setProfileData(data.data)
      setSuccess('Profil erfolgreich gespeichert')
    } catch {
      setError('Ein Fehler ist aufgetreten')
    } finally {
      setIsSaving(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const initials = `${profileData.firstName?.[0] || ''}${profileData.lastName?.[0] || ''}`.toUpperCase() || 'U'

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SectionLayout
        id="profil"
        alignment="center"
        background="default"
        paddingY="lg"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mein Profil</h1>
            <p className="text-muted">
              Verwalten Sie Ihre persönlichen Daten und Einstellungen.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                {/* Alerts */}
                {error && (
                  <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-100 rounded-xl text-red-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-100 rounded-xl text-green-700">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{success}</p>
                  </div>
                )}

                {/* Personal Data Tab */}
                {activeTab === 'personal' && (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Persönliche Daten
                    </h2>

                    {/* Avatar */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {profileData.firstName} {profileData.lastName}
                        </h3>
                        <p className="text-muted">{profileData.email}</p>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
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
                            value={profileData.firstName}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
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
                            value={profileData.lastName}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>

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
                            type="email"
                            value={profileData.email}
                            disabled
                            className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-xl border border-gray-200 text-gray-500 cursor-not-allowed"
                          />
                        </div>
                        <p className="text-xs text-muted mt-1">
                          E-Mail kann nicht geändert werden
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Telefon (optional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={profileData.phone}
                            onChange={handleChange}
                            placeholder="+49 89 123 456 78"
                            className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="streetAddress"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Straße und Hausnummer
                        </label>
                        <input
                          id="streetAddress"
                          name="streetAddress"
                          type="text"
                          value={profileData.streetAddress}
                          onChange={handleChange}
                          placeholder="Musterstraße 123"
                          className="w-full h-12 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label
                            htmlFor="postalCode"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            PLZ
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              id="postalCode"
                              name="postalCode"
                              type="text"
                              value={profileData.postalCode}
                              onChange={handleChange}
                              placeholder="80331"
                              maxLength={5}
                              className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Stadt
                          </label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            value={profileData.city}
                            onChange={handleChange}
                            placeholder="München"
                            className="w-full h-12 px-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="pt-4">
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Speichern...
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              Änderungen speichern
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Bank Data Tab */}
                {activeTab === 'bank' && (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Bankdaten
                    </h2>
                    <p className="text-muted mb-6">
                      Hinterlegen Sie Ihre Bankdaten für die Auszahlung.
                    </p>
                    <BankDetailsForm />
                  </>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Benachrichtigungen
                    </h2>
                    <div className="space-y-4">
                      <NotificationToggle
                        label="E-Mail bei Statusänderungen"
                        description="Erhalten Sie Updates zu Ihren Angeboten"
                        defaultChecked={true}
                      />
                      <NotificationToggle
                        label="E-Mail bei neuen Aktionen"
                        description="Infos zu Sonderaktionen und Bonuszahlungen"
                        defaultChecked={false}
                      />
                      <NotificationToggle
                        label="Newsletter"
                        description="Tipps und News rund ums Thema Elektronik"
                        defaultChecked={false}
                      />
                    </div>
                  </>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Sicherheit
                    </h2>
                    <div className="space-y-6">
                      <div className="p-6 bg-gray-50 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Passwort ändern
                        </h3>
                        <p className="text-sm text-muted mb-4">
                          Ändern Sie regelmäßig Ihr Passwort für mehr Sicherheit.
                        </p>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                          Passwort ändern
                        </button>
                      </div>

                      <div className="p-6 bg-gray-50 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Zwei-Faktor-Authentifizierung
                        </h3>
                        <p className="text-sm text-muted mb-4">
                          Zusätzliche Sicherheitsebene für Ihr Konto (bald verfügbar).
                        </p>
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                        >
                          Bald verfügbar
                        </button>
                      </div>

                      <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                        <h3 className="font-semibold text-red-700 mb-2">
                          Konto löschen
                        </h3>
                        <p className="text-sm text-red-600 mb-4">
                          Löscht alle Ihre Daten unwiderruflich gemäß DSGVO.
                        </p>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                          Konto löschen
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>
    </div>
  )
}

// Notification toggle component
function NotificationToggle({
  label,
  description,
  defaultChecked,
}: {
  label: string
  description: string
  defaultChecked: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-muted">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}
