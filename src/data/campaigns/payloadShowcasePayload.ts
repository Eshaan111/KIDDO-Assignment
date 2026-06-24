import { HomepagePayload } from "../../types/schema";
import {
  createInfoDetailAction,
  createProductDetailAction,
} from "../detailPageFactory";
import { withBoilerplateProductImages } from "../withBoilerplateProductImages";

const basePayloadShowcasePayload: HomepagePayload = {
  campaignId: "payload_showcase_lab",
  theme: {
    primary: "#0F766E",
    background: "#F4FFF8",
    text: "#0F172A",
    card: "#FFFFFF",
  },
  blocks: [
    {
      id: "showcase_overlay",
      type: "FULL_SCREEN_OVERLAY",
      mediaType: "GIF",
      animationUrl:
        "https://raw.githubusercontent.com/Eshaan111/KIDDO-Assignment/main/assets/animations/summer.gif",
      opacity: 0.18,
      referenceAttachment: {
        label: "Payload Showcase Overlay",
        description:
          "A lightweight overlay for testing the payload showcase campaign end to end.",
      },
    },
    {
      id: "showcase_hero_main",
      type: "BANNER_HERO",
      title: "Payload Showcase Lab",
      subtitle: "One campaign that exercises add, open, unlock, disabled, and detail page flows",
      action: createInfoDetailAction("/labs/payload-showcase", {
        title: "Payload Showcase Lab",
        subtitle: "A single route for understanding every interactive pattern in this assignment.",
        description:
          "This campaign exists purely for testing. It contains normal cart products, payload-driven product detail pages, info pages, coupon actions, and items with intentionally missing actions so the UI can show a disabled CTA state.",
        badge: "Showcase",
      }),
    },
    {
      id: "showcase_grid_core",
      type: "PRODUCT_GRID_2X2",
      title: "Core CTA Cases",
      products: [
        {
          id: "showcase_core_1",
          name: "Starter Science Kit",
          price: 549,
          action: { type: "ADD_TO_CART", payload: { id: "showcase_core_1" } },
        },
        {
          id: "showcase_core_2",
          name: "Explorer Pass Card",
          price: 249,
          action: createProductDetailAction({
            url: "/labs/payload-showcase/explorer-pass",
            productId: "showcase_core_2",
            name: "Explorer Pass Card",
            price: 249,
            description:
              "A payload-driven detail page example that opens a full-screen generic page and then lets the user continue with a cart CTA.",
            backgroundHex: "0F766E",
            badge: "Detail Page",
            subtitle: "Opens a generic product page from payload data.",
            primaryAction: {
              type: "ADD_TO_CART",
              payload: { id: "showcase_core_2" },
              label: "Add pass",
            },
          }),
        },
        {
          id: "showcase_core_3",
          name: "Mystery Reward Token",
          price: 99,
          action: {
            type: "APPLY_MYSTERY_GIFT_COUPON",
            payload: { couponCode: "LABTOKEN" },
          },
        },
        {
          id: "showcase_core_4",
          name: "Server Pending Item",
          price: 129,
        },
      ],
    },
    {
      id: "showcase_collection_tickets",
      type: "DYNAMIC_COLLECTION",
      title: "Mixed Product Actions",
      products: [
        {
          id: "showcase_mix_1",
          name: "Workshop Entry Ticket",
          price: 399,
          action: createProductDetailAction({
            url: "/labs/payload-showcase/workshop-entry",
            productId: "showcase_mix_1",
            name: "Workshop Entry Ticket",
            price: 399,
            description:
              "This tests a deep link whose generic page still ends in a cart-style reservation button.",
            backgroundHex: "0F766E",
            badge: "Event",
            subtitle: "Payload-backed event reservation page.",
            primaryAction: {
              type: "ADD_TO_CART",
              payload: { id: "showcase_mix_1" },
              label: "Reserve ticket",
            },
          }),
        },
        {
          id: "showcase_mix_2",
          name: "Collector Badge",
          price: 149,
          action: { type: "ADD_TO_CART", payload: { id: "showcase_mix_2" } },
        },
        {
          id: "showcase_mix_3",
          name: "Unlock Hint Envelope",
          price: 119,
          action: createProductDetailAction({
            url: "/labs/payload-showcase/unlock-hint-envelope",
            productId: "showcase_mix_3",
            name: "Unlock Hint Envelope",
            price: 119,
            description:
              "A detail page where the primary CTA is not add-to-cart but coupon application, useful for mystery or promo flows.",
            backgroundHex: "0F766E",
            badge: "Coupon Flow",
            subtitle: "Shows a generic page with an Unlock CTA.",
            primaryAction: {
              type: "APPLY_MYSTERY_GIFT_COUPON",
              payload: { couponCode: "LABTOKEN" },
              label: "Apply coupon",
            },
          }),
        },
        {
          id: "showcase_mix_4",
          name: "Guidebook Download Card",
          price: 89,
          action: createProductDetailAction({
            url: "/labs/payload-showcase/guidebook-download",
            productId: "showcase_mix_4",
            name: "Guidebook Download Card",
            price: 89,
            description:
              "A small ticket-like card that exists mainly to exercise payload-driven route rendering with descriptive content.",
            backgroundHex: "0F766E",
            badge: "Info + Product",
            subtitle: "Another generic page example with image and price.",
          }),
        },
        {
          id: "showcase_mix_5",
          name: "Mini Surprise Capsule",
          price: 59,
          action: { type: "ADD_TO_CART", payload: { id: "showcase_mix_5" } },
        },
        {
          id: "showcase_mix_6",
          name: "Action Missing Demo",
          price: 79,
        },
        {
          id: "showcase_mix_7",
          name: "Late Sync Product",
          price: 99,
        },
      ],
    },
    {
      id: "showcase_hero_rules",
      type: "BANNER_HERO",
      title: "Open A Pure Payload Info Page",
      subtitle: "No dedicated screen file, just payload content rendered through the generic route",
      action: createInfoDetailAction("/labs/payload-showcase/rules", {
        title: "Payload Rules Reference",
        subtitle: "This route exists only because the payload registered it.",
        description:
          "Use this pattern when the backend wants to control copy, badge, CTA, and page purpose without forcing the app to ship one route file per destination.",
        badge: "Info Route",
      }),
    },
    {
      id: "showcase_grid_disabled",
      type: "PRODUCT_GRID_2X2",
      title: "Disabled Button Cases",
      products: [
        { id: "showcase_disabled_1", name: "Unmapped Plush Cube", price: 199 },
        { id: "showcase_disabled_2", name: "Backend Draft Notebook", price: 159 },
        { id: "showcase_disabled_3", name: "Review Pending Snack Pack", price: 129 },
        {
          id: "showcase_disabled_4",
          name: "Approved Action Item",
          price: 179,
          action: { type: "ADD_TO_CART", payload: { id: "showcase_disabled_4" } },
        },
      ],
    },
    {
      id: "showcase_collection_large",
      type: "DYNAMIC_COLLECTION",
      title: "Large Horizontal Regression Set",
      products: [
        { id: "showcase_reg_1", name: "Rainbow Lab Bottle", price: 149, action: { type: "ADD_TO_CART", payload: { id: "showcase_reg_1" } } },
        { id: "showcase_reg_2", name: "Galaxy Study Bag", price: 699, action: { type: "ADD_TO_CART", payload: { id: "showcase_reg_2" } } },
        { id: "showcase_reg_3", name: "Magic Reveal Coupon Card", price: 139, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "LABTOKEN" } } },
        { id: "showcase_reg_4", name: "Payload Detail Pass", price: 229, action: createProductDetailAction({ url: "/labs/payload-showcase/detail-pass", productId: "showcase_reg_4", name: "Payload Detail Pass", price: 229, description: "Another product that opens a generic page and then offers a direct add-to-cart CTA.", backgroundHex: "0F766E", badge: "Detail", subtitle: "Regression coverage for repeated generic detail usage." }) },
        { id: "showcase_reg_5", name: "Silent Disabled Item", price: 89 },
        { id: "showcase_reg_6", name: "Sticker Mystery Roll", price: 109, action: { type: "ADD_TO_CART", payload: { id: "showcase_reg_6" } } },
        { id: "showcase_reg_7", name: "Unlock Booth Ticket", price: 189, action: createProductDetailAction({ url: "/labs/payload-showcase/unlock-booth-ticket", productId: "showcase_reg_7", name: "Unlock Booth Ticket", price: 189, description: "Shows a product detail page whose main job is to trigger a coupon-based action instead of normal add-to-cart.", backgroundHex: "0F766E", badge: "Unlock", subtitle: "Coupon-led detail route.", primaryAction: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "LABTOKEN" }, label: "Apply coupon" } }) },
      ],
    },
    {
      id: "showcase_hero_category",
      type: "BANNER_HERO",
      title: "Category Style Payload Page",
      subtitle: "Another info-page route to test multiple generic destinations in one campaign",
      action: createInfoDetailAction("/labs/payload-showcase/category-slate", {
        title: "Category Slate",
        subtitle: "A payload-only route that behaves like a lightweight category landing page.",
        description:
          "This helps test whether multiple info pages can coexist with product detail pages and still navigate cleanly through the same catch-all route.",
        badge: "Category",
      }),
    },
    {
      id: "showcase_grid_mixed_2",
      type: "PRODUCT_GRID_2X2",
      title: "Action Label Coverage",
      products: [
        { id: "showcase_labels_1", name: "Cart Button Demo", price: 209, action: { type: "ADD_TO_CART", payload: { id: "showcase_labels_1" } } },
        { id: "showcase_labels_2", name: "Open Button Demo", price: 289, action: createProductDetailAction({ url: "/labs/payload-showcase/open-button-demo", productId: "showcase_labels_2", name: "Open Button Demo", price: 289, description: "Used to verify that product cards show Open when the action is a deep link.", backgroundHex: "0F766E", badge: "Open CTA", subtitle: "Button label should read Open." }) },
        { id: "showcase_labels_3", name: "Unlock Button Demo", price: 129, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "LABTOKEN" } } },
        { id: "showcase_labels_4", name: "Unavailable Button Demo", price: 99 },
      ],
    },
    {
      id: "showcase_collection_final",
      type: "DYNAMIC_COLLECTION",
      title: "Long Tail Regression Shelf",
      products: [
        { id: "showcase_tail_1", name: "Beach Ball Study Break", price: 119, action: { type: "ADD_TO_CART", payload: { id: "showcase_tail_1" } } },
        { id: "showcase_tail_2", name: "Notebook Refresh Set", price: 199, action: { type: "ADD_TO_CART", payload: { id: "showcase_tail_2" } } },
        { id: "showcase_tail_3", name: "Prize Envelope Deluxe", price: 249, action: createProductDetailAction({ url: "/labs/payload-showcase/prize-envelope-deluxe", productId: "showcase_tail_3", name: "Prize Envelope Deluxe", price: 249, description: "A final generic product page sample so the showcase campaign includes repeated, realistic deep-link destinations.", backgroundHex: "0F766E", badge: "Deep Link Product", subtitle: "End-to-end payload route coverage." }) },
        { id: "showcase_tail_4", name: "Coupon Test Strip", price: 69, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { couponCode: "LABTOKEN" } } },
        { id: "showcase_tail_5", name: "Disabled Fallback Trial", price: 59 },
        { id: "showcase_tail_6", name: "Water Mister Pocket", price: 149, action: { type: "ADD_TO_CART", payload: { id: "showcase_tail_6" } } },
        { id: "showcase_tail_7", name: "Guide Route Card", price: 129, action: createProductDetailAction({ url: "/labs/payload-showcase/guide-route-card", productId: "showcase_tail_7", name: "Guide Route Card", price: 129, description: "Used for one more generic product-detail example with normal add-to-cart behavior.", backgroundHex: "0F766E", badge: "Guide", subtitle: "Small detail page regression case." }) },
      ],
    },
  ],
};

export const payloadShowcasePayload = withBoilerplateProductImages(
  basePayloadShowcasePayload,
  "0F766E"
);

