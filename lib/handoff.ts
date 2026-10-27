/**
 * lib/handoff.ts
 * ------------------------------------------------------------------
 * Web→app handoff (SPEC 2026-10-27 B1). When a visitor taps "continue in the app" on a
 * web surface (type card, calculator, day-master article, invite answer, Q&A), the web
 * stores only what they had already typed there and gets two ways to carry it over:
 *   - a 6-digit code a person types into the app (VerifyCodeScreen), and
 *   - a long random token for a link (fatesaid://handoff?t=<token>) the app opens itself.
 * Nothing is stored before that tap. A row lives 7 days and is deleted when redeemed
 * (by either path), so a code or link works once.
 *
 * What is stored (Supabase `handoffs`): the code, a SHA-256 of the token (the token
 * itself is only in the link), the entry point, the language, and the inputs below —
 * birth date, optional time / gender / city / nickname / topic. No device id, no free
 * text. Birth data never goes into a URL or an event; only the token goes into the link.
 *
 * The older Q&A code (sessions.verify_code, 24h, /api/verification-code) keeps working
 * unchanged for installed 1.2.0 apps; its redemption lives here too so both share one
 * code space and one rate limit. Codes are drawn so they never collide across the two.
 *
 * Route handlers are thin: everything takes a HandoffDb so scripts/handoff.test.mts can
 * run it against an in-memory store.
 * ------------------------------------------------------------------
 */

import { createHash, randomBytes, randomInt } from "crypto";
import { classifySajuType } from "./sajuType";
import { getSupabaseAdmin } from "./supabase";

export const HANDOFF_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const LEGACY_CODE_TTL_MS = 24 * 60 * 60 * 1000;
export const HANDOFF_SOURCES = ["type_card", "calculator", "day_master", "invite", "qa"] as const;
export type HandoffSource = (typeof HANDOFF_SOURCES)[number];
const LOCALES = ["ko", "en", "es"] as const;
export type HandoffLocale = (typeof LOCALES)[number];
const TRACKS = ["romance", "career"] as const;

const CODE_PATTERN = /^\d{6}$/;
const TOKEN_PATTERN = /^[0-9a-f]{64}$/;
const DATA_KEYS = ["birthYear", "birthMonth", "birthDay", "birthHour", "birthMinute", "isFemale", "birthCity", "birthCityId", "nickname", "track"] as const;
const MAX_NAME_LENGTH = 24;
const MAX_CITY_LENGTH = 80;

/**
 * What the web carries over. Every field is optional: a type card has only the date, the
 * Q&A flow has everything. `birthHour: null` means the visitor chose "I don't know the
 * time"; a missing birthHour means they were never asked, so the app asks.
 */
export interface HandoffData {
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  birthHour?: number | null;
  birthMinute?: number;
  isFemale?: boolean;
  birthCity?: string;
  birthCityId?: string;
  nickname?: string;
  track?: (typeof TRACKS)[number];
}

export interface HandoffRow {
  code: string;
  token_hash: string;
  source: HandoffSource;
  locale: HandoffLocale;
  data: HandoffData;
  created_at: string;
  expires_at: string;
}

export interface LegacySession {
  id: string;
  nickname: string | null;
  track: string | null;
  verify_code_created_at: string | null;
}

/** The storage the handoff logic needs; the Supabase version is supabaseHandoffDb(). */
export interface HandoffDb {
  insertHandoff(row: Omit<HandoffRow, "created_at">): Promise<"ok" | "duplicate">;
  findHandoffByCode(code: string): Promise<HandoffRow | null>;
  findHandoffByTokenHash(hash: string): Promise<HandoffRow | null>;
  /** Deletes and reports whether this call removed it, so two redemptions racing get one winner. */
  deleteHandoff(code: string): Promise<boolean>;
  deleteExpiredHandoffs(nowIso: string): Promise<void>;
  sessionCodeInUse(code: string): Promise<boolean>;
  findSessionByCode(code: string): Promise<LegacySession | null>;
  clearSessionCode(sessionId: string): Promise<void>;
  setSessionCode(sessionId: string, code: string, createdAtIso: string): Promise<"ok" | "duplicate">;
  latestSajuRow(sessionId: string): Promise<Record<string, unknown> | null>;
}

export type Result = { status: number; body: Record<string, unknown> };
const fail = (status: number, code: string, error: string): Result => ({ status, body: { error, code } });

// ---- validation ---------------------------------------------------------

export function isHandoffCode(value: unknown): value is string {
  return typeof value === "string" && CODE_PATTERN.test(value);
}

export function isHandoffToken(value: unknown): value is string {
  return typeof value === "string" && TOKEN_PATTERN.test(value);
}

function isInt(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;
}

/** A display string, not free text: single line, no markup characters, capped. Empty → null. */
function cleanLine(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  // eslint-disable-next-line no-control-regex
  const line = value.replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim();
  return line ? Array.from(line).slice(0, max).join("") : null;
}

/** Strict: unknown keys, wrong types and impossible dates are rejected rather than dropped. */
export function parseHandoffData(raw: unknown, now = new Date()): HandoffData | string {
  if (raw === undefined || raw === null) return {};
  if (typeof raw !== "object" || Array.isArray(raw)) return "data";
  const input = raw as Record<string, unknown>;
  for (const key of Object.keys(input)) {
    if (!(DATA_KEYS as readonly string[]).includes(key)) return `data:${key}`;
  }
  const out: HandoffData = {};

  const hasDate = ["birthYear", "birthMonth", "birthDay"].map((k) => input[k] !== undefined);
  if (hasDate.some(Boolean)) {
    if (!hasDate.every(Boolean)) return "birthDate";
    const { birthYear: y, birthMonth: m, birthDay: d } = input;
    if (!isInt(y, 1900, now.getUTCFullYear()) || !isInt(m, 1, 12) || !isInt(d, 1, 31)) return "birthDate";
    const date = new Date(Date.UTC(y, m - 1, d));
    if (date.getUTCMonth() !== m - 1 || date.getTime() > now.getTime()) return "birthDate";
    Object.assign(out, { birthYear: y, birthMonth: m, birthDay: d });
  }

  if (input.birthHour !== undefined) {
    if (out.birthYear === undefined) return "birthHour";
    if (input.birthHour === null) {
      out.birthHour = null;
      if (input.birthMinute !== undefined) return "birthMinute";
    } else {
      if (!isInt(input.birthHour, 0, 23)) return "birthHour";
      out.birthHour = input.birthHour;
      if (input.birthMinute !== undefined) {
        if (!isInt(input.birthMinute, 0, 59)) return "birthMinute";
        out.birthMinute = input.birthMinute;
      }
    }
  } else if (input.birthMinute !== undefined) {
    return "birthMinute";
  }

  if (input.isFemale !== undefined) {
    if (typeof input.isFemale !== "boolean") return "isFemale";
    out.isFemale = input.isFemale;
  }
  for (const [key, max] of [["birthCity", MAX_CITY_LENGTH], ["birthCityId", MAX_CITY_LENGTH], ["nickname", MAX_NAME_LENGTH]] as const) {
    if (input[key] === undefined) continue;
    if (typeof input[key] !== "string") return key;
    const line = cleanLine(input[key], max);
    if (line) out[key] = line;
  }
  if (input.track !== undefined) {
    if (!(TRACKS as readonly unknown[]).includes(input.track)) return "track";
    out.track = input.track as HandoffData["track"];
  }
  return out;
}

// ---- codes and tokens ---------------------------------------------------

export function hashHandoffToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** 6 digits, no leading zero (the app's input strips nothing, but people read "012345" as 5 digits). */
export function newHandoffCode(): string {
  return String(randomInt(100000, 1000000));
}

export function newHandoffToken(): string {
  return randomBytes(32).toString("hex");
}

export function handoffDeepLink(token: string): string {
  return `fatesaid://handoff?t=${token}`;
}

// ---- create (POST /api/handoff) -----------------------------------------

export async function createHandoff(db: HandoffDb, body: unknown, now = Date.now()): Promise<Result> {
  if (!body || typeof body !== "object" || Array.isArray(body)) return fail(400, "bad_request", "잘못된 요청 형식입니다.");
  const { source, locale, data } = body as Record<string, unknown>;
  if (!(HANDOFF_SOURCES as readonly unknown[]).includes(source)) return fail(400, "bad_request", "source가 올바르지 않습니다.");
  if (!(LOCALES as readonly unknown[]).includes(locale)) return fail(400, "bad_request", "locale이 올바르지 않습니다.");
  const parsed = parseHandoffData(data, new Date(now));
  if (typeof parsed === "string") return fail(400, "bad_request", `입력값이 올바르지 않습니다: ${parsed}`);

  // Expired rows go when the next one is made, and the daily retention job catches the rest.
  await db.deleteExpiredHandoffs(new Date(now).toISOString());

  const token = newHandoffToken();
  const expiresAt = new Date(now + HANDOFF_TTL_MS).toISOString();
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = newHandoffCode();
    if (await db.sessionCodeInUse(code)) continue;
    const inserted = await db.insertHandoff({
      code,
      token_hash: hashHandoffToken(token),
      source: source as HandoffSource,
      locale: locale as HandoffLocale,
      data: parsed,
      expires_at: expiresAt,
    });
    if (inserted === "ok") return { status: 200, body: { code, token, deepLink: handoffDeepLink(token), expiresAt } };
  }
  return fail(503, "unavailable", "인증번호 생성에 실패했습니다. 다시 시도해주세요.");
}

// ---- redeem (GET /api/handoff) ------------------------------------------

function handoffBody(row: HandoffRow): Record<string, unknown> {
  return { kind: "handoff", source: row.source, locale: row.locale, data: row.data };
}

async function takeHandoff(db: HandoffDb, row: HandoffRow | null, now: number): Promise<Result | null> {
  if (!row) return null;
  if (Date.parse(row.expires_at) <= now) {
    await db.deleteHandoff(row.code);
    return fail(410, "expired", "코드가 만료되었습니다. 웹에서 새 코드를 발급받아주세요.");
  }
  // Only the request whose delete removed the row gets the data.
  if (!(await db.deleteHandoff(row.code))) return fail(404, "not_found", "유효하지 않거나 이미 사용된 코드입니다.");
  return { status: 200, body: handoffBody(row) };
}

/**
 * The new app's single redemption call. `t` (link token) or `code` (typed). A typed code is
 * looked up in handoffs first, then in the older Q&A codes, whose answer comes back in its
 * old shape under kind "session" so the app needs one request either way.
 */
export async function redeemHandoff(db: HandoffDb, query: { t?: string | null; code?: string | null }, now = Date.now()): Promise<Result> {
  if (query.t != null) {
    if (!isHandoffToken(query.t)) return fail(400, "bad_request", "t가 올바르지 않습니다.");
    const taken = await takeHandoff(db, await db.findHandoffByTokenHash(hashHandoffToken(query.t)), now);
    return taken ?? fail(404, "not_found", "유효하지 않거나 이미 사용된 링크입니다.");
  }
  if (query.code != null) {
    if (!isHandoffCode(query.code)) return fail(400, "bad_request", "code가 올바르지 않습니다.");
    const taken = await takeHandoff(db, await db.findHandoffByCode(query.code), now);
    if (taken) return taken;
    const legacy = await redeemSessionCode(db, query.code, now);
    return legacy.status === 200 ? { status: 200, body: { kind: "session", ...legacy.body } } : legacy;
  }
  return fail(400, "bad_request", "t 또는 code는 필수입니다.");
}

// ---- the older Q&A code (/api/verification-code) ------------------------

/** POST /api/verification-code: attach a 24h code to an existing Q&A session. */
export async function issueSessionCode(db: HandoffDb, sessionId: unknown, now = Date.now()): Promise<Result> {
  if (!sessionId || typeof sessionId !== "string") return { status: 400, body: { error: "sessionId는 필수입니다." } };
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newHandoffCode();
    if (await db.findHandoffByCode(code)) continue;
    if ((await db.setSessionCode(sessionId, code, new Date(now).toISOString())) === "ok") return { status: 200, body: { code } };
  }
  return { status: 503, body: { error: "인증번호 생성에 실패했습니다. 다시 시도해주세요." } };
}

/**
 * GET /api/verification-code: the response installed 1.2.0 apps parse —
 * { nickname, track, sajuResult } on success, { error } with 404 (unknown/used) or 410
 * (older than 24h). A code that belongs to the new handoffs is answered with 409 and left
 * in place, since an old app cannot read a partial handoff but the same code still works
 * after updating.
 */
export async function redeemSessionCode(db: HandoffDb, code: string | null, now = Date.now()): Promise<Result> {
  if (!code) return { status: 400, body: { error: "code는 필수입니다." } };
  const session = await db.findSessionByCode(code);
  if (!session) {
    if (isHandoffCode(code) && (await db.findHandoffByCode(code))) {
      return { status: 409, body: { error: "앱을 최신 버전으로 업데이트한 뒤 이 코드를 입력해 주세요.", code: "update_app" } };
    }
    return { status: 404, body: { error: "유효하지 않거나 이미 사용된 코드입니다." } };
  }

  // 24h from when the code was (re)generated, not the session's own created_at.
  const codeAgeMs = session.verify_code_created_at ? now - Date.parse(session.verify_code_created_at) : Infinity;
  if (codeAgeMs > LEGACY_CODE_TTL_MS) {
    await db.clearSessionCode(session.id);
    return { status: 410, body: { error: "코드가 만료되었습니다. 웹에서 새 코드를 발급받아주세요." } };
  }

  const sajuRow = await db.latestSajuRow(session.id);
  // 1회용 — 리딤 성공 즉시 코드를 비워서 재사용을 막는다.
  await db.clearSessionCode(session.id);

  const dayMasterChar = (sajuRow?.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char;
  const sajuType = dayMasterChar && sajuRow?.elements ? classifySajuType(dayMasterChar, sajuRow.elements as Parameters<typeof classifySajuType>[1]) : null;

  return {
    status: 200,
    body: {
      nickname: session.nickname,
      track: session.track,
      sajuResult: sajuRow ? { ...sajuRow, saju_type: sajuType } : sajuRow,
    },
  };
}

// ---- Supabase ------------------------------------------------------------

const isDuplicate = (error: { code?: string; message?: string }) =>
  error.code === "23505" || String(error.message).toLowerCase().includes("duplicate");
// Before supabase/handoffs.sql has run, the table is missing. Lookups then mean "no handoff"
// so the older Q&A codes keep working whichever of the SQL and the web deploy lands first.
const isMissingTable = (error: { code?: string }) => error.code === "42P01" || error.code === "PGRST205";

export function supabaseHandoffDb(): HandoffDb {
  const db = getSupabaseAdmin();
  const handoffColumns = "code, token_hash, source, locale, data, created_at, expires_at";
  return {
    async insertHandoff(row) {
      const { error } = await db.from("handoffs").insert(row);
      if (!error) return "ok";
      if (isDuplicate(error)) return "duplicate";
      throw error;
    },
    async findHandoffByCode(code) {
      const { data, error } = await db.from("handoffs").select(handoffColumns).eq("code", code).maybeSingle();
      if (error && isMissingTable(error)) return null;
      if (error) throw error;
      return (data as HandoffRow | null) ?? null;
    },
    async findHandoffByTokenHash(hash) {
      const { data, error } = await db.from("handoffs").select(handoffColumns).eq("token_hash", hash).maybeSingle();
      if (error) throw error;
      return (data as HandoffRow | null) ?? null;
    },
    async deleteHandoff(code) {
      const { data, error } = await db.from("handoffs").delete().eq("code", code).select("code");
      if (error) throw error;
      return (data?.length ?? 0) > 0;
    },
    async deleteExpiredHandoffs(nowIso) {
      const { error } = await db.from("handoffs").delete().lt("expires_at", nowIso);
      if (error) throw error;
    },
    async sessionCodeInUse(code) {
      const { data, error } = await db.from("sessions").select("id").eq("verify_code", code).maybeSingle();
      if (error) throw error;
      return !!data;
    },
    async findSessionByCode(code) {
      const { data, error } = await db.from("sessions").select("id, nickname, track, verify_code_created_at").eq("verify_code", code).maybeSingle();
      if (error) throw error;
      return (data as LegacySession | null) ?? null;
    },
    async clearSessionCode(sessionId) {
      await db.from("sessions").update({ verify_code: null }).eq("id", sessionId);
    },
    async setSessionCode(sessionId, code, createdAtIso) {
      const { error } = await db.from("sessions").update({ verify_code: code, verify_code_created_at: createdAtIso }).eq("id", sessionId);
      if (!error) return "ok";
      if (isDuplicate(error)) return "duplicate";
      throw error;
    },
    async latestSajuRow(sessionId) {
      const { data, error } = await db
        .from("saju_results")
        .select("birth_year, birth_month, birth_day, birth_hour, birth_minute, is_female, birth_city, elements, four_pillars, decade_fortune, summary")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data ?? null;
    },
  };
}
