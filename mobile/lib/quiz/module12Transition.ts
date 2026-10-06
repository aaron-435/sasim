/**
 * lib/module12Transition.ts
 * ------------------------------------------------------------------
 * Module 12 — 새 출발(인생 전환기) 심화 테스트, 30문항. 이별·이직·이사처럼
 * 삶의 한 장이 바뀌는 시기에 "나는 변화를 어떻게 지나가는가"를 본다.
 * 브리지스의 전환 모델(끝맺음 → 중간 지대 → 새 시작)을 3차원으로 옮겼다:
 * 뒤돌아봄(L1-L10) / 사이의 불안(U1-U10) / 출발 망설임(R1-R10).
 * 사별·건강·사고처럼 안전 쪽으로 열리는 상실은 문항에 넣지 않았다.
 * 2026-10-06 작성(TODO 11). 전문가 검토 전 초안.
 * ------------------------------------------------------------------
 */

import type { Locale } from "../i18n/types";
import type { ModuleQuestion, QuestionTextOverride } from "./quizProfile";

export const MODULE12_QUESTIONS: ModuleQuestion[] = [
  // ---- 뒤돌아봄 (Looking Back) — L1-L10: 끝난 것을 보내기 어려움 ----
  { id: "L1", dimension: "lookingBack", format: "slider", prompt: "끝난 일(관계, 직장, 살던 곳)이 지금도 머릿속에 떠오르는 정도는?", options: { minLabel: "거의 떠오르지 않음", maxLabel: "하루에도 여러 번" } },
  { id: "L2", dimension: "lookingBack", format: "choice", prompt: "예전 사진이나 메시지를 다시 보게 되면?", options: [
    { label: "편하게 보고 넘긴다", score: 0 }, { label: "잠깐 그리워지다 만다", score: 1 },
    { label: "한동안 그 시절에 머문다", score: 2 }, { label: "일부러 자꾸 찾아본다", score: 3 } ] },
  { id: "L3", dimension: "lookingBack", format: "choice", prompt: "새로 만난 사람이나 일을 예전 것과 비교하게 되는 정도는?", options: [
    { label: "거의 비교하지 않는다", score: 0 }, { label: "가끔 떠오른다", score: 1 },
    { label: "자주 비교한다", score: 2 }, { label: "늘 예전이 기준이 된다", score: 3 } ] },
  { id: "L4", dimension: "lookingBack", format: "choice", prompt: "끝난 일을 두고 '그때 이렇게 했더라면'을 떠올리는 건?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "같은 장면을 계속 다시 돌린다", score: 3 } ] },
  { id: "L5", dimension: "lookingBack", format: "choice", prompt: "예전 시절의 물건(선물, 사원증, 옛집 열쇠 등)을 정리하는 건?", options: [
    { label: "필요하면 금방 정리한다", score: 0 }, { label: "시간이 좀 걸려도 정리한다", score: 1 },
    { label: "손이 잘 안 간다", score: 2 }, { label: "정리할 엄두가 안 난다", score: 3 } ] },
  { id: "L6", dimension: "lookingBack", format: "choice", prompt: "'이제 잊을 때도 됐잖아'라는 말을 들으면?", options: [
    { label: "맞는 말이라고 생각한다", score: 0 }, { label: "조금 서운하지만 이해한다", score: 1 },
    { label: "아직은 아니라고 느낀다", score: 2 }, { label: "나만 멈춰 있는 것 같아 작아진다", score: 3 } ] },
  { id: "L7", dimension: "lookingBack", format: "choice", prompt: "끝난 일을 떠올릴 때 주로 드는 마음은?", options: [
    { label: "고맙고 담담하다", score: 0 }, { label: "조금 아쉽다", score: 1 },
    { label: "미련이 크다", score: 2 }, { label: "끝났다는 게 아직 실감 나지 않는다", score: 3 } ] },
  { id: "L8", dimension: "lookingBack", format: "choice", prompt: "예전 동네, 예전 회사, 예전 사람의 소식이 들리면?", options: [
    { label: "반갑게 듣고 만다", score: 0 }, { label: "조금 궁금해진다", score: 1 },
    { label: "한참 마음이 쓰인다", score: 2 }, { label: "일부러 찾아보며 확인한다", score: 3 } ] },
  { id: "L9", dimension: "lookingBack", format: "choice", prompt: "변화 뒤에도 예전 습관(가던 길, 연락하던 시간)이 남아 있는 정도는?", options: [
    { label: "금방 바뀌었다", score: 0 }, { label: "조금 남아 있다", score: 1 },
    { label: "꽤 오래 남아 있다", score: 2 }, { label: "아직 예전 리듬대로 산다", score: 3 } ] },
  { id: "L10", dimension: "lookingBack", format: "choice", prompt: "끝난 것에 제대로 작별했다고 느끼나요?", options: [
    { label: "충분히 했다", score: 0 }, { label: "어느 정도 했다", score: 1 },
    { label: "제대로 못 한 것 같다", score: 2 }, { label: "작별할 틈도 없이 끝났다", score: 3 } ] },

  // ---- 사이의 불안 (Unsettled In-Between) — U1-U10: 아직 정해지지 않은 시간을 견디기 어려움 ----
  { id: "U1", dimension: "inBetween", format: "slider", prompt: "다음이 아직 정해지지 않은 시기를 견디기 힘든 정도는?", options: { minLabel: "꽤 편하게 지낸다", maxLabel: "매우 견디기 힘들다" } },
  { id: "U2", dimension: "inBetween", format: "choice", prompt: "계획 없이 비어 있는 주말이 생기면?", options: [
    { label: "여유롭게 쉰다", score: 0 }, { label: "조금 허전하다", score: 1 },
    { label: "불안해서 뭔가로 채운다", score: 2 }, { label: "나만 뒤처지는 것 같다", score: 3 } ] },
  { id: "U3", dimension: "inBetween", format: "choice", prompt: "'요즘 뭐 해?'라는 질문을 받으면?", options: [
    { label: "있는 그대로 말한다", score: 0 }, { label: "적당히 둘러댄다", score: 1 },
    { label: "대답하기가 곤란하다", score: 2 }, { label: "그 질문이 나올 자리를 피한다", score: 3 } ] },
  { id: "U4", dimension: "inBetween", format: "choice", prompt: "다음 길을 정할 때 나는?", options: [
    { label: "시간을 두고 정한다", score: 0 }, { label: "적당히 알아보고 정한다", score: 1 },
    { label: "빨리 정해야 마음이 놓인다", score: 2 }, { label: "뭐라도 일단 정해 버린다", score: 3 } ] },
  { id: "U5", dimension: "inBetween", format: "choice", prompt: "변화의 한가운데에 있을 때, 나에 대해 드는 생각은?", options: [
    { label: "잠깐 쉬어 가는 중이다", score: 0 }, { label: "조금 어정쩡하다", score: 1 },
    { label: "내가 누군지 흐릿하다", score: 2 }, { label: "길을 잃은 것 같다", score: 3 } ] },
  { id: "U6", dimension: "inBetween", format: "choice", prompt: "주변 사람들이 하나둘 자리를 잡는 소식을 들으면?", options: [
    { label: "축하하고 넘긴다", score: 0 }, { label: "조금 부럽다", score: 1 },
    { label: "나와 비교하게 된다", score: 2 }, { label: "한동안 마음이 가라앉는다", score: 3 } ] },
  { id: "U7", dimension: "inBetween", format: "choice", prompt: "확실한 답이 오기 전까지 기다려야 할 때?", options: [
    { label: "느긋하게 기다린다", score: 0 }, { label: "조금 답답해도 기다린다", score: 1 },
    { label: "자꾸 확인하고 알아본다", score: 2 }, { label: "가만히 있기가 너무 힘들다", score: 3 } ] },
  { id: "U8", dimension: "inBetween", format: "choice", prompt: "예상하지 못한 일로 계획이 바뀌면?", options: [
    { label: "유연하게 바꾼다", score: 0 }, { label: "잠깐 당황하다 맞춘다", score: 1 },
    { label: "한동안 흔들린다", score: 2 }, { label: "다 무너지는 느낌이다", score: 3 } ] },
  { id: "U9", dimension: "inBetween", format: "choice", prompt: "하루를 보내고 '오늘 뭘 했지?' 싶은 날이?", options: [
    { label: "거의 없다", score: 0 }, { label: "가끔 있다", score: 1 },
    { label: "자주 있다", score: 2 }, { label: "대부분 그렇다", score: 3 } ] },
  { id: "U10", dimension: "inBetween", format: "choice", prompt: "지금 시기를 한 단어로 고른다면?", options: [
    { label: "준비하는 시간", score: 0 }, { label: "쉼표", score: 1 },
    { label: "안개 속", score: 2 }, { label: "멈춰 버린 시간", score: 3 } ] },

  // ---- 출발 망설임 (Slow to Restart) — R1-R10: 새 자리에 마음을 두기 어려움 ----
  { id: "R1", dimension: "restartHesitation", format: "slider", prompt: "새 환경(새 직장, 새 동네, 새 관계)에 마음을 붙이는 데 걸리는 시간은?", options: { minLabel: "금방 붙는다", maxLabel: "아주 오래 걸린다" } },
  { id: "R2", dimension: "restartHesitation", format: "choice", prompt: "새로 만난 사람들에게 먼저 다가가는 건?", options: [
    { label: "어렵지 않다", score: 0 }, { label: "분위기를 보며 다가간다", score: 1 },
    { label: "누가 먼저 와 주길 기다린다", score: 2 }, { label: "거의 먼저 다가가지 않는다", score: 3 } ] },
  { id: "R3", dimension: "restartHesitation", format: "choice", prompt: "새 동네나 새 회사에서 단골 가게, 익숙한 자리를 만드는 건?", options: [
    { label: "금방 만든다", score: 0 }, { label: "시간이 지나면 생긴다", score: 1 },
    { label: "잘 안 만들게 된다", score: 2 }, { label: "여전히 손님처럼 지낸다", score: 3 } ] },
  { id: "R4", dimension: "restartHesitation", format: "choice", prompt: "새 출발을 앞두고 드는 마음은?", options: [
    { label: "설렌다", score: 0 }, { label: "설렘 반 걱정 반", score: 1 },
    { label: "걱정이 더 크다", score: 2 }, { label: "아직 시작해도 되나 싶다", score: 3 } ] },
  { id: "R5", dimension: "restartHesitation", format: "choice", prompt: "새로 시작한 곳에 마음을 두는 정도는?", options: [
    { label: "바로 마음을 둔다", score: 0 }, { label: "조금씩 둔다", score: 1 },
    { label: "언제든 떠날 수 있게 반만 둔다", score: 2 }, { label: "잘 두지 않는다", score: 3 } ] },
  { id: "R6", dimension: "restartHesitation", format: "choice", prompt: "새 자리에서 실수했을 때?", options: [
    { label: "배우는 과정이라 넘긴다", score: 0 }, { label: "조금 신경 쓰다 넘긴다", score: 1 },
    { label: "역시 여긴 내 자리가 아닌가 싶다", score: 2 }, { label: "예전 자리로 돌아가고 싶어진다", score: 3 } ] },
  { id: "R7", dimension: "restartHesitation", format: "choice", prompt: "새 일상(루틴)을 만드는 건?", options: [
    { label: "금방 만든다", score: 0 }, { label: "몇 주면 생긴다", score: 1 },
    { label: "자꾸 흐트러진다", score: 2 }, { label: "만들 마음이 잘 안 생긴다", score: 3 } ] },
  { id: "R8", dimension: "restartHesitation", format: "choice", prompt: "누군가 새 모임이나 기회를 권하면?", options: [
    { label: "반갑게 가 본다", score: 0 }, { label: "골라서 가 본다", score: 1 },
    { label: "핑계를 대고 미룬다", score: 2 }, { label: "거의 거절한다", score: 3 } ] },
  { id: "R9", dimension: "restartHesitation", format: "choice", prompt: "새 환경에서 '여기 사람'이 됐다고 느끼는 건?", options: [
    { label: "금방 느낀다", score: 0 }, { label: "시간이 지나면 느낀다", score: 1 },
    { label: "오래 지나도 잘 안 느껴진다", score: 2 }, { label: "늘 이방인 같다", score: 3 } ] },
  { id: "R10", dimension: "restartHesitation", format: "choice", prompt: "새로 시작한 일이 잘 풀리기 시작하면?", options: [
    { label: "기쁘게 누린다", score: 0 }, { label: "조금 얼떨떨하다", score: 1 },
    { label: "오래가지 않을 것 같다", score: 2 }, { label: "예전 것에 미안한 마음이 든다", score: 3 } ] },
];

// Display-text-only translations of MODULE12_QUESTIONS above — see MODULE1's
// equivalent comment in module1Attachment.ts for why id/dimension/format/
// score aren't duplicated per locale.
export const MODULE12_QUESTIONS_EN: Record<string, QuestionTextOverride> = {
  L1: { prompt: "How often does something that ended (a relationship, a job, a place you lived) still come to mind?", minLabel: "Hardly ever", maxLabel: "Several times a day" },
  L2: { prompt: "When you come across old photos or messages?", optionLabels: ["I look and move on easily", "I miss it for a moment, then it passes", "I stay in that time for a while", "I go looking for them on purpose"] },
  L3: { prompt: "How much do you compare new people or a new job with what came before?", optionLabels: ["Hardly at all", "It crosses my mind sometimes", "I compare often", "The old one is always my yardstick"] },
  L4: { prompt: "How often do you think \"if only I'd done it differently\" about something that ended?", optionLabels: ["Rarely", "Sometimes", "Often", "I replay the same scene over and over"] },
  L5: { prompt: "Clearing out things from that chapter (gifts, an old work badge, keys to a former home)?", optionLabels: ["I clear them out quickly when needed", "It takes a while, but I do it", "I can't quite bring myself to", "I can't even think about starting"] },
  L6: { prompt: "When someone says \"Isn't it time to move on?\"", optionLabels: ["I think they have a point", "It stings a little, but I get it", "I feel it's not time yet", "I feel small, like I'm the only one standing still"] },
  L7: { prompt: "When you think back on what ended, what do you mostly feel?", optionLabels: ["Grateful and at peace", "A little wistful", "A strong pull to hold on", "It still doesn't feel real that it's over"] },
  L8: { prompt: "When you hear news about your old neighborhood, old workplace, or someone from before?", optionLabels: ["I'm glad to hear it, and that's it", "I get a bit curious", "It stays on my mind for a long time", "I go looking for more on purpose"] },
  L9: { prompt: "How much of your old routine (the way you used to walk, the time you used to call) is still there after the change?", optionLabels: ["It changed quickly", "A little remains", "It's lingered quite a while", "I still live by the old rhythm"] },
  L10: { prompt: "Do you feel you got to say a proper goodbye to what ended?", optionLabels: ["Yes, fully", "To some degree", "Not really", "It ended before I had the chance"] },
  U1: { prompt: "How hard is it for you to be in a stretch where what comes next isn't decided yet?", minLabel: "I'm fairly at ease", maxLabel: "Very hard to bear" },
  U2: { prompt: "When a weekend opens up with nothing planned?", optionLabels: ["I rest and enjoy the space", "It feels a little empty", "I get uneasy and fill it with something", "I feel like I'm falling behind"] },
  U3: { prompt: "When someone asks, \"So what are you up to these days?\"", optionLabels: ["I tell them how it is", "I give a vague answer", "I find it hard to answer", "I avoid places where that question comes up"] },
  U4: { prompt: "When it comes to choosing your next path, you…", optionLabels: ["take your time deciding", "look around a bit, then decide", "need to decide fast to feel settled", "just pick something, anything, to have it decided"] },
  U5: { prompt: "In the middle of a big change, what do you think about yourself?", optionLabels: ["I'm taking a short pause", "I'm a bit in limbo", "I'm not sure who I am right now", "I feel like I've lost my way"] },
  U6: { prompt: "When you hear people around you settling into new things, one after another?", optionLabels: ["I congratulate them and move on", "I feel a little envious", "I start comparing myself", "My mood sinks for a while"] },
  U7: { prompt: "When you have to wait for a clear answer?", optionLabels: ["I can wait calmly", "It's a bit frustrating, but I wait", "I keep checking and looking into it", "Sitting still is really hard"] },
  U8: { prompt: "When something unexpected changes your plans?", optionLabels: ["I adjust easily", "I'm thrown for a moment, then adapt", "I'm shaken for a while", "It feels like everything's falling apart"] },
  U9: { prompt: "How often do you end a day thinking, \"What did I even do today?\"", optionLabels: ["Rarely", "Sometimes", "Often", "Most days"] },
  U10: { prompt: "If you had to pick one phrase for this stretch of your life?", optionLabels: ["A time to prepare", "A pause", "In a fog", "Time standing still"] },
  R1: { prompt: "How long does it take you to feel attached to a new setting (a new job, a new neighborhood, a new relationship)?", minLabel: "Not long at all", maxLabel: "A very long time" },
  R2: { prompt: "Reaching out first to people you've just met?", optionLabels: ["It's not hard for me", "I read the room, then reach out", "I wait for someone to come to me", "I almost never go first"] },
  R3: { prompt: "Finding a regular café or a familiar spot in a new neighborhood or workplace?", optionLabels: ["I find one quickly", "One shows up with time", "I don't really make one", "I still feel like a visitor"] },
  R4: { prompt: "As a fresh start approaches, how do you feel?", optionLabels: ["Excited", "Half excited, half worried", "More worried than excited", "I'm not sure I'm allowed to start yet"] },
  R5: { prompt: "How much of yourself do you put into a place you've just started?", optionLabels: ["I'm all in right away", "A little more each day", "Only half, so I can leave anytime", "Not much at all"] },
  R6: { prompt: "When you make a mistake in a new place?", optionLabels: ["I let it go; I'm still learning", "It bugs me a bit, then I let it go", "I wonder if I really belong here", "I want to go back to where I was"] },
  R7: { prompt: "Building a new daily routine?", optionLabels: ["I build one quickly", "One forms in a few weeks", "It keeps falling apart", "I don't really feel like building one"] },
  R8: { prompt: "When someone invites you to a new group or opportunity?", optionLabels: ["I'm glad to go", "I go to the ones I choose", "I make an excuse and put it off", "I almost always say no"] },
  R9: { prompt: "Feeling like you're one of the locals in a new place?", optionLabels: ["It comes quickly", "It comes with time", "It barely comes, even after a long time", "I always feel like an outsider"] },
  R10: { prompt: "When something new starts going well for you?", optionLabels: ["I enjoy it", "It feels a bit unreal", "I doubt it'll last", "I feel almost guilty toward what came before"] },
};

export const MODULE12_QUESTIONS_ES: Record<string, QuestionTextOverride> = {
  L1: { prompt: "¿Con qué frecuencia te sigue viniendo a la mente algo que terminó (una relación, un trabajo, un lugar donde viviste)?", minLabel: "Casi nunca", maxLabel: "Varias veces al día" },
  L2: { prompt: "Cuando vuelves a ver fotos o mensajes de antes…", optionLabels: ["Los miro y sigo sin problema", "Lo echo de menos un momento y se me pasa", "Me quedo en esa época un buen rato", "Los busco a propósito una y otra vez"] },
  L3: { prompt: "¿Cuánto comparas a la gente nueva o un trabajo nuevo con lo de antes?", optionLabels: ["Casi nada", "A veces se me cruza", "Lo comparo a menudo", "Lo de antes siempre es mi medida"] },
  L4: { prompt: "¿Cada cuánto piensas \"si lo hubiera hecho de otra manera\" sobre algo que terminó?", optionLabels: ["Casi nunca", "A veces", "A menudo", "Repaso la misma escena una y otra vez"] },
  L5: { prompt: "Ordenar las cosas de esa etapa (regalos, la tarjeta del trabajo anterior, llaves de una casa de antes)…", optionLabels: ["Lo ordeno rápido cuando hace falta", "Me lleva tiempo, pero lo hago", "No me animo a tocarlo", "Ni siquiera me veo empezando"] },
  L6: { prompt: "Cuando alguien te dice \"¿no es hora de pasar página?\"…", optionLabels: ["Pienso que tiene razón", "Me duele un poco, pero lo entiendo", "Siento que todavía no es el momento", "Me siento poca cosa, como si solo yo siguiera en el mismo sitio"] },
  L7: { prompt: "Cuando recuerdas lo que terminó, ¿qué sientes sobre todo?", optionLabels: ["Gratitud y calma", "Algo de nostalgia", "Ganas fuertes de aferrarme", "Todavía no me parece real que haya terminado"] },
  L8: { prompt: "Cuando te llegan noticias de tu antiguo barrio, tu antiguo trabajo o alguien de antes…", optionLabels: ["Me alegra saberlo y ya", "Me da algo de curiosidad", "Me queda dando vueltas mucho tiempo", "Busco más a propósito"] },
  L9: { prompt: "Después del cambio, ¿cuánto sigue ahí tu rutina de antes (el camino de siempre, la hora en que solías llamar)?", optionLabels: ["Cambió rápido", "Queda un poco", "Ha durado bastante", "Sigo viviendo al ritmo de antes"] },
  L10: { prompt: "¿Sientes que pudiste despedirte de verdad de lo que terminó?", optionLabels: ["Sí, del todo", "En parte", "No del todo", "Terminó antes de que pudiera despedirme"] },
  U1: { prompt: "¿Cuánto te cuesta estar en una etapa en la que todavía no se sabe qué viene después?", minLabel: "Lo llevo con bastante calma", maxLabel: "Me cuesta muchísimo" },
  U2: { prompt: "Cuando tienes un fin de semana libre y sin planes…", optionLabels: ["Descanso y lo disfruto", "Se siente un poco vacío", "Me inquieta y lo lleno con algo", "Siento que me estoy quedando atrás"] },
  U3: { prompt: "Cuando alguien te pregunta \"¿y qué haces ahora?\"…", optionLabels: ["Lo cuento tal cual", "Respondo algo vago", "Me cuesta responder", "Evito los lugares donde sale esa pregunta"] },
  U4: { prompt: "A la hora de elegir tu próximo camino…", optionLabels: ["Me tomo mi tiempo", "Miro un poco y decido", "Necesito decidir rápido para quedarme en paz", "Elijo lo que sea con tal de tenerlo decidido"] },
  U5: { prompt: "En medio de un gran cambio, ¿qué piensas de ti?", optionLabels: ["Estoy haciendo una pausa corta", "Estoy un poco en el aire", "No tengo claro quién soy ahora", "Siento que perdí el rumbo"] },
  U6: { prompt: "Cuando te enteras de que la gente de tu alrededor va encontrando su lugar…", optionLabels: ["Felicito y sigo con lo mío", "Siento un poco de envidia", "Empiezo a compararme", "Se me baja el ánimo un buen rato"] },
  U7: { prompt: "Cuando tienes que esperar una respuesta clara…", optionLabels: ["Espero con calma", "Me impacienta un poco, pero espero", "Reviso y averiguo una y otra vez", "No hacer nada mientras tanto se me hace muy difícil"] },
  U8: { prompt: "Cuando algo inesperado cambia tus planes…", optionLabels: ["Me adapto con facilidad", "Me descoloca un momento y luego me ajusto", "Me sacude un buen rato", "Siento que todo se viene abajo"] },
  U9: { prompt: "¿Cada cuánto terminas el día pensando \"¿qué hice hoy?\"?", optionLabels: ["Casi nunca", "A veces", "A menudo", "Casi todos los días"] },
  U10: { prompt: "Si tuvieras que elegir una frase para esta etapa…", optionLabels: ["Tiempo de prepararme", "Una pausa", "Entre la niebla", "El tiempo detenido"] },
  R1: { prompt: "¿Cuánto tardas en sentir apego por un entorno nuevo (un trabajo, un barrio o una relación nuevos)?", minLabel: "Muy poco", maxLabel: "Muchísimo" },
  R2: { prompt: "Acercarte primero a gente que acabas de conocer…", optionLabels: ["No me cuesta", "Observo el ambiente y luego me acerco", "Espero a que alguien venga a mí", "Casi nunca doy el primer paso"] },
  R3: { prompt: "Encontrar un café de siempre o un rincón conocido en un barrio o trabajo nuevo…", optionLabels: ["Lo encuentro rápido", "Aparece con el tiempo", "No suelo buscarlo", "Sigo sintiéndome de visita"] },
  R4: { prompt: "Ante un nuevo comienzo, ¿cómo te sientes?", optionLabels: ["Con ilusión", "Mitad ilusión, mitad preocupación", "Con más preocupación que ilusión", "Como si todavía no tuviera permiso para empezar"] },
  R5: { prompt: "¿Cuánto de ti pones en un lugar donde acabas de empezar?", optionLabels: ["Todo, desde el principio", "Un poco más cada día", "Solo la mitad, por si me voy", "Muy poco"] },
  R6: { prompt: "Cuando te equivocas en un lugar nuevo…", optionLabels: ["Lo dejo pasar: estoy aprendiendo", "Me molesta un poco y luego lo suelto", "Me pregunto si este es mi lugar", "Me dan ganas de volver adonde estaba"] },
  R7: { prompt: "Armar una nueva rutina diaria…", optionLabels: ["La armo rápido", "Se forma en unas semanas", "Se me desarma una y otra vez", "No me salen las ganas de armarla"] },
  R8: { prompt: "Cuando alguien te invita a un grupo o una oportunidad nueva…", optionLabels: ["Voy con gusto", "Voy a las que elijo", "Pongo una excusa y lo aplazo", "Casi siempre digo que no"] },
  R9: { prompt: "Sentirte parte del lugar en un entorno nuevo…", optionLabels: ["Llega rápido", "Llega con el tiempo", "Casi no llega, aunque pase mucho tiempo", "Siempre me siento de fuera"] },
  R10: { prompt: "Cuando algo nuevo empieza a salirte bien…", optionLabels: ["Lo disfruto", "Me parece un poco irreal", "Dudo que dure", "Siento algo de culpa hacia lo de antes"] },
};

export const MODULE12_DIMENSION_ITEM_COUNTS: Record<string, number> = {
  lookingBack: 10,
  inBetween: 10,
  restartHesitation: 10,
};

export const MODULE12_DIMENSION_LABELS: Record<Locale, Record<string, { high: string; low: string }>> = {
  ko: {
    lookingBack: { high: "뒤돌아봄", low: "가벼운 작별" },
    inBetween: { high: "사이의 불안", low: "기다리는 여유" },
    restartHesitation: { high: "출발 망설임", low: "빠른 정착" },
  },
  en: {
    lookingBack: { high: "Looking Back", low: "Letting Go Lightly" },
    inBetween: { high: "Unsettled In-Between", low: "Ease with Waiting" },
    restartHesitation: { high: "Slow to Restart", low: "Quick to Settle" },
  },
  es: {
    lookingBack: { high: "Mirar atrás", low: "Soltar con ligereza" },
    inBetween: { high: "Inquietud en la transición", low: "Calma para esperar" },
    restartHesitation: { high: "Arranque lento", low: "Facilidad para echar raíces" },
  },
};

export const MODULE12_TYPE_NAMES: Record<Locale, Record<string, { title: string; hook: string }>> = {
  ko: {
    baseline: { title: "유연한 이행형", hook: "끝난 것을 보내고 새 자리에 마음을 두는 흐름이 비교적 자연스럽게 이어지는 상태입니다." },
    lookingBack: { title: "뒤돌아보는 형", hook: "끝난 일이 아직 마음 한쪽에 머물러, 지금을 자꾸 예전과 나란히 놓게 됩니다." },
    inBetween: { title: "사이에서 서성이는 형", hook: "다음이 정해지지 않은 시간이 유독 불편해, 빈자리를 서둘러 채우고 싶어집니다." },
    restartHesitation: { title: "천천히 뿌리내리는 형", hook: "새 자리에 발은 들였지만, 마음을 다 두기까지 시간이 오래 걸립니다." },
    "lookingBack+inBetween": { title: "안개 속 회상형", hook: "예전은 아직 놓이지 않았고 다음은 아직 보이지 않아, 그 사이에서 마음이 오래 머뭅니다." },
    "lookingBack+restartHesitation": { title: "두 집 살림형", hook: "몸은 새 자리에 있지만, 마음은 반쯤 예전 자리에 남아 있습니다." },
    "inBetween+restartHesitation": { title: "서두르다 멈칫하는 형", hook: "빨리 자리를 잡고 싶은 마음과, 막상 새 자리에 마음을 두기 어려운 마음이 함께 있습니다." },
    "lookingBack+inBetween+restartHesitation": { title: "긴 전환기형", hook: "끝맺음, 중간 지대, 새 시작 모두에서 마음이 천천히 움직이는, 긴 전환의 한가운데에 있습니다." },
  },
  en: {
    baseline: { title: "Flexible Transitioner", hook: "Letting go of what ended and settling into what's new flow fairly naturally for you right now." },
    lookingBack: { title: "Looking Back", hook: "What ended still lives in a corner of your mind, so you keep setting the present beside the past." },
    inBetween: { title: "Restless In-Between", hook: "Time without a next step feels especially uncomfortable, so you want to fill the gap quickly." },
    restartHesitation: { title: "Slow to Take Root", hook: "You've stepped into the new place, but it takes a long time before your heart fully follows." },
    "lookingBack+inBetween": { title: "Looking Back Through the Fog", hook: "The past hasn't let go yet and the next chapter isn't in sight, so your heart lingers in between." },
    "lookingBack+restartHesitation": { title: "Living in Two Places", hook: "You're physically in the new place, but part of your heart is still back in the old one." },
    "inBetween+restartHesitation": { title: "Rushing, Then Pausing", hook: "You want to get settled fast, yet when the new place arrives, it's hard to put your heart into it." },
    "lookingBack+inBetween+restartHesitation": { title: "In the Long Middle", hook: "Your heart is moving slowly through the ending, the in-between, and the new start alike: deep in a long transition." },
  },
  es: {
    baseline: { title: "Transición flexible", hook: "Soltar lo que terminó y echar raíces en lo nuevo se te da con bastante naturalidad en este momento." },
    lookingBack: { title: "Mirada hacia atrás", hook: "Lo que terminó sigue ocupando un rincón de tu mente, y vuelves a poner el presente al lado del pasado." },
    inBetween: { title: "Inquietud en la transición", hook: "El tiempo sin un siguiente paso te resulta especialmente incómodo, y quieres llenar el hueco cuanto antes." },
    restartHesitation: { title: "Raíces lentas", hook: "Ya diste el paso al lugar nuevo, pero tu corazón tarda mucho en llegar del todo." },
    "lookingBack+inBetween": { title: "Recuerdos entre la niebla", hook: "Lo de antes todavía no se suelta y lo siguiente todavía no se ve, así que tu corazón se queda en medio." },
    "lookingBack+restartHesitation": { title: "Entre dos casas", hook: "Estás en el lugar nuevo, pero una parte de tu corazón sigue en el de antes." },
    "inBetween+restartHesitation": { title: "Prisa y pausa", hook: "Quieres encontrar tu lugar rápido, pero cuando llega lo nuevo, te cuesta poner el corazón en ello." },
    "lookingBack+inBetween+restartHesitation": { title: "En plena transición", hook: "Tu corazón avanza despacio por el final, el espacio intermedio y el nuevo comienzo: estás en medio de una transición larga." },
  },
};
