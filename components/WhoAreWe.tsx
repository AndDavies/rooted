"use client"
import Image from "next/image"

interface Founder {
  id: string
  name: string
  imageSrc: string
  story: string
}

const foundersData: Founder[] = [
  {
    id: "andrew",
    name: "Andrew Davies",
    imageSrc: "/whoarewe/andrew.jpg",
    story:
      "After hitting his rock bottom, facing a medical release from the military and an emotional breakdown, Andrew reinvented himself with the help of long distance running, breathwork & strength training. He is now following his passion to help others do the same.",
  },
  {
    id: "ashley",
    name: "Ashley Orser",
    imageSrc: "/whoarewe/ashley.jpg",
    story:
      "15 years climbing the corporate ladder while navigating deep inner misalignment. At 40, she made the bold move to quit her job and move abroad. Now she's finding her calling of helping others break free of the patterns that keep them stuck.",
  },
  {
    id: "zeger",
    name: "Zeger Schoenmaker",
    imageSrc: "/whoarewe/zeger.jpg",
    story:
      "Early in life, Zeger left the comforts of home to train with Shaolin monks in Spartan conditions, marking the beginning of his path as a modern warrior. His electric energy is the spark behind Rooted.",
  },
]

export function WhoAreWe() {
  return (
    <section id="who-are-we" className="py-20 md:py-28 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4">Who Are We</h2>
          <div className="w-16 h-px bg-stone-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {foundersData.map((founder) => (
            <div key={founder.id} className="bg-white overflow-hidden">
              {/* Image with hover effect limited to the image */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={founder.imageSrc || "/placeholder.svg"}
                  alt={`${founder.name} portrait`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 ease-in-out hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name */}
                <h3 className="text-xl font-normal text-stone-800 mb-3">{founder.name}</h3>

                {/* Minimal divider */}
                <div className="w-8 h-px bg-stone-200 mb-4"></div>

                {/* Story */}
                <p className="text-stone-600 text-sm leading-relaxed">{founder.story}</p>
              </div>
            </div>
          ))}
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
