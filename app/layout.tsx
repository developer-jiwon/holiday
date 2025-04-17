import type { Metadata } from 'next'
import './globals.css'
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
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
      <body className={`${merriweather.variable} font-serif`}>{children}</body>
    </html>
  )
}
