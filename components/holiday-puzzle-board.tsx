"use client"

import type React from "react"

import { useState } from "react"
import { HolidayTooltip } from "./holiday-tooltip"
import { getHolidaysForYear, type Holiday } from "../lib/date-utils"

// Get holidays for 2025 with calculated dates and add flags
const baseHolidays = getHolidaysForYear(2025)
const holidays = baseHolidays.map(holiday => {
  // Add country flag based on holiday name
  let flag = "🇨🇦" // Default to Canadian flag
  
  if (holiday.name.includes("Independence Day") || 
      holiday.name.includes("Memorial Day") || 
      holiday.name.includes("Martin Luther King") ||
      holiday.name.includes("US Thanksgiving")) {
    flag = "🇺🇸" // US flag
  } else if (holiday.name.includes("Chinese New Year")) {
    flag = "🇨🇳" // Chinese flag
  } else if (holiday.name.includes("Earth Day")) {
    flag = "🌎" // Earth/global
  }
  
  return {
    ...holiday,
    flag
  }
})

export function HolidayPuzzleBoard() {
  const [selectedHoliday, setSelectedHoliday] = useState<(typeof holidays)[0] | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const handlePieceClick = (holiday: (typeof holidays)[0], event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
    setSelectedHoliday(holiday)
  }

  const closeTooltip = () => {
    setSelectedHoliday(null)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-5 gap-2 p-2">
        {holidays.map((holiday) => (
          <button
            key={holiday.id}
            onClick={(e) => handlePieceClick(holiday, e)}
            className={`flex h-16 w-16 items-center justify-center rounded-lg transition-all duration-300 ${
              holiday.passed
                ? "bg-gradient-to-br from-[#a38b7b] to-[#8b6e5a] shadow-md"
                : "border-2 border-[#f9f4ec] bg-[#f5e9d9]/50 shadow-sm"
            }`}
          >
            <span className="text-lg">{holiday.flag}</span>
          </button>
        ))}
      </div>

      {selectedHoliday && (
        <HolidayTooltip holiday={selectedHoliday} position={tooltipPosition} onClose={closeTooltip} />
      )}
    </div>
  )
}
