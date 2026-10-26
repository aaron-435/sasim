// Read-only Reddit HTTP: pacing, daily cap, retries with RSS fallback. Never throws.
// Transport "direct" is cookie-less Node fetch. "aside" sends the same GET through the Aside browser
// (`aside repl` fetch carries the logged-in cookies), which Reddit answers with JSON instead of 403.
import { execFile } from "node:child_process";
import type { RedditConfig } from "./config.mts";
import type { DayCount } from "./state.mts";

export type Transport = "direct" | "aside";

export type FetchOk = { ok: true; format: "json"; data: unknown } | { ok: true; format: "rss"; xml: string };
// retryAfterMs: Reddit's Retry-After as sent (uncapped), so a later retry round can honor it.
export type FetchFail = { ok: false; reason: "cap" | "http" | "network"; status?: number; error?: string; retryAfterMs?: number };
export type FetchResult = FetchOk | FetchFail;

const TIMEOUT_MS = 20_000;
const MAX_RETRIES = 2;
const MAX_INLINE_WAIT_MS = 60_000;

export function baseUrl(): string {
  return (process.env.REDDIT_BASE_URL || "https://www.reddit.com").replace(/\/+$/, "");
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function retryAfterMs(header: string | null): number | null {
  const h = header?.trim();
  if (!h) return null;
  const s = Number(h);
  return Number.isFinite(s) && s > 0 ? s * 1000 : null;
}

type RawResponse = { status: number; retryAfter: string | null; text: string };

const ASIDE_MARK = "__ASIDE_RESULT__";
const ASIDE_TIMEOUT_MS = 90_000;

// Runs inside `aside repl`: GET only, then slims post listings to the fields collect.mts reads,
// so a 100-post page (~800 KB) fits through stdout.
function asideCode(url: string): string {
  return `
const asideRes = await fetch(${JSON.stringify(url)});
let asideText = await asideRes.text();
try {
  const j = JSON.parse(asideText);
  if (j && j.kind === "Listing" && Array.isArray(j.data?.children) && j.data.children.every((c) => c.kind === "t3")) {
    const keep = ["id", "subreddit", "title", "selftext", "author", "created_utc", "num_comments", "permalink", "url"];
    j.data.children = j.data.children.map((c) => ({ kind: c.kind, data: Object.fromEntries(keep.map((k) => [k, c.data?.[k]])) }));
    asideText = JSON.stringify(j);
  }
} catch {}
console.log(${JSON.stringify(ASIDE_MARK)} + JSON.stringify({ status: asideRes.status, retryAfter: asideRes.headers.get("retry-after"), text: asideText }));
`;
}

function asideGet(url: string): Promise<RawResponse> {
  return new Promise((resolve, reject) => {
    execFile("aside", ["repl", asideCode(url)], { timeout: ASIDE_TIMEOUT_MS, maxBuffer: 32 * 1024 * 1024 }, (err, stdout) => {
      const line = stdout?.split("\n").find((l) => l.startsWith(ASIDE_MARK));
      if (!line) return reject(new Error(err ? `aside: ${err.message.split("\n")[0]}` : "aside: no result line"));
      try {
        resolve(JSON.parse(line.slice(ASIDE_MARK.length)) as RawResponse);
      } catch {
        reject(new Error("aside: unreadable result line"));
      }
    });
  });
}

/** Logged-in username Aside's browser sends to Reddit, or null when Aside is down or logged out. */
export async function asideAccount(): Promise<string | null> {
  try {
    const r = await asideGet(baseUrl() + "/api/me.json");
    if (r.status !== 200) return null;
    const name = (JSON.parse(r.text) as { data?: { name?: unknown } })?.data?.name;
    return typeof name === "string" && name ? name : null;
  } catch {
    return null;
  }
}

function retryable(a: FetchResult): boolean {
  if (a.ok || a.reason === "cap") return false;
  if (a.reason === "network") return true;
  // 403 is a block, not a rate limit: waiting does not help, go straight to RSS.
  return a.status === 429 || (a.status !== undefined && a.status >= 500);
}

export class Fetcher {
  made = 0;
  private lastStart = 0;
  private ua: string;
  private config: RedditConfig;
  private today: DayCount;
  readonly transport: Transport;
  constructor(config: RedditConfig, today: DayCount, transport: Transport = "direct") {
    this.config = config;
    this.today = today;
    this.transport = transport;
    this.ua = `fatesaid-listening/0.1 (read-only digest; by /u/${config.account})`;
  }

  get capReached(): boolean {
    return this.today.count >= this.config.dailyRequestCap;
  }

  // Once JSON answers 403 in a run, later calls go straight to RSS instead of spending a request on a known block.
  private jsonBlocked = false;

  async get(path: string): Promise<FetchResult> {
    try {
      const rssPath = path.replace(".json", ".rss");
      if (!this.jsonBlocked || rssPath === path) {
        const r = await this.withRetry(path, false);
        if (r.ok || r.reason === "cap" || rssPath === path) return r;
        if (r.status === 403) this.jsonBlocked = true;
      }
      return await this.withRetry(rssPath, true);
    } catch (e) {
      return { ok: false, reason: "network", error: (e as Error).message };
    }
  }

  private async withRetry(path: string, rss: boolean): Promise<FetchResult> {
    let a = await this.once(path, rss);
    for (let i = 1; i <= MAX_RETRIES && retryable(a); i++) {
      const after = a.ok ? undefined : a.retryAfterMs;
      await sleep(after !== undefined ? Math.min(after, MAX_INLINE_WAIT_MS) : this.config.requestIntervalMs * 2 ** i);
      a = await this.once(path, rss);
    }
    return a;
  }

  private async once(path: string, rss: boolean): Promise<FetchResult> {
    if (this.today.count >= this.config.dailyRequestCap) return { ok: false, reason: "cap" };
    const wait = this.lastStart === 0 ? 0 : this.config.requestIntervalMs - (Date.now() - this.lastStart);
    if (wait > 0) await sleep(wait);
    this.lastStart = Date.now();
    this.today.count++;
    this.made++;
    try {
      let raw: RawResponse;
      if (this.transport === "aside") raw = await asideGet(baseUrl() + path);
      else {
        const res = await fetch(baseUrl() + path, {
          headers: { "User-Agent": this.ua, Accept: rss ? "application/atom+xml" : "application/json" },
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        raw = { status: res.status, retryAfter: res.headers.get("retry-after"), text: await res.text() };
      }
      if (raw.status < 200 || raw.status >= 300) {
        const fail: FetchFail = { ok: false, reason: "http", status: raw.status, error: `HTTP ${raw.status}` };
        if (raw.status === 429) {
          const ms = retryAfterMs(raw.retryAfter);
          if (ms !== null) fail.retryAfterMs = ms;
        }
        return fail;
      }
      if (rss) return { ok: true, format: "rss", xml: raw.text };
      try {
        return { ok: true, format: "json", data: JSON.parse(raw.text) };
      } catch {
        return { ok: false, reason: "http", status: raw.status, error: "invalid JSON body" };
      }
    } catch (e) {
      const err = e as Error;
      return { ok: false, reason: "network", error: err.name === "TimeoutError" ? "timeout" : err.message };
    }
  }
}
