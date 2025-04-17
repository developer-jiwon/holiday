"use client"

import { useEffect, useRef } from "react"

export function JigsawPuzzleGrid() {
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

    // Set styles
    ctx.lineWidth = 1.5
    ctx.strokeStyle = "#d7c4ad"
    ctx.fillStyle = "#f9f4ec"
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 1

    // Draw each piece
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
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
  ) => {
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

    // Fill and stroke
    ctx.fill()
    ctx.stroke()

    // Add inner shadow effect
    ctx.save()
    ctx.clip()
    ctx.shadowBlur = 6
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)"
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 1
    ctx.stroke()
    ctx.restore()
  }

  return (
    <div className="relative aspect-square w-full max-w-md rounded-lg bg-[#f9f4ec] p-4 shadow-md">
      <canvas ref={canvasRef} className="h-full w-full rounded" />
    </div>
  )
}
