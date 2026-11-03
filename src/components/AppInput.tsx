
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { theme } from "@/constants/theme";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type AppInputProps = TextInputProps & {
  label?: string;
  icon?: IconName;
  error?: string;
  isPassword?: boolean;
};

export default function AppInput({
  label,
  icon,
  error,
  isPassword = false,
  style,
  placeholderTextColor = theme.colors.textMuted,
  ...props
}: AppInputProps) {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    Haptics.selectionAsync().catch(() => {});
    setPasswordVisible((current) => !current);
  };

  const borderColor = error
    ? theme.colors.error
    : focused
      ? theme.colors.borderFocused
      : theme.colors.border;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, { borderColor }]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={theme.colors.textSecondary}
          />
        )}

        <TextInput
          {...props}
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isPassword && !passwordVisible}
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
          accessibilityLabel={label || props.placeholder}
        />

        {isPassword && (
          <Pressable
            onPress={togglePassword}
            accessibilityRole="button"
            accessibilityLabel={
              passwordVisible ? "Hide password" : "Show password"
            }
            style={styles.eyeButton}
          >
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={21}
              color={theme.colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={15}
            color={theme.colors.error}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: theme.spacing.md,
  },

  label: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  inputContainer: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.sm,
  },

  input: {
    flex: 1,
    height: 50,
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.text,
    paddingVertical: 0,
    minWidth: 0,
  },

  eyeButton: {
    padding: theme.spacing.sm,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },

  errorText: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.error,
    flexShrink: 1,
  },
});
