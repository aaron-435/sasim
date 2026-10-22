/**
 * scripts/check-choice-scripts.mts
 * ------------------------------------------------------------------
 * 고정 스크립트(flowVersion 4) 문구 데이터 린트. OpenAI를 쓰지 않는다.
 *
 *   npx tsx scripts/check-choice-scripts.mts [module5 module6 ...]
 *   LOCALE=en|es npx tsx scripts/check-choice-scripts.mts   (영어·스페인어: 길이 기준과 금지어를 언어에 맞춰 바꾼다)
 *
 * 인자가 없으면 스크립트가 있는 모든 모듈을 검사한다. 오류가 있으면 종료 코드 1.
 * 검사: 턴 구성(1~8, 10~21), 인용 턴 위치, 질문 물음표 1개, 보기 2~3개·24자·중복,
 * 21턴 보기 없음, 반응 15~40자·물음표 없음, gist 비어 있지 않음(필수 턴),
 * 템플릿 {gN} 참조 유효성, 금지어(위로 공식·조언·예측), 위기 문구,
 * 이웃 턴 반응의 "~네요/~군요" 연속, 같은 질문 반응의 문자 유사도(바꿔치기 의심),
 * 모듈 안 반응 중복. 끝맺음 반복은 경고로만 센다.
 * ------------------------------------------------------------------
 */

import { getModuleScript } from "../lib/choiceScripts/index.ts";
import type { ModuleScript, ScriptOption } from "../lib/choiceScripts/types.ts";

const ALL_MODULE_IDS = Array.from({ length: 12 }, (_, i) => `module${i + 1}`);
const CHOICE_TURNS = [...Array.from({ length: 8 }, (_, i) => i + 1), ...Array.from({ length: 12 }, (_, i) => i + 10)];
const QUOTE_TURNS = [1, 5, 10, 14, 18];
const GIST_REQUIRED_TURNS = [2, 4, 6, 8, 11, 13, 15, 17, 19];
const LOCALE = process.env.LOCALE ?? "ko";
const IS_KO = LOCALE === "ko";
const MAX_OPTION_LEN = IS_KO ? 24 : 44;
const REACTION_MIN = IS_KO ? 15 : 20;
const REACTION_MAX = IS_KO ? 40 : 95;
const SIMILARITY_LIMIT = IS_KO ? 0.5 : 1.01; // en/es 반응은 답을 되받는 같은 틀이라 겹치는 게 설계다. 모듈 안 완전 동일 반응은 별도 검사가 잡는다.

/** 위로 공식·칭찬·조언·처방·감정 단정·건강/사고/재난 예측 표현. */
const BANNED_PATTERNS_KO: Array<[RegExp, string]> = [
  [/힘드셨|힘들었겠|힘들겠|고생.*(했|많)/, "위로 공식"],
  [/충분히 그럴|괜찮아요|괜찮을|그럴 수 있/, "위로 공식"],
  [/그런 날이 있|누구나|다들 그래|흔한 일/, "일반화"],
  [/대단|훌륭|멋져|잘하고 있|잘 해냈|칭찬/, "칭찬"],
  [/하세요|해 보세요|해보세요|하는 게 좋|해 봐요|해봐요|하면 좋|하는 편이 좋|권해|추천/, "조언·처방"],
  [/건강|병원|질병|우울증|불면증|사고|재난|사망/, "건강·사고·재난"],
  [/될 거예요|될 거야|할 거예요|질 거예요|곧 .*(올|생길|나빠)/, "예측"],
  [/분명히|틀림없이|확실히/, "단정"],
];

const BANNED_PATTERNS_EN: Array<[RegExp, string]> = [
  [/must have been|that must be|sounds (so )?hard|i'm sorry|it'?s (completely )?(okay|ok|normal|understandable)|of course you/i, "comfort formula"],
  [/everyone (has|does|feels)|we all|happens to everyone|a common thing/i, "generalization"],
  [/\b(great|amazing|wonderful|impressive|proud of you|well done)\b/i, "praise"],
  [/\byou should\b|i (suggest|recommend)|it'?s (best|better) to|\bconsider\b/i, "advice"],
  [/\b(health|doctor|hospital|illness|depress|insomnia|accident|disaster|death)\b/i, "health/accident/disaster"],
  [/\byou('ll| will) (soon|lose|get worse)|\bsoon (you|it)\b/i, "prediction"],
  [/\b(definitely|certainly|obviously)\b/i, "assertion"],
];
const BANNED_PATTERNS_ES: Array<[RegExp, string]> = [
  [/debe haber sido|debió de ser|lo lamento|es normal|es comprensible|es totalmente|claro que/i, "fórmula de consuelo"],
  [/todo el mundo|a todos nos|nos pasa a todos|es algo común/i, "generalización"],
  [/\b(genial|increíble|maravilloso|impresionante|orgulloso|bien hecho)\b/i, "elogio"],
  [/\bdeberías\b|\bintenta\b|te (sugiero|recomiendo)|es mejor|\bconsidera\b/i, "consejo"],
  [/\b(salud|médico|hospital|enfermedad|depresión|insomnio|accidente|desastre|muerte)\b/i, "salud/accidente/desastre"],
  [/\bpronto (te|vas|todo)|\bvas a (perder|empeorar)/i, "predicción"],
  [/\b(seguro que|sin duda|obviamente|definitivamente)\b/i, "afirmación"],
];
const BANNED_PATTERNS = IS_KO ? BANNED_PATTERNS_KO : LOCALE === "en" ? BANNED_PATTERNS_EN : BANNED_PATTERNS_ES;

/** 위기 신호 표현. 보기·반응·gist에는 나오면 안 된다. */
const CRISIS_PATTERN = IS_KO
  ? /자살|자해|죽고|죽을|죽고 싶|사라지고 싶|끝내고 싶|목숨|유서|극단/
  : /suicid|kill (myself|me)|self[- ]?harm|want to die|end (my life|it all)|matarme|quitarme la vida|hacerme daño|autolesi|quiero morir|acabar con todo/i;

/** 보기 문구를 앵무새처럼 되받는 표현. */
const PARROT_PATTERN = IS_KO ? /하셨군요|하셨네요|라고 하셨/ : /^\u0000$/;

let errors = 0;
let warnings = 0;
const err = (moduleId: string, where: string, msg: string) => {
  errors++;
  console.log(`  [오류] ${moduleId} ${where}: ${msg}`);
};
const warn = (moduleId: string, where: string, msg: string) => {
  warnings++;
  console.log(`  [경고] ${moduleId} ${where}: ${msg}`);
};

const strip = (s: string) => s.replace(/[\s.!?…"'’”]+$/g, "");
/** 끝 두 글자. 반응 끝맺음 비교용. */
const ending = (s: string) => strip(s).slice(-2);
const bigrams = (s: string): Set<string> => {
  const t = s.replace(/[^가-힣a-zA-Z0-9áéíóúñüÁÉÍÓÚÑÜ]/g, "");
  const out = new Set<string>();
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
};
function similarity(a: string, b: string): number {
  const x = bigrams(a);
  const y = bigrams(b);
  if (!x.size || !y.size) return 0;
  let inter = 0;
  for (const g of x) if (y.has(g)) inter++;
  return inter / Math.min(x.size, y.size);
}

function checkText(moduleId: string, where: string, text: string, label: string) {
  if (!text.trim()) return err(moduleId, where, `${label}가 비어 있음`);
  for (const [re, kind] of BANNED_PATTERNS) {
    if (re.test(text)) err(moduleId, where, `${label}에 ${kind} 표현(${re.source.slice(0, 20)}…): "${text}"`);
  }
  if (CRISIS_PATTERN.test(text)) err(moduleId, where, `${label}에 위기 문구: "${text}"`);
}

function checkOption(moduleId: string, turn: number, idx: number, opt: ScriptOption) {
  const where = `T${turn} 보기${idx + 1}`;
  if (!opt.text.trim()) return err(moduleId, where, "보기 문구가 비어 있음");
  if ([...opt.text].length > MAX_OPTION_LEN) err(moduleId, where, `보기 ${[...opt.text].length}자 > ${MAX_OPTION_LEN}자: "${opt.text}"`);
  checkText(moduleId, where, opt.text, "보기");
  const usesReaction = turn % 2 === 1; // 짝수 턴 반응은 엔진이 쓰지 않음(고정 풀)
  if (usesReaction) checkText(moduleId, where, opt.reaction, "반응");
  if (usesReaction) {
    const len = [...opt.reaction].length;
    if (len < REACTION_MIN || len > REACTION_MAX) err(moduleId, where, `반응 ${len}자(허용 ${REACTION_MIN}~${REACTION_MAX}자): "${opt.reaction}"`);
    if (/[?？]/.test(opt.reaction)) err(moduleId, where, `반응이 질문 꼴: "${opt.reaction}"`);
    if (PARROT_PATTERN.test(opt.reaction)) err(moduleId, where, `반응이 되받기 꼴: "${opt.reaction}"`);
    if ((opt.reaction.match(/[.!]/g) ?? []).length > 1) err(moduleId, where, `반응이 한 문장이 아님: "${opt.reaction}"`);
  }
  if (!opt.gist.trim()) {
    if (GIST_REQUIRED_TURNS.includes(turn)) err(moduleId, where, "gist가 비어 있음(필수 턴)");
  } else {
    checkText(moduleId, where, opt.gist, "gist");
    if (/[?？]/.test(opt.gist)) err(moduleId, where, `gist가 질문 꼴: "${opt.gist}"`);
  }
}

function checkTemplates(moduleId: string, script: ModuleScript) {
  const lines: Array<[string, string]> = [
    ...script.checkpoint.map((l, i): [string, string] => [`체크포인트${i + 1}`, l]),
    ...script.closing.summary.map((l, i): [string, string] => [`마무리${i + 1}`, l]),
    ["마무리 perspectiveLine", script.closing.perspectiveLine],
    ["마무리 finalLine", script.closing.finalLine],
  ];
  for (const [where, line] of lines) {
    checkText(moduleId, where, line, "틀 문장");
    for (const m of line.matchAll(/\{g(\d+)(?::([^}/]+)\/([^}]+))?\}/g)) {
      const t = Number(m[1]);
      const turn = script.turns[t];
      if (!turn?.options) err(moduleId, where, `{g${t}}가 보기 없는 턴을 참조`);
      else if (!GIST_REQUIRED_TURNS.includes(t)) warn(moduleId, where, `{g${t}}가 gist 필수 목록에 없는 턴(보기마다 gist가 있는지 확인)`);
    }
  }
  if (script.checkpoint.length !== 3) err(moduleId, "체크포인트", `줄 수 ${script.checkpoint.length} != 3`);
  if (script.closing.summary.length !== 3) err(moduleId, "마무리", `정리 줄 수 ${script.closing.summary.length} != 3`);
  if (script.closing.summary.some((l) => /[?？]/.test(l)) || /[?？]/.test(script.closing.perspectiveLine) || /[?？]/.test(script.closing.finalLine)) {
    err(moduleId, "마무리", "마무리에 물음표가 있음");
  }
  if ((script.checkpoint[2].match(/[?？]/g) ?? []).length !== 1) err(moduleId, "체크포인트3", "마지막 줄은 물음표 질문 1개여야 함");
}

function checkModule(moduleId: string) {
  const script = getModuleScript(moduleId, LOCALE);
  if (!script) {
    console.log(`- ${moduleId}: 스크립트 없음(건너뜀)`);
    return;
  }
  console.log(`- ${moduleId}`);
  if (script.moduleId !== moduleId) err(moduleId, "moduleId", `데이터의 moduleId가 ${script.moduleId}`);

  for (const t of Object.keys(script.turns).map(Number)) {
    if (!CHOICE_TURNS.includes(t) && t !== 21) err(moduleId, `T${t}`, "허용되지 않는 턴 번호");
  }
  for (const t of [...CHOICE_TURNS]) {
    const turn = script.turns[t];
    if (!turn) {
      err(moduleId, `T${t}`, "턴이 없음");
      continue;
    }
    if (turn.turn !== t) err(moduleId, `T${t}`, `turn 필드가 ${turn.turn}`);
    const q = turn.question ?? "";
    checkText(moduleId, `T${t}`, q, "질문");
    if ((q.match(/[?？]/g) ?? []).length !== 1) err(moduleId, `T${t}`, `질문의 물음표가 1개가 아님: "${q}"`);
    if (turn.questionNoQuote !== undefined) {
      const nq = turn.questionNoQuote;
      checkText(moduleId, `T${t}`, nq, "인용 없는 질문");
      if ((nq.match(/[?？]/g) ?? []).length !== 1) err(moduleId, `T${t}`, `인용 없는 질문의 물음표가 1개가 아님: "${nq}"`);
      if (/^(그|이런|그런|같은)\s/.test(nq)) err(moduleId, `T${t}`, `인용 없는 질문이 앞 문장에 기댐: "${nq}"`);
      if (!turn.quote) err(moduleId, `T${t}`, "quote가 아닌 턴에 인용 없는 질문이 있음");
    }
    if (QUOTE_TURNS.includes(t) !== !!turn.quote) err(moduleId, `T${t}`, `quote 표시가 인용 턴 목록(1·5·10·14·18)과 다름`);

    if (t === 21) {
      if (turn.options?.length) err(moduleId, "T21", "21턴은 보기가 없어야 함(직접 입력 전용)");
      continue;
    }
    const opts = turn.options ?? [];
    if (opts.length < 2 || opts.length > 3) err(moduleId, `T${t}`, `보기 ${opts.length}개(2~3개여야 함)`);
    opts.forEach((o, i) => checkOption(moduleId, t, i, o));
    const texts = opts.map((o) => o.text.replace(/\s/g, ""));
    if (new Set(texts).size !== texts.length) err(moduleId, `T${t}`, "같은 턴에 중복 보기");
    // 같은 질문의 반응 바꿔치기 의심
    for (let i = 0; i < opts.length; i++) {
      for (let j = i + 1; j < opts.length; j++) {
        const s = similarity(opts[i].reaction, opts[j].reaction);
        if (IS_KO && t % 2 === 1 && s >= 0.9) err(moduleId, `T${t}`, `보기${i + 1}·${j + 1} 반응이 너무 비슷함(${s.toFixed(2)}): "${opts[i].reaction}" / "${opts[j].reaction}"`);
        if (opts[i].gist.trim() && opts[i].gist === opts[j].gist) err(moduleId, `T${t}`, "다른 보기에 같은 gist");
      }
    }
  }

  // 이웃 턴의 "~네요/~군요" 연속, 일반 끝맺음 반복
  for (let t = 1; t < 20; t += 2) {
    const a = script.turns[t]?.options;
    const b = script.turns[t + 2]?.options;
    if (!a || !b) continue;
    for (const x of a) {
      for (const y of b) {
        const ex = strip(x.reaction).slice(-2);
        const ey = strip(y.reaction).slice(-2);
        if (ex === ey && (ex === "네요" || ex === "군요")) {
          err(moduleId, `T${t}→T${t + 2}`, `이웃 반응이 둘 다 "${ex}"로 끝남: "${x.reaction}" / "${y.reaction}"`);
        }
      }
    }
  }

  // 모듈 안 반응·보기 중복
  const seenReaction = new Map<string, string>();
  for (const t of CHOICE_TURNS.filter((x) => x % 2 === 1)) {
    for (const [i, o] of (script.turns[t]?.options ?? []).entries()) {
      const key = o.reaction.replace(/\s/g, "");
      const prev = seenReaction.get(key);
      if (prev) err(moduleId, `T${t} 보기${i + 1}`, `반응이 ${prev}와 같음: "${o.reaction}"`);
      else seenReaction.set(key, `T${t} 보기${i + 1}`);
    }
  }

  // 끝맺음 편중 경고(전체 반응 중 한 끝이 25% 초과)
  const counts = new Map<string, number>();
  let total = 0;
  for (const t of CHOICE_TURNS.filter((x) => x % 2 === 1)) {
    for (const o of script.turns[t]?.options ?? []) {
      total++;
      counts.set(ending(o.reaction), (counts.get(ending(o.reaction)) ?? 0) + 1);
    }
  }
  for (const [e, n] of counts) {
    if (IS_KO && total && n / total > 0.25) warn(moduleId, "끝맺음", `반응 끝 "${e}"가 ${n}/${total}개(편중)`);
  }

  checkTemplates(moduleId, script);
}

const args = process.argv.slice(2);
const targets = args.length ? args : ALL_MODULE_IDS;
console.log(`고정 스크립트 린트(${LOCALE}): ${targets.join(", ")}`);
for (const id of targets) checkModule(id);
console.log(`\n오류 ${errors}개, 경고 ${warnings}개`);
process.exit(errors > 0 ? 1 : 0);
