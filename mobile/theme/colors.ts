// "Celadon & Hanji" palette — replaces the earlier "Obsidian & Gold" look (web's inline
// styles in components/OnboardingWizard.jsx are still on the old palette; update both
// sides together if/when web follows). `gold` is a historical key name kept to avoid
// renaming it across every screen file — it now holds the celadon jade accent, not gold.
export const COLORS = {
  background: "#122019",
  headline: "#D9C9A3",
  subheadline: "#9C9277",
  gold: "#6FA98B",
  ctaText: "#0F1A15",
  // 2026-09-19: was #756B54 (3.2:1 on background) and used for real text on
  // Home, Fortune and Report — raised to pass 4.5:1 on the background and on cards.
  footer: "#A89D82",
  // Error / destructive text: #CB6249 was 3.6-4.0:1 on cards; this passes 4.5:1.
  danger: "#E58A70",
  border: "#26332B",
  inputBg: "rgba(255,255,255,0.03)",
  disabledBg: "rgba(255,255,255,0.06)",
  disabledText: "#6E7A72",
};
