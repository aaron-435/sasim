import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import type { Locale } from "../lib/i18n/types";

// Persona-analysis test mode — DEV ONLY.
//
// Lets a reviewer (or an AI persona driving the mobile-web preview) see the paid parts of the
// app — subscriber tabs, the deep report, the year report — without buying anything, without
// paid GPT calls, and without touching production data. See dev/README.md.
//
// Why this is safe to keep in the repo:
//   1. Everything is behind `__DEV__ && Platform.OS === "web"`. In release and OTA bundles
//      `__DEV__` is false, so getQaMode() returns null before reading anything, and the data
//      file is only ever `require`d inside an `if (__DEV__)` block that Metro strips.
//   2. It is opt-in: it does nothing unless the URL carries `?qa=free|pro|all` (remembered in
//      localStorage until `?qa=off`).
//   3. It only changes what the CLIENT believes. The server still verifies purchases itself
//      (lib/revenuecat.ts), so nothing paid can be pulled from it.
//   4. There is no entry to it in the UI of a real build, and native platforms are excluded.

export type QaLevel = "free" | "pro" | "all";
export interface QaMode {
  level: QaLevel;
  persona: string | null;
}

const KEY = "fatesaid_qa_mode";
let cached: QaMode | null | undefined;

/** Reads (and remembers) the mode. Null everywhere except an opted-in dev web session. */
export function getQaMode(): QaMode | null {
  if (!__DEV__ || Platform.OS !== "web") return null;
  if (cached !== undefined) return cached;
  cached = null;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("qa");
    if (fromUrl === "off") {
      window.localStorage.removeItem(KEY);
    } else if (fromUrl === "free" || fromUrl === "pro" || fromUrl === "all") {
      window.localStorage.setItem(KEY, fromUrl);
    }
    const level = window.localStorage.getItem(KEY);
    if (level === "free" || level === "pro" || level === "all") {
      cached = { level, persona: params.get("persona") };
    }
  } catch {
    cached = null;
  }
  return cached;
}

/** Subscriber (Pro) access as the client sees it. */
export function qaHasSubscription(): boolean {
  const mode = getQaMode();
  return !!mode && (mode.level === "pro" || mode.level === "all");
}

/** Every one-time purchase (deep reports, the year report) as the client sees it. */
export function qaHasAllPurchases(): boolean {
  return getQaMode()?.level === "all";
}

// The data file is loaded here, and only here, behind the __DEV__ guard.
type QaData = typeof import("./qaData");
function loadData(): QaData | null {
  if (__DEV__) {
    return require("./qaData") as QaData;
  }
  return null;
}

/** Applies `?persona=<key>` (a preset saju reading, concern and language) and `?lang=`. */
export async function applyQaPreset(): Promise<void> {
  const mode = getQaMode();
  if (!mode) return;
  const data = loadData();
  if (!data) return;
  try {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    const persona = mode.persona ? data.QA_PERSONAS[mode.persona] : null;
    const locale = (lang === "ko" || lang === "en" || lang === "es" ? lang : persona?.locale) as Locale | undefined;
    if (locale) await AsyncStorage.setItem("fatesaid_locale", locale);
    if (persona) {
      await AsyncStorage.setItem("fatesaid_home_data", JSON.stringify({ nickname: persona.nickname, sajuResult: persona.sajuResult }));
      await AsyncStorage.setItem("fatesaid_user_concern", persona.concern);
      // A fresh persona starts with a fresh daily ritual and no leftover saved reports.
      await AsyncStorage.multiRemove(["fatesaid_fortune_open_state", "fatesaid_saved_reports", "fatesaid_year_reports"]);
    }
  } catch {
    // best-effort
  }
}

export function qaPersonaKeys(): string[] {
  return Object.keys(loadData()?.QA_PERSONAS ?? {});
}

// Fixtures are generated per persona (see qaData.ts). With `?persona=` the persona's own report is
// used; without one (or with a `?lang=` override) the first persona speaking that language stands
// in, and its name is swapped for the active nickname so the report still reads as theirs.
function renameIn<T>(value: T, from: string, to: string | undefined): T {
  if (!to || to === from) return value;
  return JSON.parse(JSON.stringify(value).split(from).join(to.replace(/["\\]/g, ""))) as T;
}

function pickFixture<T>(table: Record<string, T>, locale: Locale, nickname?: string): T | null {
  const data = loadData();
  const mode = getQaMode();
  if (!data || !mode) return null;
  const own = mode.persona && data.QA_PERSONAS[mode.persona]?.locale === locale ? mode.persona : null;
  const key = own ?? Object.keys(table).find((k) => data.QA_PERSONAS[k]?.locale === locale);
  if (!key || !table[key]) return null;
  return own ? table[key] : renameIn(table[key], data.QA_PERSONAS[key].nickname, nickname);
}

/** A generated year-ahead report in LANG=""
LC_COLLATE="C"
LC_CTYPE="C"
LC_MESSAGES="C"
LC_MONETARY="C"
LC_NUMERIC="C"
LC_TIME="C"
LC_ALL=, or null when the mode is off. */
export function qaYearReport(locale: Locale, nickname?: string): unknown | null {
  return pickFixture(loadData()?.QA_YEAR_REPORT ?? {}, locale, nickname);
}

/** A generated deep report with the diagnosis and chat it was written from. `v2` picks the
 * 5-set chat flow report (test × conversation cards); those exist for ko and es only. */
export function qaDeepReport(
  locale: Locale,
  nickname?: string,
  v2 = false
): { content: unknown; quizDiagnosis: unknown; chatExtract: unknown } | null {
  const data = loadData();
  return pickFixture((v2 ? data?.QA_DEEP_REPORT_V2 : data?.QA_DEEP_REPORT) ?? {}, locale, nickname);
}

/** `?offer=annual|trial|both` — DEV web only. Shows what the subscription paywall looks like
 * once the dashboard has an annual package and/or a free trial, with made-up store prices.
 * Display only: buying still goes through lib/purchases.ts, which has no store on web. */
export type QaOfferMock = "annual" | "trial" | "both";
export function qaOfferMock(): QaOfferMock | null {
  if (!getQaMode()) return null;
  try {
    const offer = new URLSearchParams(window.location.search).get("offer");
    return offer === "annual" || offer === "trial" || offer === "both" ? offer : null;
  } catch {
    return null;
  }
}

/** `?date=YYYY-MM-DD` — DEV web only. Pretends the device date is that day (noon, local) for
 * features gated on the calendar, today only Year Wrapped's December–January window
 * (lib/wrapped.ts). Null in every real build and without the QA mode. */
export function qaDateOverride(): Date | null {
  if (!getQaMode()) return null;
  try {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(new URLSearchParams(window.location.search).get("date") ?? "");
    if (!m) return null;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}
