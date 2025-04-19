"use client"

import { MobileHolidayPuzzle } from "@/components/mobile-holiday-puzzle"
import { useTheme } from "@/hooks/use-theme"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

export default function PuzzleScreen() {
  const { theme } = useTheme()
  
  // Apply and remove specific classes based on the theme
  useEffect(() => {
    // Add theme-specific classes to body
    document.body.classList.add(theme.id);
    
    // Cleanup function to remove classes when theme changes
    return () => {
      document.body.classList.remove(theme.id);
      document.body.classList.remove('theme-galaxy');
      document.body.classList.remove('theme-retro');
      document.body.classList.remove('theme-snow');
      document.body.classList.remove('theme-sakura');
      document.body.classList.remove('lofi-beige');
    };
  }, [theme]);
  
  return (
    <main 
      className="min-h-screen bg-background font-sans antialiased flex w-full items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Theme-specific background effects */}
      {theme.id === 'theme-galaxy' && (
        <div className="stars-background" />
      )}
      {theme.id === 'theme-retro' && (
        <div className="grid-background" />
      )}
      {theme.id === 'theme-snow' && (
        <div className="snow-background" />
      )}
      {theme.id === 'theme-sakura' && (
        <>
          <div className="sakura-background" />
          <div className="sakura-petals">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`petal petal-${i + 1}`}></div>
            ))}
          </div>
        </>
      )}
      {theme.id === 'lofi-beige' && (
        <div className="lofi-sunlight-effect absolute inset-0 pointer-events-none z-0">
          <div className="moving-sunlight"></div>
        </div>
      )}
      
      <div className="mx-auto w-full max-w-lg relative z-10">
        <MobileHolidayPuzzle />
      </div>
    </main>
  )
}
