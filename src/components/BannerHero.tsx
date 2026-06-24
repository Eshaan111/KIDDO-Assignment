import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { useTheme } from "../context/ThemeContext";
import { handleAction } from "../engine/actionDispatcher";
import { BannerHeroBlock } from "../types/schema";

type Props = {
  block: BannerHeroBlock;
};

export const BannerHero = React.memo(function BannerHero({ block }: Props) {
  const theme = useTheme();

  const onPress = useCallback(() => {
    handleAction(block.action);
  }, [block.action]);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor: theme.primary }]}
    >
      <Text style={styles.title}>{block.title}</Text>

      {block.subtitle ? (
        <Text style={styles.subtitle}>{block.subtitle}</Text>
      ) : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 24,
    minHeight: 160,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#FFFFFF",
  },
});