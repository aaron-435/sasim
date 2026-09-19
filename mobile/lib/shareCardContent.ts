/**
 * mobile/lib/shareCardContent.ts
 * ------------------------------------------------------------------
 * Copy for the domain share cards (ShareCardsScreen): "how I smell out money" and "what
 * sets my heart racing", one entry per saju archetype (the 10 day-master types already
 * classified server-side, see lib/sajuType.ts). Deterministic and free — no GPT call —
 * so the cards can be shared by anyone, which is the point: they are the viral surface.
 *
 * Same copy rule as lib/sajuTypeContent.ts: tendencies, not verdicts ("you tend to…"),
 * and the tip is a gentle habit, never a prediction. Spanish is gender-neutral where
 * Spanish allows it.
 * ------------------------------------------------------------------
 */

import type { ArchetypeKey } from "./sajuType";
import type { Locale } from "./i18n/types";

export interface DomainCardCopy {
  headline: string;
  body: string;
  tip: string;
}

export type CardDomain = "money" | "love";

export type ShareCardContent = Record<CardDomain, Record<ArchetypeKey, DomainCardCopy>>;

const ko: ShareCardContent = {
  money: {
    oak: { headline: "큰 줄기에 크게 거는 사람", body: "작은 푼돈보다 방향이 분명한 한 곳에 오래 밀고 가는 편이에요. 한번 정한 계획은 잘 안 바꿔서, 접어야 할 때가 늦어지기도 해요.", tip: "접을 기준을 미리 정해 두세요" },
    vine: { headline: "돌아가도 끝내 닿는 사람", body: "정면 승부보다 사람과 정보를 타고 기회를 찾는 편이에요. 인맥과 감각이 돈길이 되지만, 이것저것 감다 보면 힘이 분산돼요.", tip: "이번 달 감을 줄기는 하나만" },
    sun: { headline: "드러낼수록 붙는 사람", body: "자기를 보여줄 때 기회와 사람이 모이는 편이에요. 인정받는 자리에서 돈이 따라오지만, 기분 좋을 때의 씀씀이가 커질 수 있어요.", tip: "기분 좋은 날엔 결제를 하루 미루기" },
    flame: { headline: "한 가지를 깊이 파는 사람", body: "넓게 벌리기보다 한 분야를 깊게 파서 값어치를 올리는 편이에요. 집중이 곧 수입이 되지만, 에너지가 바닥나면 지출 관리도 흐트러져요.", tip: "쉬는 날도 예산에 넣어 두세요" },
    mountain: { headline: "쌓아서 무게가 되는 사람", body: "빠르게 벌기보다 느리게 쌓아서 든든해지는 편이에요. 안정적인 자산과 신뢰가 강점이지만, 움직임이 느려 좋은 기회를 놓칠 때도 있어요.", tip: "분기마다 새로운 선택지 하나 살펴보기" },
    field: { headline: "길러서 거두는 사람", body: "씨앗을 뿌리고 기다리는 돈에 강한 편이에요. 꾸준한 저축이나 장기 프로젝트가 잘 맞고, 남을 챙기다 내 몫이 뒤로 밀리기도 해요.", tip: "내 몫을 먼저 떼어 두기" },
    steel: { headline: "결정이 빠른 사람", body: "판단과 실행이 빨라서 기회를 잡는 속도가 강점이에요. 다만 말이 직설적이면 협상에서 손해를 볼 수 있어요.", tip: "숫자 이야기는 한 박자 쉬고" },
    gem: { headline: "다듬을수록 값이 오르는 사람", body: "디테일과 퀄리티로 가치를 높이는 편이에요. 좋은 것을 알아보는 눈이 돈이 되지만, 그 눈이 지출로 새기도 쉬워요.", tip: "사고 싶은 건 3일 뒤에 다시 보기" },
    ocean: { headline: "크게 받아 크게 흐르는 사람", body: "사람과 정보가 모이는 자리에서 돈이 크게 오가는 편이에요. 담는 그릇이 큰 만큼 새는 곳도 크니, 흐름을 기록해 두면 좋아요.", tip: "고정 지출부터 한 번 훑어보기" },
    dew: { headline: "조용히 스며드는 사람", body: "눈에 안 띄게 쌓는 감각이 좋은 편이에요. 세심한 관찰이 기회를 알아보게 해 주고, 남의 사정에 마음이 쓰여 지갑이 열릴 때도 있어요.", tip: "부탁받은 돈은 하루 생각해 보기" },
  },
  love: {
    oak: { headline: "믿음직한 방향이 보일 때", body: "말과 행동이 한결같은 사람에게 마음이 열려요. 한번 마음을 주면 곧게 가지만, 표현이 무뚝뚝해 오해를 사기도 해요.", tip: "좋다는 말을 한 번 더 꺼내기" },
    vine: { headline: "나를 세심하게 알아봐 줄 때", body: "작은 취향과 습관을 기억해 주는 사람에게 끌려요. 다가가는 방식이 부드러워서, 속도가 어긋나면 혼자 감정을 감을 수 있어요.", tip: "감정은 엉키기 전에 한 마디로" },
    sun: { headline: "함께 웃고 솔직할 때", body: "숨김없이 웃고 표현해 주는 사람이 좋아요. 마음이 그대로 보여 인기가 있지만, 같은 크기의 반응이 없으면 금방 지쳐요.", tip: "상대의 속도도 한 번 물어보기" },
    flame: { headline: "깊은 대화가 통할 때", body: "한 사람과 깊게 이야기 나눌 때 마음이 붙어요. 온도가 높은 만큼 확 타올랐다 식기도 해서, 천천히 데우는 관계가 잘 맞아요.", tip: "첫 열기 뒤 일주일은 지켜보기" },
    mountain: { headline: "흔들리지 않는 신뢰가 있을 때", body: "말보다 꾸준함이 보이는 사람에게 끌려요. 마음이 깊어지는 데 시간이 걸리지만, 한번 깊어지면 오래 가요.", tip: "마음을 열었다는 신호를 먼저 보내기" },
    field: { headline: "돌봄이 오고 갈 때", body: "서로 챙기고 챙김 받는 관계에서 편안해져요. 주는 데 익숙해서, 받는 연습이 필요해요.", tip: "오늘은 작은 부탁 하나 해 보기" },
    steel: { headline: "솔직하고 분명한 사람", body: "돌려 말하지 않고 선명한 사람이 좋아요. 나도 직설적이라 가까운 사이일수록 말이 날카로워질 수 있어요.", tip: "좋은 말부터 먼저 하기" },
    gem: { headline: "취향과 감각이 맞을 때", body: "미감과 배려의 결이 맞는 사람에게 설레요. 기준이 높아 시작이 느리지만, 시작하면 정성이 남달라요.", tip: "완벽하지 않은 첫 만남도 괜찮아요" },
    ocean: { headline: "크게 받아 주는 사람", body: "내 이야기를 끝까지 들어 주는 넉넉함에 끌려요. 감정의 폭이 커서, 안정감을 주는 사람과 잘 맞아요.", tip: "감정이 큰 날엔 약속을 짧게" },
    dew: { headline: "조용히 곁에 있어 줄 때", body: "말보다 분위기와 섬세함이 통하는 사람이 좋아요. 마음을 잘 안 드러내서, 표현하지 않으면 상대가 몰라요.", tip: "마음 한 줄만 문자로 보내기" },
  },
};

const en: ShareCardContent = {
  money: {
    oak: { headline: "Bets big on one big direction", body: "You do better putting real weight behind one clear direction than chasing small change. Once a plan is set you rarely change it, so knowing when to fold can come late.", tip: "Write your exit rule in advance" },
    vine: { headline: "Gets there by going around", body: "You find money through people and information more than head-on plays. Your network and instinct are the path, but climbing too many things at once spreads you thin.", tip: "Pick one thing to climb this month" },
    sun: { headline: "Earns more the more you show up", body: "Opportunities and people gather when you're visible. Money follows recognition, though spending can swell when you're in a good mood.", tip: "Sleep on any purchase made in a good mood" },
    flame: { headline: "Goes deep on one thing", body: "You raise your worth by digging deep into one field instead of spreading wide. Focus becomes income, but when your energy runs out your spending gets loose too.", tip: "Budget your rest days too" },
    mountain: { headline: "Builds weight over time", body: "You get steady by stacking slowly rather than earning fast. Stability and trust are your strengths, though moving slowly can mean missing a good opening.", tip: "Look at one new option each quarter" },
    field: { headline: "Plants, waits, harvests", body: "You're strong at money that grows over time, like steady saving or long projects. Looking after others can push your own share to the back.", tip: "Set your own share aside first" },
    steel: { headline: "Fast to decide", body: "Quick judgment and action let you catch chances early. Being too blunt at the table can cost you in negotiations, though.", tip: "Pause a beat before talking numbers" },
    gem: { headline: "Worth rises as you refine", body: "You add value through detail and quality. Your eye for good things can become income, and just as easily leak into spending.", tip: "Revisit a wish-list buy after 3 days" },
    ocean: { headline: "Takes in big, flows big", body: "Money moves in a big way where people and information gather. A big vessel also leaks big, so tracking your flow helps.", tip: "Skim your fixed costs once" },
    dew: { headline: "Quietly builds", body: "You have a knack for saving without fanfare. Careful observation lets you spot opportunity, and caring about other people's situations can open your wallet.", tip: "Sleep on any request for money" },
  },
  love: {
    oak: { headline: "When the direction feels trustworthy", body: "Your heart opens to someone whose words and actions match. Once you give it, you go straight, but a blunt way of expressing yourself can be misread.", tip: "Say the nice thing out loud once more" },
    vine: { headline: "When someone notices the small things", body: "You're drawn to people who remember your little tastes and habits. Your approach is gentle, so when paces don't match you may wind your feelings up alone.", tip: "Say it in a sentence before it tangles" },
    sun: { headline: "When you can laugh and be honest", body: "You like people who laugh and express themselves without hiding. Your feelings show, which makes you popular, but you tire fast if the response isn't the same size.", tip: "Ask about their pace too" },
    flame: { headline: "When the talk goes deep", body: "You attach when you can talk deeply with one person. Being high-temperature, you flare and cool, so a slow warm-up suits you.", tip: "After the first spark, just watch for a week" },
    mountain: { headline: "When trust doesn't waver", body: "Steadiness beats words for you. It takes time for feelings to deepen, but once they do, they last.", tip: "Send a signal that you're opening up" },
    field: { headline: "When care goes both ways", body: "You relax in relationships where you look after each other. You're used to giving, so receiving takes practice.", tip: "Ask for one small favor today" },
    steel: { headline: "Someone clear and direct", body: "You like people who don't talk around things. You're direct too, so the closer you get, the sharper your words can be.", tip: "Lead with the kind words" },
    gem: { headline: "When taste and sensibility match", body: "Your heart flutters when style and consideration line up. High standards slow the start, but once started, your care is exceptional.", tip: "An imperfect first meeting is fine" },
    ocean: { headline: "Someone who takes it all in", body: "You're drawn to the generosity of being heard to the end. Your emotions run wide, so a steadying person suits you.", tip: "Keep plans short on big-feeling days" },
    dew: { headline: "Someone quietly by your side", body: "You like people who match on atmosphere and subtlety more than on words. You don't show your heart easily, so if you don't say it, they won't know.", tip: "Text just one line of what you feel" },
  },
};

const es: ShareCardContent = {
  money: {
    oak: { headline: "Apuesta fuerte por una gran dirección", body: "Te va mejor poniendo peso real en una dirección clara que persiguiendo monedas sueltas. Una vez fijado el plan casi no lo cambias, así que a veces cuesta saber cuándo retirarte.", tip: "Escribe de antemano tu regla de salida" },
    vine: { headline: "Llega rodeando", body: "Encuentras el dinero a través de personas e información más que de frente. Tu red y tu instinto son el camino, pero trepar por demasiadas cosas a la vez te dispersa.", tip: "Elige una sola cosa para trepar este mes" },
    sun: { headline: "Gana más cuanto más te muestras", body: "Las oportunidades y las personas se reúnen cuando eres visible. El dinero sigue al reconocimiento, aunque el gasto puede crecer cuando estás de buen humor.", tip: "Consulta con la almohada las compras de buen humor" },
    flame: { headline: "Se hunde en una sola cosa", body: "Subes tu valor profundizando en un campo en vez de abrirte a muchos. El enfoque se vuelve ingreso, pero cuando se acaba la energía también se desordena el gasto.", tip: "Incluye tus días de descanso en el presupuesto" },
    mountain: { headline: "Construye peso con el tiempo", body: "Te estabilizas acumulando despacio más que ganando rápido. La estabilidad y la confianza son tus fortalezas, aunque ir lento puede hacerte perder una buena oportunidad.", tip: "Mira una opción nueva cada trimestre" },
    field: { headline: "Siembra, espera y cosecha", body: "Eres fuerte en el dinero que crece con el tiempo, como el ahorro constante o los proyectos largos. Cuidar de otros puede dejar tu parte al final.", tip: "Aparta primero tu parte" },
    steel: { headline: "Decide rápido", body: "Tu juicio y acción rápidos te dejan atrapar oportunidades pronto. Ser demasiado directo en la mesa puede costarte en una negociación.", tip: "Haz una pausa antes de hablar de cifras" },
    gem: { headline: "Su valor sube al pulirse", body: "Añades valor con el detalle y la calidad. Tu ojo para lo bueno puede volverse ingreso, y con la misma facilidad gasto.", tip: "Vuelve a mirar en 3 días lo que quieres comprar" },
    ocean: { headline: "Recibe en grande, fluye en grande", body: "El dinero se mueve a lo grande donde se reúnen personas e información. Un recipiente grande también gotea en grande, así que ayuda registrar tu flujo.", tip: "Repasa tus gastos fijos una vez" },
    dew: { headline: "Acumula en silencio", body: "Tienes talento para ahorrar sin ruido. Tu observación cuidadosa te ayuda a detectar oportunidades, y preocuparte por la situación de otros puede abrirte la cartera.", tip: "Consulta con la almohada cualquier petición de dinero" },
  },
  love: {
    oak: { headline: "Cuando la dirección inspira confianza", body: "Tu corazón se abre a quien es coherente entre lo que dice y hace. Cuando te entregas vas recto, pero una forma brusca de expresarte puede malinterpretarse.", tip: "Di una vez más lo bonito en voz alta" },
    vine: { headline: "Cuando alguien nota los detalles", body: "Te atraen quienes recuerdan tus pequeños gustos y hábitos. Tu forma de acercarte es suave, y si los ritmos no coinciden puedes enredar tus sentimientos a solas.", tip: "Dilo en una frase antes de que se enrede" },
    sun: { headline: "Cuando puedes reír y ser sincero", body: "Te gustan las personas que ríen y se expresan sin esconderse. Tus sentimientos se ven, lo que te hace popular, pero te cansas si la respuesta no es del mismo tamaño.", tip: "Pregunta también por su ritmo" },
    flame: { headline: "Cuando la charla se vuelve profunda", body: "Te vinculas cuando puedes hablar a fondo con una persona. Al ser de alta temperatura, prendes y te enfrías, por eso te van las relaciones que se calientan despacio.", tip: "Tras la primera chispa, solo observa una semana" },
    mountain: { headline: "Cuando la confianza no se mueve", body: "Para ti la constancia vale más que las palabras. Tus sentimientos tardan en profundizarse, pero cuando lo hacen, duran.", tip: "Envía una señal de que te estás abriendo" },
    field: { headline: "Cuando el cuidado va en ambos sentidos", body: "Te relajas en relaciones donde se cuidan mutuamente. Estás acostumbrado a dar, así que recibir requiere práctica.", tip: "Pide hoy un pequeño favor" },
    steel: { headline: "Alguien claro y directo", body: "Te gustan las personas que no dan rodeos. Tú también eres directo, así que cuanto más cerca, más afiladas pueden ser tus palabras.", tip: "Empieza por las palabras amables" },
    gem: { headline: "Cuando el gusto y la sensibilidad coinciden", body: "Se te acelera el corazón cuando coinciden el estilo y la consideración. Tus estándares altos hacen lento el comienzo, pero al empezar tu cuidado es excepcional.", tip: "Un primer encuentro imperfecto está bien" },
    ocean: { headline: "Alguien que lo acoge todo", body: "Te atrae la generosidad de ser escuchado hasta el final. Tus emociones son amplias, por eso te va una persona que dé calma.", tip: "En días de emociones grandes, planes cortos" },
    dew: { headline: "Alguien que está a tu lado en silencio", body: "Te gustan quienes conectan por ambiente y sutileza más que por palabras. No muestras fácilmente tu corazón, así que si no lo dices, no lo sabrán.", tip: "Manda un mensaje de una sola línea con lo que sientes" },
  },
};

export const SHARE_CARD_CONTENT: Record<Locale, ShareCardContent> = { ko, en, es };
