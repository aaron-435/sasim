/**
 * lib/dailyFortune.ts
 * ------------------------------------------------------------------
 * "오늘의 운세" / "이번주 운세" 데이터 소스. 새 사주 산식을 만들지 않고
 * 이미 검증된 두 조각을 그대로 재사용한다:
 *
 *   1. calculateManseryeok의 일주(day pillar) 조회(KASI 기반, 모든 생년월일
 *      계산이 거치는 바로 그 경로) — 특정 "날짜"의 일간만 필요하고 실제
 *      인물이 아니므로, birthHour=null / isFemale은 결과에 영향 없는 값으로
 *      호출한다(일주는 태어난 시각·장소가 아니라 그날짜에만 의존).
 *   2. lib/compatibility.ts의 일간 관계 엔진 — "오늘의 기운과 나"는
 *      "두 사람의 일간 관계"와 수학적으로 같은 문제라서(상생/상극/동일),
 *      오늘의 일간을 "상대방"처럼 넘기기만 하면 그대로 재사용된다.
 *      서사 문구는 여기서 만들지 않는다 — mobile/lib/dailyFortuneContent.ts가
 *      relation 값을 받아 로케일별 카피를 입힌다(compatibilityContent.ts와
 *      같은 분리 원칙).
 * ------------------------------------------------------------------
 */

import { calculateManseryeok } from "./manseryeok";
import { calculateCompatibility, type CompatibilityResult } from "./compatibility";

export interface DayFortune {
  date: string; // YYYY-MM-DD, KST
  dayMaster: { char: string; element: string };
  compatibility: CompatibilityResult | null;
}

// 하루치 일간은 계산이 끝나면 다시 바뀌지 않는 값이라 프로세스 내 캐시로 KASI
// 왕복을 줄인다 — lib/rateLimit.ts와 같은 한계(서버리스 인스턴스별 로컬 캐시,
// 인스턴스 간 공유 안 됨)를 그대로 가진다.
const dayMasterCache = new Map<string, { char: string; element: string }>();

function kstDate(offsetDays: number): { year: number; month: number; day: number; iso: string } {
  const kstNow = new Date(Date.now() + 9 * 3600 * 1000);
  kstNow.setUTCDate(kstNow.getUTCDate() + offsetDays);
  const year = kstNow.getUTCFullYear();
  const month = kstNow.getUTCMonth() + 1;
  const day = kstNow.getUTCDate();
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { year, month, day, iso };
}

async function getDayMaster(year: number, month: number, day: number, iso: string): Promise<{ char: string; element: string }> {
  const cached = dayMasterCache.get(iso);
  if (cached) return cached;
  const result = await calculateManseryeok({ birthYear: year, birthMonth: month, birthDay: day, birthHour: null, isFemale: true });
  dayMasterCache.set(iso, result.summary.dayMaster);
  return result.summary.dayMaster;
}

export async function getDailyFortune(selfDayMasterChar: string, offsetDays = 0): Promise<DayFortune> {
  const { year, month, day, iso } = kstDate(offsetDays);
  const dayMaster = await getDayMaster(year, month, day, iso);
  return { date: iso, dayMaster, compatibility: calculateCompatibility(selfDayMasterChar, dayMaster.char) };
}

/** 오늘부터 앞으로 7일 — 이미 지난 요일을 되짚는 대신 "이번주"를 "다가오는 한
 *  주"로 다룬다(로케일마다 다른 주 시작 요일 문제도 자연히 피해간다).
 *
 * KASI가 동시 요청에 429를 주는 경우가 있었던 이력(사주 유형 유명인 콘텐츠
 * 생성 때 확인됨) 때문에 allSettled로 받는다 — 하루치가 실패해도 나머지
 * 6일치는 그대로 보여주는 게, 이번 주 전체를 에러로 날리는 것보다 낫다. */
export async function getWeeklyFortune(selfDayMasterChar: string): Promise<DayFortune[]> {
  const settled = await Promise.allSettled([0, 1, 2, 3, 4, 5, 6].map((offset) => getDailyFortune(selfDayMasterChar, offset)));
  return settled.filter((r): r is PromiseFulfilledResult<DayFortune> => r.status === "fulfilled").map((r) => r.value);
}
