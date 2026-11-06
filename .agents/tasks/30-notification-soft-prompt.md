# 작업 지시서 30: 알림 권한을 자동으로 묻지 않고, 홈 카드에서 사용자가 켤 때만 묻기

## 목표
지금은 온보딩이 끝나고 홈에 처음 도착하면 시스템 알림 권한 창이 저절로 뜬다(App Store 가이드라인 5.1.1(ii) 위험). 결제 직후에도 `refreshRoutineNotification`이 권한을 물을 수 있다.
바꾼 뒤에는 **시스템 권한 창이 사용자가 직접 누른 버튼 뒤에서만** 뜬다: (1) 홈의 새 알림 카드 "알림 켜기", (2) 기존 설정 화면의 알림 선택. 그 밖의 모든 경로는 권한이 이미 있을 때만 예약하고, 없으면 조용히 넘어간다.

## 수정할 파일 / 새로 만들 파일 (모두 `mobile/` 아래)
1. `lib/routineNotification.ts`
   - `applyNotificationPreference(pref, strings, isSubscribed, { askPermission = true }: { askPermission?: boolean } = {})`로 옵션 추가.
   - `askPermission`이 false이고 권한이 `granted`가 아니면 예약하지 않고 `{ permissionDenied: false }` 반환(요청하지 않음).
   - `refreshRoutineNotification`은 `{ askPermission: false }`로 호출.
   - 설정 화면 호출(`screens/SettingsScreen.tsx:102`)은 그대로 두면 기본값 true라 지금처럼 묻는다. SettingsScreen은 고치지 않는다.
2. `lib/decadeNotification.ts`
   - `requestPermissionsAsync` 호출 제거. 권한이 `granted`가 아니면 그냥 return. 파일 위쪽 주석도 맞게 고친다.
3. `App.tsx`
   - 334행 근처 "First time a user reaches Home" effect: 기본 선호값 저장은 그대로, `applyNotificationPreference(..., { askPermission: false })`로 바꾼다.
   - `refreshSolarTermNotifications`는 이미 기본이 askPermission false라 그대로.
   - 새 함수 `handleNotificationsEnabled()`: 권한이 막 허용된 뒤 호출된다. 순서대로 `applyNotificationPreference(await getNotificationPreference(), strings, await hasQaProEntitlement(), { askPermission: false })`, `refreshSolarTermNotifications(locale, dayMasterCharOf(homeData))`, 그리고 기존 312행과 같은 인자로 `scheduleDecadeTransitionNotification(...)`. homeData가 없으면 아무것도 안 함. 에러는 삼킨다(`.catch(() => {})` 패턴).
   - `<HomeScreen ... onNotificationsEnabled={handleNotificationsEnabled} />` 전달.
4. `components/NotificationPromptCard.tsx` (새 파일)
   - props: `{ onEnabled: () => void }`.
   - 보일 조건(마운트 시 한 번 확인, 모두 만족해야 보임): `Platform.OS !== "web"`, `Notifications.getPermissionsAsync()`의 `status === "undetermined"`, `getNotificationPreference()`가 `"off"`가 아님, AsyncStorage 키 `fatesaid_notification_prompt_dismissed`가 없음. 확인 전에는 아무것도 렌더하지 않음(null).
   - 내용: 제목, 본문 한 줄, 버튼 2개("알림 켜기" 주 버튼, "나중에" 보조 텍스트 버튼).
   - "알림 켜기": `Notifications.requestPermissionsAsync()` → 결과와 상관없이 카드 숨김 + dismissed 키 저장. `granted`면 `onEnabled()` 호출.
   - "나중에": 카드 숨김 + dismissed 키 저장.
   - 버튼은 `components/motion/PressableScale` 사용, 최소 높이 44. 텍스트는 `components/AppText`. 글꼴은 `FONTS`/`MAX_FONT_SCALE`(`theme/fonts.ts`), 색은 `COLORS`(`theme/colors.ts`), 간격·모서리는 `theme/tokens.ts`만 쓴다. 새 색·hex 금지.
   - 모양은 HomeScreen의 기존 `styles.pathCard` 카드와 같은 계열(같은 배경·테두리·radius 토큰)로 맞춘다. 아이콘은 `lucide-react-native/icons/bell` (기존 lucide import 방식 그대로) 14px, `COLORS.gold`.
   - 새 애니메이션을 넣지 않는다(감싸는 `Reveal`만 사용).
   - `import "../lib/notificationSetup";`은 필요 없음. `expo-notifications`는 이미 설치되어 있다.
5. `screens/HomeScreen.tsx`
   - props에 `onNotificationsEnabled: () => void` 추가(타입 블록에도).
   - 위치: `elementColor` 카드(`<Reveal index={2}>`, 469행 근처) 바로 아래에 `<Reveal index={2}><NotificationPromptCard onEnabled={onNotificationsEnabled} /></Reveal>`. 다른 섹션의 index는 바꾸지 않는다.
6. `lib/i18n/ko.ts`, `lib/i18n/en.ts`, `lib/i18n/es.ts` — `routineNotification` 객체 바로 뒤에 새 키 `notificationPrompt` 추가(세 파일 모두 같은 위치, 같은 키). 문구는 아래 그대로 쓴다:
   - ko: `title: "아침 알림 받을까요?"`, `body: "오전 9시에 오늘의 흐름이 준비됐다고 알려드려요. 설정에서 언제든 바꿀 수 있어요."`, `enable: "알림 켜기"`, `later: "나중에"`
   - en: `title: "Want a morning reminder?"`, `body: "We'll let you know at 9 a.m. when today's rhythm is ready. You can change this anytime in Settings."`, `enable: "Turn on"`, `later: "Not now"`
   - es: `title: "¿Quieres un aviso por la mañana?"`, `body: "Te avisamos a las 9 a. m. cuando tu ritmo de hoy esté listo. Puedes cambiarlo cuando quieras en Ajustes."`, `enable: "Activar"`, `later: "Ahora no"`

## 제약
- 건드리면 안 되는 파일: `screens/QAScreen.tsx`(이미 다른 수정이 있음), `screens/SettingsScreen.tsx`, `lib/purchases.ts`, `lib/solarTermNotification.ts`, `lib/notificationPreference.ts`, `app.json`, `package.json`, 루트(Next.js) 쪽 전부.
- 새 npm 패키지·네이티브 의존성 금지.
- 글꼴은 `FONTS`로만 참조(패밀리 이름 직접 쓰기 금지), 이탤릭은 `FONTS.displayItalic`.
- 주석은 영어, 기존 파일의 주석 밀도·말투에 맞춘다. 왜 이렇게 하는지(가이드라인 5.1.1(ii): 시스템 권한 창은 사용자의 명시적 행동 뒤에만) 한 줄로 남긴다.
- 기본 알림 선호값("daily")과 저장 방식은 그대로.
- git commit 하지 않는다.

## 완료 조건 (muse가 직접 실행)
1. `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0.
2. `cd mobile && grep -rn "requestPermissionsAsync" --include='*.ts' --include='*.tsx' --exclude-dir=node_modules .` → 남은 호출이 `components/NotificationPromptCard.tsx`, `lib/routineNotification.ts`(askPermission true 경로), `lib/solarTermNotification.ts`(askPermission true 경로)뿐.

## 참고
- 기존 패턴: `lib/solarTermNotification.ts:79`의 `{ askPermission = false }` 옵션.
- 카드 스타일 참고: `screens/HomeScreen.tsx`의 wrapped 카드(`styles.pathCard`, `pathEyebrowRow`, `pathTitle`, `pathBody`).
