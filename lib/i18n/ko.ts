/**
 * lib/i18n/ko.ts
 * ------------------------------------------------------------------
 * Source-of-truth dictionary — every UI string used across
 * OnboardingWizard/QuizScreen(chrome)/ChatScreen/ModuleSelect/
 * ErrorNotice/LoadingReveal/LegalPage/app layout metadata, keyed by
 * screen. This is the ONLY locale fully populated today (see
 * lib/i18n/README.md) — en.ts/es.ts mirror this shape but currently
 * just re-export it verbatim as a placeholder.
 *
 * Deliberately NOT covered here (see README for why):
 *   - lib/chatPrompts.ts (GPT system prompts — safety-critical content,
 *     needs careful dedicated translation, not mechanical key-swapping)
 *   - lib/quizProfile.ts's generateNuancedSummary/generateFollowUpPrompt
 *     (Korean particle (은/는/이/가) grammar composition — needs its own
 *     per-language sentence-building logic, not a string swap)
 *   - The 11 module question banks (lib/module1Attachment.ts etc. —
 *     330 questions, still being revised per the user) and
 *     lib/modules.ts's title/subtitle/dimensionShortNames
 *   - ReportScreen.jsx's demo narrative body (placeholder content
 *     pending the real per-module report feature — only its closing
 *     disclaimer, which will likely survive into the real product, is
 *     included below under `report`)
 * ------------------------------------------------------------------
 */

export const ko = {
  common: {
    brand: "Fatesaid",
    errorTitleNetwork: "연결이 원활하지 않아요",
    errorTitleServer: "문제가 발생했어요",
    retryNetwork: "새로고침 해주세요",
    retryServer: "다시 시도",
    elementLabels: {
      wood: "목(木)",
      fire: "화(火)",
      earth: "토(土)",
      metal: "금(金)",
      water: "수(水)",
    },
  },

  onboarding: {
    headlineLine1: "운명은 이미 말했습니다.",
    headlineLine2: "이제 당신이 답할 차례입니다.",
    subheadline: "운명을 바꾸고 싶나요? 사주를 분석하고 지금 시작하세요.",
    introStartButton: "시작하기",
    stepOf: (current: number, total: number) => `STEP ${current} / ${total}`,
    backButton: "이전",
    nextButton: "다음",
    labelNickname: "뭐라고 불러 드릴까요?",
    nicknameSubtext: "이 이름으로 결과를 안내해 드릴게요.",
    nicknamePlaceholder: "닉네임을 입력하세요",
    trackRomance: "연애 & 애착",
    trackCareer: "커리어 & 번아웃",
    labelDob: "생년월일",
    yearPlaceholder: "YYYY",
    monthPlaceholder: "MM",
    dayPlaceholder: "DD",
    labelTob: "태어난 시간",
    unknownTime: "모름",
    hourPlaceholder: "시",
    minutePlaceholder: "분",
    periodAM: "오전",
    periodPM: "오후",
    labelGender: "성별",
    male: "남성",
    female: "여성",
    labelCity: "출생 도시 (전세계 검색 가능)",
    cityPlaceholder: "도시 이름을 입력하세요",
    citySearching: "검색 중...",
    submitButton: "사주 확인하러 가기",
    freeNote: "무료 10분 리딩 · 신용카드 불필요",
    ageNoticePrefix: "만 14세 이상만 이용할 수 있으며, 계속 진행 시",
    ageNoticeAnd: "및",
    ageNoticeSuffix: "에 동의하는 것으로 간주됩니다.",
    termsLinkLabel: "이용약관",
    privacyLinkLabel: "개인정보처리방침",
    errorDefault: "사주 계산에 실패했습니다.",
    errorNetwork: "네트워크 오류로 사주 계산에 실패했습니다.",
    zodiac: {
      capricorn: "염소자리", aquarius: "물병자리", pisces: "물고기자리", aries: "양자리",
      taurus: "황소자리", gemini: "쌍둥이자리", cancer: "게자리", leo: "사자자리",
      virgo: "처녀자리", libra: "천칭자리", scorpio: "전갈자리", sagittarius: "사수자리",
    },
  },

  loading: {
    messages: [
      "생년월일시를 만세력에 대입하고 있어요",
      "오행 분포를 계산하고 있어요",
      "사주 원국을 그리고 있어요",
      "거의 다 됐어요",
    ],
  },

  quiz: {
    devModeBadge: "개발 모드 — SAZU 샌드박스 고정 샘플 데이터",
    nextButton: "다음",
    doneHeader: "첫 블루프린트가 완성됐어요",
    dominantElementPrefix: "사주 우세 오행",
    moreDetail: "더 자세한 분석(오행 궁합, 성향 상세, 상담 대화 기반 인사이트)은 AI 상담을 마친 뒤 리포트에서 확인하실 수 있어요.",
    shareButton: "공유하기",
    shareCopied: "복사됐어요",
    continueToChatButton: "AI 상담으로 이어가기",
    restartButton: "다시 풀기 (데모용)",
    combinedTypeSuffix: "혼합형",
    combinedTypeHook: "여러 성향이 함께 나타나는 패턴입니다.",
    progressLabel: (current: number, total: number) => `${current} / ${total}`,
  },

  chat: {
    headerLabel: "무료 AI 상담",
    inputPlaceholder: "편하게 이야기해주세요",
    sendAriaLabel: "메시지 보내기",
    doneBadge: "상담 종료 — 리포트를 준비하고 있어요",
    errorDefault: "챗봇 응답을 받아오지 못했습니다.",
    errorNetwork: "네트워크 오류로 챗봇 응답을 받지 못했습니다.",
    timeUpLabel: "정리 중",
    finishEarlyButton: "충분히 상담했어요",
    // 2026-09-11: 사용자가 처음 상담을 시작할 때만 보여주는 안내 멘트.
    // components/ChatScreen.jsx가 localStorage 플래그로 최초 1회만 노출한다.
    introLines: [
      "방금 알려주신 내용을 바탕으로 이제 본격적인 상담을 시작할게요.",
      "몇 가지만 함께 지켜주시면, 상담이 끝난 뒤 훨씬 더 정확한 보고서를 받아보실 수 있어요.",
      "질문에는 다 이유가 있으니 편하게, 솔직하게 답해주세요 — 이 대화는 AI가 진행하고 철저히 비공개로 관리되니 걱정하지 않으셔도 돼요.",
      "질문이 여러 개인 이유는 그 답변들이 모여 마지막 보고서의 결론이 되기 때문이에요. 끝까지 편하게 이야기 나눠주세요.",
    ],
  },

  qa: {
    // 2026-09-10: "· AI 답변"을 덧붙임 — Google Play가 2026-04부터 AI 생성
    // 콘텐츠에 대해 앱 인터페이스 내 명시적 라벨을 요구하기 시작했는데,
    // 이 화면(답변 자체가 LLM 생성)에는 그런 표시가 전혀 없었음. ChatScreen은
    // 이미 "무료 AI 상담"으로 라벨링돼 있어 동일한 수준으로 맞춤.
    headerLabel: "사주 Q&A · AI 답변",
    defaultNickname: "회원",
    greeting1: (nickname: string) => `안녕하세요, ${nickname}님!`,
    greeting2: "Fatesaid는 한국에서 온 사주 전문가와 심리 전문가로 이루어진 팀이에요.",
    promptCategory: "궁금한 거 편하게 물어보세요. 관심 있는 주제를 골라주세요.",
    analyzing: "잠시만 기다려주세요, 사주를 통해 질문을 분석중입니다...",
    askOneMore: "질문 1개 더 골라볼까요?",
    // 2026-09-11: 앱이 실제로 출시되기 전까지는 "설치하면"/"설치 후" 같은 표현이
    // 실제 상태와 맞지 않음 — 지금 이 화면은 이미 프로덕션에 배포돼 있어서,
    // 앱 없이 방문한 사용자에게 "설치하러 가기" 버튼(당시엔 href="#")을 보여주는
    // 상태였음. "지금 설치" 대신 "코드를 저장해두면 앱 출시 후 이어진다"는
    // 톤으로 바꿔서, 앱이 나오기 전까지도 문구가 거짓이 되지 않도록 함.
    installPitch: "무료로 준비된 질문은 여기까지예요. 아래 번호를 저장해두시면, 앱이 나온 뒤 이어서 질문하실 수 있어요!",
    codeMessage: (code: string) => `아래 인증번호를 저장해두세요: ${code}\n앱 출시 후 이 번호를 입력하면 지금까지 작성한 정보가 그대로 이어집니다!`,
    codeErrorFallback: "인증번호 발급에 문제가 생겼어요. 잠시 후 다시 시도해주세요.",
    appComingSoonLabel: "앱 출시 준비 중이에요",
    doneBadge: "무료 질문을 모두 사용했어요",
    errorDefault: "답변을 가져오지 못했습니다.",
    errorNetwork: "네트워크 오류로 답변을 가져오지 못했습니다.",
  },

  moduleSelect: {
    badge: "테스트용 모듈 선택",
    heading: "어떤 심리테스트를 진행할까요?",
  },

  report: {
    disclaimer: "이 리포트는 자기 이해를 돕기 위한 참고 자료이며, 의학적·심리학적 진단이 아니고 전문적인 심리상담을 대체하지 않습니다.",
    generatedNote: "본 리포트는 SAZU 사주 데이터, 심리검사 결과, 상담 대화 내용을 결합해 AI로 생성되었습니다. 사례 속 인물은 이해를 돕기 위한 가상의 예시입니다.",
    loadingMessages: [
      "사주 원국을 다시 펼쳐보고 있어요",
      "심리검사 결과와 오행을 겹쳐보고 있어요",
      "당신만의 문장으로 정리하고 있어요",
      "거의 다 됐어요",
    ],
    errorDefault: "리포트를 생성하지 못했습니다.",
    errorNetwork: "네트워크 오류로 리포트를 생성하지 못했습니다.",
  },

  legal: {
    backLink: "돌아가기",
    effectiveDatePrefix: "시행일자",
    draftNoticePrivacy: "본 방침은 서비스 베타 운영을 위한 초안이며, 정식 서비스 전환 시 법률 전문가의 검토를 거칠 예정입니다.",
    draftNoticeTerms: "본 약관은 서비스 베타 운영을 위한 초안이며, 정식 서비스 전환 시 법률 전문가의 검토를 거칠 예정입니다.",
  },

  meta: {
    siteTitle: "Fatesaid",
    siteDescription: "사주와 심리테스트, AI 상담을 결합한 무료 성향 분석",
    privacyPageTitle: "개인정보처리방침 | Fatesaid",
    termsPageTitle: "이용약관 | Fatesaid",
  },
};
