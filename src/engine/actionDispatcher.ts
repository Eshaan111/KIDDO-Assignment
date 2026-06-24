import * as Linking from "expo-linking";
import { Alert } from "react-native";

import { useCartStore } from "../store/cartStore";
import { Action } from "../types/schema";

export function handleAction(action?: Action) {
  if (!action) {
    return;
  }

  switch (action.type) {
    case "ADD_TO_CART": {
      useCartStore.getState().addToCart(action.payload.id);
      return;
    }

    case "DEEP_LINK": {
      const appUrl = Linking.createURL(action.payload.url.replace(/^\//, ""));

      Linking.openURL(appUrl).catch(() => {
        Alert.alert("Navigation unavailable", action.payload.url);
      });
      return;
    }

    case "APPLY_MYSTERY_GIFT_COUPON": {
      Alert.alert(
        "Coupon applied",
        `${action.payload.couponCode} is ready to use.`
      );
      return;
    }

    default: {
      console.warn("Unsupported action:", action);
      return;
    }
  }
}
