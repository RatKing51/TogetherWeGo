
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Check if the email is empty
    if (email.trim() === "") {
      Alert.alert(
        "Missing Email",
        "Please enter your email address."
      );
      return;
    }

    // Check if the email looks valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    // Check if the password is empty
    if (password.trim() === "") {
      Alert.alert(
        "Missing Password",
        "Please enter your password."
      );
      return;
    }

    // All validation checks passed
    Alert.alert(
      "Success",
      "Form is valid! Authentication comes next."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
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
              <Text style={styles.label}>
                Email address
              </Text>

              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#A3ACB9"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>
                Password
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#A3ACB9"
                secureTextEntry
                autoComplete="current-password"
                value={password}
                onChangeText={setPassword}
              />

              {/* Reusable button */}
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
    backgroundColor: "#FFFFFF",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 75,
    paddingBottom: 30,
    justifyContent: "space-between",
  },

  brand: {
    color: "#2563EB",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 65,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#14243A",
    letterSpacing: -1,
    marginBottom: 10,
  },

  subtitle: {
    color: "#778397",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 32,
  },

  form: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#14243A",
    marginTop: 12,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5EAF1",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#14243A",
  },

  buttonContainer: {
    marginTop: 24,
  },

  footer: {
    alignItems: "center",
    gap: 4,
    paddingTop: 35,
  },

  footerText: {
    color: "#778397",
    fontSize: 13,
  },
});
