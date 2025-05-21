// lib/supabase-server.ts
import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

// This function is now synchronous as it directly uses supabase-js
// without async cookie operations from @supabase/ssr.
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set in environment variables.");
  }
  if (!supabaseAnonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in environment variables.");
  }

  return supabaseCreateClient(supabaseUrl, supabaseAnonKey);
}