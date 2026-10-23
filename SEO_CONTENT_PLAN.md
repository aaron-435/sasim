# SEO 콘텐츠 계획 (2026-10-23)

`SPEC.md` 결정 2 기준. 일간 10개 글 외에 주제 가이드(`/guides`)를 en/es 우선으로 늘린다. ko는 선택이라 첫 묶음에서는 쓰지 않는다(없는 언어는 페이지·sitemap·hreflang 모두 없음).

## 구조
- 경로: `/guides`(목록), `/guides/<slug>`. 영어는 루트, 스페인어는 `/es/guides/...`.
- 데이터: `lib/seoGuides/<이름>.ts`(언어별 `metaTitle`, `description`, `h1`, `lead`, `sections`, `tryThis`; 일간 글과 같은 형식), 등록은 `lib/seoGuides/index.ts`의 `GUIDES`. 새 글 = 파일 1개 + `GUIDES`에 한 줄.
- 화면: `components/GuidePage.tsx`(일간 글과 같은 `dm-*` 틀). 글마다 관련 일간 글 링크.
- 글이 없는 언어: sitemap URL과 hreflang에서 빠지고, 그 URL은 404.

## 쓰기 규칙
- 사주는 문화 전통·성찰의 틀이라고 첫 문단에서 밝힌다. 성향으로 쓰고 판정하지 않는다.
- 금지: 나쁜 궁합 판정, 관계 결말 예언, 불안·공포 소구, 건강·돈·사고 예측, 가짜 희소성(`PRODUCT.md`).
- ES는 tú(단수), 복수는 ustedes(라틴 중립). 용어: Maestro del Día, Cuatro Pilares, tronco celeste, rama terrestre, cinco elementos.
- 끝에 무료 계산기 CTA, 관련 일간 글 링크, 앱 설치 박스(공용 Shell).

## 주제 목록과 목표 검색어

| # | slug | 목표 검색어 (en / es) | 상태 |
|---|---|---|---|
| 1 | `saju-compatibility-five-elements` | saju compatibility, five elements compatibility / compatibilidad saju, compatibilidad cinco elementos | 작성 (2026-10-23) |
| 2 | `saju-vs-astrology` | saju vs astrology, bazi vs astrology / saju vs astrología | 작성 (2026-10-23) |
| 3 | `how-to-read-saju-four-pillars` | how to read four pillars, saju chart reading / cómo leer los cuatro pilares, saju para principiantes | 작성 (2026-10-23) |
| 4 | `what-is-a-day-master` | what is a day master, find my day master / qué es el maestro del día | 예정 |
| 5 | `five-elements-wood-fire-earth-metal-water` | five elements saju, wuxing meaning / cinco elementos saju | 예정 |
| 6 | `yin-yang-in-saju` | yin yang saju, yin wood yang wood / yin y yang en el saju | 예정 |
| 7 | `saju-ten-year-luck-cycles` | ten year luck cycle saju, daeun / ciclos de suerte de diez años saju | 예정 |
| 8 | `saju-vs-mbti` | saju vs mbti / saju vs mbti | 예정 |
| 9 | `lack-of-an-element-in-saju` | missing element in saju chart / elemento ausente en el saju | 예정 (톤 주의: "부족"을 결함이 아닌 균형 이야기로) |
| 10 | `day-master-compatibility-pairs` | day master compatibility chart / compatibilidad entre maestros del día | 예정 (#1의 심화, 중복 주의) |

## 다음 단계
- #4~#6을 두 번째 묶음으로. 글이 늘면 `/day-master` 목록과 랜딩 하단에서 `/guides`로 가는 내부 링크를 건다.
- 문구는 Opus가 쓰고 사용자가 압박 마케팅 규칙 위반 여부를 확인한다.
