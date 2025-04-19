"use client"

import { MobileHolidayPuzzle } from "@/components/mobile-holiday-puzzle"
import { useTheme } from "@/hooks/use-theme"
import { useEffect } from "react"

export default function PuzzleScreen() {
  const { theme } = useTheme()
  
  // Add theme-specific class to body element
  useEffect(() => {
    // Remove all theme classes first
    document.body.classList.remove('theme-galaxy', 'theme-lofi-beige', 'theme-retro', 'theme-forest');
    // Add current theme class
    document.body.classList.add(`theme-${theme.id}`);
  }, [theme.id]);
  
  return (
    <main 
      className="flex min-h-screen w-full items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Stars background for galaxy theme */}
      <div className="galaxy-stars" />
      
      {/* Scanlines effect for retro theme */}
      <div className="retro-scanlines" />
      
      {/* Background effect for forest theme */}
      <div className="forest-background" />
      
      <div className="mx-auto w-full max-w-lg relative z-10">
        <MobileHolidayPuzzle />
      </div>
    </main>
  )
}
