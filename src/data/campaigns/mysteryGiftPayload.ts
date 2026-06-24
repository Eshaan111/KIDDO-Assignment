import { HomepagePayload } from "../../types/schema";
import { withBoilerplateProductImages } from "../withBoilerplateProductImages";

const baseMysteryGiftPayload: HomepagePayload = {
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
      mediaType: "GIF",
      animationUrl:
        "https://raw.githubusercontent.com/Eshaan111/KIDDO-Assignment/main/assets/animations/carnival.gif",
      opacity: 0.4,
      referenceAttachment: {
        label: "Reference Attachment Video 3",
        description:
          "Mystery Gift Carnival reference showing burst popping confetti animation.",
      },
    },
    {
      id: "mystery_hero_main",
      type: "BANNER_HERO",
      title: "Mystery Gift Carnival",
      subtitle: "Unlock surprise drops, coupons, and party picks through the day",
      action: {
        type: "APPLY_MYSTERY_GIFT_COUPON",
        payload: {
          couponCode: "MYSTERYKIDDO",
        },
      },
    },
    {
      id: "mystery_grid_quick",
      type: "PRODUCT_GRID_2X2",
      title: "Quick Unlock Picks",
      products: [
        { id: "mystery_grid_1", name: "Surprise Toy Box", price: 349, action: { type: "ADD_TO_CART", payload: { id: "mystery_grid_1" } } },
        { id: "mystery_grid_2", name: "Carnival Candy Pack", price: 99, action: { type: "ADD_TO_CART", payload: { id: "mystery_grid_2" } } },
        { id: "mystery_grid_3", name: "Mystery Sticker Roll", price: 129, action: { type: "ADD_TO_CART", payload: { id: "mystery_grid_3" } } },
        { id: "mystery_grid_4", name: "Prize Booth Tokens", price: 179, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "MYSTERYKIDDO" } } },
      ],
    },
    {
      id: "mystery_collection_unlock",
      type: "DYNAMIC_COLLECTION",
      title: "Unlock Mystery Gifts",
      products: [
        { id: "mystery_unlock_1", name: "Golden Envelope Pack", price: 249, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "MYSTERYKIDDO" } } },
        { id: "mystery_unlock_2", name: "Confetti Candy Tube", price: 109, action: { type: "ADD_TO_CART", payload: { id: "mystery_unlock_2" } } },
        { id: "mystery_unlock_3", name: "Mystery Plush Capsule", price: 399, action: { type: "ADD_TO_CART", payload: { id: "mystery_unlock_3" } } },
        { id: "mystery_unlock_4", name: "Clue Card Set", price: 159, action: { type: "DEEP_LINK", payload: { url: "/campaign/mystery-gift/rules" } } },
        { id: "mystery_unlock_5", name: "Spin Wheel Entry", price: 89, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "MYSTERYKIDDO" } } },
        { id: "mystery_unlock_6", name: "Rainbow Prize Pouch", price: 219, action: { type: "ADD_TO_CART", payload: { id: "mystery_unlock_6" } } },
        { id: "mystery_unlock_7", name: "Lucky Reveal Card", price: 129, action: { type: "DEEP_LINK", payload: { url: "/campaign/mystery-gift/reveal" } } },
      ],
    },
    {
      id: "mystery_hero_bonus",
      type: "BANNER_HERO",
      title: "Tonight's Bonus Reveal",
      subtitle: "Timed drops and surprise coupon windows are live",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/campaign/mystery-gift/bonus-reveal",
        },
      },
    },
    {
      id: "mystery_grid_party",
      type: "PRODUCT_GRID_2X2",
      title: "Party Favors Ready",
      products: [
        { id: "mystery_party_1", name: "Glow Wristband Set", price: 149, action: { type: "ADD_TO_CART", payload: { id: "mystery_party_1" } } },
        { id: "mystery_party_2", name: "Lucky Dip Tokens", price: 129, action: { type: "ADD_TO_CART", payload: { id: "mystery_party_2" } } },
        { id: "mystery_party_3", name: "Mini Pinwheel Pack", price: 79, action: { type: "ADD_TO_CART", payload: { id: "mystery_party_3" } } },
        { id: "mystery_party_4", name: "Magic Reveal Cards", price: 169, action: { type: "DEEP_LINK", payload: { url: "/campaign/mystery-gift/reveal-cards" } } },
      ],
    },
    {
      id: "mystery_collection_party",
      type: "DYNAMIC_COLLECTION",
      title: "Party Favors & Lucky Picks",
      products: [
        { id: "mystery_pick_1", name: "Jumbo Prize Hamper", price: 599, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "MYSTERYKIDDO" } } },
        { id: "mystery_pick_2", name: "Glow Star Wand", price: 119, action: { type: "ADD_TO_CART", payload: { id: "mystery_pick_2" } } },
        { id: "mystery_pick_3", name: "Confetti Cone Set", price: 159, action: { type: "ADD_TO_CART", payload: { id: "mystery_pick_3" } } },
        { id: "mystery_pick_4", name: "Treasure Token Pack", price: 99, action: { type: "ADD_TO_CART", payload: { id: "mystery_pick_4" } } },
        { id: "mystery_pick_5", name: "Magic Hat Prop", price: 189, action: { type: "ADD_TO_CART", payload: { id: "mystery_pick_5" } } },
        { id: "mystery_pick_6", name: "Prize Wheel Mini", price: 279, action: { type: "ADD_TO_CART", payload: { id: "mystery_pick_6" } } },
        { id: "mystery_pick_7", name: "Sparkle Ticket Book", price: 139, action: { type: "ADD_TO_CART", payload: { id: "mystery_pick_7" } } },
      ],
    },
    {
      id: "mystery_hero_drop",
      type: "BANNER_HERO",
      title: "Hourly Drop Alerts",
      subtitle: "Tap in before surprise prizes disappear",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/campaign/mystery-gift/hourly-drops",
        },
      },
    },
    {
      id: "mystery_grid_tokens",
      type: "PRODUCT_GRID_2X2",
      title: "Booth Counter Specials",
      products: [
        { id: "mystery_booth_1", name: "Candy Coin Tub", price: 89, action: { type: "ADD_TO_CART", payload: { id: "mystery_booth_1" } } },
        { id: "mystery_booth_2", name: "Mystery Popper", price: 149, action: { type: "ADD_TO_CART", payload: { id: "mystery_booth_2" } } },
        { id: "mystery_booth_3", name: "Golden Ticket Roll", price: 199, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "MYSTERYKIDDO" } } },
        { id: "mystery_booth_4", name: "Party Mask Pack", price: 129, action: { type: "ADD_TO_CART", payload: { id: "mystery_booth_4" } } },
      ],
    },
    {
      id: "mystery_collection_sweets",
      type: "DYNAMIC_COLLECTION",
      title: "Sweet Treat Unlocks",
      products: [
        { id: "mystery_sweet_1", name: "Rainbow Candy Rope", price: 69, action: { type: "ADD_TO_CART", payload: { id: "mystery_sweet_1" } } },
        { id: "mystery_sweet_2", name: "Choco Confetti Bar", price: 79, action: { type: "ADD_TO_CART", payload: { id: "mystery_sweet_2" } } },
        { id: "mystery_sweet_3", name: "Lollipop Spinner", price: 49, action: { type: "ADD_TO_CART", payload: { id: "mystery_sweet_3" } } },
        { id: "mystery_sweet_4", name: "Fruit Jelly Mix", price: 99, action: { type: "ADD_TO_CART", payload: { id: "mystery_sweet_4" } } },
        { id: "mystery_sweet_5", name: "Caramel Pop Bites", price: 89, action: { type: "ADD_TO_CART", payload: { id: "mystery_sweet_5" } } },
        { id: "mystery_sweet_6", name: "Mystery Fizz Bottle", price: 59, action: { type: "ADD_TO_CART", payload: { id: "mystery_sweet_6" } } },
        { id: "mystery_sweet_7", name: "Candy Wheel Pack", price: 109, action: { type: "ADD_TO_CART", payload: { id: "mystery_sweet_7" } } },
      ],
    },
  ],
};
export const mysteryGiftPayload = withBoilerplateProductImages(
  baseMysteryGiftPayload,
  "E60023"
);

