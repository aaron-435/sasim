/**
 * lib/kasi.ts
 * ------------------------------------------------------------------
 * Thin client for the 공공데이터포털(data.go.kr) 한국천문연구원(KASI)
 * Open APIs used to build our own 사주 계산 엔진(see lib/manseryeok.ts),
 * replacing SAZU for the 4 base modules (fourPillars/elements/
 * decadeFortune/summary).
 *
 * Two datasets, one shared service key (KASI_API_KEY, decoded form —
 * we re-encode with encodeURIComponent per request to avoid double
 * encoding):
 *   - LrsrCldInfoService (음양력 정보): 양력<->음력 변환 + 연주/월주/일주
 *     (60갑자) — KASI computes these directly, confirmed to match SAZU's
 *     paid output exactly for the same date.
 *   - SpcdeInfoService (특일 정보): get24DivisionsInfo returns 24절기
 *     boundary times to the minute (`kst` field, HHMM), used for 대운 계산.
 * ------------------------------------------------------------------
 */

const BASE = "https://apis.data.go.kr/B090041/openapi/service";

function requireKey(): string {
  const key = process.env.KASI_API_KEY;
  if (!key) throw new Error("KASI_API_KEY is not set");
  return key;
}

async function callKasi<T>(path: string, params: Record<string, string | number>): Promise<T> {
  const key = requireKey();
  const qs = new URLSearchParams({
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    ServiceKey: key,
    _type: "json",
  });
  // URLSearchParams already percent-encodes; data.go.kr expects a single
  // layer of encoding on top of the decoded key, which this gives us.
  const url = `${BASE}${path}?${qs.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`KASI API HTTP ${res.status}`);
  const json = await res.json();
  const header = json?.response?.header;
  if (header?.resultCode !== "00") {
    throw new Error(`KASI API error ${header?.resultCode}: ${header?.resultMsg}`);
  }
  return json.response.body as T;
}

export interface LunCalItem {
  lunYear: number;
  lunMonth: string;
  lunDay: number;
  lunLeapmonth: string; // "평" | "윤"
  lunSecha: string; // 연주, e.g. "무인(戊寅)"
  lunWolgeon: string; // 월주
  lunIljin: string; // 일주
  solYear: number;
  solMonth: string;
  solDay: number;
  solWeek: string;
  solJd: number;
}

/** 양력 날짜 -> 음력 + 연주/월주/일주(60갑자). This is the core lookup. */
export async function getLunCalInfo(solYear: number, solMonth: number, solDay: number): Promise<LunCalItem> {
  const body = await callKasi<{ items: { item: LunCalItem } }>(
    "/LrsrCldInfoService/getLunCalInfo",
    { solYear, solMonth: String(solMonth).padStart(2, "0"), solDay: String(solDay).padStart(2, "0") }
  );
  return body.items.item;
}

export interface DivisionItem {
  dateKind: string;
  dateName: string; // e.g. "입춘", "망종"
  isHoliday: string;
  kst: string; // "HHMM" (may have trailing spaces), time of the term boundary
  locdate: number; // yyyymmdd
  seq: number;
  sunLongitude: string;
}

/** 특정 연/월의 24절기 정보. 절기는 월 경계와 어긋나므로 앞뒤 달도 함께 조회해야 안전. */
export async function get24DivisionsInfo(solYear: number, solMonth: number): Promise<DivisionItem[]> {
  const body = await callKasi<{ items: { item: DivisionItem | DivisionItem[] } | Record<string, never> }>(
    "/SpcdeInfoService/get24DivisionsInfo",
    { solYear, solMonth: String(solMonth).padStart(2, "0"), numOfRows: 10 }
  );
  const item = (body as { items?: { item?: DivisionItem | DivisionItem[] } }).items?.item;
  if (!item) return [];
  return Array.isArray(item) ? item : [item];
}

/** birthDate 전후로 24절기 목록을 모아, 정확한 Date 객체 배열(KST)로 정규화해서 반환. */
export async function getSurroundingDivisions(year: number, month: number): Promise<{ name: string; date: Date }[]> {
  // 절기는 매달 2개 정도이고 월 경계 근처에서 걸칠 수 있어 전월/당월/익월을 모두 모은다.
  const months: [number, number][] = [
    month === 1 ? [year - 1, 12] : [year, month - 1],
    [year, month],
    month === 12 ? [year + 1, 1] : [year, month + 1],
  ];
  const all = await Promise.all(months.map(([y, m]) => get24DivisionsInfo(y, m)));
  return all
    .flat()
    .map((d) => {
      const y = Math.floor(d.locdate / 10000);
      const mo = Math.floor((d.locdate % 10000) / 100);
      const da = d.locdate % 100;
      const kst = d.kst.trim().padStart(4, "0");
      const hh = Number(kst.slice(0, 2));
      const mm = Number(kst.slice(2, 4));
      // KST is UTC+9; encode as a UTC instant so downstream diffing is unambiguous.
      const date = new Date(Date.UTC(y, mo - 1, da, hh - 9, mm));
      return { name: d.dateName, date };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
