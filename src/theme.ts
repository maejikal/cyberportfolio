// src/theme.ts
export type ThemeName = "cyberpunk" | "dark" | "ocean" | "forest" | "minimal";

export interface ThemeColors {
  accent: string;
  accentLight: string;
  accentDark: string;
  accentLink?: string;
  accentNumber?: string;
  background: {
    primary: string;
    secondary: string;
    code: string;
    codeBorder: string;
  };
  text: {
    primary: string;
    secondary: string;
    code: string;
  };
  borders: {
    primary: string;
    code: string;
  };
}

export interface Theme {
  name: ThemeName;
  label: string;
  colors: ThemeColors;
}

export const themes: Record<ThemeName, Theme> = {
  cyberpunk: {
    name: "cyberpunk",
    label: "Cyberpunk (Magenta)",
    colors: {
      accent: "#e275db",
      accentLight: "rgba(226, 117, 219, 0.1)",
      accentDark: "rgba(226, 117, 219, 0.2)",
      background: {
        primary: "#ffffff",
        secondary: "#f9f9f9",
        code: "#0f172a",
        codeBorder: "rgba(226, 117, 219, 0.2)",
      },
      text: {
        primary: "#1a1a1a",
        secondary: "#666666",
        code: "#f3f4f6",
      },
      borders: {
        primary: "#e275db",
        code: "#e275db",
      },
    },
  },
  dark: {
    name: "dark",
    label: "Dark Mode",
    colors: {
      accent: "#60a5fa",
      accentLight: "rgba(193, 219, 251, 0.1)",
      accentDark: "rgba(251, 121, 117, 1)",
      accentLink: "#bbff7cff",
      accentNumber: "#ffc36aff",
      background: {
        primary: "#0a0a0a",
        secondary: "#1a1a1a",
        code: "#000000",
        codeBorder: "rgba(96, 165, 250, 0.2)",
      },
      text: {
        primary: "#e5e5e5",
        secondary: "#a3a3a3",
        code: "#d4d4d4",
      },
      borders: {
        primary: "#60a5fa",
        code: "#60a5fa",
      },
    },
  },
  ocean: {
    name: "ocean",
    label: "Ocean (Blue)",
    colors: {
      accent: "#0ea5e9",
      accentLight: "rgba(14, 165, 233, 0.1)",
      accentDark: "rgba(14, 165, 233, 0.2)",
      background: {
        primary: "#f0f9ff",
        secondary: "#e0f2fe",
        code: "#082f49",
        codeBorder: "rgba(14, 165, 233, 0.2)",
      },
      text: {
        primary: "#0c4a6e",
        secondary: "#0369a1",
        code: "#e0f2fe",
      },
      borders: {
        primary: "#0ea5e9",
        code: "#0ea5e9",
      },
    },
  },
  forest: {
    name: "forest",
    label: "Forest (Green)",
    colors: {
      accent: "#10b981",
      accentLight: "rgba(16, 185, 129, 0.1)",
      accentDark: "rgba(16, 185, 129, 0.2)",
      background: {
        primary: "#f0fdf4",
        secondary: "#dcfce7",
        code: "#052e16",
        codeBorder: "rgba(16, 185, 129, 0.2)",
      },
      text: {
        primary: "#14532d",
        secondary: "#15803d",
        code: "#dcfce7",
      },
      borders: {
        primary: "#10b981",
        code: "#10b981",
      },
    },
  },
  minimal: {
    name: "minimal",
    label: "Minimal (B&W)",
    colors: {
      accent: "#000000",
      accentLight: "rgba(0, 0, 0, 0.05)",
      accentDark: "rgba(0, 0, 0, 0.1)",
      background: {
        primary: "#ffffff",
        secondary: "#f5f5f5",
        code: "#1a1a1a",
        codeBorder: "rgba(0, 0, 0, 0.1)",
      },
      text: {
        primary: "#000000",
        secondary: "#525252",
        code: "#e5e5e5",
      },
      borders: {
        primary: "#e5e5e5",
        code: "#404040",
      },
    },
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  return themes[themeName] || themes.cyberpunk;
};