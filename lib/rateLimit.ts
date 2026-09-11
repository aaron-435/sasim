/**
 * lib/rateLimit.ts
 * ------------------------------------------------------------------
 * Per-IP fixed-window rate limiting for the GPT-calling routes (chat,
 * qa-answer, report) plus /api/saju. Before 2026-09-10 these had no
 * server-side abuse protection at all beyond QAChat's own client-side
 * 2-question UI cap — trivially bypassed by calling the API directly.
 *
 * Known limitation: this is in-memory, per serverless instance. Vercel
 * can run multiple warm instances concurrently and always starts cold
 * on a new one, so a determined attacker spread across instances (or
 * just waiting for a cold start) isn't fully stopped by this. It's a
 * real first line of defense against a single client hammering one
 * endpoint from one instance, not a substitute for a real shared store
 * (e.g. Upstash Redis) if abuse becomes an actual problem — reach for
 * that if this ever needs to be load-bearing rather than a backstop.
 * ------------------------------------------------------------------
 */

import { NextRequest, NextResponse } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();

// Prevent unbounded growth from many distinct IPs over a long-running
// instance — sweep expired entries out occasionally rather than never.
function sweepExpired(now: number) {
  if (buckets.size < 5000) return;
  buckets.forEach((bucket, key) => {
    if (now > bucket.resetAt) buckets.delete(key);
  });
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweepExpired(now);

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count++;
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Convenience: rate-limit by client IP + a route-specific label, return a ready-to-return 429 response or null if allowed. */
export function rateLimitOrResponse(
  req: NextRequest,
  routeLabel: string,
  limit: number,
  windowMs: number,
  message: string
): NextResponse | null {
  const ip = getClientIp(req);
  const result = checkRateLimit(`${routeLabel}:${ip}`, limit, windowMs);
  if (result.allowed) return null;
  return NextResponse.json(
    { error: message },
    { status: 429, headers: { "Retry-After": String(result.retryAfterSeconds) } }
  );
}
