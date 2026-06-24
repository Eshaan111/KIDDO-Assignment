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
      console.log("Navigate to:", action.payload.url);
      return;
    }

    case "APPLY_MYSTERY_GIFT_COUPON": {
      console.log("Apply mystery gift coupon:", action.payload.couponCode);
      return;
    }

    default: {
      console.warn("Unsupported action:", action);
      return;
    }
  }
}