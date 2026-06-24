import { Image } from "react-native";

import {
  FullScreenOverlayBlock,
  HomepageBlock,
  HomepagePayload,
} from "../types/schema";

const warmedUrls = new Set<string>();

function isFullScreenOverlayBlock(
  block: HomepageBlock
): block is FullScreenOverlayBlock {
  return (
    block.type === "FULL_SCREEN_OVERLAY" &&
    typeof (block as FullScreenOverlayBlock).animationUrl === "string" &&
    typeof (block as FullScreenOverlayBlock).mediaType === "string"
  );
}

export function prefetchCampaignMedia(payload: HomepagePayload) {
  payload.blocks.filter(isFullScreenOverlayBlock).forEach((block) => {
    if (warmedUrls.has(block.animationUrl)) {
      return;
    }

    warmedUrls.add(block.animationUrl);

    if (block.mediaType === "WEBP" || block.mediaType === "GIF") {
      Image.prefetch(block.animationUrl).catch(() => {
        warmedUrls.delete(block.animationUrl);
      });
      return;
    }

    fetch(block.animationUrl).catch(() => {
      warmedUrls.delete(block.animationUrl);
    });
  });
}
