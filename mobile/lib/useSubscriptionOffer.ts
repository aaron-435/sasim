import { useEffect, useState } from "react";
import { qaOfferMock } from "../dev/qaMode";
import { useStrings } from "./i18n";
import { getSubscriptionPlans, type SubscriptionPlan, type SubscriptionPlanId } from "./purchases";

/**
 * What the subscription paywall (Fortune, Q&A) offers, read from the RevenueCat "default"
 * offering: the monthly package and, once the dashboard has one, the annual package and a
 * free trial. Every price and trial length comes from the store package — nothing is
 * hard-coded (STYLE_GUIDE). With no store answer (offline, web preview) `plans` is empty
 * and the labels fall back to exactly what the paywall showed before.
 */
export interface SubscriptionOffer {
  plans: SubscriptionPlan[];
  selected: SubscriptionPlan | null;
  selectedId: SubscriptionPlanId;
  select: (id: SubscriptionPlanId) => void;
  /** "$7.99/month" / "$49.99/year" for the selected plan (or the old fallback label). */
  priceLabel: string;
  /** "7 days free, then $7.99/month" when the selected plan has a free trial. */
  trialLine: string | null;
  buttonLabel: string;
  /** Auto-renew terms matching the selected plan. */
  renewNote: string;
  /** Annual vs 12 × monthly, rounded down, when both exist and the gap is meaningful. */
  annualSavePercent: number | null;
}

// DEV web only (`?qa=…&offer=`): made-up store values so the layout can be checked
// before the dashboard has an annual package or a trial.
function mockPlans(offer: "annual" | "trial" | "both"): SubscriptionPlan[] {
  const trial = offer === "annual" ? null : ({ count: 7, unit: "DAY" } as const);
  const monthly: SubscriptionPlan = { id: "monthly", priceString: "$7.99", price: 7.99, pricePerMonthString: null, trial };
  if (offer === "trial") return [monthly];
  return [{ id: "annual", priceString: "$49.99", price: 49.99, pricePerMonthString: "$4.16", trial }, monthly];
}

export function useSubscriptionOffer(): SubscriptionOffer {
  const strings = useStrings();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedId, setSelectedId] = useState<SubscriptionPlanId>("monthly");

  useEffect(() => {
    let alive = true;
    const mock = qaOfferMock();
    const load = mock ? Promise.resolve(mockPlans(mock)) : getSubscriptionPlans();
    load
      .then((result) => {
        if (!alive) return;
        setPlans(result);
        // Annual is listed first and preselected when it exists; the monthly-only offering stays as it was.
        if (result.some((p) => p.id === "annual")) setSelectedId("annual");
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const selected = plans.find((p) => p.id === selectedId) ?? plans[0] ?? null;
  const annual = selected?.id === "annual";
  const priceLabel = !selected
    ? strings.qa.subscriptionPriceLabel
    : annual
      ? strings.subscription.annualPriceFor(selected.priceString)
      : strings.qa.subscriptionPriceFor(selected.priceString);
  const trialLine = selected?.trial
    ? strings.subscription.trialThen(strings.subscription.trialLength(selected.trial.count, selected.trial.unit), priceLabel)
    : null;
  const buttonLabel = trialLine ? strings.subscription.startTrialButton : `${strings.qa.subscribeButton} · ${priceLabel}`;
  const renewNote = selected?.trial
    ? strings.subscription.trialRenewNote(annual)
    : annual
      ? strings.subscription.annualRenewNote
      : strings.fortune.autoRenewNote;

  const monthlyPlan = plans.find((p) => p.id === "monthly");
  const annualPlan = plans.find((p) => p.id === "annual");
  const rawSave = monthlyPlan && annualPlan && monthlyPlan.price > 0 ? Math.floor((1 - annualPlan.price / (monthlyPlan.price * 12)) * 100) : 0;
  const annualSavePercent = rawSave >= 10 ? rawSave : null;

  return { plans, selected, selectedId: selected?.id ?? selectedId, select: setSelectedId, priceLabel, trialLine, buttonLabel, renewNote, annualSavePercent };
}
