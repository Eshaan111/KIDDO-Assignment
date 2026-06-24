import { prefetchCampaignMedia } from "@/engine/campaignMediaCache";
import { registerPayloadRoutes } from "@/engine/payloadRouteRegistry";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CartCounter } from "@/components/CartCounter";
import { backToSchoolPayload } from "@/data/campaigns/backToSchoolPayload";
import { mysteryGiftPayload } from "@/data/campaigns/mysteryGiftPayload";
import { payloadShowcasePayload } from "@/data/campaigns/payloadShowcasePayload";
import { summerPlayhousePayload } from "@/data/campaigns/summerPlayhousePayload";
import { HomeRenderer } from "@/engine/HomeRenderer";

const primaryCampaigns = {
  school: backToSchoolPayload,
  summer: summerPlayhousePayload,
  mystery: mysteryGiftPayload,
};

const allCampaigns = {
  ...primaryCampaigns,
  showcase: payloadShowcasePayload,
};

type CampaignKey = keyof typeof allCampaigns;
type PrimaryCampaignKey = keyof typeof primaryCampaigns;

export default function HomeScreen() {
  const [activeCampaign, setActiveCampaign] = useState<CampaignKey>("school");
  const activePayload = allCampaigns[activeCampaign];
  const isShowcaseActive = activeCampaign === "showcase";

  useEffect(() => {
    Object.values(allCampaigns).forEach(registerPayloadRoutes);
  }, []);

  useEffect(() => {
    prefetchCampaignMedia(activePayload);
  }, [activePayload]);

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right", "bottom"]}>
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>Kiddo</Text>
        <CartCounter />
      </View>

      <View style={styles.switcher}>
        <CampaignButton
          label="School"
          isActive={activeCampaign === "school"}
          onPress={() => setActiveCampaign("school")}
        />

        <CampaignButton
          label="Summer"
          isActive={activeCampaign === "summer"}
          onPress={() => setActiveCampaign("summer")}
        />

        <CampaignButton
          label="Mystery"
          isActive={activeCampaign === "mystery"}
          onPress={() => setActiveCampaign("mystery")}
        />
      </View>

      <View style={styles.rendererContainer}>
        <HomeRenderer payload={activePayload} />
      </View>

      <View pointerEvents="box-none" style={styles.floatingLayer}>
        <Pressable
          onPress={() =>
            setActiveCampaign((current) =>
              current === "showcase" ? "school" : "showcase"
            )
          }
          style={[
            styles.showcaseButton,
            isShowcaseActive && styles.showcaseButtonActive,
          ]}
        >
          <Text
            style={[
              styles.showcaseButtonTitle,
              isShowcaseActive && styles.showcaseButtonTitleActive,
            ]}
          >
            {isShowcaseActive ? "Back" : "all_cases_payload"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

type CampaignButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

function CampaignButton({ label, isActive, onPress }: CampaignButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.campaignButton, isActive && styles.activeCampaignButton]}
    >
      <Text
        style={[
          styles.campaignButtonText,
          isActive && styles.activeCampaignButtonText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111111",
  },
  switcher: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
    flexWrap: "wrap",
  },
  campaignButton: {
    minWidth: 88,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  activeCampaignButton: {
    backgroundColor: "#111111",
  },
  campaignButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
  },
  activeCampaignButtonText: {
    color: "#FFFFFF",
  },
  rendererContainer: {
    flex: 1,
  },
  floatingLayer: {
    position: "absolute",
    right: 16,
    bottom: 24,
    zIndex: 30,
    elevation: 30,
    alignItems: "flex-end",
  },
  showcaseButton: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    backgroundColor: "rgba(17, 24, 39, 0.94)",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  showcaseButtonActive: {
    backgroundColor: "rgba(15, 118, 110, 0.96)",
  },
  showcaseButtonTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  showcaseButtonTitleActive: {
    color: "#ECFEFF",
  },
});
