import { HomepagePayload } from "../../types/schema";

export const summerPlayhousePayload: HomepagePayload = {
  campaignId: "summer_playhouse",
  theme: {
    primary: "#00AEEF",
    background: "#E6F9FF",
    text: "#073B4C",
    card: "#FFFFFF",
  },
  blocks: [
    {
      id: "summer_overlay",
      type: "FULL_SCREEN_OVERLAY",
      animationUrl: "https://assets.example.com/water_splash.json",
    },
    {
      id: "summer_hero",
      type: "BANNER_HERO",
      title: "Summer Playhouse Festival",
      subtitle: "Cool toys, outdoor kits and playful events",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/campaign/summer-playhouse",
        },
      },
    },
    {
      id: "zoo_collection",
      type: "DYNAMIC_COLLECTION",
      title: "Petting Zoo Tickets",
      products: [
        {
          id: "summer_p1",
          name: "Petting Zoo Entry Pass",
          price: 499,
          action: {
            type: "DEEP_LINK",
            payload: {
              url: "/events/petting-zoo",
            },
          },
        },
        {
          id: "summer_p2",
          name: "Beach Ball Toy",
          price: 199,
          action: {
            type: "ADD_TO_CART",
            payload: { id: "summer_p2" },
          },
        }
      ],
    },
  ],
};