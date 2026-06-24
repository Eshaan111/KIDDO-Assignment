import { HomepagePayload } from "../../types/schema";
import {
  createInfoDetailAction,
  createProductDetailAction,
} from "../detailPageFactory";
import { withBoilerplateProductImages } from "../withBoilerplateProductImages";

const baseSummerPlayhousePayload: HomepagePayload = {
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
      mediaType: "WEBP",
      animation_url:
        "https://www.gstatic.com/webp/animated/1.webp",
      opacity: 0.4,
      referenceAttachment: {
        label: "Reference Attachment Video 2",
        description:
          "Summer Playhouse reference showing water splash or beach ball motion.",
      },
    },
    {
      id: "summer_hero_main",
      type: "BANNER_HERO",
      title: "Summer Playhouse Festival",
      subtitle: "Outdoor toys, splash gear, and sunny-day fun delivered fast",
      action: createInfoDetailAction("/campaign/summer-playhouse", {
        title: "Summer Playhouse Festival",
        subtitle: "A bright campaign page for outdoor fun and splash-day essentials.",
        description:
          "Explore beach toys, water play favorites, petting-zoo tickets, and picnic-day add-ons for long sunny weekends.",
        badge: "Campaign",
      }),
    },
    {
      id: "summer_hero_booking",
      type: "BANNER_HERO",
      title: "Specialty Event Booking",
      subtitle: "Reserve petting-zoo entry, pony rides, and family passes from the live payload.",
      action: createInfoDetailAction("/events/summer-booking", {
        title: "Specialty Event Booking",
        subtitle: "A payload-driven booking gateway for seasonal family events.",
        description:
          "This campaign section highlights bookable summer experiences such as zoo entry passes, family bundles, guided rides, and event add-ons.",
        badge: "Booking",
      }),
    },
    {
      id: "summer_grid_outdoor",
      type: "PRODUCT_GRID_2X2",
      title: "Outdoor Play Picks",
      products: [
        { id: "summer_grid_1", name: "Beach Ball Toy", price: 199, action: { type: "ADD_TO_CART", payload: { id: "summer_grid_1" } } },
        { id: "summer_grid_2", name: "Bubble Cannon", price: 349, action: { type: "ADD_TO_CART", payload: { id: "summer_grid_2" } } },
        { id: "summer_grid_3", name: "Mini Water Blaster", price: 229, action: { type: "ADD_TO_CART", payload: { id: "summer_grid_3" } } },
        { id: "summer_grid_4", name: "Sun Hat for Kids", price: 279, action: { type: "ADD_TO_CART", payload: { id: "summer_grid_4" } } },
      ],
    },
    {
      id: "summer_collection_tickets",
      type: "DYNAMIC_COLLECTION",
      title: "Petting Zoo Tickets",
      products: [
        {
          id: "summer_ticket_1",
          name: "Petting Zoo Entry Pass",
          price: 499,
          action: createProductDetailAction({
            url: "/events/petting-zoo",
            productId: "summer_ticket_1",
            name: "Petting Zoo Entry Pass",
            price: 499,
            description: "A playful entry pass for animal meet-and-greet time, feeding zones, and family-friendly summer fun.",
            backgroundHex: "00AEEF",
            badge: "Event Pass",
            subtitle: "One pass to the petting-zoo experience.",
            primaryAction: {
              type: "ADD_TO_CART",
              payload: { id: "summer_ticket_1" },
              label: "Reserve pass",
            },
          }),
        },
        {
          id: "summer_ticket_2",
          name: "Family Zoo Pass",
          price: 1299,
          action: createProductDetailAction({
            url: "/events/petting-zoo-family-pass",
            productId: "summer_ticket_2",
            name: "Family Zoo Pass",
            price: 1299,
            description: "A bundled family ticket designed for group entry, easier planning, and a full afternoon of playhouse fun.",
            backgroundHex: "00AEEF",
            badge: "Family Pass",
            subtitle: "Best value for shared entry.",
            primaryAction: {
              type: "ADD_TO_CART",
              payload: { id: "summer_ticket_2" },
              label: "Reserve family pass",
            },
          }),
        },
        {
          id: "summer_ticket_3",
          name: "Pony Ride Slot",
          price: 299,
          action: createProductDetailAction({
            url: "/events/pony-ride",
            productId: "summer_ticket_3",
            name: "Pony Ride Slot",
            price: 299,
            description: "Book a guided pony ride slot timed for little riders who want a short, supervised summer highlight.",
            backgroundHex: "00AEEF",
            badge: "Timed Slot",
            subtitle: "A guided ride for young explorers.",
            primaryAction: {
              type: "ADD_TO_CART",
              payload: { id: "summer_ticket_3" },
              label: "Reserve slot",
            },
          }),
        },
        {
          id: "summer_ticket_4",
          name: "Mini Farm Tour",
          price: 349,
          action: createProductDetailAction({
            url: "/events/mini-farm-tour",
            productId: "summer_ticket_4",
            name: "Mini Farm Tour",
            price: 349,
            description: "A compact farm walk with easy stops, gentle animal interactions, and quick family photo moments.",
            backgroundHex: "00AEEF",
            badge: "Tour",
            subtitle: "A shorter guided farm experience.",
            primaryAction: {
              type: "ADD_TO_CART",
              payload: { id: "summer_ticket_4" },
              label: "Book tour",
            },
          }),
        },
        { id: "summer_ticket_5", name: "Feed Bucket Add-On", price: 149, action: { type: "ADD_TO_CART", payload: { id: "summer_ticket_5" } } },
        {
          id: "summer_ticket_6",
          name: "Photo Booth Pass",
          price: 199,
          action: createProductDetailAction({
            url: "/events/photo-booth-pass",
            productId: "summer_ticket_6",
            name: "Photo Booth Pass",
            price: 199,
            description: "Add a cheerful summer keepsake stop with a dedicated photo booth pass for families and friend groups.",
            backgroundHex: "00AEEF",
            badge: "Add-On",
            subtitle: "Capture the outing with themed snapshots.",
            primaryAction: {
              type: "ADD_TO_CART",
              payload: { id: "summer_ticket_6" },
              label: "Add photo pass",
            },
          }),
        },
        { id: "summer_ticket_7", name: "Explorer Badge Pack", price: 99, action: { type: "ADD_TO_CART", payload: { id: "summer_ticket_7" } } },
      ],
    },
    {
      id: "summer_hero_pool",
      type: "BANNER_HERO",
      title: "Poolside Play Delivered",
      subtitle: "Floaties, splash mats, and coolers for backyard play",
      action: createInfoDetailAction("/category/pool-play", {
        title: "Poolside Play Delivered",
        subtitle: "Everything needed for splash-heavy backyard afternoons.",
        description:
          "Jump into inflatable rings, splash mats, arm floaties, coolers, and water-friendly extras for fast family setup.",
        badge: "Category",
      }),
    },
    {
      id: "summer_grid_pool",
      type: "PRODUCT_GRID_2X2",
      title: "Pool Day Basics",
      products: [
        { id: "summer_pool_1", name: "Inflatable Ring", price: 399, action: { type: "ADD_TO_CART", payload: { id: "summer_pool_1" } } },
        { id: "summer_pool_2", name: "Splash Mat", price: 699, action: { type: "ADD_TO_CART", payload: { id: "summer_pool_2" } } },
        { id: "summer_pool_3", name: "Arm Floaties", price: 349, action: { type: "ADD_TO_CART", payload: { id: "summer_pool_3" } } },
        { id: "summer_pool_4", name: "Cooling Towel", price: 159, action: { type: "ADD_TO_CART", payload: { id: "summer_pool_4" } } },
      ],
    },
    {
      id: "summer_collection_coolers",
      type: "DYNAMIC_COLLECTION",
      title: "Beat the Heat",
      products: [
        { id: "summer_cool_1", name: "Fruit Freeze Pops", price: 99, action: { type: "ADD_TO_CART", payload: { id: "summer_cool_1" } } },
        { id: "summer_cool_2", name: "Tropical Juice Pack", price: 129, action: { type: "ADD_TO_CART", payload: { id: "summer_cool_2" } } },
        { id: "summer_cool_3", name: "Travel Water Mister", price: 189, action: { type: "ADD_TO_CART", payload: { id: "summer_cool_3" } } },
        {
          id: "summer_cool_4",
          name: "Mini Cooler Box",
          price: 459,
          action: createProductDetailAction({
            url: "/category/pool-play/mini-cooler-box",
            productId: "summer_cool_4",
            name: "Mini Cooler Box",
            price: 459,
            description: "A summer detail-page coupon case for testing visible 20% discounts on a mid-price poolside product.",
            backgroundHex: "00AEEF",
            badge: "Summer Coupon",
            subtitle: "Use a coupon before the next backyard play day.",
            primaryAction: {
              type: "APPLY_MYSTERY_GIFT_COUPON",
              payload: { couponCode: "SUMMER20" },
              label: "Apply coupon",
            },
          }),
        },
        { id: "summer_cool_5", name: "Frozen Yogurt Cups", price: 149, action: { type: "ADD_TO_CART", payload: { id: "summer_cool_5" } } },
        { id: "summer_cool_6", name: "Coconut Water Pack", price: 179, action: { type: "ADD_TO_CART", payload: { id: "summer_cool_6" } } },
        { id: "summer_cool_7", name: "Shade Clip Fan", price: 299, action: { type: "ADD_TO_CART", payload: { id: "summer_cool_7" } } },
      ],
    },
    {
      id: "summer_hero_weekend",
      type: "BANNER_HERO",
      title: "Weekend Sunshine Planner",
      subtitle: "Picnic kits, beach toys, and last-minute outing fixes",
      action: createInfoDetailAction("/campaign/summer-weekend-planner", {
        title: "Weekend Sunshine Planner",
        subtitle: "A route for spontaneous beach, picnic, and outing prep.",
        description:
          "Use this page to browse the fast-moving mix of picnic helpers, travel snacks, outdoor toys, and summer rescue essentials.",
        badge: "Campaign",
      }),
    },
    {
      id: "summer_grid_picnic",
      type: "PRODUCT_GRID_2X2",
      title: "Picnic Ready",
      products: [
        { id: "summer_picnic_1", name: "Shaded Picnic Mat", price: 459, action: { type: "ADD_TO_CART", payload: { id: "summer_picnic_1" } } },
        { id: "summer_picnic_2", name: "Snack Carrier Tote", price: 249, action: { type: "ADD_TO_CART", payload: { id: "summer_picnic_2" } } },
        { id: "summer_picnic_3", name: "Travel Plates Set", price: 139, action: { type: "ADD_TO_CART", payload: { id: "summer_picnic_3" } } },
        { id: "summer_picnic_4", name: "Fruit Wash Spray", price: 89, action: { type: "ADD_TO_CART", payload: { id: "summer_picnic_4" } } },
      ],
    },
    {
      id: "summer_collection_sand",
      type: "DYNAMIC_COLLECTION",
      title: "Sand & Splash Toys",
      products: [
        { id: "summer_sand_1", name: "Bucket & Spade Kit", price: 199, action: { type: "ADD_TO_CART", payload: { id: "summer_sand_1" } } },
        { id: "summer_sand_2", name: "Sand Mold Set", price: 149, action: { type: "ADD_TO_CART", payload: { id: "summer_sand_2" } } },
        { id: "summer_sand_3", name: "Water Wheel Toy", price: 229, action: { type: "ADD_TO_CART", payload: { id: "summer_sand_3" } } },
        { id: "summer_sand_4", name: "Beach Frisbee", price: 119, action: { type: "ADD_TO_CART", payload: { id: "summer_sand_4" } } },
        { id: "summer_sand_5", name: "Foam Glider", price: 99, action: { type: "ADD_TO_CART", payload: { id: "summer_sand_5" } } },
        { id: "summer_sand_6", name: "Sand Truck", price: 269, action: { type: "ADD_TO_CART", payload: { id: "summer_sand_6" } } },
        {
          id: "summer_sand_7",
          name: "Beach Ball XL",
          price: 249,
          action: createProductDetailAction({
            url: "/campaign/summer-weekend-planner/beach-ball-xl",
            productId: "summer_sand_7",
            name: "Beach Ball XL",
            price: 249,
            description: "A second summer coupon example so the main campaign also contains a payload-driven discount flow outside the ticket section.",
            backgroundHex: "00AEEF",
            badge: "Weekend Coupon",
            subtitle: "Applies the same 20% coupon behavior on a toy item.",
            primaryAction: {
              type: "APPLY_MYSTERY_GIFT_COUPON",
              payload: { couponCode: "SUMMER20" },
              label: "Apply coupon",
            },
          }),
        },
      ],
    },
  ],
};

export const summerPlayhousePayload = withBoilerplateProductImages(
  baseSummerPlayhousePayload,
  "00AEEF"
);




