import type { Locale } from "./i18n/types";

/**
 * Copy for "좋은 날 찾기" (screens/GoodDaysScreen.tsx). The server (lib/goodDays.ts) only
 * returns which days and their day rhythm; the reason line is picked here from
 * (purpose, rhythm), two wordings each so two picked days with the same rhythm don't read
 * the same (the server never picks more than two per rhythm).
 *
 * Only good-fit reasons exist: there is no "avoid" copy, and the pacing rhythm
 * (otherChallengesSelf) is never picked, so it has no line here.
 */

export const GOOD_DAY_PURPOSES = ["interview", "firstMeeting", "move", "contract", "newStart"] as const;
export type GoodDayPurpose = (typeof GOOD_DAY_PURPOSES)[number];
export type GoodDayRelation = "mirror" | "selfNurturesOther" | "otherNurturesSelf" | "selfChallengesOther";

interface GoodDaysContent {
  purposes: Record<GoodDayPurpose, { label: string; hint: string }>;
  reasons: Record<GoodDayPurpose, Record<GoodDayRelation, [string, string]>>;
}

export const GOOD_DAYS_CONTENT: Record<Locale, GoodDaysContent> = {
  ko: {
    purposes: {
      interview: { label: "면접", hint: "나를 보여 주는 자리" },
      firstMeeting: { label: "첫 만남", hint: "처음 마주하는 사람" },
      move: { label: "이사", hint: "자리를 옮기는 일" },
      contract: { label: "계약", hint: "서명하고 약속하는 일" },
      newStart: { label: "새 시작", hint: "새로 시작하는 일" },
    },
    reasons: {
      interview: {
        otherNurturesSelf: ["주변의 도움이 자연스럽게 따라와, 긴장한 자리에서도 차분함을 지키기 좋은 날이에요.", "준비해 온 것이 잘 받쳐 주는 흐름이라, 묻는 말에 침착하게 답하기 좋아요."],
        selfNurturesOther: ["생각이 말로 술술 풀리는 날이라, 내 경험을 내 언어로 설명하기 좋아요.", "표현하는 힘이 살아나는 흐름이에요. 짧고 분명하게 나를 소개해 보세요."],
        mirror: ["내 페이스가 단단한 날이라, 휘둘리지 않고 나다운 답을 하기 좋아요.", "자신감이 안정적으로 받쳐 주는 흐름이에요. 강점을 하나 골라 자신 있게 말해 보세요."],
        selfChallengesOther: ["일을 다루는 감각이 또렷한 날이라, 구체적인 성과를 이야기하기 좋아요.", "판단이 빠른 흐름이에요. 숫자와 결과로 나를 보여 주기 좋아요."],
      },
      firstMeeting: {
        selfNurturesOther: ["마음을 건네는 기운이 큰 날이라, 대화가 부드럽게 이어지기 좋아요.", "따뜻함이 자연스럽게 드러나는 흐름이에요. 먼저 묻고 귀 기울여 보세요."],
        mirror: ["편안한 내 모습 그대로 있기 좋은 날이라, 꾸미지 않아도 대화가 통해요.", "비슷한 결의 사람과 쉽게 가까워지는 흐름이에요."],
        otherNurturesSelf: ["상대의 호의를 편하게 받아들이기 좋은 날이라, 첫 대화가 한결 가벼워요.", "챙김을 주고받기 좋은 흐름이에요. 작은 배려가 오래 기억돼요."],
        selfChallengesOther: ["약속을 이끌기 좋은 날이라, 장소와 시간을 먼저 제안해 보세요.", "흐름을 내가 잡기 좋은 날이에요. 분명한 제안이 호감으로 이어져요."],
      },
      move: {
        otherNurturesSelf: ["도움을 받기 좋은 흐름이라, 짐을 옮기고 정리하는 일이 수월하게 풀려요.", "새 공간이 나를 편하게 받아 주는 흐름이에요. 마음이 빨리 자리 잡기 좋아요."],
        mirror: ["내 리듬을 지키기 좋은 날이라, 새 공간에 나만의 질서를 세우기 좋아요.", "꾸준히 해내는 힘이 받쳐 주는 날이에요. 큰 짐을 차근차근 마무리하기 좋아요."],
        selfChallengesOther: ["일을 손에 쥐고 처리하는 감각이 좋은 날이라, 일정과 정리가 깔끔하게 맞아떨어져요.", "결정이 빠른 흐름이라, 배치와 정리를 한 번에 정하기 좋아요."],
        selfNurturesOther: ["새 공간을 내 손으로 꾸미고 싶어지는 날이에요. 작은 손길이 집을 내 것으로 만들어요.", "에너지를 밖으로 쓰기 좋은 흐름이라, 움직이는 하루가 가볍게 느껴져요."],
      },
      contract: {
        selfChallengesOther: ["실속을 챙기는 감각이 또렷한 날이라, 조건을 꼼꼼히 따지기 좋아요.", "판단과 결정이 깔끔한 흐름이에요. 숫자와 기한을 한 번 더 확인하고 서명하세요."],
        otherNurturesSelf: ["믿을 만한 도움이 곁에 있는 흐름이라, 조언을 듣고 결정하기 좋아요.", "든든한 뒷받침이 있는 날이에요. 서류를 차분히 읽어 내려가기 좋아요."],
        mirror: ["내 기준이 분명한 날이라, 원하는 조건을 흔들림 없이 말하기 좋아요.", "대등하게 이야기하기 좋은 흐름이에요. 서로의 몫을 분명히 정해 두세요."],
        selfNurturesOther: ["설명하고 설득하는 힘이 좋은 날이라, 내 제안을 분명하게 전하기 좋아요.", "대화가 잘 풀리는 흐름이에요. 궁금한 점은 그 자리에서 물어보세요."],
      },
      newStart: {
        mirror: ["내 힘으로 밀고 나가는 기운이 큰 날이라, 첫발을 떼기 좋아요.", "추진력이 단단한 흐름이에요. 미뤄 둔 계획의 첫 단계를 오늘 시작해 보세요."],
        selfNurturesOther: ["새 아이디어가 잘 피어나는 날이라, 무언가를 만들기 시작하기 좋아요.", "표현하고 펼치는 흐름이에요. 시작을 누군가에게 알리면 힘이 붙어요."],
        otherNurturesSelf: ["배우고 채우는 흐름이라, 새 공부나 새 습관을 시작하기 좋아요.", "도움이 따라오는 날이에요. 시작을 함께할 사람에게 손을 내밀어 보세요."],
        selfChallengesOther: ["구체적인 목표를 세우기 좋은 날이라, 시작을 숫자로 정해 두면 오래가요.", "실행 감각이 좋은 흐름이에요. 작은 일부터 바로 손대 보세요."],
      },
    },
  },
  en: {
    purposes: {
      interview: { label: "Job interview", hint: "Showing who you are" },
      firstMeeting: { label: "First meeting", hint: "Someone you're meeting for the first time" },
      move: { label: "Moving", hint: "Changing where you live or work" },
      contract: { label: "Contract", hint: "Signing and committing" },
      newStart: { label: "Fresh start", hint: "Beginning something new" },
    },
    reasons: {
      interview: {
        otherNurturesSelf: ["Support comes to you easily today, so it's easier to stay calm when the pressure is on.", "Your preparation has your back in this rhythm, so steady answers come more naturally."],
        selfNurturesOther: ["Thoughts turn into words easily today, a good day to explain your experience in your own voice.", "Your expressive side is lively. Introduce yourself short and clear."],
        mirror: ["Your footing is firm today, so you can answer like yourself without being thrown.", "Steady confidence backs you up. Pick one strength and say it plainly."],
        selfChallengesOther: ["Your grip on the work is sharp today, a good day to talk about concrete results.", "Quick judgment runs through this rhythm. Let numbers and outcomes speak for you."],
      },
      firstMeeting: {
        selfNurturesOther: ["Your giving side is strong today, so conversation flows gently.", "Warmth shows up on its own in this rhythm. Ask first, then really listen."],
        mirror: ["It's an easy day to just be yourself, and conversation clicks without trying.", "This rhythm makes it easy to get close to people on your wavelength."],
        otherNurturesSelf: ["Kindness is easy to accept today, which keeps a first conversation light.", "A good rhythm for small acts of care, the kind people remember."],
        selfChallengesOther: ["A good day to take the lead: suggest the place and time yourself.", "You set the pace well today, and a clear invitation comes across as warm."],
      },
      move: {
        otherNurturesSelf: ["Help is easy to find in this rhythm, so carrying and sorting go smoothly.", "A new place welcomes you more easily today, and you settle in faster."],
        mirror: ["A good day to keep your own rhythm and set up your new space your way.", "Steady stamina backs you up. Big jobs get finished one step at a time."],
        selfChallengesOther: ["You handle logistics well today, so schedules and packing line up neatly.", "Decisions come quickly, a good day to settle the layout in one go."],
        selfNurturesOther: ["You'll want to shape the new space with your own hands. Small touches make it yours.", "Energy flows outward in this rhythm, so a busy moving day feels lighter."],
      },
      contract: {
        selfChallengesOther: ["Your practical sense is sharp today, a good day to go through the terms carefully.", "Clear judgment runs through this rhythm. Check the numbers and dates once more, then sign."],
        otherNurturesSelf: ["Trustworthy help is close by, a good day to take advice before deciding.", "You have solid backing today. Read the paperwork through at your own pace."],
        mirror: ["Your standards are clear today, so you can state what you want without wavering.", "A good rhythm for talking as equals. Spell out who does what."],
        selfNurturesOther: ["You explain and persuade well today, a good day to make your proposal clearly.", "Conversation goes smoothly in this rhythm. Ask your questions right there in the room."],
      },
      newStart: {
        mirror: ["Your own drive is strong today, a good day to take the first step.", "Momentum is steady in this rhythm. Start the first stage of the plan you've been putting off."],
        selfNurturesOther: ["New ideas bloom easily today, a good day to start making something.", "A rhythm for showing and sharing. Tell someone about your start and it gains strength."],
        otherNurturesSelf: ["A rhythm for learning and filling up, good for a new class or a new habit.", "Help comes along today. Reach out to someone who could start with you."],
        selfChallengesOther: ["A good day to set a concrete goal. Put a number on your start and it lasts longer.", "Your sense for action is good in this rhythm. Begin with something small, right away."],
      },
    },
  },
  es: {
    purposes: {
      interview: { label: "Entrevista de trabajo", hint: "Mostrar quién eres" },
      firstMeeting: { label: "Primer encuentro", hint: "Alguien a quien ves por primera vez" },
      move: { label: "Mudanza", hint: "Cambiar de casa o de lugar" },
      contract: { label: "Contrato", hint: "Firmar y comprometerte" },
      newStart: { label: "Nuevo comienzo", hint: "Empezar algo nuevo" },
    },
    reasons: {
      interview: {
        otherNurturesSelf: ["Hoy el apoyo llega con facilidad, así que es más fácil mantener la calma bajo presión.", "Lo que preparaste te respalda en este ritmo, y las respuestas tranquilas salen solas."],
        selfNurturesOther: ["Hoy las ideas se vuelven palabras con facilidad: buen día para contar tu experiencia con tu propia voz.", "Tu lado expresivo está despierto. Preséntate de forma breve y clara."],
        mirror: ["Hoy pisas firme, así que puedes responder como tú sin que nada te desvíe.", "Una confianza estable te sostiene. Elige una fortaleza y dila sin rodeos."],
        selfChallengesOther: ["Hoy tienes el trabajo bien agarrado: buen día para hablar de resultados concretos.", "En este ritmo decides rápido. Deja que los números y los logros hablen por ti."],
      },
      firstMeeting: {
        selfNurturesOther: ["Hoy tu lado generoso está fuerte, y la conversación fluye con suavidad.", "En este ritmo la calidez sale sola. Pregunta primero y escucha de verdad."],
        mirror: ["Es un día fácil para ser tú, y la conversación conecta sin esfuerzo.", "Este ritmo te acerca con facilidad a gente en tu misma sintonía."],
        otherNurturesSelf: ["Hoy es fácil recibir la amabilidad de otros, y eso aligera la primera charla.", "Buen ritmo para los pequeños gestos de cuidado, de esos que se recuerdan."],
        selfChallengesOther: ["Buen día para tomar la iniciativa: propón tú el lugar y la hora.", "Hoy marcas bien el paso, y una invitación clara se siente cercana."],
      },
      move: {
        otherNurturesSelf: ["En este ritmo la ayuda aparece fácil, y cargar y ordenar sale sin tropiezos.", "Hoy un lugar nuevo te recibe mejor, y te acomodas más rápido."],
        mirror: ["Buen día para mantener tu propio ritmo y organizar tu nuevo espacio a tu manera.", "Una energía constante te sostiene. Lo grande se termina paso a paso."],
        selfChallengesOther: ["Hoy manejas bien la logística, así que horarios y cajas encajan con orden.", "Decides rápido: buen día para dejar resuelta la distribución de una vez."],
        selfNurturesOther: ["Te darán ganas de darle forma al nuevo espacio con tus manos. Los pequeños detalles lo hacen tuyo.", "En este ritmo la energía sale hacia fuera, y un día de mudanza se siente más ligero."],
      },
      contract: {
        selfChallengesOther: ["Hoy tu sentido práctico está afinado: buen día para revisar las condiciones con calma.", "En este ritmo juzgas con claridad. Revisa cifras y fechas una vez más y luego firma."],
        otherNurturesSelf: ["Tienes ayuda de confianza cerca: buen día para escuchar consejo antes de decidir.", "Hoy cuentas con buen respaldo. Lee los papeles a tu propio ritmo."],
        mirror: ["Hoy tus criterios están claros, así que puedes pedir lo que quieres sin titubear.", "Buen ritmo para hablar de igual a igual. Dejen claro qué le toca a cada quien."],
        selfNurturesOther: ["Hoy explicas y convences bien: buen día para presentar tu propuesta con claridad.", "En este ritmo la conversación fluye. Haz tus preguntas ahí mismo."],
      },
      newStart: {
        mirror: ["Hoy tu propio impulso es fuerte: buen día para dar el primer paso.", "El empuje es firme en este ritmo. Empieza la primera etapa de ese plan que venías posponiendo."],
        selfNurturesOther: ["Hoy las ideas nuevas brotan con facilidad: buen día para empezar a crear algo.", "Un ritmo para mostrar y compartir. Cuéntale a alguien que empiezas y tomará fuerza."],
        otherNurturesSelf: ["Un ritmo para aprender y llenarte, ideal para una clase o un hábito nuevo.", "Hoy la ayuda acompaña. Busca a alguien que pueda empezar contigo."],
        selfChallengesOther: ["Buen día para fijar una meta concreta. Si le pones un número a tu comienzo, dura más.", "En este ritmo tienes buen sentido para actuar. Empieza por algo pequeño, ya mismo."],
      },
    },
  },
};

/** The reason line for the n-th picked day with this rhythm (0 or 1 — the server caps two per rhythm). */
export function goodDayReason(locale: Locale, purpose: GoodDayPurpose, relation: GoodDayRelation, occurrence: number): string {
  const content = GOOD_DAYS_CONTENT[locale] ?? GOOD_DAYS_CONTENT.en;
  const pair = content.reasons[purpose][relation];
  return pair[occurrence % 2];
}
