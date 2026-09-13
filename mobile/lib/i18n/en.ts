import type { ko } from "./ko";

export const en: typeof ko = {
  common: {
    brand: "Fatesaid",
    backLabel: "Back",
    nextLabel: "Next",
    retryLabel: "Try again",
    elementLabels: {
      wood: "Wood",
      fire: "Fire",
      earth: "Earth",
      metal: "Metal",
      water: "Water",
    },
    zodiacLabels: {
      capricorn: "Capricorn",
      aquarius: "Aquarius",
      pisces: "Pisces",
      aries: "Aries",
      taurus: "Taurus",
      gemini: "Gemini",
      cancer: "Cancer",
      leo: "Leo",
      virgo: "Virgo",
      libra: "Libra",
      scorpio: "Scorpio",
      sagittarius: "Sagittarius",
    },
  },

  language: {
    heading: "Choose your language",
    subtext: "You can change this later in settings.",
  },

  intro: {
    headlineLine1: "Your fate has already spoken.",
    headlineLine2: "Now it's your turn to answer.",
    subheadline: "Want to change your fate? Analyze your saju and start now.",
    freeNote: "Free 10-minute reading · No credit card needed",
    ageNoticePrefix: "You must be 14 or older to use this app · By continuing, you agree to the",
    ageNoticeAnd: "and",
    ageNoticeSuffix: "",
    termsLinkLabel: "Terms of Service",
    privacyLinkLabel: "Privacy Policy",
  },

  verifyCode: {
    heading: "Have a verification code?",
    subtext:
      "If you did the Q&A on the web, enter the 6-digit code you were given there to pick up right where you left off.",
    placeholder: "000000",
    skipLabel: "No code, start fresh",
    errorDefault: "This code is invalid or has already been used.",
    errorNetwork: "A network error kept us from checking your code.",
  },

  nickname: {
    heading: "What should we call you?",
    subtext: "We'll use this name for your results.",
    placeholder: "Enter a nickname",
  },

  gender: {
    heading: "Gender",
    male: "Male",
    female: "Female",
  },

  dob: {
    heading: "Date of birth",
    yearPlaceholder: "YYYY",
    monthPlaceholder: "MM",
    dayPlaceholder: "DD",
    ageWarning: (minAge: number) => `Sorry, you must be ${minAge} or older to use this app.`,
  },

  tob: {
    heading: "Time of birth",
    unknownTime: "Unknown",
    hourPlaceholder: "HH",
    minutePlaceholder: "MM",
    periodAM: "AM",
    periodPM: "PM",
  },

  city: {
    heading: "Birth city (searchable worldwide)",
    placeholder: "Enter a city name",
    noResultsHint:
      "No results found. Since your birth timezone matters most for saju calculations, it's fine to search a nearby major city in the same timezone instead — your capital, or another well-known city near you.",
    errorDefault: "We couldn't calculate your saju.",
    errorNetwork: "A network error kept us from calculating your saju.",
  },

  home: {
    greeting: (nickname: string) => `Hi, ${nickname}`,
    elementBadgePrefix: "Element ·",
    elementDistribution: "My Five-Element Balance",
    dailyInsightLabel: "Today's Insight",
    explainerSectionLabel: "How to make the most of your saju",
    explainerHeading1: "What is Saju (Four Pillars)?",
    explainerBody1:
      "Saju (四柱) reads the energy in the four pillars of your birth — year, month, day, and hour — through the five elements (wood, fire, earth, metal, water) to interpret your innate tendencies and life patterns. Rather than a fixed fate to predict, it's best used as a tool for understanding your own balance and getting to know yourself better.",
    explainerHeading2: "Try it this way",
    explainerBody2:
      "Start by asking one question that's on your mind right now in Saju Q&A. Then take the psych test to diagnose your tendencies and patterns — combining your element data with psychological data gives you a much richer picture. Once you finish the test, you'll naturally move into an AI counseling session, and afterward you'll get your own in-depth report weaving together everything you've shared so far.",
    featuresSectionLabel: "What would you like to do?",
    featureQaLabel: "Saju Q&A",
    featureQaDescription: "Got a question? Ask it right now",
    featureQuizLabel: "Psych Test",
    featureQuizDescription: "The first step to understanding yourself",
    featureChatLabel: "AI Counseling",
    featureChatDescription: "Available after finishing the psych test",
    featureReportLabel: "In-Depth Report",
    featureReportDescription: "Available after finishing the psych test",
    recentQuestionLabel: "Recent Question",
    recentQuestionEmpty: "No questions yet · Ask your first one",
  },

  dailyInsight: {
    wood: [
      "Today has an especially good flow for starting something new. Even a small plan planted today will grow well. Working with others also leads to good outcomes today.",
      "Your urge to grow gets a natural boost today. The more flexibly you think, the clearer the path looks — take your time instead of rushing.",
      "Good timing to start something you've been putting off. Today you'll feel in your bones that a first step matters more than a perfect plan.",
    ],
    fire: [
      "You don't need to hide what you want to say today. Reaching out first works in your favor, and with all that energy, remember to take a short break too.",
      "Your passion comes through naturally today. Don't just let that spark of excitement pass — write it down, it could be a big hint later.",
      "The more actively you move, the better the response you'll get today. Just watch that emotions don't get ahead of you — pausing a beat before you speak helps.",
    ],
    earth: [
      "Steadying yourself without overdoing it is today's answer. Opening up to someone you trust helps, and keeping even small promises builds real trust.",
      "Sorting things out step by step will lighten your mind. Today, be the one who brings stability — that's ultimately what protects you too.",
      "Better to sit on a decision for a day than rush it. The patience you show today will come back as a much sturdier result later.",
    ],
    metal: [
      "When a decision is needed, push through on principle. Drawing a clear line actually brings comfort today, and your judgment is sharper than usual.",
      "A good flow for tackling things you've been putting off. Tell yourself it's okay not to be perfect, and wrap things up lightly today.",
      "A good day to balance principle and flexibility. Keep the standard you've set, but give the other side's view a listen too.",
    ],
    water: [
      "The deeper your thoughts go, the less you need to rush. You may especially need time alone today — don't force yourself to fill it.",
      "Your intuition lands pretty accurately today. Riding the flow is a strategy in itself, so you don't have to explain the feelings you had today.",
      "Even without showing it, a lot gets sorted out inside you today. You can quietly trust the conclusion you reach.",
    ],
    default: ["Take a moment today to check in on your own elemental balance. Saju isn't a fixed fate — it's a map for reading the flow."],
  },

  moduleSelect: {
    badge: "Psych Test",
    heading: "Which psych test would you like to take?",
  },

  quiz: {
    nextButton: "Next",
    doneHeader: "Your first blueprint is ready",
    elementBadgePrefix: "Element ·",
    moreDetail: "A deeper analysis (element compatibility, detailed traits, counseling-based insights) is available in your report once you finish AI counseling.",
    continueToChatButton: "Continue to AI Counseling",
    restartButton: "Retake",
    combinedTypeSuffix: "Combined Type",
    combinedTypeHook: "A pattern where several tendencies show up together.",
    progressLabel: (current: number, total: number) => `${current} / ${total}`,
  },

  chat: {
    headerLabel: "Free AI Counseling",
    inputPlaceholder: "Feel free to share what's on your mind",
    doneBadge: "Session ended — preparing your report",
    errorDefault: "We couldn't get a response from the chatbot.",
    errorNetwork: "A network error kept us from getting a chatbot response.",
    timeUpLabel: "Wrapping up",
    finishEarlyButton: "I've shared enough",
  },

  qa: {
    headerLabel: "Saju Q&A",
    subscriptionPriceLabel: "$19/month",
    defaultNickname: "there",
    greeting1: (nickname: string) => `Hi, ${nickname}!`,
    greeting2: "Fatesaid is a team of saju and psychology experts from Korea.",
    promptCategory: "Ask anything that's on your mind — pick a topic you're curious about.",
    askOneMore: "Want to pick one more question?",
    limitReached1: "You've used up today's free questions. You can ask again tomorrow.",
    limitReached2: (price: string, limit: number) => `We're working on a feature that lets ${price} subscribers ask up to ${limit} questions a day.`,
    errorDefault: "We couldn't get an answer.",
    errorNetwork: "A network error kept us from getting an answer.",
    subcategoryHeading: "Pick the question you're curious about",
    categoryHeading: "Narrow it down a bit more",
  },

  report: {
    loadingMessages: ["Integrating your saju and psych test results...", "Writing your own story...", "Almost there..."],
    errorDefault: "We couldn't generate your report.",
    errorNetwork: "A network error kept us from generating your report.",
    homeLinkLabel: "Home",
    homeButtonLabel: "Back to Home",
    nicknameSuffix: "",
    sectionOpeningScene: "A Scene From One Night",
    sectionCaseStudy: "A Story Like Yours",
    quizAnalysisSuffix: "Analysis",
    defaultModuleTitle: "Psych Test",
    sectionSajuPattern: "What Shaped This Pattern",
    sectionSajuPatternSubtitle: "Saju Chart Analysis",
    sectionChatStory: "What Came Up In Your Own Words",
    chatStoryIntro: "If your saju and psych test show the structure, the conversation you just had shows the real texture of this moment.",
    chatQuoteLabel: "From your counseling session",
    chatStoryBodyPrefix: "In our conversation, your concern around",
    chatStoryBodyMiddle: "came through clearly, and the feeling underneath it was closest to",
    chatStoryBodySuffix: ".",
    sectionCrossAnalysis: "Where Your Saju And Psych Test Tell The Same Story",
    breatherLabel: "A quick bit of psychology",
    takeawayBold: "One thing to remember ·",
    sectionStrengths: "Strengths",
    sectionWeaknesses: "Weak Points To Watch",
    sectionFit: "Work & Environments That Fit You",
    fitGoodLabel: "Look for environments like this",
    fitBadLabel: "Avoid environments like this",
    sectionBehaviorGuides: "How To Act On This",
    sectionMindset: "A Mindset That Might Help",
    disclaimer1:
      "This report is AI-interpreted content based on precise saju calculations from our own manseryeok engine, and does not replace professional psychological counseling or medical diagnosis.",
    disclaimer2: "Please treat it as a reference for fun and self-understanding.",
    paywallTitle: "The in-depth report continues here",
    paywallBody: "Chat-quote analysis, saju × psychology cross-analysis, strengths and weaknesses, environments that fit you, and behavior guides — the report's core advice continues below.",
    paywallPriceSuffix: "to unlock the full report",
    paywallBundle: (remaining: number, price: string) => `See your remaining ${remaining} reports together for ${price} (25% off)`,
    paywallComingSoon: "Payments are coming soon",
  },
};
