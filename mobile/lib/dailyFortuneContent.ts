/**
 * mobile/lib/dailyFortuneContent.ts
 * ------------------------------------------------------------------
 * "오늘의 운세" / "이번주 운세" 서사 카피. relation 분류·점수는
 * lib/compatibility.ts(궁합 엔진)를 그대로 재사용하지만("오늘의 기운과 나"는
 * 수학적으로 "두 사람의 일간 관계"와 같은 문제), 문구는 별도 파일로 둔다 —
 * compatibilityContent.ts의 "두 사람" 서사를 그대로 붙이면 "당신과 오늘은
 * 소울메이트" 식으로 어색해지기 때문. relation의 의미는 여기서 self=나,
 * other=오늘의 일간으로 고정.
 *
 * 2026-09-15: 구독자 피드백으로 총론(overview) 하나뿐이던 "오늘" 탭을
 * 재물운/애정운/건강운까지 확장 — 참고로 보내준 타 앱 리포트의 구성과
 * 비슷하지만, 로또 번호 추천은 의도적으로 뺐다(도박성 콘텐츠로 스토어
 * 심사에 걸릴 수 있어 Play Console 작업 때도 피해온 영역).
 * ------------------------------------------------------------------
 */

import type { CompatRelation } from "./compatibility";
import type { Locale } from "./i18n/types";

export interface DailyFortuneContent {
  relations: Record<
    CompatRelation,
    {
      overview: { headline: string; body: string };
      wealth: string;
      love: string;
      health: string;
    }
  >;
  weeklyBestDayIntro: string;
  weeklyCautionDayIntro: string;
}

const ko: DailyFortuneContent = {
  relations: {
    mirror: {
      overview: {
        headline: "나와 닮은 하루",
        body: "오늘의 기운이 내 타고난 결과 같아서, 평소의 나로 편안하게 움직이면 되는 날입니다. 다만 새로운 자극보다는 익숙한 흐름에 머무르기 쉬우니 색다른 시도는 살짝 미뤄도 좋습니다.",
      },
      wealth: "돈 흐름도 평소와 비슷하게 흘러가는 날이에요. 새로운 투자나 큰 지출보다는, 이미 하던 방식을 그대로 유지하는 쪽이 안전합니다.",
      love: "연애운도 튀는 일 없이 잔잔한 하루예요. 오래된 인연과는 편안하게 흘러가지만, 새로운 사람에게 강하게 끌릴 일은 적은 편입니다.",
      health: "몸 상태도 평소 컨디션 그대로예요. 특별히 좋아지거나 나빠지기보다는, 지금 습관을 유지하는 게 가장 중요한 날입니다.",
    },
    selfNurturesOther: {
      overview: {
        headline: "내가 하루를 이끄는 날",
        body: "내 기운이 오늘의 흐름을 밀어주는 방향이라, 먼저 움직이고 먼저 나서는 게 잘 통하는 날입니다. 다만 계속 내어주기만 하면 저녁쯤 방전될 수 있으니 중간에 숨 고르기를 챙기세요.",
      },
      wealth: "내가 먼저 움직이는 만큼 돈이 따라오는 날이에요. 제안하거나 먼저 나서는 지출·투자는 좋은 결과로 이어지기 쉽지만, 너무 베풀기만 하면 지갑이 허전해질 수 있어요.",
      love: "내가 먼저 다가가고 챙기는 쪽이 잘 통하는 날입니다. 상대를 이끄는 데는 좋지만, 일방적으로 맞춰주기만 하면 지칠 수 있으니 적당히 받는 것도 챙기세요.",
      health: "에너지를 밖으로 많이 쓰는 날이라 활동적으로 움직이기엔 좋지만, 계속 내어주기만 하면 저녁쯤 체력이 뚝 떨어질 수 있어요. 중간에 쉬어가는 걸 잊지 마세요.",
    },
    otherNurturesSelf: {
      overview: {
        headline: "하루가 나를 채워주는 날",
        body: "오늘의 기운이 나를 밀어주는 방향이라 별다른 애를 쓰지 않아도 순조롭게 풀리는 편입니다. 뜻밖의 도움이나 좋은 타이밍이 찾아오면 부담 없이 받아들이세요.",
      },
      wealth: "별다른 노력 없이도 돈이 들어오거나 좋은 제안이 생기기 쉬운 날이에요. 뜻밖의 수입이나 도움이 온다면 부담 없이 받아들이세요.",
      love: "상대가 먼저 다가오거나 챙겨주는 날입니다. 애써 노력하지 않아도 관계가 순조롭게 풀리니, 오늘은 편하게 받는 쪽에 서보세요.",
      health: "주변의 도움이나 좋은 컨디션 덕분에 몸이 한결 가볍게 느껴질 수 있는 날이에요. 무리하지만 않으면 회복이 빠른 편입니다.",
    },
    selfChallengesOther: {
      overview: {
        headline: "내가 하루를 밀어붙이는 날",
        body: "오늘의 흐름을 내 뜻대로 끌고 가려는 힘이 센 날입니다. 원하는 걸 밀어붙이기엔 좋지만, 너무 몰아붙이면 주변과 부딪힐 수 있으니 강도를 조절하세요.",
      },
      wealth: "적극적으로 밀어붙이면 재물운도 따라오는 날이지만, 너무 무리한 투자나 지출은 나중에 부담이 될 수 있어요. 원하는 걸 밀어붙이되 강도는 조절하세요.",
      love: "내가 리드하는 만큼 관계가 진전되는 날이지만, 너무 몰아붙이면 상대가 부담스러워할 수 있어요. 페이스를 상대에게도 맞춰주세요.",
      health: "의욕이 넘쳐서 무리하게 움직이기 쉬운 날이에요. 운동이나 활동은 좋지만 평소보다 강도를 살짝 낮추는 게 안전합니다.",
    },
    otherChallengesSelf: {
      overview: {
        headline: "하루가 나를 시험하는 날",
        body: "오늘의 기운이 나를 자꾸 막아서는 듯 느껴질 수 있는 날입니다. 일이 뜻대로 안 풀려도 나쁜 신호가 아니라 속도를 늦추라는 신호로 받아들이면 한결 수월하게 넘어갈 수 있습니다.",
      },
      wealth: "예상치 못한 지출이나 재정적인 걸림돌이 생기기 쉬운 날이에요. 큰 결정이나 투자는 오늘보다 다음으로 미루는 게 안전합니다.",
      love: "관계에서 오해나 작은 마찰이 생기기 쉬운 날이에요. 감정적으로 대응하기보다 한 박자 쉬고 대화하면 오히려 더 가까워질 수 있습니다.",
      health: "컨디션이 평소보다 떨어지거나 작은 탈이 나기 쉬운 날이에요. 무리하지 말고 평소보다 여유 있게 움직이세요.",
    },
  },
  weeklyBestDayIntro: "이번 주 가장 잘 맞는 기운의 날",
  weeklyCautionDayIntro: "이번 주 페이스 조절이 필요한 날",
};

const en: DailyFortuneContent = {
  relations: {
    mirror: {
      overview: {
        headline: "A day cut from your own cloth",
        body: "Today's energy matches your own, so moving as your usual self is exactly right. New ventures might feel less exciting than usual — it's a fine day to stick with familiar ground instead.",
      },
      wealth: "Money moves in its usual rhythm today — nothing dramatic either way. Stick with what you're already doing rather than chasing a new investment or big purchase.",
      love: "Romance stays calm and steady, without much drama. Old connections feel easy, though a strong pull toward someone new is less likely today.",
      health: "Your body holds its usual baseline — no big swing up or down. The main thing today is keeping your current habits rather than changing anything.",
    },
    selfNurturesOther: {
      overview: {
        headline: "You're the one driving today",
        body: "Your energy is the one pushing today's flow forward, so taking initiative and going first tends to land well. Just pace yourself — giving nonstop can leave you running on empty by evening.",
      },
      wealth: "Money tends to follow when you take the lead today. Proposing something or spending first tends to pay off — just watch that constant giving doesn't leave your wallet running light.",
      love: "Reaching out first and taking care of things lands well today. It's a good day to lead — just make sure you're also letting yourself receive, or it can wear you out.",
      health: "You're spending a lot of energy outward, which is great for staying active — just don't forget to rest partway through, or you'll be running on empty by evening.",
    },
    otherNurturesSelf: {
      overview: {
        headline: "Today is the one carrying you",
        body: "Today's energy is pushing in your favor, so things tend to fall into place without much extra effort. If unexpected help or good timing shows up, let yourself take it.",
      },
      wealth: "Money or good offers tend to come your way today without much effort on your part. If unexpected income or help shows up, feel free to accept it.",
      love: "Someone else is likely to reach out or take care of things first today. Things flow smoothly without much effort from you — let yourself be on the receiving end today.",
      health: "Support from those around you, or just good timing, can leave you feeling noticeably lighter today. As long as you don't push too hard, recovery comes quickly.",
    },
    selfChallengesOther: {
      overview: {
        headline: "You're the one pushing today",
        body: "You have real pull to steer today's direction your way. Good for pressing toward what you want — just watch the intensity so it doesn't tip into friction with people around you.",
      },
      wealth: "Pushing forward tends to bring money your way today — just watch that an overly aggressive investment or purchase doesn't become a burden later. Go for what you want, but dial back the intensity.",
      love: "Taking the lead moves things forward today, but pushing too hard can feel like too much for the other person. Match your pace to theirs too.",
      health: "You're likely to feel extra driven and push yourself harder than usual. Exercise and activity are good today — just ease off the intensity a notch from what you'd normally do.",
    },
    otherChallengesSelf: {
      overview: {
        headline: "Today is testing you",
        body: "Today's energy might feel like it keeps getting in your way. If things don't go as planned, take it less as a bad sign and more as a cue to slow down — that usually makes the day easier.",
      },
      wealth: "Unexpected expenses or financial snags are more likely today. It's safer to put off any big decision or investment until another day.",
      love: "Misunderstandings or small friction are more likely in your relationships today. Pausing before reacting, instead of responding emotionally, can actually bring you closer.",
      health: "You may feel a bit below your usual baseline, or pick up a minor ailment. Don't push yourself — move at an easier pace than usual today.",
    },
  },
  weeklyBestDayIntro: "Your best-matched day this week",
  weeklyCautionDayIntro: "A day to pace yourself this week",
};

const es: DailyFortuneContent = {
  relations: {
    mirror: {
      overview: {
        headline: "Un día cortado por tu misma tela",
        body: "La energía de hoy coincide con la tuya, así que moverte como siempre es justo lo correcto. Los planes nuevos pueden sentirse menos emocionantes hoy — es un buen día para quedarte en terreno conocido.",
      },
      wealth: "El dinero se mueve en su ritmo habitual hoy — nada dramático en ningún sentido. Mejor seguir con lo que ya vienes haciendo que lanzarte a una nueva inversión o compra grande.",
      love: "El amor se mantiene tranquilo y estable, sin mucho drama. Los vínculos antiguos se sienten cómodos, aunque hoy es menos probable sentir una atracción fuerte por alguien nuevo.",
      health: "Tu cuerpo mantiene su nivel habitual — sin grandes subidas ni bajadas. Lo importante hoy es mantener tus hábitos actuales en lugar de cambiar algo.",
    },
    selfNurturesOther: {
      overview: {
        headline: "Hoy eres tú quien impulsa el día",
        body: "Tu energía es la que empuja el día hacia adelante, así que tomar la iniciativa suele funcionar bien. Cuida el ritmo — dar sin parar puede dejarte sin energía para la noche.",
      },
      wealth: "El dinero tiende a seguirte cuando tomas la iniciativa hoy. Proponer algo o gastar primero suele salir bien — solo cuida que dar sin parar no te deje la billetera vacía.",
      love: "Acercarte primero y cuidar de la relación funciona bien hoy. Es un buen día para liderar — solo asegúrate de dejarte recibir también, o puede agotarte.",
      health: "Estás gastando mucha energía hacia afuera, lo cual es genial para mantenerte activo — solo no olvides descansar a mitad de camino, o llegarás a la noche sin energía.",
    },
    otherNurturesSelf: {
      overview: {
        headline: "Hoy es el día el que te impulsa a ti",
        body: "La energía de hoy empuja a tu favor, así que las cosas tienden a acomodarse sin mucho esfuerzo extra. Si aparece ayuda inesperada o buen momento, acéptalo sin culpa.",
      },
      wealth: "El dinero o las buenas oportunidades tienden a llegar hoy sin mucho esfuerzo de tu parte. Si aparece un ingreso inesperado o ayuda, siéntete libre de aceptarlo.",
      love: "Es probable que hoy sea la otra persona quien se acerque o cuide de las cosas primero. Todo fluye sin mucho esfuerzo de tu lado — déjate recibir hoy.",
      health: "El apoyo de quienes te rodean, o simplemente el buen momento, puede hacerte sentir notablemente más ligero hoy. Mientras no te exijas demasiado, la recuperación llega rápido.",
    },
    selfChallengesOther: {
      overview: {
        headline: "Hoy eres tú quien empuja",
        body: "Tienes fuerza real para llevar el día en tu dirección. Bueno para insistir en lo que quieres — solo cuida la intensidad para que no termine en fricción con quienes te rodean.",
      },
      wealth: "Empujar hacia adelante tiende a traerte dinero hoy — solo cuida que una inversión o compra demasiado agresiva no se vuelva una carga después. Ve por lo que quieres, pero baja la intensidad.",
      love: "Tomar la iniciativa hace avanzar las cosas hoy, pero presionar demasiado puede sentirse pesado para la otra persona. Ajusta tu ritmo al suyo también.",
      health: "Es probable que te sientas con más impulso de lo normal y te exijas más de la cuenta. El ejercicio y la actividad son buenos hoy — solo baja un poco la intensidad de lo habitual.",
    },
    otherChallengesSelf: {
      overview: {
        headline: "Hoy el día te pone a prueba",
        body: "La energía de hoy puede sentirse como si te frenara todo el tiempo. Si algo no sale como esperabas, tómalo menos como mala señal y más como aviso de bajar el ritmo — así el día se hace más llevadero.",
      },
      wealth: "Es más probable que hoy aparezcan gastos inesperados o tropiezos financieros. Es más seguro posponer cualquier decisión o inversión importante para otro día.",
      love: "Los malentendidos o pequeñas fricciones son más probables hoy en tus relaciones. Pausar antes de reaccionar, en lugar de responder desde la emoción, puede acercarlos más.",
      health: "Puede que te sientas un poco por debajo de tu nivel habitual, o que aparezca una molestia menor. No te exijas — muévete hoy a un ritmo más tranquilo de lo normal.",
    },
  },
  weeklyBestDayIntro: "Tu día con mejor energía esta semana",
  weeklyCautionDayIntro: "Un día para bajar el ritmo esta semana",
};

export const DAILY_FORTUNE_CONTENT: Record<Locale, DailyFortuneContent> = { ko, en, es };

// 오늘의 행운 포인트 — 오늘의 일간 오행이 상징하는 전통 색·방향(오행 배속),
// 숫자는 하도수(1·6=水, 2·7=火, 3·8=木, 4·9=金, 5·10=土)를 그대로 쓴다.
// relation과 무관하게 그날의 오행 하나로만 정해지는 값이라 콘텐츠 볼륨이
// 작다 — 로또 번호 추천 같은 건 의도적으로 넣지 않았다(파일 헤더 참고).
export const LUCKY_NUMBERS: Record<string, string> = {
  wood: "3, 8",
  fire: "2, 7",
  earth: "5, 10",
  metal: "4, 9",
  water: "1, 6",
};

export const LUCKY_POINTS: Record<Locale, Record<string, { color: string; direction: string }>> = {
  ko: {
    wood: { color: "초록", direction: "동쪽" },
    fire: { color: "빨강", direction: "남쪽" },
    earth: { color: "노랑", direction: "중앙" },
    metal: { color: "흰색", direction: "서쪽" },
    water: { color: "검정", direction: "북쪽" },
  },
  en: {
    wood: { color: "Green", direction: "East" },
    fire: { color: "Red", direction: "South" },
    earth: { color: "Yellow", direction: "Center" },
    metal: { color: "White", direction: "West" },
    water: { color: "Black", direction: "North" },
  },
  es: {
    wood: { color: "Verde", direction: "Este" },
    fire: { color: "Rojo", direction: "Sur" },
    earth: { color: "Amarillo", direction: "Centro" },
    metal: { color: "Blanco", direction: "Oeste" },
    water: { color: "Negro", direction: "Norte" },
  },
};
