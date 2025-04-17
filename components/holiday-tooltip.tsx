"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Holiday, PastHoliday, UpcomingHoliday } from "../lib/date-utils"

interface HolidayTooltipProps {
  holiday: Holiday & { flag: string }
  position: {
    x: number
    y: number
  }
  onClose: () => void
}

export function HolidayTooltip({ holiday, position, onClose }: HolidayTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Calculate position to keep tooltip on screen
  const calculatePosition = () => {
    if (typeof window === "undefined") return {}

    const tooltipWidth = 220
    const tooltipHeight = 120
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    let left = position.x - tooltipWidth / 2
    let top = position.y - tooltipHeight - 10

    // Adjust if tooltip would go off screen
    if (left < 10) left = 10
    if (left + tooltipWidth > windowWidth - 10) left = windowWidth - tooltipWidth - 10
    if (top < 10) top = position.y + 30 // Show below if not enough space above

    return { left, top }
  }

  const tooltipStyle = calculatePosition()

  return (
    <div ref={tooltipRef} className="fixed z-50 w-[220px] rounded-lg bg-white p-4 shadow-lg" style={tooltipStyle}>
      <button onClick={onClose} className="absolute right-2 top-2 rounded-full p-1 text-[#a38b7b] hover:bg-[#f5e9d9]">
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-xl">{holiday.flag}</span>
        <h3 className="font-medium text-[#8b6e5a]">{holiday.name}</h3>
        <p className="text-sm text-[#a38b7b]">{holiday.date}</p>
        <span className={`mt-1 text-xs ${holiday.passed ? "text-[#8b6e5a]" : "text-emerald-600"}`}>
          {holiday.passed ? 
            `Passed (${(holiday as PastHoliday).daysPassed} days ago)` : 
            `Coming Up (in ${(holiday as UpcomingHoliday).daysUntil} days)`}
        </span>
      </div>
    </div>
  )
}
