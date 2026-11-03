import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppCard from "@/components/AppCard";
import { demoNotifications } from "@/data/demo";
import { theme } from "@/constants/theme";

export default function NotificationsScreen() {
  const [readAll, setReadAll] = useState(false);
  const [readIds, setReadIds] = useState<string[]>([]);
  const unreadCount = readAll ? 0 : demoNotifications.filter((item) => item.unread && !readIds.includes(item.id)).length;
  const markRead = (id: string) => setReadIds((items) => items.includes(id) ? items : [...items, id]);

  return <SafeAreaView style={styles.safe} edges={["top"]}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.header}><View><Text style={styles.title}>Notifications</Text><Text style={styles.subtitle}>Little updates from your crew.</Text></View>{unreadCount > 0 && <View style={styles.count}><Text style={styles.countText}>{unreadCount}</Text></View>}</View>
    <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Recent</Text><Pressable onPress={() => setReadAll(true)} hitSlop={8}><Text style={styles.link}>Mark all read</Text></Pressable></View>
    {demoNotifications.map((item) => {
      const unread = !readAll && item.unread && !readIds.includes(item.id);
      return <Pressable key={item.id} onPress={() => markRead(item.id)}><AppCard padding={14} style={styles.card}><View style={[styles.icon, unread && styles.unreadIcon]}><Ionicons name={item.icon} size={19} color={theme.colors.primary} /></View><View style={styles.copy}><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.detail}>{item.detail}</Text><Text style={styles.time}>{item.time}</Text></View>{unread && <View style={styles.dot} />}</AppCard></Pressable>;
    })}
    <Text style={styles.footer}>You’re all caught up on the little things.</Text>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: 132 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: theme.colors.text, fontSize: 28, fontWeight: "800", letterSpacing: -0.6 },
  subtitle: { color: theme.colors.textSecondary, fontSize: 13, marginTop: 5 },
  count: { minWidth: 26, height: 26, paddingHorizontal: 7, borderRadius: 13, backgroundColor: theme.colors.primaryLight, alignItems: "center", justifyContent: "center" },
  countText: { color: theme.colors.primary, fontWeight: "700", fontSize: 11 },
  sectionHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: theme.spacing.xl, marginBottom: theme.spacing.md },
  sectionTitle: { color: theme.colors.text, fontWeight: "700", fontSize: 17 },
  link: { color: theme.colors.primary, fontWeight: "600", fontSize: 12 },
  card: { flexDirection: "row", gap: 11, alignItems: "flex-start", marginBottom: 9, minHeight: 88 },
  icon: { width: 39, height: 39, backgroundColor: theme.colors.surfaceSecondary, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  unreadIcon: { backgroundColor: theme.colors.primaryLight },
  copy: { flex: 1 },
  itemTitle: { color: theme.colors.text, fontSize: 13, fontWeight: "700" },
  detail: { color: theme.colors.textSecondary, fontSize: 11, marginTop: 4 },
  time: { color: theme.colors.textMuted, fontSize: 10, marginTop: 7 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: theme.colors.primary, marginTop: 5 },
  footer: { textAlign: "center", color: theme.colors.textSecondary, fontSize: 11, marginTop: 20 },
});
