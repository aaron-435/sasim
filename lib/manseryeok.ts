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
 * UPDATE 2026-09-01 (v1): added 진태양시(longitude) correction after a user
 * caught a wrong hour pillar in production (1997-10-21 03:00 Seoul male —
 * expected 기축, we gave 경인). Root cause: no longitude correction was
 * applied at all — Seoul's correction vs the KST reference meridian
 * (135°E) is about -32min, big enough to flip the branch for any birth
 * within ~32min of a two-hour boundary.
 *
 * UPDATE 2026-09-01 (v2): generalized to work for ANY country, not just
 * Korea. v1 assumed every birthHour/Minute was a KST wall-clock reading
 * (hardcoded "-9" for UTC conversion) — silently wrong for a birthCity
 * outside Korea, since e.g. "14:00" entered for a New York birth is a
 * *local* New York clock reading, off by 14 real hours from what a
 * KST-9 conversion would produce. Now uses two cleanly separated values
 * (see getLocationCorrection() in lib/birthCities.ts, backed by Node's
 * built-in Intl/ICU — no extra timezone dependency needed):
 *   1. civilOffsetMinutes — the birth city's actual (DST-aware) UTC
 *      offset, used ONLY to convert the input local clock time into the
 *      correct absolute UTC instant. That instant alone (no further
 *      location adjustment) is what the year/month pillar's 절기
 *      boundary check and decadeFortune use — a solar-longitude crossing
 *      is a specific universal instant, identical for everyone on Earth,
 *      so it needs the *correct* UTC instant but no per-location tweak
 *      beyond that.
 *   2. longitude — combined with that UTC instant via the plain mean-
 *      solar-time formula (true local solar time = UTC + longitude*4min,
 *      no timezone/DST concepts involved) to get the location's true
 *      solar clock reading. THIS is what decides the hour pillar branch,
 *      and which calendar date to hand KASI for the day pillar (a
 *      correction can push a birth near local midnight into the
 *      previous/next day).
 * Re-verified against all 5 golden Korea samples after each change —
 * still exact matches (none of their birth times are close enough to a
 * boundary to flip either way).
 *
 * UPDATE 2026-09-01 (v3): worldwide city picker (lib/worldCities.ts,
 * ~4800 cities vs the old 71-city SAZU-inherited list) replaces free-typed
 * city names for new requests. When `birthCityId` resolves to a known
 * city, its exact lat/lng + IANA timezone are used directly (no
 * name-matching involved). `birthCity` (a plain name string) is kept as
 * a fallback path — against the small curated lib/birthCities.ts list —
 * for requests that don't carry a birthCityId (SAZU-fallback requests,
 * or direct calculateManseryeok() calls that predate the picker).
 * ------------------------------------------------------------------
 */

import { getLunCalInfo } from "./kasi";
import { findCurrentMonthTerm, MONTH_TERMS } from "./solarTerms";
import { getLocationCorrection, getDstAwareUtcOffsetMinutes } from "./birthCities";
import { getWorldCityById } from "./worldCities";

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

/** 보정된 하루 중 분(0-1439, 자정=0)으로부터 지지 인덱스(0=자...11=해) 산출 */
function branchIndexFromMinutes(minutesOfDay: number): number {
  const shifted = (((minutesOfDay + 60) % 1440) + 1440) % 1440;
  return Math.floor(shifted / 120);
}

function buildHourPillar(dayStem: Stem, correctedMinutesOfDay: number): Pillar {
  const branchIdx = branchIndexFromMinutes(correctedMinutesOfDay);
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
  birthMinute?: number | null;
  isFemale: boolean;
  /** lib/worldCities.ts의 WorldCity.id — 있으면 이걸로 정밀 조회(전세계). */
  birthCityId?: string | null;
  /** 표시용/폴백용 도시 이름. birthCityId가 없을 때만 lib/birthCities.ts의
   *  작은 한국 중심 목록에서 근사 매칭 (진태양시 보정도 이 목록 범위에서만 적용). */
  birthCity?: string | null;
  isLunar?: boolean; // NOTE: only solar-calendar input supported for now (see calculateManseryeok)
}

export interface ManseryeokResult {
  fourPillars: FourPillars;
  elements: ElementsResult;
  decadeFortune: DecadeFortune;
  /** 계산에 실제로 사용된 위치 보정 정보 — QA/디버그 화면에서 확인용 */
  resolvedLocation: { source: "worldCity" | "koreaFallback"; cityLabel: string; longitude: number; civilOffsetMinutes: number };
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

  // 1) 입력한 현지 시각(모르면 정오로 근사) -> 절대 UTC 시각. DST까지 반영된 그
  // 도시의 실제 오프셋만 사용 — 절기(태양황경) 판정은 이 UTC 시각 하나면 충분하다.
  const dstCheckDate = new Date(Date.UTC(input.birthYear, input.birthMonth - 1, input.birthDay, 12));
  const worldCity = input.birthCityId ? getWorldCityById(input.birthCityId) : undefined;
  const resolvedLocation = worldCity
    ? {
        source: "worldCity" as const,
        cityLabel: `${worldCity.cityDisplay}, ${worldCity.countryDisplay}`,
        longitude: worldCity.lng,
        civilOffsetMinutes: getDstAwareUtcOffsetMinutes(worldCity.timezone, dstCheckDate),
      }
    : {
        source: "koreaFallback" as const,
        cityLabel: input.birthCity?.trim() || "서울(기본값)",
        ...getLocationCorrection(input.birthCity, dstCheckDate),
      };
  const { civilOffsetMinutes, longitude } = resolvedLocation;
  const rawMinutesOfDay = (input.birthHour ?? 12) * 60 + (input.birthMinute ?? 0);
  const birthUtc = new Date(
    Date.UTC(input.birthYear, input.birthMonth - 1, input.birthDay, 0, 0) +
      rawMinutesOfDay * 60000 -
      civilOffsetMinutes * 60000
  );
  const { year, month } = computeYearAndMonthPillar(birthUtc);

  // 2) 그 UTC 시각으로부터 "진태양시"(그 지역 실제 태양 기준 시각)를 구한다 —
  // 표준시/DST를 거치지 않는 순수 공식: 진태양시 = UTC + 경도*4분.
  const utcMinutesOfDay = birthUtc.getUTCHours() * 60 + birthUtc.getUTCMinutes();
  const solarTotalMinutes = utcMinutesOfDay + longitude * 4;
  const solarDayOffset = Math.floor(solarTotalMinutes / 1440);
  const solarMinutesOfDay = ((solarTotalMinutes % 1440) + 1440) % 1440;

  const solarDate = new Date(Date.UTC(birthUtc.getUTCFullYear(), birthUtc.getUTCMonth(), birthUtc.getUTCDate()));
  solarDate.setUTCDate(solarDate.getUTCDate() + solarDayOffset);
  const sYear = solarDate.getUTCFullYear();
  const sMonth = solarDate.getUTCMonth() + 1;
  const sDay = solarDate.getUTCDate();

  const lun = await getLunCalInfo(sYear, sMonth, sDay);

  const day = buildPillar(...(Object.values(parseGanji(lun.lunIljin)) as [Stem, Branch]));
  const hour = input.birthHour != null ? buildHourPillar(day.sky, solarMinutesOfDay) : null;

  const fourPillars: FourPillars = { year, month, day, hour };
  const elements = tallyElements(fourPillars);
  const decadeFortune = computeDecadeFortune(fourPillars, birthUtc, input.isFemale);
  const summary = buildSummary(fourPillars, elements);

  const sortedElements = (Object.entries(elements) as [ElementKey, ElementTally][]).sort(
    (a, b) => b[1].total.count - a[1].total.count
  );
  const dominantElement = sortedElements[0][1].total.count > 0 ? sortedElements[0][0] : null;

  return { fourPillars, elements, decadeFortune, summary, dominantElement, resolvedLocation };
}
