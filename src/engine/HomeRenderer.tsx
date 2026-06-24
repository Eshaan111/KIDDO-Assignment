import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { FullScreenOverlay } from "../components/FullScreenOverlay";
import { ThemeProvider } from "../context/ThemeContext";
import { componentRegistry } from "../registry/componentRegistry";
import { HomepageBlock, HomepagePayload } from "../types/schema";

type Props = {
  payload: HomepagePayload;
};

export function HomeRenderer({ payload }: Props) {
  const normalBlocks = useMemo(() => {
    return payload.blocks.filter((block) => block.type !== "FULL_SCREEN_OVERLAY");
  }, [payload.blocks]);

  const overlayBlock = useMemo(() => {
    return payload.blocks.find((block) => block.type === "FULL_SCREEN_OVERLAY");
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
        <FlashList
          data={normalBlocks}
          renderItem={renderBlock}
          keyExtractor={keyExtractor}
          estimatedItemSize={280}
        />

        {overlayBlock?.type === "FULL_SCREEN_OVERLAY" ? (
          <FullScreenOverlay block={overlayBlock} />
        ) : null}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});