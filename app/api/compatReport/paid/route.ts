/**
 * app/api/compatReport/paid/route.ts
 * ------------------------------------------------------------------
 * The paid rest of the compatibility report. `compat_report` is a consumable (one purchase per
 * other person), so there is no entitlement to check — instead:
 *
 *   1. RevenueCat must list `transactionId` as this user's purchase of the compat product
 *      (lib/revenuecat.ts checkConsumablePurchase). Not found → 402; RevenueCat unreachable or
 *      no secret → 503 (fail closed).
 *   2. The transaction is bound to one pair on first use (Supabase compat_report_purchases,
 *      keyed by an HMAC of the other person's birth data — never the raw data). The same pair
 *      may regenerate a few times (lost device copy, failed generation); another pair → 409.
 *      Database unavailable → 503 (fail closed: without the record a purchase could be reused).
 *
 * Request:  POST { appUserId, transactionId, freePart?, ...the /api/compatReport body }
 * Response: CompatPaidPart | { error, code }
 *   code: "bad_request" | "no_user" | "not_purchased" | "used_for_other" | "regen_limit" | "unavailable" | ...
 * ------------------------------------------------------------------
 */

import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { checkConsumablePurchase } from "@/lib/revenuecat";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  buildCompatReportContext,
  getCompatPaidPart,
  otherIdentity,
  sanitizeFreePart,
  validOther,
  type CompatReportRequest,
} from "@/lib/compatReport";
import { compatErrorResponse } from "@/lib/compatReportRoute";

/** Store product ids of the compatibility report: App Store, then Play (IAP_PRODUCTS.md). */
const COMPAT_PRODUCT_IDS = ["com.fatesaid.app.report.compat", "compat_report"] as const;
const MAX_GENERATIONS = 5;

interface Body extends CompatReportRequest {
  appUserId?: string;
  transactionId?: string;
  freePart?: unknown;
}

type Claim = "ok" | "used_for_other" | "regen_limit" | "unavailable";

/** Binds the transaction to this pair on first use, or checks it against the existing binding. */
async function claimTransaction(transactionId: string, appUserId: string, pairKey: string): Promise<Claim> {
  try {
    const db = getSupabaseAdmin();
    const { data: existing, error: readError } = await db
      .from("compat_report_purchases")
      .select("pair_key, generations")
      .eq("transaction_id", transactionId)
      .maybeSingle();
    if (readError) throw readError;

    if (!existing) {
      const { error } = await db.from("compat_report_purchases").insert({ transaction_id: transactionId, app_user_id: appUserId, pair_key: pairKey });
      if (!error) return "ok";
      // Another request claimed it a moment ago: judge against that row.
      if (error.code !== "23505") throw error;
      return claimTransaction(transactionId, appUserId, pairKey);
    }

    if (existing.pair_key !== pairKey) return "used_for_other";
    if (existing.generations >= MAX_GENERATIONS) return "regen_limit";
    const { error } = await db
      .from("compat_report_purchases")
      .update({ generations: existing.generations + 1, updated_at: new Date().toISOString() })
      .eq("transaction_id", transactionId);
    if (error) throw error;
    return "ok";
  } catch (err) {
    console.error("[api/compatReport/paid] purchase record failed (failing closed)", err);
    return "unavailable";
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "compat-report-paid", 5, 60 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  if (!body.selfDayMasterChar || !validOther(body.other) || typeof body.transactionId !== "string" || !body.transactionId) {
    return NextResponse.json({ error: "필수 입력값이 빠졌거나 잘못되었습니다.", code: "bad_request" }, { status: 400 });
  }
  if (!body.appUserId) {
    return NextResponse.json({ error: "구매 확인에 필요한 사용자 id가 없습니다.", code: "no_user" }, { status: 401 });
  }

  const purchase = await checkConsumablePurchase(body.appUserId, COMPAT_PRODUCT_IDS, body.transactionId);
  if (purchase.status === "inactive") {
    return NextResponse.json({ error: "구매한 리포트가 아닙니다.", code: "not_purchased" }, { status: 402 });
  }
  if (purchase.status !== "active" || !purchase.purchaseId) {
    return NextResponse.json({ error: "지금은 리포트를 만들 수 없어요.", code: "unavailable" }, { status: 503 });
  }

  // REVENUECAT_SECRET_KEY is present here (the check above needs it) and never leaves the server,
  // so it doubles as the HMAC key: the stored value can't be reversed into a birth date.
  const pairKey = createHmac("sha256", `compat-pair:${process.env.REVENUECAT_SECRET_KEY}`)
    .update(`${body.selfDayMasterChar}|${otherIdentity(body.other)}`)
    .digest("hex");
  // Bound by RevenueCat's id for the purchase, so the store's transaction id for the same
  // purchase can't claim it a second time.
  const claim = await claimTransaction(purchase.purchaseId, body.appUserId, pairKey);
  if (claim === "used_for_other") {
    return NextResponse.json({ error: "이 구매는 다른 상대의 리포트에 쓰였어요.", code: "used_for_other" }, { status: 409 });
  }
  if (claim === "regen_limit") {
    return NextResponse.json({ error: "이 리포트를 다시 만들 수 있는 횟수를 모두 썼어요.", code: "regen_limit" }, { status: 429 });
  }
  if (claim !== "ok") {
    return NextResponse.json({ error: "지금은 리포트를 만들 수 없어요.", code: "unavailable" }, { status: 503 });
  }

  try {
    const ctx = await buildCompatReportContext(body);
    const paid = await getCompatPaidPart(ctx, sanitizeFreePart(body.freePart), body.sessionId);
    return NextResponse.json(paid);
  } catch (err) {
    return compatErrorResponse(err, "api/compatReport/paid");
  }
}
