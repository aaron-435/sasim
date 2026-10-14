import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { ART_MANIFEST, ArtKey } from "../data/art/manifest";
import useReducedMotion from "../lib/useReducedMotion";

type Props = {
  artKey: ArtKey;
  /** 그림이 없거나 받기에 실패했을 때 그릴 코드 그림. */
  fallback?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentFit?: "cover" | "contain";
  accessibilityLabel?: string;
};

export default function ArtImage({
  artKey,
  fallback = null,
  style,
  contentFit = "contain",
  accessibilityLabel,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const entry = ART_MANIFEST[artKey];

  if (!entry || failed) return <>{fallback}</>;

  return (
    <View style={style} pointerEvents="none">
      <Image
        source={entry.source}
        placeholder={entry.blurhash ? { blurhash: entry.blurhash } : undefined}
        contentFit={contentFit}
        transition={reduceMotion ? 0 : 200}
        onError={() => setFailed(true)}
        accessible={!!accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
