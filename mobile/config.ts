// Points at the live production API — this Expo project has no dev-server wiring of its
// own, and a phone running Expo Go can't reach this machine's localhost:3000 anyway
// without matching Wi-Fi + the right LAN IP. Using the real deployed backend means the
// verification-code screen is a genuine end-to-end test of the web→app handoff, not a
// mock.
export const API_BASE_URL = "https://www.fatesaidapp.com";

// RevenueCat's public/client SDK key (2026-09-13) — safe to ship inside the app bundle,
// same as any other client-side API key (unlike a "Secret"/server key, which must never
// go here). One key works across iOS/Android for this project. See lib/purchases.ts.
export const REVENUECAT_API_KEY = "test_DrovqVbEQIlXDWSZSSyHqeRWWko";
