import { Image } from "expo-image";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBadge from "@/components/AppBadge";
import AppButton from "@/components/AppButton";
import AppCard from "@/components/AppCard";
import { AvatarStack } from "@/components/TripUI";
import { useTrips } from "@/contexts/TripContext";
import { theme } from "@/constants/theme";

type Filter = "All trips" | "Planning" | "Completed";

export default function TripsScreen() {
  const [filter, setFilter] = useState<Filter>("All trips");
  const { trips } = useTrips();
  const filtered = useMemo(() => trips.filter((trip) => filter === "All trips" || trip.status === filter.toLowerCase()), [filter, trips]);

  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.top}><View><Text style={styles.title}>Your trips</Text><Text style={styles.subtitle}>The good times, all in one place.</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Create a trip" onPress={() => router.push("/(tabs)/trip/new")} style={styles.add}><Ionicons name="add" size={23} color={theme.colors.primary} /></Pressable></View>
    <View style={styles.filters}>{(["All trips", "Planning", "Completed"] as Filter[]).map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.activeFilter]}><Text style={[styles.filterText, filter === item && styles.activeFilterText]}>{item}</Text></Pressable>)}</View>
    {filtered.length ? filtered.map((trip) => <AppCard key={trip.id} padding={0} onPress={() => router.push({ pathname: "/(tabs)/trip/[id]", params: { id: trip.id } })} style={styles.card}>
      <View style={styles.image}><Image source={trip.image} style={StyleSheet.absoluteFill} contentFit="cover" transition={180} /></View>
      <View style={styles.body}><View style={styles.titleRow}><Text style={styles.tripTitle}>{trip.name}</Text><Ionicons name="arrow-up-outline" size={17} color={theme.colors.primary} /></View><Text style={styles.destination}>{trip.destination}</Text><View style={styles.meta}><Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} /><Text style={styles.date}>{trip.dateLabel} · {trip.days} days</Text></View><View style={styles.bottom}><AvatarStack members={trip.members} /><Text style={styles.date}>You + {trip.members.length - 1} friends</Text><AppBadge status={trip.status} size="small" style={styles.badge} /></View></View>
    </AppCard>) : <AppCard padding={0} style={styles.empty}><Ionicons name="airplane-outline" size={25} color={theme.colors.primary} /><Text style={styles.emptyTitle}>No trips here yet</Text><Text style={styles.date}>Try another filter or make a new plan.</Text><AppButton title="Create a trip" onPress={() => router.push("/(tabs)/trip/new")} /></AppCard>}
    </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: 132 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: theme.colors.text, fontSize: 28, fontWeight: "800", letterSpacing: -0.7 },
  subtitle: { marginTop: 5, color: theme.colors.textSecondary, fontSize: 13 },
  add: { width: 42, height: 42, borderRadius: 21, backgroundColor: theme.colors.surface, alignItems: "center", justifyContent: "center" },
  filters: { flexDirection: "row", gap: 8, marginTop: theme.spacing.lg, marginBottom: theme.spacing.base },
  filter: { paddingVertical: 9, paddingHorizontal: 13, borderRadius: theme.radius.full, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
  activeFilter: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  filterText: { color: theme.colors.textSecondary, fontSize: 12, fontWeight: "600" },
  activeFilterText: { color: theme.colors.textOnPrimary },
  card: { marginBottom: theme.spacing.base, borderRadius: theme.radius.xl },
  image: { height: 154, backgroundColor: theme.colors.surfaceSecondary },
  body: { padding: theme.spacing.base },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tripTitle: { flex: 1, color: theme.colors.text, fontWeight: "800", fontSize: 18 },
  destination: { marginTop: 3, color: theme.colors.textSecondary, fontSize: 12 },
  meta: { flexDirection: "row", gap: 6, alignItems: "center", marginTop: 13 },
  date: { color: theme.colors.textSecondary, fontSize: 11 },
  bottom: { flexDirection: "row", gap: 8, alignItems: "center", marginTop: 13 },
  badge: { marginLeft: "auto" },
  empty: { alignItems: "center", gap: 12, padding: theme.spacing.lg },
  emptyTitle: { color: theme.colors.text, fontWeight: "700", fontSize: 17 },
});
