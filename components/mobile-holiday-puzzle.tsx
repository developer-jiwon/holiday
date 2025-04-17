"use client"

import { useState } from "react"
import { BackgroundIllustration } from "./background-illustration"

// Sample holiday data for 2025
const holidays = [
  { id: 1, name: "New Year's Day", date: "Jan 1", passed: true },
  { id: 2, name: "Orthodox Christmas", date: "Jan 7", passed: true },
  { id: 3, name: "MLK Day", date: "Jan 20", passed: true },
  { id: 4, name: "Chinese New Year", date: "Jan 29", passed: true },
  { id: 5, name: "Valentine's Day", date: "Feb 14", passed: true },
  { id: 6, name: "Family Day", date: "Feb 19", passed: true },
  { id: 7, name: "St. Patrick's", date: "Mar 17", passed: true },
  { id: 8, name: "Good Friday", date: "Apr 18", passed: true },
  { id: 9, name: "Easter Monday", date: "Apr 21", passed: true },
  { id: 10, name: "Earth Day", date: "Apr 22", passed: true },
  { id: 11, name: "Victoria Day", date: "May 20", daysUntil: 32, passed: false },
  { id: 12, name: "Memorial Day", date: "May 26", daysUntil: 38, passed: false },
  { id: 13, name: "Canada Day", date: "Jul 1", daysUntil: 74, passed: false },
  { id: 14, name: "Independence Day", date: "Jul 4", daysUntil: 77, passed: false },
  { id: 15, name: "Civic Holiday", date: "Aug 4", daysUntil: 108, passed: false },
  { id: 16, name: "Labor Day", date: "Sep 1", daysUntil: 136, passed: false },
  { id: 17, name: "Truth & Reconciliation", date: "Sep 30", daysUntil: 165, passed: false },
  { id: 18, name: "Thanksgiving", date: "Oct 13", daysUntil: 178, passed: false },
  { id: 19, name: "Halloween", date: "Oct 31", daysUntil: 196, passed: false },
  { id: 20, name: "Remembrance Day", date: "Nov 11", daysUntil: 207, passed: false },
  { id: 21, name: "US Thanksgiving", date: "Nov 27", daysUntil: 223, passed: false },
  { id: 22, name: "Christmas Eve", date: "Dec 24", daysUntil: 250, passed: false },
  { id: 23, name: "Christmas", date: "Dec 25", daysUntil: 251, passed: false },
  { id: 24, name: "Boxing Day", date: "Dec 26", daysUntil: 252, passed: false },
  { id: 25, name: "New Year's Eve", date: "Dec 31", daysUntil: 257, passed: false },
]

export function MobileHolidayPuzzle() {
  const [selectedTile, setSelectedTile] = useState<number | null>(null)

  // Function to handle tile click
  const handleTileClick = (id: number) => {
    setSelectedTile(selectedTile === id ? null : id)
  }

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-[#f9f4ec] p-4 shadow-lg">
      <BackgroundIllustration />

      <div className="relative">
        <h1 className="mb-4 text-center font-medium text-[#8b6e5a]">2025 Holiday Tracker</h1>

        <div className="grid grid-cols-5 gap-2">
          {holidays.map((holiday) => (
            <button
              key={holiday.id}
              onClick={() => handleTileClick(holiday.id)}
              className={`
                relative flex aspect-square flex-col items-center justify-center rounded-lg p-1
                transition-all duration-200 ease-in-out
                ${selectedTile === holiday.id ? "scale-105 shadow-md z-10" : ""}
                ${
                  holiday.passed
                    ? "bg-gradient-to-br from-[#a38b7b] to-[#8b6e5a] text-white shadow-sm"
                    : "border-2 border-[#e6d7c3] bg-[#f9f4ec]/50 text-[#8b6e5a]"
                }
              `}
              aria-label={holiday.name}
            >
              {holiday.passed ? (
                <>
                  <span className="text-lg font-medium">✓</span>
                  <span className="mt-1 text-[10px] text-white/90">{holiday.date}</span>
                </>
              ) : (
                <span className="text-xs font-medium">
                  {holiday.daysUntil ? `+${holiday.daysUntil}d` : holiday.date}
                </span>
              )}

              {/* Show tooltip on selected tile */}
              {selectedTile === holiday.id && (
                <div className="absolute -top-12 left-1/2 w-auto -translate-x-1/2 rounded-md bg-white px-2 py-1 text-xs font-medium text-[#8b6e5a] shadow-md">
                  {holiday.name}
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-[#a38b7b]">
          <span>10/25 completed</span>
          <span>40% of year</span>
        </div>
      </div>
    </div>
  )
}
