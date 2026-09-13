// A short "오늘의 한마디" tied to the user's dominant 오행 — deterministic and free
// (no GPT call): picks from a small pre-written bank per element, rotating by day of
// year so it changes daily without needing any network round trip or per-user storage.
// Pulls its text from the active locale's dictionary (dailyInsight namespace) so it
// translates along with everything else — see ko.ts/en.ts/es.ts.
import type { Dictionary } from "./dictionaries";

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDailyInsight(
  strings: Dictionary,
  dominantElement: string | null | undefined,
  date: Date = new Date(),
): string {
  const bank = (dominantElement && strings.dailyInsight[dominantElement as keyof typeof strings.dailyInsight]) || strings.dailyInsight.default;
  const index = dayOfYear(date) % bank.length;
  return bank[index];
}
