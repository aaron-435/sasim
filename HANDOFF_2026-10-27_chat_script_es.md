# 핸드오프 2026-10-27: 챗 스크립트 보정 + 스페인어 성별·중남미 기준

새 세션은 이 파일 → `SPEC.md` → `TODO.md` → `WIKI.md` 순서로 읽고, `/work`로 TODO 1번부터 시작한다.

## 목표
- v4 고정 스크립트 챗에서 module12가 이사한 사람을 전제로 쓴 문구를 중립으로 고친다.
- module3에서 업무량을 세 번 묻는 문제를 없앤다.
- 스페인어 독자 성별 표지 검사를 스크립트 린트와 챗 모델 응답에 건다.
- 스페인어 기준을 중남미 중립(es-419)으로 명시한다.

## 이 세션에서 끝낸 것
- SPEC·TODO 작성, 사용자 승인(성별 검사와 es-419 포함). 이전 레딧 SPEC·TODO는 `*_2026-10-26_reddit_auto.md`로 보관(`git mv`, 아직 커밋 안 함).
- App Store 심사 상태 문의 전송: 케이스 ID 103009805369. 답장은 Apple 계정 이메일 drunkbetter@gmail.com으로 온다. 자세한 내용은 `HANDOFF_2026-10-25_ota_pending.md` 끝.
- 남은 일 전수 확인 결과:
  - `TODO_2026-10-17_polish.md`의 W1~W4, A1~A7은 이미 구현됨(커밋 `37987b2`, `6183150`, `94cc7e9`). 체크만 안 되어 있었다. 남은 것은 Z2 실기 확인과 Z3 OTA뿐이다.

## 결정된 사항 (다시 논쟁하지 않음)
- module12는 1턴 답에 따른 분기 없이 "새로운 상황·새 일상" 중립 문구로 해결한다(엔진 변경 없음).
- module3은 `demand_drain`=8턴 매핑을 유지하고, 7·8턴 보기에서 "일의 양" 중복을 없앤다.
- 스페인어는 중남미 중립 표준으로 쓴다(특정 나라 사투리 없음).
  - `tú`, 복수는 `ustedes`
  - 끝난 일은 단순과거, `vale` 금지
  - `computadora`, `celular`
- 챗 스크립트 문구는 핵심 콘텐츠라 muse와 외부 AI에 맡기지 않는다. 이 세션의 Claude가 직접 쓴다.

## 알아둘 것
- 2026-10-27 기준 es 표지 수(스크립트 12개 + `common.ts` + i18n es):
  - 어휘(`vosotros`, `ordenador`, `coger`, `coche`)는 0건
  - 현재완료는 89건(`has contado` 등. 지금과 이어지는 뜻이면 남겨도 됨)
  - `vale`는 2건(`common.ts` 반응 풀 "Vale, te escucho.", "Sí, lo he leído."와 함께 고칠 것)
- zsh에서는 `$F`처럼 따옴표 없는 변수가 단어 단위로 나뉘지 않는다. 파일 목록은 배열(`F=(...)`, `${F[@]}`)로 넘긴다.
- 성별 정규식은 `lib/reportQuality.ts:76` `ES_GENDERED_READER`에 있다. v4 챗은 대부분 고정 스크립트라 모델이 스페인어를 쓰는 경로가 적다(TODO 5에서 실제 경로 확인).
- 스크립트 도구: `scripts/check-choice-scripts.mts`(린트, `LOCALE=en|es`), `scripts/run-choice-script.mts`(경로 출력).
- 상호는 "Studio Aaron"이다(코드·약관 기준). 애플 문의 서명에는 실수로 "Studio Aron"을 썼다. 심사에는 영향 없음.

## 기다리는 것 (이 작업과 별개)
- iOS 1.2.0 심사(10/17 제출, "심사 중"). 승인 나면 OTA(`HANDOFF_2026-10-25_ota_pending.md`).
- Google 결제 프로필 주소 지원팀 답변(`HANDOFF_2026-10-23_payments_address.md`).
- Search Console 색인 확인(약 10/30). W-8BEN 주소 재제출(사용자).

## 다음 후보 (이번 SPEC 밖)
- 유형 카드 유명인 이름 가리기(마케팅 소재 전), `ReportPager` 스크롤 JS 스레드, 데스크톱 랜딩 우측 여백, AI 말투 V7·V8, 레딧 점수 보정.
- 결정 대기: 성별 "답하지 않음" 선택지, 구독 가격 $7.99/$9.99.

## 커밋 안 된 것
- `SPEC.md`·`TODO.md` 새 파일, 레딧 SPEC·TODO 보관 이름 변경, `HANDOFF_2026-10-25_ota_pending.md` 추가 기록, 이 파일.
- 이전부터 있던 것: `mobile/store-assets/play-screenshots/raw/`.
