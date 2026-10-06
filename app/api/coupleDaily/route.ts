/**
 * app/api/coupleDaily/route.ts
 * ------------------------------------------------------------------
 * "Today, the two of you" for a linked couple (lib/pairs.ts). Open to both sides while either
 * of them subscribes: the server checks both stored RevenueCat ids for qa_premium and fails
 * closed — a RevenueCat outage or a missing key refuses unless one side is confirmed active.
 * Today's flow is the same one-day engine as /api/dailyFortune, run once for each person.
 *
 * POST { code, token }
 * 200  { date, partnerName, self: { relation, pillarIndex }, partner: { relation } }
 * 404 not_found (no link, wrong token, or the partner unlinked) · 409 not_joined { codeExpiresAt }
 * 403 not_subscribed { partnerName } · 400 bad_request · 503 unavailable · 500 failed
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { checkEntitlement, type EntitlementCheck } from "@/lib/revenuecat";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getDailyFortune } from "@/lib/dailyFortune";
import { isPairToken, normalizePairCode, sideOf, type PairRow } from "@/lib/pairs";

// Same id as mobile/lib/purchases.ts QA_PRO_ENTITLEMENT_ID — the one subscription.
const SUBSCRIPTION_ENTITLEMENT_ID = "qa_premium";

function fail(status: number, code: string, error: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ error, code, ...extra }, { status });
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "couple-daily", 60, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: { code?: unknown; token?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail(400, "bad_request", "잘못된 요청 형식입니다.");
  }
  const code = normalizePairCode(body?.code);
  if (!code || !isPairToken(body?.token)) return fail(400, "bad_request", "잘못된 요청입니다.");

  let row: PairRow | null;
  try {
    const { data, error } = await getSupabaseAdmin().from("pairs").select("*").eq("code", code).maybeSingle();
    if (error) throw error;
    row = data as PairRow | null;
  } catch (err) {
    console.error("[api/coupleDaily] lookup failed", err);
    return fail(503, "unavailable", "지금은 확인할 수 없어요.");
  }
  const side = row ? sideOf(row, body.token as string) : null;
  if (!row || !side) return fail(404, "not_found", "연결을 찾을 수 없어요.");
  if (!row.joined_at || !row.b_day_master) {
    if (Date.parse(row.code_expires_at) <= Date.now()) return fail(404, "not_found", "코드가 만료됐어요.");
    return fail(409, "not_joined", "상대가 아직 연결하지 않았어요.", { codeExpiresAt: row.code_expires_at });
  }

  const self = side === "a"
    ? { dayMaster: row.a_day_master, dayBranch: row.a_day_branch }
    : { dayMaster: row.b_day_master, dayBranch: row.b_day_branch };
  const partner = side === "a"
    ? { name: row.b_name ?? "", dayMaster: row.b_day_master, dayBranch: row.b_day_branch }
    : { name: row.a_name, dayMaster: row.a_day_master, dayBranch: row.a_day_branch };

  const ids = [row.a_app_user_id, row.b_app_user_id].filter((id): id is string => !!id);
  const checks: EntitlementCheck[] = await Promise.all(ids.map((id) => checkEntitlement(id, SUBSCRIPTION_ENTITLEMENT_ID)));
  if (!checks.includes("active")) {
    if (checks.length && checks.every((c) => c === "inactive")) {
      return fail(403, "not_subscribed", "구독 전용 기능입니다.", { partnerName: partner.name });
    }
    // No ids at all (e.g. both linked from the web preview) can't be confirmed either way.
    if (!checks.length) return fail(403, "not_subscribed", "구독 전용 기능입니다.", { partnerName: partner.name });
    return fail(503, "unavailable", "지금은 확인할 수 없어요.");
  }

  try {
    const [mine, theirs] = await Promise.all([
      getDailyFortune(self.dayMaster, self.dayBranch),
      getDailyFortune(partner.dayMaster as string, partner.dayBranch),
    ]);
    if (!mine.compatibility || !theirs.compatibility) throw new Error("no relation");
    return NextResponse.json({
      date: mine.date,
      partnerName: partner.name,
      self: { relation: mine.compatibility.relation, pillarIndex: mine.dayMaster.pillarIndex },
      partner: { relation: theirs.compatibility.relation },
    });
  } catch (err) {
    console.error("[api/coupleDaily] failed", err);
    return fail(500, "failed", "계산 중 오류가 발생했습니다.");
  }
}
