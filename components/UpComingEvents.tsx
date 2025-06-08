"use client"
import { useState, useRef } from "react"
import Image from "next/image"

interface Event {
  id: string
  tag: string
  title: string
  location: string
  dates: string
  price: string
  imageSrc: string
}

const eventsData: Event[] = [
  {
    id: "event-1",
    tag: "Group Event",
    title: "30 day gut reset",
    location: "Virtual",
    dates: "TBD",
    price: "No Cost",
    imageSrc: "/events/gut_reset.jpg",
  },
  {
    id: "event-2",
    tag: "Group Event",
    title: "30 min morning movement challenge",
    location: "Virtual", 
    dates: "TBD",
    price: "No Cost",
    imageSrc: "/events/movement_challenge.jpg",
  },
  {
    id: "event-3",
    tag: "Group Event",
    title: "21 days of Abundance - Meditation Series",
    location: "Virtual",
    dates: "TBD", 
    price: "No Cost",
    imageSrc: "/events/meditation_challenge.jpg",
  },

]

export function UpComingEvents() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 0
      const gap = 24 // 1.5rem gap converted to px
      const scrollPosition = index * (cardWidth + gap)
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    const newIndex = currentIndex === eventsData.length - 1 ? 0 : currentIndex + 1
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? eventsData.length - 1 : currentIndex - 1
    scrollToIndex(newIndex)
  }

  return (
    <section id="upcoming-events" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4">Upcoming Events</h2>
          <div className="w-16 h-px bg-stone-300 mx-auto"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110"
            aria-label="Previous event"
          >
            <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 hover:scale-110"
            aria-label="Next event"
          >
            <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {eventsData.map((event) => (
                             <div
                 key={event.id}
                 className="flex-shrink-0 w-[300px] md:w-[350px] h-[450px] md:h-[500px] relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
               >
                 {/* Background Image */}
                 <Image
                   src={event.imageSrc || "/placeholder.svg"}
                   alt={event.title}
                   fill
                   style={{ objectFit: "cover" }}
                   className="transition-transform duration-500 ease-out group-hover:scale-110"
                 />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                  {/* Tag */}
                  <div className="self-start">
                    <span className="inline-block px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium tracking-wider border border-white/20">
                      {event.tag}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-4">
                                         {/* Title */}
                     <h3 className="text-xl md:text-2xl font-light italic text-white leading-tight">
                       {event.title}
                     </h3>

                    {/* Location */}
                    <p className="text-xl font-light text-white/90">
                      {event.location}
                    </p>

                    {/* Date and Price Row */}
                    <div className="flex items-center justify-between pt-4">
                      {/* Date with Calendar Icon */}
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-white/90">
                          {event.dates}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <span className="text-sm font-bold text-white">
                          {event.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {eventsData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-stone-800 w-8' 
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
