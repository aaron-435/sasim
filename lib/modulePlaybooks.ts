/**
 * lib/modulePlaybooks.ts
 * ------------------------------------------------------------------
 * MODULE_PLAYBOOK.md(v2, 2026-09-27 확정)를 코드로 옮긴 데이터. 11개 모듈이
 * 각자 어떤 전문 관점으로 20턴 대화를 이끌고, 대화에서 무엇을 뽑아 리포트의
 * 모듈 전용 페이지 2장(module_map 무료, module_deep 유료)에 무엇을 쓰는지를
 * 정한다.
 *
 * 이 파일은 데이터만 담는다. 챗봇 프롬프트(lib/chatPrompts.ts의 2~19턴
 * 지침), 추출 프롬프트, 리포트 프롬프트(lib/reportPrompts.ts)가 이 데이터를
 * 읽는다.
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
 * 2026-09-27: 챗봇 2~19턴이 stages/signatureQuestion/perspectiveShift로
 *   모듈별 지침을 만들게 되어 patternTurnInstruction을 지웠다(TODO Q1-a).
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

// ------------------------------------------------------------------
// 5세트 흐름(flowVersion 2) 데이터. CHAT_SETS_DRAFT.md 2장(후보 문항)과
// 8·9장(세트 ③④⑤ 질문)을 코드로 옮긴 것이다. 위의 stages/signatureStage는
// 구버전 20턴 흐름이 계속 쓰므로 그대로 둔다.
//
// 2026-10-02: 타입, 24턴 고정 문구, 모듈 1~4 추가(TODO 1). 모듈 5~11 추가(TODO 2).
// ------------------------------------------------------------------

/** 세트 번호. 1 장면, 2 반복, 3 속마음, 4 대처, 5 힘(11개 모듈 공통). */
export type ChatSetNumber = 1 | 2 | 3 | 4 | 5;

export type ChatSetTheme = "scene" | "repeat" | "inner" | "coping" | "strength";

/** 세트 주제(모델용, 한국어). 사용자에게 보이는 라벨은 앱 i18n에 따로 둔다. */
export const CHAT_SET_THEMES: Record<ChatSetNumber, { key: ChatSetTheme; name: string; description: string }> = {
  1: { key: "scene", name: "장면", description: "요즘 가장 걸리는 순간" },
  2: { key: "repeat", name: "반복", description: "같은 일이 되풀이되는 순서" },
  3: { key: "inner", name: "속마음", description: "그 아래 있는 믿음과 두려움" },
  4: { key: "coping", name: "대처", description: "지금 쓰는 방법과 그 대가" },
  5: { key: "strength", name: "힘", description: "잘 되는 쪽, 바라는 모습" },
};

/**
 * 24턴(관점 전환) 앞머리 고정 문구. 모델이 바꿔 쓰지 않도록 코드가 응답 앞에
 * 붙이고, 모델은 그 뒤의 관점 전환 질문만 쓴다.
 */
export const PERSPECTIVE_SHIFT_LEAD: LocalizedText = {
  ko: "마지막으로 묻고 싶은 게 있어요.",
  en: "There's one last thing I'd like to ask.",
  es: "Hay una última cosa que quiero preguntarte.",
};

/**
 * 세트 ③④⑤ 질문. 보기는 질문 문장 안에 들어 있다(앱 버튼이 아니라 말풍선
 * 속 문장으로 보인다). 모델은 앞머리 한 줄로 직전 답을 받은 뒤 이 방향으로
 * 자연스럽게 묻는다.
 */
export interface ChatSetQuestion {
  text: LocalizedText;
  /** 자유 서술 질문(이지선다가 아님). */
  free?: boolean;
  /** 모듈 시그니처 질문(★). text는 플레이북의 signatureQuestion과 같다. */
  signature?: boolean;
}

export interface ChatSet {
  set: ChatSetNumber;
  /** 이 모듈에서 세트가 보는 구체적인 장면(모델용, 한국어). 예: "신호에 흔들릴 때". */
  focus: string;
  /**
   * 세트 ①에서 인용할 퀴즈 문항 ID 후보. 순서가 곧 동점 우선순위다.
   * 세트 1~4는 가장 높은 점수(2~3점), 세트 5는 strengthScoreDirection을 따른다.
   */
  candidates: readonly string[];
  /** 인용할 문항이 없을 때 세트 ①에서 묻는 기본 질문. */
  fallbackQuestion: LocalizedText;
  /**
   * ③④⑤ 질문. 세트 2는 ③④만(⑤ 자리가 10턴 정리·점검), 세트 5는 ③만
   * (④ 관점 전환, ⑤ 마무리).
   */
  questions: readonly ChatSetQuestion[];
  /** 세트 2 전용: ③이나 ④가 이미 답해졌을 때 대신 묻는 질문. */
  alternate?: ChatSetQuestion;
}

export interface ModuleChatSets {
  /** 세트 1~5 순서. */
  sets: readonly [ChatSet, ChatSet, ChatSet, ChatSet, ChatSet];
  /**
   * 세트 5 ①의 인용 문항 방향. 기본 "low"(0~1점, "이건 별로 안 그렇다"로
   * 강점을 연다). 모듈 7·10은 높은 점수가 곧 강점이라 "high".
   */
  strengthScoreDirection: "low" | "high";
}

const MODULE1_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "신호에 흔들릴 때",
      candidates: ["A6", "A2", "V10", "V5"],
      fallbackQuestion: {
        ko: "요즘 가까운 사람과의 사이에서 늦은 답장이나 달라진 말투 같은 작은 신호에 마음이 흔들렸던 순간이 있었다면, 언제였어요?",
        en: "Lately, was there a moment when a small signal from someone close, like a late reply or a change in tone, shook you a little? When was it?",
        es: "Últimamente, ¿hubo algún momento en que una señal pequeña de alguien cercano, como una respuesta tardía o un cambio de tono, te removió por dentro? ¿Cuándo fue?",
      },
      questions: [
        { text: MODULE1.signatureQuestion, signature: true },
        {
          text: {
            ko: "그럴 때 확인하고 싶어져요, 조용히 기다려요?",
            en: "In those moments, do you feel the urge to check in, or do you wait quietly?",
            es: "En esos momentos, ¿te dan ganas de comprobar qué pasa o esperas en silencio?",
          },
        },
        {
          text: {
            ko: "상대가 먼저 성큼 다가오면 반가워요, 살짝 부담돼요?",
            en: "When the other person moves in close first, and quickly, does it feel welcome or a little heavy?",
            es: "Cuando la otra persona se acerca primero y con ganas, ¿te alegra o te pesa un poco?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "다툰 뒤",
      candidates: ["A5", "A9", "V13", "V7"],
      fallbackQuestion: {
        ko: "다투거나 서운한 일이 생긴 뒤에 늘 비슷하게 흘러가는 순서가 있다면, 보통 어떻게 흘러가요?",
        en: "After an argument or a hurt, is there a sequence things tend to follow? How does it usually go?",
        es: "Después de una discusión o de algo que te dolió, ¿suele repetirse la misma secuencia? ¿Cómo suele ir?",
      },
      questions: [
        {
          text: {
            ko: "서운할 때 말로 해요, 괜찮은 척해요?",
            en: "When something hurts, do you say so, or act like you're fine?",
            es: "Cuando algo te duele, ¿lo dices o haces como si todo estuviera bien?",
          },
        },
        {
          text: {
            ko: "다툰 뒤에는 먼저 손 내미는 편이에요, 기다리는 편이에요?",
            en: "After a fight, are you usually the one who reaches out first, or the one who waits?",
            es: "Después de una pelea, ¿sueles ser quien da el primer paso o quien espera?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "이 흐름, 예전 연애에서도 있었어요, 이번이 처음이에요?",
          en: "Has this pattern shown up in past relationships too, or is this the first time?",
          es: "¿Este patrón ya aparecía en relaciones anteriores o es la primera vez?",
        },
      },
    },
    {
      set: 3,
      focus: "가까워질수록",
      candidates: ["A15", "A8", "V3", "V4", "V12"],
      fallbackQuestion: {
        ko: "관계가 가까워질수록 마음속에서 커지는 생각이 있다면, 어떤 생각이에요?",
        en: "As a relationship gets closer, is there a thought that grows louder inside you? What is it?",
        es: "A medida que una relación se vuelve más cercana, ¿hay algún pensamiento que crece por dentro? ¿Cuál es?",
      },
      questions: [
        {
          text: {
            ko: "사랑받는다고 느끼는 건 말을 들을 때예요, 행동을 볼 때예요?",
            en: "Do you feel loved more when you hear it, or when you see it in what they do?",
            es: "¿Sientes que te quieren más cuando te lo dicen o cuando lo ves en lo que hacen?",
          },
        },
        {
          text: {
            ko: "상대가 아주 잘해 주면 편해져요, 오히려 불안해져요?",
            en: "When someone treats you really well, do you relax, or does it make you more uneasy?",
            es: "Cuando alguien te trata muy bien, ¿te relajas o te inquieta todavía más?",
          },
        },
        {
          text: {
            ko: "'사랑받으려면 ___해야 한다'에서 빈칸에 뭐가 들어갈 것 같아요?",
            en: "\"To be loved, I have to ___.\" What would you put in the blank?",
            es: "\"Para que me quieran, tengo que ___.\" ¿Qué pondrías en el espacio en blanco?",
          },
          free: true,
        },
      ],
    },
    {
      set: 4,
      focus: "기대기와 혼자",
      candidates: ["A14", "A10", "V2", "V6"],
      fallbackQuestion: {
        ko: "가까운 사람과의 사이가 불편해질 때 주로 어떻게 해요?",
        en: "When things feel uneasy between you and someone close, what do you usually do?",
        es: "Cuando algo se siente incómodo con alguien cercano, ¿qué sueles hacer?",
      },
      questions: [
        {
          text: {
            ko: "마음이 불편할 때 혼자 삭여요, 누군가에게 털어놔요?",
            en: "When you're upset, do you keep it to yourself, or talk it out with someone?",
            es: "Cuando algo te inquieta, ¿lo guardas para ti o se lo cuentas a alguien?",
          },
        },
        {
          text: {
            ko: "그 방법이 끝나고 나면 상대와 더 가까워져요, 멀어져요?",
            en: "After you do that, do you end up closer to the other person, or further apart?",
            es: "Después de hacerlo, ¿terminas más cerca de la otra persona o más lejos?",
          },
        },
        {
          text: {
            ko: "상대는 가까워질 때 먼저 다가오는 편이에요, 기다리는 편이에요?",
            en: "And the other person: when it comes to getting closer, do they tend to come toward you first, or wait?",
            es: "¿Y la otra persona? A la hora de acercarse, ¿suele dar el primer paso o esperar?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "관계에서 흔들리지 않는 쪽",
      candidates: ["A4", "A13", "V9", "V15"],
      fallbackQuestion: {
        ko: "관계에서 '이건 내가 꽤 잘하는구나' 싶은 순간이 있다면, 어떤 때예요?",
        en: "In your relationships, when do you catch yourself thinking, \"I'm actually pretty good at this\"?",
        es: "En tus relaciones, ¿en qué momentos piensas \"esto se me da bastante bien\"?",
      },
      questions: [
        {
          text: {
            ko: "안정적인 관계라면 같이 있는 시간이 많은 쪽이에요, 각자의 시간을 지키는 쪽이에요?",
            en: "In a steady relationship, would it be lots of time together, or each of you keeping your own time?",
            es: "En una relación estable, ¿sería pasar mucho tiempo en compañía o que cada quien conserve su propio tiempo?",
          },
        },
      ],
    },
  ],
};

const MODULE2_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "돈을 쓰는 순간",
      candidates: ["S3", "S8", "G6", "G9", "M1"],
      fallbackQuestion: {
        ko: "최근에 돈을 쓰면서 마음이 쓰였던 순간이 있었다면, 무엇을 살 때였어요?",
        en: "Was there a recent moment when spending money stirred something in you? What were you buying?",
        es: "¿Hubo hace poco algún momento en que gastar dinero te removió algo por dentro? ¿Qué estabas comprando?",
      },
      questions: [
        {
          text: {
            ko: "결제 직전에 '이거 꼭 필요해?' 하고 멈추는 편이에요, 일단 사고 나중에 생각하는 편이에요?",
            en: "Right before paying, do you tend to stop and ask \"Do I really need this?\", or buy first and think later?",
            es: "Justo antes de pagar, ¿sueles frenar y preguntarte \"¿de verdad lo necesito?\" o compras primero y lo piensas después?",
          },
        },
        {
          text: {
            ko: "결제하고 나면 남는 건 안도예요, 찜찜함이에요?",
            en: "After you pay, what stays with you: relief, or a nagging unease?",
            es: "Después de pagar, ¿qué te queda: alivio o una sensación incómoda?",
          },
        },
        {
          text: {
            ko: "잔고는 자주 확인해요, 일부러 안 봐요?",
            en: "Do you check your balance often, or avoid looking on purpose?",
            es: "¿Revisas tu saldo a menudo o evitas mirarlo a propósito?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "남과 비교할 때",
      candidates: ["S6", "G3", "G8", "M7"],
      fallbackQuestion: {
        ko: "다른 사람의 돈 얘기를 듣고 마음이 움직였던 때가 있었다면, 그다음엔 어떻게 흘러갔어요?",
        en: "Think of a time someone else's money talk got to you. What happened after that?",
        es: "Piensa en una vez en que lo que alguien contó sobre su dinero te afectó. ¿Qué pasó después?",
      },
      questions: [
        {
          text: {
            ko: "남이 연봉이나 집 얘기를 하면 나랑 비교하게 돼요, 흘려들어요?",
            en: "When people talk about their salary or their home, do you end up comparing, or let it pass?",
            es: "Cuando alguien habla de su sueldo o de su casa, ¿terminas comparándote o lo dejas pasar?",
          },
        },
        {
          text: {
            ko: "비교하고 나면 더 아끼게 돼요, 오히려 더 쓰게 돼요?",
            en: "After comparing, do you end up saving more, or spending more?",
            es: "Después de compararte, ¿terminas ahorrando más o gastando más?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "돈 걱정이 올라올 때 하는 행동이 매번 비슷해요, 그때그때 달라요?",
          en: "When money worries come up, do you tend to do the same thing every time, or does it change?",
          es: "Cuando te sube la preocupación por el dinero, ¿haces casi siempre lo mismo o depende del momento?",
        },
      },
    },
    {
      set: 3,
      focus: "돈과 나의 가치",
      candidates: ["G4", "G10", "M4", "M9", "S9"],
      fallbackQuestion: {
        ko: "돈이 나에게 어떤 의미인지 생각해 보면, 가장 먼저 떠오르는 장면이나 말이 있어요?",
        en: "When you think about what money means to you, is there a scene or a phrase that comes to mind first?",
        es: "Cuando piensas en lo que el dinero significa para ti, ¿hay alguna escena o frase que te venga primero?",
      },
      questions: [
        { text: MODULE2.signatureQuestion, free: true, signature: true },
        {
          text: {
            ko: "어릴 때 집에서 돈 얘기는 자주 나왔어요, 조용히 피하는 주제였어요?",
            en: "Growing up, was money something your family talked about often, or a topic everyone quietly avoided?",
            es: "En tu infancia, ¿en casa se hablaba de dinero a menudo o era un tema que se evitaba en silencio?",
          },
        },
        {
          text: {
            ko: "돈이 충분히 많아지면 마음이 편해질 것 같아요, 다른 걱정이 생길 것 같아요?",
            en: "If you had plenty of money, do you think you'd finally feel at ease, or would new worries show up?",
            es: "Si tuvieras dinero de sobra, ¿crees que por fin estarías en calma o aparecerían otras preocupaciones?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "관리와 관계",
      candidates: ["S5", "S10", "G7", "M3", "M6", "M2"],
      fallbackQuestion: {
        ko: "돈 문제로 마음이 무거울 때 주로 어떻게 해요?",
        en: "When money weighs on you, what do you usually do?",
        es: "Cuando el dinero te pesa, ¿qué sueles hacer?",
      },
      questions: [
        {
          text: {
            ko: "돈 걱정이 오면 계획부터 세워요, 생각을 끄고 딴 걸 해요?",
            en: "When money worries hit, do you start making a plan, or switch off and do something else?",
            es: "Cuando llega la preocupación por el dinero, ¿te pones a planear o desconectas y haces otra cosa?",
          },
        },
        {
          text: {
            ko: "그러고 나면 걱정이 줄어요, 잠깐 미뤄지는 거예요?",
            en: "And after that, does the worry actually shrink, or just get put off for a while?",
            es: "Y después, ¿la preocupación de verdad baja o solo se aplaza un rato?",
          },
        },
        {
          text: {
            ko: "돈 얘기가 가장 불편한 상대는 가족이에요, 친구예요, 연인이에요?",
            en: "Who's hardest to talk about money with: family, friends, or a partner?",
            es: "¿Con quién te cuesta más hablar de dinero: con tu familia, con tus amistades o con tu pareja?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "돈 앞에서 흔들리지 않는 쪽",
      candidates: ["M10", "S2", "G2", "G1"],
      fallbackQuestion: {
        ko: "돈과 관련해서 '이건 내가 꽤 괜찮게 하고 있다' 싶은 부분이 있다면 뭐예요?",
        en: "When it comes to money, is there something you feel you actually handle pretty well?",
        es: "En lo que respecta al dinero, ¿hay algo que sientes que manejas bastante bien?",
      },
      questions: [
        {
          text: {
            ko: "돈과 편안한 사이라면, 월급날 하루는 어떤 모습일 것 같아요?",
            en: "If you and money were on easy terms, what would payday look like?",
            es: "Si tu relación con el dinero fuera tranquila, ¿cómo sería tu día de cobro?",
          },
          free: true,
        },
      ],
    },
  ],
};

const MODULE3_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "하루의 무게",
      candidates: ["E3", "E4", "E7", "C2"],
      fallbackQuestion: {
        ko: "요즘 하루 중에 가장 무겁게 느껴지는 시간이 있다면, 언제예요?",
        en: "Is there a time of day lately that feels the heaviest? When is it?",
        es: "Últimamente, ¿hay algún momento del día que se te hace más pesado? ¿Cuál?",
      },
      questions: [
        {
          text: {
            ko: "그날 마지막 한 방울이 된 건 일의 양이었어요, 사람이었어요?",
            en: "On that day, what was the last straw: the amount of work, or the people?",
            es: "Ese día, ¿qué fue la gota que colmó el vaso: la cantidad de trabajo o la gente?",
          },
        },
        {
          text: {
            ko: "그 지침은 몸이 무거운 쪽이에요, 마음이 식은 쪽이에요?",
            en: "Does that tiredness feel more like a heavy body, or a heart that's gone cold?",
            es: "Ese cansancio, ¿se siente más como un cuerpo pesado o como un ánimo que se ha enfriado?",
          },
        },
        {
          text: {
            ko: "그런 날 퇴근길엔 머릿속이 텅 비어요, 계속 일 생각이에요?",
            en: "On days like that, on the way home, is your mind blank, or still on work?",
            es: "En días así, de camino a casa, ¿tienes la mente en blanco o sigues pensando en el trabajo?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "쉬어도 안 풀릴 때",
      candidates: ["E5", "E9", "C9", "C10", "F4"],
      fallbackQuestion: {
        ko: "쉬어도 잘 풀리지 않는다고 느낀 때가 있었다면, 그때 어떤 흐름이었어요?",
        en: "Was there a time when rest just didn't seem to help? What was going on then?",
        es: "¿Hubo alguna vez en que descansar no parecía servir de nada? ¿Qué estaba pasando entonces?",
      },
      questions: [
        {
          text: {
            ko: "이런 시기, 전에도 있었어요, 이번이 처음이에요?",
            en: "Have you been through a stretch like this before, or is this the first time?",
            es: "¿Ya habías pasado por una etapa así o es la primera vez?",
          },
        },
        {
          text: {
            ko: "그때 더 컸던 건 일이 많은 거였어요, 아무도 알아주지 않는 거였어요?",
            en: "What weighed more then: the sheer amount of work, or that nobody seemed to notice?",
            es: "¿Qué pesaba más entonces: la cantidad de trabajo o que nadie pareciera notarlo?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "요즘 일 얘기를 할 때 진지하게 해요, 농담처럼 넘겨요?",
          en: "These days, when work comes up, do you talk about it seriously, or brush it off with a joke?",
          es: "Últimamente, cuando sale el tema del trabajo, ¿hablas en serio o lo despachas con una broma?",
        },
      },
    },
    {
      set: 3,
      focus: "의미와 자격",
      candidates: ["C5", "C8", "F9", "F3"],
      fallbackQuestion: {
        ko: "처음 이 일을 붙잡게 한 게 뭐였는지 떠올려 보면, 지금은 그게 어디쯤 있는 것 같아요?",
        en: "Think back to what first made you hold on to this work. Where is that now?",
        es: "Piensa en lo que al principio te hizo aferrarte a este trabajo. ¿Dónde está eso ahora?",
      },
      questions: [
        { text: MODULE3.signatureQuestion, free: true, signature: true },
        {
          text: {
            ko: "'쉬면 안 된다'는 느낌은 내 안에서 나와요, 주변 눈치에서 나와요?",
            en: "That feeling of \"I can't rest\": does it come from inside you, or from reading the room around you?",
            es: "Esa sensación de \"no puedo descansar\", ¿sale de ti o de lo que percibes a tu alrededor?",
          },
        },
        {
          text: {
            ko: "처음 이 일을 시작할 때 좋았던 건 일 자체였어요, 잘해 내는 내 모습이었어요?",
            en: "When you first started, what did you like more: the work itself, or seeing yourself do it well?",
            es: "Cuando empezaste, ¿qué te gustaba más: el trabajo en sí o verte haciéndolo bien?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "버티는 방식",
      candidates: ["E8", "C7", "F5", "F6"],
      fallbackQuestion: {
        ko: "요즘 하루하루를 버티게 해 주는 나만의 방식이 있다면, 어떤 거예요?",
        en: "What's your own way of getting through the days lately?",
        es: "Últimamente, ¿cuál es tu manera de ir aguantando los días?",
      },
      questions: [
        {
          text: {
            ko: "쉬는 날엔 진짜 쉬어져요, 쉬면서도 일 생각이 나요?",
            en: "On your days off, do you actually rest, or does work keep creeping into your head?",
            es: "En tus días libres, ¿de verdad descansas o el trabajo se te sigue colando en la cabeza?",
          },
        },
        {
          text: {
            ko: "힘들 때 도와 달라고 말해요, 혼자 끝까지 해요?",
            en: "When it gets hard, do you ask for help, or push through on your own?",
            es: "Cuando se pone difícil, ¿pides ayuda o lo sacas adelante por tu cuenta?",
          },
        },
        {
          text: {
            ko: "직장에 내 상태를 눈치챈 사람이 있어요, 아무도 몰라요?",
            en: "At work, has anyone picked up on how you're doing, or does nobody know?",
            es: "En el trabajo, ¿alguien se ha dado cuenta de cómo estás o nadie lo sabe?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "지친 와중에도 남아 있는 것",
      candidates: ["C3", "F8", "F2", "F7"],
      fallbackQuestion: {
        ko: "지쳐 있는 와중에도 '이건 아직 내가 잘하고 있다' 싶은 게 있다면 뭐예요?",
        en: "Even through the exhaustion, is there something you feel you're still doing well?",
        es: "Incluso con todo el cansancio, ¿hay algo que sientes que todavía haces bien?",
      },
      questions: [
        {
          text: {
            ko: "에너지가 돌아온다면 가장 먼저 하고 싶은 건 뭐예요?",
            en: "If your energy came back, what's the first thing you'd want to do?",
            es: "Si recuperaras la energía, ¿qué es lo primero que te gustaría hacer?",
          },
          free: true,
        },
      ],
    },
  ],
};

const MODULE4_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "사람들 앞의 나",
      candidates: ["IM4", "IM7", "AS7", "SE1"],
      fallbackQuestion: {
        ko: "최근에 사람들과 어울리고 돌아온 날이 있었다면, 그날 집에 와서 어땠어요?",
        en: "Think of a recent day you spent around people. How did you feel once you got home?",
        es: "Piensa en algún día reciente que pasaste con gente. ¿Cómo te sentiste al llegar a casa?",
      },
      questions: [
        {
          text: {
            ko: "그 자리에서 웃은 건 분위기 때문이었어요, 상대 때문이었어요?",
            en: "When you smiled in that moment, was it for the mood in the room, or for the person in front of you?",
            es: "Cuando sonreíste en ese momento, ¿fue por el ambiente o por la persona que tenías delante?",
          },
        },
        {
          text: {
            ko: "자리가 끝난 직후 남은 건 피로예요, 외로움이에요, 안도예요?",
            en: "Right after it ended, what was left: tiredness, loneliness, or relief?",
            es: "Justo al terminar, ¿qué te quedó: cansancio, soledad o alivio?",
          },
        },
        {
          text: {
            ko: "그 자리에서 진짜 하고 싶었던 말이 있었어요, 딱히 없었어요?",
            en: "Was there something you really wanted to say there, or not really?",
            es: "¿Había algo que de verdad querías decir ahí o no especialmente?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "관계마다 다른 나",
      candidates: ["IM5", "IM10", "AS8", "SE8"],
      fallbackQuestion: {
        ko: "만나는 사람에 따라 내 모습이 달라진다고 느낀 적이 있다면, 어떤 관계에서 가장 달라져요?",
        en: "Have you noticed yourself changing depending on who you're with? With whom do you change the most?",
        es: "¿Has notado que cambias según con quién estás? ¿Con quién cambias más?",
      },
      questions: [
        {
          text: {
            ko: "가면이 가장 두꺼워지는 건 처음 보는 사람 앞이에요, 오래 본 사람 앞이에요?",
            en: "When is the mask thickest: with people you've just met, or with people you've known for years?",
            es: "¿Cuándo es más gruesa la máscara: con gente que acabas de conocer o con gente que conoces desde hace años?",
          },
        },
        {
          text: {
            ko: "이렇게 맞추게 된 시점이 기억나요, 늘 이랬던 것 같아요?",
            en: "Do you remember when you started adjusting like this, or does it feel like it's always been this way?",
            es: "¿Recuerdas cuándo empezaste a adaptarte así o sientes que siempre ha sido igual?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "모임 약속이 잡히면 기대돼요, 벌써 피곤해요?",
          en: "When group plans get set, do you look forward to it, or feel tired already?",
          es: "Cuando se cierra un plan con un grupo, ¿te hace ilusión o ya te cansa de antemano?",
        },
      },
    },
    {
      set: 3,
      focus: "들킬까 봐",
      candidates: ["IM9", "IM6", "AS9", "SE7"],
      fallbackQuestion: {
        ko: "진짜 내 모습을 누가 알게 되면 어떨 것 같아요?",
        en: "What do you imagine would happen if someone saw the real you?",
        es: "¿Qué crees que pasaría si alguien viera cómo eres de verdad?",
      },
      questions: [
        { text: MODULE4.signatureQuestion, free: true, signature: true },
        {
          text: {
            ko: "가면을 벗으면 사람들이 실망할 것 같아요, 멀어질 것 같아요?",
            en: "If the mask came off, do you think people would be disappointed, or drift away?",
            es: "Si te quitaras la máscara, ¿crees que la gente se decepcionaría o se alejaría?",
          },
        },
        {
          text: {
            ko: "지금 가면이 지켜 주는 건 나예요, 관계예요?",
            en: "Right now, what is the mask protecting more: you, or the relationship?",
            es: "Ahora mismo, ¿qué protege más la máscara: a ti o a la relación?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "숨기기와 방전",
      candidates: ["AS3", "AS6", "AS10", "SE9", "AS4"],
      fallbackQuestion: {
        ko: "속마음을 숨긴 날, 그 피로는 보통 어떻게 풀어요?",
        en: "On days you've kept your real feelings hidden, how do you usually let that tiredness out?",
        es: "Los días en que escondes lo que sientes de verdad, ¿cómo sueles soltar ese cansancio?",
      },
      questions: [
        {
          text: {
            ko: "가면을 쓴 날 회복은 혼자 있는 시간으로 해요, 편한 사람 한 명과 해요?",
            en: "After a day behind the mask, do you recover with time alone, or with one person you're at ease with?",
            es: "Después de un día con la máscara puesta, ¿te recuperas con tiempo a solas o con una persona con quien te sientes a gusto?",
          },
        },
        {
          text: {
            ko: "그 회복 시간이 지금 충분해요, 늘 모자라요?",
            en: "Is that recovery time enough right now, or always running short?",
            es: "¿Ese tiempo para recuperarte te alcanza ahora o siempre se queda corto?",
          },
        },
        {
          text: {
            ko: "가면 없이 대할 수 있는 사람이 있다면, 그 사람 앞에선 뭐가 달라요?",
            en: "If there's someone you can be with without the mask, what's different around them?",
            es: "Si hay alguien con quien puedes estar sin máscara, ¿qué cambia cuando estás con esa persona?",
          },
          free: true,
        },
      ],
    },
    {
      set: 5,
      focus: "사람들 사이에서 자연스러운 쪽",
      candidates: ["SE10", "SE6", "IM2", "IM8"],
      fallbackQuestion: {
        ko: "사람들 사이에서 '이건 내가 자연스럽게 잘한다' 싶은 게 있다면 뭐예요?",
        en: "Around other people, is there something that comes naturally to you, something you're simply good at?",
        es: "Cuando estás con otras personas, ¿hay algo que te sale natural, algo que simplemente se te da bien?",
      },
      questions: [
        {
          text: {
            ko: "가면을 조금 내려놓는다면 어느 자리부터 해 보고 싶어요?",
            en: "If you set the mask down a little, where would you want to try it first?",
            es: "Si bajaras un poco la máscara, ¿en qué lugar te gustaría probar primero?",
          },
          free: true,
        },
      ],
    },
  ],
};

const MODULE5_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "시작하기 직전",
      candidates: ["P2", "P6", "T3", "T5", "D1"],
      fallbackQuestion: {
        ko: "요즘 해야 하는데 자꾸 미뤄 두게 되는 일이 하나 있다면, 어떤 일이에요?",
        en: "Is there one thing lately that you need to do but keep putting off? What is it?",
        es: "¿Hay algo últimamente que tienes que hacer pero sigues dejando para después? ¿Qué es?",
      },
      questions: [
        { text: MODULE5.signatureQuestion, free: true, signature: true },
        {
          text: {
            ko: "그때 피하고 싶었던 건 지루함이에요, 잘 못할까 봐 겁나는 마음이에요?",
            en: "In that moment, what were you trying to avoid: boredom, or the fear of not doing it well?",
            es: "En ese momento, ¿qué querías evitar: el aburrimiento o el miedo a no hacerlo bien?",
          },
        },
        {
          text: {
            ko: "그 일 대신 한 건 다른 일이었어요, 폰이었어요?",
            en: "What did you do instead: some other task, or your phone?",
            es: "¿Qué hiciste en su lugar: otra tarea o mirar el teléfono?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "늘 같은 순서",
      candidates: ["T7", "T8", "P3", "P8", "D5"],
      fallbackQuestion: {
        ko: "해야 할 일이 막힐 때마다 비슷하게 흘러가는 순서가 있다면, 보통 어떻게 흘러가요?",
        en: "When a task gets stuck, is there a sequence things usually follow? How does it tend to go?",
        es: "Cuando una tarea se atasca, ¿suele repetirse la misma secuencia? ¿Cómo suele ir?",
      },
      questions: [
        {
          text: {
            ko: "보통 멈추는 지점은 시작할 때예요, 끝내기 직전이에요?",
            en: "Where do you usually stall: at the start, or right before you finish?",
            es: "¿Dónde sueles frenarte: al empezar o justo antes de terminar?",
          },
        },
        {
          text: {
            ko: "골라야 할 땐 빨리 고르고 후회하는 편이에요, 오래 고르다 놓치는 편이에요?",
            en: "When you have to choose, do you pick fast and regret it, or deliberate so long the chance slips by?",
            es: "Cuando te toca elegir, ¿eliges rápido y luego te arrepientes o lo piensas tanto que se te escapa la oportunidad?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "미루는 일들이 늘 비슷한 종류예요, 그때그때 달라요?",
          en: "Are the things you put off usually the same kind of thing, or does it vary?",
          es: "Lo que dejas para después, ¿suele ser del mismo tipo o cambia cada vez?",
        },
      },
    },
    {
      set: 3,
      focus: "실패와 잘못된 선택",
      candidates: ["P10", "P5", "D9", "D10"],
      fallbackQuestion: {
        ko: "그 일을 끝까지 해냈는데 결과가 별로라면, 가장 먼저 어떤 생각이 들 것 같아요?",
        en: "If you saw that task through and the result wasn't great, what's the first thought you imagine having?",
        es: "Si llevaras esa tarea hasta el final y el resultado no fuera bueno, ¿cuál crees que sería tu primer pensamiento?",
      },
      questions: [
        {
          text: {
            ko: "그 기준은 내가 정한 거예요, 누군가 기대한다고 느끼는 거예요?",
            en: "That standard: is it one you set yourself, or one you feel someone expects of you?",
            es: "Ese listón, ¿te lo pones tú o sientes que alguien lo espera de ti?",
          },
        },
        {
          text: {
            ko: "대충 낸 결과가 별로라는 말을 들으면, 일이 별로인 거예요, 내가 별로인 거예요?",
            en: "If someone said a rough piece of your work wasn't good, would that mean the work wasn't good, or that you weren't?",
            es: "Si alguien te dijera que algo que entregaste sin pulir no está bien, ¿sentirías que falla el trabajo o que fallas tú?",
          },
        },
        {
          text: {
            ko: "평가가 가장 신경 쓰이는 사람은 윗사람이에요, 가까운 사람이에요, 나 자신이에요?",
            en: "Whose judgment weighs on you most: someone above you, someone close to you, or your own?",
            es: "¿Qué juicio te pesa más: el de alguien por encima de ti, el de alguien cercano o el tuyo?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "쌓였을 때",
      candidates: ["T6", "T10", "D6", "D7"],
      fallbackQuestion: {
        ko: "미뤄 둔 일이 쌓였을 때, 결국 어떻게 해결하게 돼요?",
        en: "When put-off tasks pile up, how do they usually end up getting dealt with?",
        es: "Cuando se acumulan las tareas pendientes, ¿cómo terminas resolviéndolas?",
      },
      questions: [
        {
          text: {
            ko: "결국 움직이게 한 건 마감이었어요, 누가 옆에 있을 때였어요, 아주 작게 쪼갰을 때였어요?",
            en: "What finally got you moving: a deadline, having someone around, or breaking it into tiny pieces?",
            es: "¿Qué te puso en marcha al final: una fecha límite, tener a alguien cerca o dividirlo en partes muy pequeñas?",
          },
        },
        {
          text: {
            ko: "미뤄 둔 걸 해치운 날은 후련해요, 그래도 자책이 남아요?",
            en: "On the day you finally get it done, do you feel relief, or does some self-blame linger?",
            es: "El día que por fin lo sacas adelante, ¿sientes alivio o te queda algo de reproche contigo?",
          },
        },
        {
          text: {
            ko: "주변은 내가 미루는 걸 알아요, 티 안 나게 숨겨요?",
            en: "Do the people around you know you put things off, or do you keep it out of sight?",
            es: "¿La gente a tu alrededor sabe que lo dejas para después o lo mantienes en secreto?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "해내는 쪽의 나",
      candidates: ["P9", "D3", "T1", "P7"],
      fallbackQuestion: {
        ko: "일을 할 때 '이건 내가 꽤 잘 해낸다' 싶은 순간이 있다면, 어떤 때예요?",
        en: "When it comes to getting things done, when do you catch yourself thinking, \"I'm actually pretty good at this\"?",
        es: "A la hora de sacar cosas adelante, ¿en qué momentos piensas \"esto se me da bastante bien\"?",
      },
      questions: [
        {
          text: {
            ko: "'적당히 괜찮게' 해낸 장면을 상상하면 시원해요, 불안해요?",
            en: "When you picture finishing something \"good enough\", does it feel freeing, or unsettling?",
            es: "Cuando te imaginas terminando algo \"suficientemente bien\", ¿te da alivio o te inquieta?",
          },
        },
      ],
    },
  ],
};

const MODULE6_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "화가 올라오는 순간",
      candidates: ["S2", "S4", "E1", "E5", "R3"],
      fallbackQuestion: {
        ko: "최근에 화가 올라왔던 순간이 있었다면, 어떤 장면이었어요?",
        en: "Think of a recent moment when anger rose up in you. What was happening?",
        es: "Piensa en algún momento reciente en que sentiste que te subía el enfado. ¿Qué estaba pasando?",
      },
      questions: [
        { text: MODULE6.signatureQuestion, signature: true },
        {
          text: {
            ko: "화는 그 자리에서 바로 올라왔어요, 한참 뒤에 올라왔어요?",
            en: "Did the anger come up right there in the moment, or much later?",
            es: "¿El enfado te subió ahí mismo o mucho después?",
          },
        },
        {
          text: {
            ko: "상대는 내가 화난 걸 알았어요, 몰랐어요?",
            en: "Did the other person know you were angry, or not?",
            es: "¿La otra persona se dio cuenta de tu enfado o no?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "참다가, 지나고 나서",
      candidates: ["S6", "S10", "E9", "E8", "R1", "R4"],
      fallbackQuestion: {
        ko: "화가 난 뒤에 늘 비슷하게 흘러가는 순서가 있다면, 보통 어떻게 흘러가요?",
        en: "After you get angry, is there a sequence things usually follow? How does it tend to go?",
        es: "Después de enfadarte, ¿suele repetirse la misma secuencia? ¿Cómo suele ir?",
      },
      questions: [
        {
          text: {
            ko: "그 화는 어디로 갔어요? 삼켰어요, 터졌어요, 계속 곱씹었어요?",
            en: "Where did that anger go? Did you swallow it, let it burst out, or keep going over it?",
            es: "¿A dónde fue ese enfado? ¿Te lo tragaste, estalló o le seguiste dando vueltas?",
          },
        },
        {
          text: {
            ko: "같은 사람에게 같은 일로 화난 적이 또 있어요, 이번이 처음이에요?",
            en: "Has the same person made you angry over the same thing before, or is this the first time?",
            es: "¿Ya te había enfadado la misma persona por lo mismo o es la primera vez?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "화가 가라앉는 데 몇 시간이면 돼요, 며칠 가요?",
          en: "Does it take a few hours for the anger to settle, or does it last for days?",
          es: "¿Se te pasa el enfado en unas horas o te dura días?",
        },
      },
    },
    {
      set: 3,
      focus: "화에 대한 믿음",
      candidates: ["S7", "E10", "R8", "R10"],
      fallbackQuestion: {
        ko: "화가 날 때, 그 화에 대해 속으로 드는 생각이 있다면 어떤 거예요?",
        en: "When you get angry, what do you tell yourself about that anger?",
        es: "Cuando te enfadas, ¿qué te dices por dentro sobre ese enfado?",
      },
      questions: [
        {
          text: {
            ko: "그 순간 넘어온 선은 존중이었어요, 공정함이었어요, 내 시간이나 공간이었어요?",
            en: "In that moment, which line got crossed: respect, fairness, or your time or space?",
            es: "En ese momento, ¿qué límite se cruzó: el respeto, la justicia o tu tiempo o tu espacio?",
          },
        },
        {
          text: {
            ko: "어릴 때 집에서 화는 내도 되는 거였어요, 참아야 하는 거였어요?",
            en: "Growing up, was anger something you were allowed to show at home, or something you had to hold in?",
            es: "En tu infancia, ¿en casa se podía mostrar el enfado o había que aguantarlo?",
          },
        },
        {
          text: {
            ko: "화를 내고 나면 내가 나쁜 사람 같아요, 할 말을 한 것 같아요?",
            en: "After you get angry, do you feel like a bad person, or like you said what needed saying?",
            es: "Después de enfadarte, ¿sientes que hiciste algo malo o que dijiste lo que había que decir?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "화를 다루는 방식",
      candidates: ["S8", "S9", "R5", "R7", "R6"],
      fallbackQuestion: {
        ko: "화가 올라왔을 때 그걸 가라앉히려고 주로 어떻게 해요?",
        en: "When anger rises, what do you usually do to bring it down?",
        es: "Cuando te sube el enfado, ¿qué sueles hacer para calmarlo?",
      },
      questions: [
        {
          text: {
            ko: "화가 지나간 뒤 그 장면을 다시 떠올려요, 아예 덮어 둬요?",
            en: "Once the anger passes, do you replay the scene, or bury it completely?",
            es: "Cuando se te pasa el enfado, ¿vuelves a repasar la escena o la entierras del todo?",
          },
        },
        {
          text: {
            ko: "화를 말로 꺼냈을 때 받아들여졌어요, 더 큰 싸움이 됐어요?",
            en: "When you've put your anger into words, was it heard, or did it turn into a bigger fight?",
            es: "Cuando has puesto tu enfado en palabras, ¿te escucharon o terminó en una pelea más grande?",
          },
        },
        {
          text: {
            ko: "화를 편하게 털어놓을 수 있는 사람이 있어요, 없어요?",
            en: "Is there someone you can vent your anger to freely, or not really?",
            es: "¿Tienes a alguien con quien desahogar tu enfado con libertad o no realmente?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "화 앞에서도 지키는 것",
      candidates: ["E4", "E7", "R9"],
      fallbackQuestion: {
        ko: "화가 나는 상황에서도 '이건 내가 꽤 잘 지킨다' 싶은 게 있다면 뭐예요?",
        en: "Even when you're angry, is there something you feel you hold on to pretty well?",
        es: "Incluso con enfado, ¿hay algo que sientes que mantienes bastante bien?",
      },
      questions: [
        {
          text: {
            ko: "선을 말로 그을 수 있다면, 어떤 문장이 될까요?",
            en: "If you could draw that line in words, what would the sentence be?",
            es: "Si pudieras marcar ese límite con palabras, ¿qué frase dirías?",
          },
          free: true,
        },
      ],
    },
  ],
};

const MODULE7_SETS: ModuleChatSets = {
  strengthScoreDirection: "high",
  sets: [
    {
      set: 1,
      focus: "과부하가 오는 순간",
      candidates: ["X2", "X10", "X4", "L7", "L2"],
      fallbackQuestion: {
        ko: "최근에 머리가 꽉 차서 아무것도 안 들어오던 순간이 있었다면, 어디서 언제였어요?",
        en: "Think of a recent moment when everything felt like too much and nothing could get in. Where and when was it?",
        es: "Piensa en algún momento reciente en que todo era demasiado y ya no te entraba nada más. ¿Dónde y cuándo fue?",
      },
      questions: [
        {
          text: {
            ko: "그때 가장 먼저 들어온 건 소리였어요, 빛이나 냄새였어요, 사람이었어요?",
            en: "What hit you first then: sound, light or smell, or people?",
            es: "¿Qué te llegó primero en ese momento: el ruido, la luz o los olores, o la gente?",
          },
        },
        {
          text: {
            ko: "압도되면 짜증이 나요, 멍해져요, 자리를 피하고 싶어요?",
            en: "When it gets overwhelming, do you get irritable, go blank, or want to get out of there?",
            es: "Cuando todo te desborda, ¿te irritas, te quedas en blanco o quieres irte de ahí?",
          },
        },
        {
          text: {
            ko: "그 자리에서 버텼어요, 빠져나왔어요?",
            en: "Did you stick it out, or step away?",
            es: "¿Aguantaste ahí o te fuiste?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "회복에 걸리는 시간",
      candidates: ["X7", "X9", "X5", "A10"],
      fallbackQuestion: {
        ko: "자극이 많았던 하루 뒤에, 다시 나로 돌아오기까지 보통 어떻게 흘러가요?",
        en: "After a day with a lot coming at you, how does it usually go until you feel like yourself again?",
        es: "Después de un día con muchos estímulos, ¿cómo suele ir hasta que vuelves a sentirte tú?",
      },
      questions: [
        {
          text: {
            ko: "회복하는 데 몇 시간이면 돼요, 하루 넘게 걸려요?",
            en: "Does it take a few hours to recover, or more than a day?",
            es: "¿Te recuperas en unas horas o te lleva más de un día?",
          },
        },
        {
          text: {
            ko: "과부하는 사람 많은 날에 와요, 일이 몰린 날에 와요?",
            en: "Does the overload come on days with lots of people, or days when the work piles up?",
            es: "¿La sobrecarga llega los días con mucha gente o los días en que se te acumula el trabajo?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "일정이 갑자기 바뀌면 금방 맞춰요, 하루가 흔들려요?",
          en: "When plans change suddenly, do you adjust quickly, or does it throw off your whole day?",
          es: "Cuando los planes cambian de repente, ¿te adaptas rápido o se te desordena todo el día?",
        },
      },
    },
    {
      set: 3,
      focus: "남들은 모르는 감각",
      candidates: ["A7", "A8", "X6", "L10"],
      fallbackQuestion: {
        ko: "남들은 아무렇지 않은데 나만 유독 크게 느낀다고 생각한 순간이 있다면, 언제였어요?",
        en: "Was there a moment when something felt huge to you while others seemed not to notice at all? When was it?",
        es: "¿Hubo algún momento en que algo te afectó mucho mientras a los demás parecía no pasarles nada? ¿Cuándo fue?",
      },
      questions: [
        { text: MODULE7.signatureQuestion, free: true, signature: true },
        {
          text: {
            ko: "'예민하다'는 말을 처음 들은 게 어릴 때였어요, 커서였어요?",
            en: "When did you first hear \"you're too sensitive\": as a kid, or as an adult?",
            es: "¿Cuándo te dijeron por primera vez que tenías demasiada sensibilidad: en tu infancia o más adelante?",
          },
        },
        {
          text: {
            ko: "그 말을 들으면 서운해요, 그런가 보다 해요?",
            en: "When you hear that, does it sting, or do you just let it go?",
            es: "Cuando te lo dicen, ¿te duele o lo dejas pasar?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "환경 조절",
      candidates: ["X3", "L3", "L4", "L5", "X8"],
      fallbackQuestion: {
        ko: "버거운 자극을 줄이려고 평소에 하는 나만의 방법이 있다면, 어떤 거예요?",
        en: "Do you have your own ways of cutting down on stimulation that's too much? What do you do?",
        es: "¿Tienes tus propias maneras de reducir los estímulos cuando son demasiados? ¿Qué haces?",
      },
      questions: [
        {
          text: {
            ko: "충전되는 건 자연이에요, 음악이에요, 혼자만의 공간이에요?",
            en: "What recharges you: nature, music, or a space of your own?",
            es: "¿Qué te recarga: la naturaleza, la música o un espacio para ti?",
          },
        },
        {
          text: {
            ko: "힘든 자리는 미리 피하는 편이에요, 일단 가서 견디는 편이에요?",
            en: "With places that are hard on you, do you tend to avoid them ahead of time, or go and push through?",
            es: "Con los sitios que se te hacen difíciles, ¿sueles evitarlos de antemano o vas y aguantas?",
          },
        },
        {
          text: {
            ko: "주변에 내 감각을 이해해 주는 사람이 있어요, 설명하기를 포기했어요?",
            en: "Is there someone around you who gets how you sense things, or have you given up explaining?",
            es: "¿Hay alguien a tu alrededor que entiende cómo percibes las cosas o ya renunciaste a explicarlo?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "깊이 감동하는 쪽",
      candidates: ["A2", "A4", "A6", "A9", "A5"],
      fallbackQuestion: {
        ko: "최근에 무언가가 마음 깊이 와닿았던 순간이 있었다면, 어떤 거였어요?",
        en: "Was there a recent moment when something moved you deeply? What was it?",
        es: "¿Hubo hace poco algún momento en que algo te llegó muy hondo? ¿Qué fue?",
      },
      questions: [
        {
          text: {
            ko: "내 감각에 딱 맞는 하루라면 아침은 어떻게 시작할 것 같아요?",
            en: "On a day that fit your senses just right, how would the morning begin?",
            es: "En un día hecho a la medida de tus sentidos, ¿cómo empezaría la mañana?",
          },
          free: true,
        },
      ],
    },
  ],
};

const MODULE8_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "누운 직후",
      candidates: ["C2", "C4", "C6", "S2", "S3"],
      fallbackQuestion: {
        ko: "최근에 잠이 잘 오지 않았던 밤이 있었다면, 누운 뒤 어떤 일이 있었어요?",
        en: "Think of a recent night when sleep wouldn't come. What happened after you lay down?",
        es: "Piensa en alguna noche reciente en que no te llegaba el sueño. ¿Qué pasó después de acostarte?",
      },
      questions: [
        { text: MODULE8.signatureQuestion, free: true, signature: true },
        {
          text: {
            ko: "그때 마음은 초조해요, 불안해요, 억울해요?",
            en: "In those moments, does it feel more like restlessness, worry, or a sense of unfairness?",
            es: "En esos momentos, ¿sientes más impaciencia, inquietud o una sensación de injusticia?",
          },
        },
        {
          text: {
            ko: "몸은 풀려 있어요, 어딘가 힘이 들어가 있어요?",
            en: "Is your body relaxed, or is there tension held somewhere?",
            es: "¿Tienes el cuerpo relajado o hay tensión en alguna parte?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "되감기",
      candidates: ["C3", "C9", "C8", "D9"],
      fallbackQuestion: {
        ko: "밤에 자꾸 되감기듯 다시 떠오르는 장면이 있다면, 보통 어떤 장면이에요?",
        en: "At night, is there a scene that keeps rewinding and replaying? What kind of scene is it usually?",
        es: "Por la noche, ¿hay alguna escena que se te rebobina y se repite una y otra vez? ¿Qué tipo de escena suele ser?",
      },
      questions: [
        {
          text: {
            ko: "생각이 먼저 돌아요, 몸이 먼저 긴장해요?",
            en: "What starts first: your thoughts spinning, or your body tensing up?",
            es: "¿Qué empieza primero: los pensamientos dando vueltas o el cuerpo tensándose?",
          },
        },
        {
          text: {
            ko: "머릿속 장면은 오늘 일이에요, 내일 일이에요, 오래된 일이에요?",
            en: "Are the scenes in your head about today, tomorrow, or something from long ago?",
            es: "Las escenas que te vienen a la cabeza, ¿son de hoy, de mañana o de algo de hace mucho?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "잠이 흐트러지기 시작한 계기가 떠올라요, 늘 이랬어요?",
          en: "Can you think of something that set off the sleep trouble, or has it always been like this?",
          es: "¿Recuerdas algo que hiciera que empezaras a dormir peor o siempre ha sido así?",
        },
      },
    },
    {
      set: 3,
      focus: "밤에 떠오르는 것",
      candidates: ["C5", "D3", "D5", "D7"],
      fallbackQuestion: {
        ko: "낮에는 괜찮다가 밤이 되면 유독 크게 느껴지는 게 있다면, 어떤 거예요?",
        en: "Is there something that feels fine during the day but grows much bigger at night? What is it?",
        es: "¿Hay algo que de día parece estar bien pero de noche se vuelve mucho más grande? ¿Qué es?",
      },
      questions: [
        {
          text: {
            ko: "밤이 하루 중 유일하게 온전한 내 시간이라 잠드는 걸 미룬 적 있어요, 없어요?",
            en: "Have you ever stayed up because night is the only time that's fully yours, or not really?",
            es: "¿Alguna vez has retrasado el momento de dormir porque la noche es el único rato realmente tuyo, o no?",
          },
        },
        {
          text: {
            ko: "꿈은 거의 기억 안 나요, 생생하게 남아요?",
            en: "Do you barely remember your dreams, or do they stay vivid?",
            es: "¿Casi no recuerdas tus sueños o se te quedan muy vívidos?",
          },
        },
        {
          text: {
            ko: "밤에 떠오르는 그 문제를 낮에 꺼내 볼 시간이 있어요, 없어요?",
            en: "That thing that comes up at night: do you have time during the day to actually look at it, or not?",
            es: "Eso que te viene por la noche, ¿tienes tiempo durante el día para mirarlo de frente o no?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "밤의 습관과 다음 날",
      candidates: ["C7", "S10", "S9", "D4", "D6"],
      fallbackQuestion: {
        ko: "잠이 안 오는 밤에 주로 어떻게 해요?",
        en: "On nights when you can't sleep, what do you usually do?",
        es: "Las noches en que no consigues dormir, ¿qué sueles hacer?",
      },
      questions: [
        {
          text: {
            ko: "잠들려고 해 본 방법이 효과가 있었어요, 오히려 더 신경 쓰였어요?",
            en: "Has anything you've tried to fall asleep actually worked, or did it just make you more aware of it?",
            es: "Lo que has probado para dormirte, ¿te ha funcionado o solo hizo que le dieras más vueltas?",
          },
        },
        {
          text: {
            ko: "잠이 안 오면 누워서 버텨요, 일어나요?",
            en: "When sleep won't come, do you stay in bed and wait it out, or get up?",
            es: "Cuando no te llega el sueño, ¿te quedas en la cama esperando o te levantas?",
          },
        },
        {
          text: {
            ko: "낮에 있었던 사람 일이 밤까지 따라와요, 밤엔 따로예요?",
            en: "Do things with people from the day follow you into the night, or does night stay separate?",
            es: "Lo que pasa con la gente durante el día, ¿te persigue hasta la noche o la noche queda aparte?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "잠에서 잘 되는 쪽",
      candidates: ["S4", "S7", "D2", "D8"],
      fallbackQuestion: {
        ko: "잠과 관련해서 '이건 그래도 괜찮다' 싶은 부분이 있다면 뭐예요?",
        en: "When it comes to sleep, is there a part of it that still goes fine for you?",
        es: "En lo que respecta al sueño, ¿hay alguna parte que todavía te funcione bien?",
      },
      questions: [
        {
          text: {
            ko: "편하게 잠드는 밤이라면, 불 끄기 직전 마지막 장면은 어떤 모습일까요?",
            en: "On a night when you drift off easily, what would the last scene before lights-out look like?",
            es: "En una noche en que te duermes con facilidad, ¿cómo sería la última escena antes de apagar la luz?",
          },
          free: true,
        },
      ],
    },
  ],
};

const MODULE9_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "최근 가족과의 순간",
      candidates: ["EM5", "CO2", "CO8", "PA5"],
      fallbackQuestion: {
        ko: "최근에 가족과 통화하거나 만난 일이 있었다면, 그때 어떤 장면이 기억에 남아요?",
        en: "Think of a recent call or visit with your family. What moment from it stays with you?",
        es: "Piensa en alguna llamada o visita reciente con tu familia. ¿Qué momento se te quedó grabado?",
      },
      questions: [
        {
          text: {
            ko: "그 통화나 만남에서 주로 말하는 쪽이었어요, 듣는 쪽이었어요?",
            en: "In that call or visit, were you mostly the one talking, or the one listening?",
            es: "En esa llamada o visita, ¿eras más quien hablaba o quien escuchaba?",
          },
        },
        {
          text: {
            ko: "끝나고 남은 건 죄책감이에요, 서운함이에요, 무거운 책임감이에요?",
            en: "Afterward, what was left: guilt, hurt, or a heavy sense of responsibility?",
            es: "Al terminar, ¿qué te quedó: culpa, dolor o un peso de responsabilidad?",
          },
        },
        {
          text: {
            ko: "그 느낌은 금방 사라져요, 며칠 가요?",
            en: "Does that feeling fade quickly, or stay for days?",
            es: "¿Esa sensación se te pasa rápido o te dura días?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "가족 안의 내 자리",
      candidates: ["EM2", "EM9", "CO4", "PA3", "PA4"],
      fallbackQuestion: {
        ko: "가족 안에서 일이 생길 때마다 내가 늘 비슷하게 하게 되는 역할이 있다면, 어떤 거예요?",
        en: "When something comes up in your family, is there a role you always seem to end up playing? What is it?",
        es: "Cuando surge algo en tu familia, ¿hay un papel que siempre terminas haciendo? ¿Cuál es?",
      },
      questions: [
        { text: MODULE9.signatureQuestion, signature: true },
        {
          text: {
            ko: "그 자리는 스스로 맡았어요, 어쩌다 맡게 됐어요?",
            en: "Did you take on that role yourself, or did it just end up being yours?",
            es: "¿Ese papel lo asumiste por decisión propia o te tocó sin más?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "가족끼리 다툴 때 가운데 끼는 편이에요, 자리를 피하는 편이에요?",
          en: "When your family argues, do you tend to end up in the middle, or step away?",
          es: "Cuando hay discusiones en tu familia, ¿sueles quedar en medio o te apartas?",
        },
      },
    },
    {
      set: 3,
      focus: "기대와 경계",
      candidates: ["EM4", "EM6", "EM10", "CO7", "CO9"],
      fallbackQuestion: {
        ko: "가족의 기대와 내가 원하는 것이 다를 때, 마음속에서 어떤 생각이 커져요?",
        en: "When what your family expects and what you want don't match, what thought grows louder inside you?",
        es: "Cuando lo que tu familia espera y lo que tú quieres no coinciden, ¿qué pensamiento crece por dentro?",
      },
      questions: [
        {
          text: {
            ko: "그 자리를 내려놓으면 가족이 흔들릴 것 같아요, 의외로 괜찮을 것 같아요?",
            en: "If you set that role down, do you think your family would be shaken, or turn out surprisingly fine?",
            es: "Si dejaras ese papel, ¿crees que tu familia se tambalearía o que, sorprendentemente, estaría bien?",
          },
        },
        {
          text: {
            ko: "가족은 지금의 나를 잘 알아요, 예전의 나로 기억해요?",
            en: "Does your family really know who you are now, or do they remember who you used to be?",
            es: "¿Tu familia conoce de verdad a quien eres hoy o te recuerda como eras antes?",
          },
        },
        {
          text: {
            ko: "가족과 다른 선택을 할 때 미안함이 커요, 홀가분함이 커요?",
            en: "When you choose differently from your family, is the bigger feeling guilt, or relief?",
            es: "Cuando eliges algo distinto de lo que quiere tu familia, ¿pesa más la culpa o el alivio?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "지금 관계로 번지는 것",
      candidates: ["PA7", "PA8", "PA9", "EM7", "CO6"],
      fallbackQuestion: {
        ko: "가족과의 사이에서 마음이 무거울 때 주로 어떻게 해요?",
        en: "When things with your family weigh on you, what do you usually do?",
        es: "Cuando lo de tu familia te pesa, ¿qué sueles hacer?",
      },
      questions: [
        {
          text: {
            ko: "가족과의 연락 리듬은 내가 정해요, 가족이 정해요?",
            en: "Who sets the rhythm of contact with your family: you, or them?",
            es: "¿Quién marca el ritmo del contacto con tu familia: tú o tu familia?",
          },
        },
        {
          text: {
            ko: "가족에게 선을 그어 본 적 있어요, 생각만 해 봤어요?",
            en: "Have you ever drawn a line with your family, or only thought about it?",
            es: "¿Alguna vez le has puesto un límite a tu familia o solo lo has pensado?",
          },
        },
        {
          text: {
            ko: "그 자리, 지금 친구나 연인, 직장에서도 맡고 있어요, 거기선 달라요?",
            en: "That role: do you play it with friends, a partner or at work too, or is it different there?",
            es: "Ese papel, ¿también lo haces con tus amistades, tu pareja o en el trabajo, o ahí es distinto?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "가족 사이에서 지켜 온 것",
      candidates: ["EM3", "EM8", "CO3", "CO10", "PA6"],
      fallbackQuestion: {
        ko: "가족과의 관계에서 '이건 내가 잘 지켜 왔다' 싶은 게 있다면 뭐예요?",
        en: "In your relationship with your family, is there something you feel you've protected well?",
        es: "En tu relación con tu familia, ¿hay algo que sientes que has sabido cuidar bien?",
      },
      questions: [
        {
          text: {
            ko: "가족과 연결된 채로 나로 있을 수 있다면, 명절 하루는 어떤 모습일까요?",
            en: "If you could stay connected to your family and still be fully yourself, what would a holiday look like?",
            es: "Si pudieras seguir en contacto con tu familia sin dejar de ser tú, ¿cómo sería un día de fiesta familiar?",
          },
          free: true,
        },
      ],
    },
  ],
};

const MODULE10_SETS: ModuleChatSets = {
  strengthScoreDirection: "high",
  sets: [
    {
      set: 1,
      focus: "일하는 중",
      candidates: ["D1", "D8", "H1", "I1"],
      fallbackQuestion: {
        ko: "오늘이나 최근에 무언가에 집중하려던 시간이 있었다면, 그때 어떻게 흘러갔어요?",
        en: "Think of a recent stretch when you were trying to focus on something. How did it go?",
        es: "Piensa en algún rato reciente en que intentabas concentrarte en algo. ¿Cómo fue?",
      },
      questions: [
        {
          text: {
            ko: "그때 주의를 가져간 건 알림이었어요, 다른 생각이었어요, 더 하고 싶은 다른 일이었어요?",
            en: "What pulled your attention away: a notification, another thought, or something else you'd rather be doing?",
            es: "¿Qué se llevó tu atención: una notificación, otro pensamiento u otra cosa que te apetecía más hacer?",
          },
        },
        {
          text: {
            ko: "흩어질 때 답답해요, 들떠요, 자책해요?",
            en: "When your focus scatters, do you feel frustrated, buzzing, or hard on yourself?",
            es: "Cuando se te dispersa la atención, ¿sientes frustración, te aceleras o te lo reprochas?",
          },
        },
        {
          text: {
            ko: "그날 원래 일로 돌아왔어요, 못 돌아왔어요?",
            en: "That day, did you make it back to what you'd meant to do, or not?",
            es: "Ese día, ¿lograste volver a lo que tenías que hacer o no?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "시작과 끝",
      candidates: ["I3", "I9", "I6", "H9", "D9"],
      fallbackQuestion: {
        ko: "새로 시작한 일이 흐지부지될 때 늘 비슷하게 흘러가는 순서가 있다면, 보통 어떻게 흘러가요?",
        en: "When something new you've started fizzles out, is there a sequence it usually follows? How does it go?",
        es: "Cuando algo nuevo que empezaste se va apagando, ¿suele seguir la misma secuencia? ¿Cómo suele ir?",
      },
      questions: [
        {
          text: {
            ko: "새 일을 시작할 때 신나요, 막막해요?",
            en: "When you start something new, are you excited, or at a loss where to begin?",
            es: "Cuando empiezas algo nuevo, ¿te emociona o no sabes por dónde empezar?",
          },
        },
        {
          text: {
            ko: "흥미가 식는 건 보통 초반이에요, 거의 끝날 때예요?",
            en: "Does your interest usually cool off early on, or close to the end?",
            es: "¿El interés se te suele enfriar al principio o casi al final?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "마감이 코앞이면 오히려 집중이 돼요, 더 흩어져요?",
          en: "When a deadline is right around the corner, do you actually focus better, or scatter even more?",
          es: "Cuando la fecha límite está encima, ¿te concentras mejor o te dispersas todavía más?",
        },
      },
    },
    {
      set: 3,
      focus: "극과 극의 나",
      candidates: ["H10", "H5", "I8", "D6"],
      fallbackQuestion: {
        ko: "집중이 잘 될 때의 나와 안 될 때의 나를 비교해 보면, 어떤 차이가 있어요?",
        en: "If you compare yourself when focus comes easily with when it doesn't, what's the difference?",
        es: "Si comparas cómo eres cuando te concentras con facilidad y cuando no, ¿qué diferencia hay?",
      },
      questions: [
        { text: MODULE10.signatureQuestion, free: true, signature: true },
        {
          text: {
            ko: "'집중을 못 한다'는 말을 들어 본 적 있어요, 없어요?",
            en: "Have you ever been told \"you can't focus\", or not?",
            es: "¿Alguna vez te han dicho que no logras concentrarte o no?",
          },
        },
        {
          text: {
            ko: "집중이 안 될 때 내 탓 같아요, 환경 탓 같아요?",
            en: "When you can't focus, does it feel like your fault, or the environment's?",
            es: "Cuando no logras concentrarte, ¿sientes que es culpa tuya o del entorno?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "일상의 비용",
      candidates: ["D7", "D3", "I7", "I4", "H8"],
      fallbackQuestion: {
        ko: "주의가 흩어져서 일상에서 생기는 작은 불편이 있다면, 어떤 거예요?",
        en: "Are there small everyday hassles that come from your attention scattering? What are they?",
        es: "¿Hay pequeños tropiezos del día a día que vienen de que se te dispersa la atención? ¿Cuáles?",
      },
      questions: [
        {
          text: {
            ko: "집중하려고 쓰는 방법이 있어요, 될 때를 기다려요?",
            en: "Do you have a method for getting yourself to focus, or do you wait until it just happens?",
            es: "¿Tienes algún método para concentrarte o esperas a que llegue solo?",
          },
        },
        {
          text: {
            ko: "순간적으로 결정한 일은 결과가 좋았던 적이 많아요, 후회가 많아요?",
            en: "When you decide on impulse, has it more often turned out well, or left you with regrets?",
            es: "Cuando decides por impulso, ¿suele salir bien o te deja más arrepentimiento?",
          },
        },
        {
          text: {
            ko: "주변에 나랑 리듬이 맞는 사람이 있어요, 다들 너무 느리거나 빨라요?",
            en: "Is there someone around you who moves at your rhythm, or does everyone feel too slow or too fast?",
            es: "¿Hay alguien a tu alrededor que va a tu ritmo o todo el mundo te parece demasiado lento o demasiado rápido?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "깊이 파고드는 힘",
      candidates: ["H4", "H2"],
      fallbackQuestion: {
        ko: "한번 빠지면 누구보다 깊이 파고들었던 일이 있다면, 어떤 거였어요?",
        en: "Is there something you got so into that you went deeper than anyone else? What was it?",
        es: "¿Hay algo en lo que te metiste tanto que llegaste más hondo que nadie? ¿Qué fue?",
      },
      questions: [
        {
          text: {
            ko: "내 주의 방식에 맞춘 하루라면, 일은 어떻게 나눠져 있을까요?",
            en: "On a day built around the way your attention works, how would the work be divided up?",
            es: "En un día pensado para tu manera de prestar atención, ¿cómo estaría repartido el trabajo?",
          },
          free: true,
        },
      ],
    },
  ],
};

const MODULE11_SETS: ModuleChatSets = {
  strengthScoreDirection: "low",
  sets: [
    {
      set: 1,
      focus: "시선을 받는 순간",
      candidates: ["E3", "E2", "S9", "V2"],
      fallbackQuestion: {
        ko: "최근에 칭찬을 듣거나 사람들의 시선이 나에게 모였던 순간이 있었다면, 그때 어땠어요?",
        en: "Think of a recent moment when you got a compliment or people's eyes were on you. How was it?",
        es: "Piensa en algún momento reciente en que te hicieron un cumplido o todas las miradas estaban en ti. ¿Cómo fue?",
      },
      questions: [
        { text: MODULE11.signatureQuestion, free: true, signature: true },
        {
          text: {
            ko: "삼키고 나서 답답했어요, 아쉬웠어요, 안도했어요?",
            en: "After you swallowed it, did you feel stifled, a little regretful, or relieved?",
            es: "Después de tragártela, ¿sentiste ahogo, pena o alivio?",
          },
        },
        {
          text: {
            ko: "그 자리에 있던 사람은 가까운 사이였어요, 잘 모르는 사이였어요?",
            en: "Was the person there someone close to you, or someone you didn't know well?",
            es: "¿La persona que estaba ahí era alguien cercano o alguien que no conocías bien?",
          },
        },
      ],
    },
    {
      set: 2,
      focus: "누르는 방식",
      candidates: ["E7", "V4", "V5", "E5"],
      fallbackQuestion: {
        ko: "하고 싶은 말이나 표현을 누르게 될 때, 늘 비슷하게 흘러가는 순서가 있다면 어떻게 흘러가요?",
        en: "When you hold back something you want to say or show, is there a sequence it usually follows? How does it go?",
        es: "Cuando te guardas algo que quieres decir o mostrar, ¿suele seguir la misma secuencia? ¿Cómo suele ir?",
      },
      questions: [
        {
          text: {
            ko: "'아무거나', '괜찮아'를 자주 말하는 편이에요, 가끔이에요?",
            en: "Do you often say \"whatever's fine\" or \"I'm okay\", or only now and then?",
            es: "¿Sueles decir \"lo que sea\" o \"estoy bien\" a menudo o solo de vez en cuando?",
          },
        },
        {
          text: {
            ko: "주로 삼키는 자리는 여럿이 있을 때예요, 일대일일 때예요?",
            en: "Where do you hold back most: in a group, or one-on-one?",
            es: "¿Dónde te contienes más: en grupo o a solas con alguien?",
          },
        },
      ],
      alternate: {
        text: {
          ko: "칭찬을 들으면 고맙다고 받아요, 손사래부터 쳐요?",
          en: "When someone compliments you, do you say thank you, or wave it off first?",
          es: "Cuando alguien te hace un cumplido, ¿das las gracias o lo rechazas de entrada?",
        },
      },
    },
    {
      set: 3,
      focus: "거울 속 나",
      candidates: ["S2", "S10", "S4", "E10", "S8"],
      fallbackQuestion: {
        ko: "나를 드러내는 게 조심스러워진 데에는 마음속에 어떤 생각이 있는 것 같아요?",
        en: "When you think about why showing yourself feels risky, what belief seems to sit underneath it?",
        es: "Cuando piensas en por qué te cuesta mostrarte, ¿qué idea parece haber debajo?",
      },
      questions: [
        {
          text: {
            ko: "원하는 걸 말했을 때 받아들여졌어요, 무시되거나 웃음거리가 됐어요?",
            en: "When you've said what you wanted, was it taken seriously, or brushed aside or laughed at?",
            es: "Cuando has dicho lo que querías, ¿te tomaron en serio o lo ignoraron o se rieron?",
          },
        },
        {
          text: {
            ko: "원하는 걸 드러내면 이기적으로 보일 것 같아요, 어색할 것 같아요?",
            en: "If you showed what you wanted, do you think you'd come across as selfish, or would it just feel awkward?",
            es: "Si mostraras lo que quieres, ¿crees que parecería egoísmo o que simplemente sería incómodo?",
          },
        },
        {
          text: {
            ko: "거울을 볼 때 먼저 눈에 들어오는 건 마음에 드는 데예요, 고치고 싶은 데예요?",
            en: "When you look in the mirror, what catches your eye first: something you like, or something you'd change?",
            es: "Cuando te miras al espejo, ¿qué ves primero: algo que te gusta o algo que cambiarías?",
          },
        },
      ],
    },
    {
      set: 4,
      focus: "익숙한 것만",
      candidates: ["V3", "V6", "V8", "E6", "E9"],
      fallbackQuestion: {
        ko: "낯선 자리나 즉흥적인 상황이 오면 주로 어떻게 해요?",
        en: "When you're somewhere unfamiliar or something spontaneous comes up, what do you usually do?",
        es: "Cuando estás en un sitio desconocido o surge algo improvisado, ¿qué sueles hacer?",
      },
      questions: [
        {
          text: {
            ko: "삼킨 마음은 잊혀져요, 혼자 채워요, 나중에 터져요?",
            en: "What happens to the feelings you swallow: do they fade, do you make up for them on your own, or do they burst out later?",
            es: "Lo que te tragas, ¿se te olvida, lo compensas por tu cuenta o estalla más adelante?",
          },
        },
        {
          text: {
            ko: "원하는 걸 편하게 말할 수 있는 사람이 있어요, 없어요?",
            en: "Is there someone you can easily tell what you want, or not really?",
            es: "¿Hay alguien a quien puedas decirle lo que quieres sin esfuerzo o no realmente?",
          },
        },
        {
          text: {
            ko: "혼자 있을 때는 노래하거나 춤추듯 자유로워요, 그때도 조심스러워요?",
            en: "When you're alone, are you free enough to sing or dance around, or still careful even then?",
            es: "Cuando estás a solas, ¿te sueltas a cantar o bailar o incluso ahí te contienes?",
          },
        },
      ],
    },
    {
      set: 5,
      focus: "나답게 자유로운 쪽",
      candidates: ["V10", "V7", "S3", "S5"],
      fallbackQuestion: {
        ko: "'이럴 땐 내가 꽤 나답다' 싶은 순간이 있다면, 어떤 때예요?",
        en: "When do you catch yourself thinking, \"This is really me\"?",
        es: "¿En qué momentos sientes \"aquí sí soy yo\"?",
      },
      questions: [
        {
          text: {
            ko: "나에게 작은 허락 하나를 준다면, 뭐부터 해 보고 싶어요?",
            en: "If you gave yourself one small permission, what would you try first?",
            es: "Si te dieras un pequeño permiso, ¿qué te gustaría probar primero?",
          },
          free: true,
        },
      ],
    },
  ],
};

/** 모듈별 5세트 데이터(11개 모듈). */
export const MODULE_CHAT_SETS: Partial<Record<PlaybookModuleId, ModuleChatSets>> = {
  module1: MODULE1_SETS,
  module2: MODULE2_SETS,
  module3: MODULE3_SETS,
  module4: MODULE4_SETS,
  module5: MODULE5_SETS,
  module6: MODULE6_SETS,
  module7: MODULE7_SETS,
  module8: MODULE8_SETS,
  module9: MODULE9_SETS,
  module10: MODULE10_SETS,
  module11: MODULE11_SETS,
};

/** 세트 데이터가 없는 모듈이나 알 수 없는 id면 undefined. */
export function getModuleChatSets(moduleId?: string | null): ModuleChatSets | undefined {
  if (!moduleId || !Object.prototype.hasOwnProperty.call(MODULE_CHAT_SETS, moduleId)) return undefined;
  return MODULE_CHAT_SETS[moduleId as PlaybookModuleId];
}
