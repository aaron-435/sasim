/**
 * lib/sajuTypeCelebrities.ts
 * ------------------------------------------------------------------
 * "이 유형을 가진 유명인" — lib/sajuType.ts의 50개 유형(code, 예: "OAK-R")
 * 각각에 실제로 계산해서 맞아떨어진 전세계 유명인 2명(2개 유형은 후보가
 * 1명뿐 — 아래 설명 참고)을 붙인 공유용 콘텐츠.
 *
 * 절대 "느낌"으로 배정하지 않았다 — lib/manseryeok.ts(자체 만세력 엔진)에
 * 각 인물의 실제 생년월일(공개된 사실, 출생시간은 대부분 비공개라 미포함 —
 * 시주 없이도 일주+연주+월주만으로 dayMaster/dominant element는 그대로
 * 나온다)을 넣고 classifySajuType()을 그대로 돌려서 나온 유형이다. 검증에
 * 쓴 스크립트/원본 데이터는 이 저장소에 없음(스크래치패드 1회성 작업) —
 * 재현하려면 lib/manseryeok.ts + lib/sajuType.ts에 같은 생년월일을 넣어보면
 * 됨.
 *
 * 왜 2명이 아니라 1명인 유형이 2개(SUN-H, FLM-O) 있는가: 약 700명의 전세계
 * 유명인 후보(다양한 시대/분야/지역)를 실제로 계산해봤는데 이 두 조합
 * (화 일간 + 금/수 편중)에 맞는 사람이 각각 1명만 나왔다 — 나머지 후보를
 * 억지로 끼워 맞추는 대신 정직하게 1명만 남겨뒀다. 나중에 후보를 더
 * 넣어보면 채워질 수 있음(코드 자체는 배열이라 1개든 3개든 그대로 렌더링).
 *
 * 생몰년은 태어난 해만 표기(고인의 몰년까지 정확히 검증하는 대신, 틀릴
 * 위험이 없는 출생연도만 확정 정보로 노출). 이름은 로케일 불문 원어 표기
 * 그대로 유지 — 국내 앱에서도 해외 유명인은 통상 영문 표기를 그대로 쓰는
 * 관례를 따름(굳이 한글 표기를 새로 만들면서 오표기 위험을 늘리지 않음).
 *
 * 2026-10-04 현지화: 스페인어권(region "hispanic")·한국("korea") 인물을 추가했다.
 * 추가분은 생년월일을 Wikidata(P569, 날짜 정밀도, 값이 하나뿐인 항목만)에서
 * 가져와 lib/manseryeok.ts calculateManseryeok(시간·도시 없음) + lib/sajuType.ts
 * classifySajuType으로 계산해 나온 유형에만 넣었고, 각 항목 위 주석에 날짜와
 * Wikidata ID를 남겼다. 기존 인물 4명(Musk·Merkel·Messi·Napoleon)을 같은 방법으로
 * 다시 계산해 기존 배정과 일치하는 것을 먼저 확인했다. 화면은
 * getCelebritiesForType(code, locale)이 사용자 언어권 인물을 앞에 두고 최대 3명.
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";

/** 화면에서 사용자 언어권 인물을 먼저 보여 주기 위한 태그(locale → 우선 지역은 REGION_FOR_LOCALE). */
export type CelebrityRegion = "anglo" | "hispanic" | "korea" | "other";

export interface CelebrityEntry {
  name: string;
  /** 한국 인물의 한글 표기 — ko 화면에서만 name 대신 쓴다. */
  nameKo?: string;
  birthYear: number;
  region: CelebrityRegion;
  field: Record<Locale, string>;
  blurb: Record<Locale, string>;
}

type LocalizedText = Record<Locale, string>;
function t(ko: string, en: string, es: string): LocalizedText {
  return { ko, en, es };
}

export const SAJU_TYPE_CELEBRITIES: Record<string, CelebrityEntry[]> = {
  "OAK-R": [
    {
      name: "Elon Musk",
      birthYear: 1971,
      region: "anglo",
      field: t("기업가", "Entrepreneur", "Persona emprendedora"),
      blurb: t(
        "테슬라와 스페이스X를 동시에 밀어붙여 전기차와 로켓의 기준을 바꿨습니다.",
        "Pushed Tesla and SpaceX forward at the same time, resetting the bar for electric cars and rockets.",
        "Impulsó Tesla y SpaceX al mismo tiempo, cambiando el estándar de los vehículos eléctricos y los cohetes."
      ),
    },
    {
      name: "Angela Merkel",
      birthYear: 1954,
      region: "other",
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "16년간 독일을 이끌며 세계에서 가장 영향력 있는 지도자 중 한 명이 됐습니다.",
        "Led Germany for 16 years to become one of the world's most influential leaders.",
        "Lideró Alemania durante 16 años, convirtiéndose en una de las líderes más influyentes del mundo."
      ),
    },
    {
      // 생년월일 1975-05-08 — Wikidata Q47122
      name: "Enrique Iglesias",
      birthYear: 1975,
      region: "hispanic",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "스페인어와 영어 양쪽에서 히트곡을 내며 가장 많이 팔린 스페인어권 가수 중 한 명이 됐습니다.",
        "Became one of the best-selling Spanish-language artists, with hits in both Spanish and English.",
        "Se convirtió en uno de los artistas en español más vendidos, con éxitos en español y en inglés."
      ),
    },
    {
      // 생년월일 1992-12-04 — Wikidata Q24276424
      name: "Jin",
      nameKo: "진",
      birthYear: 1992,
      region: "korea",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "BTS의 맏형으로, 그룹과 함께 빌보드 핫100 1위를 여러 번 차지했습니다.",
        "As BTS's oldest member, topped the Billboard Hot 100 several times with the group.",
        "Como el mayor de BTS, llegó varias veces al número 1 del Billboard Hot 100 con el grupo."
      ),
    },
  ],
  "OAK-H": [
    {
      name: "Napoleon Bonaparte",
      birthYear: 1769,
      region: "other",
      field: t("군사 지도자", "Military leader", "Líder militar"),
      blurb: t(
        "무명 장교에서 출발해 유럽 대부분을 지배하는 자리까지 올라갔습니다.",
        "Rose from an obscure officer to rule most of Europe.",
        "Ascendió de un oficial desconocido a gobernar la mayor parte de Europa."
      ),
    },
    {
      name: "Bruce Lee",
      birthYear: 1940,
      region: "other",
      field: t("배우·무술가", "Actor & martial artist", "Actor y artista marcial"),
      blurb: t(
        "인종의 벽을 뚫고 세계적인 무술 영화 아이콘이 됐습니다.",
        "Broke through racial barriers to become a global martial-arts film icon.",
        "Rompió barreras raciales para convertirse en un ícono global del cine de artes marciales."
      ),
    },
    {
      // 생년월일 1992-09-25 — Wikidata Q28843759
      name: "Rosalía",
      birthYear: 1992,
      region: "hispanic",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "플라멩코를 팝·전자음악과 섞어 전 세계 무대로 가져갔습니다.",
        "Blended flamenco with pop and electronic music and took it to a global audience.",
        "Mezcló el flamenco con el pop y la electrónica y lo llevó a todo el mundo."
      ),
    },
    {
      // 생년월일 1981-11-22 — Wikidata Q1080180
      name: "Song Hye-kyo",
      nameKo: "송혜교",
      birthYear: 1981,
      region: "korea",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "〈가을동화〉부터 〈더 글로리〉까지 아시아 전역에서 사랑받는 배우가 됐습니다.",
        "From Autumn in My Heart to The Glory, became one of Asia's best-loved actors.",
        "De Otoño en mi corazón a La gloria, se convirtió en una de las actrices más queridas de Asia."
      ),
    },
  ],
  "OAK-O": [
    {
      name: "Whitney Houston",
      birthYear: 1963,
      region: "anglo",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "역대 최고 판매량을 기록한 보컬리스트 중 한 명이 됐습니다.",
        "Became one of the best-selling vocalists of all time.",
        "Se convirtió en una de las vocalistas más vendidas de todos los tiempos."
      ),
    },
    {
      name: "Rosalind Franklin",
      birthYear: 1920,
      region: "anglo",
      field: t("과학자", "Scientist", "Científica"),
      blurb: t(
        "DNA 구조 발견의 결정적 단서가 된 X선 사진을 남겼습니다.",
        "Her X-ray images were key to discovering the structure of DNA.",
        "Sus imágenes de rayos X fueron clave para descubrir la estructura del ADN."
      ),
    },
    {
      // 생년월일 1981-02-25 — Wikidata Q50603
      name: "Park Ji-sung",
      nameKo: "박지성",
      birthYear: 1981,
      region: "korea",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "맨체스터 유나이티드에서 프리미어리그 우승을 여러 번 하며 유럽 무대의 아시아 선수들에게 길을 열었습니다.",
        "Won several Premier League titles with Manchester United, opening the way for Asian players in Europe.",
        "Ganó varias Premier League con el Manchester United y abrió camino a los jugadores asiáticos en Europa."
      ),
    },
  ],
  "OAK-V": [
    {
      name: "Lionel Messi",
      birthYear: 1987,
      region: "hispanic",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "성장호르몬 결핍을 이겨내고 축구 역사상 최고의 선수가 됐습니다.",
        "Overcame a growth hormone disorder to become soccer's greatest player.",
        "Superó un trastorno de la hormona del crecimiento para convertirse en el mejor futbolista de la historia."
      ),
    },
    {
      name: "Fyodor Dostoevsky",
      birthYear: 1821,
      region: "other",
      field: t("소설가", "Novelist", "Novelista"),
      blurb: t(
        "가짜 사형 집행과 시베리아 유형을 겪고도 걸작들을 완성했습니다.",
        "Survived a mock execution and Siberian exile to write his greatest novels.",
        "Sobrevivió a una ejecución simulada y al exilio en Siberia para escribir sus grandes novelas."
      ),
    },
    {
      // 생년월일 1996-05-07 — Wikidata Q15618298
      name: "Faker",
      nameKo: "페이커",
      birthYear: 1996,
      region: "korea",
      field: t("프로게이머", "Esports player", "Jugador de esports"),
      blurb: t(
        "리그 오브 레전드 월드 챔피언십을 누구보다 많이 우승한 e스포츠의 상징입니다.",
        "Has won the League of Legends World Championship more times than any other player.",
        "Ha ganado el Campeonato Mundial de League of Legends más veces que ningún otro jugador."
      ),
    },
  ],
  "OAK-W": [
    {
      name: "Billie Jean King",
      birthYear: 1943,
      region: "anglo",
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "'성 대결' 경기에서 이기며 테니스의 남녀 상금 평등을 이끌어냈습니다.",
        "Won the 'Battle of the Sexes' and fought for equal pay in tennis.",
        "Ganó la «Batalla de los Sexos» y luchó por la igualdad salarial en el tenis."
      ),
    },
    {
      name: "Miriam Makeba",
      birthYear: 1932,
      region: "other",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "망명 생활 중에도 남아프리카 음악을 세계에 알렸습니다.",
        "Brought South African music to the world while exiled for opposing apartheid.",
        "Llevó la música sudafricana al mundo mientras estaba exiliada por oponerse al apartheid."
      ),
    },
    {
      // 생년월일 1899-08-24 — Wikidata Q909
      name: "Jorge Luis Borges",
      birthYear: 1899,
      region: "hispanic",
      field: t("작가", "Author", "Escritor"),
      blurb: t(
        "미로 같은 단편들로 20세기 문학의 흐름을 바꿨습니다.",
        "Wrote labyrinthine short stories that changed the course of 20th-century literature.",
        "Escribió cuentos laberínticos que cambiaron el rumbo de la literatura del siglo XX."
      ),
    },
    {
      // 생년월일 1962-11-22 — Wikidata Q235200
      name: "Sumi Jo",
      nameKo: "조수미",
      birthYear: 1962,
      region: "korea",
      field: t("성악가", "Soprano", "Soprano"),
      blurb: t(
        "세계 주요 오페라 무대에서 주역을 맡아 온 소프라노입니다.",
        "Has sung leading roles on the world's major opera stages.",
        "Ha cantado papeles protagonistas en los principales teatros de ópera del mundo."
      ),
    },
  ],
  "VIN-R": [
    {
      name: "Malala Yousafzai",
      birthYear: 1997,
      region: "other",
      field: t("교육운동가", "Activist", "Activista"),
      blurb: t(
        "암살 시도에서 살아남아 세계 최연소 노벨평화상 수상자가 됐습니다.",
        "Survived an assassination attempt to become the youngest-ever Nobel Peace Prize laureate.",
        "Sobrevivió a un intento de asesinato para convertirse en la premio Nobel de la Paz más joven."
      ),
    },
    {
      name: "Cristiano Ronaldo",
      birthYear: 1985,
      region: "other",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "리스본의 가난한 동네에서 시작해 세계적인 축구 스타가 됐습니다.",
        "Rose from a poor Lisbon neighborhood to global soccer stardom.",
        "Surgió de un barrio pobre de Lisboa para convertirse en una estrella global del fútbol."
      ),
    },
    {
      // 생년월일 1994-03-10 — Wikidata Q44333953
      name: "Bad Bunny",
      birthYear: 1994,
      region: "hispanic",
      field: t("래퍼·가수", "Rapper & singer", "Rapero y cantante"),
      blurb: t(
        "거의 스페인어로만 노래하면서 세계에서 가장 많이 스트리밍되는 아티스트 중 한 명이 됐습니다.",
        "Became one of the most-streamed artists in the world while singing almost only in Spanish.",
        "Llegó a ser uno de los artistas más escuchados del mundo cantando casi solo en español."
      ),
    },
    {
      // 생년월일 1995-12-30 — Wikidata Q18388296
      name: "V",
      nameKo: "뷔",
      birthYear: 1995,
      region: "korea",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "BTS 멤버로, 깊은 저음의 목소리와 드라마 〈화랑〉 연기로도 사랑받았습니다.",
        "BTS member known for his deep voice, who also acted in the drama Hwarang.",
        "Miembro de BTS conocido por su voz grave, que también actuó en el drama Hwarang."
      ),
    },
  ],
  "VIN-H": [
    {
      name: "Wolfgang Amadeus Mozart",
      birthYear: 1756,
      region: "other",
      field: t("작곡가", "Composer", "Compositor"),
      blurb: t(
        "35세에 세상을 떠나기까지 600곡이 넘는 작품을 남겼습니다.",
        "Composed over 600 works before dying at 35.",
        "Compuso más de 600 obras en apenas 35 años de vida."
      ),
    },
    {
      name: "Coco Chanel",
      birthYear: 1883,
      region: "other",
      field: t("패션 디자이너", "Fashion designer", "Diseñadora de moda"),
      blurb: t(
        "고아원 출신으로 시작해 여성 패션의 규칙을 다시 썼습니다.",
        "Rose from an orphanage to redefine women's fashion.",
        "Surgió de un orfanato para redefinir la moda femenina."
      ),
    },
    {
      // 생년월일 1988-04-30 — Wikidata Q698173
      name: "Ana de Armas",
      birthYear: 1988,
      region: "hispanic",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "18세에 쿠바를 떠나 국제적인 경력을 쌓았고, 〈블론드〉로 아카데미상 후보에 올랐습니다.",
        "Left Cuba at 18, built an international career and earned an Oscar nomination for Blonde.",
        "Dejó Cuba a los 18 años, construyó una carrera internacional y fue nominada al Óscar por Blonde."
      ),
    },
    {
      // 생년월일 1988-08-18 — Wikidata Q495577
      name: "G-Dragon",
      nameKo: "지드래곤",
      birthYear: 1988,
      region: "korea",
      field: t("가수·프로듀서", "Singer & producer", "Cantante y productor"),
      blurb: t(
        "빅뱅의 리더로 K-팝의 음악과 패션 흐름을 함께 이끌었습니다.",
        "As BIGBANG's leader, shaped both the sound and the fashion of K-pop.",
        "Como líder de BIGBANG, marcó tanto el sonido como la moda del K-pop."
      ),
    },
  ],
  "VIN-O": [
    {
      name: "Beyoncé",
      birthYear: 1981,
      region: "anglo",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "걸그룹 멤버에서 시작해 솔로 최정상 스타로 올라섰습니다.",
        "Rose from a girl group to solo global superstardom.",
        "Pasó de un grupo femenino a convertirse en una superestrella global en solitario."
      ),
    },
    {
      name: "Amy Winehouse",
      birthYear: 1983,
      region: "anglo",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "독보적인 목소리로 현대 소울 음악의 흐름을 바꿔놓았습니다.",
        "Reshaped modern soul music with a singular, raw voice.",
        "Transformó la música soul moderna con una voz única y cruda."
      ),
    },
    {
      // 생년월일 1992-07-08 — Wikidata Q439722
      name: "Son Heung-min",
      nameKo: "손흥민",
      birthYear: 1992,
      region: "korea",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "아시아 선수 최초로 프리미어리그 득점왕에 올랐습니다.",
        "Became the first Asian player to win the Premier League Golden Boot.",
        "Fue el primer jugador asiático en ganar la Bota de Oro de la Premier League."
      ),
    },
  ],
  "VIN-V": [
    {
      name: "Katherine Johnson",
      birthYear: 1918,
      region: "anglo",
      field: t("수학자", "Mathematician", "Matemática"),
      blurb: t(
        "그녀의 궤도 계산이 우주비행사들을 안전하게 우주로 보냈습니다.",
        "Her orbital calculations helped send astronauts safely into space.",
        "Sus cálculos orbitales ayudaron a enviar astronautas al espacio de forma segura."
      ),
    },
    {
      name: "Zinedine Zidane",
      birthYear: 1972,
      region: "other",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "이민자 가정 출신으로 프랑스를 월드컵 우승으로 이끌었습니다.",
        "Rose from an immigrant family to lead France to World Cup glory.",
        "Surgió de una familia inmigrante para llevar a Francia a la gloria del Mundial."
      ),
    },
  ],
  "VIN-W": [
    {
      name: "George Washington",
      birthYear: 1732,
      region: "anglo",
      field: t("정치인", "Statesman", "Estadista"),
      blurb: t(
        "독립전쟁을 이끌고 미국 초대 대통령이 됐습니다.",
        "Led the American Revolution and became the first US president.",
        "Lideró la Revolución Americana y se convirtió en el primer presidente de EE. UU."
      ),
    },
    {
      name: "Nicki Minaj",
      birthYear: 1982,
      region: "anglo",
      field: t("래퍼", "Rapper", "Rapera"),
      blurb: t(
        "뉴욕 퀸스에서 시작해 힙합에서 가장 영향력 있는 여성 아티스트가 됐습니다.",
        "Rose from Queens, New York to become hip-hop's most influential female voice.",
        "Surgió de Queens, Nueva York, para convertirse en la voz femenina más influyente del hip-hop."
      ),
    },
    {
      // 생년월일 1853-01-28 — Wikidata Q103285
      name: "José Martí",
      birthYear: 1853,
      region: "hispanic",
      field: t("시인·독립운동가", "Poet & independence leader", "Poeta y prócer"),
      blurb: t(
        "시와 산문을 쓰면서 쿠바 독립 투쟁을 조직했습니다.",
        "Wrote poetry and essays while organizing Cuba's fight for independence.",
        "Escribió poesía y ensayos mientras organizaba la lucha por la independencia de Cuba."
      ),
    },
  ],
  "SUN-R": [
    {
      name: "Mahatma Gandhi",
      birthYear: 1869,
      region: "other",
      field: t("독립운동가", "Independence leader", "Líder independentista"),
      blurb: t(
        "비폭력 저항으로 인도를 독립으로 이끌었습니다.",
        "Led India to independence through nonviolent resistance.",
        "Lideró a la India hacia la independencia mediante la resistencia no violenta."
      ),
    },
    {
      name: "J.K. Rowling",
      birthYear: 1965,
      region: "anglo",
      field: t("작가", "Author", "Escritora"),
      blurb: t(
        "생활고를 겪던 싱글맘 시절 해리포터 시리즈를 써냈습니다.",
        "Wrote the Harry Potter series while a struggling single mother.",
        "Escribió la saga de Harry Potter mientras era una madre soltera con dificultades económicas."
      ),
    },
    {
      // 생년월일 1907-07-06 — Wikidata Q5588
      name: "Frida Kahlo",
      birthYear: 1907,
      region: "hispanic",
      field: t("화가", "Painter", "Pintora"),
      blurb: t(
        "자신의 고통과 정체성을 미술사에서 가장 잘 알려진 자화상들로 바꿔냈습니다.",
        "Turned her own pain and identity into some of the best-known self-portraits in art.",
        "Convirtió su propio dolor y su identidad en algunos de los autorretratos más conocidos del arte."
      ),
    },
    {
      // 생년월일 1997-09-01 — Wikidata Q22338877
      name: "Jung Kook",
      nameKo: "정국",
      birthYear: 1997,
      region: "korea",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "BTS의 막내로, 솔로곡 'Seven'으로 빌보드 핫100 1위에 올랐습니다.",
        "BTS's youngest member, who reached No. 1 on the Billboard Hot 100 with his solo single \"Seven.\"",
        "El más joven de BTS, que llegó al número 1 del Billboard Hot 100 con su sencillo en solitario \"Seven\"."
      ),
    },
  ],
  "SUN-H": [
    {
      name: "Jesse Owens",
      birthYear: 1913,
      region: "anglo",
      field: t("육상선수", "Track & field athlete", "Atleta"),
      blurb: t(
        "나치 독일 한복판에서 올림픽 금메달 4개를 따내며 인종주의에 맞섰습니다.",
        "Won four Olympic gold medals in Nazi Germany, defying racist ideology.",
        "Ganó cuatro medallas de oro olímpicas en la Alemania nazi, desafiando la ideología racista."
      ),
    },
    {
      // 생년월일 1970-05-16 — Wikidata Q105868
      name: "Gabriela Sabatini",
      birthYear: 1970,
      region: "hispanic",
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "1990년 US 오픈에서 우승하고 아르헨티나에 올림픽 은메달을 안겼습니다.",
        "Won the 1990 US Open and an Olympic silver medal for Argentina.",
        "Ganó el US Open de 1990 y una medalla de plata olímpica para Argentina."
      ),
    },
  ],
  "SUN-O": [
    {
      name: "Rosa Parks",
      birthYear: 1913,
      region: "anglo",
      field: t("시민운동가", "Civil rights activist", "Activista de derechos civiles"),
      blurb: t(
        "버스 좌석을 양보하지 않은 조용한 저항이 미국 시민권 운동에 불을 붙였습니다.",
        "Her quiet refusal to give up her seat sparked the US civil rights movement.",
        "Su silenciosa negativa a ceder su asiento encendió el movimiento por los derechos civiles en EE. UU."
      ),
    },
    {
      name: "Greta Thunberg",
      birthYear: 2003,
      region: "other",
      field: t("환경운동가", "Climate activist", "Activista climática"),
      blurb: t(
        "혼자 시작한 등교 거부 시위를 전 세계적인 기후 운동으로 키웠습니다.",
        "Turned a solo school strike into a global climate movement.",
        "Convirtió una huelga escolar en solitario en un movimiento climático global."
      ),
    },
  ],
  "SUN-V": [
    {
      name: "Nelson Mandela",
      birthYear: 1918,
      region: "other",
      field: t("정치인", "Statesman", "Estadista"),
      blurb: t(
        "27년의 수감 생활을 견디고 남아공을 민주주의로 이끌었습니다.",
        "Survived 27 years in prison to lead South Africa to democracy.",
        "Sobrevivió 27 años en prisión para llevar a Sudáfrica hacia la democracia."
      ),
    },
    {
      name: "Steve Jobs",
      birthYear: 1955,
      region: "anglo",
      field: t("기업가", "Entrepreneur", "Persona emprendedora"),
      blurb: t(
        "애플을 공동창업하며 개인용 기술의 판도를 바꿨습니다.",
        "Co-founded Apple and revolutionized personal technology.",
        "Cofundó Apple y revolucionó la tecnología personal."
      ),
    },
    {
      // 생년월일 1935-07-09 — Wikidata Q216450
      name: "Mercedes Sosa",
      birthYear: 1935,
      region: "hispanic",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "라틴아메리카 민속음악을 아르헨티나 밖 멀리까지 들리게 한 목소리였습니다.",
        "Gave Latin American folk music a voice that carried far beyond Argentina.",
        "Dio a la música folclórica latinoamericana una voz que llegó mucho más allá de Argentina."
      ),
    },
    {
      // 생년월일 1971-01-31 — Wikidata Q236603
      name: "Lee Young-ae",
      nameKo: "이영애",
      birthYear: 1971,
      region: "korea",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "〈대장금〉으로 한국 드라마를 세계에 알렸습니다.",
        "Her drama Dae Jang Geum carried Korean TV around the world.",
        "Con el drama Dae Jang Geum llevó la televisión coreana a todo el mundo."
      ),
    },
  ],
  "SUN-W": [
    {
      name: "Albert Einstein",
      birthYear: 1879,
      region: "other",
      field: t("물리학자", "Physicist", "Físico"),
      blurb: t(
        "상대성이론으로 현대 물리학의 틀을 다시 짰습니다.",
        "Developed the theory of relativity, reshaping modern physics.",
        "Desarrolló la teoría de la relatividad, transformando la física moderna."
      ),
    },
    {
      name: "Leonardo DiCaprio",
      birthYear: 1974,
      region: "anglo",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "수십 년의 명연기 끝에 마침내 오스카 트로피를 들었습니다.",
        "Finally won his Oscar after decades of acclaimed roles.",
        "Finalmente ganó su Óscar tras décadas de actuaciones aclamadas."
      ),
    },
    {
      // 생년월일 1914-03-31 — Wikidata Q46739
      name: "Octavio Paz",
      birthYear: 1914,
      region: "hispanic",
      field: t("시인", "Poet", "Poeta"),
      blurb: t(
        "시와 에세이로 멕시코의 정체성을 탐구했고 1990년 노벨 문학상을 받았습니다.",
        "Explored Mexican identity in poems and essays and won the 1990 Nobel Prize in Literature.",
        "Exploró la identidad mexicana en poemas y ensayos y ganó el Premio Nobel de Literatura en 1990."
      ),
    },
    {
      // 생년월일 1988-03-12 — Wikidata Q485431
      name: "Kim Ji-yeon",
      nameKo: "김지연",
      birthYear: 1988,
      region: "korea",
      field: t("펜싱선수", "Fencer", "Esgrimista"),
      blurb: t(
        "2012 런던 올림픽에서 한국 여자 펜싱 첫 금메달을 땄습니다.",
        "Won South Korea's first Olympic gold in women's fencing at London 2012.",
        "Ganó en Londres 2012 el primer oro olímpico de Corea del Sur en esgrima femenina."
      ),
    },
  ],
  "FLM-R": [
    {
      name: "Walt Disney",
      birthYear: 1901,
      region: "anglo",
      field: t("기업가", "Entrepreneur", "Persona emprendedora"),
      blurb: t(
        "손으로 그린 만화 한 편에서 시작해 거대한 엔터테인먼트 제국을 세웠습니다.",
        "Built an entertainment empire from hand-drawn cartoons.",
        "Construyó un imperio del entretenimiento a partir de dibujos animados hechos a mano."
      ),
    },
    {
      name: "Usain Bolt",
      birthYear: 1986,
      region: "other",
      field: t("육상선수", "Sprinter", "Velocista"),
      blurb: t(
        "역대 가장 빠른 기록을 세운 인간이 됐습니다.",
        "Became the fastest man ever recorded.",
        "Se convirtió en el hombre más rápido jamás registrado."
      ),
    },
    {
      // 생년월일 1942-08-02 — Wikidata Q83566
      name: "Isabel Allende",
      birthYear: 1942,
      region: "hispanic",
      field: t("소설가", "Novelist", "Novelista"),
      blurb: t(
        "〈영혼의 집〉으로 가장 많이 읽히는 스페인어권 작가 중 한 명이 됐습니다.",
        "The House of the Spirits made her one of the most widely read Spanish-language authors.",
        "La casa de los espíritus la convirtió en una de las autoras en español más leídas."
      ),
    },
    {
      // 생년월일 1993-05-16 — Wikidata Q20145
      name: "IU",
      nameKo: "아이유",
      birthYear: 1993,
      region: "korea",
      field: t("싱어송라이터·배우", "Singer-songwriter & actor", "Cantautora y actriz"),
      blurb: t(
        "한국에서 가장 사랑받는 싱어송라이터 중 한 명이 됐고, 〈나의 아저씨〉 같은 드라마에서도 활약했습니다.",
        "Became one of Korea's best-loved singer-songwriters and starred in dramas like My Mister.",
        "Se convirtió en una de las cantautoras más queridas de Corea y protagonizó dramas como My Mister."
      ),
    },
  ],
  "FLM-H": [
    {
      name: "Serena Williams",
      birthYear: 1981,
      region: "anglo",
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "끊임없는 시선 속에서도 20년 넘게 테니스를 지배했습니다.",
        "Dominated tennis for two decades against constant scrutiny.",
        "Dominó el tenis durante dos décadas bajo un escrutinio constante."
      ),
    },
    {
      name: "Ronald Reagan",
      birthYear: 1911,
      region: "anglo",
      field: t("정치인", "Politician", "Político"),
      blurb: t(
        "배우 생활을 거쳐 미국 대통령 자리에 올랐습니다.",
        "Moved from acting to the US presidency.",
        "Pasó de la actuación a la presidencia de Estados Unidos."
      ),
    },
    {
      // 생년월일 1971-12-18 — Wikidata Q188080
      name: "Arantxa Sánchez Vicario",
      birthYear: 1971,
      region: "hispanic",
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "메이저 단식 타이틀 4개를 따고 세계 랭킹 1위에 올랐습니다.",
        "Won four Grand Slam singles titles and reached world No. 1.",
        "Ganó cuatro títulos de Grand Slam en individuales y llegó al número 1 del mundo."
      ),
    },
  ],
  "FLM-O": [
    {
      name: "Mia Hamm",
      birthYear: 1972,
      region: "anglo",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "여자 축구를 세계적인 스포츠로 키우는 데 앞장섰습니다.",
        "Helped build women's soccer into a major global sport.",
        "Ayudó a convertir el fútbol femenino en un deporte global importante."
      ),
    },
  ],
  "FLM-V": [
    {
      name: "Anna Wintour",
      birthYear: 1949,
      region: "anglo",
      field: t("편집장", "Editor", "Editora"),
      blurb: t(
        "보그의 가장 영향력 있는 편집장으로 패션 미디어를 바꿔놓았습니다.",
        "Reshaped fashion media as Vogue's most influential editor.",
        "Transformó los medios de moda como la editora más influyente de Vogue."
      ),
    },
    {
      name: "Akira Kurosawa",
      birthYear: 1910,
      region: "other",
      field: t("영화감독", "Film director", "Director de cine"),
      blurb: t(
        "전 세계 영화계에 가장 큰 영향을 준 감독 중 한 명이 됐습니다.",
        "Became one of history's most influential filmmakers worldwide.",
        "Se convirtió en uno de los cineastas más influyentes de la historia."
      ),
    },
    {
      // 생년월일 1904-07-12 — Wikidata Q34189
      name: "Pablo Neruda",
      birthYear: 1904,
      region: "hispanic",
      field: t("시인", "Poet", "Poeta"),
      blurb: t(
        "전 세계에서 읽히는 사랑의 시를 썼고 1971년 노벨 문학상을 받았습니다.",
        "Wrote love poems read around the world and won the 1971 Nobel Prize in Literature.",
        "Escribió poemas de amor leídos en todo el mundo y ganó el Premio Nobel de Literatura en 1971."
      ),
    },
    {
      // 생년월일 1972-08-14 — Wikidata Q485905
      name: "Yoo Jae-suk",
      nameKo: "유재석",
      birthYear: 1972,
      region: "korea",
      field: t("방송인", "TV host", "Presentador"),
      blurb: t(
        "〈무한도전〉을 이끌며 한국 예능의 얼굴이 됐습니다.",
        "Led the variety show Infinite Challenge and became the face of Korean TV entertainment.",
        "Encabezó el programa Infinite Challenge y se convirtió en la cara del entretenimiento televisivo coreano."
      ),
    },
  ],
  "FLM-W": [
    {
      name: "Viola Davis",
      birthYear: 1965,
      region: "anglo",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "극심한 가난을 딛고 역대 가장 많은 상을 받은 배우 중 한 명이 됐습니다.",
        "Rose from extreme poverty to become one of the most awarded actresses ever.",
        "Superó la pobreza extrema para convertirse en una de las actrices más premiadas de la historia."
      ),
    },
    {
      name: "Hank Aaron",
      birthYear: 1934,
      region: "anglo",
      field: t("야구선수", "Baseball player", "Beisbolista"),
      blurb: t(
        "인종차별적 협박을 견디며 홈런 신기록을 세웠습니다.",
        "Broke baseball's home run record while enduring racist threats.",
        "Rompió el récord de jonrones mientras soportaba amenazas racistas."
      ),
    },
  ],
  "MTN-R": [
    {
      name: "Mark Zuckerberg",
      birthYear: 1984,
      region: "anglo",
      field: t("기업가", "Entrepreneur", "Persona emprendedora"),
      blurb: t(
        "기숙사 방에서 시작한 페이스북을 세계적인 플랫폼으로 키웠습니다.",
        "Built Facebook from a dorm room into a global platform.",
        "Construyó Facebook desde un dormitorio universitario hasta convertirlo en una plataforma global."
      ),
    },
    {
      name: "LeBron James",
      birthYear: 1984,
      region: "anglo",
      field: t("농구선수", "Basketball player", "Baloncestista"),
      blurb: t(
        "불안정한 가정환경을 딛고 농구 역사상 최고의 선수 중 하나가 됐습니다.",
        "Rose from a struggling single-parent household to become a global basketball icon.",
        "Superó un hogar monoparental en dificultades para convertirse en un ícono global del baloncesto."
      ),
    },
    {
      // 생년월일 1949-09-25 — Wikidata Q55171
      name: "Pedro Almodóvar",
      birthYear: 1949,
      region: "hispanic",
      field: t("영화감독", "Film director", "Director de cine"),
      blurb: t(
        "대담하고 색채가 강한 영화들로 아카데미상을 두 번 받았습니다.",
        "Made bold, vividly colored films and won two Academy Awards.",
        "Hizo películas audaces y llenas de color y ganó dos premios Óscar."
      ),
    },
    {
      // 생년월일 1963-08-23 — Wikidata Q315484
      name: "Park Chan-wook",
      nameKo: "박찬욱",
      birthYear: 1963,
      region: "korea",
      field: t("영화감독", "Film director", "Director de cine"),
      blurb: t(
        "〈올드보이〉로 칸 영화제 심사위원대상을 받으며 한국 영화를 세계에 알렸습니다.",
        "Won the Grand Prix at Cannes for Oldboy and put Korean cinema on the world map.",
        "Ganó el Gran Premio de Cannes con Oldboy y puso al cine coreano en el mapa mundial."
      ),
    },
  ],
  "MTN-H": [
    {
      name: "Lupita Nyong'o",
      birthYear: 1983,
      region: "other",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "첫 주요 배역으로 오스카상을 받았습니다.",
        "Won an Oscar for her first major film role.",
        "Ganó un Óscar por su primer papel protagónico importante."
      ),
    },
    {
      name: "Elizabeth Taylor",
      birthYear: 1932,
      region: "anglo",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "아역 스타에서 시작해 한 시대를 대표하는 할리우드 아이콘이 됐습니다.",
        "Became a defining Hollywood icon from childhood stardom onward.",
        "Se convirtió en un ícono definitorio de Hollywood desde su fama infantil en adelante."
      ),
    },
  ],
  "MTN-O": [
    {
      name: "Rafael Nadal",
      birthYear: 1986,
      region: "hispanic",
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "끝없는 투지와 클레이 코트 지배력으로 커리어를 쌓았습니다.",
        "Built a career on relentless fight and clay-court dominance.",
        "Construyó su carrera sobre una lucha incansable y su dominio en tierra batida."
      ),
    },
    {
      name: "David Beckham",
      birthYear: 1975,
      region: "anglo",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "축구 스타덤을 세계적인 라이프스타일 브랜드로 확장했습니다.",
        "Turned soccer stardom into a global lifestyle brand.",
        "Convirtió su fama futbolística en una marca de estilo de vida global."
      ),
    },
    {
      // 생년월일 1973-02-11 — Wikidata Q267037
      name: "Jeon Do-yeon",
      nameKo: "전도연",
      birthYear: 1973,
      region: "korea",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "〈밀양〉으로 칸 영화제 여우주연상을 받았습니다.",
        "Won Best Actress at Cannes for Secret Sunshine.",
        "Ganó el premio a la mejor actriz en Cannes por Secret Sunshine."
      ),
    },
  ],
  "MTN-V": [
    {
      name: "Roger Federer",
      birthYear: 1981,
      region: "other",
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "우아함과 오랜 전성기를 겸비하며 테니스의 품격을 새로 정의했습니다.",
        "Redefined grace and longevity in professional tennis.",
        "Redefinió la elegancia y la longevidad en el tenis profesional."
      ),
    },
    {
      name: "Stevie Wonder",
      birthYear: 1950,
      region: "anglo",
      field: t("음악가", "Musician", "Músico"),
      blurb: t(
        "어릴 적 시력을 잃었지만 음악 천재이자 다작 히트메이커가 됐습니다.",
        "Became a musical genius and prolific hitmaker despite blindness since infancy.",
        "Se convirtió en un genio musical y prolífico creador de éxitos pese a perder la vista de bebé."
      ),
    },
    {
      // 생년월일 1981-07-29 — Wikidata Q10514
      name: "Fernando Alonso",
      birthYear: 1981,
      region: "hispanic",
      field: t("레이서", "Racing driver", "Piloto"),
      blurb: t(
        "포뮬러 1 월드 챔피언에 두 번 올랐고 40대에도 F1에서 달렸습니다.",
        "Became Formula 1 world champion twice and was still racing in F1 in his forties.",
        "Fue dos veces campeón del mundo de Fórmula 1 y seguía corriendo en la F1 pasados los cuarenta."
      ),
    },
    {
      // 생년월일 1944-06-13 — Wikidata Q1253
      name: "Ban Ki-moon",
      nameKo: "반기문",
      birthYear: 1944,
      region: "korea",
      field: t("외교관", "Diplomat", "Diplomático"),
      blurb: t(
        "제8대 유엔 사무총장으로 10년간 일했습니다.",
        "Served ten years as the eighth Secretary-General of the United Nations.",
        "Fue durante diez años el octavo secretario general de las Naciones Unidas."
      ),
    },
  ],
  "MTN-W": [
    {
      name: "Denzel Washington",
      birthYear: 1954,
      region: "anglo",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "한 세대를 대표하는 가장 존경받는 배우 중 하나가 됐습니다.",
        "Became one of the most respected actors of his generation.",
        "Se convirtió en uno de los actores más respetados de su generación."
      ),
    },
    {
      name: "Natalie Portman",
      birthYear: 1981,
      region: "anglo",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "하버드 학위와 오스카 수상 연기력을 함께 쌓았습니다.",
        "Balanced a Harvard degree with an Oscar-winning acting career.",
        "Combinó un título de Harvard con una carrera actoral ganadora de un Óscar."
      ),
    },
    {
      // 생년월일 1852-06-25 — Wikidata Q25328
      name: "Antoni Gaudí",
      birthYear: 1852,
      region: "hispanic",
      field: t("건축가", "Architect", "Arquitecto"),
      blurb: t(
        "사그라다 파밀리아를 설계해 바르셀로나에 한눈에 알아보는 건물들을 남겼습니다.",
        "Designed the Sagrada Família and gave Barcelona its unmistakable buildings.",
        "Diseñó la Sagrada Família y dejó en Barcelona edificios inconfundibles."
      ),
    },
    {
      // 생년월일 1977-09-28 — Wikidata Q264816
      name: "Pak Se-ri",
      nameKo: "박세리",
      birthYear: 1977,
      region: "korea",
      field: t("골프선수", "Golfer", "Golfista"),
      blurb: t(
        "1998년 US 여자오픈 우승으로 한국에 골프 붐을 일으켰습니다.",
        "Her 1998 U.S. Women's Open win set off a golf boom in Korea.",
        "Su victoria en el U.S. Women's Open de 1998 desató la fiebre del golf en Corea."
      ),
    },
  ],
  "FLD-R": [
    {
      name: "Charles Darwin",
      birthYear: 1809,
      region: "anglo",
      field: t("과학자", "Scientist", "Científico"),
      blurb: t(
        "자연선택에 의한 진화론을 제시했습니다.",
        "Proposed the theory of evolution by natural selection.",
        "Propuso la teoría de la evolución por selección natural."
      ),
    },
    {
      name: "Barack Obama",
      birthYear: 1961,
      region: "anglo",
      field: t("정치인", "Politician", "Político"),
      blurb: t(
        "미국 최초의 흑인 대통령이 됐습니다.",
        "Became the first Black president of the United States.",
        "Se convirtió en el primer presidente afroamericano de Estados Unidos."
      ),
    },
    {
      // 생년월일 1974-04-28 — Wikidata Q39666
      name: "Penélope Cruz",
      birthYear: 1974,
      region: "hispanic",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "스페인 여배우 최초로 아카데미상을 받았습니다.",
        "Became the first Spanish actress to win an Academy Award.",
        "Fue la primera actriz española en ganar un premio Óscar."
      ),
    },
    {
      // 생년월일 1994-10-10 — Wikidata Q464645
      name: "Suzy",
      nameKo: "수지",
      birthYear: 1994,
      region: "korea",
      field: t("가수·배우", "Singer & actor", "Cantante y actriz"),
      blurb: t(
        "miss A로 데뷔해 '국민 첫사랑'이라 불리는 배우가 됐습니다.",
        "Debuted with miss A and became the actor Korea calls its \"nation's first love.\"",
        "Debutó con miss A y se convirtió en la actriz a la que Corea llama \"el primer amor de la nación\"."
      ),
    },
  ],
  "FLD-H": [
    {
      name: "Charles Dickens",
      birthYear: 1812,
      region: "anglo",
      field: t("소설가", "Novelist", "Novelista"),
      blurb: t(
        "고된 어린 시절을 딛고 오래도록 사랑받는 소설들을 남겼습니다.",
        "Turned a hard childhood into enduring classic novels.",
        "Transformó una infancia difícil en novelas clásicas perdurables."
      ),
    },
    {
      name: "Maria Callas",
      birthYear: 1923,
      region: "other",
      field: t("오페라 가수", "Opera singer", "Cantante de ópera"),
      blurb: t(
        "타의 추종을 불허하는 극적 표현력으로 오페라 공연을 재정의했습니다.",
        "Redefined operatic performance with unmatched dramatic intensity.",
        "Redefinió la interpretación operística con una intensidad dramática incomparable."
      ),
    },
  ],
  "FLD-O": [
    {
      name: "Quentin Tarantino",
      birthYear: 1963,
      region: "anglo",
      field: t("영화감독", "Film director", "Director de cine"),
      blurb: t(
        "비디오 대여점 직원에서 시작해 거장 감독이 됐습니다.",
        "Rose from a video store clerk to an auteur filmmaker.",
        "Pasó de empleado de videoclub a director de autor."
      ),
    },
    {
      name: "Celine Dion",
      birthYear: 1968,
      region: "anglo",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "대가족 출신으로 세계적인 보컬 파워하우스가 됐습니다.",
        "Rose from a large Quebec family to become a global vocal powerhouse.",
        "Surgió de una gran familia de Quebec para convertirse en una potencia vocal global."
      ),
    },
    {
      // 생년월일 1927-03-06 — Wikidata Q5878
      name: "Gabriel García Márquez",
      birthYear: 1927,
      region: "hispanic",
      field: t("소설가", "Novelist", "Novelista"),
      blurb: t(
        "〈백년의 고독〉을 썼고 1982년 노벨 문학상을 받았습니다.",
        "Wrote One Hundred Years of Solitude and won the 1982 Nobel Prize in Literature.",
        "Escribió Cien años de soledad y ganó el Premio Nobel de Literatura en 1982."
      ),
    },
    {
      // 생년월일 1993-03-09 — Wikidata Q21075020
      name: "Suga",
      nameKo: "슈가",
      birthYear: 1993,
      region: "korea",
      field: t("래퍼·프로듀서", "Rapper & producer", "Rapero y productor"),
      blurb: t(
        "BTS 멤버이자, Agust D라는 이름으로 직접 곡을 쓰고 만드는 프로듀서입니다.",
        "BTS member who also writes and produces his own music as Agust D.",
        "Miembro de BTS que también compone y produce su propia música como Agust D."
      ),
    },
  ],
  "FLD-V": [
    {
      name: "Karl Lagerfeld",
      birthYear: 1933,
      region: "other",
      field: t("패션 디자이너", "Fashion designer", "Diseñador de moda"),
      blurb: t(
        "자기 브랜드를 운영하면서 동시에 샤넬을 수십 년간 이끌었습니다.",
        "Reinvented Chanel while running his own label for decades.",
        "Reinventó Chanel mientras dirigía su propia marca durante décadas."
      ),
    },
    {
      name: "Hideo Kojima",
      birthYear: 1963,
      region: "other",
      field: t("게임 디자이너", "Game designer", "Diseñador de videojuegos"),
      blurb: t(
        "메탈기어 시리즈로 비디오게임을 서사 예술의 영역으로 끌어올렸습니다.",
        "Redefined video games as narrative art with the Metal Gear series.",
        "Redefinió los videojuegos como arte narrativo con la saga Metal Gear."
      ),
    },
    {
      // 생년월일 1936-03-28 — Wikidata Q39803
      name: "Mario Vargas Llosa",
      birthYear: 1936,
      region: "hispanic",
      field: t("소설가", "Novelist", "Novelista"),
      blurb: t(
        "라틴아메리카의 권력과 자유를 다룬 소설로 2010년 노벨 문학상을 받았습니다.",
        "Wrote novels about power and freedom in Latin America and won the 2010 Nobel Prize in Literature.",
        "Escribió novelas sobre el poder y la libertad en América Latina y ganó el Premio Nobel de Literatura en 2010."
      ),
    },
  ],
  "FLD-W": [
    {
      name: "Franklin D. Roosevelt",
      birthYear: 1882,
      region: "anglo",
      field: t("정치인", "Politician", "Político"),
      blurb: t(
        "전신 마비 속에서도 대공황과 2차 대전 대부분을 이끌었습니다.",
        "Led the US through the Great Depression and most of WWII despite paralysis.",
        "Lideró a EE. UU. durante la Gran Depresión y casi toda la Segunda Guerra Mundial pese a su parálisis."
      ),
    },
    {
      name: "Tom Holland",
      birthYear: 1996,
      region: "anglo",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "무용수로 훈련받다가 세계적인 슈퍼히어로 스타가 됐습니다.",
        "Trained as a dancer before becoming a global superhero star.",
        "Se entrenó como bailarín antes de convertirse en una estrella global de superhéroes."
      ),
    },
    {
      // 생년월일 1947-06-19 — Wikidata Q491013
      name: "Youn Yuh-jung",
      nameKo: "윤여정",
      birthYear: 1947,
      region: "korea",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "〈미나리〉로 한국 배우 최초로 아카데미 연기상을 받았습니다.",
        "Became the first Korean actor to win an Academy Award for acting, for Minari.",
        "Fue la primera intérprete coreana en ganar un Óscar de actuación, por Minari."
      ),
    },
  ],
  "STL-R": [
    {
      name: "Muhammad Ali",
      birthYear: 1942,
      region: "anglo",
      field: t("복서", "Boxer", "Boxeador"),
      blurb: t(
        "복싱에서 가장 카리스마 있고 거침없는 챔피언이 됐습니다.",
        "Became boxing's most charismatic and outspoken champion.",
        "Se convirtió en el campeón más carismático y directo del boxeo."
      ),
    },
    {
      name: "Jacinda Ardern",
      birthYear: 1980,
      region: "anglo",
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "공감 어린 리더십으로 뉴질랜드를 위기 속에서 이끌었습니다.",
        "Led New Zealand through crisis with an empathetic leadership style.",
        "Lideró a Nueva Zelanda en tiempos de crisis con un estilo de liderazgo empático."
      ),
    },
    {
      // 생년월일 1960-08-10 — Wikidata Q41548
      name: "Antonio Banderas",
      birthYear: 1960,
      region: "hispanic",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "알모도바르 영화에서 할리우드로 건너갔고, 〈페인 앤 글로리〉로 칸 남우주연상을 받았습니다.",
        "Went from Almodóvar's films to Hollywood and won Best Actor at Cannes for Pain and Glory.",
        "Pasó del cine de Almodóvar a Hollywood y ganó el premio al mejor actor en Cannes por Dolor y gloria."
      ),
    },
  ],
  "STL-H": [
    {
      name: "Jeff Bezos",
      birthYear: 1964,
      region: "anglo",
      field: t("기업가", "Entrepreneur", "Persona emprendedora"),
      blurb: t(
        "온라인 서점을 세계적인 대기업으로 키웠습니다.",
        "Built Amazon from an online bookstore into a global giant.",
        "Construyó Amazon desde una librería en línea hasta un gigante global."
      ),
    },
    {
      name: "Tiger Woods",
      birthYear: 1975,
      region: "anglo",
      field: t("골프선수", "Golfer", "Golfista"),
      blurb: t(
        "몸과 커리어를 다시 세우며 골프 정상으로 복귀했습니다.",
        "Rebuilt his career and body to return to the top of golf.",
        "Reconstruyó su carrera y su cuerpo para volver a la cima del golf."
      ),
    },
    {
      // 생년월일 1806-03-21 — Wikidata Q182276
      name: "Benito Juárez",
      birthYear: 1806,
      region: "hispanic",
      field: t("정치인", "Statesman", "Estadista"),
      blurb: t(
        "사포텍 원주민 마을에서 자라 멕시코 대통령이 되어 공화국을 지켜냈습니다.",
        "Grew up in a Zapotec village, became Mexico's president and defended its republic.",
        "Creció en un pueblo zapoteco, llegó a presidente de México y defendió la república."
      ),
    },
    {
      // 생년월일 1915-11-25 — Wikidata Q468467
      name: "Chung Ju-yung",
      nameKo: "정주영",
      birthYear: 1915,
      region: "korea",
      field: t("기업가", "Entrepreneur", "Persona emprendedora"),
      blurb: t(
        "가난한 농가에서 나와 현대그룹을 세웠습니다.",
        "Left a poor farming family and went on to found the Hyundai Group.",
        "Salió de una familia campesina pobre y llegó a fundar el Grupo Hyundai."
      ),
    },
  ],
  "STL-O": [
    {
      name: "Alan Turing",
      birthYear: 1912,
      region: "anglo",
      field: t("수학자", "Mathematician", "Matemático"),
      blurb: t(
        "나치의 암호를 해독하고 컴퓨터 과학의 토대를 놓았습니다.",
        "Broke Nazi codes and laid the foundations of computer science.",
        "Descifró los códigos nazis y sentó las bases de la ciencia de la computación."
      ),
    },
    {
      name: "Margaret Thatcher",
      birthYear: 1925,
      region: "anglo",
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "영국 최초의 여성 총리가 됐습니다.",
        "Became Britain's first female prime minister.",
        "Fue la primera mujer en ocupar el cargo de primera ministra de Gran Bretaña."
      ),
    },
    {
      // 생년월일 1979-12-29 — Wikidata Q313044
      name: "Diego Luna",
      birthYear: 1979,
      region: "hispanic",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "〈이 투 마마〉에서 출발해 스타워즈 시리즈 〈안도르〉의 주인공이 됐습니다.",
        "Went from Y Tu Mamá También to leading the Star Wars series Andor.",
        "Pasó de Y tu mamá también a protagonizar la serie de Star Wars Andor."
      ),
    },
  ],
  "STL-V": [
    {
      name: "Michael Phelps",
      birthYear: 1985,
      region: "anglo",
      field: t("수영선수", "Swimmer", "Nadador"),
      blurb: t(
        "역대 그 누구보다 많은 올림픽 메달을 땄습니다.",
        "Won more Olympic medals than anyone in history.",
        "Ganó más medallas olímpicas que nadie en la historia."
      ),
    },
    {
      name: "Idris Elba",
      birthYear: 1972,
      region: "anglo",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "런던 서민 동네 출신에서 세계적인 주연 배우로 올라섰습니다.",
        "Rose from London working-class roots to global leading-man status.",
        "Surgió de un barrio obrero de Londres para convertirse en un actor protagonista global."
      ),
    },
    {
      // 생년월일 1983-05-02 — Wikidata Q2836528
      name: "Mon Laferte",
      birthYear: 1983,
      region: "hispanic",
      field: t("싱어송라이터", "Singer-songwriter", "Cantautora"),
      blurb: t(
        "칠레에서 멕시코로 건너가 라틴아메리카에서 가장 개성 있는 싱어송라이터 중 한 명이 됐습니다.",
        "Moved from Chile to Mexico and became one of Latin America's most distinctive singer-songwriters.",
        "Se mudó de Chile a México y se convirtió en una de las cantautoras más personales de América Latina."
      ),
    },
    {
      // 생년월일 1972-12-15 — Wikidata Q491318
      name: "Lee Jung-jae",
      nameKo: "이정재",
      birthYear: 1972,
      region: "korea",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "〈오징어 게임〉으로 아시아 배우 최초로 에미상 드라마 부문 남우주연상을 받았습니다.",
        "Became the first Asian actor to win the Emmy for lead actor in a drama, for Squid Game.",
        "Fue el primer actor asiático en ganar el Emmy a mejor actor de drama, por El juego del calamar."
      ),
    },
  ],
  "STL-W": [
    {
      name: "Martin Luther King Jr.",
      birthYear: 1929,
      region: "anglo",
      field: t("시민운동가", "Civil rights leader", "Líder de derechos civiles"),
      blurb: t(
        "미국 시민권 운동을 이끌었습니다.",
        "Led the American civil rights movement.",
        "Lideró el movimiento por los derechos civiles en Estados Unidos."
      ),
    },
    {
      name: "Adele",
      birthYear: 1988,
      region: "anglo",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "가사의 솔직한 감정 표현만으로 커리어를 쌓았습니다.",
        "Built a career on raw emotional honesty in her lyrics.",
        "Construyó su carrera sobre la honestidad emocional cruda de sus letras."
      ),
    },
    {
      // 생년월일 1977-02-02 — Wikidata Q34424
      name: "Shakira",
      birthYear: 1977,
      region: "hispanic",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "콜롬비아의 리듬을 세계로 가져가 가장 많이 팔린 라틴 아티스트 중 한 명이 됐습니다.",
        "Took Colombian rhythms worldwide and became one of the best-selling Latin artists ever.",
        "Llevó los ritmos colombianos al mundo y se convirtió en una de las artistas latinas más vendidas de la historia."
      ),
    },
    {
      // 생년월일 1994-06-23 — Wikidata Q28699137
      name: "Jung Ho-yeon",
      nameKo: "정호연",
      birthYear: 1994,
      region: "korea",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "모델로 활동하다 첫 연기작 〈오징어 게임〉으로 세계적인 배우가 됐습니다.",
        "Went from modeling to global fame with her first acting role, in Squid Game.",
        "Pasó de modelo a la fama mundial con su primer papel como actriz, en El juego del calamar."
      ),
    },
  ],
  "GEM-R": [
    {
      name: "Stephen Hawking",
      birthYear: 1942,
      region: "anglo",
      field: t("물리학자", "Physicist", "Físico"),
      blurb: t(
        "심각한 병마 속에서도 블랙홀 연구를 발전시켰습니다.",
        "Advanced our understanding of black holes despite severe illness.",
        "Avanzó nuestra comprensión de los agujeros negros pese a una enfermedad grave."
      ),
    },
    {
      name: "Diego Maradona",
      birthYear: 1960,
      region: "hispanic",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "혼자만의 천재성으로 아르헨티나를 월드컵 우승으로 이끌었습니다.",
        "Carried Argentina to a World Cup with singular brilliance.",
        "Llevó a Argentina a un Mundial con un talento singular."
      ),
    },
    {
      // 생년월일 1970-11-27 — Wikidata Q5646626
      name: "Han Kang",
      nameKo: "한강",
      birthYear: 1970,
      region: "korea",
      field: t("소설가", "Novelist", "Novelista"),
      blurb: t(
        "〈채식주의자〉의 작가로, 2024년 아시아 여성 최초로 노벨 문학상을 받았습니다.",
        "Author of The Vegetarian, she became the first Asian woman to win the Nobel Prize in Literature (2024).",
        "Autora de La vegetariana, fue la primera mujer asiática en ganar el Premio Nobel de Literatura (2024)."
      ),
    },
  ],
  "GEM-H": [
    {
      name: "Marie Curie",
      birthYear: 1867,
      region: "other",
      field: t("과학자", "Scientist", "Científica"),
      blurb: t(
        "서로 다른 두 과학 분야에서 노벨상을 받은 최초의 인물이 됐습니다.",
        "Became the first person to win Nobel Prizes in two different sciences.",
        "Se convirtió en la primera persona en ganar premios Nobel en dos ciencias distintas."
      ),
    },
    {
      name: "Winston Churchill",
      birthYear: 1874,
      region: "anglo",
      field: t("정치인", "Statesman", "Estadista"),
      blurb: t(
        "2차 대전 동안 영국을 이끌었습니다.",
        "Led Britain through World War II.",
        "Lideró a Gran Bretaña durante la Segunda Guerra Mundial."
      ),
    },
    {
      // 생년월일 1964-10-09 — Wikidata Q219124
      name: "Guillermo del Toro",
      birthYear: 1964,
      region: "hispanic",
      field: t("영화감독", "Film director", "Director de cine"),
      blurb: t(
        "괴물을 사랑하는 마음을 영화로 옮겨 아카데미 작품상과 감독상을 받았습니다.",
        "Turned his love of monsters into films and won the Academy Awards for Best Picture and Best Director.",
        "Convirtió su amor por los monstruos en cine y ganó los Óscar a mejor película y mejor dirección."
      ),
    },
    {
      // 생년월일 1988-02-26 — Wikidata Q270135
      name: "Kim Yeon-koung",
      nameKo: "김연경",
      birthYear: 1988,
      region: "korea",
      field: t("배구선수", "Volleyball player", "Voleibolista"),
      blurb: t(
        "한국·일본·튀르키예 리그를 거치며 세계 최고의 배구 선수로 꼽혔습니다.",
        "Played in Korea, Japan and Türkiye and was ranked among the world's best volleyball players.",
        "Jugó en Corea, Japón y Turquía y fue considerada una de las mejores voleibolistas del mundo."
      ),
    },
  ],
  "GEM-O": [
    {
      name: "Marilyn Monroe",
      birthYear: 1926,
      region: "anglo",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "위탁 가정에서 자라 한 시대를 상징하는 아이콘이 됐습니다.",
        "Rose from foster care to become an era-defining icon.",
        "Surgió de hogares de acogida para convertirse en un ícono de su época."
      ),
    },
    {
      name: "John F. Kennedy",
      birthYear: 1917,
      region: "anglo",
      field: t("정치인", "Politician", "Político"),
      blurb: t(
        "우주 탐사의 비전으로 한 세대에게 영감을 줬습니다.",
        "Inspired a generation with a vision of space exploration.",
        "Inspiró a una generación con su visión de la exploración espacial."
      ),
    },
    {
      // 생년월일 1990-01-26 — Wikidata Q82805
      name: "Sergio Pérez",
      birthYear: 1990,
      region: "hispanic",
      field: t("레이서", "Racing driver", "Piloto"),
      blurb: t(
        "포뮬러 1 역사상 가장 많은 우승을 거둔 멕시코 드라이버입니다.",
        "Became the winningest Mexican driver in Formula 1 history.",
        "Es el piloto mexicano con más victorias en la historia de la Fórmula 1."
      ),
    },
  ],
  "GEM-V": [
    {
      name: "Neymar",
      birthYear: 1992,
      region: "other",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "브라질 길거리 축구에서 시작해 세계적인 스타가 됐습니다.",
        "Rose from Brazilian street football to global soccer stardom.",
        "Surgió del fútbol callejero brasileño para convertirse en una estrella global."
      ),
    },
    {
      name: "Mikhail Baryshnikov",
      birthYear: 1948,
      region: "other",
      field: t("무용가", "Dancer", "Bailarín"),
      blurb: t(
        "소련을 떠나 현대 발레를 새롭게 정의했습니다.",
        "Defected from the Soviet Union to redefine modern ballet.",
        "Desertó de la Unión Soviética para redefinir el ballet moderno."
      ),
    },
    {
      // 생년월일 1971-05-26 — Wikidata Q3143548
      name: "Hwang Dong-hyuk",
      nameKo: "황동혁",
      birthYear: 1971,
      region: "korea",
      field: t("영화감독", "Director & writer", "Director y guionista"),
      blurb: t(
        "〈오징어 게임〉을 쓰고 연출해 에미상 감독상을 받았습니다.",
        "Wrote and directed Squid Game and won the Emmy for directing.",
        "Escribió y dirigió El juego del calamar y ganó el Emmy a la mejor dirección."
      ),
    },
  ],
  "GEM-W": [
    {
      name: "Christopher Nolan",
      birthYear: 1970,
      region: "anglo",
      field: t("영화감독", "Film director", "Director de cine"),
      blurb: t(
        "지적인 블록버스터로 주류 영화의 판을 바꿨습니다.",
        "Known for cerebral blockbusters that reshaped mainstream film.",
        "Conocido por sus superproducciones intelectuales que transformaron el cine comercial."
      ),
    },
    {
      name: "Naomi Osaka",
      birthYear: 1997,
      region: "other",
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "정신건강을 솔직히 이야기하며 그랜드슬램 챔피언이 됐습니다.",
        "Became a Grand Slam champion while speaking openly about mental health.",
        "Se convirtió en campeona de Grand Slam mientras hablaba abiertamente sobre salud mental."
      ),
    },
    {
      // 생년월일 1971-04-16 — Wikidata Q23543
      name: "Selena",
      birthYear: 1971,
      region: "hispanic",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "'테하노 음악의 여왕'으로 불리며 이 장르를 대중 음악의 중심으로 끌어왔습니다.",
        "Known as the Queen of Tejano music, she brought the genre into the mainstream.",
        "Conocida como la Reina del Tex-Mex, llevó el género al gran público."
      ),
    },
    {
      // 생년월일 1994-09-12 — Wikidata Q20514446
      name: "RM",
      nameKo: "RM",
      birthYear: 1994,
      region: "korea",
      field: t("래퍼", "Rapper", "Rapero"),
      blurb: t(
        "BTS의 리더로, 유엔에서 젊은 세대를 향해 연설했습니다.",
        "BTS's leader, who spoke to young people from the stage of the United Nations.",
        "Líder de BTS, que habló a los jóvenes desde la tribuna de las Naciones Unidas."
      ),
    },
  ],
  "OCN-R": [
    {
      name: "The Weeknd",
      birthYear: 1990,
      region: "anglo",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "익명의 믹스테이프로 시작해 슈퍼볼 할프타임 무대에 섰습니다.",
        "Rose from anonymous mixtapes to headline the Super Bowl halftime show.",
        "Surgió de sus primeras grabaciones anónimas en internet para encabezar el show de medio tiempo del Super Bowl."
      ),
    },
    {
      name: "Timothée Chalamet",
      birthYear: 1995,
      region: "anglo",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "동세대에서 가장 젊은 나이에 오스카 남우주연상 후보에 올랐습니다.",
        "Became one of the youngest Best Actor Oscar nominees of his era.",
        "Se convirtió en uno de los actores más jóvenes nominados al Óscar al mejor actor."
      ),
    },
    {
      // 생년월일 1972-07-10 — Wikidata Q231911
      name: "Sofía Vergara",
      birthYear: 1972,
      region: "hispanic",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "〈모던 패밀리〉로 TV에서 가장 높은 출연료를 받는 배우 중 한 명이 됐습니다.",
        "Modern Family made her one of the highest-paid actresses on TV.",
        "Modern Family la convirtió en una de las actrices mejor pagadas de la televisión."
      ),
    },
    {
      // 생년월일 1977-12-31 — Wikidata Q20150
      name: "PSY",
      nameKo: "싸이",
      birthYear: 1977,
      region: "korea",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "'강남스타일'로 유튜브 최초 10억 뷰를 기록했습니다.",
        "\"Gangnam Style\" became the first video on YouTube to reach a billion views.",
        "\"Gangnam Style\" fue el primer video de YouTube en llegar a mil millones de vistas."
      ),
    },
  ],
  "OCN-H": [
    {
      name: "Freddie Mercury",
      birthYear: 1946,
      region: "anglo",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "잔지바르에서 이주해 록 역사상 최고의 쇼맨 중 한 명이 됐습니다.",
        "Immigrated from Zanzibar to become one of rock's greatest showmen.",
        "Emigró desde Zanzíbar para convertirse en uno de los grandes artistas de escenario del rock."
      ),
    },
    {
      name: "Paul McCartney",
      birthYear: 1942,
      region: "anglo",
      field: t("음악가", "Musician", "Músico"),
      blurb: t(
        "역사상 가장 많이 팔린 곡들을 공동 작곡했습니다.",
        "Co-wrote some of the best-selling songs in history.",
        "Coescribió algunas de las canciones más vendidas de la historia."
      ),
    },
    {
      // 생년월일 1987-06-22 — Wikidata Q80758
      name: "Lee Min-ho",
      nameKo: "이민호",
      birthYear: 1987,
      region: "korea",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "〈꽃보다 남자〉로 아시아 전역에서 스타가 됐습니다.",
        "Boys Over Flowers made him a star across Asia.",
        "Boys Over Flowers lo convirtió en estrella en toda Asia."
      ),
    },
  ],
  "OCN-O": [
    {
      name: "Pablo Picasso",
      birthYear: 1881,
      region: "hispanic",
      field: t("화가", "Painter", "Pintor"),
      blurb: t(
        "큐비즘을 공동 창시하고 75년간 왕성하게 활동했습니다.",
        "Co-founded Cubism and remained prolific for 75 years.",
        "Cofundó el cubismo y siguió creando sin descanso durante 75 años."
      ),
    },
    {
      name: "Bill Gates",
      birthYear: 1955,
      region: "anglo",
      field: t("기업가", "Entrepreneur", "Persona emprendedora"),
      blurb: t(
        "마이크로소프트를 공동창업하고 세계적인 자선사업가가 됐습니다.",
        "Co-founded Microsoft and became a leading global philanthropist.",
        "Cofundó Microsoft y se convirtió en un importante filántropo global."
      ),
    },
    {
      // 생년월일 1969-09-14 — Wikidata Q495980
      name: "Bong Joon Ho",
      nameKo: "봉준호",
      birthYear: 1969,
      region: "korea",
      field: t("영화감독", "Film director", "Director de cine"),
      blurb: t(
        "〈기생충〉으로 칸 황금종려상과 아카데미 작품상을 모두 받았습니다.",
        "Parasite won him both the Palme d'Or and the Academy Award for Best Picture.",
        "Con Parásitos ganó la Palma de Oro y el Óscar a mejor película."
      ),
    },
  ],
  "OCN-V": [
    {
      name: "Kamala Harris",
      birthYear: 1964,
      region: "anglo",
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "미국 최초의 여성이자 흑인 여성 부통령이 됐습니다.",
        "Became the first woman and first Black woman US vice president.",
        "Fue la primera mujer, y la primera mujer afroamericana, en ocupar la vicepresidencia de EE. UU."
      ),
    },
    {
      name: "Robin Williams",
      birthYear: 1951,
      region: "anglo",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "폭발적인 에너지를 사랑받는 코미디·드라마 연기로 승화시켰습니다.",
        "Channeled manic energy into beloved comedic and dramatic roles.",
        "Canalizó su energía desbordante en papeles cómicos y dramáticos entrañables."
      ),
    },
    {
      // 생년월일 1978-03-11 — Wikidata Q490410
      name: "Ha Jung-woo",
      nameKo: "하정우",
      birthYear: 1978,
      region: "korea",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "〈추격자〉와 〈신과함께〉 등으로 한국 흥행 영화의 얼굴이 됐습니다.",
        "Films like The Chaser and Along with the Gods made him a face of Korean box-office hits.",
        "Películas como The Chaser y Along with the Gods lo convirtieron en un rostro de los éxitos de taquilla coreanos."
      ),
    },
  ],
  "OCN-W": [
    {
      name: "Warren Buffett",
      birthYear: 1930,
      region: "anglo",
      field: t("투자자", "Investor", "Inversionista"),
      blurb: t(
        "수십 년간 인내심 있는 투자로 재산을 쌓았습니다.",
        "Built his fortune through decades of patient, disciplined investing.",
        "Construyó su fortuna mediante décadas de inversión paciente y disciplinada."
      ),
    },
    {
      name: "Jennifer Lawrence",
      birthYear: 1990,
      region: "anglo",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "2010년대 최연소 여우주연상 수상자가 됐습니다.",
        "Became the youngest Best Actress winner of the 2010s.",
        "Se convirtió en la ganadora más joven del Óscar a la mejor actriz de la década de 2010."
      ),
    },
    {
      // 생년월일 1951-09-29 — Wikidata Q320
      name: "Michelle Bachelet",
      birthYear: 1951,
      region: "hispanic",
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "칠레 최초의 여성 대통령이 됐고, 이후 유엔 인권최고대표를 지냈습니다.",
        "Became Chile's first woman president and later served as the UN's human rights chief.",
        "Fue la primera mujer presidenta de Chile y después Alta Comisionada de la ONU para los Derechos Humanos."
      ),
    },
    {
      // 생년월일 2004-08-31 — Wikidata Q56476186
      name: "Jang Won-young",
      nameKo: "장원영",
      birthYear: 2004,
      region: "korea",
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "IVE 멤버로, 10대에 이미 K-팝을 대표하는 얼굴이 됐습니다.",
        "A member of IVE who became one of the faces of K-pop while still a teenager.",
        "Integrante de IVE que se convirtió en una de las caras del K-pop siendo aún adolescente."
      ),
    },
  ],
  "DEW-R": [
    {
      name: "Stephen King",
      birthYear: 1947,
      region: "anglo",
      field: t("작가", "Author", "Escritor"),
      blurb: t(
        "초기의 거절들을 딛고 최고의 베스트셀러 공포소설 작가가 됐습니다.",
        "Became the best-selling horror author after early rejection.",
        "Se convirtió en el autor de terror más vendido tras los rechazos de sus inicios."
      ),
    },
    {
      name: "Dalai Lama",
      birthYear: 1935,
      region: "other",
      field: t("종교 지도자", "Religious leader", "Líder religioso"),
      blurb: t(
        "망명 생활 속에서도 수십 년간 평화를 이야기해왔습니다.",
        "Led Tibetan Buddhism in exile for decades while advocating peace.",
        "Lideró el budismo tibetano en el exilio durante décadas mientras abogaba por la paz."
      ),
    },
    {
      // 생년월일 1852-05-01 — Wikidata Q150526
      name: "Santiago Ramón y Cajal",
      birthYear: 1852,
      region: "hispanic",
      field: t("신경과학자", "Neuroscientist", "Neurocientífico"),
      blurb: t(
        "뇌가 낱낱의 신경세포로 이뤄졌다는 것을 밝혀 1906년 노벨상을 받았습니다.",
        "Showed that the brain is made of individual nerve cells and won the 1906 Nobel Prize.",
        "Demostró que el cerebro está formado por neuronas individuales y ganó el Premio Nobel en 1906."
      ),
    },
    {
      // 생년월일 1953-01-22 — Wikidata Q153778
      name: "Myung-whun Chung",
      nameKo: "정명훈",
      birthYear: 1953,
      region: "korea",
      field: t("지휘자", "Conductor", "Director de orquesta"),
      blurb: t(
        "파리 바스티유 오페라 음악감독을 지낸 세계적인 지휘자입니다.",
        "World-renowned conductor who served as music director of the Opéra Bastille in Paris.",
        "Director de orquesta de fama mundial que fue director musical de la Ópera de la Bastilla en París."
      ),
    },
  ],
  "DEW-H": [
    {
      name: "Jackie Chan",
      birthYear: 1954,
      region: "other",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "위험한 액션 스턴트를 직접 소화하며 세계적인 액션 스타가 됐습니다.",
        "Performed his own dangerous stunts to become a global action icon.",
        "Realizó sus propias acrobacias peligrosas para convertirse en un ícono de acción global."
      ),
    },
    {
      name: "Amelia Earhart",
      birthYear: 1897,
      region: "anglo",
      field: t("비행사", "Aviator", "Aviadora"),
      blurb: t(
        "여성 최초로 대서양을 단독 횡단 비행했습니다.",
        "Became the first woman to fly solo across the Atlantic.",
        "Se convirtió en la primera mujer en volar en solitario sobre el Atlántico."
      ),
    },
    {
      // 생년월일 1953-05-22 — Wikidata Q346751
      name: "Cha Bum-kun",
      nameKo: "차범근",
      birthYear: 1953,
      region: "korea",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "분데스리가에서 뛰며 UEFA컵을 두 번 들어 올렸습니다.",
        "Played in the Bundesliga and lifted the UEFA Cup twice.",
        "Jugó en la Bundesliga y levantó dos veces la Copa de la UEFA."
      ),
    },
  ],
  "DEW-O": [
    {
      name: "Meryl Streep",
      birthYear: 1949,
      region: "anglo",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "역대 그 누구보다 많은 오스카 후보 지명을 받았습니다.",
        "Earned more Oscar nominations than any actor in history.",
        "Obtuvo más nominaciones al Óscar que cualquier actor en la historia."
      ),
    },
    {
      name: "Jay-Z",
      birthYear: 1969,
      region: "anglo",
      field: t("래퍼·기업가", "Rapper & entrepreneur", "Rapero y empresario"),
      blurb: t(
        "거리 생활을 딛고 수십억 달러 규모의 비즈니스와 음악 제국을 세웠습니다.",
        "Turned street hustling into a billion-dollar business and music empire.",
        "Convirtió las calles en un imperio musical y empresarial de miles de millones de dólares."
      ),
    },
    {
      // 생년월일 1889-04-07 — Wikidata Q80871
      name: "Gabriela Mistral",
      birthYear: 1889,
      region: "hispanic",
      field: t("시인", "Poet", "Poeta"),
      blurb: t(
        "라틴아메리카 작가 최초로 노벨 문학상을 받았습니다(1945년).",
        "Became the first Latin American writer to win the Nobel Prize in Literature (1945).",
        "Fue la primera escritora latinoamericana en ganar el Premio Nobel de Literatura (1945)."
      ),
    },
    {
      // 생년월일 1970-07-12 — Wikidata Q380121
      name: "Lee Byung-hun",
      nameKo: "이병헌",
      birthYear: 1970,
      region: "korea",
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "한국 영화와 할리우드를 오가며 활약해 온 배우입니다.",
        "Has built a career moving between Korean cinema and Hollywood.",
        "Ha construido su carrera entre el cine coreano y Hollywood."
      ),
    },
  ],
  "DEW-V": [
    {
      name: "Ludwig van Beethoven",
      birthYear: 1770,
      region: "other",
      field: t("작곡가", "Composer", "Compositor"),
      blurb: t(
        "청력을 잃고도 걸작들을 작곡했습니다.",
        "Composed masterpieces after losing his hearing.",
        "Compuso obras maestras después de perder la audición."
      ),
    },
    {
      name: "Malcolm X",
      birthYear: 1925,
      region: "anglo",
      field: t("인권운동가", "Activist", "Activista"),
      blurb: t(
        "힘든 청년기를 지나 흑인 인권을 위한 강력한 목소리가 됐습니다.",
        "Transformed from a troubled youth into a powerful voice for Black empowerment.",
        "Se transformó de un joven problemático en una voz poderosa por el empoderamiento afroamericano."
      ),
    },
    {
      // 생년월일 1986-03-30 — Wikidata Q483309
      name: "Sergio Ramos",
      birthYear: 1986,
      region: "hispanic",
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "수비수로 월드컵, 유럽선수권 두 번, 챔피언스리그 네 번을 우승했습니다.",
        "Won the World Cup, two European Championships and four Champions Leagues as a defender.",
        "Ganó como defensa un Mundial, dos Eurocopas y cuatro Champions League."
      ),
    },
    {
      // 생년월일 1987-03-25 — Wikidata Q50604
      name: "Ryu Hyun-jin",
      nameKo: "류현진",
      birthYear: 1987,
      region: "korea",
      field: t("야구선수", "Baseball player", "Beisbolista"),
      blurb: t(
        "메이저리그 전체 평균자책점 1위에 오른 한국 투수입니다.",
        "Korean pitcher who led all of Major League Baseball in ERA.",
        "Lanzador coreano que lideró las Grandes Ligas en efectividad."
      ),
    },
  ],
  "DEW-W": [
    {
      name: "Mother Teresa",
      birthYear: 1910,
      region: "other",
      field: t("인도주의자", "Humanitarian", "Humanitaria"),
      blurb: t(
        "콜카타의 가장 가난한 이들을 돌보는 데 평생을 바쳤습니다.",
        "Devoted her life to caring for the poorest of the poor in Calcutta.",
        "Dedicó su vida a cuidar a las personas más pobres de Calcuta."
      ),
    },
    {
      name: "Reese Witherspoon",
      birthYear: 1976,
      region: "anglo",
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "여성들을 위한 더 많은 배역을 만들기 위해 직접 제작사를 설립했습니다.",
        "Built a production company to create more roles for women.",
        "Fundó su propia productora para crear más papeles para mujeres."
      ),
    },
    {
      // 생년월일 1971-08-26 — Wikidata Q171235
      name: "Thalía",
      birthYear: 1971,
      region: "hispanic",
      field: t("가수·배우", "Singer & actor", "Cantante y actriz"),
      blurb: t(
        "텔레노벨라와 노래로 라틴아메리카 전역과 그 너머에서 스타가 됐습니다.",
        "Her telenovelas and songs made her a star across Latin America and beyond.",
        "Sus telenovelas y canciones la hicieron estrella en toda América Latina y más allá."
      ),
    },
    {
      // 생년월일 1990-09-05 — Wikidata Q229124
      name: "Kim Yuna",
      nameKo: "김연아",
      birthYear: 1990,
      region: "korea",
      field: t("피겨 선수", "Figure skater", "Patinadora artística"),
      blurb: t(
        "2010 밴쿠버 올림픽에서 세계 기록으로 금메달을 땄습니다.",
        "Won Olympic gold at Vancouver 2010 with a world-record score.",
        "Ganó el oro olímpico en Vancouver 2010 con una puntuación récord mundial."
      ),
    },
  ],
};

const REGION_FOR_LOCALE: Record<Locale, CelebrityRegion> = {
  ko: "korea",
  en: "anglo",
  es: "hispanic",
};

const MAX_SHOWN = 3;

/** 사용자 언어권 인물을 먼저(그 안에서는 원래 순서), 나머지는 원래 순서로 최대 3명. */
export function getCelebritiesForType(code: string, locale: Locale): CelebrityEntry[] {
  const all = SAJU_TYPE_CELEBRITIES[code] ?? [];
  const preferred = REGION_FOR_LOCALE[locale];
  const local = all.filter((c) => c.region === preferred);
  const rest = all.filter((c) => c.region !== preferred);
  return [...local, ...rest].slice(0, MAX_SHOWN);
}

/** 화면 표시 이름 — 한국 인물은 ko에서 한글 표기. */
export function celebrityDisplayName(c: CelebrityEntry, locale: Locale): string {
  return locale === "ko" && c.nameKo ? c.nameKo : c.name;
}
