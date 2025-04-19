"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Theme, availableThemes, defaultTheme, getRandomTheme, getThemeById } from "@/lib/utils"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  setRandomTheme: () => void
  setThemeById: (id: string) => void
  availableThemes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize theme with a random one on first render (client-side only)
  useEffect(() => {
    if (!isInitialized) {
      setTheme(getRandomTheme())
      setIsInitialized(true)
    }
  }, [isInitialized])

  const setRandomTheme = () => {
    setTheme(getRandomTheme())
  }

  const setThemeById = (id: string) => {
    const foundTheme = getThemeById(id)
    setTheme(foundTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        setRandomTheme,
        setThemeById,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
} 