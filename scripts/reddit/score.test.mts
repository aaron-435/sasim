// Score unit checks without a framework: npx tsx scripts/reddit/score.test.mts
import assert from "node:assert/strict";
import { loadConfig } from "./config.mts";
import type { RedditPost } from "./collect.mts";
import { detectBirth, rankPosts, scorePost } from "./score.mts";

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

console.log(`score tests: ${n} passed`);
