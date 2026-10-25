// Birth extraction + chart checks: npx tsx --env-file=.env.local scripts/reddit/chart.test.mts
// Offline part: validation, city lookup, year gate. Online part: 4 OpenAI calls on fixtures + KASI via the engine,
// each chart compared with a direct calculateManseryeok() call on the expected input.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import OpenAI from "openai";
import { calculateManseryeok } from "../../lib/manseryeok.ts";
import {
  chartForPost, emptyUsage, engineInput, formatChart, resolveCity, validateBirth,
  type BirthExtraction, type ValidBirth,
} from "./chart.mts";

let n = 0;
const check = (cond: unknown, msg: string) => {
  assert.ok(cond, msg);
  n++;
};

// --- offline ---
const base: BirthExtraction = {
  found: true, year: 1990, month: 5, day: 12, hour: null, minute: null, city: null, country: null, gender: null, isLunar: false,
};
const text = "born 1990-05-12";
const now = new Date("2026-10-25T00:00:00Z");
check(validateBirth(base, text, now).ok, "plain date ok");
check(!validateBirth({ ...base, found: false }, text, now).ok, "found=false rejected");
check(!validateBirth({ ...base, month: 2, day: 30 }, "born 1990", now).ok, "Feb 30 rejected");
check(!validateBirth({ ...base, year: 1985 }, text, now).ok, "year not in text rejected");
check(validateBirth({ ...base, year: 1985 }, "born in '85, May 12", now).ok, "'85 counts as 1985");
check(!validateBirth({ ...base, year: 2027 }, "2027-05-12", now).ok, "future year rejected");
check(!validateBirth({ ...base, hour: 25 }, text, now).ok, "hour 25 rejected");
check(!validateBirth({ ...base, hour: 10, minute: 61 }, text, now).ok, "minute 61 rejected");
const minuteOnly = validateBirth({ ...base, minute: 30 }, text, now);
check(minuteOnly.ok && minuteOnly.birth.minute === null, "minute without hour dropped");
check(validateBirth({ ...base, isLunar: true, month: 2, day: 30 }, "lunar 1990", now).ok, "lunar day 30 allowed");
check(!validateBirth({ ...base, isLunar: true, day: 31 }, "lunar 1990", now).ok, "lunar day 31 rejected");

check(resolveCity("Seoul", "South Korea")?.cityEn === "Seoul", "Seoul resolves");
check(resolveCity("Toronto, Canada", null)?.cityEn === "Toronto", "'Toronto, Canada' resolves via split");
check(resolveCity("Nowhereville", null) === null, "unknown city → null");
check(resolveCity(null, "Canada") === null, "no city → null");

const noLlm = { chat: { completions: { create: () => { throw new Error("LLM must not be called"); } } } } as unknown as OpenAI;
const gated = await chartForPost("What's my day master if I'm a fire person?", noLlm, emptyUsage());
check(gated.status === "none", "no year → no LLM call");

// --- online ---
type Fixture = { name: string; text: string; expected: Omit<ValidBirth, "city" | "country"> & { cityEn: string | null } };
const fixtures = JSON.parse(readFileSync(new URL("./fixtures/chart-posts.json", import.meta.url), "utf-8")) as Fixture[];
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const usage = emptyUsage();

for (const f of fixtures) {
  const r = await chartForPost(f.text, client, usage);
  const e = f.expected;
  if (r.status !== "ok" && r.status !== "lunar") assert.fail(`${f.name}: status ${r.status} ${"reason" in r ? r.reason : ""}`);
  const b = r.birth;
  for (const k of ["year", "month", "day", "hour", "minute", "gender", "isLunar"] as const) {
    check(b[k] === e[k], `${f.name}: ${k} ${b[k]} ≠ ${e[k]}`);
  }
  if (e.isLunar) {
    check(r.status === "lunar" && formatChart(r).includes("음력 입력, 계산 생략"), `${f.name}: lunar skipped`);
    console.log(`\n[${f.name}]\n${formatChart(r)}`);
    continue;
  }
  assert.equal(r.status, "ok");
  if (r.status !== "ok") continue;
  check((r.city?.cityEn ?? null) === e.cityEn, `${f.name}: city ${r.city?.cityEn} ≠ ${e.cityEn}`);

  const direct = await calculateManseryeok(engineInput(b, r.city));
  check(JSON.stringify(r.result.fourPillars) === JSON.stringify(direct.fourPillars), `${f.name}: pillars match engine`);
  check(JSON.stringify(r.result.elements) === JSON.stringify(direct.elements), `${f.name}: elements match engine`);
  const out = formatChart(r);
  check(out.includes(`일간: ${direct.fourPillars.day.sky}`), `${f.name}: day master in summary`);
  if (e.hour == null) check(direct.fourPillars.hour === null && out.includes("시주 없음"), `${f.name}: no hour pillar noted`);
  if (e.cityEn == null) check(out.includes("출생 도시 없음"), `${f.name}: missing city noted`);
  if (e.gender == null) check(out.includes("대운 생략"), `${f.name}: no gender noted`);
  console.log(`\n[${f.name}]\n${out}`);
}

console.log(`\nchart tests: ${n} passed · OpenAI ${usage.calls} calls, ${usage.promptTokens}+${usage.completionTokens} tokens, $${usage.costUsd.toFixed(4)}`);
