"use client"

import { MobileHolidayPuzzle } from "@/components/mobile-holiday-puzzle"
import { useTheme } from "@/hooks/use-theme"
import { useEffect } from "react"

export default function PuzzleScreen() {
  const { theme } = useTheme()
  
  // Add theme-specific class to body element
  useEffect(() => {
    // Reset specific background effects when theme changes
    document.body.classList.remove('theme-galaxy-bg');
    document.body.classList.remove('theme-retro');
    document.body.classList.remove('theme-forest');
    document.body.classList.remove('theme-sunset');
    document.body.classList.remove('theme-snow');
    
    // Apply theme-specific effects to body
    if (theme.id === 'theme-galaxy') {
      document.body.classList.add('theme-galaxy-bg');
    } else if (theme.id === 'theme-retro') {
      document.body.classList.add('theme-retro');
    } else if (theme.id === 'theme-forest') {
      document.body.classList.add('theme-forest');
    } else if (theme.id === 'theme-sunset') {
      document.body.classList.add('theme-sunset');
    } else if (theme.id === 'theme-snow') {
      document.body.classList.add('theme-snow');
    }
    
    // Clean up on unmount
    return () => {
      document.body.classList.remove('theme-galaxy-bg');
      document.body.classList.remove('theme-retro');
      document.body.classList.remove('theme-forest');
      document.body.classList.remove('theme-sunset');
      document.body.classList.remove('theme-snow');
    };
  }, [theme.id]);
  
  return (
    <main 
      className="flex min-h-screen w-full items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Theme-specific background effects */}
      {theme.id === 'theme-galaxy' && (
        <div className="stars-background" />
      )}
      {theme.id === 'theme-retro' && (
        <div className="grid-background" />
      )}
      {theme.id === 'theme-forest' && (
        <div className="forest-background" />
      )}
      {theme.id === 'theme-sunset' && (
        <div className="sunset-background" />
      )}
      {theme.id === 'theme-snow' && (
        <div className="snow-background" />
      )}
      
      <div className="mx-auto w-full max-w-lg relative z-10">
        <MobileHolidayPuzzle />
      </div>
    </main>
  )
}
