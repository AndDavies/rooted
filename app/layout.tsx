import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Bebas_Neue, Rufina, Cinzel } from "next/font/google"
import localFont from "next/font/local"
import Script from 'next/script'
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import { WaitlistPopup } from "@/components/WaitlistPopup"
import { WaitlistPopupProvider } from "@/components/WaitlistPopupContext"
import { ConsentBanner } from "@/components/ConsentBanner"
import WhatsAppButton from '@/components/WhatsAppButton'

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

// Cinzel font setup
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // Cinzel supports multiple weights
  display: "swap",
  variable: "--font-cinzel",
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
    default: "The ROOTED Way - Live with alignment. Lead with clarity.",
    template: `%s | The ROOTED Way`, // Allows individual pages to set their title part
  },
  description: "ROOTED helps high-achieving leaders recalibrate before burnout strikes, using science-backed methods, mindful practices, and community support to restore clarity, vitality, and authentic alignment.",
  generator: 'Next.js', // Updated generator
  openGraph: {
    title: 'The ROOTED Way - Live with alignment. Lead with clarity.',
    description: 'ROOTED helps high-achieving leaders recalibrate before burnout strikes, using science-backed methods, mindful practices, and community support to restore clarity, vitality, and authentic alignment.',
    url: 'https://www.therootedway.co', // IMPORTANT: Replace with your actual domain
    siteName: 'The ROOTED Way',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The ROOTED Way - Live with alignment. Lead with clarity.',
    description: 'ROOTED helps high-achieving leaders recalibrate before burnout strikes, using science-backed methods, mindful practices, and community support to restore clarity, vitality, and authentic alignment.',
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
    <html lang="en" className={`${glacial.variable} ${geist.variable} ${bebasNeue.variable} ${rufina.variable} ${hkGrotesk.variable} ${playfairFont.variable} ${cinzel.variable}`}>
      <head>
        {/* Google Consent Mode v2 - Load before any other tracking scripts */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Set default consent states
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted'
            });
          `}
        </Script>
      </head>
      <body className="font-sans antialiased"> {/* font-sans will be Geist, antialiased for smoother fonts */}
        <WaitlistPopupProvider>
        <Header />
        {children}
          <Footer />
          <div>
            <WhatsAppButton />
          </div>
          <WaitlistPopup />
          <ConsentBanner />
        </WaitlistPopupProvider>

        {/* Google Analytics - will respect consent mode */}
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}