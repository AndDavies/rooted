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
    <section className="relative min-h-screen flex items-center py-20" style={{ backgroundColor: "#FFF8EB" }}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-[0.02]"
          style={{ backgroundColor: "#317039" }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full opacity-[0.02]"
          style={{ backgroundColor: "#F1BE49" }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left side - Interactive Display */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Main circle - consistent white background for readability */}
              <motion.div
                className="relative w-80 h-80 md:w-96 md:h-96 rounded-full bg-white flex flex-col items-center justify-center p-12 text-center shadow-xl"
                style={{
                  border: `3px solid ${currentPillar ? currentPillar.color : "#d6d3d1"}`,
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <AnimatePresence mode="wait">
                  {currentPillar ? (
                    <motion.div
                      key={activePillar}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      {/* Icon with subtle animation */}
                      <motion.div
                        className="text-5xl mb-2"
                        style={{ color: currentPillar.color }}
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        {currentPillar.icon}
                      </motion.div>

                      {/* Title - colored to match pillar */}
                      <motion.h3
                        className="text-2xl md:text-3xl font-light tracking-tight"
                        style={{ color: currentPillar.color }}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentPillar.title}
                      </motion.h3>

                      {/* Subtitle - consistent readable color */}
                      <p className="text-sm font-medium tracking-wide uppercase text-stone-600">
                        {currentPillar.subtitle}
                      </p>

                      {/* Animated divider - colored to match pillar */}
                      <motion.div
                        className="h-px mx-auto"
                        style={{ backgroundColor: currentPillar.color }}
                        initial={{ width: 0 }}
                        animate={{ width: 48 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />

                      {/* Description - consistent readable color */}
                      <motion.p
                        className="text-stone-700 leading-relaxed text-sm md:text-base max-w-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {currentPillar.description}
                      </motion.p>

                      {/* Subtle pulse indicator */}
                      <motion.div
                        className="flex justify-center space-x-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: currentPillar.color }}
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <motion.div
                        className="text-5xl text-stone-400 mb-4"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        ◯
                      </motion.div>
                      <h2 className="text-2xl md:text-3xl font-light text-stone-800 tracking-tight">
                        The ROOTED Pillars
                      </h2>
                      <p className="text-stone-500 text-sm tracking-wide uppercase">
                        Six Foundations of Transformation
                      </p>
                      <div className="w-16 h-px bg-stone-400 mx-auto"></div>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        Hover over each pillar to explore our comprehensive approach to wellbeing
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Animated outer rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed"
                style={{
                  borderColor: currentPillar ? currentPillar.color : "transparent",
                }}
                initial={{ scale: 1, opacity: 0, rotate: 0 }}
                animate={{
                  scale: currentPillar ? 1.1 : 1,
                  opacity: currentPillar ? 0.3 : 0,
                  rotate: currentPillar ? 360 : 0,
                }}
                transition={{
                  duration: currentPillar ? 8 : 0.6,
                  repeat: currentPillar ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: currentPillar ? currentPillar.color : "transparent",
                }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: currentPillar ? 1.15 : 1,
                  opacity: currentPillar ? 0.1 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Right side - Pillar Navigation */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Header with subtle animation */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-stone-800 tracking-tight">
              What does it mean to{" "}
                <motion.span
                  className="font-normal"
                  style={{ color: "#317039" }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Get ROOTED?
                </motion.span>
              </h2>
              <motion.div
                className="h-px"
                style={{ backgroundColor: "#F1BE49" }}
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <p className="text-stone-700 leading-relaxed">
                Our holistic approach addresses six fundamental pillars of human wellbeing, creating lasting
                transformation from the inside out.
              </p>
            </motion.div>

            {/* Pillars List with enhanced interactions */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setHoveredPillar(index)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  onClick={() => setSelectedPillar(selectedPillar === index ? null : index)}
                  whileHover={{ x: 12 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Background highlight */}
                  <motion.div
                    className="absolute inset-0 rounded-xl -mx-4"
                    style={{
                      backgroundColor:
                        hoveredPillar === index || selectedPillar === index ? pillar.bgHighlight : "transparent",
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: hoveredPillar === index || selectedPillar === index ? 1 : 0,
                      scale: hoveredPillar === index || selectedPillar === index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative flex items-center space-x-4 py-4 px-4">
                    {/* Icon with enhanced animation */}
                    <motion.div
                      className="text-xl transition-colors duration-300"
                      style={{
                        color: hoveredPillar === index || selectedPillar === index ? pillar.color : "#9ca3af",
                      }}
                      animate={{
                        scale: hoveredPillar === index ? 1.3 : 1,
                        rotate: hoveredPillar === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {pillar.icon}
                    </motion.div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        className="text-lg font-normal transition-colors duration-300"
                        style={{
                          color: hoveredPillar === index || selectedPillar === index ? pillar.color : "#57534e",
                        }}
                        animate={{
                          x: hoveredPillar === index ? 4 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {pillar.title}
                      </motion.h3>
                      <p className="text-xs text-stone-500 tracking-wide uppercase">{pillar.subtitle}</p>
                    </div>

                    {/* Enhanced indicator */}
                    <motion.div
                      className="relative"
                      animate={{
                        scale: hoveredPillar === index || selectedPillar === index ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            hoveredPillar === index || selectedPillar === index ? pillar.color : "#d6d3d1",
                        }}
                      />
                      {(hoveredPillar === index || selectedPillar === index) && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: pillar.color }}
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced bottom note */}
            <motion.div
              className="pt-6"
              style={{ borderTop: `1px solid #F1BE49` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-xs text-stone-600 tracking-wide">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Click to pin
                </motion.span>{" "}
                • Hover to explore • Transform with intention
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
