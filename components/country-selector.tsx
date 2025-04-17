"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Country = {
  name: string
  flag: string
  code: string
}

const countries: Country[] = [
  { name: "Canada", flag: "🇨🇦", code: "CA" },
  { name: "Japan", flag: "🇯🇵", code: "JP" },
  { name: "South Korea", flag: "🇰🇷", code: "KR" },
  { name: "United States", flag: "🇺🇸", code: "US" },
  { name: "China", flag: "🇨🇳", code: "CN" },
]

export function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(countries[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-xl border border-[#e6d7c3] bg-white p-3 text-[#8b6e5a] shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[200px]">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            className="flex cursor-pointer items-center gap-2 py-2"
            onClick={() => setSelectedCountry(country)}
          >
            <span className="text-xl">{country.flag}</span>
            <span>{country.name}</span>
            {selectedCountry.code === country.code && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
