import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";
import { handleAction } from "../engine/actionDispatcher";
import { Product } from "../types/schema";

type Props = {
  product: Product;
};

export const ProductCard = React.memo(function ProductCard({ product }: Props) {
  const theme = useTheme();

  const onAddPress = useCallback(() => {
    handleAction(product.action);
  }, [product.action]);

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}> 
      <View style={styles.imagePlaceholder}>
        <Text>Image</Text>
      </View>

      <Text style={[styles.name, { color: theme.text }]} numberOfLines={2}>
        {product.name}
      </Text>

      <Text style={[styles.price, { color: theme.text }]}>₹{product.price}</Text>

      <Pressable
        onPress={onAddPress}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: 140,
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
  },
  imagePlaceholder: {
    height: 90,
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});


