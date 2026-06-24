import { HomepagePayload } from "../../types/schema";

export const mysteryGiftPayload: HomepagePayload = {
  campaignId: "mystery_gift_carnival",
  theme: {
    primary: "#E60023",
    background: "#FFF0F3",
    text: "#2B0008",
    card: "#FFFFFF",
  },
  blocks: [
    {
      id: "carnival_overlay",
      type: "FULL_SCREEN_OVERLAY",
      animationUrl: "https://assets.example.com/confetti_carnival.json",
    },
    {
      id: "carnival_hero",
      type: "BANNER_HERO",
      title: "Mystery Gift Carnival",
      subtitle: "Add products and unlock surprise gifts",
      action: {
        type: "APPLY_MYSTERY_GIFT_COUPON",
        payload: {
          couponCode: "MYSTERYKIDDO",
        },
      },
    },
    {
      id: "gift_collection",
      type: "DYNAMIC_COLLECTION",
      title: "Unlock Mystery Gifts",
      products: [
        {
          id: "gift_p1",
          name: "Surprise Toy Box",
          price: 349,
          action: {
            type: "APPLY_MYSTERY_GIFT_COUPON",
            payload: {
              couponCode: "MYSTERYKIDDO",
            },
          },
        },
        {
          id: "gift_p2",
          name: "Carnival Candy Pack",
          price: 99,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "gift_p2" },
          },
        }
      ],
    },
  ],
};