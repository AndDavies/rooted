"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function WhyRooted() {
  // State to track which pillar is being hovered
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)

  // Pillars data with colors
  const pillars = [
    {
      title: "Breathing",
      description:
        "Harness the power of breathwork (e.g., Wim Hof Method) to reduce stress, boost energy, and regulate your nervous system.",
      color: "#317039", // Emerald Green
    },
    {
      title: "Sleep Optimization",
      description:
        "Improve sleep quality with biometric tracking and expert-led workshops, addressing the 49% of leaders facing restless sleep.",
      color: "#F1BE49", // Maximum Yellow
    },
    {
      title: "Nutrition",
      description:
        "Fuel your body with anti-inflammatory, chef-designed meals tailored to your biometric profile, using Madeira's fresh ingredients.",
      color: "#FBEDD9", // Antique White
    },
    {
      title: "Movement and Training",
      description:
        "Build resilience through trail running, HIIT, and free diving, balancing high-intensity activation with mindful movement.",
      color: "#CC4824", // Dark Pastel Red
    },
    {
      title: "Mindset and Focus",
      description:
        "Enhance clarity and decision-making (97% report improvement) with meditation, vision quests, and 1:1 coaching.",
      color: "#FFF1D4", // Papaya Whip
    },
    {
      title: "Relaxation and Joy",
      description:
        "Rediscover joy through nature immersion, yin yoga, and surfing, fostering emotional balance and connection.",
      color: "#FFF8EB", // Cosmic Latte
    },
  ]

  // Get current pillar data or default
  const currentPillar = hoveredPillar !== null ? pillars[hoveredPillar] : null

  // Determine text color based on background color brightness
  const getTextColor = (bgColor: string) => {
    // Convert hex to RGB
    const r = Number.parseInt(bgColor.slice(1, 3), 16)
    const g = Number.parseInt(bgColor.slice(3, 5), 16)
    const b = Number.parseInt(bgColor.slice(5, 7), 16)

    // Calculate brightness (simplified formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    // Return black for light backgrounds, white for dark
    return brightness > 155 ? "#333333" : "#FFFFFF"
  }

  return (
    <section className="relative bg-gray-900 min-h-screen flex items-center py-16">
      {/* Background Image Overlay */}
      <div className="absolute top-0 right-0 h-full w-full pointer-events-none">
        <Image
          src="/nautilus_shell_bg.png"
          alt="Nautilus shell background overlay"
          layout="fill"
          objectFit="cover"
          objectPosition="right center"
          className="opacity-5"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Interactive Circle */}
          <div className="flex justify-center order-2 lg:order-1">
            <motion.div
              className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full flex flex-col items-center justify-center p-8 md:p-16 text-center transition-all duration-500"
              style={{
                backgroundColor: currentPillar ? currentPillar.color : "#317039",
                color: currentPillar ? getTextColor(currentPillar.color) : "#FFFFFF",
              }}
              initial={{ scale: 0.9 }}
              animate={{
                scale: 1,
                backgroundColor: currentPillar ? currentPillar.color : "#317039",
              }}
              transition={{ duration: 0.5 }}
            >
              {currentPillar ? (
                <>
                  <h3 className="text-2xl md:text-3xl font-medium mb-4 text-shadow-hero-h1">{currentPillar.title}</h3>
                  <p className="text-sm md:text-base">{currentPillar.description}</p>
                </>
              ) : (
                <h2 className="text-3xl md:text-4xl font-medium text-shadow-hero-h1">The Rooted Pillars</h2>
              )}
            </motion.div>
          </div>

          {/* Right side - Pillar List */}
          <div className="lg:pl-8 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl text-white font-medium mb-12 text-shadow-hero-h1">The Rooted Pillars</h2>

            <div className="space-y-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  className="border-l-2 border-dotted pl-4 py-2 cursor-pointer transition-all duration-500"
                  style={{
                    borderColor: hoveredPillar === index ? pillar.color : "#FFF8EB", // Cosmic Latte for non-hovered
                  }}
                  onMouseEnter={() => setHoveredPillar(index)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  whileHover={{ x: 5 }}
                >
                  <h3
                    className="font-medium text-lg md:text-xl mb-1 transition-colors duration-500 text-shadow-hero-h1 tracking-tight"
                    style={{
                      color: hoveredPillar === index ? pillar.color : "white",
                    }}
                  >
                    {pillar.title}
                  </h3>
                  {/* <p className="text-sm text-gray-400 hidden md:block">{pillar.description.substring(0, 60)}...</p> */}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
