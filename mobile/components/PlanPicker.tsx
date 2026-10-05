import { Pressable, StyleSheet, View } from "react-native";
import Text from "./AppText";
import { useStrings } from "../lib/i18n";
import type { SubscriptionOffer } from "../lib/useSubscriptionOffer";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

/**
 * Plan choice + trial terms, placed right above a subscription button. Renders the two
 * plan rows only when the offering has both monthly and annual, and the "7 days free,
 * then …" line only when the selected plan has a trial — with a monthly-only offering and
 * no trial it renders nothing, so the paywall looks exactly as it did before.
 */
export default function PlanPicker({ offer, disabled }: { offer: SubscriptionOffer; disabled?: boolean }) {
  const strings = useStrings();
  const showPlans = offer.plans.length > 1;
  if (!showPlans && !offer.trialLine) return null;

  return (
    <View style={styles.root}>
      {showPlans && (
        <View style={styles.plans} accessibilityRole="radiogroup" accessibilityLabel={strings.subscription.planPickerLabel}>
          {offer.plans.map((plan) => {
            const selected = plan.id === offer.selectedId;
            const annual = plan.id === "annual";
            const price = annual ? strings.subscription.annualPriceFor(plan.priceString) : strings.qa.subscriptionPriceFor(plan.priceString);
            const sub = annual && plan.pricePerMonthString ? strings.subscription.perMonthNote(plan.pricePerMonthString) : null;
            const name = annual ? strings.subscription.planAnnual : strings.subscription.planMonthly;
            return (
              <Pressable
                key={plan.id}
                onPress={() => offer.select(plan.id)}
                disabled={disabled}
                style={({ pressed }) => [styles.plan, selected && styles.planSelected, pressed && styles.pressed]}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected, disabled }}
                aria-checked={selected}
                accessibilityLabel={[name, price, sub, annual && offer.annualSavePercent ? strings.subscription.saveBadge(offer.annualSavePercent) : null].filter(Boolean).join(", ")}
              >
                <View style={[styles.radio, selected && styles.radioSelected]}>{selected && <View style={styles.radioDot} />}</View>
                <View style={styles.planText}>
                  <View style={styles.planNameRow}>
                    <Text style={styles.planName} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{name}</Text>
                    {annual && offer.annualSavePercent !== null && (
                      <View style={styles.saveBadge}>
                        <Text style={styles.saveBadgeText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.subscription.saveBadge(offer.annualSavePercent)}</Text>
                      </View>
                    )}
                  </View>
                  {!!sub && <Text style={styles.planSub} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{sub}</Text>}
                </View>
                <Text style={styles.planPrice} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{price}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
      {!!offer.trialLine && (
        <Text style={styles.trialLine} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{offer.trialLine}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 10,
  },
  plans: {
    gap: 8,
  },
  plan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: 52,
  },
  planSelected: {
    borderColor: COLORS.gold,
    backgroundColor: "rgba(111,169,139,0.08)",
  },
  pressed: {
    opacity: 0.85,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.subheadline,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: COLORS.gold,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
  },
  planText: {
    flex: 1,
    gap: 2,
  },
  planNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  planName: {
    fontFamily: FONTS.semibold,
    fontSize: 14.5,
    color: COLORS.headline,
  },
  planSub: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    color: COLORS.footer,
  },
  planPrice: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.headline,
  },
  saveBadge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.gold,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  saveBadgeText: {
    fontFamily: FONTS.medium,
    fontSize: 11.5,
    color: COLORS.gold,
  },
  trialLine: {
    fontFamily: FONTS.medium,
    fontSize: 13.5,
    color: COLORS.headline,
    textAlign: "center",
  },
});
