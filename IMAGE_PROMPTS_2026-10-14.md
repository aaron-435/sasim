# 이미지 생성 프롬프트 (2026-10-14 UI 개편용)

`DESIGN_AUDIT_2026-10-14.md`의 6-2(일러스트), 6-3(질감)에 쓸 AI 생성 프롬프트입니다. 6-1(사용자별 생성 그림)은 코드로 그리므로 여기에는 없습니다.

## 쓰는 법

1. 모든 프롬프트 앞에 **공통 스타일**을 붙입니다. 질감만 예외로, 질감용 공통 스타일을 따로 씁니다.
2. 각 묶음에서 **먼저 2~3장만 뽑아 스타일을 맞춘 뒤** 나머지를 생성합니다. 마음에 드는 첫 장이 나오면 그 이미지를 스타일 참조로 걸어 두면(Midjourney `--sref`, GPT 이미지 편집의 참조 이미지 등) 묶음 전체의 톤이 흔들리지 않습니다.
3. 프롬프트는 영어입니다. 이미지 모델은 영어에서 결과가 더 안정적입니다.
4. 결과 파일은 아래 **파일 이름** 그대로 저장해 `art-inbox/` 폴더(저장소 루트, 새로 만들기)에 넣어 주세요. 후보정(팔레트 맞춤, 크기, WebP 변환)과 배치는 제가 하겠습니다.

## 공통 스타일 (일러스트)

```
Minimal Korean ink-wash (sumi-e) line illustration, fine confident brush lines in warm parchment tone #D9C9A3, one or two soft celadon jade washes #6FA98B, generous empty space, calm and contemplative, elegant and modern, no text, no letters, no calligraphy, no frame, no border, centered single subject, transparent background
```

- 투명 배경을 지원하지 않는 도구라면 마지막 `transparent background`를 `flat solid background color #122019`로 바꿉니다. 앱 배경색과 같아서 잘라 내지 않아도 자연스럽게 얹힙니다.
- 공통 금지어(negative, 지원하는 도구만): `text, watermark, signature, dragon, lantern, red, gold foil, 3d render, glossy, photorealistic, cartoon, anime, cute mascot, busy background, gradient background`

## 규격

| 묶음 | 비율 | 생성 해상도 | 비고 |
|---|---|---|---|
| 일간 / 오행 / 12지 / 빈 화면 | 1:1 | 1024×1024 이상 | 투명 배경 |
| 모듈 표지 | 4:5 | 1024×1280 이상 | 투명 배경, 아래 30%는 비워 둠(글자 자리) |
| 24절기 | 3:2 | 1536×1024 이상 | 배경 `#122019`, 가로로 긴 풍경 |
| 질감 | 1:1 | 2048×2048 | 이음매 없는 타일 |

---

## A. 일간 10종 (태어난 날의 기운)

앱 안 이름(`lib/sajuTypeContent.ts`)과 같은 상징입니다. 유형 공개, 리포트 표지, 공유 카드에 씁니다.

| 파일 이름 | 일간 | 앱 이름 | 프롬프트 (공통 스타일 뒤에 붙임) |
|---|---|---|---|
| `daymaster-gap.png` | 갑 甲 | 거목 | `a single tall ancient pine tree standing upright, strong straight trunk, roots gripping the ground, sense of steady growth` |
| `daymaster-eul.png` | 을 乙 | 덩굴 | `a flowering vine gracefully climbing and curling around a thin bamboo stake, flexible and resilient, small leaves and buds` |
| `daymaster-byeong.png` | 병 丙 | 태양 | `a large radiant sun rising above a soft horizon line, broad gentle rays drawn with sparse brush strokes, warm and generous` |
| `daymaster-jeong.png` | 정 丁 | 등불 | `a single small candle flame inside a simple paper lamp, intimate warm glow, quiet focus, surrounded by calm darkness` |
| `daymaster-mu.png` | 무 戊 | 산 | `a solid layered mountain with a flat stable summit, mist at its base, immovable and protective` |
| `daymaster-gi.png` | 기 己 | 밭 | `gently terraced fields with soft furrows and a few young sprouts, nurturing fertile earth, seen from a low angle` |
| `daymaster-gyeong.png` | 경 庚 | 원석 | `a rough uncut boulder with one clean sharp facet revealing smooth stone inside, raw strength and potential` |
| `daymaster-sin.png` | 신 辛 | 보석 | `a single cut gemstone resting on a small silk cloth, crisp facets catching a thin line of light, refined and precise` |
| `daymaster-im.png` | 임 壬 | 바다 | `wide open sea with long rolling waves to the horizon, deep and expansive, a few sweeping brush strokes` |
| `daymaster-gye.png` | 계 癸 | 이슬 | `a single dewdrop hanging from the tip of a slender grass blade at dawn, delicate and quiet, tiny reflection inside the drop` |

## B. 오행 5원소

원국 칩, 리포트 원소 페이지, 운세 영역에 씁니다. 일간보다 더 **단순한 상징**(아이콘에 가까운 무게)으로 뽑습니다. 공통 스타일 뒤에 `simple emblem-like composition, very few strokes`를 더 붙입니다.

| 파일 이름 | 원소 | 프롬프트 |
|---|---|---|
| `element-wood.png` | 목 木 | `a young sapling with three leaves rising from the ground` |
| `element-fire.png` | 화 火 | `a single soft flame shape with an inner curl` |
| `element-earth.png` | 토 土 | `a low rounded hill with a horizontal ground line` |
| `element-metal.png` | 금 金 | `a smooth round metal bell or polished disc with one highlight line` |
| `element-water.png` | 수 水 | `three gently flowing wave lines forming a small stream` |

## C. 12지 동물

궁합, 신년 리포트에 씁니다. 귀여운 캐릭터가 아니라 **우아한 선화**로 갑니다. 공통 스타일 뒤에 `graceful naturalistic animal, side or three-quarter view, calm posture, not cute, not cartoon`을 더 붙입니다.

| 파일 이름 | 띠 | 프롬프트 |
|---|---|---|
| `zodiac-rat.png` | 자 子 쥐 | `a small field mouse sitting upright holding a grain of rice` |
| `zodiac-ox.png` | 축 丑 소 | `a resting ox lying calmly, strong shoulders, patient gaze` |
| `zodiac-tiger.png` | 인 寅 호랑이 | `a tiger walking slowly, stripes drawn in light brush strokes, dignified not fierce` |
| `zodiac-rabbit.png` | 묘 卯 토끼 | `a rabbit sitting alert with long ears, a few grass blades nearby` |
| `zodiac-dragon.png` | 진 辰 용 | `a slender eastern dragon coiling softly through a wisp of cloud, elegant and calm, minimal detail` |
| `zodiac-snake.png` | 사 巳 뱀 | `a snake resting in a relaxed elegant S curve, smooth and quiet` |
| `zodiac-horse.png` | 오 午 말 | `a horse mid-stride with flowing mane, sense of free movement` |
| `zodiac-goat.png` | 미 未 양 | `a mountain goat standing on a small rock, soft woolly coat` |
| `zodiac-monkey.png` | 신 申 원숭이 | `a monkey sitting on a branch, curious relaxed pose, long tail hanging` |
| `zodiac-rooster.png` | 유 酉 닭 | `a rooster standing proudly, layered tail feathers in loose strokes` |
| `zodiac-dog.png` | 술 戌 개 | `a loyal dog sitting attentively, ears up, calm and warm` |
| `zodiac-pig.png` | 해 亥 돼지 | `a round contented pig resting, soft gentle lines` |

용(진)은 공통 금지어에 `dragon`이 있으니 **이 한 장은 금지어에서 dragon을 빼고** 생성하세요.

## D. 심리테스트 모듈 표지 12종

모듈 선택 타일과 리포트 첫 장에 씁니다. 사람 얼굴은 넣지 않고 **상징 사물이나 풍경**으로 감정을 표현합니다. 공통 스타일 뒤에 `vertical composition, subject in the upper 70 percent, lower 30 percent left empty`를 더 붙입니다.

| 파일 이름 | 모듈 | 프롬프트 |
|---|---|---|
| `module1-love.png` | 연애 & 애착 | `two small boats on calm water tied together by a loose thin rope, gentle distance between them` |
| `module2-money.png` | 돈 | `a simple ceramic bowl holding a few round coins and grains of rice, balanced and still` |
| `module3-burnout.png` | 번아웃 | `a candle burned low beside an open window with a soft breeze, a quiet moment of rest` |
| `module4-mask.png` | 가면 | `a traditional Korean mask lying face up on a cloth beside a small mirror, calm not eerie` |
| `module5-followthrough.png` | 실행력 | `stepping stones crossing a shallow stream, the first stone close and clear, the rest fading into mist` |
| `module6-anger.png` | 분노 | `a kettle on a small fire with a thin curl of steam, contained heat, calm surroundings` |
| `module7-sensitivity.png` | 예민함 | `a single feather resting on still water creating faint ripples` |
| `module8-sleep.png` | 수면 | `a crescent moon above a low quiet roofline, a few stars, soft night calm` |
| `module9-family.png` | 원가족 | `an old tree with roots spreading underground and a few branches reaching outward` |
| `module10-focus.png` | 몰입 | `a single brush resting on an inkstone with one perfect ink circle drawn beside it` |
| `module11-expression.png` | 본능 / 자기표현 | `a bird taking off from a branch, wings opening, a few leaves scattering` |
| `module12-freshstart.png` | 새 출발 | `an open wooden gate with a path leading toward a soft sunrise` |

`module4`의 가면은 하회탈처럼 특정 문화재를 그대로 베끼지 말고 단순한 형태로 뽑습니다.

## E. 24절기

오늘의 운세 헤더와 절기 알림에 씁니다. 배경은 **`#122019` 단색**(투명 아님)입니다. 공통 스타일에서 마지막 `transparent background`를 빼고 `wide horizontal landscape, flat solid background #122019, subject in the lower two thirds, top third empty`를 붙입니다.

| 파일 이름 | 절기 | 프롬프트 |
|---|---|---|
| `term-01-ipchun.png` | 입춘 Start of Spring | `bare plum branch with the first two small blossoms, melting snow on the ground` |
| `term-02-usu.png` | 우수 Rain Water | `light rain falling over a thawing stream, thin ice edges breaking` |
| `term-03-gyeongchip.png` | 경칩 Awakening of Insects | `a frog emerging from damp soil beside fresh green shoots` |
| `term-04-chunbun.png` | 춘분 Spring Equinox | `a balanced horizon with equal sky and field, a swallow in flight` |
| `term-05-cheongmyeong.png` | 청명 Clear and Bright | `willow branches swaying over a clear river under a bright sky` |
| `term-06-gogu.png` | 곡우 Grain Rain | `soft rain over newly planted rice paddies reflecting the sky` |
| `term-07-ipha.png` | 입하 Start of Summer | `full green tree canopy with dense leaves, warm still air` |
| `term-08-soman.png` | 소만 Grain Buds | `young barley heads beginning to fill, swaying slightly` |
| `term-09-mangjong.png` | 망종 Grain in Ear | `a farmer's straw hat resting at the edge of a paddy field ready for planting` |
| `term-10-haji.png` | 하지 Summer Solstice | `a high sun over long grass, the longest day, lotus leaves on a pond` |
| `term-11-soseo.png` | 소서 Minor Heat | `lotus flowers opening on a pond, heat haze lines in the air` |
| `term-12-daeseo.png` | 대서 Major Heat | `cicada on a tree trunk, thick summer foliage, shimmering heat` |
| `term-13-ipchu.png` | 입추 Start of Autumn | `the first yellow leaf on a green branch, a dragonfly nearby` |
| `term-14-cheoseo.png` | 처서 End of Heat | `cool evening breeze over grasses, a crescent moon rising` |
| `term-15-baengno.png` | 백로 White Dew | `dew drops on bent autumn grasses at dawn` |
| `term-16-chubun.png` | 추분 Autumn Equinox | `balanced horizon with ripe rice fields bowing, geese flying` |
| `term-17-hallo.png` | 한로 Cold Dew | `chrysanthemums blooming beside a cool stream` |
| `term-18-sanggang.png` | 상강 Frost Descent | `maple leaves with a thin rim of frost on a stone path` |
| `term-19-ipdong.png` | 입동 Start of Winter | `persimmons left on a bare branch, the first cold wind` |
| `term-20-soseol.png` | 소설 Minor Snow | `light snow beginning to fall on a thatched roof` |
| `term-21-daeseol.png` | 대설 Major Snow | `pine trees covered with heavy snow, quiet white landscape` |
| `term-22-dongji.png` | 동지 Winter Solstice | `a long night with a low moon over a snowy village, one warm window` |
| `term-23-sohan.png` | 소한 Minor Cold | `a frozen river with reeds standing in ice` |
| `term-24-daehan.png` | 대한 Major Cold | `snow-covered mountain range under a clear cold sky, the first hint of plum buds` |

## F. 빈 화면 · 오류 · 로딩

공통 스타일 뒤에 `small spot illustration, very simple, lots of empty space`를 더 붙입니다.

| 파일 이름 | 쓰는 곳 | 프롬프트 |
|---|---|---|
| `empty-journal.png` | 저널 기록 없음 | `an open blank notebook with a brush resting on it` |
| `empty-compat.png` | 받은 궁합 없음 | `two empty teacups facing each other on a small tray` |
| `empty-reports.png` | 내 리포트 없음 | `a closed folded letter tied with a thin string` |
| `error-network.png` | 네트워크 오류 | `a paper kite with its string loosely drifting, gentle not sad` |
| `error-generic.png` | 일반 오류 | `a small stone path with one stone out of place` |
| `loading-calc.png` | 사주 계산 중 (정지 이미지 대체용) | `five small circles arranged in a gentle ring like a pentagon, each with a different subtle mark` |

---

## G. 질감 (이음매 없는 타일)

일러스트 공통 스타일을 **쓰지 않고** 아래 질감용 공통 스타일을 씁니다.

```
Seamless tileable texture, top-down flat scan, even lighting, no shadows, no objects, no text, very subtle low contrast, dark green base #122019
```

| 파일 이름 | 질감 | 프롬프트 |
|---|---|---|
| `texture-hanji.png` | 한지 결 | `Korean mulberry hanji paper fibers, long soft fibers faintly visible, slightly lighter than the base` |
| `texture-celadon.png` | 청자 빙렬 | `fine crackle glaze pattern of celadon ceramic, thin irregular hairline cracks in muted jade #6FA98B at very low opacity` |
| `texture-ink.png` | 먹 번짐 | `soft diffuse ink wash clouds bleeding into wet paper, very faint, organic edges` |

이음매 확인: 결과를 2×2로 붙였을 때 경계선이 보이면 다시 뽑습니다(도구에 "tile"/"seamless" 옵션이 있으면 켭니다).

---

## 생성하지 않는 것

- **Lottie 애니메이션**(유형 공개, 결제 완료): 이미지 생성으로는 만들 수 없습니다. 코드 애니메이션(reanimated + SVG)으로 대체할지, LottieFiles에서 라이선스가 맞는 파일을 고를지 `/spec`에서 정합니다.
- **나의 기운 지도, 오늘의 리듬 그림**: 사용자 데이터로 코드가 그립니다(6-1).

## 합계

| 묶음 | 장 수 |
|---|---|
| 일간 | 10 |
| 오행 | 5 |
| 12지 | 12 |
| 모듈 표지 | 12 |
| 24절기 | 24 |
| 빈 화면·오류·로딩 | 6 |
| 질감 | 3 |
| **합계** | **72** |
