/**
 * lib/compatReport.ts
 * ------------------------------------------------------------------
 * Server side of the compatibility report (prompts: lib/compatReportPrompts.ts). Two calls:
 * the free preview and, after the route has verified the purchase, the paid rest. Same care as
 * the year report: parse strictly, check in code (forbidden verdicts, leftover Korean, Spanish
 * slips, technical terms), rewrite only the strings that failed, retry an incomplete response.
 * NEVER import in a client component (reads OPENAI_API_KEY).
 * ------------------------------------------------------------------
 */

import OpenAI from "openai";
import { logLlmUsage } from "./llmUsage";
import type { Locale } from "./i18n/types";
import { calculateCompatibility } from "./compatibility";
import { calculateSaju } from "./sazu";
import { STEM_ELEMENT, type ElementKey } from "./sajuType";
import { branchRelation } from "./twelveStages";
import type { Branch } from "./manseryeok";
import { checkLanguageSlips, makeRewriter, repairStringFindings, stripHanja } from "./reportQuality";
import {
  buildCompatFreePrompt,
  buildCompatPaidPrompt,
  OTHER_TOKEN,
  type CompatFreePart,
  type CompatReportContext,
} from "./compatReportPrompts";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const COMPAT_REPORT_MODEL = "gpt-5.4-mini";

export interface CompatPaidPart {
  friction: { title: string; body: string }[];
  rhythm: { heading: string; body: string };
  closing: string;
}

// ---- Request parsing (shared by both routes) -------------------------------------------

export interface CompatOtherInput {
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  birthHour?: number | null;
  birthMinute?: number;
  isFemale?: boolean;
  birthCity?: string;
  birthCityId?: string;
}

export interface CompatReportRequest {
  locale?: string;
  nickname?: string;
  selfDayMasterChar?: string;
  selfDayBranch?: string | null;
  selfElements?: Record<string, number> | null;
  other?: CompatOtherInput;
  sessionId?: string;
}

const LOCALES: Locale[] = ["ko", "en", "es"];
const ELEMENT_KEYS: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

function isInt(v: unknown, min: number, max: number): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= min && v <= max;
}

export function validOther(o: CompatOtherInput | undefined): o is CompatOtherInput {
  return (
    !!o &&
    isInt(o.birthYear, 1900, new Date().getUTCFullYear()) &&
    isInt(o.birthMonth, 1, 12) &&
    isInt(o.birthDay, 1, 31) &&
    (o.birthHour == null || isInt(o.birthHour, 0, 23)) &&
    (o.birthMinute == null || isInt(o.birthMinute, 0, 59)) &&
    typeof o.isFemale === "boolean" &&
    (o.birthCity == null || (typeof o.birthCity === "string" && o.birthCity.length <= 120)) &&
    (o.birthCityId == null || (typeof o.birthCityId === "string" && o.birthCityId.length <= 80))
  );
}

function cleanElements(value: CompatReportRequest["selfElements"]): Record<ElementKey, number> | null {
  if (!value) return null;
  const result = {} as Record<ElementKey, number>;
  for (const key of ELEMENT_KEYS) {
    const n = Number(value[key]);
    if (!Number.isFinite(n) || n < 0 || n > 100) return null;
    result[key] = n;
  }
  return result;
}

/** A canonical string for "who the other person is" — the paid route binds a purchase to it
 * (hashed, never stored raw). City and name are left out on purpose: same birth moment = same
 * chart = same report. */
export function otherIdentity(o: CompatOtherInput): string {
  return [o.birthYear, o.birthMonth, o.birthDay, o.birthHour ?? "x", o.birthHour == null ? "x" : o.birthMinute ?? 0, o.isFemale ? "f" : "m"].join("-");
}

export class CompatInputError extends Error {}

/** Validates the request and computes the other person's chart (for this request only — never
 * saved, same rule as /api/compatibility). Throws CompatInputError on bad input; lets the engine's
 * SazuApiError through. */
export async function buildCompatReportContext(body: CompatReportRequest): Promise<CompatReportContext> {
  const locale = LOCALES.includes(body.locale as Locale) ? (body.locale as Locale) : "ko";
  const nickname = (body.nickname ?? "").toString().trim().slice(0, 40) || (locale === "ko" ? "회원" : "you");
  const selfElement = body.selfDayMasterChar ? STEM_ELEMENT[body.selfDayMasterChar] : undefined;
  if (!body.selfDayMasterChar || !selfElement || !validOther(body.other)) throw new CompatInputError("bad input");
  const other = body.other;

  const chart = await calculateSaju({
    birthYear: other.birthYear!,
    birthMonth: other.birthMonth!,
    birthDay: other.birthDay!,
    birthHour: other.birthHour ?? null,
    birthMinute: other.birthMinute,
    isFemale: other.isFemale!,
    birthCity: other.birthCity,
    birthCityId: other.birthCityId,
  });
  const otherChar = (chart.summary as { dayMaster?: { char?: string } } | undefined)?.dayMaster?.char;
  const otherBranch = (chart.fourPillars as { day?: { earth?: string } } | undefined)?.day?.earth ?? null;
  const compatibility = otherChar ? calculateCompatibility(body.selfDayMasterChar, otherChar) : null;
  if (!compatibility) throw new CompatInputError("chart has no day master");

  const selfBranch = typeof body.selfDayBranch === "string" ? body.selfDayBranch : null;
  return {
    locale,
    nickname,
    self: { dayMasterElement: compatibility.selfDayMasterElement, elements: cleanElements(body.selfElements) },
    other: { dayMasterElement: compatibility.otherDayMasterElement, elements: chart.elements, birthTimeKnown: other.birthHour != null },
    compatibility,
    branchRelation: selfBranch && otherBranch ? branchRelation(selfBranch as Branch, otherBranch as Branch) : "none",
  };
}

// ---- Parsing ----------------------------------------------------------------------------

function str(value: unknown, max = 4000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function section(value: unknown, max = 4000): { heading: string; body: string } {
  const o = (value ?? {}) as { heading?: unknown; body?: unknown };
  return { heading: str(o.heading, 120), body: str(o.body, max) };
}

class IncompleteCompatReport extends Error {}

function parseFree(raw: unknown): CompatFreePart {
  const p = (raw ?? {}) as Record<string, unknown>;
  const part: CompatFreePart = { title: str(p.title, 120), subtitle: str(p.subtitle, 200), meeting: section(p.meeting), gifts: section(p.gifts) };
  if (!part.title || !part.meeting.heading || !part.meeting.body || !part.gifts.heading || !part.gifts.body) {
    throw new IncompleteCompatReport("compat free part incomplete");
  }
  return part;
}

function parsePaid(raw: unknown): CompatPaidPart {
  const p = (raw ?? {}) as Record<string, unknown>;
  const friction = (Array.isArray(p.friction) ? p.friction : []).map((f) => ({
    title: str((f as { title?: unknown })?.title, 120),
    body: str((f as { body?: unknown })?.body),
  }));
  const part: CompatPaidPart = { friction, rhythm: section(p.rhythm), closing: str(p.closing, 1200) };
  if (friction.length !== 3 || !friction.every((f) => f.title && f.body) || !part.rhythm.heading || !part.rhythm.body || !part.closing) {
    throw new IncompleteCompatReport(`compat paid part incomplete (friction=${friction.length})`);
  }
  return part;
}

/** The free half as the app sends it back with the paid request — only used as "don't repeat
 * this" context, so it is trimmed and shape-checked but not trusted as fact. */
export function sanitizeFreePart(value: unknown): CompatFreePart | null {
  try {
    return parseFree(value);
  } catch {
    return null;
  }
}

// ---- Checks -------------------------------------------------------------------------------

// Verdicts and predictions the report must never make (PRODUCT.md: no bad matches, no endings,
// no mind-reading), and chart jargon a newcomer can't read.
const FORBIDDEN: Record<Locale, RegExp> = {
  ko: /나쁜 궁합|궁합이 (나쁘|안 좋)|상극|맞지 않는 (사람|사이|궁합)|피해야|헤어지|이별|결혼하게|돌아올|불운|흉하|일간|천간합|격국|용신|좋아하고 있|마음이 있을 (가능성|것)/,
  en: /bad match|incompatib|break ?up|will leave|doomed|unlucky|\bavoid (them|this person|\{other\})|day master|day branch|\b(he|she|him|her)\b|secretly (likes|loves)|is in love with you/i,
  es: /mala (pareja|combinaci[oó]n|compatibilidad)|incompatib|romper[aá]n?|ruptura|mala suerte|te dejar[aá]|maestro del d[ií]a|(?<![a-záéíóúñ])(él|ella)(?![a-záéíóúñ])|est[aá] enamorad[ao] de ti/i,
};
const TOKEN_LIKE = /\{(?!other\})[a-zA-Z_]+\}/;

/** Every percentage the two distributions actually contain (the only numbers the text may quote). */
export function allowedPercents(ctx: CompatReportContext): Set<number> {
  const values = [ctx.self.elements, ctx.other.elements].flatMap((e) => (e ? Object.values(e).map((n) => Math.round(n)) : []));
  return new Set(values);
}

export function checkCompatReport(value: CompatFreePart | CompatPaidPart, locale: Locale, percents?: Set<number>): string[] {
  const problems = checkLanguageSlips(value, locale);
  const strings: [string, string][] = [];
  const walk = (v: unknown, path: string) => {
    if (typeof v === "string") strings.push([path, v]);
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k);
  };
  walk(value, "");
  for (const [path, text] of strings) {
    const m = text.match(FORBIDDEN[locale]);
    if (m) problems.push(`${path}: 금지 표현 "${m[0]}" — 판정·결말 예언·마음 단정·전문용어·성별 대명사 없이 같은 뜻을 리듬 차이와 경향으로 다시 쓸 것. 상대는 토큰 ${OTHER_TOKEN}로만 부를 것`);
    if (TOKEN_LIKE.test(text)) problems.push(`${path}: ${OTHER_TOKEN} 말고 다른 중괄호 토큰이 있음 — 상대는 ${OTHER_TOKEN}로만`);
    if (percents) {
      const wrong = Array.from(text.matchAll(/(\d{1,3})\s?%/g)).find((m) => !percents.has(Number(m[1])));
      if (wrong) problems.push(`${path}: 데이터에 없는 수치 "${wrong[0]}" — 그 숫자를 빼고 같은 뜻을 말로 쓸 것`);
    }
  }
  return Array.from(new Set(problems));
}

// ---- Generation ---------------------------------------------------------------------------

async function callModel(prompt: string, sessionId?: string): Promise<unknown> {
  const completion = await client.chat.completions.create({
    model: COMPAT_REPORT_MODEL,
    temperature: 0.8,
    messages: [{ role: "system", content: prompt }],
    response_format: { type: "json_object" },
  });
  if (completion.usage) {
    await logLlmUsage({
      sessionId,
      endpoint: "compat_report",
      model: COMPAT_REPORT_MODEL,
      promptTokens: completion.usage.prompt_tokens,
      completionTokens: completion.usage.completion_tokens,
    });
  }
  const content = completion.choices[0]?.message?.content?.trim();
  if (!content) throw new IncompleteCompatReport("empty response");
  try {
    return JSON.parse(content);
  } catch {
    throw new IncompleteCompatReport("not JSON");
  }
}

async function polish<T extends CompatFreePart | CompatPaidPart>(part: T, ctx: CompatReportContext, sessionId?: string): Promise<T> {
  const locale = ctx.locale;
  const percents = allowedPercents(ctx);
  const problems = checkCompatReport(part, locale, percents);
  if (problems.length === 0) return locale === "ko" ? stripHanja(part) : part;
  console.info(`[compatReport] ${problems.length} finding(s) — ${problems.slice(0, 3).join(" | ").slice(0, 300)}`);
  const repaired = await repairStringFindings(part, problems, makeRewriter(client, COMPAT_REPORT_MODEL, locale, sessionId));
  const result = checkCompatReport(repaired, locale, percents).length <= problems.length ? repaired : part;
  return locale === "ko" ? stripHanja(result) : result;
}

async function withRetries<T>(once: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await once();
    } catch (err) {
      if (!(err instanceof IncompleteCompatReport)) throw err;
      last = err;
    }
  }
  throw last;
}

export function getCompatFreePart(ctx: CompatReportContext, sessionId?: string): Promise<CompatFreePart> {
  return withRetries(async () => polish(parseFree(await callModel(buildCompatFreePrompt(ctx), sessionId)), ctx, sessionId));
}

export function getCompatPaidPart(ctx: CompatReportContext, free: CompatFreePart | null, sessionId?: string): Promise<CompatPaidPart> {
  return withRetries(async () => polish(parsePaid(await callModel(buildCompatPaidPrompt(ctx, free), sessionId)), ctx, sessionId));
}
