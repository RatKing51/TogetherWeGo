
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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!fullName.trim()) {
      Alert.alert(
        "Missing Name",
        "Please enter your full name."
      );
      return;
    }

    if (!email.trim()) {
      Alert.alert(
        "Missing Email",
        "Please enter your email."
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

    if (password.length < 8) {
      Alert.alert(
        "Invalid Password",
        "Your password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Passwords do not match!"
      );
      return;
    }

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            <View>
              {/* App Branding */}
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
                <Text style={styles.label}>
                  Full name
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Your full name"
                  placeholderTextColor="#A3ACB9"
                  autoComplete="name"
                  value={fullName}
                  onChangeText={setFullName}
                />

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
                  placeholder="At least 8 characters"
                  placeholderTextColor="#A3ACB9"
                  secureTextEntry
                  autoComplete="new-password"
                  value={password}
                  onChangeText={setPassword}
                />

                <Text style={styles.label}>
                  Confirm password
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#A3ACB9"
                  secureTextEntry
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 35,
  },

  brand: {
    color: "#2563EB",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 45,
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
    gap: 12,
    marginTop: 24,
  },
});
