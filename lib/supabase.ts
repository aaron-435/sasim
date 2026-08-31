/**
 * lib/supabase.ts
 * ------------------------------------------------------------------
 * Server-side Supabase client using the service_role key (bypasses RLS).
 * NEVER import this in a client component, and never send this key to
 * the browser — it has full read/write access to every table. All DB
 * access goes through our own Route Handlers, never directly from the
 * client (see supabase/schema.sql — RLS is enabled with no policies,
 * so only service_role can touch these tables at all).
 *
 * getSupabaseAdmin() creates the client lazily, on first use, instead
 * of at module-load time. Persistence is a best-effort side feature —
 * if SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY are missing (e.g. not yet
 * set in a Vercel deployment), callers should catch the throw and
 * degrade gracefully rather than the whole saju/chat route failing to
 * even load.
 * ------------------------------------------------------------------
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다.");
  }
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}
