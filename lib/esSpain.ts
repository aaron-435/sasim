/**
 * lib/esSpain.ts
 * ------------------------------------------------------------------
 * es-419(중남미 중립, 2026-10-27) 기준에서 벗어난 스페인식 표지. 검사 스크립트가 경고로만 쓴다.
 * scripts/check-choice-scripts.mts(챗 고정 스크립트)와 scripts/check-es-text.mts(마케팅 글 등 md·txt)가 같이 쓴다.
 *
 * 현재완료는 끝난 일이면 단순과거로 쓰고(me has contado → me contaste), 지금까지 이어지는 뜻이면 남긴다.
 * 같은 문장에 이어짐 표지(todavía·aún·nunca·alguna vez·últimamente·con el tiempo·hasta ahora·siempre·ya)가
 * 있으면 경고하지 않고, 그 밖에 남긴 것은 ES_PERFECT_KEPT에 이유와 함께 적는다.
 * ------------------------------------------------------------------
 */

// JS의 \b는 á·ñ 같은 글자를 단어 밖으로 봐서("Pequeños"의 "os"가 걸림) 글자 경계를 직접 쓴다.
const ES_WORD = (body: string) => new RegExp(`(?<![a-záéíóúüñ])(?:${body})(?![a-záéíóúüñ])`, "i");
const ES_SPAIN_MARKERS: Array<[RegExp, string]> = [
  [ES_WORD("vale(?! la (?:pena|espera))"), "vale(→ de acuerdo·claro)"],
  [ES_WORD("vosotr[oa]s|vuestr[oa]s?|os"), "vosotros·os(→ ustedes)"],
  [ES_WORD("enfad[a-z]*|ordenador(?:es)?|móvil(?:es)?|coches?|conducir|pill(?:ar|ad[oa]|en|o|as?)|guay|cartera|listón(?:es)?"), "스페인 어휘(→ enojo·computadora·celular·auto·manejar·descubrir·billetera·estándar)"],
];
const ES_PRESENT_PERFECT = ES_WORD("(?:he|has|ha|hemos|han)\\s+[a-záéíóúñ]+(?:ad[oa]|[ií]d[oa]|to|cho|sto|erto|elto)s?");
const ES_CONTINUING = ES_WORD("todavía|aún|nunca|alguna vez|últimamente|con el tiempo|hasta ahora|siempre|ya");
/** 지금까지 이어지는 뜻이라 남긴 현재완료(이어짐 표지 없는 것만). 키는 문장 안 구절. */
const ES_PERFECT_KEPT: Record<string, string> = {
  "has mantenido": "module2 T13: 지금까지 꾸준히 지켜 온 것",
  "Has asumido": "module9: 지금도 맡고 있는 가족 안 역할",
  "has hecho en ese lugar": "module9 T13: 지금도 이어지는 가족 안 자리",
  "ha tenido sentido": "module9 T13: 지금까지 쌓인 의미",
  "se ha abierto": "module9: 벌어진 거리가 지금도 남아 있음(결과 상태)",
  "ha reconocido": "module9 T17: 지금까지 알아준 사람이 있는지(경험)",
  "han reconocido": "module9 T17: 지금까지 알아준 사람이 있는지(경험)",
  "has tenido ahí": "module9 T17: 지금도 이어지는 역할",
  "ha sido {g6}": "module9 틀: 지금까지의 가족 안 역할",
  "se ha repetido": "module6 gist: 지금까지 되풀이된 일",
  "se ha vuelto": "module3: 지금도 기준이 되어 있는 결과 상태",
  "Ha seguido sin": "module4: 지금까지 이어지는 상태",
  "se ha alejado": "gist '멀어진 기억': 지금 흐려져 있는 결과 상태",
  "se ha desdibujado": "module10: 지금 흐려져 있는 결과 상태",
  "Has pasado un tiempo probando": "module10: 지금까지 이것저것 해 보는 중",
  "no has hecho": "module5: 아직 하지 않은 일(지금까지)",
};

/** `text`에서 찾은 스페인식 표지마다 한 줄 설명. 없으면 빈 배열. */
export function findEsSpainMarkers(text: string): string[] {
  const out: string[] = [];
  for (const [re, kind] of ES_SPAIN_MARKERS) {
    const m = text.match(re);
    if (m) out.push(`스페인식 표지 ${kind} "${m[0]}"`);
  }
  for (const sentence of text.split(/(?<=[.?!])\s+/)) {
    const m = sentence.match(ES_PRESENT_PERFECT);
    if (!m || ES_CONTINUING.test(sentence)) continue;
    if (Object.keys(ES_PERFECT_KEPT).some((k) => sentence.includes(k))) continue;
    out.push(`현재완료 "${m[0]}"(끝난 일이면 단순과거로, 남기려면 ES_PERFECT_KEPT에 이유)`);
  }
  return out;
}
