import {
  DynamicCollectionBlock,
  HomepageBlock,
  HomepagePayload,
  Product,
  ProductGrid2x2Block,
} from "../types/schema";

const IMAGE_URLS = {
  schoolBag:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/School_bag_backpack.jpg/250px-School_bag_backpack.jpg",
  waterBottle:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Metal_Water_Bottles.jpeg/250px-Metal_Water_Bottles.jpeg",
  lunchbox:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Lunch_boxes.jpg/250px-Lunch_boxes.jpg",
  pencilCase:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Skolni_penal.jpg/250px-Skolni_penal.jpg",
  crayons:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Crayones_cera.jpg/330px-Crayones_cera.jpg",
  notebook:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Notebooks-rainbow.jpg/250px-Notebooks-rainbow.jpg",
  cookies:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Chocolate_chip_cookies.jpg/250px-Chocolate_chip_cookies.jpg",
  picnicBasket:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Picknickkoffer_-_Picnic_hamper_%284902176744%29.jpg/250px-Picknickkoffer_-_Picnic_hamper_%284902176744%29.jpg",
  lollipop:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Farbenfrohe_Lollipops%2C_Austria.jpg/250px-Farbenfrohe_Lollipops%2C_Austria.jpg",
  waterGun:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Water_guns_%2815277272649%29.jpg/250px-Water_guns_%2815277272649%29.jpg",
  beachBall:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/BeachBall.jpg/250px-BeachBall.jpg",
  giftBox:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Jewel_box.JPG/250px-Jewel_box.JPG",
  gummyCandy:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Gummy_bears.jpg/120px-Gummy_bears.jpg",
  chocolateBox:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/White-Box-of-Chocolates.jpg/250px-White-Box-of-Chocolates.jpg",
} as const;

type ImageKey = keyof typeof IMAGE_URLS;

type KeywordRule = {
  image: ImageKey;
  keywords: string[];
};

const IMAGE_RULES: KeywordRule[] = [
  { image: "schoolBag", keywords: ["bag", "backpack", "tote"] },
  { image: "waterBottle", keywords: ["bottle", "mister", "milk", "water"] },
  { image: "lunchbox", keywords: ["lunch", "bento", "snack box"] },
  { image: "pencilCase", keywords: ["pencil", "geometry", "clip", "strap", "label"] },
  { image: "crayons", keywords: ["marker", "crayon", "sticker", "eraser"] },
  { image: "notebook", keywords: ["notebook", "planner", "sketch", "pad", "cards", "bookmark"] },
  { image: "cookies", keywords: ["cookie", "cracker", "bar", "bites", "mix", "yogurt", "juice", "coconut"] },
  { image: "waterGun", keywords: ["bubble", "blaster", "spray", "splash"] },
  { image: "beachBall", keywords: ["beach", "ball", "ring", "float", "frisbee"] },
  { image: "picnicBasket", keywords: ["picnic", "cooler", "bucket", "spade", "carrier", "plates", "truck"] },
  { image: "giftBox", keywords: ["gift", "surprise", "prize", "mystery", "envelope", "hamper", "reveal"] },
  { image: "lollipop", keywords: ["lollipop", "wand", "spinner", "popper", "candy"] },
  { image: "gummyCandy", keywords: ["jelly", "gummy", "fruit", "cheese", "caramel", "fizz"] },
  { image: "chocolateBox", keywords: ["choco", "chocolate"] },
];

const CAMPAIGN_DEFAULTS: Record<string, ImageKey> = {
  "0057FF": "notebook",
  "00AEEF": "beachBall",
  E60023: "giftBox",
};

function getProductImageUrl(name: string, backgroundHex: string) {
  const normalizedName = name.toLowerCase();

  const matchingRule = IMAGE_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalizedName.includes(keyword))
  );

  if (matchingRule) {
    return IMAGE_URLS[matchingRule.image];
  }

  const fallbackImage = CAMPAIGN_DEFAULTS[backgroundHex] ?? "notebook";
  return IMAGE_URLS[fallbackImage];
}

function withProductImage(product: Product, backgroundHex: string): Product {
  if (product.imageUrl) {
    return product;
  }

  return {
    ...product,
    imageUrl: getProductImageUrl(product.name, backgroundHex),
  };
}

function withBlockImages(
  block: HomepageBlock,
  backgroundHex: string
): HomepageBlock {
  if (block.type === "PRODUCT_GRID_2X2") {
    const typedBlock = block as ProductGrid2x2Block;

    return {
      ...typedBlock,
      products: typedBlock.products.map((product) =>
        withProductImage(product, backgroundHex)
      ),
    };
  }

  if (block.type === "DYNAMIC_COLLECTION") {
    const typedBlock = block as DynamicCollectionBlock;

    return {
      ...typedBlock,
      products: typedBlock.products.map((product) =>
        withProductImage(product, backgroundHex)
      ),
    };
  }

  return block;
}

export function withBoilerplateProductImages(
  payload: HomepagePayload,
  backgroundHex: string
): HomepagePayload {
  return {
    ...payload,
    blocks: payload.blocks.map((block) => withBlockImages(block, backgroundHex)),
  };
}
