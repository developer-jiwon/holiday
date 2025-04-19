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

// Forest theme with olive green and moss brown tones
export const forestTheme: Theme = {
  id: "theme-forest",
  name: "Forest Lofi",
  description: "Organic olive green and moss brown tones with an elegant, earthy aesthetic",
  colors: {
    background: "#2c3325",
    backgroundSecondary: "#3c432e",
    backgroundTertiary: "#454e35",
    backgroundHighlight: "#f5f3e8",
    foreground: "#f2efe2",
    foregroundSecondary: "#e5e2d5",
    foregroundTertiary: "#cac5b5",
    foregroundHighlight: "#ffffff",
    primary: "#7c9158",
    primaryHover: "#8fa569",
    primaryActive: "#a1b77c",
    secondary: "#a98c68",
    secondaryHover: "#b69a76",
    accent: "#d6c097",
    border: "#5e6945",
    borderHover: "#717d53",
    shadow: "rgba(29, 33, 24, 0.2)",
    shadowStrong: "rgba(29, 33, 24, 0.35)",
  },
  styles: {
    borderRadius: "0.5rem",
    boxShadow: "0 8px 20px rgba(29, 33, 24, 0.15)",
    innerShadow: "inset 0 0 0 1px rgba(124, 145, 88, 0.1)",
    backgroundTexture: "radial-gradient(circle at 80% 30%, rgba(156, 175, 120, 0.08) 1%, transparent 1%), radial-gradient(circle at 20% 70%, rgba(156, 175, 120, 0.08) 1%, transparent 1%)",
    backgroundImage: "linear-gradient(to bottom, rgba(44, 51, 37, 0) 0%, rgba(44, 51, 37, 1) 100%), url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%237c9158\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
    cardGradient: "linear-gradient(135deg, rgba(69, 78, 53, 0.3) 0%, rgba(60, 67, 46, 0.3) 100%)",
    fontFamily: "light-serif",
    completedPiece: {
      primary: "#7c9158",
      secondary: "#637541",
      highlight: "#8fa569",
      shadow: "#4e5a33",
      text: "#f2efe2",
    },
    upcomingPiece: {
      primary: "#3c432e",
      secondary: "#2c3325",
      highlight: "#454e35",
      shadow: "#232919",
      text: "#e5e2d5",
    },
  },
};

// Array to store all available themes
export const availableThemes: Theme[] = [
  defaultTheme,
  galaxyTheme,
  retroTheme,
  forestTheme,
  {
    id: "theme-sunset",
    name: "Sunset",
    description: "Warm sunset orange and dusky pink tones with a lofi pantone aesthetic",
    colors: {
      background: "#fff5f2",
      backgroundSecondary: "#ffede8",
      backgroundTertiary: "#ffdfd6",
      backgroundHighlight: "#ffe8e1",
      foreground: "#33272a",
      foregroundSecondary: "#644a51",
      foregroundTertiary: "#856970",
      foregroundHighlight: "#33272a",
      primary: "#ff9a76",
      primaryHover: "#ffb294",
      primaryActive: "#ff8667",
      secondary: "#f27d74",
      secondaryHover: "#f4908a",
      accent: "#e3665e",
      border: "#ffcdc0",
      borderHover: "#ffbba8",
      shadow: "rgba(255, 154, 118, 0.15)",
      shadowStrong: "rgba(242, 125, 116, 0.25)",
    },
    styles: {
      fontFamily: "'Nunito', 'SF Pro Rounded', system-ui, sans-serif",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(255, 154, 118, 0.2)",
      innerShadow: "inset 0 0 20px rgba(255, 154, 118, 0.05)",
      backgroundTexture: "linear-gradient(135deg, rgba(255,190,175,0.05) 0%, rgba(255,208,190,0.08) 100%)",
      completedPiece: {
        primary: "#ff9a76",
        secondary: "#ff8667",
        highlight: "#ffb19a",
        shadow: "#db7459",
        text: "#33272a",
      },
      upcomingPiece: {
        primary: "#f9bbaa",
        secondary: "#f7a899",
        highlight: "#ffd0c4",
        shadow: "#e6948a",
        text: "#644a51",
      },
      hover: {
        transform: "scale(1.03)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }
    },
    animations: {
      hoverClass: "hover-sunset",
      textClass: "sunset-text",
    }
  },
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
  // Additional themes will be added here
];

// Function to get a random theme
export function getRandomTheme(): Theme {
  const randomIndex = Math.floor(Math.random() * availableThemes.length);
  return availableThemes[randomIndex];
}

// Function to get a theme by ID
export function getThemeById(id: string): Theme {
  return availableThemes.find(theme => theme.id === id) || defaultTheme;
}
