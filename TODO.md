# TODO (2026-10-29): 숏폼 실행 1차, 주 10개 · 형식 5개

SPEC: `SPEC.md`. 한 세션에 한 항목만 한다. (2026-10-29: iOS 4.3(b) SPEC·TODO는 1~9 완료 후 `*_2026-10-29_ios43b.md`로 보관, 남은 10번은 심사 결과 대기. 사용자 결정으로 숏폼 재개.) 근거 자료는 `marketing/shortform/REPORT_2026-10-28.md`, `REFERENCES_2026-10-28.md`.

순서: 1 먼저(나머지가 이 틀과 점검 스크립트를 쓴다). 2~6은 서로 독립이라 순서는 상관없다. 7은 2~6 뒤, 8은 7 뒤, 9는 7 뒤.

코딩 항목(1~6)은 CLAUDE.md 분담 규칙상 muse 위임 대상이다. 사업 핵심 로직이 아니기 때문이다. 단 F2·F6 문구 출처 확인은 이 세션이 직접 한다.

공통 렌더 조건: mobile-web이 떠 있어야 한다. `cd mobile && npx expo start --web --port 8082`. 결과물 `marketing/video/`는 git에서 제외된다.

## 구현

- [x] 1. 공통 제작 틀 + 문구 점검 스크립트 (2026-10-29, muse 지시서 `.agents/tasks/24-shortform-check-copy.md`, 브랜치 `task-24`)
  - QA: `npx tsx scripts/shortform/check-copy.test.mts` → `ok 50 checks`(규칙 12종 각각 걸리는 사례 + 경계 통과 사례 + 구조·교차 파일·CLI exit 0/1/2), `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` → `1 files, 0 failed`, 루트 `npx tsc --noEmit` → exit 0 출력 없음
  - 결과: 설정 형식·로더 `loadConfigFile`은 `check-copy.mts`에 있다(렌더 2~6번이 import). 예시 `marketing/shortform/produce/F1-sample.json`(2번 QA의 `F1-sample`). 같은 `birth.date` 중복은 `duplicate-birth`로 잡혀 7번 QA의 중복 0 확인도 이 명령 하나로 된다.
  - 변경:
    - `marketing/shortform/produce/`: 영상 1개 = JSON 1개. 키, 형식(F1~F6), 훅, 대본 문장, 화면 글자, 생년월일·시간·도시, 캡션, 해시태그, UTM 플랫폼, AI 음성 여부.
    - `scripts/shortform/check-copy.mts`: `video-kit.md` 9장 금지어를 넓힌다. 정확도·예언·불운, "worst/bad match", % 점수, 유명인 이름 목록, "comment your birth" 류, 가짜 후기 1인칭("I tried this app"). AI 음성이면 캡션에 "Voiceover is AI-generated."가 있는지도 본다.
    - `scripts/shortform/check-copy.test.mts`.
  - QA: `npx tsx scripts/shortform/check-copy.test.mts` 통과. 금지 사례와 통과 사례가 각각 하나 이상 있어야 한다. 루트 `npx tsc --noEmit` → 0.

- [ ] 2. F1 템플릿: "내 사주 유형 찾는 법" 앱 화면 시연
  - 선행: 1
  - 변경: `scripts/shortform/render-f1.mts`. 기존 `record-app.mts`의 CDP 녹화와 자막 방식을 재사용한다. 장면: 온보딩에 생년월일·시간·**해외 도시** 입력 → 유형 공개 → 유형 카드 → 끝 CTA "link in bio". TTS는 `marketing/tts-samples/generate.py`.
  - QA: `node --import tsx scripts/shortform/render-f1.mts F1-sample` → mp4. `ffprobe`로 1080×1920·35초 이하·오디오 트랙 확인. 0초·2초·끝 프레임을 뽑아 직접 본다(훅 글자, 앱 화면, CTA). mobile-web 렌더링이라 네이티브와 다를 수 있다고 적는다.

- [ ] 3. F4 템플릿: 전/후 앱 화면(심리 검사 결과 → 사주 유형 카드)
  - 선행: 1
  - 변경: `scripts/record-app-ab.mts` `CONFIGS` 확장 또는 `scripts/shortform/render-f4.mts`. 0초부터 앱 UI. "pov"류 시청자 감정 단정 문장 금지.
  - QA: 2번과 같은 ffprobe·프레임 확인. 훅·자막이 `check-copy` 통과.

- [ ] 4. F2 템플릿: 유형 × 관계 카드 묶음
  - 선행: 1
  - 변경: `scripts/shortform/render-f2.mts`. Playwright로 HTML → PNG. Instagram 캐러셀 1080×1350, TikTok 사진 1080×1920, YouTube용 슬라이드 mp4 각각. 색·글꼴은 Celadon & Hanji와 `FONTS` 기준(Newsreader, Plus Jakarta Sans).
  - 문구 출처는 `mobile/lib/compatibilityContent.ts`(en, 관계 5종 headline·body·goodPoint)와 `mobile/lib/sajuTypeContent.ts`(en, archetype·mode 조각)뿐이다. 스크립트가 카드 문장이 원문 문자열과 일치하는지 검사한다. 새 해석 문장 금지, "나쁜 궁합" 금지, % 금지.
  - QA: 3세트 렌더. 원문 일치 검사 통과, `check-copy` 통과. PNG 크기 확인. 카드 3장을 직접 본다(잘림, 대비).

- [ ] 5. F6 템플릿: 한 줄 문구 카드 + 배경 아트 루프
  - 선행: 1
  - 변경: `scripts/shortform/render-f6.mts`. 배경은 mobile-web의 제너러티브 아트 화면을 한 번 녹화해 루프 mp4로 만든다. 그 위에 `sajuTypeContent` en tagline 한 줄과 계정 이름을 얹는다. 음성 없이 음원 자리만 둔다(음원은 게시할 때 플랫폼에서 고른다).
  - QA: 렌더 2개, ffprobe 1080×1920·7~12초. 문구 원문 일치, `check-copy` 통과. 프레임 확인.

- [ ] 6. F3 템플릿 + 절기 날짜표
  - 선행: 1, 5(배경 루프 재사용)
  - 변경: `scripts/shortform/solar-term-dates.mts`. 엔진 `lib/solarTerms.ts`에서 2026-11 ~ 2027-02 절기 시각을 KST와 UTC로 뽑는다. 여기에 Year Wrapped(12/1), 2027 신년을 더해 날짜표 `marketing/shortform/dates.md`를 만든다. `scripts/shortform/render-f3.mts`는 날짜 텍스트 카드 3~4장에 AI 음성을 선택으로 붙인다. 문장은 "리듬·흐름" 표현만 쓴다(예언 금지).
  - QA: `npm run validate:manseryeok` 통과(엔진은 바꾸지 않았으니 기존 결과 그대로). 날짜표의 입동·동지가 엔진 출력과 같다. 렌더 1개는 ffprobe와 프레임으로 확인, `check-copy` 통과.

- [ ] 7. 첫 2주 설정 파일 20개(대본·캡션)
  - 선행: 2~6
  - 구성: F2 6, F1 4, F4 4, F6 4, F3 2. 영상마다 생년월일·유형·모듈이 달라야 한다. 캡션에 플랫폼별 UTM 링크 문구("link in bio"), AI 음성 표기, 해시태그를 넣는다.
  - QA: `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` → 20개 전부 통과. 같은 생년월일 중복 0(스크립트로 센다).

- [ ] 8. 20개 렌더 + 검수
  - 선행: 7
  - QA: 20개 모두 렌더 성공. ffprobe 일괄 점검(크기·길이·오디오). 영상마다 0초·2초·끝 프레임 접촉 시트를 보고 문제 목록을 적은 뒤 고친다. TTS 비용(문자 수)도 적는다.

- [ ] 9. 4주 게시 캘린더 + 성과 기록표 + 예약 게시 안내
  - 선행: 7
  - 변경:
    - `marketing/shortform/CALENDAR.md`: 주 10개. 같은 형식을 연달아 두지 않는다. F3는 날짜에 맞춘다. 공개일을 D0로 둔 상대 날짜로 쓴다.
    - `marketing/shortform/tracker.csv`: 영상 키, 플랫폼, 게시일, 48시간·7일 조회·공유·저장·프로필 방문·링크 클릭.
    - TikTok Studio, Meta Business Suite, YouTube Studio 예약 게시 순서.
  - QA: 캘린더 점검 스크립트로 주별 개수, 연속 같은 형식 0, F3 날짜 일치를 확인한다.

## 사용자 확인·실행

- [ ] 10. (user check) 스토어 공개 확인 → 첫 주 예약 게시
  - 절차: iOS·Android 공개 확인 → 웹 "coming soon"을 스토어 링크로 바꿨는지 확인(이전 마케팅 TODO 7) → CALENDAR의 1주차 10개를 TikTok과 Instagram에 같은 날짜로 예약 → YouTube Shorts에 복사 예약 → 캡션의 AI 음성 표기 확인.
- [ ] 11. (user check) 48시간·7일 수치 기록. `tracker.csv`에 직접 입력하거나, 사용자 승인 뒤 Aside로 각 플랫폼 분석 화면을 읽어 채운다(읽기만).
- [ ] 12. 2주 리뷰(Claude). 형식별 중앙 조회·공유율·프로필 방문율과 퍼널 리포트(`npx tsx --env-file=.env.local scripts/funnel-report.mts`)의 UTM 플랫폼별 방문 → 유형 카드 → 스토어 클릭을 보고 3~4주차 구성을 조정한다.
  - 선행: 11(2주치 수치)
- [ ] 13. 4주 리뷰(Claude). 6개 이상 올렸는데 프로필 방문·링크 클릭이 사실상 0인 형식은 뺀다. 다음 SPEC을 제안한다(스페인어판, 승자 형식 확대, 광고 증폭).
  - 선행: 12

## 이전 TODO에서 옮긴 사용자 항목 (`TODO_2026-10-28_measurement.md` 5~7)
- [ ] 14. (사용자 실행) iOS 1.2.0 승인 뒤 `eas update` 한 번(iOS·Android 함께). 순서·명령은 `HANDOFF_2026-10-25_ota_pending.md`.
- [ ] 15. (사용자 확인, 14 뒤) 앱 이어받기 실기 확인. 절차는 `TODO_2026-10-27_web2app.md` 11번. 같은 김에 설정 © 7번 탭으로 본인 기기를 테스터로 표시한다.
- [ ] 16. (사용자 실행, 14 뒤) 영어 사용자 5명 관찰. 기록표를 공유하면 웹 검사 맛보기와 주력 상품 판단에 쓴다.

## 발견 사항
- (1번) `check-copy`는 금지어를 넓게 잡는다: `heal…`이 "healthy", `treat…`이 "treaty", `stock…`, `will` 단독도 걸린다. 7번에서 문장을 쓸 때 걸리면 단어를 바꾸고, 규칙을 풀어야 하면 그때 결정한다. 해시태그 `#astrology`는 규칙상 통과하지만 4.3(b) 이후 쓸지는 7번에서 판단.
- (분석 중) yt-dlp는 TikTok 댓글을 0개로 받는다. 댓글은 Aside로 읽는다. TikTok은 요청을 가끔 막으니 계정 목록은 재시도가 필요하다(`marketing/shortform/tools/collect.py`).
- (분석 중) 임시 폴더는 재부팅하면 지워진다. 영상·프레임은 `~/.cache/shortform_dl`에 둔다.
- (분석 중) TikTok을 비즈니스 계정으로 바꾸면 상업용 음원만 쓸 수 있다. 바꾸기 전에 F3·F6 음원 방침을 다시 정한다.
