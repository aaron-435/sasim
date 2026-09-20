/**
 * lib/compatibilityContent.ts
 * ------------------------------------------------------------------
 * lib/compatibility.ts가 판정한 관계(CompatRelation)의 표시 문구(KO/EN/ES).
 * lib/sajuTypeContent.ts와 같은 이유로 i18n 사전이 아닌 별도 파일 —
 * "콘텐츠"는 각자 모듈에 둔다는 이 저장소의 관례.
 *
 * relation 문구는 "self" 시점 고정이다(예: selfNurturesOther는 항상
 * "나"가 상대를 챙기는 쪽) — 화면에서 이름만 끼워 넣으면 되게.
 * ------------------------------------------------------------------
 */

import type { CompatRelation } from "./compatibility";
import type { Locale } from "./i18n/types";

export interface CompatibilityContent {
  relations: Record<CompatRelation, { headline: string; body: string }>;
  bondNote: string;
}

const ko: CompatibilityContent = {
  relations: {
    mirror: {
      headline: "같은 결의 두 사람",
      body: "타고난 기운이 같아서 서로 설명하지 않아도 통하는 게 많습니다. 편안한 대신, 같은 지점에서 똑같이 막히기 쉬워서 둘 다 못 보는 사각지대가 겹칠 수 있습니다.",
    },
    selfNurturesOther: {
      headline: "내가 채워주는 쪽",
      body: "내 기운이 상대를 밀어주는 방향입니다. 상대가 자라는 걸 보는 게 기쁘지만, 계속 내주기만 하면 정작 내 쪽이 비어가는 걸 놓치기 쉬우니 가끔은 받는 연습도 필요합니다.",
    },
    otherNurturesSelf: {
      headline: "내가 받는 쪽",
      body: "상대의 기운이 나를 밀어주는 방향입니다. 곁에 있으면 자연스럽게 힘이 나는 관계지만, 기대는 게 익숙해지면 스스로 채우는 법을 잊기 쉽습니다.",
    },
    selfChallengesOther: {
      headline: "내가 자극하는 쪽",
      body: "내가 상대를 눌러서라도 방향을 잡아주는 관계입니다. 서로를 성장시키는 힘이 크지만, 그 자극이 잔소리처럼 느껴지는 순간을 조심해야 합니다.",
    },
    otherChallengesSelf: {
      headline: "내가 자극받는 쪽",
      body: "상대가 나를 눌러서라도 정신 차리게 하는 관계입니다. 편하지만은 않아도 그만큼 나를 움직이게 하는 사람이라서, 그 압박이 애정에서 온다는 걸 서로 확인하는 게 중요합니다.",
    },
  },
  bondNote: "게다가 두 일간이 특별한 합을 이루고 있어요 — 이 조합엔 이유 없이 끌리는 힘이 하나 더 붙습니다.",
};

const en: CompatibilityContent = {
  relations: {
    mirror: {
      headline: "Cut from the same cloth",
      body: "You run on the same current, so a lot goes unsaid and still lands. It's easy — the cost is that you tend to stall at the exact same point, so the same blind spot can hide from both of you at once.",
    },
    selfNurturesOther: {
      headline: "You're the one who fuels them",
      body: "Your energy pushes theirs forward. Watching them grow feels good, but if you only ever give, you can miss that your own side is running empty — it's worth practicing taking, too.",
    },
    otherNurturesSelf: {
      headline: "You're the one being fueled",
      body: "Their energy pushes yours forward. Being near them naturally lifts you — the risk is that leaning on that can become a habit, and you forget how to refill on your own.",
    },
    selfChallengesOther: {
      headline: "You're the one who pushes",
      body: "You give them direction even if it means some friction. That friction grows both of you — just watch for the moment it starts landing as nagging instead of care.",
    },
    otherChallengesSelf: {
      headline: "You're the one being pushed",
      body: "They keep you sharp, even when it's not comfortable. That's exactly why they move you — it helps to check, out loud sometimes, that the pressure is coming from care.",
    },
  },
  bondNote: "On top of that, your two day-masters form a classic bond pair — this combination carries an extra pull that isn't easy to explain.",
};

const es: CompatibilityContent = {
  relations: {
    mirror: {
      headline: "De la misma madera",
      body: "Entre los dos hay una misma corriente, así que mucho se entiende sin decirlo. Es cómodo; el riesgo es que ambos se atasquen justo en el mismo punto, y que el mismo punto ciego se les escape a la vez.",
    },
    selfNurturesOther: {
      headline: "Eres quien impulsa",
      body: "Tu energía empuja hacia adelante la de la otra persona. Ver cómo crece se siente bien, pero si solo das, puede que no notes que tu propio lado se está vaciando: conviene practicar también el recibir.",
    },
    otherNurturesSelf: {
      headline: "Eres quien recibe el impulso",
      body: "La energía de la otra persona empuja la tuya hacia adelante. Estar a su lado te da fuerzas de forma natural; el riesgo es que apoyarte así se vuelva costumbre y olvides cómo recargarte por tu cuenta.",
    },
    selfChallengesOther: {
      headline: "Eres quien desafía",
      body: "Marcas el rumbo aunque eso genere fricción. Esa fricción los hace crecer a los dos; solo cuida el momento en que empiece a sentirse como un sermón en vez de cuidado.",
    },
    otherChallengesSelf: {
      headline: "Eres quien recibe el desafío",
      body: "La otra persona te mantiene alerta, incluso cuando resulta incómodo. Por eso mismo te mueve: ayuda confirmar, a veces en voz alta, que esa presión viene del cariño.",
    },
  },
  bondNote: "Además, los dos Maestros del Día forman un vínculo clásico: esta combinación trae una atracción extra que no es fácil de explicar.",
};

export const COMPATIBILITY_CONTENT: Record<Locale, CompatibilityContent> = { ko, en, es };
