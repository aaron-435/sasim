# ASO 스페인어(중남미) 등록정보 초안 (TODO 8)

작성: 2026-10-27. **2026-10-27 확정(사용자 위임으로 Claude가 검토·확정, TODO 9).** 원본은 `marketing/aso-en.md`. 직역이 아니라 중남미 사용자가 검색하고 읽을 말로 다시 썼다. 글자 수는 맨 아래 "글자 수 점검" 스크립트로 이 파일에서 직접 읽어 확인한다.

## 로케일

| 스토어 | 넣을 로케일 | 메모 |
|---|---|---|
| App Store Connect | Spanish (Mexico) `es-MX` | App Store에는 중남미 공통 스페인어 로케일이 없고 es-MX가 중남미 스토어 전체의 스페인어 기본으로 쓰인다(미확인: 국가별 대체 규칙은 콘솔 안내를 따른다). Spanish (Spain) `es-ES`에는 넣지 않는다 |
| Google Play Console | Spanish (Latin America) `es-419` | 앱 문구 기준(es-419)과 같다 |

## 지킨 규칙

- 영어판 규칙 그대로: 금융·송금 연상 단어 금지(iOS 2.3.1(a) 거절 이력). 스페인어로는 dinero, banco, pago, transferencia, moneda, billetera, cartera, efectivo, préstamo, invertir, precio, `$` 금액. 그래서 구독 관리 안내에 "pagos" 메뉴 이름을 쓰지 않았다. 돈 검사는 이름을 쓰지 않고 다른 주제만 나열했다. <!-- es-check: ignore (금지어 예시) -->
- 정확·예측류 금지: preciso, exacto, comprobado, predecir, adivinación. 계산은 "se calculan a partir de tu fecha de nacimiento"까지만.
- 압박 규칙, 후기·평점·수상 주장 없음, 유명인 이름 없음, 개인 특성 짐작 없음(제품이 주어). 면책 문단을 설명 끝에 둔다.
- es-419: tú, 단순과거, 중남미 어휘("calificado", "celular"), 독자 성별 표지 없음, sentence case. 용어는 `STYLE_GUIDE.md` 용어집(Cuatro Pilares, Maestro del Día, cinco elementos, mapa, Informe del año, conversación con IA).
- 등록 이름은 두 스토어 모두 "Fate Said"(영어판 확정 사항).

## 확인이 필요한 것 (사용자)

1. (확정) 키워드에 "carta natal"을 둔다. 앱 화면은 용어집대로 "mapa"를 쓰고, "carta natal"은 중남미 사용자가 실제로 치는 검색어라 키워드 칸에만 쓴다(제품 주장이 아님).
2. 스크린샷: 스페인어 화면 캡처가 아직 없다. 캡션만 준비했고 es 화면 캡처(앱 언어 es)는 따로 필요하다.
3. 법적 링크는 `?lang=es`를 붙였다. 스페인어 약관·개인정보처리방침 본문은 저장소에 있다(`lib/legalContent.ts` `es`). 배포 주소에서 스페인어로 열리는지 한 번 확인한다.
4. "What's New"는 다음 제출의 실제 변경에 맞춰 고친다.

---

## A. iOS (App Store Connect, es-MX)

### iOS 앱 이름 (limit 30)
```text
Fate Said: saju coreano
```
메모: 영어판의 "Self-Insight"를 이름에 넣으면 30자를 넘는다("autoconocimiento"가 16자). 부제로 옮겼다.

### iOS 부제 (limit 30)
```text
Autoconocimiento con 4 Pilares
```

### iOS 키워드 (limit 100)
```text
carta natal,horóscopo,personalidad,astrología,zodiaco,compatibilidad,elementos,maestro del día,signo
```
메모: 쉼표 뒤 공백 없음. 이름·부제에 있는 단어(saju, coreano, autoconocimiento, Pilares)는 넣지 않았다. 남의 상표 없음.

### iOS 프로모션 텍스트 (limit 170)
```text
Escribe tu fecha de nacimiento y descubre tu tipo de saju, el patrón de los Cuatro Pilares coreanos detrás de tu temperamento. Luego pregunta, haz un test o conversa.
```

### iOS 설명 (limit 4000)
```text
Fate Said convierte tu fecha de nacimiento en una imagen clara de tu saju (los Cuatro Pilares coreanos) y te ayuda a reflexionar sobre ella, paso a paso.

El saju es una forma coreana de leer a una persona, con siglos de historia, a través de cuatro pilares: año, mes, día y hora. Fate Said calcula tu mapa a partir de tus datos de nacimiento y te lo explica con palabras sencillas, sin tecnicismos.

PARA EMPEZAR, GRATIS
• Tu tipo de saju: uno de 50 tipos, a partir de tu fecha de nacimiento
• Tu mapa de los Cuatro Pilares y el equilibrio de los cinco elementos, explicado de forma simple
• Compatibilidad: mira cómo se encuentran los mapas de dos personas, con un nombre para la relación y lo que aporta cada quien
• Haz una pregunta: elige entre cientos de temas y recibe una respuesta pensada a partir de tu mapa
• Una lectura diaria con un breve resumen del ritmo de hoy
• Invita a alguien con un link y comparen sus mapas

PARA IR MÁS A FONDO
• Tests de autoconocimiento sobre temas como el amor y el apego, el agotamiento, la concentración, el sueño, la sensibilidad y la expresión personal
• Una conversación guiada que retoma tus respuestas del test, en cinco partes breves
• Un informe personal que pone tu mapa junto a lo que respondiste y dijiste, con un PDF para guardar
• Un informe del año con una línea de tiempo mes a mes y un plan paso a paso

FATE SAID PRO (suscripción opcional)
• Más preguntas al día
• Lecturas de hoy, de la semana, del mes y del año nuevo
• Encuentra buenos días para una entrevista, una primera cita, una mudanza o un nuevo comienzo
• Pregunta por una persona en particular con su fecha de nacimiento

Los informes también se pueden comprar de uno en uno, sin suscripción.

CÓMO LO VEMOS
Aquí no hay días malos ni parejas malas. Fate Said habla de ritmos: cuándo avanzar, cuándo ir con calma y por qué. Las lecturas se calculan a partir de tu fecha de nacimiento y se presentan como una herramienta para reflexionar. No son consejo médico, psicológico ni profesional, ni un diagnóstico. Si estás pasando por un momento difícil, busca a un profesional calificado o una línea de apoyo local.

PRIVACIDAD
No necesitas una cuenta. Tus resultados e informes se guardan en tu dispositivo. Para escribir tus respuestas, las preguntas que eliges y los datos de tu mapa se envían de forma segura a un servicio de IA. No vendemos tus datos personales.

Términos de la suscripción: Fate Said Pro se renueva automáticamente, salvo que la canceles al menos 24 horas antes de que termine el período actual. Puedes administrarla o cancelarla cuando quieras desde la configuración de tu Apple ID.

Términos de uso: https://www.fatesaidapp.com/terms?lang=es
Política de privacidad: https://www.fatesaidapp.com/privacy?lang=es
```
메모: "Términos de uso" 링크는 Apple 구독 앱 설명 요구 항목(3.1.2, 영어판 메모와 같음). "primera cita"는 STYLE_GUIDE가 경고한 "citas"(분석·인용) 오해가 아니라 실제 데이트 뜻이라 그대로 둔다. "Invita a alguien… y comparen"은 두 사람(ustedes)이 비교한다는 뜻.

### iOS 새로운 기능 What's New (limit 4000)
```text
Informes más fluidos y fáciles de leer, y un aspecto renovado en toda la app.
```

### iOS 스크린샷 캡션 (화면당 짧게, 각 limit 40으로 자체 제한)

| # | 화면 (영어판 표와 같은 순서) | 캡션 (글자 수) |
|---|---|---|
| 1 | 유형 공개 | Tu tipo de saju con solo tu cumpleaños (38) |
| 2 | 홈(오늘의 리듬) | El ritmo de hoy, en palabras sencillas (38) |
| 3 | 사주 차트 | Tu mapa de los Cuatro Pilares, explicado (40) |
| 4 | 심리검사 목록 | Tests de autoconocimiento, a tu ritmo (37) |
| (대기) | 심층 리포트 | Un informe hecho con tus respuestas (35) |

---

## B. Google Play (es-419)

### Play 앱 이름 (limit 30)
```text
Fate Said: saju coreano
```

### Play 간단한 설명 (limit 80)
```text
Tu tipo de saju coreano, el ritmo de cada día y tests de autoconocimiento.
```

### Play 자세한 설명 (limit 4000)
```text
Fate Said convierte tu fecha de nacimiento en una imagen clara de tu saju (los Cuatro Pilares coreanos) y te ayuda a reflexionar sobre ella, paso a paso.

El saju es una forma coreana de leer a una persona, con siglos de historia, a través de cuatro pilares: año, mes, día y hora. Fate Said calcula tu mapa a partir de tus datos de nacimiento y te lo explica con palabras sencillas, sin tecnicismos.

PARA EMPEZAR, GRATIS
• Tu tipo de saju: uno de 50 tipos, a partir de tu fecha de nacimiento
• Tu mapa de los Cuatro Pilares y el equilibrio de los cinco elementos, explicado de forma simple
• Compatibilidad: mira cómo se encuentran los mapas de dos personas, con un nombre para la relación y lo que aporta cada quien
• Haz una pregunta: elige entre cientos de temas y recibe una respuesta pensada a partir de tu mapa
• Una lectura diaria con un breve resumen del ritmo de hoy
• Invita a alguien con un link y comparen sus mapas

PARA IR MÁS A FONDO
• Tests de autoconocimiento sobre temas como el amor y el apego, el agotamiento, la concentración, el sueño, la sensibilidad y la expresión personal
• Una conversación guiada que retoma tus respuestas del test, en cinco partes breves
• Un informe personal que pone tu mapa junto a lo que respondiste y dijiste, con un PDF para guardar
• Un informe del año con una línea de tiempo mes a mes y un plan paso a paso

FATE SAID PRO (suscripción opcional)
• Más preguntas al día
• Lecturas de hoy, de la semana, del mes y del año nuevo
• Encuentra buenos días para una entrevista, una primera cita, una mudanza o un nuevo comienzo
• Pregunta por una persona en particular con su fecha de nacimiento

Los informes también se pueden comprar de uno en uno, sin suscripción.

CÓMO LO VEMOS
Aquí no hay días malos ni parejas malas. Fate Said habla de ritmos: cuándo avanzar, cuándo ir con calma y por qué. Las lecturas se calculan a partir de tu fecha de nacimiento y se presentan como una herramienta para reflexionar. No son consejo médico, psicológico ni profesional, ni un diagnóstico. Si estás pasando por un momento difícil, busca a un profesional calificado o una línea de apoyo local.

PRIVACIDAD
No necesitas una cuenta. Tus resultados e informes se guardan en tu dispositivo. Para escribir tus respuestas, las preguntas que eliges y los datos de tu mapa se envían de forma segura a un servicio de IA. No vendemos tus datos personales.

Fate Said Pro se renueva automáticamente hasta que la canceles. Puedes administrarla o cancelarla cuando quieras desde tus suscripciones de Google Play.

Términos de uso: https://www.fatesaidapp.com/terms?lang=es
Política de privacidad: https://www.fatesaidapp.com/privacy?lang=es
```
메모: Play는 키워드 칸이 없어 제목·설명 본문 단어로 검색된다. saju, Cuatro Pilares, mapa, compatibilidad, lectura diaria가 자연스럽게 반복되게 썼다(키워드 나열 금지 정책 때문에 억지 반복 없음). "carta natal"은 Play 본문에 넣지 않았다(앱 용어 "mapa"와 섞이면 혼란).

### Play 스크린샷·그래픽
그래픽(피처 그래픽·아이콘)은 영어판 파일을 그대로 쓸 수 있다(글자가 없는 경우). 휴대폰 스크린샷 캡션은 위 iOS 표를 재사용한다.

---

## 글자 수 점검

아래 스크립트가 이 파일의 `### 제목 (limit N)` 바로 아래 ```text 블록을 읽어 글자 수와 금지 단어를 확인한다. 캡션 표는 마지막에 따로 센다.

```bash
python3 - <<'PY'
import re
t=open("marketing/es/aso.md",encoding="utf-8").read()
ban=r"(?<![a-záéíóúñ])(dinero|banco|bancari\w*|pagos?|transferencia\w*|moneda\w*|billetera|cartera|efectivo|préstamo\w*|invert\w*|inversi\w*|precios?|precis\w*|exact\w*|comprobad\w*|predec\w*|predic\w*|adivina\w*|MBTI|Co-Star)(?![a-záéíóúñ])|\$\d"  # es-check: ignore (금지어 목록)
bad=0
for m in re.finditer(r"### ([^\n]+?) \(limit (\d+)\)\n```text\n(.*?)\n```",t,re.S):
    name,lim,body=m.group(1),int(m.group(2)),m.group(3)
    n=len(body); hit=re.findall(ban,body,re.I)
    ok = n<=lim and not hit
    bad+= (not ok)
    print(("OK  " if ok else "FAIL"),f"{n:>4}/{lim}",name,hit or "")
for cap,shown in re.findall(r"^\| (?:\d|\(대기\)) \| [^|]+ \| (.+?) \((\d+)\) \|$",t,re.M):
    ok = len(cap)<=40 and len(cap)==int(shown) and not re.search(ban,cap,re.I)
    bad+= (not ok)
    print(("OK  " if ok else "FAIL"),f"{len(cap):>4}/40","caption",cap)
print("FAIL count",bad)
PY
```
