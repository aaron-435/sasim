import AsyncStorage from "@react-native-async-storage/async-storage";

// Tracks whether the user has already "opened" today's daily fortune, plus a consecutive-
// day streak — added 2026-09-16 to turn FortuneScreen's daily tab from an instant info-dump
// into a once-a-day reveal ritual (see FortuneScreen.tsx's seal card). Keyed off the API's
// own `daily.date` (KST-anchored, from app/api/dailyFortune) rather than a client-computed
// "today", so there's no risk of the client and server disagreeing about which day it is.
const STORAGE_KEY = "fatesaid_fortune_open_state";

type OpenRecord = { lastOpenedDate: string; streak: number };

async function readRecord(): Promise<OpenRecord | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OpenRecord) : null;
  } catch {
    return null;
  }
}

/** Whole-day difference between two "YYYY-MM-DD" dates (b - a), assuming both are plain
 * calendar dates with no time component (matches daily.date's format). */
function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

export async function isFortuneOpened(dateIso: string): Promise<boolean> {
  const record = await readRecord();
  return record?.lastOpenedDate === dateIso;
}

/** The streak as of the last recorded open — if today hasn't been opened yet, this is
 * "the streak going into today" (e.g. still 2 after two prior consecutive days), which is
 * the more motivating number to show on the still-sealed card. */
export async function getFortuneStreak(): Promise<number> {
  const record = await readRecord();
  return record?.streak ?? 0;
}

/** Records today as opened and returns the resulting streak — 1 if this breaks a gap
 * (or is the first open ever), or the previous streak + 1 if yesterday was also opened. */
export async function markFortuneOpened(dateIso: string): Promise<number> {
  const record = await readRecord();
  const streak = record && daysBetween(record.lastOpenedDate, dateIso) === 1 ? record.streak + 1 : 1;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ lastOpenedDate: dateIso, streak } satisfies OpenRecord));
  } catch {
    // best-effort — worst case the streak doesn't persist, harmless
  }
  return streak;
}
