// Ordered onboarding progress steps — mirrors web's PROGRESS_STEP_IDS in
// components/OnboardingWizard.jsx (STEP_IDS minus "intro"). Keep both in sync.
// 2026-09-19: "concern"(지금 가장 궁금한 것) 추가 — 앱에만 있고 web엔 없다(web은
// Q&A 리드젠 전용이라 track 활용처인 챗봇/리포트/ModuleSelect가 애초에 없음).
export const ONBOARDING_STEP_IDS = ["nickname", "gender", "dob", "tob", "city", "concern"] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEP_IDS)[number];

export const ONBOARDING_STEP_INDEX: Record<OnboardingStepId, number> = Object.fromEntries(
  ONBOARDING_STEP_IDS.map((id, i) => [id, i])
) as Record<OnboardingStepId, number>;
