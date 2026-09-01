/**
 * lib/birthCities.ts
 * ------------------------------------------------------------------
 * The full 71-city birthCity list, confirmed verbatim from SAZU docs
 * (https://www.sazu.app/manse-api/docs#birth-city, 2026-08-25).
 *
 * - Docs claim `ko`/`en` are both valid for the `birthCity` API param, but a
 *   live test against the real API (2026-08-28) showed the `en` value gets
 *   treated as unrecognized and silently drops the Free-tier response into
 *   sandbox mode. Always send `ko` — see resolveBirthCity() below.
 * - utcOffsetMinutes = STANDARD time offset (no DST) — SAZU's server
 *   applies DST automatically based on the birth date, per their docs.
 * - Cities NOT in this list are silently treated as Seoul by the API.
 *   To avoid that silent 9-hour error for users born elsewhere, use
 *   `resolveBirthCity()` below to substitute the nearest-offset city
 *   instead of leaving it to default to Seoul (decision made 2026-08-27).
 * ------------------------------------------------------------------
 */

export interface BirthCity {
  region: string;
  ko: string;
  en: string;
  utcOffsetMinutes: number;
  /** 동경(도) — 한국 도시만 채워둠. 자체 사주 엔진의 진태양시 보정(lib/manseryeok.ts)에 사용. */
  longitude?: number;
}

export const BIRTH_CITIES: BirthCity[] = [
  // 한국
  { region: "한국", ko: "서울", en: "seoul", utcOffsetMinutes: 540, longitude: 126.978 },
  { region: "한국", ko: "인천", en: "incheon", utcOffsetMinutes: 540, longitude: 126.7052 },
  { region: "한국", ko: "부산", en: "busan", utcOffsetMinutes: 540, longitude: 129.0756 },
  { region: "한국", ko: "대구", en: "daegu", utcOffsetMinutes: 540, longitude: 128.6014 },
  { region: "한국", ko: "대전", en: "daejeon", utcOffsetMinutes: 540, longitude: 127.3845 },
  { region: "한국", ko: "광주", en: "gwangju", utcOffsetMinutes: 540, longitude: 126.8526 },
  // 일본
  { region: "일본", ko: "도쿄", en: "tokyo", utcOffsetMinutes: 540 },
  { region: "일본", ko: "오사카", en: "osaka", utcOffsetMinutes: 540 },
  // 중국
  { region: "중국", ko: "베이징", en: "beijing", utcOffsetMinutes: 480 },
  { region: "중국", ko: "상하이", en: "shanghai", utcOffsetMinutes: 480 },
  // 동남아
  { region: "동남아", ko: "홍콩", en: "hong kong", utcOffsetMinutes: 480 },
  { region: "동남아", ko: "싱가포르", en: "singapore", utcOffsetMinutes: 480 },
  { region: "동남아", ko: "타이베이", en: "taipei", utcOffsetMinutes: 480 },
  { region: "동남아", ko: "방콕", en: "bangkok", utcOffsetMinutes: 420 },
  { region: "동남아", ko: "자카르타", en: "jakarta", utcOffsetMinutes: 420 },
  { region: "동남아", ko: "하노이", en: "hanoi", utcOffsetMinutes: 420 },
  // 남아시아
  { region: "남아시아", ko: "뭄바이", en: "mumbai", utcOffsetMinutes: 330 },
  { region: "남아시아", ko: "콜카타", en: "kolkata", utcOffsetMinutes: 330 },
  { region: "남아시아", ko: "뉴델리", en: "new delhi", utcOffsetMinutes: 330 },
  // 중동
  { region: "중동", ko: "두바이", en: "dubai", utcOffsetMinutes: 240 },
  { region: "중동", ko: "리야드", en: "riyadh", utcOffsetMinutes: 180 },
  // 유럽
  { region: "유럽", ko: "모스크바", en: "moscow", utcOffsetMinutes: 180 },
  { region: "유럽", ko: "이스탄불", en: "istanbul", utcOffsetMinutes: 180 },
  { region: "유럽", ko: "헬싱키", en: "helsinki", utcOffsetMinutes: 120 },
  { region: "유럽", ko: "아테네", en: "athens", utcOffsetMinutes: 120 },
  { region: "유럽", ko: "파리", en: "paris", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "베를린", en: "berlin", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "로마", en: "rome", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "마드리드", en: "madrid", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "암스테르담", en: "amsterdam", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "브뤼셀", en: "brussels", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "비엔나", en: "vienna", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "취리히", en: "zurich", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "프라하", en: "prague", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "바르샤바", en: "warsaw", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "스톡홀름", en: "stockholm", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "오슬로", en: "oslo", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "코펜하겐", en: "copenhagen", utcOffsetMinutes: 60 },
  { region: "유럽", ko: "런던", en: "london", utcOffsetMinutes: 0 },
  { region: "유럽", ko: "리스본", en: "lisbon", utcOffsetMinutes: 0 },
  { region: "유럽", ko: "더블린", en: "dublin", utcOffsetMinutes: 0 },
  { region: "유럽", ko: "레이캬비크", en: "reykjavik", utcOffsetMinutes: 0 },
  // 북미
  { region: "북미", ko: "뉴욕", en: "new york", utcOffsetMinutes: -300 },
  { region: "북미", ko: "토론토", en: "toronto", utcOffsetMinutes: -300 },
  { region: "북미", ko: "워싱턴", en: "washington", utcOffsetMinutes: -300 },
  { region: "북미", ko: "마이애미", en: "miami", utcOffsetMinutes: -300 },
  { region: "북미", ko: "보스턴", en: "boston", utcOffsetMinutes: -300 },
  { region: "북미", ko: "애틀랜타", en: "atlanta", utcOffsetMinutes: -300 },
  { region: "북미", ko: "시카고", en: "chicago", utcOffsetMinutes: -360 },
  { region: "북미", ko: "휴스턴", en: "houston", utcOffsetMinutes: -360 },
  { region: "북미", ko: "달라스", en: "dallas", utcOffsetMinutes: -360 },
  { region: "북미", ko: "덴버", en: "denver", utcOffsetMinutes: -420 },
  { region: "북미", ko: "피닉스", en: "phoenix", utcOffsetMinutes: -420 },
  { region: "북미", ko: "로스앤젤레스", en: "los angeles", utcOffsetMinutes: -480 },
  { region: "북미", ko: "샌프란시스코", en: "san francisco", utcOffsetMinutes: -480 },
  { region: "북미", ko: "시애틀", en: "seattle", utcOffsetMinutes: -480 },
  { region: "북미", ko: "밴쿠버", en: "vancouver", utcOffsetMinutes: -480 },
  { region: "북미", ko: "앵커리지", en: "anchorage", utcOffsetMinutes: -540 },
  { region: "북미", ko: "호놀룰루", en: "honolulu", utcOffsetMinutes: -600 },
  // 남미
  { region: "남미", ko: "리우데자네이루", en: "rio de janeiro", utcOffsetMinutes: -180 },
  { region: "남미", ko: "상파울루", en: "sao paulo", utcOffsetMinutes: -180 },
  { region: "남미", ko: "부에노스아이레스", en: "buenos aires", utcOffsetMinutes: -180 },
  { region: "남미", ko: "산티아고", en: "santiago", utcOffsetMinutes: -240 },
  { region: "남미", ko: "리마", en: "lima", utcOffsetMinutes: -300 },
  { region: "남미", ko: "보고타", en: "bogota", utcOffsetMinutes: -300 },
  // 대서양
  { region: "대서양", ko: "아조레스", en: "azores", utcOffsetMinutes: -60 },
  // 오세아니아
  { region: "오세아니아", ko: "오클랜드", en: "auckland", utcOffsetMinutes: 720 },
  { region: "오세아니아", ko: "시드니", en: "sydney", utcOffsetMinutes: 600 },
  { region: "오세아니아", ko: "멜버른", en: "melbourne", utcOffsetMinutes: 600 },
  { region: "오세아니아", ko: "브리즈번", en: "brisbane", utcOffsetMinutes: 600 },
  { region: "오세아니아", ko: "퍼스", en: "perth", utcOffsetMinutes: 480 },
];

/**
 * Resolves a free-typed city name to a valid SAZU `birthCity` value.
 * - Exact match (ko or en, case-insensitive) → that city's `ko` value.
 * - No match → falls back to the listed city with the closest UTC offset,
 *   rather than letting the API silently default to Seoul (9h off for most
 *   non-Korean users). See project notes, decision made 2026-08-27.
 *
 * IMPORTANT — verified live against the real SAZU API (2026-08-28): sending
 * the `en` value (e.g. "seoul") as `birthCity` gets silently misread as an
 * unrecognized city and the Free-tier response degrades to the sandbox
 * SAMPLE_PROFILE_REQUIRED error for every real input. Sending the `ko` value
 * (e.g. "서울") works correctly and returns real calculated data. This
 * contradicts the SDK/docs comment that both are valid — always return `ko`.
 *
 * @param typedCity   what the user typed in the onboarding city field
 * @param utcOffsetMinutes  the actual city's standard UTC offset, e.g. from
 *   a city-timezone lookup or Intl.DateTimeFormat for the browser's zone
 */
export function resolveBirthCity(typedCity: string, utcOffsetMinutes?: number): string {
  const needle = typedCity.trim().toLowerCase();
  const exact = BIRTH_CITIES.find((c) => c.ko === typedCity.trim() || c.en.toLowerCase() === needle);
  if (exact) return exact.ko;

  if (typeof utcOffsetMinutes === "number") {
    const closest = [...BIRTH_CITIES].sort(
      (a, b) => Math.abs(a.utcOffsetMinutes - utcOffsetMinutes) - Math.abs(b.utcOffsetMinutes - utcOffsetMinutes)
    )[0];
    if (closest) return closest.ko;
  }

  return "서울"; // last-resort fallback, matches the API's own default
}

const KST_REFERENCE_MERIDIAN = 135; // 한국 표준시(KST)의 기준 경도

/**
 * 진태양시(眞太陽時) 보정값(분) — 한국 표준시(135°E 기준)와 실제 도시 경도의
 * 차이를 시간으로 환산. 서울은 약 -32분(126.98°E이므로 135°E보다 해가 늦게 뜸).
 *
 * 한국 도시만 지원 — 외국 도시는 각자 별도의 표준 자오선을 쓰기 때문에 이 공식이
 * 그대로 적용되지 않아 보정하지 않음(0분 반환). 한국 도시가 아니거나 인식 못한
 * 입력은 서울 기준(가장 흔한 실사용 케이스)으로 근사.
 */
export function getKoreanLongitudeCorrectionMinutes(typedCity?: string | null): number {
  const seoul = BIRTH_CITIES.find((c) => c.ko === "서울")!;
  if (!typedCity) return (seoul.longitude! - KST_REFERENCE_MERIDIAN) * 4;

  const needle = typedCity.trim().toLowerCase();
  const match = BIRTH_CITIES.find((c) => c.region === "한국" && (c.ko === typedCity.trim() || c.en.toLowerCase() === needle));
  if (match?.longitude != null) return (match.longitude - KST_REFERENCE_MERIDIAN) * 4;

  const isKnownForeignCity = BIRTH_CITIES.some((c) => c.region !== "한국" && (c.ko === typedCity.trim() || c.en.toLowerCase() === needle));
  if (isKnownForeignCity) return 0;

  return (seoul.longitude! - KST_REFERENCE_MERIDIAN) * 4; // 인식 못한 입력은 서울로 근사
}

/** Group cities by region for a <select><optgroup> dropdown. */
export function groupBirthCitiesByRegion(): Record<string, BirthCity[]> {
  return BIRTH_CITIES.reduce((acc, city) => {
    (acc[city.region] ??= []).push(city);
    return acc;
  }, {} as Record<string, BirthCity[]>);
}
