/**
 * lib/modulePlaybooks.ts
 * ------------------------------------------------------------------
 * MODULE_PLAYBOOK.md(v2, 2026-09-27 확정)를 코드로 옮긴 데이터. 11개 모듈이
 * 각자 어떤 전문 관점으로 20턴 대화를 이끌고, 대화에서 무엇을 뽑아 리포트의
 * 모듈 전용 페이지 2장(module_map 무료, module_deep 유료)에 무엇을 쓰는지를
 * 정한다.
 *
 * 이 파일은 데이터만 담는다(예외: 7번째 턴 지침은 lib/chatPrompts.ts가 이미
 * 읽는다). 챗봇 프롬프트(lib/chatPrompts.ts), 추출
 * 프롬프트, 리포트 프롬프트(lib/reportPrompts.ts)가 이 데이터를 읽는 건 각
 * 작업 항목(SPEC F1, Q1)에서 연결한다.
 *
 * 언어 규칙:
 *   - 사용자에게 그대로 보일 수 있는 문구(시그니처 질문, 이지선다 보기,
 *     감정 어휘, 리포트 페이지 제목)는 LocalizedText로 ko/en/es를 모두 쓴다.
 *     EN/ES는 번역이 아니라 각 언어로 자연스럽게 쓴 문장이다
 *     (mobile/lib/i18n/STYLE_GUIDE.md: es는 tú, 독자 성별 중립).
 *   - 모델에게 주는 지시문(관점, 경계, 단계 지침, 모순 축, 리프레이밍 방향,
 *     추출 필드 설명, 리포트 작성 지시, 강점 방향)은 기존 프롬프트 관례대로
 *     한국어로 쓴다. 출력 언어는 lib/promptLocale.ts가 따로 지정한다.
 *
 * 2026-09-27: 모듈 1~4 추가(TODO F0-a).
 * 2026-09-27: 모듈 5~11 추가, 7번째 턴 지침(patternTurnInstruction)을
 *   lib/chatPrompts.ts에서 옮겨 옴(TODO F0-b). 문구는 그대로다.
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";

export type LocalizedText = Record<Locale, string>;

/** mobile/lib/quiz/modules.ts의 ModuleDefinition.id와 같은 키. */
export type PlaybookModuleId =
  | "module1"
  | "module2"
  | "module3"
  | "module4"
  | "module5"
  | "module6"
  | "module7"
  | "module8"
  | "module9"
  | "module10"
  | "module11";

/**
 * 20턴 중 고정 역할 턴(1·6·10·13·17·20)을 뺀 14턴을 채우는 7단계.
 * A 2–3, B 4–5, C 7–9, D 11–12, E 14–15, F 16, G 18–19.
 */
export type PlaybookStage = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export const PLAYBOOK_STAGE_TURNS: Record<PlaybookStage, readonly number[]> = {
  A: [2, 3],
  B: [4, 5],
  C: [7, 8, 9],
  D: [11, 12],
  E: [14, 15],
  F: [16],
  G: [18, 19],
};

/** 기법 ① 이지선다의 재료. 보기 두 개는 사용자에게 그대로 보일 수 있다. */
export interface ForcedChoiceAxis {
  /** 축 이름(모델 참고용, 한국어). */
  name: string;
  options: readonly [LocalizedText, LocalizedText];
}

/** 모듈이 추가로 뽑는 추출 필드. 사용자가 말하지 않았으면 null로 둔다. */
export interface ModuleExtractField {
  key: string;
  /** 추출 모델에게 주는 설명(한국어). */
  description: string;
}

export interface ModuleReportPage {
  title: LocalizedText;
  /** 리포트 모델에게 주는 작성 지시(한국어). */
  instruction: string;
}

export interface ModulePlaybook {
  id: PlaybookModuleId;
  /** 전문 관점. 대화와 리포트가 이 틀의 언어로 생각한다(모델용). */
  lens: string;
  /** 비슷한 모듈과의 경계. 대화가 옆 모듈로 새지 않게 하는 기준(모델용). */
  boundary: string;
  /** 이 모듈에서만 나오는 질문. */
  signatureQuestion: LocalizedText;
  /** 시그니처 질문이 나오는 단계. */
  signatureStage: PlaybookStage;
  /** 단계별로 이 모듈이 실제로 묻는 것(모델용). */
  stages: Record<PlaybookStage, string>;
  /**
   * 19턴 관점 전환. 누가 누구에게 말을 건네는지와 그 이유(모델용).
   * 질문은 한 문장, 조언을 요구하지 않는다("뭐라고 말해 주고 싶어요?").
   */
  perspectiveShift: {
    speaker: string;
    listener: string;
    why: string;
  };
  /** 기법 ① 이지선다 축. */
  forcedChoiceAxes: readonly ForcedChoiceAxis[];
  /** 기법 ⑤ 감정 어휘 좁히기의 재료(단계 B). */
  emotionPalette: readonly LocalizedText[];
  /** 기법 ③ 모순 짚기의 재료(모델용). 질문 형태로만 짚는다. */
  contradictions: readonly string[];
  /** 기법 ⑦ 폭로 후 리프레이밍(모델용). */
  reframe: {
    /** 이런 결의 자책 발언이 나오면 */
    selfBlame: string;
    /** 이 방향으로 반박형 질문을 만든다 */
    direction: string;
  };
  /** 공통 필드 외에 이 모듈만 뽑는 필드, 정확히 2개. */
  extractFields: readonly [ModuleExtractField, ModuleExtractField];
  reportPages: {
    /** 무료 페이지. "다가오는 시기" 미리보기 앞에 놓인다. */
    module_map: ModuleReportPage;
    /** 유료 페이지. 행동 가이드 앞에 놓인다. */
    module_deep: ModuleReportPage;
  };
  /** 무료 강점 3개와 잠긴 핵심 강점 1개를 찾을 방향(모델용). */
  strengthDirections: readonly string[];
  /** 모듈별 추가 주의(모델용). 없으면 생략. */
  caution?: string;
  /**
   * 7번째 응답(반복 패턴/Pattern, 열림)의 턴 지침 전문(모델용).
   * lib/chatPrompts.ts의 MODULE_PATTERN_INSTRUCTIONS에서 문구 그대로 옮겼다
   * (2026-09-27, TODO F0-b). 20턴 흐름 개편(Q1-a) 전까지 문구를 바꾸지 않는다.
   */
  patternTurnInstruction: string;
}

const MODULE1: ModulePlaybook = {
  id: "module1",
  lens: "성인 애착 이론. 가까움을 원할 때 켜지는 항의 행동(확인, 연락 폭주, 시험하기)과 거리를 만드는 비활성화 전략(감정 끄기, 바빠지기, 결점 찾기)을 본다. 관계를 안전기지로 쓸 수 있는지를 본다.",
  boundary: "원가족(모듈 9)은 과거 가족 체계 속 역할을 본다. 애착은 지금 친밀한 관계에서 거리를 조절하는 방식을 본다. 어린 시절은 단계 D에서만 짧게 닿는다.",
  signatureQuestion: {
    ko: "답장이 안 올 때, 머릿속에 가장 먼저 떠오르는 이야기는 뭐예요? '바쁘겠지'예요, '내가 뭘 잘못했나'예요?",
    en: "When a reply doesn't come, what's the first story your mind tells you? \"They're probably busy,\" or \"Did I do something wrong?\"",
    es: "Cuando no llega una respuesta, ¿qué historia te cuenta tu mente primero? ¿\"Seguro que no ha podido\" o \"¿Hice algo mal?\"?",
  },
  signatureStage: "A",
  stages: {
    A: "최근 상대의 반응 하나에 마음이 흔들린 순간(답장, 약속 변경, 표정)과 그때 머릿속에 떠오른 이야기를 묻는다.",
    B: "흔들림의 결을 좁힌다. 불안이 커졌는지, 숨이 막혔는지.",
    C: "그 뒤에 한 행동이 항의 행동 쪽인지 비활성화 쪽인지 본다. 예전 관계에서도 같은 순서가 반복됐는지 묻는다.",
    D: "'사랑받으려면 ~해야 한다'는 믿음을 찾는다. 어릴 때 기댈 때 돌아온 반응은 한 장면만 짧게 닿는다.",
    E: "불안하거나 답답할 때 스스로를 진정시키는 방법과, 그게 관계를 가깝게 하는지 멀게 하는지 묻는다.",
    F: "상대가 나의 그 반응을 어떻게 받아들이는지, 상대의 스타일은 어떤지 묻는다.",
    G: "안정적인 관계라면 어떤 하루 장면일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "지금의 나",
    listener: "다음 사랑을 시작할 미래의 나",
    why: "애착 경보는 다음 관계에서 다시 울린다. 경보가 울릴 때 기억해 달라고 전하고 싶은 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "불안",
      options: [
        { ko: "확인하고 싶어졌어요", en: "I wanted to check in", es: "Quise confirmar que todo estaba bien" },
        { ko: "조용히 기다렸어요", en: "I waited quietly", es: "Esperé en silencio" },
      ],
    },
    {
      name: "회피",
      options: [
        { ko: "더 가까이 가고 싶었어요", en: "I wanted to get closer", es: "Quise acercarme más" },
        { ko: "숨 쉴 공간이 필요했어요", en: "I needed room to breathe", es: "Necesité espacio para respirar" },
      ],
    },
    {
      name: "표현",
      options: [
        { ko: "서운하다고 말했어요", en: "I said I was hurt", es: "Dije que me dolió" },
        { ko: "괜찮은 척했어요", en: "I acted like it was fine", es: "Hice como que no pasaba nada" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "불안", en: "anxiety", es: "ansiedad" },
    { ko: "서운함", en: "hurt", es: "dolor" },
    { ko: "버려질 것 같은 느낌", en: "fear of being left", es: "miedo a que te dejen" },
    { ko: "답답함", en: "feeling hemmed in", es: "agobio" },
    { ko: "숨막힘", en: "suffocation", es: "sensación de ahogo" },
    { ko: "무덤덤함", en: "numbness", es: "indiferencia" },
  ],
  contradictions: [
    "겉으로는 쿨한데 속으로는 확인받고 싶어 한다.",
    "가까워지고 싶다면서 가까워지면 결점을 찾기 시작한다.",
  ],
  reframe: {
    selfBlame: "내가 너무 집착해",
    direction: "연결이 끊길 신호를 누구보다 빨리 알아채는 경보 장치가 예민하게 켜져 있는 것",
  },
  extractFields: [
    { key: "attachment_alarm", description: "불안이나 거리두기를 켜는 신호(상대의 어떤 반응이 경보를 울리는지)" },
    { key: "protest_or_deactivate", description: "그때 반복하는 항의 행동(확인, 연락, 시험하기) 또는 비활성화 전략(감정 끄기, 바빠지기, 결점 찾기)" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "내 관계의 경보 장치", en: "Your relationship alarm", es: "Tu alarma en las relaciones" },
      instruction: "무엇이 이 사람의 경보를 켜는지(대화에 나온 실제 장면으로), 경보가 울리면 다가가는지 물러서는지를 그린다. 항의 행동이나 비활성화 전략이라는 말은 한 번만 자연스럽게 쓰고 진단처럼 들리게 쓰지 않는다.",
    },
    module_deep: {
      title: { ko: "나에게 안전기지가 되는 관계", en: "A relationship that feels like a safe base", es: "Una relación que sea tu base segura" },
      instruction: "이 사람에게 맞는 확인 방식과 거리를 구체적으로 쓰고, 상대에게 부탁할 수 있는 한 문장을 이 사람의 말투에 맞춰 제시한다.",
    },
  },
  strengthDirections: ["관계의 온도를 알아채는 감각", "깊은 헌신", "다시 이어 붙이려는 의지"],
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 관계가 가까워지거나 멀어지려는 순간에 사용자가 실제로 보인 반응(불안하게 매달리듯 확인하고 싶어지는 쪽이든, 반대로 거리를 두고 발을 빼고 싶어지는 쪽이든)이 이번이 처음인지, 예전 다른 관계에서도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE2: ModulePlaybook = {
  id: "module2",
  lens: "재무 심리학의 머니 스크립트(어린 시절에 배운 돈에 대한 무의식적 믿음: 돈 회피, 돈 숭배, 돈과 지위, 돈 경계). 소비나 저축을 감정 조절 행동으로 본다.",
  boundary: "실행력(모듈 5)은 해야 할 일을 미루는 걸 보고, 돈은 돈이라는 대상에 붙은 감정과 믿음을 본다. 가면(모듈 4)의 이미지 관리와는 '돈으로 보여 주기'만 겹치므로, 여기서는 돈의 의미에 초점을 둔다.",
  signatureQuestion: {
    ko: "'돈은 결국 ___' 이 문장을 바로 채운다면 뭐가 먼저 떠올라요?",
    en: "If you had to finish this sentence right now, \"In the end, money is ___,\" what comes to mind first?",
    es: "Si tuvieras que completar ahora mismo la frase \"Al final, el dinero es ___\", ¿qué te viene primero a la mente?",
  },
  signatureStage: "D",
  stages: {
    A: "최근 돈 때문에 마음이 움직인 순간(잔고 확인, 결제 직전, 누군가의 연봉 얘기)을 묻는다.",
    B: "그 순간 올라온 감정을 좁힌다. 불안인지, 죄책감인지, 들뜸인지.",
    C: "그 감정 뒤의 행동(쓰기, 참기, 안 보기)과 비슷한 루프가 반복되는 상황을 묻는다.",
    D: "시그니처 질문으로 머니 스크립트를 찾는다. 그 문장을 처음 배운 장면, 어릴 때 집에서 돈이 어떤 분위기였는지 묻는다.",
    E: "돈 불안이 올라올 때 하는 일과, 그게 불안을 줄이는지 미루는지 묻는다.",
    F: "가까운 사람과 돈 얘기를 할 수 있는지, 누구 앞에서 돈 얘기가 가장 불편한지 묻는다.",
    G: "돈과 편안한 사이라면 어떤 장면일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "지금의 나",
    listener: "이제 막 첫 월급을 받은 누군가",
    why: "머니 스크립트가 굳기 전의 사람에게 말하면 내 규칙이 보인다. 돈에 대해 꼭 알려 주고 싶은 한 가지를 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "결핍공포",
      options: [
        { ko: "쓰고 나서 불안했어요", en: "I felt anxious after spending", es: "Sentí ansiedad después de gastar" },
        { ko: "안 쓰고 있어도 불안했어요", en: "I felt anxious even when I wasn't spending", es: "Sentí ansiedad aunque no estuviera gastando" },
      ],
    },
    {
      name: "과시욕",
      options: [
        { ko: "나를 위해 샀어요", en: "I bought it for myself", es: "Lo compré para mí" },
        { ko: "보여 주고 싶어서 샀어요", en: "I bought it to be seen with it", es: "Lo compré para que me vieran con ello" },
      ],
    },
    {
      name: "회피",
      options: [
        { ko: "바로 확인해요", en: "I check right away", es: "Lo reviso enseguida" },
        { ko: "일단 안 보고 미뤄요", en: "I put off looking", es: "Prefiero no mirarlo por ahora" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "불안", en: "anxiety", es: "ansiedad" },
    { ko: "죄책감", en: "guilt", es: "culpa" },
    { ko: "허탈함", en: "emptiness", es: "vacío" },
    { ko: "들뜸", en: "a rush", es: "euforia" },
    { ko: "민망함", en: "embarrassment", es: "vergüenza" },
    { ko: "안도", en: "relief", es: "alivio" },
  ],
  contradictions: [
    "평소엔 아끼는데 특정 순간엔 크게 쓴다.",
    "돈 생각 안 한다면서 계속 신경 쓴다.",
  ],
  reframe: {
    selfBlame: "나는 돈 관리를 못 해",
    direction: "오래전에 배운 돈 규칙이 지금도 대신 결정을 내리고 있는 것",
  },
  extractFields: [
    { key: "money_script", description: "돈에 대한 핵심 믿음 한 문장(사용자 표현을 살려서)" },
    { key: "money_loop", description: "계기 → 감정 → 돈 행동으로 이어지는 반복 루프" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "나의 머니 스크립트", en: "Your money script", es: "Tu guion sobre el dinero" },
      instruction: "이 사람이 쓰는 돈 문장(대화에서 나온 표현 그대로 또는 가깝게)과 그 문장이 만드는 계기 → 감정 → 돈 행동 루프를 그린다. 돈 관리 조언이나 재테크 팁은 쓰지 않는다.",
    },
    module_deep: {
      title: { ko: "물려받은 규칙, 새로 쓸 규칙", en: "The rules you inherited, the rules you'll write", es: "Las reglas que heredaste y las que vas a escribir" },
      instruction: "유지할 돈 규칙 하나와 바꿀 돈 규칙 하나를 이 사람의 상황에 맞춘 구체적 문장으로 제시한다. 투자, 상품, 금액 추천은 하지 않는다.",
    },
  },
  strengthDirections: ["위험을 먼저 알아채는 감각", "계획성", "남을 챙기는 너그러움"],
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 돈과 관련해서 결핍감에 쫓기듯 굴거나, 남들 앞에서 괜찮아 보이려 무리하거나, 아예 생각하기 싫어서 피해버렸던 장면이 이번이 처음인지, 예전에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE3: ModulePlaybook = {
  id: "module3",
  lens: "번아웃의 세 차원(소진, 냉소, 효능감 저하)과 직무 요구-자원 모델. 요구(일의 양, 감정 노동, 통제 불가)와 자원(자율성, 인정, 회복 시간)의 균형이 깨진 지점을 찾는다.",
  boundary: "수면(모듈 8)은 밤의 각성을 보고, 번아웃은 일이나 역할에서 자원이 고갈되는 구조를 본다. 실행력(모듈 5)의 미루기와 달리 여기서는 '하고 있는데 비어 가는' 상태를 본다.",
  signatureQuestion: {
    ko: "요즘 하루에서 에너지를 빼 가는 것과 조금이라도 채워 주는 것을 하나씩 꼽는다면요?",
    en: "In your days lately, what's one thing that drains your energy, and one thing that gives even a little back?",
    es: "En tus días últimamente, ¿qué es lo que más energía te quita y qué es lo que te devuelve aunque sea un poco?",
  },
  signatureStage: "D",
  stages: {
    A: "최근 '더는 못 하겠다' 싶었던 순간과, 그날 무엇이 마지막 한 방울이었는지 묻는다.",
    B: "지침의 결을 좁힌다. 몸이 무거운지, 마음이 식었는지, 짜증이 올라오는지.",
    C: "이런 시기가 전에도 있었는지, 그때 무엇이 쌓여 있었는지(요구 쪽) 묻는다.",
    D: "시그니처 질문으로 요구와 자원을 나눈다. '잘해야 한다', '쉬면 안 된다'는 믿음이 어디서 왔는지 묻는다.",
    E: "쉬는 방법을 묻는다. 실제로 쉬어지는지, 쉬면서도 일 생각을 하는지.",
    F: "직장이나 주변에서 내 상태를 아는 사람이 있는지, 도움을 청할 수 있는지 묻는다.",
    G: "에너지가 돌아온다면 가장 먼저 하고 싶은 것을 묻는다.",
  },
  perspectiveShift: {
    speaker: "지금의 나",
    listener: "이 일을 막 시작하던 첫날의 나",
    why: "비어 가기 전의 나와 지금의 거리를 본다. 첫날의 나에게 지금의 내가 해 주고 싶은 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "소진",
      options: [
        { ko: "몸이 먼저 지쳤어요", en: "My body gave out first", es: "Mi cuerpo se cansó primero" },
        { ko: "마음이 먼저 식었어요", en: "My heart went cold first", es: "Primero se me apagaron las ganas" },
      ],
    },
    {
      name: "냉소",
      options: [
        { ko: "일이 많아서예요", en: "There's just too much work", es: "Es que hay demasiado trabajo" },
        { ko: "의미가 안 보여서예요", en: "I can't see the point anymore", es: "Ya no le veo sentido" },
      ],
    },
    {
      name: "효능감저하",
      options: [
        { ko: "쉬면 조금 돌아와요", en: "Rest brings a bit of it back", es: "Si descanso, algo se recupera" },
        { ko: "쉬어도 그대로예요", en: "Even after rest, nothing changes", es: "Aunque descanse, sigue igual" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "무기력", en: "listlessness", es: "desgana" },
    { ko: "짜증", en: "irritation", es: "irritación" },
    { ko: "공허함", en: "emptiness", es: "vacío" },
  ],
  contradictions: [
    "지쳤다면서 일을 놓지 못한다.",
    "의미 없다면서 여전히 잘하고 싶어 한다.",
  ],
  reframe: {
    selfBlame: "내가 약해서 그래",
    direction: "자원이 채워지지 않는 구조에서 오래 버틴 만큼 닳은 것",
  },
  extractFields: [
    { key: "demand_drain", description: "에너지를 가장 크게 빼 가는 요구(일의 양, 감정 노동, 통제할 수 없는 것 등)" },
    { key: "resource_left", description: "아직 남아 있는 자원(조금이라도 채워 주는 것)" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "에너지 수지표", en: "Your energy balance sheet", es: "Tu balance de energía" },
      instruction: "요구 쪽(빼 가는 것)과 자원 쪽(채워 주는 것)을 이 사람의 실제 재료로 나란히 적고, 어느 쪽이 얼마나 기울어 있는지 보여 준다. 소진, 냉소, 효능감 중 두드러진 차원을 진단처럼 들리지 않게 짚는다.",
    },
    module_deep: {
      title: { ko: "다시 채우는 순서", en: "The order for refilling", es: "El orden para recargarte" },
      instruction: "무엇부터 내려놓고 무엇부터 채울지 3단계로 제시한다. 각 단계는 이 사람의 요구와 자원 재료에서 나오고, 퇴사나 휴직 같은 큰 결정을 권하지 않는다.",
    },
  },
  strengthDirections: ["책임감", "버티는 힘", "잘하고 싶은 마음"],
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 이렇게 지치고 냉소적으로 변하고 "해도 소용없다"는 느낌이 먼저 드는 순간이 이번이 처음인지, 예전 다른 시기에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE4: ModulePlaybook = {
  id: "module4",
  lens: "사회학의 감정 노동(겉으로만 맞추는 표면 연기와 속까지 맞추는 내면 연기)과 자기 감시(상황에 맞춰 자기를 조절하는 정도). 무대 위의 나와 무대 뒤의 나 사이의 거리를 본다.",
  boundary: "본능(모듈 11)은 내가 원하는 것 자체를 삼키는 걸 보고, 가면은 다른 사람 앞에서 보여 주는 모습을 관리하는 비용을 본다. 애착(모듈 1)과 달리 특정 연인이 아니라 사회적 자리 전반을 본다.",
  signatureQuestion: {
    ko: "사람들 앞의 나와 집에 혼자 있을 때의 나, 둘 사이 거리가 몇 걸음쯤 돼요?",
    en: "The you around other people and the you alone at home: how many steps apart would you say they are?",
    es: "Tú frente a los demás y tú a solas en casa: ¿cuántos pasos de distancia dirías que hay entre los dos?",
  },
  signatureStage: "D",
  stages: {
    A: "최근 괜찮은 척했던 자리와, 그 자리에서 보여 준 표정이나 말 하나를 묻는다.",
    B: "그 자리가 끝난 직후의 감정을 좁힌다. 피로인지, 외로움인지, 안도인지.",
    C: "어떤 자리나 상대 앞에서 가면이 두꺼워지는지, 언제부터 이랬는지 묻는다.",
    D: "시그니처 질문으로 무대 위와 뒤의 거리를 잰다. 가면을 벗으면 무슨 일이 일어날 것 같은지 묻는다.",
    E: "가면을 쓴 뒤 회복하는 방법과, 혼자 있는 시간이 충분한지 묻는다.",
    F: "가면 없이 대할 수 있는 사람이 있는지, 그 사람 앞에서는 뭐가 다른지 묻는다.",
    G: "가면을 조금 내려놓는다면 어느 자리부터일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "지금의 나",
    listener: "같은 자리에서 똑같이 웃고 있는 옆 사람",
    why: "남의 가면에는 너그러운 나를 보게 한다. 그 사람에게 조용히 건네고 싶은 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "이미지관리",
      options: [
        { ko: "좋아 보이고 싶었어요", en: "I wanted to come across well", es: "Quería dar una buena imagen" },
        { ko: "들키고 싶지 않았어요", en: "I didn't want anyone to see through me", es: "No quería que se notara lo que me pasaba" },
      ],
    },
    {
      name: "은폐",
      options: [
        { ko: "가까운 사람 앞에서 더 그래요", en: "More with people I'm close to", es: "Más con la gente cercana" },
        { ko: "처음 보는 사람 앞에서 더 그래요", en: "More with people I've just met", es: "Más con gente que acabo de conocer" },
      ],
    },
    {
      name: "관계피로",
      options: [
        { ko: "끝나면 혼자 있고 싶어요", en: "Afterward I just want to be alone", es: "Después solo quiero estar a solas" },
        { ko: "누군가 알아봐 주길 바라요", en: "I wish someone would notice", es: "Me gustaría que alguien lo notara" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "피로", en: "exhaustion", es: "cansancio" },
    { ko: "외로움", en: "loneliness", es: "soledad" },
    { ko: "안도", en: "relief", es: "alivio" },
  ],
  contradictions: [
    "사람 좋아 보이는데 혼자가 편하다.",
    "진짜 모습을 보여 주고 싶은데 숨긴다.",
  ],
  reframe: {
    selfBlame: "나는 가식적이야",
    direction: "상황을 읽고 맞추는 능력이 너무 오래, 너무 열심히 일한 것",
  },
  extractFields: [
    { key: "stage_front", description: "가면이 가장 두꺼워지는 자리와 상대" },
    { key: "stage_back", description: "가면을 벗을 수 있는 곳이나 사람" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "무대 위와 무대 뒤", en: "On stage and backstage", es: "En escena y tras bambalinas" },
      instruction: "이 사람이 어디서(어떤 자리, 어떤 상대 앞에서) 얼마나 연기하고, 어디서 쉬는지를 대화 재료로 그린다. 표면 연기와 내면 연기 중 어느 쪽에 가까운지 한 번 짚되 가식이라는 평가로 들리지 않게 쓴다.",
    },
    module_deep: {
      title: { ko: "가면의 두께 조절하기", en: "Adjusting how thick the mask is", es: "Ajustar el grosor de la máscara" },
      instruction: "가면을 벗으라고 하지 않는다. 가장 안전한 자리부터 한 겹씩 내려놓는 연습을 이 사람의 실제 자리와 상대에 맞춰 순서대로 제시한다.",
    },
  },
  strengthDirections: ["분위기를 읽는 감각", "배려", "적응력"],
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 이미지 관리를 위해 진짜 마음을 숨기거나 꾸며낸 장면, 혹은 사람을 만나고 난 뒤 유독 지치는 순간이 이번이 처음인지, 예전에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE5: ModulePlaybook = {
  id: "module5",
  lens: "정서 조절로서의 미루기(미루기는 게으름이 아니라 불편한 감정을 잠깐 피하는 행동)와 다차원 완벽주의(스스로 부과한 기준, 남이 기대한다고 느끼는 기준), 최대화 경향(최선의 선택을 찾느라 멈춤).",
  boundary: "몰입(모듈 10)은 시작한 뒤 주의가 흩어지거나 빠지는 걸 보고, 실행력은 시작하기 직전에 무엇이 브레이크를 거는지를 본다.",
  signatureQuestion: {
    ko: "그 일을 열어 보려던 직전 3초, 어떤 생각이 스쳤어요?",
    en: "In the three seconds right before you were about to open that task, what thought went through your mind?",
    es: "En los tres segundos justo antes de ponerte con esa tarea, ¿qué pensamiento se te cruzó por la cabeza?",
  },
  signatureStage: "B",
  stages: {
    A: "최근 미뤄 둔 일 하나와, 그걸 열어 보려다 닫은 순간을 묻는다.",
    B: "시그니처 질문(직전 3초)으로 그때 스친 생각을 묻고, 그 순간 피하고 싶었던 감정이 무엇인지 좁힌다.",
    C: "멈추는 지점이 시작인지, 중간인지, 마무리인지 보고, 비슷한 일에서 반복되는지 묻는다.",
    D: "그 기준이 누구의 기준인지(내 기준인지, 남이 기대한다고 느끼는 기준인지), 틀리면 무슨 일이 일어날 것 같은지 묻는다.",
    E: "결국 움직이게 했던 조건(마감, 누군가의 존재, 작게 쪼개기)을 묻는다.",
    F: "주변에서 내 미루기를 어떻게 보는지, 누구의 평가가 가장 신경 쓰이는지 묻는다.",
    G: "'적당히 괜찮게' 해낸 장면을 상상하면 어떤지 묻는다.",
  },
  perspectiveShift: {
    speaker: "그 일을 이미 끝낸 1년 뒤의 나",
    listener: "지금의 나",
    why: "미래의 나와 이어지면 시작의 브레이크가 풀린다. 1년 뒤의 내가 지금의 나에게 보내는 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "완벽주의",
      options: [
        { ko: "잘해야 해서 못 시작했어요", en: "I couldn't start because it had to be good", es: "No empecé porque tenía que salir bien" },
        { ko: "하기 싫어서 미뤘어요", en: "I put it off because I didn't want to do it", es: "Lo dejé para después porque no tenía ganas" },
      ],
    },
    {
      name: "회피",
      options: [
        { ko: "마감 직전에 몰아쳐요", en: "I rush it right before the deadline", es: "Lo hago todo de golpe justo antes del plazo" },
        { ko: "끝내 못 할 때도 있어요", en: "Sometimes it never gets done", es: "A veces nunca llego a hacerlo" },
      ],
    },
    {
      name: "선택마비",
      options: [
        { ko: "선택지가 많아서요", en: "There were too many options", es: "Había demasiadas opciones" },
        { ko: "틀릴까 봐서요", en: "I was afraid of getting it wrong", es: "Tenía miedo de equivocarme" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "초조함", en: "restlessness", es: "inquietud" },
    { ko: "죄책감", en: "guilt", es: "culpa" },
    { ko: "미룬 뒤의 안도", en: "relief after putting it off", es: "alivio después de posponerlo" },
  ],
  contradictions: [
    "기준은 높은데 시작을 안 한다.",
    "미루면서도 계속 그 일을 생각한다.",
  ],
  reframe: {
    selfBlame: "나는 게을러",
    direction: "잘하고 싶은 마음이 너무 커서 브레이크가 먼저 밟히는 것",
  },
  extractFields: [
    { key: "pre_start_thought", description: "시작 직전에 스치는 생각(사용자 표현을 살려서)" },
    { key: "move_condition", description: "그래도 움직이게 했던 조건(마감, 누군가의 존재, 작게 쪼개기 등)" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "브레이크가 걸리는 지점", en: "Where the brakes kick in", es: "Dónde se activa el freno" },
      instruction: "시작 직전 3초에 스치는 생각과 그 순간 피하는 감정을 대화에 나온 실제 일로 그린다. 멈추는 지점(시작, 중간, 마무리)과 그 기준이 누구의 것인지 짚되, 게으름이라는 평가로 들리지 않게 쓴다.",
    },
    module_deep: {
      title: { ko: "나에게 맞는 시작 장치", en: "Starting devices that fit you", es: "Mecanismos de arranque hechos a tu medida" },
      instruction: "이 사람이 실제로 움직였던 조건에서 만든 구체적인 시작 장치 3개를 제시한다. 일반적인 생산성 팁이나 앱 추천은 쓰지 않는다.",
    },
  },
  strengthDirections: ["높은 기준", "신중함", "몰아칠 때의 추진력"],
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 완벽하게 하려다 오히려 미루거나, 아예 손을 놓거나, 뭘 선택해야 할지 몰라 얼어붙었던 장면이 이번이 처음인지, 예전에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE6: ModulePlaybook = {
  id: "module6",
  lens: "2차 감정으로서의 분노(화 아래 깔린 1차 감정: 상처, 두려움, 무시당함)와 분노 반추, 그리고 경계. 화를 없앨 대상이 아니라 침범된 선을 알리는 신호로 본다.",
  boundary: "본능(모듈 11)은 원하는 걸 삼키는 걸 보고, 분노는 선이 침범됐을 때 올라온 에너지가 어디로 가는지를 본다.",
  signatureQuestion: {
    ko: "그 화를 한 겹 벗기면 아래에 뭐가 있었을까요? 억울함이었어요, 서운함이었어요, 무시당한 느낌이었어요?",
    en: "If you peeled back one layer of that anger, what would be underneath? Was it feeling wronged, feeling hurt, or feeling dismissed?",
    es: "Si le quitaras una capa a ese enfado, ¿qué habría debajo? ¿Sentiste que era injusto, que te dolió o que no te tomaban en cuenta?",
  },
  signatureStage: "B",
  stages: {
    A: "최근 화가 났던 순간과, 상대가 정확히 한 말이나 행동을 묻는다.",
    B: "시그니처 질문으로 화 아래에 깔린 감정을 좁힌다.",
    C: "그 화가 어디로 갔는지(삼킴, 터짐, 곱씹음) 보고, 같은 경로가 반복되는지 묻는다.",
    D: "그 순간 침범된 선이 무엇이었는지, 그 선이 나에게 왜 중요한지 묻는다.",
    E: "화가 지나간 뒤에 하는 일과, 곱씹는 시간이 얼마나 되는지 묻는다.",
    F: "화를 표현했을 때 돌아온 반응과, 화를 편하게 낼 수 있는 사람이 있는지 묻는다.",
    G: "선을 말로 그을 수 있다면 어떤 문장일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "화가 가라앉은 다음 날 아침의 나",
    listener: "화가 치밀던 그 순간의 나",
    why: "식은 뒤의 내가 그 선이 왜 중요했는지 말해 준다. 다음 날 아침의 내가 그 순간의 나에게 해 주는 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "억압",
      options: [
        { ko: "그 자리에서 말했어요", en: "I said something right then", es: "Lo dije en ese mismo momento" },
        { ko: "삼켰어요", en: "I swallowed it", es: "Me lo tragué" },
      ],
    },
    {
      name: "폭발",
      options: [
        { ko: "크게 올라왔어요", en: "It came up hard", es: "Me subió de golpe" },
        { ko: "오래 남았어요", en: "It stayed with me for a long time", es: "Se me quedó mucho tiempo" },
      ],
    },
    {
      name: "반추",
      options: [
        { ko: "상대에게 향했어요", en: "It was aimed at them", es: "Fue hacia la otra persona" },
        { ko: "나 자신에게 향했어요", en: "It turned on myself", es: "Se volvió contra mí" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "억울함", en: "feeling wronged", es: "sensación de injusticia" },
    { ko: "서운함", en: "hurt", es: "dolor" },
    { ko: "무시당한 느낌", en: "feeling dismissed", es: "sentir que no te toman en cuenta" },
    { ko: "무력감", en: "helplessness", es: "impotencia" },
  ],
  contradictions: [
    "참는다면서 나중에 터진다.",
    "괜찮다면서 계속 곱씹는다.",
  ],
  reframe: {
    selfBlame: "나는 성격이 나빠",
    direction: "지키고 싶은 선이 분명하다는 신호",
  },
  extractFields: [
    { key: "anger_underneath", description: "화 아래에 깔린 1차 감정(억울함, 서운함, 무시당한 느낌 등)" },
    { key: "crossed_line", description: "그 순간 침범된 선(지키고 싶었던 것)" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "화의 빙산", en: "The anger iceberg", es: "El iceberg del enfado" },
      instruction: "겉으로 보인 화, 그 아래의 감정, 침범된 선을 대화에 나온 실제 장면으로 세 층으로 그린다. 화가 어디로 갔는지(삼킴, 터짐, 곱씹음)를 짚되 화 자체를 나쁜 것으로 쓰지 않는다.",
    },
    module_deep: {
      title: { ko: "선을 말로 긋는 법", en: "Drawing your line in words", es: "Cómo poner tus límites en palabras" },
      instruction: "이 사람의 상황과 상대에 맞춘 경계 문장 2~3개를 이 사람의 말투로 제시한다. 상대를 공격하거나 관계를 끊으라는 식으로 쓰지 않는다.",
    },
  },
  strengthDirections: ["정의감", "솔직함", "자기를 지키는 감각"],
  caution: "타인이나 자신을 해치는 언급이 나오면 규칙 0 안전 프로토콜이 우선한다.",
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 화를 참다가 눌러 삼키거나, 갑자기 터뜨리거나, 지난 뒤에도 그 장면을 계속 곱씹었던 패턴이 이번이 처음인지, 예전에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE7: ModulePlaybook = {
  id: "module7",
  lens: "감각 처리 민감성의 네 가지 결(깊이 처리하기, 쉽게 과부하되기, 정서 반응이 크기, 미묘한 것을 알아채기). 약점이 아니라 타고난 처리 방식으로 본다.",
  boundary: "가면(모듈 4)의 관계피로는 연기 비용이고, 예민함은 자극 자체를 깊이 받아들이는 신경계의 방식이다. 번아웃(모듈 3)과 달리 일의 양이 아니라 환경의 자극을 본다.",
  signatureQuestion: {
    ko: "다른 사람은 못 느끼는데 나만 먼저 알아채는 것, 뭐가 있어요?",
    en: "What's something you pick up on before anyone else does, something other people don't seem to notice?",
    es: "¿Qué es algo que tú notas antes que nadie, algo que a los demás parece pasárseles?",
  },
  signatureStage: "D",
  stages: {
    A: "최근 버거웠던 환경(소리, 빛, 냄새, 사람 많은 자리)과 어떤 자극이 먼저 들어왔는지 묻는다.",
    B: "압도됐을 때의 느낌을 좁힌다. 짜증인지, 멍해짐인지, 도망치고 싶음인지.",
    C: "과부하가 오는 상황들과, 회복하는 데 걸리는 시간을 묻는다.",
    D: "시그니처 질문으로 미묘한 것을 알아채는 감각을 묻고, '예민하다'는 말을 처음 들은 기억을 묻는다.",
    E: "과부하 뒤 회복하는 방법과, 충전되는 자극(자연, 음악, 혼자만의 공간)을 묻는다.",
    F: "주변이 내 예민함을 어떻게 대하는지, 그걸 이해해 주는 사람이 있는지 묻는다.",
    G: "내 감각에 맞는 하루라면 어떤 모습일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "지금의 나",
    listener: "'너무 예민하다'는 말을 듣고 있는 어린아이",
    why: "그 말을 처음 들은 기억(단계 D)과 이어진다. 그 아이에게 해 주고 싶은 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "자극과부하",
      options: [
        { ko: "소리나 빛 같은 감각이었어요", en: "It was sensory, like noise or light", es: "Fue algo sensorial, como el ruido o la luz" },
        { ko: "사람들의 감정이었어요", en: "It was other people's emotions", es: "Fueron las emociones de la gente" },
      ],
    },
    {
      name: "낮은감각역치",
      options: [
        { ko: "자리를 떴어요", en: "I left", es: "Me fui de allí" },
        { ko: "참고 버텼어요", en: "I pushed through it", es: "Aguanté como pude" },
      ],
    },
    {
      name: "심미적민감성",
      options: [
        { ko: "아름다운 것에 깊이 흔들려요", en: "Beautiful things move me deeply", es: "Las cosas bellas me conmueven profundamente" },
        { ko: "그런 편은 아니에요", en: "Not really", es: "No tanto" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "압도됨", en: "overwhelm", es: "agobio" },
    { ko: "짜증", en: "irritation", es: "irritación" },
    { ko: "깊은 감동", en: "being deeply moved", es: "emoción profunda" },
  ],
  contradictions: [
    "사람을 좋아하면서 금방 지친다.",
    "예민한 게 싫다면서 그 덕분에 남들이 못 보는 걸 알아챈다.",
  ],
  reframe: {
    selfBlame: "내가 유난이야",
    direction: "남들보다 더 깊이, 더 많이 처리하는 신경계를 가진 것",
  },
  extractFields: [
    { key: "drain_stimulus", description: "소모시키는 자극(소리, 빛, 사람 많은 자리, 다른 사람의 감정 등)" },
    { key: "charge_stimulus", description: "충전되는 자극(자연, 음악, 혼자만의 공간 등)" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "나의 감각 프로필", en: "Your sensory profile", es: "Tu perfil sensorial" },
      instruction: "네 가지 결(깊이 처리, 과부하, 큰 정서 반응, 미묘한 것 알아채기) 중 이 사람에게 두드러진 것과, 소모시키는 자극과 충전되는 자극을 대화 재료로 그린다. 예민함을 고쳐야 할 결함으로 쓰지 않는다.",
    },
    module_deep: {
      title: { ko: "내 신경계에 맞는 환경 설계", en: "Designing surroundings that suit your nervous system", es: "Un entorno a la medida de tu sistema nervioso" },
      instruction: "공간, 일정, 관계에서 이 사람이 실제로 바꿀 수 있는 것을 이 사람의 소모·충전 자극에 맞춰 구체적으로 제시한다.",
    },
  },
  strengthDirections: ["섬세한 관찰력", "깊은 공감", "미적 감각"],
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 소리·빛·사람 많은 상황 같은 자극에 압도돼 버거워졌던 순간이 이번이 처음인지, 예전에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE8: ModulePlaybook = {
  id: "module8",
  lens: "잠들기 전 각성(생각이 도는 인지적 각성, 몸이 풀리지 않는 신체적 각성)과 수면 문제의 3P 관점(원래 가진 경향, 시작된 계기, 계속되게 만드는 습관). 밤을 하루의 연장선으로 본다.",
  boundary: "번아웃(모듈 3)은 낮의 자원 고갈을 보고, 수면은 하루가 끝나도 꺼지지 않는 각성을 본다.",
  signatureQuestion: {
    ko: "불 끄고 누운 뒤 첫 10분을 영상처럼 틀어 본다면, 머릿속에서 뭐가 재생돼요?",
    en: "If you played back the first ten minutes after you turn off the light like a video, what's running through your head?",
    es: "Si pudieras ver como un video los primeros diez minutos después de apagar la luz, ¿qué se reproduce en tu cabeza?",
  },
  signatureStage: "A",
  stages: {
    A: "최근 잠들지 못한 밤을 묻고, 시그니처 질문(첫 10분 재생)으로 그때 머릿속을 묻는다.",
    B: "그때의 감정을 좁힌다. 초조함인지, 불안인지, 억울함인지.",
    C: "생각이 먼저 도는지, 몸이 먼저 긴장하는지 보고, 잠이 흐트러지기 시작한 시기와 계기를 묻는다.",
    D: "밤이 하루 중 유일한 내 시간인지, 잠드는 걸 미루게 되는 이유를 묻는다.",
    E: "잠들려고 해 본 것들과, 그게 오히려 각성을 키우는지 묻는다.",
    F: "같이 사는 사람이나 낮의 관계가 밤에 따라 들어오는지 묻는다.",
    G: "편하게 잠드는 밤이라면 어떤 장면일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "지금의 나",
    listener: "오늘 밤 불을 끄고 누울 나",
    why: "밤의 각성을 낮에 미리 내려놓는 연습이 된다. 오늘 밤의 나에게 미리 건네 두고 싶은 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "인지적각성",
      options: [
        { ko: "생각이 멈추지 않았어요", en: "My thoughts wouldn't stop", es: "No podía parar de pensar" },
        { ko: "몸이 풀리지 않았어요", en: "My body wouldn't relax", es: "Mi cuerpo no se relajaba" },
      ],
    },
    {
      name: "반추방향",
      options: [
        { ko: "내일 걱정이었어요", en: "I was worrying about tomorrow", es: "Me preocupaba el día siguiente" },
        { ko: "오늘 곱씹기였어요", en: "I was going over today", es: "Le daba vueltas a lo que pasó hoy" },
      ],
    },
    {
      name: "무의식누수",
      options: [
        { ko: "꿈이 선명하게 남아요", en: "My dreams stay vivid", es: "Recuerdo los sueños con claridad" },
        { ko: "거의 기억 안 나요", en: "I barely remember them", es: "Casi no los recuerdo" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "초조함", en: "restlessness", es: "inquietud" },
    { ko: "불안", en: "anxiety", es: "ansiedad" },
    { ko: "억울함", en: "resentment", es: "rabia contenida" },
    { ko: "외로움", en: "loneliness", es: "soledad" },
  ],
  contradictions: [
    "피곤한데 잠들기 싫다.",
    "하루 중 내 시간이 밤뿐이라 놓기 아깝다.",
  ],
  reframe: {
    selfBlame: "잠도 제대로 못 자는 나",
    direction: "낮에 처리할 틈이 없던 것을 밤에 처리하고 있는 것",
  },
  extractFields: [
    { key: "night_replay", description: "밤에 재생되는 주제(무엇이 어떤 순서로 떠오르는지)" },
    { key: "arousal_type", description: "인지적 각성인지 신체적 각성인지(사용자 표현 그대로)" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "밤의 재생 목록", en: "Your nighttime playlist", es: "Tu lista de reproducción nocturna" },
      instruction: "불을 끈 뒤 무엇이 어떤 순서로 떠오르는지를 대화 재료로 그리고, 생각이 먼저인지 몸이 먼저인지 짚는다. 수면 위생 일반론은 쓰지 않는다.",
    },
    module_deep: {
      title: { ko: "하루를 닫는 순서", en: "The order for closing your day", es: "El orden para cerrar tu día" },
      instruction: "낮의 긴장을 밤 전에 내려놓는 이 사람만의 순서를 이 사람의 재생 목록과 하루 흐름에 맞춰 단계로 제시한다.",
    },
  },
  strengthDirections: ["깊이 생각하는 힘", "책임감", "풍부한 내면"],
  caution: "불면증 같은 진단명, 약, 수면 보조제 언급을 하지 않는다.",
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 잠들기 전 머리가 계속 돌아가거나 몸이 긴장한 채로 남아 뒤척였던 밤이 이번이 처음인지, 예전에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE9: ModulePlaybook = {
  id: "module9",
  lens: "가족 체계 이론. 자기 분화(가족과 연결된 채로 나로 존재하는 정도), 삼각관계(두 사람의 갈등에 끌려 들어가는 제3자), 정서적 단절, 그리고 부모화(도구적 부모화: 집안일과 돌봄 / 정서적 부모화: 부모의 감정 받아 주기).",
  boundary: "애착(모듈 1)은 지금의 친밀한 관계를 보고, 원가족은 가족이라는 체계 안에서 내가 맡은 자리와 그게 지금까지 따라오는 방식을 본다.",
  signatureQuestion: {
    ko: "가족 안에서 내 자리에 이름을 붙인다면요? 중재자, 보호자, 착한 아이, 조용한 아이… 어떤 게 가까워요?",
    en: "If you gave your place in your family a name, what would it be? The peacekeeper, the protector, the good kid, the quiet one... which feels closest?",
    es: "Si le pusieras nombre a tu lugar en la familia, ¿cuál sería? ¿La persona que media, la que protege, la que siempre se porta bien, la que no hace ruido...? ¿Cuál se acerca más?",
  },
  signatureStage: "C",
  stages: {
    A: "최근 가족과의 통화나 만남과, 끝나고 남은 느낌을 묻는다.",
    B: "그 뒤의 감정을 좁힌다. 죄책감인지, 서운함인지, 무거운 책임감인지.",
    C: "시그니처 질문으로 가족 안의 내 자리를 묻고, 그 자리를 언제부터 맡았는지 묻는다.",
    D: "가족 사이 갈등에 끌려 들어간 경험(삼각관계)과, 그 자리를 내려놓으면 무슨 일이 일어날 것 같은지 묻는다.",
    E: "가족과의 거리를 조절하는 방법(연락 빈도, 선 긋기)을 묻는다.",
    F: "가족 안의 그 역할이 지금 친구나 연인, 직장에서도 반복되는지 묻는다.",
    G: "가족과 연결된 채로 나로 있을 수 있다면 어떤 모습일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "지금의 나",
    listener: "그 집에서 너무 일찍 어른이 되어야 했던 어린 나",
    why: "부모화된 자리를 어른이 된 내가 알아봐 준다. 그 어린 나에게 해 주고 싶은 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "정서적얽힘",
      options: [
        { ko: "너무 가까워서 힘들어요", en: "It's hard because we're too close", es: "Me cuesta porque estamos demasiado cerca" },
        { ko: "너무 멀어서 힘들어요", en: "It's hard because we're too distant", es: "Me cuesta porque estamos demasiado lejos" },
      ],
    },
    {
      name: "역할부담",
      options: [
        { ko: "챙기는 쪽이었어요", en: "I was the one taking care of others", es: "Yo era quien cuidaba de los demás" },
        { ko: "챙김받는 쪽이었어요", en: "I was the one being taken care of", es: "Yo era a quien cuidaban" },
      ],
    },
    {
      name: "정서적단절",
      options: [
        { ko: "연락 뒤에 죄책감이 남아요", en: "I'm left with guilt after we talk", es: "Después de hablar me queda culpa" },
        { ko: "피로가 남아요", en: "I'm left drained", es: "Me queda el cansancio" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "죄책감", en: "guilt", es: "culpa" },
    { ko: "서운함", en: "hurt", es: "dolor" },
    { ko: "무거운 책임감", en: "a heavy sense of responsibility", es: "un peso de responsabilidad" },
    { ko: "해방감", en: "a sense of release", es: "sensación de liberación" },
  ],
  contradictions: [
    "거리를 두면서도 계속 신경 쓴다.",
    "벗어나고 싶은데 그 역할을 놓지 못한다.",
  ],
  reframe: {
    selfBlame: "나는 못된 자식이야",
    direction: "너무 일찍 어른의 자리를 맡았던 사람이 이제 자기 자리를 찾으려는 것",
  },
  extractFields: [
    { key: "family_role", description: "가족 안에서 내 자리의 이름(사용자 표현 그대로)" },
    { key: "role_carryover", description: "그 역할이 지금 옮겨 온 다른 관계(친구, 연인, 직장 등)" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "가족 안의 내 자리", en: "Your place in the family", es: "Tu lugar en la familia" },
      instruction: "이 사람이 가족 안에서 맡은 자리의 이름, 언제부터 맡았는지, 지금 어느 관계로 옮겨 왔는지를 대화 재료로 그린다. 가족 구성원을 탓하는 문장으로 쓰지 않는다.",
    },
    module_deep: {
      title: { ko: "연결된 채로 나로 있기", en: "Staying connected while staying yourself", es: "Seguir en contacto sin dejar de ser tú" },
      instruction: "가족과의 거리 조절과 선 긋기를 이 사람의 실제 연락 방식과 상황에 맞춰 구체적으로 제시한다. 연을 끊으라거나 화해하라는 결론을 내리지 않는다.",
    },
  },
  strengthDirections: ["책임감", "돌보는 힘", "갈등을 읽는 감각"],
  caution: "부모나 형제 구성을 가정하지 않는다. 성별 중립으로 쓴다(한부모, 조부모 양육, 입양, 위탁 등 모두 자연스럽게 읽혀야 한다).",
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 가족과 지나치게 얽히거나, 반대로 마음의 문을 닫아버리거나, 일찍부터 어른 역할을 떠맡았던 장면이 이번 일과 비슷하게 예전에도 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE10: ModulePlaybook = {
  id: "module10",
  lens: "몰입 이론(도전과 실력이 맞을 때 몰입이 켜진다)과 주의 잔여(한 일에서 다른 일로 넘어갈 때 주의가 남아 흩어지는 현상), 보상 민감성(새로움과 즉각적 보상에 끌리는 정도). 주의를 의지가 아니라 조건의 문제로 본다.",
  boundary: "실행력(모듈 5)은 시작 직전의 브레이크를 보고, 몰입은 시작한 뒤 주의가 흩어지거나 과하게 빠지는 조건을 본다.",
  signatureQuestion: {
    ko: "시간 가는 줄 몰랐던 마지막 순간은 뭘 할 때였어요? 그때 일이 쉬웠어요, 딱 적당히 어려웠어요?",
    en: "The last time you completely lost track of time, what were you doing? Was it easy, or just the right amount of hard?",
    es: "La última vez que se te pasó el tiempo volando, ¿qué estabas haciendo? ¿Era fácil o tenía justo la dificultad adecuada?",
  },
  signatureStage: "C",
  stages: {
    A: "최근 집중이 흩어진 순간과, 무엇이 주의를 가져갔는지 묻는다.",
    B: "흩어질 때의 감정을 좁힌다. 답답함인지, 들뜸인지, 자책인지.",
    C: "시그니처 질문으로 몰입의 조건을 묻고, 흩어지는 조건과 불붙는 조건이 어떻게 다른지 묻는다.",
    D: "'집중 못 하는 사람'이라는 말을 들어 온 경험과, 그 말이 나를 어떻게 바꿨는지 묻는다.",
    E: "집중하려고 쓰는 방법과, 순간적으로 저질렀던 결정과 그 뒤의 느낌을 묻는다.",
    F: "주변이 내 집중 방식을 어떻게 보는지, 나와 리듬이 맞는 사람이 있는지 묻는다.",
    G: "내 주의 방식에 맞춘 하루라면 어떤 모습일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "시간 가는 줄 모르고 빠져 있던 그 순간의 나",
    listener: "흩어져 있는 지금의 나",
    why: "같은 사람 안에 이미 몰입 조건이 있다는 걸 보게 한다. 그 순간의 내가 지금의 나에게 해 줄 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "산만함",
      options: [
        { ko: "시작이 어려워요", en: "Getting started is the hard part", es: "Lo difícil es empezar" },
        { ko: "유지가 어려워요", en: "Keeping it going is the hard part", es: "Lo difícil es mantenerme" },
      ],
    },
    {
      name: "과집중",
      options: [
        { ko: "흥미가 있을 때만 켜져요", en: "It only switches on when I'm interested", es: "Solo se enciende cuando algo me interesa" },
        { ko: "압박이 있을 때 켜져요", en: "It switches on under pressure", es: "Se enciende cuando hay presión" },
      ],
    },
    {
      name: "충동성",
      options: [
        { ko: "저지르고 후회했어요", en: "I jumped in and regretted it", es: "Me lancé y me arrepentí" },
        { ko: "저지르고 만족했어요", en: "I jumped in and was glad I did", es: "Me lancé y me alegré de hacerlo" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "답답함", en: "frustration", es: "frustración" },
    { ko: "들뜸", en: "restless excitement", es: "entusiasmo inquieto" },
    { ko: "후회", en: "regret", es: "arrepentimiento" },
    { ko: "몰입의 쾌감", en: "the thrill of being absorbed", es: "el gusto de estar absorto en algo" },
  ],
  contradictions: [
    "산만하다면서 어떤 일에는 몇 시간씩 빠진다.",
  ],
  reframe: {
    selfBlame: "나는 의지가 약해",
    direction: "관심과 적당한 도전이 연료인 방식으로 움직이는 것",
  },
  extractFields: [
    { key: "focus_on", description: "몰입이 켜지는 조건(어떤 일, 어떤 난이도, 어떤 환경)" },
    { key: "focus_off", description: "주의가 흩어지는 조건" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "집중 스위치", en: "Your focus switch", es: "Tu interruptor de concentración" },
      instruction: "몰입이 켜지는 조건과 꺼지는 조건을 대화에 나온 실제 장면으로 나란히 그린다. 주의를 의지나 성격 문제로 쓰지 않는다.",
    },
    module_deep: {
      title: { ko: "몰입을 설계하는 법", en: "How to design for focus", es: "Cómo diseñar tu concentración" },
      instruction: "도전 수준 맞추기, 전환 비용 줄이기 등 이 사람의 켜짐·꺼짐 조건에 맞춘 구체적 장치를 제시한다. 일반적인 집중법 목록은 쓰지 않는다.",
    },
  },
  strengthDirections: ["폭발적 몰입력", "호기심", "빠른 실행력"],
  caution: "ADHD 같은 진단명이나 '증상'이라는 말을 쓰지 않는다.",
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 산만해져서 손을 못 대거나, 한번 빠지면 시간 가는 줄 모르거나, 순간적으로 확 저질러버렸던 패턴이 이번이 처음인지, 예전에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

const MODULE11: ModulePlaybook = {
  id: "module11",
  lens: "자기 침묵(관계를 지키려고 내 생각과 욕구를 스스로 누르는 것)과 자기결정성 이론의 자율성(내가 선택했다고 느끼는 정도), 행동 억제와 접근 동기(원하는 걸 향해 가는 힘과 멈추게 하는 힘의 균형).",
  boundary: "가면(모듈 4)은 남에게 보여 주는 모습을 관리하고, 분노(모듈 6)는 침범당한 뒤의 반응이다. 본능은 내가 무엇을 원하는지 알아차리고 스스로 허락하는 힘을 본다.",
  signatureQuestion: {
    ko: "최근에 입 밖으로 나오기 직전에 삼킨 문장이 있다면, 그대로 옮겨 볼 수 있어요?",
    en: "Is there a sentence you swallowed recently, right before it came out? Could you write it here just as it was?",
    es: "¿Hay alguna frase que te hayas tragado hace poco, justo antes de decirla? ¿Podrías escribirla aquí tal cual?",
  },
  signatureStage: "A",
  stages: {
    A: "최근 하고 싶은 말이나 행동을 삼킨 순간을 묻고, 시그니처 질문으로 삼킨 한 문장을 묻는다.",
    B: "삼킨 뒤의 감정을 좁힌다. 답답함인지, 아쉬움인지, 안도인지.",
    C: "어떤 자리에서 주로 삼키는지, '아무거나', '괜찮아'를 얼마나 자주 말하는지 묻는다.",
    D: "원하는 걸 말했을 때 돌아왔던 반응과, 원하는 걸 드러내면 무슨 일이 일어날 것 같은지 묻는다.",
    E: "삼킨 욕구가 어디로 가는지(잊기, 혼자 채우기, 나중에 터지기) 묻는다.",
    F: "원하는 걸 편하게 말할 수 있는 사람이 있는지, 그 사람 앞에서는 무엇이 다른지 묻는다.",
    G: "나에게 작은 허락을 준다면 무엇부터일지 묻는다.",
  },
  perspectiveShift: {
    speaker: "하고 싶은 걸 거리낌 없이 말하던 어린 시절의 나",
    listener: "지금의 나",
    why: "삼키기 전의 목소리가 원래 내 것이었음을 떠올린다. 그 시절의 내가 지금의 나에게 해 줄 말을 묻는다.",
  },
  forcedChoiceAxes: [
    {
      name: "표현억제",
      options: [
        { ko: "말하고 싶었어요", en: "I wanted to say something", es: "Quería decir algo" },
        { ko: "해 보고 싶었어요", en: "I wanted to do something", es: "Quería hacer algo" },
      ],
    },
    {
      name: "즉흥성억제",
      options: [
        { ko: "튈까 봐서요", en: "I didn't want to stand out", es: "No quería llamar la atención" },
        { ko: "틀릴까 봐서요", en: "I was afraid of being wrong", es: "Tenía miedo de equivocarme" },
      ],
    },
    {
      name: "확신부족",
      options: [
        { ko: "나중에 후회했어요", en: "I regretted it later", es: "Después me arrepentí" },
        { ko: "오히려 안도했어요", en: "I was actually relieved", es: "En realidad sentí alivio" },
      ],
    },
  ],
  emotionPalette: [
    { ko: "답답함", en: "frustration", es: "frustración" },
    { ko: "아쉬움", en: "a sense of missed chance", es: "la sensación de haberlo dejado pasar" },
    { ko: "안도", en: "relief", es: "alivio" },
    { ko: "설렘", en: "a flutter of excitement", es: "ilusión" },
  ],
  contradictions: [
    "원하는 게 분명한데 '아무거나'라고 말한다.",
    "자유롭고 싶다면서 허락을 기다린다.",
  ],
  reframe: {
    selfBlame: "나는 줏대가 없어",
    direction: "관계를 지키려고 내 목소리를 먼저 낮추는 법을 너무 잘 배운 것",
  },
  extractFields: [
    { key: "swallowed_line", description: "삼킨 문장이나 욕구(사용자 표현 그대로)" },
    { key: "permission_needed", description: "허락이 필요했던 순간(누구의, 어떤 허락)" },
  ],
  reportPages: {
    module_map: {
      title: { ko: "내가 삼킨 것들", en: "What you've been swallowing", es: "Lo que te has ido tragando" },
      instruction: "이 사람이 삼킨 문장이나 욕구를 대화 재료 그대로 옮기고, 삼킨 것이 어디로 가는지(잊기, 혼자 채우기, 나중에 터지기)를 그린다. 줏대 없음이라는 평가로 들리지 않게 쓴다.",
    },
    module_deep: {
      title: { ko: "나에게 주는 작은 허락", en: "Small permissions to give yourself", es: "Pequeños permisos para ti" },
      instruction: "이 사람의 상황에 맞춘 허락 연습 3단계를 가장 부담이 적은 자리부터 순서대로 제시한다.",
    },
  },
  strengthDirections: ["신중함", "배려", "잠재된 생동감"],
  patternTurnInstruction: `지금은 7번째 응답입니다 (반복 패턴/Pattern, 열림). 하고 싶은 말이나 행동을 삼키거나, 확신이 없어서 물러섰던 장면이 이번이 처음인지, 예전에도 비슷하게 반복됐는지 여는 질문으로 물으세요.`,
};

export const MODULE_PLAYBOOKS: Record<PlaybookModuleId, ModulePlaybook> = {
  module1: MODULE1,
  module2: MODULE2,
  module3: MODULE3,
  module4: MODULE4,
  module5: MODULE5,
  module6: MODULE6,
  module7: MODULE7,
  module8: MODULE8,
  module9: MODULE9,
  module10: MODULE10,
  module11: MODULE11,
};

/** moduleId가 없거나 알 수 없으면 undefined(웹, 구버전 앱). */
export function getModulePlaybook(moduleId?: string | null): ModulePlaybook | undefined {
  if (!moduleId || !Object.prototype.hasOwnProperty.call(MODULE_PLAYBOOKS, moduleId)) return undefined;
  return MODULE_PLAYBOOKS[moduleId as PlaybookModuleId];
}
