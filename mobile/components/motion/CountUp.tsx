// Animated number — counts 0 → value with an ease-out over `duration` ms after
// `delay` ms. Runs on requestAnimationFrame (not reanimated) so it behaves the
// same on web and native; it only re-renders text, never layout. When `value`
// changes it climbs again from the currently shown number. Screen readers hear
// only the final value, never the intermediate frames.
import { useEffect, useRef, useState } from "react";
import type { TextProps } from "react-native";
import Text from "../AppText";
import useReducedMotion from "../../lib/useReducedMotion";

type Props = TextProps & {
  value: number;
  duration?: number;
  delay?: number;
  format?: (n: number) => string;
};

export default function CountUp({ value, duration = 700, delay = 0, format = (n) => String(Math.round(n)), ...rest }: Props) {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);
  const displayedRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) {
      displayedRef.current = value;
      setDisplayed(value);
      return;
    }
    const from = displayedRef.current;
    if (from === value) {
      setDisplayed(value);
      return;
    }
    let raf: ReturnType<typeof requestAnimationFrame> = 0;
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const t = duration <= 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (value - from) * eased;
      displayedRef.current = current;
      setDisplayed(current);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [value, duration, delay, reduceMotion]);

  return (
    <Text {...rest} accessibilityLabel={format(value)}>
      {format(displayed)}
    </Text>
  );
}
