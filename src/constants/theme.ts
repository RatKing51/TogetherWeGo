/**
 * Shared visual tokens for Together We Go.
 * Edit this file to update the brand palette, spacing, type, and corner shapes.
 */
export const theme = {
  colors: {
    primary: "#2563EB",
    primaryDark: "#1D4ED8",
    primaryLight: "#EAF1FF",
    background: "#F7F9FC",
    surface: "#FFFFFF",
    surfaceSecondary: "#EEF2F8",
    text: "#14243A",
    textSecondary: "#68778D",
    textMuted: "#8290A4",
    textOnPrimary: "#FFFFFF",
    border: "#E3E9F2",
    borderFocused: "#2563EB",
    success: "#16866A",
    successLight: "#E5F5EF",
    warning: "#B87612",
    warningLight: "#FFF3DA",
    error: "#C93F4A",
    errorLight: "#FDEBED",
    info: "#2563EB",
    avatarBlue: "#EAF1FF",
    avatarPink: "#FCE8F2",
    avatarYellow: "#FFF1D6",
    avatarGreen: "#E5F5EF",
    transparent: "transparent",
    overlay: "rgba(20, 36, 58, 0.28)",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  typography: {
    sizes: {
      caption: 10,
      small: 12,
      body: 14,
      medium: 16,
      large: 20,
      heading: 24,
      title: 30,
      display: 38,
    },
    weights: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    xxl: 24,
    full: 9999,
  },
  shadows: {
    card: {
      shadowColor: "#14243A",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.06,
      shadowRadius: 14,
      elevation: 2,
    },
    floating: {
      shadowColor: "#14243A",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 18,
      elevation: 6,
    },
  },
} as const;

export default theme;
