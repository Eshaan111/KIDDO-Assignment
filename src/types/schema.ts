export type ThemeConfig = {
  primary: string;
  background: string;
  text: string;
  card: string;
};

export type CampaignReferenceAsset = {
  label: string;
  description: string;
};

export type Action =
  | {
      type: "ADD_TO_CART";
      payload: {
        id: string;
      };
    }
  | {
      type: "DEEP_LINK";
      payload: {
        url: string;
      };
    }
  | {
      type: "APPLY_MYSTERY_GIFT_COUPON";
      payload: {
        couponCode: string;
      };
    };

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  action?: Action;
};

export type BannerHeroBlock = {
  id: string;
  type: "BANNER_HERO";
  title: string;
  subtitle?: string;
  imageUrl?: string;
  action?: Action;
};

export type ProductGrid2x2Block = {
  id: string;
  type: "PRODUCT_GRID_2X2";
  title: string;
  products: Product[];
};

export type DynamicCollectionBlock = {
  id: string;
  type: "DYNAMIC_COLLECTION";
  title: string;
  products: Product[];
};

export type OverlayMediaType = "LOTTIE" | "WEBP" | "GIF";

export type FullScreenOverlayBlock = {
  id: string;
  type: "FULL_SCREEN_OVERLAY";
  mediaType: OverlayMediaType;
  animationUrl: string;
  opacity?: number;
  referenceAttachment?: CampaignReferenceAsset;
};

export type UnknownBlock = {
  id: string;
  type: string;
  [key: string]: unknown;
};

export type HomepageBlock =
  | BannerHeroBlock
  | ProductGrid2x2Block
  | DynamicCollectionBlock
  | FullScreenOverlayBlock
  | UnknownBlock;

export type HomepagePayload = {
  campaignId: string;
  theme: ThemeConfig;
  blocks: HomepageBlock[];
};
