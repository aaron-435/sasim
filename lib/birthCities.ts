/**
 * lib/birthCities.ts
 * ------------------------------------------------------------------
 * The original 71-city birthCity list, confirmed verbatim from SAZU docs
 * (https://www.sazu.app/manse-api/docs#birth-city, 2026-08-25). Kept for
 * two narrower purposes now that lib/worldCities.ts (~4800 cities) is the
 * primary picker — see that file's header:
 *   1. calculateViaSazuApi()'s `birthCity` param, when the self-hosted
 *      engine fails over to the real SAZU API (only SAZU's own cities work
 *      there — sending it `ko`, never `en`: a live test against the real
 *      API on 2026-08-28 showed `en` values get silently misread as
 *      unrecognized and degrade the Free-tier response to sandbox mode).
 *   2. getLocationCorrection() below — the small Korea-precision fallback
 *      lib/manseryeok.ts uses when a request has no `birthCityId` (i.e.
 *      didn't come through the worldCities picker).
 * - `longitude` + `timeZone` (added 2026-09-01) are for #2's worldwide
 *   진태양시 correction. `timeZone` is a real IANA identifier so Node's
 *   built-in Intl can resolve the DST-correct offset for the specific
 *   birth date (no extra dependency needed — verified against Node's
 *   Intl.DateTimeFormat directly).
 * ------------------------------------------------------------------
 */

export interface BirthCity {
  region: string;
  ko: string;
  en: string;
  utcOffsetMinutes: number;
  longitude: number;
  timeZone: string;
}

export const BIRTH_CITIES: BirthCity[] = [
  // 한국
  { region: "한국", ko: "서울", en: "seoul", utcOffsetMinutes: 540, longitude: 126.978, timeZone: "Asia/Seoul" },
  { region: "한국", ko: "인천", en: "incheon", utcOffsetMinutes: 540, longitude: 126.7052, timeZone: "Asia/Seoul" },
  { region: "한국", ko: "부산", en: "busan", utcOffsetMinutes: 540, longitude: 129.0756, timeZone: "Asia/Seoul" },
  { region: "한국", ko: "대구", en: "daegu", utcOffsetMinutes: 540, longitude: 128.6014, timeZone: "Asia/Seoul" },
  { region: "한국", ko: "대전", en: "daejeon", utcOffsetMinutes: 540, longitude: 127.3845, timeZone: "Asia/Seoul" },
  { region: "한국", ko: "광주", en: "gwangju", utcOffsetMinutes: 540, longitude: 126.8526, timeZone: "Asia/Seoul" },
  // 일본
  { region: "일본", ko: "도쿄", en: "tokyo", utcOffsetMinutes: 540, longitude: 139.6503, timeZone: "Asia/Tokyo" },
  { region: "일본", ko: "오사카", en: "osaka", utcOffsetMinutes: 540, longitude: 135.5023, timeZone: "Asia/Tokyo" },
  // 중국
  { region: "중국", ko: "베이징", en: "beijing", utcOffsetMinutes: 480, longitude: 116.4074, timeZone: "Asia/Shanghai" },
  { region: "중국", ko: "상하이", en: "shanghai", utcOffsetMinutes: 480, longitude: 121.4737, timeZone: "Asia/Shanghai" },
  // 동남아
  { region: "동남아", ko: "홍콩", en: "hong kong", utcOffsetMinutes: 480, longitude: 114.1694, timeZone: "Asia/Hong_Kong" },
  { region: "동남아", ko: "싱가포르", en: "singapore", utcOffsetMinutes: 480, longitude: 103.8198, timeZone: "Asia/Singapore" },
  { region: "동남아", ko: "타이베이", en: "taipei", utcOffsetMinutes: 480, longitude: 121.5654, timeZone: "Asia/Taipei" },
  { region: "동남아", ko: "방콕", en: "bangkok", utcOffsetMinutes: 420, longitude: 100.5018, timeZone: "Asia/Bangkok" },
  { region: "동남아", ko: "자카르타", en: "jakarta", utcOffsetMinutes: 420, longitude: 106.8456, timeZone: "Asia/Jakarta" },
  { region: "동남아", ko: "하노이", en: "hanoi", utcOffsetMinutes: 420, longitude: 105.8342, timeZone: "Asia/Ho_Chi_Minh" },
  // 남아시아
  { region: "남아시아", ko: "뭄바이", en: "mumbai", utcOffsetMinutes: 330, longitude: 72.8777, timeZone: "Asia/Kolkata" },
  { region: "남아시아", ko: "콜카타", en: "kolkata", utcOffsetMinutes: 330, longitude: 88.3639, timeZone: "Asia/Kolkata" },
  { region: "남아시아", ko: "뉴델리", en: "new delhi", utcOffsetMinutes: 330, longitude: 77.1025, timeZone: "Asia/Kolkata" },
  // 중동
  { region: "중동", ko: "두바이", en: "dubai", utcOffsetMinutes: 240, longitude: 55.2708, timeZone: "Asia/Dubai" },
  { region: "중동", ko: "리야드", en: "riyadh", utcOffsetMinutes: 180, longitude: 46.6753, timeZone: "Asia/Riyadh" },
  // 유럽
  { region: "유럽", ko: "모스크바", en: "moscow", utcOffsetMinutes: 180, longitude: 37.6173, timeZone: "Europe/Moscow" },
  { region: "유럽", ko: "이스탄불", en: "istanbul", utcOffsetMinutes: 180, longitude: 28.9784, timeZone: "Europe/Istanbul" },
  { region: "유럽", ko: "헬싱키", en: "helsinki", utcOffsetMinutes: 120, longitude: 24.9384, timeZone: "Europe/Helsinki" },
  { region: "유럽", ko: "아테네", en: "athens", utcOffsetMinutes: 120, longitude: 23.7275, timeZone: "Europe/Athens" },
  { region: "유럽", ko: "파리", en: "paris", utcOffsetMinutes: 60, longitude: 2.3522, timeZone: "Europe/Paris" },
  { region: "유럽", ko: "베를린", en: "berlin", utcOffsetMinutes: 60, longitude: 13.405, timeZone: "Europe/Berlin" },
  { region: "유럽", ko: "로마", en: "rome", utcOffsetMinutes: 60, longitude: 12.4964, timeZone: "Europe/Rome" },
  { region: "유럽", ko: "마드리드", en: "madrid", utcOffsetMinutes: 60, longitude: -3.7038, timeZone: "Europe/Madrid" },
  { region: "유럽", ko: "암스테르담", en: "amsterdam", utcOffsetMinutes: 60, longitude: 4.9041, timeZone: "Europe/Amsterdam" },
  { region: "유럽", ko: "브뤼셀", en: "brussels", utcOffsetMinutes: 60, longitude: 4.3517, timeZone: "Europe/Brussels" },
  { region: "유럽", ko: "비엔나", en: "vienna", utcOffsetMinutes: 60, longitude: 16.3738, timeZone: "Europe/Vienna" },
  { region: "유럽", ko: "취리히", en: "zurich", utcOffsetMinutes: 60, longitude: 8.5417, timeZone: "Europe/Zurich" },
  { region: "유럽", ko: "프라하", en: "prague", utcOffsetMinutes: 60, longitude: 14.4378, timeZone: "Europe/Prague" },
  { region: "유럽", ko: "바르샤바", en: "warsaw", utcOffsetMinutes: 60, longitude: 21.0122, timeZone: "Europe/Warsaw" },
  { region: "유럽", ko: "스톡홀름", en: "stockholm", utcOffsetMinutes: 60, longitude: 18.0686, timeZone: "Europe/Stockholm" },
  { region: "유럽", ko: "오슬로", en: "oslo", utcOffsetMinutes: 60, longitude: 10.7522, timeZone: "Europe/Oslo" },
  { region: "유럽", ko: "코펜하겐", en: "copenhagen", utcOffsetMinutes: 60, longitude: 12.5683, timeZone: "Europe/Copenhagen" },
  { region: "유럽", ko: "런던", en: "london", utcOffsetMinutes: 0, longitude: -0.1278, timeZone: "Europe/London" },
  { region: "유럽", ko: "리스본", en: "lisbon", utcOffsetMinutes: 0, longitude: -9.1393, timeZone: "Europe/Lisbon" },
  { region: "유럽", ko: "더블린", en: "dublin", utcOffsetMinutes: 0, longitude: -6.2603, timeZone: "Europe/Dublin" },
  { region: "유럽", ko: "레이캬비크", en: "reykjavik", utcOffsetMinutes: 0, longitude: -21.9426, timeZone: "Atlantic/Reykjavik" },
  // 북미
  { region: "북미", ko: "뉴욕", en: "new york", utcOffsetMinutes: -300, longitude: -74.006, timeZone: "America/New_York" },
  { region: "북미", ko: "토론토", en: "toronto", utcOffsetMinutes: -300, longitude: -79.3832, timeZone: "America/Toronto" },
  { region: "북미", ko: "워싱턴", en: "washington", utcOffsetMinutes: -300, longitude: -77.0369, timeZone: "America/New_York" },
  { region: "북미", ko: "마이애미", en: "miami", utcOffsetMinutes: -300, longitude: -80.1918, timeZone: "America/New_York" },
  { region: "북미", ko: "보스턴", en: "boston", utcOffsetMinutes: -300, longitude: -71.0589, timeZone: "America/New_York" },
  { region: "북미", ko: "애틀랜타", en: "atlanta", utcOffsetMinutes: -300, longitude: -84.388, timeZone: "America/New_York" },
  { region: "북미", ko: "시카고", en: "chicago", utcOffsetMinutes: -360, longitude: -87.6298, timeZone: "America/Chicago" },
  { region: "북미", ko: "휴스턴", en: "houston", utcOffsetMinutes: -360, longitude: -95.3698, timeZone: "America/Chicago" },
  { region: "북미", ko: "달라스", en: "dallas", utcOffsetMinutes: -360, longitude: -96.797, timeZone: "America/Chicago" },
  { region: "북미", ko: "덴버", en: "denver", utcOffsetMinutes: -420, longitude: -104.9903, timeZone: "America/Denver" },
  { region: "북미", ko: "피닉스", en: "phoenix", utcOffsetMinutes: -420, longitude: -112.074, timeZone: "America/Phoenix" },
  { region: "북미", ko: "로스앤젤레스", en: "los angeles", utcOffsetMinutes: -480, longitude: -118.2437, timeZone: "America/Los_Angeles" },
  { region: "북미", ko: "샌프란시스코", en: "san francisco", utcOffsetMinutes: -480, longitude: -122.4194, timeZone: "America/Los_Angeles" },
  { region: "북미", ko: "시애틀", en: "seattle", utcOffsetMinutes: -480, longitude: -122.3321, timeZone: "America/Los_Angeles" },
  { region: "북미", ko: "밴쿠버", en: "vancouver", utcOffsetMinutes: -480, longitude: -123.1207, timeZone: "America/Vancouver" },
  { region: "북미", ko: "앵커리지", en: "anchorage", utcOffsetMinutes: -540, longitude: -149.9003, timeZone: "America/Anchorage" },
  { region: "북미", ko: "호놀룰루", en: "honolulu", utcOffsetMinutes: -600, longitude: -157.8583, timeZone: "Pacific/Honolulu" },
  // 남미
  { region: "남미", ko: "리우데자네이루", en: "rio de janeiro", utcOffsetMinutes: -180, longitude: -43.1729, timeZone: "America/Sao_Paulo" },
  { region: "남미", ko: "상파울루", en: "sao paulo", utcOffsetMinutes: -180, longitude: -46.6333, timeZone: "America/Sao_Paulo" },
  { region: "남미", ko: "부에노스아이레스", en: "buenos aires", utcOffsetMinutes: -180, longitude: -58.3816, timeZone: "America/Argentina/Buenos_Aires" },
  { region: "남미", ko: "산티아고", en: "santiago", utcOffsetMinutes: -240, longitude: -70.6693, timeZone: "America/Santiago" },
  { region: "남미", ko: "리마", en: "lima", utcOffsetMinutes: -300, longitude: -77.0428, timeZone: "America/Lima" },
  { region: "남미", ko: "보고타", en: "bogota", utcOffsetMinutes: -300, longitude: -74.0721, timeZone: "America/Bogota" },
  // 대서양
  { region: "대서양", ko: "아조레스", en: "azores", utcOffsetMinutes: -60, longitude: -25.6866, timeZone: "Atlantic/Azores" },
  // 오세아니아
  { region: "오세아니아", ko: "오클랜드", en: "auckland", utcOffsetMinutes: 720, longitude: 174.7633, timeZone: "Pacific/Auckland" },
  { region: "오세아니아", ko: "시드니", en: "sydney", utcOffsetMinutes: 600, longitude: 151.2093, timeZone: "Australia/Sydney" },
  { region: "오세아니아", ko: "멜버른", en: "melbourne", utcOffsetMinutes: 600, longitude: 144.9631, timeZone: "Australia/Melbourne" },
  { region: "오세아니아", ko: "브리즈번", en: "brisbane", utcOffsetMinutes: 600, longitude: 153.0251, timeZone: "Australia/Brisbane" },
  { region: "오세아니아", ko: "퍼스", en: "perth", utcOffsetMinutes: 480, longitude: 115.8605, timeZone: "Australia/Perth" },
];

const SEOUL = BIRTH_CITIES.find((c) => c.ko === "서울")!;

function findCity(typedCity?: string | null): BirthCity {
  if (!typedCity) return SEOUL;
  const needle = typedCity.trim().toLowerCase();
  const match = BIRTH_CITIES.find((c) => c.ko === typedCity.trim() || c.en.toLowerCase() === needle);
  return match ?? SEOUL; // 인식 못한 입력은 서울로 근사
}

/**
 * DST를 반영한 실제 UTC 오프셋(분)을, IANA 시간대 + 특정 날짜 기준으로 계산.
 * Node의 Intl(ICU 내장)만으로 동작 — 별도 타임존 라이브러리 불필요.
 * (검증됨: America/New_York 2001-07 -240, 2001-01 -300 / Australia/Sydney
 * 남반구 서머타임도 올바르게 반영됨.)
 */
export function getDstAwareUtcOffsetMinutes(timeZone: string, dateForDstCheck: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" }).formatToParts(
    dateForDstCheck
  );
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  const match = tzName.match(/GMT([+-])(\d+)(?::(\d+))?/);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = parseInt(match[2], 10);
  const minutes = match[3] ? parseInt(match[3], 10) : 0;
  return sign * (hours * 60 + minutes);
}

export interface LocationCorrection {
  /** 실제(DST 반영) UTC 오프셋(분) — 입력한 현지 시각을 절대 UTC 시각으로 바꿀 때 사용 */
  civilOffsetMinutes: number;
  /** 동경(도, 서쪽은 음수) — 진태양시 계산에 사용: 진태양시 = UTC + longitude*4분.
   *  (표준시/DST를 거치지 않는 순수 천문 공식이라 이 값만 있으면 충분) */
  longitude: number;
}

/**
 * 어떤 도시든(한국 포함 전세계) 입력받아 보정에 필요한 값을 계산.
 * - civilOffsetMinutes: 입력한 현지 시각(예: "오전 3시")을 절대 UTC 시각으로 변환할 때
 *   사용 — 절기(태양황경) 판정처럼 "정확히 언제였는가"가 필요한 계산의 기반이 됨
 *   (태양황경 자체는 위치와 무관한 전 지구 공통 사실이라, 이 UTC 시각만 있으면
 *   추가 위치 보정 없이 바로 쓸 수 있음).
 * - longitude: 그 UTC 시각으로부터 진태양시(= UTC + longitude*4분)를 구할 때 사용 —
 *   시주(2시간 단위) 판정과, 그 결과 날짜가 바뀌는 경우의 일주 계산에 필요.
 */
export function getLocationCorrection(typedCity: string | null | undefined, dateForDstCheck: Date): LocationCorrection {
  const city = findCity(typedCity);
  const civilOffsetMinutes = getDstAwareUtcOffsetMinutes(city.timeZone, dateForDstCheck);
  return { civilOffsetMinutes, longitude: city.longitude };
}

/** Group cities by region for a <select><optgroup> dropdown. */
export function groupBirthCitiesByRegion(): Record<string, BirthCity[]> {
  return BIRTH_CITIES.reduce((acc, city) => {
    (acc[city.region] ??= []).push(city);
    return acc;
  }, {} as Record<string, BirthCity[]>);
}
