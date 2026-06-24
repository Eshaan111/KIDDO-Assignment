import { Action, DetailPageData, DetailPagePrimaryAction } from "../types/schema";
import { getProductImageUrl } from "./withBoilerplateProductImages";

type ProductDetailActionArgs = {
  url: string;
  productId: string;
  name: string;
  price: number;
  description: string;
  backgroundHex: string;
  badge?: string;
  subtitle?: string;
  primaryAction?: DetailPagePrimaryAction;
};

export function createInfoDetailAction(
  url: string,
  pageData: DetailPageData
): Action {
  return {
    type: "DEEP_LINK",
    payload: {
      url,
      pageType: "INFO_PAGE",
      pageData,
    },
  };
}

export function createProductDetailAction({
  url,
  productId,
  name,
  price,
  description,
  backgroundHex,
  badge,
  subtitle,
  primaryAction,
}: ProductDetailActionArgs): Action {
  return {
    type: "DEEP_LINK",
    payload: {
      url,
      pageType: "PRODUCT_DETAIL",
      pageData: {
        title: name,
        subtitle,
        description,
        price,
        badge,
        imageUrl: getProductImageUrl(name, backgroundHex),
        primaryAction:
          primaryAction ?? {
            type: "ADD_TO_CART",
            payload: {
              id: productId,
            },
            label: "Add to cart",
          },
      },
    },
  };
}
