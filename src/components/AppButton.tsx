
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

  const textColor =
    variant === "primary"
      ? "#FFFFFF"
      : variant === "secondary"
        ? "#14243A"
        : "#2563EB";

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
        size={18}
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
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  primary: {
    backgroundColor: "#2563EB",
  },

  secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EAF1",
  },

  textButton: {
    backgroundColor: "transparent",
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
    gap: 10,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
