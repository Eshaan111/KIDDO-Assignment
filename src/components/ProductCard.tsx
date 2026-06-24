import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { useTheme } from "../context/ThemeContext";
import { handleAction } from "../engine/actionDispatcher";
import { useCartStore } from "../store/cartStore";
import { Product } from "../types/schema";

type Props = {
  product: Product;
};

function getProductButtonLabel(product: Product) {
  switch (product.action?.type) {
    case "ADD_TO_CART":
      return "Add";
    case "DEEP_LINK":
      return "Open";
    case "APPLY_MYSTERY_GIFT_COUPON":
      return "Unlock";
    default:
      return "Unavailable";
  }
}

export const ProductCard = React.memo(function ProductCard({ product }: Props) {
  const theme = useTheme();
  const quantity = useCartStore(
    (state) => state.productQuantities[product.id] ?? 0
  );
  const isAddToCartAction = product.action?.type === "ADD_TO_CART";
  const isDisabled = !product.action;
  const buttonLabel = getProductButtonLabel(product);

  const onAddPress = useCallback(() => {
    handleAction(product.action);
  }, [product.action]);

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.imageFrame}>
        {product.imageUrl ? (
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.image}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={150}
          />
        ) : (
          <View style={styles.imageFallback}>
            <Text>Image</Text>
          </View>
        )}
      </View>

      <View style={styles.contentArea}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={[styles.price, { color: theme.text }]}>Rs {product.price}</Text>

        <Text style={[styles.quantity, { color: theme.primary }]} numberOfLines={1}>
          {isAddToCartAction && quantity > 0 ? `In cart: ${quantity}` : " "}
        </Text>
      </View>

      <Pressable
        onPress={onAddPress}
        disabled={isDisabled}
        style={[
          styles.button,
          { backgroundColor: isDisabled ? "#C7CCD4" : theme.primary },
        ]}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: 170,
    minHeight: 250,
    borderRadius: 16,
    padding: 12,
    marginRight: 8,
  },
  imageFrame: {
    height: 90,
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
    marginBottom: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentArea: {
    flex: 1,
  },
  name: {
    minHeight: 40,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  price: {
    marginTop: 6,
    minHeight: 20,
    fontSize: 14,
    fontWeight: "700",
  },
  quantity: {
    marginTop: 6,
    minHeight: 18,
    fontSize: 12,
    fontWeight: "700",
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
