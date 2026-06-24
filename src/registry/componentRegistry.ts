import { ComponentType } from "react";

import { BannerHero } from "../components/BannerHero";
import { DynamicCollection } from "../components/DynamicCollection";
import { ProductGrid2x2 } from "../components/ProductGrid2x2";

export const componentRegistry: Record<string, ComponentType<any>> = {
  BANNER_HERO: BannerHero,
  PRODUCT_GRID_2X2: ProductGrid2x2,
  DYNAMIC_COLLECTION: DynamicCollection,
};