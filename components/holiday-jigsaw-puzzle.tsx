"use client"

import { useEffect, useRef } from "react"

// Sample holiday data
const holidays = [
  { id: 1, name: "New Year's Day", date: "Jan 1", passed: true },
  { id: 2, name: "Orthodox Christmas", date: "Jan 7", passed: true },
  { id: 3, name: "Martin Luther King Jr. Day", date: "Jan 20", passed: true },
  { id: 4, name: "Chinese New Year", date: "Jan 29", passed: true },
  { id: 5, name: "Valentine's Day", date: "Feb 14", passed: true },
  { id: 6, name: "Family Day", date: "Feb 19", passed: true },
  { id: 7, name: "St. Patrick's Day", date: "Mar 17", passed: true },
  { id: 8, name: "Good Friday", date: "Apr 18", passed: true },
  { id: 9, name: "Easter Monday", date: "Apr 21", passed: true },
  { id: 10, name: "Earth Day", date: "Apr 22", passed: true },
  { id: 11, name: "Victoria Day", date: "May 20", daysUntil: 32, passed: false },
  { id: 12, name: "Memorial Day", date: "May 26", daysUntil: 38, passed: false },
  { id: 13, name: "Canada Day", date: "Jul 1", daysUntil: 74, passed: false },
  { id: 14, name: "Independence Day", date: "Jul 4", daysUntil: 77, passed: false },
  { id: 15, name: "Civic Holiday", date: "Aug 4", daysUntil: 108, passed: false },
  { id: 16, name: "Labor Day", date: "Sep 1", daysUntil: 136, passed: false },
  { id: 17, name: "National Day for Truth and Reconciliation", date: "Sep 30", daysUntil: 165, passed: false },
  { id: 18, name: "Thanksgiving", date: "Oct 13", daysUntil: 178, passed: false },
  { id: 19, name: "Halloween", date: "Oct 31", daysUntil: 196, passed: false },
  { id: 20, name: "Remembrance Day", date: "Nov 11", daysUntil: 207, passed: false },
  { id: 21, name: "US Thanksgiving", date: "Nov 27", daysUntil: 223, passed: false },
  { id: 22, name: "Christmas Eve", date: "Dec 24", daysUntil: 250, passed: false },
  { id: 23, name: "Christmas Day", date: "Dec 25", daysUntil: 251, passed: false },
  { id: 24, name: "Boxing Day", date: "Dec 26", daysUntil: 252, passed: false },
  { id: 25, name: "New Year's Eve", date: "Dec 31", daysUntil: 257, passed: false },
]

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
    holiday: (typeof holidays)[0],
  ) => {
    ctx.save()

    // Begin path for the piece
    ctx.beginPath()

    // Start at top-left corner
    ctx.moveTo(x, y)

    // Top edge with tab
    if (hasTopTab) {
      ctx.lineTo(x + width * 0.3, y)
      ctx.bezierCurveTo(
        x + width * 0.3 - tabSize,
        y - tabSize * 0.5,
        x + width * 0.7 - tabSize,
        y - tabSize * 0.5,
        x + width * 0.7,
        y,
      )
    }
    ctx.lineTo(x + width, y)

    // Right edge with tab
    if (hasRightTab) {
      ctx.lineTo(x + width, y + height * 0.3)
      ctx.bezierCurveTo(
        x + width + tabSize * 0.5,
        y + height * 0.3 - tabSize,
        x + width + tabSize * 0.5,
        y + height * 0.7 - tabSize,
        x + width,
        y + height * 0.7,
      )
    }
    ctx.lineTo(x + width, y + height)

    // Bottom edge with tab
    if (hasBottomTab) {
      ctx.lineTo(x + width * 0.7, y + height)
      ctx.bezierCurveTo(
        x + width * 0.7 - tabSize,
        y + height + tabSize * 0.5,
        x + width * 0.3 - tabSize,
        y + height + tabSize * 0.5,
        x + width * 0.3,
        y + height,
      )
    }
    ctx.lineTo(x, y + height)

    // Left edge with tab
    if (hasLeftTab) {
      ctx.lineTo(x, y + height * 0.7)
      ctx.bezierCurveTo(
        x - tabSize * 0.5,
        y + height * 0.7 - tabSize,
        x - tabSize * 0.5,
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
      ctx.font = "bold 16px sans-serif"
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
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Show either days until or date
      const text = holiday.daysUntil ? `+${holiday.daysUntil}d` : holiday.date
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
