import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Rufina } from "next/font/google"
import localFont from "next/font/local"

// Rufina font for body text
const rufina = Rufina({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-rufina',
})

// HK Grotesk for headers (needs to be added to /public/fonts/)
const hkGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/HKGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/HKGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/HKGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-hk-grotesk',
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
    <html lang="en">
      <body className={`${rufina.className} ${rufina.variable} ${hkGrotesk.variable}`}>{children}</body>
    </html>
  )
}
