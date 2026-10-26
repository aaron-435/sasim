// Collect grouping and retry checks, offline: npx tsx scripts/reddit/collect.test.mts
import assert from "node:assert/strict";
import { loadConfig, parseConfig } from "./config.mts";
import { buildGroups, chunkQuery, collect } from "./collect.mts";
import type { FetchResult } from "./fetch.mts";
import { statNote } from "./render.mts";

const config = loadConfig();

const entry = (id: string, sub: string, title: string, body = "") =>
  `<entry><author><name>/u/someone</name></author><category term="${sub}" label="r/${sub}"/><content type="html">${body}</content><id>t3_${id}</id><link href="https://www.reddit.com/r/${sub}/comments/${id}/x/"/><published>2026-10-26T00:00:00+00:00</published><title>${title}</title></entry>`;
const feed = (...entries: string[]) => ({ ok: true as const, format: "rss" as const, xml: `<feed>${entries.join("")}</feed>` });

class FakeFetcher {
  made = 0;
  cap: number;
  calls: string[] = [];
  constructor(private reply: (path: string, call: number) => FetchResult, cap = 999) {
    this.cap = cap;
  }
  get capReached() {
    return this.made >= this.cap;
  }
  async get(path: string): Promise<FetchResult> {
    this.made++;
    this.calls.push(path);
    return this.reply(path, this.calls.filter((p) => p === path).length);
  }
}

// Request count: 7 merged subs + AstrologyCharts and astrology alone + 1 keyword OR + 1 competitor OR = 5 (was 20).
const groups = buildGroups(config);
assert.equal(groups.length, 5);
assert.match(groups[0].path, /^\/r\/ChineseZodiac\+Bazi_Astrology\+chineseastrology\+EasternOccult\+Horoscope\+AstrologyChartShare\+kpoppers\/new\.json\?limit=100/);
assert.equal(groups[1].path, "/r/AstrologyCharts/new.json?limit=50&raw_json=1");
assert.equal(groups[2].path, "/r/astrology/new.json?limit=50&raw_json=1");
assert.equal(decodeURIComponent(groups[3].path.match(/q=([^&]+)/)![1]), 'saju OR "four pillars" OR "day master" OR "korean astrology" OR "chinese astrology" OR 사주');
assert.equal(decodeURIComponent(groups[4].path.match(/q=([^&]+)/)![1]), '"PAL:JA" OR "K-Sajupalja" OR "Starlit Alley" OR "Youra" OR "TKB_Studio"');

// Long OR chains split.
assert.deepEqual(chunkQuery(["aaaa", "bbbb", "cccc"], 12), [["aaaa", "bbbb"], ["cccc"]]);
assert.deepEqual(chunkQuery(["a-very-long-term"], 5), [["a-very-long-term"]]);

// Attribution: subreddit by post.subreddit, keyword/competitor by text. 20 sources in config order.
const sleeps: number[] = [];
const rec = async (ms: number) => void sleeps.push(ms);
const ok = new FakeFetcher((path) => {
  if (path.startsWith("/r/ChineseZodiac+")) return feed(entry("a1", "ChineseZodiac", "Q"), entry("a2", "horoscope", "Q2"), entry("seen1", "kpoppers", "old"));
  if (path.startsWith("/r/astrology/")) return feed(entry("b1", "astrology", "natal"));
  if (path.startsWith("/r/AstrologyCharts/")) return feed();
  if (path.includes("saju")) return feed(entry("c1", "x", "My Four Pillars and day master?"), entry("c2", "y", "사주 질문"), entry("c3", "z", "pillar stuff"));
  return feed(entry("d1", "k", "Tried getpalja vs Youra"));
});
const r = await collect(config, ok, { seen1: "2026-10-25T00:00:00Z" }, { sleep: rec, log: () => {} });
assert.equal(r.requests, 5);
assert.equal(sleeps.length, 0);
const stat = (src: string) => r.stats.find((s) => s.source === src)!;
assert.equal(r.stats.length, 9 + 6 + 5);
assert.deepEqual(r.stats.map((s) => s.source).slice(0, 9), config.subreddits.map((s) => `sub:${s.name}`));
assert.deepEqual([stat("sub:ChineseZodiac").fetched, stat("sub:Horoscope").fetched, stat("sub:kpoppers").fetched, stat("sub:kpoppers").fresh], [1, 1, 1, 0]);
assert.equal(stat("sub:astrology").fetched, 1);
assert.deepEqual([stat('kw:"four pillars"').fetched, stat('kw:"day master"').fetched, stat("kw:사주").fetched, stat("kw:saju").fetched], [1, 1, 1, 0]);
assert.deepEqual([stat("comp:PAL:JA").fetched, stat("comp:Youra").fetched, stat("comp:TKB_Studio").fetched], [1, 1, 0]);
assert.deepEqual(r.posts.find((p) => p.id === "c3")!.sources, ["keywords"]);
assert.equal(r.posts.some((p) => p.id === "seen1"), false);
assert.equal(statNote(stat("sub:astrology")), "rss");

// Retry: merged subs 429 twice (Retry-After 90s beats 60s cooldown), then ok in round 2; competitors fail every time.
const fail429 = (after?: number): FetchResult => ({ ok: false, reason: "http", status: 429, error: "HTTP 429", ...(after ? { retryAfterMs: after } : {}) });
const flaky = new FakeFetcher((path, call) => {
  if (path.startsWith("/r/ChineseZodiac+")) return call <= 2 ? fail429(90_000) : feed(entry("a1", "ChineseZodiac", "Q"));
  if (path.includes("PAL")) return fail429();
  return feed();
});
sleeps.length = 0;
const r2 = await collect(config, flaky, {}, { sleep: rec, log: () => {} });
assert.deepEqual([...sleeps], [90_000, 180_000]);
assert.equal(r2.requests, 5 + 2 + 2);
assert.equal(statNote(r2.stats.find((s) => s.source === "sub:Bazi_Astrology")!), "rss, 재시도 2회차 성공");
assert.equal(r2.stats.find((s) => s.source === "sub:ChineseZodiac")!.fetched, 1);
const comp = r2.stats.find((s) => s.source === "comp:Youra")!;
assert.equal(comp.failed?.status, 429);
assert.equal(statNote(comp), "실패 (http 429), 재시도 2회 후");
assert.equal(r2.stats.find((s) => s.source === "kw:saju")!.round, 0);

// Daily cap: first pass uses it all, retries are skipped and noted.
const capped = new FakeFetcher(() => fail429(), 5);
sleeps.length = 0;
const r3 = await collect(config, capped, {}, { sleep: rec, log: () => {} });
assert.equal(r3.requests, 5);
assert.equal(sleeps.length, 0);
assert.equal(statNote(r3.stats[0]), "실패 (http 429), 하루 상한 도달, 재시도 생략");

// Cap reached mid-round: the rest of that round is skipped.
const midCap = new FakeFetcher(() => fail429(), 6);
const r4 = await collect(config, midCap, {}, { sleep: async () => {}, log: () => {} });
assert.equal(r4.requests, 6);
assert.equal(statNote(r4.stats.find((s) => s.source === "sub:Horoscope")!), "실패 (http 429), 재시도 1회 후, 하루 상한 도달, 재시도 생략");
assert.equal(statNote(r4.stats.find((s) => s.source === "sub:astrology")!), "실패 (http 429), 하루 상한 도달, 재시도 생략");

// No retries configured.
const noRetry = { ...config, retryRounds: 0 };
const r5 = await collect(noRetry, new FakeFetcher(() => fail429()), {}, { sleep: async () => assert.fail("no sleep"), log: () => {} });
assert.equal(r5.requests, 5);

// Config validation.
const raw = JSON.parse(JSON.stringify(config));
assert.throws(() => parseConfig({ ...raw, separateSubreddits: ["nope"] }), /separateSubreddits\[0\]/);
assert.throws(() => parseConfig({ ...raw, retryRounds: 1.5 }), /retryRounds/);
assert.throws(() => parseConfig({ ...raw, retryCooldownMs: [] }), /retryCooldownMs/);
assert.doesNotThrow(() => parseConfig({ ...raw, retryRounds: 0, retryCooldownMs: [] }));
const noRounds = { ...raw };
delete noRounds.retryRounds;
assert.throws(() => parseConfig(noRounds), /"retryRounds" is missing/);

console.log("collect tests ok");
