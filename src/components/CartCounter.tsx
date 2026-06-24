import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCartStore } from "../store/cartStore";

export const CartCounter = React.memo(function CartCounter() {
  const count = useCartStore((state) => state.count);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart: {count}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#111111",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});