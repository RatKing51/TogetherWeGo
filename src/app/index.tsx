import AppButton from "@/components/AppButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <StatusBar barStyle="light-content" />

      {/* Hero photograph */}
      <View style={styles.hero}>
        <Image
          source={require("../../assets/images/lisbon-hero.png")}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition="center"
        />

        <View style={styles.heroOverlay}>
          <Text style={styles.logo}>together we go.</Text>

          <View style={styles.destination}>
            <Ionicons name="location-outline" size={13} color="#FFFFFF" />
            <Text style={styles.destinationText}>Lisbon, Portugal</Text>
          </View>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <View>
          <Text style={styles.heading}>
            Great trips start{"\n"}with your people.
          </Text>

          <Text style={styles.description}>
            One place for your plans, shared costs, and all the moments in
            between.
          </Text>
        </View>

        {/* Reusable buttons */}
        <View style={styles.actions}>
          <AppButton
            title="Create an account"
            variant="primary"
            icon="arrow-forward"
            iconPosition="left"
            onPress={() => router.push("/signup")}
          />

          <AppButton
            title="Sign in"
            variant="secondary"
            onPress={() => router.push("/login")}
          />

          <AppButton
            title="Continue with Google"
            variant="text"
            onPress={() => {}}
          />
          {__DEV__ && (
            <AppButton
              title="Preview Dashboard"
              variant="text"
              onPress={() => router.push("/(tabs)/home")}
            />
          )}

          <Text style={styles.legal}>
            By continuing, you agree to our Terms & Privacy Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  hero: {
    height: "45%",
    width: "100%",
  },

  heroOverlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 65,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    letterSpacing: -0.8,
  },

  destination: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  destinationText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "500",
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 34,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  heading: {
    color: "#14243A",
    fontSize: 31,
    fontWeight: "800",
    lineHeight: 34,
    letterSpacing: -1,
    marginBottom: 12,
  },

  description: {
    color: "#778397",
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 310,
  },

  actions: {
    gap: 10,
  },

  legal: {
    textAlign: "center",
    color: "#A3ACB9",
    fontSize: 10,
    marginTop: 2,
  },
});
