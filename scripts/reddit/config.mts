// Loads marketing/reddit/config.json and checks its shape by hand (no schema dependency).
// Throws ConfigError naming the first bad key, e.g. "subreddits[2].weight".
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const DEFAULT_CONFIG_PATH = fileURLToPath(new URL("../../marketing/reddit/config.json", import.meta.url));

export type SubredditMeta = { name: string; weight: number; linksAllowed: boolean; aiBanned: boolean; promoRule: string };
export type Competitor = { name: string; aliases: string[]; domains: string[] };
export type RedditConfig = {
  subreddits: SubredditMeta[];
  keywords: string[];
  auxKeywords: string[];
  competitors: Competitor[];
  account: string;
  topN: number;
  requestIntervalMs: number;
  dailyRequestCap: number;
};

export class ConfigError extends Error {
  constructor(public key: string, detail: string) {
    super(`config: "${key}" ${detail}`);
  }
}

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

function str(o: Obj, k: string, path: string): string {
  const v = o[k];
  if (v === undefined) throw new ConfigError(path, "is missing");
  if (typeof v !== "string" || !v.trim()) throw new ConfigError(path, "must be a non-empty string");
  return v;
}
function num(o: Obj, k: string, path: string, min: number): number {
  const v = o[k];
  if (v === undefined) throw new ConfigError(path, "is missing");
  if (typeof v !== "number" || !Number.isFinite(v) || v < min) throw new ConfigError(path, `must be a number >= ${min}`);
  return v;
}
function bool(o: Obj, k: string, path: string): boolean {
  const v = o[k];
  if (v === undefined) throw new ConfigError(path, "is missing");
  if (typeof v !== "boolean") throw new ConfigError(path, "must be true or false");
  return v;
}
function arr(o: Obj, k: string, path: string, allowEmpty: boolean): unknown[] {
  const v = o[k];
  if (v === undefined) throw new ConfigError(path, "is missing");
  if (!Array.isArray(v)) throw new ConfigError(path, "must be an array");
  if (!allowEmpty && v.length === 0) throw new ConfigError(path, "must not be empty");
  return v;
}
function strArr(o: Obj, k: string, path: string, allowEmpty: boolean): string[] {
  return arr(o, k, path, allowEmpty).map((v, i) => {
    if (typeof v !== "string" || !v.trim()) throw new ConfigError(`${path}[${i}]`, "must be a non-empty string");
    return v;
  });
}

export function parseConfig(raw: unknown): RedditConfig {
  if (!isObj(raw)) throw new ConfigError("(root)", "must be an object");
  const subreddits = arr(raw, "subreddits", "subreddits", false).map((s, i) => {
    const p = `subreddits[${i}]`;
    if (!isObj(s)) throw new ConfigError(p, "must be an object");
    return {
      name: str(s, "name", `${p}.name`),
      weight: num(s, "weight", `${p}.weight`, 0),
      linksAllowed: bool(s, "linksAllowed", `${p}.linksAllowed`),
      aiBanned: bool(s, "aiBanned", `${p}.aiBanned`),
      promoRule: str(s, "promoRule", `${p}.promoRule`),
    };
  });
  const competitors = arr(raw, "competitors", "competitors", true).map((c, i) => {
    const p = `competitors[${i}]`;
    if (!isObj(c)) throw new ConfigError(p, "must be an object");
    return { name: str(c, "name", `${p}.name`), aliases: strArr(c, "aliases", `${p}.aliases`, true), domains: strArr(c, "domains", `${p}.domains`, true) };
  });
  const names = new Set<string>();
  subreddits.forEach((s, i) => {
    const k = s.name.toLowerCase();
    if (names.has(k)) throw new ConfigError(`subreddits[${i}].name`, `duplicates "${s.name}"`);
    names.add(k);
  });
  return {
    subreddits,
    keywords: strArr(raw, "keywords", "keywords", false),
    auxKeywords: strArr(raw, "auxKeywords", "auxKeywords", true),
    competitors,
    account: str(raw, "account", "account"),
    topN: num(raw, "topN", "topN", 1),
    requestIntervalMs: num(raw, "requestIntervalMs", "requestIntervalMs", 3000),
    dailyRequestCap: num(raw, "dailyRequestCap", "dailyRequestCap", 1),
  };
}

export function loadConfig(path = DEFAULT_CONFIG_PATH): RedditConfig {
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    throw new ConfigError("(file)", `could not be read as JSON: ${(e as Error).message}`);
  }
  return parseConfig(raw);
}
