import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

import { FullScreenOverlayBlock } from "../types/schema";

type Props = {
  block: FullScreenOverlayBlock;
};

export const FullScreenOverlay = React.memo(function FullScreenOverlay({ block }: Props) {
  if (!block.animationUrl) {
    return null;
  }

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LottieView
        source={{ uri: block.animationUrl }}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  animation: {
    width: "100%",
    height: "100%",
  },
});