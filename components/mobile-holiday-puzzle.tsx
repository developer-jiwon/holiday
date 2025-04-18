"use client"

import { useState, useRef, useEffect } from "react"
import { BackgroundIllustration } from "./background-illustration"
import { getHolidaysForYear, getHolidaysByCountry, type Holiday, type UpcomingHoliday, type PastHoliday } from "../lib/date-utils"
import { Gift, Sparkles, PartyPopper, Cake, RefreshCw, Volume2, VolumeX } from "lucide-react"
import { HolidayPuzzleBoard } from "./holiday-puzzle-board"

type TooltipPosition = { x: number; y: number } | null

// Countries available for selection
const COUNTRIES = [
  { id: 'global', name: 'Global', flag: '🌎' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦' },
  { id: 'us', name: 'United States', flag: '🇺🇸' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵' },
]

// Create the SparkleIcon component
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill="#8b6e5a" />
    </svg>
  );
}

// Create the puzzle icon component for the title
function PuzzleIcon({className = ""}) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7h3a1 1 0 0 0 1-1V5a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1a2 2 0 0 0-4 0v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a2 2 0 0 0 0-4H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" 
        fill="#8b6e5a" />
    </svg>
  );
}

// Create a component for sparkle animation
function SparkleAnimation() {
  return (
    <>
      <div className="absolute top-0 left-1/4 animate-ping">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill="#ffffff" />
        </svg>
      </div>
      <div className="absolute top-1/4 right-0 animate-ping" style={{ animationDelay: "0.2s" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill="#ffffff" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-1/4 animate-ping" style={{ animationDelay: "0.4s" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill="#ffffff" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-0 animate-ping" style={{ animationDelay: "0.6s" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill="#ffffff" />
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
  if (nameLower.includes("new year's day")) return "party"
  if (nameLower.includes("earth day")) return "earth"
  if (nameLower.includes("memorial day")) return "memorial"
  if (nameLower.includes("labor day")) return "labor"
  if (nameLower.includes("mother")) return "mothers"
  if (nameLower.includes("father")) return "fathers"
  if (nameLower.includes("flag day")) return "flag"
  if (nameLower.includes("summer") || nameLower.includes("solstice")) return "summer"
  if (nameLower.includes("veterans day")) return "veterans"
  if (nameLower.includes("president")) return "president"
  if (nameLower.includes("mlk") || nameLower.includes("martin luther")) return "mlk"
  if (nameLower.includes("chinese new year")) return "chinese-new-year"
  if (nameLower.includes("pancake") || nameLower.includes("shrove")) return "pancake"
  
  // Default icon for any other holiday
  return "celebration"
}

export function MobileHolidayPuzzle() {
  const [currentYear, setCurrentYear] = useState<number>(2025)
  const [hoveredTile, setHoveredTile] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>('global')
  const [animatingPiece, setAnimatingPiece] = useState<number | null>(null)
  const [completedAnimation, setCompletedAnimation] = useState<number | null>(null)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  
  // Get holidays for the current year and selected country
  const holidays = selectedCountry === 'global' 
    ? getHolidaysForYear(currentYear)
    : getHolidaysByCountry(selectedCountry, currentYear)

  const handleTileMouseEnter = (id: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
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
    // Play sound effect if enabled
    if (soundEnabled) {
      // Sound would be implemented here
    }
    
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
    setCurrentYear(prev => prev - 1)
  }
  
  const goToNextYear = () => {
    setCurrentYear(prev => prev + 1)
  }
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
  }

  // Reset puzzle to initial state
  const resetPuzzle = () => {
    setHoveredTile(null);
    setTooltipPosition(null);
    setAnimatingPiece(null);
    setCompletedAnimation(null);
    
    if (soundEnabled) {
      // Reset sound would be played here
    }
    
    // Trigger a subtle animation on all pieces
    const totalPieces = holidays.length;
    for (let i = 0; i < totalPieces; i++) {
      setTimeout(() => {
        setAnimatingPiece(holidays[i].id);
        setTimeout(() => setAnimatingPiece(null), 150);
      }, i * 50);
    }
  }

  // Toggle sound on/off
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#f7efdf] shadow-lg">
      <div className="absolute inset-0 z-0 opacity-10">
        <BackgroundIllustration />
      </div>

      <div className="relative z-10 h-full w-full p-4">
        <div className="flex flex-col items-center justify-center mb-5">
          {/* Year Navigation */}
          <div className="flex items-center justify-center mb-4 bg-white/90 rounded-lg px-4 py-2 shadow-sm border border-[#d7c4ad]">
            <button 
              onClick={goToPreviousYear}
              className="text-[#8b6e5a] hover:text-[#6f5848] transition-colors p-1 text-lg"
              aria-label="Previous Year"
            >
              ←
            </button>
            
            <div className="mx-4 text-center">
              <h1 className="text-base font-semibold text-[#8b6e5a] flex items-center justify-center">
                <PuzzleIcon className="w-5 h-5 mr-1.5" />
                {currentYear} Holiday Puzzle
              </h1>
              <p className="text-xs text-[#8b6e5a]/70 mt-1">
                {holidays.filter(h => h.passed).length}/{holidays.length} holidays collected
              </p>
            </div>
            
            <button 
              onClick={goToNextYear}
              className="text-[#8b6e5a] hover:text-[#6f5848] transition-colors p-1 text-lg"
              aria-label="Next Year"
            >
              →
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3 mb-4 w-full justify-center">
            <select 
              id="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="px-2 py-1 rounded-md border border-[#d7c4ad] bg-white text-[#8b6e5a] text-sm shadow-sm"
            >
              {COUNTRIES.map(country => (
                <option key={country.id} value={country.id}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
            
            <div className="flex gap-2">
              <button
                onClick={toggleSound}
                className={`
                  flex items-center justify-center p-1.5 rounded-md shadow-sm
                  transition-all duration-200 
                  ${soundEnabled 
                    ? 'bg-[#8b6e5a] text-white hover:bg-[#7d624f]' 
                    : 'bg-white border border-[#d7c4ad] text-[#8b6e5a] hover:bg-[#f8f3ec]'
                  }
                `}
                aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
                title={soundEnabled ? "Mute sound" : "Enable sound"}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              
              <button
                onClick={resetPuzzle}
                className="flex items-center justify-center gap-1 p-1.5 rounded-md bg-white border border-[#d7c4ad] text-[#8b6e5a] shadow-sm hover:bg-[#f8f3ec] transition-colors"
                aria-label="Reset puzzle"
                title="Reset the puzzle"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Puzzle board with a real wooden texture appearance */}
        <div className="relative mx-auto max-w-xl rounded-lg bg-[#e2cfb4] p-5 shadow-md overflow-hidden border-2 border-[#c4b092]">
          {/* Realistic wood grain texture */}
          <div className="absolute inset-0 opacity-25" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath fill='%238b6e5a' fill-opacity='0.15' d='M0,0 L0,200 L200,200 L200,0 L0,0 Z M15,15 C15,15 45,25 65,55 C85,85 85,115 105,115 C125,115 135,95 165,95 C195,95 185,155 185,185 L15,185 L15,15 Z'/%3E%3C/svg%3E")`,
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
          
          {/* Caption */}
          <div className="mt-4 text-center">
            <p className="text-xs text-[#8b6e5a]/80 font-medium">Click pieces to discover holidays</p>
          </div>
        </div>

        {/* Holiday info tooltip */}
        {hoveredTile !== null && tooltipPosition && (
          <div
            className="fixed z-50 bg-white/95 px-3 py-2 rounded-md shadow-lg border border-[#c4b092]"
            style={{
              left: `${tooltipPosition.x - 100}px`,
              top: `${tooltipPosition.y - 50}px`,
              width: "200px",
              transform: "translateY(-8px)",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              backdropFilter: "blur(2px)"
            }}
          >
            <div className="relative">
              <h3 className="font-bold text-[#8b6e5a] border-b border-[#d7c4ad]/50 pb-1 mb-1">
                {holidays.find(h => h.id === hoveredTile)?.name}
              </h3>
              <p className="text-sm text-[#a38b7b] flex justify-between">
                <span>{holidays.find(h => h.id === hoveredTile)?.date}</span>
                <span className="text-[10px] bg-[#f1e8dc] px-1.5 py-0.5 rounded-full text-[#8b6e5a] inline-flex items-center">
                  {holidays.find(h => h.id === hoveredTile)?.passed ? "completed" : "upcoming"}
                </span>
              </p>
              
              {/* Show days passed or days until */}
              {(() => {
                const holiday = holidays.find(h => h.id === hoveredTile)
                if (!holiday) return null
                
                return holiday.passed ? (
                  <p className="text-xs text-[#8b6e5a] mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#8b6e5a] mr-1"></span>
                    <span>{(holiday as PastHoliday).daysPassed} days ago</span>
                  </p>
                ) : (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-1"></span>
                    <span>In {(holiday as UpcomingHoliday).daysUntil} days</span>
                  </p>
                )
              })()}

              {/* Arrow at the bottom */}
              <div className="absolute -bottom-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-transparent border-t-white/95"></div>
            </div>
          </div>
        )}
      </div>
    </div>
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
  // Standard holiday order based on position in calendar year
  const standardHolidayOrder = [
    "new year's day",      // 0,0
    "valentine's day",     // 0,1
    "st. patrick's day",   // 0,2
    "earth day",           // 1,0
    "labor day",           // 1,1
    "memorial day",        // 1,2
    "independence day",    // 2,0
    "halloween",           // 2,1
    "veterans day",        // 2,2
    "thanksgiving",        // 3,0
    "christmas eve",       // 3,1
    "christmas day",       // 3,2
    "new year's eve"       // 4,0
  ];

  // Calculate dimensions
  const COLS = 3;
  // Dynamically calculate rows needed for all pieces plus the New Year's Eve in the bottom
  const needsExtraRow = standardHolidayOrder.some(h => h.includes("new year's eve"));
  const minRows = needsExtraRow ? 5 : 4; // Minimum 4 rows, or 5 if New Year's Eve is present
  
  // Make sure we include essential holidays that might be missing from the API
  const ensureAllHolidays = () => {
    if (holidays.length === 0) return [];
    
    // Get existing holiday names
    const existingHolidayNames = holidays.map(h => h.name.toLowerCase());
    const missingHolidays: Holiday[] = [];
    
    // Check for essential holidays
    const essentialHolidays = [
      { name: "New Year's Day", date: "Jan 1", month: 1, day: 1 },
      { name: "Valentine's Day", date: "Feb 14", month: 2, day: 14 },
      { name: "St. Patrick's Day", date: "Mar 17", month: 3, day: 17 },
      { name: "Earth Day", date: "Apr 22", month: 4, day: 22 },
      { name: "Memorial Day", date: "May 26", month: 5, day: 26 },
      { name: "Labor Day", date: "May 1", month: 5, day: 1 },
      { name: "Independence Day", date: "Jul 4", month: 7, day: 4 },
      { name: "Halloween", date: "Oct 31", month: 10, day: 31 },
      { name: "Veterans Day", date: "Nov 11", month: 11, day: 11 },
      { name: "Thanksgiving", date: "Nov 27", month: 11, day: 27 },
      { name: "Christmas Eve", date: "Dec 24", month: 12, day: 24 },
      { name: "Christmas Day", date: "Dec 25", month: 12, day: 25 },
      { name: "New Year's Eve", date: "Dec 31", month: 12, day: 31 }
    ];

    for (let i = 0; i < essentialHolidays.length; i++) {
      const holiday = essentialHolidays[i];
      
      // Check if this essential holiday exists in any form
      const exists = existingHolidayNames.some(name => 
        name.includes(holiday.name.toLowerCase()) ||
        // Special cases for different naming patterns
        (holiday.name === "Independence Day" && name.includes("independence")) ||
        (holiday.name === "Halloween" && name.includes("halloween")) ||
        (holiday.name === "Veterans Day" && name.includes("veterans")) ||
        (holiday.name === "Thanksgiving" && name.includes("thanksgiving")) ||
        (holiday.name === "Christmas Eve" && name.includes("christmas eve")) ||
        (holiday.name === "Christmas Day" && name.includes("christmas") && !name.includes("eve")) ||
        (holiday.name === "New Year's Eve" && name.includes("new year") && name.includes("eve")) ||
        (holiday.name === "New Year's Day" && name.includes("new year") && !name.includes("eve"))
      );
      
      if (!exists) {
        const baseId = Math.max(...holidays.map(h => h.id), 0) + 1;
        const now = new Date();
        const holidayDate = new Date(now.getFullYear(), holiday.month - 1, holiday.day);
        const isPassed = now > holidayDate;
        
        // Create a PastHoliday or UpcomingHoliday based on the current date
        if (isPassed) {
          // Calculate days passed
          const daysPassed = Math.floor((now.getTime() - holidayDate.getTime()) / (1000 * 60 * 60 * 24));
          missingHolidays.push({
            id: baseId + missingHolidays.length,
            name: holiday.name,
            date: holiday.date,
            passed: true,
            daysPassed
          } as PastHoliday);
        } else {
          // Calculate days until
          const daysUntil = Math.floor((holidayDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          missingHolidays.push({
            id: baseId + missingHolidays.length,
            name: holiday.name,
            date: holiday.date,
            passed: false,
            daysUntil
          } as UpcomingHoliday);
        }
      }
    }
    
    // Create a combined array with all holidays
    return [...holidays, ...missingHolidays];
  };
  
  const allHolidays = ensureAllHolidays();
  const totalPieces = allHolidays.length;
  const ROWS = Math.max(Math.ceil(totalPieces / COLS), minRows);
  
  // Pre-compute edge types for the entire grid based on the exact image
  const edgeTypes: {[key: string]: {top: string, right: string, bottom: string, left: string}} = {};
  
  // First row (0-based indexing) - brown pieces
  edgeTypes["0-0"] = { top: "flat", right: "tab", bottom: "tab", left: "flat" };
  edgeTypes["0-1"] = { top: "flat", right: "tab", bottom: "slot", left: "slot" }; 
  edgeTypes["0-2"] = { top: "flat", right: "flat", bottom: "tab", left: "slot" };
  
  // Second row
  edgeTypes["1-0"] = { top: "slot", right: "slot", bottom: "flat", left: "flat" };
  edgeTypes["1-1"] = { top: "tab", right: "slot", bottom: "slot", left: "tab" };
  edgeTypes["1-2"] = { top: "slot", right: "flat", bottom: "slot", left: "tab" };
  
  // Third row 
  edgeTypes["2-0"] = { top: "flat", right: "tab", bottom: "tab", left: "flat" };
  edgeTypes["2-1"] = { top: "tab", right: "tab", bottom: "slot", left: "slot" };
  edgeTypes["2-2"] = { top: "tab", right: "flat", bottom: "tab", left: "slot" };
  
  // Fourth row - Thanksgiving, Christmas Eve, Christmas Day
  edgeTypes["3-0"] = { top: "slot", right: "slot", bottom: "flat", left: "flat" };
  edgeTypes["3-1"] = { top: "tab", right: "tab", bottom: "flat", left: "slot" };
  edgeTypes["3-2"] = { top: "slot", right: "flat", bottom: "flat", left: "slot" };
  
  // Fifth row for New Year's Eve (if applicable)
  edgeTypes["4-0"] = { top: "slot", right: "flat", bottom: "flat", left: "flat" };
  
  // Generate edge types for additional rows if needed
  for (let row = 5; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const topType = row === 0 ? "flat" : (row % 2 === 0 ? "tab" : "slot");
      const rightType = col === COLS - 1 ? "flat" : (col % 2 === 0 ? "tab" : "slot");
      const bottomType = row === ROWS - 1 ? "flat" : (row % 2 === 0 ? "slot" : "tab");
      const leftType = col === 0 ? "flat" : (col % 2 === 0 ? "slot" : "tab");
      
      edgeTypes[`${row}-${col}`] = {
        top: topType,
        right: rightType,
        bottom: bottomType,
        left: leftType
      };
    }
  }
  
  // Get color for specific pieces - first row is brown, others are light cream
  const getPieceColor = (row: number, isPassed: boolean) => {
    if (row === 0) {
      // Top row is brown regardless of passed state
      return "#a38b7b";
    }
    // Other rows depend on passed state
    return isPassed ? "#a38b7b" : "#f7efdf";
  };
  
  // Get text color for pieces
  const getTextColor = (row: number, isPassed: boolean) => {
    if (row === 0) {
      // Text is white in the brown top row
      return "text-white";
    }
    // For other rows
    return isPassed ? "text-white" : "text-[#7d5f4d]";
  };
  
  // Create the puzzle pieces to display
  const pieces: Array<{holiday: Holiday, position: {row: number, col: number}}> = [];
  
  // First, map standard holidays to their fixed positions
  for (let i = 0; i < standardHolidayOrder.length; i++) {
    const searchTerm = standardHolidayOrder[i];
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    
    // Skip positions that are supposed to be empty
    if (row === 4 && col > 0) continue;
    
    // Find matching holiday from standard list
    const matchingHoliday = allHolidays.find(h => 
      h.name.toLowerCase().includes(searchTerm));
    
    if (matchingHoliday) {
      pieces.push({
        holiday: matchingHoliday,
        position: {row, col}
      });
      
      // Remove this holiday from the pool so it's not used again
      const index = allHolidays.findIndex(h => h.id === matchingHoliday.id);
      if (index !== -1) {
        allHolidays.splice(index, 1);
      }
    }
  }
  
  // Add any remaining holidays to additional rows
  if (allHolidays.length > 0) {
    let currentRow = 5; // Start after fixed rows
    let currentCol = 0;
    
    for (const holiday of allHolidays) {
      pieces.push({
        holiday,
        position: {row: currentRow, col: currentCol}
      });
      
      // Move to next position
      currentCol++;
      if (currentCol >= COLS) {
        currentCol = 0;
        currentRow++;
      }
    }
  }
  
  return (
    <div 
      className="grid relative border border-[#c4b092]/30 rounded-lg shadow-inner"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        aspectRatio: `${COLS}/${ROWS}`,
        backgroundSize: '50px 50px',
        backgroundColor: '#e9dcc7',
        backgroundImage: 'linear-gradient(rgba(139, 110, 90, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 110, 90, 0.05) 1px, transparent 1px)'
      }}
    >
      {pieces.map(({holiday, position}) => {
        const {row, col} = position;
        
        // Define jigsaw piece properties
        const isHovered = hoveredTile === holiday.id || animatingPiece === holiday.id;
        const isCompleted = completedAnimation === holiday.id;
        const isPassed = 'passed' in holiday ? holiday.passed : false;
        
        // Format the holiday name for display
        const displayName = getDisplayName(holiday.name);
        const formattedDisplay = formatMultilineText(displayName);
        
        // Get the pre-computed connector types for this piece
        const connectors = edgeTypes[`${row}-${col}`] || { top: "flat", right: "flat", bottom: "flat", left: "flat" };
        
        // Get the piece color based on row and state
        const pieceColor = getPieceColor(row, isPassed);
        const pieceTextColorClass = getTextColor(row, isPassed);
        const pieceStrokeColor = row === 0 ? "#8b6e5a" : (isPassed ? "#8b6e5a" : "#c4b092");
        
        return (
          <div 
            key={holiday.id} 
            className="relative"
            style={{
              gridColumn: col + 1,
              gridRow: row + 1,
              margin: "-1px", // Fix for connecting pieces
              zIndex: isHovered ? 20 : isCompleted ? 30 : 10,
            }}
          >
            <div
              className={`
                absolute inset-0 aspect-square cursor-pointer 
                transition-all duration-150 ${isHovered ? 'scale-[1.01]' : ''} 
                ${isCompleted ? 'scale-[1.03]' : ''}
              `}
              onMouseEnter={(e) => onPieceMouseEnter(holiday.id, e)}
              onMouseLeave={onPieceMouseLeave}
              onClick={() => onPieceClick(holiday.id)}
              style={{
                transform: isHovered ? 'scale(1.01)' : isCompleted ? 'scale(1.03)' : 'scale(1)',
                filter: isHovered ? 'brightness(1.05)' : 'none',
                transition: 'transform 0.15s ease-out, filter 0.15s ease-out',
              }}
            >
              {/* Puzzle piece SVG */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <path 
                  d={generateJigsawPath(connectors as any)} 
                  fill={pieceColor}
                  stroke={pieceStrokeColor} 
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                  filter={isPassed && row !== 0 ? "" : "drop-shadow(0px 1px 1px rgba(0,0,0,0.05))"}
                />
                
                {/* Edge highlights for 3D effect - only for certain pieces */}
                {(row !== 0 || isPassed) && (
                  <path 
                    d={generateJigsawPath(connectors as any)} 
                    fill="none"
                    stroke="rgba(255,255,255,0.3)" 
                    strokeWidth="0.4"
                    strokeLinejoin="round"
                    strokeDasharray="5 8"
                    opacity="0.5"
                  />
                )}
              </svg>
              
              {/* Content inside the puzzle piece */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-10">
                {/* Holiday icon */}
                <div className={`w-5 h-5 mb-1 opacity-90 ${row !== 0 && !isPassed ? "drop-shadow-sm" : ""}`}>
                  <HolidayIcon 
                    iconName={getHolidayIconName(holiday.name)} 
                    fill={row === 0 || isPassed ? "#ffffff" : "#8b6e5a"} 
                  />
                </div>
                
                {/* Holiday name and date */}
                <div className="flex flex-col items-center justify-center">
                  {formattedDisplay.map((line: string, i: number) => (
                    <span
                      key={i}
                      className={`text-xs sm:text-sm ${pieceTextColorClass} leading-tight ${
                        i < formattedDisplay.length - 1 ? "mb-0.5" : ""
                      } font-medium text-center`}
                    >
                      {line}
                    </span>
                  ))}
                  <span className={`text-xs mt-1 ${row === 0 ? "text-white/80" : (isPassed ? "text-white/80" : "text-[#a38b7b]")} font-medium`}>
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

// Update jigsaw piece path generation to match the image exactly
function generateJigsawPath(connectors: { 
  top: "flat" | "tab" | "slot"; 
  right: "flat" | "tab" | "slot"; 
  bottom: "flat" | "tab" | "slot"; 
  left: "flat" | "tab" | "slot"; 
}) {
  const { top, right, bottom, left } = connectors;
  
  // Base parameters for the connector - more subtle than before
  const tabWidth = 26; // Even more reduced to match image
  const tabHeight = 10; // More subtle to match image
  const tabCenter = 50; // Center position of tab/slot
  const tabStart = tabCenter - tabWidth/2;
  const tabEnd = tabCenter + tabWidth/2;
  
  // Start path at top-left corner
  let path = "M 0,0 ";
  
  // TOP EDGE
  if (top === "tab") {
    // Start to tab start
    path += `L ${tabStart},0 `;
    // Tab curve out - more subtle curve to match image
    path += `Q ${tabCenter},-${tabHeight} ${tabEnd},0 `;
    // Tab end to end
    path += `L 100,0 `;
  } else if (top === "slot") {
    // Start to slot start
    path += `L ${tabStart},0 `;
    // Slot curve in - more subtle curve to match image
    path += `Q ${tabCenter},${tabHeight} ${tabEnd},0 `;
    // Slot end to end
    path += `L 100,0 `;
  } else {
    path += "L 100,0 ";
  }
  
  // RIGHT EDGE
  if (right === "tab") {
    // Top to tab start
    path += `L 100,${tabStart} `;
    // Tab curve out - more subtle curve to match image
    path += `Q ${100+tabHeight},${tabCenter} 100,${tabEnd} `;
    // Tab end to bottom
    path += `L 100,100 `;
  } else if (right === "slot") {
    // Top to slot start
    path += `L 100,${tabStart} `;
    // Slot curve in - more subtle curve to match image
    path += `Q ${100-tabHeight},${tabCenter} 100,${tabEnd} `;
    // Slot end to bottom
    path += `L 100,100 `;
  } else {
    path += "L 100,100 ";
  }
  
  // BOTTOM EDGE
  if (bottom === "tab") {
    // Right to tab start
    path += `L ${tabEnd},100 `;
    // Tab curve out - more subtle curve to match image
    path += `Q ${tabCenter},${100+tabHeight} ${tabStart},100 `;
    // Tab end to left
    path += `L 0,100 `;
  } else if (bottom === "slot") {
    // Right to slot start
    path += `L ${tabEnd},100 `;
    // Slot curve in - more subtle curve to match image
    path += `Q ${tabCenter},${100-tabHeight} ${tabStart},100 `;
    // Slot end to left
    path += `L 0,100 `;
  } else {
    path += "L 0,100 ";
  }
  
  // LEFT EDGE
  if (left === "tab") {
    // Bottom to tab start
    path += `L 0,${tabEnd} `;
    // Tab curve out - more subtle curve to match image
    path += `Q -${tabHeight},${tabCenter} 0,${tabStart} `;
    // Tab end to top
    path += `L 0,0 `;
  } else if (left === "slot") {
    // Bottom to slot start
    path += `L 0,${tabEnd} `;
    // Slot curve in - more subtle curve to match image
    path += `Q ${tabHeight},${tabCenter} 0,${tabStart} `;
    // Slot end to top
    path += `L 0,0 `;
  } else {
    path += "L 0,0 ";
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

