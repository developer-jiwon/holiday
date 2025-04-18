"use client"

import { useState, useRef, useEffect, createContext, useContext } from "react"
import { BackgroundIllustration } from "./background-illustration"
import { getHolidaysForYear, getHolidaysByCountry, type Holiday, type UpcomingHoliday, type PastHoliday } from "../lib/date-utils"
import { Gift, Sparkles, PartyPopper, Cake, ArrowLeft, ArrowRight } from "lucide-react"
import { HolidayPuzzleBoard } from "./holiday-puzzle-board"
import { useTheme } from "@/hooks/use-theme"
import { CountrySelector } from "./country-selector"
import { cn } from "@/lib/utils"

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

// Create a component for sparkle animation (default lofi-beige theme)
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

// Galaxy Theme Animation - Stars and planets
function GalaxyAnimation() {
  return (
    <>
      {/* Center starburst */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-white opacity-0 animate-[ping_0.8s_ease-out_forwards]"></div>
      </div>
      
      {/* Orbiting stars */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-3 h-3 opacity-0 animate-[fadeInOut_1.5s_ease_forwards]" 
          style={{
            top: '10%', 
            left: '20%',
            animationDelay: '0.1s',
            transform: 'translateZ(0)'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13 5L16 6L13 7L12 10L11 7L8 6L11 5L12 2Z" fill="#FFFFFF" />
          </svg>
        </div>
        
        <div 
          className="absolute w-2 h-2 opacity-0 animate-[fadeInOut_1.8s_ease_forwards]" 
          style={{
            top: '70%', 
            left: '80%',
            animationDelay: '0.2s',
            transform: 'translateZ(0)'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13 5L16 6L13 7L12 10L11 7L8 6L11 5L12 2Z" fill="#9C94E4" />
          </svg>
        </div>
        
        <div 
          className="absolute w-4 h-4 opacity-0 animate-[fadeInOut_1.2s_ease_forwards]" 
          style={{
            top: '50%', 
            left: '75%',
            animationDelay: '0.3s',
            transform: 'translateZ(0)'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="7" fill="#A78BFA" />
            <circle cx="12" cy="12" r="3" fill="#C4B5FD" />
          </svg>
        </div>
        
        {/* Shooting star */}
        <div 
          className="absolute w-10 h-1 bg-white opacity-0"
          style={{
            top: '30%',
            left: '-20%',
            transform: 'rotate(-30deg) translateZ(0)',
            animation: 'shootingStar 0.8s ease-out forwards',
            animationDelay: '0.4s',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
          }}
        ></div>
      </div>
    </>
  );
}

// Retro Theme Animation - Pixelated effects
function RetroAnimation() {
  return (
    <>
      {/* Pixelated blocks */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-1 w-3/4 h-3/4">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className="opacity-0 bg-white"
              style={{
                animation: 'fadeInOut 0.8s ease-out forwards',
                animationDelay: `${i * 0.05}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Level up text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 animate-[fadeInOut_1s_ease-in-out_forwards]">
        <span className="text-xs font-pixel tracking-wider text-white" style={{ textShadow: '1px 1px 0 #000' }}>
          + 1
        </span>
      </div>
    </>
  );
}

// Snow Theme Animation - Snowflakes
function SnowAnimation() {
  return (
    <>
      {/* Frost effect */}
      <div 
        className="absolute inset-0 opacity-0 rounded-md"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(235,244,255,0.3) 40%, transparent 70%)',
          animation: 'fadeInOut 1s ease-in-out forwards'
        }}
      ></div>
      
      {/* Snowflakes */}
      {[...Array(8)].map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 12 + 6;
        const delay = Math.random() * 0.5;
        
        return (
          <div 
            key={i}
            className="absolute opacity-0"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animation: `snowfall 1.5s ease-in-out forwards`,
              animationDelay: `${delay}s`
            }}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13 6L17 7L13 8L12 12L11 8L7 7L11 6L12 2Z" fill="rgba(255,255,255,0.9)" />
              <path d="M12 12L13 16L17 17L13 18L12 22L11 18L7 17L11 16L12 12Z" fill="rgba(255,255,255,0.9)" />
              <path d="M2 12L6 13L7 17L8 13L12 12L8 11L7 7L6 11L2 12Z" fill="rgba(255,255,255,0.9)" />
              <path d="M22 12L18 13L17 17L16 13L12 12L16 11L17 7L18 11L22 12Z" fill="rgba(255,255,255,0.9)" />
            </svg>
          </div>
        );
      })}
    </>
  );
}

// Sakura Theme Animation - Cherry blossoms
function SakuraAnimation() {
  return (
    <>
      {/* Pink glow */}
      <div 
        className="absolute inset-0 opacity-0 rounded-md"
        style={{
          background: 'radial-gradient(circle, rgba(252,231,243,0.8) 0%, rgba(249,168,212,0.3) 40%, transparent 70%)',
          animation: 'fadeInOut 1s ease-in-out forwards'
        }}
      ></div>
      
      {/* Cherry blossom petals */}
      {[...Array(8)].map((_, i) => {
        const top = Math.random() * 80 + 20;
        const left = Math.random() * 80 + 10;
        const size = Math.random() * 8 + 4;
        const delay = Math.random() * 0.5;
        const duration = Math.random() * 1 + 1.5;
        
        return (
          <div 
            key={i}
            className="absolute opacity-0"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animation: `floatingPetal ${duration}s ease-in-out forwards`,
              animationDelay: `${delay}s`
            }}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C14 4 16 6 16 8C16 10 14 12 12 12C10 12 8 10 8 8C8 6 10 4 12 4Z" fill="#FBCFE8" />
              <path d="M16 8C18 8 20 10 20 12C20 14 18 16 16 16C14 16 12 14 12 12C12 10 14 8 16 8Z" fill="#FBCFE8" />
              <path d="M12 12C14 12 16 14 16 16C16 18 14 20 12 20C10 20 8 18 8 16C8 14 10 12 12 12Z" fill="#FBCFE8" />
              <path d="M8 8C10 8 12 10 12 12C12 14 10 16 8 16C6 16 4 14 4 12C4 10 6 8 8 8Z" fill="#FBCFE8" />
              <circle cx="12" cy="12" r="2" fill="#F9A8D4" />
            </svg>
          </div>
        );
      })}
    </>
  );
}

// Function to get the appropriate animation component based on theme
function ThemeAnimation({ themeId }: { themeId: string }) {
  switch(themeId) {
    case 'theme-galaxy':
      return <GalaxyAnimation />;
    case 'theme-retro':
      return <RetroAnimation />;
    case 'theme-snow':
      return <SnowAnimation />;
    case 'theme-sakura':
      return <SakuraAnimation />;
    default: // lofi-beige
      return <SparkleAnimation />;
  }
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
  
  useEffect(() => {
    setHolidays(getHolidaysByCountry(selectedCountry, selectedYear));
  }, [selectedYear, selectedCountry]);

  const handleTileMouseEnter = (id: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, // Position in center horizontally
      y: rect.top - 35, // Position above the puzzle piece with more space
    })
    setHoveredTile(id)
    
    // Set tooltip content with the hovered holiday data
    const hoveredHoliday = holidays.find(h => h.id === id);
    if (hoveredHoliday) {
      setTooltipContent(hoveredHoliday);
    }
    
    // Add a gentle hover animation
    if (animatingPiece === null) {
      setAnimatingPiece(id)
    }
  }

  const handleTileMouseLeave = () => {
    setHoveredTile(null)
    setTooltipPosition(null)
    setAnimatingPiece(null)
    setTooltipContent(null)
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

  // Add mouse tracking for ambient light effect
  useEffect(() => {
    if (theme.id === 'lofi-beige') {
      const handleMouseMove = (e: MouseEvent) => {
        const pieces = document.querySelectorAll('.puzzle-piece');
        pieces.forEach((piece) => {
          const htmlElement = piece as HTMLElement;
          const rect = htmlElement.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Set the custom properties for all pieces
          // This ensures the effect is visible even when cursor moves quickly
          htmlElement.style.setProperty('--x', `${x}px`);
          htmlElement.style.setProperty('--y', `${y}px`);
        });
      };
      
      // Add a mouseover handler for each piece to ensure variables are set
      const handlePieceMouseOver = (e: MouseEvent) => {
        const piece = e.currentTarget as HTMLElement;
        const rect = piece.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        piece.style.setProperty('--x', `${x}px`);
        piece.style.setProperty('--y', `${y}px`);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      
      // Add mouseover listeners to each piece
      const pieces = document.querySelectorAll('.puzzle-piece');
      pieces.forEach(piece => {
        (piece as HTMLElement).addEventListener('mouseover', handlePieceMouseOver as EventListener);
      });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        
        // Clean up mouseover listeners
        pieces.forEach(piece => {
          (piece as HTMLElement).removeEventListener('mouseover', handlePieceMouseOver as EventListener);
        });
      };
    }
  }, [theme]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div 
        className="relative overflow-visible rounded-xl shadow-lg max-w-[85vw] sm:max-w-md w-full"
        style={{ 
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: theme.styles.borderRadius,
          boxShadow: theme.styles.boxShadow,
        }}
      >
        <div className="absolute inset-0 z-0 opacity-10">
          <BackgroundIllustration />
        </div>

        <div className="relative z-10 w-full p-3 sm:p-4">
          <div className="flex flex-col items-center justify-center mb-3">
            {/* Title with integrated year navigation */}
            <div className="flex items-center justify-center gap-2 mb-4 w-full">
              <button
                onClick={goToPreviousYear}
                className={`h-7 w-7 rounded-full flex items-center justify-center transition-all hover-glow-violet hover-retro 
                  ${theme.id === "theme-retro" ? "rounded-none" : "rounded-full"}`}
                style={{ 
                  backgroundColor: theme.id === "theme-retro" ? theme.colors.primary : `${theme.colors.background}80`, 
                  color: theme.id === "theme-retro" ? theme.colors.backgroundSecondary : theme.colors.foreground,
                  boxShadow: theme.id === "theme-retro" ? "2px 2px 0 rgba(12, 31, 54, 0.4)" : "none",
                  transform: "translateZ(0)"
                }}
              >
                <ArrowLeft size={theme.id === "theme-retro" ? 14 : 16} />
              </button>
              
              <h1
                className="flex items-center justify-center gap-2 text-xl font-semibold"
                style={{
                  color: theme.colors.foreground,
                  fontFamily: theme.styles.fontFamily ? theme.styles.fontFamily : 'inherit',
                  textTransform: theme.id === "theme-retro" ? "uppercase" : "none"
                }}
              >
                <PuzzleIcon className="w-6 h-6" />
                <span>{theme.id === "theme-retro" ? "HOLI-DAYS " + selectedYear : selectedYear + " Holiday Puzzle"}</span>
              </h1>
              
              <button
                onClick={goToNextYear}
                className={`h-7 w-7 rounded-full flex items-center justify-center transition-all hover-glow-violet hover-retro
                  ${theme.id === "theme-retro" ? "rounded-none" : "rounded-full"}`}
                style={{ 
                  backgroundColor: theme.id === "theme-retro" ? theme.colors.primary : `${theme.colors.background}80`, 
                  color: theme.id === "theme-retro" ? theme.colors.backgroundSecondary : theme.colors.foreground,
                  boxShadow: theme.id === "theme-retro" ? "2px 2px 0 rgba(12, 31, 54, 0.4)" : "none",
                  transform: "translateZ(0)"
                }}
              >
                <ArrowRight size={theme.id === "theme-retro" ? 14 : 16} />
              </button>
            </div>
            
            {/* Simple collection status text */}
            <span 
              className="text-xs mb-2"
              style={{ color: `${theme.colors.foregroundSecondary}90` }}
            >
              {holidays.filter(h => h.passed).length}/{holidays.length} collected
            </span>
          </div>

          {/* Puzzle board with a refined wooden texture appearance and enhanced shadows */}
          <div className="relative mx-auto max-w-xs overflow-visible">
            {/* Country selector in bookmark format at the top of the puzzle */}
            <div className="mb-[-1px] w-full overflow-hidden">
              <div className="border-b border-transparent pb-[1px]">
                <CountrySelector onChange={handleCountryChange} />
              </div>
            </div>
            
            <div 
              className={`relative rounded-xl p-2.5 sm:p-3 shadow-md overflow-hidden border-2 puzzle-container ${theme.id === 'lofi-beige' ? 'hover-lofi-beige' : ''}`}
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
              {/* Rest of the content */}
              <div className="absolute inset-0 opacity-15" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath fill='%23a89888' fill-opacity='0.1' d='M0,0 L0,200 L200,200 L200,0 L0,0 Z M15,15 C15,15 45,25 65,55 C85,85 85,115 105,115 C125,115 135,95 165,95 C195,95 185,155 185,185 L15,185 L15,15 Z'/%3E%3C/svg%3E")`,
                  backgroundSize: '100% 100%'
                }}>
              </div>

              <div className="relative z-10 mx-auto" style={{ maxWidth: '100%' }}>
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
              
              <div className="text-center mt-3 mb-0.5">
                <p 
                  className={`text-[9px] font-medium text-important ${theme.id === "theme-retro" ? "pixel-text" : ""} ${theme.id === "theme-snow" ? "snow-text" : ""} ${theme.id === "theme-sakura" ? "sakura-text" : ""}`}
                  style={{ color: theme.colors.foreground }}
                >
                  {theme.id === "theme-retro" ? "SELECT HOLIDAY" : "Click pieces to discover holidays"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Holiday info tooltip */}
          {hoveredTile !== null && tooltipPosition && tooltipContent && (
            <div
              className="absolute z-50 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 text-xs w-48 max-w-xs whitespace-nowrap overflow-hidden"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                background: theme.colors.backgroundSecondary,
                color: theme.colors.foreground,
                boxShadow: theme.styles.boxShadow,
                borderRadius: theme.styles.borderRadius,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              {/* Add tooltip arrow */}
              <div 
                className="absolute w-3 h-3 rotate-45"
                style={{
                  background: theme.colors.backgroundSecondary,
                  bottom: "-6px",
                  left: "calc(50% - 6px)",
                  border: "0px solid transparent",
                  borderRightColor: theme.colors.border,
                  borderBottomColor: theme.colors.border,
                  boxShadow: theme.styles.boxShadow,
                  zIndex: -1,
                }}
              ></div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{tooltipContent.name}</span>
                  <span className="text-[10px] opacity-75">{tooltipContent.date}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[10px] opacity-75">
                    {tooltipContent.passed 
                      ? `Collected (${tooltipContent.daysPassed} days ago)`
                      : `Upcoming (in ${tooltipContent.daysUntil} days)`
                    }
                  </span>
                  <span className="flex items-center gap-1 text-[10px]">
                    <span>{getFlagEmoji(selectedCountry)}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
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
          
          // For bottom and right edges - ensure not all edges are flat and maintain interlocking
          let bottomType, rightType;
          
          // Decide bottom type - if it's the last row, make it flat
          bottomType = row === rows - 1 ? "flat" : Math.random() > 0.5 ? "tab" : "slot";
          
          // Decide right type - if it's the last column, make it flat
          rightType = col === cols - 1 ? "flat" : Math.random() > 0.5 ? "tab" : "slot";
          
          // If we ended up with all flat edges and it's not a border piece, force at least one non-flat edge
          if (topType === "flat" && rightType === "flat" && bottomType === "flat" && leftType === "flat" &&
              row !== 0 && col !== 0 && row !== rows - 1 && col !== cols - 1) {
            // Randomly choose an edge to make non-flat
            const edgeToChange = Math.floor(Math.random() * 4);
            if (edgeToChange === 0 && row !== 0) bottomType = Math.random() > 0.5 ? "tab" : "slot";
            else if (edgeToChange === 1 && col !== cols - 1) rightType = Math.random() > 0.5 ? "tab" : "slot";
            else if (edgeToChange === 2 && row !== rows - 1) bottomType = Math.random() > 0.5 ? "tab" : "slot";
            else if (edgeToChange === 3 && col !== 0) rightType = Math.random() > 0.5 ? "tab" : "slot";
          }
          
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
        minHeight: `${gridRows * 80}px`, // Reduce height from 100px to 80px per row
        aspectRatio: gridCols / gridRows > 1 ? `${gridCols} / ${gridRows}` : undefined,
        backgroundColor: colorPalette.boardBg,
        borderRadius: '10px',
        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.05)',
        padding: '2px', // Reduce padding for tighter fit
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
              margin: "0px", // No negative margin for cleaner appearance
              zIndex: isHovered ? 20 : isCompleted ? 30 : 10,
            }}
          >
            <div
              className={`
                puzzle-piece absolute inset-0 cursor-pointer 
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
                transform: isHovered ? 'scale(1.02) translateY(-1px)' : 
                          isCompleted ? 'scale(1.04) translateY(-2px)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                filter: isHovered ? 'brightness(1.03)' : 'none',
                boxShadow: isHovered ? '0 2px 4px rgba(0,0,0,0.12)' : 
                          isCompleted ? '0 3px 6px rgba(0,0,0,0.15)' : 'none',
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
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                  <feOffset in="blur" dx="0.5" dy="0.5" result="offsetBlur" />
                  <feFlood floodColor="#000000" floodOpacity="0.15" result="shadowColor" />
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
                  strokeWidth="0.3"
                  filter={isHovered || isCompleted ? `url(#piece-shadow-${holiday.id})` : ''}
                />
                
                {/* Gradients for depth and dimension */}
                <defs>
                  {/* Gradient for completed pieces */}
                  <linearGradient id={`gradientPassed${holiday.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorSet.highlight} />
                    <stop offset="60%" stopColor={colorSet.primary} />
                    <stop offset="100%" stopColor={colorSet.secondary} />
                  </linearGradient>
                  
                  {/* Gradient for upcoming pieces */}
                  <linearGradient id={`gradientUpcoming${holiday.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorSet.highlight} />
                    <stop offset="70%" stopColor={colorSet.primary} />
                    <stop offset="100%" stopColor={colorSet.secondary} />
                  </linearGradient>
                </defs>
                
                {/* Light reflection on the top edge */}
                <path 
                  d={generateTopEdgeHighlight(connectors)}
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="0.4"
                  fill="none"
                  opacity={isPassed ? "0.25" : "0.4"}
                />
              </svg>
              
              {/* Content inside the puzzle piece */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-1 sm:p-1.5">
                {/* Holiday icon */}
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 sm:mb-1">
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
                      className={`text-[8px] sm:text-[9px] leading-tight font-medium text-center ${
                        isPassed ? "text-important" : "text-important"
                      } ${theme.id === "theme-galaxy" ? "puzzle-piece-text" : ""}
                      ${theme.id === "theme-retro" ? "pixel-text" : ""}
                      ${theme.id === "theme-snow" ? "snow-text" : ""}
                      ${theme.id === "theme-sakura" ? "sakura-text" : ""}`}
                      style={{ 
                        color: isPassed ? 
                          theme.colors.foregroundHighlight || "#ffffff" : 
                          (theme.id === "theme-galaxy" || theme.id === "theme-retro") ? "#ffffff" : theme.styles.upcomingPiece.text,
                        textShadow: (theme.id === "theme-galaxy") ? "0 1px 2px rgba(0,0,0,0.4)" : 
                                   (theme.id === "theme-retro") ? "1px 1px 0 rgba(10, 26, 47, 0.6)" :
                                   (theme.id === "theme-snow") ? "0 1px 2px rgba(83, 132, 172, 0.15)" :
                                   (theme.id === "theme-sakura") ? "0 1px 1px rgba(216, 142, 160, 0.15)" :
                                   isPassed ? "0 1px 1px rgba(0,0,0,0.1)" : "none",
                        marginBottom: i < formattedDisplay.length - 1 ? "0.5px" : "0"
                      }}
                    >
                      {line}
                    </span>
                  ))}
                  
                  {/* Holiday date */}
                  <span 
                    className={`text-[6px] sm:text-[7px] mt-0.5 sm:mt-1 font-medium 
                      ${theme.id === "theme-galaxy" ? "puzzle-piece-text" : ""}
                      ${theme.id === "theme-retro" ? "pixel-text" : ""}
                      ${theme.id === "theme-snow" ? "snow-text" : ""}
                      ${theme.id === "theme-sakura" ? "sakura-text" : ""}`}
                    style={{ 
                      color: isPassed ? 
                        (theme.id === "theme-galaxy" || theme.id === "theme-retro") ? theme.colors.foregroundHighlight || "#ffffff" : theme.styles.completedPiece.text : 
                        (theme.id === "theme-galaxy" || theme.id === "theme-retro") ? "#ffffff" : theme.styles.upcomingPiece.text,
                      opacity: (theme.id === "theme-galaxy" || theme.id === "theme-retro") ? 1 : 0.85,
                      textShadow: (theme.id === "theme-galaxy") ? "0 1px 2px rgba(0,0,0,0.4)" : 
                                 (theme.id === "theme-retro") ? "1px 1px 0 rgba(10, 26, 47, 0.6)" :
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
                  <ThemeAnimation themeId={theme.id} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Generate a natural-looking jigsaw path with classic puzzle piece shape
function generateNaturalJigsawPath(connectors: { 
  top: string; 
  right: string; 
  bottom: string; 
  left: string; 
}) {
  const { top, right, bottom, left } = connectors;
  
  // Standard puzzle piece parameters
  const tabWidth = 30;     // Width of tab/slot
  const tabHeight = 15;    // Height of tab/slot projection
  const tabCenter = 50;    // Center position (0-100)
  const tabStart = tabCenter - tabWidth/2;
  const tabEnd = tabCenter + tabWidth/2;
  
  // Path string starts at top-left corner (0,0)
  let path = "M 0,0 ";
  
  // TOP EDGE
  if (top === "tab") {
    // Start to tab beginning
    path += `L ${tabStart},0 `;
    // Simple tab curve with 3 points
    path += `Q ${tabCenter},${-tabHeight} ${tabEnd},0 `;
    // Tab end to corner
    path += `L 100,0 `;
  } else if (top === "slot") {
    // Start to slot beginning
    path += `L ${tabStart},0 `;
    // Simple slot curve with 3 points
    path += `Q ${tabCenter},${tabHeight} ${tabEnd},0 `;
    // Slot end to corner
    path += `L 100,0 `;
  } else {
    // Flat edge
    path += `L 100,0 `;
  }
  
  // RIGHT EDGE
  if (right === "tab") {
    // Corner to tab beginning
    path += `L 100,${tabStart} `;
    // Simple tab curve with 3 points
    path += `Q ${100+tabHeight},${tabCenter} 100,${tabEnd} `;
    // Tab end to corner
    path += `L 100,100 `;
  } else if (right === "slot") {
    // Corner to slot beginning
    path += `L 100,${tabStart} `;
    // Simple slot curve with 3 points
    path += `Q ${100-tabHeight},${tabCenter} 100,${tabEnd} `;
    // Slot end to corner
    path += `L 100,100 `;
  } else {
    // Flat edge
    path += `L 100,100 `;
  }
  
  // BOTTOM EDGE
  if (bottom === "tab") {
    // Corner to tab beginning
    path += `L ${tabEnd},100 `;
    // Simple tab curve with 3 points
    path += `Q ${tabCenter},${100+tabHeight} ${tabStart},100 `;
    // Tab end to corner
    path += `L 0,100 `;
  } else if (bottom === "slot") {
    // Corner to slot beginning
    path += `L ${tabEnd},100 `;
    // Simple slot curve with 3 points
    path += `Q ${tabCenter},${100-tabHeight} ${tabStart},100 `;
    // Slot end to corner
    path += `L 0,100 `;
  } else {
    // Flat edge
    path += `L 0,100 `;
  }
  
  // LEFT EDGE
  if (left === "tab") {
    // Corner to tab beginning
    path += `L 0,${tabEnd} `;
    // Simple tab curve with 3 points
    path += `Q ${-tabHeight},${tabCenter} 0,${tabStart} `;
    // Tab end to starting point
    path += `L 0,0 `;
  } else if (left === "slot") {
    // Corner to slot beginning
    path += `L 0,${tabEnd} `;
    // Simple slot curve with 3 points
    path += `Q ${tabHeight},${tabCenter} 0,${tabStart} `;
    // Slot end to starting point
    path += `L 0,0 `;
  } else {
    // Flat edge
    path += `L 0,0 `;
  }
  
  path += "Z";  // Close the path
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
  
  // Match parameters from the main path function
  const tabWidth = 30;
  const tabHeight = 15;
  const tabCenter = 50;
  const tabStart = tabCenter - tabWidth/2;
  const tabEnd = tabCenter + tabWidth/2;
  
  // Create simple highlight for top edge
  let path = "";
  
  // TOP EDGE highlight
  if (top === "tab") {
    // From left to tab start with offset
    path += `M 2,2 L ${tabStart+2},2 `;
    // Simple curve following tab shape with offset
    path += `Q ${tabCenter},${-tabHeight+4} ${tabEnd-2},2 `;
    // From tab end to right
    path += `L 98,2`;
  } else if (top === "slot") {
    // From left to slot start with offset
    path += `M 2,2 L ${tabStart+2},2 `;
    // Simple curve following slot shape with offset
    path += `Q ${tabCenter},${tabHeight-4} ${tabEnd-2},2 `;
    // From slot end to right
    path += `L 98,2`;
  } else {
    // Straight highlight for flat edge
    path += `M 2,2 L 98,2`;
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
