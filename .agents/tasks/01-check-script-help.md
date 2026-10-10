# 작업 지시서 01: check-goodDays-range 스크립트에 --help 추가

## 목표
`scripts/check-goodDays-range.mts`를 `--help` 또는 `-h` 인자로 실행하면 사용법을 출력하고 종료 코드 0으로 끝나게 한다. 인자 없이 실행했을 때의 동작(9건 검사, 실패 시 종료 코드 1)은 그대로 둔다. 파이프라인 점검용 작은 작업이다.

## 수정할 파일 / 새로 만들 파일
- 수정: `scripts/check-goodDays-range.mts` (이 파일 하나만)

## 제약
- 건드리면 안 되는 파일: 이 파일 외 전부(`lib/goodDays.ts`, `package.json` 포함). 새 의존성 추가 금지.
- 따라야 할 코드 스타일: 기존 파일의 한국어 주석, 기존 `cases` 배열과 검사 루프는 수정하지 않는다. `--help` 처리는 `import` 아래, 검사 루프 앞에 추가한다.
- 출력 문구는 한국어로, 아래 세 가지를 포함한다: 스크립트가 하는 일(좋은 날 범위 길이 검사, 네트워크 없음), 실행 방법(`npx tsx scripts/check-goodDays-range.mts`), 종료 코드(0=모두 통과, 1=실패 있음).

## 완료 조건
- `npx tsx scripts/check-goodDays-range.mts --help` → 사용법 출력, 종료 코드 0, 검사 결과(ok/FAIL 줄)는 출력되지 않음.
- `npx tsx scripts/check-goodDays-range.mts` → 기존과 같이 `ok` 9줄, 종료 코드 0.
- `npx tsc --noEmit` 통과.

## 참고
- 기존 로직(`goodDaysRangeLength` 호출과 `cases`)은 그대로 둔다.
