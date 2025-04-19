"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(countries[0])
  const { theme } = useTheme();

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    onChange(country.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="flex items-center justify-between p-2 text-sm rounded-md"
          style={{ 
            backgroundColor: `${theme.colors.backgroundHighlight}80`,
            color: theme.colors.foreground,
            border: `1px solid ${theme.colors.border}80`
          }}
        >
          <div className="flex items-center gap-1.5">
            <span>{selectedCountry.flag}</span>
            <span className="text-xs">{selectedCountry.code.toUpperCase()}</span>
          </div>
          <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        className="min-w-[120px] p-1" 
        style={{ 
          backgroundColor: theme.colors.backgroundHighlight,
          border: `1px solid ${theme.colors.border}80`
        }}
      >
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            className="flex cursor-pointer items-center gap-1.5 px-2 py-1.5 text-xs rounded-sm"
            onClick={() => handleCountryChange(country)}
            style={{ 
              color: theme.colors.foreground
            }}
          >
            <span>{country.flag}</span>
            <span>{country.name}</span>
            {selectedCountry.code === country.code && 
              <Check className="ml-auto h-3 w-3" style={{ color: theme.colors.primary }} />
            }
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
