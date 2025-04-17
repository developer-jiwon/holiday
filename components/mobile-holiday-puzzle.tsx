"use client"

import { useState, useRef } from "react"
import { BackgroundIllustration } from "./background-illustration"
import { getHolidaysForYear, getHolidaysByCountry, type Holiday, type UpcomingHoliday, type PastHoliday } from "../lib/date-utils"

type TooltipPosition = { x: number; y: number } | null

// Countries available for selection
const COUNTRIES = [
  { id: 'global', name: 'Global' },
  { id: 'canada', name: 'Canada' },
  { id: 'us', name: 'United States' },
  { id: 'uk', name: 'United Kingdom' },
  { id: 'australia', name: 'Australia' },
  { id: 'japan', name: 'Japan' },
]

export function MobileHolidayPuzzle() {
  const [currentYear, setCurrentYear] = useState<number>(2025)
  const [hoveredTile, setHoveredTile] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>('global')
  
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
  }

  const handleTileMouseLeave = () => {
    setHoveredTile(null)
    setTooltipPosition(null)
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

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-0 opacity-30">
        <BackgroundIllustration />
      </div>

      <div className="relative z-10 h-full w-full p-4">
        <div className="flex flex-col items-center justify-center mb-6">
          {/* Year Navigation */}
          <div className="flex items-center justify-center mb-2">
            <button 
              onClick={goToPreviousYear}
              className="text-[#8b6e5a] hover:text-[#6f5848] transition-colors p-2 text-xl font-bold"
              aria-label="Previous Year"
            >
              ←
            </button>
            
            <h1 className="mx-4 text-center font-medium text-[#8b6e5a]">{currentYear} Holiday Tracker</h1>
            
            <button 
              onClick={goToNextYear}
              className="text-[#8b6e5a] hover:text-[#6f5848] transition-colors p-2 text-xl font-bold"
              aria-label="Next Year"
            >
              →
            </button>
          </div>
          
          {/* Country Selector */}
          <div className="flex items-center mb-2">
            <label htmlFor="country-select" className="mr-2 text-sm text-[#8b6e5a]">Country:</label>
            <select 
              id="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="p-1 rounded border border-[#e6d7c3] bg-white text-[#8b6e5a] text-sm"
            >
              {COUNTRIES.map(country => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Updated grid with consistent 3x3 puzzle layout */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {holidays.map((holiday) => {
            // Get formatted display name that won't break across lines
            const displayName = getDisplayName(holiday.name);
            const formattedDisplay = formatMultilineText(displayName);
            
            return (
              <button
                key={holiday.id}
                onMouseEnter={(e) => handleTileMouseEnter(holiday.id, e)}
                onMouseLeave={handleTileMouseLeave}
                className={`
                  flex flex-col items-center justify-center rounded-lg text-center transition-all duration-300
                  aspect-square w-full p-3 sm:p-4
                  ${
                    holiday.passed
                      ? "bg-gradient-to-br from-[#a38b7b] to-[#8b6e5a] text-white"
                      : "border-2 border-[#e6d7c3] bg-white/80"
                  }
                `}
                aria-label={holiday.name}
              >
                <div className="flex flex-col items-center justify-center h-full w-full">
                  {formattedDisplay.map((line, i) => (
                    <span
                      key={i}
                      className={`text-xs sm:text-sm ${holiday.passed ? "text-white" : "text-[#8b6e5a]"} leading-tight ${
                        i < formattedDisplay.length - 1 ? "mb-0.5" : ""
                      }`}
                    >
                      {line}
                    </span>
                  ))}
                  <span className={`text-xs mt-1 ${holiday.passed ? "text-white/80" : "text-[#8b6e5a]/70"}`}>
                    {holiday.date}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {hoveredTile !== null && tooltipPosition && (
          <div
            className="fixed z-50 bg-white px-3 py-2 rounded-md shadow-md text-center"
            style={{
              left: `${tooltipPosition.x - 100}px`,
              top: `${tooltipPosition.y - 50}px`,
              width: "200px",
            }}
          >
            <div className="relative">
              <h3 className="font-medium text-[#8b6e5a]">{holidays.find(h => h.id === hoveredTile)?.name}</h3>
              <p className="text-sm text-[#a38b7b]">{holidays.find(h => h.id === hoveredTile)?.date}</p>
              
              {/* Show days passed or days until */}
              {(() => {
                const holiday = holidays.find(h => h.id === hoveredTile)
                if (!holiday) return null
                
                return holiday.passed ? (
                  <p className="text-xs text-[#8b6e5a] mt-1">
                    Passed ({(holiday as PastHoliday).daysPassed} days ago)
                  </p>
                ) : (
                  <p className="text-xs text-emerald-600 mt-1">
                    Coming up in {(holiday as UpcomingHoliday).daysUntil} days
                  </p>
                )
              })()}

              {/* Add a little arrow at the bottom */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
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

