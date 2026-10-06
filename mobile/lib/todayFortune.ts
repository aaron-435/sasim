import { API_BASE_URL } from "../config";
import type { CompatibilityResult } from "./compatibility";
import { elementsParam, type ElementColor } from "./elementColorContent";

// Today's fortune for Home's hero card (2026-09-19 Home redesign). Same endpoint and
// shape as FortuneScreen's daily tab. Cached in memory for the app session, keyed on the
// reading and the local date, so returning to Home from another screen doesn't refetch.
export type TodayFortune = {
  date: string;
  dayMaster: { char: string; element: string; pillarIndex: number; branch: string };
  compatibility: CompatibilityResult | null;
  /** Present when the chart's element shares were sent (2026-10-06). */
  elementColor?: ElementColor;
};

let cache: { key: string; promise: Promise<TodayFortune | null> } | null = null;

function localDateKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function fetchTodayFortune(
  selfDayMasterChar: string,
  selfDayBranch: string | null,
  elements?: Record<string, number> | null
): Promise<TodayFortune | null> {
  const elementsValue = elementsParam(elements);
  const key = `${selfDayMasterChar}|${selfDayBranch ?? ""}|${elementsValue ?? ""}|${localDateKey()}`;
  if (cache?.key === key) return cache.promise;

  const params = new URLSearchParams({ selfDayMasterChar, mode: "daily" });
  if (selfDayBranch) params.set("selfDayBranch", selfDayBranch);
  if (elementsValue) params.set("elements", elementsValue);
  const promise = fetch(`${API_BASE_URL}/api/dailyFortune?${params.toString()}`)
    .then(async (res) => {
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "failed");
      return (json.daily as TodayFortune) ?? null;
    })
    .catch(() => {
      // Don't keep a failure cached — the next visit to Home should retry.
      if (cache?.key === key) cache = null;
      return null;
    });
  cache = { key, promise };
  return promise;
}
