
import { View, Text, StyleSheet } from "react-native";
import theme from "@/constants/theme";

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>
        Your trip updates will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    paddingTop: 60,
  },

  title: {
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },

  subtitle: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.textSecondary,
  },
});
