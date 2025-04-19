"use client"

import { useState, useRef, useEffect, createContext, useContext } from "react"
import { BackgroundIllustration } from "./background-illustration"
import { getHolidaysForYear, getHolidaysByCountry, type Holiday, type UpcomingHoliday, type PastHoliday } from "../lib/date-utils"
import { Gift, Sparkles, PartyPopper, Cake, RefreshCw, Volume2, VolumeX, ArrowLeft, ArrowRight } from "lucide-react"
import { HolidayPuzzleBoard } from "./holiday-puzzle-board"
import { useTheme } from "@/hooks/use-theme"
import { CountrySelector } from "./country-selector"
import useSound from "use-sound"

type TooltipPosition = { x: number; y: number } | null

// Countries available for selection
const COUNTRIES = [
  { id: 'us', name: 'United States', flag: '🇺🇸' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪' },
  { id: 'france', name: 'France', flag: '🇫🇷' },
  { id: 'spain', name: 'Spain', flag: '🇪🇸' },
  { id: 'italy', name: 'Italy', flag: '🇮🇹' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵' },
  { id: 'china', name: 'China', flag: '🇨🇳' },
  { id: 'taiwan', name: 'Taiwan', flag: '🇹🇼' },
  { id: 'korea', name: 'South Korea', flag: '🇰🇷' },
]

// Create the SparkleIcon component
function SparkleIcon() {
  const { theme } = useTheme();
  
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill={theme.colors.foreground} />
    </svg>
  );
}

// Create the puzzle icon component for the title
function PuzzleIcon({className = ""}) {
  const { theme } = useTheme();
  
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7h3a1 1 0 0 0 1-1V5a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1a2 2 0 0 0-4 0v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a2 2 0 0 0 0-4H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" 
        fill={theme.colors.foreground} />
    </svg>
  );
}

// Create a component for sparkle animation
function SparkleAnimation() {
  const { theme } = useTheme();
  
  return (
    <>
      <div className="absolute top-0 left-1/4 animate-ping">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill={theme.colors.backgroundHighlight} />
        </svg>
      </div>
      <div className="absolute top-1/4 right-0 animate-ping" style={{ animationDelay: "0.2s" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill={theme.colors.backgroundHighlight} />
        </svg>
      </div>
      <div className="absolute bottom-0 right-1/4 animate-ping" style={{ animationDelay: "0.4s" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill={theme.colors.backgroundHighlight} />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-0 animate-ping" style={{ animationDelay: "0.6s" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill={theme.colors.backgroundHighlight} />
        </svg>
      </div>
    </>
  );
}

// Create specialized minimal holiday icons that have distinct designs for each holiday
function HolidayIcon({ iconName, fill = "#000000" }: { iconName: string, fill: string }) {
  switch (iconName) {
    case "christmas":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14 6H10L12 2Z" fill={fill} />
          <path d="M12 6L14 10H10L12 6Z" fill={fill} />
          <path d="M12 10L14 14H10L12 10Z" fill={fill} />
          <rect x="11" y="14" width="2" height="6" fill={fill} />
          <rect x="8" y="20" width="8" height="2" fill={fill} />
        </svg>
      )
    case "christmas-eve":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14 6H10L12 2Z" fill={fill} />
          <path d="M12 6L14 10H10L12 6Z" fill={fill} />
          <rect x="11" y="10" width="2" height="4" fill={fill} />
          <path d="M6 14H18L16 22H8L6 14Z" fill={fill} />
          <circle cx="9" cy="17" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <circle cx="15" cy="17" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
        </svg>
      )
    case "halloween":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9C6 6 9 4 12 4C15 4 18 6 18 9V11H6V9Z" fill={fill} />
          <path d="M4 15C4 11 8 9 12 9C16 9 20 11 20 15C20 19 16 22 12 22C8 22 4 19 4 15Z" fill={fill} />
          <circle cx="8" cy="14" r="1.5" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <circle cx="16" cy="14" r="1.5" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <path d="M9 18C10 19 11 19 12 19C13 19 14 19 15 18" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="1.5" />
        </svg>
      )
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21L10.5 19.7C5.4 15.1 2 12.1 2 8.3C2 5.1 4.4 2.7 7.5 2.7C9.2 2.7 10.9 3.5 12 4.8C13.1 3.5 14.8 2.7 16.5 2.7C19.6 2.7 22 5.1 22 8.3C22 12.1 18.6 15.1 13.5 19.7L12 21Z" fill={fill} />
        </svg>
      )
    case "bunny":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="15" r="7" fill={fill} />
          <circle cx="9.5" cy="13" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <circle cx="14.5" cy="13" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <ellipse cx="7" cy="6" rx="2" ry="4" transform="rotate(-20 7 6)" fill={fill} />
          <ellipse cx="17" cy="6" rx="2" ry="4" transform="rotate(20 17 6)" fill={fill} />
          <path d="M10.5 17C11.5 18 12.5 18 13.5 17" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="1.5" />
        </svg>
      )
    case "clover":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8.5" cy="8.5" r="3.5" fill={fill} />
          <circle cx="15.5" cy="8.5" r="3.5" fill={fill} />
          <circle cx="8.5" cy="15.5" r="3.5" fill={fill} />
          <circle cx="15.5" cy="15.5" r="3.5" fill={fill} />
          <rect x="11.5" y="12" width="1" height="8" fill={fill} />
        </svg>
      )
    case "firework":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V6" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M12 18V22" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12H2" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M22 12H18" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M19 5L16 8" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M8 16L5 19" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M19 19L16 16" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M8 8L5 5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" fill={fill} />
        </svg>
      )
    case "turkey":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="15" r="7" fill={fill} />
          <circle cx="10" cy="13" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <circle cx="14" cy="13" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <path d="M7 7L12 12L17 7" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M5 9L12 12L19 9" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12L12 12L20 12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "party":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6L14 2L16 6L20 6L16 9L18 13L14 11L10 13L12 9L8 6L12 6Z" fill={fill} />
          <path d="M4 16L6 12L8 16L12 16L8 19L10 23L6 21L2 23L4 19L0 16L4 16Z" fill={fill} />
        </svg>
      )
    case "earth":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={fill} strokeWidth="2" />
          <path d="M3 11H21" stroke={fill} strokeWidth="1.5" />
          <path d="M3 15H21" stroke={fill} strokeWidth="1.5" />
          <path d="M12 2C14.5 5 15 9 12 12C9 15 8.5 19 12 22" stroke={fill} strokeWidth="1.5" />
          <path d="M12 2C9.5 5 9 9 12 12C15 15 15.5 19 12 22" stroke={fill} strokeWidth="1.5" />
        </svg>
      )
    case "memorial":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14 5H10L12 2Z" fill={fill} />
          <rect x="11" y="5" width="2" height="10" fill={fill} />
          <rect x="7" y="15" width="10" height="2" fill={fill} />
          <rect x="5" y="17" width="14" height="2" fill={fill} />
          <rect x="4" y="19" width="16" height="2" fill={fill} />
        </svg>
      )
    case "labor":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="6" r="4" fill={fill} />
          <rect x="6" y="10" width="12" height="8" rx="1" fill={fill} />
          <path d="M6 18L4 22H20L18 18" fill={fill} />
          <circle cx="9" cy="14" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <circle cx="15" cy="14" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
        </svg>
      )
    case "mothers":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5Z" fill={fill} />
          <path d="M12 13C9 13 4 14.5 4 18V21H20V18C20 14.5 15 13 12 13Z" fill={fill} />
          <path d="M17 8C19 5 22 7 22 9C22 11 19 13 17 8Z" fill={fill} />
          <path d="M7 8C5 5 2 7 2 9C2 11 5 13 7 8Z" fill={fill} />
        </svg>
      )
    case "fathers":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="7" r="4" fill={fill} />
          <rect x="8" y="11" width="8" height="4" fill={fill} />
          <rect x="10" y="15" width="4" height="7" fill={fill} />
          <path d="M8 11L5 8H8" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 11L19 8H16" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "flag":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2V22" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M4 4C6 3 9 4.5 12 4.5C15 4.5 18 3 20 3V14C18 14 15 15.5 12 15.5C9 15.5 6 14 4 15" fill={fill} />
        </svg>
      )
    case "summer":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" fill={fill} />
          <path d="M12 3L12 5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M12 19L12 21" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M3 12L5 12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M19 12L21 12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M5.5 5.5L7 7" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M17 17L18.5 18.5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M5.5 18.5L7 17" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M17 7L18.5 5.5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "mlk":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" fill={fill} />
          <path d="M5 22V17L8 14H16L19 17V22" fill={fill} />
          <path d="M9 14L9 22" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="2" />
          <path d="M15 14L15 22" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="2" />
          <path d="M5 18H19" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="2" />
        </svg>
      )
    case "president":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="10" width="14" height="10" fill={fill} />
          <path d="M3 10L12 2L21 10" fill={fill} />
          <path d="M9 14H15" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="2" strokeLinecap="round" />
          <path d="M9 18H15" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "veterans":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L14 9H21L16 13L17.5 19L12 16L6.5 19L8 13L3 9H10L12 3Z" fill={fill} />
          <path d="M8 16L8 21" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M16 16L16 21" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M8 21H16" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "chinese-new-year":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="4" width="14" height="16" rx="2" fill={fill} />
          <path d="M9 2L9 6" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M15 2L15 6" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M8 10H16" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="1.5" />
          <path d="M8 14H16" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="1.5" />
          <path d="M12 8L12 18" stroke={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} strokeWidth="1.5" />
        </svg>
      )
    case "pancake":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="6" r="3" fill={fill} />
          <circle cx="12" cy="12" r="4" fill={fill} />
          <circle cx="12" cy="18" r="4" fill={fill} />
          <circle cx="8" cy="7" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <circle cx="15" cy="12" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
          <circle cx="9" cy="18" r="1" fill={fill === "#ffffff" ? "#8b6e5a" : "#ffffff"} />
        </svg>
      )
    case "celebration":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.5 9H21L14.5 13.5L17 21L12 16L7 21L9.5 13.5L3 9H10.5L12 2Z" fill={fill} />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke={fill} strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill={fill} />
          <path d="M12 6V8" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M12 16V18" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12L8 12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="M16 12L18 12" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
  }
}

// Get icon name for holiday types with more specific mapping
function getHolidayIconName(name: string): string {
  const nameLower = name.toLowerCase()
  
  // Each holiday gets a unique icon - no duplicates
  if (nameLower.includes("christmas day")) return "christmas"
  if (nameLower.includes("christmas eve")) return "christmas-eve"
  if (nameLower.includes("halloween")) return "halloween"
  if (nameLower.includes("valentine")) return "heart"
  if (nameLower.includes("easter")) return "bunny"
  if (nameLower.includes("patrick")) return "clover"
  if (nameLower.includes("independence day")) return "firework"
  if (nameLower.includes("thanksgiving")) return "turkey"
  if (nameLower.includes("new year")) return "party"
  if (nameLower.includes("lunar new year") || nameLower.includes("chinese new year") || nameLower.includes("seollal")) return "chinese-new-year"
  if (nameLower.includes("dragon boat")) return "chinese-new-year"
  if (nameLower.includes("mid-autumn") || nameLower.includes("moon festival")) return "celebration"
  if (nameLower.includes("qingming") || nameLower.includes("tomb sweeping")) return "memorial"
  if (nameLower.includes("chuseok") || nameLower.includes("harvest")) return "turkey"
  if (nameLower.includes("earth day")) return "earth"
  if (nameLower.includes("memorial day") || nameLower.includes("remembrance")) return "memorial"
  if (nameLower.includes("labor day") || nameLower.includes("labour day") || nameLower.includes("workers' day")) return "labor"
  if (nameLower.includes("mother")) return "mothers"
  if (nameLower.includes("father")) return "fathers"
  if (nameLower.includes("flag day")) return "flag"
  if (nameLower.includes("summer") || nameLower.includes("solstice") || nameLower.includes("equinox")) return "summer"
  if (nameLower.includes("veterans day") || nameLower.includes("army day")) return "veterans"
  if (nameLower.includes("president") || nameLower.includes("constitution") || nameLower.includes("foundation")) return "president"
  if (nameLower.includes("mlk") || nameLower.includes("martin luther")) return "mlk"
  if (nameLower.includes("pancake") || nameLower.includes("shrove")) return "pancake"
  if (nameLower.includes("national day") || nameLower.includes("liberation") || nameLower.includes("founding")) return "flag"
  if (nameLower.includes("children")) return "celebration"
  if (nameLower.includes("buddha")) return "celebration"
  if (nameLower.includes("indigenous") || nameLower.includes("naidoc")) return "earth"
  if (nameLower.includes("king") || nameLower.includes("queen") || nameLower.includes("emperor")) return "celebration"
  if (nameLower.includes("juneteenth")) return "celebration"
  if (nameLower.includes("women")) return "mothers"
  if (nameLower.includes("youth")) return "celebration"
  if (nameLower.includes("victoria")) return "celebration"
  if (nameLower.includes("anzac")) return "memorial"
  if (nameLower.includes("melbourne")) return "celebration"
  if (nameLower.includes("health") || nameLower.includes("sports")) return "celebration"
  if (nameLower.includes("greenery") || nameLower.includes("mountain")) return "earth"
  if (nameLower.includes("culture")) return "celebration"
  if (nameLower.includes("respect")) return "celebration"
  if (nameLower.includes("marine")) return "celebration"
  if (nameLower.includes("peace")) return "celebration"
  if (nameLower.includes("hangul")) return "celebration"
  if (nameLower.includes("coming of age")) return "celebration"
  if (nameLower.includes("retrocession")) return "flag"
  if (nameLower.includes("civic") || nameLower.includes("bank holiday")) return "celebration"
  if (nameLower.includes("cpc")) return "flag"
  
  // Default icon for any other holiday
  return "celebration"
}

// Sound context type
type SoundContextType = {
  soundEnabled: boolean;
  toggleSound: () => void;
};

// Create sound context
const SoundContext = createContext<SoundContextType>({
  soundEnabled: true,
  toggleSound: () => {},
});

// Sound provider component
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };
  
  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

// Sound toggle component
export function SoundToggle() {
  const { soundEnabled, toggleSound } = useContext(SoundContext);
  
  return (
    <button 
      onClick={toggleSound}
      className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
      title={soundEnabled ? "Mute sounds" : "Enable sounds"}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5 text-amber-800" />
      ) : (
        <VolumeX className="w-5 h-5 text-amber-800" />
      )}
    </button>
  );
}

// Create the RefreshIcon component
function RefreshIcon({ className = "" }: { className?: string }) {
  return <RefreshCw className={className} size={18} />;
}

// Add a getFlagEmoji function
function getFlagEmoji(countryCode: string): string {
  switch(countryCode.toLowerCase()) {
    case 'us':
    case 'usa':
    case 'united states':
      return '🇺🇸';
    case 'uk':
    case 'united kingdom':
      return '🇬🇧';
    case 'canada':
      return '🇨🇦';
    case 'australia':
      return '🇦🇺';
    case 'germany':
      return '🇩🇪';
    case 'france':
      return '🇫🇷';
    case 'spain':
      return '🇪🇸';
    case 'italy':
      return '🇮🇹';
    case 'japan':
      return '🇯🇵';
    case 'china':
      return '🇨🇳';
    case 'taiwan':
      return '🇹🇼';
    case 'korea':
    case 'south korea':
      return '🇰🇷';
    default:
      return '🌎'; // Global/default
  }
}

export function MobileHolidayPuzzle() {
  const { theme } = useTheme();
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedCountry, setSelectedCountry] = useState<string>("us");
  const [holidays, setHolidays] = useState<Holiday[]>(() => getHolidaysByCountry(selectedCountry, selectedYear));
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>(null);
  const [tooltipContent, setTooltipContent] = useState<Holiday | null>(null);
  const [completedAnimation, setCompletedAnimation] = useState<number | null>(null);
  const [animatingPiece, setAnimatingPiece] = useState<number | null>(null);
  const [revealedPieces, setRevealedPieces] = useState<number[]>([]);
  const [resetKey, setResetKey] = useState<number>(0);
  const { soundEnabled } = useContext(SoundContext);
  
  // Sound effects
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });
  
  useEffect(() => {
    setHolidays(getHolidaysByCountry(selectedCountry, selectedYear));
  }, [selectedYear, selectedCountry]);

  const handleTileMouseEnter = (id: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, // Handle SSR safely
      y: rect.top - 10,
    })
    setHoveredTile(id)
    
    // Add a gentle hover animation
    if (animatingPiece === null) {
      setAnimatingPiece(id)
    }
  }

  const handleTileMouseLeave = () => {
    setHoveredTile(null)
    setTooltipPosition(null)
    setAnimatingPiece(null)
  }
  
  const handleTileClick = (id: number) => {
    // Set animation for the clicked piece
    setCompletedAnimation(id)
    
    // Add a gentle ripple effect to neighboring pieces
    const clickedIndex = holidays.findIndex(h => h.id === id);
    if (clickedIndex >= 0) {
      const totalRows = Math.ceil(holidays.length / 3);
      const row = Math.floor(clickedIndex / 3);
      const col = clickedIndex % 3;
      
      // Get neighboring piece indices
      const neighbors = [];
      // Direct neighbors
      if (row > 0) neighbors.push(clickedIndex - 3); // top
      if (col < 2) neighbors.push(clickedIndex + 1); // right
      if (row < totalRows - 1) neighbors.push(clickedIndex + 3); // bottom
      if (col > 0) neighbors.push(clickedIndex - 1); // left
      
      // Animate neighbors with staggered timing
      neighbors.forEach((idx, i) => {
        if (idx >= 0 && idx < holidays.length) {
          setTimeout(() => {
            setAnimatingPiece(holidays[idx].id);
            setTimeout(() => setAnimatingPiece(null), 150);
          }, 50 + i * 30);
        }
      });
    }
    
    // Reset animation after it completes
    setTimeout(() => setCompletedAnimation(null), 600)
  }
  
  const goToPreviousYear = () => {
    setSelectedYear(prev => prev - 1)
  }
  
  const goToNextYear = () => {
    setSelectedYear(prev => prev + 1)
  }
  
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  }

  const handleReset = () => {
    setRevealedPieces([]);
    setResetKey(prev => prev + 1);
  };

  return (
    <SoundProvider>
      <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="relative overflow-visible rounded-xl shadow-lg max-w-[95vw] w-full"
          style={{ 
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.styles.borderRadius,
            boxShadow: theme.styles.boxShadow,
          }}
        >
          <div className="absolute inset-0 z-0 opacity-10">
            <BackgroundIllustration />
          </div>

          <div className="relative z-10 w-full p-3 sm:p-5">
            <div className="flex flex-col items-center justify-center mb-3">
              {/* Year Navigation with integrated country selector - mobile optimized */}
              <div 
                className="flex items-center justify-between mb-4 rounded-lg px-4 sm:px-5 py-3 shadow-sm w-full max-w-lg"
                style={{
                  backgroundColor: `${theme.colors.backgroundHighlight}90`,
                  borderWidth: '1px',
                  borderColor: theme.colors.border,
                }}
              >
                {/* Update the navigation buttons */}
                <button
                  onClick={goToPreviousYear}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-all hover-glow-violet hover-retro 
                    ${theme.id === "theme-retro" ? "rounded-none" : "rounded-full"}`}
                  style={{ 
                    backgroundColor: theme.id === "theme-retro" ? theme.colors.primary : `${theme.colors.background}80`, 
                    color: theme.id === "theme-retro" ? theme.colors.backgroundSecondary : theme.colors.foreground,
                    boxShadow: theme.id === "theme-retro" ? "2px 2px 0 rgba(12, 31, 54, 0.4)" : "none",
                    transform: "translateZ(0)"
                  }}
                >
                  <ArrowLeft size={theme.id === "theme-retro" ? 16 : 18} />
                </button>
                
                <div className="mx-1 sm:mx-2 text-center flex-1">
                  <div className="flex items-center justify-center">
                    <h1 
                      className={`text-xl font-bold flex items-center justify-center gap-2 text-important ${theme.id === "theme-retro" ? "pixel-text" : ""}`}
                      style={{ 
                        color: theme.colors.foreground,
                        fontFamily: theme.styles.fontFamily ? theme.styles.fontFamily : 'inherit',
                        textTransform: theme.id === "theme-retro" ? "uppercase" : "none"
                      }}
                    >
                      <PuzzleIcon className="w-6 h-6" />
                      <span>{theme.id === "theme-retro" ? "HOLI-DAYS " + selectedYear : selectedYear + " Holiday Puzzle"}</span>
                    </h1>
                    <div className="ml-2">
                      <CountrySelector onChange={handleCountryChange} />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center mt-1.5 sm:mt-2 gap-1.5">
                    <span 
                      className="text-xs sm:text-sm"
                      style={{ color: `${theme.colors.foregroundSecondary}70` }}
                    >
                      {holidays.filter(h => h.passed).length}/{holidays.length} collected
                    </span>
                  </div>
                </div>
                
                {/* Forward arrow */}
                <button
                  onClick={goToNextYear}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-all hover-glow-violet hover-retro
                    ${theme.id === "theme-retro" ? "rounded-none" : "rounded-full"}`}
                  style={{ 
                    backgroundColor: theme.id === "theme-retro" ? theme.colors.primary : `${theme.colors.background}80`, 
                    color: theme.id === "theme-retro" ? theme.colors.backgroundSecondary : theme.colors.foreground,
                    boxShadow: theme.id === "theme-retro" ? "2px 2px 0 rgba(12, 31, 54, 0.4)" : "none",
                    transform: "translateZ(0)"
                  }}
                >
                  <ArrowRight size={theme.id === "theme-retro" ? 16 : 18} />
                </button>
              </div>
            </div>

            {/* Puzzle board with a refined wooden texture appearance and enhanced shadows */}
            <div 
              className="relative mx-auto max-w-2xl rounded-xl p-3 sm:p-4 md:p-5 shadow-md overflow-hidden border-2"
              style={{ 
                backgroundColor: theme.colors.backgroundTertiary,
                borderColor: theme.colors.border,
                boxShadow: theme.styles.boxShadow,
                backgroundImage: theme.styles.backgroundTexture,
                backgroundSize: theme.id === "theme-retro" ? '8px 8px' : '60px 60px',
                borderRadius: theme.id === "theme-retro" ? '0' : theme.styles.borderRadius,
                border: theme.id === "theme-retro" ? `2px solid ${theme.colors.border}` : `2px solid ${theme.colors.border}`,
                imageRendering: theme.id === "theme-retro" ? 'pixelated' : 'auto'
              }}
            >
              {/* Subtle wood grain texture */}
              <div className="absolute inset-0 opacity-15" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath fill='%23a89888' fill-opacity='0.1' d='M0,0 L0,200 L200,200 L200,0 L0,0 Z M15,15 C15,15 45,25 65,55 C85,85 85,115 105,115 C125,115 135,95 165,95 C195,95 185,155 185,185 L15,185 L15,15 Z'/%3E%3C/svg%3E")`,
                  backgroundSize: '100% 100%'
                }}>
              </div>
              
              {/* Actual puzzle grid - this is a complete jigsaw puzzle with interlocking pieces */}
              <div className="relative z-10">
                <JigsawPuzzleGrid 
                  holidays={holidays}
                  onPieceClick={handleTileClick}
                  onPieceMouseEnter={handleTileMouseEnter}
                  onPieceMouseLeave={handleTileMouseLeave}
                  hoveredTile={hoveredTile}
                  animatingPiece={animatingPiece}
                  completedAnimation={completedAnimation}
                />
              </div>
              
              {/* Caption - always at the bottom */}
              <div className="text-center mt-4 mb-1">
                <p 
                  className={`text-xs font-medium text-important ${theme.id === "theme-retro" ? "pixel-text" : ""} ${theme.id === "theme-forest" ? "elegant-text" : ""} ${theme.id === "theme-sunset" ? "sunset-text" : ""} ${theme.id === "theme-snow" ? "snow-text" : ""} ${theme.id === "theme-sakura" ? "sakura-text" : ""}`}
                  style={{ color: theme.colors.foreground }}
                >
                  {theme.id === "theme-retro" ? "SELECT HOLIDAY" : "Click pieces to discover holidays"}
                </p>
              </div>
            </div>


            {/* Holiday info tooltip - minimalist and responsive */}
            {hoveredTile !== null && tooltipPosition && (
              <div
                className="fixed z-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm border left-1/2 transform -translate-x-1/2"
                style={{
                  backgroundColor: theme.id === "theme-galaxy" ? `rgba(240, 240, 255, 0.95)` : `${theme.colors.backgroundHighlight}95`,
                  borderColor: theme.id === "theme-galaxy" ? `${theme.colors.primary}40` : `${theme.colors.border}60`,
                  top: `${tooltipPosition.y - 45}px`,
                  width: "auto",
                  minWidth: "180px",
                  maxWidth: "280px",
                  transform: "translate(-50%, -8px)",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  backdropFilter: "blur(4px)",
                  boxShadow: theme.id === "theme-galaxy" ? "0 4px 16px rgba(120, 100, 255, 0.3)" : "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <div className="relative">
                  {/* Hover tooltip content (status label, date, and days info) */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 
                      className="font-medium text-sm sm:text-base"
                      style={{ 
                        color: theme.id === "theme-galaxy" ? "#151c3b" : theme.colors.foreground,
                        textShadow: "none"
                      }}
                    >
                      {holidays.find(h => h.id === hoveredTile)?.name}
                    </h3>
                    <span 
                      className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded whitespace-nowrap"
                      style={{ 
                        backgroundColor: theme.id === "theme-galaxy" ? 
                          (holidays.find(h => h.id === hoveredTile)?.passed ? "#9d93e2" : "#7d74c6") : 
                          `${theme.colors.backgroundTertiary}50`,
                        color: "#ffffff",
                        textShadow: theme.id === "theme-galaxy" ? "0 1px 1px rgba(0,0,0,0.2)" : "none"
                      }}
                    >
                      {holidays.find(h => h.id === hoveredTile)?.passed ? "passed" : "upcoming"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1.5 sm:mt-2 text-xs sm:text-sm">
                    <span style={{ 
                      color: theme.id === "theme-galaxy" ? "#252a52" : theme.colors.foregroundSecondary,
                      fontWeight: "500"
                    }}>
                      {holidays.find(h => h.id === hoveredTile)?.date}
                    </span>
                    
                    {/* Show days passed or days until */}
                    {(() => {
                      const holiday = holidays.find(h => h.id === hoveredTile)
                      if (!holiday) return null
                      
                      return holiday.passed ? (
                          <span className="flex items-center" style={{ 
                            color: theme.id === "theme-galaxy" ? "#4f5387" : `${theme.colors.foreground}80` 
                          }}>
                            <span 
                              className="inline-block w-2 h-2 rounded-full mr-1.5"
                              style={{ 
                                backgroundColor: theme.id === "theme-galaxy" ? "#9d93e2" : theme.colors.foregroundSecondary 
                              }}
                            ></span>
                            {(holiday as PastHoliday).daysPassed}d ago
                          </span>
                        ) : (
                          <span className="flex items-center" style={{ 
                            color: theme.id === "theme-galaxy" ? "#4f5387" : theme.colors.foregroundSecondary
                          }}>
                            <span 
                              className="inline-block w-2 h-2 rounded-full mr-1.5"
                              style={{ 
                                backgroundColor: theme.id === "theme-galaxy" ? "#7d74c6" : "#c4b19f" 
                              }}
                            ></span>
                            in {(holiday as UpcomingHoliday).daysUntil}d
                          </span>
                      )
                    })()}
                  </div>

                  {/* Simple arrow indicator */}
                  <div className="absolute -bottom-[8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent" 
                       style={{ 
                         borderTopColor: theme.id === "theme-galaxy" ? "rgba(240, 240, 255, 0.95)" : `${theme.colors.backgroundHighlight}95`
                       }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SoundProvider>
  )
}

// Component for the jigsaw puzzle grid
type JigsawPuzzleGridProps = {
  holidays: Holiday[];
  onPieceClick: (id: number) => void;
  onPieceMouseEnter: (id: number, event: React.MouseEvent) => void;
  onPieceMouseLeave: () => void;
  hoveredTile: number | null;
  animatingPiece: number | null;
  completedAnimation: number | null;
}

function JigsawPuzzleGrid({
  holidays,
  onPieceClick,
  onPieceMouseEnter,
  onPieceMouseLeave,
  hoveredTile,
  animatingPiece,
  completedAnimation
}: JigsawPuzzleGridProps) {
  // Calculate grid dimensions based on number of holidays and screen size
  const [gridCols, setGridCols] = useState(3);
  const [gridRows, setGridRows] = useState(Math.ceil(holidays.length / 3));
  
  // Store connector patterns in state to avoid hydration mismatch
  const [pieceConnectors, setPieceConnectors] = useState<{[key: string]: {top: string, right: string, bottom: string, left: string}}>({});
  
  // Get theme from context
  const { theme } = useTheme();
  
  // Initialize grid and connectors only on client-side
  useEffect(() => {
    function handleResize() {
      // Use 2 columns for very small screens
      const newCols = window.innerWidth < 360 ? 2 : window.innerWidth < 640 ? 3 : 3;
      setGridCols(newCols);
      setGridRows(Math.ceil(holidays.length / newCols));
      
      // Generate new connectors when grid dimensions change
      generateConnectors(newCols, Math.ceil(holidays.length / newCols));
    }
    
    // Generate connector patterns for each piece
    function generateConnectors(cols: number, rows: number) {
      const connectors: {[key: string]: {top: string, right: string, bottom: string, left: string}} = {};
      
      // Generate a pattern for the entire grid that ensures pieces interlock properly
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // For top edge: if first row -> flat, else -> match the bottom of piece above (inverted)
          const topType = row === 0 ? "flat" : 
                        (connectors[`${row-1}-${col}`]?.bottom === "tab" ? "slot" : 
                         connectors[`${row-1}-${col}`]?.bottom === "slot" ? "tab" : "flat");
          
          // For left edge: if first column -> flat, else -> match the right of piece to left (inverted)
          const leftType = col === 0 ? "flat" : 
                         (connectors[`${row}-${col-1}`]?.right === "tab" ? "slot" : 
                          connectors[`${row}-${col-1}`]?.right === "slot" ? "tab" : "flat");
          
          // For bottom and right edges, randomly select type but ensure not all edges are flat
          let bottomType, rightType;
          
          // Decide bottom type - if it's the last row, make it flat
          bottomType = row === rows - 1 ? "flat" : Math.random() > 0.5 ? "tab" : "slot";
          
          // Decide right type - if it's the last column, make it flat
          rightType = col === cols - 1 ? "flat" : Math.random() > 0.5 ? "tab" : "slot";
          
          // Store the connector pattern for this piece
          connectors[`${row}-${col}`] = {
            top: topType,
            right: rightType,
            bottom: bottomType,
            left: leftType
          };
        }
      }
      
      setPieceConnectors(connectors);
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation
    
    return () => window.removeEventListener('resize', handleResize);
  }, [holidays.length]);
  
  // Arrange holidays in the grid by date order (month/day)
  const sortedHolidays = [...holidays].sort((a, b) => {
    // Extract month and day from date string (format: "Jan 1", "Dec 25", etc.)
    const [aMonth, aDay] = a.date.split(' ');
    const [bMonth, bDay] = b.date.split(' ');
    
    // Month to number mapping
    const monthToNum: {[key: string]: number} = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };
    
    // Compare months first
    const monthDiff = (monthToNum[aMonth] || 0) - (monthToNum[bMonth] || 0);
    if (monthDiff !== 0) return monthDiff;
    
    // If same month, compare days
    return parseInt(aDay || '0') - parseInt(bDay || '0');
  });

  // Color palette for the puzzle pieces - now using theme values
  const colorPalette = {
    boardBg: theme.colors.backgroundTertiary,
    completedPiece: theme.styles.completedPiece,
    upcomingPiece: theme.styles.upcomingPiece
  };

  return (
    <div 
      className="grid relative"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        gap: '0px',
        minHeight: `${gridRows * 100}px`, // 행 높이 증가 (85px -> 100px)
        aspectRatio: gridCols / gridRows > 1 ? `${gridCols} / ${gridRows}` : undefined,
        backgroundColor: colorPalette.boardBg,
        borderRadius: '12px',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
        padding: '4px', // 패딩 증가 (3px -> 4px)
        overflow: 'visible'
      }}
    >
      {sortedHolidays.map((holiday, index) => {
        const row = Math.floor(index / gridCols);
        const col = index % gridCols;
        
        // Define jigsaw piece properties
        const isHovered = hoveredTile === holiday.id;
        const isCompleted = completedAnimation === holiday.id;
        const isPassed = holiday.passed;
        
        // Color selection based on holiday status
        const colorSet = isPassed ? colorPalette.completedPiece : colorPalette.upcomingPiece;
        
        // Get connectors for this piece position
        const connectors = pieceConnectors[`${row}-${col}`] || 
                          { top: "flat", right: "flat", bottom: "flat", left: "flat" };
        
        // Format the holiday name for display
        const displayName = getDisplayName(holiday.name);
        const formattedDisplay = formatMultilineText(displayName);
        
        return (
          <div 
            key={holiday.id} 
            className="relative"
            style={{
              gridColumn: col + 1,
              gridRow: row + 1,
              margin: "-1px", // Negative margin helps pieces connect better
              zIndex: isHovered ? 20 : isCompleted ? 30 : 10,
            }}
          >
            <div
              className={`
                absolute inset-0 cursor-pointer 
                transition-all duration-150
              `}
              onMouseEnter={(e) => onPieceMouseEnter(holiday.id, e)}
              onTouchStart={(e) => {
                // Handle touch events for mobile by converting to mouse events
                const touch = e.touches[0];
                const touchEvent = new MouseEvent('mouseenter', {
                  bubbles: true,
                  cancelable: true,
                  view: window,
                  clientX: touch.clientX,
                  clientY: touch.clientY
                });
                onPieceMouseEnter(holiday.id, touchEvent as any);
              }}
              onMouseLeave={onPieceMouseLeave}
              onTouchEnd={onPieceMouseLeave}
              onClick={() => onPieceClick(holiday.id)}
              style={{
                transform: isHovered ? 'scale(1.03) translateY(-2px)' : 
                           isCompleted ? 'scale(1.05) translateY(-3px)' : 'scale(1)',
                transition: 'all 0.2s ease-out',
                filter: isHovered ? 'brightness(1.05)' : 'none',
                boxShadow: isHovered ? '0 3px 5px rgba(0,0,0,0.15)' : 
                           isCompleted ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {/* Piece SVG with natural jigsaw connectors */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                {/* Drop shadow for lifted pieces */}
                <filter id={`piece-shadow-${holiday.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
                  <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                  <feFlood floodColor="#000000" floodOpacity="0.2" result="shadowColor" />
                  <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="shadowBlur" />
                  <feBlend in="SourceGraphic" in2="shadowBlur" mode="normal" />
                </filter>
                
                {/* Main path for the jigsaw piece */}
                <path 
                  d={generateNaturalJigsawPath(connectors)} 
                  fill={isPassed ? 
                    `url(#gradientPassed${holiday.id})` : 
                    `url(#gradientUpcoming${holiday.id})`}
                  stroke={isPassed ? colorSet.shadow : colorSet.shadow} 
                  strokeWidth="0.5"
                  filter={isHovered || isCompleted ? `url(#piece-shadow-${holiday.id})` : ''}
                />
                
                {/* Gradients for depth and dimension */}
                <defs>
                  {/* Gradient for completed pieces */}
                  <linearGradient id={`gradientPassed${holiday.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorSet.highlight} />
                    <stop offset="50%" stopColor={colorSet.primary} />
                    <stop offset="100%" stopColor={colorSet.secondary} />
                  </linearGradient>
                  
                  {/* Gradient for upcoming pieces */}
                  <linearGradient id={`gradientUpcoming${holiday.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorSet.highlight} />
                    <stop offset="60%" stopColor={colorSet.primary} />
                    <stop offset="100%" stopColor={colorSet.secondary} />
                  </linearGradient>
                </defs>
                
                {/* Light reflection on the top edge */}
                <path 
                  d={generateTopEdgeHighlight(connectors)}
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="0.6"
                  fill="none"
                  opacity={isPassed ? "0.3" : "0.5"}
                />
              </svg>
              
              {/* Content inside the puzzle piece */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-1.5 sm:p-2">
                {/* Holiday icon */}
                <div className="w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-1.5">
                  <HolidayIcon 
                    iconName={getHolidayIconName(holiday.name)} 
                    fill={isPassed ? colorPalette.completedPiece.text : colorPalette.upcomingPiece.text} 
                  />
                </div>
                
                {/* Holiday name */}
                <div className="flex flex-col items-center justify-center">
                  {formattedDisplay.map((line, i) => (
                    <span
                      key={i}
                      className={`text-[10px] sm:text-xs leading-tight font-medium text-center ${
                        isPassed ? "text-important" : "text-important"
                      } ${theme.id === "theme-galaxy" ? "puzzle-piece-text" : ""}
                      ${theme.id === "theme-retro" ? "pixel-text" : ""}
                      ${theme.id === "theme-forest" ? "elegant-text" : ""}
                      ${theme.id === "theme-sunset" ? "sunset-text" : ""}
                      ${theme.id === "theme-snow" ? "snow-text" : ""}
                      ${theme.id === "theme-sakura" ? "sakura-text" : ""}`}
                      style={{ 
                        color: isPassed ? 
                          theme.colors.foregroundHighlight || "#ffffff" : 
                          (theme.id === "theme-galaxy" || theme.id === "theme-retro") ? "#ffffff" : theme.styles.upcomingPiece.text,
                        textShadow: (theme.id === "theme-galaxy") ? "0 1px 2px rgba(0,0,0,0.4)" : 
                                   (theme.id === "theme-retro") ? "1px 1px 0 rgba(10, 26, 47, 0.6)" :
                                   (theme.id === "theme-forest") ? "0 1px 1px rgba(29, 33, 24, 0.3)" :
                                   (theme.id === "theme-sunset") ? "0 1px 1px rgba(242, 125, 116, 0.15)" :
                                   (theme.id === "theme-snow") ? "0 1px 2px rgba(83, 132, 172, 0.15)" :
                                   (theme.id === "theme-sakura") ? "0 1px 1px rgba(216, 142, 160, 0.15)" :
                                   isPassed ? "0 1px 1px rgba(0,0,0,0.1)" : "none",
                        marginBottom: i < formattedDisplay.length - 1 ? "1px" : "0"
                      }}
                    >
                      {line}
                    </span>
                  ))}
                  
                  {/* Holiday date */}
                  <span 
                    className={`text-[8px] sm:text-[10px] mt-1 sm:mt-1.5 font-medium 
                      ${theme.id === "theme-galaxy" ? "puzzle-piece-text" : ""}
                      ${theme.id === "theme-retro" ? "pixel-text" : ""}
                      ${theme.id === "theme-forest" ? "elegant-text" : ""}
                      ${theme.id === "theme-sunset" ? "sunset-text" : ""}
                      ${theme.id === "theme-snow" ? "snow-text" : ""}
                      ${theme.id === "theme-sakura" ? "sakura-text" : ""}`}
                    style={{ 
                      color: isPassed ? 
                        (theme.id === "theme-galaxy" || theme.id === "theme-retro") ? theme.colors.foregroundHighlight || "#ffffff" : theme.styles.completedPiece.text : 
                        (theme.id === "theme-galaxy" || theme.id === "theme-retro") ? "#ffffff" : theme.styles.upcomingPiece.text,
                      opacity: (theme.id === "theme-galaxy" || theme.id === "theme-retro") ? 1 : 0.9,
                      textShadow: (theme.id === "theme-galaxy") ? "0 1px 2px rgba(0,0,0,0.4)" : 
                                 (theme.id === "theme-retro") ? "1px 1px 0 rgba(10, 26, 47, 0.6)" :
                                 (theme.id === "theme-forest") ? "0 1px 1px rgba(29, 33, 24, 0.3)" :
                                 (theme.id === "theme-sunset") ? "0 1px 1px rgba(242, 125, 116, 0.15)" :
                                 (theme.id === "theme-snow") ? "0 1px 2px rgba(83, 132, 172, 0.15)" :
                                 (theme.id === "theme-sakura") ? "0 1px 1px rgba(216, 142, 160, 0.15)" : "none"
                    }}
                  >
                    {holiday.date}
                  </span>
                </div>
              </div>
              
              {/* Animation effects */}
              {isCompleted && (
                <div className="absolute inset-0 z-30 pointer-events-none">
                  <SparkleAnimation />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Generate a natural-looking jigsaw path with organic curves
function generateNaturalJigsawPath(connectors: { 
  top: string; 
  right: string; 
  bottom: string; 
  left: string; 
}) {
  const { top, right, bottom, left } = connectors;
  
  // Parameters for natural connector shapes
  const tabWidth = 25;  // Width of tab/slot
  const tabHeight = 8;   // Height of tab/slot projection
  const tabCenter = 50;  // Center position (0-100)
  const tabStart = tabCenter - tabWidth/2;
  const tabEnd = tabCenter + tabWidth/2;
  
  // Control points for Bezier curves - creates organic shapes
  const cpOffset = 8;  // Offset for control points
  const cpOffset2 = 5; // Secondary control point offset
  
  // Path string starts at top-left corner
  let path = "M 0,0 ";
  
  // TOP EDGE
  if (top === "tab") {
    // From left corner to tab start
    path += `L ${tabStart},0 `;
    // Natural tab curve with multiple control points
    path += `C ${tabStart+cpOffset2},-1 ${tabCenter-cpOffset},-${tabHeight-2} ${tabCenter},-${tabHeight} `;
    path += `C ${tabCenter+cpOffset},-${tabHeight-2} ${tabEnd-cpOffset2},-1 ${tabEnd},0 `;
    // From tab end to right corner
    path += `L 100,0 `;
  } else if (top === "slot") {
    // From left corner to slot start
    path += `L ${tabStart},0 `;
    // Natural slot curve with multiple control points
    path += `C ${tabStart+cpOffset2},1 ${tabCenter-cpOffset},${tabHeight-2} ${tabCenter},${tabHeight} `;
    path += `C ${tabCenter+cpOffset},${tabHeight-2} ${tabEnd-cpOffset2},1 ${tabEnd},0 `;
    // From slot end to right corner
    path += `L 100,0 `;
  } else {
    // Flat edge with slight organic curve
    path += `C 25,-0.5 75,0.5 100,0 `;
  }
  
  // RIGHT EDGE
  if (right === "tab") {
    // From top corner to tab start
    path += `L 100,${tabStart} `;
    // Natural tab curve with multiple control points
    path += `C 101,${tabStart+cpOffset2} ${100+tabHeight-2},${tabCenter-cpOffset} ${100+tabHeight},${tabCenter} `;
    path += `C ${100+tabHeight-2},${tabCenter+cpOffset} 101,${tabEnd-cpOffset2} 100,${tabEnd} `;
    // From tab end to bottom corner
    path += `L 100,100 `;
  } else if (right === "slot") {
    // From top corner to slot start
    path += `L 100,${tabStart} `;
    // Natural slot curve with multiple control points
    path += `C 99,${tabStart+cpOffset2} ${100-tabHeight+2},${tabCenter-cpOffset} ${100-tabHeight},${tabCenter} `;
    path += `C ${100-tabHeight+2},${tabEnd+cpOffset} 99,${tabEnd-cpOffset2} 100,${tabEnd} `;
    // From slot end to bottom corner
    path += `L 100,100 `;
  } else {
    // Flat edge with slight organic curve
    path += `C 100.5,25 99.5,75 100,100 `;
  }
  
  // BOTTOM EDGE
  if (bottom === "tab") {
    // From right corner to tab start
    path += `L ${tabEnd},100 `;
    // Natural tab curve with multiple control points
    path += `C ${tabEnd-cpOffset2},101 ${tabCenter+cpOffset},${100+tabHeight-2} ${tabCenter},${100+tabHeight} `;
    path += `C ${tabCenter-cpOffset},${100+tabHeight-2} ${tabStart+cpOffset2},101 ${tabStart},100 `;
    // From tab end to left corner
    path += `L 0,100 `;
  } else if (bottom === "slot") {
    // From right corner to slot start
    path += `L ${tabEnd},100 `;
    // Natural slot curve with multiple control points
    path += `C ${tabEnd-cpOffset2},99 ${tabCenter+cpOffset},${100-tabHeight+2} ${tabCenter},${100-tabHeight} `;
    path += `C ${tabCenter-cpOffset},${100-tabHeight+2} ${tabStart+cpOffset2},99 ${tabStart},100 `;
    // From slot end to left corner
    path += `L 0,100 `;
  } else {
    // Flat edge with slight organic curve
    path += `C 75,100.5 25,99.5 0,100 `;
  }
  
  // LEFT EDGE
  if (left === "tab") {
    // From bottom corner to tab start
    path += `L 0,${tabEnd} `;
    // Natural tab curve with multiple control points
    path += `C -1,${tabEnd-cpOffset2} -${tabHeight-2},${tabCenter+cpOffset} -${tabHeight},${tabCenter} `;
    path += `C -${tabHeight-2},${tabEnd-cpOffset} -1,${tabStart+cpOffset2} 0,${tabStart} `;
    // From tab end to top corner
    path += `L 0,0 `;
  } else if (left === "slot") {
    // From bottom corner to slot start
    path += `L 0,${tabEnd} `;
    // Natural slot curve with multiple control points
    path += `C 1,${tabEnd-cpOffset2} ${tabHeight-2},${tabCenter+cpOffset} ${tabHeight},${tabCenter} `;
    path += `C ${tabHeight-2},${tabEnd-cpOffset} 1,${tabEnd-cpOffset2} 0,${tabStart} `;
    // From slot end to top corner
    path += `L 0,0 `;
  } else {
    // Flat edge with slight organic curve
    path += `C -0.5,75 0.5,25 0,0 `;
  }
  
  return path;
}

// Path for the highlight along top edge to give 3D effect
function generateTopEdgeHighlight(connectors: { 
  top: string; 
  right: string; 
  bottom: string; 
  left: string; 
}) {
  const { top } = connectors;
  
  // Same parameters as in generateNaturalJigsawPath for consistency
  const tabWidth = 25;
  const tabHeight = 8;
  const tabCenter = 50;
  const tabStart = tabCenter - tabWidth/2;
  const tabEnd = tabCenter + tabWidth/2;
  const cpOffset = 8;
  const cpOffset2 = 5;
  
  // Just create highlight for top edge and a bit of left/right edges
  let path = "M 0,2 ";
  
  // TOP EDGE highlight
  if (top === "tab") {
    // Start with left edge hint
    path += `L 2,2 `;
    // From left to tab start
    path += `L ${tabStart+2},2 `;
    // Natural tab curve highlight with adjusted control points
    path += `C ${tabStart+cpOffset2},0 ${tabCenter-cpOffset},-${tabHeight-1} ${tabCenter},-${tabHeight-1} `;
    path += `C ${tabCenter+cpOffset},-${tabHeight-1} ${tabEnd-cpOffset2},0 ${tabEnd-2},2 `;
    // From tab end to right
    path += `L 98,2 `;
    // End with right edge hint
    path += `L 98,8`;
  } else if (top === "slot") {
    // Just draw a gentle curve along the top
    path += `C 25,1 75,1 100,2 `;
    // End with right edge hint
    path += `L 98,8`;
  } else {
    // Flat edge with very subtle curve
    path += `C 25,1 75,1 98,2 `;
    // End with right edge hint
    path += `L 98,8`;
  }
  
  return path;
}

// Format holiday name to prevent word breaking with improved algorithm
function formatMultilineText(text: string): string[] {
  // Split the text into words
  const words = text.split(' ');
  
  if (words.length === 1) {
    // Single word - no need to split
    return [text];
  }
  
  // For multi-word text, try different arrangements
  if (words.length === 2) {
    // Keep both words on one line unless they're too long
    const combinedLength = words[0].length + words[1].length;
    return combinedLength > 13 ? [words[0], words[1]] : [`${words[0]} ${words[1]}`];
  }
  
  if (words.length === 3) {
    // For three words like "New Year's Day"
    if (words[0].length + words[1].length + words[2].length < 15) {
      // All fit on one line
      return [`${words[0]} ${words[1]} ${words[2]}`];
    } else if (words[0].length + words[1].length < 10) {
      // Split after second word
      return [`${words[0]} ${words[1]}`, words[2]]; 
    } else {
      // Split after first word
      return [words[0], `${words[1]} ${words[2]}`];
    }
  }
  
  if (words.length === 4) {
    // Four words like "Martin Luther King Day"
    const totalLength = words.reduce((sum, word) => sum + word.length, 0) + 3; // +3 for spaces
    
    if (totalLength < 15) {
      // All fit on one line
      return [`${words[0]} ${words[1]} ${words[2]} ${words[3]}`];
    } else if (words[0].length + words[1].length < 10) {
      // Split into two lines of two words each
      return [`${words[0]} ${words[1]}`, `${words[2]} ${words[3]}`];
    } else {
      // Split into three lines with optimal grouping
      return [words[0], `${words[1]} ${words[2]}`, words[3]];
    }
  }
  
  // For longer text, split intelligently with a higher character limit per line
  const result: string[] = [];
  let currentLine = '';
  const maxLineLength = 15; // Increased from 12
  
  for (const word of words) {
    const potentialLine = currentLine ? `${currentLine} ${word}` : word;
    
    if (potentialLine.length > maxLineLength) {
      if (currentLine) {
        result.push(currentLine);
        currentLine = word;
      } else {
        // If a single word is too long
        result.push(word);
      }
    } else {
      currentLine = potentialLine;
    }
  }
  
  if (currentLine) {
    result.push(currentLine);
  }
  
  return result;
}

// Helper function to format the display name
function getDisplayName(name: string): string {
  // Special case abbreviations for known long holiday names
  if (name.includes("National Day for Truth and Reconciliation")) {
    return "Truth & Reconciliation";
  }
  
  if (name.includes("Martin Luther King Jr.")) {
    return "MLK Jr. Day";
  }
  
  if (name.includes("Independence Day")) {
    return "Independence Day";
  }
  
  if (name.includes("Presidents'")) {
    return "Presidents' Day";
  }
  
  if (name.includes("Memorial Day")) {
    return "Memorial Day";
  }
  
  if (name.includes("Labor Thanksgiving")) {
    return "Labor Thanks Day";
  }
  
  return name;
}

