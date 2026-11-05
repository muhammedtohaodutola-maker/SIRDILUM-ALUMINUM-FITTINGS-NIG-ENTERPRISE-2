import { clientEnv } from './client';
import { serverEnv } from './server';

export { clientEnv, serverEnv };

/**
 * Diagnostic utility to check which external integrations are active.
 */
export function getIntegrationStatus() {
  return {
    clerk: {
      client: clientEnv.clerk.isConfigured,
      server: serverEnv.clerk.isServerConfigured,
    },
    supabase: {
      client: clientEnv.supabase.isConfigured,
      server: serverEnv.supabase.isServerConfigured,
    },
    resend: {
      configured: serverEnv.resend.isConfigured,
      adminEmail: serverEnv.resend.adminEmail,
    },
  };
}
