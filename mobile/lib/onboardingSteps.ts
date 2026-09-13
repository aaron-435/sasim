// Ordered onboarding progress steps — mirrors web's PROGRESS_STEP_IDS in
// components/OnboardingWizard.jsx (STEP_IDS minus "intro"). Keep both in sync.
export const ONBOARDING_STEP_IDS = ["nickname", "gender", "dob", "tob", "city"] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEP_IDS)[number];

export const ONBOARDING_STEP_INDEX: Record<OnboardingStepId, number> = Object.fromEntries(
  ONBOARDING_STEP_IDS.map((id, i) => [id, i])
) as Record<OnboardingStepId, number>;
