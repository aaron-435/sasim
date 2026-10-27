# 크리에이터 시딩 키트 스페인어(중남미)판 (TODO 8)

작성: 2026-10-27. **초안이며 사용자가 확정한다.** 원본은 `marketing/seeding-kit.md`. DM 발송과 코드 전달은 사용자가 직접 한다. 원본과 같은 부분(선행 조건, 코드 전달 표, 성과 기록표, 자유 의견 원칙)은 원본을 그대로 따르고, 여기에는 **중남미 대상으로 달라지는 것과 스페인어 문구만** 둔다.

표기: `(추정)`은 근거 없는 추론, `(미확인)`은 확인 못 한 것.

## 원본과 같은 것 (원본 장 번호)

- 선행 조건: 코드 방식 승인(`CODES.md`), iOS 결제·안드로이드 프로덕션이 열리기 전에는 DM을 보내지 않는다, 시딩 상품은 심층 리포트(필요 시 신년 리포트), 궁합 리포트는 코드로 못 연다.
- 4장 자유 의견 원칙: 좋은 평가·별점·특정 문구·사전 대본을 요구하지 않는다. 부정적 의견도 환영. 댓글·좋아요 구매 금지. "정확/적중/예측" 표현이 있는 영상은 증폭하지 않는다(크리에이터에게 요구하지는 않음).
- 5장 코드 전달 표, 6장 성과 기록표. 라벨만 `seed_es01`, `seed_es02`…로 나눠 영어권과 섞이지 않게 한다. 링크는 `utm_campaign=seeding_es&utm_content=<라벨>`, 랜딩은 스페인어 경로 `https://www.fatesaidapp.com/es`(`WIKI.md` 2장).
- 브랜드 표기는 스토어 등록 이름과 같은 "Fate Said"(원본 DM의 "Fatesaid"는 확정 전 표기). 

## 1. 후보 선정에서 달라지는 것

| 항목 | 중남미 기준 | 비고 |
|---|---|---|
| 청중 | 멕시코·콜롬비아·아르헨티나·칠레·페루 등 중남미 스페인어 청중이 보이는 계정(댓글 언어, 자기소개의 나라) | 스페인(es-ES) 중심 계정은 뒤로. 앱 문구가 es-419라 말투가 다르다 |
| 말투 | 영상에서 tú로 말하는 계정 우선 | vos(아르헨티나·우루과이)를 쓰는 계정도 괜찮다. DM은 우리 기준대로 tú로 쓴다 |
| 팔로워·지표 | 원본과 같은 시작값(5천~10만, 최근 10개 중앙값 조회 ≥ 팔로워의 20%) | 중남미 단가는 영어권보다 낮을 수 있다 `(추정)`. 첫 3명 답장으로 보정 |
| 콘텐츠 톤 | 원본과 같다. "mala suerte", "maldición", "lo que viene será terrible"처럼 겁주는 계정 제외 | 압박 규칙 |

찾는 방법(사용자 실행): 틱톡·인스타 검색어 `astrología`, `tarot`, `carta astral`, `signos zodiacales`, `autoconocimiento`, `diseño humano`, `MBTI español`. 스페인어 사주 전문 크리에이터가 있으면 먼저 `(미확인: 있는지 찾지 않음)`.

## 2. 첫 DM 템플릿 (es)

원칙은 원본과 같다: 짧게, 무엇을 주는지와 조건을 첫 메시지에서 밝힌다. 칭찬 요구, 효과 보장, 크리에이터 취향 짐작 금지. 독자 성별 표지가 없게 썼다(크리에이터 성별을 모르므로 "encantado/a" 같은 말을 쓰지 않음).

**DM 1 (코드만 제공)**

> Hola, [nombre]. Soy [tu nombre] y hago Fate Said, una app que explica el saju coreano (un mapa de nacimiento basado en cuatro pilares) en español claro. Me gusta cómo hablas de [tema de un video reciente].
>
> Me gustaría regalarte un informe completo de la app, sin compromiso. Si lo pruebas y quieres hablar de él en un video, genial. Si no, no pasa nada. Lo que opines es tuyo, bueno o malo.
>
> Solo una cosa: si publicas algo sobre la app, tiene que llevar una etiqueta clara de "publicidad" o "producto gratis", porque te lo damos sin costo. Abajo van los detalles por si te interesa.
>
> ¿Te mando un código?

**DM 2 (영상 1건 대가 제안, 현금 포함)**

> Hola, [nombre]. Soy [tu nombre], de Fate Said, una app de saju coreano. Me encantaría pagarte [monto] USD por un video corto sobre la app, más un informe gratis para que lo pruebes antes.
>
> Tú decides cómo mostrarla y qué decir. Nunca te voy a pedir que digas algo que no piensas. El video necesita una etiqueta clara de colaboración pagada.
>
> Mi presupuesto es ajustado, así que dime tu tarifa si esto no te funciona.

**답장이 온 뒤 (코드 전달 메시지)**

> ¡Gracias! Aquí está tu código: [CÓDIGO]. En la app: Ajustes → "¿Tienes un código?" → ingrésalo. [방식이 확정되면 경로를 맞춘다] Desbloquea un informe a tu elección durante [30] días.
>
> Recordatorio: cualquier publicación que mencione la app debe llevar la etiqueta de publicidad o producto gratis. Sin guion, sin fecha límite, sin frases obligatorias.

메모: "Ajustes"는 앱 es 설정 화면 이름(`mobile/lib/i18n/es.ts` `settingsLabel`)이다. 코드 입력 메뉴는 아직 없어(원본 5장) 문구는 구현 때 앱 화면과 맞춘다. 웹 인증 코드 화면("¿Tienes un código de verificación?")과 헷갈리지 않는 이름이 필요하다.

**후속 (답이 없을 때, 1회만)**

> Hola, [nombre]. Solo te escribo una vez más para saber si te interesa. Si no es para ti, no hay problema. Gracias por tu tiempo.

보내지 않는 것: 반복 독촉, 이름 칸이 빈 단체 DM, "vistas garantizadas", "a tus seguidores les va a encantar".

## 3. 협찬 표기 안내 (es)

- 원본 3장의 요지(무료 제품도 표기, 영상 안 자막과 말로, 분명한 단어, 영상과 같은 언어, 플랫폼 브랜드 콘텐츠 설정 권장)는 미국 FTC 안내 기준이다. 중남미 크리에이터에게는 **각 나라 규정이 따로 있고 이 키트는 그것을 확인하지 않았다** `(미확인)`. 그래서 나라와 상관없이 같은 기준(영상 안에 분명한 표기)을 부탁한다.
- 스페인어 표기 단어: "publicidad", "anuncio", "patrocinado", "producto gratis". 해시태그를 쓰면 `#publicidad`. "colab"·"colaboración"만 쓰는 것은 모호하다고 안내한다.
- 이 키트는 법률 자문이 아니다.

**크리에이터에게 보내는 한 장 안내 (es)**

> **Nota sobre la publicidad (léela, por favor)**
> Recibiste este informe gratis (y/o un pago). Eso cuenta como una relación con la marca, así que cualquier publicación sobre Fate Said debe decirlo con claridad.
> - Ponlo dentro del video: texto en pantalla y una frase dicha, por ejemplo "Fate Said me regaló esta app" o "Publicidad: informe gratis de Fate Said".
> - Usa palabras claras: "publicidad", "patrocinado", "producto gratis". Evita usar solo "colab" o "colaboración".
> - Que se vea durante los primeros segundos, no solo en la descripción.
> - También puedes usar la etiqueta de colaboración pagada de la plataforma.
> - Esto no es asesoría legal; cada quien es responsable de lo que publica y de cómo lo indica.

## 4. 확인이 필요한 것 (사용자)

1. 원본 7장 1~4번(코드 방식, 현금 배분, 보내는 계정, 법률 검토)에 더해: 스페인어 시딩을 영어권 성과 뒤에 할지 동시에 할지. 원본은 "스페인어는 영어 성과 뒤"였다.
2. 스페인어 DM을 보낼 사람이 스페인어 답장을 읽고 답할 수 있는지(못 하면 번역 도구 사용을 전제로 짧은 답만).
3. 현금 금액은 USD로 적었다. 현지 통화로 제안할지.

## 점검

```bash
npx tsx scripts/check-es-text.mts marketing/es/seeding-kit.md
grep -inE "garantiz|cinco estrellas|reseña positiva|tienes que decir|testimonio" marketing/es/seeding-kit.md
grep -c -iE "publicidad|patrocinado|producto gratis" marketing/es/seeding-kit.md
```
