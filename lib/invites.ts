/**
 * lib/invites.ts
 * ------------------------------------------------------------------
 * Friend-compatibility invites (SPEC 2026-10-05 §6). The app makes a link
 * (fatesaidapp.com/c/<code>), the friend opens it on the web and enters their
 * own birth date, and the sender's app later picks the result up under
 * "Received compatibility".
 *
 * What is stored (Supabase `invites`, one row per link, 30 days):
 *   - the code, and a SHA-256 of the sender's owner token (only the sender's
 *     device knows the token, so only it can read the result back);
 *   - the sender's display name, their Day Master stem (one character — the
 *     compatibility only compares the two Day Masters), the sender's language;
 *   - once answered: the friend's optional display name and the derived result
 *     (Day Master stem, saju type, dominant element). Never the friend's birth
 *     date: it is used inside the accept request and dropped, like
 *     /api/compatibility does for the other person.
 * Expired rows are deleted on the next invite creation.
 * ------------------------------------------------------------------
 */

import { createHash, randomBytes } from "crypto";
import { calculateCompatibility, type CompatibilityResult } from "./compatibility";
import { STEM_ELEMENT, type SajuType } from "./sajuType";
import { getSupabaseAdmin } from "./supabase";

export const INVITE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const MAX_NAME_LENGTH = 24;
export const MAX_STATUS_ITEMS = 20;
const LOCALES = ["ko", "en", "es"] as const;
export type InviteLocale = (typeof LOCALES)[number];

// No 0/o/1/l/i so a code read aloud or retyped survives.
const CODE_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
const CODE_LENGTH = 10;
const CODE_PATTERN = new RegExp(`^[${CODE_ALPHABET}]{${CODE_LENGTH}}$`);
const TOKEN_PATTERN = /^[0-9a-f]{64}$/;

export interface InviteRow {
  code: string;
  owner_token_hash: string;
  sender_name: string;
  sender_day_master: string;
  locale: InviteLocale;
  created_at: string;
  expires_at: string;
  accepted_at: string | null;
  friend_name: string | null;
  friend_result: FriendResult | null;
}

export interface FriendResult {
  dayMaster: string;
  sajuType: SajuType | null;
  dominantElement: string | null;
}

export type InviteStatus = "open" | "answered" | "expired";

export function isInviteCode(code: unknown): code is string {
  return typeof code === "string" && CODE_PATTERN.test(code);
}

export function isOwnerToken(token: unknown): token is string {
  return typeof token === "string" && TOKEN_PATTERN.test(token);
}

export function isStem(char: unknown): char is string {
  return typeof char === "string" && char in STEM_ELEMENT;
}

export function pickInviteLocale(value: unknown): InviteLocale | null {
  return (LOCALES as readonly string[]).includes(value as string) ? (value as InviteLocale) : null;
}

/** A display name, not free text: trimmed, single line, short. Empty → null. */
export function cleanName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  // eslint-disable-next-line no-control-regex
  const name = value.replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim();
  return name ? Array.from(name).slice(0, MAX_NAME_LENGTH).join("") : null;
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function newCode(): string {
  const bytes = randomBytes(CODE_LENGTH);
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

export function newOwnerToken(): string {
  return randomBytes(32).toString("hex");
}

export function inviteStatus(row: Pick<InviteRow, "accepted_at" | "expires_at">, now = Date.now()): InviteStatus {
  if (row.accepted_at) return "answered";
  return Date.parse(row.expires_at) <= now ? "expired" : "open";
}

/** The sender-side result, shaped like the /api/compatibility response so the app's result screen reads it as is. */
export function senderView(row: InviteRow): { other: { sajuType: SajuType | null; dominantElement: string | null; elements: Record<string, number> }; compatibility: CompatibilityResult | null } | null {
  if (!row.friend_result) return null;
  return {
    other: { sajuType: row.friend_result.sajuType, dominantElement: row.friend_result.dominantElement, elements: {} },
    compatibility: calculateCompatibility(row.sender_day_master, row.friend_result.dayMaster),
  };
}

/** Public fields for the friend's page. Nothing about any earlier answer. */
export async function getPublicInvite(code: string): Promise<{ status: InviteStatus; senderName: string; locale: InviteLocale; senderDayMaster: string } | null> {
  if (!isInviteCode(code)) return null;
  const { data, error } = await getSupabaseAdmin()
    .from("invites")
    .select("sender_name, sender_day_master, locale, expires_at, accepted_at")
    .eq("code", code)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    status: inviteStatus(data),
    senderName: data.sender_name,
    locale: pickInviteLocale(data.locale) ?? "en",
    senderDayMaster: data.sender_day_master,
  };
}
