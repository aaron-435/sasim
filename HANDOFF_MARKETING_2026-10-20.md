# 마케팅 인수 메모 (2026-10-20, 같은 날 두 번째 세션 반영)

새 세션 시작용. 읽는 순서: 이 파일 → `SPEC.md`(= `MARKETING_SPEC.md`) → `TODO.md`(진행 상태) → `WIKI.md`. 스토어·앱 상태는 `HANDOFF_2026-10-17.md`, 이전 마케팅 인수는 `HANDOFF_MARKETING_2026-10-16.md`. 필요할 때만 `marketing/` 아래 문서와 `UNIT_ECONOMICS.xlsx`.

## 한 줄 상태
영어권 마케팅은 제작 키트(TODO 1~9)와 측정·게이트(10~14)가 끝났고, 2026-10-20에 **조사(경쟁·인접 앱)와 영상 자동 제작 파이프라인**(TODO 18)까지 만들었다. 스토어 공개 전이라 게시와 유료 집행은 없다(사용자 결정 17번 (a)). 두 스토어 1.2.0은 아직 심사 중.

## 이번 세션(2026-10-19)에서 끝낸 것
- 예측 분석: 낙관·비관·중립 예측가 3명이 reference class forecasting으로 2라운드 진행, 합의 도출. 검증 보조 에이전트 2개(수치 사실검증, 영어권 사주 수요 조사).
- 사용자당 AI 비용 직접 측정 (`scripts/sim-chat.mts` v2 25턴 + 운영 `llm_usage_log` 집계).
- 손익 시트 `UNIT_ECONOMICS.xlsx` (5탭: 입력 / 사용자당 / 90일 시나리오 / CPI 민감도 / 500만원 목표).
- `TODO.md`에 C 섹션(10~17)과 사용자 확인 항목(사·아·자) 추가. 10번 완료, 17번 결정 기록.
- `marketing/funnel-gaps.md`: 퍼널 이벤트 점검 결과.

## 2026-10-20 세션에서 끝낸 것 (모두 커밋됨, `main` 최신 `f638313`, 푸시는 `d1312dc`까지)
- **웹 배포**: 퍼널 이벤트 포함 `3c99663`까지 `origin/main`에 푸시, Vercel `success`, `/api/events`에 `app_open` 200 확인. 남은 것은 두 스토어 게시 뒤 앱 JS OTA(사용자 트리거).
- **조사 문서 (`marketing/`)**: `demand-check.md`(Google Trends·틱톡 해시태그 조회수, 사 항목 일부 반영), `competitors.md`(영어·스페인어 사주 계정 프로필 실측), `adjacent-apps.md`·`psychology-angle.md`(Co-Star·The Pattern·Finch·Olively 등 인접 앱, 유튜브·인스타 훑어보기), `hook-analysis.md`(훅 유형 비교), `reference-videos.md`(참고 영상 분석과 링크).
- **제작 문서**: `video-kit.md` 9~10장(A형 심리 훅 8·B형 유형 카드 8·C형 구조 8 = 훅 24개, 형식 규칙 5개), `ai-production.md`(AI 제작 방식·TTS 결정), `tts-samples/scripts.json`(대본 7개: B1·C7·A3·C5·C1·A3x·A1x).
- **자동 제작 파이프라인 (코드)**: `marketing/tts-samples/generate.py`(OpenAI gpt-4o-mini-tts, marin → mp3), `scripts/record-web.mts`(웹 랜딩 유형 카드 녹화), `scripts/record-app.mts`(앱 검사 결과, mobile-web), `scripts/record-app-ab.mts`(실험형: 같은 검사를 여러 방식으로 답하고 결과 비교, `CONFIGS`에 설정 추가). 모두 CDP 화면 캡처 1080×1920 + 자막 HTML 오버레이 + ffmpeg 합성, 음성 1.12배속. 결과 mp4는 `marketing/video/`(git 무시).
- **시험 영상**: B1(13초)·C7(9초)·A3(17초)·A3x(15초, 실험형)·A1x(27초, 애착 4결과). 사용자 확인 단계, 게시 안 함.
- `UNIT_ECONOMICS.xlsx` 입력 탭 C9·C11 설명만 갱신(값 그대로).

## 이번 세션 결정
- 주 4~5개 유지(하루 4개 안 함), 직접 촬영 주 1회, 나머지는 화면 녹화 + AI 음성. 프로그램 렌더링 도구(Remotion·HyperFrames)는 보류.
- **AI 음성은 OpenAI gpt-4o-mini-tts**(tts-1-hd보다 싸다고 판단, 가격 근거는 `ai-production.md` 7-c). 설명란에 `Voiceover is AI-generated.` 필수.
- 훅은 "보는 사람 상태를 짐작하지 않는" 방식: 실험형("I answered ... every time")이 A형 기본. 설명형 A3는 훅이 약하다는 지적으로 A3x·A1x로 대체.
- **AI 인물이 "삶이 바뀌었다" 후기를 말하게 하는 영상은 만들지 않는다**(가짜 후기, `PRODUCT.md` 규칙). 힉스필드 API는 비용만 조사(영상 생성 초당 약 $0.08, 2~3초 클립 $1~2 안팎, 립싱크 요금 미확인). 하려면 후기가 아닌 반응 대사 + AI 표기, API 키·$5 충전은 사용자.

## 열린 문제·확인 필요
- **앱 결과 문구**: 번아웃 최고점 결과 설명이 "classic 'full burnout syndrome'"이고, 애착 결과 문구가 2인칭("You tend to...")이다. 진단 느낌·개인 특성 짐작 규칙과 충돌 가능, 앱 문구 수정 여부는 별도 결정.
- **웹 랜딩 유형 카드에는 오행 막대가 없다**(훅 C2·C4와 B 대본의 "five-element bar"는 `/saju-calculator` 화면 기준). B1·C7 대본은 카드에 맞게 고쳤고 나머지 훅은 촬영 전에 화면과 대조.
- 영상은 mobile-web 웹 렌더링이라 네이티브와 다를 수 있다. 광고에 쓰기 전 시뮬레이터 화면과 비교. 카드에 "Fatesaid"(스토어 이름은 "Fate Said") 표기 불일치.
- 웹 카드 문구에 "The app is coming soon..." 가 나온다 → 공개 전에는 게시 금지, 공개 후 7번 항목에서 문구 교체.
- 앱 앞 15문항은 불안, 뒤 15문항은 회피 문항(`module1Attachment.ts`). A1x 영상이 이 구조에 의존한다. 문항 순서가 바뀌면 영상 설정(`HL`/`LH`)도 확인.
- 녹화 스크립트는 첫 실행이 한 번 시간 초과로 실패한 적 있음(원인 미확인, 재실행 성공).
- **TTS 샘플 mp3·영상은 git에서 제외**(`.gitignore`). 다시 만들려면 `generate.py`와 위 스크립트로.
- 힉스필드·가짜 후기 건과 별개로, 시딩 크리에이터 후기 요구 금지 등 `marketing/seeding-kit.md` 규칙은 그대로.

## 환경 상태 (새 세션 시작 시 확인)
- 미리보기 서버: `work-dev`(3000), `mobile-web`(8082)가 켜져 있을 수 있음. 필요 없으면 `preview_stop`.
- 새로 설치: `playwright`(devDependency, `package.json`·lock 커밋됨), `ffmpeg`(brew, 자막 필터 없는 빌드라 자막은 HTML 오버레이), Playwright ffmpeg 구성요소. 녹화는 기존 Chromium 빌드(1243) 경로를 직접 지정해 씀.
- 크롬(Claude in Chrome)에 틱톡·유튜브·인스타·MiniMax·App Store Connect 탭이 열려 있음. MiniMax 크레딧 약 9,170(샘플 몇 개 생성, 미사용 권장 — OpenAI TTS로 결정).
- 지출: OpenAI TTS 샘플 몇 개(합계 약 $0.1 미만), MiniMax 크레딧 일부.

## 다음 한 걸음 (제안)
1. 두 스토어 1.2.0 승인 확인(Play는 승인 뒤 직접 게시) → 앱 JS OTA → 7번(웹 링크 교체) → A·B·C 영상 첫 게시와 계정 개설(사용자).
2. 그 전에 같은 `record-app-ab` 형식으로 모듈 영상을 늘리거나(`CONFIGS`에 수면·몰입·가면 추가), 시뮬레이터 화면과 비교해 네이티브 컷 필요 여부 판단.
3. 사 항목(손익 시트 노란 칸)과 틱톡 계정 개설은 사용자 실행.

## 핵심 수치 (모두 추정, 출처 표시된 것만 확인됨)
- **90일 합의(승인 후)**: 설치 P50 400~600 (P10 약 60, P90 3천~8천), 설치→구독 약 1~1.5%, MRR P50 $25~50, 리포트 매출 약 $60. 가장 흔한 결과는 "조용한 90일". 영상 하나가 터질 확률은 약 10%(가정, 출처 없음).
- **확인된 외부 수치(RevenueCat 2026판)**: 다운로드→유료 중앙값 2.0%(북미 2.8%), 체험→유료 42.5%, 60일 설치당 매출 $0.34, 신규 앱 2년 내 $1K MRR 도달 17.3%.
- **근거 없음으로 확인된 것**: D7 5~13%, 인디 앱 90일 설치 분포, Co-Star 틱톡 성장, Starcrossed $60k/월(2차 단독). 영어권 사주 수요는 Google Trends 429로 못 얻음(사용자 확인 항목 아).
- **AI 비용(측정)**: 25턴 상담 1세트 약 $0.032(luna). reasoning high는 비용 변화 없음, gpt-5.6-sol은 약 $0.53(16.5배), 과거 mini는 약 $0.13. 딥 리포트 약 $0.014, Q&A 1회 약 $0.0033, 연간 리포트 약 $0.016. 구독자 월 최대 사용 시 AI 약 $1, 순매출 약 $6.3.
- **월 순이익 500만원 목표 역산**(환율 ₩1,400/$ 가정, 마케팅 월 $500): 필요 월 신규 설치 A 약 13,000 / B 약 7,300 / C 약 4,400 / D(구독 $9.99) 약 6,000, 구독자 약 450~550명. 12~18개월 경로. 90일 P50 순이익은 마케팅비 때문에 마이너스.

## 결정된 것 (다시 묻지 않는다)
- 17번: 승인 전 게시 없음. 제작·계정 개설만, 게시는 스토어 공개 뒤. 유료 집행은 iOS 결제 확인 뒤 승자 영상에만.
- 시딩 코드는 Apple 오퍼 코드 + Google 프로모 코드, 시딩은 결제 계약 이후(2026-10-16 결정, 이전 인수 메모).
- 마케팅 예산 월 $500 = 유료 증폭 $200 + 시딩 $150 + 제작·ASO $50~100 (`MARKETING_SPEC.md`, `marketing/paid-plan.md`는 증폭 $200 상한).
- 압박 규칙·정확도 표현 금지 등 `PRODUCT.md` 원칙은 그대로.

## 지금 할 일 (TODO.md 기준)
1. ~~10-b 퍼널 이벤트 추가~~ 완료·푸시됨 (2026-10-20, 앱 JS OTA만 남음). 원래 설명: (사용자 승인 후): `app_open`(하루 1회), `chat_start`/`chat_complete`, `report_generate`, 구매 이벤트의 `kind: trial|paid`. 웹 `lib/eventSchema.ts` 먼저 배포, 그다음 앱 JS OTA. 위치·규모는 `marketing/funnel-gaps.md` 3장. 파일 3개 이상이라 CLAUDE.md 위임 절차(muse) 적용 가능.
2. 11 퍼널 리포트 스크립트, 12 증폭·중단 트리거를 `paid-plan.md`에 병합, 13 게이트 판단표 `marketing/gates.md`, 14 연간 리포트·Year Wrapped 영상 소재 5개(12/1 전, 11월 중), 15 손익 시트 실측 교체 루틴(스토어 공개 뒤).
3. 사용자 결정 대기: 16 구독 가격 $7.99 vs $9.99(별도 SPEC 필요).
4. 사용자 확인: 사 손익 시트 노란 칸(연간 리포트 가격, 스토어 수수료 실제율, RevenueCat 요금제, 서버 월 고정비, 환율), 아 영어권 사주 수요를 Google Trends·틱톡에서 직접 확인, 자 1.2.0 두 스토어 승인·게시 알려 주기.

## 스토어·다른 작업 (별도)
- Play 1.2.0 심사 중, 관리형 게시라 승인 뒤 **사용자가 직접 게시**(2026-10-19 화면: "변경사항이 게시 준비됨", 검토 중). iOS 1.2.0도 심사 중. 7번(웹 링크 교체)과 유료 집행은 둘 다 열린 뒤.
- Play "DEX 코드 최적화 기준점 미만"(난독화 2%), 기한 2027-02. 1.2.0 게시 뒤 별도 TODO로 분해. `expo-build-properties`의 `android.enableMinifyInReleaseBuilds`·`enableShrinkResourcesInReleaseBuilds` 켜는 방식, **네이티브 빌드라 OTA 불가**, 켠 뒤 실기기에서 구매·알림·PDF 확인 필요.
- 1.2.0 심사 중에는 새 빌드를 올리지 않는다(심사가 처음부터 다시 시작됨).

## 주의점
- **events 데이터는 아직 기준선으로 못 쓴다.** dev 제외 539행·고유 anon 46개는 테스트 기기 위주로 보이고 테스터 구분 표시가 없다. 실사용 코호트는 스토어 공개 뒤부터.
- 시뮬레이션 비용은 LLM이 연기한 사용자 기준이다. 실제 사용자는 답변 길이·턴 수가 다르다. 운영 로그에 session_id가 달린 luna 상담이 0건이라 실사용 검증은 아직 없다.
- `UNIT_ECONOMICS.xlsx`는 이 환경에 LibreOffice가 없어 자동 재계산 검증을 못 했다. 같은 수식을 파이썬으로 따로 계산해 값이 일치함을 확인했다. Excel·Numbers에서 열어 수식 오류가 없는지 한 번 눈으로 확인하면 좋다.
- 이번 AI 측정에서 OpenAI에 쓴 비용은 약 $0.83. 새 sim 결과 파일은 `scripts/out/sim_20261019*`(git 무시). `sim_20261019T083012_attach_en_module1_v2.json` 한 파일은 기본값 실행과 `--no-formulation` 실행이 같은 초에 겹쳐 덮어쓰였다(로그의 토큰 수로 따로 계산함).
- `--bot-model gpt-5.4-mini`는 `chatSamplingParams`가 `temperature`를 보내 API가 거부한다(`lib/chat.ts`, 5.4-mini는 현재 운영 채팅 모델이 아님). 고치지 않았다.
- 외부 자료를 바꿔 쓴 곳은 없다. 예측가 에이전트의 수치는 모두 `UNIT_ECONOMICS.xlsx`와 이 메모에 추정으로 표시했다.

## 커밋 상태
작업 트리 깨끗(이 파일만 수정 중). 최신 커밋 `f638313`. `origin/main`에는 `d1312dc`까지 푸시, 그 이후 커밋 6개(`bc1e99a`~`f638313`: 인접 앱 조사, 영상 스크립트 등)는 **미푸시**(푸시는 사용자 트리거). TODO.md 18번 완료 기록 포함.
