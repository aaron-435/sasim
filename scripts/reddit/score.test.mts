// Score unit checks without a framework: npx tsx scripts/reddit/score.test.mts
import assert from "node:assert/strict";
import { loadConfig, parseConfig } from "./config.mts";
import { normalizeRss, type RedditPost } from "./collect.mts";
import { detectBirth, rankPosts, scorePost } from "./score.mts";
import { groupCrossposts } from "./dedupe.mts";
import { renderDigest, type DigestInput } from "./render.mts";

const config = loadConfig();
const NOW = Date.UTC(2026, 9, 25, 12, 0, 0);
const ago = (h: number) => Math.floor(NOW / 1000) - Math.round(h * 3600);

const post = (p: Partial<RedditPost> & { id: string; subreddit: string; title: string }): RedditPost => ({
  body: "",
  author: "testuser",
  createdUtc: ago(1),
  numComments: 0,
  permalink: `https://www.reddit.com/r/${p.subreddit}/comments/${p.id}/x/`,
  url: `https://www.reddit.com/r/${p.subreddit}/comments/${p.id}/x/`,
  sources: ["sub:test"],
  ...p,
});

const s1 = post({ id: "s1", subreddit: "ChineseZodiac", title: "Can someone read my saju? Born 1994-03-08 at 14:30", createdUtc: ago(1), numComments: 0 });
const s2 = post({ id: "s2", subreddit: "languagelearning", title: "Bazi means what in Swahili?", body: "I heard it somewhere.", createdUtc: ago(2), numComments: 3 });
const s3 = post({ id: "s3", subreddit: "astrology", title: "Four pillars vs western chart", body: "How do these systems compare?", createdUtc: ago(48), numComments: null });
const s4 = post({ id: "s4", subreddit: "Bazi_Astrology", title: "My day master is Yin Water, bazi beginner", body: "Where should I start learning?", createdUtc: ago(10), numComments: 12 });
const s5 = post({ id: "s5", subreddit: "Horoscope", title: "Mercury retrograde vibes this week", body: "Just sharing my week.", createdUtc: ago(3), numComments: 2 });

let n = 0;
const check = (cond: unknown, msg: string) => {
  assert.ok(cond, msg);
  n++;
};

const ranked = rankPosts([s1, s2, s3, s4, s5], config, NOW);
check(ranked.length === 4, "rankPosts keeps only scores above 0");
check(ranked.map((s) => s.post.id).join(",") === "s1,s4,s3,s5", "rank order is s1 > s4 > s3 > s5");
const byId = Object.fromEntries(ranked.map((s) => [s.post.id, s]));
check(byId.s1.score === 19.5, `s1 scores 19.5, got ${byId.s1.score}`);
check(byId.s4.score === 6.3, `s4 scores 6.3, got ${byId.s4.score}`);
check(byId.s3.score === 3.5, `s3 scores 3.5, got ${byId.s3.score}`);
check(byId.s5.score === 2.2, `s5 scores 2.2, got ${byId.s5.score}`);
check(scorePost(s2, config, NOW).score === 0, "s2 scores 0");
check(scorePost(s2, config, NOW).reasons.some((r) => r.includes("단독")), "s2 notes lone bazi");
check(byId.s3.reasons.some((r) => r.includes("RSS")), "s3 reasons mention RSS");
check(byId.s4.reasons.some((r) => r.includes("bazi") && r.includes("+1")), "s4 reasons carry bazi +1");

for (const t of ["1990-05-12", "1990/5/12", "05/12/1990", "12.05.1990", "May 12, 1990", "12 May 1990", "May 12th 1990", "1990년 5월 12일"]) {
  check(detectBirth(`born ${t} here`).date === true, `date pattern: ${t}`);
}
check(detectBirth("I have 2 cats and 1990 dollars").date === false, "stray numbers are not a birth date");
check(detectBirth("I have 2 cats and 1990 dollars").time === false, "stray numbers are not a birth time");
check(detectBirth("call me at 10:30").time === true, "10:30 is a birth time");
check(detectBirth("call me at 10:30").date === false, "10:30 alone is not a birth date");
check(detectBirth("met a friend at 2pm yesterday").time === true, "2pm is a birth time");
check(detectBirth("오전 3시에 태어났대").time === true, "오전 3시 is a birth time");
check(detectBirth("born 1899-05-12, long ago").date === false, "year 1899 is out of range");
check(detectBirth("due 2031-01-01, not yet").date === false, "year 2031 is out of range");

const c1s = scorePost(post({ id: "c1", subreddit: "healthcare", title: "The four pillars of healthcare reform", body: "Policy, funding, staffing, access." }), config, NOW);
check(c1s.score === 0, `healthcare four pillars scores 0, got ${c1s.score}`);
check(c1s.reasons.some((r) => r.includes("문맥 없음")), "healthcare four pillars notes missing context");
check(scorePost(post({ id: "c2", subreddit: "casino", title: "Four Pillars Casino bonus codes", body: "New codes this week." }), config, NOW).score === 0, "casino four pillars scores 0");
check(scorePost(post({ id: "c2b", subreddit: "casino", title: "Four Pillars casino review?", body: "Tested since 2024-01-05, payouts at 14:30 daily." }), config, NOW).score === 0, "dates and times do not rescue a no-context four pillars post");
check(scorePost(post({ id: "c3", subreddit: "Fantasy", title: "Four pillars of destiny — what is my day master?" }), config, NOW).score > 0, "fantasy four pillars with destiny context scores above 0");

const pBase = { title: "Please read my saju day master", body: "Born 1994-03-08, what does it mean?", createdUtc: ago(1), numComments: 0 as const };
const pProf = scorePost(post({ id: "p1", subreddit: "u_someone", ...pBase }), config, NOW);
const pWatch = scorePost(post({ id: "p2", subreddit: "ChineseZodiac", ...pBase }), config, NOW);
check(pProf.score > 0 && pProf.score < pWatch.score, `profile post scores lower, got ${pProf.score} vs ${pWatch.score}`);
check(pProf.reasons.some((r) => r.includes("프로필 글")), "profile post reasons mention 프로필 글");
check(scorePost(post({ id: "p3", subreddit: "u_someone", title: "The four pillars", body: "Just some notes." }), config, NOW).score === 0, "lone profile four pillars scores 0");

const xml = `<feed><entry><id>t3_abc</id><title>I&amp;#39;m here</title><content>&lt;p&gt;It&amp;#39;s &amp;quot;fine&amp;quot;&lt;/p&gt;</content><category term="astrology"/><link href="/r/astrology/comments/abc/x/"/><published>2026-10-25T12:00:00Z</published></entry></feed>`;
const rss = normalizeRss(xml);
check(rss.length === 1 && rss[0].title === "I'm here", `rss title decodes, got ${JSON.stringify(rss[0]?.title)}`);
check(rss[0]?.body === `It's "fine"`, `rss body decodes, got ${JSON.stringify(rss[0]?.body)}`);

const noFade: any = JSON.parse(JSON.stringify(config));
delete noFade.scoring.age.fadeTo;
let m1 = "";
try {
  parseConfig(noFade);
} catch (e) {
  m1 = (e as Error).message;
}
check(m1.includes("scoring.age.fadeTo"), `missing fadeTo names key, got ${m1}`);
const noScoring: any = JSON.parse(JSON.stringify(config));
delete noScoring.scoring;
let m2 = "";
try {
  parseConfig(noScoring);
} catch (e) {
  m2 = (e as Error).message;
}
check(m2.includes('"scoring" is missing'), `missing scoring names key, got ${m2}`);
const flipped: any = JSON.parse(JSON.stringify(config));
flipped.scoring.comments.bands.reverse();
let m3 = "";
try {
  parseConfig(flipped);
} catch (e) {
  m3 = (e as Error).message;
}
check(m3.includes("bands"), `reversed bands throw, got ${m3}`);

const dupBody = "weak guy day master needs help please read my saju chart and tell me about my future luck";
const d1 = post({ id: "d1", subreddit: "ChineseZodiac", title: "Can someone read my saju chart please?", body: dupBody, author: "dup", numComments: 0 });
const d2 = post({ id: "d2", subreddit: "Bazi_Astrology", title: "Can someone read my saju chart for me?", body: dupBody, author: "dup", numComments: 5 });
const d3 = post({ id: "d3", subreddit: "AskBazi", title: "Can someone read my saju chart today?", body: dupBody, author: "dup", numComments: 12 });
const dupRanked = rankPosts([d3, d2, d1], config, NOW);
check(dupRanked.map((s) => s.post.id).join(",") === "d1,d2,d3", `dup rank order is d1,d2,d3, got ${dupRanked.map((s) => s.post.id).join(",")}`);
const dupGrouped = groupCrossposts(dupRanked);
check(dupGrouped.length === 1, `same author and body folds to 1, got ${dupGrouped.length}`);
check(dupGrouped[0]?.post.id === "d1", `representative is the top scorer, got ${dupGrouped[0]?.post.id}`);
check(dupGrouped[0]?.crossposts.length === 2, `two crossposts folded, got ${dupGrouped[0]?.crossposts.length}`);
check(dupGrouped[0]?.crossposts.map((p) => p.id).join(",") === "d2,d3", "crossposts keep ranked order");

const e1 = post({ id: "e1", subreddit: "ChineseZodiac", title: "Career luck question?", body: "My saju day master is strong yang wood and I want to know about my career luck this year", author: "solo" });
const e2 = post({ id: "e2", subreddit: "ChineseZodiac", title: "Winter chart question?", body: "Please interpret my four pillars chart born in winter with weak fire element thank you", author: "solo" });
check(groupCrossposts(rankPosts([e1, e2], config, NOW)).length === 2, "same author with different bodies stays 2");

const f1 = post({ id: "f1", subreddit: "ChineseZodiac", title: "Can someone read my saju chart please?", body: dupBody, author: "alice" });
const f2 = post({ id: "f2", subreddit: "ChineseZodiac", title: "Can someone read my saju chart please?", body: dupBody, author: "bob" });
check(groupCrossposts(rankPosts([f1, f2], config, NOW)).length === 2, "different authors with same body stay 2");

const g1 = post({ id: "g1", subreddit: "ChineseZodiac", title: "Can someone read my saju chart please?", body: dupBody, author: "" });
const g2 = post({ id: "g2", subreddit: "ChineseZodiac", title: "Can someone read my saju chart please?", body: dupBody, author: "" });
const gGrouped = groupCrossposts(rankPosts([g1, g2], config, NOW));
check(gGrouped.length === 2 && gGrouped.every((t) => t.crossposts.length === 0), "empty author never folds");

const h1 = post({ id: "h1", subreddit: "ChineseZodiac", title: "Can someone read my saju chart please?", body: "", author: "titled" });
const h2 = post({ id: "h2", subreddit: "Bazi_Astrology", title: "Can someone read my saju chart please?", body: "short", author: "titled" });
check(groupCrossposts(rankPosts([h1, h2], config, NOW)).length === 1, "empty body falls back to title");
const i1 = post({ id: "i1", subreddit: "ChineseZodiac", title: "Can someone read my saju chart please?", body: "", author: "titled" });
const i2 = post({ id: "i2", subreddit: "ChineseZodiac", title: "Please read my saju day master chart", body: "", author: "titled" });
check(groupCrossposts(rankPosts([i1, i2], config, NOW)).length === 2, "empty bodies with different titles stay 2");

const j1 = post({ id: "j1", subreddit: "ChineseZodiac", title: "Saju reading request here please", body: "Weak Guy, Day Master! Needs help... please read my saju chart today?", author: "casey" });
const j2 = post({ id: "j2", subreddit: "ChineseZodiac", title: "Saju reading request here thanks", body: "weak guy day master needs help please read my saju chart today", author: "casey" });
check(groupCrossposts(rankPosts([j1, j2], config, NOW)).length === 1, "case and punctuation differences still fold");

const digestBase: DigestInput = {
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
const dupMd = renderDigest({ ...digestBase, top: dupGrouped });
check(dupMd.includes("- 같은 글: r/Bazi_Astrology, r/AskBazi"), "crosspost line lists folded subs in order");
const soloMd = renderDigest({ ...digestBase, top: groupCrossposts(rankPosts([s1], config, NOW)) });
check(!soloMd.includes("같은 글"), "no crosspost line when crossposts is empty");

console.log(`score tests: ${n} passed`);
