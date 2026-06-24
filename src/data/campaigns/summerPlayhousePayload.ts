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
      mediaType: "LOTTIE",
      animationUrl:
        "https://raw.githubusercontent.com/airbnb/lottie-web/master/demo/gatin/data.json",
      fallbackLocalAsset: "assets/animations/summer-playhouse-overlay.json",
      localAssetPlaceholders: {
        lottieJson: "assets/animations/summer-playhouse-overlay.json",
        gif: "assets/animations/summer-playhouse-overlay.gif",
        webp: "assets/animations/summer-playhouse-overlay.webp",
      },
      opacity: 0.2,
      referenceAttachment: {
        label: "Reference Attachment Video 2",
        localPlaceholder: "docs/reference-assets/video-2-summer-playhouse.mp4",
        description:
          "Summer Playhouse reference showing water splash or beach ball motion.",
      },
    },
    {
      id: "summer_hero_main",
      type: "BANNER_HERO",
      title: "Summer Playhouse Festival",
      subtitle: "Outdoor toys, splash gear, and sunny-day fun delivered fast",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/campaign/summer-playhouse",
        },
      },
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
        { id: "summer_ticket_1", name: "Petting Zoo Entry Pass", price: 499, action: { type: "DEEP_LINK", payload: { url: "/events/petting-zoo" } } },
        { id: "summer_ticket_2", name: "Family Zoo Pass", price: 1299, action: { type: "DEEP_LINK", payload: { url: "/events/petting-zoo-family-pass" } } },
        { id: "summer_ticket_3", name: "Pony Ride Slot", price: 299, action: { type: "DEEP_LINK", payload: { url: "/events/pony-ride" } } },
        { id: "summer_ticket_4", name: "Mini Farm Tour", price: 349, action: { type: "DEEP_LINK", payload: { url: "/events/mini-farm-tour" } } },
        { id: "summer_ticket_5", name: "Feed Bucket Add-On", price: 149, action: { type: "ADD_TO_CART", payload: { id: "summer_ticket_5" } } },
        { id: "summer_ticket_6", name: "Photo Booth Pass", price: 199, action: { type: "DEEP_LINK", payload: { url: "/events/photo-booth-pass" } } },
        { id: "summer_ticket_7", name: "Explorer Badge Pack", price: 99, action: { type: "ADD_TO_CART", payload: { id: "summer_ticket_7" } } },
      ],
    },
    {
      id: "summer_hero_pool",
      type: "BANNER_HERO",
      title: "Poolside Play Delivered",
      subtitle: "Floaties, splash mats, and coolers for backyard play",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/category/pool-play",
        },
      },
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
        { id: "summer_cool_4", name: "Mini Cooler Box", price: 459, action: { type: "ADD_TO_CART", payload: { id: "summer_cool_4" } } },
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
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/campaign/summer-weekend-planner",
        },
      },
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
        { id: "summer_sand_7", name: "Beach Ball XL", price: 249, action: { type: "ADD_TO_CART", payload: { id: "summer_sand_7" } } },
      ],
    },
  ],
};
