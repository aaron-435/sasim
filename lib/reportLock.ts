/**
 * lib/reportLock.ts
 * ------------------------------------------------------------------
 * Server-side gate for the deep report's paid half (2026-09-20 security fix).
 *
 * Before this, POST /api/report returned the ENTIRE report to whoever asked; the app merely
 * hid the paid pages, so the strengths / weaknesses / behavior guides / closing (everything
 * the $14.99 sells) could be read straight out of the network response. Now the server
 * splits the generated report: the free half goes out as-is, the paid half goes out ONLY as a
 * sealed token (AES-256-GCM) that the server itself opens after re-verifying the purchase
 * with RevenueCat (POST /api/report/unlock).
 *
 * Stateless on purpose — no table, no dependence on the per-launch session id (which is why a
 * stored copy in report_results couldn't serve this): the token rides along with the report
 * the app already keeps on the device, so a report made before buying can be unlocked after.
 *
 * The key is derived from REVENUECAT_SECRET_KEY (already required for purchase checks), so no
 * new secret to manage. If that key is ever rotated, old tokens stop opening — the client then
 * regenerates the report, and a buyer gets the full report straight away (see the route).
 * Without the key the paid half is simply withheld (fail closed).
 * ------------------------------------------------------------------
 */

import crypto from "crypto";
import type { ReportContent } from "./report";

export const LOCKED_KEYS = [
  "upcoming_period_heading",
  "upcoming_period_body",
  "cross_analysis_quotes",
  "answer_notes",
  "chat_snapshot_note",
  "chat_trigger_note",
  "chat_repeat_note",
  "chat_fear_note",
  "psychology_fact_heading",
  "psychology_fact_body",
  "psychology_takeaway",
  "strengths",
  "weaknesses",
  "fit_good",
  "fit_bad",
  "behavior_guides",
  "mindset_guide",
  "closing_title",
  "closing_body",
] as const;

type LockedKey = (typeof LOCKED_KEYS)[number];
export type LockedPart = Pick<ReportContent, LockedKey>;

const EMPTY_LOCKED: LockedPart = {
  upcoming_period_heading: "",
  upcoming_period_body: "",
  cross_analysis_quotes: [],
  answer_notes: [],
  chat_snapshot_note: "",
  chat_trigger_note: "",
  chat_repeat_note: "",
  chat_fear_note: "",
  psychology_fact_heading: "",
  psychology_fact_body: "",
  psychology_takeaway: "",
  strengths: [],
  weaknesses: [],
  fit_good: "",
  fit_bad: "",
  behavior_guides: [],
  mindset_guide: "",
  closing_title: "",
  closing_body: "",
};

/** `open` is the report with the paid fields emptied; `locked` is exactly what was removed. */
export function splitLocked(full: ReportContent): { open: ReportContent; locked: LockedPart } {
  const locked = {} as Record<string, unknown>;
  for (const key of LOCKED_KEYS) locked[key] = full[key];
  return { open: { ...full, ...EMPTY_LOCKED }, locked: locked as unknown as LockedPart };
}

function lockKey(): Buffer | null {
  const secret = process.env.REVENUECAT_SECRET_KEY;
  if (!secret) return null;
  return crypto.createHash("sha256").update(`fatesaid-report-lock-v1:${secret}`).digest();
}

/** null when the server has no key to seal with — the caller then withholds the paid half. */
export function sealLocked(moduleId: string, locked: LockedPart): string | null {
  const key = lockKey();
  if (!key) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify({ m: moduleId, c: locked }), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}

/** The module the token was sealed for plus the paid fields, or null if it isn't ours / was altered. */
export function openLocked(token: string): { moduleId: string; locked: LockedPart } | null {
  const key = lockKey();
  if (!key || !token || token.length > 200_000) return null;
  try {
    const raw = Buffer.from(token, "base64url");
    if (raw.length < 12 + 16 + 1) return null;
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const json = Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8");
    const parsed = JSON.parse(json) as { m?: unknown; c?: Record<string, unknown> };
    if (typeof parsed.m !== "string" || !parsed.c) return null;

    const locked = { ...EMPTY_LOCKED } as Record<string, unknown>;
    for (const k of LOCKED_KEYS) {
      const value = parsed.c[k];
      const isList = Array.isArray(EMPTY_LOCKED[k]);
      if (isList ? Array.isArray(value) : typeof value === "string") locked[k] = value;
    }
    return { moduleId: parsed.m, locked: locked as unknown as LockedPart };
  } catch {
    return null;
  }
}
