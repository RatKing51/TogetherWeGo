
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import theme from "@/constants/theme";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Validate full name
    if (!fullName.trim()) {
      Alert.alert(
        "Missing Name",
        "Please enter your full name."
      );
      return;
    }

    // Validate email
    if (!email.trim()) {
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

    // Validate password
    if (password.length < 8) {
      Alert.alert(
        "Invalid Password",
        "Your password must be at least 8 characters."
      );
      return;
    }

    // Check matching passwords
    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords Don't Match",
        "Please make sure both passwords match."
      );
      return;
    }

    // Form is valid
    Keyboard.dismiss();

    Alert.alert(
      "Form Complete",
      "Your information is valid! Account creation will be connected next."
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

            {/* Heading */}
            <Text style={styles.title}>
              Let's Get Going.
            </Text>

            <Text style={styles.subtitle}>
              Create your account and start planning together.
            </Text>

            {/* Sign Up Form */}
            <View style={styles.form}>
              <AppInput
                label="Full name"
                icon="person-outline"
                placeholder="Your full name"
                autoComplete="name"
                value={fullName}
                onChangeText={setFullName}
              />

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
                placeholder="At least 8 characters"
                isPassword
                autoComplete="new-password"
                value={password}
                onChangeText={setPassword}
              />

              <AppInput
                label="Confirm password"
                icon="lock-closed-outline"
                placeholder="Re-enter your password"
                isPassword
                autoComplete="new-password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <AppButton
                  title="Create Account"
                  onPress={handleSignUp}
                  icon="arrow-forward"
                  iconPosition="right"
                />

                <AppButton
                  title="Already have an account? Sign In"
                  variant="text"
                  onPress={() => router.push("/login")}
                />
              </View>
            </View>
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
    paddingTop: 40,
    paddingBottom: theme.spacing.xl,
  },

  brand: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.heading,
    fontWeight: theme.typography.weights.extrabold,
    letterSpacing: -0.8,
    marginBottom: theme.spacing.xxl,
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
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
});
