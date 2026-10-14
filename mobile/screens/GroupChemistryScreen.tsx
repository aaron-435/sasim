import { useRef, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Plus from "lucide-react-native/icons/plus";
import Share2 from "lucide-react-native/icons/share-2";
import X from "lucide-react-native/icons/x";
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/AppText";
import { OtherBirthFields, useOtherBirthForm, type OtherBirthPayload } from "../components/OtherBirthForm";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import { ELEMENT_COLORS, ELEMENT_EMOJI } from "../lib/elements";
import { GROUP_CHEMISTRY_CONTENT } from "../lib/groupChemistryContent";
import { useLocale, useStrings } from "../lib/i18n";
import type { SavedInvite } from "../lib/invites";
import type { ElementKey, SajuType } from "../lib/sajuType";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { readableColumn } from "../theme/layout";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";

// Group chemistry map (SPEC 2026-10-05 §7): the user plus 2–5 people — typed in by birth date or
// picked from answered friend invites — get one five-element role each on a shareable card.
// Free and rules-only; the server (/api/groupChemistry) assigns the roles and stores nothing.

const GROUP_MIN = 3;
const GROUP_MAX = 6;

type Member =
  | { id: string; name: string; kind: "self"; dayMasterElement: ElementKey; dominantElement: ElementKey }
  | { id: string; name: string; kind: "known"; dayMasterElement: ElementKey; dominantElement: ElementKey }
  | { id: string; name: string; kind: "birth"; birth: OtherBirthPayload };

type Chemistry = { roles: ElementKey[]; leading: ElementKey; toAdd: ElementKey | null };

/** The birth-date form for one person. Remounted (new key) after each add so it starts empty. */
function AddByBirth({ onAdd }: { onAdd: (name: string, birth: OtherBirthPayload) => void }) {
  const strings = useStrings();
  const form = useOtherBirthForm();
  return (
    <View>
      <OtherBirthFields form={form} />
      <PressableScale
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed, !form.isComplete && styles.disabled]}
        onPress={() => form.isComplete && onAdd(form.otherName.trim(), form.toPayload())}
        disabled={!form.isComplete}
        accessibilityRole="button"
        accessibilityState={{ disabled: !form.isComplete }}
      >
        <Plus size={16} strokeWidth={2} color={COLORS.gold} />
        <Text style={styles.addButtonLabel}>{strings.groupChemistry.addButton}</Text>
      </PressableScale>
    </View>
  );
}

export default function GroupChemistryScreen({
  selfNickname,
  selfSajuType,
  receivedInvites,
  onBack,
}: {
  selfNickname: string;
  selfSajuType: SajuType;
  /** Answered friend invites — each already carries the friend's two element signals. */
  receivedInvites: SavedInvite[];
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const content = GROUP_CHEMISTRY_CONTENT[locale] ?? GROUP_CHEMISTRY_CONTENT.en;

  const [members, setMembers] = useState<Member[]>([
    { id: "self", name: selfNickname, kind: "self", dayMasterElement: selfSajuType.dayMasterElement, dominantElement: selfSajuType.dominantElement },
  ]);
  const [formKey, setFormKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chemistry, setChemistry] = useState<Chemistry | null>(null);
  const [sharing, setSharing] = useState(false);
  const shareCardRef = useRef<View>(null);

  const full = members.length >= GROUP_MAX;
  const ready = members.length >= GROUP_MIN;
  const nextFallback = () => strings.groupChemistry.personFallback(members.length + 1);

  const pickable = receivedInvites.filter(
    (i) => i.status === "answered" && i.result?.compatibility && !members.some((m) => m.id === `invite:${i.code}`),
  );

  function addMember(m: Member) {
    setMembers((list) => (list.length >= GROUP_MAX ? list : [...list, m]));
    setError(null);
  }

  function addInvite(item: SavedInvite) {
    const compat = item.result!.compatibility!;
    const dayMasterElement = compat.otherDayMasterElement as ElementKey;
    const dominantElement = (item.result!.other.sajuType?.dominantElement ?? item.result!.other.dominantElement ?? dayMasterElement) as ElementKey;
    addMember({ id: `invite:${item.code}`, name: item.friendName?.trim() || nextFallback(), kind: "known", dayMasterElement, dominantElement });
  }

  async function handleSubmit() {
    if (!ready || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/groupChemistry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          members: members.map((m) =>
            m.kind === "birth" ? { birth: m.birth } : { dayMasterElement: m.dayMasterElement, dominantElement: m.dominantElement },
          ),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.chemistry) {
        setError(strings.groupChemistry.errorDefault);
        return;
      }
      setChemistry(json.chemistry);
      track("group_chemistry_view", { value: members.length });
    } catch {
      setError(strings.groupChemistry.errorDefault);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleShare() {
    if (sharing) return;
    setSharing(true);
    try {
      // width-only capture, same rule as the compatibility card: height follows the content.
      const uri = await captureRef(shareCardRef, { format: "png", quality: 1, width: 1080 });
      if (await Sharing.isAvailableAsync()) {
        track("share", { kind: "group_card" });
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best effort, like the other share cards.
    } finally {
      setSharing(false);
    }
  }

  const back = (
    <PressableScale
      onPress={chemistry ? () => setChemistry(null) : onBack}
      hitSlop={12}
      style={styles.backButton}
      accessibilityRole="button"
      accessibilityLabel={strings.common.backLabel}
      haptic="none"
    >
      <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
      <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
    </PressableScale>
  );

  if (chemistry) {
    const leading = content.leading[chemistry.leading];
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          {back}
          <Text style={styles.eyebrow}>{strings.groupChemistry.resultEyebrow}</Text>
          <Text style={styles.resultHeadline} accessibilityRole="header">{leading.headline}</Text>

          <View style={styles.previewFrame}>
            <Text style={styles.previewLabel}>{strings.compatibility.sharePreviewLabel}</Text>
            <View ref={shareCardRef} collapsable={false} style={styles.shareCard}>
              <Image source={require("../assets/patterns/onboarding-bg.png")} resizeMode="cover" style={StyleSheet.absoluteFill} />
              <View style={styles.shareCardInner}>
                <Text style={styles.shareBrand}>FATESAID</Text>
                <Text style={styles.shareEyebrow}>{strings.groupChemistry.resultEyebrow}</Text>
                <Text style={styles.shareHeadline}>{leading.headline}</Text>
                <Text style={styles.shareLine}>{leading.line}</Text>

                <View style={styles.roleList}>
                  {members.map((m, i) => {
                    const role = chemistry.roles[i];
                    const copy = content.roles[role];
                    return (
                      <View key={m.id} style={styles.roleRow} accessible accessibilityLabel={`${m.name}. ${copy.name}. ${copy.line}`}>
                        <View style={[styles.roleDot, { backgroundColor: ELEMENT_COLORS[role] }]}>
                          <Text style={styles.roleEmoji}>{ELEMENT_EMOJI[role]}</Text>
                        </View>
                        <View style={styles.roleText}>
                          <Text style={styles.roleName}>{m.kind === "self" ? `${m.name} (${strings.groupChemistry.youLabel})` : m.name}</Text>
                          <Text style={styles.roleTitle}>{copy.name}</Text>
                          <Text style={styles.roleLine}>{copy.line}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>

                <View style={styles.tipBlock}>
                  {chemistry.toAdd ? (
                    <>
                      <Text style={styles.tipLabel}>{strings.groupChemistry.toAddLabel}</Text>
                      <Text style={styles.tipText}>{content.toAdd[chemistry.toAdd]}</Text>
                    </>
                  ) : (
                    <Text style={styles.tipText}>{content.balanced}</Text>
                  )}
                </View>

                <Text style={styles.shareFooter}>{strings.groupChemistry.shareCardFooter}</Text>
              </View>
            </View>
          </View>

          <PressableScale style={styles.primaryButton} onPress={handleShare} disabled={sharing} accessibilityRole="button" accessibilityLabel={strings.compatibility.shareButton}>
            {sharing ? (
              <ActivityIndicator color={COLORS.ctaText} />
            ) : (
              <>
                <Share2 size={16} strokeWidth={2} color={COLORS.ctaText} />
                <Text style={styles.primaryButtonLabel}>{strings.compatibility.shareButton}</Text>
              </>
            )}
          </PressableScale>
          <PressableScale style={styles.textButton} onPress={() => setChemistry(null)} accessibilityRole="button" haptic="none">
            <Text style={styles.textButtonLabel}>{strings.groupChemistry.editButton}</Text>
          </PressableScale>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {back}
        <Reveal index={0}>
          <Text style={styles.heading} accessibilityRole="header">{strings.groupChemistry.heading}</Text>
          <Text style={styles.subtitle}>{strings.groupChemistry.subtitle}</Text>
        </Reveal>

        <Reveal index={1}>
          <Text style={styles.sectionLabel} accessibilityRole="header">{strings.groupChemistry.membersTitle(members.length)}</Text>
          <View style={styles.memberList}>
            {members.map((m) => (
              <View key={m.id} style={styles.memberRow}>
                <Text style={styles.memberName} numberOfLines={1}>
                  {m.kind === "self" ? `${m.name} (${strings.groupChemistry.youLabel})` : m.name}
                </Text>
                {m.kind !== "self" && (
                  <PressableScale
                    onPress={() => setMembers((list) => list.filter((x) => x.id !== m.id))}
                    hitSlop={10}
                    style={styles.removeButton}
                    accessibilityRole="button"
                    accessibilityLabel={strings.groupChemistry.removeLabel(m.name)}
                  >
                    <X size={16} strokeWidth={2} color={COLORS.subheadline} />
                  </PressableScale>
                )}
              </View>
            ))}
          </View>
          <Text style={styles.hint}>{full ? strings.groupChemistry.full : !ready ? strings.groupChemistry.needMore(GROUP_MIN - members.length) : " "}</Text>
        </Reveal>

        <Reveal index={2}>
          <PressableScale
            style={[styles.primaryButton, !ready && styles.disabled]}
            onPress={handleSubmit}
            disabled={!ready || submitting}
            accessibilityRole="button"
            accessibilityState={{ disabled: !ready, busy: submitting }}
          >
            {submitting ? <ActivityIndicator color={COLORS.ctaText} /> : <Text style={styles.primaryButtonLabel}>{strings.groupChemistry.submit}</Text>}
          </PressableScale>
          {error && <Text style={styles.error}>{error}</Text>}
        </Reveal>

        {!full && pickable.length > 0 && (
          <Reveal index={3} style={styles.section}>
            <Text style={styles.sectionLabel} accessibilityRole="header">{strings.groupChemistry.fromReceivedTitle}</Text>
            <View style={styles.chipRow}>
              {pickable.map((item) => {
                const name = item.friendName?.trim() || strings.compatibility.unnamedOther;
                return (
                  <PressableScale
                    key={item.code}
                    onPress={() => addInvite(item)}
                    style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
                    accessibilityRole="button"
                    accessibilityLabel={`${strings.groupChemistry.addButton}: ${name}`}
                    haptic="select"
                  >
                    <Plus size={14} strokeWidth={2} color={COLORS.gold} />
                    <Text style={styles.chipLabel}>{name}</Text>
                  </PressableScale>
                );
              })}
            </View>
          </Reveal>
        )}

        {!full && (
          <Reveal index={4} style={styles.section}>
            <Text style={styles.sectionLabel} accessibilityRole="header">{strings.groupChemistry.addByBirthTitle}</Text>
            <AddByBirth
              key={formKey}
              onAdd={(name, birth) => {
                addMember({ id: `birth:${formKey}`, name: name || nextFallback(), kind: "birth", birth });
                setFormKey((k) => k + 1);
              }}
            />
          </Reveal>
        )}

        <Text style={styles.privacy}>{strings.groupChemistry.privacyNote}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { ...readableColumn, paddingHorizontal: SPACE.xl, paddingTop: SPACE.sm, paddingBottom: SPACE.xxxl },
  backButton: { flexDirection: "row", alignItems: "center", gap: SPACE.xs, alignSelf: "flex-start", padding: SPACE.sm, marginLeft: -SPACE.sm, marginBottom: SPACE.md, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontSize: 26, color: COLORS.headline },
  subtitle: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: SPACE.sm, marginBottom: SPACE.xl },
  section: { marginTop: SPACE.xxl },
  sectionLabel: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.2, color: COLORS.subheadline, marginBottom: SPACE.md },
  memberList: { gap: SPACE.sm },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
    paddingHorizontal: SPACE.lg,
    borderRadius: RADIUS.md,
    backgroundColor: SURFACE.raised,
    ...SHADOW.raised,
  },
  memberName: { flex: 1, fontFamily: FONTS.medium, fontSize: 14.5, color: COLORS.headline },
  removeButton: { minWidth: 44, minHeight: 44, alignItems: "flex-end", justifyContent: "center" },
  hint: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline, marginTop: SPACE.md },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    minHeight: 44,
    paddingHorizontal: SPACE.lg,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    backgroundColor: COLORS.inputBg,
  },
  chipLabel: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.headline },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACE.sm,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: RADIUS.sm,
    minHeight: 48,
    marginTop: SPACE.lg,
  },
  addButtonLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.gold },
  pressed: { backgroundColor: "rgba(111,169,139,0.08)" },
  disabled: { opacity: 0.4 },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACE.sm,
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.sm,
    minHeight: 52,
    marginTop: SPACE.lg,
  },
  primaryButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.ctaText },
  error: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.danger, marginTop: SPACE.md },
  privacy: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.footer, marginTop: SPACE.xl },
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.gold },
  resultHeadline: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, marginTop: SPACE.sm },
  previewFrame: {
    marginTop: SPACE.xxl,
    padding: SPACE.lg,
    paddingTop: SPACE.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.disabledText,
    backgroundColor: COLORS.inputBg,
  },
  previewLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.footer, textAlign: "center", marginBottom: SPACE.md },
  // No fixed aspect ratio: 3 to 6 rows, so the height follows the content (captured width-only).
  shareCard: { width: "100%", borderRadius: RADIUS.lg, overflow: "hidden", backgroundColor: COLORS.background },
  shareCardInner: { paddingHorizontal: "8%", paddingVertical: "9%", alignItems: "center" },
  shareBrand: { fontFamily: FONTS.bold, fontSize: 13, letterSpacing: 3, color: COLORS.gold, marginBottom: SPACE.xl },
  shareEyebrow: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold },
  shareHeadline: { fontFamily: FONTS.display, fontSize: 28, lineHeight: 34, color: COLORS.headline, textAlign: "center", marginTop: SPACE.sm },
  shareLine: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 19, color: COLORS.subheadline, textAlign: "center", marginTop: SPACE.sm },
  roleList: { width: "100%", marginTop: SPACE.xl, gap: SPACE.md },
  roleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACE.md,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: RADIUS.sm,
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.lg,
  },
  roleDot: { width: 30, height: 30, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center", marginTop: SPACE.xs },
  roleEmoji: { fontSize: 15 },
  roleText: { flex: 1, gap: SPACE.xs },
  roleName: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.subheadline },
  roleTitle: { fontFamily: FONTS.semibold, fontSize: 14.5, lineHeight: 20, color: COLORS.headline },
  roleLine: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline },
  tipBlock: { width: "100%", marginTop: SPACE.lg, alignItems: "center" },
  tipLabel: { fontFamily: FONTS.bold, fontSize: 12, color: COLORS.gold, marginBottom: SPACE.xs },
  tipText: { fontFamily: FONTS.medium, fontSize: 13, lineHeight: 19, color: COLORS.headline, textAlign: "center" },
  shareFooter: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline, textAlign: "center", marginTop: SPACE.xl },
  textButton: { alignItems: "center", paddingVertical: SPACE.lg, marginTop: SPACE.md },
  textButtonLabel: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.subheadline },
});
