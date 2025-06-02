import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Bebas_Neue, Rufina } from "next/font/google"
import localFont from "next/font/local"
import Script from 'next/script'
import { Header } from "@/components/header"
import { WaitlistPopup } from "@/components/WaitlistPopup"
import { WaitlistPopupProvider } from "@/components/WaitlistPopupContext"

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

// Playfair Display font setup (replacing sage font)
const playfairFont = localFont({
  src: "../public/fonts/PlayfairDisplay-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-playfair",
  weight: "400 900", // Variable font supports full weight range
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.therootedway.co'), // IMPORTANT: Replace with your actual domain
  title: {
    default: "ROOTED | A Playground of Wellbeing",
    template: `%s | Rooted Executive Retreats`, // Allows individual pages to set their title part
  },
  description: "Discover a new way of life that brings you back to your roots. Explore wellbeing, mindfulness, and personal growth with Rooted Executive Retreats.",
  generator: 'Next.js', // Updated generator
  openGraph: {
    title: 'ROOTED | A Playground of Wellbeing',
    description: 'Discover a new way of life that brings you back to your roots. Explore wellbeing, mindfulness, and personal growth with Rooted Executive Retreats.',
    url: 'https://www.therootedway.co', // IMPORTANT: Replace with your actual domain
    siteName: 'Rooted Executive Retreats',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROOTED | A Playground of Wellbeing',
    description: 'Discover a new way of life that brings you back to your roots. Explore wellbeing, mindfulness, and personal growth with Rooted Executive Retreats.',
    // siteId: '@YourTwitterID', // IMPORTANT: Replace with your Twitter ID if available
    creator: '@YourTwitterHandle', // IMPORTANT: Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico', // Link to your favicon in the public folder
  //   shortcut: '/icons/favicon-16x16.png', // Example path
  //   apple: '/icons/apple-touch-icon.png',    // Example path
  },
  // manifest: '/site.webmanifest', // Ensure this file exists in /public
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${glacial.variable} ${geist.variable} ${bebasNeue.variable} ${rufina.variable} ${hkGrotesk.variable} ${playfairFont.variable}`}>
      <body className="font-sans antialiased"> {/* font-sans will be Geist, antialiased for smoother fonts */}
        <WaitlistPopupProvider>
          <Header />
          {children}
          <WaitlistPopup />
        </WaitlistPopupProvider>
        
        {/* Google Analytics Tag */}
        <Script 
          strategy="afterInteractive" 
          src="https://www.googletagmanager.com/gtag/js?id=G-0ZZ8GGQTKE"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0ZZ8GGQTKE');
          `}
        </Script>
      </body>
    </html>
  )
}