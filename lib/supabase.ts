import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Standard client for public/client-side access (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Administrative client for server-side operations (bypasses RLS for backend tasks)
export const getServiceSupabase = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is not defined. Falling back to anon client.');
    return supabase;
  }
  return createClient(supabaseUrl, serviceKey);
};
