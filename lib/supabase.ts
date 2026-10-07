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

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Ids already known to have a sessions row in this server instance, so repeat writes from the
// same session (llm usage logs, chat turns) skip the extra round trip. Cleared when it grows.
const knownSessions = new Set<string>();

/**
 * Makes sure a `sessions` row exists before a write that references it. The app makes a new
 * sessionId on every launch and only onboarding's /api/saju creates the row, so without this
 * every quiz/chat/report/usage write after a relaunch failed the sessions FK (2026-10-07).
 * Inserts only the id and never overwrites track/nickname on an existing row.
 * Returns false for a missing or non-uuid id — callers then skip the write or store null.
 * Throws on a database error, like the inserts it guards.
 */
export async function ensureSession(sessionId: string | undefined | null): Promise<boolean> {
  if (!sessionId || !UUID_PATTERN.test(sessionId)) return false;
  if (knownSessions.has(sessionId)) return true;
  const { error } = await getSupabaseAdmin()
    .from("sessions")
    .upsert({ id: sessionId }, { onConflict: "id", ignoreDuplicates: true });
  if (error) throw error;
  if (knownSessions.size >= 5000) knownSessions.clear();
  knownSessions.add(sessionId);
  return true;
}
