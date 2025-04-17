import { getHolidaysForYear, type Holiday, type UpcomingHoliday } from "../lib/date-utils"

// Get current year's holidays with calculated days and status
const holidays = getHolidaysForYear(2025)

export function HolidayPuzzleGrid() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {holidays.map((holiday) => (
        <div
          key={holiday.id}
          className={`flex h-16 w-16 flex-col items-center justify-center rounded-lg p-1 text-center ${
            holiday.passed
              ? "bg-gradient-to-br from-[#a38b7b] to-[#8b6e5a] text-white shadow-sm"
              : "border-2 border-[#e6d7c3] bg-[#f9f4ec]/50 text-[#8b6e5a] shadow-sm"
          }`}
        >
          <div className="text-xs font-medium line-clamp-1 w-full">{holiday.name.split(" ")[0]}</div>
          <div className="text-xs mt-auto">
            {holiday.passed ? (
              <span>✓ {holiday.date}</span>
            ) : (holiday as UpcomingHoliday).daysUntil === 0 ? (
              <span className="font-medium">Today</span>
            ) : (
              <span>
                +{(holiday as UpcomingHoliday).daysUntil}d / {holiday.date}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
