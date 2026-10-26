// Loads marketing/reddit/config.json and checks its shape by hand (no schema dependency).
// Throws ConfigError naming the first bad key, e.g. "subreddits[2].weight".
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const DEFAULT_CONFIG_PATH = fileURLToPath(new URL("../../marketing/reddit/config.json", import.meta.url));

export type SubredditMeta = { name: string; weight: number; linksAllowed: boolean; aiBanned: boolean; promoRule: string };
export type Competitor = { name: string; aliases: string[]; domains: string[]; accounts: string[]; subreddits: string[] };
export type ScoringAgeConfig = { fullHours: number; fadeHours: number; fadeTo: number; after: number; unknown: number };
export type CommentBand = { upTo: number; factor: number };
export type ScoringCommentsConfig = { bands: CommentBand[]; over: number };
export type ScoringConfig = {
  keywordPoints: number;
  keywordMaxPoints: number;
  auxPoints: number;
  birthDatePoints: number;
  birthTimePoints: number;
  watchedPoints: number;
  questionPoints: number;
  age: ScoringAgeConfig;
  comments: ScoringCommentsConfig;
  contextKeywords: string[];
  contextWords: string[];
  profileMultiplier: number;
};
export type RedditConfig = {
  subreddits: SubredditMeta[];
  keywords: string[];
  auxKeywords: string[];
  competitors: Competitor[];
  account: string;
  topN: number;
  requestIntervalMs: number;
  dailyRequestCap: number;
  scoring: ScoringConfig;
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
    return {
      name: str(c, "name", `${p}.name`),
      aliases: strArr(c, "aliases", `${p}.aliases`, true),
      domains: strArr(c, "domains", `${p}.domains`, true),
      accounts: strArr(c, "accounts", `${p}.accounts`, true),
      subreddits: strArr(c, "subreddits", `${p}.subreddits`, true),
    };
  });
  const names = new Set<string>();
  subreddits.forEach((s, i) => {
    const k = s.name.toLowerCase();
    if (names.has(k)) throw new ConfigError(`subreddits[${i}].name`, `duplicates "${s.name}"`);
    names.add(k);
  });
  const scoringRaw = raw["scoring"];
  if (scoringRaw === undefined) throw new ConfigError("scoring", "is missing");
  if (!isObj(scoringRaw)) throw new ConfigError("scoring", "must be an object");
  const ageRaw = scoringRaw["age"];
  if (ageRaw === undefined) throw new ConfigError("scoring.age", "is missing");
  if (!isObj(ageRaw)) throw new ConfigError("scoring.age", "must be an object");
  const fullHours = num(ageRaw, "fullHours", "scoring.age.fullHours", 0);
  const fadeHours = num(ageRaw, "fadeHours", "scoring.age.fadeHours", 0);
  if (fadeHours < fullHours) throw new ConfigError("scoring.age.fadeHours", "must be >= scoring.age.fullHours");
  const commentsRaw = scoringRaw["comments"];
  if (commentsRaw === undefined) throw new ConfigError("scoring.comments", "is missing");
  if (!isObj(commentsRaw)) throw new ConfigError("scoring.comments", "must be an object");
  const bands = arr(commentsRaw, "bands", "scoring.comments.bands", false).map((b, i) => {
    const p = `scoring.comments.bands[${i}]`;
    if (!isObj(b)) throw new ConfigError(p, "must be an object");
    return { upTo: num(b, "upTo", `${p}.upTo`, 0), factor: num(b, "factor", `${p}.factor`, 0) };
  });
  for (let i = 1; i < bands.length; i++) {
    if (bands[i].upTo <= bands[i - 1].upTo) throw new ConfigError(`scoring.comments.bands[${i}].upTo`, `must be greater than scoring.comments.bands[${i - 1}].upTo`);
  }
  const scoring: ScoringConfig = {
    keywordPoints: num(scoringRaw, "keywordPoints", "scoring.keywordPoints", 0),
    keywordMaxPoints: num(scoringRaw, "keywordMaxPoints", "scoring.keywordMaxPoints", 0),
    auxPoints: num(scoringRaw, "auxPoints", "scoring.auxPoints", 0),
    birthDatePoints: num(scoringRaw, "birthDatePoints", "scoring.birthDatePoints", 0),
    birthTimePoints: num(scoringRaw, "birthTimePoints", "scoring.birthTimePoints", 0),
    watchedPoints: num(scoringRaw, "watchedPoints", "scoring.watchedPoints", 0),
    questionPoints: num(scoringRaw, "questionPoints", "scoring.questionPoints", 0),
    age: {
      fullHours,
      fadeHours,
      fadeTo: num(ageRaw, "fadeTo", "scoring.age.fadeTo", 0),
      after: num(ageRaw, "after", "scoring.age.after", 0),
      unknown: num(ageRaw, "unknown", "scoring.age.unknown", 0),
    },
    comments: { bands, over: num(commentsRaw, "over", "scoring.comments.over", 0) },
    contextKeywords: strArr(scoringRaw, "contextKeywords", "scoring.contextKeywords", true),
    contextWords: strArr(scoringRaw, "contextWords", "scoring.contextWords", true),
    profileMultiplier: num(scoringRaw, "profileMultiplier", "scoring.profileMultiplier", 0),
  };
  return {
    subreddits,
    keywords: strArr(raw, "keywords", "keywords", false),
    auxKeywords: strArr(raw, "auxKeywords", "auxKeywords", true),
    competitors,
    account: str(raw, "account", "account"),
    topN: num(raw, "topN", "topN", 1),
    requestIntervalMs: num(raw, "requestIntervalMs", "requestIntervalMs", 3000),
    dailyRequestCap: num(raw, "dailyRequestCap", "dailyRequestCap", 1),
    scoring,
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
