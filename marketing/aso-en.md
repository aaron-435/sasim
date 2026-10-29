# ASO 영어 등록정보 초안 (TODO 4번)

작성: 2026-10-16. **초안이며 사용자가 확정한다.** 글자 수는 맨 아래 "글자 수 점검"의 스크립트로 이 파일에서 직접 읽어 확인했다.

## 지킨 규칙 (SPEC 기준)

- 금융·송금 연상 단어 금지: money, bank, pay(ment), transfer, exchange, currency, wallet, cash, loan, invest, trading, price, `$` 금액. 이유: iOS 1.0.0이 2.3.1(a) "다중통화 뱅킹·송금 기능"으로 거절된 이력(`HANDOFF_2026-10-15.md`). 심리검사 모듈 중 "돈" 검사도 이름을 쓰지 않고 "themes like work, relationships, and rest"로 돌려 적었다.
- "accurate/accuracy/exact/proven/predict/fortune-telling" 금지. 계산은 "calculated from your birth date"로만 말한다.
- 압박 규칙: 건강·죽음·재난·단정적 부정 예언 없음, 카운트다운·희소성 없음. 후기·평점·수상·수치 주장 없음. 유명인 이름 없음.
- 개인 특성 짐작 문구("you are anxious") 없음. 제품과 결과물이 주어.
- 면책: 자기이해 도구이며 의학·심리 진단이 아님을 설명 끝에 둔다.
- 팔레트·폰트는 스토어 이미지 쪽 문제라 이 문서 범위 밖.

## 확인이 필요한 것 (사용자)

1. ~~이름 표기~~ 확정(2026-10-16): 스토어 등록 이름은 두 곳 모두 "Fate Said"(띄어쓰기). 본문 브랜드 표기도 모두 "Fate Said"로 맞춤. (원래 메모: `mobile/app.json`의 앱 이름은 "Fate Said"(띄어쓰기), 웹·브랜드는 "Fatesaid". 스토어에 이미 등록된 이름이 있으면 아래 제목 앞부분을 그것에 맞춘다(등록 이름은 이 저장소에서 확인하지 못함).)
2. **구독 가격 표시**: 설명에 금액을 넣지 않았다(위 규칙). Apple은 앱 안 구독 화면에 가격·갱신 문구를 요구하며 설명에는 구독 존재와 이용약관·개인정보처리방침 링크만 둔다. 스토어 가격표는 스토어가 자동으로 보여 준다.
3. **스크린샷**: 현재 `mobile/store-assets/ios-screenshots/`에는 홈·Q&A·유형 3종(iPhone 6.5", iPad 13")뿐이다. 아래 캡션 5개 중 4~5번은 새 화면 캡처가 필요하다(이 항목 범위 밖, 발견 사항에 기록).
4. **스페인어·한국어 등록정보**: SPEC에 따라 영어 성과 뒤로 미룬다.

---

## A. iOS (App Store Connect, en-US)

### iOS 앱 이름 (limit 30)
```text
Fate Said: Saju Self-Insight
```

### iOS 부제 (limit 30)
```text
Korean Four Pillars, decoded
```

### iOS 키워드 (limit 100)
```text
personality test,reflection,personal report,day master,compatibility,elements,journal,guided chat
```
메모: 2026-10-29 4.3(b) 대응으로 `horoscope, astrology, zodiac, birth chart, daily reading`를 빼고 실제 기능어(검사·대화·리포트·일지)로 교체. 쉼표 뒤 공백 없음. 이름·부제에 이미 있는 단어(saju, Korean, Four Pillars, Self-Insight)는 중복해 넣지 않았다. 남의 상표(MBTI, Co-Star 등)는 뺐다.

### iOS 프로모션 텍스트 (limit 170)
```text
Take a self-insight test, talk it through in a guided conversation, and get a personal report. Start free with your saju type, found from your birth date.
```

### iOS 설명 (limit 4000)
```text
Fate Said is a self-insight app built around three steps: take a test, talk it through, and get a personal report. Your saju (Korean Four Pillars) chart, calculated from your birth date, gives the conversation its starting point.

1. TAKE A TEST
• Self-insight tests on themes like love and attachment, burnout, focus, sleep, sensitivity, and self-expression

2. TALK IT THROUGH
• A guided conversation that picks up from your test answers, in five short parts

3. GET YOUR REPORT
• A personal report that sets your chart beside what you actually answered and said, with a PDF you can keep
• A yearly report with a month-by-month timeline and a step-by-step plan

START FREE
• Your saju type: one of 50 types, found from your birth date alone
• Your Four Pillars chart and element balance, explained simply
• Compatibility: see how two people's charts meet, with a relationship name and what each brings
• Ask a question: pick from hundreds of topics and get a thoughtful answer built on your chart
• Today's rhythm: a short overview of how today meets your chart
• Invite a friend with a link so you can compare charts

FATE SAID PRO (optional subscription)
• More questions per day
• Today, this week, this month, and new-year rhythms
• Find good days for an interview, a first date, a move, or a fresh start
• Ask about a specific person using their birth date

Reports can also be bought one at a time, with no subscription needed.

HOW WE SEE IT
There are no bad days or bad matches here. Fate Said talks about rhythms: when to push, when to pace yourself, and why. Readings are calculated from your birth date and presented as a tool for reflection. They are not medical, psychological, or professional advice, and not a diagnosis. If you are struggling, please reach out to a qualified professional or a local support line.

PRIVACY
No account is needed. Your results and reports are kept on your device. To write your answers, the questions you choose and your chart details are sent securely to an AI service. We do not sell your personal data.

Subscription terms: Fate Said Pro renews automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel any time in your Apple ID settings.

Terms of Use: https://www.fatesaidapp.com/terms
Privacy Policy: https://www.fatesaidapp.com/privacy
```
메모: "Terms of Use" 링크는 Apple이 구독 앱 설명에 요구하는 항목(가이드라인 3.1.2). 두 URL은 WIKI의 `app/privacy`, `app/terms` 경로 기준이며 배포된 실제 주소는 사용자가 확인한다. "We do not sell your personal data"와 "stored on your device"는 WIKI의 로컬 저장·로그인 없음 설명 기준이지만, 앱 개인정보 라벨과 일치하는지 사용자가 최종 확인한다.

### iOS 새로운 기능 What's New (limit 4000)
```text
Smoother, more readable reports and a refreshed look across the app.
```
메모: 1.2.0 재제출 때 실제 변경과 맞는지 사용자가 확인. 근거 없는 주장은 넣지 않았다.

### iOS 스크린샷 캡션 (화면당 짧게, 각 limit 40으로 자체 제한)
2026-10-16 실기기 캡처 4장을 6.9"(1290x2796)로 확대해 `mobile/store-assets/ios-screenshots/*-iphone69.png`로 저장. 원본이 924x2000이라 약간 부드럽다. 구독·구매 화면, "money"가 나오는 오늘 개요, Money 검사 카드가 보이는 화면은 뺐다.
| # | 화면 | 파일 | 캡션 (글자 수) |
|---|---|---|---|
| 1 | 검사 목록 (새 캡처 필요) | `tests-iphone69.png` | Self-insight tests, at your own pace (36) |
| 2 | 선택형 대화 (새 캡처 필요) | `chat-iphone69.png` | Talk it through, one step at a time (35) |
| 3 | 리포트(구매 전 가능한 화면, 새 캡처 필요) | `report-iphone69.png` | A report built from your own answers (36) |
| 4 | 유형 공개 | `type-iphone69.png` | Your saju type, from one birth date (35) |
| 5 | 새 홈(경로 카드 + 오늘의 리듬, 새 캡처 필요) | `home-iphone69.png` | Test, talk, report: your path (29) |

순서 이유(2026-10-29, 4.3(b) 대응): 검사 → 대화 → 리포트를 앞 3장에 두고 유형·홈은 뒤로. 구독·구매 화면, "money"가 나오는 화면, Money 검사 카드가 보이는 화면은 뺀다. 이전 홈 캡처(`home-*.png`, "Today's fortune" 카드)는 쓰지 않는다. iPad 13"도 같은 순서로 새로 캡처한다(TODO 8, 사용자 실행).

---

## B. Google Play (en-US)

### Play 앱 이름 (limit 30)
```text
Fate Said: Saju Self-Insight
```

### Play 간단한 설명 (limit 80)
```text
Find your Korean saju type, daily rhythm, and self-insight tests.
```

### Play 자세한 설명 (limit 4000)
```text
Fate Said turns your birth date into a clear picture of your saju (Korean Four Pillars) and helps you reflect on it, one small step at a time.

Saju is a centuries-old Korean way of reading a person through four pillars: year, month, day, and hour. Fate Said calculates your chart from your birth details, then explains it in plain language, with no jargon to decode.

START FREE
• Your saju type: one of 50 types, found from your birth date alone
• Your Four Pillars chart and element balance, explained simply
• Compatibility: see how two people's charts meet, with a relationship name and what each brings
• Ask a question: pick from hundreds of topics and get a thoughtful answer built on your chart
• A daily reading with a short overview of today's rhythm
• Invite a friend with a link so you can compare charts

GO DEEPER
• Self-insight tests on themes like love and attachment, burnout, focus, sleep, sensitivity, and self-expression
• A guided conversation that picks up from your test answers, in five short parts
• A personal report that sets your chart beside what you actually answered and said, with a PDF you can keep
• A yearly report with a month-by-month timeline and a step-by-step plan

FATE SAID PRO (optional subscription)
• More questions per day
• Today, this week, this month, and new-year readings
• Find good days for an interview, a first date, a move, or a fresh start
• Ask about a specific person using their birth date

Reports can also be bought one at a time, with no subscription needed.

HOW WE SEE IT
There are no bad days or bad matches here. Fate Said talks about rhythms: when to push, when to pace yourself, and why. Readings are calculated from your birth date and presented as a tool for reflection. They are not medical, psychological, or professional advice, and not a diagnosis. If you are struggling, please reach out to a qualified professional or a local support line.

PRIVACY
No account is needed. Your results and reports are kept on your device. To write your answers, the questions you choose and your chart details are sent securely to an AI service. We do not sell your personal data.

Fate Said Pro renews automatically until cancelled. Manage or cancel any time from your Google Play subscriptions.

Terms of Use: https://www.fatesaidapp.com/terms
Privacy Policy: https://www.fatesaidapp.com/privacy
```
메모: 구독 안내는 Play 메뉴 이름("Payments & subscriptions")을 쓰지 않고 "Google Play subscriptions"로 적어 금융 연상 단어를 피했다. Play는 키워드 칸이 없고 제목·간단한 설명·자세한 설명의 본문 단어로 검색되므로, 자세한 설명에 saju, Four Pillars, birth chart, compatibility, daily reading이 자연스럽게 반복되게 썼다(키워드 나열 금지 정책 때문에 억지 반복은 하지 않음).

### Play 스크린샷·그래픽
기존 `play-store-feature-graphic-1024x500.png`, `play-store-icon-512.png`, `tablet-screenshots/`(7"·10")를 그대로 쓴다. 휴대폰 스크린샷 캡션은 iOS 표를 재사용.

---

## 글자 수 점검

아래 스크립트가 이 파일의 `### 제목 (limit N)` 바로 아래 ```text 블록을 읽어 글자 수와 금지 단어를 확인한다. 출력은 TODO 4번 QA 줄에 기록한다.

```bash
python3 - <<'PY'
import re
t=open("marketing/aso-en.md",encoding="utf-8").read()
ban=r"\b(money|bank|banking|pay|payment|payments|transfer|exchange|currency|wallet|cash|loan|invest\w*|trading|price|accurate|accuracy|exact|proven|predict\w*|MBTI|Co-Star)\b|\$\d"
bad=0
for m in re.finditer(r"### (.+?) \(limit (\d+)\)\n```text\n(.*?)\n```",t,re.S):
    name,lim,body=m.group(1),int(m.group(2)),m.group(3)
    n=len(body); hit=re.findall(ban,body,re.I)
    ok = n<=lim and not hit
    bad+= (not ok)
    print(("OK  " if ok else "FAIL"),f"{n:>4}/{lim}",name,hit or "")
print("FAIL count",bad)
PY
```
