/**
 * lib/i18n/ko.ts
 * ------------------------------------------------------------------
 * Source-of-truth dictionary for the native app — every UI chrome string
 * across screens/*.tsx, keyed by screen. This is a SEPARATE dictionary
 * from the web app's lib/i18n/ko.ts (different codebase, different
 * components), though wording is kept identical wherever both apps show
 * the same copy.
 *
 * Deliberately NOT covered here (see the web dictionary's own README for
 * the same reasoning, which applies equally to mobile):
 *   - The 11 quiz module question banks (lib/quiz/module1Attachment.ts
 *     etc., ~330 questions) and lib/quiz/modules.ts's title/subtitle —
 *     content still being revised; translate once it's final.
 *   - AI-generated dynamic content (ChatScreen's bot replies, ReportScreen's
 *     `content.*` fields, QAScreen's answer lines) — these come back from
 *     the shared backend already in whatever language it was prompted in;
 *     making that match the user's locale is a backend prompt-engineering
 *     change (lib/chatPrompts.ts on the web side), not a client string swap.
 *   - lib/quiz/quizProfile.ts's generateNuancedSummary() — composes
 *     sentences using Korean particles (은/는, 이/가) chosen by the
 *     preceding word; English/Spanish need their own sentence-building
 *     logic, not translated string values.
 * ------------------------------------------------------------------
 */

export const ko = {
  common: {
    brand: "Fatesaid",
    backLabel: "이전",
    nextLabel: "다음",
    retryLabel: "다시 시도",
    elementLabels: {
      wood: "목(木)",
      fire: "화(火)",
      earth: "토(土)",
      metal: "금(金)",
      water: "수(水)",
    },
    zodiacLabels: {
      capricorn: "염소자리",
      aquarius: "물병자리",
      pisces: "물고기자리",
      aries: "양자리",
      taurus: "황소자리",
      gemini: "쌍둥이자리",
      cancer: "게자리",
      leo: "사자자리",
      virgo: "처녀자리",
      libra: "천칭자리",
      scorpio: "전갈자리",
      sagittarius: "사수자리",
    },
  },

  language: {
    heading: "언어를 선택하세요",
    subtext: "나중에 설정에서 바꿀 수 있어요.",
  },

  intro: {
    headlineLine1: "운명은 이미 말했습니다.",
    headlineLine2: "이제 당신이 답할 차례입니다.",
    subheadline: "운명을 바꾸고 싶나요? 사주를 분석하고 지금 시작하세요.",
    freeNote: "무료 20분 리딩 · 신용카드 불필요",
    ageNoticePrefix: "만 14세 이상만 이용할 수 있어요 ·",
    ageNoticeAnd: "및",
    ageNoticeSuffix: "에 동의합니다",
    termsLinkLabel: "이용약관",
    privacyLinkLabel: "개인정보처리방침",
  },

  verifyCode: {
    heading: "인증코드가 있으신가요?",
    subtext: "웹에서 Q&A를 진행하셨다면, 그때 안내된 6자리 코드를 입력해주세요. 지금까지 입력하신 정보를 그대로 이어서 사용할 수 있어요.",
    placeholder: "000000",
    skipLabel: "코드가 없어요, 새로 시작할게요",
    errorDefault: "유효하지 않거나 이미 사용된 코드입니다.",
    errorNetwork: "네트워크 오류로 코드를 확인하지 못했습니다.",
  },

  nickname: {
    heading: "뭐라고 불러 드릴까요?",
    subtext: "이 이름으로 결과를 안내해 드릴게요.",
    placeholder: "닉네임을 입력하세요",
  },

  gender: {
    heading: "성별",
    male: "남성",
    female: "여성",
  },

  dob: {
    heading: "생년월일",
    yearPlaceholder: "YYYY",
    monthPlaceholder: "MM",
    dayPlaceholder: "DD",
    ageWarning: (minAge: number) => `죄송하지만 만 ${minAge}세 이상만 이용할 수 있어요.`,
  },

  tob: {
    heading: "태어난 시간",
    unknownTime: "모름",
    hourPlaceholder: "시",
    minutePlaceholder: "분",
    periodAM: "오전",
    periodPM: "오후",
  },

  city: {
    heading: "출생 도시 (전세계 검색 가능)",
    placeholder: "도시 이름을 입력하세요",
    noResultsHint:
      "검색 결과가 없어요. 사주 계산에는 태어난 시간대가 가장 중요해서, 같은 시간대의 가까운 대도시(예: 그 나라의 수도나 근처의 잘 알려진 도시)로 검색해보셔도 괜찮아요.",
    errorDefault: "사주 계산에 실패했습니다.",
    errorNetwork: "네트워크 오류로 사주 계산에 실패했습니다.",
  },

  home: {
    greeting: (nickname: string) => `안녕하세요, ${nickname}님`,
    elementBadgePrefix: "오행 ·",
    elementDistribution: "나의 오행 분포",
    dailyInsightLabel: "오늘의 한마디",
    explainerSectionLabel: "사주, 어떻게 활용하면 좋을까요",
    explainerHeading1: "사주명리학이란?",
    explainerBody1:
      "사주(四柱)는 태어난 연·월·일·시 네 기둥에 담긴 기운을 오행(목·화·토·금·수)으로 풀어, 타고난 성향과 삶의 흐름을 해석하는 동양의 전통 학문이에요. 정해진 운명을 점치기보다는, 나를 이루는 균형을 이해하고 스스로를 더 잘 알아가기 위한 도구로 보면 가장 잘 어울려요.",
    explainerHeading2: "이렇게 활용해보세요",
    explainerBody2:
      "먼저 사주 Q&A에서 지금 가장 궁금한 질문 하나를 편하게 물어보세요. 그다음 심리테스트로 나의 성향과 패턴을 진단해보면, 오행 데이터와 심리 데이터가 함께 맞물리면서 훨씬 입체적인 이해가 가능해져요. 심리테스트를 마치면 AI 상담으로 자연스럽게 이어지고, 상담이 끝나면 지금까지의 답변을 모두 엮은 나만의 심층 리포트를 받아볼 수 있어요.",
    featuresSectionLabel: "무엇을 해볼까요",
    featureQaLabel: "사주 Q&A",
    featureQaDescription: "궁금한 순간, 지금 바로 물어보세요",
    featureQuizLabel: "심리테스트",
    featureQuizDescription: "나를 이해하는 첫걸음",
    featureTypeLabel: "나의 사주 유형",
    featureTypeDescription: "50가지 유형 중 나는 어떤 사람일까요",
    featureChatLabel: "AI 상담",
    featureChatDescription: "심리테스트 완료 후 이용 가능",
    featureReportLabel: "심층 리포트",
    featureReportDescription: "심리테스트 완료 후 이용 가능",
    featureCompatLabel: "궁합",
    featureCompatDescription: "그 사람과 나, 어떤 흐름일까요",
    featureFortuneLabel: "오늘의 운세",
    featureFortuneDescription: "매일 바뀌는 오늘 하루의 기운",
    recentQuestionLabel: "최근 질문",
    recentQuestionEmpty: "아직 질문한 기록이 없어요 · 첫 질문 물어보기",
    typeBadgeTap: "탭해서 자세히 보기",
  },

  sajuType: {
    title: "나의 사주 유형",
    archetypeLabel: "타고난 나",
    modeLabel: "지금 나를 이끄는 기운",
    shareButton: "결과 공유하기",
    shareMessage: (nickname: string, typeName: string) =>
      `${nickname}님의 사주 유형은 "${typeName}" — Fatesaid에서 확인해보세요.`,
    celebritiesLabel: "이 유형을 가진 유명인",
    celebrityBirthYear: (year: number) => `${year}년생`,
  },

  decadeNotification: {
    title: "새로운 대운이 다가오고 있어요",
    body: (pillarLabel: string) => `일주일 뒤, 당신의 대운이 ${pillarLabel}(으)로 바뀝니다. Fatesaid에서 어떤 흐름인지 확인해보세요.`,
  },

  routineNotification: {
    dailyTitle: "오늘의 운세가 도착했어요",
    dailyBody: "지금 열어보고 오늘 하루의 흐름을 확인해보세요.",
    weeklyTitle: "이번 주 운세가 도착했어요",
    weeklyBody: "한 주를 시작하기 전에 이번 주 흐름을 확인해보세요.",
    // 2026-09-15: 오늘의 운세/이번주 운세가 구독자 전용 기능이 되면서, 구독하지
    // 않은 유저에게 잠긴 화면을 미리 보여주는 대신 실제로 무료로 쓸 수 있는
    // 기능(하루 1개 무료 질문)으로 리마인더 내용을 바꿨다.
    dailyTitleFree: "오늘의 무료 질문이 준비됐어요",
    dailyBodyFree: "하루 1번, 사주에게 궁금한 걸 물어보세요.",
    weeklyTitleFree: "이번 주 무료 질문을 사용해보세요",
    weeklyBodyFree: "하루 1번, 사주에게 물어볼 기회가 기다리고 있어요.",
  },

  settings: {
    heading: "설정",
    languageSectionLabel: "언어",
    notificationSectionLabel: "알림",
    notificationOff: "알림 안 받기",
    notificationOffDescription: "운세 알림을 보내지 않아요",
    notificationDaily: "오늘의 운세 받아보기",
    notificationDailyDescription: "매일 아침 오늘의 운세를 알려드려요",
    notificationWeekly: "주간 운세 받아보기",
    notificationWeeklyDescription: "매주 월요일 아침 이번 주 운세를 알려드려요",
    notificationPermissionDenied: "알림 권한이 꺼져 있어요. 기기 설정에서 알림을 허용해주세요.",
    turnOffPromptTitle: "알림을 끌까요?",
    turnOffPromptBody: "매일 대신 일주일에 한 번만 받아보는 방법도 있어요.",
    turnOffPromptSwitchToWeekly: "주간 알림으로 바꾸기",
    turnOffPromptConfirm: "끄기",
    cancelLabel: "취소",
    resetSectionLabel: "프로필",
    resetButton: "내 정보 초기화",
    resetConfirmTitle: "정보를 초기화할까요?",
    resetConfirmBody: "저장된 사주 정보가 삭제되고, 처음부터 다시 입력하게 돼요.",
    resetConfirmButton: "초기화",
  },

  compatibility: {
    heading: "궁합",
    subtitle: "상대방의 생년월일을 입력하면 두 사람의 사주 흐름을 비교해드려요.",
    nameLabel: "상대방 이름 (또는 애칭)",
    namePlaceholder: "예: 지수",
    dobHeading: "상대방 생년월일",
    timeHeading: "상대방 태어난 시간 (선택)",
    cityHeading: "상대방 출생 도시 (선택)",
    cityPlaceholder: "모르면 비워두셔도 괜찮아요",
    submitButton: "궁합 보기",
    tryAgainButton: "다른 사람과 다시 보기",
    shareButton: "결과 공유하기",
    errorMissing: "상대방 생년월일과 성별을 입력해주세요.",
    errorDefault: "궁합 계산에 실패했습니다.",
    errorNetwork: "네트워크 오류로 궁합 계산에 실패했습니다.",
    scoreLabel: "궁합 포인트",
    otherTypeLabel: (name: string, typeName: string) => `${name}님의 유형 · ${typeName}`,
    shareMessage: (selfName: string, otherName: string, score: number) =>
      `${selfName} × ${otherName} 궁합 포인트 ${score}점 — Fatesaid에서 확인해보세요.`,
  },

  fortune: {
    headerLabel: "오늘의 운세",
    dailyTab: "오늘",
    weeklyTab: "이번주",
    lockedHeading: "오늘의 운세 · 이번주 운세",
    lockedBody: "구독하면 매일 아침 오늘의 기운을, 한 번의 탭으로 이번 주 전체 흐름까지 확인할 수 있어요.",
    scoreLabel: "오늘의 기운 점수",
    weeklyScoreLabel: "기운 점수",
    todayElementPrefix: "오늘의 기운",
    weeklyBestDayLabel: "가장 잘 맞는 날",
    weeklyCautionDayLabel: "페이스 조절이 필요한 날",
    loadErrorText: "운세를 불러오지 못했어요.",
    overviewLabel: "총론",
    wealthLabel: "재물운",
    loveLabel: "애정운",
    healthLabel: "건강운",
    luckyPointLabel: "오늘의 행운 포인트",
    luckyColorLabel: "행운의 색",
    luckyNumberLabel: "행운의 숫자",
    luckyDirectionLabel: "행운의 방향",
  },

  dailyInsight: {
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
    default: ["오늘 하루도 당신의 오행 균형을 살펴보는 시간을 가져보세요. 사주는 정해진 운명이 아니라 흐름을 읽는 지도예요."],
  },

  moduleSelect: {
    badge: "심리테스트",
    heading: "어떤 심리테스트를 진행할까요?",
  },

  quiz: {
    nextButton: "다음",
    doneHeader: "첫 블루프린트가 완성됐어요",
    elementBadgePrefix: "오행 ·",
    moreDetail: "더 자세한 분석(오행 궁합, 성향 상세, 상담 대화 기반 인사이트)은 AI 상담을 마친 뒤 리포트에서 확인하실 수 있어요.",
    continueToChatButton: "AI 상담으로 이어가기",
    restartButton: "다시 풀기",
    combinedTypeSuffix: "복합형",
    combinedTypeHook: "여러 성향이 함께 나타나는 패턴입니다.",
    progressLabel: (current: number, total: number) => `${current} / ${total}`,
  },

  chat: {
    headerLabel: "무료 AI 상담",
    inputPlaceholder: "편하게 이야기해주세요",
    doneBadge: "상담 종료 — 리포트를 준비하고 있어요",
    errorDefault: "챗봇 응답을 받아오지 못했습니다.",
    errorNetwork: "네트워크 오류로 챗봇 응답을 받지 못했습니다.",
    timeUpLabel: "정리 중",
    finishEarlyButton: "충분히 상담했어요",
    checkpointContinueButton: "조금 더 이야기할게요",
    checkpointFinishButton: "여기서 마무리할게요",
  },

  qa: {
    headerLabel: "사주 Q&A · AI 답변",
    subscriptionPriceLabel: "월 $19.99",
    defaultNickname: "회원",
    greeting1: (nickname: string) => `안녕하세요, ${nickname}님!`,
    greeting2: "Fatesaid는 한국에서 온 사주 전문가와 심리 전문가로 이루어진 팀이에요.",
    promptCategory: "궁금한 거 편하게 물어보세요. 관심 있는 주제를 골라주세요.",
    askOneMore: "질문 1개 더 골라볼까요?",
    limitReached1: "오늘의 무료 질문을 다 쓰셨어요. 내일 다시 질문할 수 있어요.",
    limitReached2: (price: string, limit: number) => `지금 ${price}에 구독하면 하루 ${limit}개까지 질문할 수 있어요.`,
    errorDefault: "답변을 가져오지 못했습니다.",
    errorNetwork: "네트워크 오류로 답변을 가져오지 못했습니다.",
    subcategoryHeading: "궁금한 질문을 골라주세요",
    categoryHeading: "더 자세히 골라주세요",
    subscribeButton: "구독하기",
    subscribing: "처리 중...",
    restoreButton: "구매 복원",
    restoring: "복원 중...",
    subscribeSuccess: (limit: number) => `구독이 시작됐어요! 이제 하루 ${limit}개까지 질문할 수 있어요.`,
    restoreSuccess: (limit: number) => `구독을 복원했어요! 이제 하루 ${limit}개까지 질문할 수 있어요.`,
    restoreNotFound: "복원할 구독을 찾지 못했어요.",
    purchaseErrorDefault: "결제 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.",
  },

  report: {
    loadingMessages: ["사주와 심리검사를 통합하고 있어요...", "당신만의 이야기를 쓰고 있어요...", "거의 다 됐어요..."],
    errorDefault: "리포트를 생성하지 못했습니다.",
    errorNetwork: "네트워크 오류로 리포트를 생성하지 못했습니다.",
    homeLinkLabel: "홈으로",
    homeButtonLabel: "홈으로 돌아가기",
    nicknameSuffix: "님",
    previewLabel: "PREVIEW",
    totalPagesLabel: (n: number) => `${n} PAGES`,
    tocEyebrow: "목차",
    tocTitle: "이 리포트에서\n다룰 이야기",
    sectionOpeningScene: "어느 밤의 장면",
    sectionCaseStudy: "닮은 이야기 하나",
    sectionQuizAnalysisToc: "심리테스트 분석",
    quizAnalysisSuffix: "분석",
    defaultModuleTitle: "심리테스트",
    sectionSajuPattern: "무엇이 이 패턴을 만들었나",
    sectionSajuPatternSubtitle: "사주 원국 분석",
    sectionUpcomingPeriod: "다가오는 시기",
    upcomingPeriodNote: "대운(大運) 데이터 기반 — 사주 원국의 10년 단위 장기 흐름을 함께 봅니다.",
    sectionCrossAnalysisToc: "심리검사 교차분석",
    sectionStrengthsWeaknessesToc: "강점과 취약점",
    sectionBehaviorMindsetToc: "행동 지침과 마음가짐",
    tocClosing: "마무리",
    sectionChatStory: "직접 나눈 이야기",
    chatRepeatPatternEyebrow: "반복되는 패턴",
    chatCoreFearEyebrow: "유독 힘든 이유",
    chatSnapshotEyebrow: "지금 이 순간",
    chatConcernLabel: "가장 걸리는 것",
    chatEmotionLabel: "느껴진 감정",
    chatTriggerEyebrow: "그 사건",
    quizAnswerEyebrow: (dimensionLabel: string) => `실제로 답하신 문항 · ${dimensionLabel}`,
    sectionAnswerQuotesToc: "실제 응답 인용",
    chatStoryIntro: "사주와 심리검사가 구조를 보여준다면, 방금 나눈 대화는 지금 이 순간의 실제 결을 보여줍니다.",
    chatQuoteLabel: "상담 중 나온 이야기",
    chatStoryBodyPrefix: "직접 나눈 대화에서도",
    chatStoryBodyMiddle: "쪽 고민이 선명하게 드러났고, 그 안에 담긴 감정은",
    chatStoryBodySuffix: "에 가까웠습니다.",
    sectionCrossAnalysis: "사주와 심리검사가 같은 이야기를 하는 지점",
    breatherLabel: "잠깐, 심리학 상식 하나",
    takeawayBold: "기억할 한 가지 ·",
    sectionStrengths: "강점",
    sectionWeaknesses: "취약점 및 주의할 점",
    sectionFit: "당신에게 맞는 일·환경",
    fitGoodLabel: "이런 환경을 찾으세요",
    fitBadLabel: "이런 환경은 피하세요",
    sectionBehaviorGuides: "어떻게 행동하면 좋을까",
    sectionMindset: "어떻게 생각하면 편해질까",
    disclaimer1:
      "이 리포트는 자체 구축한 만세력 엔진의 정밀 사주 계산을 바탕으로 AI가 해석·작성한 콘텐츠이며, 전문적인 심리 상담이나 의학적 진단을 대체하지 않습니다.",
    disclaimer2: "재미와 자기 이해를 위한 참고 자료로 봐주세요.",
    paywallTitle: "여기부터는 심층 리포트예요",
    paywallBody: "대화 인용 분석, 사주×심리 교차분석, 강점·약점, 맞는 환경, 행동 지침까지 — 이 리포트의 핵심 조언이 이어집니다.",
    paywallPriceSuffix: "에 전체 보기",
    paywallBundle: (remaining: number, price: string, discountPercent: number) =>
      `남은 ${remaining}개 리포트를 한번에 보면 ${price} (${discountPercent}% 할인)`,
    paywallComingSoon: "결제 기능은 준비 중이에요",
  },
};
