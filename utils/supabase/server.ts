import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js';

// Support multiple env var names created by different templates / setups
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and a publishable/service key.'
  );
}

// Accept either an awaited RequestCookies or undefined; cookieStore is optional and ignored
// here (keeps API compatible with server-component usage where `await cookies()` may be passed).
export function createClient(): SupabaseClient {
  return createSupabaseClient(supabaseUrl!, supabaseKey!, {
    auth: {
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
} 

