// Collects fresh posts from watched subreddits and keyword search. Reads seen, never writes it.
import type { RedditConfig } from "./config.mts";
import { termRe } from "./competitors.mts";
import type { Fetcher, FetchFail, FetchResult } from "./fetch.mts";
import type { SeenMap } from "./state.mts";

export type RedditPost = {
  id: string;
  subreddit: string;
  title: string;
  body: string;
  author: string;
  createdUtc: number;
  numComments: number | null;
  permalink: string;
  url: string;
  sources: string[];
};

export type SourceStat = {
  source: string;
  fetched: number;
  fresh: number;
  failed: null | { reason: string; status?: number; error?: string };
  format: "json" | "rss" | null;
  // 0 = first pass, n = got it in retry round n. On failure: the last round tried.
  round: number;
  // Why retries stopped early (daily cap), if they did.
  note?: string;
};

export type CollectResult = { posts: RedditPost[]; stats: SourceStat[]; requests: number };

export type CollectOptions = { sleep?: (ms: number) => Promise<void>; log?: (line: string) => void };

type Bare = Omit<RedditPost, "sources">;

const HOST = "https://www.reddit.com";
const has = (seen: SeenMap, id: string) => Object.prototype.hasOwnProperty.call(seen, id);
const str = (v: unknown) => (typeof v === "string" ? v : "");
const fullPermalink = (p: string) => (p ? HOST + (p.startsWith("/") ? p : `/${p}`) : HOST);

function normalizeJson(data: unknown): Bare[] {
  const children = (data as { data?: { children?: unknown[] } } | null)?.data?.children;
  if (!Array.isArray(children)) return [];
  const out: Bare[] = [];
  for (const c of children) {
    const item = c as { kind?: unknown; data?: Record<string, unknown> } | null;
    if (!item || item.kind !== "t3" || !item.data || typeof item.data !== "object") continue;
    const p = item.data;
    if (typeof p.id !== "string" || !p.id) continue;
    const permalink = fullPermalink(str(p.permalink));
    out.push({
      id: p.id,
      subreddit: str(p.subreddit),
      title: str(p.title),
      body: str(p.selftext),
      author: str(p.author),
      createdUtc: typeof p.created_utc === "number" && Number.isFinite(p.created_utc) ? Math.floor(p.created_utc) : 0,
      numComments: typeof p.num_comments === "number" && Number.isFinite(p.num_comments) ? p.num_comments : 0,
      permalink,
      url: str(p.url) || permalink,
    });
  }
  return out;
}

const NAMED: Record<string, string> = { lt: "<", gt: ">", quot: '"', apos: "'", amp: "&" };
export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (m, e: string) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) && n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : m;
    }
    return NAMED[e] ?? m;
  });
}

function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return m ? decodeEntities(m[1].trim()) : "";
}

export function normalizeRss(xml: string): Bare[] {
  const out: Bare[] = [];
  for (const entry of xml.match(/<entry[\s>][\s\S]*?<\/entry>/g) ?? []) {
    const id = tag(entry, "id").replace(/^t3_/, "");
    if (!id) continue;
    const link = entry.match(/<link[^>]*href="([^"]+)"/)?.[1] ?? "";
    const permalink = link.startsWith("http") ? link : fullPermalink(link);
    const t = Date.parse(tag(entry, "published") || tag(entry, "updated"));
    out.push({
      id,
      subreddit: entry.match(/<category[^>]*term="([^"]+)"/)?.[1] ?? "",
      title: decodeEntities(tag(entry, "title").replace(/<[^>]*>/g, "")),
      body: decodeEntities(tag(entry, "content").replace(/<[^>]*>/g, "")),
      author: tag(entry.match(/<author[\s>][\s\S]*?<\/author>/)?.[0] ?? "", "name").replace(/^\/u\//, ""),
      createdUtc: Number.isFinite(t) ? Math.floor(t / 1000) : 0,
      numComments: null,
      permalink,
      url: permalink,
    });
  }
  return out;
}

// Several sources share one request. `sources` lists them in stat order; `attribute` says which ones a post belongs to.
type Group = { label: string; path: string; sources: string[]; attribute: (p: Bare) => string[] };

// Reddit caps q at 512; stay well under so OR chains survive URL encoding and RSS.
const MAX_QUERY = 200;

export function chunkQuery(terms: string[], max = MAX_QUERY): string[][] {
  const chunks: string[][] = [];
  let cur: string[] = [];
  for (const t of terms) {
    if (cur.length > 0 && [...cur, t].join(" OR ").length > max) {
      chunks.push(cur);
      cur = [];
    }
    cur.push(t);
  }
  if (cur.length > 0) chunks.push(cur);
  return chunks;
}

const unquote = (k: string) => k.replace(/^"|"$/g, "");
const searchPath = (terms: string[]) => `/search.json?q=${encodeURIComponent(terms.join(" OR "))}&sort=new&t=week&limit=100&raw_json=1`;
const matchAny = (terms: string[], texts: string[]) =>
  terms.map(termRe).some((re) => re !== null && texts.some((t) => re.test(t)));

export function buildGroups(config: RedditConfig): Group[] {
  const separate = new Set(config.separateSubreddits.map((n) => n.toLowerCase()));
  const merged = config.subreddits.filter((s) => !separate.has(s.name.toLowerCase()));
  const groups: Group[] = [];
  if (merged.length > 0) {
    const byLower = new Map(merged.map((s) => [s.name.toLowerCase(), `sub:${s.name}`]));
    groups.push({
      label: merged.length > 1 ? "subs" : `sub:${merged[0].name}`,
      path: `/r/${merged.map((s) => s.name).join("+")}/new.json?limit=100&raw_json=1`,
      sources: merged.map((s) => `sub:${s.name}`),
      attribute: (p) => {
        const src = byLower.get(p.subreddit.toLowerCase());
        return src ? [src] : [];
      },
    });
  }
  for (const s of config.subreddits.filter((s) => separate.has(s.name.toLowerCase()))) {
    groups.push({ label: `sub:${s.name}`, path: `/r/${s.name}/new.json?limit=50&raw_json=1`, sources: [`sub:${s.name}`], attribute: () => [`sub:${s.name}`] });
  }
  chunkQuery(config.keywords).forEach((chunk, i, all) => {
    groups.push({
      label: all.length > 1 ? `keywords ${i + 1}/${all.length}` : "keywords",
      path: searchPath(chunk),
      sources: chunk.map((k) => `kw:${k}`),
      attribute: (p) => chunk.filter((k) => matchAny([unquote(k)], [p.title, p.body])).map((k) => `kw:${k}`),
    });
  });
  const comps = config.competitors;
  chunkQuery(comps.map((c) => `"${c.name}"`)).forEach((chunk, i, all) => {
    const members = comps.filter((c) => chunk.includes(`"${c.name}"`));
    groups.push({
      label: all.length > 1 ? `competitors ${i + 1}/${all.length}` : "competitors",
      path: searchPath(chunk),
      sources: members.map((c) => `comp:${c.name}`),
      attribute: (p) => members.filter((c) => matchAny([c.name, ...c.aliases, ...c.domains], [p.title, p.body, p.url])).map((c) => `comp:${c.name}`),
    });
  });
  return groups;
}

type FetcherLike = Pick<Fetcher, "get" | "made" | "capReached">;
const realSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const failOf = (f: FetchFail): NonNullable<SourceStat["failed"]> => ({
  reason: f.reason,
  ...(f.status !== undefined ? { status: f.status } : {}),
  ...(f.error ? { error: f.error } : {}),
});

// One pass over every group, then up to config.retryRounds more passes over the failed ones after a cooldown.
export async function collect(config: RedditConfig, fetcher: FetcherLike, seen: SeenMap, opts: CollectOptions = {}): Promise<CollectResult> {
  const sleep = opts.sleep ?? realSleep;
  const log = opts.log ?? ((line: string) => console.log(line));
  const groups = buildGroups(config);
  const start = fetcher.made;
  const results = new Map<Group, { res: FetchResult; round: number; note?: string }>();

  for (const g of groups) results.set(g, { res: await fetcher.get(g.path), round: 0 });
  for (let round = 1; round <= config.retryRounds; round++) {
    const failed = groups.filter((g) => !results.get(g)!.res.ok);
    if (failed.length === 0) break;
    if (fetcher.capReached) {
      for (const g of failed) results.get(g)!.note = "하루 상한 도달, 재시도 생략";
      log(`retry: daily cap reached, skipping ${failed.length} failed request(s)`);
      break;
    }
    const cooldown = config.retryCooldownMs[Math.min(round - 1, config.retryCooldownMs.length - 1)] ?? 0;
    const retryAfter = Math.max(0, ...failed.map((g) => {
      const r = results.get(g)!.res;
      return r.ok ? 0 : r.retryAfterMs ?? 0;
    }));
    const wait = Math.max(cooldown, retryAfter);
    log(`retry round ${round}/${config.retryRounds}: ${failed.map((g) => g.label).join(", ")} after ${Math.round(wait / 1000)}s`);
    await sleep(wait);
    for (const g of failed) {
      if (fetcher.capReached) {
        results.get(g)!.note = "하루 상한 도달, 재시도 생략";
        continue;
      }
      results.set(g, { res: await fetcher.get(g.path), round });
    }
  }

  const byId = new Map<string, RedditPost>();
  const stats: SourceStat[] = [];
  for (const g of groups) {
    const { res, round, note } = results.get(g)!;
    if (!res.ok) {
      for (const source of g.sources) stats.push({ source, fetched: 0, fresh: 0, failed: failOf(res), format: null, round, ...(note ? { note } : {}) });
      continue;
    }
    const raws = res.format === "json" ? normalizeJson(res.data) : normalizeRss(res.xml);
    const counts = new Map(g.sources.map((src) => [src, { fetched: 0, fresh: 0 }]));
    for (const raw of raws) {
      const owners = g.attribute(raw);
      for (const src of owners) {
        const c = counts.get(src)!;
        c.fetched++;
        if (!has(seen, raw.id)) c.fresh++;
      }
      // Search can return posts none of our terms literally match (stemming); keep them under the request label.
      const tags = owners.length > 0 ? owners : [g.label];
      const known = byId.get(raw.id);
      if (known) {
        for (const t of tags) if (!known.sources.includes(t)) known.sources.push(t);
      } else byId.set(raw.id, { ...raw, sources: [...tags] });
    }
    for (const source of g.sources) stats.push({ source, ...counts.get(source)!, failed: null, format: res.format, round });
  }
  const order = [...config.subreddits.map((x) => `sub:${x.name}`), ...config.keywords.map((k) => `kw:${k}`), ...config.competitors.map((c) => `comp:${c.name}`)];
  stats.sort((x, y) => order.indexOf(x.source) - order.indexOf(y.source));
  return { posts: [...byId.values()].filter((p) => !has(seen, p.id)), stats, requests: fetcher.made - start };
}
