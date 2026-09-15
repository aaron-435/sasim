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
 * 2026-09-15: 구독자 피드백 두 가지를 반영.
 *  1) 총론(overview) 하나뿐이던 "오늘" 탭을 재물운/애정운/건강운까지 확장.
 *     참고로 보내준 타 앱 리포트 구성을 참고했지만, 로또 번호 추천은
 *     의도적으로 뺐다(도박성 콘텐츠로 스토어 심사에 걸릴 수 있는 영역).
 *  2) relation이 5종류뿐이라 총론 문구를 하나씩만 두면 "이번주 운세" 목록에서
 *     반드시 겹치는 문구가 보였다(10일 주기 오행 배열상 relation은 연속
 *     이틀만 다르고 그 뒤로는 반복). 그래서 relation마다 overviewVariants를
 *     4개씩 두고, lib/dailyFortune.ts가 내려주는 pillarIndex(60갑자 순번)로
 *     골라 쓴다. 같은 relation의 두 요일은 60갑자 순서상 항상 "연속된 이틀"이라
 *     pillarIndex가 1만큼만 차이 나므로, variants가 2개만 있어도 일주일 안
 *     중복은 원천적으로 안 생긴다 — 4개를 둔 건 그 위에 체감 다양성을 더하고
 *     한 달 단위로도 반복이 최대한 늦게 돌아오게 하기 위해서다(완전한 무반복
 *     보장은 relation당 6개가 필요하지만, 문구 볼륨 대비 실익이 낮아 4개로
 *     타협).
 * ------------------------------------------------------------------
 */

import type { CompatRelation } from "./compatibility";
import type { Locale } from "./i18n/types";

export interface DailyFortuneContent {
  relations: Record<
    CompatRelation,
    {
      overviewVariants: { headline: string; body: string }[];
      wealth: string;
      love: string;
      health: string;
    }
  >;
  weeklyBestDayIntro: string;
  weeklyCautionDayIntro: string;
}

/** pillarIndex(0-59)로 그 relation의 여러 총론 문구 중 하나를 결정적으로 고른다 —
 *  같은 날짜는 항상 같은 문구, 다른 날짜는 (variants 개수가 허용하는 한) 다른
 *  문구가 나오게. */
export function getOverview(content: DailyFortuneContent, relation: CompatRelation, pillarIndex: number): { headline: string; body: string } {
  const variants = content.relations[relation].overviewVariants;
  return variants[((pillarIndex % variants.length) + variants.length) % variants.length];
}

const ko: DailyFortuneContent = {
  relations: {
    mirror: {
      overviewVariants: [
        {
          headline: "거울 같은 하루",
          body: "오늘의 기운이 내 타고난 결과 정확히 겹치는 날이에요. 애써 꾸미거나 무리해서 다른 사람인 척하지 않아도, 평소의 나 그대로 움직이는 게 가장 잘 맞는 하루입니다. 익숙한 방식으로 일을 처리하면 생각보다 매끄럽게 풀리고, 낯선 방법을 새로 시도하기보다는 이미 검증된 루틴을 믿고 가는 편이 낫습니다. 다만 나와 똑같은 기운이라 보니 내가 못 보는 사각지대도 그대로 반복될 수 있어요. 평소에 자주 놓치던 부분이 있다면 오늘 유독 눈에 띄게 다시 걸릴 수 있으니, 그 부분만큼은 한 번 더 확인하고 넘어가세요. 사람 관계에서도 비슷한 성향의 사람과는 말이 잘 통하지만, 다른 의견을 가진 사람과는 서로 자기 말만 하다 끝날 수 있습니다. 큰 변화를 만들기보다는, 이미 갖고 있는 걸 다지고 정리하는 데 하루를 쓰는 게 더 남는 장사예요. 전체적으로 무난하고 편안한 하루지만, '편안함'을 '멈춤'으로 착각하지 않는 게 오늘의 숙제입니다.",
        },
        {
          headline: "익숙한 옷을 입은 날",
          body: "몸에 맞는 옷을 입은 것처럼, 오늘은 나답게 움직이는 것 자체가 정답인 날이에요. 새 옷(새로운 방식)을 억지로 껴입기보다는, 손에 익은 방법과 도구로 하루를 채워보세요. 결과물의 완성도가 오히려 평소보다 안정적으로 나올 가능성이 높습니다. 다만 편한 옷만 입다 보면 가끔은 옷장 정리를 미루게 되듯, 오늘도 묵혀둔 일들을 손보기보다는 계속 미루고 싶은 유혹이 클 수 있어요. 작은 숙제 하나 정도는 오늘 끝내겠다고 스스로 정해두면 나중에 훨씬 편해집니다. 대화에서도 억지로 꾸민 말보다는 평소 말투 그대로가 더 진심으로 전달되는 하루예요. 굳이 특별한 이벤트를 만들지 않아도, 사람들은 오늘의 나를 편안하게 느낄 가능성이 큽니다. 무리한 계획보다는 하루를 있는 그대로 흘러가게 두는 게 결국 더 남는 하루가 될 거예요.",
        },
        {
          headline: "같은 파도를 타는 하루",
          body: "오늘의 기운은 내가 원래 타고 있던 파도와 같은 방향, 같은 리듬으로 흘러갑니다. 억지로 방향을 틀거나 속도를 바꾸려 하지 않아도, 지금 흐름에 몸을 맡기는 것만으로 충분히 앞으로 나아갈 수 있는 날이에요. 일에서든 관계에서든 원래 하던 패턴을 유지하는 쪽이 유리하고, 갑자기 다른 방식을 시도하면 오히려 균형을 잃기 쉽습니다. 같은 파도라는 건 동시에, 같은 곳에서 넘어질 위험도 있다는 뜻이에요. 예전에 한 번 걸렸던 실수나 습관이 있다면 오늘 다시 그 자리에서 흔들릴 수 있으니 미리 마음의 준비를 해두는 게 좋습니다. 대화 상대가 나와 성향이 비슷한 사람이라면 유난히 편안하게 느껴지고, 서로 다른 얘기를 오래 나눌 필요 없이도 이해가 빠를 거예요. 반대로 나와 결이 다른 사람과는 그 차이가 평소보다 더 크게 느껴질 수 있습니다. 무리해서 새 파도를 찾기보다, 지금 타고 있는 파도를 더 능숙하게 타는 연습을 하는 하루로 삼아보세요.",
        },
        {
          headline: "늘 걷던 길 위에서",
          body: "오늘은 늘 걷던 길을 그대로 걷는 게 가장 안전하고 효율적인 날이에요. 지도를 새로 그리거나 지름길을 찾으려 애쓰기보다는, 이미 잘 아는 경로로 움직이는 편이 시간과 에너지 모두를 아껴줍니다. 익숙한 길이라 발밑을 잘 안 보고 걷게 되는 것처럼, 오늘도 늘 하던 실수를 무심코 반복할 위험이 있어요. 특히 돈이나 약속처럼 평소에도 자주 흔들리던 부분은 한 번 더 점검하고 넘어가는 게 좋습니다. 사람들과의 대화에서도 오래 알고 지낸 사이일수록 편안함이 배가되는 하루라, 굳이 어려운 이야기를 새로 꺼내지 않아도 관계가 자연스럽게 다져집니다. 새로운 사람이나 낯선 환경과의 만남은 평소보다 설렘이 덜할 수 있지만, 그게 나쁜 신호는 아니에요. 오늘 하루의 성취는 화려함보다 꾸준함에서 나올 가능성이 큽니다. 지금 걷고 있는 길이 맞다는 확신을 다시 얻는 날로 삼아보세요.",
        },
      ],
      wealth: "돈 흐름도 평소와 비슷하게 흘러가는 날이에요. 새로운 투자나 큰 지출보다는, 이미 하던 방식을 그대로 유지하는 쪽이 안전합니다.",
      love: "연애운도 튀는 일 없이 잔잔한 하루예요. 오래된 인연과는 편안하게 흘러가지만, 새로운 사람에게 강하게 끌릴 일은 적은 편입니다.",
      health: "몸 상태도 평소 컨디션 그대로예요. 특별히 좋아지거나 나빠지기보다는, 지금 습관을 유지하는 게 가장 중요한 날입니다.",
    },
    selfNurturesOther: {
      overviewVariants: [
        {
          headline: "등불을 켜는 하루",
          body: "오늘은 내 기운이 앞장서서 주변을 밝혀주는 방향으로 흐르는 날이에요. 회의에서 먼저 의견을 내거나, 망설이던 일을 먼저 시작하는 쪽이 유난히 잘 통합니다. 다른 사람이 머뭇거릴 때 내가 먼저 움직이면, 생각보다 쉽게 분위기가 풀리고 일이 진행될 거예요. 다만 등불은 계속 켜두면 기름이 닳듯, 나 혼자 계속 밝혀주기만 하면 저녁쯤엔 정작 나를 위한 기운이 남지 않을 수 있습니다. 중간에 잠깐 불을 낮추듯 쉬어가는 시간을 꼭 챙기세요. 돈이나 제안에서도 내가 먼저 손을 내미는 쪽이 유리한 하루라, 망설이던 제안이 있다면 오늘 꺼내보는 것도 좋습니다. 다만 계속 베풀기만 하다 보면 지갑도, 마음도 허전해질 수 있으니 적당한 선은 지켜주세요. 오늘 내가 밝힌 불빛은 생각보다 오래, 멀리까지 다른 사람들에게 도움이 될 거예요.",
        },
        {
          headline: "샘이 되어주는 날",
          body: "마르지 않는 샘처럼, 오늘은 내 안에서 나오는 기운이 주변을 촉촉하게 적셔주는 날입니다. 누군가에게 조언을 해주거나 도움을 주는 역할이 자연스럽게 나에게 돌아오고, 그 역할이 오히려 편안하게 느껴질 거예요. 사람들과의 관계에서도 내가 먼저 다가가고 챙기는 쪽이 훨씬 잘 통하는 하루라, 오래 미뤄둔 연락이 있다면 오늘 먼저 건네보세요. 다만 샘도 계속 퍼내기만 하면 수위가 낮아지듯, 내 감정과 체력도 한도가 있다는 걸 잊지 마세요. 누군가 나에게 기대올 때 다 받아주려 하기보다, 오늘 하루치만큼만 내어주는 것도 괜찮은 선택입니다. 일에서는 내가 먼저 제안하거나 방향을 정하는 쪽이 좋은 결과로 이어질 가능성이 큽니다. 저녁이 되기 전에 스스로를 채우는 시간을 한 번은 가져보세요.",
        },
        {
          headline: "바람을 밀어주는 하루",
          body: "오늘의 기운은 다른 사람의 돛을 밀어주는 바람과 같은 방향으로 붑니다. 내가 나서서 방향을 제시하거나 등을 떠밀어주면, 상대방이 훨씬 수월하게 앞으로 나아가는 걸 지켜보게 될 거예요. 리더 역할이나 먼저 제안하는 자리가 오늘따라 유난히 잘 맞고, 뒤에서 지켜만 보기보다 앞에 나서는 쪽이 만족감도 큽니다. 다만 바람도 계속 세게 불면 상대가 버거워할 수 있듯, 내가 미는 속도와 상대가 받아들이는 속도가 다를 수 있다는 걸 염두에 두세요. 한 번씩 바람의 세기를 낮추고 상대의 반응을 살피는 여유가 필요합니다. 재정 면에서도 내가 먼저 움직이는 투자나 지출이 좋은 흐름으로 이어질 수 있지만, 너무 세게 밀어붙이면 예상 밖의 저항을 만날 수 있어요. 오늘 하루, 내가 만든 바람이 누군가에게는 꼭 필요한 순풍이었다는 걸 기억해두세요.",
        },
        {
          headline: "다리를 놓는 날",
          body: "오늘은 내가 나서서 두 사람, 혹은 두 상황 사이를 이어주는 다리 역할을 하게 되는 날입니다. 갈등을 중재하거나, 정보를 전달하거나, 먼저 연결고리를 만들어주는 자리에 서게 될 가능성이 커요. 이런 역할이 낯설지 않고 오히려 자연스럽게 느껴지는 하루라, 평소보다 적극적으로 나서봐도 좋습니다. 다만 다리는 양쪽 무게를 다 견뎌야 하듯, 중간에서 조율하다 보면 생각보다 에너지 소모가 클 수 있어요. 모든 걸 내가 해결하려 하기보다, 연결까지만 해주고 나머지는 당사자들에게 맡기는 것도 필요합니다. 대화나 협업에서 내가 먼저 손을 내미는 쪽이 관계를 훨씬 부드럽게 만들어줄 거예요. 오늘 놓은 다리 하나가 나중에 예상치 못한 곳에서 나에게 도움으로 돌아올 수 있습니다.",
        },
      ],
      wealth: "내가 먼저 움직이는 만큼 돈이 따라오는 날이에요. 제안하거나 먼저 나서는 지출·투자는 좋은 결과로 이어지기 쉽지만, 너무 베풀기만 하면 지갑이 허전해질 수 있어요.",
      love: "내가 먼저 다가가고 챙기는 쪽이 잘 통하는 날입니다. 상대를 이끄는 데는 좋지만, 일방적으로 맞춰주기만 하면 지칠 수 있으니 적당히 받는 것도 챙기세요.",
      health: "에너지를 밖으로 많이 쓰는 날이라 활동적으로 움직이기엔 좋지만, 계속 내어주기만 하면 저녁쯤 체력이 뚝 떨어질 수 있어요. 중간에 쉬어가는 걸 잊지 마세요.",
    },
    otherNurturesSelf: {
      overviewVariants: [
        {
          headline: "순풍이 부는 하루",
          body: "오늘은 내가 애써 노를 젓지 않아도 등 뒤에서 순풍이 불어와 배를 밀어주는 것 같은 흐름이에요. 일이 예상보다 수월하게 풀리고, 도움을 청하지 않았는데도 손을 내밀어주는 사람이 나타날 수 있습니다. 평소라면 며칠 걸릴 일이 오늘은 뜻밖에 빠르게 정리될 가능성도 있어요. 다만 순풍이 분다고 방향타를 완전히 놓아버리면 배가 엉뚱한 곳으로 흘러갈 수 있으니, 흐름에 몸을 맡기되 최소한의 방향은 스스로 잡고 있어야 합니다. 뜻밖의 제안이나 좋은 소식이 온다면 부담 갖지 말고 편하게 받아들이세요. 오늘만큼은 모든 걸 혼자 해결하려는 습관을 잠시 내려놓아도 괜찮습니다. 순풍은 오래 머물지 않으니, 이 흐름을 타고 갈 수 있는 만큼 멀리 나아가 보세요.",
        },
        {
          headline: "봄비 같은 하루",
          body: "메마른 땅에 조용히 스며드는 봄비처럼, 오늘의 기운은 애쓰지 않아도 나를 촉촉하게 채워주는 방향으로 흐릅니다. 지쳐 있던 부분이 있다면 오늘 뜻밖의 위로나 회복의 계기를 만나게 될 수 있어요. 사람들과의 관계에서도 누군가 먼저 나에게 다가와 챙겨주는 하루라, 굳이 먼저 나서지 않아도 자연스럽게 좋은 흐름이 만들어집니다. 다만 봄비가 너무 오래 내리면 땅이 질척해지듯, 받는 것에만 익숙해지면 스스로 움직이는 힘을 잃을 수도 있어요. 오늘의 도움은 감사히 받되, 내일은 다시 내 발로 걸을 준비를 해두세요. 재물 면에서도 뜻밖의 수입이나 좋은 제안이 스며들듯 들어올 수 있는 날입니다. 오늘 하루는 억지로 채우려 하지 말고, 자연스럽게 스며드는 것들을 그대로 받아들여 보세요.",
        },
        {
          headline: "받쳐주는 손이 있는 날",
          body: "넘어질 뻔한 순간, 누군가의 손이 자연스럽게 나를 받쳐주는 하루예요. 혼자 해결하려고 끙끙대던 일이 있다면, 오늘은 뜻밖의 도움으로 훨씬 가볍게 풀릴 가능성이 큽니다. 이런 흐름에서는 자존심을 세우기보다 도움을 있는 그대로 받아들이는 게 훨씬 현명한 선택이에요. 다만 계속 누군가의 손에만 의지하면 정작 스스로 서는 법을 잊어버릴 수 있으니, 오늘의 도움을 발판 삼아 다음엔 내가 손을 내밀 준비도 해두세요. 사람들과의 대화에서도 내가 애써 설명하지 않아도 상대가 먼저 이해해주는 흐름이라 마음이 한결 편안할 거예요. 몸이나 컨디션 면에서도 무리하지만 않으면 회복이 유난히 빠른 하루입니다. 오늘 받은 도움을 마음에 새겨두었다가, 언젠가 다른 사람에게 그대로 돌려주면 좋겠습니다.",
        },
        {
          headline: "볕이 드는 하루",
          body: "그늘져 있던 자리에 뜻밖에 볕이 드는 것처럼, 오늘은 애쓰지 않아도 좋은 기운이 나를 향해 스며드는 날이에요. 막막했던 일에 실마리가 보이거나, 걱정하던 문제가 생각보다 쉽게 풀릴 수 있습니다. 사람들에게서도 예상치 못한 호의나 배려를 받을 가능성이 커서, 오늘은 마음의 문을 조금 더 열어둬도 좋아요. 다만 볕이 좋다고 해서 하루 종일 아무것도 안 하고 누워만 있으면 정작 볕이 지나간 뒤엔 아무것도 남지 않을 수 있습니다. 좋은 흐름이 왔을 때 그 안에서 할 수 있는 작은 행동 하나쯤은 챙겨두세요. 재정이나 일에서도 뜻밖의 좋은 소식이 들려올 가능성이 있는 하루입니다. 오늘의 볕을 온전히 누리되, 내일을 위한 씨앗도 하나쯤 심어두는 걸 잊지 마세요.",
        },
      ],
      wealth: "별다른 노력 없이도 돈이 들어오거나 좋은 제안이 생기기 쉬운 날이에요. 뜻밖의 수입이나 도움이 온다면 부담 없이 받아들이세요.",
      love: "상대가 먼저 다가오거나 챙겨주는 날입니다. 애써 노력하지 않아도 관계가 순조롭게 풀리니, 오늘은 편하게 받는 쪽에 서보세요.",
      health: "주변의 도움이나 좋은 컨디션 덕분에 몸이 한결 가볍게 느껴질 수 있는 날이에요. 무리하지만 않으면 회복이 빠른 편입니다.",
    },
    selfChallengesOther: {
      overviewVariants: [
        {
          headline: "고삐를 쥐는 하루",
          body: "오늘은 내가 상황의 고삐를 쥐고 원하는 방향으로 이끌어갈 힘이 유난히 센 날이에요. 미뤄왔던 결정을 내리거나, 눈치 보던 제안을 밀어붙이기에 좋은 타이밍입니다. 다만 고삐를 너무 세게 당기면 말이 놀라 오히려 엇나가듯, 상대를 지나치게 몰아붙이면 예상 밖의 반발을 만날 수 있어요. 원하는 방향으로 이끌되, 상대가 따라올 수 있는 속도인지 한 번씩 확인하는 여유가 필요합니다. 대화에서도 내 주장이 강하게 먹히는 하루라 설득이 잘 통하지만, 일방적으로만 밀어붙이면 관계에 앙금이 남을 수 있어요. 재정이나 일에서 적극적인 결정이 좋은 결과로 이어질 가능성이 크지만, 무리한 수준까지 밀어붙이는 건 피하는 게 안전합니다. 오늘 쥔 고삐를 지혜롭게 다룬다면, 원하는 방향으로 한 걸음 크게 나아갈 수 있을 거예요.",
        },
        {
          headline: "노를 젓는 날",
          body: "물살을 거슬러서라도 내가 원하는 방향으로 배를 밀어갈 힘이 있는 하루입니다. 남들이 주춤하는 상황에서도 내가 먼저 노를 저으면 생각보다 수월하게 앞으로 나아갈 수 있어요. 다만 계속 있는 힘껏 노를 저으면 팔이 지치듯, 오늘의 추진력을 하루 종일 최대치로 쓰면 저녁쯤 급격히 지칠 수 있습니다. 중간중간 속도를 조절하면서 힘을 아껴 쓰는 게 중요해요. 사람들과의 관계에서도 내가 방향을 정하고 이끄는 역할이 잘 맞는 하루지만, 함께 노를 젓는 사람의 속도도 가끔 확인해주세요. 일이나 재정 면에서 적극적으로 밀어붙이는 결정이 좋은 결과를 가져올 가능성이 크지만, 무리한 방향 전환은 피하는 게 좋습니다. 오늘 저은 노 한 번 한 번이 원하는 목적지에 조금씩 가까워지게 해줄 거예요.",
        },
        {
          headline: "방향타를 잡는 하루",
          body: "오늘은 상황이라는 배의 방향타를 내가 직접 쥐게 되는 날이에요. 애매하게 흘러가던 일에 명확한 방향을 제시하면, 주변 사람들도 안심하고 그 방향을 따라오는 분위기가 만들어집니다. 결정을 미루기보다 오늘 확실하게 정해버리는 게 전체적으로 더 나은 결과를 만들 가능성이 커요. 다만 방향타를 너무 급하게 꺾으면 배가 휘청이듯, 큰 변화를 줄 때는 한 번에 확 틀기보다 조금씩 조정하는 편이 안전합니다. 대화에서도 내가 주도권을 쥐는 게 자연스러운 하루지만, 상대의 의견을 완전히 무시하면 나중에 반발이 생길 수 있어요. 재정이나 계획 면에서 방향을 새로 정하기에 좋은 타이밍이니, 미뤄왔던 결정이 있다면 오늘 매듭지어 보세요. 방향타를 쥔 손에 힘을 주되, 눈은 계속 앞을 살피는 균형이 필요한 하루입니다.",
        },
        {
          headline: "활시위를 당기는 하루",
          body: "목표를 향해 활시위를 팽팽하게 당기는 것처럼, 오늘은 원하는 걸 향해 적극적으로 힘을 모으기 좋은 날이에요. 평소라면 망설였을 제안이나 도전도 오늘은 자신 있게 밀어붙일 수 있는 힘이 생깁니다. 다만 활시위를 너무 오래 당기고 있으면 손이 떨리듯, 준비만 계속하기보다 적절한 타이밍에 놓아주는 결단도 필요해요. 너무 세게, 너무 오래 힘을 주면 정작 중요한 순간에 힘이 빠질 수 있습니다. 사람들과의 관계에서도 내가 원하는 바를 분명하게 표현하는 게 잘 통하는 하루지만, 상대를 정조준하듯 몰아붙이는 말투는 피하는 게 좋아요. 재정이나 일에서 결단력 있는 선택이 좋은 결과로 이어질 가능성이 큰 날입니다. 오늘 당긴 활시위를 정확한 타이밍에 놓아준다면, 원하는 곳에 정확히 닿을 수 있을 거예요.",
        },
      ],
      wealth: "적극적으로 밀어붙이면 재물운도 따라오는 날이지만, 너무 무리한 투자나 지출은 나중에 부담이 될 수 있어요. 원하는 걸 밀어붙이되 강도는 조절하세요.",
      love: "내가 리드하는 만큼 관계가 진전되는 날이지만, 너무 몰아붙이면 상대가 부담스러워할 수 있어요. 페이스를 상대에게도 맞춰주세요.",
      health: "의욕이 넘쳐서 무리하게 움직이기 쉬운 날이에요. 운동이나 활동은 좋지만 평소보다 강도를 살짝 낮추는 게 안전합니다.",
    },
    otherChallengesSelf: {
      overviewVariants: [
        {
          headline: "역풍이 부는 하루",
          body: "오늘은 가려는 방향과 반대쪽에서 바람이 불어오는 것 같은, 유독 진도가 안 나가는 느낌을 받을 수 있는 날이에요. 일이 뜻대로 안 풀리거나 예상치 못한 걸림돌이 생기더라도, 이건 방향이 틀려서가 아니라 잠시 속도를 늦추라는 신호에 가깝습니다. 무리해서 역풍을 거슬러 전진하려 하면 오히려 체력만 크게 소모될 수 있어요. 오늘은 큰 결정을 새로 내리기보다, 이미 정한 방향을 유지하면서 버티는 데 집중하는 게 낫습니다. 사람들과의 관계에서도 사소한 오해나 마찰이 생기기 쉬운 하루라, 감정적으로 바로 반응하기보다 한 박자 쉬고 대응하는 게 훨씬 안전해요. 재정 면에서는 예상치 못한 지출이 생길 수 있으니 큰 지출이나 투자는 다음으로 미루는 게 좋습니다. 역풍은 영원히 불지 않으니, 오늘 하루만 잘 버티면 내일은 분명 바람의 방향이 달라질 거예요.",
        },
        {
          headline: "자갈길을 걷는 날",
          body: "평소보다 발밑이 울퉁불퉁하게 느껴지는, 걸음걸음이 조심스러워지는 하루예요. 사소한 일에서 자꾸 걸리는 느낌이 들거나, 순조롭게 될 줄 알았던 일이 예상보다 더디게 흘러갈 수 있습니다. 다만 자갈길이라고 해서 길을 잘못 든 건 아니에요 — 단지 오늘은 평소보다 천천히, 신경 써서 걸어야 하는 구간일 뿐입니다. 급하게 걸으면 발을 헛디딜 수 있으니, 오늘만큼은 속도를 늦추고 한 걸음 한 걸음 확인하며 나아가세요. 관계에서도 작은 말 한마디가 평소보다 크게 오해를 살 수 있는 날이라, 하고 싶은 말이 있다면 한 번 더 다듬어서 전달하는 게 좋습니다. 건강이나 컨디션 면에서도 크지 않은 탈이 나기 쉬우니 무리한 일정은 피하세요. 자갈길을 다 지나고 나면, 오늘 조심했던 걸음들이 오히려 더 단단한 다리를 만들어줄 거예요.",
        },
        {
          headline: "좁은 문을 지나는 하루",
          body: "넓은 길이 아니라 몸을 낮추고 지나야 하는 좁은 문 앞에 선 것 같은 하루입니다. 평소라면 쉽게 지나갔을 일도 오늘은 이런저런 조건과 제약이 붙어 더 신중하게 움직여야 할 수 있어요. 답답하게 느껴지더라도, 이 문을 지나고 나면 지금까지와는 다른 공간이 기다리고 있을 가능성이 큽니다. 오늘은 힘으로 밀어붙이기보다 몸을 낮추고 상황에 맞춰가는 유연함이 필요해요. 관계에서도 자존심을 앞세우기보다 한 발 물러서서 대화하는 편이 오해를 줄여줍니다. 돈이나 계획 면에서 큰 결정을 내리기엔 조건이 아직 덜 갖춰진 날이니, 서두르지 말고 다음 기회를 기다려보세요. 좁은 문을 지나는 그 잠깐의 불편함이, 지나고 나면 아무것도 아니었다는 걸 알게 될 거예요.",
        },
        {
          headline: "밀려오는 파도 앞에서",
          body: "예상보다 큰 파도가 연이어 밀려오는 것처럼, 오늘은 여러 일이 한꺼번에 몰려와 정신없게 느껴질 수 있는 날이에요. 하나씩 순서대로 처리하려 해도 자꾸 다음 파도가 밀려오는 것 같은 압박감이 들 수 있습니다. 이럴 때일수록 모든 파도를 다 막으려 하기보다, 지금 눈앞의 파도 하나에만 집중하는 게 훨씬 효율적이에요. 급한 대로 대응하려다 오히려 실수가 생길 수 있으니, 우선순위를 정하고 하나씩 처리해나가세요. 사람들과의 관계에서도 예민해지기 쉬운 하루라, 평소라면 넘어갔을 말에도 신경이 곤두설 수 있습니다. 감정적으로 대응하기보다 파도가 잠잠해질 때까지 잠시 거리를 두는 것도 방법이에요. 파도는 결국 지나가고, 오늘 버텨낸 만큼 내일은 훨씬 잔잔하게 느껴질 겁니다.",
        },
      ],
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
      overviewVariants: [
        {
          headline: "A day like a mirror",
          body: "Today's energy lines up exactly with your own nature. You don't need to dress up or act like someone else — moving as your everyday self is exactly right today. Handling things the way you usually do tends to go more smoothly than expected, and it's better to trust a proven routine than reach for something unfamiliar. But since it's the same energy as yours, the blind spots you usually can't see stay just as hidden. If there's something you often overlook, it's more likely than usual to trip you up again today — so give that one thing an extra check. In conversations, you'll click easily with people who share your temperament, but with someone who sees things differently, you might both end up just talking past each other. Rather than chasing something new, today pays off more if you spend it consolidating and organizing what you already have. It's a comfortable, low-drama day overall — just don't mistake that comfort for a reason to stand still.",
        },
        {
          headline: "A day in familiar clothes",
          body: "Like slipping into clothes that already fit, being yourself is the right move today. Instead of forcing on something new, fill your day with the methods and tools you already know well — the results are likely to come out more solid than usual. But just like comfortable clothes can make you put off cleaning the closet, today carries a real temptation to keep postponing the tasks you've been sitting on. Decide on one small thing to actually finish today, and future-you will thank you. In conversations, your usual way of speaking lands more sincerely than anything dressed up for the occasion. You don't need a big gesture — people are likely to find you easy to be around just as you are. Skip the ambitious plans and let the day flow as it naturally wants to; in the end, that's what pays off more.",
        },
        {
          headline: "Riding the same wave",
          body: "Today's energy moves in the same direction, at the same rhythm, as the wave you were already riding. You don't need to force a new direction or change your pace — simply going with the current flow is enough to move you forward today. Sticking with your existing patterns, whether at work or in relationships, works in your favor; suddenly switching things up is more likely to throw off your balance. But the same wave also means the same place to stumble. If there's a mistake or habit that's tripped you up before, be ready for it to shake you again today. If you're talking with someone whose temperament matches yours, it'll feel unusually easy, understanding each other without needing a long exchange. With someone whose wavelength differs from yours, though, that gap might feel bigger than usual. Instead of hunting for a new wave, treat today as practice for riding the one you're already on more skillfully.",
        },
        {
          headline: "On the path you always walk",
          body: "Today, walking the path you already know is both the safest and most efficient choice. Rather than redrawing the map or hunting for a shortcut, moving along a familiar route saves you both time and energy. But just as a familiar path makes you stop watching your feet, there's a real risk today of absentmindedly repeating a mistake you always make. Anything that's shaken you before — money, commitments — is worth double-checking today. In conversations, comfort doubles with people you've known a long time, and relationships deepen naturally without needing to bring up anything difficult. Meeting someone new or stepping into an unfamiliar setting might feel less exciting than usual, but that's not a bad sign. Today's wins are more likely to come from consistency than from anything flashy. Treat it as a day to reconfirm that the path you're on is the right one.",
        },
      ],
      wealth: "Money moves in its usual rhythm today — nothing dramatic either way. Stick with what you're already doing rather than chasing a new investment or big purchase.",
      love: "Romance stays calm and steady, without much drama. Old connections feel easy, though a strong pull toward someone new is less likely today.",
      health: "Your body holds its usual baseline — no big swing up or down. The main thing today is keeping your current habits rather than changing anything.",
    },
    selfNurturesOther: {
      overviewVariants: [
        {
          headline: "Lighting a lamp",
          body: "Today your energy flows in a direction that lights up everything around you first. Speaking up first in a meeting, or starting something you've been hesitant about, tends to land unusually well. When others hesitate, you moving first tends to loosen things up more easily than you'd expect. But just as a lamp burns through its oil the longer it stays lit, if you keep lighting the way for everyone else, you may find nothing left for yourself by evening. Make sure to dim the flame and rest partway through. Today also favors being the one to reach out first with money or proposals — if there's an offer you've been holding back, this is a good day to bring it up. Just watch that constant giving doesn't leave both your wallet and your spirit running empty. The light you light today is likely to reach further, and last longer, than you'd expect.",
        },
        {
          headline: "Becoming a spring",
          body: "Like a spring that never runs dry, today the energy flowing out of you quietly nourishes everyone around it. Giving advice or lending a hand naturally falls to you today, and it's likely to feel more comfortable than burdensome. Reaching out and taking care of things first also lands well in relationships — if there's a message you've been putting off, today's a good day to send it. But even a spring's water level drops if you keep drawing from it, so don't forget your own emotions and energy have limits too. When someone leans on you, it's fine to give only as much as you have today rather than everything they ask for. At work, taking the lead on a proposal or direction is likely to pay off. Before the day ends, make sure to take a moment to fill yourself back up too.",
        },
        {
          headline: "The wind at their back",
          body: "Today's energy blows in the same direction as the wind that fills someone else's sails. When you step up to suggest a direction or give someone a push, you're likely to watch them move forward far more easily than they expected. Leading, or being the one to propose something first, fits unusually well today, and stepping forward feels more satisfying than watching from behind. But just as too strong a wind can overwhelm a sail, the pace you're pushing at may not match the pace someone else can take — keep that gap in mind. Ease off now and then and check how they're responding. Financially, taking the first move on a spending or investment decision can pay off, but pushing too hard risks running into unexpected resistance. Remember that the wind you made today may have been exactly the tailwind someone else needed.",
        },
        {
          headline: "Building a bridge",
          body: "Today you find yourself stepping up as the bridge connecting two people, or two situations. You're likely to end up mediating a conflict, passing along information, or being the one who makes the first connection — and this role feels more natural than out of place today, so it's worth stepping forward more than usual. But just as a bridge has to bear weight from both sides, mediating in the middle can drain more energy than you'd expect. Rather than trying to solve everything yourself, it's enough to make the connection and leave the rest to the people involved. Being the one to reach out first in a conversation or collaboration tends to smooth things over far more than staying quiet. One bridge you build today may come back to help you in a place you never expected.",
        },
      ],
      wealth: "Money tends to follow when you take the lead today. Proposing something or spending first tends to pay off — just watch that constant giving doesn't leave your wallet running light.",
      love: "Reaching out first and taking care of things lands well today. It's a good day to lead — just make sure you're also letting yourself receive, or it can wear you out.",
      health: "You're spending a lot of energy outward, which is great for staying active — just don't forget to rest partway through, or you'll be running on empty by evening.",
    },
    otherNurturesSelf: {
      overviewVariants: [
        {
          headline: "A tailwind at your back",
          body: "Today feels like a tailwind is filling your sails without you having to row at all. Things go more smoothly than expected, and someone may offer a hand before you even asked. Something that would normally take days might unexpectedly wrap up quickly today. But if you let go of the rudder entirely just because the wind is favorable, the boat can drift somewhere you didn't intend — go with the flow, but keep a light hand on your own direction. If an unexpected offer or good news comes your way, accept it without overthinking it. Just for today, it's fine to set aside the habit of solving everything on your own. Tailwinds don't last forever, so ride this one as far as it'll take you.",
        },
        {
          headline: "Like spring rain",
          body: "Like spring rain quietly soaking into dry ground, today's energy fills you up without you having to try. If you've been running on empty, today may bring an unexpected moment of comfort or recovery. In relationships, someone is likely to reach out and take care of things first, so good things tend to happen naturally without you needing to push. But just as too much rain turns ground to mud, getting too used to receiving can dull your own drive to move. Accept today's help gratefully, but be ready to walk on your own again tomorrow. Financially, unexpected income or a good offer may seep in as well. Rather than forcing anything today, just let what comes naturally soak in.",
        },
        {
          headline: "A hand to catch you",
          body: "Right as you're about to stumble, someone's hand naturally catches you today. If there's something you've been struggling to handle alone, unexpected help may make it much lighter today. In moments like this, swallowing your pride and simply accepting the help is the wiser move. Just don't lean on someone else's hand so much that you forget how to stand on your own — use today's help as a stepping stone, and get ready to be the one offering a hand next time. In conversations, people seem to understand you without much explaining, which makes things feel easier. Physically, too, recovery comes unusually fast today as long as you don't push too hard. Keep today's help in mind, and pass it on to someone else when your turn comes.",
        },
        {
          headline: "Sunlight breaking through",
          body: "Like sunlight unexpectedly breaking into a shaded corner, good energy seeps toward you today without effort. Something that felt stuck may suddenly show a way forward, or a problem you were worried about may resolve more easily than expected. People may also show you unexpected kindness or consideration, so it's worth opening up a little more than usual. But if you spend the whole day lying in the sun doing nothing, once it passes you may find nothing left to show for it. Take at least one small action while the good flow is here. Financially or professionally, unexpected good news may also come your way. Enjoy today's sunlight fully, but don't forget to plant a seed for tomorrow too.",
        },
      ],
      wealth: "Money or good offers tend to come your way today without much effort on your part. If unexpected income or help shows up, feel free to accept it.",
      love: "Someone else is likely to reach out or take care of things first today. Things flow smoothly without much effort from you — let yourself be on the receiving end today.",
      health: "Support from those around you, or just good timing, can leave you feeling noticeably lighter today. As long as you don't push too hard, recovery comes quickly.",
    },
    selfChallengesOther: {
      overviewVariants: [
        {
          headline: "Holding the reins",
          body: "Today your ability to grab the reins and steer things in the direction you want is unusually strong. It's a good time to make a decision you've been putting off, or push forward with a proposal you'd been holding back on. But just as pulling the reins too hard can spook a horse off course, pushing someone too far can trigger pushback you didn't expect. Steer in the direction you want, but check now and then whether the other person can actually keep pace. Your arguments carry extra weight in conversation today, so persuasion comes easily — just don't push one-sidedly, or it can leave lasting resentment. A bold decision about money or work is likely to pay off, but avoid pushing things to an extreme. Handle today's reins wisely, and you can take a real step forward toward where you want to go.",
        },
        {
          headline: "Rowing against the current",
          body: "Today you have the strength to push the boat forward in the direction you want, even against the current. When others hesitate, you rowing first can move things forward more easily than expected. But just as rowing at full strength the whole way tires your arms out, using today's drive at full intensity all day can leave you suddenly exhausted by evening. Pace yourself and conserve some strength along the way. Leading and setting the direction fits you well today in relationships, but check in on the pace of whoever's rowing with you now and then. A decisive, proactive call on money or work is likely to bring good results, but avoid an overly abrupt change of direction. Every stroke you take today brings you a little closer to where you're headed.",
        },
        {
          headline: "Taking the helm",
          body: "Today you find yourself gripping the helm of whatever situation has been drifting without direction. Giving a clear direction to something that's been vague tends to reassure the people around you enough to follow it. Deciding something firmly today, rather than putting it off, is likely to lead to a better outcome overall. But just as yanking the helm too fast can make a boat lurch, big changes go more safely in small adjustments than one sharp turn. Taking the lead in conversation feels natural today, but completely ignoring the other side's opinion risks pushback later. It's a good time to set a new direction for finances or plans, so if there's a decision you've been sitting on, this is a good day to close it out. Keep a firm grip on the helm, but keep your eyes on what's ahead.",
        },
        {
          headline: "Drawing the bowstring",
          body: "Like pulling a bowstring taut toward your target, today is a good day to gather your energy and push actively toward what you want. Even an offer or challenge you'd normally hesitate on, you can push forward with real confidence today. But just as your hand starts to shake if you hold the string drawn too long, endless preparation without release can leave you with nothing left at the moment it matters. Pulling too hard, for too long, can drain the strength you need most. Clearly stating what you want lands well in relationships today, but avoid a tone that feels like you're taking aim at someone. A decisive call on money or work is likely to pay off well today. Release the string you've drawn at just the right moment, and it'll land exactly where you meant it to.",
        },
      ],
      wealth: "Pushing forward tends to bring money your way today — just watch that an overly aggressive investment or purchase doesn't become a burden later. Go for what you want, but dial back the intensity.",
      love: "Taking the lead moves things forward today, but pushing too hard can feel like too much for the other person. Match your pace to theirs too.",
      health: "You're likely to feel extra driven and push yourself harder than usual. Exercise and activity are good today — just ease off the intensity a notch from what you'd normally do.",
    },
    otherChallengesSelf: {
      overviewVariants: [
        {
          headline: "A headwind",
          body: "Today may feel like a wind is blowing straight against the direction you're trying to go — progress feels unusually slow. If things don't go as planned or an unexpected obstacle shows up, it's less a sign you're headed the wrong way and more a cue to slow down for now. Forcing your way straight into the headwind risks burning through your energy for nothing. Rather than making a big new decision today, focus on holding your ground and sticking with the direction you already chose. Small misunderstandings or friction are more likely in relationships today, so pausing before reacting emotionally is far safer than responding right away. Financially, unexpected expenses may show up, so it's better to put off any big purchase or investment. Headwinds never last forever — get through today, and the wind is bound to shift by tomorrow.",
        },
        {
          headline: "Walking a gravel path",
          body: "Today the ground underfoot feels rougher than usual, and every step calls for a little more care. Small things may keep tripping you up, or something that seemed like it would go smoothly may drag on longer than expected. But a gravel path doesn't mean you took a wrong turn — it just means today is a stretch that calls for walking slower and paying closer attention. Rushing risks a misstep, so slow down and check your footing with each step today. A single offhand comment can be taken the wrong way more easily than usual in relationships, so it's worth smoothing out what you want to say before you say it. Physically, minor ailments are more likely too, so avoid overloading your schedule. Once you're past the gravel, the careful steps you took today will end up building a sturdier bridge.",
        },
        {
          headline: "Passing through a narrow gate",
          body: "Today feels less like an open road and more like standing before a narrow gate you have to duck through. Something that would normally go easily may come with extra conditions and restrictions that call for more caution than usual. It may feel frustrating, but once you're through this gate, a different kind of space is likely waiting on the other side. Today calls less for pushing through by force and more for staying flexible and adapting to the situation. In relationships, stepping back to talk things through beats leading with pride — it reduces misunderstandings. Conditions aren't fully in place yet for a big decision about money or plans, so it's better to hold off and wait for the next opportunity. You'll find that the brief discomfort of squeezing through this gate meant nothing once you're past it.",
        },
        {
          headline: "Facing an incoming wave",
          body: "Today may feel like wave after wave is arriving all at once, leaving you scrambling. Even trying to handle things one at a time, the pressure of the next wave already rolling in can feel relentless. In moments like this, it's far more effective to focus on the one wave right in front of you than to try to block them all. Trying to react to everything at once risks mistakes — set your priorities and work through them one by one. Relationships may feel more sensitive than usual too, so something you'd normally shrug off might get under your skin today. Rather than reacting emotionally, it can help to simply put some distance between you until the waves settle. The waves will pass eventually, and the more you hold steady today, the calmer tomorrow will feel.",
        },
      ],
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
      overviewVariants: [
        {
          headline: "Un día como un espejo",
          body: "La energía de hoy coincide exactamente con tu naturaleza. No necesitas disfrazarte ni actuar como otra persona — moverte como tu yo de siempre es justo lo correcto hoy. Manejar las cosas a tu manera habitual suele salir más fluido de lo esperado, y es mejor confiar en una rutina probada que buscar algo desconocido. Pero al ser la misma energía que la tuya, los puntos ciegos que normalmente no ves siguen igual de ocultos. Si hay algo que sueles pasar por alto, hoy es más probable que vuelva a hacerte tropezar — así que revísalo una vez más. En las conversaciones, conectarás fácilmente con quienes comparten tu temperamento, pero con alguien que ve las cosas distinto, podrían terminar hablando cada uno por su lado. En vez de buscar algo nuevo, hoy rinde más si lo dedicas a consolidar y ordenar lo que ya tienes. Es un día cómodo, sin mucho drama en general — solo no confundas esa comodidad con una razón para quedarte quieto.",
        },
        {
          headline: "Un día con ropa conocida",
          body: "Como ponerte ropa que ya te queda bien, ser tú mismo es lo correcto hoy. En vez de forzar algo nuevo, llena tu día con los métodos y herramientas que ya conoces bien — los resultados probablemente salgan más sólidos de lo habitual. Pero así como la ropa cómoda puede hacer que pospongas ordenar el clóset, hoy hay una tentación real de seguir postergando las tareas pendientes. Decide terminar una cosa pequeña hoy, y tu yo futuro te lo agradecerá. En las conversaciones, tu forma habitual de hablar se siente más sincera que cualquier cosa arreglada para la ocasión. No necesitas un gesto grande — es probable que la gente te encuentre fácil de tratar tal como eres. Deja de lado los planes ambiciosos y deja que el día fluya como quiere fluir; al final, eso es lo que más rinde.",
        },
        {
          headline: "Montando la misma ola",
          body: "La energía de hoy se mueve en la misma dirección, al mismo ritmo, que la ola que ya venías montando. No necesitas forzar una nueva dirección ni cambiar tu ritmo — simplemente dejarte llevar por la corriente actual basta para avanzar hoy. Mantener tus patrones actuales, ya sea en el trabajo o en las relaciones, juega a tu favor; cambiar de golpe es más probable que te desequilibre. Pero la misma ola también significa el mismo lugar para tropezar. Si hay un error o un hábito que te ha atrapado antes, prepárate para que hoy vuelva a sacudirte. Si hablas con alguien de temperamento parecido al tuyo, se sentirá inusualmente fácil, entendiéndose sin necesitar una charla larga. Con alguien de onda distinta a la tuya, esa diferencia podría sentirse más grande de lo normal. En vez de buscar una ola nueva, trata hoy como una práctica para montar mejor la que ya tienes.",
        },
        {
          headline: "En el camino que siempre recorres",
          body: "Hoy, caminar por el sendero que ya conoces es la opción más segura y eficiente. En vez de redibujar el mapa o buscar un atajo, moverte por una ruta conocida te ahorra tiempo y energía. Pero así como un camino conocido hace que dejes de mirarte los pies, hoy hay un riesgo real de repetir sin darte cuenta un error que siempre cometes. Cualquier cosa que te haya hecho tambalear antes — dinero, compromisos — vale la pena revisarla hoy una vez más. En las conversaciones, la comodidad se duplica con quienes conoces desde hace tiempo, y las relaciones se profundizan de forma natural sin necesidad de sacar nada difícil. Conocer a alguien nuevo o entrar a un lugar desconocido puede sentirse menos emocionante de lo normal, pero eso no es mala señal. Los logros de hoy probablemente vengan más de la constancia que de algo llamativo. Trátalo como un día para reconfirmar que el camino en el que estás es el correcto.",
        },
      ],
      wealth: "El dinero se mueve en su ritmo habitual hoy — nada dramático en ningún sentido. Mejor seguir con lo que ya vienes haciendo que lanzarte a una nueva inversión o compra grande.",
      love: "El amor se mantiene tranquilo y estable, sin mucho drama. Los vínculos antiguos se sienten cómodos, aunque hoy es menos probable sentir una atracción fuerte por alguien nuevo.",
      health: "Tu cuerpo mantiene su nivel habitual — sin grandes subidas ni bajadas. Lo importante hoy es mantener tus hábitos actuales en lugar de cambiar algo.",
    },
    selfNurturesOther: {
      overviewVariants: [
        {
          headline: "Encender una lámpara",
          body: "Hoy tu energía fluye en una dirección que ilumina primero todo lo que te rodea. Hablar primero en una reunión, o empezar algo que dudabas hacer, suele funcionar inusualmente bien. Cuando otros dudan, que tú te muevas primero suele destrabar las cosas más fácil de lo esperado. Pero así como una lámpara consume su aceite mientras más tiempo está encendida, si sigues iluminando el camino para todos los demás, puede que no te quede nada para ti al anochecer. Asegúrate de bajar la llama y descansar a mitad de camino. Hoy también favorece ser quien se acerca primero con dinero o propuestas — si hay una oferta que has estado guardando, es un buen día para sacarla. Solo cuida que dar sin parar no te deje vacía tanto la billetera como el ánimo. La luz que enciendas hoy probablemente llegue más lejos, y dure más, de lo que imaginas.",
        },
        {
          headline: "Convertirte en manantial",
          body: "Como un manantial que nunca se seca, hoy la energía que sale de ti nutre en silencio a todo tu alrededor. Dar consejos o tender una mano te cae naturalmente hoy, y probablemente se sienta más cómodo que pesado. Acercarte y cuidar de las cosas primero también funciona bien en las relaciones — si hay un mensaje que has estado postergando, hoy es buen día para enviarlo. Pero incluso el nivel del agua de un manantial baja si sigues sacando de él, así que no olvides que tus propias emociones y energía también tienen un límite. Cuando alguien se apoye en ti, está bien dar solo lo que tienes hoy en vez de todo lo que te pidan. En el trabajo, tomar la iniciativa en una propuesta o dirección probablemente rinda bien. Antes de que termine el día, tómate un momento para llenarte tú también.",
        },
        {
          headline: "El viento a favor de otro",
          body: "La energía de hoy sopla en la misma dirección que el viento que llena las velas de otra persona. Cuando das un paso al frente para sugerir una dirección o dar un empujón, es probable que veas a esa persona avanzar mucho más fácil de lo que esperaba. Liderar, o ser quien propone algo primero, te queda inusualmente bien hoy, y dar un paso al frente se siente más satisfactorio que quedarte mirando desde atrás. Pero así como un viento demasiado fuerte puede abrumar una vela, el ritmo al que empujas puede no coincidir con el ritmo que la otra persona puede seguir — ten esa diferencia en cuenta. Baja la intensidad de vez en cuando y revisa cómo está reaccionando. En lo financiero, tomar la primera movida en un gasto o inversión puede rendir bien, pero empujar demasiado fuerte arriesga encontrar una resistencia inesperada. Recuerda que el viento que hiciste hoy pudo haber sido justo el viento a favor que alguien necesitaba.",
        },
        {
          headline: "Construir un puente",
          body: "Hoy te encuentras dando un paso al frente como el puente que conecta a dos personas, o dos situaciones. Es probable que termines mediando un conflicto, pasando información, o siendo quien hace la primera conexión — y este papel se siente más natural que forzado hoy, así que vale la pena dar un paso al frente más de lo habitual. Pero así como un puente debe soportar peso de ambos lados, mediar en el medio puede agotar más energía de la que esperas. En vez de intentar resolverlo todo tú misma, basta con hacer la conexión y dejar el resto a las personas involucradas. Ser quien se acerca primero en una conversación o colaboración suele suavizar las cosas mucho más que quedarte callada. Un puente que construyas hoy puede volver a ayudarte en un lugar que nunca esperabas.",
        },
      ],
      wealth: "El dinero tiende a seguirte cuando tomas la iniciativa hoy. Proponer algo o gastar primero suele salir bien — solo cuida que dar sin parar no te deje la billetera vacía.",
      love: "Acercarte primero y cuidar de la relación funciona bien hoy. Es un buen día para liderar — solo asegúrate de dejarte recibir también, o puede agotarte.",
      health: "Estás gastando mucha energía hacia afuera, lo cual es genial para mantenerte activo — solo no olvides descansar a mitad de camino, o llegarás a la noche sin energía.",
    },
    otherNurturesSelf: {
      overviewVariants: [
        {
          headline: "Viento a favor",
          body: "Hoy se siente como si un viento a favor llenara tus velas sin que tengas que remar. Las cosas fluyen más suave de lo esperado, y alguien puede ofrecerte una mano antes de que la pidas. Algo que normalmente tomaría días podría resolverse inesperadamente rápido hoy. Pero si sueltas el timón por completo solo porque el viento es favorable, el barco puede terminar en un lugar que no querías — déjate llevar por la corriente, pero mantén una mano ligera en tu propia dirección. Si llega una oferta inesperada o buenas noticias, acéptalas sin pensarlo demasiado. Solo por hoy, está bien dejar de lado el hábito de resolverlo todo por tu cuenta. Los vientos a favor no duran para siempre, así que móntate en este todo lo que puedas.",
        },
        {
          headline: "Como lluvia de primavera",
          body: "Como la lluvia de primavera que se filtra en silencio en tierra seca, la energía de hoy te llena sin que tengas que esforzarte. Si has estado agotada, hoy puede traerte un momento inesperado de consuelo o recuperación. En las relaciones, es probable que alguien se acerque y cuide de las cosas primero, así que las cosas buenas tienden a pasar de forma natural sin que tengas que empujar. Pero así como demasiada lluvia convierte la tierra en lodo, acostumbrarte demasiado a recibir puede opacar tu propio impulso para moverte. Acepta la ayuda de hoy con gratitud, pero prepárate para caminar de nuevo por tu cuenta mañana. En lo financiero, también puede filtrarse un ingreso inesperado o una buena oferta. En vez de forzar algo hoy, simplemente deja que lo que llegue naturalmente se filtre en ti.",
        },
        {
          headline: "Una mano que te sostiene",
          body: "Justo cuando estás por tropezar, la mano de alguien te sostiene naturalmente hoy. Si hay algo que has estado luchando por manejar sola, una ayuda inesperada puede hacerlo mucho más liviano hoy. En momentos así, dejar de lado el orgullo y simplemente aceptar la ayuda es la decisión más sabia. Solo no te apoyes tanto en la mano de otra persona que olvides cómo sostenerte sola — usa la ayuda de hoy como un escalón, y prepárate para ser tú quien tienda la mano la próxima vez. En las conversaciones, la gente parece entenderte sin que tengas que explicar mucho, lo que hace todo más fácil. Físicamente también, la recuperación llega inusualmente rápido hoy mientras no te exijas demasiado. Guarda en la memoria la ayuda de hoy, y devuélvela a alguien más cuando llegue tu turno.",
        },
        {
          headline: "Sol que se filtra",
          body: "Como el sol que inesperadamente entra a un rincón con sombra, hoy la buena energía se filtra hacia ti sin esfuerzo. Algo que se sentía estancado puede mostrar de pronto un camino, o un problema que te preocupaba puede resolverse más fácil de lo esperado. La gente también puede mostrarte una amabilidad o consideración inesperada, así que vale la pena abrir un poco más la puerta de lo habitual. Pero si pasas todo el día tumbada al sol sin hacer nada, una vez que pase puede que no te quede nada que mostrar. Aprovecha para hacer al menos una pequeña acción mientras dura la buena racha. En lo financiero o profesional, también puede llegarte una buena noticia inesperada. Disfruta plenamente el sol de hoy, pero no olvides sembrar también una semilla para mañana.",
        },
      ],
      wealth: "El dinero o las buenas oportunidades tienden a llegar hoy sin mucho esfuerzo de tu parte. Si aparece un ingreso inesperado o ayuda, siéntete libre de aceptarlo.",
      love: "Es probable que hoy sea la otra persona quien se acerque o cuide de las cosas primero. Todo fluye sin mucho esfuerzo de tu lado — déjate recibir hoy.",
      health: "El apoyo de quienes te rodean, o simplemente el buen momento, puede hacerte sentir notablemente más ligero hoy. Mientras no te exijas demasiado, la recuperación llega rápido.",
    },
    selfChallengesOther: {
      overviewVariants: [
        {
          headline: "Sostener las riendas",
          body: "Hoy tu capacidad de tomar las riendas y llevar las cosas en la dirección que quieres es inusualmente fuerte. Es un buen momento para tomar una decisión que has estado postergando, o avanzar con una propuesta que habías guardado. Pero así como tirar demasiado fuerte de las riendas puede espantar a un caballo, presionar demasiado a alguien puede generar una resistencia que no esperabas. Dirige hacia donde quieres, pero revisa de vez en cuando si la otra persona realmente puede seguirte el ritmo. Tus argumentos pesan más de lo normal hoy en las conversaciones, así que convencer resulta fácil — solo no empujes de forma unilateral, o puede dejar un resentimiento duradero. Una decisión audaz sobre dinero o trabajo probablemente rinda bien, pero evita llevar las cosas a un extremo. Maneja las riendas de hoy con sabiduría, y podrás dar un paso real hacia donde quieres llegar.",
        },
        {
          headline: "Remar contra la corriente",
          body: "Hoy tienes la fuerza para llevar el bote en la dirección que quieres, incluso contra la corriente. Cuando otros dudan, que tú remes primero puede mover las cosas más fácil de lo esperado. Pero así como remar a toda fuerza todo el camino cansa los brazos, usar el impulso de hoy al máximo todo el día puede dejarte agotada de golpe al anochecer. Marca tu propio ritmo y ahorra fuerzas en el camino. Liderar y marcar la dirección te queda bien hoy en las relaciones, pero revisa de vez en cuando el ritmo de quien rema contigo. Una decisión decidida y activa sobre dinero o trabajo probablemente traiga buenos resultados, pero evita un cambio de dirección demasiado brusco. Cada remada que des hoy te acerca un poco más a donde te diriges.",
        },
        {
          headline: "Tomar el timón",
          body: "Hoy te encuentras sosteniendo el timón de una situación que ha estado a la deriva sin dirección. Darle una dirección clara a algo que ha sido ambiguo tiende a tranquilizar lo suficiente a quienes te rodean como para seguirla. Decidir algo con firmeza hoy, en vez de postergarlo, probablemente lleve a un mejor resultado en general. Pero así como girar el timón demasiado rápido puede hacer tambalear un barco, los grandes cambios son más seguros en ajustes pequeños que en un giro brusco. Tomar la iniciativa en una conversación se siente natural hoy, pero ignorar por completo la opinión del otro lado arriesga una reacción negativa después. Es un buen momento para fijar una nueva dirección en las finanzas o los planes, así que si hay una decisión que has estado postergando, hoy es un buen día para cerrarla. Sostén el timón con firmeza, pero mantén la vista puesta en lo que viene.",
        },
        {
          headline: "Tensar el arco",
          body: "Como tensar un arco hacia tu objetivo, hoy es un buen día para reunir tu energía y avanzar activamente hacia lo que quieres. Incluso una oferta o desafío que normalmente dudarías, hoy puedes impulsarlo con verdadera confianza. Pero así como la mano empieza a temblar si mantienes la cuerda tensada demasiado tiempo, prepararte sin soltar nunca puede dejarte sin fuerzas justo en el momento que importa. Tirar demasiado fuerte, por demasiado tiempo, puede agotar la fuerza que más necesitas. Decir claramente lo que quieres funciona bien hoy en las relaciones, pero evita un tono que se sienta como si estuvieras apuntando a alguien. Una decisión audaz sobre dinero o trabajo probablemente rinda bien hoy. Suelta la cuerda que tensaste en el momento justo, y llegará exactamente donde querías.",
        },
      ],
      wealth: "Empujar hacia adelante tiende a traerte dinero hoy — solo cuida que una inversión o compra demasiado agresiva no se vuelva una carga después. Ve por lo que quieres, pero baja la intensidad.",
      love: "Tomar la iniciativa hace avanzar las cosas hoy, pero presionar demasiado puede sentirse pesado para la otra persona. Ajusta tu ritmo al suyo también.",
      health: "Es probable que te sientas con más impulso de lo normal y te exijas más de la cuenta. El ejercicio y la actividad son buenos hoy — solo baja un poco la intensidad de lo habitual.",
    },
    otherChallengesSelf: {
      overviewVariants: [
        {
          headline: "Viento en contra",
          body: "Hoy puede sentirse como si un viento soplara justo en contra de la dirección a la que intentas ir — el avance se siente inusualmente lento. Si las cosas no salen como planeabas o aparece un obstáculo inesperado, es menos una señal de que vas mal y más un aviso para bajar el ritmo por ahora. Forzar el paso directo contra el viento arriesga agotar tu energía para nada. En vez de tomar una gran decisión nueva hoy, concéntrate en mantener tu posición y seguir con la dirección que ya elegiste. Pequeños malentendidos o fricciones son más probables hoy en las relaciones, así que pausar antes de reaccionar emocionalmente es mucho más seguro que responder de inmediato. En lo financiero, pueden aparecer gastos inesperados, así que es mejor posponer cualquier compra o inversión grande. Los vientos en contra nunca duran para siempre — pasa hoy, y el viento seguro cambiará de dirección mañana.",
        },
        {
          headline: "Caminar por un sendero de grava",
          body: "Hoy el suelo bajo tus pies se siente más áspero de lo normal, y cada paso pide un poco más de cuidado. Pequeñas cosas pueden seguir haciéndote tropezar, o algo que parecía que iría suave puede alargarse más de lo esperado. Pero un sendero de grava no significa que tomaste el camino equivocado — solo significa que hoy es un tramo que pide caminar más despacio y con más atención. Apurarte arriesga un mal paso, así que baja la velocidad hoy y revisa cada paso que das. Un comentario casual puede malinterpretarse más fácil de lo normal en las relaciones, así que vale la pena pulir lo que quieres decir antes de decirlo. Físicamente también, las molestias menores son más probables, así que evita sobrecargar tu agenda. Una vez que pases la grava, los pasos cuidadosos de hoy terminarán construyendo un puente más firme.",
        },
        {
          headline: "Cruzar una puerta angosta",
          body: "Hoy se siente menos como un camino abierto y más como estar frente a una puerta angosta que hay que cruzar agachada. Algo que normalmente pasaría fácil hoy puede venir con condiciones y restricciones extra que piden moverse con más cuidado. Puede sentirse frustrante, pero una vez que cruces esta puerta, es probable que del otro lado te espere un espacio distinto. Hoy pide menos empujar con fuerza y más flexibilidad para adaptarte a la situación. En las relaciones, dar un paso atrás para conversar vale más que anteponer el orgullo — reduce los malentendidos. Las condiciones aún no están del todo listas para una gran decisión sobre dinero o planes, así que es mejor no apresurarse y esperar la siguiente oportunidad. Descubrirás que la breve incomodidad de pasar por esta puerta no significó nada una vez que la dejes atrás.",
        },
        {
          headline: "Frente a una ola que llega",
          body: "Hoy puede sentirse como si llegaran olas una tras otra al mismo tiempo, dejándote corriendo de un lado a otro. Incluso intentando manejar las cosas una por una, la presión de la siguiente ola que ya se acerca puede sentirse implacable. En momentos así, es mucho más efectivo concentrarte en la ola que tienes justo enfrente que intentar detenerlas todas. Intentar reaccionar a todo a la vez arriesga errores — define tus prioridades y avanza una por una. Las relaciones también pueden sentirse más sensibles de lo normal, así que algo que normalmente ignorarías hoy puede afectarte de verdad. En vez de reaccionar con emoción, puede ayudar simplemente poner distancia hasta que las olas se calmen. Las olas eventualmente pasan, y mientras más te mantengas firme hoy, más tranquilo se sentirá mañana.",
        },
      ],
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
