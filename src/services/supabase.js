// Single Supabase client for the whole app. Uses only the public (anon / publishable)
// key, so every request is subject to Row Level Security. Never put a service-role key here.
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
// Supabase's newer "publishable" key is a drop-in replacement for the anon key.
const publicKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && publicKey ? createClient(url, publicKey) : null;

if (!supabase && import.meta.env.DEV) {
  console.warn('[supabase] Not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, then restart `npm run dev`.');
}
