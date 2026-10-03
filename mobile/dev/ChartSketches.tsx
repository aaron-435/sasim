import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Defs, Line, Pattern, Rect, Text as SvgText, G, Path } from "react-native-svg";
import { useFonts, CormorantGaramond_500Medium } from "@expo-google-fonts/cormorant-garamond";
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { ELEMENT_COLORS, ELEMENT_ORDER } from "../lib/elements";

// DEV ONLY — four-pillars chart sketches for TODO item 7 (SPEC 2026-10-03 §3).
// Opened from index.ts with `?sketch=chart&persona=<key>&lang=<ko|en|es>` on the dev web
// preview. Not a product screen: strings are hard-coded here and move to lib/i18n in item 8.

type Lang = "ko" | "en" | "es";
type El = "wood" | "fire" | "earth" | "metal" | "water";
interface Pillar { sky: string; earth: string; skyElement: string; earthElement: string }
type Pillars = { year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null };

const KO_EL: Record<string, El> = { 목: "wood", 화: "fire", 토: "earth", 금: "metal", 수: "water" };
const STEM_HANJA: Record<string, string> = { 갑: "甲", 을: "乙", 병: "丙", 정: "丁", 무: "戊", 기: "己", 경: "庚", 신: "辛", 임: "壬", 계: "癸" };
const BRANCH_HANJA: Record<string, string> = { 자: "子", 축: "丑", 인: "寅", 묘: "卯", 진: "辰", 사: "巳", 오: "午", 미: "未", 신: "申", 유: "酉", 술: "戌", 해: "亥" };

const T = {
  ko: {
    el: { wood: "나무", fire: "불", earth: "흙", metal: "쇠", water: "물" },
    pillars: { year: "태어난 해", month: "달", day: "날", hour: "시" },
    you: "나",
    youLong: (e: string) => `당신 자신 · ${e}`,
    most: (e: string, p: number) => `가장 많은 기운 · ${e} ${p}%`,
    unknown: "시간 모름",
    count: (n: number, total: number) => `${total}글자 중 ${n}`,
    legendYou: "테두리 = 당신(일간)",
    legendMost: "가장 많은 색 = 가장 강한 기운",
  },
  en: {
    el: { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" },
    pillars: { year: "Year", month: "Month", day: "Day", hour: "Hour" },
    you: "You",
    youLong: (e: string) => `Your core · ${e}`,
    most: (e: string, p: number) => `Most present · ${e} ${p}%`,
    unknown: "Time unknown",
    count: (n: number, total: number) => `${n} of ${total}`,
    legendYou: "Outlined = you (day stem)",
    legendMost: "Most repeated color = strongest element",
  },
  es: {
    el: { wood: "Madera", fire: "Fuego", earth: "Tierra", metal: "Metal", water: "Agua" },
    pillars: { year: "Año", month: "Mes", day: "Día", hour: "Hora" },
    you: "Tú",
    youLong: (e: string) => `Tu esencia · ${e}`,
    most: (e: string, p: number) => `Más presente · ${e} ${p}%`,
    unknown: "Hora desconocida",
    count: (n: number, total: number) => `${n} de ${total}`,
    legendYou: "Con borde = tú (tronco del día)",
    legendMost: "El color que más se repite = elemento más fuerte",
  },
};

const ORDER: (keyof Pillars)[] = ["year", "month", "day", "hour"];
const W = 307; // card inner width at 375pt: 375 - 2×16 gutter - 2×18 padding

// Ties are common (8 characters, 1/8 steps): every element at the top value counts as strongest.
function strongest(elements: Record<string, number>): El[] {
  const max = Math.max(...ELEMENT_ORDER.map((k) => elements[k] ?? 0));
  return ELEMENT_ORDER.filter((k) => (elements[k] ?? 0) === max) as El[];
}
function mostLine(t: (typeof T)[Lang], elements: Record<string, number>): string {
  const top = strongest(elements);
  return t.most(top.map((k) => t.el[k]).join(" · "), Math.round(elements[top[0]] ?? 0));
}

// ── A. Four columns + one stacked bar ───────────────────────────────────────────────
function SketchColumns({ p, elements, lang }: { p: Pillars; elements: Record<string, number>; lang: Lang }) {
  const t = T[lang];
  const colW = 68;
  const gap = (W - colW * 4) / 3;
  const dm = KO_EL[p.day.skyElement];
  const top = strongest(elements);
  return (
    <View>
      <Svg width={W} height={232}>
        <Defs>
          <Pattern id="hatchA" width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <Line x1={0} y1={0} x2={0} y2={6} stroke={COLORS.border} strokeWidth={2} />
          </Pattern>
        </Defs>
        {ORDER.map((key, i) => {
          const x = i * (colW + gap);
          const pillar = p[key];
          const isDay = key === "day";
          return (
            <G key={key}>
              <SvgText x={x + colW / 2} y={14} fill={isDay ? COLORS.headline : COLORS.footer} fontSize={12} fontFamily={FONTS.semibold} textAnchor="middle">
                {t.pillars[key]}
              </SvgText>
              {pillar ? (
                [0, 1].map((row) => {
                  const ko = row === 0 ? pillar.skyElement : pillar.earthElement;
                  const el = KO_EL[ko];
                  const hanja = row === 0 ? STEM_HANJA[pillar.sky] : BRANCH_HANJA[pillar.earth];
                  const y = 26 + row * 82;
                  const you = isDay && row === 0;
                  return (
                    <G key={row}>
                      <Rect x={x} y={y} width={colW} height={74} rx={row === 0 ? colW / 2 : 14} fill={ELEMENT_COLORS[el]} fillOpacity={0.22} stroke={you ? COLORS.headline : ELEMENT_COLORS[el]} strokeWidth={you ? 2 : 1} />
                      <SvgText x={x + colW / 2} y={y + 34} fill={COLORS.headline} fontSize={13} fontFamily={FONTS.semibold} textAnchor="middle">
                        {t.el[el]}
                      </SvgText>
                      <SvgText x={x + colW / 2} y={y + 54} fill={COLORS.subheadline} fontSize={12} fontFamily={FONTS.regular} textAnchor="middle">
                        {hanja}
                      </SvgText>
                      {you && (
                        <G>
                          <Rect x={x + colW / 2 - 18} y={y - 9} width={36} height={18} rx={9} fill={COLORS.headline} />
                          <SvgText x={x + colW / 2} y={y + 4} fill={COLORS.ctaText} fontSize={11} fontFamily={FONTS.bold} textAnchor="middle">
                            {t.you}
                          </SvgText>
                        </G>
                      )}
                    </G>
                  );
                })
              ) : (
                <G>
                  <Rect x={x} y={26} width={colW} height={156} rx={14} fill="url(#hatchA)" stroke={COLORS.border} strokeDasharray="4 4" />
                  {t.unknown.split(" ").reduce<string[]>((lines, w, wi, arr) => (wi === 0 ? [w] : wi === 1 ? [lines[0], arr.slice(1).join(" ")] : lines), []).map((line, li) => (
                    <SvgText key={li} x={x + colW / 2} y={100 + li * 15} fill={COLORS.footer} fontSize={11} fontFamily={FONTS.medium} textAnchor="middle">
                      {line}
                    </SvgText>
                  ))}
                </G>
              )}
            </G>
          );
        })}
        {/* stacked distribution */}
        {(() => {
          let cx = 0;
          return ELEMENT_ORDER.map((k) => {
            const w = ((elements[k] ?? 0) / 100) * W;
            const r = <Rect key={k} x={cx} y={202} width={Math.max(w - 2, 0)} height={10} rx={3} fill={ELEMENT_COLORS[k]} fillOpacity={top.includes(k as El) ? 1 : 0.55} />;
            cx += w;
            return r;
          });
        })()}
      </Svg>
      <View style={styles.captionRow}>
        <Text style={styles.captionStrong}>{mostLine(t, elements)}</Text>
        <Text style={styles.caption}>{t.youLong(t.el[dm])}</Text>
      </View>
    </View>
  );
}

// ── B. Five-element ring (generating cycle) ────────────────────────────────────────────
function SketchRing({ p, elements, lang }: { p: Pillars; elements: Record<string, number>; lang: Lang }) {
  const t = T[lang];
  const dm = KO_EL[p.day.skyElement];
  const top = strongest(elements);
  const H = 286;
  const cx = W / 2;
  const cy = 146;
  const R = 84;
  const pos = ELEMENT_ORDER.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  return (
    <View>
      <Svg width={W} height={H}>
        {/* generating arrows: wood → fire → earth → metal → water → wood */}
        {pos.map((a, i) => {
          const b = pos[(i + 1) % 5];
          return <Line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={COLORS.border} strokeWidth={1.5} />;
        })}
        {ELEMENT_ORDER.map((k, i) => {
          const v = elements[k] ?? 0;
          const r = 14 + (v / 100) * 46;
          const { x, y } = pos[i];
          const isDm = k === dm;
          return (
            <G key={k}>
              {v === 0 ? (
                <Circle cx={x} cy={y} r={14} fill={COLORS.background} stroke={ELEMENT_COLORS[k]} strokeDasharray="3 3" />
              ) : (
                <Circle cx={x} cy={y} r={r} fill={ELEMENT_COLORS[k]} fillOpacity={top.includes(k as El) ? 0.9 : 0.45} />
              )}
              {isDm && <Circle cx={x} cy={y} r={Math.max(r, 14) + 6} fill="none" stroke={COLORS.headline} strokeWidth={2} />}
              <SvgText x={x} y={y + 4} fill={top.includes(k as El) ? COLORS.ctaText : COLORS.headline} fontSize={12} fontFamily={FONTS.semibold} textAnchor="middle">
                {t.el[k as El]}
              </SvgText>
              <SvgText x={x} y={y + (y > cy ? Math.max(r, 14) + 22 : -Math.max(r, 14) - 12)} fill={COLORS.footer} fontSize={11} fontFamily={FONTS.medium} textAnchor="middle">
                {isDm ? `${t.you} · ${Math.round(v)}%` : `${Math.round(v)}%`}
              </SvgText>
            </G>
          );
        })}
      </Svg>
      {/* the eight characters as a quiet strip */}
      <View style={styles.chipRow}>
        {ORDER.map((key) => {
          const pillar = p[key];
          return (
            <View key={key} style={styles.chipCol}>
              <Text style={[styles.chipLabel, key === "day" && { color: COLORS.headline }]}>{t.pillars[key]}</Text>
              {pillar ? (
                <View style={styles.chipPair}>
                  {[pillar.skyElement, pillar.earthElement].map((ko, row) => (
                    <View key={row} style={[styles.chipDot, { backgroundColor: ELEMENT_COLORS[KO_EL[ko]] }, key === "day" && row === 0 && styles.chipDotYou]} />
                  ))}
                </View>
              ) : (
                <Text style={styles.chipUnknown}>{t.unknown}</Text>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.captionRow}>
        <Text style={styles.captionStrong}>{mostLine(t, elements)}</Text>
        <Text style={styles.caption}>{t.youLong(t.el[dm])}</Text>
      </View>
    </View>
  );
}

// ── C. Eight-tile weave + counts ───────────────────────────────────────────────────────
function SketchWeave({ p, elements, lang }: { p: Pillars; elements: Record<string, number>; lang: Lang }) {
  const t = T[lang];
  const dm = KO_EL[p.day.skyElement];
  const top = strongest(elements);
  const tile = 42;
  const gap = 6;
  const gridW = tile * 4 + gap * 3; // 218
  const counts: Record<string, number> = {};
  let total = 0;
  ORDER.forEach((k) => {
    const pl = p[k];
    if (!pl) return;
    [pl.skyElement, pl.earthElement].forEach((ko) => {
      counts[KO_EL[ko]] = (counts[KO_EL[ko]] ?? 0) + 1;
      total += 1;
    });
  });
  const legendX = gridW + 14;
  return (
    <View>
      <Svg width={W} height={140}>
        <Defs>
          <Pattern id="hatchC" width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <Line x1={0} y1={0} x2={0} y2={6} stroke={COLORS.border} strokeWidth={2} />
          </Pattern>
        </Defs>
        {ORDER.map((key, i) => {
          const x = i * (tile + gap);
          const pl = p[key];
          return (
            <G key={key}>
              <SvgText x={x + tile / 2} y={12} fill={key === "day" ? COLORS.headline : COLORS.footer} fontSize={11} fontFamily={FONTS.semibold} textAnchor="middle">
                {t.pillars[key]}
              </SvgText>
              {[0, 1].map((row) => {
                const y = 22 + row * (tile + gap);
                if (!pl) return <Rect key={row} x={x} y={y} width={tile} height={tile} rx={8} fill="url(#hatchC)" stroke={COLORS.border} strokeDasharray="3 3" />;
                const el = KO_EL[row === 0 ? pl.skyElement : pl.earthElement];
                const you = key === "day" && row === 0;
                return (
                  <G key={row}>
                    <Rect x={x} y={y} width={tile} height={tile} rx={8} fill={ELEMENT_COLORS[el]} fillOpacity={top.includes(el) ? 0.95 : 0.4} />
                    {you && <Rect x={x - 3} y={y - 3} width={tile + 6} height={tile + 6} rx={10} fill="none" stroke={COLORS.headline} strokeWidth={2} />}
                    <SvgText x={x + tile / 2} y={y + tile / 2 + 4} fill={top.includes(el) ? COLORS.ctaText : COLORS.headline} fontSize={11} fontFamily={FONTS.semibold} textAnchor="middle">
                      {you ? t.you : row === 0 ? STEM_HANJA[pl.sky] : BRANCH_HANJA[pl.earth]}
                    </SvgText>
                  </G>
                );
              })}
            </G>
          );
        })}
        {!p.hour && (
          <SvgText x={3 * (tile + gap) + tile / 2} y={132} fontSize={10} fill={COLORS.footer} fontFamily={FONTS.medium} textAnchor="middle">
            {t.unknown}
          </SvgText>
        )}
        {/* counts as dots */}
        {ELEMENT_ORDER.map((k, i) => {
          const y = 26 + i * 22;
          const n = counts[k] ?? 0;
          return (
            <G key={k}>
              <SvgText x={legendX} y={y + 4} fill={top.includes(k as El) ? COLORS.headline : COLORS.subheadline} fontSize={11} fontFamily={top.includes(k as El) ? FONTS.bold : FONTS.medium}>
                {t.el[k as El]}
              </SvgText>
              {Array.from({ length: n }).map((_, j) => (
                <Circle key={j} cx={legendX + 50 + j * 11} cy={y} r={4} fill={ELEMENT_COLORS[k]} />
              ))}
              {n === 0 && <Path d={`M${legendX + 46} ${y} h10`} stroke={COLORS.border} strokeWidth={2} />}
            </G>
          );
        })}
      </Svg>
      <View style={styles.captionRow}>
        <Text style={styles.captionStrong}>
          {mostLine(t, elements)} · {t.count(counts[top[0]] ?? 0, total)}
        </Text>
        <Text style={styles.caption}>{t.youLong(t.el[dm])}</Text>
      </View>
    </View>
  );
}

export default function ChartSketches() {
  const [loaded] = useFonts({ CormorantGaramond_500Medium, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold });
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { QA_PERSONAS } = require("./qaData") as typeof import("./qaData");
  const key = params.get("persona") ?? "jordan";
  const persona = QA_PERSONAS[key] ?? QA_PERSONAS.jordan;
  const langParam = params.get("lang");
  const lang: Lang = langParam === "ko" || langParam === "en" || langParam === "es" ? langParam : persona.locale;
  const p = persona.sajuResult.fourPillars as Pillars;
  const elements = persona.sajuResult.elements as Record<string, number>;
  if (!loaded) return <View style={styles.root} />;
  const sketches: [string, React.ReactNode][] = [
    ["A · 네 기둥 + 분포 막대", <SketchColumns p={p} elements={elements} lang={lang} />],
    ["B · 오행 고리", <SketchRing p={p} elements={elements} lang={lang} />],
    ["C · 여덟 칸 직조", <SketchWeave p={p} elements={elements} lang={lang} />],
  ];
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.meta}>
        {persona.nickname} · {lang} · {p.hour ? "hour known" : "no hour"}
      </Text>
      {sketches.map(([title, node]) => (
        <View key={title} style={styles.block}>
          <Text style={styles.sketchTitle}>{title}</Text>
          <View style={styles.card}>{node}</View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 16, paddingVertical: 20 },
  meta: { color: COLORS.footer, fontFamily: FONTS.medium, fontSize: 12, marginBottom: 12 },
  block: { marginBottom: 22 },
  sketchTitle: { color: COLORS.gold, fontFamily: FONTS.semibold, fontSize: 13, marginBottom: 8 },
  card: { backgroundColor: COLORS.inputBg, borderColor: COLORS.border, borderWidth: 1, borderRadius: 18, padding: 18, alignItems: "center" },
  captionRow: { marginTop: 10, gap: 2, width: W },
  captionStrong: { color: COLORS.headline, fontFamily: FONTS.semibold, fontSize: 14 },
  caption: { color: COLORS.subheadline, fontFamily: FONTS.regular, fontSize: 13 },
  chipRow: { flexDirection: "row", justifyContent: "space-between", width: W, marginTop: 4 },
  chipCol: { alignItems: "center", flex: 1, gap: 6 },
  chipLabel: { color: COLORS.footer, fontFamily: FONTS.semibold, fontSize: 11 },
  chipPair: { flexDirection: "row", gap: 6 },
  chipDot: { width: 14, height: 14, borderRadius: 7 },
  chipDotYou: { borderWidth: 2, borderColor: COLORS.headline },
  chipUnknown: { color: COLORS.footer, fontFamily: FONTS.medium, fontSize: 10 },
});
