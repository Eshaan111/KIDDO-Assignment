import { HomepagePayload } from "../types/schema";

export const defaultPayload: HomepagePayload = {
  campaignId: "default",
  theme: {
    primary: "#FF9933",
    background: "#FFF5E6",
    text: "#222222",
    card: "#FFFFFF",
  },
  blocks: [
    {
      id: "hero_1",
      type: "BANNER_HERO",
      title: "Baby Essentials in 10 Minutes",
      subtitle: "Diapers, wipes, snacks and more",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/category/baby-essentials",
        },
      },
    },
    {
      id: "grid_1",
      type: "PRODUCT_GRID_2X2",
      title: "Daily Picks",
      products: [
        {
          id: "p1",
          name: "Baby Wipes",
          price: 99,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "p1" },
          },
        },
        {
          id: "p2",
          name: "Diapers Pack",
          price: 399,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "p2" },
          },
        },
        {
          id: "p3",
          name: "Kids Snack Box",
          price: 149,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "p3" },
          },
        },
        {
          id: "p4",
          name: "Baby Lotion",
          price: 199,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "p4" },
          },
        }
      ],
    },
    {
      id: "collection_1",
      type: "DYNAMIC_COLLECTION",
      title: "Snacks under ₹99",
      products: [
        {
          id: "p5",
          name: "Fruit Bites",
          price: 79,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "p5" },
          },
        },
        {
          id: "p6",
          name: "Mini Cookies",
          price: 89,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "p6" },
          },
        }
      ],
    },
    {
      id: "unknown_1",
      type: "NEW_COMPONENT_V2",
      randomField: "This should not crash the app",
    },
  ],
};