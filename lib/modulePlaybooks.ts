/**
 * lib/modulePlaybooks.ts
 * ------------------------------------------------------------------
 * MODULE_PLAYBOOK.md(v2, 2026-09-27 확정)를 코드로 옮긴 데이터. 11개 모듈이
 * 각자 어떤 전문 관점으로 20턴 대화를 이끌고, 대화에서 무엇을 뽑아 리포트의
 * 모듈 전용 페이지 2장(module_map 무료, module_deep 유료)에 무엇을 쓰는지를
 * 정한다.
 *
 * 이 파일은 데이터만 담는다. 챗봇 프롬프트(lib/chatPrompts.ts), 추출
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
 * 2026-09-27: 모듈 1~4 추가(TODO F0-a). 모듈 5~11은 F0-b에서 채운다.
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

/**
 * 모듈 5~11은 TODO F0-b에서 채운다. 그 전까지 없는 모듈은
 * getModulePlaybook()이 undefined를 돌려주고, 호출하는 쪽은 기존 공통 지침으로
 * 폴백한다.
 */
export const MODULE_PLAYBOOKS: Partial<Record<PlaybookModuleId, ModulePlaybook>> = {
  module1: MODULE1,
  module2: MODULE2,
  module3: MODULE3,
  module4: MODULE4,
};

/** moduleId가 없거나 알 수 없으면 undefined(웹, 구버전 앱). */
export function getModulePlaybook(moduleId?: string | null): ModulePlaybook | undefined {
  if (!moduleId) return undefined;
  return MODULE_PLAYBOOKS[moduleId as PlaybookModuleId];
}
