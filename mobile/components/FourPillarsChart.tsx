import { useRef, useState } from "react";
import { StyleSheet, View, type LayoutChangeEvent } from "react-native";
import Svg, { Defs, G, Line, Pattern, Rect, Text as SvgText } from "react-native-svg";
import Text from "./AppText";
import { ELEMENT_COLORS, ELEMENT_ORDER } from "../lib/elements";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// The saju chart as one picture (SPEC 2026-10-03 §3, sketch A chosen by the user): four
// columns (year · month · day · hour), heavenly stem on top in a round cell, earthly branch
// below in a square one, each labeled with the element's everyday name and its hanja as a
// quiet secondary mark. The day stem — the person themself — gets an outline and a "You"
// tag; the stacked bar underneath shows the element mix, strongest element(s) at full
// strength. Two caption lines keep the two ideas apart: "most present" (the chart's
// majority) vs "your core" (the day stem), which the old Home mixed up.
// Static and not tappable: no card chrome, no press state (PRODUCT.md "honest affordances").

type El = "wood" | "fire" | "earth" | "metal" | "water";
interface Pillar {
  sky: string;
  earth: string;
  skyElement: string;
  earthElement: string;
}
type PillarKey = "year" | "month" | "day" | "hour";
type Pillars = { year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null };

const ORDER: PillarKey[] = ["year", "month", "day", "hour"];
const KO_EL: Record<string, El> = { 목: "wood", 화: "fire", 토: "earth", 금: "metal", 수: "water" };
const STEM_HANJA: Record<string, string> = { 갑: "甲", 을: "乙", 병: "丙", 정: "丁", 무: "戊", 기: "己", 경: "庚", 신: "辛", 임: "壬", 계: "癸" };
const BRANCH_HANJA: Record<string, string> = { 자: "子", 축: "丑", 인: "寅", 묘: "卯", 진: "辰", 사: "巳", 오: "午", 미: "未", 신: "申", 유: "酉", 술: "戌", 해: "亥" };

const HEIGHT = 214;
const BAR_Y = 202;

let hatchSeq = 0;

function asPillar(value: unknown): Pillar | null {
  const p = value as Partial<Pillar> | null | undefined;
  if (!p || typeof p.sky !== "string" || typeof p.earth !== "string") return null;
  if (!KO_EL[p.skyElement ?? ""] || !KO_EL[p.earthElement ?? ""]) return null;
  return p as Pillar;
}

/** The stored reading's loosely-typed `fourPillars`, or null when it can't be drawn (older
 * readings, unexpected shape). Year, month and day are required; hour may be missing
 * (birth time unknown). */
export function parseFourPillars(value: unknown): Pillars | null {
  const raw = value as Record<string, unknown> | null | undefined;
  if (!raw) return null;
  const year = asPillar(raw.year);
  const month = asPillar(raw.month);
  const day = asPillar(raw.day);
  if (!year || !month || !day) return null;
  return { year, month, day, hour: asPillar(raw.hour) };
}

/** Every element at the top share. Ties are common (eight characters, 12.5% steps), and
 * naming only one of them would contradict the bar right above the caption. */
export function strongestElements(elements: Record<string, number>): El[] {
  const max = Math.max(...ELEMENT_ORDER.map((k) => elements[k] ?? 0));
  if (max <= 0) return [];
  return ELEMENT_ORDER.filter((k) => (elements[k] ?? 0) === max) as El[];
}

export default function FourPillarsChart({ fourPillars, elements }: { fourPillars: unknown; elements: Record<string, number> }) {
  const strings = useStrings();
  const t = strings.fourPillarsChart;
  const [width, setWidth] = useState(0);
  const hatchId = useRef(`pillarHatch${++hatchSeq}`).current;
  const pillars = parseFourPillars(fourPillars);
  if (!pillars) return null;

  const dayMaster = KO_EL[pillars.day.skyElement];
  const top = strongestElements(elements);
  const topNames = top.map((k) => t.elementNames[k]);
  const mostLine = top.length ? t.most(topNames, Math.round(elements[top[0]] ?? 0)) : null;
  const coreLine = t.core(t.elementNames[dayMaster]);

  const cellLabel = (pillar: Pillar) => t.a11yPair(t.elementNames[KO_EL[pillar.skyElement]], t.elementNames[KO_EL[pillar.earthElement]]);
  const a11yLabel = [
    t.a11yTitle,
    ...ORDER.map((key) => {
      const pillar = pillars[key];
      return `${t.pillars[key]}: ${pillar ? cellLabel(pillar) : t.unknownHour}`;
    }),
    mostLine,
    coreLine,
  ]
    .filter(Boolean)
    .join(". ");

  // Columns keep their sketch size on a phone and stop growing on wide screens; the group
  // is centered so an iPad doesn't stretch the gaps across the whole row.
  const colW = Math.max(52, Math.min(76, Math.floor((width - 36) / 4)));
  const gap = Math.min(Math.max((width - colW * 4) / 3, 8), 28);
  const x0 = Math.max((width - (colW * 4 + gap * 3)) / 2, 0);

  function onLayout(e: LayoutChangeEvent) {
    const w = Math.floor(e.nativeEvent.layout.width);
    if (w !== width) setWidth(w);
  }

  return (
    <View style={styles.root} accessible accessibilityRole="image" accessibilityLabel={a11yLabel}>
      <View style={styles.canvas} onLayout={onLayout}>
        {width > 0 && (
          <Svg width={width} height={HEIGHT}>
            <Defs>
              <Pattern id={hatchId} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <Line x1={0} y1={0} x2={0} y2={6} stroke={COLORS.border} strokeWidth={2} />
              </Pattern>
            </Defs>
            {ORDER.map((key, i) => {
              const x = x0 + i * (colW + gap);
              const pillar = pillars[key];
              const isDay = key === "day";
              return (
                <G key={key}>
                  <SvgText x={x + colW / 2} y={14} fill={isDay ? COLORS.headline : COLORS.footer} fontSize={12} fontFamily={FONTS.semibold} textAnchor="middle">
                    {t.pillars[key]}
                  </SvgText>
                  {pillar ? (
                    ([0, 1] as const).map((row) => {
                      const el = KO_EL[row === 0 ? pillar.skyElement : pillar.earthElement];
                      const hanja = row === 0 ? STEM_HANJA[pillar.sky] : BRANCH_HANJA[pillar.earth];
                      const y = 26 + row * 82;
                      const you = isDay && row === 0;
                      return (
                        <G key={row}>
                          <Rect
                            x={x}
                            y={y}
                            width={colW}
                            height={74}
                            rx={row === 0 ? colW / 2 : 14}
                            fill={ELEMENT_COLORS[el]}
                            fillOpacity={0.22}
                            stroke={you ? COLORS.headline : ELEMENT_COLORS[el]}
                            strokeWidth={you ? 2 : 1}
                          />
                          <SvgText x={x + colW / 2} y={y + 34} fill={COLORS.headline} fontSize={13} fontFamily={FONTS.semibold} textAnchor="middle">
                            {t.elementNames[el]}
                          </SvgText>
                          {!!hanja && (
                            <SvgText x={x + colW / 2} y={y + 54} fill={COLORS.subheadline} fontSize={12} fontFamily={FONTS.regular} textAnchor="middle">
                              {hanja}
                            </SvgText>
                          )}
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
                      <Rect x={x} y={26} width={colW} height={156} rx={14} fill={`url(#${hatchId})`} stroke={COLORS.border} strokeDasharray="4 4" />
                      {t.unknownHourLines.map((line, li) => (
                        <SvgText key={li} x={x + colW / 2} y={100 + li * 15} fill={COLORS.footer} fontSize={11} fontFamily={FONTS.medium} textAnchor="middle">
                          {line}
                        </SvgText>
                      ))}
                    </G>
                  )}
                </G>
              );
            })}
            {(() => {
              let cx = 0;
              return ELEMENT_ORDER.map((k) => {
                const w = ((elements[k] ?? 0) / 100) * width;
                const bar = (
                  <Rect
                    key={k}
                    x={cx}
                    y={BAR_Y}
                    width={Math.max(w - 2, 0)}
                    height={10}
                    rx={3}
                    fill={ELEMENT_COLORS[k]}
                    fillOpacity={top.includes(k as El) ? 1 : 0.55}
                  />
                );
                cx += w;
                return bar;
              });
            })()}
          </Svg>
        )}
      </View>
      <View style={styles.captions}>
        {!!mostLine && (
          <Text style={styles.captionStrong} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
            {mostLine}
          </Text>
        )}
        <Text style={styles.caption} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
          {coreLine}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%" },
  canvas: { width: "100%", height: HEIGHT },
  captions: { marginTop: 10, gap: 2 },
  captionStrong: { color: COLORS.headline, fontFamily: FONTS.semibold, fontSize: 14, lineHeight: 20 },
  caption: { color: COLORS.subheadline, fontFamily: FONTS.regular, fontSize: 13, lineHeight: 19 },
});
