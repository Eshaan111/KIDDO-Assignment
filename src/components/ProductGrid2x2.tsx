import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";
import { ProductGrid2x2Block } from "../types/schema";
import { ProductCard } from "./ProductCard";

type Props = {
  block: ProductGrid2x2Block;
};

export const ProductGrid2x2 = React.memo(function ProductGrid2x2({ block }: Props) {
  const theme = useTheme();

  const visibleProducts = useMemo(() => {
    return block.products.slice(0, 4);
  }, [block.products]);

  if (!visibleProducts.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: theme.text }]}>{block.title}</Text>

      <View style={styles.grid}>
        {visibleProducts.map((product) => (
          <View key={product.id} style={styles.gridItem}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridItem: {
    width: "48%",
  },
});