# Kiddo SDUI Homepage Renderer

A configuration-driven React Native homepage renderer for Kiddo, a quick-commerce app for kids and baby essentials.

The app treats the frontend as a dumb rendering engine: campaign payloads provide theme, layout blocks, overlay media, and actions, and the client turns that JSON into a live homepage without needing an app-store release.

## What it demonstrates

- JSON-driven homepage rendering through a typed schema
- Component registry / factory pattern for block-to-component mapping
- One vertical `FlashList` feed with nested horizontal collections
- Centralized `handleAction(action)` dispatcher
- Runtime theming through React Context
- Zustand cart state with selector-based local state collocation
- Three live campaign payloads with overlay media
- Defensive handling for unknown blocks, missing actions, and media failures

## Campaigns

- `Back to School`
- `Summer Playhouse`
- `Mystery Gift Carnival`

The project also includes a floating `all_cases_payload` entry for broader payload testing without mixing it into the main assignment campaign switcher.

## Run the app

```bash
npm install
npx expo start
```

Use the on-screen campaign switcher to move between the three live campaign payloads.

## Key files

- `src/types/schema.ts` - payload and action contracts
- `src/registry/componentRegistry.ts` - block registry
- `src/engine/HomeRenderer.tsx` - vertical feed renderer
- `src/engine/actionDispatcher.ts` - centralized action handling
- `src/context/ThemeContext.tsx` - runtime theming
- `src/store/cartStore.ts` - Zustand cart state
- `src/data/campaigns/*.ts` - live campaign payloads
- `src/components/FullScreenOverlay.tsx` - overlay rendering
- `src/engine/campaignMediaCache.ts` - remote overlay prefetch warming

## Submission doc

See `SUBMISSION.md` for the assignment-focused architecture write-up.
