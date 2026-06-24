import { HomepagePayload } from "../../types/schema";

export const backToSchoolPayload: HomepagePayload = {
  campaignId: "back_to_school",
  theme: {
    primary: "#0057FF",
    background: "#FFE94D",
    text: "#101010",
    card: "#FFFFFF",
  },
  blocks: [
    {
      id: "school_overlay",
      type: "FULL_SCREEN_OVERLAY",
      mediaType: "GIF",
      animationUrl:
        "https://raw.githubusercontent.com/Eshaan111/KIDDO-Assignment/main/assets/animations/school.gif?v=2",
      opacity: 0.4,
      referenceAttachment: {
        label: "Reference Attachment Video 1",
        description:
          "Back to School overlay reference showing paper airplanes and falling pencils.",
      },
    },
    {
      id: "school_hero_main",
      type: "BANNER_HERO",
      title: "Back to School Mega Sale",
      subtitle: "Bags, bottles, notebooks, and lunch picks delivered fast",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/campaign/back-to-school",
        },
      },
    },
    {
      id: "school_grid_essentials",
      type: "PRODUCT_GRID_2X2",
      title: "Classroom Essentials",
      products: [
        { id: "school_grid_1", name: "Dino Lunchbox", price: 299, action: { type: "ADD_TO_CART", payload: { id: "school_grid_1" } } },
        { id: "school_grid_2", name: "Primary Blue School Bag", price: 799, action: { type: "ADD_TO_CART", payload: { id: "school_grid_2" } } },
        { id: "school_grid_3", name: "Yellow Water Bottle", price: 199, action: { type: "ADD_TO_CART", payload: { id: "school_grid_3" } } },
        { id: "school_grid_4", name: "Rocket Pencil Box", price: 179, action: { type: "ADD_TO_CART", payload: { id: "school_grid_4" } } },
      ],
    },
    {
      id: "school_collection_lunch",
      type: "DYNAMIC_COLLECTION",
      title: "Lunchboxes & Bags",
      products: [
        { id: "school_lunch_1", name: "Galaxy Lunch Tote", price: 359, action: { type: "ADD_TO_CART", payload: { id: "school_lunch_1" } } },
        { id: "school_lunch_2", name: "Comet Snack Box", price: 229, action: { type: "ADD_TO_CART", payload: { id: "school_lunch_2" } } },
        { id: "school_lunch_3", name: "Panda Bento Box", price: 329, action: { type: "ADD_TO_CART", payload: { id: "school_lunch_3" } } },
        { id: "school_lunch_4", name: "Explorer School Bag", price: 899, action: { type: "ADD_TO_CART", payload: { id: "school_lunch_4" } } },
        { id: "school_lunch_5", name: "Bottle Carrier Strap", price: 149, action: { type: "ADD_TO_CART", payload: { id: "school_lunch_5" } } },
        { id: "school_lunch_6", name: "Snack Pouch Duo", price: 119, action: { type: "ADD_TO_CART", payload: { id: "school_lunch_6" } } },
        { id: "school_lunch_7", name: "Lunch Napkin Set", price: 89, action: { type: "ADD_TO_CART", payload: { id: "school_lunch_7" } } },
      ],
    },
    {
      id: "school_hero_stationery",
      type: "BANNER_HERO",
      title: "Stationery Refill Rush",
      subtitle: "Notebooks, crayons, and planners under one tap",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/category/stationery",
        },
      },
    },
    {
      id: "school_grid_study",
      type: "PRODUCT_GRID_2X2",
      title: "Desk Setup Picks",
      products: [
        { id: "school_study_1", name: "Galaxy Notebook Pack", price: 179, action: { type: "ADD_TO_CART", payload: { id: "school_study_1" } } },
        { id: "school_study_2", name: "Pastel Marker Set", price: 289, action: { type: "ADD_TO_CART", payload: { id: "school_study_2" } } },
        { id: "school_study_3", name: "Math Geometry Kit", price: 139, action: { type: "ADD_TO_CART", payload: { id: "school_study_3" } } },
        { id: "school_study_4", name: "Weekly Homework Planner", price: 99, action: { type: "ADD_TO_CART", payload: { id: "school_study_4" } } },
      ],
    },
    {
      id: "school_collection_stationery",
      type: "DYNAMIC_COLLECTION",
      title: "Stationery Under Rs 299",
      products: [
        { id: "school_stat_1", name: "Jumbo Crayon Box", price: 239, action: { type: "ADD_TO_CART", payload: { id: "school_stat_1" } } },
        { id: "school_stat_2", name: "Foam Sticker Kit", price: 159, action: { type: "ADD_TO_CART", payload: { id: "school_stat_2" } } },
        { id: "school_stat_3", name: "Eraser Fun Pack", price: 99, action: { type: "ADD_TO_CART", payload: { id: "school_stat_3" } } },
        { id: "school_stat_4", name: "Planner Tabs", price: 79, action: { type: "ADD_TO_CART", payload: { id: "school_stat_4" } } },
        { id: "school_stat_5", name: "Mini Sketch Pad", price: 129, action: { type: "ADD_TO_CART", payload: { id: "school_stat_5" } } },
        { id: "school_stat_6", name: "Alphabet Flash Cards", price: 199, action: { type: "ADD_TO_CART", payload: { id: "school_stat_6" } } },
        { id: "school_stat_7", name: "Magnetic Bookmark Set", price: 109, action: { type: "ADD_TO_CART", payload: { id: "school_stat_7" } } },
      ],
    },
    {
      id: "school_hero_snacks",
      type: "BANNER_HERO",
      title: "Lunch Break Snack Drop",
      subtitle: "Easy lunchbox fillers and after-school munchies",
      action: {
        type: "DEEP_LINK",
        payload: {
          url: "/category/kids-snacks",
        },
      },
    },
    {
      id: "school_grid_uniform",
      type: "PRODUCT_GRID_2X2",
      title: "Morning Ready Picks",
      products: [
        { id: "school_ready_1", name: "No-Spill Bottle", price: 249, action: { type: "ADD_TO_CART", payload: { id: "school_ready_1" } } },
        { id: "school_ready_2", name: "Label Sticker Roll", price: 69, action: { type: "ADD_TO_CART", payload: { id: "school_ready_2" } } },
        { id: "school_ready_3", name: "Socks Combo Pack", price: 199, action: { type: "ADD_TO_CART", payload: { id: "school_ready_3" } } },
        { id: "school_ready_4", name: "Hair Clip Set", price: 89, action: { type: "ADD_TO_CART", payload: { id: "school_ready_4" } } },
      ],
    },
    {
      id: "school_collection_snacks",
      type: "DYNAMIC_COLLECTION",
      title: "Snack Box Fillers",
      products: [
        { id: "school_snack_1", name: "Mini Cookie Bites", price: 79, action: { type: "ADD_TO_CART", payload: { id: "school_snack_1" } } },
        { id: "school_snack_2", name: "Fruit Strip Pack", price: 89, action: { type: "ADD_TO_CART", payload: { id: "school_snack_2" } } },
        { id: "school_snack_3", name: "Cheese Crackers", price: 99, action: { type: "ADD_TO_CART", payload: { id: "school_snack_3" } } },
        { id: "school_snack_4", name: "Choco Milk Box", price: 35, action: { type: "ADD_TO_CART", payload: { id: "school_snack_4" } } },
        { id: "school_snack_5", name: "Fruit Yogurt Cup", price: 45, action: { type: "ADD_TO_CART", payload: { id: "school_snack_5" } } },
        { id: "school_snack_6", name: "Trail Mix Pouch", price: 119, action: { type: "ADD_TO_CART", payload: { id: "school_snack_6" } } },
        { id: "school_snack_7", name: "Energy Bar Mini", price: 55, action: { type: "ADD_TO_CART", payload: { id: "school_snack_7" } } },
      ],
    },
  ],
};
