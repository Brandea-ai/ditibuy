# ROADMAP – Modularer 4K-Ankaufmarktplatz für Bayern

> **Projektname**: BayernAnkauf (Arbeitstitel)
> **Repository**: brandea-angebotskalkulator
> **Referenz**: cleverbuy.de, wirkaufens.de
> **Status**: Phase 0 – Planung abgeschlossen

---

## Unbequeme Frage – Vorab geklärt

> *"Wer kümmert sich später operativ darum, dass Payment-Webhooks, DSGVO-Löschfristen und Support-Prozesse wirklich gelebt werden – ist das schon eingeplant, oder baust du gerade eine Luxusmaschine ohne klaren Betreiber?"*

### Antwort & Maßnahmen

| Bereich | Verantwortung | Implementierung |
|---------|---------------|-----------------|
| **Payment-Webhooks** | System + manuelles Monitoring | Automatische Retry-Logik, Alerting bei Failures, Admin-Dashboard für manuelle Eingriffe |
| **DSGVO-Löschfristen** | Automatisiert + Audit-Log | Cron-Job für Datenlöschung nach Fristablauf, WorkflowLog dokumentiert alle Löschungen |
| **Support-Prozesse** | Ticketsystem + Referenzcode | Jede Anfrage enthält Referenzcode, Status-Tracking im Dashboard |
| **Betreiber-Konzept** | Dokumentiert in Phase 6 | Runbook für Ops, Monitoring-Setup, Eskalationspfade |

**Fazit**: Kein Feature wird ohne klaren Betriebsprozess gebaut. Jede Phase enthält einen "Ops-Check".

---

## Übersicht – Die 6 Phasen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PHASE 1          PHASE 2          PHASE 3          PHASE 4                │
│  Skeleton &       Domain &         Auth, Profile    Kalkulator &           │
│  Layout           Datenbank        & Bankdaten      Angebotslogik          │
│  ─────────────    ─────────────    ─────────────    ─────────────          │
│  □ Next.js        □ Prisma         □ Login/Reg      □ Preiskalkulation     │
│  □ Routing        □ Migrations     □ User-Profil    □ Referenzcode         │
│  □ Sections       □ Seeds          □ Bankdaten      □ Dashboard            │
│  □ Alignment      □ Models         □ Sicherheit     □ Statuslogik          │
│                                                                             │
│  PHASE 5                           PHASE 6                                  │
│  Payments &                        Security, Tests,                         │
│  Workflows                         Docs & CI/CD                             │
│  ─────────────                     ─────────────                            │
│  □ Provider-Interface              □ Security-Audit                         │
│  □ Mock-Provider                   □ Unit-Tests                             │
│  □ Webhooks                        □ Dokumentation                          │
│  □ Status-Machine                  □ GitHub Actions                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Tech-Stack

| Kategorie | Technologie | Begründung |
|-----------|-------------|------------|
| **Framework** | Next.js 14 (App Router) | Server Components, API Routes, Vercel-optimiert |
| **Sprache** | TypeScript | Typsicherheit, bessere DX |
| **Styling** | Tailwind CSS + CSS Modules | Utility-first + Scoped Styles |
| **Animationen** | Framer Motion | Performante Scroll-Animationen, Parallax |
| **State** | React Context + Hooks | Einfach, keine Overkill-Lösung |
| **Forms** | React Hook Form + Zod | Validierung, Performance |
| **Datenbank** | PostgreSQL + Prisma | SQL, Migrations, Type-safe ORM |
| **Auth** | NextAuth.js / Custom | Sessions, HTTP-only Cookies |
| **Deployment** | Vercel + GitHub | Auto-Deploy, Preview Branches |

---

## Phase 1 – Skeleton & Layout

### Ziel
Grundgerüst mit allen Seiten als Dummy-Sections, 4K-fähiges Layout-System.

### Aufgaben

#### 1.1 Projektstruktur erstellen
```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Landing Page
│   │   └── verkaufen/page.tsx          # Kalkulator-Einstieg
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (app)/
│   │   ├── dashboard/page.tsx
│   │   └── profil/page.tsx
│   ├── (legal)/
│   │   ├── impressum/page.tsx
│   │   ├── datenschutz/page.tsx
│   │   └── agb/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── calc-offer/route.ts
│   │   ├── offers/route.ts
│   │   ├── bank/route.ts
│   │   ├── payment/route.ts
│   │   ├── webhooks/payment/route.ts
│   │   └── chatbot/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── SectionLayout.tsx           # Alignment-Logik
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── home/
│   │       ├── HeroSection.tsx
│   │       ├── TrustSection.tsx
│   │       ├── HowItWorksSection.tsx
│   │       ├── CalculatorTeaserSection.tsx
│   │       ├── BavariaFocusSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── FAQSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Modal.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
├── hooks/
├── types/
└── styles/
    └── tokens.css                      # Design Tokens
```

#### 1.2 SectionLayout-Komponente

```tsx
// src/components/layout/SectionLayout.tsx

type Alignment = 'left' | 'center' | 'right' | 'full';

interface SectionLayoutProps {
  alignment: Alignment;
  children: React.ReactNode;
  id?: string;
  className?: string;
  animate?: boolean;  // Scroll-Animation
  parallax?: boolean; // Parallax-Effekt
}
```

**Alignment-Regeln für 4K:**
| Alignment | Verhalten | Max-Width | Beispiel-Section |
|-----------|-----------|-----------|------------------|
| `left` | Content links, Whitespace rechts | 1200px | Hero, FAQ |
| `center` | Klassisch zentriert | 1400px | Trust, How It Works |
| `right` | Content rechts, Whitespace links | 1200px | Calculator Teaser |
| `full` | Volle Breite | 100% | Banner, Bilder |

#### 1.3 Dummy-Sections (Landing Page)

Reihenfolge (psychologisch optimiert):

1. **HeroSection** (`left`) – Klare Value Proposition, Haupt-CTA
2. **TrustSection** (`center`) – Siegel, Zahlen, Bayern-Fokus
3. **HowItWorksSection** (`center`) – 3 Schritte visuell
4. **CalculatorTeaserSection** (`right`) – Vorschau Kalkulator
5. **BavariaFocusSection** (`left`) – Regionale Differenzierung
6. **TestimonialsSection** (`center`) – Social Proof
7. **FAQSection** (`left`) – Häufige Fragen
8. **FooterSection** (`full`) – Legal, Kontakt

#### 1.4 Design Tokens

```css
/* src/styles/tokens.css */

:root {
  /* Farben */
  --color-primary: #0066CC;
  --color-secondary: #00A3E0;
  --color-accent: #FFB800;
  --color-success: #00C853;
  --color-error: #FF3D00;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;

  /* Bayern-Branding */
  --color-bavaria-blue: #0066B3;
  --color-bavaria-white: #FFFFFF;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Plus Jakarta Sans', var(--font-sans);

  /* Breakpoints (als CSS custom properties für JS) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  --breakpoint-4k: 2560px;

  /* Max-Widths */
  --max-width-content: 1400px;
  --max-width-wide: 1920px;
}
```

### Ops-Check Phase 1
- [ ] Vercel Preview Deployment funktioniert
- [ ] Lighthouse Score > 90 (Performance)
- [ ] Responsive auf allen Breakpoints getestet

### Deliverables
- [ ] Lauffähige Next.js App mit allen Routes
- [ ] SectionLayout mit 4 Alignment-Varianten
- [ ] Alle Dummy-Sections implementiert
- [ ] Design Tokens definiert
- [ ] Framer Motion Setup mit Beispielanimation

---

## Phase 2 – Domain & Datenbank

### Ziel
Prisma-Schema, Migrations, Seed-Daten für Gerätemodelle.

### Aufgaben

#### 2.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USER
// ============================================
model User {
  id             String   @id @default(cuid())
  email          String   @unique
  hashedPassword String
  firstName      String?
  lastName       String?
  origin         String?  // Stadt/Region
  street         String?
  zip            String?
  city           String?
  state          String   @default("Bayern")

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  offers         Offer[]
  bankDetails    BankDetails?
}

// ============================================
// DEVICE MODEL (Ankauf-Katalog)
// ============================================
model DeviceModel {
  id            String   @id @default(cuid())
  category      DeviceCategory
  brand         String
  modelName     String
  storageGb     Int?
  releaseYear   Int?
  basePriceEuro Float
  isActive      Boolean  @default(true)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  offers        Offer[]

  @@unique([brand, modelName, storageGb])
}

enum DeviceCategory {
  SMARTPHONE
  TABLET
  LAPTOP
  SMARTWATCH
  KONSOLE
  KAMERA
  SONSTIGES
}

// ============================================
// OFFER (Ankaufsangebot)
// ============================================
model Offer {
  id                   String      @id @default(cuid())
  userId               String
  deviceModelId        String

  conditionLevel       ConditionLevel
  damageFlags          Json        // Array von Schäden

  preliminaryOfferEuro Float
  finalOfferEuro       Float?

  referenceCode        String      @unique // z.B. BY-2025-A1B2C
  status               OfferStatus @default(ENTWURF)

  notes                String?     // Interne Notizen

  createdAt            DateTime    @default(now())
  updatedAt            DateTime    @updatedAt

  user                 User        @relation(fields: [userId], references: [id])
  deviceModel          DeviceModel @relation(fields: [deviceModelId], references: [id])
  payments             Payment[]
  workflowLogs         WorkflowLog[]
}

enum ConditionLevel {
  SEHR_GUT        // ~100% Basispreis
  GUT             // ~85%
  GEBRAUCHT       // ~70%
  STARK_GEBRAUCHT // ~50%
  DEFEKT          // ~20%
}

enum OfferStatus {
  ENTWURF              // Kunde hat Kalkulator genutzt
  ANGEBOT_ERSTELLT     // Vorläufiges Angebot
  GERAET_EINGESENDET   // Gerät unterwegs
  IN_PRUEFUNG          // Gerät wird geprüft
  ANGEBOT_ANGEPASST    // Nach Prüfung geändert
  AKZEPTIERT           // Kunde akzeptiert
  ABGELEHNT            // Kunde lehnt ab
  AUSZAHLUNG_INITIIERT // Payment gestartet
  AUSGEZAHLT           // Geld überwiesen
  STORNIERT            // Abgebrochen
}

// ============================================
// BANK DETAILS (Sicher speichern!)
// ============================================
// WICHTIG: In Produktion MÜSSEN IBAN/BIC verschlüsselt werden!
// Optionen:
// - Application-level Encryption (AES-256-GCM)
// - PostgreSQL pgcrypto Extension
// - External KMS (AWS KMS, HashiCorp Vault)
// NIEMALS Bankdaten in Logs schreiben!
model BankDetails {
  id                 String   @id @default(cuid())
  userId             String   @unique

  accountHolderName  String
  iban               String   // TODO: Verschlüsseln in Produktion!
  bic                String?  // TODO: Verschlüsseln in Produktion!

  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  user               User     @relation(fields: [userId], references: [id])
}

// ============================================
// PAYMENT (Auszahlungen)
// ============================================
model Payment {
  id                String        @id @default(cuid())
  offerId           String

  provider          String        @default("MOCK") // MOCK, stripe, mollie
  providerPaymentId String?

  amountEuro        Float
  currency          String        @default("EUR")
  direction         PaymentDirection @default(PAYOUT_TO_CUSTOMER)
  status            PaymentStatus @default(INITIATED)

  failureReason     String?
  retryCount        Int           @default(0)

  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  offer             Offer         @relation(fields: [offerId], references: [id])
  workflowLogs      WorkflowLog[]
}

enum PaymentDirection {
  PAYOUT_TO_CUSTOMER
}

enum PaymentStatus {
  INITIATED
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
}

// ============================================
// WORKFLOW LOG (Audit Trail)
// ============================================
// Wichtig für DSGVO-Nachweise und Debugging
model WorkflowLog {
  id          String   @id @default(cuid())

  entityType  String   // "OFFER", "PAYMENT", "USER", "BANK_DETAILS"
  entityId    String

  action      String   // "CREATED", "STATUS_CHANGED", "WEBHOOK_RECEIVED", etc.
  oldValue    Json?
  newValue    Json?

  triggeredBy String?  // "SYSTEM", "USER:{id}", "WEBHOOK:{provider}"
  ipAddress   String?  // Für Audit (anonymisiert speichern!)

  createdAt   DateTime @default(now())

  offer       Offer?   @relation(fields: [offerId], references: [id])
  offerId     String?
  payment     Payment? @relation(fields: [paymentId], references: [id])
  paymentId   String?
}

// ============================================
// DSGVO: LÖSCHFRISTEN
// ============================================
// Daten-Kategorie          | Aufbewahrung    | Löschung nach
// -------------------------|-----------------|---------------
// User (aktiv)             | Unbegrenzt      | Auf Anfrage
// User (inaktiv)           | 3 Jahre         | Automatisch
// Offers                   | 10 Jahre        | Steuerrecht
// BankDetails              | Bis Auszahlung  | Nach Abschluss + 30 Tage
// WorkflowLogs             | 10 Jahre        | Compliance
//
// Implementierung: Cron-Job prüft täglich und löscht nach Frist
```

#### 2.2 Seed-Script

```typescript
// prisma/seed.ts

const deviceModels = [
  // iPhones
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro Max', storageGb: 256, basePriceEuro: 850 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro Max', storageGb: 512, basePriceEuro: 950 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 15 Pro', storageGb: 128, basePriceEuro: 700 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 14 Pro', storageGb: 128, basePriceEuro: 550 },
  { category: 'SMARTPHONE', brand: 'Apple', modelName: 'iPhone 13', storageGb: 128, basePriceEuro: 380 },

  // Samsung
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24 Ultra', storageGb: 256, basePriceEuro: 750 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S24+', storageGb: 256, basePriceEuro: 550 },
  { category: 'SMARTPHONE', brand: 'Samsung', modelName: 'Galaxy S23', storageGb: 128, basePriceEuro: 400 },

  // Tablets
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Pro 12.9"', storageGb: 256, basePriceEuro: 700 },
  { category: 'TABLET', brand: 'Apple', modelName: 'iPad Air', storageGb: 64, basePriceEuro: 350 },
  { category: 'TABLET', brand: 'Samsung', modelName: 'Galaxy Tab S9', storageGb: 128, basePriceEuro: 450 },

  // Laptops
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Pro 14"', storageGb: 512, basePriceEuro: 1200 },
  { category: 'LAPTOP', brand: 'Apple', modelName: 'MacBook Air M2', storageGb: 256, basePriceEuro: 750 },

  // Konsolen
  { category: 'KONSOLE', brand: 'Sony', modelName: 'PlayStation 5', storageGb: 825, basePriceEuro: 350 },
  { category: 'KONSOLE', brand: 'Microsoft', modelName: 'Xbox Series X', storageGb: 1000, basePriceEuro: 320 },
  { category: 'KONSOLE', brand: 'Nintendo', modelName: 'Switch OLED', storageGb: 64, basePriceEuro: 200 },
];
```

### Ops-Check Phase 2
- [ ] Migrations laufen fehlerfrei
- [ ] Seed-Daten eingespielt
- [ ] Prisma Studio funktioniert
- [ ] Backup-Strategie dokumentiert

### Deliverables
- [ ] Vollständiges Prisma Schema
- [ ] Migrations generiert und getestet
- [ ] Seed-Script mit 20+ Gerätemodellen
- [ ] DSGVO-Löschkonzept dokumentiert

---

## Phase 3 – Auth, Profile & Bankdaten

### Ziel
Sichere Authentifizierung, Benutzerprofil, Bankdaten-Verwaltung.

### Aufgaben

#### 3.1 Authentifizierung

**Registrierung:**
- E-Mail, Passwort (min. 8 Zeichen, 1 Zahl, 1 Sonderzeichen)
- PLZ + Stadt (Bayern-Validierung)
- Double-Opt-In per E-Mail

**PLZ-Validierung Bayern:**
```typescript
// Bayerische PLZ-Bereiche (vereinfacht)
const BAYERN_PLZ_RANGES = [
  [80000, 87999],  // München, Oberbayern
  [88000, 89999],  // Schwaben (teilweise)
  [90000, 96999],  // Franken, Oberpfalz
  [97000, 97999],  // Unterfranken (teilweise)
];

function isValidBavarianZip(zip: string): boolean {
  const num = parseInt(zip, 10);
  return BAYERN_PLZ_RANGES.some(([min, max]) => num >= min && num <= max);
}
```

**Login:**
- E-Mail + Passwort
- Rate-Limiting (5 Versuche, dann 15 Min Sperre)
- HTTP-only Secure Cookies

#### 3.2 Benutzerprofil

**Dashboard (`/dashboard`):**
- Übersicht aller Offers
- Status-Badges mit Farben
- Referenzcode prominent angezeigt
- Quick-Actions (Details, Stornieren)

**Profil (`/profil`):**
- Persönliche Daten bearbeiten
- Passwort ändern
- Account löschen (DSGVO)

#### 3.3 Bankdaten

**Formular:**
- IBAN mit Formatierung (DE XX XXXX XXXX XXXX XXXX XX)
- BIC (optional, wird aus IBAN abgeleitet)
- Kontoinhaber

**Validierung:**
```typescript
// IBAN-Validierung (Prüfziffer)
function validateIBAN(iban: string): boolean {
  // 1. Länge prüfen (DE = 22 Zeichen)
  // 2. Prüfziffer berechnen (Modulo 97)
  // 3. Format prüfen
}
```

**Sicherheit:**
- Maskierte Anzeige: `DE** **** **** **** **34 56`
- Änderungen loggen in WorkflowLog
- Keine Logs mit vollem IBAN

### Ops-Check Phase 3
- [ ] Passwort-Reset funktioniert
- [ ] Session-Handling sicher (OWASP)
- [ ] Bankdaten-Änderungen geloggt
- [ ] Rate-Limiting aktiv

### Deliverables
- [ ] Login/Registrierung mit Validierung
- [ ] Dashboard mit Offer-Übersicht
- [ ] Profil-Seite mit Edit-Funktion
- [ ] Bankdaten-Formular mit Maskierung
- [ ] WorkflowLog für Änderungen

---

## Phase 4 – Kalkulator & Angebotslogik

### Ziel
Funktionierender Preiskalkulator, Angebotserstellung, Referenzcode-System.

### Aufgaben

#### 4.1 Kalkulator-Logik

**API: `POST /api/calc-offer`**

```typescript
interface CalcOfferRequest {
  deviceModelId: string;
  conditionLevel: ConditionLevel;
  damageFlags: DamageFlag[];
}

interface CalcOfferResponse {
  deviceModel: {
    brand: string;
    modelName: string;
    storageGb: number;
  };
  basePriceEuro: number;
  conditionFactor: number;
  conditionDeduction: number;
  damageDeductions: {
    flag: string;
    deductionPercent: number;
    deductionEuro: number;
  }[];
  totalDeductions: number;
  preliminaryOfferEuro: number;
}
```

**Konditions-Faktoren:**
| Level | Faktor | Beschreibung |
|-------|--------|--------------|
| SEHR_GUT | 1.00 | Wie neu, keine Gebrauchsspuren |
| GUT | 0.85 | Leichte Gebrauchsspuren |
| GEBRAUCHT | 0.70 | Normale Gebrauchsspuren |
| STARK_GEBRAUCHT | 0.50 | Deutliche Gebrauchsspuren |
| DEFEKT | 0.20 | Funktionseinschränkungen |

**Schadens-Abzüge:**
| Schaden | Abzug |
|---------|-------|
| DISPLAY_KRATZER | -5% |
| DISPLAY_RISS | -20% |
| DISPLAY_DEFEKT | -40% |
| GEHAEUSE_KRATZER | -5% |
| GEHAEUSE_DELLE | -10% |
| AKKU_SCHWACH | -15% |
| KAMERA_DEFEKT | -25% |
| WASSERSCHADEN | -50% |
| KEINE_ORIGINALVERPACKUNG | -2% |

#### 4.2 Referenzcode-Generator

```typescript
function generateReferenceCode(): string {
  const prefix = 'BY';
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const random = nanoid(6).toUpperCase(); // z.B. "A1B2C3"

  return `${prefix}-${year}${month}-${random}`;
  // Beispiel: BY-202501-A1B2C3
}
```

**Verwendung:**
- Wird bei Offer-Erstellung generiert
- In allen Formularen als Hidden Field
- Im Dashboard prominent angezeigt
- Bei Support-Anfragen mitgesendet

#### 4.3 Offer-Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Kalkulator │────▶│   Angebot   │────▶│  Dashboard  │
│   nutzen    │     │  erstellen  │     │   ansehen   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Referenzcode│
                    │  generiert  │
                    └─────────────┘
```

### Ops-Check Phase 4
- [ ] Kalkulator liefert korrekte Preise
- [ ] Referenzcodes sind unique
- [ ] Offer-Status korrekt getrackt
- [ ] Dashboard zeigt alle Offers

### Deliverables
- [ ] Kalkulator-UI mit Geräteauswahl
- [ ] Konditions- und Schadens-Auswahl
- [ ] Live-Preisberechnung
- [ ] Offer-Erstellung mit Referenzcode
- [ ] Dashboard mit Status-Übersicht

---

## Phase 5 – Payments & Workflows

### Ziel
Payment-Provider-Interface, Mock-Provider, Webhook-Handling, Status-Machine.

### Aufgaben

#### 5.1 Payment-Provider-Interface

```typescript
// src/lib/payment/provider.ts

interface PayoutParams {
  offerId: string;
  amountEuro: number;
  iban: string;
  accountHolderName: string;
  referenceCode: string;
}

interface PayoutResult {
  success: boolean;
  providerPaymentId?: string;
  status: 'INITIATED' | 'PENDING' | 'FAILED';
  errorMessage?: string;
}

interface PaymentProvider {
  name: string;
  createPayout(params: PayoutParams): Promise<PayoutResult>;
  getPayoutStatus(providerPaymentId: string): Promise<PaymentStatus>;
  handleWebhook(payload: unknown, signature: string): Promise<WebhookResult>;
}
```

#### 5.2 Mock-Provider

```typescript
// src/lib/payment/providers/mock.ts

export class MockPaymentProvider implements PaymentProvider {
  name = 'MOCK';

  async createPayout(params: PayoutParams): Promise<PayoutResult> {
    // Simuliere Netzwerk-Delay
    await sleep(500);

    // 90% Erfolgsrate für Tests
    const success = Math.random() > 0.1;

    return {
      success,
      providerPaymentId: success ? `mock_${nanoid()}` : undefined,
      status: success ? 'INITIATED' : 'FAILED',
      errorMessage: success ? undefined : 'Mock: Simulated failure',
    };
  }

  // Später: Stripe, Mollie, etc. als weitere Provider
}
```

#### 5.3 Webhook-Endpoint

```typescript
// src/app/api/webhooks/payment/route.ts

// SICHERHEITS-HINWEISE:
// 1. Signatur des Webhooks IMMER prüfen!
// 2. Idempotenz: Gleiche Webhook-ID nicht doppelt verarbeiten
// 3. Retry-Logik: Provider senden mehrfach bei Fehler
// 4. Logging: Alle Webhooks in WorkflowLog speichern
// 5. Queue: In Produktion über Message Queue verarbeiten (BullMQ, SQS)

export async function POST(request: Request) {
  // 1. Signatur prüfen
  // 2. Payload parsen
  // 3. Payment-Status updaten
  // 4. Offer-Status updaten
  // 5. WorkflowLog schreiben
  // 6. E-Mail-Benachrichtigung (Stub)
}
```

#### 5.4 Status-Machine

```
┌──────────────────────────────────────────────────────────────────┐
│                        OFFER STATUS FLOW                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ENTWURF ──▶ ANGEBOT_ERSTELLT ──▶ GERAET_EINGESENDET            │
│                                          │                       │
│                                          ▼                       │
│                                    IN_PRUEFUNG                   │
│                                     /       \                    │
│                                    ▼         ▼                   │
│                        ANGEBOT_ANGEPASST   (direkt weiter)       │
│                                    \         /                   │
│                                     ▼       ▼                    │
│                    ABGELEHNT ◀── AKZEPTIERT ──▶ STORNIERT        │
│                                      │                           │
│                                      ▼                           │
│                           AUSZAHLUNG_INITIIERT                   │
│                                      │                           │
│                                      ▼                           │
│                                 AUSGEZAHLT                       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                       PAYMENT STATUS FLOW                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INITIATED ──▶ PENDING ──▶ PROCESSING ──▶ COMPLETED             │
│       │            │             │                               │
│       └────────────┴─────────────┴──────────▶ FAILED            │
│                                                  │                │
│                                                  ▼                │
│                                             (Retry?)              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Ops-Check Phase 5
- [ ] Mock-Payments funktionieren End-to-End
- [ ] Webhook-Endpoint erreichbar
- [ ] Status-Übergänge korrekt
- [ ] Alerting bei Failed Payments

### Deliverables
- [ ] PaymentProvider Interface
- [ ] MockPaymentProvider implementiert
- [ ] Webhook-Endpoint mit Logging
- [ ] Status-Machine für Offers & Payments
- [ ] Admin-View für Payment-Status

---

## Phase 6 – Security, Tests, Docs & CI/CD

### Ziel
Produktionsreife: Sicherheit, Tests, Dokumentation, Deployment.

### Aufgaben

#### 6.1 Security

**Headers (next.config.js / Middleware):**
```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // CSP: Anpassen je nach externen Ressourcen
];
```

**OWASP Checklist:**
- [ ] SQL Injection → Prisma (parameterisiert)
- [ ] XSS → React (escaped by default)
- [ ] CSRF → SameSite Cookies
- [ ] Auth Bypass → Session-Validierung
- [ ] Sensitive Data → Verschlüsselung, keine Logs
- [ ] Rate Limiting → API-Middleware

#### 6.2 Tests

```typescript
// __tests__/priceCalculator.test.ts

describe('Preiskalkulator', () => {
  it('berechnet Basispreis korrekt', () => {
    const result = calculateOffer({
      basePriceEuro: 1000,
      conditionLevel: 'SEHR_GUT',
      damageFlags: [],
    });
    expect(result.preliminaryOfferEuro).toBe(1000);
  });

  it('wendet Konditionsfaktor an', () => {
    const result = calculateOffer({
      basePriceEuro: 1000,
      conditionLevel: 'GUT', // 0.85
      damageFlags: [],
    });
    expect(result.preliminaryOfferEuro).toBe(850);
  });

  it('zieht Schäden ab', () => {
    const result = calculateOffer({
      basePriceEuro: 1000,
      conditionLevel: 'SEHR_GUT',
      damageFlags: ['DISPLAY_KRATZER', 'GEHAEUSE_KRATZER'], // -5% + -5%
    });
    expect(result.preliminaryOfferEuro).toBe(900);
  });

  it('kombiniert Kondition und Schäden', () => {
    const result = calculateOffer({
      basePriceEuro: 1000,
      conditionLevel: 'GUT', // 0.85 = 850
      damageFlags: ['DISPLAY_RISS'], // -20% von 850 = 680
    });
    expect(result.preliminaryOfferEuro).toBe(680);
  });

  it('gibt minimum 0 Euro zurück', () => {
    const result = calculateOffer({
      basePriceEuro: 100,
      conditionLevel: 'DEFEKT',
      damageFlags: ['WASSERSCHADEN', 'DISPLAY_DEFEKT'],
    });
    expect(result.preliminaryOfferEuro).toBeGreaterThanOrEqual(0);
  });
});

// __tests__/referenceCode.test.ts

describe('Referenzcode-Generator', () => {
  it('generiert gültiges Format', () => {
    const code = generateReferenceCode();
    expect(code).toMatch(/^BY-\d{6}-[A-Z0-9]{6}$/);
  });

  it('generiert unique Codes', () => {
    const codes = new Set(Array.from({ length: 1000 }, generateReferenceCode));
    expect(codes.size).toBe(1000);
  });
});

// __tests__/paymentStateMachine.test.ts

describe('Payment State Machine', () => {
  it('erlaubt INITIATED → PENDING', () => {
    expect(canTransition('INITIATED', 'PENDING')).toBe(true);
  });

  it('verbietet COMPLETED → INITIATED', () => {
    expect(canTransition('COMPLETED', 'INITIATED')).toBe(false);
  });
});
```

#### 6.3 Dokumentation

**docs/system-design.md:**
- Architektur-Übersicht
- Datenmodell (ER-Diagramm)
- API-Dokumentation
- Security-Konzept

**docs/workflows.md:**
- Offer-Lebenszyklus
- Payment-Flow
- Webhook-Verarbeitung
- DSGVO-Prozesse

**docs/runbook.md (Ops):**
- Deployment-Prozess
- Monitoring-Setup
- Incident-Response
- Manuelle Eingriffe

#### 6.4 CI/CD

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
```

#### 6.5 Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bayernankauf"

# Auth
AUTH_SECRET="generate-a-secure-random-string-here"
NEXTAUTH_URL="http://localhost:3000"

# Payment (Stubs)
PAYMENT_PROVIDER="MOCK"
# STRIPE_SECRET_KEY="sk_test_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."

# KI-Chatbot (Stub)
# LLM_API_URL="https://api.example.com/v1/chat"
# LLM_API_KEY="your-api-key"

# Vercel
VERCEL_URL=""
```

### Ops-Check Phase 6
- [ ] Alle Tests grün (Coverage > 80%)
- [ ] Security Headers aktiv
- [ ] CI/CD Pipeline läuft
- [ ] Dokumentation vollständig
- [ ] Runbook für Ops erstellt

### Deliverables
- [ ] Security Headers implementiert
- [ ] Unit Tests für Kernlogik
- [ ] Integration Tests für APIs
- [ ] docs/system-design.md
- [ ] docs/workflows.md
- [ ] docs/runbook.md
- [ ] .github/workflows/ci.yml
- [ ] .env.example vollständig

---

## Anhang

### A. Checkliste für neue Sessions

Bei jedem neuen Arbeitsbeginn:

1. **ROADMAP.md lesen** – Wo sind wir? Was ist die nächste Aufgabe?
2. **Git Status prüfen** – `git status`, `git log --oneline -5`
3. **Branch prüfen** – Auf richtigem Branch? Feature-Branch erstellen?
4. **Aktuelle Phase identifizieren** – Deliverables der Phase checken
5. **Ops-Check der letzten Phase** – Alles abgeschlossen?

### B. Commit-Konventionen

```
feat: Neue Funktion
fix: Bugfix
docs: Dokumentation
style: Formatierung (kein Code-Change)
refactor: Code-Umstrukturierung
test: Tests
chore: Build, CI, Dependencies
```

Beispiele:
- `feat(calculator): Implement damage deductions`
- `fix(auth): Fix session timeout handling`
- `docs(roadmap): Add Phase 5 details`

### C. Code-Review-Checklist

- [ ] TypeScript: Keine `any` Types
- [ ] Security: Keine sensiblen Daten in Logs
- [ ] Tests: Neue Funktion hat Tests
- [ ] DSGVO: Personendaten korrekt behandelt
- [ ] Performance: Keine N+1 Queries
- [ ] UX: Fehlermeldungen auf Deutsch

### D. Kontakt & Eskalation

| Thema | Zuständig | Eskalation |
|-------|-----------|------------|
| Code-Fragen | Claude | - |
| Payments | Mock-Provider | Dokumentation prüfen |
| DSGVO | Rechtliche Prüfung | Vor Go-Live klären |
| Hosting | Vercel | Support-Ticket |

---

## Changelog

| Version | Datum | Änderung |
|---------|-------|----------|
| 1.0 | 2025-01-XX | Initial ROADMAP erstellt |

---

*Erstellt mit Claude – Modularer Ankaufmarktplatz für Bayern*
