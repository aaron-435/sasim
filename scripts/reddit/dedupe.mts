// Folds one author's crossposts of the same text into a single top slot (body first, title fallback).
import type { RedditPost } from "./collect.mts";
import type { Scored } from "./score.mts";

export type TopPost = Scored & { crossposts: RedditPost[] };

const norm = (s: string) => s.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "").slice(0, 200);

export function postFingerprint(post: RedditPost): string {
  const body = norm(post.body);
  return body.length >= 20 ? body : norm(post.title);
}

export function groupCrossposts(ranked: Scored[]): TopPost[] {
  const out: TopPost[] = [];
  const seen = new Map<string, TopPost>();
  for (const s of ranked) {
    if (!s.post.author) {
      out.push({ ...s, crossposts: [] });
      continue;
    }
    const key = `${s.post.author.toLowerCase()}\n${postFingerprint(s.post)}`;
    const rep = seen.get(key);
    if (rep) rep.crossposts.push(s.post);
    else {
      const top: TopPost = { ...s, crossposts: [] };
      seen.set(key, top);
      out.push(top);
    }
  }
  return out;
}
