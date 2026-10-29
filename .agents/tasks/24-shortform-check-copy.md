# 작업 지시서 24: 숏폼 설정 파일 형식 + 문구 점검 스크립트

## 목표
숏폼 영상 1개를 JSON 설정 파일 1개로 정한다(`marketing/shortform/produce/<key>.json`). 그 파일들의 훅·대본·화면 글자·캡션·해시태그를 규칙(정확도·예언·불운 표현, 나쁜 궁합, % 점수, 유명인, 댓글로 생일 요구, 가짜 후기, 금융어, 압박, 진단어)으로 점검하는 스크립트를 만든다. 뒤 작업(렌더 템플릿 5개)이 이 파일의 로더를 쓴다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/shortform/check-copy.mts`
- 새로: `scripts/shortform/check-copy.test.mts`
- 새로: `marketing/shortform/produce/F1-sample.json` (통과하는 예시 1개)
- 그 외 파일은 건드리지 않는다.

### 설정 파일 형식 (`ShortformConfig`)
```ts
type Format = "F1" | "F2" | "F3" | "F4" | "F6";   // F5는 쓰지 않는다
type Platform = "tiktok" | "instagram" | "youtube";
interface Birth { date: string; time: string | null; city: string }  // "YYYY-MM-DD", "HH:MM"(24h) 또는 null, 도시 영문명
interface ShortformConfig {
  key: string;          // /^[A-Z0-9][A-Za-z0-9-]*$/, 파일에서 읽으면 파일 이름(.json 뺀 것)과 같아야 함
  format: Format;
  hook: string;         // 첫 2초 문장, 1~120자
  script: string[];     // 음성·자막 문장(자막 = 말). F2·F6은 빈 배열 허용, 나머지는 1개 이상
  onScreen: string[];   // 화면에 얹는 글자(빈 배열 허용)
  birth: Birth | null;  // F1·F4는 필수(null이면 오류), 나머지는 null 허용
  caption: string;
  hashtags: string[];   // 3~5개, 각각 /^#[a-z0-9]+$/
  utmPlatform: Platform;
  aiVoice: boolean;
}
```
- 날짜는 실제 달력 날짜인지(2월 30일 불가), 1900~2015년 범위인지 확인.
- 알 수 없는 키가 있으면 오류(오타 방지).

### `check-copy.mts` 내보내기
- 첫 줄 한 줄 주석, 둘째 줄에 사용법 주석: `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json`
- `export type Format`, `Platform`, `Birth`, `ShortformConfig`
- `export interface Violation { field: string; rule: string; match: string }` — `field`는 `hook`, `script[2]`, `onScreen[0]`, `caption`, `hashtags[1]`, `birth`, `key` 같은 위치 표기.
- `export function parseConfig(raw: unknown, fileKey?: string): { config: ShortformConfig | null; errors: Violation[] }` — 형식 오류는 `rule: "schema"`, `match`에 이유(영어 짧게, 예 `"missing"`, `"must be 3-5 items"`). 오류가 하나라도 있으면 `config: null`.
- `export function checkText(field: string, text: string, strict: boolean): Violation[]` — 아래 규칙표 적용. `strict`는 훅·화면 글자용.
- `export function checkConfig(config: ShortformConfig): Violation[]` — `hook`·`onScreen[i]`는 strict, `script[i]`·`caption`·`hashtags[i]`는 non-strict로 `checkText`. 그리고 구조 규칙:
  - `caption`에 `link in bio`(대소문자 무시)가 없으면 `rule: "caption-cta"`.
  - `aiVoice: true`인데 `caption`에 정확히 `Voiceover is AI-generated.`가 없으면 `rule: "ai-voice-label"`.
- `export function loadConfigFile(path: string): ShortformConfig` — 읽고 `parseConfig(raw, 파일이름)`, 오류면 `Error`를 던진다(메시지에 위반 목록). 렌더 스크립트가 쓸 로더다.
- `export function checkFiles(paths: string[]): { results: { path: string; violations: Violation[] }[]; crossFile: Violation[] }` — 파일마다 JSON 파싱 오류도 `rule: "schema"`로 담는다. 여러 파일 사이 규칙(`crossFile`):
  - 같은 `key` 두 번 → `rule: "duplicate-key"`, `field: "key"`, `match`에 키와 파일 이름들.
  - 같은 `birth.date` 두 번(null 제외) → `rule: "duplicate-birth"`, `field: "birth"`, `match`에 날짜와 파일 이름들.
- CLI(메인 가드는 `scripts/reddit/utm.mts`와 같은 `import.meta.url === pathToFileURL(process.argv[1]).href` 방식): 인자 없으면 사용법을 stderr에 쓰고 exit 2. 파일마다 `ok  <path>` 또는 `FAIL <path>`와 그 아래 `  <field>: <rule> "<match>"` 줄. 교차 위반은 끝에 `FAIL cross-file` 아래 같은 형식. 마지막 줄 `N files, M failed`(교차 위반이 있으면 실패 1로 더 셈). 위반이 하나라도 있으면 exit 1, 없으면 0.

### 문구 규칙표 (`checkText`)
모두 대소문자 무시, 유니코드 플래그(`iu`). 단어 경계는 `\b` 대신 `(?<![\p{L}\p{N}])` / `(?![\p{L}\p{N}])`를 쓰는 헬퍼로 만든다(예: `w("pay")`). 아래 `…`는 접두 일치(뒤 경계 없음). `rule` 이름은 괄호 안 그대로.

| rule | 패턴 |
|---|---|
| `accuracy` | `accura…`, `exact`, `exactly`, `proven`, `scientific…`, `guarantee…` |
| `prediction` | `predict…`, `prophe…`, `forecast…`, `fortune…`, `destiny`, `destined`, `will`, `fate`, `fated` |
| `misfortune` | `lucky`, `unlucky`, `bad luck`, `misfortune…`, `doom…`, `curse…`, `disaster…`, `death`, `die`, `dies`, `dying`, `illness…`, `sick…`, `accident…`, `bad year` |
| `bad-match` | `worst`, `bad match…`, `toxic`, `incompatib…`, `red flag…`, `never date`, `stay away` |
| `percent` | `\d\s*%` (경계 없이), `percent…` |
| `money` | `money`, `bank…`, `pay`, `paid`, `wallet…`, `invest…`, `wealth…`, `rich`, `riches`, `income`, `crypto…`, `stock…` |
| `pressure` | `countdown…`, `last chance`, `hurry`, `limited`, `only today`, `ends soon`, `ends tonight`, `price…`, `sale`, `discount…`, `\$` (경계 없이) |
| `diagnosis` | `diagnos…`, `disorder…`, `therap…`, `treat…`, `cure`, `cures`, `heal…` |
| `comment-birth` | `(comment|drop|leave|tell me|type in|write|send)` 뒤 30자 이내(문장부호 `.!?`·줄바꿈 넘지 않음)에 `(birth…|bday|b-day|dob)`; 또는 `birth…` 뒤 20자 이내에 `(in|below) (the )?comments?` |
| `fake-review` | `I (tried|downloaded|used|bought|paid)`, `changed my life`, `literally me`, `my (friend|mom|dad|bf|gf|boyfriend|girlfriend|wife|husband|sister|brother)`, `(5|five)[- ]stars?`, `review…`, `testimonial…` |
| `assume-viewer` | `you're`, `youre`, `you are` (모든 필드). strict일 때만 추가로 `you`, `your`, `yours` |
| `celebrity` | 아래 유명인 목록의 이름 전체(경계 있음, 대소문자 무시) |

- 같은 필드에서 같은 rule이 여러 번 걸리면 첫 일치 하나만 낸다. 다른 rule은 각각 낸다.
- 유명인 목록: `lib/sajuTypeCelebrities.ts`의 `SAJU_TYPE_CELEBRITIES` 모든 항목의 `name`과 `nameKo`(있으면) + 스크립트 안 상수 `EXTRA_CELEBRITIES` = `["Taylor Swift", "Beyoncé", "Beyonce", "Rihanna", "Ariana Grande", "Selena Gomez", "Zendaya", "Harry Styles", "Bad Bunny", "Shakira", "Kim Kardashian", "Kanye West", "BTS", "BLACKPINK", "Jungkook", "Jimin", "Jennie", "Jisoo", "Rosé", "NewJeans", "Stray Kids"]`. 이름 속 정규식 특수문자는 이스케이프. 상대 경로 import: `../../lib/sajuTypeCelebrities.ts`.

### `F1-sample.json`
- 위 형식을 지키고 `checkFiles`로 통과해야 한다. 값:
  - `key: "F1-sample"`, `format: "F1"`, `utmPlatform: "tiktok"`, `aiVoice: true`
  - `hook: "A Korean saju type, from one birth date and a city."`
  - `script`: `["Saju reads a birth date, time, and city as four pillars.", "Here the birthday goes in, then a city outside Korea.", "The app lands on one of fifty saju types and shows the card.", "Free to try. Link in bio."]`
  - `onScreen`: `["Birth date + city", "One of 50 saju types"]`
  - `birth: { "date": "1994-08-21", "time": "07:30", "city": "Toronto" }`
  - `caption`: `"A Korean saju type, from one birth date and a city.\nFree saju type card from a birth date: link in bio.\nSelf-reflection tool, not medical or psychological advice.\nVoiceover is AI-generated."`
  - `hashtags`: `["#saju", "#koreansaju", "#fourpillars", "#personalitytypes"]`
- JSON은 2칸 들여쓰기, 끝 줄바꿈.

### `check-copy.test.mts`
`scripts/reddit/memo.test.mts`처럼 `node:assert/strict` + `check(cond, msg)` 카운터, 끝에 `console.log(\`ok ${n} checks\`)`. 첫 줄 주석 `// Shortform copy checker, offline: npx tsx scripts/shortform/check-copy.test.mts`. 최소 아래를 단언한다:
- 통과 사례: `marketing/shortform/produce/F1-sample.json`을 `loadConfigFile`로 읽고 `checkConfig` 위반 0. `checkFiles([그 파일])` 위반 0, crossFile 0.
- rule마다 걸리는 사례 하나 이상(필드와 rule 이름 확인): `"This is so accurate"`(accuracy), `"What 2027 will bring"`(prediction), `"fortune-telling"`(prediction), `"Your unlucky day"`(misfortune), `"The worst match for Fire"`(bad-match), `"92% compatible"`(percent), `"Money luck this week"`(money — misfortune도 같이 걸리는지는 확인하지 않아도 됨, money 포함만 확인), `"Only today, 50% off"`(pressure), `"A therapy-style test"`(diagnosis), `"Comment your birthday below"`(comment-birth), `"Drop your birth date"`(comment-birth), `"Birthdays in the comments"`(comment-birth), `"I tried this app and wow"`(fake-review), `"You're an anxious type"`(assume-viewer, non-strict에서도), `"Elon Musk has this type"`(celebrity, 목록 파일에서 온 이름), `"Taylor Swift's chart"`(celebrity, EXTRA).
- 경계 사례(걸리면 안 됨): `"A saju type card from a birth date"`(comment-birth 아님, `type` 단독은 동사 목록에 없음), `"Fatesaid"`(prediction의 `fate` 아님), `"display the card"`(pay 아님), `"Payment"`는 이 규칙상 `pay` 경계로 안 걸림을 확인, `"a bright chart"`, `"three birthdays, three cards"`(comment-birth 아님), `"I typed three birthdays into a Korean saju app."`(fake-review 아님), `"Which element is biggest in your chart?"`는 non-strict(caption)에서 통과, strict(hook)에서는 assume-viewer.
- 구조: `aiVoice: true`인데 표기 없음 → `ai-voice-label`. 캡션에 `link in bio` 없음 → `caption-cta`. `format: "F5"` → schema. F1인데 `birth: null` → schema. `date: "1994-02-30"` → schema. 해시태그 2개 → schema. 모르는 키 `extra` → schema. 파일 이름과 `key` 불일치 → schema.
- 교차: 임시 폴더(`os.tmpdir()` 아래 `mkdtempSync`)에 같은 `birth.date`의 유효한 파일 두 개(키는 파일 이름과 맞춤) → `crossFile`에 `duplicate-birth` 하나. 같은 key 두 파일은 파일 이름이 달라야 하므로 `parseConfig`를 거치지 않는 경로가 없다 — 대신 `checkFiles`에 같은 파일 경로를 두 번 넘겨 `crossFile`에 `duplicate-key`가 포함되는지 확인한다(같은 날짜라 `duplicate-birth`도 함께 나온다). 테스트 끝에 임시 폴더를 지운다.
- CLI: `child_process.spawnSync(process.execPath, ["--import", "tsx", "scripts/shortform/check-copy.mts", <sample path>])` exit 0이고 stdout에 `ok`; 인자 없이 exit 2; 위반 파일(임시 폴더에 만든 것) exit 1이고 stdout에 `FAIL`.

## 제약
- 새 npm 의존성 금지. `lib/`, `mobile/`, `app/`, `components/`, 기존 `scripts/` 파일 수정 금지. `marketing/` 아래는 `marketing/shortform/produce/F1-sample.json`만 만든다.
- 스타일: 파일 첫 줄 한 줄 주석, 짧은 헬퍼, 프레임워크 없는 테스트. 참고 `scripts/reddit/utm.mts`, `scripts/reddit/memo.mts`, `scripts/reddit/memo.test.mts`. 파일 import는 `.ts`/`.mts` 확장자를 붙인다(기존 스크립트처럼).
- 네트워크 호출 없음. 커밋하지 않는다.

## 완료 조건
- `npx tsx scripts/shortform/check-copy.test.mts` → exit 0, 마지막 줄 `ok N checks`.
- `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` → exit 0, `1 files, 0 failed`.
- 루트 `npx tsc --noEmit` → exit 0 (출력 없음).

## 참고
- 규칙 출처: `marketing/video-kit.md` "지킬 규칙", 6장 캡션 틀, 9장 점검 스크립트의 금지어. `SPEC.md` 제약.
