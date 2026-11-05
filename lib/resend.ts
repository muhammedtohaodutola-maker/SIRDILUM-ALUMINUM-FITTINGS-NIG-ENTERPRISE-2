import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder';

export const resend = new Resend(resendApiKey);

export const ENTERPRISE_ADMIN_EMAIL = process.env.ENTERPRISE_ADMIN_EMAIL || 'odutolaekundayoidris@gmail.com';
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

