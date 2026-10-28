// Offline: npx tsx scripts/event-schema.test.mts
import assert from "node:assert/strict";
import { parseEventBatch, storedProps, type CleanBatch } from "../lib/eventSchema.ts";

let checks = 0;
const check = (ok: boolean, message: string) => { assert.ok(ok, message); checks++; };
const base = { anonId: "abc123", platform: "ios", locale: "en", dev: false, events: [{ name: "app_open" }, { name: "chat_start", props: { module: "module1" } }] };

const plain = parseEventBatch(base) as CleanBatch;
check(typeof plain === "object" && plain.tester === false, "no tester field → tester false (old builds)");
check(storedProps(plain, plain.events[0]) === null && storedProps(plain, plain.events[1])?.tester === undefined, "non-tester props stored unchanged");

const marked = parseEventBatch({ ...base, tester: true }) as CleanBatch;
check(typeof marked === "object" && marked.tester === true, "tester: true accepted");
check(JSON.stringify(storedProps(marked, marked.events[0])) === '{"tester":true}', "tester mark added to an event without props");
check(JSON.stringify(storedProps(marked, marked.events[1])) === '{"module":"module1","tester":true}', "tester mark merged into existing props");

check(parseEventBatch({ ...base, tester: "yes" }) === "tester", "non-boolean tester rejected");
check(parseEventBatch({ ...base, tester: 1 }) === "tester", "numeric tester rejected");
check(parseEventBatch({ ...base, events: [{ name: "app_open", props: { tester: true } }] }) === "prop:tester", "per-event tester prop is not a client prop key");
check((parseEventBatch({ ...base, tester: false }) as CleanBatch).tester === false, "tester: false accepted as unmarked");

// Web→app handoff events (2026-10-27): ids and counts only; anything carrying the stored data is 400.
const site = { anonId: "web123", platform: "site", locale: "en" };
check(typeof parseEventBatch({ ...site, events: [{ name: "handoff_create", props: { surface: "type_card", kind: "android", value: 3 } }] }) === "object", "handoff_create accepted");
check(typeof parseEventBatch({ ...site, events: [{ name: "store_click", props: { surface: "landing", kind: "play" } }] }) === "object", "store_click accepted");
check(typeof parseEventBatch({ ...base, events: [{ name: "handoff_redeem", props: { via: "link", kind: "handoff", surface: "calculator", value: 4 } }] }) === "object", "handoff_redeem accepted");
check(parseEventBatch({ ...site, events: [{ name: "handoff_create", props: { birthYear: 1994 } }] }) === "prop:birthYear", "handoff data keys are not prop keys");
check(parseEventBatch({ ...site, events: [{ name: "handoff_create", props: { surface: "1994-03-08" } }] }) === "prop:surface", "date-like value rejected");
check(parseEventBatch({ ...site, events: [{ name: "handoff_create", props: { value: 1994 } }] }) === "prop:value", "birth year as a number rejected");
check(parseEventBatch({ ...base, events: [{ name: "handoff_redeem", props: { kind: "Seoul Korea" } }] }) === "prop:kind", "free text (space) rejected");
check(parseEventBatch({ ...site, events: [{ name: "handoff_open" }] }) === "name", "names outside the list rejected");
check(parseEventBatch({ ...base, events: [{ name: "handoff_redeem", props: { code: "123456" } }] }) === "prop:code", "the handoff code cannot be sent");

// Quiz steps and handoff failures (2026-10-28): module ids, new/resume and error codes only.
check(typeof parseEventBatch({ ...base, events: [{ name: "quiz_start", props: { module: "module1", kind: "new" } }, { name: "quiz_start", props: { module: "module12", kind: "resume" } }] }) === "object", "quiz_start accepted");
check(typeof parseEventBatch({ ...base, events: [{ name: "quiz_complete", props: { module: "module7" } }] }) === "object", "quiz_complete accepted");
for (const kind of ["bad_request", "not_found", "expired", "update_app", "unavailable", "too_many", "network"]) {
  check(typeof parseEventBatch({ ...base, events: [{ name: "handoff_fail", props: { via: "code", kind } }] }) === "object", `handoff_fail ${kind} accepted`);
}
check(parseEventBatch({ ...base, events: [{ name: "quiz_complete", props: { answers: "a,b" } }] }) === "prop:answers", "quiz answers are not a prop key");
check(parseEventBatch({ ...base, events: [{ name: "handoff_fail", props: { token: "abab" } }] }) === "prop:token", "the handoff token cannot be sent");
check(parseEventBatch({ ...base, events: [{ name: "app_open" }, { name: "quiz_finish" }] }) === "name", "an unknown name still rejects the whole batch");

console.log(`event schema tests: ${checks} passed (offline)`);
