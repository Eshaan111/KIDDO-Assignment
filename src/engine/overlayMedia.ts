import { FullScreenOverlayBlock } from "../types/schema";

export function resolveOverlayAnimationUrl(block: FullScreenOverlayBlock) {
  return block.animationUrl ?? block.animation_url;
}

export function hasOverlayAnimationSource(block: FullScreenOverlayBlock) {
  return !!(block.animationData || resolveOverlayAnimationUrl(block));
}
