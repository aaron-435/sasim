// Read-only Reddit HTTP: pacing, daily cap, retries with RSS fallback. Never throws.
import type { RedditConfig } from "./config.mts";
import type { DayCount } from "./state.mts";

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

function retryAfterMs(res: Response): number | null {
  const h = res.headers.get("retry-after")?.trim();
  if (!h) return null;
  const s = Number(h);
  return Number.isFinite(s) && s > 0 ? s * 1000 : null;
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
  constructor(config: RedditConfig, today: DayCount) {
    this.config = config;
    this.today = today;
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
      const res = await fetch(baseUrl() + path, {
        headers: { "User-Agent": this.ua, Accept: rss ? "application/atom+xml" : "application/json" },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) {
        const fail: FetchFail = { ok: false, reason: "http", status: res.status, error: `HTTP ${res.status}` };
        if (res.status === 429) {
          const ms = retryAfterMs(res);
          if (ms !== null) fail.retryAfterMs = ms;
        }
        return fail;
      }
      if (rss) return { ok: true, format: "rss", xml: await res.text() };
      try {
        return { ok: true, format: "json", data: await res.json() };
      } catch {
        return { ok: false, reason: "http", status: res.status, error: "invalid JSON body" };
      }
    } catch (e) {
      const err = e as Error;
      return { ok: false, reason: "network", error: err.name === "TimeoutError" ? "timeout" : err.message };
    }
  }
}
