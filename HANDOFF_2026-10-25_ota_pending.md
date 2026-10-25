# 핸드오프 2026-10-25: iOS 1.2.0 승인 뒤 OTA 한 번

## 결정
- 앱 버전은 올리지 않는다(1.2.0 유지). iOS 1.2.0 승인이 나면 `eas update`를 한 번만 보낸다.
- 이유: 심사 중에 보내면 심사자가 받는 번들이 달라질 수 있고, 1.3.0으로 올리면 심사가 되돌아간다. `runtimeVersion`이 `appVersion` 정책이라 OTA는 1.2.0 빌드에만 간다. 안드로이드 1.2.0은 공개됐지만 다운로드가 거의 없어 급하지 않다.

## 끝난 것 (2026-10-25)
- 웹 배포 완료: `main`에 푸시(`f765f0b..122dfca`), Vercel 상태 success("Deployment has completed") 확인함.
- 오늘 커밋: `5c58c1a`(en/es 교정+웹 문구 4건), `421ba48`(module12 T3 중립화·module3 중복), `122dfca`(module3 요약 감정 단정·질문 합침 제거).
- Codex 재검수 4건 중 2건(감정 단정, 질문 합침) 수정, 9턴 보기 없음은 설계라 문제 아님, 업무량 반복 질문은 남김.
- 챗 스크립트 en/es 12모듈 문장 교정, module12 3턴 보기 중립화(ko/en/es), module3 요약 수정, 웹 문구 4건. 챗 스크립트는 서버 코드라 웹 배포로 앱에도 반영된다. 이번에 `mobile/` 코드는 바꾸지 않았다.
- 검증: 린트(ko 오류 0·경고 24, en/es 오류 0·경고 3), 루트·mobile `tsc` 0, `npm run lint`, `build`, 만세력 검증 통과. 사이트(fatesaidapp.com)는 Aside로 점검, 깨진 링크·콘솔 오류 없음.

## OTA에 실리는 앱 변경 (이미 `main`에 있고 아직 안 배포된 것)
- 한국어, 영어·스페인어 기본 챗 흐름을 v4 고정 스크립트로 전환(`30e3c5c`, `9662d8b`). 네이티브 의존성 추가 없음.
- 그 밖의 `mobile/` 변경은 `git log --oneline -- mobile`로 직접 확인할 것.

## 승인 나면 할 일
1. App Store Connect에서 1.2.0 "판매 준비 완료" 확인. Play는 관리형 게시라 공개 상태 확인.
2. 사용자가 실행(명령은 막힐 수 있어 사용자 실행으로 둔다):
   ```bash
   cd /Users/kwonhyunjo/Desktop/sasim/work/mobile && eas update --branch production --message "챗 v4 기본 흐름, en/es 문장 교정"
   ```
   브랜치 이름은 기존 배포에서 쓴 것과 같아야 한다. 확신이 없으면 `eas update:list`로 먼저 확인.
3. 성공 표시 `✔ Published!` 확인, 실기에서 앱을 두 번 켜서 새 번들 적용 확인.
4. en/es 챗을 실기로 5분씩 돌려 본다(TODO 9와 같이): 반응 줄이 인위적인지, 질문이 답과 안 맞는지.
5. 문제가 있으면 `eas update:rollback`.

## 못 고친 것 / 남은 것
- module12는 "새 장소"를 전제로 한 문구가 3개 언어에 남아 있다. 헤어짐을 고른 사람에게는 어색할 수 있어, "새로운 상황" 기준으로 전면 수정이 필요하다.
- module3은 2·7·8턴이 모두 업무량을 묻는다. 질문 순서를 다시 짜야 한다.
- 위 두 가지는 아직 SPEC 없이 손대지 않았다.
- 공개 웹 점검에서 영어 랜딩 `/en`은 `/`로 308 리다이렉트된다(의도된 구조로 보임).

## 알아둘 것
- Codex를 `codex exec "…"`로 부를 때 stdin을 닫지 않으면 응답 없이 걸릴 수 있다. `< /dev/null`로 닫고 출력은 파일로 받는다.
- Muse(기여자 모델)는 공개 웹 점검에만 썼다. 핵심 로직·프롬프트는 보내지 않았다.

## 커밋 안 된 파일 (이 세션에서 만든 것 포함)
- `HANDOFF_2026-10-25_ota_pending.md`(이 파일), `.agents/tasks/18-public-page-check.md`(Muse 공개 웹 점검 지시서)
- 이전부터 있던 것: `HANDOFF_2026-10-23_payments_address.md`, `mobile/store-assets/play-screenshots/raw/`

## 새 세션 시작 순서
이 파일 → `HANDOFF_2026-10-17.md`(스토어 상태) → 필요하면 `HANDOFF_2026-10-23_payments_address.md`(구글 결제 프로필 주소, 지원팀 답변 대기). 승인 알림을 받으면 위 "승인 나면 할 일"부터.
