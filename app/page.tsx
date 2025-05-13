import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Section1 } from "@/components/section1"
import { Section2 } from "@/components/section2"
import { Section3 } from "@/components/section3"


export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero />

        {/* Section 01 */}
        <Section1 />

        {/* Section 02 */}
        <Section2 />

        {/* Section 03 */}
        <Section3 />

        {/* Section 04 */}
        

        <footer className="py-8 bg-[#f5f5f0] border-t border-[#e6e6dc]">
          <div className="px-8 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-xl font-medium text-gray-800 tracking-wide">
                  <span className="text-[#c0c0b0]">&#x2022;</span>ROOTED
                </h1>
              </div>

              <div className="flex space-x-8">
                <Link href="#" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  About
                </Link>
                <Link href="#" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  Elements
                </Link>
                <Link href="#" className="text-xs tracking-wider text-[#c0c0b0] hover:text-gray-800 transition-colors">
                  Contact
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
