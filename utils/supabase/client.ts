import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Browser-side Supabase client helper (used by client components)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
  )
}

export function createClient() {
  return createSupabaseClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
}
