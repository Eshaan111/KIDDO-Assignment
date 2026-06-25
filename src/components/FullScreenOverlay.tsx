import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { resolveOverlayAnimationUrl } from "../engine/overlayMedia";
import { FullScreenOverlayBlock } from "../types/schema";

type Props = {
  block: FullScreenOverlayBlock;
};

export const FullScreenOverlay = React.memo(function FullScreenOverlay({ block }: Props) {
  const [hasError, setHasError] = useState(false);
  const opacity = block.opacity ?? 1;
  const animationUrl = resolveOverlayAnimationUrl(block);
  const hasRenderableLottie =
    !hasError && block.mediaType === "LOTTIE" && !!(block.animationData || animationUrl);
  const hasRenderableImage =
    !hasError && (block.mediaType === "WEBP" || block.mediaType === "GIF") && !!animationUrl;

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
          autoplay={true}
        />
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
});
