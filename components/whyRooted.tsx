"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function WhyRooted() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null)

  const pillars = [
    {
      title: "Breath",
      subtitle: "Nervous System Regulation",
      description:
        "Harness the power of breathwork to reduce stress, boost energy, and regulate your nervous system through proven techniques.",
      icon: "○",
      color: "#317039", // Emerald Green
      bgHighlight: "#FFF8EB", // Cosmic Latte for subtle background
    },
    {
      title: "Sleep",
      subtitle: "Recovery & Restoration",
      description:
        "Improve sleep quality with biometric tracking and expert-led workshops, addressing the foundation of wellbeing.",
      icon: "◐",
      color: "#F1BE49", // Maximum Yellow
      bgHighlight: "#FFF1D4", // Papaya Whip
    },
    {
      title: "Nutrition",
      subtitle: "Cellular Nourishment",
      description:
        "Fuel your body with anti-inflammatory, chef-designed meals tailored to your unique biometric profile.",
      icon: "●",
      color: "#CC4824", // Dark Pastel Red
      bgHighlight: "#FBEDD9", // Antique White
    },
    {
      title: "Movement",
      subtitle: "Physical Resilience",
      description:
        "Build strength and resilience through mindful movement, balancing high-intensity activation with recovery.",
      icon: "◑",
      color: "#317039", // Emerald Green
      bgHighlight: "#FFF8EB", // Cosmic Latte
    },
    {
      title: "Mindset",
      subtitle: "Mental Clarity",
      description:
        "Enhance clarity and decision-making through meditation, coaching, and transformative mindset practices.",
      icon: "◒",
      color: "#F1BE49", // Maximum Yellow
      bgHighlight: "#FFF1D4", // Papaya Whip
    },
    {
      title: "Joy",
      subtitle: "Emotional Balance",
      description:
        "Rediscover joy through nature immersion and practices that foster emotional balance and authentic connection.",
      icon: "◓",
      color: "#CC4824", // Dark Pastel Red
      bgHighlight: "#FBEDD9", // Antique White
    },
  ]

  const activePillar = selectedPillar !== null ? selectedPillar : hoveredPillar
  const currentPillar = activePillar !== null ? pillars[activePillar] : null

  return (
    <section className="py-16" style={{ backgroundColor: "#FFF8EB" }}>
      {/* Mobile / Small screens -> Accordion style */}
      <div className="container mx-auto px-4 max-w-3xl md:hidden">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-stone-800 mb-8 text-center leading-tight px-2">
          The <span className="font-normal text-[#317039]">ROOTED</span> Pillars
        </h2>

        <div className="space-y-4">
          {pillars.map((pillar, index) => (
            <div key={index} className="border border-[#f1e8d8] rounded-xl">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 sm:px-6 focus:outline-none"
                onClick={() => setSelectedPillar(selectedPillar === index ? null : index)}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-lg" style={{ color: pillar.color }}>
                    {pillar.icon}
                  </span>
                  <span className="text-left">
                    <span className="block text-base font-medium" style={{ color: pillar.color }}>
                      {pillar.title}
                    </span>
                    <span className="block text-xs uppercase text-stone-500">
                      {pillar.subtitle}
                    </span>
                  </span>
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedPillar === index ? pillar.color : "#d6d3d1" }}
                />
              </button>

              <AnimatePresence initial={false}>
                {selectedPillar === index && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: "auto", opacity: 1 },
                      collapsed: { height: 0, opacity: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="px-4 pb-4 sm:px-6 text-base text-stone-700 leading-relaxed"
                  >
                    {pillar.description}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop / Medium+ screens -> Circle interactive layout */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Circle display */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative">
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-white flex flex-col items-center justify-center p-12 text-center shadow-xl overflow-hidden"
                style={{ border: `4px solid ${currentPillar ? currentPillar.color : '#d6d3d1'}` }}
              >
                {currentPillar ? (
                  <>
                    <div className="text-5xl mb-2" style={{ color: currentPillar.color }}>
                      {currentPillar.icon}
                    </div>
                    <h3 className="text-3xl font-light mb-1" style={{ color: currentPillar.color }}>
                      {currentPillar.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-stone-600 mb-2">
                      {currentPillar.subtitle}
                    </p>
                    <div className="w-12 h-px bg-stone-400 mx-auto my-2" />
                    <p className="text-stone-700 text-sm leading-relaxed max-w-xs">
                      {currentPillar.description}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl text-stone-400 mb-4">◯</div>
                    <h3 className="text-2xl font-light">The ROOTED Pillars</h3>
                    <p className="text-xs uppercase text-stone-500 mb-2">Six Foundations of Transformation</p>
                    <p className="text-stone-600 text-sm leading-relaxed max-w-xs">
                      Hover over each pillar to explore our comprehensive approach to wellbeing
                    </p>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          {/* Pillar list */}
          <div className="order-1 lg:order-2 space-y-4">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="cursor-pointer px-4 py-3 rounded-lg flex items-center space-x-4 hover:bg-[#FBEDD9]"
                onMouseEnter={() => setHoveredPillar(index)}
                onMouseLeave={() => setHoveredPillar(null)}
                onClick={() => setSelectedPillar(selectedPillar === index ? null : index)}
              >
                <span className="text-xl" style={{ color: (hoveredPillar === index || selectedPillar === index) ? pillar.color : '#9ca3af' }}>
                  {pillar.icon}
                </span>
                <div className="flex-1">
                  <h4 className="font-medium" style={{ color: (hoveredPillar === index || selectedPillar === index) ? pillar.color : '#57534e' }}>
                    {pillar.title}
                  </h4>
                  <p className="text-xs uppercase text-stone-500">{pillar.subtitle}</p>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: (hoveredPillar === index || selectedPillar === index) ? pillar.color : '#d6d3d1' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
