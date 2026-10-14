import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Text from "./AppText";
import PressableScale from "./motion/PressableScale";
import Reveal from "./motion/Reveal";
import JournalSafetyNote from "./JournalSafetyNote";
import { track } from "../lib/analytics";
import { useStrings } from "../lib/i18n";
import {
  getJournalEntry,
  hasCrisisSignal,
  JOURNAL_MOODS,
  MAX_NOTE_LENGTH,
  saveJournalEntry,
  type JournalEntry,
  type JournalMood,
} from "../lib/journalStorage";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";

// "오늘 한 줄" under today's reading (FortuneScreen, once the day is opened). A mood is required,
// the line is optional; both stay on the device (lib/journalStorage.ts). If the line reads like a
// self-harm signal, the help lines show right under it — the entry is still saved.
export default function JournalEntryCard({ dateIso, onOpenJournal }: { dateIso: string; onOpenJournal: () => void }) {
  const strings = useStrings();
  const [saved, setSaved] = useState<JournalEntry | null>(null);
  const [editing, setEditing] = useState(false);
  const [mood, setMood] = useState<JournalMood | null>(null);
  const [note, setNote] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    getJournalEntry(dateIso).then((entry) => {
      if (!alive) return;
      setSaved(entry);
      setEditing(!entry);
      setMood(entry?.mood ?? null);
      setNote(entry?.note ?? "");
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, [dateIso]);

  async function handleSave() {
    if (!mood) return;
    const isNew = !saved;
    const entry = await saveJournalEntry(dateIso, mood, note);
    setSaved(entry);
    setEditing(false);
    track("journal_save", { kind: mood, value: entry.note ? 1 : 0, ...(isNew ? {} : { step: "edit" }) });
  }

  if (!loaded) return null;

  return (
    <Reveal index={0} style={styles.card}>
      <Text style={styles.label} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.journal.cardLabel}</Text>

      {editing ? (
        <>
          <Text style={styles.prompt}>{strings.journal.cardPrompt}</Text>
          <View style={styles.moodGrid} accessibilityRole="radiogroup" accessibilityLabel={strings.journal.moodGroupLabel}>
            {JOURNAL_MOODS.map((m) => {
              const selected = mood === m;
              return (
                <PressableScale
                  key={m}
                  onPress={() => setMood(m)}
                  style={[styles.moodChip, selected && styles.moodChipSelected]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  aria-checked={selected}
                  haptic="select"
                >
                  <Text style={[styles.moodLabel, selected && styles.moodLabelSelected]} numberOfLines={1} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                    {strings.journal.moods[m]}
                  </Text>
                </PressableScale>
              );
            })}
          </View>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder={strings.journal.notePlaceholder}
            placeholderTextColor={COLORS.placeholder}
            maxLength={MAX_NOTE_LENGTH}
            returnKeyType="done"
            onSubmitEditing={handleSave}
            style={styles.input}
            maxFontSizeMultiplier={MAX_FONT_SCALE.body}
            accessibilityLabel={strings.journal.notePlaceholder}
          />
          <View style={styles.footerRow}>
            <Text style={styles.storageNote} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.journal.storageNote}</Text>
            <PressableScale
              onPress={handleSave}
              disabled={!mood}
              style={[styles.saveButton, !mood && styles.saveButtonDisabled]}
              accessibilityRole="button"
              accessibilityState={{ disabled: !mood }}
            >
              <Text style={[styles.saveLabel, !mood && styles.saveLabelDisabled]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.saveButton}</Text>
            </PressableScale>
          </View>
        </>
      ) : (
        saved && (
          <>
            <View style={styles.savedRow}>
              <View style={[styles.moodChip, styles.moodChipSelected, styles.savedChip]}>
                <Text style={[styles.moodLabel, styles.moodLabelSelected]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.moods[saved.mood]}</Text>
              </View>
              {!!saved.note && <Text style={styles.savedNote}>{saved.note}</Text>}
            </View>
            <View style={styles.linkRow}>
              <PressableScale onPress={() => setEditing(true)} style={styles.link} accessibilityRole="button" haptic="none">
                <Text style={styles.linkText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.editLink}</Text>
              </PressableScale>
              <PressableScale onPress={onOpenJournal} style={styles.link} accessibilityRole="button" haptic="none">
                <Text style={styles.linkText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.openJournalLink}</Text>
              </PressableScale>
            </View>
            {hasCrisisSignal(saved.note) && <JournalSafetyNote />}
          </>
        )
      )}
    </Reveal>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: SURFACE.raised, borderRadius: RADIUS.md, padding: SPACE.lg, gap: SPACE.md, marginTop: SPACE.lg, marginBottom: SPACE.lg, ...SHADOW.raised },
  label: { fontFamily: FONTS.semibold, fontSize: 13, letterSpacing: 0.3, color: COLORS.gold },
  prompt: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline },
  moodGrid: { flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm },
  moodChip: {
    flexGrow: 1,
    flexBasis: "45%",
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    paddingHorizontal: SPACE.md,
  },
  moodChipSelected: { borderColor: COLORS.gold, backgroundColor: "rgba(111,169,139,0.12)" },
  moodLabel: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.subheadline },
  moodLabelSelected: { color: COLORS.headline },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACE.lg,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
  },
  footerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: SPACE.md },
  storageNote: { flexShrink: 1, fontFamily: FONTS.regular, fontSize: 12, lineHeight: 17, color: COLORS.footer },
  saveButton: { minHeight: 44, minWidth: 88, alignItems: "center", justifyContent: "center", borderRadius: RADIUS.pill, backgroundColor: COLORS.gold, paddingHorizontal: SPACE.xl },
  saveButtonDisabled: { backgroundColor: COLORS.disabledBg },
  saveLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  saveLabelDisabled: { color: COLORS.disabledText },
  savedRow: { gap: SPACE.md, alignItems: "flex-start" },
  savedChip: { flexGrow: 0, flexBasis: "auto", paddingHorizontal: SPACE.lg },
  savedNote: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 23, color: COLORS.headline },
  linkRow: { flexDirection: "row", gap: SPACE.xl },
  link: { minHeight: 44, justifyContent: "center" },
  linkText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.gold, textDecorationLine: "underline" },
});
