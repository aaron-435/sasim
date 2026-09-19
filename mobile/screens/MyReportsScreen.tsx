import { ArrowLeft, ChevronRight, FileText } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import { listSavedReports, type SavedReport } from "../lib/reportStorage";
import { COLORS } from "../theme/colors";

// Reopen a report generated earlier — see lib/reportStorage.ts for why this exists.
export default function MyReportsScreen({ onOpen, onBack }: { onOpen: (report: SavedReport) => void; onBack: () => void }) {
  const strings = useStrings();
  const { locale } = useLocale();
  const [reports, setReports] = useState<SavedReport[] | null>(null);

  useEffect(() => {
    listSavedReports().then(setReports);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading} accessibilityRole="header">
          {strings.myReports.heading}
        </Text>

        {reports?.length === 0 && <Text style={styles.empty}>{strings.myReports.empty}</Text>}

        <View style={styles.list}>
          {(reports ?? []).map((r, index) => (
            <Pressable
              key={r.moduleId}
              onPress={() => onOpen(r)}
              android_ripple={{ color: "rgba(111,169,139,0.12)" }}
              style={({ pressed }) => [styles.row, index > 0 && styles.rowDivider, pressed && styles.rowPressed]}
              accessibilityRole="button"
            >
              <FileText size={20} strokeWidth={1.75} color={COLORS.gold} />
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{r.moduleTitle}</Text>
                <Text style={styles.rowDate}>{strings.myReports.savedOn(new Date(r.savedAt).toLocaleDateString(locale))}</Text>
              </View>
              <ChevronRight size={18} strokeWidth={1.75} color={COLORS.subheadline} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", minHeight: 44, marginLeft: -8, paddingHorizontal: 8 },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline, marginTop: 4, marginBottom: 16 },
  empty: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 21, color: COLORS.subheadline },
  list: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", gap: 14, minHeight: 60, paddingVertical: 12, paddingHorizontal: 16 },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.border },
  rowPressed: { backgroundColor: "rgba(111,169,139,0.08)" },
  rowText: { flex: 1, gap: 2 },
  rowTitle: { fontFamily: "Manrope_600SemiBold", fontSize: 15, color: COLORS.headline },
  rowDate: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
});
