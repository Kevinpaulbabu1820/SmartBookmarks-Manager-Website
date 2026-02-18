import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables for middleware.');
}

// Minimal middleware helper — returns a Supabase client (uses the configured key)
// and a NextResponse so middleware can set cookies / return the response if needed.
export const createClient = () => {
  const response = NextResponse.next();
  const supabase = createSupabaseClient(supabaseUrl!, supabaseKey!);
  return { supabase, response } as const;
};

