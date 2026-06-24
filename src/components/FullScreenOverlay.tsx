import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { resolveOverlayAnimationUrl } from "../engine/overlayMedia";
import { FullScreenOverlayBlock } from "../types/schema";

type Props = {
  block: FullScreenOverlayBlock;
};

export const FullScreenOverlay = React.memo(function FullScreenOverlay({ block }: Props) {
  const [hasError, setHasError] = useState(false);
  const opacity = block.opacity ?? 1;
  const animationUrl = resolveOverlayAnimationUrl(block);
  const hasRenderableLottie = block.mediaType === "LOTTIE" && !!(block.animationData || animationUrl);
  const hasRenderableImage =
    (block.mediaType === "WEBP" || block.mediaType === "GIF") && !!animationUrl;

  useEffect(() => {
    setHasError(false);
  }, [block.animationData, animationUrl, block.id, block.mediaType]);

  if (!hasRenderableLottie && !hasRenderableImage) {
    return null;
  }

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.overlay, { opacity }]}>
      {hasRenderableLottie ? (
        <LottieView
          source={(block.animationData as any) ?? { uri: animationUrl! }}
          autoPlay
          loop
          style={styles.media}
          onAnimationFailure={() => setHasError(true)}
        />
      ) : null}

      {hasRenderableImage ? (
        <Image
          source={{ uri: animationUrl! }}
          style={styles.media}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={150}
          onError={() => setHasError(true)}
          autoplay = {true}
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
    zIndex: 2,
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
