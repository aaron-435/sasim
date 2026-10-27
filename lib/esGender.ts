/**
 * lib/esGender.ts
 * ------------------------------------------------------------------
 * Spanish words that mark the reader's gender. We don't know it, so Spanish text addressed to the reader
 * stays gender-neutral ("te falta energía", not "estás agotada").
 *
 * - ES_GENDERED_READER: the list the report gate has used since 2026-10-03 (moved here unchanged from
 *   lib/reportQuality.ts, which still uses only this one).
 * - ES_GENDERED_READER_CHAT: extra forms the fixed chat scripts turned up (2026-10-27): reflexive "ti mismo"
 *   and an adjective right after estar/sentirse/quedarse ("estar callado", "me quedo quieto"). Kept apart so
 *   the tuned report gate doesn't change; the script lint and chat replies check both.
 * ------------------------------------------------------------------
 */

export const ES_GENDERED_READER =
  /(?<!\b(?:he|has|ha|hemos|han|había|habías|habrás|apego)\s)\b(atrapad|agotad|cansad|abrumad|sobrecargad|desbordad|preocupad|ansios|estresad|frustrad|aislad|agobiad|vaciad|quemad|inquiet|conectad|desconectad|bloquead|desorientad|saturad|exhaust|sobrepasad|expuest|pegad|protegid)[ao]s?\b/i;

export const ES_GENDERED_READER_CHAT =
  /\b(?:ti|mí) mism[oa]s?\b|\b(?:estar|estás|estoy|estarás|estabas|estaba|sentirte|sentirme|te sientes|me siento|te sentiste|me sentí|quedarte|quedarme|te quedas|me quedo|hacerte|hacerme|eres|soy)\s+(?:muy |más |tan |algo |un poco )?(?:callad|quiet|despreciad|tranquil|sol|list|content|perdid|invitad|adult|nervios|ocupad|enfadad|enojad|hart|rechazad|ignorad|juzgad|querid|acompañad|apoyad|motivad|aburrid|confundid|atent|dispuest|obligad)[oa]s?\b/i;

/** The first reader-gender marker in `text` (report list first), or null. */
export function matchEsGenderedReader(text: string): string | null {
  return (text.match(ES_GENDERED_READER) ?? text.match(ES_GENDERED_READER_CHAT))?.[0] ?? null;
}

// Quoted spans are skipped: a chat reply that quotes the user's own words ("me siento agotada") or a quiz
// answer is repeating them, not guessing the reader's gender.
const QUOTED_SPAN = /"[^"]*"|“[^”]*”|«[^»]*»|‘[^’]*’/g;

/** The first reader-gender marker in chat reply lines, ignoring quoted spans, or null. */
export function matchEsGenderedReaderInReply(lines: string[]): string | null {
  for (const line of lines) {
    const hit = matchEsGenderedReader(line.replace(QUOTED_SPAN, " "));
    if (hit) return hit;
  }
  return null;
}
