# Localization style guide

Every language we ship (ko, en, es — more later) follows this guide, for **UI strings**
(`lib/i18n/*.ts`), **static content** (`*Content.ts`, quiz modules, question bank) and **GPT output**
(the per-locale block in `lib/promptLocale.ts`, `LOCALE_STYLE`). When you add a language, add a section
below, a `LOCALE_STYLE` entry, and run a native-reader pass with the persona test mode (`dev/README.md`).

## Universal rules (all languages)

1. **Write it natively, don't translate it.** Korean idioms, Korean sentence rhythm and Korean
   cultural references ("눈치", "체면", "화병") are re-expressed as what a reader in that language
   would actually say. If a sentence reads like a translation, rewrite the sentence.
2. **One register.** Pick the language's warm-but-respectful "you" and never switch inside a screen or
   a report. The brand voice is a warm counselor: close, calm, never cold, never cute.
3. **Gender-neutral about the reader.** We never know the reader's gender. Don't use words that mark it
   (adjectives/participles, "mismo/a", "solo/a", "she/he"). Rephrase with a noun or a verb. For the *other*
   person in compatibility, use their stated gender, or "that person" when it is unknown.
4. **No leftovers.** No Korean, hanja or romanized Korean in running text unless it's a deliberate,
   explained term (see glossary). No English words inside non-English text except product names.
5. **Fixed glossary.** The same concept has the same words everywhere (UI, content, GPT output). Add new
   terms here first.
6. **Titles and headings in sentence case** (only the first word capitalized) unless the language's own
   convention differs. No English-style Title Case in es.
7. **Numbers, dates and money follow the locale**, never Korean order (YYYY.MM.DD).
8. **Not frightening.** Same product rules as PRODUCT.md: no fake urgency, no health/death/accident
   predictions, no flat negative predictions. Wording is "a day to pace yourself", not "a bad day".
9. **Unambiguous words.** Avoid a word that has a very common other meaning in that language
   (e.g. es "citas" = dates, "consejería" = a government department).
10. **Regional neutrality.** Use vocabulary that reads naturally across the language's main regions;
    avoid slang and regionalisms.

## Glossary

| Concept | ko | en | es |
| --- | --- | --- | --- |
| Four Pillars / saju | 사주 | Four Pillars (saju) | Cuatro Pilares (saju) |
| Day Master (일간) | 일간 | Day Master | Maestro del Día |
| Five elements | 오행 | Five Elements | cinco elementos (lowercase in running text; "Fuego/Agua…" capitalized only as labels) |
| Elements | 목화토금수 | Wood, Fire, Earth, Metal, Water | Madera, Fuego, Tierra, Metal, Agua |
| Decade fortune (대운) | 대운 | 10-year cycle ("Great Fortune" only when explained) | ciclo de diez años |
| Year fortune (세운) | 세운 | year energy | energía del año |
| Heavenly stem / Earthly branch | 천간 / 지지 | Heavenly Stem / Earthly Branch | tronco celeste / rama terrestre |
| Twelve life stages (12운성) | 12운성 | twelve life stages | doce etapas de vida |
| Deep report | 심층 리포트 | Deep Report | Informe profundo |
| Year-ahead report | 신년 리포트 | Year-Ahead Report | Informe del año |
| AI counseling chat | AI 상담 | AI counseling | conversación con IA |
| Chart (the whole saju reading) | 사주 | chart | mapa (de saju) — not "carta" |
| Manseryeok | 만세력 | Korean perpetual calendar (manseryeok) | calendario perpetuo coreano (manseryeok) |

Type names (the 50 saju types) are labels shown next to the reader's own name: choose wording that can't
be mistaken for a first name (es: use a noun phrase, not a bare "Rocío").

## Spanish (es) — neutral Spanish for Latin America and Spain

- **Register: tú.** Never "usted", never "vos"/"vosotros". Imperatives are tú forms ("respira", "espera").
- **Gender-neutral reader:** no "agotado/a", "cansado/a", "solo/a", "yo mismo/a", "contento/a".
  Use nouns/verbs: "estás sin energía", "sientes cansancio", "por tu cuenta", "Sobre ti".
- **Regional neutrality:** avoid "coger", "ahorita", "chévere", "regañar", "tomar la delantera",
  "guay", "vale" (use "de acuerdo"/"claro"), "plata"/"pasta" (use "dinero").
- **Dates:** DD/MM/AAAA in input placeholders, long dates as "20 de septiembre de 2026". 24-hour time.
- **Money/percent:** prices come from the store's localized `priceString`, never hard-coded in static copy. Percent is written **"13%"** (no space) everywhere.
- **Punctuation:** always ¿…? and ¡…!. Use "y", never "&".
- **Headings:** sentence case ("Un año para avanzar", not "Un Año Para Avanzar").
- **No calques:** "cómo huelo el dinero", "un ritmo de guiar", "punto muerto" (for a life stage),
  "análisis de citas" — say what a Spanish speaker would say.
- **Avoid ambiguous words:** "citas" → "citas textuales"/"frases"; "consejería" → "acompañamiento"/"orientación";
  "ejecución" (implies execution/punishment) → "constancia"/"llevar a cabo".
- **Modules:** "Módulo 3 · Agotamiento" — the module name is the same word everywhere.

## English (en)

- Register: second person, contractions allowed ("you're"). Sentence case headings.
- Dates as "Sep 20, 2026" or MM/DD/YYYY in inputs. Money as "$14.99".
- Avoid astrology-jargon leaks that aren't in the glossary. Keep "Day Master" (readers in this niche know it).

## Korean (ko)

- Register: 해요체 in UI and content ("~예요"), 합니다체 for formal legal text and report titles where existing
  copy already uses it. Don't mix inside one screen.
