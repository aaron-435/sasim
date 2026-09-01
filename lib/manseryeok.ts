/**
 * lib/manseryeok.ts
 * ------------------------------------------------------------------
 * Self-hosted 사주 계산 엔진 — replaces SAZU for the 4 base modules
 * (fourPillars/elements/decadeFortune/summary) using KASI's free
 * Open API (lib/kasi.ts) as the ground-truth calendar source.
 *
 * Validated against SAZU's 5 documented Free-tier sandbox profiles
 * (scripts run during development, not checked in):
 *   - 일주(day pillar) comes straight from KASI's getLunCalInfo — matched
 *     SAZU exactly on all 5 profiles.
 *   - 연주/월주(year/month pillar) are computed in-house from solar
 *     ecliptic longitude (lib/solarTerms.ts), NOT from KASI's lunSecha/
 *     lunWolgeon — those fields are day-granularity and got the pillar
 *     wrong for births on the same calendar day as a 절기 crossing but
 *     before the exact crossing time (caught via the "weak-female"
 *     1970-05-05 10:00 sample: real 입하 was later that day, so the
 *     correct month was still 진월, but KASI's day-level field had
 *     already flipped to 사월). After switching to our own solar-term
 *     calc, all 5 profiles matched exactly on pillars + elements.
 *   - 시주(hour pillar) is derived locally via the standard 오자시 조견표.
 *
 * KNOWN LIMITATION: hour-pillar branch assignment uses plain KST hour
 * (no 진태양시/longitude correction). SAZU applies a small correction
 * (~2min for Seoul, "convention" mode) — this only matters for births
 * within ~2 minutes of a two-hour branch boundary, which we accept as
 * a rare edge case for now.
 * ------------------------------------------------------------------
 */

import { getLunCalInfo } from "./kasi";
import { findCurrentMonthTerm, MONTH_TERMS } from "./solarTerms";

const STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"] as const;
const BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"] as const;

type Stem = (typeof STEMS)[number];
type Branch = (typeof BRANCHES)[number];
type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

const STEM_ELEMENT: Record<Stem, ElementKey> = {
  갑: "wood", 을: "wood",
  병: "fire", 정: "fire",
  무: "earth", 기: "earth",
  경: "metal", 신: "metal",
  임: "water", 계: "water",
};

const BRANCH_ELEMENT: Record<Branch, ElementKey> = {
  인: "wood", 묘: "wood",
  사: "fire", 오: "fire",
  진: "earth", 술: "earth", 축: "earth", 미: "earth",
  신: "metal", 유: "metal",
  해: "water", 자: "water",
};

const ELEMENT_KO: Record<ElementKey, string> = {
  wood: "목", fire: "화", earth: "토", metal: "금", water: "수",
};

function isYangStem(stem: Stem): boolean {
  return STEMS.indexOf(stem) % 2 === 0; // 갑병무경임
}

/** "무인(戊寅)" 같은 KASI 문자열에서 앞 2글자(간지)만 추출 */
function parseGanji(raw: string): { stem: Stem; branch: Branch } {
  const hangul = raw.trim().slice(0, 2);
  const stem = hangul[0] as Stem;
  const branch = hangul[1] as Branch;
  if (!STEMS.includes(stem) || !BRANCHES.includes(branch)) {
    throw new Error(`Unrecognized ganji string from KASI: "${raw}"`);
  }
  return { stem, branch };
}

interface Pillar {
  full: string;
  sky: Stem;
  earth: Branch;
  skyElement: string;
  earthElement: string;
  skyFull: string;
  earthFull: string;
}

function buildPillar(stem: Stem, branch: Branch): Pillar {
  const skyElement = ELEMENT_KO[STEM_ELEMENT[stem]];
  const earthElement = ELEMENT_KO[BRANCH_ELEMENT[branch]];
  return {
    full: `${stem}${branch}`,
    sky: stem,
    earth: branch,
    skyElement,
    earthElement,
    skyFull: `${stem}${skyElement}`,
    earthFull: `${branch}${earthElement}`,
  };
}

// 오자시 조견표: 일간 그룹별 자시(23:00~00:59)의 시간(時干)
const HOUR_STEM_START: Record<Stem, Stem> = {
  갑: "갑", 기: "갑",
  을: "병", 경: "병",
  병: "무", 신: "무",
  정: "경", 임: "경",
  무: "임", 계: "임",
};

/** birthHour(0-23, 로컬 KST 정수시)로부터 지지 인덱스(0=자...11=해) 산출 */
function branchIndexFromHour(hour: number): number {
  return Math.floor(((hour + 1) % 24) / 2);
}

function buildHourPillar(dayStem: Stem, birthHour: number): Pillar {
  const branchIdx = branchIndexFromHour(birthHour);
  const zijShiStem = HOUR_STEM_START[dayStem];
  const stemIdx = (STEMS.indexOf(zijShiStem) + branchIdx) % 10;
  return buildPillar(STEMS[stemIdx], BRANCHES[branchIdx]);
}

// 오호둔(五虎遁): 연간(年干)에 따른 인월(寅月)의 시작 천간
const YEAR_STEM_TO_YIN_MONTH_STEM: Record<Stem, Stem> = {
  갑: "병", 기: "병",
  을: "무", 경: "무",
  병: "경", 신: "경",
  정: "임", 임: "임",
  무: "갑", 계: "갑",
};

/**
 * 절기(태양황경) 기준으로 정밀한 연주/월주를 계산한다. KASI의 lunSecha/
 * lunWolgeon은 "하루" 단위 값이라 절입 당일 정확한 시각을 반영하지 못해
 * (검증 중 1970-05-05 10시생 사례에서 확인됨) 이 계산으로 대체한다.
 * 년주는 순수 산식(연도-4)%10/%12 + 입춘 보정, 월주는 12절 경계 + 오호둔.
 */
function computeYearAndMonthPillar(birthUtc: Date): { year: Pillar; month: Pillar } {
  const { termIndex, crossingUtc } = findCurrentMonthTerm(birthUtc);
  // crossingUtc는 termIndex가 시작된 절입 시각. 축월(termIndex=11, 1월)만
  // 그 절입이 다음 캘린더 연도에 발생하므로 사주해에서 -1 보정.
  const crossingKstYear = new Date(crossingUtc.getTime() + 9 * 3600 * 1000).getUTCFullYear();
  const sajuYear = termIndex === 11 ? crossingKstYear - 1 : crossingKstYear;

  const yearStemIdx = ((sajuYear - 4) % 10 + 10) % 10;
  const yearBranchIdx = ((sajuYear - 4) % 12 + 12) % 12;
  const yearStem = STEMS[yearStemIdx];
  const yearBranch = BRANCHES[yearBranchIdx];

  const yinMonthStem = YEAR_STEM_TO_YIN_MONTH_STEM[yearStem];
  const monthStemIdx = (STEMS.indexOf(yinMonthStem) + termIndex) % 10;
  const monthBranch = MONTH_TERMS[termIndex].branch as Branch;

  return {
    year: buildPillar(yearStem, yearBranch),
    month: buildPillar(STEMS[monthStemIdx], monthBranch),
  };
}

function sixtyIndex(stem: Stem, branch: Branch): number {
  const s = STEMS.indexOf(stem);
  const b = BRANCHES.indexOf(branch);
  for (let i = 0; i < 60; i++) {
    if (i % 10 === s && i % 12 === b) return i;
  }
  throw new Error("invalid stem/branch combination");
}

function pillarFromSixtyIndex(idx: number): Pillar {
  const i = ((idx % 60) + 60) % 60;
  return buildPillar(STEMS[i % 10], BRANCHES[i % 12]);
}

export interface FourPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar | null;
}

export interface ElementTally {
  name: string;
  total: { count: number; percentage: number };
  skyOnly: { count: number; percentage: number };
  earthOnly: { count: number; percentage: number };
}

export type ElementsResult = Record<ElementKey, ElementTally>;

export interface DecadeFortuneEntry {
  index: number;
  startAge: number;
  full: string;
  sky: Stem;
  earth: Branch;
  skyElement: string;
  earthElement: string;
  skyFull: string;
  earthFull: string;
}

export interface DecadeFortune {
  direction: "순행" | "역행";
  startAge: number;
  list: DecadeFortuneEntry[];
}

export interface SummaryResult {
  dayMaster: { char: string; element: string };
  elementBalance: { dominant: string; lacking: string; score: number };
}

export interface ManseryeokInput {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour?: number | null;
  isFemale: boolean;
  isLunar?: boolean; // NOTE: only solar-calendar input supported for now (see calculateManseryeok)
}

export interface ManseryeokResult {
  fourPillars: FourPillars;
  elements: ElementsResult;
  decadeFortune: DecadeFortune;
  summary: SummaryResult;
  dominantElement: ElementKey | null;
}

function tallyElements(pillars: FourPillars): ElementsResult {
  const skyChars: ElementKey[] = [STEM_ELEMENT[pillars.year.sky], STEM_ELEMENT[pillars.month.sky], STEM_ELEMENT[pillars.day.sky]];
  const earthChars: ElementKey[] = [BRANCH_ELEMENT[pillars.year.earth], BRANCH_ELEMENT[pillars.month.earth], BRANCH_ELEMENT[pillars.day.earth]];
  if (pillars.hour) {
    skyChars.push(STEM_ELEMENT[pillars.hour.sky]);
    earthChars.push(BRANCH_ELEMENT[pillars.hour.earth]);
  }
  const skyTotal = skyChars.length;
  const earthTotal = earthChars.length;
  const grandTotal = skyTotal + earthTotal;

  const keys: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];
  const result = {} as ElementsResult;
  for (const key of keys) {
    const skyCount = skyChars.filter((e) => e === key).length;
    const earthCount = earthChars.filter((e) => e === key).length;
    result[key] = {
      name: ELEMENT_KO[key],
      total: { count: skyCount + earthCount, percentage: round1(((skyCount + earthCount) / grandTotal) * 100) },
      skyOnly: { count: skyCount, percentage: round1((skyCount / skyTotal) * 100) },
      earthOnly: { count: earthCount, percentage: round1((earthCount / earthTotal) * 100) },
    };
  }
  return result;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function computeDecadeFortune(
  pillars: FourPillars,
  birthUtc: Date,
  isFemale: boolean
): DecadeFortune {
  const yearIsYang = isYangStem(pillars.year.sky);
  // 양간+남 or 음간+여 -> 순행, 그 외 역행
  const direction: "순행" | "역행" = yearIsYang === !isFemale ? "순행" : "역행";

  // 자체 절기 계산(연도 제한 없음)으로 순행=다음 절입까지, 역행=이전 절입부터 일수 산출
  const { crossingUtc, nextCrossingUtc } = findCurrentMonthTerm(birthUtc);
  const diffDays =
    direction === "순행"
      ? (nextCrossingUtc.getTime() - birthUtc.getTime()) / (1000 * 60 * 60 * 24)
      : (birthUtc.getTime() - crossingUtc.getTime()) / (1000 * 60 * 60 * 24);
  const startAge = Math.max(1, Math.round(diffDays / 3));

  const monthIdx = sixtyIndex(pillars.month.sky, pillars.month.earth);
  const step = direction === "순행" ? 1 : -1;
  const list: DecadeFortuneEntry[] = [];
  for (let i = 0; i < 9; i++) {
    const p = pillarFromSixtyIndex(monthIdx + step * (i + 1));
    list.push({ index: i, startAge: startAge + i * 10, ...p });
  }

  return { direction, startAge, list };
}

function buildSummary(pillars: FourPillars, elements: ElementsResult): SummaryResult {
  const dayElement = STEM_ELEMENT[pillars.day.sky];
  const sorted = (Object.entries(elements) as [ElementKey, ElementTally][]).sort(
    (a, b) => b[1].total.count - a[1].total.count
  );
  const dominant = sorted[0][1].total.count > 0 ? sorted[0][0] : null;
  const lacking = sorted[sorted.length - 1];
  // 단순 균형 점수: 5행이 고르게 퍼져 있을수록 100에 가깝게 (이상적 분포와의 편차 기반)
  const total = Object.values(elements).reduce((s, e) => s + e.total.count, 0);
  const ideal = total / 5;
  const variance = Object.values(elements).reduce((s, e) => s + Math.abs(e.total.count - ideal), 0);
  const score = Math.max(0, Math.round(100 - (variance / total) * 100));
  return {
    dayMaster: { char: pillars.day.sky, element: ELEMENT_KO[dayElement] },
    elementBalance: {
      dominant: dominant ? ELEMENT_KO[dominant as ElementKey] : "-",
      lacking: lacking[1].total.count === 0 ? ELEMENT_KO[lacking[0]] : "-",
      score,
    },
  };
}

/**
 * 자체 계산 엔진 메인 진입점. 현재 양력(isLunar=false) 입력만 지원 —
 * 음력 생일 케이스는 KASI의 getSolCalInfo(음->양 변환)를 앞단에 추가해야
 * 하며 아직 미구현 (Phase A 후속 작업으로 남겨둠).
 */
export async function calculateManseryeok(input: ManseryeokInput): Promise<ManseryeokResult> {
  if (input.isLunar) {
    throw new Error("MANSERYEOK_LUNAR_NOT_SUPPORTED");
  }
  const lun = await getLunCalInfo(input.birthYear, input.birthMonth, input.birthDay);

  const day = buildPillar(...(Object.values(parseGanji(lun.lunIljin)) as [Stem, Branch]));
  const hour = input.birthHour != null ? buildHourPillar(day.sky, input.birthHour) : null;

  const hourForBoundary = input.birthHour ?? 12; // 시 모름이면 정오로 근사 (절기 경계 판정용)
  const birthUtc = new Date(
    Date.UTC(input.birthYear, input.birthMonth - 1, input.birthDay, hourForBoundary - 9, 0)
  );
  const { year, month } = computeYearAndMonthPillar(birthUtc);

  const fourPillars: FourPillars = { year, month, day, hour };
  const elements = tallyElements(fourPillars);
  const decadeFortune = computeDecadeFortune(fourPillars, birthUtc, input.isFemale);
  const summary = buildSummary(fourPillars, elements);

  const sortedElements = (Object.entries(elements) as [ElementKey, ElementTally][]).sort(
    (a, b) => b[1].total.count - a[1].total.count
  );
  const dominantElement = sortedElements[0][1].total.count > 0 ? sortedElements[0][0] : null;

  return { fourPillars, elements, decadeFortune, summary, dominantElement };
}
