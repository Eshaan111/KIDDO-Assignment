import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";
import { DynamicCollectionBlock, Product } from "../types/schema";
import { ProductCard } from "./ProductCard";

type Props = {
  block: DynamicCollectionBlock;
};

export const DynamicCollection = React.memo(function DynamicCollection({ block }: Props) {
  const theme = useTheme();

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  const keyExtractor = useCallback((item: Product) => item.id, []);

  if (!block.products?.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: theme.text }]}>{block.title}</Text>

      <FlatList
        horizontal
        data={block.products}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
      />
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    paddingLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
});