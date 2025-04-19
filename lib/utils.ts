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
