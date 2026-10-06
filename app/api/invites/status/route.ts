/**
 * app/api/invites/status/route.ts
 * ------------------------------------------------------------------
 * The sender's app asks how its invites are doing. Each item carries the owner token the create
 * call returned; an invite whose token doesn't match is reported as missing, so a code alone
 * never reveals a friend's answer.
 *
 * Request:  POST { items: [{ code, ownerToken }] }   (at most 20)
 * Response: { invites: [{ code, status: "open" | "answered" | "expired" | "missing", expiresAt?,
 *             friendName?, result? }] }
 *   result has the /api/compatibility response shape, from the sender's side.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimitOrResponse } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hashToken, inviteStatus, isInviteCode, isOwnerToken, MAX_STATUS_ITEMS, senderView, type InviteRow } from "@/lib/invites";

export async function POST(req: NextRequest) {
  const limited = rateLimitOrResponse(req, "invites-status", 60, 10 * 60 * 1000, "요청이 많아 잠시 후 다시 시도해주세요.");
  if (limited) return limited;

  let body: { items?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다.", code: "bad_request" }, { status: 400 });
  }

  const items = body?.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_STATUS_ITEMS) {
    return NextResponse.json({ error: "잘못된 요청입니다.", code: "bad_request" }, { status: 400 });
  }
  const wanted = new Map<string, string>();
  for (const item of items) {
    const { code, ownerToken } = (item ?? {}) as { code?: unknown; ownerToken?: unknown };
    if (!isInviteCode(code) || !isOwnerToken(ownerToken)) {
      return NextResponse.json({ error: "잘못된 요청입니다.", code: "bad_request" }, { status: 400 });
    }
    wanted.set(code, hashToken(ownerToken));
  }

  let rows: InviteRow[];
  try {
    const { data, error } = await getSupabaseAdmin().from("invites").select("*").in("code", Array.from(wanted.keys()));
    if (error) throw error;
    rows = (data ?? []) as InviteRow[];
  } catch (err) {
    console.error("[api/invites/status] failed", err);
    return NextResponse.json({ error: "지금은 확인할 수 없어요.", code: "unavailable" }, { status: 503 });
  }

  const byCode = new Map(rows.filter((r) => wanted.get(r.code) === r.owner_token_hash).map((r) => [r.code, r]));
  const invites = Array.from(wanted.keys()).map((code) => {
    const row = byCode.get(code);
    if (!row) return { code, status: "missing" as const };
    const status = inviteStatus(row);
    return {
      code,
      status,
      expiresAt: row.expires_at,
      ...(status === "answered" ? { friendName: row.friend_name, result: senderView(row) } : {}),
    };
  });
  return NextResponse.json({ invites });
}
