"use client"
import Image from "next/image"
import { scrollToElement } from '@/lib/scroll'

interface ProgramStage {
  id: string
  title: string
  imageSrc: string
  description: string
}

const programStagesData: ProgramStage[] = [
  {
    id: "connect",
    title: "Connect",
    imageSrc: "/connect.jpg",
    description:
      "Set up an onboarding call with a ROOTED coach, establish your timeline, implement new protocols and tap into the ROOTED community.",
  },
  {
    id: "reset",
    title: "Reset",
    imageSrc: "/reset.jpg",
    description:
      "Join a ROOTED reset to reconnect with yourself - body, mind and spirit. Let us customize a retreat program for your unique needs to rebalance your nervous system, reset your metabolism and regulate hormones.",
  },
  {
    id: "grow",
    title: "Grow",
    imageSrc: "/grow.jpg",
    description:
      "Join fellow alumni and become a ROOTED mentor - deepen your journey within by passing it on and guiding others.",
  },
]

export function Program() {
  const handleScrollToInterested = () => {
    scrollToElement('interested');
  };

  return (
    <section id="program" className="py-20 md:py-28 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4">A systematic approach to wellbeing</h2>
          <div className="w-16 h-px bg-stone-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {programStagesData.map((stage, index) => (
            <div key={stage.id} className="bg-white overflow-hidden">
              {/* Image with hover effect limited to the image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={stage.imageSrc || "/placeholder.svg"}
                  alt={`${stage.title} stage`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 ease-in-out hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stage number */}
                <div className="mb-4 text-xs font-light tracking-widest text-stone-400">STAGE {index + 1}</div>

                {/* Title */}
                <h3 className="text-xl font-normal text-stone-800 mb-3">{stage.title}</h3>

                {/* Minimal divider */}
                <div className="w-8 h-px bg-stone-200 mb-4"></div>

                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleScrollToInterested}
            className="inline-flex items-center px-6 py-3 bg-[#D4AF37] hover:bg-[#B8941F] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
          >
            I'm Interested
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Minimal footer element */}
        <div className="flex justify-center mt-16">
          <div className="w-1 h-1 bg-stone-300 rounded-full mx-1"></div>
          <div className="w-1 h-1 bg-stone-300 rounded-full mx-1"></div>
          <div className="w-1 h-1 bg-stone-300 rounded-full mx-1"></div>
        </div>
      </div>
    </section>
  )
}
