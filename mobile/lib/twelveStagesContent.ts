/**
 * mobile/lib/twelveStagesContent.ts
 * ------------------------------------------------------------------
 * Mobile-side port of web's lib/twelveStagesContent.ts — same copy, kept
 * in sync manually (see mobile/lib/sajuTypeContent.ts's header for why
 * this is a duplicate file rather than a cross-import). The calculation
 * itself (lib/twelveStages.ts) stays server-only — mobile only needs
 * this content, indexed by the lifeStageIndex/sinsalIndex the
 * /api/dailyFortune response already carries.
 *
 * Indices here must line up exactly with the web engine's
 * LIFE_STAGE_ORDER / SINSAL_ORDER.
 *
 * ko keeps the authentic classical names (장생/목욕/... , 겁살/재살/...) —
 * Korean users already have at least passing familiarity with these from
 * other fortune-telling apps/content. en/es deliberately do NOT translate
 * them literally: "육해살" as "Six Harms Star" or "겁살" as "Robbery Spirit"
 * reads as either meaningless jargon or unintentionally ominous to a
 * Western reader with no BaZi context (see the 2026-09-16 conversation
 * that decided this — delivery matters more than literal accuracy here,
 * the same way Co-Star doesn't over-explain "Saturn return" either). Each
 * en/es name is a short, evocative English/Spanish phrase capturing the
 * same underlying meaning instead.
 * ------------------------------------------------------------------
 */

import type { Locale } from "./i18n/types";

export interface StageEntry {
  name: string;
  body: string;
}

export interface TwelveStagesContent {
  /** 12 entries, index matches lib/twelveStages.ts's LIFE_STAGE_ORDER. */
  lifeStages: StageEntry[];
  /** 12 entries, index matches lib/twelveStages.ts's SINSAL_ORDER. */
  sinsal: StageEntry[];
  /** 2026-09-19: the same 12 stages / 12 sinsal worded for a whole YEAR (the entries
   * above are worded for "today" and read wrong on the year tab). Same indices; the names
   * are shared with lifeStages / sinsal. */
  yearLifeStageBodies: string[];
  yearSinsalBodies: string[];
}

const ko: TwelveStagesContent = {
  lifeStages: [
    { name: "장생", body: "새로운 기운이 움트는 하루예요. 낯선 시도를 해도 의외로 잘 받아들여지고, 처음 만나는 사람이나 상황에서 좋은 인연이 시작될 수 있어요." },
    { name: "목욕", body: "감정이 쉽게 드러나고 마음이 말랑해지는 날이에요. 설렘도 크지만 즉흥적인 결정은 조심하고, 오늘 느낀 감정은 하루 정도 묵혀보는 게 좋아요." },
    { name: "관대", body: "자신감이 붙고 태도에 힘이 실리는 하루예요. 그동안 망설였던 일을 한 걸음 내딛기 좋은 타이밍이니, 오늘의 기세를 실제 행동으로 옮겨보세요." },
    { name: "건록", body: "노력한 만큼 결과가 따라오는 흐름이에요. 특히 일이나 커리어 쪽에서 실력을 인정받기 좋은 날이니, 미뤄뒀던 제안이나 도전을 지금 꺼내보세요." },
    { name: "제왕", body: "오늘 하루 중 기운이 가장 강한 지점이에요. 주도권을 쥐고 밀어붙이기 좋지만, 힘이 넘치는 만큼 주변을 살피는 걸 잊지 않아야 관계가 상하지 않아요." },
    { name: "쇠", body: "무리해서 밀어붙이기보다 한 박자 늦추는 게 맞는 날이에요. 큰 결정은 내일로 미루고, 오늘은 이미 해둔 일을 다듬는 데 집중해보세요." },
    { name: "병", body: "몸도 마음도 평소보다 쉽게 지치는 하루예요. 컨디션 관리가 최우선이니 무리한 일정은 피하고, 곁에 있는 사람의 도움을 편하게 받아들이세요." },
    { name: "사", body: "뭔가 새로 벌이기보다 잠시 멈춰서 정리하는 게 유리한 날이에요. 조용히 마무리하고 되짚어보는 시간을 가지면, 다음 흐름을 준비하는 데 도움이 돼요." },
    { name: "묘", body: "겉으로는 조용해도 안에서는 다음을 위한 힘이 쌓이고 있는 하루예요. 성과가 바로 안 보여도 조급해하지 말고, 혼자만의 시간을 충전에 써보세요." },
    { name: "절", body: "하나의 흐름이 완전히 끊기고 다음 챕터로 넘어가는 지점이에요. 억지로 붙잡기보다 흘려보낼 건 흘려보내야, 새로운 기운이 들어올 자리가 생겨요." },
    { name: "태", body: "눈에 보이진 않아도 새로운 가능성이 씨앗처럼 자리 잡는 하루예요. 지금 당장 결과를 기대하기보다, 작은 아이디어나 계획을 마음속에 심어두세요." },
    { name: "양", body: "심어둔 것이 조용히 자라나는 시기예요. 서두르지 않고 꾸준히 돌보는 태도가 필요하고, 오늘의 작은 관리가 나중에 큰 차이를 만들 거예요." },
  ],
  sinsal: [
    { name: "겁살", body: "예상치 못한 곳에서 기운이 새어나갈 수 있는 날이에요. 큰돈이 오가는 결정이나 중요한 물건 관리는 평소보다 한 번 더 확인하고 넘어가세요." },
    { name: "재살", body: "의견 충돌이나 갈등이 생기기 쉬운 흐름이에요. 옳고 그름을 따지기보다 한발 물러서는 쪽이 결국 손해를 줄여줄 가능성이 높아요." },
    { name: "천살", body: "내 힘으로 어쩔 수 없는 변수가 끼어들 수 있는 날이에요. 계획대로 안 풀려도 당황하지 말고, 흐름에 맞춰 유연하게 대응하는 게 최선이에요." },
    { name: "지살", body: "이동하거나 새로운 환경에 놓일 일이 생기기 좋은 날이에요. 낯선 자리, 낯선 사람을 만나는 게 오히려 기회가 될 수 있으니 움직임을 두려워하지 마세요." },
    { name: "년살", body: "평소보다 매력이 도드라지고 주변의 시선을 끄는 하루예요. 새로운 인연이나 설레는 만남이 생기기 좋은 타이밍이니, 자신을 편하게 드러내보세요." },
    { name: "월살", body: "뭘 해도 잘 안 풀리는 듯 답답하게 느껴질 수 있는 날이에요. 억지로 힘을 쓰기보다 잠시 숨을 고르면서 기다리는 편이 오히려 나을 수 있어요." },
    { name: "망신살", body: "말이나 행동이 예상과 다르게 전달될 수 있는 날이에요. 중요한 자리일수록 한 번 더 점검하고, 감정적인 대응은 잠시 미뤄두는 게 안전해요." },
    { name: "장성살", body: "주도권을 쥐고 사람들을 이끌기 좋은 기운이에요. 결단력 있는 모습이 오히려 신뢰를 얻는 날이니, 망설이지 말고 앞장서 보세요." },
    { name: "반안살", body: "그동안의 노력이 눈에 띄는 자리로 이어질 수 있는 날이에요. 승진, 발탁, 좋은 제안처럼 한 단계 올라서는 기회가 생기면 놓치지 말고 잡아보세요." },
    { name: "역마살", body: "가만히 있기보다 움직이고 싶은 마음이 강해지는 하루예요. 여행이나 이동, 새로운 곳으로의 시도가 답답함을 풀어주는 좋은 방법이 될 수 있어요." },
    { name: "육해살", body: "크지 않지만 잔잔하게 신경 쓰이는 일들이 겹칠 수 있는 날이에요. 몸 상태나 자잘한 일정 관리에 조금 더 신경 쓰면 무난하게 넘어갈 수 있어요." },
    { name: "화개살", body: "혼자만의 시간에서 오히려 좋은 아이디어가 떠오르는 하루예요. 예술적인 감각이나 깊이 있는 생각이 필요한 일이라면 오늘 시도해보기 좋아요." },
  ],  yearLifeStageBodies: [
    "새로운 기운이 움트는 해예요. 낯선 시도가 의외로 잘 받아들여지고, 새로운 인연이 시작될 수 있어요.",
    "감정이 풍부해지고 마음이 말랑해지는 해예요. 설렘이 큰 만큼 즉흥적인 큰 결정은 한 박자 늦추세요.",
    "자신감과 존재감이 붙는 해예요. 미뤄 온 일을 한 걸음 내딛기 좋은 시기예요.",
    "노력한 만큼 결과가 따라오는 해예요. 일과 커리어에서 실력을 인정받기 좋아요.",
    "기운이 가장 강한 해예요. 주도권을 쥐고 밀어붙이기 좋지만, 주변을 살피는 걸 잊지 마세요.",
    "속도를 조금 늦추는 게 맞는 해예요. 새로 벌이기보다 이미 해 온 일을 다듬는 데 힘을 쓰세요.",
    "체력과 마음의 관리가 우선인 해예요. 일정에 여유를 두고, 곁의 도움을 편하게 받아들이세요.",
    "새로 벌이기보다 정리하고 되짚기 좋은 해예요. 조용히 마무리하면 다음 흐름이 준비돼요.",
    "겉은 조용해도 다음을 위한 힘이 쌓이는 해예요. 성과가 바로 안 보여도 조급해하지 마세요.",
    "하나의 흐름이 끊기고 다음 챕터로 넘어가는 해예요. 흘려보낼 건 보내야 새 기운이 들어와요.",
    "눈에 안 보여도 새로운 가능성이 씨앗처럼 자리 잡는 해예요. 작은 계획을 마음에 심어 두세요.",
    "심어 둔 것이 조용히 자라는 해예요. 서두르지 않고 꾸준히 돌보면 나중에 큰 차이가 돼요.",
  ],
  yearSinsalBodies: [
    "예상 밖의 곳으로 기운이 새기 쉬운 해예요. 큰돈이 오가는 결정은 한 번 더 확인하세요.",
    "의견 충돌이 생기기 쉬운 해예요. 옳고 그름보다 한발 물러서는 쪽이 손해를 줄여 줘요.",
    "내 힘으로 어쩔 수 없는 변수가 끼어들 수 있는 해예요. 계획에 여유를 두고 유연하게 대응하세요.",
    "이동하거나 새로운 환경에 놓이기 좋은 해예요. 낯선 자리가 오히려 기회가 될 수 있어요.",
    "매력이 도드라지고 시선을 끄는 해예요. 새로운 인연이 생기기 좋으니 자신을 편하게 드러내세요.",
    "뭘 해도 답답하게 느껴지는 순간이 있는 해예요. 억지로 밀기보다 숨을 고르며 기다리세요.",
    "말과 행동이 다르게 전달되기 쉬운 해예요. 중요한 자리일수록 한 번 더 점검하세요.",
    "주도권을 쥐고 사람들을 이끌기 좋은 해예요. 결단력이 신뢰를 얻으니 앞장서 보세요.",
    "그동안의 노력이 눈에 띄는 자리로 이어지는 해예요. 승진이나 좋은 제안이 오면 잡으세요.",
    "움직임이 많아지는 해예요. 여행, 이동, 새로운 시도가 답답함을 풀어 줘요.",
    "크지 않지만 잔잔하게 신경 쓰이는 일이 겹치는 해예요. 몸 상태와 일정 관리에 신경 쓰세요.",
    "혼자만의 시간에서 좋은 아이디어가 나오는 해예요. 창작이나 깊은 사고가 필요한 일에 잘 맞아요.",
  ],
};

const en: TwelveStagesContent = {
  lifeStages: [
    { name: "Birth", body: "A fresh current is stirring today. Unfamiliar attempts land better than expected, and a new person or situation could turn into something good." },
    { name: "Renewal", body: "Feelings surface easily and your guard is down today. The excitement is real, but hold off on impulsive calls — let what you're feeling settle for a day before acting on it." },
    { name: "Momentum", body: "Confidence builds and your presence carries more weight today. It's a good moment to finally take the step you've been putting off — turn today's energy into an actual move." },
    { name: "Peak Effort", body: "Effort pays off in a visible way today. This is a strong day for work and career especially — bring up the proposal or challenge you've been sitting on." },
    { name: "Full Power", body: "This is the strongest point in your cycle today. Good for taking charge and pushing forward — just don't let that strength come at the cost of noticing the people around you." },
    { name: "Easing Off", body: "Today favors slowing down over pushing harder. Save the big decisions for tomorrow and spend today refining what's already in motion." },
    { name: "Fatigue", body: "Body and mind tire more easily than usual today. Make your condition the priority — skip anything overly demanding and let people help you without resistance." },
    { name: "Standstill", body: "Today rewards pausing and tidying up over starting something new. A quiet stretch of reflection now sets up your next move." },
    { name: "Quiet Storage", body: "It looks quiet on the surface, but something is building underneath for later. Don't rush results — spend the alone time recharging instead." },
    { name: "Reset", body: "One chapter is closing to make room for the next. Let go of what needs letting go — holding on just blocks the space new energy needs to arrive." },
    { name: "Conception", body: "A new possibility is quietly taking root today, even if it's invisible yet. Don't expect results right away — just plant the idea and let it be." },
    { name: "Incubation", body: "What you planted earlier is growing quietly now. Steady, patient care matters more than speed — today's small effort pays off later." },
  ],
  sinsal: [
    { name: "Caught Off Guard", body: "Energy — or resources — can slip away from an unexpected direction today. Double-check anything involving money or valuables before moving forward." },
    { name: "Friction", body: "Disagreements or conflict are more likely to surface today. Stepping back instead of proving a point will probably cost you less in the end." },
    { name: "Wildcard", body: "Something outside your control may interrupt your plans today. If things don't go as expected, don't panic — flexibility serves you better than resistance." },
    { name: "Fresh Ground", body: "Today favors movement — a new place, a new environment, a change of scene. An unfamiliar setting or person could turn into an opportunity, so don't shy away from it." },
    { name: "Magnetism", body: "You're more noticeable and attractive than usual today. It's a good day for a new connection or an exciting encounter — let yourself be seen." },
    { name: "Dry Spell", body: "Today can feel stuck no matter what you try. Rather than forcing it, it may be smarter to pause and simply wait this one out." },
    { name: "Exposure", body: "Words or actions could land differently than you intend today. Double-check anything important, and hold off on reacting emotionally." },
    { name: "Command", body: "This is a strong day for taking the lead. Decisiveness earns you trust today — don't hesitate to step forward." },
    { name: "Advancement", body: "Past effort could translate into real recognition today — a promotion, a selection, a strong offer. If that step up appears, take it." },
    { name: "On the Move", body: "You'll likely feel restless, pulled toward motion rather than staying still. Travel or trying something new is a good outlet for that energy." },
    { name: "Minor Setback", body: "Small, nagging things may pile up today without being serious. A little extra care with your health or schedule keeps it manageable." },
    { name: "Inner World", body: "Good ideas tend to surface in solitude today. If your work calls for creativity or deeper thinking, this is a good day to lean into it." },
  ],  yearLifeStageBodies: [
    "A fresh current stirs this year. Unfamiliar attempts land better than expected, and a new connection may begin.",
    "Feelings run richer and your guard comes down this year. The excitement is real; give big impulsive calls a beat.",
    "Confidence and presence build this year. A good stretch for finally taking the step you've been putting off.",
    "Effort pays off visibly this year. Strong for work and career, where your skill can be recognized.",
    "This is the strongest point of your cycle. Good for taking charge; just keep an eye on the people around you.",
    "This year favors slowing down. Spend energy refining what's already in motion instead of starting new things.",
    "Looking after body and mind comes first this year. Leave slack in your schedule and let people help you.",
    "A year better for tidying up and reflecting than for starting something new. Closing things quietly prepares the next current.",
    "It looks quiet, but strength builds underneath for what's next. Don't rush results.",
    "One chapter closes and the next begins. Let go of what needs letting go to make room for new energy.",
    "A new possibility takes root this year, even if it's invisible yet. Plant small plans in your mind.",
    "What you planted grows quietly this year. Steady, unhurried care makes a big difference later.",
  ],
  yearSinsalBodies: [
    "Energy or resources can slip away from unexpected directions this year. Double-check big money decisions.",
    "Disagreements come up more easily this year. Stepping back rather than proving a point costs you less.",
    "Variables outside your control may cut in this year. Leave slack in your plans and stay flexible.",
    "A good year for moving or entering a new environment. An unfamiliar place or person can become an opportunity.",
    "You stand out and draw attention this year. A good year for new connections; let yourself be seen.",
    "Some moments this year may feel stuck whatever you try. Pause and wait rather than forcing it.",
    "Words and actions can land differently than you mean this year. Double-check the important moments.",
    "A strong year for taking the lead. Decisiveness earns trust, so step forward.",
    "Past effort can turn into visible recognition this year. If a promotion or offer appears, take it.",
    "You'll likely move more this year. Travel, change and trying new things release that restlessness.",
    "Small nagging things may pile up without being serious. Extra care with health and schedule keeps it manageable.",
    "Good ideas tend to come from solitude this year. A good fit for creative or deep-thinking work.",
  ],
};

const es: TwelveStagesContent = {
  lifeStages: [
    { name: "Brote", body: "Hoy se mueve algo nuevo. Los intentos poco habituales se reciben mejor de lo que esperas, y una persona o situación nueva puede traer algo bueno." },
    { name: "Emociones a flor de piel", body: "Hoy las emociones afloran con facilidad y bajas la guardia. La ilusión es real, pero ten cuidado con las decisiones impulsivas: deja que lo que sientes se asiente un día antes de actuar." },
    { name: "Confianza en alza", body: "Hoy ganas confianza y tu presencia pesa más. Es un buen momento para dar por fin el paso que venías aplazando: convierte la energía de hoy en una acción concreta." },
    { name: "Esfuerzo con fruto", body: "Hoy el esfuerzo se nota en los resultados. Es un día fuerte sobre todo para el trabajo y la carrera: presenta esa propuesta o ese reto que tenías guardado." },
    { name: "Plenitud", body: "Hoy estás en el punto más fuerte de tu ciclo. Es un buen momento para tomar el mando y avanzar; solo cuida que esa fuerza no te haga perder de vista a quienes te rodean." },
    { name: "Ritmo más lento", body: "Hoy conviene bajar el ritmo en vez de forzarlo. Deja las decisiones grandes para mañana y dedica el día a pulir lo que ya tienes en marcha." },
    { name: "Tiempo de cuidarte", body: "Hoy el cuerpo y la mente se cansan con más facilidad. Haz de tu bienestar la prioridad: evita lo que exija demasiado y deja que te ayuden sin resistirte." },
    { name: "Pausa para ordenar", body: "Hoy toca más pausar y ordenar que empezar algo nuevo. Un rato tranquilo de reflexión prepara tu siguiente paso." },
    { name: "Recogimiento", body: "Por fuera todo parece tranquilo, pero por dentro se está gestando algo para más adelante. No apresures los resultados y aprovecha el tiempo a solas para recargar energía." },
    { name: "Cierre de ciclo", body: "Se cierra un capítulo para dar paso al siguiente. Suelta lo que haya que soltar: aferrarte solo bloquea el espacio que necesita la nueva energía para llegar." },
    { name: "Semilla", body: "Hoy una posibilidad nueva echa raíces en silencio, aunque aún no se vea. No esperes resultados inmediatos: siembra la idea y déjala reposar." },
    { name: "Crecimiento silencioso", body: "Lo que sembraste antes crece ahora en silencio. La constancia importa más que la velocidad: el pequeño esfuerzo de hoy dará frutos más adelante." },
  ],
  sinsal: [
    { name: "Atención a los recursos", body: "Hoy la energía o los recursos pueden escaparse por donde menos lo esperas. Revisa dos veces cualquier asunto de dinero u objetos de valor antes de seguir adelante." },
    { name: "Posibles roces", body: "Hoy es más probable que surjan desacuerdos o roces. Dar un paso atrás en vez de empeñarte en tener la razón probablemente te costará menos al final." },
    { name: "Imprevistos", body: "Algo fuera de tu control puede alterar tus planes hoy. Si las cosas no salen como esperabas, no te alarmes: la flexibilidad te sirve más que la resistencia." },
    { name: "Cambio de aires", body: "Hoy favorece el movimiento: un lugar nuevo, un entorno distinto, un cambio de aires. Un sitio o una persona desconocidos pueden convertirse en una oportunidad, así que no les huyas." },
    { name: "Magnetismo", body: "Hoy destacas más de lo habitual y llamas la atención. Es un buen día para una conexión nueva o un encuentro ilusionante; déjate ver." },
    { name: "Tiempo de espera", body: "Hoy puede parecer que todo se atasca hagas lo que hagas. En vez de forzar, puede ser más inteligente hacer una pausa y esperar a que pase." },
    { name: "Malentendidos", body: "Hoy tus palabras o tus actos podrían entenderse de otra forma a la que pretendes. Revisa dos veces lo importante y evita reaccionar desde la emoción." },
    { name: "Liderazgo", body: "Hoy es un día fuerte para llevar la iniciativa. La decisión te da confianza; no dudes en dar el paso al frente." },
    { name: "Reconocimiento", body: "El esfuerzo del pasado podría convertirse hoy en un reconocimiento real: un ascenso, una selección, una buena oferta. Si aparece esa oportunidad, aprovéchala." },
    { name: "Ganas de moverte", body: "Probablemente sientas inquietud y ganas de moverte en vez de quedarte en el mismo sitio. Viajar o probar algo nuevo es una buena salida para esa energía." },
    { name: "Pequeños contratiempos", body: "Hoy pueden acumularse pequeñas molestias sin mayor importancia. Un poco más de atención a tu descanso y a tu agenda lo mantiene todo bajo control." },
    { name: "Mundo interior", body: "Hoy las buenas ideas suelen surgir en soledad. Si tu trabajo pide creatividad o pensamiento profundo, es un buen día para dedicarte a eso." },
  ],
  yearLifeStageBodies: [
    "Este año se pone en marcha algo nuevo. Los intentos poco habituales se reciben mejor de lo esperado y puede empezar una conexión nueva.",
    "Este año las emociones fluyen más y bajas la guardia. La ilusión es real; deja reposar un tiempo las decisiones impulsivas de peso.",
    "Este año ganas confianza y presencia. Es una buena etapa para dar por fin el paso que venías aplazando.",
    "Este año el esfuerzo se nota en los resultados. Es fuerte para el trabajo y la carrera, donde tu capacidad puede ser reconocida.",
    "Este año estás en el punto más fuerte de tu ciclo. Es bueno para tomar el mando; solo cuida a quienes te rodean.",
    "Este año conviene bajar el ritmo. Dedica energía a pulir lo que ya está en marcha en vez de empezar cosas nuevas.",
    "Este año lo primero es cuidarte, en cuerpo y mente. Deja holgura en tu agenda y acepta la ayuda de los demás.",
    "Un año más propicio para ordenar y reflexionar que para empezar algo nuevo. Cerrar con calma prepara la siguiente corriente.",
    "Parece tranquilo, pero por dentro se acumula fuerza para lo que viene. No apresures los resultados.",
    "Se cierra un capítulo y empieza otro. Suelta lo que haya que soltar para dejar espacio a la energía nueva.",
    "Este año echa raíces una posibilidad nueva, aunque todavía no se vea. Siembra pequeños planes en tu mente.",
    "Lo que sembraste crece en silencio este año. Un cuidado constante y sin prisa marcará una gran diferencia más adelante.",
  ],
  yearSinsalBodies: [
    "Este año la energía o los recursos pueden escaparse por donde no lo esperas. Revisa dos veces las decisiones de dinero importantes.",
    "Este año surgen desacuerdos con más facilidad. Dar un paso atrás en vez de empeñarte en tener la razón te costará menos.",
    "Este año pueden colarse imprevistos fuera de tu control. Deja holgura en tus planes y mantente flexible.",
    "Buen año para cambiar de aires o entrar en un entorno nuevo. Un lugar o una persona desconocidos pueden convertirse en una oportunidad.",
    "Este año destacas y atraes miradas. Buen año para nuevas conexiones; déjate ver.",
    "Algunos momentos de este año pueden parecer atascados hagas lo que hagas. Haz una pausa y espera en vez de forzar.",
    "Este año tus palabras y tus actos pueden entenderse de otra forma a la que pretendes. Revisa dos veces los momentos importantes.",
    "Un año fuerte para llevar la iniciativa. La decisión gana confianza, así que da el paso al frente.",
    "El esfuerzo del pasado puede convertirse este año en un reconocimiento visible. Si llega un ascenso o una oferta, aprovéchalo.",
    "Probablemente te muevas más este año. Viajar, cambiar y probar cosas nuevas ayudan a liberar esa inquietud.",
    "Pueden acumularse pequeñas molestias sin importancia. Un cuidado extra con tu descanso y tu agenda lo mantiene todo manejable.",
    "Este año las buenas ideas suelen surgir en soledad. Encaja bien con trabajos creativos o de pensamiento profundo.",
  ],
};

export const TWELVE_STAGES_CONTENT: Record<Locale, TwelveStagesContent> = { ko, en, es };
