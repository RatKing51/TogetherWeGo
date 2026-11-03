import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import AppCard from "@/components/AppCard";
import AppInput from "@/components/AppInput";
import { TripHeader } from "@/components/TripUI";
import { useTrips } from "@/contexts/TripContext";
import { theme } from "@/constants/theme";

export default function NewTripScreen() {
  const { addTrip } = useTrips();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");

  const createTrip = () => {
    const amount = Number(budget.replace(/[^0-9.]/g, ""));
    if (!name.trim() || !destination.trim() || !dates.trim() || !amount || amount < 1) {
      setError("Add a trip name, destination, dates, and a budget to get started.");
      return;
    }
    const trip = addTrip({
      name: name.trim(), destination: destination.trim(), dates: dates.trim(),
      dateLabel: dates.trim(), days: 5, budget: amount, currency: "EUR",
    });
    setError("");
    router.replace({ pathname: "/(tabs)/trip/[id]", params: { id: trip.id } });
  };

  return <SafeAreaView style={styles.safe} edges={["top"]}><KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
    <TripHeader title="Make it a trip" subtitle="The first step to getting everyone there." />
    <View style={styles.intro}><Text style={styles.pill}>NEW ADVENTURE</Text><Text style={styles.editNote}>All details can be edited later</Text></View>
    <AppInput label="Trip name" icon="pencil-outline" placeholder="Lisbon, together" value={name} onChangeText={setName} returnKeyType="next" />
    <AppInput label="Where are you headed?" icon="location-outline" placeholder="Lisbon, Portugal" value={destination} onChangeText={setDestination} returnKeyType="next" />
    <AppInput label="Travel dates" icon="calendar-outline" placeholder="Jun 12 – Jun 16, 2027" value={dates} onChangeText={setDates} returnKeyType="next" />
    <AppInput label="Group budget" icon="card-outline" placeholder="2,400" value={budget} onChangeText={setBudget} keyboardType="decimal-pad" />
    <Text style={styles.helper}>EUR · Estimated for the whole group</Text>
    <View style={styles.memberHeading}><Text style={styles.label}>Who’s coming?</Text><Text style={styles.editNote}>3 friends ready to join</Text></View>
    <AppCard variant="soft" padding={14} style={styles.members}>
      {["AC", "ML", "JP", "SR"].map((initials, index) => <View key={initials} style={styles.person}><View style={[styles.avatar, { backgroundColor: ["#EAF1FF", "#F1EAFE", "#FFF0E6", "#E5F5EF"][index] }]}><Text style={[styles.initials, { color: ["#2563EB", "#7859C7", "#BD6D31", "#16866A"][index] }]}>{initials}</Text></View><Text style={styles.personName}>{["You", "Morgan", "Jamie", "Sam"][index]}</Text></View>)}
    </AppCard>
    {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
    <View style={styles.actions}><AppButton title="Create trip" icon="arrow-forward" iconPosition="right" onPress={createTrip} /><View style={styles.privacy}><Ionicons name="lock-closed-outline" size={13} color={theme.colors.textSecondary} /><Text style={styles.helper}>Private to you and the people you invite.</Text></View></View>
  </ScrollView></KeyboardAvoidingView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  flex: { flex: 1 },
  content: { paddingHorizontal: theme.spacing.lg, paddingTop: 8, paddingBottom: 124 },
  intro: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: theme.spacing.base, marginBottom: theme.spacing.lg },
  pill: { color: theme.colors.primary, fontSize: 9, fontWeight: "800", backgroundColor: theme.colors.primaryLight, paddingHorizontal: 10, paddingVertical: 6, borderRadius: theme.radius.full, letterSpacing: 0.4 },
  editNote: { color: theme.colors.textSecondary, fontSize: 10 },
  helper: { color: theme.colors.textSecondary, fontSize: 11 },
  label: { color: theme.colors.text, fontSize: 14, fontWeight: "700" },
  memberHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4, marginBottom: 9 },
  link: { color: theme.colors.primary, fontSize: 12, fontWeight: "600" },
  members: { flexDirection: "row", justifyContent: "space-between", marginBottom: theme.spacing.base },
  person: { alignItems: "center", gap: 6 },
  avatar: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  initials: { fontSize: 10, fontWeight: "700" },
  personName: { color: theme.colors.textSecondary, fontSize: 10 },
  error: { color: theme.colors.error, fontSize: 12, lineHeight: 17, marginBottom: 10 },
  actions: { marginTop: 6 },
  privacy: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5, marginTop: 10 },
});
