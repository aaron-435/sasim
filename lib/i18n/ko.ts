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
      wood: "나무",
      fire: "불",
      earth: "흙",
      metal: "쇠",
      water: "물",
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
    freeNote: "무료로 시작 · 신용카드 불필요",
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
    // 2026-09-13: QASubcategoryPage/QAQuestionPage 자체 화면 문구 — 원래
    // 이 두 컴포넌트에 하드코딩돼 있던 것을 다국어화하며 여기로 옮김.
    backButton: "이전",
    subcategoryHeading: "더 자세히 골라주세요",
    questionHeading: "궁금한 질문을 골라주세요",
  },

  moduleSelect: {
    badge: "테스트용 모듈 선택",
    heading: "어떤 심리테스트를 진행할까요?",
  },

  report: {
    disclaimer: "이 리포트는 자기 이해를 돕기 위한 참고 자료이며, 의학적·심리학적 진단이 아니고 전문적인 심리상담을 대체하지 않습니다.",
    generatedNote: "본 리포트는 자체 구축한 만세력 엔진의 정밀 사주 계산에 심리검사 결과와 상담 대화 내용을 결합하여, AI가 해석·작성했습니다. 사례 속 인물은 이해를 돕기 위한 가상의 예시입니다.",
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

  landing: {
    langLabel: "언어",
    heroTitle: "생년월일로 읽는,\n지금 나의 리듬",
    heroBody: "실제 만세력 계산에 심리학을 더해, 나의 성향과 다가오는 흐름을 3분 만에 보여 드려요. 가입 없이 무료로 시작해요.",
    cta: "내 사주 무료로 보기",
    ctaNote: "가입 없이 · 약 3분 · 생년월일과 태어난 도시만 있으면 돼요",
    trust: "천문 데이터(한국천문연구원)를 바탕으로 직접 계산해요. 지어내지 않아요.",
    featuresTitle: "무엇을 알 수 있나요",
    features: [
      { title: "나의 사주 유형", body: "50가지 유형 중 나는 어떤 사람인지, 타고난 성향과 지금 나를 이끄는 기운으로 보여줘요." },
      { title: "매일의 리듬", body: "오늘, 이번 주, 이번 달, 다가오는 해의 흐름을 '가장 좋은 날'과 '페이스 조절이 필요한 날'로 알려줘요." },
      { title: "나만의 심층 리포트", body: "심리테스트와 AI 상담을 합쳐, 40쪽이 넘는 나만의 리포트를 만들어요." },
    ],
    featuresAppNote: "일부 기능은 앱에서 이용할 수 있어요.",
    calculatorLink: "무료 사주 계산기 써 보기 →",
    sampleTitle: "리포트는 이렇게 생겼어요",
    sampleNote: "예시를 위한 가상 인물의 샘플이에요. 실제 사용자의 결과가 아니에요.",
    samplePage1Label: "어느 밤의 장면",
    samplePage1Body: "퇴근길 지하철에서 휴대폰을 켰다 끄기를 반복한다. 할 일은 분명한데 손이 먼저 움직이지 않는다. 지수님의 요즘은 이런 모습이지 않으신가요.",
    samplePage2Label: "나의 오행",
    samplePage3Label: "강점과 약점",
    samplePage3Locked: "앱에서 열려요",
    elementNames: ["나무", "불", "흙", "쇠", "물"],
    stepsTitle: "이렇게 진행돼요",
    steps: ["생년월일과 태어난 도시를 입력해요", "내 사주 결과를 바로, 무료로 확인해요", "궁금한 질문을 물어보고, 앱에서 더 깊이 읽어요"],
    faqTitle: "자주 묻는 질문",
    faq: [
      { q: "정말 계산한 건가요?", a: "네. 생년월일시와 태어난 도시의 시차·경도까지 반영해 사주 여덟 글자를 계산해요. 결과에 대한 풀이는 AI가 쓰지만, 계산 자체는 지어내지 않아요." },
      { q: "무료인가요?", a: "내 사주 결과와 첫 질문 2개는 무료예요. 더 깊은 리포트와 매일의 운세는 앱에서 열려요." },
      { q: "제 정보는 어떻게 쓰이나요?", a: "가입 없이 이용하고, 개인정보처리방침에 따라 보관하고 삭제할 수 있어요. 이 서비스는 예측이나 진단이 아니라 자기이해를 돕는 읽을거리예요." },
    ],
    appNote: "앱은 곧 iOS와 Android에서 만나요.",
    bottomTitle: "내 리듬, 지금 확인해 볼까요",
  },
  typeCard: {
    title: "생년월일만으로, 내 사주 유형부터",
    body: "10초면 돼요. 50가지 유형 중 나는 어떤 사람인지 먼저 확인해 보세요.",
    dateLabel: "생년월일",
    fieldLabels: { year: "태어난 연도", month: "태어난 월", day: "태어난 일" },
    submit: "내 유형 보기",
    loading: "계산하는 중…",
    invalidDate: "생년월일을 다시 확인해 주세요.",
    error: "지금은 계산하지 못했어요. 잠시 후 다시 시도해 주세요.",
    resultEyebrow: "나의 사주 유형",
    gloss: "50가지 사주 유형 중 하나예요. 앞 단어는 일간에서, 뒤 단어는 사주에서 가장 강한 기운에서 나와요.",
    archetypeLabel: "타고난 나",
    modeLabel: "지금 나를 이끄는 기운",
    celebritiesLabel: "이 유형을 가진 유명인",
    celebrityBirthYear: (year: number) => `${year}년생`,
    noTimeNote: "태어난 시간 없이 계산했어요. 시간과 도시를 넣으면 '지금 나를 이끄는 기운'이 달라질 수 있어요.",
    appTitle: "전체 원국은 앱에서",
    appBody: "네 기둥 그림, 매일의 리듬, 나만의 심층 리포트는 앱에서 열려요. 앱은 곧 iOS와 Android에서 만나요.",
    continueCta: "시간과 도시까지 넣고 자세히 보기",
    again: "다른 생년월일로 보기",
  },
  calculator: {
    metaTitle: "사주 계산기 · 네 기둥(사주팔자) 무료 계산 | Fatesaid",
    metaDescription: "생년월일과 태어난 시간으로 사주 네 기둥, 일간, 오행 분포를 무료로 계산해요. 한국천문연구원 천문 데이터 기반.",
    title: "사주 계산기",
    lead: "생년월일과 태어난 시간으로 사주 네 기둥과 일간, 오행 분포를 바로 계산해요. 무료이고 가입이 필요 없어요.",
    hourLabel: "태어난 시간",
    hourUnknown: "모름",
    hourOption: (h: number) => `${String(h).padStart(2, "0")}:00 – ${String(h).padStart(2, "0")}:59`,
    submit: "계산하기",
    pillarsTitle: "나의 네 기둥",
    pillarNames: { year: "연주", month: "월주", day: "일주", hour: "시주" },
    rowsLegend: "위 칸은 천간, 아래 칸은 지지예요.",
    unknownHour: "시간 모름",
    dayMasterTitle: "일간",
    dayMasterLine: (polarity: string, element: string) => `${element} 기운 · ${polarity}`,
    yang: "양",
    yin: "음",
    dayMasterNote: "일간은 태어난 날의 천간으로, 사주에서 '나'를 대표하는 기운이에요.",
    elementsTitle: "오행 분포",
    elementNames: { wood: "나무", fire: "불", earth: "흙", metal: "쇠", water: "물" },
    cityNote: "태어난 도시 없이 서울 기준 시각으로 계산했어요. 시주는 도시의 경도에 따라 달라질 수 있어요. 앱에서는 태어난 도시까지 반영해요.",
    howTitle: "어떻게 계산하나요",
    howBody: "한국천문연구원 천문 데이터로 절기 경계를 잡고, 태어난 연·월·일·시를 각각 천간과 지지 한 쌍으로 바꿔 여덟 글자를 만들어요. 오행 분포는 그 여덟 글자가 목·화·토·금·수 중 어디에 속하는지 센 비율이에요.",
    appTitle: "풀이와 매일의 흐름은 앱에서",
    appBody: "사주 유형, 매일의 리듬, 심리테스트와 함께 읽는 심층 리포트는 앱에서 열려요. 앱은 곧 iOS와 Android에서 만나요.",
    homeCta: "Fatesaid 홈으로",
  },
  invite: {
    metaTitle: "친구 궁합 | Fatesaid",
    metaDescription: "생년월일을 넣으면 두 사람의 기운이 어떻게 만나는지 바로 보여 드려요.",
    eyebrow: "친구 궁합",
    title: (name: string) => `${name}님이 궁합을 보자고 했어요`,
    titleNoName: "친구가 궁합을 보자고 했어요",
    lead: "생년월일만 넣으면 두 사람의 기운이 어떻게 만나는지 바로 보여 드려요. 가입도 결제도 없어요.",
    nameLabel: "내 이름이나 별명 (선택)",
    namePlaceholder: "비워 두어도 돼요",
    consent: (name: string) => `계산한 결과(일간, 사주 유형)와 위에 적은 이름이 ${name}님 앱에 전해지는 데 동의해요. 생년월일은 저장하지 않아요.`,
    consentNoName: "계산한 결과(일간, 사주 유형)와 위에 적은 이름이 링크를 보낸 사람의 앱에 전해지는 데 동의해요. 생년월일은 저장하지 않아요.",
    consentRequired: "결과를 전하는 데 동의해야 볼 수 있어요.",
    privacyLink: "개인정보 처리방침",
    expiryNote: "이 링크는 만든 날부터 30일 동안 열려요.",
    submit: "궁합 보기",
    resultEyebrow: "두 사람의 궁합",
    me: "나",
    sentNote: (name: string) => `${name}님 앱에도 이 결과가 전해졌어요.`,
    sentNoteNoName: "링크를 보낸 사람의 앱에도 이 결과가 전해졌어요.",
    appTitle: "서로에게 주는 것과 부딪히기 쉬운 지점은 앱에서",
    appBody: "Fatesaid 앱에서는 내 사주 유형, 오늘의 흐름, 두 사람을 더 깊게 읽는 궁합 리포트를 볼 수 있어요. 앱은 곧 iOS와 Android에 나와요.",
    expiredTitle: "기간이 지난 링크예요",
    expiredBody: "초대 링크는 30일 동안만 열려요. 링크를 보낸 사람에게 새 링크를 부탁해 보세요.",
    answeredTitle: "이미 답이 온 링크예요",
    answeredBody: "이 초대에는 한 사람만 답할 수 있어요. 궁합을 보고 싶다면 링크를 보낸 사람에게 새 링크를 부탁해 보세요.",
    notFoundTitle: "링크를 찾을 수 없어요",
    notFoundBody: "주소가 끝까지 복사됐는지 확인해 보세요.",
    unavailableTitle: "지금은 링크를 열 수 없어요",
    unavailableBody: "잠시 후 다시 열어 주세요.",
  },
  meta: {
    siteTitle: "Fatesaid",
    siteDescription: "사주와 심리테스트, AI 상담을 결합한 무료 성향 분석",
    privacyPageTitle: "개인정보처리방침 | Fatesaid",
    termsPageTitle: "이용약관 | Fatesaid",
  },
};
