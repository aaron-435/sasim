# 영어 사용자 5명 관찰 키트 (TODO 16번, 2026-10-28 초안)

**문서만 있다. 모집·인터뷰·사례비 지급은 사용자가 한다(TODO 21번).** 영어 사용자 기준. 근거: `SPEC.md`의 사업 가설·반대 가설, `REDDIT_RESEARCH_2026-10-25.md`의 서브레딧 규칙.

## 0. 왜 하는가 (5명으로 알 수 있는 것과 없는 것)

- 알고 싶은 것: 처음 보는 사람이 **어디서 멈추는지**, 무엇에 돈을 낼 생각이 있고 왜 안 내는지. 특히 SPEC 반대 가설 ① 웹→앱 이동(설치·코드), ② 검사 30문항의 시간 비용, ③ 무료 미리보기가 충분히 구체적인지.
- 알 수 없는 것: 전환율, 가격 탄력성, "어느 쪽이 낫다"는 통계적 결론. 5명 관찰을 A/B 테스트나 수요 검증이라고 부르지 않는다. 결과는 "5명 중 N명이 여기서 멈췄다"까지만 쓴다.
- 관찰 대상은 사주·점성술·성격 검사에 관심이 조금이라도 있는 영어 사용자. 지인·가족·본인 테스터는 넣지 않는다(이미 앱을 아는 사람은 병목을 못 보여 준다).

## 1. 준비 (사용자)

- [ ] 스토어 상태 확인: 참가자가 받을 수 있는 스토어가 공개돼 있어야 한다. iOS 1.2.0이 아직 심사 중이면 Android 참가자만 받거나 iOS 공개 뒤로 미룬다. 웹 넘김(TODO 19)과 앱 이어받기 OTA(TODO 20)가 나간 뒤가 좋다.
- [ ] 진행 방식: 화상 통화 1:1, 30~40분, 참가자가 **자기 휴대폰 화면을 공유**하며 생각을 소리 내어 말한다(think-aloud). 녹화는 참가자가 동의할 때만, 동의 안 하면 메모만.
- [ ] 기록표(4장)를 시트에 복사해 둔다. 사람마다 한 줄.
- [ ] 사례비 수단(기프트카드 등)과 지급 시점을 미리 정한다(5장).

## 2. 모집 문구

### 어디에

규칙이 모집·테스터 구인을 허용하는 곳 1~2곳만 쓴다. 올리기 전에 그 서브레딧의 현재 규칙(`old.reddit.com/r/<이름>/about/rules`)을 다시 읽는다. 규칙은 바뀐다.

| 후보 | 근거 (2026-10-25 조사) | 주의 |
|---|---|---|
| r/alphaandbetausers | 테스터 모집용 서브레딧 | 앱이 AI 대화를 쓴다는 점을 글에 숨기지 않는다 |
| r/startups "Feedback Friday" 스레드 | 정해진 스레드 안에서만 피드백 요청 허용 | 스레드 밖 단독 글 금지, 해당 요일만 |

하지 않는 것: 무단 DM, 자동 댓글, 사주·점성술 서브레딧에 모집 글(대부분 홍보 금지), 여러 곳 같은 글 도배, "링크 클릭만 해 달라" 류 요청. 연락은 글에 답하거나 먼저 DM을 보낸 사람에게만 한다.

### 글 (영어, 그대로 써도 되고 다듬어도 됨)

> **Looking for 5 people to try a saju (Korean four pillars) self-reflection app on a 30-min video call — $15 gift card**
>
> I'm a solo developer. The app turns a birth date into a saju type card, then offers psych-style self-reflection tests and an AI conversation that follows up on your answers. I want to watch where it gets confusing or where people lose interest.
>
> - 30–40 minutes on a video call, you share your phone screen and think out loud
> - You don't need to know anything about saju
> - You don't need to buy anything. If you choose to try a paid report, I'll cover that separately (details on the call)
> - $15 gift card for your time, paid after the call, whatever you say about the app
> - Android or iPhone (iPhone only once the App Store version is live)
>
> It's a self-reflection tool, not medical or psychological advice, and the AI part is disclosed in the app. Reply here or DM me if you're interested.

점검 기준: 정확도·예측 표현 없음, 긴박감("only today", "spots filling fast") 없음, 후기·별점 요청 없음, AI 사용 공개.

## 3. 관찰 과제 (진행 대본)

진행자는 **돕지 않는다**. 막히면 "What would you do next?"만 묻고, 3분 넘게 막히면 기록한 뒤 다음 단계로 넘겨 준다. 생년월일은 참가자 본인 것이든 지어낸 것이든 괜찮다고 먼저 말한다(기록표에는 적지 않는다).

| # | 과제 (참가자에게 읽어 줄 말) | 보는 것 |
|---|---|---|
| 1 | "Here's a link: fatesaidapp.com. Take a look and do whatever seems natural." | 랜딩에서 무엇을 먼저 누르는지, 유형 카드까지 가는지 |
| 2 | (유형 카드가 뜬 뒤) "What do you make of this card? Is there anything you'd want to do next?" | 카드가 무엇으로 읽히는지, "앱에서 이어 보기"를 스스로 찾는지 |
| 3 | "If you wanted to keep going in the app, how would you do that?" | 스토어 이동·설치·앱 열기·넘김(링크 또는 6자리 코드)에서 멈추는 곳, 걸린 시간 |
| 4 | (앱 안) "Try the Love & Attachment test." | 30문항을 끝까지 하는지, 몇 번째에서 지루해하는지, 이유 |
| 5 | (결과 뒤) "There's a conversation with AI after the test. Try a few turns." | 대화를 시작하는지, 몇 턴에서 멈추는지, AI라는 점에 대한 반응 |
| 6 | "Open the report preview and read what's free." | 미리보기 중 어디가 구체적이라고/뻔하다고 말하는지 |
| 7 | (페이월에서) "Tell me what you think this page is offering." | 무엇이 잠겼다고 이해하는지, 가격을 보고 하는 말 |
| 8 | 마무리 질문 아래 | |

마무리 질문:
- "If this were your own phone and nobody was watching, where would you have stopped?"
- "Is there anything here you'd pay for? What, and why?" / "What would make it worth paying for?"
- "What did you expect from the first screen, and did you get it?"
- "Would you rather have compared yourself with someone else (compatibility) than taken the test?"

하지 않는 것: 사주 결과가 맞는지 묻기("Is it accurate?"), 구매 유도, 별점·후기 부탁, 참가자 성격·상태에 대한 해석.

## 4. 기록표 (시트에 복사)

개인 정보는 적지 않는다: 이름·핸들·생년월일·연락처·화면 녹화 원본은 시트에 두지 않는다. 참가자는 P1~P5로만 부른다.

| 칸 | 적는 것 |
|---|---|
| 참가자 | P1~P5 |
| 날짜·시간대(KST) | 퍼널 리포트에서 이 사람들 이벤트가 섞인 날을 알기 위함(ID는 적지 않음) |
| 기기·OS | iPhone/Android, 웹은 어느 브라우저 |
| 사주·성격검사 경험 | 없음 / 조금 / 많음 |
| 1 랜딩 → 유형 카드 | 도달 여부, 걸린 시간, 한 말 |
| 2 카드 반응 | 한 줄 |
| 3 웹→앱 | 스토어 이동 / 설치 / 넘김 성공(링크·코드) / 멈춤, 멈춘 지점 |
| 4 애착 검사 | 완료 여부, 멈춘 문항 번호, 이유 |
| 5 AI 대화 | 시작 여부, 턴 수, 멈춘 이유 |
| 6 미리보기 | 구체적이라고 한 곳 / 뻔하다고 한 곳 |
| 7 페이월 | 잠긴 것을 어떻게 이해했는지, 가격 반응 |
| 낼 것 | 돈을 낼 생각이 있다고 한 것과 이유 (없으면 "없음") |
| 안 낼 것 | 안 낸다고 한 것과 이유 |
| 실제 구매 | 안 함 / 함(상품) — 5장의 보전 대상인지 |
| 가장 큰 멈춤 | 한 줄 |

5명이 끝나면 맨 아래에 "멈춘 곳별 인원"(예: 웹→앱 2명, 검사 중 1명, 페이월 2명)과 "낼 것" 모음만 요약한다. 숫자를 퍼센트로 바꾸지 않는다.

## 5. 사례비와 구매비 (분리)

- **사례비**: 1명 $15 기프트카드 × 5명 = **$75**. 통화가 끝나면 무조건 지급한다. 앱을 칭찬했는지, 구매했는지, 끝까지 했는지와 무관하다.
- **구매비 보전**: 구매는 요구하지 않는다. 참가자가 스스로 리포트를 사 보겠다고 하면, 산 금액을 사례비와 **따로** 보전한다(상한 1명 $15, 심층 리포트 1개 가격 $14.99 기준). 최대 5명 × $15 = **$75**. 보전 여부는 구매 결정 전에 알려 주되, "사면 더 준다"로 들리지 않게 한다.
- 합계 최대 **$150**. 2026-10-27 결정한 **월 약 $300 마케팅 예산 안의 항목**으로 잡고, 남는 금액을 다른 집행에 쓴다.
- 보전된 구매는 매출·성과로 세지 않는다(SPEC 제약). 4장 "실제 구매" 칸으로 따로 표시하고, 퍼널 리포트의 `purchase_success`를 해석할 때 그날 그 상품 건수를 빼고 본다. 별점·후기 작성은 사례비·보전의 조건이 아니며 부탁하지도 않는다(스토어 정책상 보상 후기 금지).
- 구독(월 $7.99)은 보전 대상에서 뺀다. 참가자가 구독을 시작했다면 통화 안에서 해지 방법을 안내한다.

## 6. 결과로 무엇을 정하나 (SPEC 사업 가설)

- **주력 상품 가설**: Love & Attachment 심층 리포트. 바꿀 조건(SPEC): 애착 검사를 시작한 독립 사용자 대부분이 30문항·대화 전에 멈추고, 궁합 페이월까지는 가는 일이 반복되면 첫 구매 중심을 궁합으로 옮기는 SPEC을 따로 쓴다. 숫자 기준은 이 관찰 뒤에 퍼널과 함께 정한다.
- **웹→앱이 병목이면**(3번에서 2명 이상 멈춤): 다음 SPEC은 넘김 흐름(설치 안내·코드 입력)부터.
- **검사 시작 전·초반 이탈이 보이면**: TODO 13번(웹 애착 검사 맛보기)의 조건을 다시 본다. 퍼널에 `quiz_start`·`quiz_complete`가 없다는 발견 사항과 함께 판단한다.
- **미리보기가 "뻔하다"는 말이 반복되면**: 무료 부분의 구체성(반대 가설 ③)을 다음 문구 작업으로.
- 결과 기록표를 공유하면 이 세션에서 위 판단을 정리한다(원본 녹화·개인 정보는 공유하지 않는다).
