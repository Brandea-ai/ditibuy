# System Design – BayernAnkauf

> Modularer 4K-Ankaufmarktplatz für Bayern

## Architektur-Übersicht

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Browser (React/Next.js)                                               │
│   ├── Public Pages (/, /verkaufen, /legal)                              │
│   ├── Auth Pages (/login, /register)                                    │
│   └── App Pages (/dashboard, /profil)                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Next.js API Routes                                                    │
│   ├── /api/auth/* ─────────── NextAuth.js (Credentials)                 │
│   ├── /api/devices ────────── Device Catalog                            │
│   ├── /api/offers ─────────── Offer Management                          │
│   ├── /api/payments ───────── Payment Processing                        │
│   ├── /api/user/* ─────────── Profile & Bank Details                    │
│   └── /api/webhooks/* ─────── External Callbacks                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           SERVICE LAYER                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ├── Calculator Service ──── Price calculation logic                   │
│   ├── Workflow Service ────── Status transitions                        │
│   ├── Payment Service ─────── Provider abstraction                      │
│   ├── Shipping Service ────── Label generation                          │
│   ├── Email Service ───────── Notifications                             │
│   └── Security Service ────── Rate limiting, validation                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Prisma ORM                                                            │
│   └── PostgreSQL                                                        │
│       ├── Users                                                         │
│       ├── DeviceModels                                                  │
│       ├── Offers                                                        │
│       ├── BankDetails (encrypted)                                       │
│       ├── Payments                                                      │
│       └── WorkflowLogs                                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Datenmodell

### Entity-Relationship Diagramm

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │──1:N──│    Offer    │──N:1──│ DeviceModel │
└─────────────┘       └─────────────┘       └─────────────┘
      │                     │
      │                     │
     1:1                   1:N
      │                     │
      ▼                     ▼
┌─────────────┐       ┌─────────────┐
│ BankDetails │       │   Payment   │
└─────────────┘       └─────────────┘
                            │
                           1:N
                            │
                            ▼
                      ┌─────────────┐
                      │ WorkflowLog │
                      └─────────────┘
```

### Tabellen

| Tabelle | Beschreibung | Wichtige Felder |
|---------|--------------|-----------------|
| `User` | Benutzerkonten | email, hashedPassword, state (Bayern) |
| `DeviceModel` | Gerätekatalog | brand, modelName, storageGb, basePriceEuro |
| `Offer` | Ankaufsangebote | referenceCode, status, preliminaryOfferEuro |
| `BankDetails` | Bankverbindungen | iban (verschlüsselt), accountHolderName |
| `Payment` | Auszahlungen | provider, status, amountEuro |
| `WorkflowLog` | Audit-Trail | entityType, action, oldValue, newValue |

## API-Dokumentation

### Authentication

#### POST /api/auth/register
Registriert einen neuen Benutzer.

**Request:**
```json
{
  "email": "max@example.de",
  "password": "SecureP@ss123",
  "firstName": "Max",
  "lastName": "Mustermann",
  "zip": "80331",
  "city": "München"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registrierung erfolgreich"
}
```

#### POST /api/auth/[...nextauth]
NextAuth.js Credentials Provider für Login.

### Devices

#### GET /api/devices
Holt alle aktiven Gerätemodelle.

**Query Parameters:**
- `category`: Filter nach Kategorie (SMARTPHONE, TABLET, etc.)
- `brand`: Filter nach Marke

**Response (200):**
```json
{
  "devices": [
    {
      "id": "cuid...",
      "category": "SMARTPHONE",
      "brand": "Apple",
      "modelName": "iPhone 15 Pro",
      "storageGb": 256,
      "basePriceEuro": 850
    }
  ]
}
```

### Offers

#### POST /api/offers
Erstellt ein neues Angebot.

**Request:**
```json
{
  "deviceModelId": "cuid...",
  "conditionLevel": "GUT",
  "damageFlags": ["DISPLAY_KRATZER"]
}
```

**Response (201):**
```json
{
  "offer": {
    "id": "cuid...",
    "referenceCode": "BY-202501-A1B2C3",
    "status": "ANGEBOT_ERSTELLT",
    "preliminaryOfferEuro": 722.50
  }
}
```

#### GET /api/offers
Holt alle Angebote des authentifizierten Benutzers.

#### GET /api/offers/[id]
Holt ein spezifisches Angebot.

#### PATCH /api/offers/[id]
Aktualisiert den Status eines Angebots.

### Payments

#### POST /api/payments
Initiiert eine Auszahlung.

**Request:**
```json
{
  "offerId": "cuid..."
}
```

#### GET /api/payments
Holt alle Zahlungen des Benutzers.

### User

#### GET /api/user/profile
Holt das Benutzerprofil.

#### PATCH /api/user/profile
Aktualisiert das Benutzerprofil.

#### GET /api/user/bank
Holt die Bankverbindung (maskiert).

#### POST /api/user/bank
Speichert eine neue Bankverbindung.

## Security-Konzept

### Authentifizierung
- NextAuth.js mit Credentials Provider
- JWT-Sessions (HTTP-only Cookies)
- Passwort-Hashing mit bcrypt (12 Rounds)

### Autorisierung
- Middleware-basierte Route Protection
- User-scoped API-Zugriffe

### Rate Limiting
| Endpoint-Typ | Limit | Zeitfenster |
|--------------|-------|-------------|
| Auth | 5 Anfragen | 15 Minuten |
| API | 100 Anfragen | 1 Minute |
| Webhooks | 1000 Anfragen | 1 Minute |

### Security Headers
- Strict-Transport-Security (HSTS)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Content-Security-Policy
- Referrer-Policy
- Permissions-Policy

### Datenschutz (DSGVO)
- IP-Anonymisierung (letztes Oktett entfernt)
- IBAN-Maskierung in Logs
- Audit-Trail für alle Datenänderungen
- Löschfristen gemäß Datenkategorie

## Tech-Stack

| Komponente | Technologie | Version |
|------------|-------------|---------|
| Framework | Next.js | 14.2.0 |
| Sprache | TypeScript | 5.3.x |
| Styling | Tailwind CSS | 3.4.x |
| Animation | Framer Motion | 11.x |
| ORM | Prisma | 5.10.x |
| Auth | NextAuth.js | 4.24.x |
| Validation | Zod | 3.22.x |
| Forms | React Hook Form | 7.50.x |
| Testing | Jest | 29.7.x |
| Deployment | Vercel | - |

## Performance

### Optimierungen
- Server Components (React 18)
- Image Optimization (Next.js)
- Code Splitting
- Edge Runtime für Middleware

### Monitoring
- Vercel Analytics
- Custom Error Tracking
- Payment Webhook Monitoring
