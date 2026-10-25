// Digest state on disk: seen post ids and today's request count. Corrupt files warn once, never throw.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const DEFAULT_STATE_DIR = fileURLToPath(new URL("../../marketing/reddit/state/", import.meta.url));

export type SeenMap = Record<string, string>;
export type DayCount = { date: string; count: number };

const SEEN_TTL_MS = 14 * 24 * 3600 * 1000;

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function readJson(path: string): unknown | undefined {
  if (!existsSync(path)) return undefined;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    console.warn(`state: ${path} is unreadable, starting fresh`);
    return undefined;
  }
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + "\n");
}

export function loadSeen(dir = DEFAULT_STATE_DIR): SeenMap {
  const raw = readJson(join(dir, "seen.json"));
  if (raw === undefined) return {};
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    console.warn(`state: seen.json has a bad shape, starting fresh`);
    return {};
  }
  const out: SeenMap = {};
  for (const [k, v] of Object.entries(raw)) if (typeof v === "string") out[k] = v;
  return out;
}

export function saveSeen(seen: SeenMap, dir = DEFAULT_STATE_DIR): void {
  const now = Date.now();
  const kept: SeenMap = {};
  for (const [k, v] of Object.entries(seen)) {
    const t = Date.parse(v);
    if (Number.isFinite(t) && now - t < SEEN_TTL_MS) kept[k] = v;
  }
  writeJson(join(dir, "seen.json"), kept);
}

export function loadRequests(dir = DEFAULT_STATE_DIR): DayCount {
  const today = todayLocal();
  const raw = readJson(join(dir, "requests.json"));
  if (
    typeof raw !== "object" || raw === null || Array.isArray(raw) ||
    (raw as { date?: unknown }).date !== today ||
    typeof (raw as { count?: unknown }).count !== "number" ||
    !Number.isInteger((raw as { count: number }).count) || (raw as { count: number }).count < 0
  ) {
    if (raw !== undefined) console.warn(`state: requests.json is stale or broken, resetting to 0`);
    return { date: today, count: 0 };
  }
  return { date: today, count: (raw as { count: number }).count };
}

export function saveRequests(today: DayCount, dir = DEFAULT_STATE_DIR): void {
  writeJson(join(dir, "requests.json"), today);
}
