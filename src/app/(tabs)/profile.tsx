import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppCard from "@/components/AppCard";
import MemberAvatar from "@/components/MemberAvatar";
import { useTrips } from "@/contexts/TripContext";
import { theme } from "@/constants/theme";
import { router } from "expo-router";

function SettingRow({ icon, title, value, onPress, right }: { icon: React.ComponentProps<typeof Ionicons>["name"]; title: string; value?: string; onPress?: () => void; right?: React.ReactNode }) {
  const content = <><Ionicons name={icon} size={17} color={theme.colors.textSecondary} /><Text style={styles.rowTitle}>{title}</Text>{value && <Text style={styles.rowValue}>{value}</Text>}{right ?? (!value && <Ionicons name="chevron-forward" size={16} color={theme.colors.textMuted} />)}</>;
  return onPress ? <Pressable onPress={onPress} style={styles.row}>{content}</Pressable> : <View style={styles.row}>{content}</View>;
}

export default function ProfileScreen() {
  const { user, trips } = useTrips();
  const [notifications, setNotifications] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const friendCount = new Set(trips.flatMap((trip) => trip.members.map((member) => member.name)).filter((name) => name !== user.name)).size;

  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.header}><View><Text style={styles.title}>Your corner</Text><Text style={styles.subtitle}>Good trips start with you.</Text></View><Pressable style={styles.more} accessibilityLabel="Profile options"><Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.text} /></Pressable></View>
    <View style={styles.person}><MemberAvatar name={user.name} size="large" color="blue" /><View style={styles.personCopy}><Text style={styles.name}>{user.name}</Text><Text style={styles.email}>{user.email}</Text><Pressable onPress={() => setExpanded(expanded === "personal" ? null : "personal")}><Text style={styles.edit}>Edit profile →</Text></Pressable></View></View>
    {expanded === "personal" && <AppCard padding={14} style={styles.detailCard}><Text style={styles.detailLabel}>HOME CITY</Text><Text style={styles.detailValue}>{user.homeCity}</Text><Text style={styles.detailHint}>Profile editing will be available when accounts are connected.</Text></AppCard>}
    <AppCard padding={0} style={styles.stats}><View style={styles.stat}><Text style={styles.statValue}>{trips.length}</Text><Text style={styles.statLabel}>Trips together</Text></View><View style={styles.divider} /><View style={styles.stat}><Text style={styles.statValue}>{new Set(trips.map((trip) => trip.destination.split(",")[1]?.trim()).filter(Boolean)).size || 1}</Text><Text style={styles.statLabel}>Countries</Text></View><View style={styles.divider} /><View style={styles.stat}><Text style={styles.statValue}>{friendCount}</Text><Text style={styles.statLabel}>Travel friends</Text></View></AppCard>
    <Text style={styles.groupLabel}>ACCOUNT</Text>
    <AppCard padding={0} style={styles.settings}>
      <SettingRow icon="person-outline" title="Personal information" onPress={() => setExpanded(expanded === "personal" ? null : "personal")} />
      <View style={styles.dividerLine} /><SettingRow icon="shield-checkmark-outline" title="Privacy & security" onPress={() => setExpanded(expanded === "privacy" ? null : "privacy")} />
      <View style={styles.dividerLine} /><SettingRow icon="notifications-outline" title="Trip notifications" right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: theme.colors.border, true: theme.colors.primary }} thumbColor="#FFFFFF" accessibilityLabel="Trip notifications" />} />
    </AppCard>
    {expanded === "privacy" && <AppCard padding={14} style={styles.detailCard}><Text style={styles.detailValue}>Your demo profile stays on this device.</Text><Text style={styles.detailHint}>Account security controls will appear when sign-in is connected.</Text></AppCard>}
    <Text style={styles.groupLabel}>TRAVEL PREFERENCES</Text>
    <AppCard padding={0} style={styles.settings}>
      <SettingRow icon="card-outline" title="Default currency" value="EUR (€)" />
      <View style={styles.dividerLine} /><SettingRow icon="globe-outline" title="Language" value="English" />
      <View style={styles.dividerLine} /><SettingRow icon="moon-outline" title="Appearance" value="Light" />
    </AppCard>
    <View style={styles.support}><Ionicons name="help-circle-outline" size={16} color={theme.colors.textSecondary} /><Text style={styles.supportText}>Help & support</Text><Pressable onPress={() => router.replace("/")}><Text style={styles.signOut}>Sign out</Text></Pressable></View>
    <Text style={styles.version}>together we go.  ·  Made for shared memories  ·  v1.0</Text>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: 132 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: theme.colors.text, fontSize: 28, fontWeight: "800", letterSpacing: -0.7 },
  subtitle: { color: theme.colors.textSecondary, fontSize: 13, marginTop: 5 },
  more: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.surface, alignItems: "center", justifyContent: "center" },
  person: { flexDirection: "row", alignItems: "center", gap: 12, marginVertical: theme.spacing.lg },
  personCopy: { flex: 1 }, name: { color: theme.colors.text, fontSize: 19, fontWeight: "800" }, email: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 3 }, edit: { color: theme.colors.primary, fontSize: 11, fontWeight: "600", marginTop: 6 },
  stats: { flexDirection: "row", alignItems: "center", minHeight: 76 }, stat: { flex: 1, alignItems: "center" }, statValue: { color: theme.colors.text, fontSize: 19, fontWeight: "800" }, statLabel: { color: theme.colors.textSecondary, fontSize: 9, marginTop: 4 }, divider: { width: 1, height: 32, backgroundColor: theme.colors.border },
  groupLabel: { color: theme.colors.textMuted, fontWeight: "700", fontSize: 9, letterSpacing: 0.7, marginTop: theme.spacing.lg, marginBottom: 8 },
  settings: { borderRadius: theme.radius.lg }, row: { minHeight: 49, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 13 }, rowTitle: { flex: 1, color: theme.colors.text, fontSize: 12, fontWeight: "600" }, rowValue: { color: theme.colors.textSecondary, fontSize: 10 }, dividerLine: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.border, marginLeft: 40 },
  detailCard: { marginTop: 9 }, detailLabel: { color: theme.colors.textSecondary, fontSize: 9, fontWeight: "700", letterSpacing: 0.5 }, detailValue: { color: theme.colors.text, fontSize: 13, fontWeight: "700", marginTop: 6 }, detailHint: { color: theme.colors.textSecondary, fontSize: 10, lineHeight: 15, marginTop: 4 },
  support: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 18 }, supportText: { flex: 1, color: theme.colors.textSecondary, fontSize: 11 }, signOut: { color: theme.colors.primary, fontSize: 11, fontWeight: "700" }, version: { color: theme.colors.textMuted, fontSize: 9, textAlign: "center", marginTop: 20 },
});
