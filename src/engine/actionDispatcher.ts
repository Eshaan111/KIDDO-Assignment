import { router } from "expo-router";

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
      try {
        router.navigate(action.payload.url as never);
      } catch {
        return;
      }
      return;
    }

    case "APPLY_MYSTERY_GIFT_COUPON": {
      return;
    }

    default: {
      return;
    }
  }
}
