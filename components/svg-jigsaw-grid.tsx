export function SvgJigsawGrid() {
  // This is an alternative implementation using SVG instead of Canvas
  // It's not used in the main component but provided as an option

  const gridSize = 5
  const pieceSize = 60
  const tabSize = 12
  const totalSize = gridSize * pieceSize

  // Generate the grid
  const pieces = []
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * pieceSize
      const y = row * pieceSize

      // Determine which sides have tabs
      const hasRightTab = col < gridSize - 1
      const hasBottomTab = row < gridSize - 1
      const hasLeftTab = col > 0
      const hasTopTab = row > 0

      pieces.push(
        <JigsawPiece
          key={`${row}-${col}`}
          x={x}
          y={y}
          size={pieceSize}
          tabSize={tabSize}
          hasRightTab={hasRightTab}
          hasBottomTab={hasBottomTab}
          hasLeftTab={hasLeftTab}
          hasTopTab={hasTopTab}
        />,
      )
    }
  }

  return (
    <div className="flex items-center justify-center">
      <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} className="drop-shadow-sm">
        {pieces}
      </svg>
    </div>
  )
}

interface JigsawPieceProps {
  x: number
  y: number
  size: number
  tabSize: number
  hasRightTab: boolean
  hasBottomTab: boolean
  hasLeftTab: boolean
  hasTopTab: boolean
}

function JigsawPiece({ x, y, size, tabSize, hasRightTab, hasBottomTab, hasLeftTab, hasTopTab }: JigsawPieceProps) {
  // Create the path for the jigsaw piece
  let path = `M ${x} ${y}`

  // Top edge
  if (hasTopTab) {
    path += ` L ${x + size * 0.3} ${y}`
    path += ` C ${x + size * 0.3 - tabSize} ${y - tabSize * 0.5}, ${x + size * 0.7 - tabSize} ${y - tabSize * 0.5}, ${x + size * 0.7} ${y}`
  }
  path += ` L ${x + size} ${y}`

  // Right edge
  if (hasRightTab) {
    path += ` L ${x + size} ${y + size * 0.3}`
    path += ` C ${x + size + tabSize * 0.5} ${y + size * 0.3 - tabSize}, ${x + size + tabSize * 0.5} ${y + size * 0.7 - tabSize}, ${x + size} ${y + size * 0.7}`
  }
  path += ` L ${x + size} ${y + size}`

  // Bottom edge
  if (hasBottomTab) {
    path += ` L ${x + size * 0.7} ${y + size}`
    path += ` C ${x + size * 0.7 - tabSize} ${y + size + tabSize * 0.5}, ${x + size * 0.3 - tabSize} ${y + size + tabSize * 0.5}, ${x + size * 0.3} ${y + size}`
  }
  path += ` L ${x} ${y + size}`

  // Left edge
  if (hasLeftTab) {
    path += ` L ${x} ${y + size * 0.7}`
    path += ` C ${x - tabSize * 0.5} ${y + size * 0.7 - tabSize}, ${x - tabSize * 0.5} ${y + size * 0.3 - tabSize}, ${x} ${y + size * 0.3}`
  }
  path += ` L ${x} ${y}`

  return (
    <path
      d={path}
      fill="#f9f4ec"
      stroke="#d7c4ad"
      strokeWidth="1.5"
      filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))"
    />
  )
}
