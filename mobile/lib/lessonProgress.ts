import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ArchetypeKey } from "./sajuType";
import { LESSON_COUNT } from "./dayMasterLessons";

// Device-only progress for "Your Day Master in 10 days" (dayMasterLessons.ts): how many
// lessons are read and on which local day the last one was read. One new lesson opens per
// calendar day; read lessons stay open to re-read. Keyed by archetype, so a different chart
// (after a data reset) starts over. Cleared by Settings' reset.

const STORAGE_KEY = "fatesaid_day_master_lessons";

export type LessonProgress = { archetype: ArchetypeKey; readCount: number; lastReadDate: string | null };

export function localDateKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function getLessonProgress(archetype: ArchetypeKey): Promise<LessonProgress> {
  const empty: LessonProgress = { archetype, readCount: 0, lastReadDate: null };
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<LessonProgress>;
    if (parsed.archetype !== archetype || typeof parsed.readCount !== "number") return empty;
    return {
      archetype,
      readCount: Math.max(0, Math.min(LESSON_COUNT, Math.floor(parsed.readCount))),
      lastReadDate: typeof parsed.lastReadDate === "string" ? parsed.lastReadDate : null,
    };
  } catch {
    return empty;
  }
}

/** The next unread lesson opens once the calendar day has changed since the last one. */
export function isNextLessonOpen(progress: LessonProgress, today = localDateKey()): boolean {
  return progress.readCount < LESSON_COUNT && progress.lastReadDate !== today;
}

/** Marks lesson `index` (0-based) read if it is the next one; re-reading changes nothing. */
export async function markLessonRead(progress: LessonProgress, index: number): Promise<LessonProgress> {
  if (index !== progress.readCount || !isNextLessonOpen(progress)) return progress;
  const next: LessonProgress = { ...progress, readCount: progress.readCount + 1, lastReadDate: localDateKey() };
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // best-effort
  }
  return next;
}

export async function clearLessonProgress(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort
  }
}
