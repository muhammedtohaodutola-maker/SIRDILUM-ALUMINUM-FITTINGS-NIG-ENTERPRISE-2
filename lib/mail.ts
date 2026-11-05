import { resend } from './resend';
import { serverEnv } from '@/env/server';

const BRAND_GOLD = '#D4AF37';
const BRAND_GREEN = '#15803D';
const BRAND_NAVY = '#0B132B';

function getAdminRecipients(): string[] {
  const raw = serverEnv.resend.adminEmail || 'sirdilumaluminumfittingsnigent@gmail.com,odutolaekundayoidris@gmail.com';
  return raw.split(',').map((e) => e.trim()).filter(Boolean);
}

/**
 * Send branded BOQ Quote confirmation to client & notification to workshop
 */
export async function sendQuoteEmails({
  clientName,
  clientEmail,
  clientPhone,
  projectLocation,
  productType,
  profileGauge,
  finishGlazing,
  quantity,
  estimatedCost,
}: {
  clientName: string;
  clientEmail?: string | null;
  clientPhone: string;
  projectLocation: string;
  productType: string;
  profileGauge: string;
  finishGlazing?: string;
  quantity: number;
  estimatedCost: number;
}) {
  if (!serverEnv.resend.isConfigured) {
    console.warn('Resend API key not configured. Email delivery skipped in simulation mode.');
    return { success: false, simulated: true };
  }

  const formattedCost = `₦${Number(estimatedCost).toLocaleString()}`;
  const adminRecipients = getAdminRecipients();
  const formattedAdminEmails = adminRecipients.join(' / ');

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0F172A; color: #F8FAFC; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1E293B; border-radius: 12px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.3); }
          .header { background: linear-gradient(135deg, ${BRAND_NAVY} 0%, #162447 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid ${BRAND_GOLD}; }
          .badge { display: inline-block; background-color: ${BRAND_GREEN}; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
          .title { font-size: 22px; font-weight: 800; color: #FFFFFF; margin: 0 0 6px 0; }
          .motto { font-size: 13px; color: ${BRAND_GOLD}; font-style: italic; margin: 0; }
          .body { padding: 32px 24px; }
          .intro { font-size: 15px; color: #E2E8F0; line-height: 1.6; margin-bottom: 24px; }
          .quote-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; background: rgba(15, 23, 42, 0.6); border-radius: 8px; overflow: hidden; }
          .quote-table th, .quote-table td { padding: 12px 16px; text-align: left; font-size: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
          .quote-table th { color: #94A3B8; font-weight: 600; width: 40%; }
          .quote-table td { color: #FFFFFF; font-weight: 700; }
          .total-box { background: linear-gradient(135deg, rgba(21, 128, 61, 0.2) 0%, rgba(212, 175, 55, 0.15) 100%); border: 1px solid ${BRAND_GOLD}; border-radius: 8px; padding: 18px; text-align: center; margin-bottom: 24px; }
          .total-label { font-size: 12px; text-transform: uppercase; color: #86EFAC; letter-spacing: 1px; font-weight: 700; }
          .total-amount { font-size: 28px; font-weight: 800; color: #FFFFFF; margin-top: 4px; }
          .btn { display: inline-block; background-color: ${BRAND_GOLD}; color: #0B132B; padding: 12px 24px; font-weight: 700; text-decoration: none; border-radius: 8px; text-align: center; font-size: 14px; }
          .footer { background-color: #0B132B; padding: 20px 24px; text-align: center; font-size: 12px; color: #94A3B8; border-top: 1px solid rgba(255, 255, 255, 0.08); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">CAC Certified: CRBN 716623</div>
            <h1 class="title">SIRDILUM ALUMINUM FITTINGS</h1>
            <p class="motto">SAFE, STRONG..... high standard, good compromise</p>
          </div>
          <div class="body">
            <p class="intro">
              Hello <strong>${clientName || 'Valued Client'}</strong>,<br>
              Thank you for requesting an estimate from our Ikorodu fabrication workshop. Below is your preliminary Bill of Quantities (BOQ) calculation:
            </p>
            <table class="quote-table">
              <tr><th>Material / Fitting:</th><td>${productType.toUpperCase()}</td></tr>
              <tr><th>Profile Gauge:</th><td>${profileGauge}</td></tr>
              <tr><th>Finish & Glazing:</th><td>${finishGlazing || 'Standard Specification'}</td></tr>
              <tr><th>Quantity / Scope:</th><td>${quantity} Units/Meters</td></tr>
              <tr><th>Site Location:</th><td>${projectLocation}</td></tr>
              <tr><th>Client Phone:</th><td>${clientPhone}</td></tr>
            </table>

            <div class="total-box">
              <div class="total-label">Estimated Gross Total (Baseline)</div>
              <div class="total-amount">${formattedCost}</div>
            </div>

            <p style="font-size: 13px; color: #94A3B8; line-height: 1.5; margin-bottom: 24px;">
              * Note: Exact pricing is finalized following physical opening verification by our master fabricator. Standard fabrication proceeds upon a 70% mobilization deposit with the 30% balance payable upon installation handover.
            </p>

            <div style="text-align: center;">
              <a href="https://wa.me/2348034161983?text=Hello%20SIRDILUM,%20I%20am%20following%20up%20on%20my%20BOQ%20quote%20${encodeURIComponent(formattedCost)}" class="btn">
                Confirm Site Inspection on WhatsApp
              </a>
            </div>
          </div>
          <div class="footer">
            38, Obafemi Awolowo Road, Oke Ota-Ona, Ikorodu, Lagos State, Nigeria<br>
            Hotlines: 08034161983 / 07015429029 &bull; Email: ${formattedAdminEmails}
          </div>
        </div>
      </body>
    </html>
  `;

  // Send admin notification to both enterprise and principal owner
  await resend.emails.send({
    from: serverEnv.resend.fromEmail,
    to: adminRecipients,
    subject: `🔔 New BOQ Quote: ${clientName || clientPhone} [${formattedCost}]`,
    html: emailHtml,
  });

  // If client provided email, send them a confirmation copy too
  if (clientEmail && clientEmail.includes('@')) {
    try {
      await resend.emails.send({
        from: serverEnv.resend.fromEmail,
        to: clientEmail,
        subject: `Your SIRDILUM ALUMINUM BOQ Estimate [${formattedCost}]`,
        html: emailHtml,
      });
    } catch (clientErr) {
      console.warn('Client email delivery deferred:', clientErr);
    }
  }

  return { success: true };
}

/**
 * Send contact inquiry alert to workshop
 */
export async function sendContactEmail({
  name,
  phone,
  email,
  projectType,
  message,
}: {
  name: string;
  phone: string;
  email?: string | null;
  projectType: string;
  message: string;
}) {
  if (!serverEnv.resend.isConfigured) {
    return { success: false, simulated: true };
  }

  const adminRecipients = getAdminRecipients();

  return await resend.emails.send({
    from: serverEnv.resend.fromEmail,
    to: adminRecipients,
    subject: `💬 New Workshop Inquiry: ${name} (${phone}) - ${projectType}`,
    html: `
      <h2>New Website Inquiry - SIRDILUM Fabrication Hub</h2>
      <p><strong>Client Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Project Scope:</strong> ${projectType}</p>
      <p><strong>Message / Requirements:</strong></p>
      <blockquote style="background:#f1f5f9;padding:14px;border-left:4px solid #15803d;border-radius:4px;color:#0f172a;">
        ${message}
      </blockquote>
      <p><em>Corporate Affairs Commission (CAC) Registered: CRBN 716623</em></p>
    `,
  });
}

