
export const theme = {
  colors: {
    // Brand colors
    primary: "#2563EB",
    primaryDark: "#1D4ED8",
    primaryLight: "#DBEAFE",

    // Background colors
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceSecondary: "#F8FAFC",

    // Text colors
    text: "#14243A",
    textSecondary: "#778397",
    textMuted: "#A3ACB9",
    textOnPrimary: "#FFFFFF",

    // Border colors
    border: "#E5EAF1",
    borderFocused: "#2563EB",

    // Status colors
    success: "#16A34A",
    warning: "#F59E0B",
    error: "#DC2626",
    info: "#2563EB",

    // Other
    transparent: "transparent",
    overlay: "rgba(0,0,0,0.12)",
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
      title: 32,
      display: 40,
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
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },

  shadows: {
    card: {
      shadowColor: "#14243A",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 3,
    },
  },
} as const;

export default theme;
