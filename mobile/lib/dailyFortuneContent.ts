/**
 * mobile/lib/dailyFortuneContent.ts
 * ------------------------------------------------------------------
 * "오늘의 운세" / "이번주 운세" 서사 카피. relation 분류·점수는
 * lib/compatibility.ts(궁합 엔진)를 그대로 재사용하지만("오늘의 기운과 나"는
 * 수학적으로 "두 사람의 일간 관계"와 같은 문제), 문구는 별도 파일로 둔다 —
 * compatibilityContent.ts의 "두 사람" 서사를 그대로 붙이면 "당신과 오늘은
 * 소울메이트" 식으로 어색해지기 때문. relation의 의미는 여기서 self=나,
 * other=오늘의 일간으로 고정.
 * ------------------------------------------------------------------
 */

import type { CompatRelation } from "./compatibility";
import type { Locale } from "./i18n/types";

export interface DailyFortuneContent {
  relations: Record<CompatRelation, { headline: string; body: string }>;
  weeklyBestDayIntro: string;
  weeklyCautionDayIntro: string;
}

const ko: DailyFortuneContent = {
  relations: {
    mirror: {
      headline: "나와 닮은 하루",
      body: "오늘의 기운이 내 타고난 결과 같아서, 평소의 나로 편안하게 움직이면 되는 날입니다. 다만 새로운 자극보다는 익숙한 흐름에 머무르기 쉬우니 색다른 시도는 살짝 미뤄도 좋습니다.",
    },
    selfNurturesOther: {
      headline: "내가 하루를 이끄는 날",
      body: "내 기운이 오늘의 흐름을 밀어주는 방향이라, 먼저 움직이고 먼저 나서는 게 잘 통하는 날입니다. 다만 계속 내어주기만 하면 저녁쯤 방전될 수 있으니 중간에 숨 고르기를 챙기세요.",
    },
    otherNurturesSelf: {
      headline: "하루가 나를 채워주는 날",
      body: "오늘의 기운이 나를 밀어주는 방향이라 별다른 애를 쓰지 않아도 순조롭게 풀리는 편입니다. 뜻밖의 도움이나 좋은 타이밍이 찾아오면 부담 없이 받아들이세요.",
    },
    selfChallengesOther: {
      headline: "내가 하루를 밀어붙이는 날",
      body: "오늘의 흐름을 내 뜻대로 끌고 가려는 힘이 센 날입니다. 원하는 걸 밀어붙이기엔 좋지만, 너무 몰아붙이면 주변과 부딪힐 수 있으니 강도를 조절하세요.",
    },
    otherChallengesSelf: {
      headline: "하루가 나를 시험하는 날",
      body: "오늘의 기운이 나를 자꾸 막아서는 듯 느껴질 수 있는 날입니다. 일이 뜻대로 안 풀려도 나쁜 신호가 아니라 속도를 늦추라는 신호로 받아들이면 한결 수월하게 넘어갈 수 있습니다.",
    },
  },
  weeklyBestDayIntro: "이번 주 가장 잘 맞는 기운의 날",
  weeklyCautionDayIntro: "이번 주 페이스 조절이 필요한 날",
};

const en: DailyFortuneContent = {
  relations: {
    mirror: {
      headline: "A day cut from your own cloth",
      body: "Today's energy matches your own, so moving as your usual self is exactly right. New ventures might feel less exciting than usual — it's a fine day to stick with familiar ground instead.",
    },
    selfNurturesOther: {
      headline: "You're the one driving today",
      body: "Your energy is the one pushing today's flow forward, so taking initiative and going first tends to land well. Just pace yourself — giving nonstop can leave you running on empty by evening.",
    },
    otherNurturesSelf: {
      headline: "Today is the one carrying you",
      body: "Today's energy is pushing in your favor, so things tend to fall into place without much extra effort. If unexpected help or good timing shows up, let yourself take it.",
    },
    selfChallengesOther: {
      headline: "You're the one pushing today",
      body: "You have real pull to steer today's direction your way. Good for pressing toward what you want — just watch the intensity so it doesn't tip into friction with people around you.",
    },
    otherChallengesSelf: {
      headline: "Today is testing you",
      body: "Today's energy might feel like it keeps getting in your way. If things don't go as planned, take it less as a bad sign and more as a cue to slow down — that usually makes the day easier.",
    },
  },
  weeklyBestDayIntro: "Your best-matched day this week",
  weeklyCautionDayIntro: "A day to pace yourself this week",
};

const es: DailyFortuneContent = {
  relations: {
    mirror: {
      headline: "Un día cortado por tu misma tela",
      body: "La energía de hoy coincide con la tuya, así que moverte como siempre es justo lo correcto. Los planes nuevos pueden sentirse menos emocionantes hoy — es un buen día para quedarte en terreno conocido.",
    },
    selfNurturesOther: {
      headline: "Hoy eres tú quien impulsa el día",
      body: "Tu energía es la que empuja el día hacia adelante, así que tomar la iniciativa suele funcionar bien. Cuida el ritmo — dar sin parar puede dejarte sin energía para la noche.",
    },
    otherNurturesSelf: {
      headline: "Hoy es el día el que te impulsa a ti",
      body: "La energía de hoy empuja a tu favor, así que las cosas tienden a acomodarse sin mucho esfuerzo extra. Si aparece ayuda inesperada o buen momento, acéptalo sin culpa.",
    },
    selfChallengesOther: {
      headline: "Hoy eres tú quien empuja",
      body: "Tienes fuerza real para llevar el día en tu dirección. Bueno para insistir en lo que quieres — solo cuida la intensidad para que no termine en fricción con quienes te rodean.",
    },
    otherChallengesSelf: {
      headline: "Hoy el día te pone a prueba",
      body: "La energía de hoy puede sentirse como si te frenara todo el tiempo. Si algo no sale como esperabas, tómalo menos como mala señal y más como aviso de bajar el ritmo — así el día se hace más llevadero.",
    },
  },
  weeklyBestDayIntro: "Tu día con mejor energía esta semana",
  weeklyCautionDayIntro: "Un día para bajar el ritmo esta semana",
};

export const DAILY_FORTUNE_CONTENT: Record<Locale, DailyFortuneContent> = { ko, en, es };
