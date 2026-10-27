# Guiones en español (es-419): 7

작성: 2026-10-27(TODO 7). **2026-10-27 확정(사용자 위임으로 Claude가 검토·확정, TODO 9).** 원본은 `marketing/tts-samples/scripts.json`의 영어 대본 7개(B1·C7·A3·C5·C1·A3x·A1x)다. 이번엔 글만 만들고 스페인어 TTS·녹화는 하지 않는다(SPEC 제외 범위).

규칙: `hooks.md` 머리말과 같다(tú, 단순과거, 중남미 어휘, 독자 성별 표지 금지, 정확·예측·진단 표현 금지). 화면에 나오는 이름(결과 제목, 모듈 부제, 절기 이름, 일간 이름)은 앱 es 문구를 그대로 읽는다. 출처:

- 번아웃 결과 제목: `mobile/lib/quiz/module3Burnout.ts` es (`baseline` "Ritmo propio", 최고점 "Agotamiento completo")
- 애착 결과 제목: `mobile/lib/quiz/module1Attachment.ts` es (Apego seguro, Apego ansioso, Apego evitativo, Apego temeroso-evitativo)
- 모듈 부제: `mobile/lib/quiz/modules.ts` es
- 절기 이름: `mobile/lib/elementColorContent.ts` es (`lidong` "Inicio del invierno")
- 일간 이름: 앱 es 문구의 "Madera yang"

공통: 마지막 문장은 공개 전 소재면 "La tarjeta gratis está en el link de mi bio."(웹), 앱 화면 소재면 "La app está en el link de mi bio." 둘 다 스토어 공개 뒤 게시. AI 음성을 쓰면 설명란에 `Voz en off generada con IA.`

| es | 영어 원본 키 | 형식 |
|---|---|---|
| Guion B1 | B1 | 유형 카드(웹) |
| Guion C7 | C7 | 10~15초형(웹) |
| Guion A3 | A3 | 심리 주제(앱) |
| Guion C5 | C5 | 날짜 뉴스형(앱) |
| Guion C1 | C1 | 연재(웹) |
| Guion A3x | A3x | 비교형(앱, mobile-web 녹화) |
| Guion A1x | A1x | 비교형(앱, mobile-web 녹화) |

### Guion B1 · tarjeta de tipo

> Esta herramienta gratis convierte una fecha de nacimiento en uno de los cincuenta tipos de saju. Escribe una fecha de nacimiento. La tarjeta nombra el tipo en dos partes: la primera viene del Maestro del Día y la segunda, de lo que más pesa en el mapa. La tarjeta gratis está en el link de mi bio.

- 영어: "This free tool turns one birth date into one of fifty saju types. … two words: the first comes from the Day Master, the second from what's strongest in the chart. …"
- 메모: 스페인어 유형 이름은 "El roble" 같은 명사구라 영어처럼 "두 단어"가 아닐 수 있어 "dos partes"로 했다. 녹화 전 `?lang=es` 카드에 실제로 두 부분이 보이는지 확인한다(미확인). "what's strongest"는 "lo que más pesa"로 풀었다(직역 "lo más fuerte"는 힘의 우열처럼 들림).

### Guion C7 · fecha adentro, tarjeta afuera

> Entra una fecha de nacimiento, sale una tarjeta de tipo. Escribe una fecha de nacimiento. La tarjeta muestra el nombre del tipo y lo que lo mueve ahora mismo. La tarjeta gratis está en el link de mi bio.

- 영어: "Birth date in, type card out. Type a birth date. The card shows the type name and what's driving it right now. …"
- 메모: "what's driving it"는 "lo que lo mueve". 15초 안팎 형식이라 문장을 늘리지 않았다.

### Guion A3 · agotamiento laboral en tres partes

> Falta de energía, cinismo, poca eficacia: así divide en tres partes un test de agotamiento laboral. Son treinta preguntas, cada una sobre una situación breve del día a día. El resultado es un nombre de tipo con un resumen de una línea. Después sigue una conversación con IA. Es una herramienta de autoconocimiento, no es consejo médico ni psicológico. La app está en el link de mi bio.

- 영어: "Exhaustion, cynicism, reduced efficacy: how a burnout test breaks it into three parts. The test is thirty questions… Then an AI conversation follows up. It's a self-reflection tool, not medical or psychological advice. …"
- 메모: 세 차원은 앱 es 부제("Falta de energía / Cinismo / Poca eficacia")를 그대로 읽는다. "burnout"은 앱 모듈 이름 "Agotamiento"에 맞춰 "agotamiento laboral". 용어집의 AI 상담 = "conversación con IA".

### Guion C5 · término solar

> El 7 de noviembre empieza un nuevo término solar. Se llama Inicio del invierno. En el saju, el mes cambia con cada término solar, no el primer día del mes del calendario. El calendario de la app marca estas fechas. La app está en el link de mi bio.

- 영어: "A new solar term starts on November 7. It's called Lidong, the start of winter. In saju, the month changes at solar terms… The app's calendar marks these dates. …"
- 메모: 영어판의 로마자 "Lidong"은 빼고 앱 es 절기 이름 "Inicio del invierno"만 쓴다(STYLE_GUIDE 규칙 4: 로마자 표기를 본문에 남기지 않음). 날짜는 입동 2026-11-07 09:51 UTC(`video-kit.md` 10장 메모)라 중남미 시간대에서도 같은 날이다. 다른 절기로 바꾸면 같은 함수로 날짜를 다시 뽑는다.

### Guion C1 · Maestro del Día, parte 1

> Tipos de Maestro del Día, parte uno de diez: Madera yang. En el saju, la Madera yang suele representarse como un árbol alto. La tarjeta de la app para este Maestro del Día trae un nombre de tipo, un resumen de una línea y una barra de los cinco elementos. La tarjeta gratis está en el link de mi bio.

- 영어: "Day Master types, part one of ten: Yang Wood. In saju, Yang Wood is often pictured as a tall tree. …"
- 메모: 앱 es 문구가 "Madera yang"(소문자 yang)이라 그대로 쓴다. 이 일간의 es 유형 이름은 "El roble"(`lib/sajuTypeContent.ts`)이라 "árbol alto"와 화면이 맞는다.

### Guion A3x · la opción más baja y la más alta

> Respondí un test de agotamiento laboral con la opción más baja cada vez y luego con la más alta. Dos resultados distintos. Uno dice Ritmo propio. El otro dice Agotamiento completo. Son respuestas de ejemplo. Es una herramienta de autoconocimiento, no es consejo médico ni psicológico. La app está en el link de mi bio.

- 영어: "I answered a burnout test with the lowest option every time, then the highest. … One says Steady Pace. The other says Full Burnout. These are sample answers. …"
- 메모: 결과 이름은 지금 앱 es 제목이다. 영어 원본의 "Full Burnout"은 TODO 1에서 앱 제목이 "Running on Empty"로 바뀌어 영어 대본·영상이 옛 이름이다(`TODO.md` 발견 사항). 스페인어판은 처음부터 새 기준이다. "Son respuestas de ejemplo"는 화면 배지와 같은 뜻으로 자막에도 넣는다.

### Guion A1x · cuatro formas de responder

> El mismo test de apego, cuatro formas de responder. Primero, la opción más baja cada vez. Segundo, respuestas altas en la primera mitad y bajas en el resto. Tercero, respuestas bajas en la primera mitad y altas en el resto. Cuarto, la opción más alta cada vez. Cuatro resultados distintos: Apego seguro, Apego ansioso, Apego evitativo y Apego temeroso-evitativo. Cada resultado es una etiqueta de patrón con un resumen de una línea. Son respuestas de ejemplo. Es una herramienta de autoconocimiento, no es consejo médico ni psicológico. La app está en el link de mi bio.

- 영어: "Same attachment test, four ways of answering. First, the lowest option every time. Second, high on the first half, low on the rest. … Secure, Anxious-Preoccupied, Dismissive-Avoidant, and Fearful-Avoidant. …"
- 메모: "high on the first half"를 사람을 꾸미는 "alto"로 옮기면 독자 성별 표지처럼 읽혀서 "respuestas altas"로 답을 꾸몄다. 결과 제목은 앱 es 문구. 각 결과의 한 줄(hook)은 TODO 2에서 "Tus respuestas de esta vez sugieren…" 꼴로 바뀌었으므로 화면에 그 문장이 보이는 상태로 녹화한다.

## 점검

```bash
npx tsx scripts/check-es-text.mts marketing/es/hooks.md marketing/es/scripts.md
grep -c "^### Guion" marketing/es/scripts.md
```
