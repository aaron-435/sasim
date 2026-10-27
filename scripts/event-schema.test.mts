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

console.log(`event schema tests: ${checks} passed (offline)`);
