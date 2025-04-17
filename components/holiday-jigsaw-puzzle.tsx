"use client"

import { useEffect, useRef } from "react"
import { getHolidaysForYear, type Holiday, type UpcomingHoliday } from "../lib/date-utils"

// Get holidays for 2025 with calculated dates
const holidays = getHolidaysForYear(2025)

export function HolidayJigsawPuzzle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Set canvas size in CSS
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw the jigsaw puzzle grid
    drawJigsawGrid(ctx, rect.width, rect.height)
  }, [])

  // Function to draw the jigsaw grid
  const drawJigsawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 5
    const pieceWidth = width / gridSize
    const pieceHeight = height / gridSize
    const tabSize = Math.min(pieceWidth, pieceHeight) * 0.2

    // Draw each piece
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col
        const holiday = holidays[index]
        if (!holiday) continue // Skip if no holiday data for this index

        const x = col * pieceWidth
        const y = row * pieceHeight

        drawJigsawPiece(
          ctx,
          x,
          y,
          pieceWidth,
          pieceHeight,
          tabSize,
          col < gridSize - 1, // has right tab
          row < gridSize - 1, // has bottom tab
          col > 0, // has left tab
          row > 0, // has top tab
          holiday,
        )
      }
    }
  }

  // Function to draw a single jigsaw piece
  const drawJigsawPiece = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    tabSize: number,
    hasRightTab: boolean,
    hasBottomTab: boolean,
    hasLeftTab: boolean,
    hasTopTab: boolean,
    holiday: Holiday,
  ) => {
    ctx.save()
    ctx.beginPath()

    // Start at top-left corner
    ctx.moveTo(x, y)

    // Draw top edge with tab if needed
    if (hasTopTab) {
      ctx.lineTo(x + width * 0.3, y)
      ctx.bezierCurveTo(
        x + width * 0.3 - tabSize,
        y - tabSize * 2,
        x + width * 0.7 + tabSize,
        y - tabSize * 2,
        x + width * 0.7,
        y,
      )
    }
    ctx.lineTo(x + width, y)

    // Draw right edge with tab if needed
    if (hasRightTab) {
      ctx.lineTo(x + width, y + height * 0.3)
      ctx.bezierCurveTo(
        x + width + tabSize * 2,
        y + height * 0.3 - tabSize,
        x + width + tabSize * 2,
        y + height * 0.7 + tabSize,
        x + width,
        y + height * 0.7,
      )
    }
    ctx.lineTo(x + width, y + height)

    // Draw bottom edge with tab if needed
    if (hasBottomTab) {
      ctx.lineTo(x + width * 0.7, y + height)
      ctx.bezierCurveTo(
        x + width * 0.7 + tabSize,
        y + height + tabSize * 2,
        x + width * 0.3 - tabSize,
        y + height + tabSize * 2,
        x + width * 0.3,
        y + height,
      )
    }
    ctx.lineTo(x, y + height)

    // Draw left edge with tab if needed
    if (hasLeftTab) {
      ctx.lineTo(x, y + height * 0.7)
      ctx.bezierCurveTo(
        x - tabSize * 2,
        y + height * 0.7 + tabSize,
        x - tabSize * 2,
        y + height * 0.3 - tabSize,
        x,
        y + height * 0.3,
      )
    }
    ctx.lineTo(x, y)

    ctx.closePath()

    // Fill and stroke based on holiday status
    if (holiday.passed) {
      // Filled piece for past holidays
      ctx.fillStyle = "#8b6e5a"
      ctx.shadowColor = "rgba(139, 110, 90, 0.3)"
      ctx.shadowBlur = 8
      ctx.fill()

      // Add subtle stroke
      ctx.strokeStyle = "#7d6351"
      ctx.lineWidth = 1
      ctx.stroke()

      // Add checkmark
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.font = "bold 16px Merriweather, serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("✓", x + width / 2, y + height / 2)
    } else {
      // Unfilled piece for upcoming holidays
      ctx.fillStyle = "transparent"
      ctx.strokeStyle = "#e6d7c3"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Add date or days until
      ctx.fillStyle = "#8b6e5a"
      ctx.font = "12px Merriweather, serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Show either days until or date
      const text = (holiday as UpcomingHoliday).daysUntil === 0 
        ? "Today" 
        : `+${(holiday as UpcomingHoliday).daysUntil}d`
      
      ctx.fillText(text, x + width / 2, y + height / 2)
    }

    ctx.restore()
  }

  return (
    <div className="relative aspect-square w-full max-w-md rounded-lg bg-[#f5e9d9] p-4 shadow-md">
      <canvas ref={canvasRef} className="h-full w-full rounded" />
    </div>
  )
}
