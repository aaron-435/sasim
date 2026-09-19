import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Locale } from "./i18n/types";

// The year-ahead report, kept on the device once generated (same reasoning as
// lib/reportStorage.ts: the report is a paid, GPT-generated artifact — it must survive
// leaving the screen). One per year and language; regenerating replaces it.
const STORAGE_KEY = "fatesaid_year_reports";

export interface YearReportContent {
  year: number;
  title: string;
  subtitle: string;
  overview: string;
  chapters: {
    wealth: { heading: string; body: string };
    love: { heading: string; body: string };
    career: { heading: string; body: string };
    study: { heading: string; body: string };
    health: { heading: string; body: string };
  };
  months: { headline: string; body: string }[];
  action_plan: { title: string; body: string }[];
  closing: string;
}

interface Saved {
  savedAt: string;
  content: YearReportContent;
}

const keyFor = (year: number, locale: Locale) => `${year}_${locale}`;

async function readAll(): Promise<Record<string, Saved>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Saved>) : {};
  } catch {
    return {};
  }
}

export async function getSavedYearReport(year: number, locale: Locale): Promise<YearReportContent | null> {
  return (await readAll())[keyFor(year, locale)]?.content ?? null;
}

export async function saveYearReport(locale: Locale, content: YearReportContent): Promise<void> {
  const all = await readAll();
  all[keyFor(content.year, locale)] = { savedAt: new Date().toISOString(), content };
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // best-effort — the report still shows this session
  }
}

export async function clearSavedYearReports(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort
  }
}
