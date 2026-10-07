import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Text from "./AppText";
import { useLocale } from "../lib/i18n";
import { WEEKDAY_SHORT } from "../lib/shortDate";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// Month calendar frame shared by the journal and the fortune "이달" tab: a Sunday-first weekday
// row plus a 7-column grid of square cells. What goes inside a day's cell is up to the caller
// (`renderDay`), so each screen paints its own state (recorded days, rhythm colors, …).

// ISO dates (YYYY-MM-DD) of a "YYYY-MM" month, padded with nulls so the first date lands on its
// weekday column and the last row is full.
export function buildMonthCells(month: string): (string | null)[] {
  const [y, m] = month.split("-").map(Number);
  const firstWeekday = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells: (string | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`),
  ];
  while (cells.length % 7) cells.push(null);
  return cells;
}

export default function MonthGrid({ month, renderDay }: { month: string; renderDay: (date: string) => ReactNode }) {
  const { locale } = useLocale();
  const cells = buildMonthCells(month);
  return (
    <>
      <View style={styles.weekRow}>
        {WEEKDAY_SHORT[locale].map((w) => (
          <Text key={w} style={styles.weekday} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{w}</Text>
        ))}
      </View>
      <View style={styles.grid}>
        {cells.map((date, i) =>
          date ? (
            <View key={date} style={styles.cell}>{renderDay(date)}</View>
          ) : (
            <View key={`blank-${i}`} style={styles.cell} />
          ),
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  weekRow: { flexDirection: "row", marginBottom: 4 },
  weekday: { width: `${100 / 7}%`, textAlign: "center", fontFamily: FONTS.medium, fontSize: 12, color: COLORS.footer },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, padding: 3 },
});
