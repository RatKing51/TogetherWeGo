import { Image } from "expo-image";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import AppCard from "@/components/AppCard";
import AppBadge from "@/components/AppBadge";
import { AvatarStack, SectionTitle } from "@/components/TripUI";
import { demoInspiration } from "@/data/demo";
import { useTrips } from "@/contexts/TripContext";
import { theme } from "@/constants/theme";

export default function HomeScreen() {
  const { trips, user } = useTrips();
  const nextTrip = trips.find((trip) => trip.status !== "completed");

  return <SafeAreaView style={styles.safe} edges={["top"]}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.greeting}>
        <View><Text style={styles.title}>Hey, {user.name.split(" ")[0]} <Ionicons name="sunny" size={21} color="#E5A53A" /></Text><Text style={styles.subtitle}>Your next good memory is out there.</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel="View notifications" onPress={() => router.push("/(tabs)/notifications")} style={styles.bell}><Ionicons name="notifications-outline" size={20} color={theme.colors.text} /><View style={styles.unreadDot} /></Pressable>
      </View>

      <AppButton title="Create a trip" icon="add" onPress={() => router.push("/(tabs)/trip/new")} />

      <View style={styles.section}><SectionTitle title="Your next adventure" action="All trips" onAction={() => router.push("/(tabs)/trips")} />
        {nextTrip ? <AppCard padding={0} onPress={() => router.push({ pathname: "/(tabs)/trip/[id]", params: { id: nextTrip.id } })} style={styles.tripCard}>
          <View style={styles.tripImage}>
            <Image source={nextTrip.image} contentFit="cover" style={StyleSheet.absoluteFill} transition={180} />
            <View style={styles.imagePill}><Text style={styles.imagePillText}>{nextTrip.status === "planning" ? "YOUR NEXT TRIP" : "UP NEXT"}</Text></View>
          </View>
          <View style={styles.tripBody}>
            <View style={styles.tripTitleRow}><Text style={styles.tripTitle}>{nextTrip.name}</Text><Ionicons name="arrow-up-outline" size={18} color={theme.colors.primary} /></View>
            <View style={styles.metaRow}><Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} /><Text style={styles.metaText}>{nextTrip.dateLabel} · {nextTrip.days} days</Text></View>
            <View style={styles.memberRow}><AvatarStack members={nextTrip.members} /><Text style={styles.metaText}>You + {Math.max(0, nextTrip.members.length - 1)} friends</Text><AppBadge status={nextTrip.status} size="small" style={styles.statusBadge} /></View>
          </View>
        </AppCard> : <AppCard padding={0} style={styles.emptyCard}><Text style={styles.emptyTitle}>Your next adventure starts here.</Text><Text style={styles.metaText}>Make a trip and invite your favorite people.</Text></AppCard>}
      </View>

      <View style={styles.section}><SectionTitle title="A little inspiration" action="Explore" onAction={() => router.push("/(tabs)/trips")} />
        <AppCard padding={0} onPress={() => router.push("/(tabs)/trip/new")} style={styles.inspirationCard}>
          <Image source={demoInspiration.image} contentFit="cover" style={styles.inspirationImage} />
          <View style={styles.inspirationCopy}><Text style={styles.eyebrow}>{demoInspiration.eyebrow}</Text><Text style={styles.inspirationTitle}>{demoInspiration.title}</Text><Text style={styles.metaText}>{demoInspiration.subtitle}</Text></View>
          <Ionicons name="arrow-forward" size={17} color={theme.colors.primary} style={styles.inspirationArrow} />
        </AppCard>
      </View>
      <View style={styles.footer}><Ionicons name="sparkles-outline" size={16} color={theme.colors.primary} /><Text style={styles.footerText}>A little planning. A lot to look forward to.</Text></View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.base, paddingBottom: 132 },
  greeting: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: theme.spacing.lg },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: "800", letterSpacing: -0.6 },
  subtitle: { color: theme.colors.textSecondary, fontSize: 13, marginTop: 4 },
  bell: { width: 42, height: 42, borderRadius: 21, backgroundColor: theme.colors.surface, alignItems: "center", justifyContent: "center" },
  unreadDot: { position: "absolute", right: 10, top: 9, width: 7, height: 7, backgroundColor: theme.colors.primary, borderRadius: 4, borderWidth: 1, borderColor: theme.colors.surface },
  section: { marginTop: theme.spacing.xl },
  tripCard: { borderRadius: theme.radius.xl },
  tripImage: { height: 170, backgroundColor: theme.colors.surfaceSecondary },
  imagePill: { position: "absolute", top: 14, left: 14, paddingVertical: 6, paddingHorizontal: 10, borderRadius: theme.radius.full, backgroundColor: theme.colors.surface },
  imagePillText: { color: theme.colors.primary, fontSize: 9, fontWeight: "800", letterSpacing: 0.4 },
  tripBody: { padding: theme.spacing.base },
  tripTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tripTitle: { flex: 1, color: theme.colors.text, fontSize: 20, fontWeight: "800", letterSpacing: -0.4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 9 },
  metaText: { color: theme.colors.textSecondary, fontSize: 12 },
  memberRow: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 13 },
  statusBadge: { marginLeft: "auto" },
  emptyCard: { gap: 6 },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: theme.colors.text },
  inspirationCard: { flexDirection: "row", alignItems: "center", padding: 10, gap: 12, minHeight: 104 },
  inspirationImage: { width: 88, height: 84, borderRadius: 12, backgroundColor: theme.colors.surfaceSecondary },
  inspirationCopy: { flex: 1, gap: 5 },
  eyebrow: { fontSize: 9, fontWeight: "800", letterSpacing: 0.55, color: theme.colors.primary },
  inspirationTitle: { fontSize: 14, color: theme.colors.text, fontWeight: "700" },
  inspirationArrow: { marginRight: 4 },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, marginTop: theme.spacing.xl },
  footerText: { color: theme.colors.textSecondary, fontSize: 12 },
});
