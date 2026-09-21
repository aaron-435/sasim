import { useCallback, useEffect, useRef, type RefObject } from "react";
import type { LayoutChangeEvent, ScrollView } from "react-native";

/**
 * Scroll behaviour for the chat and Q&A screens. A bot answer arrives as several bubbles one after
 * another; pinning the view to the bottom on every new bubble scrolled the answer's first lines away
 * before anyone could read them. Instead:
 *   - when the user sends something, go to the bottom (their message and the typing dots);
 *   - when the FIRST bubble of a bot reply appears, bring that bubble to the top, once;
 *   - while the rest of the reply keeps appending below, stay put — the reader scrolls on their own.
 *
 * `onBubbleLayout(i)` must be attached to each message's wrapper so its position is known.
 */
export function useReplyScroll(scrollRef: RefObject<ScrollView | null>, roles: string[]) {
  const ys = useRef<Record<number, number>>({});
  const onBubbleLayout = useCallback(
    (index: number) => (e: LayoutChangeEvent) => {
      ys.current[index] = e.nativeEvent.layout.y;
    },
    []
  );

  useEffect(() => {
    if (roles.length === 0) return;
    if (roles[roles.length - 1] === "user") {
      scrollRef.current?.scrollToEnd({ animated: true });
      return;
    }
    // First bubble of the current bot reply = the one right after the last user message.
    let start = roles.length - 1;
    while (start > 0 && roles[start - 1] !== "user") start--;
    if (roles.length - 1 !== start) return;
    // Give the new bubble a frame to be measured before scrolling to it.
    const t = setTimeout(() => scrollRef.current?.scrollTo({ y: Math.max(0, (ys.current[start] ?? 0) - 12), animated: true }), 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles.length]);

  return onBubbleLayout;
}
