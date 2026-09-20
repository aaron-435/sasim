import { useEffect, useState } from "react";
import { getMonthlyPackage } from "./purchases";

/** The subscription's localized store price ("$7.99", "7,99 €"), or null until the store answers
 * (or when there is no store, e.g. web preview). Static copy must not hard-code a price: the
 * store's `priceString` is the one that matches what the user is actually charged. */
export function useMonthlyPrice(): string | null {
  const [price, setPrice] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    getMonthlyPackage()
      .then((pkg) => {
        if (alive) setPrice(pkg?.product.priceString ?? null);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return price;
}
