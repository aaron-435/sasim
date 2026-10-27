# Ganchos en español (es-419): 24 = B 8 + A 8 + C 8

작성: 2026-10-27(TODO 7). **2026-10-27 확정(사용자 위임으로 Claude가 검토·확정, TODO 9).** 원본은 `marketing/video-kit.md` 9장(B·A형)과 10장(C형)이다. 직역이 아니라 중남미 시청자가 실제로 말할 문장으로 다시 썼고, 번호는 영어판과 같다(B1 ↔ B1).

규칙은 영어 키트와 같다(`video-kit.md` 1장 규칙, 9장 A형 추가 규칙, 10장 형식 규칙). 여기에 es-419 기준(`mobile/lib/i18n/STYLE_GUIDE.md`)을 더한다.

- 화법은 tú. 다만 훅은 보는 사람을 주어로 두지 않으므로 대부분 tú가 나오지 않는다. A형은 영어판처럼 tú·tu·te로 시작하거나 보는 사람의 감정·관계를 단정하지 않는다.
- 끝난 일은 단순과거(escribí, salió). 현재완료(he escrito)는 쓰지 않는다. <!-- es-check: ignore (금지 예시) -->
- vale·vosotros·os, 스페인 어휘(móvil, ordenador, enfadarse) 금지. 독자 성별 표지(agotado/a, cansado/a, solo/a) 금지. <!-- es-check: ignore (금지 예시) -->
- 정확·예측류 금지: preciso, exacto, acierta, predice, garantizado, suerte, destino. 진단류 금지: diagnóstico, trastorno, terapia, tratamiento, cura.
- 용어는 앱 화면과 같게: 사주는 "saju"(설명이 필요하면 "los Cuatro Pilares"), 일간 "Maestro del Día", 오행 "cinco elementos", 모듈 부제는 `mobile/lib/quiz/modules.ts` es 문구 그대로. 화면에 나오지 않는 말로 차원 이름을 바꾸지 않는다.
- 수치는 제품 사실만(50 tipos, 10 Maestros del Día, 30 preguntas, 25 turnos).
- 스페인어 문장 첫 글자만 대문자(sentence case).

## B형: tarjeta de tipo (화면: 웹 랜딩·계산기, `?lang=es`)

| # | Gancho (subtítulo = voz) | 영어 원문 | 현지화 메모 |
|---|---|---|---|
| B1 | Esta herramienta gratis convierte una fecha de nacimiento en uno de los 50 tipos de saju. | This free tool turns one birth date into one of 50 saju types. | "gratis"가 "gratuita"보다 말투에 가깝다 |
| B2 | Así se ve una tarjeta de tipo saju. | This is what a saju type card looks like. | "Así se ve…"가 중남미 숏폼에서 흔한 도입 |
| B3 | En el saju existe algo llamado Maestro del Día. Esta app lo encuentra con tu cumpleaños. | Saju has something called a Day Master. This app finds it from a birthday. | 용어집의 "Maestro del Día". 여기 "tu"는 기능 설명이라 성격 짐작이 아니다 |
| B4 | Diez Maestros del Día, cincuenta tipos de saju. Así es como un cumpleaños cae en uno. | Ten Day Masters, fifty saju types. Here's how a birthday lands on one. | - |
| B5 | Escribí tres cumpleaños en una app coreana de saju. Estas son las tarjetas. | I typed three birthdays into a Korean saju app. Here are the cards. | 단순과거 "Escribí" |
| B6 | Dos fechas de nacimiento entran, sale un nombre para la relación. Así funciona la compatibilidad en el saju. | Two birth dates in, one relationship name out. A look at saju compatibility. | - |
| B7 | Adivina el tipo de saju a partir de una fecha y luego mira la tarjeta. | Guess the saju type from a birth date, then see the card. | 명령형은 tú(adivina, mira) |
| B8 | Tres cumpleaños, tres corazonadas. ¿Qué tarjeta eligió la app? | Three birthdays, three guesses. Which card did the app pick? | "apuestas"(내기)는 운세 앱에서 도박 연상이 있어 검토 때 "corazonadas"(감)로 바꿨다 |

B7·B8 대본 요지는 영어판과 같다. "acerté / fallé"는 내 추측에 대한 말이고 앱의 정확도 주장이 아니다. 카드의 유명인 이름은 가린다.

## A형: tema psicológico (화면: 앱, 공개 뒤 게시)

| # | Gancho (subtítulo = voz) | 모듈 | 영어 원문 | 현지화 메모 |
|---|---|---|---|---|
| A1 | ¿Apego ansioso o evitativo? Así lo ordena un test de 30 preguntas. | 1 Amor y apego | Anxious or avoidant? Here's how a 30-question attachment test sorts it. | 영어처럼 형용사만 쓰면 사람을 꾸미는 남성형이 되어 독자 성별 표지가 된다. 앱 부제("apego ansioso y evitativo")처럼 "apego"를 꾸미게 했다 |
| A2 | Un test de apego y un mapa de saju en una sola app. Así se ve el resultado. | 1 Amor y apego | An attachment test and a saju chart, in one app. Here's what the result looks like. | 용어집: chart = "mapa", "carta" 아님 |
| A3 | Falta de energía, cinismo, poca eficacia: así divide en tres partes un test de agotamiento laboral. | 3 Agotamiento | Exhaustion, cynicism, low energy: how a burnout test breaks it into three parts. | 앱 es 부제 그대로. "burnout"보다 "agotamiento laboral"이 앱 모듈 이름과 맞는다 |
| A4 | El test de la máscara: cuidado de la imagen, ocultamiento, cansancio social. Esta es la pantalla de resultado. | 4 La máscara | The mask test: image management, concealment, social fatigue. Here's the result screen. | 앱 es 부제 그대로 |
| A5 | Sobreestimulación, sensibilidad estética, umbral sensorial bajo: un test de sensibilidad en 30 preguntas. | 7 Sensibilidad | Overstimulation, aesthetic sensitivity, a low sensory threshold: a sensitivity test, in 30 questions. | - |
| A6 | Mente activa, cuerpo en tensión, sueños inquietos: así los ordena un test de sueño. | 8 Sueño | Racing mind, tense body, restless dreams: how a sleep test sorts them. | 앱 es 부제 그대로. "inquietos"는 꿈(sueños)을 꾸미는 말이라 독자 성별과 무관해서 검사 예외로 둔다 <!-- es-check: ignore (sueños inquietos = 앱 부제) --> |
| A7 | Distracción, hiperfoco, impulsividad: un test de concentración que termina en una conversación de 25 turnos. | 10 Concentración | Distractibility, hyperfocus, impulsivity: a focus test that ends in a 25-turn conversation. | - |
| A8 | Un test sobre la familia de origen y luego una conversación que pregunta por ella. Así es el recorrido. | 9 Familia de origen | A family-of-origin test, then a conversation that asks about it. Here's how it flows. | - |

A형 사용 메모(영어판 9장과 같음): 결과 화면에서 읽는 것은 앱에 실제 뜬 유형 이름과 한 줄만. 대화 장면은 앱이 묻는 질문을 보여 주고, 가상 답이면 화면에 "Respuestas de ejemplo"를 표시한다. 위기·자해 관련 화면은 찍지 않는다. 캡션 설명 줄은 "Herramienta de autoconocimiento, no es consejo médico ni psicológico."

## C형: estructura (10장 형식 규칙 그대로)

| # | Gancho (subtítulo = voz) | 구조 | 영어 원문 | 현지화 메모 |
|---|---|---|---|---|
| C1 | Tipos de Maestro del Día, parte 1 de 10: el primero de la tarjeta. | 연재 | Day Master types, part 1 of 10: the first one on the card. | - |
| C2 | Una tarjeta de tipo saju trae tres cosas: un nombre, un resumen de una línea y una barra de los cinco elementos. | 목록형 | A saju type card lists three things: a name, a one-line summary, and a five-element bar. | "trae"가 "enumera"보다 구어 |
| C3 | La misma app, dos módulos, dos pantallas de resultado. | 비교형 | Same app, two modules, two result screens. | - |
| C4 | Cómo leer la barra de los cinco elementos en un mapa de saju. | 튜토리얼형 | How to read the five-element bar on a saju chart. | "mapa" |
| C5 | El 7 de noviembre empieza un nuevo término solar. Esto es lo que marca el calendario de la app. | 날짜 뉴스형 | A new solar term starts on {date}. Here's what the app's calendar marks. | 날짜는 스페인어 순서(día de mes). 11-07 09:51 UTC는 중남미 시간대(UTC−3~−6)에서도 같은 날 |
| C6 | Un repaso del año en cinco tarjetas se abre en la app el 1 de diciembre. | 날짜 뉴스형 | A five-card year in review opens in the app on December 1. | Wrapped는 화면 이름이 영어면 그대로 보이게 두고 말로만 "repaso del año" |
| C7 | Entra una fecha de nacimiento, sale una tarjeta de tipo. | 10~15초형 | Birth date in, type card out. | - |
| C8 | La pantalla de resultado de un test de apego, en quince segundos. | 15초형 | An attachment test result screen, in fifteen seconds. | - |

## 캡션 틀 (es)

```text
{gancho, igual al subtítulo}
Tarjeta de tipo saju gratis a partir de una fecha de nacimiento: link en la bio.
Herramienta de autoconocimiento, no es consejo médico ni psicológico.
#saju #sajucoreano #cuatropilares #astrologia #autoconocimiento
```

- AI 음성이면 설명란에 `Voz en off generada con IA.` 한 줄(영어판 5장과 같은 규칙).
- 해시태그는 후보다. 중남미에서 어떤 태그가 노출이 큰지는 확인하지 못했다(직접 검색 필요, 미확인).
- 프로필 링크는 영어판 4장 UTM에 `&lang=es`를 붙인다. 예: `https://www.fatesaidapp.com/es?utm_source=tiktok&utm_medium=organic&utm_campaign=shortform_es`(웹은 `/es` 접두 경로, `WIKI.md` 2장). 링크는 미리 한 번 열어 스페인어 랜딩이 뜨는지 확인한다.
- 댓글 유도는 생년월일을 달라고 하지 않는다. 예: "¿Qué elemento es el más grande en tu mapa?"

## 점검 스크립트 (금지어 + 개수)

```bash
python3 - <<'EOF'
import re
rows = [l for l in open("marketing/es/hooks.md") if re.match(r"^\| [ABC][1-8] \|", l)]
banned = r"precis|exact|acert|acierta|predic|pronóstic|garantiz|suerte|destino|fortuna|dinero|banco|pago|cartera|invert|diagnós|trastorno|terapia|tratamiento|cura|sana|cuenta regresiva|última oportunidad|solo hoy|precio|\$"  # es-check: ignore (금지어 목록)
print(len(rows), "hooks")
for l in rows:
    k, h = l.split("|")[1].strip(), l.split("|")[2].strip()
    m = re.search(banned, h, re.I)
    a_you = k.startswith("A") and re.search(r"(?<![a-záéíóúñ])(tú|tu|te|ti)(?![a-záéíóúñ])", h, re.I)
    print(k, "FAIL "+m.group(0) if m else ("FAIL tú en A" if a_you else "ok"), len(h))
EOF
```
