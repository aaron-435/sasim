/**
 * Four-week posting calendar for the shortform plan (SPEC 2026-10-29).
 * Builds marketing/shortform/CALENDAR.md from a launch day D0 and checks it:
 * 10 posts a week, never the same format twice in a row, every F3 on (or just
 * before) the date it talks about. Made videos come from produce/V*.json in key
 * order; a slot with nothing made yet reads "제작 필요".
 *
 * Usage:
 *   npx tsx scripts/shortform/calendar.mts --d0 2026-11-02 [--provisional] [--write]
 *     Build for that D0, check, print. --write also rewrites CALENDAR.md.
 *   npx tsx scripts/shortform/calendar.mts --check [file]
 *     Check an existing calendar (default marketing/shortform/CALENDAR.md),
 *     including hand edits. Exit 1 on any failure.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { loadConfigFile, type Format, type ShortformConfig } from "./check-copy.mts";
import { DATES_FROM_ISO, DATES_TO_ISO, solarTermDates } from "./solar-term-dates.mts";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const PRODUCE = path.join(ROOT, "marketing/shortform/produce");
const CALENDAR = path.join(ROOT, "marketing/shortform/CALENDAR.md");

export const WEEKS = 4;
export const PER_WEEK = 10;
/** Posts per day, D+0..D+6 of each week (sums to PER_WEEK). */
export const DAY_SLOTS = [2, 1, 2, 1, 2, 1, 1];
/** Suggested US Eastern posting times for slot 1 and slot 2. */
export const SLOT_TIMES = ["12:00", "19:00"];
/** Weekly mix when the week has one F3. Two F3 events take one F2 slot; none gives it to F2. */
export const WEEK_MIX: Record<Format, number> = { F1: 2, F2: 3, F3: 1, F4: 2, F6: 2 };
/** Tie-break when several formats have the same count left. */
const FORMAT_ORDER: Format[] = ["F1", "F2", "F4", "F6", "F3"];

export interface CalendarEvent {
  name: string;
  /** US Eastern calendar date, YYYY-MM-DD. */
  date: string;
  /** How many days before the date an F3 about it may go out. */
  lead: number;
  major: boolean;
}

export function calendarEvents(): CalendarEvent[] {
  const terms = solarTermDates(DATES_FROM_ISO, DATES_TO_ISO).map((r) => ({
    name: r.en, date: r.etDate, lead: 1, major: r.opensMonth,
  }));
  return [
    ...terms,
    // Wrapped's caption says "get the app before then", so it can lead a little.
    { name: "Year Wrapped", date: "2026-12-01", lead: 3, major: true },
    { name: "New Year", date: "2027-01-01", lead: 1, major: true },
  ].sort((a, b) => a.date.localeCompare(b.date));
}

const addDays = (iso: string, n: number): string => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const dayDiff = (a: string, b: string): number =>
  Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86400000);
const weekday = (iso: string): string =>
  ["일", "월", "화", "수", "목", "금", "토"][new Date(`${iso}T00:00:00Z`).getUTCDay()];

/** The event an F3 config talks about: first event name found in its hook or cards. */
export function configEvent(config: ShortformConfig, events: CalendarEvent[]): CalendarEvent | null {
  const text = [config.hook, ...config.onScreen].join("\n").toLowerCase();
  return events.find((e) => text.includes(e.name.toLowerCase())) ?? null;
}

export interface Row {
  week: number;
  date: string;
  dn: number;
  slot: number;
  format: Format;
  /** Made video key, or null when the slot still needs a video. */
  key: string | null;
  /** F3 only: the event it is about. */
  event: string | null;
}

export interface Built {
  rows: Row[];
  notes: string[];
}

function loadMade(): ShortformConfig[] {
  return readdirSync(PRODUCE)
    .filter((f) => /^V\d+-F\d\.json$/.test(f))
    .sort()
    .map((f) => loadConfigFile(path.join(PRODUCE, f)));
}

export function buildCalendar(d0: string): Built {
  const events = calendarEvents();
  const made = loadMade();
  const notes: string[] = [];
  const queue: Record<Format, ShortformConfig[]> = { F1: [], F2: [], F3: [], F4: [], F6: [] };
  for (const c of made) if (c.format !== "F3") queue[c.format].push(c);
  const f3ByEvent = new Map<string, ShortformConfig>();
  const end = addDays(d0, WEEKS * 7 - 1);
  for (const c of made.filter((m) => m.format === "F3")) {
    const ev = configEvent(c, events);
    if (!ev) { notes.push(`${c.key}: 날짜표에 없는 행사라 배치하지 않음`); continue; }
    if (ev.date < d0) notes.push(`${c.key}: ${ev.name}(${ev.date})가 D0 전이라 못 씀 → 다른 행사로 바꿔 다시 렌더`);
    else if (addDays(ev.date, -ev.lead) > end) notes.push(`${c.key}: ${ev.name}(${ev.date})는 4주 밖 → 다음 캘린더로`);
    f3ByEvent.set(ev.name, c);
  }

  const rows: Row[] = [];
  let prev: Format | null = null;
  for (let w = 0; w < WEEKS; w++) {
    const start = addDays(d0, w * 7);
    const weekEnd = addDays(start, 6);
    // Events whose posting window [date - lead, date] touches this week and
    // were not already used. Made ones first, then month-opening terms.
    const used = new Set(rows.map((r) => r.event));
    const cands = events
      .filter((e) => !used.has(e.name) && e.date >= start && addDays(e.date, -e.lead) <= weekEnd && e.date >= d0)
      .sort((a, b) => Number(f3ByEvent.has(b.name)) - Number(f3ByEvent.has(a.name)) || Number(b.major) - Number(a.major) || a.date.localeCompare(b.date))
      .slice(0, 2)
      .sort((a, b) => a.date.localeCompare(b.date));
    // Events right at a week edge fall to whichever week reaches them first.
    const mix = { ...WEEK_MIX, F3: cands.length, F2: WEEK_MIX.F2 + WEEK_MIX.F3 - cands.length };

    const slots: { date: string; slot: number }[] = [];
    DAY_SLOTS.forEach((n, i) => { for (let s = 1; s <= n; s++) slots.push({ date: addDays(start, i), slot: s }); });
    const fixed = new Map<number, CalendarEvent>();
    for (const ev of cands) {
      const postDate = ev.date <= weekEnd ? ev.date : weekEnd;
      const idx = slots.findIndex((s, i) => s.date === postDate && !fixed.has(i));
      fixed.set(idx === -1 ? slots.findLastIndex((_, i) => !fixed.has(i)) : idx, ev);
    }

    const formats = assignFormats(slots.length, fixed, mix, prev);
    if (!formats) throw new Error(`week ${w + 1}: no order without back-to-back formats`);
    formats.forEach((format, i) => {
      const s = slots[i];
      const ev = fixed.get(i) ?? null;
      const key = ev ? f3ByEvent.get(ev.name)?.key ?? null : queue[format].shift()?.key ?? null;
      rows.push({ week: w + 1, date: s.date, dn: dayDiff(s.date, d0), slot: s.slot, format, key, event: ev?.name ?? null });
    });
    prev = formats[formats.length - 1];
  }
  for (const f of Object.keys(queue) as Format[]) {
    for (const c of queue[f]) notes.push(`${c.key}: 4주 안에 자리가 없어 남음`);
  }
  return { rows, notes };
}

/** Backtracking fill: F3 only at fixed slots, no two neighbours alike. */
function assignFormats(n: number, fixed: Map<number, CalendarEvent>, mix: Record<Format, number>, prev: Format | null): Format[] | null {
  const left = { ...mix, F3: 0 };
  const out: Format[] = [];
  const go = (i: number, last: Format | null): boolean => {
    if (i === n) return true;
    if (fixed.has(i)) {
      if (last === "F3") return false;
      out[i] = "F3";
      return go(i + 1, "F3");
    }
    const options = FORMAT_ORDER
      .filter((f) => f !== "F3" && left[f] > 0 && f !== last)
      .sort((a, b) => left[b] - left[a] || FORMAT_ORDER.indexOf(a) - FORMAT_ORDER.indexOf(b));
    for (const f of options) {
      left[f]--;
      out[i] = f;
      if (go(i + 1, f)) return true;
      left[f]++;
    }
    return false;
  };
  return go(0, prev) ? out : null;
}

const PLACES: Record<Format, string> = {
  F1: "TT·IG 릴스 → YT 복사",
  F2: "TT 사진·IG 캐러셀 + YT 슬라이드",
  F3: "TT·IG 릴스 → YT 복사",
  F4: "TT·IG 릴스 → YT 복사",
  F6: "TT·IG 릴스 → YT 복사 (음원은 게시 때)",
};

export function renderMarkdown(d0: string, provisional: boolean, built: Built): string {
  const lines = built.rows.map((r) =>
    `| W${r.week} | ${r.date} (${weekday(r.date)}) | D+${r.dn} | ${r.slot} ${SLOT_TIMES[r.slot - 1]} | ${r.format} | ${r.key ?? "제작 필요"} | ${r.event ?? ""} | ${PLACES[r.format]} |`);
  const todo = built.rows.filter((r) => !r.key);
  return `# 숏폼 게시 캘린더 (4주, 주 ${PER_WEEK}개)

D0: ${d0}${provisional ? " **(임시: 스토어 공개일이 정해지면 다시 만든다)**" : ""}

\`npx tsx scripts/shortform/calendar.mts --d0 ${d0}${provisional ? " --provisional" : ""} --write\`가 만든 파일이다. 손으로 고쳐도 되지만 고친 뒤 \`npx tsx scripts/shortform/calendar.mts --check\`를 통과시킨다.

## 규칙
- 주 ${PER_WEEK}개: F1 2, F2 3, F4 2, F6 2, F3 1. 그 주에 F3 행사가 두 개면 F2를 하나 줄이고, 없으면 F2를 하나 늘린다.
- 하루 슬롯은 D+0~6에 ${DAY_SLOTS.join("·")}개. 시간은 미 동부 기준 제안(슬롯 1 ${SLOT_TIMES[0]}, 슬롯 2 ${SLOT_TIMES[1]}).
- 바로 앞 게시물과 같은 형식은 두지 않는다(주 경계 포함).
- F3은 그 행사 날짜(미 동부, \`dates.md\`) 당일이나 직전에 둔다. 절기는 하루 전까지, Year Wrapped는 3일 전까지.
- TikTok과 Instagram은 같은 날 같은 영상. YouTube Shorts는 복사 게시. 플랫폼 열 약자: TT=TikTok, IG=Instagram, YT=YouTube.
- 같은 형식 안에서는 만든 순서(V 번호)대로 쓴다.

## 캘린더

| 주 | 날짜 (미 동부) | 상대 | 슬롯 | 형식 | 영상 | F3 행사 | 게시처 |
|---|---|---|---|---|---|---|---|
${lines.join("\n")}

## 남은 일
- 제작 필요 ${todo.length}개: ${todo.length === 0 ? "없음" : formatCounts(todo)}. 3~4주차 분은 2주 리뷰(TODO 12)에서 형식 구성을 조정한 뒤 만든다.
${built.notes.map((n) => `- ${n}`).join("\n")}
`;
}

function formatCounts(rows: Row[]): string {
  const c = new Map<string, number>();
  for (const r of rows) {
    const k = r.event ? `F3(${r.event})` : r.format;
    c.set(k, (c.get(k) ?? 0) + 1);
  }
  return [...c].map(([k, v]) => `${k} ${v}`).join(", ");
}

/** Parses the calendar table back and checks it. Returns failure messages. */
export function checkCalendar(md: string): string[] {
  const fail: string[] = [];
  const d0 = md.match(/^D0: (\d{4}-\d{2}-\d{2})/m)?.[1];
  if (!d0) return ["D0 줄이 없다"];
  const rows = md.split("\n").filter((l) => /^\| W\d/.test(l)).map((l) => {
    const c = l.split("|").slice(1, -1).map((s) => s.trim());
    return {
      line: l,
      week: Number(c[0].slice(1)),
      date: c[1].slice(0, 10),
      dn: Number(c[2].replace("D+", "")),
      slot: Number(c[3].split(" ")[0]),
      format: c[4] as Format,
      key: c[5] === "제작 필요" ? null : c[5],
      event: c[6] || null,
    };
  });
  if (rows.length !== WEEKS * PER_WEEK) fail.push(`행 ${rows.length}개, ${WEEKS * PER_WEEK}개여야 한다`);
  for (let w = 1; w <= WEEKS; w++) {
    const wr = rows.filter((r) => r.week === w);
    if (wr.length !== PER_WEEK) fail.push(`W${w}: ${wr.length}개, ${PER_WEEK}개여야 한다`);
    const f3 = wr.filter((r) => r.format === "F3").length;
    if (f3 > 2) fail.push(`W${w}: F3 ${f3}개, 2개까지`);
    for (const r of wr) {
      if (dayDiff(r.date, d0) !== r.dn) fail.push(`${r.date}: D+${r.dn}가 D0와 안 맞는다`);
      if (Math.floor(r.dn / 7) + 1 !== w) fail.push(`${r.date}: W${w}에 속하지 않는다`);
    }
  }
  const sorted = [...rows].sort((a, b) => a.date.localeCompare(b.date) || a.slot - b.slot);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].format === sorted[i - 1].format) {
      fail.push(`연속 같은 형식 ${sorted[i].format}: ${sorted[i - 1].date}/${sorted[i - 1].slot} → ${sorted[i].date}/${sorted[i].slot}`);
    }
  }
  const events = calendarEvents();
  const seenKeys = new Set<string>();
  for (const r of rows) {
    if (r.format === "F3") {
      const ev = events.find((e) => e.name === r.event);
      if (!ev) fail.push(`${r.date} F3: 행사 "${r.event ?? ""}"가 날짜표에 없다`);
      else if (r.date > ev.date || r.date < addDays(ev.date, -ev.lead)) {
        fail.push(`${r.date} F3: ${ev.name}은 ${ev.date}(${ev.lead}일 전까지), 날짜가 안 맞는다`);
      }
    } else if (r.event) fail.push(`${r.date} ${r.format}: F3이 아닌데 행사가 적혀 있다`);
    if (!r.key) continue;
    if (seenKeys.has(r.key)) fail.push(`${r.key}: 두 번 나온다`);
    seenKeys.add(r.key);
    const file = path.join(PRODUCE, `${r.key}.json`);
    if (!existsSync(file)) { fail.push(`${r.key}: 설정 파일이 없다`); continue; }
    const config = loadConfigFile(file);
    if (config.format !== r.format) fail.push(`${r.key}: 형식 ${config.format}인데 ${r.format} 자리에 있다`);
    if (config.format === "F3" && configEvent(config, events)?.name !== r.event) {
      fail.push(`${r.key}: 영상 속 행사와 칸의 행사(${r.event ?? ""})가 다르다`);
    }
  }
  return fail;
}

function summary(md: string): string {
  const rows = md.split("\n").filter((l) => /^\| W\d/.test(l));
  const perWeek = [1, 2, 3, 4].map((w) => rows.filter((l) => l.startsWith(`| W${w} `)).length);
  const f3 = rows.filter((l) => l.split("|")[5].trim() === "F3").map((l) => `${l.split("|")[2].trim().slice(0, 10)} ${l.split("|")[7].trim()}`);
  const made = rows.filter((l) => !l.includes("제작 필요")).length;
  return `weeks ${perWeek.join("/")}, back-to-back 0, F3 ${f3.join("; ")}, made ${made}/${rows.length}`;
}

function main(): void {
  const args = process.argv.slice(2);
  if (args[0] === "--check") {
    const file = args[1] ?? CALENDAR;
    const md = readFileSync(file, "utf8");
    const fail = checkCalendar(md);
    for (const f of fail) console.log(`FAIL ${f}`);
    console.log(fail.length === 0 ? `ok ${path.relative(ROOT, file)}: ${summary(md)}` : `${fail.length} failed`);
    process.exit(fail.length === 0 ? 0 : 1);
  }
  const d0 = args[args.indexOf("--d0") + 1];
  if (!args.includes("--d0") || !/^\d{4}-\d{2}-\d{2}$/.test(d0 ?? "")) {
    console.error("usage: calendar.mts --d0 YYYY-MM-DD [--provisional] [--write] | --check [file]");
    process.exit(2);
  }
  const md = renderMarkdown(d0, args.includes("--provisional"), buildCalendar(d0));
  const fail = checkCalendar(md);
  console.log(md.trimEnd());
  for (const f of fail) console.log(`FAIL ${f}`);
  if (fail.length > 0) process.exit(1);
  if (args.includes("--write")) {
    writeFileSync(CALENDAR, md);
    console.log(`wrote ${path.relative(ROOT, CALENDAR)}: ${summary(md)}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
