// A short "오늘의 한마디" tied to the user's dominant 오행 — deterministic and free
// (no GPT call): picks from a small pre-written bank per element, rotating by day of
// year so it changes daily without needing any network round trip or per-user storage.
const INSIGHTS_BY_ELEMENT: Record<string, string[]> = {
  wood: [
    "오늘은 새로운 걸 시작하기에 유독 좋은 흐름이에요. 작은 계획이라도 오늘 심어두면 잘 자랄 거예요. 주변 사람과의 협력도 좋은 결과로 이어지는 날이에요.",
    "성장하려는 마음이 자연스럽게 힘을 받는 하루예요. 유연하게 생각할수록 길이 더 잘 보이니, 조급해하지 말고 방향을 살펴보세요.",
    "미뤄뒀던 일을 시작하기 좋은 타이밍이에요. 완벽한 계획보다 첫걸음이 먼저라는 걸 오늘은 몸으로 느끼게 될 거예요.",
  ],
  fire: [
    "표현하고 싶은 마음을 오늘은 숨기지 않아도 돼요. 먼저 다가가는 쪽이 더 유리한 하루고, 에너지가 넘치는 만큼 잠깐의 휴식도 챙겨주세요.",
    "열정이 자연스럽게 드러나는 하루예요. 오늘 느낀 설렘은 그냥 지나치지 말고 기록해두면 나중에 큰 힌트가 될 거예요.",
    "적극적으로 움직일수록 좋은 반응이 따라오는 날이에요. 다만 감정이 앞서기 쉬우니 한 박자 쉬고 말을 고르는 것도 도움이 돼요.",
  ],
  earth: [
    "무리하지 않고 다지는 게 오늘의 답이에요. 믿을 수 있는 사람에게 마음을 여는 게 도움이 되고, 작은 약속을 지키는 것만으로도 신뢰가 쌓여요.",
    "차근차근 정리하면 마음이 한결 가벼워질 거예요. 오늘은 안정감을 주는 쪽에 서보세요, 그게 결국 당신을 지켜주는 힘이 돼요.",
    "급하게 결정하기보다 하루 정도 묵혀두는 게 나은 날이에요. 오늘의 인내는 나중에 훨씬 단단한 결과로 돌아올 거예요.",
  ],
  metal: [
    "결단이 필요한 순간엔 원칙대로 밀고 나가세요. 명확하게 선을 긋는 게 오늘은 오히려 편안함을 주고, 판단력도 평소보다 날카로워요.",
    "미뤄뒀던 정리를 하기에 좋은 흐름이에요. 완벽하지 않아도 괜찮다는 걸 스스로에게 말해주면서, 오늘은 가볍게 마무리해보세요.",
    "원칙과 융통성 사이에서 균형을 잡기 좋은 날이에요. 한 번 정한 기준은 지키되, 상대의 입장도 한 번쯤 들어봐 주세요.",
  ],
  water: [
    "생각이 깊어지는 만큼, 조급해하지 않아도 돼요. 혼자만의 시간이 오늘은 특히 필요할 수 있으니, 그 시간을 억지로 채우려 하지 마세요.",
    "직감이 꽤 정확하게 맞아떨어지는 하루예요. 흐름에 몸을 맡기는 것도 하나의 전략이니, 오늘 느낀 감정을 굳이 설명하려 하지 않아도 괜찮아요.",
    "겉으로 드러내지 않아도 마음속에서는 많은 정리가 이루어지는 날이에요. 오늘 내린 결론은 조용히 믿어봐도 좋아요.",
  ],
};

const DEFAULT_INSIGHTS = [
  "오늘 하루도 당신의 오행 균형을 살펴보는 시간을 가져보세요. 사주는 정해진 운명이 아니라 흐름을 읽는 지도예요.",
];

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDailyInsight(dominantElement: string | null | undefined, date: Date = new Date()): string {
  const bank = (dominantElement && INSIGHTS_BY_ELEMENT[dominantElement]) || DEFAULT_INSIGHTS;
  const index = dayOfYear(date) % bank.length;
  return bank[index];
}
