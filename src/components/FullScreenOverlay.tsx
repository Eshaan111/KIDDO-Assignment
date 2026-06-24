import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { FullScreenOverlayBlock } from "../types/schema";

type Props = {
  block: FullScreenOverlayBlock;
};

export const FullScreenOverlay = React.memo(function FullScreenOverlay({ block }: Props) {
  const [hasError, setHasError] = useState(false);
  const opacity = block.opacity ?? 1;

  if (!block.animationUrl) {
    return null;
  }

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.overlay, { opacity }]}>
      {block.mediaType === "LOTTIE" ? (
        <LottieView
          source={{ uri: block.animationUrl }}
          autoPlay
          loop
          style={styles.media}
          onAnimationFailure={() => setHasError(true)}
        />
      ) : null}

      {block.mediaType === "WEBP" || block.mediaType === "GIF" ? (
        <Image
          source={{ uri: block.animationUrl }}
          style={styles.media}
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      ) : null}

      {hasError ? (
        <View style={styles.fallbackBadge}>
          <Text style={styles.fallbackTitle}>Overlay failed to load</Text>
          <Text style={styles.fallbackText}>{block.mediaType}</Text>
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  overlay: {
    zIndex: 0,
  },
  media: {
    width: "100%",
    height: "100%",
  },
  fallbackBadge: {
    position: "absolute",
    right: 16,
    bottom: 16,
    maxWidth: 220,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(17, 17, 17, 0.82)",
  },
  fallbackTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  fallbackText: {
    marginTop: 4,
    color: "#D1D5DB",
    fontSize: 12,
  },
});
