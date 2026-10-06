/**
 * lib/journal.ts
 * ------------------------------------------------------------------
 * The pure half of the month-end pattern report ("한 줄 저널", 2026-10-06): request parsing,
 * crisis detection, the per-rhythm tallies the model is allowed to talk about, and the output
 * checks. No network here — lib/journalReport.ts does the day lookups and the model call.
 *
 * The journal itself lives on the device (mobile/lib/journalStorage.ts). The route receives one
 * month of entries, uses them inside the request and stores nothing; llm_usage_log only gets
 * token counts. Don't log entry text anywhere in this file or its callers.
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";
import type { CompatRelation } from "./compatibility";
import { BRANCHES, STEMS } from "./manseryeok";

// Same keys and order as mobile/lib/journalStorage.ts JOURNAL_MOODS.
export const JOURNAL_MOODS = ["light", "calm", "buzzing", "tense", "tired", "heavy"] as const;
export type JournalMood = (typeof JOURNAL_MOODS)[number];

export const MIN_JOURNAL_ENTRIES = 10;
export const MAX_NOTE_LENGTH = 100;
const MAX_MONTHS_BACK = 12;

export interface JournalEntryInput {
  date: string; // YYYY-MM-DD, the fortune's own (KST) date
  mood: JournalMood;
  note: string | null;
}

export interface JournalReportRequest {
  locale: Locale;
  month: string; // YYYY-MM
  selfDayMasterChar: string;
  selfDayBranch: string | null;
  entries: JournalEntryInput[];
}

const MONTH_RE = /^(\d{4})-(\d{2})$/;
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function kstToday(): string {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

/** Validates the body. Returns the clean request or a short reason (→ 400). `todayIso` is for tests. */
export function parseJournalRequest(body: unknown, todayIso = kstToday()): JournalReportRequest | string {
  if (!body || typeof body !== "object") return "body";
  const b = body as Record<string, unknown>;
  const locale = b.locale === "ko" || b.locale === "en" || b.locale === "es" ? b.locale : null;
  if (!locale) return "locale";
  if (!(STEMS as readonly unknown[]).includes(b.selfDayMasterChar)) return "selfDayMasterChar";
  // Optional, like /api/dailyFortune; an unknown value would fail every day lookup, so it is dropped.
  const selfDayBranch = (BRANCHES as readonly unknown[]).includes(b.selfDayBranch) ? (b.selfDayBranch as string) : null;

  const month = typeof b.month === "string" ? b.month : "";
  const m = month.match(MONTH_RE);
  if (!m) return "month";
  const monthNum = Number(m[2]);
  if (monthNum < 1 || monthNum > 12) return "month";
  const thisMonth = todayIso.slice(0, 7);
  if (month > thisMonth) return "month";
  const [ty, tm] = thisMonth.split("-").map(Number);
  if ((ty - Number(m[1])) * 12 + (tm - monthNum) > MAX_MONTHS_BACK) return "month";

  if (!Array.isArray(b.entries)) return "entries";
  if (b.entries.length < MIN_JOURNAL_ENTRIES || b.entries.length > 31) return "entries";
  const seen = new Set<string>();
  const entries: JournalEntryInput[] = [];
  for (const raw of b.entries) {
    if (!raw || typeof raw !== "object") return "entry";
    const e = raw as Record<string, unknown>;
    const date = typeof e.date === "string" ? e.date : "";
    const d = date.match(DATE_RE);
    if (!d || date.slice(0, 7) !== month || date > todayIso || seen.has(date)) return "entry_date";
    const day = Number(d[3]);
    if (day < 1 || day > new Date(Number(d[1]), Number(d[2]), 0).getDate()) return "entry_date";
    if (!(JOURNAL_MOODS as readonly string[]).includes(e.mood as string)) return "entry_mood";
    let note: string | null = null;
    if (e.note != null) {
      if (typeof e.note !== "string") return "entry_note";
      const trimmed = e.note.replace(/\s+/g, " ").trim();
      if (trimmed.length > MAX_NOTE_LENGTH) return "entry_note";
      note = trimmed || null;
    }
    seen.add(date);
    entries.push({ date, mood: e.mood as JournalMood, note });
  }
  entries.sort((a, b2) => a.date.localeCompare(b2.date));
  return { locale, month, selfDayMasterChar: b.selfDayMasterChar as string, selfDayBranch, entries };
}

// ---- Crisis -------------------------------------------------------------------------------

// Self-harm and suicide wording in any of the three languages (people don't always write in the
// app's language). Kept narrow: a false positive only shows the help lines, but a broad list
// ("끝내고 싶다" = "want to finish work") would show them for ordinary days. The app has its own
// copy for the moment of writing (mobile/lib/journalStorage.ts) — keep the two in step.
export const JOURNAL_CRISIS_PATTERN =
  /죽고\s?싶|자살|자해|사라지고\s?싶|없어지고\s?싶|살고\s?싶지\s?않|그만\s?살고|\bkill (myself|me)\b|suicid|self[- ]?harm|hurt(ing)? myself|(want|wanna) to die|wanna die|end my life|end it all|(don'?t|do not) want to (live|be alive|wake up)|no reason to live|matarme|quitarme la vida|hacerme daño|autolesi|quiero morir|no quiero (vivir|despertar)|acabar con todo|no vale la pena vivir/i;

export function hasCrisisSignal(entries: JournalEntryInput[]): boolean {
  return entries.some((e) => !!e.note && JOURNAL_CRISIS_PATTERN.test(e.note));
}

// ---- Tallies --------------------------------------------------------------------------------

export interface JournalDay extends JournalEntryInput {
  relation: CompatRelation;
}

export interface RhythmTally {
  relation: CompatRelation;
  days: number;
  moods: Partial<Record<JournalMood, number>>;
}

export interface JournalTallies {
  total: number;
  withNotes: number;
  moods: Partial<Record<JournalMood, number>>;
  rhythms: RhythmTally[]; // most days first
}

export function tallyJournal(days: JournalDay[]): JournalTallies {
  const moods: Partial<Record<JournalMood, number>> = {};
  const byRhythm = new Map<CompatRelation, RhythmTally>();
  for (const d of days) {
    moods[d.mood] = (moods[d.mood] ?? 0) + 1;
    const t = byRhythm.get(d.relation) ?? { relation: d.relation, days: 0, moods: {} };
    t.days += 1;
    t.moods[d.mood] = (t.moods[d.mood] ?? 0) + 1;
    byRhythm.set(d.relation, t);
  }
  return {
    total: days.length,
    withNotes: days.filter((d) => d.note).length,
    moods,
    rhythms: Array.from(byRhythm.values()).sort((a, b) => b.days - a.days),
  };
}

/** Every count the tallies contain — the only numbers the text may quote. */
export function allowedNumbers(t: JournalTallies): Set<number> {
  const out = new Set<number>([t.total, t.withNotes, ...Object.values(t.moods).map(Number)]);
  for (const r of t.rhythms) {
    out.add(r.days);
    for (const n of Object.values(r.moods)) out.add(Number(n));
  }
  return out;
}

// ---- Names the model must use (same words as the app's fortune tabs) ---------------------------

// Copy of mobile/lib/i18n/*.ts fortune.rhythmNames — the report has to name a day the way the
// fortune screen does, or the observation can't be checked against the screen the user knows.
export const RHYTHM_NAMES: Record<Locale, Record<CompatRelation, string>> = {
  ko: { mirror: "나다운 리듬", selfNurturesOther: "베푸는 리듬", otherNurturesSelf: "받는 리듬", selfChallengesOther: "이끄는 리듬", otherChallengesSelf: "고르는 리듬" },
  en: { mirror: "Your own rhythm", selfNurturesOther: "A giving rhythm", otherNurturesSelf: "A receiving rhythm", selfChallengesOther: "A leading rhythm", otherChallengesSelf: "A pacing rhythm" },
  es: { mirror: "Tu propio ritmo", selfNurturesOther: "Un ritmo generoso", otherNurturesSelf: "Un ritmo receptivo", selfChallengesOther: "Un ritmo de iniciativa", otherChallengesSelf: "Un ritmo para ir con calma" },
};

// Copy of mobile/lib/i18n/*.ts journal.moods.
export const MOOD_NAMES: Record<Locale, Record<JournalMood, string>> = {
  ko: { light: "가벼움", calm: "차분함", buzzing: "들뜸", tense: "긴장", tired: "지침", heavy: "무거움" },
  en: { light: "Light", calm: "Calm", buzzing: "Buzzing", tense: "Tense", tired: "Tired", heavy: "Heavy" },
  es: { light: "Ligereza", calm: "Calma", buzzing: "Entusiasmo", tense: "Tensión", tired: "Cansancio", heavy: "Pesadez" },
};

// ---- Output ---------------------------------------------------------------------------------

export interface JournalReport {
  title: string;
  observations: string[]; // 3-5
  closing: string;
}

export class IncompleteJournalReport extends Error {}

function str(v: unknown, max = 600): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function parseJournalReport(raw: unknown): JournalReport {
  const p = (raw ?? {}) as Record<string, unknown>;
  const observations = (Array.isArray(p.observations) ? p.observations : []).map((o) => str(o)).filter(Boolean);
  const report: JournalReport = { title: str(p.title, 120), observations, closing: str(p.closing) };
  if (!report.title || !report.closing || observations.length < 3 || observations.length > 5) {
    throw new IncompleteJournalReport(`journal report incomplete (observations=${observations.length})`);
  }
  return report;
}

// Diagnosis and prescription voice, fate verdicts, and chart jargon (SPEC 8: "진단·처방 말투 없음").
const FORBIDDEN: Record<Locale, RegExp> = {
  ko: /우울증|불안장애|공황|트라우마|진단|치료|처방|병원|증상|장애|해야\s?(합니다|해요|한다)|하세요|불운|나쁜 날|흉한|일간|일진|천간|십성|운세가 나쁘/,
  en: /depress(ion|ive)|anxiety disorder|disorder|diagnos|therap|treatment|prescri|symptom|trauma|you should|you must|you need to|see a (doctor|professional)|unlucky|bad day|day master|heavenly stem|earthly branch/i,
  es: /depresi[oó]n|trastorno|diagn[oó]stic|terapia|tratamiento|s[ií]ntoma|trauma|deber[ií]as|tienes que|\bdebes\b|mala suerte|d[ií]a malo|maestro del d[ií]a|tronco celeste|rama terrestre/i,
};

/** String-level problems (each "path: issue", the shape lib/reportQuality.ts repairStringFindings reads). */
// Scripts that belong to none of our languages (a Cyrillic word slipped into Spanish output on
// 2026-10-06; checkLanguageSlips only looks for Korean in en/es).
const FOREIGN_SCRIPT = /[\u0370-\u03FF\u0400-\u04FF\u0590-\u06FF\u0E00-\u0E7F\u3040-\u30FF]/;

export function checkJournalReport(report: JournalReport, locale: Locale, numbers: Set<number>): string[] {
  const problems: string[] = [];
  const strings: [string, string][] = [
    ["title", report.title],
    ...report.observations.map((o, i): [string, string] => [`observations[${i}]`, o]),
    ["closing", report.closing],
  ];
  for (const [path, text] of strings) {
    const m = text.match(FORBIDDEN[locale]);
    if (m) problems.push(`${path}: 금지 표현 "${m[0]}" — 진단·처방·지시 말투나 운의 판정, 전문용어 없이 관찰한 사실과 부드러운 제안으로 다시 쓸 것`);
    const script = text.match(FOREIGN_SCRIPT);
    if (script) problems.push(`${path}: 다른 문자("${script[0]}")가 섞여 있음 — 출력 언어의 글자만으로 다시 쓸 것`);
    const wrong = Array.from(text.matchAll(/(\d{1,3})/g)).find((n) => !numbers.has(Number(n[1])));
    if (wrong) problems.push(`${path}: 기록 집계에 없는 숫자 "${wrong[0]}" — 그 숫자를 빼고 같은 뜻을 말로 쓸 것`);
  }
  return problems;
}
