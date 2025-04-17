"use client"

import type React from "react"

import { useState } from "react"
import { HolidayTooltip } from "./holiday-tooltip"

// Sample holiday data for 2025
const holidays = [
  { id: 1, name: "New Year's Day", date: "Jan 1", flag: "🇨🇦", passed: true },
  { id: 2, name: "Orthodox Christmas", date: "Jan 7", flag: "🇨🇦", passed: true },
  { id: 3, name: "Martin Luther King Jr. Day", date: "Jan 20", flag: "🇺🇸", passed: true },
  { id: 4, name: "Chinese New Year", date: "Jan 29", flag: "🇨🇳", passed: true },
  { id: 5, name: "Valentine's Day", date: "Feb 14", flag: "🇨🇦", passed: true },
  { id: 6, name: "Family Day", date: "Feb 19", flag: "🇨🇦", passed: true },
  { id: 7, name: "St. Patrick's Day", date: "Mar 17", flag: "🇨🇦", passed: true },
  { id: 8, name: "Good Friday", date: "Apr 18", flag: "🇨🇦", passed: true },
  { id: 9, name: "Easter Monday", date: "Apr 21", flag: "🇨🇦", passed: true },
  { id: 10, name: "Earth Day", date: "Apr 22", flag: "🌎", passed: true },
  { id: 11, name: "Victoria Day", date: "May 20", flag: "🇨🇦", passed: false },
  { id: 12, name: "Memorial Day", date: "May 26", flag: "🇺🇸", passed: false },
  { id: 13, name: "Canada Day", date: "Jul 1", flag: "🇨🇦", passed: false },
  { id: 14, name: "Independence Day", date: "Jul 4", flag: "🇺🇸", passed: false },
  { id: 15, name: "Civic Holiday", date: "Aug 4", flag: "🇨🇦", passed: false },
  { id: 16, name: "Labor Day", date: "Sep 1", flag: "🇨🇦", passed: false },
  { id: 17, name: "National Day for Truth and Reconciliation", date: "Sep 30", flag: "🇨🇦", passed: false },
  { id: 18, name: "Thanksgiving", date: "Oct 13", flag: "🇨🇦", passed: false },
  { id: 19, name: "Halloween", date: "Oct 31", flag: "🇨🇦", passed: false },
  { id: 20, name: "Remembrance Day", date: "Nov 11", flag: "🇨🇦", passed: false },
  { id: 21, name: "US Thanksgiving", date: "Nov 27", flag: "🇺🇸", passed: false },
  { id: 22, name: "Christmas Eve", date: "Dec 24", flag: "🇨🇦", passed: false },
  { id: 23, name: "Christmas Day", date: "Dec 25", flag: "🇨🇦", passed: false },
  { id: 24, name: "Boxing Day", date: "Dec 26", flag: "🇨🇦", passed: false },
  { id: 25, name: "New Year's Eve", date: "Dec 31", flag: "🇨🇦", passed: false },
]

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
