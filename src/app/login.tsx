
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import theme from "@/constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email.trim() === "") {
      Alert.alert(
        "Missing Email",
        "Please enter your email address."
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    if (password.trim() === "") {
      Alert.alert(
        "Missing Password",
        "Please enter your password."
      );
      return;
    }

    Alert.alert(
      "Form Complete",
      "Your information is valid! Authentication comes next."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* App branding */}
            <Text style={styles.brand}>
              together we go.
            </Text>

            {/* Welcome heading */}
            <Text style={styles.title}>
              Welcome back.
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue planning together.
            </Text>

            {/* Login form */}
            <View style={styles.form}>
              <AppInput
                label="Email address"
                icon="mail-outline"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
              />

              <AppInput
                label="Password"
                icon="lock-closed-outline"
                placeholder="Enter your password"
                isPassword
                autoComplete="current-password"
                value={password}
                onChangeText={setPassword}
              />

              <View style={styles.buttonContainer}>
                <AppButton
                  title="Sign In"
                  onPress={handleSignIn}
                  icon="arrow-forward"
                  iconPosition="right"
                />
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>

            <AppButton
              title="Create an account"
              variant="text"
              onPress={() => router.push("/signup")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 75,
    paddingBottom: theme.spacing.xl,
    justifyContent: "space-between",
  },

  brand: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.heading,
    fontWeight: theme.typography.weights.extrabold,
    letterSpacing: -0.8,
    marginBottom: theme.spacing.xxxl,
  },

  title: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.text,
    letterSpacing: -1,
    marginBottom: theme.spacing.sm,
  },

  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.body,
    lineHeight: 21,
    marginBottom: theme.spacing.xl,
  },

  form: {
    gap: theme.spacing.sm,
  },

  buttonContainer: {
    marginTop: theme.spacing.lg,
  },

  footer: {
    alignItems: "center",
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.xl,
  },

  footerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.body,
  },
});
