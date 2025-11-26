/* ============================================
   TYPE DEFINITIONS – BayernAnkauf
   Phase 1: Core Types
   ============================================ */

// ─────────────────────────────────────────
// DEVICE & OFFER TYPES
// ─────────────────────────────────────────

export type DeviceCategory =
  | 'SMARTPHONE'
  | 'TABLET'
  | 'LAPTOP'
  | 'SMARTWATCH'
  | 'KONSOLE'
  | 'KAMERA'
  | 'SONSTIGES'

export type ConditionLevel =
  | 'SEHR_GUT'
  | 'GUT'
  | 'GEBRAUCHT'
  | 'STARK_GEBRAUCHT'
  | 'DEFEKT'

export type DamageFlag =
  | 'DISPLAY_KRATZER'
  | 'DISPLAY_RISS'
  | 'DISPLAY_DEFEKT'
  | 'GEHAEUSE_KRATZER'
  | 'GEHAEUSE_DELLE'
  | 'AKKU_SCHWACH'
  | 'KAMERA_DEFEKT'
  | 'WASSERSCHADEN'
  | 'KEINE_ORIGINALVERPACKUNG'

export type OfferStatus =
  | 'ENTWURF'
  | 'ANGEBOT_ERSTELLT'
  | 'GERAET_EINGESENDET'
  | 'IN_PRUEFUNG'
  | 'ANGEBOT_ANGEPASST'
  | 'AKZEPTIERT'
  | 'ABGELEHNT'
  | 'AUSZAHLUNG_INITIIERT'
  | 'AUSGEZAHLT'
  | 'STORNIERT'

export type PaymentStatus =
  | 'INITIATED'
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'

// ─────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────

export interface DeviceModel {
  id: string
  category: DeviceCategory
  brand: string
  modelName: string
  storageGb?: number
  releaseYear?: number
  basePriceEuro: number
  isActive: boolean
}

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  origin?: string
  street?: string
  zip?: string
  city?: string
  state: string
  createdAt: Date
  updatedAt: Date
}

export interface Offer {
  id: string
  userId: string
  deviceModelId: string
  conditionLevel: ConditionLevel
  damageFlags: DamageFlag[]
  preliminaryOfferEuro: number
  finalOfferEuro?: number
  referenceCode: string
  status: OfferStatus
  notes?: string
  createdAt: Date
  updatedAt: Date
  deviceModel?: DeviceModel
}

export interface BankDetails {
  id: string
  userId: string
  accountHolderName: string
  iban: string
  bic?: string
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  offerId: string
  provider: string
  providerPaymentId?: string
  amountEuro: number
  currency: string
  status: PaymentStatus
  failureReason?: string
  retryCount: number
  createdAt: Date
  updatedAt: Date
}

// ─────────────────────────────────────────
// API TYPES
// ─────────────────────────────────────────

export interface CalcOfferRequest {
  deviceModelId: string
  conditionLevel: ConditionLevel
  damageFlags: DamageFlag[]
}

export interface CalcOfferResponse {
  deviceModel: {
    brand: string
    modelName: string
    storageGb?: number
  }
  basePriceEuro: number
  conditionFactor: number
  conditionDeduction: number
  damageDeductions: {
    flag: DamageFlag
    deductionPercent: number
    deductionEuro: number
  }[]
  totalDeductions: number
  preliminaryOfferEuro: number
}

export interface CreateOfferRequest extends CalcOfferRequest {
  // User will be determined from session
}

export interface CreateOfferResponse {
  offer: Offer
  referenceCode: string
}

// ─────────────────────────────────────────
// UI TYPES
// ─────────────────────────────────────────

export type SectionAlignment = 'left' | 'center' | 'right' | 'full'

export interface SectionProps {
  id?: string
  className?: string
}

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

export interface FAQ {
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  rating: number
  deviceSold?: string
  avatar?: string
}

export interface TrustBadge {
  icon: string
  title: string
  description: string
}

export interface ProcessStep {
  number: number
  title: string
  description: string
  icon: string
}

// ─────────────────────────────────────────
// FORM TYPES
// ─────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  referenceCode?: string
}

export interface RegisterFormData {
  email: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
  zip: string
  city: string
  acceptTerms: boolean
}

export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface BankDetailsFormData {
  accountHolderName: string
  iban: string
  bic?: string
}

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────

export const CONDITION_FACTORS: Record<ConditionLevel, number> = {
  SEHR_GUT: 1.0,
  GUT: 0.85,
  GEBRAUCHT: 0.70,
  STARK_GEBRAUCHT: 0.50,
  DEFEKT: 0.20,
}

export const CONDITION_LABELS: Record<ConditionLevel, string> = {
  SEHR_GUT: 'Sehr gut',
  GUT: 'Gut',
  GEBRAUCHT: 'Gebraucht',
  STARK_GEBRAUCHT: 'Stark gebraucht',
  DEFEKT: 'Defekt',
}

export const DAMAGE_DEDUCTIONS: Record<DamageFlag, number> = {
  DISPLAY_KRATZER: 0.05,
  DISPLAY_RISS: 0.20,
  DISPLAY_DEFEKT: 0.40,
  GEHAEUSE_KRATZER: 0.05,
  GEHAEUSE_DELLE: 0.10,
  AKKU_SCHWACH: 0.15,
  KAMERA_DEFEKT: 0.25,
  WASSERSCHADEN: 0.50,
  KEINE_ORIGINALVERPACKUNG: 0.02,
}

export const DAMAGE_LABELS: Record<DamageFlag, string> = {
  DISPLAY_KRATZER: 'Display-Kratzer',
  DISPLAY_RISS: 'Display-Riss',
  DISPLAY_DEFEKT: 'Display defekt',
  GEHAEUSE_KRATZER: 'Gehäuse-Kratzer',
  GEHAEUSE_DELLE: 'Gehäuse-Delle',
  AKKU_SCHWACH: 'Schwacher Akku',
  KAMERA_DEFEKT: 'Kamera defekt',
  WASSERSCHADEN: 'Wasserschaden',
  KEINE_ORIGINALVERPACKUNG: 'Keine Originalverpackung',
}

export const STATUS_LABELS: Record<OfferStatus, string> = {
  ENTWURF: 'Entwurf',
  ANGEBOT_ERSTELLT: 'Angebot erstellt',
  GERAET_EINGESENDET: 'Gerät eingesendet',
  IN_PRUEFUNG: 'In Prüfung',
  ANGEBOT_ANGEPASST: 'Angebot angepasst',
  AKZEPTIERT: 'Akzeptiert',
  ABGELEHNT: 'Abgelehnt',
  AUSZAHLUNG_INITIIERT: 'Auszahlung eingeleitet',
  AUSGEZAHLT: 'Ausgezahlt',
  STORNIERT: 'Storniert',
}

export const STATUS_COLORS: Record<OfferStatus, string> = {
  ENTWURF: 'gray',
  ANGEBOT_ERSTELLT: 'blue',
  GERAET_EINGESENDET: 'blue',
  IN_PRUEFUNG: 'yellow',
  ANGEBOT_ANGEPASST: 'yellow',
  AKZEPTIERT: 'green',
  ABGELEHNT: 'red',
  AUSZAHLUNG_INITIIERT: 'blue',
  AUSGEZAHLT: 'green',
  STORNIERT: 'gray',
}

export const CATEGORY_LABELS: Record<DeviceCategory, string> = {
  SMARTPHONE: 'Smartphone',
  TABLET: 'Tablet',
  LAPTOP: 'Laptop',
  SMARTWATCH: 'Smartwatch',
  KONSOLE: 'Spielkonsole',
  KAMERA: 'Kamera',
  SONSTIGES: 'Sonstiges',
}
