import { Image } from "react-native";

import {
  FullScreenOverlayBlock,
  HomepageBlock,
  HomepagePayload,
} from "../types/schema";

const MAX_WARMED_URLS = 12;
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

function markUrlAsWarmed(url: string) {
  if (warmedUrls.has(url)) {
    warmedUrls.delete(url);
  }

  warmedUrls.add(url);

  while (warmedUrls.size > MAX_WARMED_URLS) {
    const oldestUrl = warmedUrls.values().next().value;

    if (!oldestUrl) {
      break;
    }

    warmedUrls.delete(oldestUrl);
  }
}

export function prefetchCampaignMedia(payload: HomepagePayload) {
  payload.blocks.filter(isFullScreenOverlayBlock).forEach((block) => {
    const url = block.animationUrl;

    if (warmedUrls.has(url)) {
      return;
    }

    markUrlAsWarmed(url);

    if (block.mediaType === "WEBP" || block.mediaType === "GIF") {
      Image.prefetch(url).catch(() => {
        warmedUrls.delete(url);
      });
      return;
    }

    fetch(url).catch(() => {
      warmedUrls.delete(url);
    });
  });
}
