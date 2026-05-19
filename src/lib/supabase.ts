import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser client — uses @supabase/ssr's createBrowserClient so the session
 * is stored in COOKIES (not localStorage). This makes it readable by the
 * Next.js middleware and server components.
 *
 * Call this inside client components / event handlers only.
 */
export function getBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

/**
 * Lightweight proxy for non-auth data reads (supabase.from(...)).
 * Uses the plain createClient — fine for public data fetches where
 * cookie-based sessions are not needed.
 */
let _publicClient: SupabaseClient | null = null;
function getPublicClient(): SupabaseClient {
  if (!_publicClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error('Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)');
    _publicClient = createClient(url, key);
  }
  return _publicClient;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getPublicClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Server-side client — uses service role key, bypasses RLS
// Only import/use in API routes (server-side only)
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false } }
  );
}

export type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  times: string[];
  location: string | null;
  age_min: number;
  age_max: number;
  available_seats: number;
  price: number;
  is_free: boolean;
  booking_enabled: boolean;
  active: boolean;
  show_in_calendar: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  event_id: string | null;
  event_title: string | null;
  selected_time: string | null;
  parent_name: string;
  email: string;
  phone: string;
  number_kids: number;
  number_adults: number;
  kid_names: string | null;
  notes: string | null;
  payment_method: string;
  needs_receipt: boolean;
  codice_fiscale: string | null;
  cognome: string | null;
  nome: string | null;
  luogo_nascita: string | null;
  data_nascita: string | null;
  indirizzo_residenza: string | null;
  cap: string | null;
  citta: string | null;
  how_did_you_hear: string | null;
  status: string;
  is_waitlist: boolean;
  created_at: string;
};
