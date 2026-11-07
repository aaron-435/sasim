# 작업 지시서 31: 외부 AI(OpenAI)로 데이터를 보내기 전에 앱 안에서 명시적 동의 받기

## 목표
App Store 가이드라인 5.1.2(i)(2025-11 개정)는 개인정보를 외부 AI로 보내기 전에 **어디로 무엇을 보내는지 알리고 명시적 허락**을 받으라고 요구한다. 지금 앱은 처리방침에만 OpenAI를 적었고, 앱 안 동의 화면이 없다.
바꾼 뒤에는 OpenAI를 쓰는 서버 API를 부르기 **직전에** 한 번 동의 창이 뜨고, "허용"을 눌러야만 요청이 나간다. 동의는 기기에 저장되어 다음부터는 묻지 않는다. "지금은 안 함"을 누르면 요청을 보내지 않고 화면의 기존 오류+다시 시도 UI에 안내 문구를 띄운다(다시 시도 → 동의 창이 다시 뜸). 설정에서 동의를 철회할 수 있다.

## 수정할 파일 / 새로 만들 파일 (모두 `mobile/` 아래)

1. `lib/aiConsent.ts` (새 파일)
   - AsyncStorage 키 `fatesaid_ai_consent_v1`, 값 `"granted"`. 
   - `export async function hasAiConsent(): Promise<boolean>`
   - `export async function setAiConsent(granted: boolean): Promise<void>` — false면 키 삭제.
   - `export async function requestAiConsent(): Promise<boolean>` — 이미 있으면 바로 true. 없으면 등록된 호스트(아래 `AiConsentHost`)에게 창을 띄우게 하고, 사용자의 선택으로 resolve. 이미 창이 떠 있는 동안 또 불리면 같은 Promise를 돌려준다(창 두 개 금지). 호스트가 등록되지 않았으면 false.
   - 호스트 연결용: `export function registerAiConsentPresenter(fn: (() => Promise<boolean>) | null): void` (모듈 변수 하나에 저장).
   - `requestAiConsent`가 true로 끝나면 `setAiConsent(true)`로 저장, false면 저장하지 않음.
   - AsyncStorage 읽기/쓰기는 try/catch로 감싸고 실패 시 false(동의 없음) 취급.
   - 파일 위 주석(영어): 왜 필요한지(가이드라인 5.1.2(i): third-party AI 전송 전 명시적 허락, 처리방침 문구만으로는 부족), 그리고 이 키를 쓰는 곳.

2. `components/AiConsentHost.tsx` (새 파일)
   - 마운트 시 `registerAiConsentPresenter`로 자기 표시 함수를 등록, 언마운트 시 `null`.
   - React Native 기본 `Modal`(`transparent`, `animationType="fade"`, `onRequestClose` = "지금은 안 함"과 같은 처리) 안에 카드 하나.
   - 카드 내용(위→아래): 아이콘 `lucide-react-native/icons/shield-check` 16px `COLORS.gold` + 제목, 본문 문단, 보내는 항목 목록(글머리 `·` 4줄), 맺음 문단, "개인정보 처리방침" 텍스트 링크(`Linking.openURL(\`${API_BASE_URL}/privacy?lang=${locale}\`)`, `API_BASE_URL`은 기존 화면들과 같은 `../config`에서), 주 버튼 "허용", 보조 텍스트 버튼 "지금은 안 함".
   - 내용이 길어질 수 있으니 카드 안 본문은 `ScrollView`(최대 높이는 화면 높이의 70% 정도), 버튼 두 개는 스크롤 밖 아래에 고정.
   - 버튼은 `components/motion/PressableScale`, 최소 높이 44, `accessibilityRole="button"`. 텍스트는 `components/AppText`. 제목 `accessibilityRole="header"`.
   - 글꼴은 `FONTS`/`MAX_FONT_SCALE`(`theme/fonts.ts`), 색은 `COLORS`(`theme/colors.ts`), 간격·모서리는 `theme/tokens.ts`만. 새 hex 금지. 배경 딤은 기존 코드에 쓰는 오버레이 색이 있으면 그것, 없으면 `rgba(0,0,0,0.6)` 한 번만 허용.
   - 카드 모양은 `components/NotificationPromptCard.tsx`와 같은 계열(배경·테두리·radius 토큰)로 맞춘다.
   - 새 애니메이션 추가 금지(Modal의 fade만).
   - `useStrings()`, `useLocale()`는 `../lib/i18n`에서.

3. `App.tsx`
   - `<SafeAreaProvider>` 안, `<ScreenTransition>` 형제로 `<AiConsentHost />`를 한 번 렌더(항상 마운트).
   - `handleLogout()`에 `setAiConsent(false)` 추가(기존 clear 호출들과 같은 줄 모양, 에러는 삼킴 `.catch(() => {})` 필요 시).

4. OpenAI를 쓰는 요청 직전 게이트 — 아래 각 fetch **바로 위**(로딩 상태를 켠 뒤가 아니라, 가능하면 `setBusy/setIsTyping/setLoading` 같은 로딩 상태를 켜기 **전**)에 넣는다:
   ```ts
   if (!(await requestAiConsent())) {
     // 로딩 상태를 이미 켰다면 끄고
     set<기존 오류 상태>(strings.aiConsent.declinedError);
     return;
   }
   ```
   기존 화면의 오류 상태·다시 시도 버튼을 그대로 쓴다(새 UI 만들지 않음). 대상:
   - `screens/QAScreen.tsx` `requestAnswer` → `/api/qa-answer` (156행 근처). 다시 시도가 같은 질문을 다시 보내도록 기존 `setRetryQuestion({ text: questionText, person })`도 함께 설정.
   - `screens/ChatScreen.tsx` → `/api/chat` (190행 근처). `setIsTyping(true)` 전에 넣고 `setErrorText(...)`.
   - `screens/ReportScreen.tsx` `fetchReport` → `/api/report` (339행 근처), 그리고 `/api/report/paid` (414행 근처). 각 함수의 기존 오류 상태 사용.
   - `screens/CompatReportScreen.tsx` `loadPreview` → `/api/compatReport` (189행 근처), `generatePaid` → `/api/compatReport/paid` (139행 근처). 기존 `setError({ kind, text })` 모양에 맞춘다(kind는 그 함수가 이미 쓰는 값).
   - `screens/YearReportScreen.tsx` `generate` → `/api/yearReport` (114행 근처). `setErrorText`.
   - `screens/JournalScreen.tsx` `handleGenerate` → `/api/journalReport` (117행 근처). `setError`.
   - 위 목록 밖의 fetch(`/api/compatibility`, `/api/report/unlock`, `/api/solarTerms`, `/api/events`, `/api/handoff` 등)에는 넣지 않는다.
   - 각 게이트 위에 영어 주석 한 줄: `// Guideline 5.1.2(i): nothing goes to the AI provider before the user allows it (lib/aiConsent.ts).`

5. `screens/SettingsScreen.tsx` — 법적 고지 섹션(`legalSectionLabel`) 목록의 구매 복원 버튼 바로 아래에 한 줄 추가:
   - 마운트 시 `hasAiConsent()`로 상태 읽기.
   - 라벨: 동의 상태면 `strings.aiConsent.settingsOn`, 아니면 `strings.aiConsent.settingsOff`. 스타일은 이웃 `styles.option` / `styles.optionLabel` 그대로.
   - 동의 상태에서 누르면 `Alert.alert(strings.aiConsent.revokeTitle, strings.aiConsent.revokeBody, [취소(cancel), { text: strings.aiConsent.revokeConfirm, style: "destructive", onPress: setAiConsent(false) 후 상태 갱신 }])`. 취소 버튼 문구는 기존 `strings.settings.cancelLabel`.
   - 동의 안 한 상태에서 누르면 `requestAiConsent()` 호출 후 결과로 상태 갱신.

6. `lib/i18n/ko.ts`, `lib/i18n/en.ts`, `lib/i18n/es.ts` — `notificationPrompt` 객체 바로 뒤에 새 키 `aiConsent` 추가(세 파일 같은 위치·같은 키). 타입이 `ko.ts`에서 추론되는 구조면 그 방식을 따른다. 문구는 아래 그대로:

   **ko**
   - `title: "AI를 쓰기 전에 확인해 주세요"`
   - `body: "대화 답장, 사주 Q&A 답변, 리포트는 미국의 AI 서비스 OpenAI가 작성합니다. 이를 위해 아래 정보를 OpenAI에 보냅니다."`
   - `items: ["생년월일·출생 시간·출생 도시로 계산한 사주 결과", "심리 검사 결과 요약", "대화와 질문에서 직접 고르거나 입력한 내용, 닉네임", "궁합·다른 사람 질문을 쓸 때는 그 사람의 사주 결과, 월간 리포트를 만들 때는 그달의 기록"]`
   - `footer: "보낸 정보는 답변을 만드는 데에만 쓰이고 광고에 쓰이지 않습니다. 허용하지 않으면 AI 기능을 쓸 수 없지만 검사, 오늘의 흐름, 내 패턴은 그대로 쓸 수 있습니다. 설정에서 언제든 철회할 수 있습니다."`
   - `privacyLink: "개인정보 처리방침"`
   - `allow: "허용"`
   - `decline: "지금은 안 함"`
   - `declinedError: "AI 기능은 OpenAI로 정보를 보내는 데 동의해야 쓸 수 있어요. 다시 시도를 누르면 확인 창이 다시 열려요."`
   - `settingsOn: "AI 데이터 전송: 허용됨 (철회)"`
   - `settingsOff: "AI 데이터 전송: 허용 안 함"`
   - `revokeTitle: "AI 데이터 전송을 철회할까요?"`
   - `revokeBody: "철회하면 대화, 사주 Q&A, 리포트 작성이 멈춥니다. 이미 받은 리포트는 그대로 남습니다."`
   - `revokeConfirm: "철회"`

   **en**
   - `title: "Before we use AI"`
   - `body: "Chat replies, Saju Q&A answers and reports are written by OpenAI, an AI service based in the US. To do that, we send OpenAI the information below."`
   - `items: ["Your saju chart, calculated from your birth date, time and city", "A summary of your test results", "What you pick or type in conversations and questions, and your nickname", "For compatibility or questions about someone else, that person's chart; for the monthly report, that month's entries"]`
   - `footer: "It's used only to write your answers, never for ads. If you don't allow it, AI features won't work, but tests, Today's rhythm and Your pattern still do. You can withdraw this anytime in Settings."`
   - `privacyLink: "Privacy Policy"`
   - `allow: "Allow"`
   - `decline: "Not now"`
   - `declinedError: "AI features need your OK to send information to OpenAI. Tap Try again to see the request again."`
   - `settingsOn: "AI data sharing: Allowed (withdraw)"`
   - `settingsOff: "AI data sharing: Not allowed"`
   - `revokeTitle: "Withdraw AI data sharing?"`
   - `revokeBody: "Conversations, Saju Q&A and new reports will stop working. Reports you already have stay on this device."`
   - `revokeConfirm: "Withdraw"`

   **es** (español latinoamericano neutro, tuteo)
   - `title: "Antes de usar la IA"`
   - `body: "Las respuestas del chat, las respuestas de Saju Q&A y los informes los escribe OpenAI, un servicio de IA con sede en EE. UU. Para eso, le enviamos a OpenAI la información de abajo."`
   - `items: ["Tu carta saju, calculada con tu fecha, hora y ciudad de nacimiento", "Un resumen de los resultados de tus tests", "Lo que eliges o escribes en conversaciones y preguntas, y tu apodo", "En compatibilidad o preguntas sobre otra persona, la carta de esa persona; en el informe mensual, los registros de ese mes"]`
   - `footer: "Solo se usa para escribir tus respuestas, nunca para publicidad. Si no lo permites, las funciones de IA no funcionarán, pero los tests, Tu ritmo de hoy y Tu patrón sí. Puedes retirar este permiso cuando quieras en Ajustes."`
   - `privacyLink: "Política de privacidad"`
   - `allow: "Permitir"`
   - `decline: "Ahora no"`
   - `declinedError: "Las funciones de IA necesitan tu permiso para enviar información a OpenAI. Toca Reintentar para ver la solicitud otra vez."`
   - `settingsOn: "Envío de datos a la IA: permitido (retirar)"`
   - `settingsOff: "Envío de datos a la IA: no permitido"`
   - `revokeTitle: "¿Retirar el envío de datos a la IA?"`
   - `revokeBody: "Las conversaciones, Saju Q&A y los informes nuevos dejarán de funcionar. Los informes que ya tienes se quedan en este dispositivo."`
   - `revokeConfirm: "Retirar"`

   - 주의: 화면 이름 "Today's rhythm", "Your pattern"과 es의 "Tu ritmo de hoy", "Tu patrón", 그리고 다시 시도 버튼 이름("Try again"/"Reintentar"/"다시 시도")은 각 파일에 이미 있는 실제 문구와 다르면 **기존 문구에 맞춰** 고친다(`strings.common.retryLabel`, 홈 카드 제목 키 확인). 고친 경우 완료 보고에 적는다.

## 제약
- 건드리면 안 되는 파일: `lib/purchases.ts`, `lib/chatFlow.ts`, `lib/chatPrompts.ts`, `app.json`, `package.json`, `components/NotificationPromptCard.tsx`, 루트(Next.js) 쪽 전부(`app/`, `lib/`, `components/` at repo root).
- 서버 요청 본문(무엇을 보내는지)은 바꾸지 않는다. 게이트만 추가한다.
- 새 npm 패키지·네이티브 의존성 금지(`Modal`, `Linking`, `Alert`는 react-native 기본).
- 글꼴은 `FONTS`로만(패밀리 이름 금지), 이탤릭은 `FONTS.displayItalic`.
- 주석은 영어, 기존 파일 말투·밀도에 맞춘다.
- 동의 창은 앱 실행 시나 온보딩에서 미리 띄우지 않는다. AI 요청 직전에만.
- git commit 하지 않는다.

## 완료 조건 (muse가 직접 실행)
1. `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0.
2. `cd mobile && grep -rn "requestAiConsent" --include='*.ts' --include='*.tsx' --exclude-dir=node_modules .` → `lib/aiConsent.ts`, `screens/QAScreen.tsx`, `screens/ChatScreen.tsx`, `screens/ReportScreen.tsx`(2곳), `screens/CompatReportScreen.tsx`(2곳), `screens/YearReportScreen.tsx`, `screens/JournalScreen.tsx`, `screens/SettingsScreen.tsx`.
3. `cd mobile && grep -c "aiConsent" lib/i18n/ko.ts lib/i18n/en.ts lib/i18n/es.ts` → 세 파일 모두 1 이상.

## 참고
- 비슷한 1회성 안내 카드: `components/NotificationPromptCard.tsx`.
- 오류+다시 시도 UI: `screens/ChatScreen.tsx:444`, `screens/QAScreen.tsx:410`, `screens/ReportScreen.tsx:985`, `screens/CompatReportScreen.tsx:285`.
- 처리방침의 OpenAI 항목(문구 근거): 루트 `lib/legalContent.ts` 영어 4항 — 읽기만, 수정 금지.
