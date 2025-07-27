import Image from "next/image"
import Link from "next/link"
import type { Metadata } from 'next'

import { Hero } from "@/components/hero"
import { RetreatShowcase } from "@/components/RetreatShowcase"
import { WhyRooted } from "@/components/whyRooted"
import { AboutUs } from "@/components/AboutUs"
import { Program } from "@/components/program"
import { FeaturedBlog } from "@/components/FeaturedBlog"
import { WhoAreWe } from "@/components/WhoAreWe"
import { UpComingEvents } from "@/components/UpComingEvents"
import { Interested } from "@/components/Interested"

// Added metadata for the homepage
export const metadata: Metadata = {
  title: "The ROOTED Way | Reclaim Your Vitality and Purpose",
  description: "ROOTED helps high-achieving leaders recalibrate before burnout strikes. Science-backed methods, mindful practices, and supportive community to restore clarity, strength, and authentic alignment.",
  openGraph: {
    title: "The ROOTED Way | Reclaim Your Vitality and Purpose",
    description: "ROOTED helps high-achieving leaders recalibrate before burnout strikes. Join a supportive community using science-backed methods and timeless practices to restore vitality and authentic leadership.",
    url: '/',
  },
  twitter: {
    title: "The ROOTED Way | Reclaim Your Vitality and Purpose",
    description: "Reconnect with purpose and reclaim your vitality. ROOTED provides science-backed practices, mindful disciplines, and community support to prevent burnout and enhance sustainable performance.",
  },
};

export default function Home() {
  return (
    <>
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero />
        <RetreatShowcase />

        <AboutUs />
    
        <Program />

        <WhyRooted />
        
        <UpComingEvents />
        
        <WhoAreWe />
    
        <FeaturedBlog />

        <Interested />

      </main>
    </>
  )
}