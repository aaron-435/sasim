/**
 * lib/worldCities.ts
 * ------------------------------------------------------------------
 * Worldwide city search for the birth-city picker, replacing the old
 * hand-curated 71-city list (lib/birthCities.ts, still kept as-is —
 * it's used for the small "Korea-precision" fallback path when a
 * request doesn't carry resolved coordinates; see lib/manseryeok.ts).
 * That 71-city cap came from what SAZU's API happened to accept, which
 * we have no reason to inherit now that we run our own engine.
 *
 * Backed by the `city-timezones` npm package (zero deps, ~1.9MB, 7329
 * cities with lat/lng + IANA timezone + population — verified via
 * Node's Intl against known DST cases during development). Filtered to
 * population > 30,000 (~4800 cities) to match a "real, searchable
 * place" bar similar to what a travel-site city picker would offer,
 * and de-duplicated (a handful of cities appear twice in the raw data
 * with different province records — keep the higher-population one).
 *
 * Korean display names: the raw dataset only has English names. Every
 * country gets a Korean name (COUNTRY_KO, ~200 ISO codes). Cities only
 * get a Korean name if listed in CITY_KO_OVERRIDES (the few hundred
 * most globally-recognizable ones) — anything else falls back to its
 * English name, e.g. "Utrecht, 네덜란드" rather than every city having
 * an invented/uncertain Korean transliteration.
 * ------------------------------------------------------------------
 */

import cityTimezones from "city-timezones";

export interface WorldCity {
  id: string; // stable id: `${city_ascii}|${iso2}|${lat}`
  cityDisplay: string; // Korean name if known, else English
  countryDisplay: string; // Korean country name
  cityEn: string;
  countryEn: string;
  lat: number;
  lng: number;
  timezone: string;
  population: number;
}

const COUNTRY_KO: Record<string, string> = {
  KR: "대한민국", KP: "북한", JP: "일본", CN: "중국", HK: "홍콩", MO: "마카오", TW: "대만",
  MN: "몽골", VN: "베트남", TH: "태국", SG: "싱가포르", MY: "말레이시아", ID: "인도네시아",
  PH: "필리핀", KH: "캄보디아", LA: "라오스", MM: "미얀마", BN: "브루나이", TL: "동티모르",
  IN: "인도", PK: "파키스탄", BD: "방글라데시", LK: "스리랑카", NP: "네팔", BT: "부탄",
  MV: "몰디브", AF: "아프가니스탄",
  AE: "아랍에미리트", SA: "사우디아라비아", QA: "카타르", KW: "쿠웨이트", BH: "바레인",
  OM: "오만", JO: "요르단", IL: "이스라엘", PS: "팔레스타인", LB: "레바논", IQ: "이라크",
  IR: "이란", SY: "시리아", YE: "예멘", TR: "튀르키예", CY: "키프로스", GE: "조지아",
  AM: "아르메니아", AZ: "아제르바이잔",
  KZ: "카자흐스탄", UZ: "우즈베키스탄", TM: "투르크메니스탄", TJ: "타지키스탄", KG: "키르기스스탄",
  RU: "러시아",
  GB: "영국", IE: "아일랜드", FR: "프랑스", DE: "독일", ES: "스페인", PT: "포르투갈",
  IT: "이탈리아", NL: "네덜란드", BE: "벨기에", LU: "룩셈부르크", CH: "스위스", AT: "오스트리아",
  LI: "리히텐슈타인", MC: "모나코", SM: "산마리노", VA: "바티칸", AD: "안도라", MT: "몰타",
  SE: "스웨덴", NO: "노르웨이", DK: "덴마크", FI: "핀란드", IS: "아이슬란드",
  PL: "폴란드", CZ: "체코", SK: "슬로바키아", HU: "헝가리", RO: "루마니아", BG: "불가리아",
  GR: "그리스", HR: "크로아티아", SI: "슬로베니아", RS: "세르비아", BA: "보스니아 헤르체고비나",
  ME: "몬테네그로", MK: "북마케도니아", AL: "알바니아", XK: "코소보", MD: "몰도바",
  UA: "우크라이나", BY: "벨라루스", EE: "에스토니아", LV: "라트비아", LT: "리투아니아",
  FO: "페로 제도", GL: "그린란드",
  US: "미국", CA: "캐나다", MX: "멕시코",
  BR: "브라질", AR: "아르헨티나", CL: "칠레", CO: "콜롬비아", PE: "페루", VE: "베네수엘라",
  EC: "에콰도르", BO: "볼리비아", PY: "파라과이", UY: "우루과이", GY: "가이아나", SR: "수리남",
  GF: "프랑스령 기아나",
  CU: "쿠바", JM: "자메이카", HT: "아이티", DO: "도미니카 공화국", PR: "푸에르토리코",
  TT: "트리니다드 토바고", BS: "바하마", BB: "바베이도스", BZ: "벨리즈", CR: "코스타리카",
  PA: "파나마", NI: "니카라과", HN: "온두라스", SV: "엘살바도르", GT: "과테말라",
  DM: "도미니카 연방", GD: "그레나다", LC: "세인트루시아", VC: "세인트빈센트 그레나딘",
  AG: "앤티가 바부다", KN: "세인트키츠 네비스", KY: "케이맨 제도", VI: "미국령 버진아일랜드",
  CW: "퀴라소", AW: "아루바",
  ZA: "남아프리카공화국", EG: "이집트", NG: "나이지리아", KE: "케냐", ET: "에티오피아",
  GH: "가나", TZ: "탄자니아", UG: "우간다", DZ: "알제리", MA: "모로코", TN: "튀니지",
  LY: "리비아", SD: "수단", SS: "남수단", CM: "카메룬", CI: "코트디부아르", SN: "세네갈",
  ML: "말리", BF: "부르키나파소", NE: "니제르", TD: "차드", SO: "소말리아", ER: "에리트레아",
  DJ: "지부티", RW: "르완다", BI: "부룬디", MZ: "모잠비크", ZM: "잠비아", ZW: "짐바브웨",
  AO: "앙골라", NA: "나미비아", BW: "보츠와나", SZ: "에스와티니", LS: "레소토", MW: "말라위",
  MG: "마다가스카르", MU: "모리셔스", SC: "세이셸", CV: "카보베르데", GM: "감비아",
  GN: "기니", GW: "기니비사우", SL: "시에라리온", LR: "라이베리아", TG: "토고", BJ: "베냉",
  GA: "가봉", CG: "콩고 공화국", CD: "콩고민주공화국", CF: "중앙아프리카공화국",
  GQ: "적도기니", ST: "상투메 프린시페", KM: "코모로", RE: "레위니옹", YT: "마요트", EH: "서사하라",
  AU: "호주", NZ: "뉴질랜드", FJ: "피지", PG: "파푸아뉴기니", NC: "누벨칼레도니",
  PF: "프랑스령 폴리네시아", WS: "사모아", TO: "통가", VU: "바누아투", SB: "솔로몬 제도",
  KI: "키리바시", TV: "투발루", NR: "나우루", PW: "팔라우", FM: "미크로네시아", MH: "마셜 제도",
  GU: "괌", MP: "북마리아나 제도", AS: "아메리칸사모아", CK: "쿡 제도",
};

const CITY_KO_OVERRIDES: Record<string, string> = {
  // 대한민국 / 동아시아
  Seoul: "서울", Busan: "부산", Incheon: "인천", Daegu: "대구", Daejeon: "대전", Gwangju: "광주",
  Ulsan: "울산", Suwon: "수원", Jeju: "제주", Pyongyang: "평양",
  Tokyo: "도쿄", Osaka: "오사카", Yokohama: "요코하마", Nagoya: "나고야", Sapporo: "삿포로",
  Fukuoka: "후쿠오카", Kyoto: "교토", Kobe: "고베", Okinawa: "오키나와",
  Beijing: "베이징", Shanghai: "상하이", Guangzhou: "광저우", Shenzhen: "선전", Chengdu: "청두",
  "Hong Kong": "홍콩", Macau: "마카오", Taipei: "타이베이", Kaohsiung: "가오슝",
  Ulaanbaatar: "울란바토르",
  // 동남아 / 남아시아
  Hanoi: "하노이", "Ho Chi Minh City": "호치민", Bangkok: "방콕", Phuket: "푸켓", "Chiang Mai": "치앙마이",
  Singapore: "싱가포르", "Kuala Lumpur": "쿠알라룸푸르", Jakarta: "자카르타", Bali: "발리", Denpasar: "덴파사르",
  Manila: "마닐라", Cebu: "세부", "Phnom Penh": "프놈펜", Vientiane: "비엔티안", Yangon: "양곤",
  Mumbai: "뭄바이", Delhi: "델리", "New Delhi": "뉴델리", Bangalore: "벵갈루루", Kolkata: "콜카타",
  Chennai: "첸나이", Hyderabad: "하이데라바드", Dhaka: "다카", Colombo: "콜롬보", Kathmandu: "카트만두",
  // 중동
  Dubai: "두바이", "Abu Dhabi": "아부다비", Doha: "도하", Riyadh: "리야드", Jeddah: "제다",
  Istanbul: "이스탄불", Ankara: "앙카라", "Tel Aviv": "텔아비브", Jerusalem: "예루살렘",
  Amman: "암만", Beirut: "베이루트", Baghdad: "바그다드", Tehran: "테헤란",
  // 유럽
  London: "런던", Manchester: "맨체스터", Edinburgh: "에든버러", Dublin: "더블린",
  Paris: "파리", Nice: "니스", Lyon: "리옹", Marseille: "마르세유",
  Berlin: "베를린", Munich: "뮌헨", Frankfurt: "프랑크푸르트", Hamburg: "함부르크", Cologne: "쾰른",
  Madrid: "마드리드", Barcelona: "바르셀로나", Seville: "세비야", Valencia: "발렌시아",
  Lisbon: "리스본", Porto: "포르투",
  Rome: "로마", Milan: "밀라노", Venice: "베네치아", Florence: "피렌체", Naples: "나폴리",
  Amsterdam: "암스테르담", "The Hague": "헤이그", Rotterdam: "로테르담",
  Brussels: "브뤼셀", Vienna: "비엔나", Zurich: "취리히", Geneva: "제네바", Bern: "베른",
  Prague: "프라하", Warsaw: "바르샤바", Krakow: "크라쿠프", Budapest: "부다페스트",
  Bucharest: "부쿠레슈티", Sofia: "소피아", Athens: "아테네", Santorini: "산토리니",
  Zagreb: "자그레브", Dubrovnik: "두브로브니크", Belgrade: "베오그라드",
  Stockholm: "스톡홀름", Oslo: "오슬로", Copenhagen: "코펜하겐", Helsinki: "헬싱키",
  Reykjavik: "레이캬비크", Moscow: "모스크바", "Saint Petersburg": "상트페테르부르크",
  Kyiv: "키이우", Kiev: "키이우", Minsk: "민스크",
  // 북미
  "New York": "뉴욕", "Los Angeles": "로스앤젤레스", Chicago: "시카고", Houston: "휴스턴",
  Phoenix: "피닉스", Philadelphia: "필라델피아", "San Antonio": "샌안토니오", "San Diego": "샌디에이고",
  Dallas: "댈러스", "San Jose": "산호세", Austin: "오스틴", "San Francisco": "샌프란시스코",
  Seattle: "시애틀", Denver: "덴버", Boston: "보스턴", "Las Vegas": "라스베이거스",
  Portland: "포틀랜드", Miami: "마이애미", Atlanta: "애틀랜타", Washington: "워싱턴",
  Honolulu: "호놀룰루", Anchorage: "앵커리지", Detroit: "디트로이트", Orlando: "올랜도",
  Nashville: "내슈빌", Baltimore: "볼티모어",
  Toronto: "토론토", Vancouver: "밴쿠버", Montreal: "몬트리올", Ottawa: "오타와", Calgary: "캘거리",
  "Mexico City": "멕시코시티", Cancun: "칸쿤", Guadalajara: "과달라하라",
  // 남미
  "Rio de Janeiro": "리우데자네이루", "Sao Paulo": "상파울루", Brasilia: "브라질리아",
  "Buenos Aires": "부에노스아이레스", Santiago: "산티아고", Lima: "리마", Bogota: "보고타",
  Caracas: "카라카스", Quito: "키토", Montevideo: "몬테비데오",
  Havana: "아바나", Kingston: "킹스턴", "Santo Domingo": "산토도밍고",
  Panama: "파나마시티", Guatemala: "과테말라시티",
  // 아프리카
  Cairo: "카이로", Lagos: "라고스", Nairobi: "나이로비", "Addis Ababa": "아디스아바바",
  Casablanca: "카사블랑카", Marrakesh: "마라케시", Tunis: "튀니스", Algiers: "알제",
  "Cape Town": "케이프타운", Johannesburg: "요하네스버그", Accra: "아크라", "Dar es Salaam": "다르에스살람",
  // 오세아니아
  Sydney: "시드니", Melbourne: "멜버른", Brisbane: "브리즈번", Perth: "퍼스", Adelaide: "애들레이드",
  "Gold Coast": "골드코스트", Canberra: "캔버라", Auckland: "오클랜드", Wellington: "웰링턴",
  Queenstown: "퀸스타운", Suva: "수바",
};

const MIN_POPULATION = 30000;

let cachedCities: WorldCity[] | null = null;

function buildAllCities(): WorldCity[] {
  const seen = new Map<string, (typeof cityTimezones.cityMapping)[number]>();
  for (const c of cityTimezones.cityMapping) {
    if (!c.pop || c.pop < MIN_POPULATION || !c.timezone) continue;
    const key = `${c.city}|${c.iso2}`;
    const existing = seen.get(key);
    if (!existing || (c.pop ?? 0) > (existing.pop ?? 0)) seen.set(key, c);
  }

  return Array.from(seen.values())
    .map((c) => ({
      id: `${c.city_ascii}|${c.iso2}|${c.lat.toFixed(2)}`,
      cityDisplay: CITY_KO_OVERRIDES[c.city] ?? c.city,
      countryDisplay: COUNTRY_KO[c.iso2] ?? c.country,
      cityEn: c.city,
      countryEn: c.country,
      lat: c.lat,
      lng: c.lng,
      timezone: c.timezone,
      population: c.pop ?? 0,
    }))
    .sort((a, b) => b.population - a.population);
}

function getAllCities(): WorldCity[] {
  if (!cachedCities) cachedCities = buildAllCities();
  return cachedCities;
}

/**
 * Skyscanner/Agoda 스타일 도시 검색 — 접두 일치를 우선하고, 그 안에서는
 * 인구가 많은 도시가 먼저 나오도록 정렬. 한국어(Korean override가 있는
 * 경우만) 또는 영어 이름으로 검색 가능.
 */
export function searchWorldCities(query: string, limit = 8): WorldCity[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return getAllCities().slice(0, limit);

  const scored: { city: WorldCity; score: number }[] = [];
  for (const city of getAllCities()) {
    const koLower = city.cityDisplay.toLowerCase();
    const enLower = city.cityEn.toLowerCase();
    const countryKoLower = city.countryDisplay.toLowerCase();
    let score = -1;
    if (koLower.startsWith(needle) || enLower.startsWith(needle)) score = 2;
    else if (koLower.includes(needle) || enLower.includes(needle)) score = 1;
    else if (countryKoLower.includes(needle)) score = 0;
    if (score >= 0) scored.push({ city, score });
  }

  scored.sort((a, b) => b.score - a.score || b.city.population - a.city.population);
  return scored.slice(0, limit).map((s) => s.city);
}

export function getWorldCityById(id: string): WorldCity | undefined {
  return getAllCities().find((c) => c.id === id);
}
