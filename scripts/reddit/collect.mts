// Collects fresh posts from watched subreddits and keyword search. Reads seen, never writes it.
import type { RedditConfig } from "./config.mts";
import type { Fetcher } from "./fetch.mts";
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
};

export type CollectResult = { posts: RedditPost[]; stats: SourceStat[]; requests: number };

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

export async function collect(config: RedditConfig, fetcher: Fetcher, seen: SeenMap): Promise<CollectResult> {
  const targets = [
    ...config.subreddits.map((s) => ({ source: `sub:${s.name}`, path: `/r/${s.name}/new.json?limit=50&raw_json=1` })),
    ...config.keywords.map((k) => ({ source: `kw:${k}`, path: `/search.json?q=${encodeURIComponent(k)}&sort=new&t=week&limit=50&raw_json=1` })),
    ...config.competitors.map((c) => ({ source: `comp:${c.name}`, path: `/search.json?q=${encodeURIComponent('"' + c.name + '"')}&sort=new&t=week&limit=25&raw_json=1` })),
  ];
  const start = fetcher.made;
  const byId = new Map<string, RedditPost>();
  const stats: SourceStat[] = [];
  for (const t of targets) {
    const res = await fetcher.get(t.path);
    if (!res.ok) {
      stats.push({
        source: t.source,
        fetched: 0,
        fresh: 0,
        failed: { reason: res.reason, ...(res.status !== undefined ? { status: res.status } : {}), ...(res.error ? { error: res.error } : {}) },
        format: null,
      });
      continue;
    }
    const raws = res.format === "json" ? normalizeJson(res.data) : normalizeRss(res.xml);
    for (const raw of raws) {
      const known = byId.get(raw.id);
      if (known) {
        if (!known.sources.includes(t.source)) known.sources.push(t.source);
      } else byId.set(raw.id, { ...raw, sources: [t.source] });
    }
    stats.push({ source: t.source, fetched: raws.length, fresh: raws.filter((r) => !has(seen, r.id)).length, failed: null, format: res.format });
  }
  return { posts: [...byId.values()].filter((p) => !has(seen, p.id)), stats, requests: fetcher.made - start };
}
