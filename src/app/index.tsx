import { prefetchCampaignMedia } from "@/engine/campaignMediaCache";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartCounter } from '@/components/CartCounter';
import { backToSchoolPayload } from '@/data/campaigns/backToSchoolPayload';
import { mysteryGiftPayload } from '@/data/campaigns/mysteryGiftPayload';
import { summerPlayhousePayload } from '@/data/campaigns/summerPlayhousePayload';
import { HomeRenderer } from '@/engine/HomeRenderer';

const campaigns = {
  school: backToSchoolPayload,
  summer: summerPlayhousePayload,
  mystery: mysteryGiftPayload,
};




type CampaignKey = keyof typeof campaigns;

export default function HomeScreen() {
  
  const [activeCampaign, setActiveCampaign] = useState<CampaignKey>('school');
  const activePayload = campaigns[activeCampaign];
  
  useEffect(() => {
    prefetchCampaignMedia(activePayload);
  }, [activePayload]);


  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>Kiddo</Text>
        <CartCounter />
      </View>

      <View style={styles.switcher}>
        <CampaignButton
          label="School"
          isActive={activeCampaign === 'school'}
          onPress={() => setActiveCampaign('school')}
        />

        <CampaignButton
          label="Summer"
          isActive={activeCampaign === 'summer'}
          onPress={() => setActiveCampaign('summer')}
        />

        <CampaignButton
          label="Mystery"
          isActive={activeCampaign === 'mystery'}
          onPress={() => setActiveCampaign('mystery')}
        />
      </View>

      <View style={styles.rendererContainer}>
        <HomeRenderer payload={activePayload} />
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
    backgroundColor: '#FFFFFF',
  },

  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111111',
  },

  switcher: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },

  campaignButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeCampaignButton: {
    backgroundColor: '#111111',
  },

  campaignButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
  },

  activeCampaignButtonText: {
    color: '#FFFFFF',
  },

  rendererContainer: {
    flex: 1,
  },
});