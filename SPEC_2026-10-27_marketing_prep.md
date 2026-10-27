# SPEC (2026-10-27) — 공개 전 마케팅 준비: 결과 문구, 모듈 영상, es-419 키트, 레딧 점수

이전 SPEC(챗 고정 스크립트 보정)은 `SPEC_2026-10-27_chat_script.md`, TODO는 `TODO_2026-10-27_chat_script.md`로 보관했다(8번 배포 확인까지 끝). 출발점은 `HANDOFF_2026-10-27_marketing_next.md`의 "B. 공개 전에도 할 수 있는 것" 6~9번.

## 목표
iOS 1.2.0 심사가 끝나기 전에, 공개 직후 바로 게시·집행할 수 있도록 소재와 도구를 준비한다. 영상에 그대로 나오는 앱 결과 문구를 먼저 바로잡고, 영상 소재를 늘리고, 스페인어권 키트를 만들고, 레딧 요약의 잡음을 줄인다.

## 포함 범위
1. **앱 결과 문구 정리**(핸드오프 B-8, ko/en/es)
   - 번아웃 최고점(`exhaustion+cynicism+efficacyLoss`) 결과: "풀 번아웃 증후군 / full burnout syndrome"처럼 진단으로 읽히는 표현을 뺀다. "MBI가 정의하는" 같은 검사 권위 표현도 같이 본다. 제목("Full Burnout", "완전 소진형", "Agotamiento completo")도 진단명처럼 읽히는지 검토해 필요하면 바꾼다. 나머지 번아웃 결과 6개도 같은 기준으로 한 번 훑는다.
   - 애착 결과(module1): 2인칭 단정("You tend to…", "~하는 패턴입니다")을 "이런 경향이 보일 수 있다" 꼴의 관찰 표현으로 바꾼다.
   - 웹(`lib/module3Burnout.ts` 등)과 앱(`mobile/lib/quiz/*`) 양쪽에 같은 문구가 있으면 둘 다 맞춘다.
2. **모듈 영상 늘리기**(B-6)
   - `scripts/record-app-ab.mts`의 `CONFIGS`에 수면(module8)·몰입(module10)·가면(module4)을 추가한다. 영상 키트(`marketing/video-kit.md`) A4·A6·A7 행과 맞춘다. 대본·TTS가 없으면 같은 형식으로 만든다.
   - 세 영상을 렌더하고(`marketing/video/*.mp4`, git 무시), mobile-web 화면을 iOS 시뮬레이터 화면과 비교해 네이티브 컷이 필요한지 판단을 `marketing/video-kit.md`에 적는다.
3. **es-419 마케팅 키트**(B-7)
   - 영어 키트(훅 24개, 대본 7개, ASO 초안, 시딩 키트)의 스페인어판을 `marketing/es/`에 만든다. 직역이 아니라 현지화하고, 이번에 정한 es-419 규칙(`mobile/lib/i18n/STYLE_GUIDE.md`: `tú`, 단순과거, 중남미 어휘, `vale`·`vosotros` 금지, 독자 성별 표지 금지)을 따른다.
   - ASO는 Play/App Store 스페인어(중남미) 등록정보 글자 수 제한에 맞춘다.
   - 기존 린트(`ES_GENDERED_READER`, 스페인식 표지 검사)를 키트 문구에 한 번 돌려 걸린 곳을 고친다.
4. **레딧 다이제스트 점수 개선**(B-9)
   - 질문 신호가 없는 글(강좌 연재 "[BaZi Basics 01]", 1인 SEO 서브레딧 r/FreeBaziReading, 여러 서브레딧에 뿌리는 홍보 글)을 감점하거나 제외한다.
   - 사주 문맥 없는 서양 점성 차트 글이 상위를 차지하는 문제(레딧 TODO 발견 사항)를 같은 감점 규칙 안에서 다룬다.
   - 값은 `marketing/reddit/config.json`에서 조정 가능하게 한다.

## 제외 범위
- 핸드오프 A그룹(웹 스토어 링크 교체, 동선 점검, 영상 카드 "coming soon" 제거·재렌더, 첫 주 기준선): iOS 공개 뒤 다음 SPEC.
- Year Wrapped 영상 소재(마케팅 TODO 14): 초안이 이미 있고 확정은 사용자 몫.
- 스페인어 영상 렌더(es TTS·녹화). 이번엔 글 키트만.
- 결과 문구 외 퀴즈 문항·채점 로직 변경, 결과 유형 분류 변경.
- 레딧 글쓰기·게시 자동화(결정상 금지), 수집 방식(aside/direct) 변경.
- 커밋, 푸시, 웹 배포, `eas update`, 영상 게시(사용자 실행).

## 제약
- 압박 규칙과 정확도·진단 표현 금지(`PRODUCT.md`, 루트 `CLAUDE.md`)는 결과 문구와 광고 훅 모두에 적용.
- 결과 문구는 ko/en/es 3개 언어를 함께 바꾼다. es는 es-419 기준.
- 앱 변경은 OTA로 나갈 수 있어야 한다(신규 네이티브 의존성 금지). 앱 문구는 iOS 1.2.0 승인 뒤 `eas update`에 실린다. 웹을 먼저 배포한다.
- 영상: AI 음성은 OpenAI gpt-4o-mini-tts + "Voiceover is AI-generated." 표기, AI 인물 가짜 후기 금지, 샘플 답변임을 화면에 밝힌다. 영상은 mobile-web 렌더링이라 네이티브와 다를 수 있음을 기록한다.
- 승인 전 게시·유료 집행 없음(결정 17번). 이번 산출물은 제작물만.
- 레딧 도구는 읽기 전용 유지, 프록시·IP 교체 금지.

## 가정
- 결과 문구는 `title`·`hook`(결과 화면·공유 카드에 나오는 짧은 문장)만 다룬다. 리포트 본문 프롬프트는 건드리지 않는다.
- 애착 결과의 "2인칭 단정" 위치는 `/work`에서 찾는다(`MODULE1_TYPE_NAMES` hook과 en 결과 문단 후보).
- 모듈 영상 3개는 기존 A3x/A1x처럼 "가장 낮은 답 vs 가장 높은 답" 비교 형식을 쓴다. 페르소나는 기존 fixture에서 고른다.
- es 키트는 사용자가 확정하기 전까지 초안이다(영어 키트와 같은 위치).
- 레딧 감점은 규칙 기반(키워드·패턴·목록)으로 하고, LLM 분류는 쓰지 않는다(비용 0 유지).

## 완료 기준
- 번아웃·애착 결과 문구 3개 언어에서 "syndrome / 증후군 / 진단" 류 표현과 2인칭 단정이 grep 0건, `npx tsc --noEmit`(루트)와 mobile tsc 통과, mobile-web에서 두 결과 화면 캡처로 확인.
- `node --import tsx scripts/record-app-ab.mts <KEY>`로 수면·몰입·가면 영상 3개가 나오고, 네이티브 컷 필요 여부 판단이 `marketing/video-kit.md`에 적혀 있다.
- `marketing/es/`에 훅 24개·대본 7개·ASO·시딩 키트 es판이 있고, 스페인어 표지·성별 표지 검사 경고 0.
- 레딧 `score.test.mts`에 새 감점 사례(강좌 연재, FreeBaziReading, 홍보 글, 서양 차트)가 추가돼 통과하고, `npm run reddit:digest -- --dry-run` 상위 10개에 해당 유형이 줄어든 것을 전후 비교로 보인다.
