/**
 * lib/pairs.ts
 * ------------------------------------------------------------------
 * Couple mode links (SPEC 2026-10-05 §7). One person's app makes a short code, the partner types
 * it into their own app, and from then on both Homes show "today, the two of you" — open to both
 * while either of them subscribes. Either side can unlink, which deletes the row.
 *
 * What is stored (Supabase `pairs`, one row per couple):
 *   - the code, and a SHA-256 of each side's token (only that device knows its token);
 *   - each side's display name, Day Master stem and day branch (one character each — today's
 *     flow needs nothing more), and their RevenueCat app user id (the subscription check).
 *   Never a birth date. An unjoined code lasts 7 days; expired ones go on the next creation.
 * ------------------------------------------------------------------
 */

import { cleanName, hashToken, isStem, newOwnerToken } from "./invites";
import { randomBytes } from "crypto";

export const PAIR_CODE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// Typed by hand on the partner's phone: short, lowercase, no look-alike characters.
const CODE_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
const CODE_LENGTH = 8;
const CODE_PATTERN = new RegExp(`^[${CODE_ALPHABET}]{${CODE_LENGTH}}$`);
const TOKEN_PATTERN = /^[0-9a-f]{64}$/;
const BRANCHES = new Set(["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"]);

export interface PairRow {
  code: string;
  a_token_hash: string;
  a_name: string;
  a_day_master: string;
  a_day_branch: string | null;
  a_app_user_id: string | null;
  b_token_hash: string | null;
  b_name: string | null;
  b_day_master: string | null;
  b_day_branch: string | null;
  b_app_user_id: string | null;
  created_at: string;
  code_expires_at: string;
  joined_at: string | null;
}

export interface PairSide {
  name: string;
  dayMaster: string;
  dayBranch: string | null;
  appUserId: string | null;
}

/** "Abcd-EFGH ", "abcd efgh" → "abcdefgh"; null when it can't be a code. */
export function normalizePairCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.toLowerCase().replace(/[\s-]/g, "");
  return CODE_PATTERN.test(code) ? code : null;
}

export function isPairToken(value: unknown): value is string {
  return typeof value === "string" && TOKEN_PATTERN.test(value);
}

export function newPairCode(): string {
  return Array.from(randomBytes(CODE_LENGTH), (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

export const newPairToken = newOwnerToken;
export { hashToken };

/** The requester's own side of a create/join body, or null when it is unusable. */
export function parseSide(body: Record<string, unknown>): PairSide | null {
  const dayMaster = body.dayMaster;
  const dayBranch = body.dayBranch ?? null;
  const appUserId = body.appUserId ?? null;
  if (!isStem(dayMaster)) return null;
  if (dayBranch !== null && !(typeof dayBranch === "string" && BRANCHES.has(dayBranch))) return null;
  // Same shape rule lib/revenuecat.ts applies before asking RevenueCat about an id.
  if (appUserId !== null && (typeof appUserId !== "string" || !appUserId || appUserId.length > 200 || /[\s/\\?#]/.test(appUserId))) return null;
  return { name: cleanName(body.name) ?? "", dayMaster, dayBranch: dayBranch as string | null, appUserId: appUserId as string | null };
}

/** Which side of the row a token belongs to, or null. */
export function sideOf(row: PairRow, token: string): "a" | "b" | null {
  const hash = hashToken(token);
  if (row.a_token_hash === hash) return "a";
  if (row.b_token_hash && row.b_token_hash === hash) return "b";
  return null;
}
