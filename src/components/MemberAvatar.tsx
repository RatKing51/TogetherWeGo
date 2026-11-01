
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";

import theme from "@/constants/theme";

type AvatarSize = "small" | "medium" | "large";
type AvatarColor = "blue" | "pink" | "yellow" | "green";

type MemberAvatarProps = {
  name: string;
  image?: ImageSourcePropType;
  size?: AvatarSize;
  color?: AvatarColor;
  style?: StyleProp<ViewStyle>;
};

// Avatar sizes
const sizes = {
  small: 32,
  medium: 42,
  large: 58,
};

// Background colors
const avatarColors = {
  blue: "#DBEAFE",
  pink: "#FCE7F3",
  yellow: "#FEF3C7",
  green: "#DCFCE7",
};

// Generate initials from a full name
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "?";

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (
    words[0][0] + words[words.length - 1][0]
  ).toUpperCase();
}

export default function MemberAvatar({
  name,
  image,
  size = "medium",
  color = "blue",
  style,
}: MemberAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const avatarSize = sizes[size];
  const initials = getInitials(name);

  // Reset image errors when the picture changes
  useEffect(() => {
    setImageFailed(false);
  }, [image]);

  return (
    <View
      accessible
      accessibilityLabel={name}
      style={[
        styles.avatar,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: avatarColors[color],
        },
        style,
      ]}
    >
      {image && !imageFailed ? (
        <Image
          source={image}
          resizeMode="cover"
          style={styles.image}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              fontSize: avatarSize * 0.3,
            },
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },

  initials: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.semibold,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
