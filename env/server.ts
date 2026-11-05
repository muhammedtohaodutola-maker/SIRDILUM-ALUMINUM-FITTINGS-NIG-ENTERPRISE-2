import { clientEnv } from './client';

export const serverEnv = {
  ...clientEnv,
  clerk: {
    ...clientEnv.clerk,
    secretKey: process.env.CLERK_SECRET_KEY || '',
    webhookSecret: process.env.CLERK_WEBHOOK_SECRET || '',
    isServerConfigured: Boolean(
      process.env.CLERK_SECRET_KEY &&
      !process.env.CLERK_SECRET_KEY.includes('sk_test_...')
    ),
  },
  supabase: {
    ...clientEnv.supabase,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    isServerConfigured: Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('eyJ...')
    ),
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    adminEmail: process.env.ENTERPRISE_ADMIN_EMAIL || 'sirdilumaluminumfittingsnigent@gmail.com,odutolaekundayoidris@gmail.com',
    isConfigured: Boolean(
      process.env.RESEND_API_KEY &&
      process.env.RESEND_API_KEY.startsWith('re_') &&
      !process.env.RESEND_API_KEY.includes('re_12345')
    ),
  },
};

