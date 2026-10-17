# TODO (2026-10-17) — AI 말투 걷어내기

SPEC: `SPEC_2026-10-17_voice.md`. 한 번에 한 항목. V1이 끝나야 나머지 수치가 의미 있다.
공통 QA: 루트 `npx tsc --noEmit`, 앱 `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit`, 빌드는 dev 서버를 내리고 `npm run lint && npm run build`.

- [x] V1. 패턴 사전 + 탐지 스크립트 + 기준선
  - 결과: (2026-10-17) `scripts/check-voice.mts` + `scripts/voice-baseline.json`. 정제 후 기준선 ko 49 / en 38 / es 23. 프롬프트 한국어 지시문·퀴즈 질문·비율 전용 신호는 합계에서 제외.
  - 범위: `scripts/check-voice.mts`. 언어별(ko/en/es) 정규식 사전(SPEC 정의 기준), 대상 경로(i18n, 퀴즈, 레슨, 운세·궁합·신년·SEO, 프롬프트 내 en/es 블록)별 건수와 파일별 상위 20개 출력, `--baseline`으로 JSON 저장·비교. 오탐은 허용하되 대표 오탐을 사전에 주석으로 남긴다.
  - QA: `npx tsx scripts/check-voice.mts --baseline` 출력(언어별·폴더별 건수)과 저장된 기준선 파일 경로를 기록. 사전 항목마다 실제 코드에서 최소 1건 이상 걸리는 예를 확인해(걸리지 않으면 사전 수정) 보고.
- [x] V2. 프롬프트 말투 규칙
  - 결과: (2026-10-17) LOCALE_STYLE(en/es)에 말투 규칙, `koVoiceRule`, chatPrompts 규칙 8, report/compat/journal 프롬프트에 말투 블록. 챗 규칙 0·3·5·9·안전·이지선다·재확인은 불변. tsc 통과.
  - 범위: `lib/promptLocale.ts` LOCALE_STYLE(en/es)와 ko 프롬프트 공통 블록에 말투 규칙(금지 패턴 + "이렇게 쓴다" 대체 예, 문장 길이 변주, 공감은 한 줄) 추가. 챗 규칙 9·안전 블록은 불변. 챗 성별 표지 후처리 검사를 같이 넣을지 결정(별도 항목이면 발견 사항).
  - QA: tsc + 변경 diff에서 금지 목록이 지나치게 길지 않은지(규칙 20줄 이내) 확인.
- [x] V3. 샘플 전후 비교 (OpenAI 비용 발생, 사전 알림 후 실행)
  - 결과: (2026-10-17) `scripts/voice-chat-metrics.mts` + 전후 대본 8+8개(`scripts/out/voice-before|after`). 한국어 챗봇 첫 줄 '~군요/~네요' 23/24 → 12/24, 선택형 질문 13→10, 탈출구 문구 10→9. 대화 종합 점수는 40.4→40.5로 못 잡음(해요체 묶음 한계). 영어 선택형 78%→45%, 스페인어는 표본 2개라 판단 불가.
  - 범위: V2 전 기준(`git stash` 없이 이전 커밋 프롬프트로) vs 후, 같은 입력으로 챗(`scripts/sim-chat.mts` 6턴: attach_en, anger_es, 한국어 모듈 persona 1) + 리포트 1(언어별) 생성. 패턴 건수와 발췌 전후를 표로.
  - QA: `scripts/out/` 파일 경로, 건수 표, 따뜻함 유지 여부 코멘트. 한국어 샘플은 `(user check)`.
- [x] V4. 고정 문구 스윕 1: UI 문자열
  - 결과: (2026-10-17) i18n 약 9줄.
  - 범위: `mobile/lib/i18n/{ko,en,es}.ts`, `lib/i18n/{ko,en,es}.ts`. V1 상위 파일부터 탐지된 줄만 고침.
  - QA: V1 스크립트 전후 건수, tsc(루트·앱), 글자 수 ±15% 확인.
- [x] V5. 고정 문구 스윕 2: 콘텐츠
  - 결과: (2026-10-17) 콘텐츠 약 50줄(일일 운세 '~니다' 4문장 연속 15본문 해소).
  - 범위: 레슨 10종, 퀴즈 12 모듈, 일일·신년·십이운성·궁합·goodDays·groupChemistry·sajuType 콘텐츠(`mobile/lib`, `lib` 미러 동기).
  - QA: V1 스크립트 전후 건수, 앱 tsc, JSON 파싱.
- [x] V6. 웹: 랜딩·SEO 글·계산기
  - 결과: (2026-10-17) SEO 10개 파일 14줄. V4~V6 결과: ko 49→6, en 38→29, es 23→10 (en/es 잔여에 프롬프트 규칙 예시 오탐 13건 포함). 루트·앱 tsc, JSON 통과. 의미 있는 대비 구문은 남김.
  - 범위: `lib/seoArticles/*`, 랜딩·계산기·데이 마스터 페이지 문구, 메타 설명.
  - QA: V1 스크립트 전후 건수, 루트 tsc, lint+build.
- [ ] V7. 재측정과 정리
  - 범위: 기준선 대비 최종 표, 샘플 재생성 1회(변경 후 프롬프트), 핸드오프 갱신.
  - QA: 완료 기준(50% 이하 등) 충족 여부를 표로, 미달 항목은 발견 사항.
- [ ] V8. `(user check)` 한국어 샘플·UI 몇 화면을 직접 읽고 "덜 AI 같다"를 판정, 풍선 효과(다른 상투어로 이동) 여부 확인.

## 발견 사항
(작업 중 기록)

- V7(재측정)은 V4~V6 직후 수치를 위에 기록함. 프롬프트 효과는 샘플 8개 기준이라 표본이 작다. 더 큰 샘플(언어당 5+)은 비용이 들어 보류.
- `ES_GENDERED_READER`류 챗 후처리 검사는 아직 없음(앞선 발견 사항). 영어 선택형 질문은 줄었지만 한국어 선택형·탈출구 문구는 거의 그대로(설계상 필수 형식이라 규칙만으로는 한계).
- '방향은 맞으니'(dailyFortuneContent, ko/en/es 3곳)가 원문보다 단정이 강해짐. 낮출지 사용자 판단.
- V8 확인용 파일: `VOICE_REVIEW_2026-10-17.md`.
