/* ============================================
   EMAIL NOTIFICATION SERVICE
   Phase 5: Payments & Workflows

   Mock-Implementation für E-Mail Benachrichtigungen
   (Nodemailer/SendGrid Integration in Produktion)
   ============================================ */

import { OfferStatus, STATUS_LABELS } from '@/types'
import { formatEuro } from '@/lib/calculator'

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface SendEmailRequest {
  to: string
  template: EmailTemplate
}

export interface EmailContext {
  userName: string
  userEmail: string
  offerReference: string
  deviceName: string
  offerAmount: number
  status?: OfferStatus
  trackingNumber?: string
  adjustedAmount?: number
}

/**
 * Send email (mock implementation)
 */
export async function sendEmail(request: SendEmailRequest): Promise<boolean> {
  // In production, use Nodemailer/SendGrid/etc.
  console.log('📧 Email sent:', {
    to: request.to,
    subject: request.template.subject,
  })

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return true
}

/**
 * Generate email templates for different events
 */
export const emailTemplates = {
  // Offer Created
  offerCreated: (ctx: EmailContext): EmailTemplate => ({
    subject: `Ihr Angebot ${ctx.offerReference} wurde erstellt`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0066CC, #004499); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; }
          .highlight { background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .price { font-size: 32px; font-weight: bold; color: #0066CC; }
          .button { display: inline-block; background: #FF9500; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .steps { margin: 20px 0; }
          .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
          .step-number { background: #0066CC; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏔️ BayernAnkauf</h1>
            <p>Ihr Angebot wurde erstellt!</p>
          </div>
          <div class="content">
            <p>Hallo ${ctx.userName},</p>
            <p>vielen Dank für Ihr Angebot! Hier sind die Details:</p>

            <div class="highlight">
              <p><strong>Gerät:</strong> ${ctx.deviceName}</p>
              <p><strong>Referenznummer:</strong> ${ctx.offerReference}</p>
              <p><strong>Vorläufiges Angebot:</strong></p>
              <p class="price">${formatEuro(ctx.offerAmount)}</p>
            </div>

            <h3>Nächste Schritte:</h3>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <div>
                  <strong>Versandlabel drucken</strong><br>
                  <span style="color: #666;">Loggen Sie sich ein und drucken Sie Ihr kostenloses DHL-Versandlabel aus.</span>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div>
                  <strong>Gerät sicher verpacken</strong><br>
                  <span style="color: #666;">Verpacken Sie Ihr Gerät in einem stabilen Karton mit ausreichend Polsterung.</span>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div>
                  <strong>Paket abgeben</strong><br>
                  <span style="color: #666;">Geben Sie das Paket bei einer DHL-Filiale oder einem Paketshop ab.</span>
                </div>
              </div>
            </div>

            <p style="text-align: center; margin-top: 30px;">
              <a href="https://bayernankauf.de/dashboard" class="button">Zum Dashboard</a>
            </p>
          </div>
          <div class="footer">
            <p>BayernAnkauf GmbH · Musterstraße 123 · 80331 München</p>
            <p>Sie erhalten diese E-Mail, weil Sie ein Angebot bei BayernAnkauf erstellt haben.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hallo ${ctx.userName},

vielen Dank für Ihr Angebot bei BayernAnkauf!

Gerät: ${ctx.deviceName}
Referenznummer: ${ctx.offerReference}
Vorläufiges Angebot: ${formatEuro(ctx.offerAmount)}

Nächste Schritte:
1. Loggen Sie sich ein und drucken Sie Ihr kostenloses Versandlabel aus
2. Verpacken Sie Ihr Gerät sicher
3. Geben Sie das Paket bei einer DHL-Filiale ab

Dashboard: https://bayernankauf.de/dashboard

Mit freundlichen Grüßen,
Ihr BayernAnkauf Team
    `,
  }),

  // Device Received
  deviceReceived: (ctx: EmailContext): EmailTemplate => ({
    subject: `Gerät eingegangen - ${ctx.offerReference}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0066CC, #004499); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; }
          .status { background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏔️ BayernAnkauf</h1>
            <p>Ihr Gerät ist angekommen!</p>
          </div>
          <div class="content">
            <p>Hallo ${ctx.userName},</p>

            <div class="status">
              <strong>✓ Gerät eingegangen</strong><br>
              Wir haben Ihr ${ctx.deviceName} erhalten und beginnen mit der Prüfung.
            </div>

            <p><strong>Referenznummer:</strong> ${ctx.offerReference}</p>

            <p>Unser Team wird Ihr Gerät in den nächsten 1-2 Werktagen prüfen. Sie erhalten eine E-Mail, sobald die Prüfung abgeschlossen ist.</p>
          </div>
          <div class="footer">
            <p>BayernAnkauf GmbH · Musterstraße 123 · 80331 München</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hallo ${ctx.userName},

gute Nachrichten! Wir haben Ihr ${ctx.deviceName} erhalten.

Referenznummer: ${ctx.offerReference}

Unser Team wird Ihr Gerät in den nächsten 1-2 Werktagen prüfen.
Sie erhalten eine E-Mail, sobald die Prüfung abgeschlossen ist.

Mit freundlichen Grüßen,
Ihr BayernAnkauf Team
    `,
  }),

  // Payment Completed
  paymentCompleted: (ctx: EmailContext): EmailTemplate => ({
    subject: `Auszahlung erfolgt - ${formatEuro(ctx.offerAmount)} überwiesen`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4caf50, #2e7d32); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; }
          .success { background: #e8f5e9; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .amount { font-size: 40px; font-weight: bold; color: #2e7d32; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 Auszahlung erfolgt!</h1>
          </div>
          <div class="content">
            <p>Hallo ${ctx.userName},</p>
            <p>großartig! Die Auszahlung für Ihr ${ctx.deviceName} wurde erfolgreich durchgeführt.</p>

            <div class="success">
              <p style="margin: 0;">Überwiesen:</p>
              <p class="amount">${formatEuro(ctx.offerAmount)}</p>
              <p style="margin: 0; color: #666;">auf Ihr hinterlegtes Bankkonto</p>
            </div>

            <p><strong>Referenznummer:</strong> ${ctx.offerReference}</p>

            <p>Der Betrag sollte innerhalb von 1-2 Werktagen auf Ihrem Konto erscheinen.</p>

            <p>Vielen Dank, dass Sie sich für BayernAnkauf entschieden haben! Wir würden uns freuen, Sie bald wieder als Kunden begrüßen zu dürfen.</p>
          </div>
          <div class="footer">
            <p>BayernAnkauf GmbH · Musterstraße 123 · 80331 München</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hallo ${ctx.userName},

großartig! Die Auszahlung für Ihr ${ctx.deviceName} wurde erfolgreich durchgeführt.

Überwiesen: ${formatEuro(ctx.offerAmount)}

Referenznummer: ${ctx.offerReference}

Der Betrag sollte innerhalb von 1-2 Werktagen auf Ihrem Konto erscheinen.

Vielen Dank für Ihr Vertrauen!

Mit freundlichen Grüßen,
Ihr BayernAnkauf Team
    `,
  }),

  // Offer Adjusted
  offerAdjusted: (ctx: EmailContext): EmailTemplate => ({
    subject: `Angepasstes Angebot für ${ctx.offerReference}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF9500, #e68a00); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; }
          .notice { background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF9500; }
          .prices { display: flex; justify-content: space-around; margin: 20px 0; }
          .price-box { text-align: center; padding: 15px; }
          .old-price { font-size: 20px; color: #999; text-decoration: line-through; }
          .new-price { font-size: 28px; font-weight: bold; color: #FF9500; }
          .button { display: inline-block; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px; }
          .button-accept { background: #4caf50; color: white; }
          .button-reject { background: #f5f5f5; color: #666; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏔️ BayernAnkauf</h1>
            <p>Angepasstes Angebot</p>
          </div>
          <div class="content">
            <p>Hallo ${ctx.userName},</p>

            <div class="notice">
              <strong>⚠️ Angebot angepasst</strong><br>
              Nach Prüfung Ihres ${ctx.deviceName} mussten wir das Angebot anpassen.
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <div class="old-price">Ursprünglich: ${formatEuro(ctx.offerAmount)}</div>
              <div class="new-price">Neues Angebot: ${formatEuro(ctx.adjustedAmount || 0)}</div>
            </div>

            <p><strong>Referenznummer:</strong> ${ctx.offerReference}</p>

            <p>Bitte entscheiden Sie, ob Sie das angepasste Angebot annehmen möchten. Bei Ablehnung senden wir Ihnen Ihr Gerät kostenlos zurück.</p>

            <p style="text-align: center; margin-top: 30px;">
              <a href="https://bayernankauf.de/dashboard" class="button button-accept">Annehmen</a>
              <a href="https://bayernankauf.de/dashboard" class="button button-reject">Ablehnen</a>
            </p>
          </div>
          <div class="footer">
            <p>BayernAnkauf GmbH · Musterstraße 123 · 80331 München</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hallo ${ctx.userName},

nach Prüfung Ihres ${ctx.deviceName} mussten wir das Angebot anpassen.

Ursprüngliches Angebot: ${formatEuro(ctx.offerAmount)}
Neues Angebot: ${formatEuro(ctx.adjustedAmount || 0)}

Referenznummer: ${ctx.offerReference}

Bitte entscheiden Sie im Dashboard, ob Sie das angepasste Angebot annehmen möchten.
Bei Ablehnung senden wir Ihnen Ihr Gerät kostenlos zurück.

Dashboard: https://bayernankauf.de/dashboard

Mit freundlichen Grüßen,
Ihr BayernAnkauf Team
    `,
  }),
}

/**
 * Send notification for status change
 */
export async function sendStatusNotification(
  email: string,
  status: OfferStatus,
  context: EmailContext
): Promise<boolean> {
  const templateMap: Partial<Record<OfferStatus, (ctx: EmailContext) => EmailTemplate>> = {
    ANGEBOT_ERSTELLT: emailTemplates.offerCreated,
    GERAET_EINGESENDET: emailTemplates.deviceReceived,
    ANGEBOT_ANGEPASST: emailTemplates.offerAdjusted,
    AUSGEZAHLT: emailTemplates.paymentCompleted,
  }

  const templateFn = templateMap[status]
  if (!templateFn) {
    console.log(`No email template for status: ${status}`)
    return false
  }

  const template = templateFn(context)
  return sendEmail({ to: email, template })
}
