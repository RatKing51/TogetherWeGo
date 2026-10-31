import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <StatusBar barStyle="light-content" />

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
            <Text style={styles.destinationText}>
              Lisbon, Portugal
            </Text>
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

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/signup" as any)}
          >
            <Ionicons name="arrow-forward" size={17} color="#fff" />
            <Text style={styles.primaryButtonText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/login" as any)}
          >
            <Text style={styles.secondaryButtonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

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
  eyebrow: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 12,
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
  primaryButton: {
    backgroundColor: "#2563EB",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryButton: {
    height: 49,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5EAF1",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#14243A",
    fontSize: 14,
    fontWeight: "600",
  },
  googleButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  googleButtonText: {
    color: "#8590A2",
    fontSize: 12,
    fontWeight: "500",
  },
  legal: {
    textAlign: "center",
    color: "#A3ACB9",
    fontSize: 10,
    marginTop: 2,
  },
});
