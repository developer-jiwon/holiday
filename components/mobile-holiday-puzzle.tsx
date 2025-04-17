"use client"

import { useState } from "react"
import { BackgroundIllustration } from "./background-illustration"
import { getHolidaysForYear, type Holiday, type UpcomingHoliday } from "../lib/date-utils"

// Get holidays for 2025 with calculated dates
const holidays = getHolidaysForYear(2025)

export function MobileHolidayPuzzle() {
  const [selectedTile, setSelectedTile] = useState<number | null>(null)

  const handleTileClick = (id: number) => {
    if (selectedTile === id) {
      setSelectedTile(null)
    } else {
      setSelectedTile(id)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-0 opacity-30">
        <BackgroundIllustration />
      </div>

      <div className="relative z-10 h-full w-full p-1">
        <h1 className="mb-4 text-center font-medium text-[#8b6e5a]">2025 Holiday Tracker</h1>

        <div className="grid grid-cols-5 gap-2 px-1 pb-1">
          {holidays.map((holiday) => (
            <button
              key={holiday.id}
              onClick={() => handleTileClick(holiday.id)}
              className={`
                flex aspect-square flex-col items-center justify-center rounded-lg p-0.5 text-center transition-all duration-300
                ${selectedTile === holiday.id ? "scale-105 shadow-md z-10" : ""}
                ${
                  holiday.passed
                    ? "bg-gradient-to-br from-[#a38b7b] to-[#8b6e5a] text-white"
                    : "border-2 border-[#e6d7c3] bg-white/80"
                }
              `}
              aria-label={holiday.name}
            >
              {holiday.passed ? (
                <>
                  <span className="text-base">✓</span>
                  <span className="mt-1 text-[10px] text-white/90">{holiday.date}</span>
                </>
              ) : (
                <span className="text-xs text-[#8b6e5a]">
                  {(holiday as UpcomingHoliday).daysUntil === 0 ? "Today" : `+${(holiday as UpcomingHoliday).daysUntil}d`}
                </span>
              )}
            </button>
          ))}
        </div>

        {selectedTile !== null && (
          <div className="mt-4 rounded-lg bg-white/90 p-3 text-center shadow-sm">
            <h2 className="text-lg font-medium text-[#8b6e5a]">
              {holidays.find((h) => h.id === selectedTile)?.name}
            </h2>
            <p className="mt-1 text-sm text-[#a38b7b]">
              {holidays.find((h) => h.id === selectedTile)?.date}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
