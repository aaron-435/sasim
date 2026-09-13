/**
 * lib/i18n/en.ts
 * ------------------------------------------------------------------
 * Full English translation, added 2026-09-13 once web needed to be
 * ad-ready for non-Korean traffic (replacing the old `export const en =
 * ko;` placeholder — see git history). Vocabulary for shared concepts
 * (element names, zodiac signs, onboarding field labels, free-tier
 * copy) is kept identical to mobile/lib/i18n/en.ts on purpose, since
 * both surfaces describe the same product to the same audience.
 * ------------------------------------------------------------------
 */

import type { ko } from "./ko";

export const en: typeof ko = {
  common: {
    brand: "Fatesaid",
    errorTitleNetwork: "Connection trouble",
    errorTitleServer: "Something went wrong",
    retryNetwork: "Please refresh",
    retryServer: "Try again",
    elementLabels: {
      wood: "Wood",
      fire: "Fire",
      earth: "Earth",
      metal: "Metal",
      water: "Water",
    },
  },

  onboarding: {
    headlineLine1: "Your fate has already spoken.",
    headlineLine2: "Now it's your turn to answer.",
    subheadline: "Want to change your fate? Analyze your saju and start now.",
    introStartButton: "Get Started",
    stepOf: (current: number, total: number) => `STEP ${current} / ${total}`,
    backButton: "Back",
    nextButton: "Next",
    labelNickname: "What should we call you?",
    nicknameSubtext: "We'll use this name for your results.",
    nicknamePlaceholder: "Enter a nickname",
    trackRomance: "Romance & Attachment",
    trackCareer: "Career & Burnout",
    labelDob: "Date of birth",
    yearPlaceholder: "YYYY",
    monthPlaceholder: "MM",
    dayPlaceholder: "DD",
    labelTob: "Time of birth",
    unknownTime: "Unknown",
    hourPlaceholder: "HH",
    minutePlaceholder: "MM",
    periodAM: "AM",
    periodPM: "PM",
    labelGender: "Gender",
    male: "Male",
    female: "Female",
    labelCity: "Birth city (searchable worldwide)",
    cityPlaceholder: "Enter a city name",
    citySearching: "Searching...",
    submitButton: "See My Saju",
    freeNote: "Free 10-minute reading · No credit card needed",
    ageNoticePrefix: "You must be 14 or older to use this app. By continuing, you agree to the",
    ageNoticeAnd: "and",
    ageNoticeSuffix: ".",
    termsLinkLabel: "Terms of Service",
    privacyLinkLabel: "Privacy Policy",
    errorDefault: "We couldn't calculate your saju.",
    errorNetwork: "A network error kept us from calculating your saju.",
    zodiac: {
      capricorn: "Capricorn", aquarius: "Aquarius", pisces: "Pisces", aries: "Aries",
      taurus: "Taurus", gemini: "Gemini", cancer: "Cancer", leo: "Leo",
      virgo: "Virgo", libra: "Libra", scorpio: "Scorpio", sagittarius: "Sagittarius",
    },
  },

  loading: {
    messages: [
      "Plotting your birth date and time on the calendar",
      "Calculating your Five Elements distribution",
      "Drawing your saju chart",
      "Almost there",
    ],
  },

  quiz: {
    devModeBadge: "Dev mode — fixed SAZU sandbox sample data",
    nextButton: "Next",
    doneHeader: "Your first blueprint is ready",
    dominantElementPrefix: "Dominant saju element",
    moreDetail: "A deeper analysis (element compatibility, detailed traits, counseling-based insights) is available in your report once you finish AI counseling.",
    shareButton: "Share",
    shareCopied: "Copied",
    continueToChatButton: "Continue to AI Counseling",
    restartButton: "Retake (demo)",
    combinedTypeSuffix: "Combined Type",
    combinedTypeHook: "A pattern where several tendencies show up together.",
    progressLabel: (current: number, total: number) => `${current} / ${total}`,
  },

  chat: {
    headerLabel: "Free AI Counseling",
    inputPlaceholder: "Feel free to share what's on your mind",
    sendAriaLabel: "Send message",
    doneBadge: "Session ended — preparing your report",
    errorDefault: "We couldn't get a response from the chatbot.",
    errorNetwork: "A network error kept us from getting a chatbot response.",
    timeUpLabel: "Wrapping up",
    finishEarlyButton: "I've shared enough",
    introLines: [
      "Based on what you've just shared, let's start the real counseling session now.",
      "Keeping a few things in mind will help you get a much more accurate report once we're done.",
      "Every question has a reason, so answer freely and honestly — this conversation is run by AI and kept completely private, so there's nothing to worry about.",
      "There are several questions because your answers together become the conclusion of the final report. Stay relaxed and keep going until the end.",
    ],
  },

  qa: {
    headerLabel: "Saju Q&A · AI Answer",
    defaultNickname: "there",
    greeting1: (nickname: string) => `Hi, ${nickname}!`,
    greeting2: "Fatesaid is a team of saju and psychology experts from Korea.",
    promptCategory: "Ask anything that's on your mind — pick a topic you're curious about.",
    analyzing: "Just a moment, analyzing your question through your saju...",
    askOneMore: "Want to pick one more question?",
    installPitch: "That's all the free questions for now. Save the code below — once the app launches, you can pick up right where you left off!",
    codeMessage: (code: string) => `Save this verification code: ${code}\nEnter it once the app launches and you'll pick up exactly where you left off!`,
    codeErrorFallback: "There was a problem issuing your verification code. Please try again shortly.",
    appComingSoonLabel: "The app is coming soon",
    doneBadge: "You've used all your free questions",
    errorDefault: "We couldn't get an answer.",
    errorNetwork: "A network error kept us from getting an answer.",
    backButton: "Back",
    subcategoryHeading: "Choose in more detail",
    questionHeading: "Pick a question you're curious about",
  },

  moduleSelect: {
    badge: "Test module picker",
    heading: "Which personality test would you like to take?",
  },

  report: {
    disclaimer: "This report is reference material intended to support self-understanding. It is not a medical or psychological diagnosis and does not substitute for professional counseling.",
    generatedNote: "This report was written by AI, combining precise saju calculations from our own manseryeok engine with your personality test results and counseling conversation. The person in the example scenario is a fictional illustration used for clarity.",
    loadingMessages: [
      "Unfolding your saju chart again",
      "Layering your assessment results over your Five Elements",
      "Putting it into words that are yours alone",
      "Almost there",
    ],
    errorDefault: "We couldn't generate your report.",
    errorNetwork: "A network error kept us from generating your report.",
  },

  legal: {
    backLink: "Back",
    effectiveDatePrefix: "Effective date",
    draftNoticePrivacy: "This policy is a draft for the Service's beta operation and will be reviewed by legal counsel before the Service's formal launch.",
    draftNoticeTerms: "These Terms are a draft for the Service's beta operation and will be reviewed by legal counsel before the Service's formal launch.",
  },

  meta: {
    siteTitle: "Fatesaid",
    siteDescription: "Free personality analysis combining saju, personality tests, and AI counseling",
    privacyPageTitle: "Privacy Policy | Fatesaid",
    termsPageTitle: "Terms of Service | Fatesaid",
  },
};
