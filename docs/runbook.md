# Operations Runbook – BayernAnkauf

## Deployment

### Vercel Deployment

Die Anwendung wird automatisch über Vercel deployed:

1. **Production**: Push auf `main` Branch
2. **Preview**: Push auf Feature Branches

#### Manuelles Deployment

```bash
# Vercel CLI installieren
npm i -g vercel

# Deployment starten
vercel --prod
```

### Environment Variables

Folgende Umgebungsvariablen müssen in Vercel konfiguriert sein:

| Variable | Beschreibung | Erforderlich |
|----------|--------------|--------------|
| `DATABASE_URL` | PostgreSQL Connection String | ✅ |
| `NEXTAUTH_SECRET` | Auth Secret (32+ Zeichen) | ✅ |
| `NEXTAUTH_URL` | Production URL | ✅ |
| `PAYMENT_PROVIDER` | Payment Provider (MOCK/STRIPE) | ✅ |
| `STRIPE_SECRET_KEY` | Stripe API Key | Bei STRIPE |
| `STRIPE_WEBHOOK_SECRET` | Webhook Signature Secret | Bei STRIPE |

### Database Migrations

```bash
# Migration erstellen
npx prisma migrate dev --name <migration_name>

# Migration anwenden (Production)
npx prisma migrate deploy

# Datenbank zurücksetzen (NUR Development!)
npx prisma migrate reset
```

## Monitoring

### Health Checks

| Endpoint | Beschreibung | Erwartete Response |
|----------|--------------|-------------------|
| `/` | Homepage | 200 OK |
| `/api/devices` | API Health | 200 OK mit JSON |

### Vercel Analytics

- Dashboard: https://vercel.com/[team]/[project]/analytics
- Metriken: Core Web Vitals, Errors, Traffic

### Log-Zugriff

```bash
# Vercel Logs (Real-time)
vercel logs --follow

# Vercel Logs (Letzte Stunde)
vercel logs --since 1h
```

## Incident Response

### Severity Levels

| Level | Beschreibung | Response Time |
|-------|--------------|---------------|
| P1 | System down, keine Auszahlungen | Sofort |
| P2 | Feature defekt, Workaround möglich | < 4 Stunden |
| P3 | Minor Bug, keine Business Impact | < 24 Stunden |
| P4 | Improvement Request | Sprint Planning |

### Eskalationspfade

```
P1 Incident
    │
    ▼
┌───────────────┐
│ On-Call Dev   │
│ (15 Min)      │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Tech Lead     │
│ (30 Min)      │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Management    │
│ (60 Min)      │
└───────────────┘
```

### Häufige Probleme

#### 1. Database Connection Timeout

**Symptom**: API Requests schlagen mit 500 fehl

**Diagnose**:
```bash
# Vercel Logs prüfen
vercel logs --since 30m | grep -i "prisma\|database\|timeout"
```

**Lösung**:
1. Database Provider Status prüfen
2. Connection Pool Settings anpassen
3. Bei Bedarf Vercel Deployment neu starten

#### 2. Payment Webhook Failures

**Symptom**: Zahlungen werden nicht aktualisiert

**Diagnose**:
```bash
# Webhook-Logs im Payment Provider Dashboard prüfen
# WorkflowLogs in der Datenbank prüfen
```

**Lösung**:
1. Webhook Endpoint erreichbar?
2. Signatur korrekt?
3. Manuelles Retry im Provider Dashboard

#### 3. Rate Limit erreicht

**Symptom**: 429 Responses

**Diagnose**:
```bash
# Vercel Logs nach 429 filtern
vercel logs | grep "429"
```

**Lösung**:
1. IP des Angreifers identifizieren
2. Bei legitimer Last: Rate Limits anpassen
3. Bei Angriff: IP blocken (Vercel Firewall)

## Manuelle Eingriffe

### Offer-Status manuell ändern

**Wann**: Wenn automatische Statusübergänge fehlschlagen

```sql
-- Offer-Status aktualisieren
UPDATE "Offer"
SET status = 'AKZEPTIERT', "updatedAt" = NOW()
WHERE id = '<offer_id>';

-- WorkflowLog erstellen
INSERT INTO "WorkflowLog" (id, "entityType", "entityId", action, "triggeredBy", "createdAt")
VALUES (gen_random_uuid(), 'OFFER', '<offer_id>', 'MANUAL_STATUS_CHANGE', 'ADMIN', NOW());
```

### Payment manuell abschließen

**Wann**: Wenn Webhook nicht ankommt, aber Zahlung erfolgreich

```sql
-- Payment Status aktualisieren
UPDATE "Payment"
SET status = 'COMPLETED', "updatedAt" = NOW()
WHERE id = '<payment_id>';

-- Offer Status aktualisieren
UPDATE "Offer"
SET status = 'AUSGEZAHLT', "updatedAt" = NOW()
WHERE id = '<offer_id>';
```

### Benutzer-Daten exportieren (DSGVO)

```sql
-- Alle Daten eines Benutzers exportieren
SELECT * FROM "User" WHERE id = '<user_id>';
SELECT * FROM "BankDetails" WHERE "userId" = '<user_id>';
SELECT * FROM "Offer" WHERE "userId" = '<user_id>';
SELECT * FROM "Payment" p
  JOIN "Offer" o ON p."offerId" = o.id
  WHERE o."userId" = '<user_id>';
```

## Backup & Recovery

### Datenbank Backup

Vercel Postgres bietet automatische Backups:
- Point-in-time Recovery: Letzte 7 Tage
- Daily Snapshots: Letzte 30 Tage

### Manuelles Backup

```bash
# pg_dump für vollständiges Backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Wiederherstellung
psql $DATABASE_URL < backup_20250101.sql
```

### Disaster Recovery

1. **Datenbank-Ausfall**:
   - Vercel Support kontaktieren
   - Backup aus letztem Snapshot wiederherstellen

2. **Deployment-Rollback**:
   ```bash
   # Letzte Deployments anzeigen
   vercel ls

   # Zu spezifischem Deployment rollback
   vercel alias <deployment_url> <production_url>
   ```

## Security Procedures

### Verdächtige Aktivität

Bei Verdacht auf Sicherheitsvorfall:

1. **Sofort**: Betroffene API-Endpoints deaktivieren
2. **Analyse**: Logs auf ungewöhnliche Muster prüfen
3. **Maßnahmen**:
   - Passwörter zurücksetzen (bei Account-Kompromittierung)
   - API Keys rotieren (bei Leak)
   - Sessions invalidieren

### Security Key Rotation

```bash
# Neuen NEXTAUTH_SECRET generieren
openssl rand -base64 32

# In Vercel Environment Variables aktualisieren
# Deployment triggern
```

### IP Blocking

Über Vercel Firewall:
1. Project Settings → Security
2. IP Blocking Rules hinzufügen
3. Pattern: einzelne IP oder CIDR Range

## Wartungsfenster

### Geplante Wartung

1. **Ankündigung**: 48h vorher per E-Mail
2. **Maintenance Page**: In Vercel aktivieren
3. **Durchführung**: Nach Business Hours (22:00-06:00)
4. **Bestätigung**: Smoke Tests nach Wartung

### Wartungs-Checkliste

```markdown
- [ ] Backup erstellt
- [ ] Maintenance Mode aktiviert
- [ ] Migration/Änderungen durchgeführt
- [ ] Smoke Tests bestanden
- [ ] Maintenance Mode deaktiviert
- [ ] Monitoring geprüft
- [ ] Team informiert
```

## Kontakte

| Rolle | Kontakt | Erreichbarkeit |
|-------|---------|----------------|
| Vercel Support | support@vercel.com | 24/7 |
| DB Provider | [Provider Support] | Business Hours |
| Payment Provider | [Provider Support] | 24/7 |
