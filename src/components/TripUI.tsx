import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";
import type { TripMember, TripSection } from "@/types/trips";
import MemberAvatar from "@/components/MemberAvatar";

export function AvatarStack({ members, size = "small" }: { members: TripMember[]; size?: "small" | "medium" }) {
  return <View style={styles.avatarStack}>
    {members.slice(0, 4).map((member, index) => <MemberAvatar key={member.id} name={member.name} color={member.color} size={size} style={index > 0 ? styles.overlap : undefined} />)}
  </View>;
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <View style={styles.sectionTitleRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {action && <Pressable onPress={onAction} hitSlop={8}><Text style={styles.link}>{action}</Text></Pressable>}
  </View>;
}

export function TripHeader({ title, subtitle, back = true, rightIcon, onRightPress }: { title: string; subtitle?: string; back?: boolean; rightIcon?: React.ComponentProps<typeof Ionicons>["name"]; onRightPress?: () => void }) {
  return <View style={styles.header}>
    {back && <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.canGoBack() ? router.back() : router.replace("/(tabs)/home")} style={styles.headerButton}><Ionicons name="arrow-back" size={20} color={theme.colors.text} /></Pressable>}
    <View style={styles.headerCopy}><Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>{subtitle && <Text style={styles.headerSubtitle} numberOfLines={1}>{subtitle}</Text>}</View>
    {rightIcon && <Pressable accessibilityRole="button" accessibilityLabel="More options" onPress={onRightPress} style={styles.headerButton}><Ionicons name={rightIcon} size={20} color={theme.colors.text} /></Pressable>}
  </View>;
}

export function TripSectionTabs({ active, onChange }: { active: TripSection; onChange: (section: TripSection) => void }) {
  const sections: TripSection[] = ["Overview", "Itinerary", "Budget", "Chat", "Tasks"];
  return <View style={styles.tabs}>
    {sections.map((section) => <Pressable key={section} onPress={() => onChange(section)} style={[styles.tab, active === section && styles.activeTab]}><Text style={[styles.tabText, active === section && styles.activeTabText]}>{section}</Text></Pressable>)}
  </View>;
}

export function EmptyState({ icon, title, detail }: { icon: React.ComponentProps<typeof Ionicons>["name"]; title: string; detail: string }) {
  return <View style={styles.emptyState}><View style={styles.emptyIcon}><Ionicons name={icon} size={23} color={theme.colors.primary} /></View><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyDetail}>{detail}</Text></View>;
}

const styles = StyleSheet.create({
  avatarStack: { flexDirection: "row", alignItems: "center" },
  overlap: { marginLeft: -8 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: theme.spacing.md },
  sectionTitle: { color: theme.colors.text, fontSize: 18, fontWeight: "700" },
  link: { color: theme.colors.primary, fontSize: 13, fontWeight: "600" },
  header: { flexDirection: "row", alignItems: "center", gap: theme.spacing.md, minHeight: 52 },
  headerButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: theme.radius.full, backgroundColor: theme.colors.surface },
  headerCopy: { flex: 1, minWidth: 0 },
  headerTitle: { fontSize: 21, fontWeight: "800", color: theme.colors.text, letterSpacing: -0.45 },
  headerSubtitle: { marginTop: 2, fontSize: 12, color: theme.colors.textSecondary },
  tabs: { flexDirection: "row", padding: 4, borderRadius: 15, backgroundColor: theme.colors.surfaceSecondary, gap: 2, marginVertical: theme.spacing.base },
  tab: { flex: 1, minHeight: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", paddingHorizontal: 3 },
  activeTab: { backgroundColor: theme.colors.surface, ...theme.shadows.card },
  tabText: { fontSize: 10, color: theme.colors.textSecondary, fontWeight: "600" },
  activeTabText: { color: theme.colors.primary },
  emptyState: { alignItems: "center", paddingHorizontal: theme.spacing.xl, paddingVertical: theme.spacing.xxl },
  emptyIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: theme.colors.primaryLight, justifyContent: "center", alignItems: "center", marginBottom: theme.spacing.md },
  emptyTitle: { fontSize: 16, color: theme.colors.text, fontWeight: "700", textAlign: "center" },
  emptyDetail: { marginTop: 6, fontSize: 13, color: theme.colors.textSecondary, textAlign: "center", lineHeight: 19 },
});
