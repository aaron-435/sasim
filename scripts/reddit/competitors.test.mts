// Competitor mention checks without a framework: npx tsx scripts/reddit/competitors.test.mts
import assert from "node:assert/strict";
import { loadConfig } from "./config.mts";
import type { RedditPost } from "./collect.mts";
import { findCompetitorMentions } from "./competitors.mts";
import { renderDigest, type DigestInput } from "./render.mts";

const config = loadConfig();
const competitors = config.competitors;

const post = (p: Partial<RedditPost> & { id: string }): RedditPost => ({
  subreddit: "astrology",
  title: "",
  body: "",
  author: "testuser",
  createdUtc: 0,
  numComments: 0,
  permalink: `https://www.reddit.com/r/astrology/comments/${p.id}/x/`,
  url: `https://www.reddit.com/r/astrology/comments/${p.id}/x/`,
  sources: ["sub:test"],
  ...p,
});

let n = 0;
const check = (cond: unknown, msg: string) => {
  assert.ok(cond, msg);
  n++;
};

const p1 = post({ id: "c1", title: "A reading tool", body: "Try https://getpalja.com/reading" });
const h1 = findCompetitorMentions([p1], competitors);
check(h1.length === 1, "getpalja.com link is a hit");
check(JSON.stringify(h1[0]?.matched) === JSON.stringify(["PAL:JA"]), `getpalja.com matches PAL:JA, got ${JSON.stringify(h1[0]?.matched)}`);

const p2 = post({ id: "c2", title: "Has anyone used PAL:JA?" });
check(findCompetitorMentions([p2], competitors).length === 1, "PAL:JA in title is a hit");

const p3 = post({ id: "c3", title: "My pal and I read our bazi", body: "palette colors" });
check(findCompetitorMentions([p3], competitors).length === 0, "pal and palette do not match");

const p4 = post({ id: "c4", title: "A question", body: "I asked myself about yourself" });
check(findCompetitorMentions([p4], competitors).length === 0, "yourself does not match Youra");

const p5 = post({ id: "c5", title: "A question", body: "Youra app gave me a reading" });
const h5 = findCompetitorMentions([p5], competitors);
check(JSON.stringify(h5[0]?.matched) === JSON.stringify(["Youra"]), `Youra app matches Youra, got ${JSON.stringify(h5[0]?.matched)}`);

const p6 = post({ id: "c6", title: "A question", url: "https://starlit-alley.example/x" });
const h6 = findCompetitorMentions([p6], competitors);
check(JSON.stringify(h6[0]?.matched) === JSON.stringify(["Starlit Alley"]), `starlit-alley url matches, got ${JSON.stringify(h6[0]?.matched)}`);

const p7 = post({ id: "c7", title: "Comparing tools", body: "getpalja vs TKB Studio, any thoughts?" });
const h7 = findCompetitorMentions([p7], competitors);
check(JSON.stringify(h7[0]?.matched) === JSON.stringify(["PAL:JA", "TKB_Studio"]), `two hits in config order, got ${JSON.stringify(h7[0]?.matched)}`);

const all = findCompetitorMentions([p1, p2, p3, p4, p5, p6, p7], competitors);
check(all.map((h) => h.post.id).join(",") === "c1,c2,c5,c6,c7", `input order kept, misses dropped, got ${all.map((h) => h.post.id).join(",")}`);

const base: DigestInput = {
  date: "2026-10-25",
  generatedAt: new Date(Date.UTC(2026, 9, 25, 0, 0, 0)),
  dryRun: true,
  stats: [],
  requests: 0,
  todayCount: 0,
  cap: 200,
  totalNew: 0,
  top: [],
};
const linesOf = (md: string) => md.split("\n");
const empty = linesOf(renderDigest({ ...base, competitors: [] }));
check(empty[empty.indexOf("## 3. 경쟁사 언급") + 1] === "없음", "empty competitors renders 없음");
const one = linesOf(renderDigest({ ...base, competitors: [{ post: p2, matched: ["PAL:JA"] }] }));
const hitLine = one[one.indexOf("## 3. 경쟁사 언급") + 1] ?? "";
check(hitLine.includes("Has anyone used PAL:JA?"), `hit line keeps title, got ${hitLine}`);
check(hitLine.includes("PAL:JA"), `hit line names PAL:JA, got ${hitLine}`);
check(hitLine.includes(p2.permalink), `hit line keeps permalink, got ${hitLine}`);

console.log(`competitor tests: ${n} passed`);
