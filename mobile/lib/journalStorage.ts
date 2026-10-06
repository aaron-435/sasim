import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Locale } from "./i18n/types";

// "오늘 한 줄" — one mood + an optional line per day, kept only on this device (2026-10-06).
// Keyed by the fortune's own date (daily.date from /api/dailyFortune, KST — the same key as
// lib/fortuneOpenState.ts), so the server can cross each entry with that day's rhythm. The
// month-end pattern report (/api/journalReport) receives one month of entries, stores nothing,
// and the result is saved here per month and language.
const ENTRIES_KEY = "fatesaid_journal_entries";
const REPORTS_KEY = "fatesaid_journal_reports";

// Same keys and order as lib/journal.ts JOURNAL_MOODS at the repo root.
export const JOURNAL_MOODS = ["light", "calm", "buzzing", "tense", "tired", "heavy"] as const;
export type JournalMood = (typeof JOURNAL_MOODS)[number];

export const MIN_REPORT_ENTRIES = 10;
export const MAX_NOTE_LENGTH = 100;

export interface JournalEntry {
  mood: JournalMood;
  note: string | null;
  savedAt: string;
}

export interface JournalReport {
  title: string;
  observations: string[];
  closing: string;
}

/** A saved month: either the pattern report, or the help-lines card when an entry held a crisis line. */
export interface SavedJournalReport {
  month: string; // YYYY-MM
  entryCount: number; // entries the report was made from — a later, larger month can be re-read
  createdAt: string;
  report: JournalReport | null;
  safety: boolean;
}

// Copy of lib/journal.ts JOURNAL_CRISIS_PATTERN — checked on the device when a line is saved so the
// help lines show at that moment, not only at month end. Keep the two in step.
const CRISIS_PATTERN =
  /죽고\s?싶|자살|자해|사라지고\s?싶|없어지고\s?싶|살고\s?싶지\s?않|그만\s?살고|\bkill (myself|me)\b|suicid|self[- ]?harm|hurt(ing)? myself|(want|wanna) to die|wanna die|end my life|end it all|(don'?t|do not) want to (live|be alive|wake up)|no reason to live|matarme|quitarme la vida|hacerme daño|autolesi|quiero morir|no quiero (vivir|despertar)|acabar con todo|no vale la pena vivir/i;

export function hasCrisisSignal(text: string | null | undefined): boolean {
  return !!text && CRISIS_PATTERN.test(text);
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // best-effort — the entry still shows this session
  }
}

export function getJournalEntries(): Promise<Record<string, JournalEntry>> {
  return readJson<Record<string, JournalEntry>>(ENTRIES_KEY, {});
}

export async function getJournalEntry(dateIso: string): Promise<JournalEntry | null> {
  return (await getJournalEntries())[dateIso] ?? null;
}

export async function saveJournalEntry(dateIso: string, mood: JournalMood, note: string | null): Promise<JournalEntry> {
  const all = await getJournalEntries();
  const trimmed = note?.replace(/\s+/g, " ").trim().slice(0, MAX_NOTE_LENGTH) || null;
  const entry: JournalEntry = { mood, note: trimmed, savedAt: new Date().toISOString() };
  all[dateIso] = entry;
  await writeJson(ENTRIES_KEY, all);
  return entry;
}

/** One month's entries, oldest first. */
export function entriesForMonth(all: Record<string, JournalEntry>, month: string): { date: string; entry: JournalEntry }[] {
  return Object.keys(all)
    .filter((date) => date.startsWith(`${month}-`))
    .sort()
    .map((date) => ({ date, entry: all[date] }));
}

const reportKey = (month: string, locale: Locale) => `${month}_${locale}`;

export async function getSavedJournalReport(month: string, locale: Locale): Promise<SavedJournalReport | null> {
  const all = await readJson<Record<string, SavedJournalReport>>(REPORTS_KEY, {});
  return all[reportKey(month, locale)] ?? null;
}

export async function saveJournalReport(locale: Locale, saved: SavedJournalReport): Promise<void> {
  const all = await readJson<Record<string, SavedJournalReport>>(REPORTS_KEY, {});
  all[reportKey(saved.month, locale)] = saved;
  await writeJson(REPORTS_KEY, all);
}

export async function clearJournal(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([ENTRIES_KEY, REPORTS_KEY]);
  } catch {
    // best-effort
  }
}
