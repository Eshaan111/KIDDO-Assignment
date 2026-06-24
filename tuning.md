# Tuning Notes

## Changes made

### 1. Overlay block typing
- Added a dedicated `isFullScreenOverlayBlock` type guard in `src/engine/HomeRenderer.tsx`.
- `normalBlocks` now filters by that guard instead of a plain string comparison.
- `overlayBlock` now uses `.find(isFullScreenOverlayBlock)` so TypeScript narrows it to `FullScreenOverlayBlock | undefined`.
- This removes the `overlayBlock` type mismatch when passing it into `FullScreenOverlay`.

### 2. Cart selector isolation
- `src/components/CartCounter.tsx` was already using a Zustand selector for `count`, so it was already isolated to cart count changes.
- Updated `src/components/ProductCard.tsx` to subscribe only to its own quantity with:
  `useCartStore((state) => state.productQuantities[product.id] ?? 0)`
- This means when one product is added to cart, only that product card and the cart counter need to rerender.
- Added a small `In cart: X` label so the per-card selector is visible during testing.

## Why this helps
- Overlay typing becomes safer and more maintainable because the renderer now proves the block shape before using it.
- Product-level cart subscriptions reduce unnecessary rerenders across the whole homepage, especially with larger campaign payloads and multiple horizontal lists.

## Still not covered in this pass
- The current `FlashList` typing issue around `estimatedItemSize` is still present and needs a separate compatibility fix.
- We have not yet tuned `FlashList`/`FlatList` props such as batch sizes, viewability, or item type hints.
- We are still using placeholder media, so image caching optimization is not part of this pass.
