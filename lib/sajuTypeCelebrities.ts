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
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";

export interface CelebrityEntry {
  name: string;
  birthYear: number;
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
      field: t("기업가", "Entrepreneur", "Empresario"),
      blurb: t(
        "테슬라와 스페이스X를 동시에 밀어붙여 전기차와 로켓의 기준을 바꿨습니다.",
        "Pushed Tesla and SpaceX forward at the same time, resetting the bar for electric cars and rockets.",
        "Impulsó Tesla y SpaceX al mismo tiempo, cambiando el estándar de los autos eléctricos y los cohetes."
      ),
    },
    {
      name: "Angela Merkel",
      birthYear: 1954,
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "16년간 독일을 이끌며 세계에서 가장 영향력 있는 지도자 중 한 명이 됐습니다.",
        "Led Germany for 16 years to become one of the world's most influential leaders.",
        "Lideró Alemania durante 16 años, convirtiéndose en una de las líderes más influyentes del mundo."
      ),
    },
  ],
  "OAK-H": [
    {
      name: "Napoleon Bonaparte",
      birthYear: 1769,
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
      field: t("배우·무술가", "Actor & martial artist", "Actor y artista marcial"),
      blurb: t(
        "인종의 벽을 뚫고 세계적인 무술 영화 아이콘이 됐습니다.",
        "Broke through racial barriers to become a global martial-arts film icon.",
        "Rompió barreras raciales para convertirse en un ícono global del cine de artes marciales."
      ),
    },
  ],
  "OAK-O": [
    {
      name: "Whitney Houston",
      birthYear: 1963,
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
      field: t("과학자", "Scientist", "Científica"),
      blurb: t(
        "DNA 구조 발견의 결정적 단서가 된 X선 사진을 남겼습니다.",
        "Her X-ray images were key to discovering the structure of DNA.",
        "Sus imágenes de rayos X fueron clave para descubrir la estructura del ADN."
      ),
    },
  ],
  "OAK-V": [
    {
      name: "Lionel Messi",
      birthYear: 1987,
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
      field: t("소설가", "Novelist", "Novelista"),
      blurb: t(
        "가짜 사형 집행과 시베리아 유형을 겪고도 걸작들을 완성했습니다.",
        "Survived a mock execution and Siberian exile to write his greatest novels.",
        "Sobrevivió a una ejecución simulada y al exilio en Siberia para escribir sus grandes novelas."
      ),
    },
  ],
  "OAK-W": [
    {
      name: "Billie Jean King",
      birthYear: 1943,
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "'성 대결' 경기에서 이기며 테니스의 남녀 상금 평등을 이끌어냈습니다.",
        "Won the 'Battle of the Sexes' and fought for equal pay in tennis.",
        "Ganó la 'Batalla de los Sexos' y luchó por la igualdad salarial en el tenis."
      ),
    },
    {
      name: "Kim Dae-jung",
      birthYear: 1924,
      field: t("정치인", "Politician", "Político"),
      blurb: t(
        "여러 차례 암살 위협을 견디고 한국 민주화 공로로 노벨평화상을 받았습니다.",
        "Survived assassination attempts to win the Nobel Peace Prize for Korean democracy.",
        "Sobrevivió a intentos de asesinato y ganó el Nobel de la Paz por la democracia coreana."
      ),
    },
  ],
  "VIN-R": [
    {
      name: "Malala Yousafzai",
      birthYear: 1997,
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
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "리스본의 가난한 동네에서 시작해 세계적인 축구 스타가 됐습니다.",
        "Rose from a poor Lisbon neighborhood to global soccer stardom.",
        "Surgió de un barrio pobre de Lisboa para convertirse en una estrella global del fútbol."
      ),
    },
  ],
  "VIN-H": [
    {
      name: "Wolfgang Amadeus Mozart",
      birthYear: 1756,
      field: t("작곡가", "Composer", "Compositor"),
      blurb: t(
        "35세에 세상을 떠나기까지 600곡이 넘는 작품을 남겼습니다.",
        "Composed over 600 works before dying at 35.",
        "Compuso más de 600 obras antes de morir a los 35 años."
      ),
    },
    {
      name: "Coco Chanel",
      birthYear: 1883,
      field: t("패션 디자이너", "Fashion designer", "Diseñadora de moda"),
      blurb: t(
        "고아원 출신으로 시작해 여성 패션의 규칙을 다시 썼습니다.",
        "Rose from an orphanage to redefine women's fashion.",
        "Surgió de un orfanato para redefinir la moda femenina."
      ),
    },
  ],
  "VIN-O": [
    {
      name: "Beyoncé",
      birthYear: 1981,
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "걸그룹 멤버에서 시작해 솔로 최정상 스타로 올라섰습니다.",
        "Rose from a girl group to solo global superstardom.",
        "Pasó de un grupo femenino a convertirse en una superestrella global en solitario."
      ),
    },
    {
      name: "Son Heung-min",
      birthYear: 1992,
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "아시아 선수 최초로 유럽 최상위 리그 득점왕에 올랐습니다.",
        "Became the first Asian player to win Europe's top league Golden Boot.",
        "Se convirtió en el primer jugador asiático en ganar el Botín de Oro de la mejor liga europea."
      ),
    },
  ],
  "VIN-V": [
    {
      name: "Katherine Johnson",
      birthYear: 1918,
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
      field: t("래퍼", "Rapper", "Rapera"),
      blurb: t(
        "뉴욕 퀸스에서 시작해 힙합에서 가장 영향력 있는 여성 아티스트가 됐습니다.",
        "Rose from Queens, New York to become hip-hop's most influential female voice.",
        "Surgió de Queens, Nueva York, para convertirse en la voz femenina más influyente del hip-hop."
      ),
    },
  ],
  "SUN-R": [
    {
      name: "Mahatma Gandhi",
      birthYear: 1869,
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
      field: t("작가", "Author", "Escritora"),
      blurb: t(
        "생활고를 겪던 싱글맘 시절 해리포터 시리즈를 써냈습니다.",
        "Wrote the Harry Potter series while a struggling single mother.",
        "Escribió la saga de Harry Potter mientras era una madre soltera con dificultades económicas."
      ),
    },
  ],
  "SUN-H": [
    {
      name: "Jesse Owens",
      birthYear: 1913,
      field: t("육상선수", "Track & field athlete", "Atleta"),
      blurb: t(
        "나치 독일 한복판에서 올림픽 금메달 4개를 따내며 인종주의에 맞섰습니다.",
        "Won four Olympic gold medals in Nazi Germany, defying racist ideology.",
        "Ganó cuatro medallas de oro olímpicas en la Alemania nazi, desafiando la ideología racista."
      ),
    },
  ],
  "SUN-O": [
    {
      name: "Rosa Parks",
      birthYear: 1913,
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
      field: t("기업가", "Entrepreneur", "Empresario"),
      blurb: t(
        "애플을 공동창업하며 개인용 기술의 판도를 바꿨습니다.",
        "Co-founded Apple and revolutionized personal technology.",
        "Cofundó Apple y revolucionó la tecnología personal."
      ),
    },
  ],
  "SUN-W": [
    {
      name: "Albert Einstein",
      birthYear: 1879,
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
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "수십 년의 명연기 끝에 마침내 오스카 트로피를 들었습니다.",
        "Finally won his Oscar after decades of acclaimed roles.",
        "Finalmente ganó su Óscar tras décadas de actuaciones aclamadas."
      ),
    },
  ],
  "FLM-R": [
    {
      name: "Walt Disney",
      birthYear: 1901,
      field: t("기업가", "Entrepreneur", "Empresario"),
      blurb: t(
        "손으로 그린 만화 한 편에서 시작해 거대한 엔터테인먼트 제국을 세웠습니다.",
        "Built an entertainment empire from hand-drawn cartoons.",
        "Construyó un imperio del entretenimiento a partir de dibujos animados hechos a mano."
      ),
    },
    {
      name: "Usain Bolt",
      birthYear: 1986,
      field: t("육상선수", "Sprinter", "Velocista"),
      blurb: t(
        "역대 가장 빠른 기록을 세운 인간이 됐습니다.",
        "Became the fastest man ever recorded.",
        "Se convirtió en el hombre más rápido jamás registrado."
      ),
    },
  ],
  "FLM-H": [
    {
      name: "Serena Williams",
      birthYear: 1981,
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
      field: t("정치인", "Politician", "Político"),
      blurb: t(
        "배우 생활을 거쳐 미국 대통령 자리에 올랐습니다.",
        "Moved from acting to the US presidency.",
        "Pasó de la actuación a la presidencia de Estados Unidos."
      ),
    },
  ],
  "FLM-O": [
    {
      name: "Mia Hamm",
      birthYear: 1972,
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
      field: t("영화감독", "Film director", "Director de cine"),
      blurb: t(
        "전 세계 영화계에 가장 큰 영향을 준 감독 중 한 명이 됐습니다.",
        "Became one of history's most influential filmmakers worldwide.",
        "Se convirtió en uno de los cineastas más influyentes de la historia."
      ),
    },
  ],
  "FLM-W": [
    {
      name: "Viola Davis",
      birthYear: 1965,
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
      field: t("기업가", "Entrepreneur", "Empresario"),
      blurb: t(
        "기숙사 방에서 시작한 페이스북을 세계적인 플랫폼으로 키웠습니다.",
        "Built Facebook from a dorm room into a global platform.",
        "Construyó Facebook desde un dormitorio universitario hasta convertirlo en una plataforma global."
      ),
    },
    {
      name: "LeBron James",
      birthYear: 1984,
      field: t("농구선수", "Basketball player", "Baloncestista"),
      blurb: t(
        "불안정한 가정환경을 딛고 농구 역사상 최고의 선수 중 하나가 됐습니다.",
        "Rose from a struggling single-parent household to become a global basketball icon.",
        "Superó un hogar monoparental en dificultades para convertirse en un ícono global del baloncesto."
      ),
    },
  ],
  "MTN-H": [
    {
      name: "Lupita Nyong'o",
      birthYear: 1983,
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
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "축구 스타덤을 세계적인 라이프스타일 브랜드로 확장했습니다.",
        "Turned soccer stardom into a global lifestyle brand.",
        "Convirtió su fama futbolística en una marca de estilo de vida global."
      ),
    },
  ],
  "MTN-V": [
    {
      name: "Roger Federer",
      birthYear: 1981,
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
      field: t("음악가", "Musician", "Músico"),
      blurb: t(
        "어릴 적 시력을 잃었지만 음악 천재이자 다작 히트메이커가 됐습니다.",
        "Became a musical genius and prolific hitmaker despite blindness since infancy.",
        "Se convirtió en un genio musical y prolífico creador de éxitos pese a perder la vista de bebé."
      ),
    },
  ],
  "MTN-W": [
    {
      name: "Denzel Washington",
      birthYear: 1954,
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
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "하버드 학위와 오스카 수상 연기력을 함께 쌓았습니다.",
        "Balanced a Harvard degree with an Oscar-winning acting career.",
        "Combinó un título de Harvard con una carrera actoral ganadora de un Óscar."
      ),
    },
  ],
  "FLD-R": [
    {
      name: "Charles Darwin",
      birthYear: 1809,
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
      field: t("정치인", "Politician", "Político"),
      blurb: t(
        "미국 최초의 흑인 대통령이 됐습니다.",
        "Became the first Black president of the United States.",
        "Se convirtió en el primer presidente afroamericano de Estados Unidos."
      ),
    },
  ],
  "FLD-H": [
    {
      name: "Charles Dickens",
      birthYear: 1812,
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
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "대가족 출신으로 세계적인 보컬 파워하우스가 됐습니다.",
        "Rose from a large Quebec family to become a global vocal powerhouse.",
        "Surgió de una gran familia de Quebec para convertirse en una potencia vocal global."
      ),
    },
  ],
  "FLD-V": [
    {
      name: "Karl Lagerfeld",
      birthYear: 1933,
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
      field: t("게임 디자이너", "Game designer", "Diseñador de videojuegos"),
      blurb: t(
        "메탈기어 시리즈로 비디오게임을 서사 예술의 영역으로 끌어올렸습니다.",
        "Redefined video games as narrative art with the Metal Gear series.",
        "Redefinió los videojuegos como arte narrativo con la saga Metal Gear."
      ),
    },
  ],
  "FLD-W": [
    {
      name: "Franklin D. Roosevelt",
      birthYear: 1882,
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
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "무용수로 훈련받다가 세계적인 슈퍼히어로 스타가 됐습니다.",
        "Trained as a dancer before becoming a global superhero star.",
        "Se entrenó como bailarín antes de convertirse en una estrella global de superhéroes."
      ),
    },
  ],
  "STL-R": [
    {
      name: "Muhammad Ali",
      birthYear: 1942,
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
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "공감 어린 리더십으로 뉴질랜드를 위기 속에서 이끌었습니다.",
        "Led New Zealand through crisis with an empathetic leadership style.",
        "Lideró a Nueva Zelanda en tiempos de crisis con un estilo de liderazgo empático."
      ),
    },
  ],
  "STL-H": [
    {
      name: "Jeff Bezos",
      birthYear: 1964,
      field: t("기업가", "Entrepreneur", "Empresario"),
      blurb: t(
        "온라인 서점을 세계적인 대기업으로 키웠습니다.",
        "Built Amazon from an online bookstore into a global giant.",
        "Construyó Amazon desde una librería en línea hasta un gigante global."
      ),
    },
    {
      name: "Tiger Woods",
      birthYear: 1975,
      field: t("골프선수", "Golfer", "Golfista"),
      blurb: t(
        "몸과 커리어를 다시 세우며 골프 정상으로 복귀했습니다.",
        "Rebuilt his career and body to return to the top of golf.",
        "Reconstruyó su carrera y su cuerpo para volver a la cima del golf."
      ),
    },
  ],
  "STL-O": [
    {
      name: "Alan Turing",
      birthYear: 1912,
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
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "영국 최초의 여성 총리가 됐습니다.",
        "Became Britain's first female prime minister.",
        "Se convirtió en la primera ministra de Gran Bretaña."
      ),
    },
  ],
  "STL-V": [
    {
      name: "Michael Phelps",
      birthYear: 1985,
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
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "런던 서민 동네 출신에서 세계적인 주연 배우로 올라섰습니다.",
        "Rose from London working-class roots to global leading-man status.",
        "Surgió de un barrio obrero de Londres para convertirse en un actor protagonista global."
      ),
    },
  ],
  "STL-W": [
    {
      name: "Martin Luther King Jr.",
      birthYear: 1929,
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
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "가사의 솔직한 감정 표현만으로 커리어를 쌓았습니다.",
        "Built a career on raw emotional honesty in her lyrics.",
        "Construyó su carrera sobre la honestidad emocional cruda de sus letras."
      ),
    },
  ],
  "GEM-R": [
    {
      name: "Stephen Hawking",
      birthYear: 1942,
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
      field: t("축구선수", "Soccer player", "Futbolista"),
      blurb: t(
        "혼자만의 천재성으로 아르헨티나를 월드컵 우승으로 이끌었습니다.",
        "Carried Argentina to a World Cup with singular brilliance.",
        "Llevó a Argentina a un Mundial con un talento singular."
      ),
    },
  ],
  "GEM-H": [
    {
      name: "Marie Curie",
      birthYear: 1867,
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
      field: t("정치인", "Statesman", "Estadista"),
      blurb: t(
        "2차 대전 동안 영국을 이끌었습니다.",
        "Led Britain through World War II.",
        "Lideró a Gran Bretaña durante la Segunda Guerra Mundial."
      ),
    },
  ],
  "GEM-O": [
    {
      name: "Marilyn Monroe",
      birthYear: 1926,
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
      field: t("정치인", "Politician", "Político"),
      blurb: t(
        "우주 탐사의 비전으로 한 세대에게 영감을 줬습니다.",
        "Inspired a generation with a vision of space exploration.",
        "Inspiró a una generación con su visión de la exploración espacial."
      ),
    },
  ],
  "GEM-V": [
    {
      name: "Neymar",
      birthYear: 1992,
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
      field: t("무용가", "Dancer", "Bailarín"),
      blurb: t(
        "소련을 떠나 현대 발레를 새롭게 정의했습니다.",
        "Defected from the Soviet Union to redefine modern ballet.",
        "Desertó de la Unión Soviética para redefinir el ballet moderno."
      ),
    },
  ],
  "GEM-W": [
    {
      name: "Christopher Nolan",
      birthYear: 1970,
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
      field: t("테니스선수", "Tennis player", "Tenista"),
      blurb: t(
        "정신건강을 솔직히 이야기하며 그랜드슬램 챔피언이 됐습니다.",
        "Became a Grand Slam champion while speaking openly about mental health.",
        "Se convirtió en campeona de Grand Slam mientras hablaba abiertamente sobre salud mental."
      ),
    },
  ],
  "OCN-R": [
    {
      name: "The Weeknd",
      birthYear: 1990,
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "익명의 믹스테이프로 시작해 슈퍼볼 할프타임 무대에 섰습니다.",
        "Rose from anonymous mixtapes to headline the Super Bowl halftime show.",
        "Surgió de mixtapes anónimos para encabezar el show de medio tiempo del Super Bowl."
      ),
    },
    {
      name: "Timothée Chalamet",
      birthYear: 1995,
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "동세대에서 가장 젊은 나이에 오스카 남우주연상 후보에 올랐습니다.",
        "Became one of the youngest Best Actor Oscar nominees of his era.",
        "Se convirtió en uno de los nominados más jóvenes a Mejor Actor en los Óscar."
      ),
    },
  ],
  "OCN-H": [
    {
      name: "Freddie Mercury",
      birthYear: 1946,
      field: t("가수", "Singer", "Cantante"),
      blurb: t(
        "잔지바르에서 이주해 록 역사상 최고의 쇼맨 중 한 명이 됐습니다.",
        "Immigrated from Zanzibar to become one of rock's greatest showmen.",
        "Emigró desde Zanzíbar para convertirse en uno de los mejores showmen del rock."
      ),
    },
    {
      name: "Paul McCartney",
      birthYear: 1942,
      field: t("음악가", "Musician", "Músico"),
      blurb: t(
        "역사상 가장 많이 팔린 곡들을 공동 작곡했습니다.",
        "Co-wrote some of the best-selling songs in history.",
        "Coescribió algunas de las canciones más vendidas de la historia."
      ),
    },
  ],
  "OCN-O": [
    {
      name: "Pablo Picasso",
      birthYear: 1881,
      field: t("화가", "Painter", "Pintor"),
      blurb: t(
        "큐비즘을 공동 창시하고 75년간 왕성하게 활동했습니다.",
        "Co-founded Cubism and remained prolific for 75 years.",
        "Cofundó el Cubismo y se mantuvo prolífico durante 75 años."
      ),
    },
    {
      name: "Bill Gates",
      birthYear: 1955,
      field: t("기업가", "Entrepreneur", "Empresario"),
      blurb: t(
        "마이크로소프트를 공동창업하고 세계적인 자선사업가가 됐습니다.",
        "Co-founded Microsoft and became a leading global philanthropist.",
        "Cofundó Microsoft y se convirtió en un importante filántropo global."
      ),
    },
  ],
  "OCN-V": [
    {
      name: "Kamala Harris",
      birthYear: 1964,
      field: t("정치인", "Politician", "Política"),
      blurb: t(
        "미국 최초의 여성이자 흑인 여성 부통령이 됐습니다.",
        "Became the first woman and first Black woman US vice president.",
        "Se convirtió en la primera mujer y primera mujer afroamericana vicepresidenta de EE. UU."
      ),
    },
    {
      name: "Robin Williams",
      birthYear: 1951,
      field: t("배우", "Actor", "Actor"),
      blurb: t(
        "폭발적인 에너지를 사랑받는 코미디·드라마 연기로 승화시켰습니다.",
        "Channeled manic energy into beloved comedic and dramatic roles.",
        "Canalizó su energía desbordante en papeles cómicos y dramáticos entrañables."
      ),
    },
  ],
  "OCN-W": [
    {
      name: "Warren Buffett",
      birthYear: 1930,
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
      field: t("배우", "Actor", "Actriz"),
      blurb: t(
        "2010년대 최연소 여우주연상 수상자가 됐습니다.",
        "Became the youngest Best Actress winner of the 2010s.",
        "Se convirtió en la ganadora más joven a Mejor Actriz de la década de 2010."
      ),
    },
  ],
  "DEW-R": [
    {
      name: "Stephen King",
      birthYear: 1947,
      field: t("작가", "Author", "Escritor"),
      blurb: t(
        "초기의 거절들을 딛고 최고의 베스트셀러 공포소설 작가가 됐습니다.",
        "Became the best-selling horror author after early rejection.",
        "Se convirtió en el autor de terror más vendido tras rechazos iniciales."
      ),
    },
    {
      name: "Dalai Lama",
      birthYear: 1935,
      field: t("종교 지도자", "Religious leader", "Líder religioso"),
      blurb: t(
        "망명 생활 속에서도 수십 년간 평화를 이야기해왔습니다.",
        "Led Tibetan Buddhism in exile for decades while advocating peace.",
        "Lideró el budismo tibetano en el exilio durante décadas mientras abogaba por la paz."
      ),
    },
  ],
  "DEW-H": [
    {
      name: "Jackie Chan",
      birthYear: 1954,
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
      field: t("비행사", "Aviator", "Aviadora"),
      blurb: t(
        "여성 최초로 대서양을 단독 횡단 비행했습니다.",
        "Became the first woman to fly solo across the Atlantic.",
        "Se convirtió en la primera mujer en volar en solitario sobre el Atlántico."
      ),
    },
  ],
  "DEW-O": [
    {
      name: "Meryl Streep",
      birthYear: 1949,
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
      field: t("래퍼·기업가", "Rapper & entrepreneur", "Rapero y empresario"),
      blurb: t(
        "거리 생활을 딛고 수십억 달러 규모의 비즈니스와 음악 제국을 세웠습니다.",
        "Turned street hustling into a billion-dollar business and music empire.",
        "Convirtió las calles en un imperio musical y empresarial de miles de millones de dólares."
      ),
    },
  ],
  "DEW-V": [
    {
      name: "Ludwig van Beethoven",
      birthYear: 1770,
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
      field: t("인권운동가", "Activist", "Activista"),
      blurb: t(
        "힘든 청년기를 지나 흑인 인권을 위한 강력한 목소리가 됐습니다.",
        "Transformed from a troubled youth into a powerful voice for Black empowerment.",
        "Se transformó de un joven problemático en una voz poderosa por el empoderamiento afroamericano."
      ),
    },
  ],
  "DEW-W": [
    {
      name: "Mother Teresa",
      birthYear: 1910,
      field: t("인도주의자", "Humanitarian", "Humanitaria"),
      blurb: t(
        "콜카타의 가장 가난한 이들을 돌보는 데 평생을 바쳤습니다.",
        "Devoted her life to caring for the poorest of the poor in Calcutta.",
        "Dedicó su vida a cuidar a los más pobres de Calcuta."
      ),
    },
    {
      name: "Kim Yuna",
      birthYear: 1990,
      field: t("피겨스케이팅선수", "Figure skater", "Patinadora artística"),
      blurb: t(
        "올림픽 금메달을 따내며 국민적인 아이콘이 됐습니다.",
        "Won Olympic gold and became a national icon in figure skating.",
        "Ganó el oro olímpico y se convirtió en un ícono nacional del patinaje artístico."
      ),
    },
  ],
};

export function getCelebritiesForType(code: string): CelebrityEntry[] {
  return SAJU_TYPE_CELEBRITIES[code] ?? [];
}
