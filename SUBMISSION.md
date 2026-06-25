# Kiddo SDUI Submission

## Section 1 - Project Overview

This project implements a configuration-driven React Native homepage renderer for Kiddo, a quick-commerce platform for kids and baby essentials. The app consumes typed local mock payloads that contain theme, homepage blocks, overlay media, and declarative actions, and renders them through a small SDUI engine. The focus is on scalable rendering, nested list performance, resilient handling of unknown payload data, and runtime campaign switching. The backend mental model is simple: the server sends a UI recipe as JSON, and the React Native client cooks the screen from that recipe.

## Section 2 - Folder Structure

```text
kiddo-app/
|-- assets/
|-- src/
|   |-- app/
|   |-- components/
|   |-- context/
|   |-- data/
|   |   `-- campaigns/
|   |-- engine/
|   |-- registry/
|   |-- store/
|   `-- types/
|-- README.md
|-- SUBMISSION.md
|-- documentation.md
`-- tsconfig.json
```

## Section 3 - Schema Design

Strict TypeScript mode is enabled in `tsconfig.json`, and the payload contract is defined in [schema.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/types/schema.ts).

Homepage block variants:
- `BANNER_HERO`
- `PRODUCT_GRID_2X2`
- `DYNAMIC_COLLECTION`
- `FULL_SCREEN_OVERLAY`
- `UnknownBlock`

Action variants:
- `ADD_TO_CART`
- `DEEP_LINK`
- `APPLY_MYSTERY_GIFT_COUPON`

`HomepagePayload` contains `campaignId`, `theme`, and `blocks`. `DEEP_LINK` is also used as the typed detail-page action carrier by attaching `pageType` and `pageData`. `FULL_SCREEN_OVERLAY` is intentionally filtered out of the normal feed and rendered in a dedicated absolute overlay layer.

## Section 4 - Component Registry / Factory Pattern

The block registry lives in [componentRegistry.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/registry/componentRegistry.ts):

```ts
export const componentRegistry = {
  BANNER_HERO: BannerHero,
  PRODUCT_GRID_2X2: ProductGrid2x2,
  DYNAMIC_COLLECTION: DynamicCollection,
};
```

This avoids a brittle renderer switch and keeps block registration in one place. In [HomeRenderer.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/engine/HomeRenderer.tsx), the engine reads `componentRegistry[item.type]` and returns `null` if no component exists, so unknown blocks are skipped without crashing the tree. `getItemType` is also passed into `FlashList` so recycling happens by block type.

## Section 5 - Renderer Architecture

```text
HomeScreen
`-- HomeRenderer
    |-- ThemeProvider
    |-- View (overlayLayer, absoluteFill, zIndex 2)
    |   `-- FullScreenOverlay
    `-- View (contentLayer, zIndex 1)
        `-- FlashList (vertical)
            |-- BannerHero
            |-- ProductGrid2x2
            `-- DynamicCollection
                `-- FlatList (horizontal)
```

The core renderer is [HomeRenderer.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/engine/HomeRenderer.tsx) and uses `FlashList`, not `ScrollView`, for the main feed. `normalBlocks` and `activeOverlayBlock` are split with `useMemo`, so overlay nodes never enter the vertical list. If multiple overlay blocks arrive, the last one in the payload wins.

## Section 6 - Performance

| Technique | Where applied | Why |
|---|---|---|
| `React.memo` | BannerHero, ProductGrid2x2, DynamicCollection, ProductCard, FullScreenOverlay, CartCounter | Prevents unnecessary rerenders when props do not change |
| `useCallback` | `renderBlock`, `keyExtractor`, `getItemType`, horizontal `renderProduct` | Keeps function references stable |
| `item.id` keys | FlashList and FlatList | Stable identity across reorders |
| `getItemType` | `HomeRenderer` FlashList | Enables recycling by block shape |
| `drawDistance={300}` | `HomeRenderer` FlashList | Pre-renders just beyond the viewport |
| `removeClippedSubviews` | `DynamicCollection` FlatList | Drops off-screen native views |
| Zustand selector | `CartCounter`, `ProductCard` | Limits rerenders to the minimum subscribed state |
| `useMemo` | `normalBlocks`, `activeOverlayBlock`, 2x2 grid slicing, coupon price | Avoids recomputation on unrelated renders |

The vertical list is `FlashList`; the nested horizontal list remains a standard `FlatList`. This keeps the feed virtualized while still allowing smooth horizontal swipes inside dynamic collections.

## Section 7 - Universal Action Dispatcher

The centralized dispatcher is [actionDispatcher.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/engine/actionDispatcher.ts). It handles:
- `ADD_TO_CART`
- `DEEP_LINK`
- `APPLY_MYSTERY_GIFT_COUPON`

UI components stay decoupled from business logic. For example, banner and product components call `handleAction(block.action)` or `handleAction(product.action)` and do not mutate navigation or cart state directly. Unknown actions are warned and ignored instead of crashing.

Detail pages are still payload-driven through `DEEP_LINK`. [detailPageFactory.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/data/detailPageFactory.ts) produces typed `DEEP_LINK` actions with `pageType` and `pageData` for both product and info pages.

## Section 8 - OTA Runtime Theming

Runtime theming is handled in [ThemeContext.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/context/ThemeContext.tsx). `ThemeProvider` wraps the renderer, merges incoming payload theme values with a default fallback, and exposes them through `useTheme()`. Components such as [BannerHero.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/components/BannerHero.tsx), [ProductGrid2x2.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/components/ProductGrid2x2.tsx), [DynamicCollection.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/components/DynamicCollection.tsx), and [ProductCard.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/components/ProductCard.tsx) sample the theme directly. Campaign switching therefore changes colours instantly without a binary update.

## Section 9 - Three Live Campaign Profiles

| Campaign | Theme Primary | Theme Background | Overlay Type | Overlay Asset | Special Action |
|---|---|---|---|---|---|
| Back to School | `#0057FF` | `#FFE94D` | `LOTTIE` | remote paper-airplane / pencil `.lottie` | coupon examples on detail pages |
| Summer Playhouse | `#00AEEF` | `#E6F9FF` | `WEBP` | remote animated `.webp` | event-booking product detail actions |
| Mystery Gift Carnival | `#E60023` | `#FFF0F3` | `LOTTIE` | remote carnival `.lottie` | `APPLY_MYSTERY_GIFT_COUPON` |

[backToSchoolPayload.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/data/campaigns/backToSchoolPayload.ts) injects a bright yellow / primary blue theme, a remote Lottie overlay, and a dedicated `Lunchboxes & Bags` horizontal row. [summerPlayhousePayload.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/data/campaigns/summerPlayhousePayload.ts) injects an ocean-blue palette, an animated WebP overlay, and a `Petting Zoo Tickets` booking row plus a `Specialty Event Booking` banner. [mysteryGiftPayload.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/data/campaigns/mysteryGiftPayload.ts) injects a carnival red theme and multiple coupon-oriented rows that bind `APPLY_MYSTERY_GIFT_COUPON` through the central dispatcher.

## Section 10 - Overlay Engineering

`FULL_SCREEN_OVERLAY` blocks are excluded from `normalBlocks` and rendered separately in [HomeRenderer.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/engine/HomeRenderer.tsx). The overlay layer uses `StyleSheet.absoluteFill`, `zIndex: 2`, and `pointerEvents="none"` so it spans the full interactive surface without blocking clicks or scroll. [FullScreenOverlay.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/components/FullScreenOverlay.tsx) routes `LOTTIE` blocks to `LottieView` and `WEBP` / `GIF` blocks to `expo-image`, resets error state on block change, and shows a bottom-right fallback badge if media loading fails.

Overlay URL resolution is centralized in [overlayMedia.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/engine/overlayMedia.ts). This helper supports both `animationUrl` and backend-style `animation_url`, which keeps the payload contract flexible without complicating components.

## Section 11 - Media Prefetch Cache

Remote overlay prefetch warming is implemented in [campaignMediaCache.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/engine/campaignMediaCache.ts). `prefetchCampaignMedia(payload)` scans all `FULL_SCREEN_OVERLAY` blocks, extracts their resolved URL, and warms only unseen assets. `WEBP` and `GIF` URLs are prefetched with `expo-image` using `memory-disk` cache policy, while `LOTTIE` URLs are warmed with a plain `fetch` request.

The warmed URL set is capped with a simple LRU-style eviction policy at `MAX_WARMED_URLS = 12`. Failed prefetches remove the URL from the warmed set so the next campaign switch can retry it.

## Section 12 - Local State Collocation

The cart store is implemented with Zustand in [cartStore.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/store/cartStore.ts) and holds `count` plus `productQuantities`. [CartCounter.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/components/CartCounter.tsx) subscribes only to `state.count`, so global cart UI updates instantly and narrowly. [ProductCard.tsx](C:/Users/ESHAAN/HAKUR/kiddo-app/src/components/ProductCard.tsx) subscribes only to `state.productQuantities[product.id] ?? 0`, which means the touched card can reflect `In cart: n` without forcing 30+ unrelated blocks in the feed to rerender.

## Section 13 - Defensive Resilience

| Fault | Handling |
|---|---|
| Unknown block type | Registry lookup returns `undefined`, renderer returns `null`, tree stays stable |
| Missing action on product | `handleAction(undefined)` returns early |
| Unknown action type | `console.warn` then return |
| Empty product array in collection | `DynamicCollection` returns `null` safely |
| Empty 2x2 grid | `ProductGrid2x2` returns `null` safely |
| Missing theme fields | `ThemeProvider` merges payload with `defaultTheme` |
| Missing overlay URL | `hasOverlayAnimationSource` prevents invalid overlay rendering |
| Overlay media load failure | `onAnimationFailure` / `onError` sets an error badge |
| Prefetch failure | URL is removed from warmed set for future retry |
| Multiple overlay blocks | Last overlay in payload wins |

The mock payload in [mock_payload.ts](C:/Users/ESHAAN/HAKUR/kiddo-app/src/data/mock_payload.ts) also includes an unknown block (`NEW_COMPONENT_V2`) to exercise unsupported-type resilience.

## Section 14 - How to Run

```bash
npm install
npx expo start
```

Once the app loads, use the on-screen `School`, `Summer`, and `Mystery` buttons to switch the active campaign payload. The floating `all_cases_payload` button opens the broader showcase payload without mixing it into the primary assignment switcher.

## Section 15 - Submission Checklist

- [x] Working React Native app
- [x] TypeScript types
- [x] Mock JSON payload
- [x] Three campaign payloads
- [x] Component registry
- [x] `BANNER_HERO`
- [x] `PRODUCT_GRID_2X2`
- [x] `DYNAMIC_COLLECTION`
- [x] `FULL_SCREEN_OVERLAY`
- [x] Universal action dispatcher
- [x] Zustand cart store
- [x] Theme Context
- [x] FlashList or optimized FlatList
- [x] Horizontal carousel
- [x] Unknown block fallback
- [x] Memoized components
- [x] Stable key extractors
- [x] README
- [ ] Demo video or screenshots
