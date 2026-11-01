
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";

import {
  Platform,
  View,
  StyleSheet,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "@/constants/theme";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const handleTabPress = () => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync().catch(() => {});
    }
  };

  return (
    <Tabs
      screenListeners={{
        tabPress: handleTabPress,
      }}
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,

        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: Math.max(insets.bottom, 12) + 8,

          height: 68,
          borderRadius: 30,
          backgroundColor: "transparent",

          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: "rgba(255,255,255,0.7)",

          paddingTop: 8,
          paddingBottom: 8,

          shadowColor: theme.colors.text,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.14,
          shadowRadius: 18,
          elevation: 10,
        },

        tabBarBackground: () => (
          <View
            pointerEvents="none"
            style={styles.glassContainer}
          >
            {Platform.OS === "ios" ? (
              <BlurView
                intensity={75}
                tint="systemChromeMaterialLight"
                style={styles.fill}
              />
            ) : (
              <View
                style={[
                  styles.fill,
                  styles.androidBackground,
                ]}
              />
            )}
            <View style={styles.glassOverlay} />
          </View>
        ),

        tabBarLabelPosition: "below-icon",

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },

        tabBarIconStyle: {
          marginBottom: 2,
        },

        tabBarHideOnKeyboard: true,
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={
                focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary
              }
            />
          ),
        }}
      />

      {/* TRIPS */}
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "airplane" : "airplane-outline"}
              size={22}
              color={
                focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary
              }
            />
          ),
        }}
      />

      {/* NOTIFICATIONS */}
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={
                focused
                  ? "notifications"
                  : "notifications-outline"
              }
              size={22}
              color={
                focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary
              }
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={
                focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 30,
    overflow: "hidden",
  },

  fill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  glassOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  androidBackground: {
    backgroundColor: "rgba(255,255,255,0.94)",
  },
});
