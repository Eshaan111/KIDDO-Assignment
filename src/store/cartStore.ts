import { create } from "zustand";

type CartState = {
  count: number;
  productQuantities: Record<string, number>;
  addToCart: (productId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  count: 0,
  productQuantities: {},

  addToCart: (productId: string) =>
    set((state) => {
      const currentQty = state.productQuantities[productId] ?? 0;

      return {
        count: state.count + 1,
        productQuantities: {
          ...state.productQuantities,
          [productId]: currentQty + 1,
        },
      };
    }),
}));
