import {
  Action,
  BannerHeroBlock,
  DetailPageData,
  DetailPageType,
  DynamicCollectionBlock,
  HomepageBlock,
  HomepagePayload,
  ProductGrid2x2Block,
} from "../types/schema";

type RegisteredRoute = {
  pageType?: DetailPageType;
  pageData?: DetailPageData;
};

const routeRegistry = new Map<string, RegisteredRoute>();

function normalizeRouteUrl(url: string) {
  if (!url.startsWith("/")) {
    return `/${url}`;
  }

  return url;
}

function registerDeepLinkAction(action?: Action) {
  if (action?.type !== "DEEP_LINK") {
    return;
  }

  routeRegistry.set(normalizeRouteUrl(action.payload.url), {
    pageType: action.payload.pageType,
    pageData: action.payload.pageData,
  });
}

function registerBlockRoutes(block: HomepageBlock) {
  if (block.type === "BANNER_HERO") {
    registerDeepLinkAction((block as BannerHeroBlock).action);
    return;
  }

  if (block.type === "PRODUCT_GRID_2X2") {
    (block as ProductGrid2x2Block).products.forEach((product) => {
      registerDeepLinkAction(product.action);
    });
    return;
  }

  if (block.type === "DYNAMIC_COLLECTION") {
    (block as DynamicCollectionBlock).products.forEach((product) => {
      registerDeepLinkAction(product.action);
    });
  }
}

export function registerPayloadRoutes(payload: HomepagePayload) {
  payload.blocks.forEach(registerBlockRoutes);
}

export function getRegisteredRoute(url: string) {
  return routeRegistry.get(normalizeRouteUrl(url));
}

export function getRouteUrlFromSegments(segments?: string | string[]) {
  if (Array.isArray(segments)) {
    return `/${segments.join("/")}`;
  }

  if (typeof segments === "string" && segments.length > 0) {
    return `/${segments}`;
  }

  return "/";
}
