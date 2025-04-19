import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Theme interface defining colors and style properties for each theme
export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    backgroundHighlight: string;
    foreground: string;
    foregroundSecondary: string;
    foregroundTertiary: string;
    foregroundHighlight: string;
    primary: string;
    primaryHover: string;
    primaryActive: string;
    secondary: string;
    secondaryHover: string;
    accent: string;
    border: string;
    borderHover: string;
    shadow: string;
    shadowStrong: string;
  };
  styles: {
    borderRadius: string;
    boxShadow: string;
    innerShadow: string;
    backgroundImage?: string;
    backgroundTexture?: string;
    cardGradient?: string;
    completedPiece: {
      primary: string;
      secondary: string;
      highlight: string;
      shadow: string;
      text: string;
    };
    upcomingPiece: {
      primary: string;
      secondary: string;
      highlight: string;
      shadow: string;
      text: string;
    };
    fontFamily?: string;
    hover?: {
      transform: string;
      transition: string;
    };
  };
  animations?: {
    hoverClass: string;
    textClass: string;
  };
}

// Current default beige/brown Lofi theme
export const defaultTheme: Theme = {
  id: "lofi-beige",
  name: "Lofi Beige",
  description: "Calm beige and brown tones with a minimalist aesthetic",
  colors: {
    background: "#f5e9d9",
    backgroundSecondary: "#f7f2ea",
    backgroundTertiary: "#e6dfd3",
    backgroundHighlight: "#ffffff",
    foreground: "#8b6e5a",
    foregroundSecondary: "#a38b7b",
    foregroundTertiary: "#c8b297",
    foregroundHighlight: "#6f5848",
    primary: "#8b6e5a",
    primaryHover: "#7d6351",
    primaryActive: "#6f5848",
    secondary: "#c8b297",
    secondaryHover: "#b99f81",
    accent: "#d7c4ad",
    border: "#c5b7a7",
    borderHover: "#b5a797",
    shadow: "rgba(0,0,0,0.05)",
    shadowStrong: "rgba(0,0,0,0.1)",
  },
  styles: {
    borderRadius: "0.75rem",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    innerShadow: "inset 0 0 20px rgba(0,0,0,0.02)",
    backgroundTexture: "radial-gradient(circle at 70% 30%, #eae3d7 5%, transparent 5%), radial-gradient(circle at 30% 70%, #e0d8cc 3%, transparent 3%)",
    completedPiece: {
      primary: "#b9a18f",
      secondary: "#a38d7b",
      highlight: "#ccb5a3",
      shadow: "#8a7767",
      text: "#f5efe7",
    },
    upcomingPiece: {
      primary: "#e0d5c5",
      secondary: "#d4c9b9",
      highlight: "#f5efe7",
      shadow: "#bfb5a5",
      text: "#7d6e5f",
    },
  },
};

// Galaxy theme with indigo, deep purple and soft stars
export const galaxyTheme: Theme = {
  id: "theme-galaxy",
  name: "Galaxy Lofi",
  description: "Modern indigo and lavender tones with subtle star accents and a natural lofi feel",
  colors: {
    background: "#151c3b",
    backgroundSecondary: "#1d2345",
    backgroundTertiary: "#252a52",
    backgroundHighlight: "#ffffff",
    foreground: "#ffffff",
    foregroundSecondary: "#e0e0ff",
    foregroundTertiary: "#c4c1f0",
    foregroundHighlight: "#ffffff",
    primary: "#b5aeff",
    primaryHover: "#c8c2ff",
    primaryActive: "#d8d4ff",
    secondary: "#8a8ccf",
    secondaryHover: "#9b9ddd",
    accent: "#a5a7e9",
    border: "#4f5387",
    borderHover: "#686ca0",
    shadow: "rgba(10, 10, 40, 0.15)",
    shadowStrong: "rgba(10, 10, 40, 0.3)",
  },
  styles: {
    borderRadius: "0.75rem",
    boxShadow: "0 5px 15px rgba(10, 10, 40, 0.12)",
    innerShadow: "inset 0 0 20px rgba(150, 140, 255, 0.07)",
    backgroundTexture: "radial-gradient(circle at 90% 10%, rgba(180, 160, 255, 0.07) 1%, transparent 1%), radial-gradient(circle at 10% 90%, rgba(180, 160, 255, 0.07) 1%, transparent 1%), radial-gradient(circle at 50% 50%, rgba(180, 160, 255, 0.02) 1%, transparent 1%)",
    backgroundImage: "linear-gradient(to bottom, rgba(21, 28, 59, 0) 0%, rgba(21, 28, 59, 1) 100%), radial-gradient(circle at 50% 0%, rgba(150, 140, 255, 0.1) 0%, transparent 60%)",
    cardGradient: "linear-gradient(135deg, rgba(41, 46, 86, 0.5) 0%, rgba(31, 35, 70, 0.5) 100%)",
    fontFamily: "light-serif",
    completedPiece: {
      primary: "#8e87d2",
      secondary: "#7b74c0",
      highlight: "#a29aea",
      shadow: "#6560ad",
      text: "#ffffff",
    },
    upcomingPiece: {
      primary: "#4f5387",
      secondary: "#3b3f75",
      highlight: "#686ca0",
      shadow: "#2a2d5c",
      text: "#ffffff",
    },
  },
};

// Retro theme with pink, mint, and navy
export const retroTheme: Theme = {
  id: "theme-retro",
  name: "Retro Lofi",
  description: "Nostalgic pink, mint and navy tones with vintage pixel aesthetic",
  colors: {
    background: "#0c1f36",
    backgroundSecondary: "#142c45",
    backgroundTertiary: "#1d3553",
    backgroundHighlight: "#f0edd8",
    foreground: "#f8f5dc",
    foregroundSecondary: "#e0dbbc",
    foregroundTertiary: "#c5c1a6",
    foregroundHighlight: "#ffffff",
    primary: "#ff5a87",
    primaryHover: "#ff7da1",
    primaryActive: "#ff9dba",
    secondary: "#4dd8c0",
    secondaryHover: "#62e6d0",
    accent: "#26c6f7",
    border: "#ff5a87",
    borderHover: "#4dd8c0",
    shadow: "rgba(12, 31, 54, 0.25)",
    shadowStrong: "rgba(12, 31, 54, 0.4)",
  },
  styles: {
    borderRadius: "0rem",
    boxShadow: "0 4px 0 rgba(12, 31, 54, 0.25)",
    innerShadow: "inset 0 0 0 2px rgba(255, 90, 135, 0.15)",
    backgroundTexture: "linear-gradient(to right, rgba(38, 61, 93, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(38, 61, 93, 0.15) 1px, transparent 1px)",
    backgroundImage: "repeating-linear-gradient(0deg, rgba(38, 61, 93, 0.1) 0px, rgba(38, 61, 93, 0.1) 1px, transparent 1px, transparent 4px)",
    cardGradient: "linear-gradient(180deg, rgba(29, 53, 83, 0.6) 0%, rgba(20, 44, 69, 0.6) 100%)",
    fontFamily: "mono",
    completedPiece: {
      primary: "#ff5a87",
      secondary: "#e0476e",
      highlight: "#ff7da1",
      shadow: "#c33a5c",
      text: "#f8f5dc",
    },
    upcomingPiece: {
      primary: "#142c45",
      secondary: "#0c1f36",
      highlight: "#1d3553",
      shadow: "#091729",
      text: "#f8f5dc",
    },
  },
};

// Array to store all available themes
export const availableThemes: Theme[] = [
  defaultTheme,
  galaxyTheme,
  retroTheme,
  {
    id: "theme-snow",
    name: "Snow",
    description: "Serene ice blue and silver white tones with a crisp, minimal lofi aesthetic",
    colors: {
      background: "#f0f5f9",
      backgroundSecondary: "#e7eef5",
      backgroundTertiary: "#dce7f0",
      backgroundHighlight: "#ffffff",
      foreground: "#364f6b",
      foregroundSecondary: "#5a7896",
      foregroundTertiary: "#8ba5c0",
      foregroundHighlight: "#243748",
      primary: "#70a3c4",
      primaryHover: "#8ab6d2",
      primaryActive: "#5a8eaf",
      secondary: "#c1d5e8",
      secondaryHover: "#d0e0ee",
      accent: "#a0c2dd",
      border: "#d0e0ee",
      borderHover: "#b2cce2",
      shadow: "rgba(83, 132, 172, 0.1)",
      shadowStrong: "rgba(83, 132, 172, 0.2)",
    },
    styles: {
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      borderRadius: "8px",
      boxShadow: "0 8px 24px rgba(83, 132, 172, 0.08)",
      innerShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
      backgroundTexture: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 245, 249, 0) 60%)",
      completedPiece: {
        primary: "#70a3c4",
        secondary: "#5c93b8",
        highlight: "#88b4d0",
        shadow: "#4a7ea1",
        text: "#ffffff",
      },
      upcomingPiece: {
        primary: "#dce7f0",
        secondary: "#cfdce8",
        highlight: "#e9f1f7",
        shadow: "#b7c8da",
        text: "#5a7896",
      },
      hover: {
        transform: "scale(1.02)",
        transition: "all 0.5s ease-out",
      }
    },
    animations: {
      hoverClass: "hover-snow",
      textClass: "snow-text",
    }
  },
  {
    id: "theme-sakura",
    name: "Sakura",
    description: "Delicate cherry blossom pink and soft gray tones with a dreamy spring aesthetic",
    colors: {
      background: "#fbf1f3",
      backgroundSecondary: "#f7e8ec",
      backgroundTertiary: "#f0dfe6",
      backgroundHighlight: "#ffffff",
      foreground: "#595560",
      foregroundSecondary: "#807986",
      foregroundTertiary: "#a8a2ad",
      foregroundHighlight: "#4b4852",
      primary: "#e792a8",
      primaryHover: "#eca6b8",
      primaryActive: "#d8809c",
      secondary: "#b8a6bb",
      secondaryHover: "#c7b9ca",
      accent: "#ebc0cd",
      border: "#f0dfe6",
      borderHover: "#e5d0db",
      shadow: "rgba(231, 146, 168, 0.08)",
      shadowStrong: "rgba(231, 146, 168, 0.15)",
    },
    styles: {
      fontFamily: "'DM Sans', 'SF Pro Rounded', system-ui, sans-serif",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(231, 146, 168, 0.06)",
      innerShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8)",
      backgroundTexture: "radial-gradient(circle at 70% 20%, rgba(231, 146, 168, 0.04) 0%, rgba(231, 146, 168, 0) 50%), radial-gradient(circle at 30% 80%, rgba(184, 166, 187, 0.04) 0%, rgba(184, 166, 187, 0) 50%)",
      completedPiece: {
        primary: "#e792a8",
        secondary: "#d47e95",
        highlight: "#f2aebf",
        shadow: "#b76980",
        text: "#ffffff",
      },
      upcomingPiece: {
        primary: "#f0dfe6",
        secondary: "#e5d2db",
        highlight: "#f9eef2",
        shadow: "#d5c2cc",
        text: "#807986",
      },
      hover: {
        transform: "scale(1.02)",
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }
    },
    animations: {
      hoverClass: "hover-sakura",
      textClass: "sakura-text",
    }
  },
];

// Function to get a random theme
export function getRandomTheme(): Theme {
  const randomIndex = Math.floor(Math.random() * availableThemes.length);
  return availableThemes[randomIndex];
}

// Function to get a theme by ID
export function getThemeById(id: string): Theme {
  switch (id) {
    case 'theme-galaxy':
      return galaxyTheme;
    case 'theme-retro':
      return retroTheme;
    case 'theme-snow':
      return availableThemes.find(t => t.id === 'theme-snow') as Theme;
    case 'theme-sakura':
      return availableThemes.find(t => t.id === 'theme-sakura') as Theme;
    case 'lofi-beige':
      return defaultTheme;
    default:
      return defaultTheme;
  }
}
