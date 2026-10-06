/**
 * lib/solarTerms.ts
 * ------------------------------------------------------------------
 * 태양 겉보기 황경(apparent ecliptic longitude) 계산 + 24절기 정밀 시각
 * 산출. KASI의 get24DivisionsInfo(특일정보)는 2000~2028년만 커버하고,
 * 그마저도 "하루" 단위 값이라(절입 당일 새벽~밤 어느 시각이든 그날 전체를
 * 이미 넘어간 것으로 취급) 절입 당일 태생자의 월주/년주가 틀리는 사례를
 * 발견했다 (예: 1970-05-05 10시생 — 실제 입하는 그날 늦은 시각이라 아직
 * 진월(辰月)인데, 날짜 단위 API 값은 이미 사월(巳月)로 넘어가 있었음).
 *
 * 이를 근본적으로 해결하기 위해 태양 황경을 직접 계산한다(Meeus, Astronomical
 * Algorithms 저低정밀도 공식 — 오차 약 0.01도 이내, 시간으로 환산하면 1분 미만
 * 오차. 사주 절입 판정에는 충분한 정밀도). 연도 범위 제한 없이 어떤 생년월일에도
 * 동작한다.
 * ------------------------------------------------------------------
 */

const DEG2RAD = Math.PI / 180;

function toJulianDay(utcDate: Date): number {
  return utcDate.getTime() / 86400000 + 2440587.5;
}

function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/** 저정밀도 태양 겉보기 황경(도, 0-360) — Meeus ch.25 */
export function sunApparentLongitude(utcDate: Date): number {
  const jd = toJulianDay(utcDate);
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mrad = M * DEG2RAD;
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
    0.000289 * Math.sin(3 * Mrad);
  const trueLongitude = L0 + C;
  // 겉보기 황경 보정(장동+광행차, 저정밀도)
  const omega = 125.04 - 1934.136 * T;
  const apparent = trueLongitude - 0.00569 - 0.00478 * Math.sin(omega * DEG2RAD);
  return normalizeDeg(apparent);
}

/**
 * targetLongitude(도)에 도달하는 정확한 UTC 시각을, guessUtc 근처에서
 * 뉴턴식 반복으로 찾는다. 하루 평균 이동량(~0.9856도)을 이용해 몇 차례
 * 반복하면 1초 이내로 수렴한다.
 */
export function findSolarLongitudeCrossing(targetLongitude: number, guessUtc: Date): Date {
  let t = guessUtc.getTime();
  const DEG_PER_DAY = 0.9856002;
  for (let i = 0; i < 8; i++) {
    const current = sunApparentLongitude(new Date(t));
    let diff = targetLongitude - current;
    // -180~180 범위로 정규화해서 최단 방향으로 이동
    diff = ((diff + 180) % 360 + 360) % 360 - 180;
    const dtDays = diff / DEG_PER_DAY;
    t += dtDays * 86400000;
    if (Math.abs(dtDays) < 1e-6) break;
  }
  return new Date(t);
}

// 12절(月을 여는 절기) — 태양황경과 지지(월지) 매핑
export const MONTH_TERMS: { longitude: number; name: string; branch: string }[] = [
  { longitude: 315, name: "입춘", branch: "인" },
  { longitude: 345, name: "경칩", branch: "묘" },
  { longitude: 15, name: "청명", branch: "진" },
  { longitude: 45, name: "입하", branch: "사" },
  { longitude: 75, name: "망종", branch: "오" },
  { longitude: 105, name: "소서", branch: "미" },
  { longitude: 135, name: "입추", branch: "신" },
  { longitude: 165, name: "백로", branch: "유" },
  { longitude: 195, name: "한로", branch: "술" },
  { longitude: 225, name: "입동", branch: "해" },
  { longitude: 255, name: "대설", branch: "자" },
  { longitude: 285, name: "소한", branch: "축" },
];

/**
 * 주어진 UTC 시각 기준, 해당 시각이 속한 절월(節月)의 시작 절기 인덱스
 * (MONTH_TERMS 배열 인덱스)와 그 절입 정확 시각을 반환.
 * approxDate는 탐색 시작점(대략적인 달력 날짜)으로, 각 절기의 평균 날짜
 * 근처를 순회하며 birthUtc 직전 가장 가까운 절입을 찾는다.
 */
export function findCurrentMonthTerm(birthUtc: Date): { termIndex: number; crossingUtc: Date; nextCrossingUtc: Date } {
  // 대략적 절기 날짜(평년 기준, ±1~2일 오차 허용 — Newton 반복으로 정밀 보정됨)
  const approxMonthDay: [number, number][] = [
    [2, 4], [3, 6], [4, 5], [5, 5], [6, 6], [7, 7],
    [8, 8], [9, 8], [10, 8], [11, 7], [12, 7], [1, 6],
  ];
  const year = birthUtc.getUTCFullYear();

  // birthUtc 전후로 충분히 넓게(전년도 12월 ~ 익년도 2월) 모든 절 후보를 정밀 계산
  const candidates: { termIndex: number; crossingUtc: Date }[] = [];
  for (const yearOffset of [-1, 0, 1]) {
    for (let i = 0; i < MONTH_TERMS.length; i++) {
      const [mo, da] = approxMonthDay[i];
      // 소한(index11)/입춘(index0)은 다음해 1~2월에 해당하므로 연도 보정
      const calYear = mo <= 2 ? year + yearOffset + 1 : year + yearOffset;
      const guess = new Date(Date.UTC(calYear, mo - 1, da, 0, 0));
      const crossing = findSolarLongitudeCrossing(MONTH_TERMS[i].longitude, guess);
      candidates.push({ termIndex: i, crossingUtc: crossing });
    }
  }
  candidates.sort((a, b) => a.crossingUtc.getTime() - b.crossingUtc.getTime());

  let current = candidates[0];
  let next = candidates[1];
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].crossingUtc.getTime() <= birthUtc.getTime()) {
      current = candidates[i];
      next = candidates[i + 1] ?? candidates[i];
    } else {
      break;
    }
  }
  return { termIndex: current.termIndex, crossingUtc: current.crossingUtc, nextCrossingUtc: next.crossingUtc };
}

// ------------------------------------------------------------------
// 24절기 달력 (2026-10-06, 앱의 절기 알림용). 위 계산을 그대로 쓰고 범위만 넓힌다:
// 황경 0°부터 15°마다 24개 절기를, 주어진 시각부터 앞으로 `days`일 안에 드는 것만
// 시각 순으로 돌려준다. 키는 표시용이 아닌 내부 키(병음)이고, 이름·문구는 앱이 입힌다.
// 계절 오행은 그 절기가 속한 절월의 월지 오행이다(입춘·우수 = 인월 = 목 …).
// ------------------------------------------------------------------

export const SOLAR_TERM_KEYS: Record<number, string> = {
  0: "chunfen", 15: "qingming", 30: "guyu", 45: "lixia", 60: "xiaoman", 75: "mangzhong",
  90: "xiazhi", 105: "xiaoshu", 120: "dashu", 135: "liqiu", 150: "chushu", 165: "bailu",
  180: "qiufen", 195: "hanlu", 210: "shuangjiang", 225: "lidong", 240: "xiaoxue", 255: "daxue",
  270: "dongzhi", 285: "xiaohan", 300: "dahan", 315: "lichun", 330: "yushui", 345: "jingzhe",
};

const BRANCH_SEASON_ELEMENT: Record<string, "wood" | "fire" | "earth" | "metal" | "water"> = {
  인: "wood", 묘: "wood", 진: "earth", 사: "fire", 오: "fire", 미: "earth",
  신: "metal", 유: "metal", 술: "earth", 해: "water", 자: "water", 축: "earth",
};

export interface SolarTermEvent {
  key: string;
  longitude: number;
  /** Exact crossing time, ISO UTC. */
  at: string;
  /** True for the 12 terms that open a saju month (입춘, 경칩 …). */
  opensMonth: boolean;
  /** Element of the saju month this term belongs to. */
  seasonElement: "wood" | "fire" | "earth" | "metal" | "water";
}

export function upcomingSolarTerms(fromUtc: Date, days = 366): SolarTermEvent[] {
  const end = fromUtc.getTime() + days * 86400000;
  const year = fromUtc.getUTCFullYear();
  const events: SolarTermEvent[] = [];
  for (const y of [year - 1, year, year + 1, year + 2]) {
    for (let longitude = 0; longitude < 360; longitude += 15) {
      // 춘분(3/20 무렵)에서 하루 ~0.9856°씩 — 뉴턴 반복의 출발점일 뿐이다.
      const guess = new Date(Date.UTC(y, 2, 20) + (longitude / 0.9856002) * 86400000);
      const crossing = findSolarLongitudeCrossing(longitude, guess);
      const t = crossing.getTime();
      if (t < fromUtc.getTime() || t >= end) continue;
      const monthStart = (315 + 30 * Math.floor((((longitude - 315) % 360) + 360) % 360 / 30)) % 360;
      const monthTerm = MONTH_TERMS.find((m) => m.longitude === monthStart)!;
      events.push({
        key: SOLAR_TERM_KEYS[longitude],
        longitude,
        at: crossing.toISOString(),
        opensMonth: monthStart === longitude,
        seasonElement: BRANCH_SEASON_ELEMENT[monthTerm.branch],
      });
    }
  }
  // 같은 절기가 두 출발 연도에서 같은 시각으로 잡힐 수 있어 시각으로 한 번 거른다.
  const seen = new Set<string>();
  return events
    .sort((a, b) => a.at.localeCompare(b.at))
    .filter((e) => {
      const k = `${e.key}|${e.at.slice(0, 16)}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
}
