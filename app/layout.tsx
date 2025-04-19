import type { Metadata } from 'next'
import './globals.css'
import { Merriweather, Cormorant, Space_Mono } from 'next/font/google'
import { ThemeProvider } from '@/hooks/use-theme'

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
})

const cormorant = Cormorant({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'Holiday Tracker 2025',
  description: 'Track holidays for 2025',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${cormorant.variable} ${spaceMono.variable} font-serif`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
