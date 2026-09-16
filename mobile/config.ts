// Points at the live production API — this Expo project has no dev-server wiring of its
// own, and a phone running Expo Go can't reach this machine's localhost:3000 anyway
// without matching Wi-Fi + the right LAN IP. Using the real deployed backend means the
// verification-code screen is a genuine end-to-end test of the web→app handoff, not a
// mock.
export const API_BASE_URL = "https://www.fatesaidapp.com";

// RevenueCat's public/client SDK keys — safe to ship inside the app bundle, same as any
// other client-side API key (unlike a "Secret"/server key, which must never go here).
// RevenueCat issues a SEPARATE key per platform app (not one shared key) — see
// lib/purchases.ts, which picks the right one per Platform.OS.
//
// 2026-09-16: the app was shipping with the "Test Store" key (test_...) on every
// platform, including this store-distribution build. RevenueCat's SDK detects that
// mismatch and hard-crashes with "Wrong API Key" to protect against fake test purchases
// slipping into a real build — caught via real-device testing on the Play Store closed
// track. The Android app+key didn't exist in RevenueCat before this (Play was never
// actually connected — the earlier "successful" Android subscription in testing was the
// Test Store faking it, not a real Play Billing purchase). iOS was already correctly
// wired to its own "fatesaid (App Store)" key.
export const REVENUECAT_API_KEY_IOS = "appl_VyGKriZvKyBTrmBbsVTMdvsivMO";
export const REVENUECAT_API_KEY_ANDROID = "goog_HGmvSPyyjAROakHxzAnlgKZIHOy";
