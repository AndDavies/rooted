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

// Added metadata for the homepage
export const metadata: Metadata = {
  title: "Home | Rooted Survey",
  description: "Welcome to Rooted Survey. Start your journey towards wellbeing, mindfulness, and personal growth with our innovative programs and insights.",
  openGraph: {
    title: "Home | Rooted Survey",
    description: "Welcome to Rooted Survey. Start your journey towards wellbeing, mindfulness, and personal growth with our innovative programs and insights.",
    url: '/',
  },
  twitter: {
    title: "Home | Rooted Survey",
    description: "WWWWelcome to Rooted Survey. Start your journey towards wellbeing, mindfulness, and personal growth with our innovative programs and insights.",
  },
};

export default function Home() {
  return (
    <>
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero />
        
        {/* Section 01: The Foundation */}
        {/* <Section1 /> */}

        {/* Section 02: The Problem (Current Section 2) */}
        <AboutUs />
        <Program />

        {/* Section 03: The Method (Formerly Section 3, now correctly placed) */}
        {/* <Section3 id="solution" /> */}

        <WhyRooted />
        <Section2 />
        {/* Section 04: The Retreat (Formerly Section 4, now correctly placed) */}
        {/* <Section4 id="experience" /> */}



        {/* Section 06: Secure Your Spot (Booking) */}
        {/* <Section6 id="booking" /> */}


      </main>
    </>
  )
}