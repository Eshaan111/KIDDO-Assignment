import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { FullScreenOverlay } from "../components/FullScreenOverlay";
import { ThemeProvider } from "../context/ThemeContext";
import { componentRegistry } from "../registry/componentRegistry";
import { hasOverlayAnimationSource } from "./overlayMedia";
import {
  FullScreenOverlayBlock,
  HomepageBlock,
  HomepagePayload,
} from "../types/schema";

type Props = {
  payload: HomepagePayload;
};

function isFullScreenOverlayBlock(
  block: HomepageBlock
): block is FullScreenOverlayBlock {
  return (
    block.type === "FULL_SCREEN_OVERLAY" &&
    typeof (block as FullScreenOverlayBlock).mediaType === "string" &&
    hasOverlayAnimationSource(block as FullScreenOverlayBlock)
  );
}

export function HomeRenderer({ payload }: Props) {
  const normalBlocks = useMemo(() => {
    return payload.blocks.filter((block) => !isFullScreenOverlayBlock(block));
  }, [payload.blocks]);

  const activeOverlayBlock = useMemo(() => {
    const overlayBlocks = payload.blocks.filter(isFullScreenOverlayBlock);

    return overlayBlocks[overlayBlocks.length - 1] ?? null;
  }, [payload.blocks]);

  const renderBlock = useCallback(({ item }: { item: HomepageBlock }) => {
    const Component = componentRegistry[item.type];

    if (!Component) {
      return null;
    }

    return <Component block={item} />;
  }, []);

  const keyExtractor = useCallback((item: HomepageBlock) => item.id, []);
  const getItemType = useCallback((item: HomepageBlock) => item.type, []);

  return (
    <ThemeProvider theme={payload.theme}>
      <View style={[styles.root, { backgroundColor: payload.theme.background }]}>
        <View pointerEvents="none" style={styles.overlayLayer}>
          {activeOverlayBlock ? <FullScreenOverlay block={activeOverlayBlock} /> : null}
        </View>

        <View style={styles.contentLayer}>
          <FlashList
            data={normalBlocks}
            renderItem={renderBlock}
            keyExtractor={keyExtractor}
            getItemType={getItemType}
            drawDistance={300}
          />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlayLayer: {
    ...StyleSheet.absoluteFill,
    zIndex: 2,
  },
  contentLayer: {
    flex: 1,
    zIndex: 1,
  },
});
