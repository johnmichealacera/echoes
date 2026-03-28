import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.REACT_APP_SUPABASE_URL;
  const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY. Add them to .env.local (see .env.example).'
    );
  }

  client = createClient(url, anonKey);
  return client;
}
