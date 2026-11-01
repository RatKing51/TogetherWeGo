
import { View, Text } from "react-native";
import theme from "@/constants/theme";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 24 }}>
        Profile
      </Text>
    </View>
  );
}
