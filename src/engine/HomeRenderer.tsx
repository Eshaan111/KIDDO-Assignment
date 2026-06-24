import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { FullScreenOverlay } from "../components/FullScreenOverlay";
import { ThemeProvider } from "../context/ThemeContext";
import { componentRegistry } from "../registry/componentRegistry";
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
    typeof (block as FullScreenOverlayBlock).animationUrl === "string" &&
    typeof (block as FullScreenOverlayBlock).mediaType === "string"
  );
}

export function HomeRenderer({ payload }: Props) {
  const normalBlocks = useMemo(() => {
    return payload.blocks.filter((block) => !isFullScreenOverlayBlock(block));
  }, [payload.blocks]);

  const overlayBlocks = useMemo(() => {
    return payload.blocks.filter(isFullScreenOverlayBlock);
  }, [payload.blocks]);

  const renderBlock = useCallback(({ item }: { item: HomepageBlock }) => {
    const Component = componentRegistry[item.type];

    if (!Component) {
      return null;
    }

    return <Component block={item} />;
  }, []);

  const keyExtractor = useCallback((item: HomepageBlock) => item.id, []);

  return (
    <ThemeProvider theme={payload.theme}>
      <View style={[styles.root, { backgroundColor: payload.theme.background }]}>
        <View style={styles.overlayLayer}>
          {overlayBlocks.map((block) => (
            <FullScreenOverlay key={block.id} block={block} />
          ))}
        </View>

        <View style={styles.contentLayer}>
          <FlashList
            data={normalBlocks}
            renderItem={renderBlock}
            keyExtractor={keyExtractor}
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
    zIndex: 0,
  },
  contentLayer: {
    flex: 1,
    zIndex: 1,
  },
});
