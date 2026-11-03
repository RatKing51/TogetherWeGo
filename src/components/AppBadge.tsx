
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { theme } from "@/constants/theme";

type BadgeStatus =
  | "planning"
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled";

type AppBadgeProps = {
  status: BadgeStatus;
  label?: string;
  size?: "small" | "medium";
  showDot?: boolean;
  style?: StyleProp<ViewStyle>;
};

const badgeColors = {
  planning: {
    background: theme.colors.primaryLight,
    text: theme.colors.primary,
  },
  confirmed: {
    background: theme.colors.successLight,
    text: theme.colors.success,
  },
  pending: {
    background: theme.colors.warningLight,
    text: theme.colors.warning,
  },
  completed: {
    background: theme.colors.surfaceSecondary,
    text: theme.colors.textSecondary,
  },
  cancelled: {
    background: theme.colors.errorLight,
    text: theme.colors.error,
  },
};

export default function AppBadge({
  status,
  label,
  size = "medium",
  showDot = true,
  style,
}: AppBadgeProps) {
  const colors = badgeColors[status];

  const displayLabel =
    label ??
    status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
        size === "small" && styles.small,
        style,
      ]}
    >
      {showDot && (
        <View
          style={[
            styles.dot,
            {
              backgroundColor: colors.text,
            },
          ]}
        />
      )}

      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: size === "small" ? 10 : 12,
          },
        ]}
      >
        {displayLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 7,
    borderRadius: theme.radius.full,
  },

  small: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 5,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  text: {
    fontWeight: theme.typography.weights.semibold,
  },
});
