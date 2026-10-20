# 숏폼 제작 키트 (TODO 5번)

작성: 2026-10-16. **초안이며 사용자가 확정한다.** 틱톡·릴스·쇼츠에 같은 영상을 동시에 올린다. 첫 2주는 아래 형식 하나만 쓰고 훅(첫 2초)만 바꾼다. 영어 기준. 스페인어는 영어 성과 뒤.

## 지킬 규칙 (SPEC·PRODUCT 기준)

- 제품·결과물이 주어. 보는 사람의 성격·상태·고민을 짐작하는 문장 금지("you're anxious" 류).
- "정확하다/적중/예측/proven/accurate/exact/fortune-telling" 금지. 계산은 "calculated from a birth date"까지만.
- 압박 규칙: 가짜 카운트다운·희소성, 불운·건강·죽음 예언, 단정적 부정 예언 금지.
- 후기·평점·조회수 같은 수치 조작 금지. 영상에 쓰는 수치는 제품 사실만("50 types", "ten Day Masters").
- 유명인 이름·얼굴은 화면에서 가린다. 타인 생년월일을 실제 개인 정보로 노출하지 않는다(촬영용 생년월일은 본인 것이나 임의로 만든 것).
- 의학·심리 진단처럼 들리는 말 금지. 자기이해 도구라고만 말한다.
- 팔레트·폰트는 앱·웹 화면을 그대로 녹화하므로 건드리지 않는다. 직접 만드는 자막·썸네일도 Celadon & Hanji 색, Newsreader/Plus Jakarta Sans 계열만.
- 금융·송금 연상 단어 금지(iOS 2.3.1(a) 거절 이력). 돈 관련 검사는 영상에서 다루지 않는다.

## 1. 고정 형식: "생일 → 유형 카드 → 풀이 → CTA" (25~35초)

제품 사실 근거: 웹 랜딩의 유형 카드는 생년월일만으로 뜬다(50가지 중 하나, 이름·한 줄 설명·같은 유형 유명인). 계산기(`/saju-calculator`)는 네 기둥·일간·오행 분포를 보여 준다(`WIKI.md` 2장).

| 구간 | 시간 | 화면 | 말(자막과 동일) |
|---|---|---|---|
| 훅 | 0~2초 | 얼굴 출연 클로즈업 또는 카드 이미지 + 큰 자막. 아래 훅 15개 중 하나 | 훅 문장 그대로 |
| 생일 받기 | 2~7초 | 웹 랜딩/계산기에서 연·월·일 입력(화면 녹화, 임의 생년월일) | "Type in a birth date. That's the only input." |
| 유형 카드 | 7~14초 | 카드 공개 컷. **유명인 이름 가림** | 카드의 유형 이름을 그대로 읽는다 |
| 풀이 | 14~27초 | 카드·원국 그래프를 가리키며 카드에 적힌 설명을 쉬운 말로 풀이. 일간 한 줄, 오행 중 가장 많은 것 하나 | "In saju, this part is the Day Master… The chart shows wood is the biggest element." 등 화면에 있는 사실만 |
| CTA | 27~32초 | 프로필 링크 안내 화면 | "The free type card is at the link in my bio." (스토어 공개 뒤엔 "The app is linked in my bio.") |

풀이 구간 원칙:
- 카드·계산 결과에 **실제로 적힌 내용만** 읽는다. 카드에 없는 성격 단정을 덧붙이지 않는다.
- 말투는 "This card says…", "The chart shows…". "You are…"로 시작하는 문장 금지.
- 어려운 용어는 한 번만 영어로 풀고 넘어간다(Day Master = the pillar that stands for you in the chart).
- 한 영상에 생년월일은 1~3개. 3개면 나란히 비교하는 형식(훅 9·10).

## 2. 훅 15개

규칙 점검 열: **A** 제품·결과물이 주어(개인 특성 짐작 없음) / **B** 정확·예측류 표현 없음 / **C** 압박·부정 예언·가짜 긴박 없음 / **D** 수치는 제품 사실만 / **E** 유명인 이름·후기 없음. 전부 통과면 "통과".

| # | 훅 (자막 = 말) | A | B | C | D | E | 결과 |
|---|---|---|---|---|---|---|---|
| 1 | This free tool turns one birth date into one of 50 saju types. | ○ | ○ | ○ | 50 types는 제품 사실 | ○ | 통과 |
| 2 | Korean saju reads a birth date as four pillars. Here's what the card looks like. | ○ | ○ | ○ | - | ○ | 통과 |
| 3 | One birth date in. One saju type card out. | ○ | ○ | ○ | - | ○ | 통과 |
| 4 | This is what a saju type card looks like. | ○ | ○ | ○ | - | ○ | 통과 |
| 5 | The Korean birth chart that only needs a birthday to get started. | ○ | ○ | ○ | - | ○ | 통과 |
| 6 | A saju chart uses a birth date, time, and city. Here's how the card gets made. | ○ | ○ | ○ | - | ○ | 통과 |
| 7 | Saju has something called a Day Master. This app finds it from a birthday. | ○ | ○ | ○ | - | ○ | 통과 |
| 8 | Ten Day Masters, fifty saju types. Here's how a birthday lands on one. | ○ | ○ | ○ | 10·50은 제품 사실 | ○ | 통과 |
| 9 | Same app, three different birthdays, three different cards. | ○ | ○ | ○ | 3은 영상 속 개수 | ○ | 통과 |
| 10 | I typed three birthdays into a Korean saju app. Here are the cards. | ○ | ○ | ○ | - | ○ | 통과 |
| 11 | The five elements in a saju chart, shown as one simple bar. | ○ | ○ | ○ | - | ○ | 통과 |
| 12 | This saju app explains the chart in plain English, no jargon. | ○ | ○ | ○ | - | ○ | 통과 |
| 13 | Saju 101: why a birth date has four pillars. | ○ | ○ | ○ | - | ○ | 통과 |
| 14 | Two birth dates in, one relationship name out. A look at saju compatibility. | ○ | ○ | ○ | - | ○ | 통과 |
| 15 | A saju type card made to share. Free, from a birth date. | ○ | ○ | ○ | - | ○ | 통과 |

위반 0개. 점검은 사람이 읽고 매긴 것이고, 금지 단어는 아래 스크립트로도 확인했다.

사용 메모:
- 12번의 "plain English"는 앱이 영어 설명을 제공한다는 사실에 근거한다(언어 en/es/ko).
- 14번은 궁합 기능(관계 이름·점수는 작게)을 보여 주는 영상. 상대 생년월일은 임의 값.
- 훅 하나당 2~3개 영상으로 반복한 뒤, 중앙값 대비 5배 이상 조회가 나온 훅을 승자 후보로 기록한다(성공 기준, SPEC).

## 3. 화면 녹화 체크리스트

촬영 전
- [ ] 화면 녹화 소스: 웹(`fatesaidapp.com` 랜딩 또는 `/saju-calculator`)을 기본으로 쓴다. 앱 화면은 스토어 공개·결제 열린 뒤에 추가.
- [ ] 입력할 생년월일은 임의 값 또는 본인 것. 실제 지인·고객 것은 쓰지 않는다.
- [ ] 알림·배터리·시계·개인 앱 이름이 화면에 안 나오게 방해 금지 모드, 상태 막대 정리.
- [ ] 세로 9:16, 화면 위 14%·아래 35%는 플랫폼 UI에 가려지므로 자막·카드 핵심을 그 밖에 둔다(기존 `meta/04-scripts.md` 규칙 재사용).
- [ ] 밝기 최대, 확대/축소 없이 기본 배율.

녹화 중
- [ ] 입력은 천천히(보는 사람이 연·월·일을 읽을 수 있게). 타이핑 소리 없이 음성만.
- [ ] 카드가 뜨는 순간 유명인 이름이 보이면 **즉시 컷**. 편집에서 가린다.
- [ ] 유형 이름과 한 줄 설명이 화면에 최소 2초 머무르게.

편집
- [ ] 유명인 이름은 블러가 아니라 단색 박스로 덮는다(블러는 복원돼 보일 수 있음). 이름뿐 아니라 얼굴 사진이 있으면 같이 가린다.
- [ ] 자막은 말과 똑같이. 수치·"free"는 사실일 때만.
- [ ] 마지막 컷에 "Not medical or psychological advice" 같은 문구는 영상엔 불필요하나, 설명란에 한 줄 둔다(아래 캡션 틀).
- [ ] 내보내기 전 훅 점검표(위 2장 A~E)를 다시 읽는다.

게시 전
- [ ] 프로필 링크의 UTM이 맞는지 확인(4장).
- [ ] AI 음성을 썼으면 5장 표기를 넣었는지.
- [ ] 같은 영상을 세 곳에 올릴 때 플랫폼 워터마크가 남은 파일을 다른 곳에 재업로드하지 않는다(원본 내보내기 파일 사용).

## 4. 링크·UTM 규칙

웹 이벤트는 `utm_source/medium/campaign/content`를 기록한다(소문자 영숫자·`_-`, 40자 이하, `WIKI.md` 측정 항목). 영상 본문에는 링크를 넣을 수 없는 곳이 많으므로 **프로필 링크**를 플랫폼별로 다르게 설정한다.

| 플랫폼 | 프로필 링크 |
|---|---|
| TikTok | `https://www.fatesaidapp.com/?utm_source=tiktok&utm_medium=organic&utm_campaign=shortform` |
| Instagram | `https://www.fatesaidapp.com/?utm_source=instagram&utm_medium=organic&utm_campaign=shortform` |
| YouTube | `https://www.fatesaidapp.com/?utm_source=youtube&utm_medium=organic&utm_campaign=shortform` |

- 훅별 구분(`utm_content=hook01` 등)은 프로필 링크 하나에 못 넣는다. 훅별 성과는 플랫폼 분석(조회·저장·프로필 클릭)으로 보고, 웹에서는 플랫폼별만 센다. 훅별 링크가 필요하면 영상 댓글 고정 링크나 설명란 링크에 `utm_content=hookNN`을 쓴다(플랫폼이 허용하는 곳만).
- 링크는 미리 한 번 열어 랜딩이 뜨는지 확인한다.

## 5. AI 음성 사용 시 표기

- 영상 설명란 첫 줄 또는 마지막 줄: `Voiceover is AI-generated.`
- 틱톡의 AI 생성 콘텐츠 라벨, 인스타그램·유튜브의 합성 콘텐츠 표시 옵션은 각 플랫폼의 업로드 화면에서 켠다. 플랫폼별 정확한 위치와 의무 범위는 정책이 바뀔 수 있어 **업로드 시점에 화면 안내를 따른다(미확인)**.
- 얼굴 출연 영상에는 이 문구가 필요 없다. 얼굴과 AI 음성을 섞으면 AI 음성이 들어간 영상에만 쓴다.
- 실존 인물을 흉내 낸 목소리는 쓰지 않는다.

## 6. 게시 캡션·해시태그 틀

캡션 틀 (플랫폼 공통, 줄바꿈 유지):

```text
{hook 한 문장, 영상 자막과 동일}
Free saju type card from a birth date: link in bio.
Self-reflection tool, not medical or psychological advice.
#saju #koreansaju #fourpillars #astrology #personalitytypes
```

- 해시태그는 3~5개. 위 5개로 시작해 첫 2주 성과를 보고 바꾼다. 어떤 태그가 영어권에서 노출이 큰지는 확인하지 못했다(직접 검색 필요).
- "정확", "맞았다", "믿어도 된다", 후기 인용을 캡션에 쓰지 않는다.
- 댓글 유도 문구는 생년월일을 달라고 하지 않는다. 쓰려면 "Which element is biggest in your chart?"처럼 내용 질문만.
- 유료 협찬이 아닌 자기 채널 게시물에는 협찬 표기가 필요 없다. 크리에이터 시딩은 6번 키트에서 다룬다.

## 7. 제작 흐름 (주 4~5개 목표)

1. 월요일: 훅 2개 고르고 임의 생년월일 3세트 준비.
2. 하루에 같은 형식으로 2~3개 연속 촬영(화면 녹화 1회 + 얼굴 출연 컷 따로).
3. 편집 후 3장 체크리스트 → 게시.
4. 게시 48시간 뒤 훅별 조회·저장·프로필 클릭을 `marketing/` 아래 성과 기록표(6번 시딩 키트의 표와 같은 양식)에 적는다.

## 훅 점검 스크립트

```bash
python3 - <<'EOF'
import re
hooks = """This free tool turns one birth date into one of 50 saju types.
Korean saju reads a birth date as four pillars. Here's what the card looks like.
One birth date in. One saju type card out.
This is what a saju type card looks like.
The Korean birth chart that only needs a birthday to get started.
A saju chart uses a birth date, time, and city. Here's how the card gets made.
Saju has something called a Day Master. This app finds it from a birthday.
Ten Day Masters, fifty saju types. Here's how a birthday lands on one.
Same app, three different birthdays, three different cards.
I typed three birthdays into a Korean saju app. Here are the cards.
The five elements in a saju chart, shown as one simple bar.
This saju app explains the chart in plain English, no jargon.
Saju 101: why a birth date has four pillars.
Two birth dates in, one relationship name out. A look at saju compatibility.
A saju type card made to share. Free, from a birth date.""".split("\n")
banned = r"accura|exact|proven|predict|fortune|money|bank|pay|wallet|invest|lucky|unlucky|doom|you are|you're|countdown|last chance"
print(len(hooks), "hooks")
for i,h in enumerate(hooks,1):
    m = re.search(banned, h, re.I)
    print(i, "FAIL "+m.group(0) if m else "ok", len(h))
EOF
```

## 8. 연간 리포트·Year Wrapped 소재 5개 (TODO 14번, 2026-10-20 초안)

고정 형식(1장)은 그대로 쓴다: 훅 → 생일/화면 → 카드·화면 공개 → 풀이 → CTA. 달라지는 것은 **화면 소스가 앱**이라는 점뿐이다.

제품 사실 근거(`WIKI.md` 3장): 신년 리포트는 표지 → 한눈에 보기 → 5개 영역 → 12개월(3개월씩 4쪽) → 실행 계획 → 마무리 순서이고, 구매 전에는 미리보기만 열린다. Year Wrapped는 무료이며 기기 날짜 12/1~1/31에만 홈에 "올해의 나" 카드가 보이고, 카드는 최대 5장(올해 나를 이끈 기운, 가장 흐름이 좋았던 달, 가장 많이 물은 주제, 올해의 한 문장, 다가오는 해)이다. 공유 카드는 사주 유형 카드와 영역별 9:16 카드가 있다.

**제약 (먼저 읽기)**
- 세 소재 모두 앱 화면이 필요하다. 웹에는 이 화면들이 없다. 스토어 공개 전에는 촬영·편집까지만 하고 게시는 하지 않는다(TODO 17번 결정 (a)).
- Wrapped 화면은 기기 날짜가 12/1~1/31일 때만 홈에 나온다. 11월에 촬영하려면 날짜를 바꾸거나 개발용 모드가 필요한데, 어느 쪽이 되는지 이 세션에서는 확인하지 못했다(미확인, 사용자 확인).
- 신년 리포트 미리보기에 잠긴 장 목록이 보인다. 영상은 잠기지 않은 쪽과 장 제목만 보여 주고, 부정적 문장이 페이월 바로 위에 오는 컷은 쓰지 않는다(압박 규칙). 가격·할인·"지금 사라" 류 말은 영상에 넣지 않는다.
- 연도 숫자(2027)는 제품이 계산해 보여 준 화면에 나온 것만 읽는다. "내년은 ~할 것" 같은 문장은 쓰지 않는다.

### 훅 5개 (1장 규칙 A~E로 점검, 아래 스크립트도 실행)

| # | 훅 (자막 = 말) | 소재 | A | B | C | D | E | 결과 |
|---|---|---|---|---|---|---|---|---|
| 16 | This saju app lays out a whole year in twelve months. Here's the report. | 신년 리포트 | ○ | ○ | ○ | 12개월은 제품 사실 | ○ | 통과 |
| 17 | Five life areas, twelve months, one action plan. A look inside a saju year report. | 신년 리포트 | ○ | ○ | ○ | 5·12는 제품 사실 | ○ | 통과 |
| 18 | Year Wrapped, saju edition: five cards that look back at the year. | Year Wrapped | ○ | ○ | ○ | 5는 제품 사실 | ○ | 통과 |
| 19 | In saju, every year has an element and an animal. The app names this one. | Year Wrapped | ○ | ○ | ○ | - | ○ | 통과 |
| 20 | A saju card made to share, in a vertical frame. Here's how the set looks. | 공유 카드 | ○ | ○ | ○ | - | ○ | 통과 |

### 대본 5개 (25~35초, 자막 = 말)

**S1 · 훅 16 · 신년 리포트 훑어보기**
| 구간 | 화면 | 말 |
|---|---|---|
| 0~2초 | 앱 리포트 표지(임의 생년월일) | 훅 16 그대로 |
| 2~8초 | 한눈에 보기 쪽 | "This page sums up the year in one view." |
| 8~20초 | 12개월 쪽을 천천히 넘김(3개월씩) | "The months come three at a time, four pages in all." |
| 20~27초 | 실행 계획 쪽 | "It ends with a plan section." |
| 27~32초 | 프로필 링크 화면 | "The app is linked in my bio." |

**S2 · 훅 17 · 영역과 목차**
| 구간 | 화면 | 말 |
|---|---|---|
| 0~2초 | 목차 화면 | 훅 17 그대로 |
| 2~14초 | 5개 영역 쪽을 하나씩 | 화면에 적힌 영역 이름만 읽는다 |
| 14~24초 | 목차의 잠긴 장 제목(잠금 아이콘) | "Some chapters open after you buy the report." (가격은 말하지 않는다) |
| 24~32초 | 마지막 장 | "The app is linked in my bio." |

**S3 · 훅 18 · Year Wrapped 다섯 장**
| 구간 | 화면 | 말 |
|---|---|---|
| 0~2초 | Wrapped 첫 장 | 훅 18 그대로 |
| 2~20초 | 카드를 한 장씩 넘김(1~4번째) | 카드에 적힌 문장만 읽는다. 3번째(가장 많이 물은 주제)는 기기에 기록이 없으면 건너뛰므로 촬영용 기기에 기록을 먼저 만든다 |
| 20~28초 | 다가오는 해 카드 | "The last card looks at the year ahead." |
| 28~32초 | 공유 버튼 | "Every card can be saved as an image." (공유 기능은 카드 화면 기준, 촬영 때 버튼 확인) |

**S4 · 훅 19 · 올해 이름 카드**
| 구간 | 화면 | 말 |
|---|---|---|
| 0~2초 | Wrapped의 "올해 나를 이끈 기운" 카드 | 훅 19 그대로 |
| 2~14초 | 해 이름(오행 + 띠)과 리듬 이름 | "The card names the year by an element and an animal." 화면에 적힌 이름 그대로 |
| 14~26초 | 같은 카드에서 과거형 한 줄 | 카드 문장을 그대로 읽는다. 풀이를 덧붙이지 않는다 |
| 26~32초 | CTA | "Year Wrapped is free in the app." (앱 안에서 무료, 12/1~1/31 노출이라는 사실에 근거) |

**S5 · 훅 20 · 공유 카드 세트**
| 구간 | 화면 | 말 |
|---|---|---|
| 0~2초 | 공유 카드 화면 | 훅 20 그대로 |
| 2~14초 | 유형 카드 → 영역 카드로 넘김. **유명인 이름 가림** | 카드에 적힌 유형 이름만 읽는다 |
| 14~24초 | 공유 시트가 열리는 컷 | "Each card exports as an image." |
| 24~32초 | CTA | "The app is linked in my bio." |

공통: 얼굴 출연 컷은 훅 구간에만 쓰고 나머지는 화면 녹화. AI 음성이면 5장 표기. 캡션은 6장 틀을 그대로 쓰되 해시태그에 `#yearwrapped`를 추가해 볼 수 있다(노출 여부 미확인). 5개 모두 CTA는 스토어 공개 전에는 쓸 수 없다.

### 새 훅 점검 스크립트

```bash
python3 - <<'EOF'
import re
hooks = """This saju app lays out a whole year in twelve months. Here's the report.
Five life areas, twelve months, one action plan. A look inside a saju year report.
Year Wrapped, saju edition: five cards that look back at the year.
In saju, every year has an element and an animal. The app names this one.
A saju card made to share, in a vertical frame. Here's how the set looks.""".split("\n")
banned = r"accura|exact|proven|predict|fortune|money|bank|pay|wallet|invest|lucky|unlucky|doom|you are|you're|your |countdown|last chance|guarantee|will |worst|bad year|hurry|limited|only today|price|sale|\$"
print(len(hooks), "hooks")
for i,h in enumerate(hooks,16):
    m = re.search(banned, h, re.I)
    print(i, "FAIL "+m.group(0) if m else "ok", len(h))
EOF
```

## 9. A/B 시험: 심리 훅(A) 8개 vs 유형 카드 훅(B) 8개 (2026-10-20 초안, 근거 `psychology-angle.md`)

목적: 첫 4주에 두 형식을 8개씩 올려 어느 쪽이 조회·저장·프로필 클릭이 큰지 비교한다. 둘 다 같은 규칙(1장 규칙, 2장 점검 열 A~E)을 지킨다. 승자 기준은 SPEC 그대로(상위 영상이 중앙값 대비 5배 이상). 같은 계정·같은 주에 번갈아 올려 요일·시간 영향을 줄인다(A1 B1 A2 B2 ...). 모두 **스토어 공개 뒤 게시**(17번 결정).

### B형: 유형 카드 (기존 1장 형식 그대로)
화면은 웹 랜딩·계산기 녹화(지금도 촬영 가능). 훅 8개 중 6개는 2장 훅 재사용, 2개는 "맞혀 보기" 새 훅(Co-Star의 반복 형식 참고).

| # | 훅 (자막 = 말) | 출처 |
|---|---|---|
| B1 | This free tool turns one birth date into one of 50 saju types. | 2장 훅 1 |
| B2 | This is what a saju type card looks like. | 훅 4 |
| B3 | Saju has something called a Day Master. This app finds it from a birthday. | 훅 7 |
| B4 | Ten Day Masters, fifty saju types. Here's how a birthday lands on one. | 훅 8 |
| B5 | I typed three birthdays into a Korean saju app. Here are the cards. | 훅 10 |
| B6 | Two birth dates in, one relationship name out. A look at saju compatibility. | 훅 14 |
| B7 | Guess the saju type from a birth date, then see the card. | 새 훅 |
| B8 | Three birthdays, three guesses. Which card did the app pick? | 새 훅 |

B7·B8 대본 요지: 임의 생년월일을 화면에 보여 주고 "나는 ○○ 유형일 것 같다"고 말한 뒤 카드를 공개해 맞는지 확인한다. **"맞았다/틀렸다"는 내 추측에 대한 말이고 앱의 정확도 주장이 아니다.** "정확" 표현을 쓰지 않는다. 카드의 유명인 이름은 가린다.

### A형: 심리 주제 훅 (새 형식)
고정 형식(25~35초): **훅(주제 질문) → 앱 화면 녹화: 30문항 검사 일부 → 결과 유형 → 상담 대화 한 장면 → CTA.** 훅은 앱의 12개 검사 모듈 이름에 맞춘다(돈 모듈은 규칙상 제외). 화면은 **앱 화면**(시뮬레이터 또는 실기기)이라 스토어 공개 전에는 촬영만 하고 게시는 공개 뒤.

A형 추가 규칙(1장에 더해):
- 훅에 "you/your"로 시작하거나 보는 사람의 감정·관계 상태를 단정하지 않는다. 주제를 이름으로만 부르고 질문은 "앱이 어떻게 나누는지"로 건다. 예: ✕ "Do you text him first?" ○ "Anxious or avoidant? Here's how an attachment test sorts it."
- 진단 느낌 금지(불안장애·치료·진단 단어 없음). "attachment tendencies", "pattern", "self-reflection"까지만.
- 결과 화면에서 읽는 것은 앱에 실제 뜬 유형 이름과 한 줄만. 상담 대화 장면은 사용자 답이 아니라 앱이 **묻는 질문**을 보여 준다(개인정보 방지, 가상 답 사용 시 "sample" 표기).
- 위기 표현·자해 관련 화면은 절대 촬영하지 않는다.

| # | 훅 (자막 = 말) | 모듈 | 화면 |
|---|---|---|---|
| A1 | Anxious or avoidant? Here's how a 30-question attachment test sorts it. | 1 연애·애착 | 검사 문항 3개 넘기기 → 결과 유형 |
| A2 | An attachment test and a saju chart, in one app. Here's what the result looks like. | 1 연애·애착 | 결과 유형 → 사주 유형 카드 |
| A3 | Exhaustion, cynicism, low energy: how a burnout test breaks it into three parts. | 3 번아웃 | 결과 차원 3개 |
| A4 | The mask test: image management, concealment, social fatigue. Here's the result screen. | 4 가면 | 결과 화면 |
| A5 | Overstimulation, aesthetic sensitivity, a low sensory threshold: a sensitivity test, in 30 questions. | 7 예민함 | 문항 → 결과 |
| A6 | Racing mind, tense body, restless dreams: how a sleep test sorts them. | 8 수면 | 결과 화면 |
| A7 | Distractibility, hyperfocus, impulsivity: a focus test that ends in a 25-turn conversation. | 10 몰입 | 문항 → 대화 질문 장면 |
| A8 | A family-of-origin test, then a conversation that asks about it. Here's how it flows. | 9 원가족 | 결과 → 대화 질문 장면 |

사용 메모:
- "30-question", "25-turn conversation"은 제품 사실(WIKI 3장). 앱 문항 수·대화 길이가 바뀌면 훅 수치도 고친다.
- 훅 이름은 앱의 모듈 부제(`mobile/lib/quiz/modules.ts` 영어 문구)에서 가져왔다. 앱 문구와 어긋나지 않게 촬영 전에 화면을 확인한다.
- 캡션 틀은 6장 그대로, 해시태그만 A형은 `#attachmentstyle #selfdiscovery #personalitytest`를 앞에 두고 `#saju`는 마지막(첫 2주 성과 후 조정). 캡션 설명 줄은 "Self-reflection tool, not medical or psychological advice."를 유지.
- 프로필 문구 후보(결정 필요): 앱 한 줄 이름이 정해지기 전까지는 6장 틀을 쓴다.

### 점검 (A~E, 인라인 + 스크립트)
```bash
python3 - <<'EOF'
import re
hooks = {
"B1":"This free tool turns one birth date into one of 50 saju types.",
"B2":"This is what a saju type card looks like.",
"B3":"Saju has something called a Day Master. This app finds it from a birthday.",
"B4":"Ten Day Masters, fifty saju types. Here's how a birthday lands on one.",
"B5":"I typed three birthdays into a Korean saju app. Here are the cards.",
"B6":"Two birth dates in, one relationship name out. A look at saju compatibility.",
"B7":"Guess the saju type from a birth date, then see the card.",
"B8":"Three birthdays, three guesses. Which card did the app pick?",
"A1":"Anxious or avoidant? Here's how a 30-question attachment test sorts it.",
"A2":"An attachment test and a saju chart, in one app. Here's what the result looks like.",
"A3":"Exhaustion, cynicism, low energy: how a burnout test breaks it into three parts.",
"A4":"The mask test: image management, concealment, social fatigue. Here's the result screen.",
"A5":"Overstimulation, aesthetic sensitivity, a low sensory threshold: a sensitivity test, in 30 questions.",
"A6":"Racing mind, tense body, restless dreams: how a sleep test sorts them.",
"A7":"Distractibility, hyperfocus, impulsivity: a focus test that ends in a 25-turn conversation.",
"A8":"A family-of-origin test, then a conversation that asks about it. Here's how it flows.",
}
banned = r"accura|exact|proven|predict|fortune|money|bank|pay|wallet|invest|lucky|unlucky|doom|\byou\b|your|you're|countdown|last chance|diagnos|disorder|therap|treat|cure|heal|will |price|\$|limited|guarantee|right|wrong"
for k,h in hooks.items():
    m = re.search(banned, h, re.I)
    print(k, "FAIL "+m.group(0) if m else "ok", len(h))
EOF
```

## 10. 새 구조 반영: C형 8개와 형식 규칙 (2026-10-20 초안, 근거 `reference-videos.md`·`hook-analysis.md`)

참고 영상(Olively·The Pattern 등)에서 가져온 구조를 A·B 형식 위에 얹는다. 아래 구조 규칙은 **A·B·C 모든 영상에 적용**하고, C형 8개는 A/B 시험과 같은 4주에 번갈아 섞어 올린다(A B C 순환). 모두 스토어 공개 뒤 게시. 규칙(1장·9장)은 그대로.

### 형식 규칙 5개 (참고 영상에서)
1. **첫 컷은 앱 화면.** 0초부터 실제 UI(검사 문항, 결과 화면, 유형 카드)를 보인다. 설명용 인물 컷을 앞에 두지 않는다. 얼굴 출연 영상은 1~2초만 얼굴, 바로 화면.
2. **전/후 컷은 실제 UI 변화만.** 예: 오행 막대가 채워지는 순간, 결과 차원 막대가 나오는 순간, 질문 → 대화 화면. **가짜 점수·가짜 변화 수치를 만들지 않는다**(Olively의 8/10→4/10 같은 점수 연출은 따라 하지 않음, 정확도·우열 주장 금지).
3. **앱 이름은 영상 후반에 자막으로 한 번.** CTA 구간 전이라도 훅에는 앱 이름을 넣지 않는다. 마지막 CTA는 기존대로 프로필 링크 안내.
4. **길이는 두 가지 시험**: 기존 25~35초와 15초 안팎(훅 2초 + 화면 10초 + CTA 3초). C형 중 2개가 15초 변형.
5. **날짜는 실제 날짜만.** 절기 날짜는 앱의 24절기 데이터(`/api/solarTerms`)에서 가져와 촬영 시점에 확인한 값만 쓴다. "곧 사라진다/마지막 기회" 같은 표현 금지(압박 규칙), 그냥 날짜와 사실만.

### C형 훅 8개
| # | 훅 (자막 = 말) | 구조 | 화면 |
|---|---|---|---|
| C1 | Day Master types, part 1 of 10: the first one on the card. | 연재(10편, 일간 10개는 제품 사실) | 해당 일간 유형 카드 → 설명 |
| C2 | A saju type card lists three things: a name, a one-line summary, and a five-element bar. | 목록형 | 카드 → 막대 순서로 하이라이트 |
| C3 | Same app, two modules, two result screens. | 비교형(결과 화면만) | 모듈 두 개의 결과 화면 나란히 |
| C4 | How to read the five-element bar on a saju chart. | 튜토리얼형 | 계산기의 오행 막대 설명 |
| C5 | A new solar term starts on {date}. Here's what the app's calendar marks. | 날짜 뉴스형(절기) | 앱 절기·운세 화면, {date}는 실제 값 |
| C6 | A five-card year in review opens in the app on December 1. | 날짜 뉴스형(Wrapped) | Wrapped 카드 5장 훑기 (12/1~1/31은 WIKI 3장 사실) |
| C7 | Birth date in, type card out. Under fifteen seconds. | 10~15초형 | 입력 → 카드 공개 |
| C8 | An attachment test result screen, in fifteen seconds. | 15초형(A 변형) | 앱 결과 화면, 첫 컷 바로 결과 |

사용 메모:
- C5의 `{date}`는 대본 확정 때 실제 날짜로 바꾼다. 스크립트의 "November 7"은 `upcomingSolarTerms`(자체 엔진)로 확인한 입동(2026-11-07 09:51 UTC)이다. 다른 절기는 같은 함수로 날짜를 뽑아 쓴다(예: 소설 11-22, 대설 12-07, 동지 12-21 UTC 기준, 시간대에 따라 하루 어긋날 수 있어 영상에는 촬영 기준 시간대를 쓴다).
- C6은 Wrapped가 홈에 노출되는 기간(기기 날짜 12/1~1/31)에만 촬영·게시가 의미 있다. 11월 촬영은 기기 날짜 변경 가능 여부 확인이 필요(TODO 14번 사용자 확인).
- C1은 10편을 연달아 올릴 필요는 없고 주 1편씩 이어도 된다. 시리즈 번호는 영상 첫 자막과 설명란에 같이 적는다.
- 점검 스크립트는 정규식 + 사람 읽기. 훅이 사실만 말하는지는 촬영 전에 화면과 대조한다.

```bash
python3 - <<'EOF'
import re
hooks = {
"C1":"Day Master types, part 1 of 10: the first one on the card.",
"C2":"A saju type card lists three things: a name, a one-line summary, and a five-element bar.",
"C3":"Same app, two modules, two result screens.",
"C4":"How to read the five-element bar on a saju chart.",
"C5":"A new solar term starts on November 7. Here's what the app's calendar marks.",
"C6":"A five-card year in review opens in the app on December 1.",
"C7":"Birth date in, type card out. Under fifteen seconds.",
"C8":"An attachment test result screen, in fifteen seconds.",
}
banned = r"accura|exact|proven|predict|fortune|money|bank|pay|wallet|invest|lucky|unlucky|doom|\byou\b|your|you're|countdown|last chance|diagnos|disorder|therap|treat|cure|heal|will |price|\$|limited|guarantee|right|wrong|only|hurry|ends|miss"
for k,h in hooks.items():
    m = re.search(banned, h, re.I)
    print(k, "FAIL "+m.group(0) if m else "ok", len(h))
EOF
```
