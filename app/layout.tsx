import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Bebas_Neue, Rufina } from "next/font/google"
import localFont from "next/font/local"
import Script from 'next/script'
import { Header } from "@/components/header"

// Geist font setup
const geist = localFont({
  src: "../public/fonts/Geist-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-geist",
  weight: "100 900", // For variable font
})

// Glacial Indifference font setup
const glacial = localFont({
  src: [
    {
      path: "../public/fonts/GlacialIndifference-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GlacialIndifference-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/GlacialIndifference-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-glacial",
})

// Bebas Neue font setup
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"], // Bebas Neue typically comes in specific weights, 400 for regular/bold
  display: "swap",
  variable: "--font-bebas-neue",
})

// Rufina font setup
const rufina = Rufina({
  subsets: ["latin"],
  weight: ["400", "700"], // For regular and bold
  display: "swap",
  variable: "--font-rufina",
})

// HK Grotesk local font setup
const hkGrotesk = localFont({
  src: [
    { path: "../public/fonts/HKGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/HKGrotesk-Bold.woff2", weight: "700", style: "normal" },
    // Add other weights/styles if needed
  ],
  display: "swap",
  variable: "--font-hk-grotesk",
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
    <html lang="en" className={`${glacial.variable} ${geist.variable} ${bebasNeue.variable} ${rufina.variable} ${hkGrotesk.variable}`}>
      <body className="font-sans antialiased"> {/* font-sans will be Geist, antialiased for smoother fonts */}
        <Header />
        {children}
        {/* MailerLite Universal Script */}
        <Script id="mailerlite-universal" strategy="afterInteractive">
          {`
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '1529443');
          `}
        </Script>
      </body>
    </html>
  )
}