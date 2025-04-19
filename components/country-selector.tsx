"use client"

import * as React from "react"
import { useTheme } from "@/hooks/use-theme"

type Country = {
  name: string
  flag: string
  code: string
}

const countries: Country[] = [
  { name: "United States", flag: "🇺🇸", code: "us" },
  { name: "Canada", flag: "🇨🇦", code: "canada" },
  { name: "United Kingdom", flag: "🇬🇧", code: "uk" },
  { name: "Australia", flag: "🇦🇺", code: "australia" },
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
  
  const handleSelectCountry = (index: number) => {
    setSelectedIndex(index);
    onChange(countries[index].code);
  };

  return (
    <div className="flex overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
      <div className="flex items-center gap-1.5 mx-auto">
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
  );
}
