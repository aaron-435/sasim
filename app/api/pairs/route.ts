/**
 * app/api/pairs/route.ts
 * ------------------------------------------------------------------
 * Couple mode links (lib/pairs.ts has what is stored and why).
 *
 * POST { op: "create", name, dayMaster, dayBranch?, appUserId? }
 *   → { code, token, codeExpiresAt }   the token is returned once; only its hash is stored
 * POST { op: "join", code, name, dayMaster, dayBranch?, appUserId? }
 *   → { code, token, partnerName }
 *   errors: 404 not_found (no such code, or it expired) · 409 already_joined · 400 self (own code)
 * POST { op: "unlink", code, token }
 *   → { ok: true }   either side; deletes the row. 404 not_found when it's already gone.
 * 400 bad_request · 429 · 503 unavailable
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hashToken, isPairToken, newPairCode, newPairToken, normalizePairCode, PAIR_CODE_TTL_MS, parseSide, sideOf, type PairRow } from "@/lib/pairs";

function fail(status: number, code: string, error: string) {
  return NextResponse.json({ error, code }, { status });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "bad_request", "잘못된 요청 형식입니다.");
  }
  const op = body?.op;

  if (op === "create") {
    const limited = rateLimitOrResponse(req, "pairs-create", 10, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
    if (limited) return limited;
    const side = parseSide(body);
    if (!side) return fail(400, "bad_request", "필수 입력값이 빠졌습니다.");

    const now = Date.now();
    const token = newPairToken();
    const codeExpiresAt = new Date(now + PAIR_CODE_TTL_MS).toISOString();
    try {
      const supabase = getSupabaseAdmin();
      // Codes nobody used go when the next one is made — no separate cleanup job.
      await supabase.from("pairs").delete().is("joined_at", null).lt("code_expires_at", new Date(now).toISOString());
      for (let attempt = 0; attempt < 3; attempt++) {
        const code = newPairCode();
        const { error } = await supabase.from("pairs").insert({
          code,
          a_token_hash: hashToken(token),
          a_name: side.name,
          a_day_master: side.dayMaster,
          a_day_branch: side.dayBranch,
          a_app_user_id: side.appUserId,
          code_expires_at: codeExpiresAt,
        });
        if (!error) return NextResponse.json({ code, token, codeExpiresAt });
        if (error.code !== "23505") throw error;
      }
      throw new Error("code collision");
    } catch (err) {
      console.error("[api/pairs] create failed", err);
      return fail(503, "unavailable", "지금은 코드를 만들 수 없어요.");
    }
  }

  if (op === "join") {
    // Tight: this is the one door where a guessed code could matter.
    const limited = rateLimitOrResponse(req, "pairs-join", 10, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
    if (limited) return limited;
    const code = normalizePairCode(body.code);
    const side = parseSide(body);
    if (!code || !side) return fail(400, "bad_request", "필수 입력값이 빠졌습니다.");

    try {
      const supabase = getSupabaseAdmin();
      const { data: row, error } = await supabase.from("pairs").select("*").eq("code", code).maybeSingle();
      if (error) throw error;
      const pair = row as PairRow | null;
      if (!pair || (!pair.joined_at && Date.parse(pair.code_expires_at) <= Date.now())) return fail(404, "not_found", "코드를 찾을 수 없어요.");
      if (pair.joined_at) return fail(409, "already_joined", "이미 연결된 코드예요.");
      if (side.appUserId && side.appUserId === pair.a_app_user_id) return fail(400, "self", "내가 만든 코드예요.");

      const token = newPairToken();
      // Only a still-open code takes the partner — two phones racing get one winner.
      const { data: updated, error: updateError } = await supabase
        .from("pairs")
        .update({
          b_token_hash: hashToken(token),
          b_name: side.name,
          b_day_master: side.dayMaster,
          b_day_branch: side.dayBranch,
          b_app_user_id: side.appUserId,
          joined_at: new Date().toISOString(),
        })
        .eq("code", code)
        .is("joined_at", null)
        .select("code");
      if (updateError) throw updateError;
      if (!updated || updated.length === 0) return fail(409, "already_joined", "이미 연결된 코드예요.");
      return NextResponse.json({ code, token, partnerName: pair.a_name });
    } catch (err) {
      console.error("[api/pairs] join failed", err);
      return fail(503, "unavailable", "지금은 연결할 수 없어요.");
    }
  }

  if (op === "unlink") {
    const limited = rateLimitOrResponse(req, "pairs-unlink", 20, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
    if (limited) return limited;
    const code = normalizePairCode(body.code);
    if (!code || !isPairToken(body.token)) return fail(400, "bad_request", "잘못된 요청입니다.");
    try {
      const supabase = getSupabaseAdmin();
      const { data: row, error } = await supabase.from("pairs").select("*").eq("code", code).maybeSingle();
      if (error) throw error;
      if (!row || !sideOf(row as PairRow, body.token)) return fail(404, "not_found", "연결을 찾을 수 없어요.");
      const { error: deleteError } = await supabase.from("pairs").delete().eq("code", code);
      if (deleteError) throw deleteError;
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[api/pairs] unlink failed", err);
      return fail(503, "unavailable", "지금은 해제할 수 없어요.");
    }
  }

  return fail(400, "bad_request", "잘못된 요청입니다.");
}
