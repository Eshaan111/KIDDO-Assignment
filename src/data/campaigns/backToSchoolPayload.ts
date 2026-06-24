import { HomepagePayload } from "../../types/schema";

export const backToSchoolPayload: HomepagePayload = {
  campaignId: "back_to_school",
  theme: {
    primary: "#0057FF",
    background: "#FFE94D",
    text: "#111111",
    card: "#FFFFFF",
  },
  blocks: [
    {
      id: "school_overlay",
      type: "FULL_SCREEN_OVERLAY",
      animationUrl: "https://assets.example.com/pencils.json",
    },
    {
      id: "school_hero",
      type: "BANNER_HERO",
      title: "Back to School Mega Sale",
      subtitle: "Lunchboxes, bags and stationery in minutes",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/campaign/back-to-school",
        },
      },
    },
    {
      id: "lunchbox_collection",
      type: "DYNAMIC_COLLECTION",
      title: "Lunchboxes & Bags",
      products: [
        {
          id: "school_p1",
          name: "Dino Lunchbox",
          price: 299,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "school_p1" },
          },
        },
        {
          id: "school_p2",
          name: "Blue School Bag",
          price: 799,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "school_p2" },
          },
        }
      ],
    },
  ],
};