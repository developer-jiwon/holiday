import { Gift, Heart, Music, Star, Sun, Coffee, Smile, Zap } from "lucide-react"

interface PuzzleBoardProps {
  filledCount: number
  totalCount: number
}

export function PuzzleBoard({ filledCount, totalCount }: PuzzleBoardProps) {
  // Create a 5x5 grid (25 pieces)
  const size = Math.sqrt(totalCount)
  const pieces = Array.from({ length: totalCount }).map((_, index) => {
    const isFilled = index < filledCount
    return { id: index, filled: isFilled }
  })

  // Icons for filled pieces
  const icons = [
    <Star key="star" className="h-6 w-6 text-[#f9f4ec]" />,
    <Heart key="heart" className="h-6 w-6 text-[#f9f4ec]" />,
    <Sun key="sun" className="h-6 w-6 text-[#f9f4ec]" />,
    <Music key="music" className="h-6 w-6 text-[#f9f4ec]" />,
    <Gift key="gift" className="h-6 w-6 text-[#f9f4ec]" />,
    <Coffee key="coffee" className="h-6 w-6 text-[#f9f4ec]" />,
    <Smile key="smile" className="h-6 w-6 text-[#f9f4ec]" />,
    <Zap key="zap" className="h-6 w-6 text-[#f9f4ec]" />,
  ]

  return (
    <div className="grid grid-cols-5 gap-2 p-2">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`flex h-16 w-16 items-center justify-center rounded-lg transition-all duration-300 ${
            piece.filled
              ? "bg-gradient-to-br from-[#a38b7b] to-[#8b6e5a] shadow-md"
              : "border-2 border-[#f9f4ec] bg-[#f5e9d9]/50 shadow-sm"
          }`}
        >
          {piece.filled && icons[piece.id % icons.length]}
        </div>
      ))}
    </div>
  )
}
