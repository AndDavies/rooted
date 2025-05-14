import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Section1 } from "@/components/section1"
import { Section2 } from "@/components/section2"
import { Section3 } from "@/components/section3"
import { Section4 } from "@/components/section4"
import { Section8 } from "@/components/section8"
import { Section5 } from "@/components/section5"
import { Section6 } from "@/components/section6"
import { Section7 } from "@/components/section7"
import { Section10 } from "@/components/section10"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero />

        {/* Section 01: The Foundation */}
        <Section1 />

        {/* Section 02: The Method */}
        <Section2 />

        {/* Section 03: Meet Our Organizers */}
        <Section3 />

        {/* Section 04: Rooted Tribe */}
        <Section4 />

        {/* Section 05: Pricing */}
        <Section8 /> 

        {/* Section 06: Retreat Experience */}
        <Section6 />

        {/* Section 07: Testimonials */}
        <Section7 />

        {/* Section 10: Contact */}
        <Section10 />

        <footer className="py-8 bg-[#f5f5f0] border-t border-[#e6e6dc]">
          <div className="px-8 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-xl font-medium text-gray-800 tracking-wide">
                  <span className="text-[#c0c0b0]">•</span>ROOTED
                </h1>
              </div>
              <div className="flex space-x-8">
                <Link href="#foundation" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  The Foundation
                </Link>
                <Link href="#method" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  The Method
                </Link>
                <Link href="#who" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  Who Are We
                </Link>
                <Link href="#reflect" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  Reflect
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