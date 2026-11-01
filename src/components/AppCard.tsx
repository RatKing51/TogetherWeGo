
import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import * as Haptics from "expo-haptics";
import theme from "@/constants/theme";

type AppCardProps = {
  children: React.ReactNode;
  variant?: "default" | "soft" | "elevated";
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  disabled?: boolean;
};

export default function AppCard({
  children,
  variant = "default",
  onPress,
  style,
  padding = theme.spacing.base,
  disabled = false,
}: AppCardProps) {
  const cardStyles = [
    styles.card,
    variant === "default" && styles.default,
    variant === "soft" && styles.soft,
    variant === "elevated" && styles.elevated,
    { padding },
    style,
  ];

  // Non-clickable cards use a regular View
  if (!onPress) {
    return (
      <View style={cardStyles}>
        {children}
      </View>
    );
  }

  const handlePress = () => {
    if (disabled) return;

    Haptics.selectionAsync().catch(() => {});
    onPress();
  };

  // Clickable cards use Pressable
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        ...cardStyles,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    overflow: "hidden",
  },

  default: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  soft: {
    backgroundColor: theme.colors.surfaceSecondary,
  },

  elevated: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.card,
  },

  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  disabled: {
    opacity: 0.5,
  },
});
