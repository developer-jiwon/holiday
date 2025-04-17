"use client"

import { useEffect, useState } from "react"

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Animate the progress bar on mount
    const timer = setTimeout(() => {
      setWidth(progress)
    }, 300)

    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="h-4 w-full overflow-hidden rounded-full bg-[#f9f4ec] shadow-inner">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#a38b7b] to-[#8b6e5a] transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
