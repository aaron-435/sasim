// Points at the live production API — this Expo project has no dev-server wiring of its
// own, and a phone running Expo Go can't reach this machine's localhost:3000 anyway
// without matching Wi-Fi + the right LAN IP. Using the real deployed backend means the
// verification-code screen is a genuine end-to-end test of the web→app handoff, not a
// mock.
export const API_BASE_URL = "https://www.fatesaidapp.com";
