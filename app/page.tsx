import { MobileHolidayPuzzle } from "@/components/mobile-holiday-puzzle"

export default function PuzzleScreen() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f5e9d9] px-4 py-8">
      <div className="mx-auto w-full max-w-md">
        <MobileHolidayPuzzle />
      </div>
    </main>
  )
}
