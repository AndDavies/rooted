// PRODUCTION-READY ITINERARY VISUAL MAP
"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FileDown, CalendarCheck, Landmark, Brain, RefreshCw, Sun, HeartHandshake } from "lucide-react";
import Image from "next/image";

import imgDay1 from "@/public/estrella/21.jpg";
import imgDay2 from "@/public/estrella/21.jpg";
import imgDay3 from "@/public/estrella/22.jpg";
import imgDay4 from "@/public/estrella/23.jpg";
import imgDay5 from "@/public/estrella/24.jpg";
import imgDay6 from "@/public/estrella/25.jpg";

type Pillar = "Movement" | "Breath" | "Nutrition" | "Mindset" | "Sleep" | "Joy";

import type { StaticImageData } from "next/image";
const imageMap: Record<string, StaticImageData> = {
  "Day 1": imgDay1,
  "Day 2": imgDay2,
  "Day 3": imgDay3,
  "Day 4": imgDay4,
  "Day 5": imgDay5,
  "Day 6": imgDay6,
};

const iconMap: Record<Pillar, React.ReactNode> = {
  Movement: <RefreshCw className="w-4 h-4" />,
  Breath: <Sun className="w-4 h-4" />,
  Nutrition: <Landmark className="w-4 h-4" />,
  Mindset: <Brain className="w-4 h-4" />,
  Sleep: <CalendarCheck className="w-4 h-4" />,
  Joy: <HeartHandshake className="w-4 h-4" />,
};

const itinerary: {
  day: string;
  title: string;
  theme: string;
  mantra: string;
  pillars: Pillar[];
  highlights: string[];
}[] = [
  {
    day: "Day 1",
    title: "Arrival & Assessment",
    theme: "Grounding & Personalization",
    mantra: "Set your compass inward.",
    pillars: ["Mindset", "Movement", "Sleep", "Breath", "Nutrition"],
    highlights: [
      "1:1 talk with the coaches",
      "Welcome dinner + breathwork"
    ]
  },
  {
    day: "Day 2",
    title: "Reset the System",
    theme: "Detoxify & Regulate",
    mantra: "Let go of what's weighing you down.",
    pillars: ["Movement", "Breath", "Nutrition", "Joy", "Mindset"],
    highlights: [
      "Mobility + breathwork morning session",
      "Guided nature hike to hidden lake",
      "Hot-cold therapy with breathwork"
    ]
  },
  {
    day: "Day 3",
    title: "Release & Rewire",
    theme: "Letting Go of Old Patterns",
    mantra: "What mask am I ready to release?",
    pillars: ["Mindset", "Movement", "Breath", "Sleep", "Nutrition"],
    highlights: [
      "Strength & stability training",
      "Gravel biking adventure",
      "Evening breath session"
      
    ]
  },
  {
    day: "Day 4",
    title: "Clarity & Connection",
    theme: "Purpose, Presence & Leadership",
    mantra: "When do I feel most alive?",
    pillars: ["Mindset", "Breath", "Joy", "Movement", "Nutrition"],
    highlights: [
      "Values & aligned living workshop",
      "Reflection walk + journaling",
      "Fireside connection circle"
    ]
  },
  {
    day: "Day 5",
    title: "Embody & Integrate",
    theme: "Building Your New Operating System",
    mantra: "What’s the next version of me?",
    pillars: ["Joy", "Mindset", "Sleep", "Movement", "Nutrition"],
    highlights: [
      "Energy + mobility training",
      "Personal coaching check-in",
      "Group dinner celebration"
    ]
  },
  {
    day: "Day 6",
    title: "Return & Rise",
    theme: "Transition with Intention",
    mantra: "Leave with clarity. Return with power.",
    pillars: ["Movement", "Joy", "Mindset", "Sleep"],
    highlights: [
      "Integration circle: 'What I’m taking home'",
      "Brunch picnic",
      "Departure + 30-day integration plan"
    ]
  }
];

export default function VisualMap() {
  const containerRef = useRef(null);
  const [activeImage, setActiveImage] = useState<StaticImageData>(imageMap["Day 1"]);


  const tagColors = ["#317039", "#D08C60", "#8C9B5A", "#6C4F57", "#A8B2A1"];
  const dayColors = ["#317039", "#D08C60", "#8C9B5A", "#6C4F57", "#A8B2A1"];

  return (
    <section className="bg-[#fefbe8] py-24 scroll-smooth">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 grid md:grid-cols-12 gap-10">
        {/* Left: Journey */}
        <div ref={containerRef} className="md:col-span-6 space-y-12 relative">
          <div className="absolute right-[-1px] top-0 bottom-0 w-[1px]">
            {itinerary.map((_, i) => (
              <div
                key={i}
                className="h-[calc(100%/6)] w-full"
                style={{ backgroundColor: dayColors[i % dayColors.length], opacity: 0.7 }}
              />
            ))}
          </div>
          <div id="itinerary">
            <h2 className="text-4xl font-light mb-8">
              Retreat Itinerary Journey
              <br />
              <span className="text-[#4A4A4A]/70 text-lg">From mind back into the body</span>
            </h2>
          </div>

          {itinerary.map((day, i) => {
            const dayRef = useRef(null);
            const inView = useInView(dayRef, { amount: 0.5 });

            useEffect(() => {
              if (inView) {
                const timeout = setTimeout(() => {
                  setActiveImage(imageMap[day.day]);
                }, 150);
                return () => clearTimeout(timeout);
              }
            }, [inView, day.day]);

            return (
              <motion.div
                key={i}
                ref={dayRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative pl-8"
              >
                <div
                  className="absolute -left-[11px] top-2 w-5 h-5 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: dayColors[i % dayColors.length] }}
                ></div>
                <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#4A4A4A]/70">{day.day}</div>
                <h3 className="text-xl font-semibold text-[#4A4A4A]">{day.title}</h3>
                <p className="italic text-[#4A4A4A]/70 mb-2">{day.theme}</p>
                <p
                  className="border-l-4 pl-4 italic text-[#4A4A4A]/90 mb-3"
                  style={{ borderColor: dayColors[i % dayColors.length] }}
                >
                  {day.mantra}
                </p>
                <ul className="list-disc pl-6 text-sm text-[#4A4A4A]/80 space-y-1 mb-3">
                  {day.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
                <p className="text-xs font-semibold text-[#4A4A4A]/60 mt-2 mb-1">Pillars of the Day</p>
                <div className="flex gap-2 flex-wrap text-xs text-[#4A4A4A] items-center">
                  {day.pillars.map((p, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-white/80 text-[#2F2F2F] text-xs"
                      style={{
                        border: `1px solid ${tagColors[i % tagColors.length]}`
                      }}
                    >
                      {iconMap[p]} {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          <div className="mt-12">
            <a href="/reset-itinerary.pdf" target="_blank" className="inline-flex items-center gap-2 text-[#D4AF37] text-sm hover:underline">
              <FileDown className="w-4 h-4" /> Download Full Retreat Itinerary
            </a>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-8">
            <h4 className="text-lg font-medium text-[#4A4A4A] mb-4">Ready to Take the Next Step?</h4>
            <p className="text-sm text-[#4A4A4A]/80 mb-6">
              Whether you're curious, ready to commit, or somewhere in between — we're here to guide the conversation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#form"
                className="inline-block bg-[#317039] hover:bg-[#26572d] text-white px-5 py-2 rounded-full text-sm transition"
              >
                Start the Conversation
              </a>
              <a
                href="#form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#CC4B24] hover:bg-[#b43f1f] text-white px-5 py-2 rounded-full text-sm transition"
              >
                Schedule a Call
              </a>
              <a
                href="https://wa.me/12894725592?text=Hi%20there%2C%20I'm%20interested%20in%20the%20ROOTED%20Retreat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] hover:bg-[#1ebd5f] text-white px-5 py-2 rounded-full text-sm transition"
              >
                Message Us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Right: Scroll-Responsive Image */}
        <div className="md:col-span-6 sticky top-24 h-[500px] rounded-lg overflow-hidden shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage.src}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src={activeImage}
                alt={`Retreat day image`}
                width={800}
                height={500}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                className="w-full h-full object-cover transition duration-[3000ms] scale-[1.05]"
                priority={activeImage === imageMap["Day 1"]}
                placeholder="blur"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}