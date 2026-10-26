// Birth info from a post → saju chart via the app's own engine (lib/manseryeok.ts, not modified here).
// Steps: cheap year gate → LLM structured extraction → code validation → city lookup → engine → summary text.
// The LLM output is never trusted as-is: dates must be real, not in the future, and the year must appear in the post.
import OpenAI from "openai";
import { calculateManseryeok, type ManseryeokInput, type ManseryeokResult, type Stem, type Branch } from "../../lib/manseryeok.ts";
import { searchWorldCities, type WorldCity } from "../../lib/worldCities.ts";

export const EXTRACT_MODEL = process.env.REDDIT_EXTRACT_MODEL || "gpt-5.4-mini";

// USD per 1M tokens, same figures as scripts/sim-chat.mts
export const PRICES: Record<string, { input: number; output: number }> = {
  "gpt-5.4-mini": { input: 0.75, output: 4.5 },
  "gpt-5.4": { input: 2.5, output: 15 },
  "gpt-5.5": { input: 5, output: 30 },
  "gpt-5.6-luna": { input: 0.1, output: 0.5 },
};

export type Usage = { calls: number; promptTokens: number; completionTokens: number; costUsd: number };
export const emptyUsage = (): Usage => ({ calls: 0, promptTokens: 0, completionTokens: 0, costUsd: 0 });

/** Adds one completion's tokens; cost turns NaN for a model missing from PRICES so it can't hide. */
export function addUsage(usage: Usage, model: string, u: { prompt_tokens: number; completion_tokens: number } | undefined): void {
  const price = PRICES[model];
  usage.calls++;
  if (!u) return;
  usage.promptTokens += u.prompt_tokens;
  usage.completionTokens += u.completion_tokens;
  usage.costUsd += price ? (u.prompt_tokens * price.input + u.completion_tokens * price.output) / 1_000_000 : NaN;
}

export type BirthExtraction = {
  found: boolean;
  year: number | null;
  month: number | null;
  day: number | null;
  hour: number | null;
  minute: number | null;
  city: string | null;
  country: string | null;
  gender: "female" | "male" | null;
  isLunar: boolean;
};

const nullable = (type: string) => ({ type: [type, "null"] });
const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["found", "year", "month", "day", "hour", "minute", "city", "country", "gender", "isLunar"],
  properties: {
    found: { type: "boolean" },
    year: nullable("integer"),
    month: nullable("integer"),
    day: nullable("integer"),
    hour: nullable("integer"),
    minute: nullable("integer"),
    city: nullable("string"),
    country: nullable("string"),
    gender: { type: ["string", "null"], enum: ["female", "male", null] },
    isLunar: { type: "boolean" },
  },
} as const;

const SYSTEM = `You extract birth data from a Reddit post for a saju (Four Pillars) calculator.
Pick ONE person: the poster if they give their own birth data, otherwise the first person whose birth data is given.
Copy only what the post states. Never guess or fill in a missing value: use null.
- found: true only if at least a year, month and day of birth are stated for that person.
- hour: 0-23 (convert "3pm" to 15, "around 10pm" to 22). minute: 0-59, null if only the hour is given. Time ranges or "morning" without a clock time: null.
- city / country: birth place as written, in English (e.g. "Seoul", "South Korea"). A place they live now is not a birth place.
- gender: only if stated (F, female, she/her, woman, girl → female; M, male, he/him, man, boy → male).
- isLunar: true only if the post says the date is a lunar / 음력 / Chinese calendar date.
- Ambiguous numeric dates like 05/06/1990: use month/day order only if the post makes it clear; otherwise found=false.`;

export function samplingParams(model: string): { temperature: number } | { reasoning_effort: "low" } {
  return /^gpt-5\.[56]/.test(model) ? { reasoning_effort: "low" } : { temperature: 0 };
}

export async function extractBirth(
  text: string,
  client: OpenAI,
  usage: Usage,
  model = EXTRACT_MODEL,
): Promise<BirthExtraction> {
  const completion = await client.chat.completions.create({
    model,
    ...samplingParams(model),
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: text.slice(0, 6000) },
    ],
    response_format: { type: "json_schema", json_schema: { name: "birth", strict: true, schema: SCHEMA } },
  });
  addUsage(usage, model, completion.usage);
  return JSON.parse(completion.choices[0]?.message?.content ?? "{}") as BirthExtraction;
}

export type ValidBirth = {
  year: number;
  month: number;
  day: number;
  hour: number | null;
  minute: number | null;
  city: string | null;
  country: string | null;
  gender: "female" | "male" | null;
  isLunar: boolean;
};

const int = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v);

/** Year written in the post as 1990 or '90. Guards against a year the model made up. */
function yearInText(year: number, text: string): boolean {
  if (new RegExp(`(?<!\\d)${year}(?!\\d)`).test(text)) return true;
  return new RegExp(`['’]${String(year).slice(2)}(?!\\d)`).test(text);
}

export function validateBirth(x: BirthExtraction, text: string, now = new Date()): { ok: true; birth: ValidBirth } | { ok: false; reason: string } {
  if (!x || !x.found) return { ok: false, reason: "생년월일 없음" };
  const { year, month, day } = x;
  if (!int(year) || !int(month) || !int(day)) return { ok: false, reason: "연·월·일 중 빠진 값" };
  if (year < 1900 || year > now.getFullYear()) return { ok: false, reason: `연도 범위 밖(${year})` };
  if (!yearInText(year, text)) return { ok: false, reason: `연도 ${year}가 본문에 없음` };
  if (month < 1 || month > 12) return { ok: false, reason: `월 범위 밖(${month})` };
  // Lunar months are at most 30 days; solar dates must exist on the calendar.
  if (x.isLunar) {
    if (day < 1 || day > 30) return { ok: false, reason: `음력 일 범위 밖(${day})` };
  } else {
    const d = new Date(Date.UTC(year, month - 1, day));
    if (d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return { ok: false, reason: `없는 날짜(${year}-${month}-${day})` };
    if (d.getTime() > now.getTime()) return { ok: false, reason: "미래 날짜" };
  }
  let hour: number | null = null;
  let minute: number | null = null;
  if (x.hour != null) {
    if (!int(x.hour) || x.hour < 0 || x.hour > 23) return { ok: false, reason: `시 범위 밖(${x.hour})` };
    hour = x.hour;
    if (x.minute != null) {
      if (!int(x.minute) || x.minute < 0 || x.minute > 59) return { ok: false, reason: `분 범위 밖(${x.minute})` };
      minute = x.minute;
    }
  }
  const str = (s: unknown) => (typeof s === "string" && s.trim() ? s.trim() : null);
  const gender = x.gender === "female" || x.gender === "male" ? x.gender : null;
  return { ok: true, birth: { year, month, day, hour, minute, city: str(x.city), country: str(x.country), gender, isLunar: x.isLunar === true } };
}

/** Birth city → WorldCity. Prefers a match in the stated country, then the most populous. */
export function resolveCity(city: string | null, country: string | null): WorldCity | null {
  if (!city) return null;
  const tries = [city, city.split(",")[0]].map((s) => s.trim()).filter((s, i, a) => s && a.indexOf(s) === i);
  for (const q of tries) {
    const hits = searchWorldCities(q, 8).filter((c) => c.cityEn.toLowerCase() === q.toLowerCase() || c.cityDisplay === q);
    if (!hits.length) continue;
    if (country) {
      const want = country.toLowerCase();
      const inCountry = hits.find((c) => c.countryEn.toLowerCase().includes(want) || want.includes(c.countryEn.toLowerCase()));
      if (inCountry) return inCountry;
    }
    return hits[0];
  }
  return null;
}

export function engineInput(birth: ValidBirth, city: WorldCity | null): ManseryeokInput {
  return {
    birthYear: birth.year,
    birthMonth: birth.month,
    birthDay: birth.day,
    birthHour: birth.hour,
    birthMinute: birth.minute,
    isFemale: birth.gender === "female",
    birthCityId: city?.id ?? null,
    birthCity: null,
  };
}

export type ChartResult =
  | { status: "none"; reason: string }
  | { status: "invalid"; reason: string; extracted: BirthExtraction }
  | { status: "lunar"; birth: ValidBirth }
  | { status: "error"; birth: ValidBirth; reason: string }
  | { status: "ok"; birth: ValidBirth; city: WorldCity | null; input: ManseryeokInput; result: ManseryeokResult };

const YEAR_GATE = /(?<!\d)(19\d{2}|20\d{2})(?!\d)/;

/** Whole pipeline for one post. The LLM is only called when a plausible birth year appears. */
export async function chartForPost(text: string, client: OpenAI, usage: Usage): Promise<ChartResult> {
  const m = text.match(YEAR_GATE);
  if (!m || Number(m[1]) > new Date().getFullYear()) return { status: "none", reason: "본문에 출생 연도 없음" };
  let extracted: BirthExtraction;
  try {
    extracted = await extractBirth(text, client, usage);
  } catch (err) {
    return { status: "none", reason: `추출 실패: ${(err as Error).message}` };
  }
  const v = validateBirth(extracted, text);
  if (!v.ok) return extracted?.found ? { status: "invalid", reason: v.reason, extracted } : { status: "none", reason: v.reason };
  if (v.birth.isLunar) return { status: "lunar", birth: v.birth };
  const city = resolveCity(v.birth.city, v.birth.country);
  const input = engineInput(v.birth, city);
  try {
    return { status: "ok", birth: v.birth, city, input, result: await calculateManseryeok(input) };
  } catch (err) {
    return { status: "error", birth: v.birth, reason: (err as Error).message };
  }
}

// English labels so the morning reader can answer in the post's language.
const STEM_EN: Record<Stem, string> = {
  갑: "甲 Jia, Yang Wood", 을: "乙 Yi, Yin Wood", 병: "丙 Bing, Yang Fire", 정: "丁 Ding, Yin Fire", 무: "戊 Wu, Yang Earth",
  기: "己 Ji, Yin Earth", 경: "庚 Geng, Yang Metal", 신: "辛 Xin, Yin Metal", 임: "壬 Ren, Yang Water", 계: "癸 Gui, Yin Water",
};
const BRANCH_EN: Record<Branch, string> = {
  자: "子 Rat", 축: "丑 Ox", 인: "寅 Tiger", 묘: "卯 Rabbit", 진: "辰 Dragon", 사: "巳 Snake",
  오: "午 Horse", 미: "未 Goat", 신: "申 Monkey", 유: "酉 Rooster", 술: "戌 Dog", 해: "亥 Pig",
};
const ELEMENT_EN: Record<string, string> = { 목: "Wood", 화: "Fire", 토: "Earth", 금: "Metal", 수: "Water" };

const pad = (n: number) => String(n).padStart(2, "0");

function birthLine(b: ValidBirth): string {
  const time = b.hour == null ? "시각 없음" : `${pad(b.hour)}:${b.minute == null ? "??" : pad(b.minute)}`;
  const place = b.city ? [b.city, b.country].filter(Boolean).join(", ") : "도시 없음";
  const gender = b.gender === "female" ? "여" : b.gender === "male" ? "남" : "성별 없음";
  return `${b.year}-${pad(b.month)}-${pad(b.day)}${b.isLunar ? "(음력)" : ""} ${time} · ${place} · ${gender}`;
}

/** Markdown lines for the digest's chart slot. */
export function formatChart(c: ChartResult): string {
  switch (c.status) {
    case "none":
      return `출생 정보 없음 (${c.reason})`;
    case "invalid":
      return `출생 정보 검증 실패, 계산 생략: ${c.reason}`;
    case "lunar":
      return `- 입력: ${birthLine(c.birth)}\n- 음력 입력, 계산 생략 (엔진은 양력만 지원)`;
    case "error":
      return `- 입력: ${birthLine(c.birth)}\n- 계산 실패: ${c.reason}`;
    case "ok": {
      const { fourPillars: p, elements, decadeFortune, resolvedLocation } = c.result;
      const pillar = (label: string, x: typeof p.year | null) => {
        if (!x) return `${label} 없음`;
        const [sh, sn] = STEM_EN[x.sky].split(",")[0].split(" ");
        const [bh, animal] = BRANCH_EN[x.earth].split(" ");
        return `${label} ${x.full} (${sh}${bh} ${sn} ${animal})`;
      };
      const order = ["wood", "fire", "earth", "metal", "water"] as const;
      const tally = order.map((k) => `${elements[k].name}(${ELEMENT_EN[elements[k].name]}) ${elements[k].total.count}`).join(" · ");
      const notes: string[] = [];
      if (!p.hour) notes.push("시주 없음: 시각이 없어 정오 기준으로 계산, 오행은 6글자 기준");
      if (c.birth.city && !c.city) notes.push(`출생 도시 "${c.birth.city}"를 못 찾음: 서울(KST) 기준 근사, 시주·일주 경계가 다를 수 있음`);
      if (!c.birth.city) notes.push("출생 도시 없음: 서울(KST) 기준 근사, 시주·일주 경계가 다를 수 있음");
      if (c.birth.gender) notes.push(`대운: ${decadeFortune.direction}, ${decadeFortune.startAge}세 시작`);
      else notes.push("성별 없음: 대운 생략");
      return [
        `- 입력: ${birthLine(c.birth)} → 위치 ${resolvedLocation.cityLabel}`,
        `- 4기둥: ${[pillar("년", p.year), pillar("월", p.month), pillar("일", p.day), pillar("시", p.hour)].join(" / ")}`,
        `- 일간: ${p.day.sky} (${STEM_EN[p.day.sky]})`,
        `- 오행: ${tally}`,
        ...notes.map((n) => `- ${n}`),
      ].join("\n");
    }
  }
}
