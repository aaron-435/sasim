/**
 * mobile/lib/yearFortuneContent.ts
 * ------------------------------------------------------------------
 * Mobile-side port of web's lib/yearFortuneContent.ts — same copy, kept
 * in sync manually (see mobile/lib/sajuTypeContent.ts's header for why).
 * The calculation (lib/yearFortune.ts) stays server-only; mobile just
 * indexes into this by the relation/hap-chung the API response carries.
 * ------------------------------------------------------------------
 */

import type { CompatRelation } from "./compatibility";
import type { Locale } from "./i18n/types";

export interface YearRelationContent {
  headline: string;
  overview: string;
  wealth: string;
  love: string;
  career: string;
  study: string;
  health: string;
}

export interface YearFortuneContent {
  relations: Record<CompatRelation, YearRelationContent>;
  hapNote: string;
  chungNote: string;
  /** Wording for one calendar month (the year copy above says "this year" and reads wrong
   * on a month row). Order: overview, wealth, love, career, study, health. */
  monthRelations: Record<CompatRelation, YearRelationContent>;
}

const ko: YearFortuneContent = {
  relations: {
    mirror: {
      headline: "같은 결의 해",
      overview: "당신과 닮은 기운이 들어오는 해예요. 익숙한 흐름이라 편안하지만, 새로운 자극이 없으면 제자리걸음처럼 느껴질 수 있어요.",
      wealth: "쓰던 방식 그대로도 무난하게 흘러가지만, 큰 변화는 기대하기 어려운 해예요.",
      love: "이미 익숙한 관계는 편안하게 유지되지만, 새로운 인연은 잘 안 보일 수 있어요.",
      career: "지금 하던 일을 꾸준히 이어가기 좋은 해예요. 큰 변화보다는 다지는 쪽이 유리해요.",
      study: "새로운 걸 배우기보다, 이미 아는 걸 확실히 다지는 게 유리한 해예요.",
      health: "평소 컨디션이 그대로 이어지는 해예요. 특별한 변화보다는 꾸준한 관리가 핵심이에요.",
    },
    selfNurturesOther: {
      headline: "쏟아내는 해",
      overview: "내 기운을 밖으로 쏟아내는 해예요. 표현하고 만들어내는 힘이 강해지지만, 계속 내주기만 하면 지치기 쉬우니 회복하는 시간도 함께 챙기세요.",
      wealth: "쓰는 흐름이 강해지는 해예요. 벌이도 있지만 지출도 늘어날 수 있으니 계획적으로 관리하세요.",
      love: "표현을 많이 하게 되는 해예요. 먼저 다가가는 쪽이 유리하지만, 너무 맞춰주기만 하면 지칠 수 있어요.",
      career: "아이디어를 실행하고 결과물을 만들어내기 좋은 해예요. 다만 무리하지 않게 페이스 조절이 필요해요.",
      study: "배운 걸 실제로 써먹고 표현하는 데 유리한 해예요. 발표나 글쓰기 같은 활동이 잘 맞아요.",
      health: "에너지를 많이 쓰는 해라 피로가 쌓이기 쉬워요. 충분한 휴식을 의식적으로 챙기세요.",
    },
    otherNurturesSelf: {
      headline: "채워지는 해",
      overview: "주변의 도움이나 좋은 기운이 자연스럽게 채워지는 해예요. 편안하게 받아들이되, 계속 기대기만 하면 스스로 서는 힘을 놓칠 수 있어요.",
      wealth: "뜻밖의 도움이나 기회로 재정이 채워질 수 있는 해예요. 다만 스스로 벌어들이는 힘도 함께 길러두세요.",
      love: "곁에서 챙겨주는 사람이 나타나기 좋은 해예요. 편안한 관계가 자연스럽게 이어질 수 있어요.",
      career: "좋은 스승이나 선배, 협력자를 만나기 좋은 해예요. 배우려는 자세가 특히 도움이 돼요.",
      study: "공부한 게 잘 흡수되고 실력으로 쌓이는 해예요. 배움에 투자하기 좋은 타이밍이에요.",
      health: "몸과 마음이 회복되는 흐름이에요. 무리한 이후라면 특히 이 해 충분히 재충전하세요.",
    },
    selfChallengesOther: {
      headline: "주도하는 해",
      overview: "내가 상황을 이끌고 다스리는 힘이 강해지는 해예요. 원하는 걸 밀어붙이기 좋지만, 너무 통제하려 들면 주변과 마찰이 생길 수 있어요.",
      wealth: "재물을 적극적으로 만들어가기 좋은 해예요. 투자나 사업적 시도에 유리하지만 과욕은 주의하세요.",
      love: "주도권을 쥐고 관계를 이끌어가는 흐름이에요. 다만 상대를 너무 내 뜻대로 이끌려 하면 갈등이 생길 수 있어요.",
      career: "성과를 밀어붙이기 좋은 해예요. 리더십을 발휘할 기회가 많아지니 자신 있게 나서보세요.",
      study: "목표를 정해두고 밀어붙이면 성과가 나는 해예요. 다만 완벽주의는 오히려 발목을 잡을 수 있어요.",
      health: "활동량이 늘어나는 해라 에너지는 넘치지만, 무리해서 몸을 혹사하지 않도록 조심하세요.",
    },
    otherChallengesSelf: {
      headline: "단련되는 해",
      overview: "외부의 압박이나 책임이 커지는 해예요. 편하지만은 않아도, 그 압박이 나를 한 단계 성장시키는 계기가 될 수 있어요.",
      wealth: "지출을 조여야 하는 상황이 생기기 쉬운 해예요. 계획적으로 관리하면 오히려 단단해지는 계기가 돼요.",
      love: "관계에서 책임감이 커지는 해예요. 부담스러울 수 있지만, 그만큼 관계가 깊어지는 시기이기도 해요.",
      career: "책임이 무거워지는 해예요. 힘들어도 이 시기를 잘 넘기면 확실한 성장으로 이어져요.",
      study: "규율과 인내가 필요한 해예요. 힘들어도 꾸준히 버티면 자격증이나 시험에서 좋은 결과로 이어질 수 있어요.",
      health: "이 해는 에너지를 더 의식적으로 돌봐 주세요. 쉬는 시간을 일부러 넣고, 부담을 혼자 짊어지지 마세요.",
    },
  },
  hapNote: "게다가 이 해는 당신의 사주와 특별한 합을 이루고 있어요 — 예상치 못한 좋은 인연이나 기회가 자연스럽게 따라올 수 있는 해예요.",
  chungNote: "이 해는 당신의 사주와 '전환'의 관계를 이뤄요 — 변화와 이동이 많아지는 만큼 새로운 흐름으로 옮겨 가기 좋은 해예요. 큰 결정은 조금 더 시간을 두고 내려보세요.",  monthRelations: {
    mirror: {
      overview: "나와 닮은 기운이 흐르는 달이에요. 익숙한 방식이 잘 맞고, 새 자극은 조금 덜해요.",
      wealth: "쓰던 방식 그대로 무난한 달이에요.",
      love: "익숙한 관계가 편안한 달이에요.",
      career: "하던 일을 꾸준히 이어 가기 좋아요.",
      study: "아는 걸 다지기에 좋은 달이에요.",
      health: "평소 리듬 그대로, 꾸준한 관리가 핵심이에요.",
      headline: "",
    },
    selfNurturesOther: {
      overview: "내 기운을 밖으로 쏟는 달이에요. 표현과 결과물이 늘지만 에너지도 빨리 써요.",
      wealth: "쓰는 흐름이 강한 달이에요. 지출을 한 번 점검해 보세요.",
      love: "먼저 다가가기 좋은 달이에요. 맞춰 주기만 하면 지칠 수 있어요.",
      career: "아이디어를 실행하기 좋은 달이에요. 페이스 조절은 필요해요.",
      study: "배운 걸 써먹고 표현하기 좋은 달이에요.",
      health: "에너지를 많이 쓰는 달이라 휴식을 의식해서 챙기세요.",
      headline: "",
    },
    otherNurturesSelf: {
      overview: "주변의 도움과 좋은 기운이 채워지는 달이에요.",
      wealth: "뜻밖의 도움이나 기회가 닿을 수 있는 달이에요.",
      love: "챙겨 주는 사람과 가까워지기 좋은 달이에요.",
      career: "배울 사람이나 협력자를 만나기 좋아요.",
      study: "공부한 것이 잘 흡수되는 달이에요.",
      health: "회복과 충전에 좋은 달이에요.",
      headline: "",
    },
    selfChallengesOther: {
      overview: "내가 이끄는 힘이 강해지는 달이에요. 밀어붙이되 주변 속도도 봐 주세요.",
      wealth: "재물을 적극적으로 만들기 좋은 달이에요. 과욕은 피하세요.",
      love: "주도권을 쥐기 쉬운 달이에요. 상대의 속도도 함께 살피세요.",
      career: "성과를 밀어붙이기 좋은 달이에요.",
      study: "목표를 정하고 밀어붙이면 성과가 나요.",
      health: "활동량이 늘어요. 몸을 혹사하지 않게 조절하세요.",
      headline: "",
    },
    otherChallengesSelf: {
      overview: "책임이나 압박이 커지는 달이에요. 속도를 고르면 단단해져요.",
      wealth: "지출을 조이면 오히려 든든해지는 달이에요.",
      love: "관계에서 책임감이 커지는 달이에요.",
      career: "책임이 무거워도 잘 넘기면 성장이 돼요.",
      study: "규율과 인내가 필요한 달이에요.",
      health: "스트레스를 틈틈이 풀어 주세요.",
      headline: "",
    },
  },
};

const en: YearFortuneContent = {
  relations: {
    mirror: {
      headline: "A Year Cut From the Same Cloth",
      overview: "This year brings energy that mirrors your own. It's familiar and comfortable, but without a fresh push, it can start to feel like standing still.",
      wealth: "Sticking with what already works holds steady, but don't expect a big shift this year.",
      love: "Existing relationships stay comfortable, but new connections may be harder to spot.",
      career: "A good year to keep steadily building on what you're already doing rather than chasing something new.",
      study: "Better to lock in what you already know than to chase something entirely new this year.",
      health: "Your usual condition carries through as-is — steady upkeep matters more than any big change.",
    },
    selfNurturesOther: {
      headline: "A Year of Pouring Out",
      overview: "Your own energy flows outward this year. Your ability to express and create gets stronger, but if you only ever give, you'll run tired — make sure to recover too.",
      wealth: "Spending picks up along with earning this year — plan deliberately so outflow doesn't outpace income.",
      love: "You'll find yourself expressing more. Reaching out first works in your favor, but don't wear yourself out trying to please.",
      career: "A good year for turning ideas into real output. Just pace yourself so you don't burn out.",
      study: "A good year to put what you've learned into practice — presentations, writing, and expression-heavy work suit you.",
      health: "You're spending a lot of energy this year, so fatigue builds easily — build rest in deliberately.",
    },
    otherNurturesSelf: {
      headline: "A Year of Being Filled",
      overview: "Support and good energy from around you naturally fill you up this year. Accept it comfortably, but keep building your own strength too — leaning too long can dull it.",
      wealth: "Unexpected help or opportunity could fill your finances this year — just keep growing your own earning power alongside it.",
      love: "Someone likely to look out for you shows up this year, letting an easy, comfortable connection take shape.",
      career: "A good year to meet a mentor, senior colleague, or collaborator — staying open to learning helps the most.",
      study: "What you study sinks in well and turns into real skill this year — a good time to invest in learning.",
      health: "Body and mind are in a recovering phase — if you've been pushing hard, this is the year to properly recharge.",
    },
    selfChallengesOther: {
      headline: "A Year of Taking the Lead",
      overview: "Your ability to steer and take charge grows stronger this year. Good for pushing toward what you want, but trying to control everything can create friction.",
      wealth: "A good year to actively build wealth — favorable for investments or business moves, but watch for overreach.",
      love: "You'll tend to take the lead in relationships. Just don't push things too far in your own direction, or it can spark conflict.",
      career: "A good year to push results through. More chances to lead — step up with confidence.",
      study: "Setting a goal and pushing through it pays off this year — though perfectionism can actually hold you back.",
      health: "Your activity level rises and energy runs high — just be careful not to run your body into the ground.",
    },
    otherChallengesSelf: {
      headline: "A Year of Being Tempered",
      overview: "Outside pressure or responsibility grows heavier this year. It's not always comfortable, but that pressure can be exactly what pushes you to the next level.",
      wealth: "Spending may need tightening this year — managing it deliberately can actually leave you sturdier.",
      love: "Responsibility in relationships grows heavier this year. It can feel like a burden, but it's also when bonds deepen.",
      career: "Responsibility gets heavier this year. Push through it well and it turns into real, visible growth.",
      study: "A year that calls for discipline and patience — stick with it and it can pay off in exams or certifications.",
      health: "Your energy asks for deliberate care this year — build rest in on purpose and don't carry the pressure alone.",
    },
  },
  hapNote: "On top of that, this year forms a special bond with your chart — a good connection or opportunity could arrive when you least expect it.",
  chungNote: "This year also forms a 'shift' with your chart — with more change and movement, it's a good year to move into something new. Give big decisions a little more time.",  monthRelations: {
    mirror: {
      overview: "A month with an energy like your own. Familiar ways fit well; fresh stimulation is a bit lighter.",
      wealth: "Familiar ways keep money steady this month.",
      love: "Familiar relationships feel comfortable this month.",
      career: "A good month to keep going with what you're doing.",
      study: "A good month to consolidate what you already know.",
      health: "Your usual rhythm holds; steady upkeep is the key.",
      headline: "",
    },
    selfNurturesOther: {
      overview: "A month of pouring your energy outward. Expression and output grow, but you also spend energy faster.",
      wealth: "Spending runs strong this month. Give it one check.",
      love: "A good month to reach out first. Only accommodating can wear you out.",
      career: "A good month to put ideas into action, at a paced speed.",
      study: "A good month to put what you've learned to use.",
      health: "Energy goes out a lot; plan your rest on purpose.",
      headline: "",
    },
    otherNurturesSelf: {
      overview: "A month where help and good energy fill you up.",
      wealth: "Unexpected help or a chance may reach you.",
      love: "A good month to get closer to someone who looks after you.",
      career: "Good for meeting a mentor or a collaborator.",
      study: "What you study sinks in well.",
      health: "A good month for recovery and recharging.",
      headline: "",
    },
    selfChallengesOther: {
      overview: "A month where your power to lead grows. Push ahead, and watch the pace of those around you.",
      wealth: "A good month to build wealth actively. Avoid overreach.",
      love: "It's easy to take the lead. Check their pace too.",
      career: "A good month to push for results.",
      study: "Set a goal and push, and results follow.",
      health: "Activity rises. Pace yourself so you don't overwork your body.",
      headline: "",
    },
    otherChallengesSelf: {
      overview: "A month where responsibility or pressure grows. Choosing your pace makes you sturdier.",
      wealth: "Tightening spending makes you steadier this month.",
      love: "Responsibility in relationships grows this month.",
      career: "Heavy duties turn into growth if you get through.",
      study: "A month that asks for discipline and patience.",
      health: "Release stress little by little.",
      headline: "",
    },
  },
};

const es: YearFortuneContent = {
  relations: {
    mirror: {
      headline: "Un año en tu misma sintonía",
      overview: "Este año trae una energía parecida a la tuya. Es familiar y cómodo, pero sin un nuevo impulso puede sentirse como estar siempre en el mismo sitio.",
      wealth: "Seguir con lo que ya funciona mantiene tus finanzas estables, pero no esperes un gran cambio este año.",
      love: "Los vínculos que ya tienes se mantienen cómodos, pero las personas nuevas pueden costar más de ver.",
      career: "Buen año para seguir avanzando con constancia en lo que ya haces, en vez de perseguir algo nuevo.",
      study: "Este año conviene afianzar lo que ya sabes antes que lanzarte a algo totalmente nuevo.",
      health: "Tu estado habitual continúa igual: el cuidado constante importa más que cualquier gran cambio.",
    },
    selfNurturesOther: {
      headline: "Un año para dar de ti",
      overview: "Tu energía fluye hacia fuera este año. Tu capacidad de expresarte y crear se fortalece, pero si solo das, acabarás sin fuerzas: reserva también tiempo para recuperarte.",
      wealth: "Los gastos suben al mismo tiempo que los ingresos este año: planifica con cuidado para que lo que sale no supere lo que entra.",
      love: "Este año te expresas más. Dar el primer paso juega a tu favor, pero no te agotes intentando complacer a todo el mundo.",
      career: "Buen año para convertir ideas en resultados reales. Dosifica tu ritmo para no quemarte.",
      study: "Buen año para poner en práctica lo aprendido: las presentaciones, la escritura y los trabajos de expresión te favorecen.",
      health: "Este año gastas mucha energía y el cansancio se acumula con facilidad: incluye el descanso en tu rutina a propósito.",
    },
    otherNurturesSelf: {
      headline: "Un año para recibir apoyo",
      overview: "El apoyo y la buena energía de tu entorno te llenan de forma natural este año. Acéptalos con tranquilidad, pero sigue fortaleciendo tus propias fuerzas: apoyarte demasiado tiempo puede debilitarlas.",
      wealth: "Una ayuda o una oportunidad inesperada podría mejorar tus finanzas este año; sigue desarrollando también tu propia capacidad de generar ingresos.",
      love: "Este año puede aparecer alguien dispuesto a cuidarte, y con esa persona un vínculo fácil y cómodo.",
      career: "Buen año para encontrar un mentor, a alguien con más experiencia o a un colaborador; tener ganas de aprender es lo que más ayuda.",
      study: "Lo que estudias se asienta bien y se convierte en habilidad real este año: buen momento para invertir en aprender.",
      health: "Cuerpo y mente están en una fase de recuperación. Si te has exigido mucho, este es el año para recargar energía de verdad.",
    },
    selfChallengesOther: {
      headline: "Un año para llevar la iniciativa",
      overview: "Crece tu capacidad de dirigir y de tomar el mando este año. Es bueno para ir tras lo que quieres, pero intentar controlarlo todo puede generar fricciones.",
      wealth: "Buen año para generar dinero de forma activa: favorece las inversiones y los proyectos de negocio, pero cuida no excederte.",
      love: "Tenderás a llevar la iniciativa en las relaciones. Procura no imponer demasiado tu manera de hacer las cosas, o puede surgir algún conflicto.",
      career: "Buen año para sacar resultados adelante. Habrá más ocasiones de liderar: da el paso con confianza.",
      study: "Ponerte una meta y ir tras ella da frutos este año, aunque el perfeccionismo puede acabar frenándote.",
      health: "Tu nivel de actividad sube y te sobra energía; solo procura no llevar tu cuerpo al límite.",
    },
    otherChallengesSelf: {
      headline: "Un año que te fortalece",
      overview: "Crecen la presión y la responsabilidad externas este año. No siempre será cómodo, pero esa presión puede ser justo lo que te impulse al siguiente nivel.",
      wealth: "Puede que este año toque ajustar los gastos; llevarlos con orden puede dejarte en una posición más firme.",
      love: "La responsabilidad en las relaciones pesa más este año. Puede sentirse como una carga, pero también es una etapa en la que los vínculos se profundizan.",
      career: "La responsabilidad pesa más este año. Si la llevas bien, se convierte en un crecimiento real y visible.",
      study: "Un año que pide disciplina y paciencia: si persistes, puede dar frutos en exámenes o certificaciones.",
      health: "Tu energía pide un cuidado más deliberado este año: incorpora descanso a propósito y no cargues con la presión por tu cuenta.",
    },
  },
  hapNote: "Además, este año forma una conexión especial con tus Cuatro Pilares: puede llegar una buena relación o una oportunidad cuando menos lo esperes.",
  chungNote: "Este año también forma con tus Cuatro Pilares una relación de cambio: habrá más movimiento, así que es buen año para pasar a algo nuevo. Date un poco más de tiempo antes de tomar decisiones importantes.",
  monthRelations: {
    mirror: {
      overview: "Un mes con una energía parecida a la tuya. Lo habitual funciona bien y hay algo menos de novedad.",
      wealth: "Con tu forma habitual de manejar el dinero, el mes transcurre estable.",
      love: "Los vínculos de siempre se sienten cómodos este mes.",
      career: "Buen mes para continuar con lo que ya haces.",
      study: "Buen mes para consolidar lo que ya sabes.",
      health: "Tu ritmo habitual se mantiene; lo clave es cuidarte con constancia.",
      headline: "",
    },
    selfNurturesOther: {
      overview: "Un mes de volcar tu energía hacia fuera. Crecen la expresión y lo que produces, pero también gastas energía más rápido.",
      wealth: "Los gastos van fuertes este mes. Conviene revisarlos.",
      love: "Buen mes para dar el primer paso. Si solo te dedicas a complacer, puede agotarte.",
      career: "Buen mes para llevar ideas a la acción, cuidando el ritmo.",
      study: "Buen mes para poner en práctica lo aprendido.",
      health: "Gastas mucha energía: reserva tiempo para descansar.",
      headline: "",
    },
    otherNurturesSelf: {
      overview: "Un mes en que la ayuda y la buena energía te llenan.",
      wealth: "Puede llegarte una ayuda o una oportunidad inesperada.",
      love: "Buen mes para acercarte a quien cuida de ti.",
      career: "Buen mes para conocer a un mentor o a alguien con quien colaborar.",
      study: "Lo que estudias se asienta bien.",
      health: "Buen mes para recuperarte y recargar energía.",
      headline: "",
    },
    selfChallengesOther: {
      overview: "Un mes en que crece tu capacidad de liderar. Avanza, pero fíjate también en el ritmo de quienes te rodean.",
      wealth: "Buen mes para generar dinero de forma activa. Evita excederte.",
      love: "Es fácil llevar la iniciativa. Fíjate también en el ritmo de la otra persona.",
      career: "Buen mes para sacar resultados adelante.",
      study: "Ponte una meta y ve tras ella: los resultados llegan.",
      health: "La actividad sube. Dosifícate para no forzar el cuerpo.",
      headline: "",
    },
    otherChallengesSelf: {
      overview: "Un mes en que aumentan la responsabilidad o la presión. Llevar tu propio ritmo te da firmeza.",
      wealth: "Ajustar el gasto te da más solidez este mes.",
      love: "Crece la responsabilidad en las relaciones este mes.",
      career: "Las cargas pesadas se convierten en crecimiento si las superas.",
      study: "Un mes que pide disciplina y paciencia.",
      health: "Suelta el estrés poco a poco.",
      headline: "",
    },
  },
};

export const YEAR_FORTUNE_CONTENT: Record<Locale, YearFortuneContent> = { ko, en, es };
