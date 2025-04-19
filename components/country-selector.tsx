"use client"

import * as React from "react"
import { useTheme } from "@/hooks/use-theme"
import { useRef, useEffect } from "react"

type Country = {
  name: string
  flag: string
  code: string
}

// Add all countries from the mobile-holiday-puzzle.tsx file
const countries: Country[] = [
  { name: "United States", flag: "🇺🇸", code: "us" },
  { name: "Canada", flag: "🇨🇦", code: "canada" },
  { name: "United Kingdom", flag: "🇬🇧", code: "uk" },
  { name: "Australia", flag: "🇦🇺", code: "australia" },
  { name: "Germany", flag: "🇩🇪", code: "germany" },
  { name: "France", flag: "🇫🇷", code: "france" },
  { name: "Spain", flag: "🇪🇸", code: "spain" },
  { name: "Italy", flag: "🇮🇹", code: "italy" },
  { name: "Japan", flag: "🇯🇵", code: "japan" },
  { name: "China", flag: "🇨🇳", code: "china" },
  { name: "Taiwan", flag: "🇹🇼", code: "taiwan" },
  { name: "South Korea", flag: "🇰🇷", code: "korea" },
]

interface CountrySelectorProps {
  onChange: (country: string) => void;
}

export function CountrySelector({ onChange }: CountrySelectorProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const handleSelectCountry = (index: number) => {
    setSelectedIndex(index);
    onChange(countries[index].code);
  };

  // Scroll the selected country into view
  useEffect(() => {
    if (scrollRef.current && typeof window !== 'undefined') {
      const selectedButton = scrollRef.current.children[selectedIndex] as HTMLElement;
      if (selectedButton) {
        const containerWidth = scrollRef.current.offsetWidth;
        const buttonLeft = selectedButton.offsetLeft;
        const buttonWidth = selectedButton.offsetWidth;
        
        // Center the selected button if possible
        scrollRef.current.scrollTo({
          left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="w-full overflow-hidden relative group">
      {/* Left fade gradient to indicate scrollability */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          from: `${theme.colors.backgroundSecondary}90`, 
          to: 'transparent' 
        }}
      ></div>

      {/* Right fade gradient to indicate scrollability */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          from: `${theme.colors.backgroundSecondary}90`,
          to: 'transparent'  
        }}
      ></div>

      {/* Scrollable container */}
      <div className="w-full overflow-x-auto scrollbar-hide py-1.5 px-2 -mx-1">
        <div 
          ref={scrollRef}
          className="flex items-center gap-1.5 min-w-max"
        >
          {countries.map((country, index) => {
            const isSelected = index === selectedIndex;
            
            return (
              <button 
                key={country.code}
                onClick={() => handleSelectCountry(index)}
                className="flex items-center justify-center rounded-t-lg transition-all relative"
                style={{ 
                  backgroundColor: isSelected 
                    ? theme.colors.backgroundHighlight 
                    : `${theme.colors.background}90`,
                  color: theme.colors.foreground,
                  borderTop: `1px solid ${isSelected ? theme.colors.border : 'transparent'}`,
                  borderLeft: `1px solid ${isSelected ? theme.colors.border : 'transparent'}`,
                  borderRight: `1px solid ${isSelected ? theme.colors.border : 'transparent'}`,
                  borderBottom: isSelected 
                    ? `2px solid ${theme.colors.primary}` 
                    : 'none',
                  marginBottom: isSelected ? '-1px' : '0',
                  zIndex: isSelected ? 2 : 1,
                  opacity: isSelected ? 1 : 0.7,
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  width: '36px',
                  height: '36px',
                  padding: '0',
                }}
                title={country.name}
              >
                <span className="text-xl">{country.flag}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
