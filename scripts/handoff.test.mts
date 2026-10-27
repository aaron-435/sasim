// Offline: npx tsx scripts/handoff.test.mts
// lib/handoff.ts against an in-memory store: create, token/code redemption, one use,
// 7-day expiry, validation, and the older /api/verification-code shape 1.2.0 apps read.
import assert from "node:assert/strict";
import {
  HANDOFF_TTL_MS,
  LEGACY_CODE_TTL_MS,
  createHandoff,
  hashHandoffToken,
  issueSessionCode,
  parseHandoffData,
  redeemHandoff,
  redeemSessionCode,
  type HandoffDb,
  type HandoffRow,
  type LegacySession,
} from "../lib/handoff.ts";

let checks = 0;
const check = (ok: boolean, message: string) => { assert.ok(ok, message); checks++; };
const keys = (o: object) => Object.keys(o).sort().join(",");

function memoryDb() {
  const handoffs = new Map<string, HandoffRow>();
  const sessions = new Map<string, LegacySession & { verify_code: string | null }>();
  const saju = new Map<string, Record<string, unknown>>();
  const db: HandoffDb = {
    async insertHandoff(row) {
      if (handoffs.has(row.code) || [...handoffs.values()].some((h) => h.token_hash === row.token_hash)) return "duplicate";
      handoffs.set(row.code, { ...row, created_at: new Date().toISOString() });
      return "ok";
    },
    async findHandoffByCode(code) { return handoffs.get(code) ?? null; },
    async findHandoffByTokenHash(hash) { return [...handoffs.values()].find((h) => h.token_hash === hash) ?? null; },
    async deleteHandoff(code) { return handoffs.delete(code); },
    async deleteExpiredHandoffs(nowIso) { for (const [c, h] of handoffs) if (h.expires_at < nowIso) handoffs.delete(c); },
    async sessionCodeInUse(code) { return [...sessions.values()].some((s) => s.verify_code === code); },
    async findSessionByCode(code) {
      const s = [...sessions.values()].find((x) => x.verify_code === code);
      return s ? { id: s.id, nickname: s.nickname, track: s.track, verify_code_created_at: s.verify_code_created_at } : null;
    },
    async clearSessionCode(id) { const s = sessions.get(id); if (s) s.verify_code = null; },
    async setSessionCode(id, code, at) {
      if ([...sessions.values()].some((s) => s.verify_code === code)) return "duplicate";
      const s = sessions.get(id); if (s) { s.verify_code = code; s.verify_code_created_at = at; }
      return "ok";
    },
    async latestSajuRow(id) { return saju.get(id) ?? null; },
  };
  return { db, handoffs, sessions, saju };
}

const NOW = Date.UTC(2026, 9, 27, 12, 0, 0);
const typeCard = { source: "type_card", locale: "en", data: { birthYear: 1994, birthMonth: 3, birthDay: 8 } };

// ---- create → token → one use
{
  const { db, handoffs } = memoryDb();
  const created = await createHandoff(db, typeCard, NOW);
  check(created.status === 200, "create ok");
  const { code, token, deepLink, expiresAt } = created.body as Record<string, string>;
  check(/^[1-9]\d{5}$/.test(code), "6-digit code, no leading zero");
  check(/^[0-9a-f]{64}$/.test(token), "64-hex token");
  check(deepLink === `fatesaid://handoff?t=${token}`, "deep link carries only the token");
  check(!deepLink.includes("1994"), "birth data not in the link");
  check(Date.parse(expiresAt) - NOW === HANDOFF_TTL_MS, "expires in 7 days");
  const row = handoffs.get(code)!;
  check(row.token_hash === hashHandoffToken(token) && !JSON.stringify(row).includes(token), "only the token hash is stored");
  check(keys(created.body) === "code,deepLink,expiresAt,token", "create response shape");

  const first = await redeemHandoff(db, { t: token }, NOW + 1000);
  check(first.status === 200, "token redeem ok");
  check(keys(first.body) === "data,kind,locale,source" && first.body.kind === "handoff", "handoff response shape");
  check(JSON.stringify(first.body.data) === JSON.stringify(typeCard.data) && first.body.source === "type_card", "data comes back as stored");
  check(handoffs.size === 0, "redeemed row deleted");
  check((await redeemHandoff(db, { t: token }, NOW + 2000)).status === 404, "token is one-use");
  check((await redeemHandoff(db, { code }, NOW + 2000)).status === 404, "code dead after token redeem");
}

// ---- create → code → one use
{
  const { db } = memoryDb();
  const created = await createHandoff(db, { source: "qa", locale: "es", data: { birthYear: 1990, birthMonth: 12, birthDay: 31, birthHour: null, isFemale: true, birthCity: "Ciudad de México", birthCityId: "Mexico City|MX|19.43", nickname: "  Ana  ", track: "career" } }, NOW);
  const { code, token } = created.body as Record<string, string>;
  const got = await redeemHandoff(db, { code }, NOW);
  check(got.status === 200 && got.body.kind === "handoff", "code redeem ok");
  const data = got.body.data as Record<string, unknown>;
  check(data.birthHour === null && !("birthMinute" in data), "unknown time kept as null");
  check(data.nickname === "Ana" && data.track === "career" && data.isFemale === true, "optional fields kept, trimmed");
  check((await redeemHandoff(db, { code }, NOW)).status === 404, "code is one-use");
  check((await redeemHandoff(db, { t: token }, NOW)).status === 404, "token dead after code redeem");
}

// ---- expiry
{
  const { db, handoffs } = memoryDb();
  const { code, token } = (await createHandoff(db, typeCard, NOW)).body as Record<string, string>;
  check((await redeemHandoff(db, { t: token }, NOW + HANDOFF_TTL_MS - 1)).status === 200, "valid just before 7 days");
  const again = (await createHandoff(db, typeCard, NOW)).body as Record<string, string>;
  const late = await redeemHandoff(db, { code: again.code }, NOW + HANDOFF_TTL_MS);
  check(late.status === 410 && late.body.code === "expired", "expired at 7 days → 410");
  check(!handoffs.has(again.code), "expired row deleted on the way out");
  const stale = (await createHandoff(db, typeCard, NOW)).body as Record<string, string>;
  await createHandoff(db, typeCard, NOW + HANDOFF_TTL_MS + 1);
  check(!handoffs.has(stale.code), "expired rows swept on next create");
}

// ---- validation
{
  const { db, handoffs } = memoryDb();
  const bad = async (body: unknown, why: string) => check((await createHandoff(db, body, NOW)).status === 400, why);
  await bad(null, "no body");
  await bad({ ...typeCard, source: "email" }, "unknown source");
  await bad({ ...typeCard, locale: "fr" }, "unknown locale");
  await bad({ ...typeCard, data: { ...typeCard.data, email: "a@b.c" } }, "unknown data key");
  await bad({ ...typeCard, data: { birthYear: 1994, birthMonth: 2 } }, "partial date");
  await bad({ ...typeCard, data: { birthYear: 1994, birthMonth: 2, birthDay: 30 } }, "impossible date");
  await bad({ ...typeCard, data: { birthYear: 2027, birthMonth: 1, birthDay: 1 } }, "future date");
  await bad({ ...typeCard, data: { birthYear: "1994", birthMonth: 3, birthDay: 8 } }, "string year");
  await bad({ ...typeCard, data: { birthHour: 5 } }, "time without date");
  await bad({ ...typeCard, data: { ...typeCard.data, birthHour: 24 } }, "hour out of range");
  await bad({ ...typeCard, data: { ...typeCard.data, birthMinute: 10 } }, "minute without hour");
  await bad({ ...typeCard, data: { ...typeCard.data, birthHour: null, birthMinute: 10 } }, "minute with unknown time");
  await bad({ ...typeCard, data: { ...typeCard.data, isFemale: "yes" } }, "non-boolean gender");
  await bad({ ...typeCard, data: { ...typeCard.data, track: "health" } }, "unknown track");
  await bad({ ...typeCard, data: { ...typeCard.data, nickname: 5 } }, "non-string nickname");
  check(handoffs.size === 0, "nothing stored for rejected input");
  check(JSON.stringify(parseHandoffData(undefined)) === "{}", "no data → empty handoff (day-master article)");
  const long = parseHandoffData({ nickname: "<b>" + "가".repeat(40) + "</b>\n" }) as Record<string, string>;
  check(Array.from(long.nickname).length === 24 && !/[<>\n]/.test(long.nickname), "nickname cleaned and capped");
  check(JSON.stringify(parseHandoffData({ nickname: "   " })) === "{}", "blank nickname dropped");
  const ok = await createHandoff(db, { source: "day_master", locale: "ko" }, NOW);
  check(ok.status === 200, "source-only handoff accepted");

  check((await redeemHandoff(db, {}, NOW)).status === 400, "redeem needs t or code");
  check((await redeemHandoff(db, { t: "abc" }, NOW)).status === 400, "malformed token → 400");
  check((await redeemHandoff(db, { code: "12a456" }, NOW)).status === 400, "malformed code → 400");
  check((await redeemHandoff(db, { t: "f".repeat(64) }, NOW)).status === 404, "unknown token → 404");
}

// ---- older Q&A codes: unchanged shape for 1.2.0, reachable from the new endpoint too
{
  const { db, sessions, saju } = memoryDb();
  sessions.set("s1", { id: "s1", nickname: "Sam", track: "romance", verify_code: null, verify_code_created_at: null });
  saju.set("s1", { birth_year: 1994, birth_month: 3, birth_day: 8, birth_hour: 9, birth_minute: 0, is_female: false, birth_city: "Seoul", elements: { wood: 2, fire: 1, earth: 2, metal: 2, water: 1 }, four_pillars: {}, decade_fortune: [], summary: { dayMaster: { char: "갑" } } });

  check((await issueSessionCode(db, undefined, NOW)).status === 400, "POST without sessionId → 400");
  const issued = await issueSessionCode(db, "s1", NOW);
  check(issued.status === 200 && keys(issued.body) === "code", "POST response shape { code }");
  const code = issued.body.code as string;

  const old = await redeemSessionCode(db, code, NOW + 1000);
  check(old.status === 200 && keys(old.body) === "nickname,sajuResult,track", "old GET shape { nickname, track, sajuResult }");
  const sr = old.body.sajuResult as Record<string, unknown>;
  check(sr.birth_year === 1994 && "saju_type" in sr && sr.saju_type !== null, "sajuResult keeps the row + saju_type");
  check((await redeemSessionCode(db, code, NOW + 2000)).status === 404, "old code one-use");
  check((await redeemSessionCode(db, null, NOW)).status === 400, "old GET without code → 400");

  const code2 = (await issueSessionCode(db, "s1", NOW)).body.code as string;
  const expired = await redeemSessionCode(db, code2, NOW + LEGACY_CODE_TTL_MS + 1);
  check(expired.status === 410 && keys(expired.body) === "error", "old code still expires at 24h, { error } only");
  check(sessions.get("s1")!.verify_code === null, "expired old code cleared");

  const code3 = (await issueSessionCode(db, "s1", NOW)).body.code as string;
  const viaNew = await redeemHandoff(db, { code: code3 }, NOW + 1000);
  check(viaNew.status === 200 && keys(viaNew.body) === "kind,nickname,sajuResult,track" && viaNew.body.kind === "session", "new endpoint redeems an old Q&A code in its old shape");

  const fresh = (await createHandoff(db, typeCard, NOW)).body as Record<string, string>;
  const onOld = await redeemSessionCode(db, fresh.code, NOW);
  check(onOld.status === 409 && onOld.body.code === "update_app", "new code on the old endpoint → 409 update_app");
  check((await redeemHandoff(db, { code: fresh.code }, NOW)).status === 200, "…and it was not consumed");
}

// ---- one code space across both tables
{
  const { db, sessions } = memoryDb();
  sessions.set("s2", { id: "s2", nickname: null, track: null, verify_code: null, verify_code_created_at: null });
  const seen = new Set<string>();
  for (let i = 0; i < 200; i++) {
    const c = (await createHandoff(db, typeCard, NOW)).body.code as string;
    seen.add(c);
  }
  for (let i = 0; i < 50; i++) {
    const c = (await issueSessionCode(db, "s2", NOW)).body.code as string;
    check(!seen.has(c), "session code never reuses a live handoff code");
  }
  let taken = 0;
  const realInUse = db.sessionCodeInUse;
  db.sessionCodeInUse = async (c) => { taken++; return taken <= 3 ? true : realInUse(c); };
  const after = await createHandoff(db, typeCard, NOW);
  check(after.status === 200 && taken === 4, "handoff code skips codes held by sessions");
}

console.log(`handoff tests: ${checks} passed (offline)`);
