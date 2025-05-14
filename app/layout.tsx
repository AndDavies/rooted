import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"

// Geist font setup
const geist = localFont({
  src: "../public/fonts/Geist-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-geist",
  weight: "100 900", // For variable font
})

export const metadata: Metadata = {
  title: "ROOTED | A Playground of Wellbeing",
  description: "A new way of life that brings you back to your roots.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans">{/* font-sans will be mapped to Geist in tailwind.config.ts */}
        {children}
      </body>
    </html>
  )
}