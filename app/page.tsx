import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-gray-400" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            ROOTED
          </h1>
          <p className="text-white/90 mt-4 max-w-md text-sm md:text-base">
            A new way of life that brings you back to your roots. This journey will help you find your way back to the
            simplicity of existing fully.
          </p>
        </div>
      </section>

      {/* Section 01 */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#f5f5f0] p-8 md:p-12 flex flex-col justify-center">
          <span className="text-[#c0c0b0] text-lg font-light">01</span>
          <h2 className="text-xl md:text-2xl font-medium mt-4 text-gray-800">
            A Playground
            <br />
            of wellbeing
          </h2>
          <p className="mt-4 text-sm text-gray-600 max-w-md">
            We believe in creating spaces where individuals can explore and nurture their wellbeing in a natural,
            supportive environment. Our approach combines ancient wisdom with modern practices.
          </p>
        </div>
        <div className="relative h-[250px] md:h-auto">
          <Image
            src="/placeholder.svg?height=500&width=800"
            alt="Hands holding a small plant"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Section 02 */}
      <section className="bg-[#f5f5f0] p-8 md:p-12">
        <span className="text-[#c0c0b0] text-lg font-light">02</span>
        <h2 className="text-xl md:text-2xl font-medium mt-4 text-gray-800">
          The Foundation
          <br />
          of Rooted
        </h2>

        {/* Four Elements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="relative h-[120px] md:h-[150px] group overflow-hidden">
            <div className="absolute inset-0 bg-gray-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
            <div className="absolute bottom-4 left-4 text-white font-medium">Wood</div>
          </div>

          <div className="relative h-[120px] md:h-[150px] group overflow-hidden">
            <div className="absolute inset-0 bg-gray-400" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
            <div className="absolute bottom-4 left-4 text-white font-medium">Earth</div>
          </div>

          <div className="relative h-[120px] md:h-[150px] group overflow-hidden">
            <div className="absolute inset-0 bg-gray-600" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
            <div className="absolute bottom-4 left-4 text-white font-medium">Pebble</div>
          </div>

          <div className="relative h-[120px] md:h-[150px] group overflow-hidden">
            <div className="absolute inset-0 bg-gray-300" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
            <div className="absolute bottom-4 left-4 text-white font-medium">Water</div>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500 max-w-3xl">
          Finding something for the first time is a "return." We've been on a journey to discover what makes us whole.
          Through it all, we've found that the simplest practices are often the most profound. Join us as we explore the
          elements that connect us to ourselves and to nature.
        </p>
      </section>

      {/* Quote Section */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[250px] md:h-auto">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Person with arms raised"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <blockquote className="text-xl md:text-2xl font-light italic text-gray-800">
            "When I let go of what I am, I become what I might be"
          </blockquote>
          <cite className="mt-4 text-sm text-gray-600">- Lao Tzu</cite>
        </div>
      </section>

      {/* Wu Wei Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 bg-[#f5f5f0]">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-medium text-gray-800">Wu Wei</h2>
          <p className="text-lg font-light mt-2 text-gray-700">
            The art of
            <br />
            effortless living
          </p>
          <p className="mt-4 text-sm text-gray-600 max-w-md">
            Wu Wei teaches us to align with the natural flow of life. When we stop forcing and start flowing, we
            discover a profound sense of peace and purpose.
          </p>
        </div>
        <div className="bg-white p-8 md:p-12">
          {/* This appears to be empty or contain content not visible in the image */}
        </div>
      </section>
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
  )
}
