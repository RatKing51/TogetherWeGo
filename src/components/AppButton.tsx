
import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "@/constants/theme";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "text";
  icon?: IconName;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  // All text colors come from the theme
  const textColor =
    variant === "primary"
      ? theme.colors.textOnPrimary
      : variant === "secondary"
        ? theme.colors.text
        : theme.colors.primary;

  const handlePressIn = () => {
    if (!isDisabled) {
      Haptics.impactAsync(
        Haptics.ImpactFeedbackStyle.Light
      ).catch(() => {});
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <Ionicons
        name={icon}
        size={theme.typography.sizes.large}
        color={textColor}
      />
    );
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      onPressIn={handlePressIn}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,

        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "text" && styles.textButton,

        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.buttonContent}>
          {iconPosition === "left" && renderIcon()}

          <Text
            style={[
              styles.buttonText,
              { color: textColor },
            ]}
          >
            {title}
          </Text>

          {iconPosition === "right" && renderIcon()}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    width: "100%",
    borderRadius: theme.radius.lg,
    justifyContent: "center",
    alignItems: "center",
  },

  primary: {
    backgroundColor: theme.colors.primary,
  },

  secondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  textButton: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 0,
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },

  disabled: {
    opacity: 0.45,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },

  buttonText: {
    fontSize: theme.typography.sizes.medium,
    fontWeight: theme.typography.weights.semibold,
  },
});
