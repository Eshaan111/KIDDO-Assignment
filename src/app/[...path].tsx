import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { handleAction } from "../engine/actionDispatcher";
import {
  getRegisteredRoute,
  getRouteUrlFromSegments,
} from "../engine/payloadRouteRegistry";
import { Action, DetailPagePrimaryAction } from "../types/schema";

function toBaseAction(action: DetailPagePrimaryAction): Action {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        type: "ADD_TO_CART",
        payload: {
          id: action.payload.id,
        },
      };
    case "APPLY_MYSTERY_GIFT_COUPON":
      return {
        type: "APPLY_MYSTERY_GIFT_COUPON",
        payload: {
          couponCode: action.payload.couponCode,
        },
      };
  }
}

function getDiscountedPrice(price: number) {
  return Math.round(price * 0.8);
}

export default function PayloadDetailScreen() {
  const router = useRouter();
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const params = useLocalSearchParams<{ path: string[] | string }>();
  const routeUrl = useMemo(() => getRouteUrlFromSegments(params.path), [params.path]);
  const routeEntry = useMemo(() => getRegisteredRoute(routeUrl), [routeUrl]);
  const pageData = routeEntry?.pageData;
  const primaryAction = pageData?.primaryAction;
  const displayedPrice = useMemo(() => {
    if (typeof pageData?.price !== "number") {
      return undefined;
    }

    if (primaryAction?.type === "APPLY_MYSTERY_GIFT_COUPON" && isCouponApplied) {
      return getDiscountedPrice(pageData.price);
    }

    return pageData.price;
  }, [isCouponApplied, pageData, primaryAction?.type]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        {pageData ? (
          <>
            {pageData.badge ? <Text style={styles.badge}>{pageData.badge}</Text> : null}
            <Text style={styles.title}>{pageData.title}</Text>

            {pageData.subtitle ? (
              <Text style={styles.subtitle}>{pageData.subtitle}</Text>
            ) : null}

            {pageData.imageUrl ? (
              <View style={styles.imageCard}>
                <Image
                  source={{ uri: pageData.imageUrl }}
                  style={styles.image}
                  contentFit="contain"
                  cachePolicy="memory-disk"
                />
              </View>
            ) : null}

            {typeof displayedPrice === "number" ? (
              <>
                <Text style={styles.price}>Rs {displayedPrice}</Text>
                {primaryAction?.type === "APPLY_MYSTERY_GIFT_COUPON" && isCouponApplied ? (
                  <Text style={styles.couponApplied}>20% coupon applied</Text>
                ) : null}
              </>
            ) : null}

            {pageData.description ? (
              <Text style={styles.description}>{pageData.description}</Text>
            ) : null}

            {primaryAction ? (
              <Pressable
                onPress={() => {
                  handleAction(toBaseAction(primaryAction));
                  if (primaryAction.type === "APPLY_MYSTERY_GIFT_COUPON") {
                    setIsCouponApplied(true);
                  }
                }}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>
                  {primaryAction.label ?? "Continue"}
                </Text>
              </Pressable>
            ) : null}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.title}>No payload data found</Text>
            <Text style={styles.description}>
              This route was opened without matching page data in the active payload.
            </Text>
            <Text style={styles.routeText}>{routeUrl}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    marginBottom: 18,
  },
  backButtonText: {
    color: "#0F172A",
    fontWeight: "700",
  },
  badge: {
    alignSelf: "flex-start",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
  },
  imageCard: {
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    padding: 18,
    minHeight: 260,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 220,
  },
  price: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  couponApplied: {
    marginTop: 8,
    color: "#0F766E",
    fontSize: 13,
    fontWeight: "700",
  },
  description: {
    marginTop: 14,
    fontSize: 16,
    lineHeight: 24,
    color: "#334155",
  },
  primaryButton: {
    marginTop: 22,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#111827",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  emptyState: {
    marginTop: 48,
  },
  routeText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 13,
    fontWeight: "700",
  },
});
