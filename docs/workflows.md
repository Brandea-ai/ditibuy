# Workflows – BayernAnkauf

## Offer-Lebenszyklus

### Status-Übersicht

```
┌──────────────────────────────────────────────────────────────────┐
│                        OFFER STATUS FLOW                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ENTWURF ──▶ ANGEBOT_ERSTELLT ──▶ GERAET_EINGESENDET            │
│      │                                    │                      │
│      │                                    ▼                      │
│      │                              IN_PRUEFUNG                  │
│      │                               /       \                   │
│      │                              ▼         ▼                  │
│      │                 ANGEBOT_ANGEPASST    (direkt)             │
│      │                              \         /                  │
│      │                               ▼       ▼                   │
│      └─────▶ STORNIERT ◀── ABGELEHNT ◀── AKZEPTIERT             │
│                                              │                   │
│                                              ▼                   │
│                                   AUSZAHLUNG_INITIIERT           │
│                                              │                   │
│                                              ▼                   │
│                                         AUSGEZAHLT               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Status-Beschreibungen

| Status | Beschreibung | Nächste Schritte |
|--------|--------------|------------------|
| `ENTWURF` | Angebot wurde begonnen, aber nicht abgeschlossen | ANGEBOT_ERSTELLT, STORNIERT |
| `ANGEBOT_ERSTELLT` | Vorläufiges Angebot erstellt | GERAET_EINGESENDET, STORNIERT |
| `GERAET_EINGESENDET` | Gerät wurde versendet | IN_PRUEFUNG |
| `IN_PRUEFUNG` | Gerät wird geprüft | ANGEBOT_ANGEPASST, AKZEPTIERT, ABGELEHNT |
| `ANGEBOT_ANGEPASST` | Preis wurde nach Prüfung angepasst | AKZEPTIERT, ABGELEHNT, STORNIERT |
| `AKZEPTIERT` | Kunde hat Angebot akzeptiert | AUSZAHLUNG_INITIIERT |
| `ABGELEHNT` | Kunde hat abgelehnt (Terminal) | - |
| `AUSZAHLUNG_INITIIERT` | Zahlung gestartet | AUSGEZAHLT |
| `AUSGEZAHLT` | Auszahlung abgeschlossen (Terminal) | - |
| `STORNIERT` | Vorgang storniert (Terminal) | - |

### Workflow-Diagramm: Normaler Ablauf

```
┌─────────────────────────────────────────────────────────────────┐
│                     ERFOLGREICHER VERKAUF                        │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────┐     ┌──────────┐     ┌──────────┐
    │  Kunde   │     │  System  │     │   Team   │
    └────┬─────┘     └────┬─────┘     └────┬─────┘
         │                │                │
         │ Gerät auswählen│                │
         │───────────────>│                │
         │                │                │
         │ Zustand angeben│                │
         │───────────────>│                │
         │                │                │
         │  Angebot erhalten               │
         │<───────────────│                │
         │                │                │
         │ Angebot annehmen                │
         │───────────────>│                │
         │                │ Status: ANGEBOT_ERSTELLT
         │                │                │
         │ Label drucken  │                │
         │<───────────────│                │
         │                │                │
         │ Gerät versenden│                │
         │───────────────>│                │
         │                │ Status: GERAET_EINGESENDET
         │                │                │
         │                │ Gerät erhalten │
         │                │───────────────>│
         │                │                │
         │                │ Status: IN_PRUEFUNG
         │                │                │
         │                │  Prüfung OK    │
         │                │<───────────────│
         │                │                │
         │                │ Status: AKZEPTIERT
         │                │                │
         │ Bankdaten prüfen                │
         │<───────────────│                │
         │                │                │
         │                │ Status: AUSZAHLUNG_INITIIERT
         │                │                │
         │  Geld erhalten │                │
         │<───────────────│                │
         │                │                │
         │                │ Status: AUSGEZAHLT
         ▼                ▼                ▼
```

## Payment-Flow

### Status-Übersicht

```
┌──────────────────────────────────────────────────────────────────┐
│                       PAYMENT STATUS FLOW                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INITIATED ──▶ PENDING ──▶ PROCESSING ──▶ COMPLETED             │
│       │            │             │                               │
│       └────────────┴─────────────┴──────────▶ FAILED            │
│                                                  │               │
│                                                  ▼               │
│                                             (Retry?)             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Payment Provider Interface

```typescript
interface IPaymentProvider {
  name: PaymentProvider
  initiateTransfer(request: PaymentRequest): Promise<PaymentResult>
  checkStatus(providerReference: string): Promise<PaymentStatus>
  cancelTransfer(providerReference: string): Promise<boolean>
}
```

### Implementierte Provider

| Provider | Status | Beschreibung |
|----------|--------|--------------|
| MOCK | ✅ Implementiert | Test-Provider für Entwicklung |
| STRIPE | 🔜 Geplant | Stripe Connect für Auszahlungen |
| MOLLIE | 🔜 Geplant | Alternative für EU-Zahlungen |
| SEPA | 🔜 Geplant | Direkte Banküberweisung |

### Payment-Retry-Logik

```
Fehlgeschlagene Zahlung
        │
        ▼
┌───────────────┐
│ Retry-Count   │
│    < 3?       │
└───────┬───────┘
        │
   ┌────┴────┐
   │         │
  Ja        Nein
   │         │
   ▼         ▼
┌──────┐  ┌────────┐
│Retry │  │ FAILED │
│nach  │  │ Status │
│Delay │  │ setzen │
└──────┘  └────────┘
```

## Webhook-Verarbeitung

### Ablauf

```
External Service                    BayernAnkauf
      │                                  │
      │ POST /api/webhooks/payment       │
      │─────────────────────────────────>│
      │                                  │
      │                        ┌─────────┴─────────┐
      │                        │ 1. Signatur prüfen│
      │                        └─────────┬─────────┘
      │                                  │
      │                        ┌─────────┴─────────┐
      │                        │ 2. Idempotenz     │
      │                        │    prüfen         │
      │                        └─────────┬─────────┘
      │                                  │
      │                        ┌─────────┴─────────┐
      │                        │ 3. Payment        │
      │                        │    aktualisieren  │
      │                        └─────────┬─────────┘
      │                                  │
      │                        ┌─────────┴─────────┐
      │                        │ 4. Offer-Status   │
      │                        │    aktualisieren  │
      │                        └─────────┬─────────┘
      │                                  │
      │                        ┌─────────┴─────────┐
      │                        │ 5. WorkflowLog    │
      │                        │    schreiben      │
      │                        └─────────┬─────────┘
      │                                  │
      │                        ┌─────────┴─────────┐
      │                        │ 6. E-Mail senden  │
      │                        └─────────┬─────────┘
      │                                  │
      │                 200 OK           │
      │<─────────────────────────────────│
      │                                  │
```

### Sicherheitsmaßnahmen

1. **Signaturprüfung**: Jeder Webhook muss signiert sein
2. **Idempotenz**: Gleiche Webhook-ID wird nicht doppelt verarbeitet
3. **Logging**: Alle Webhooks werden protokolliert
4. **Timeout**: Max. 30 Sekunden Verarbeitungszeit

## DSGVO-Prozesse

### Löschfristen

| Daten-Kategorie | Aufbewahrung | Löschung nach |
|-----------------|--------------|---------------|
| User (aktiv) | Unbegrenzt | Auf Anfrage |
| User (inaktiv) | 3 Jahre | Automatisch |
| Offers | 10 Jahre | Steuerrecht |
| BankDetails | Bis Auszahlung | Abschluss + 30 Tage |
| WorkflowLogs | 10 Jahre | Compliance |

### Datenlösch-Prozess

```
┌─────────────────────────────────────────────────────────────────┐
│                   DSGVO LÖSCH-WORKFLOW                           │
└─────────────────────────────────────────────────────────────────┘

1. Cron-Job läuft täglich um 02:00 Uhr

2. Prüft alle Datensätze auf Löschfrist-Überschreitung

3. Für jeden zu löschenden Datensatz:
   a) WorkflowLog-Eintrag erstellen (GDPR_DELETION)
   b) Daten anonymisieren/löschen
   c) Bestätigung loggen

4. Admin-Benachrichtigung bei Fehlern
```

### Auskunftsrecht (Art. 15 DSGVO)

Der Benutzer kann über sein Dashboard alle gespeicherten Daten einsehen:
- Persönliche Daten
- Bankverbindung (maskiert)
- Alle Angebote
- Alle Zahlungen
- Workflow-Historie

### Löschrecht (Art. 17 DSGVO)

Benutzer können Account-Löschung beantragen:
1. Prüfung auf offene Vorgänge
2. Anonymisierung statt Löschung (wenn steuerrechtlich erforderlich)
3. Vollständige Löschung nach Ablauf aller Fristen

## E-Mail-Benachrichtigungen

### Templates

| Event | Betreff | Empfänger |
|-------|---------|-----------|
| Angebot erstellt | "Ihr Angebot {REF} wurde erstellt" | Kunde |
| Gerät erhalten | "Gerät eingegangen - {REF}" | Kunde |
| Preis angepasst | "Angepasstes Angebot für {REF}" | Kunde |
| Auszahlung erfolgt | "Auszahlung erfolgt - {BETRAG} überwiesen" | Kunde |

### Trigger-Points

```
Status-Änderung
       │
       ▼
┌──────────────┐
│ Template     │
│ ermitteln    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Kontext      │
│ aufbauen     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ E-Mail       │
│ senden       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Sende-Log    │
│ schreiben    │
└──────────────┘
```
