import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
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

export default function Home() {
  return (
    <>
      <Header />
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

        <footer className="py-8 bg-[#f5f5f0] border-t border-[#e6e6dc]">
          <div className="px-8 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-xl font-medium text-gray-800 tracking-wide">
                  <span className="text-[#c0c0b0]">•</span>ROOTED
                </h1>
              </div>
              <div className="flex space-x-8">
                <Link href="#solution" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  The Method
                </Link>
                <Link href="#experience" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  The Retreat
                </Link>
                <Link href="#impact" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  The Tribe
                </Link>
                <Link href="#booking" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
            <div className="mt-8 text-center text-xs text-[#c0c0b0]">
              © {new Date().getFullYear()} Rooted. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}