/**
 * app/api/events/route.ts
 * ------------------------------------------------------------------
 * Our own product-event log (no third-party analytics SDK). The app
 * (mobile/lib/analytics.ts) and the web site (lib/analytics.ts) send
 * small batches here; rows go to the Supabase `events` table.
 *
 * Request body:
 *   { anonId, platform: "ios"|"android"|"app-web"|"site", locale?, dev?,
 *     events: [{ name, props?, ts? }] }   (1–20 events)
 * Response:
 *   200 { ok: true, stored: n }  — accepted (stored: 0 if the DB write failed;
 *                                  clients never retry, so that's only logged)
 *   400 { ok: false, error }     — unknown event name or prop key, a value that
 *                                  isn't a short id, malformed batch
 *   429                          — rate limited
 *
 * What may be recorded is defined in lib/eventSchema.ts.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { parseEventBatch } from "@/lib/eventSchema";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabase";

const MAX_BODY_BYTES = 8 * 1024;

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "events", 60, 60_000, "Too many events");
  if (limited) return limited;

  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) return NextResponse.json({ ok: false, error: "too_large" }, { status: 400 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  const batch = parseEventBatch(body);
  if (typeof batch === "string") {
    return NextResponse.json({ ok: false, error: batch }, { status: 400 });
  }

  try {
    const { error } = await getSupabaseAdmin()
      .from("events")
      .insert(
        batch.events.map((e) => ({
          anon_id: batch.anonId,
          platform: batch.platform,
          locale: batch.locale,
          dev: batch.dev,
          name: e.name,
          props: e.props,
          client_ts: e.clientTs,
        }))
      );
    if (error) throw error;
    return NextResponse.json({ ok: true, stored: batch.events.length });
  } catch (err) {
    console.error("[api/events] insert failed (non-fatal)", err);
    return NextResponse.json({ ok: true, stored: 0 });
  }
}
