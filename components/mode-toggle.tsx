"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { Theme } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export function ModeToggle() {
  const { theme, setThemeById, availableThemes } = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleThemeChange = (themeId: string) => {
    setThemeById(themeId)
    setOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className={`w-9 h-9 ${theme.id}`}
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Toggle theme</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
      
      {open && (
        <div 
          className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-background border border-border z-50"
          style={{
            backgroundColor: theme.colors.backgroundSecondary,
            borderColor: theme.colors.border,
          }}
        >
          <div className="py-1" role="menu">
            {availableThemes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-backgroundTertiary"
                style={{
                  color: theme.colors.foreground,
                  backgroundColor: t.id === theme.id ? theme.colors.backgroundTertiary : 'transparent',
                }}
                role="menuitem"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 