import Image from "next/image"
import Link from "next/link"
import type { Metadata } from 'next'

import { Hero } from "@/components/hero"
// import { Section1 } from "@/components/section1"
import { Section2 } from "@/components/section2"
import { Section3 } from "@/components/section3"
import { Section4 } from "@/components/section4"
import { WhyRooted } from "@/components/whyRooted"
import { Section5 } from "@/components/section5"
import { Section6 } from "@/components/section6"
import { AboutUs } from "@/components/AboutUs"
import { Program } from "@/components/program"
import { FeaturedBlog } from "@/components/FeaturedBlog"
import { WhoAreWe } from "@/components/WhoAreWe"
import { UpComingEvents } from "@/components/UpComingEvents"
import { Interested } from "@/components/Interested"

// Added metadata for the homepage
export const metadata: Metadata = {
  title: "Home | Rooted Executive Retreats",
  description: "Welcome to Rooted Executive Retreats. Start your journey towards wellbeing, mindfulness, and personal growth with our innovative programs and insights.",
  openGraph: {
    title: "Home | Rooted Executive Retreats",
    description: "Welcome to Rooted Executive Retreats. Start your journey towards wellbeing, mindfulness, and personal growth with our innovative programs and insights.",
    url: '/',
  },
  twitter: {
    title: "Home | Rooted Executive Retreats",
    description: "Welcome to Rooted Executive Retreats. Start your journey towards wellbeing, mindfulness, and personal growth with our innovative programs and insights.",
  },
};

export default function Home() {
  return (
    <>
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero />

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