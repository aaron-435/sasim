// Report purchase state — placeholder until real IAP is wired (see reportPricing.ts's
// header comment and [[project-fatesaid-native-app-progress]]). Always reports "nothing
// owned" for now; swap these two functions for real entitlement lookups (local cache of
// a server-verified purchase, or a StoreKit/Billing receipt check) once payment exists.
// Everything else in the paywall UI is already written against this interface, so wiring
// real data later is a two-function change, not a UI rewrite.
export function isReportUnlocked(_moduleId: string): boolean {
  return false;
}

export function ownedReportCount(): number {
  return 0;
}
