import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-merriweather)", "serif"],
        'light-serif': ["var(--font-cormorant)", "serif"],
        'mono': ["var(--font-space-mono)", "monospace"],
      },
      colors: {
        beige: {
          50: "#f9f4ec",
          100: "#f5e9d9",
          200: "#e6d7c3",
          300: "#d7c4ad",
          400: "#c8b297",
          500: "#b99f81",
          600: "#a38b7b",
          700: "#8b6e5a",
          800: "#7d6351",
          900: "#6f5848",
        },
        indigo: {
          50: "#e2e2fc",
          100: "#c8c8f9",
          200: "#9d9df0",
          300: "#7575e7",
          400: "#5959db",
          500: "#4d4585",
          600: "#3a336b",
          700: "#2d2754",
          800: "#201d3d",
          900: "#1a1a2e",
        },
        purple: {
          50: "#f2e9ff",
          100: "#e2d1ff",
          200: "#c8b8db",
          300: "#9d84b7",
          400: "#8a6fc7",
          500: "#7f5a9f",
          600: "#614685",
          700: "#503973",
          800: "#3e2e5c",
          900: "#2a2354",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
