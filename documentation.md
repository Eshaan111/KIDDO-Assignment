# agents.md — How to Generate the Submission README from This Codebase

This file tells an agent (or a developer) exactly how to read the codebase and produce the final `SUBMISSION.md` file that satisfies the Kiddo SDUI assignment evaluation criteria.

---

## 1. What the Submission Document Must Cover

The evaluator checks five things:

| Criterion | What they want to see |
|---|---|
| Architectural Cleanliness | Hash-map registry, no brittle switch blocks, factory pattern |
| Sustained Frame Performance | FlashList, memoization, keyExtractor, nested scroll handling |
| TypeScript Strategy | Strict types, schema interfaces, action contracts |
| System Defensive Resilience | Unknown blocks dropped, missing actions handled, corrupt payload safe |
| Live Campaign Architecture | Three campaigns, overlay, OTA theming, coupon actions |

The submission document must walk through each of these with references to actual files and code.

---

## 2. Files to Read Before Writing Anything

Read these files in order. Each one feeds a specific section of the submission document.

### 2.1 Schema and Types

```
src/types/schema.ts
```

Extract:
- The `HomepageBlock` union type and every member (BANNER_HERO, PRODUCT_GRID_2X2, DYNAMIC_COLLECTION, FULL_SCREEN_OVERLAY, etc.)
- The `Action` union type and every action variant (ADD_TO_CART, DEEP_LINK, APPLY_MYSTERY_GIFT_COUPON, OPEN_DETAIL_PAGE)
- The `HomepagePayload` type (theme + blocks)
- The `Theme` type fields

Use these to write the **Schema Design** section. Quote the type names. Do not paste large blocks — summarise the shape and note what makes it strict.

---

### 2.2 Component Registry

```
src/registry/componentRegistry.ts
```

Extract:
- The registry object (hash-map from type string → component)
- Confirm there is no switch-case

Use this to write the **Component Registry / Factory Pattern** section. Show the hash-map pattern explicitly. Note that unknown types return `null` from `HomeRenderer`, not a crash.

---

### 2.3 Home Renderer

```
src/engine/HomeRenderer.tsx
```

Extract:
- That it uses `FlashList` (not ScrollView)
- The `renderBlock` function and how it reads from the registry
- The `keyExtractor` using `item.id`
- The `getItemType` callback
- The `normalBlocks` / `activeOverlayBlock` split via `useMemo`
- The overlay layer rendered above the FlashList using `StyleSheet.absoluteFill` and `zIndex`
- The `pointerEvents` logic on the overlay layer (check whether it is `"none"` or conditionally `"box-none"` for WEBP)

Use this to write the **Renderer Architecture** and **Performance** sections.

---

### 2.4 Action Dispatcher

```
src/engine/actionDispatcher.ts
```

Extract:
- The `handleAction(action)` function signature
- Every case handled: ADD_TO_CART, DEEP_LINK, APPLY_MYSTERY_GIFT_COUPON, OPEN_DETAIL_PAGE
- The unknown action fallback (warn and ignore)
- That components call `handleAction(block.action)` and contain zero business logic themselves

Use this to write the **Universal Action Dispatcher** section.

---

### 2.5 Overlay Media Resolution

```
src/engine/overlayMedia.ts
```

Extract:
- `hasOverlayAnimationSource` — what it checks
- `resolveOverlayAnimationUrl` — how it picks the URL from the block
- Which `mediaType` values are supported (LOTTIE, WEBP, GIF)

Use this to write the **Overlay Media** subsection.

---

### 2.6 Prefetch Pipeline

```
src/engine/prefetchCampaignMedia.ts
```

Extract:
- That it reads all `FULL_SCREEN_OVERLAY` blocks from the payload
- That WEBP/GIF are prefetched using `Image.prefetch("memory-disk")`
- That Lottie URLs are warmed using bare `fetch`
- The LRU eviction cap (`MAX_WARMED_URLS = 12`)
- That failed prefetches remove the URL from the warmed set

Use this to write the **Media Prefetch Cache** subsection.

---

### 2.7 FullScreenOverlay Component

```
src/components/FullScreenOverlay.tsx
```

Extract:
- That it is wrapped in `React.memo`
- The `hasRenderableLottie` and `hasRenderableImage` guards
- That `LottieView` handles `mediaType === "LOTTIE"`
- That `expo-image` with `autoplay={true}` handles `mediaType === "WEBP"` and `"GIF"`
- The error state and fallback badge
- The `useEffect` that resets error state on block change
- The `pointerEvents` on the inner View (should be `"none"` for Lottie, `"box-none"` or passthrough for WEBP)

Use this to write the **FullScreenOverlay Engineering** subsection.

---

### 2.8 Theme Context

```
src/context/ThemeContext.tsx
```

Extract:
- The `ThemeProvider` wrapping `HomeRenderer`
- The `useTheme` hook
- Which components consume it (buttons, headers, card borders)

Use this to write the **OTA Runtime Theming** section.

---

### 2.9 Cart Store

```
src/store/cartStore.ts
```

Extract:
- That it uses Zustand
- The selector pattern (`useCartStore(state => state.count)`)
- That `CartCounter` subscribes only to count, not the full store
- That product cards do not hold cart state

Use this to write the **Local State Collocation** section.

---

### 2.10 Campaign Payloads

```
src/data/campaigns/backToSchoolPayload.ts
src/data/campaigns/summerPlayhousePayload.ts
src/data/campaigns/mysteryGiftPayload.ts
```

For each payload extract:
- `campaignId`
- `theme` (primary, background, text, card hex values)
- The `FULL_SCREEN_OVERLAY` block: `mediaType`, `animation_url`, `opacity`
- Any unique block types or actions (e.g. APPLY_MYSTERY_GIFT_COUPON in mystery carnival, WEBP overlay in summer playhouse)
- The `withBoilerplateProductImages` wrapper and what colour it injects

Use these to write the **Three Live Campaign Profiles** section. Create a table summarising all three.

---

### 2.11 Detail Page Factory

```
src/data/detailPageFactory.ts
```

Extract:
- `createProductDetailAction` — what fields it accepts and what action type it produces
- `createInfoDetailAction` — same
- How `OPEN_DETAIL_PAGE` payload is structured

Use this to write the **Detail Page Actions** subsection inside Action Dispatcher.

---

### 2.12 withBoilerplateProductImages

```
src/data/withBoilerplateProductImages.ts
```

Extract:
- That it stamps every product with a deterministic image URL using the product `id` and a colour hex
- That no payload file needs to manually specify `imageUrl` on every product

Note this briefly in the **Payload Design** section.

---

## 3. Structure of the Submission Document

Write `SUBMISSION.md` using exactly this section order:

---

### Section 1 — Project Overview (4–6 sentences)

State what the project is, what problem it solves, and the one-line mental model:

> The backend sends a UI recipe as JSON and the React Native app is a fast, safe, dumb renderer that cooks the screen from that recipe.

---

### Section 2 — Folder Structure

Show the top-level folder tree. Use a code block. Do not describe every file — just the shape.

---

### Section 3 — Schema Design

- List every `HomepageBlock` variant as a bullet
- List every `Action` variant as a bullet
- Note strict TypeScript mode
- Note that `FULL_SCREEN_OVERLAY` is excluded from `normalBlocks` and handled separately

---

### Section 4 — Component Registry / Factory Pattern

- Show the hash-map (abbreviated, 3–4 lines)
- Explain why this beats switch-case (scalability, one place to update)
- Show the graceful null return for unknown types
- Mention `getItemType` passed to FlashList for recycling optimisation

---

### Section 5 — Renderer Architecture

Draw the component tree as ASCII:

```
App.tsx
└── HomeRenderer
    ├── ThemeProvider
    ├── View (overlayLayer, absoluteFill, zIndex 2)
    │   └── FullScreenOverlay
    └── View (contentLayer, zIndex 1)
        └── FlashList (vertical)
            ├── BannerHero
            ├── ProductGrid2x2
            └── DynamicCollection
                └── FlatList (horizontal)
```

Explain:
- Why FlashList (not ScrollView)
- `drawDistance={300}` for pre-render buffer
- `normalBlocks` via `useMemo` excludes overlay from the feed
- Last overlay block wins (if multiple exist in payload)

---

### Section 6 — Performance

List each optimisation with a one-line explanation:

| Technique | Where applied | Why |
|---|---|---|
| `React.memo` | All block components, ProductCard, FullScreenOverlay | Prevents re-render when parent re-renders |
| `useCallback` for `renderBlock` | HomeRenderer | Stable reference across renders |
| `useCallback` for `keyExtractor` | HomeRenderer | Stable reference |
| `item.id` as key | FlashList + horizontal FlatList | Index-stable, no shuffle repaints |
| `getItemType` | FlashList | Enables component recycling by type |
| `drawDistance={300}` | FlashList | Pre-renders just beyond viewport |
| `removeClippedSubviews` | Horizontal FlatList | Drops off-screen native views |
| `showsHorizontalScrollIndicator={false}` | DynamicCollection | Cosmetic, minor perf |
| Zustand selector | CartCounter | Subscribes only to count, not full store |
| `useMemo` for normalBlocks | HomeRenderer | Does not recompute on unrelated renders |

---

### Section 7 — Universal Action Dispatcher

- List every action type handled
- Show the unknown action fallback (warn, do not crash)
- Emphasise that UI components are fully decoupled — they only call `handleAction(block.action)`
- Include the `OPEN_DETAIL_PAGE` action and how `createProductDetailAction` / `createInfoDetailAction` produce it

---

### Section 8 — OTA Runtime Theming

- Explain `ThemeProvider` wraps the root
- List which components consume `useTheme` (CTA buttons, card borders, section headers)
- Note that switching campaign instantly swaps all colours with zero app update

---

### Section 9 — Three Live Campaign Profiles

Write a summary table:

| Campaign | Theme Primary | Theme Background | Overlay Type | Overlay Asset | Special Action |
|---|---|---|---|---|---|
| Back to School | #0057FF | #FFE94D | LOTTIE | paper airplanes / pencils lottie | — |
| Summer Playhouse | (read from payload) | (read from payload) | WEBP | beach ball / water splash | — |
| Mystery Gift Carnival | #E60023 | #FFF0F3 | LOTTIE | confetti burst lottie | APPLY_MYSTERY_GIFT_COUPON |

Then for each campaign write 2–3 sentences describing the unique blocks and any special engineering notes (e.g. WEBP `autoplay`, coupon action binding, `pointerEvents` for interactive WEBP).

---

### Section 10 — Overlay Engineering

- Explain `FULL_SCREEN_OVERLAY` is filtered out of `normalBlocks` and rendered in a separate absolute layer
- Explain `pointerEvents` strategy:
  - Lottie overlays: `"none"` on both the layer and the inner View (purely decorative)
  - WEBP overlays: `"box-none"` on the layer so the `FullScreenOverlay` child can receive touch, while scroll events pass through to FlashList
- Explain `autoplay={true}` on `expo-image` for animated WebP
- Explain the error state fallback badge (mediaType label shown bottom-right on failure)
- Explain `useEffect` resets error on block identity change

---

### Section 11 — Media Prefetch Cache

- Explain `prefetchCampaignMedia(payload)` is called when campaign switches
- Explain WEBP/GIF → `Image.prefetch("memory-disk")`
- Explain Lottie → bare `fetch` to warm CDN edge
- Explain LRU eviction at 12 URLs
- Explain failed prefetch removes URL from warmed set so it retries next time

---

### Section 12 — Local State Collocation

- Zustand store holds `{ items: Record<string, number>, count: number }`
- `CartCounter` uses `useCartStore(state => state.count)` — re-renders only when count changes
- Product cards call `handleAction` → dispatcher calls `cartStore.addItem(id)` — card itself never re-renders from this
- `HomeRenderer` and all 30+ blocks are fully isolated from cart state

---

### Section 13 — Defensive Resilience

List each fault case and its handling:

| Fault | Handling |
|---|---|
| Unknown block type (e.g. NEW_COMPONENT_V2) | `componentRegistry[type]` returns undefined → `renderBlock` returns null → skipped silently |
| Missing action on product | `handleAction(undefined)` → early return, no crash |
| Unknown action type | `console.warn` + return, no crash |
| Empty product array in DYNAMIC_COLLECTION | Component returns null or empty state safely |
| Missing theme fields | `ThemeProvider` merges with `defaultTheme` fallback |
| Lottie load failure | `onAnimationFailure` sets error state → fallback badge shown |
| WEBP/GIF load failure | `onError` sets error state → fallback badge shown |
| Prefetch failure | URL removed from warmed set, re-attempted on next campaign load |
| Multiple FULL_SCREEN_OVERLAY blocks | Last one wins (array tail), others ignored |

---

### Section 14 — How to Run

```bash
# Install dependencies
npm install

# Start Expo
npx expo start

# Switch campaigns
# In App.tsx, change the active payload import:
import { backToSchoolPayload } from "./src/data/campaigns/backToSchoolPayload";
import { summerPlayhousePayload } from "./src/data/campaigns/summerPlayhousePayload";
import { mysteryGiftPayload } from "./src/data/campaigns/mysteryGiftPayload";
```

---

### Section 15 — Submission Checklist

Copy the checklist from the assignment guide (section 19) and tick every item that is implemented. Do not tick items that are not present in the code.

---

## 4. Tone and Style Rules

- Write in plain technical English. No marketing language.
- Keep section prose to 3–5 sentences maximum. Let the code references and tables do the work.
- Do not copy-paste large code blocks. Show abbreviated snippets (4–8 lines) only where they directly prove an architectural claim.
- Every claim must be traceable to a specific file and function in the codebase. If you cannot find evidence in the code, do not make the claim.
- Do not invent features that are not in the code.

---

## 5. Final Output

Write the document to:

```
SUBMISSION.md
```

at the root of the repository.

The document should be readable in under 10 minutes and give the evaluator enough evidence to score all five criteria without running the app.
