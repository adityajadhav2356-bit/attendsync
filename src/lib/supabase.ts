import { createClient } from '@supabase/supabase-js';

// We fetch the environment variables configured from Vercel / Local .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single Supabase wrapper for interacting with your Database & Storage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
