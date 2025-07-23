

"use client";

import { useState } from "react";
import clsx from "clsx";

type Phase = {
  id: string;
  title: string;
  subtitle: string;
  highlights: string[];
};

const phases: Phase[] = [
  {
    id: "before",
    title: "Before You Arrive",
    subtitle: "Reveal + Reclaim",
    highlights: [
      "Optional bloodwork (inflammation, hormones, micronutrients)",
      "HRV, sleep, and stress tracking",
      "A personal inventory across our six ROOTED pillars",
      "Guided reflection: what's been running the show — and what’s ready to shift?"
    ]
  },
  {
    id: "during",
    title: "On the Ground",
    subtitle: "Reset + Rewire",
    highlights: [
      "Breath and nervous system training",
      "Daily strength and mobility sessions",
      "Food-as-ritual meals that fuel and restore",
      "Cold exposure and sauna therapy",
      "Mindset and values alignment",
      "Structured reflection — not just to process, but to reset"
    ]
  },
  {
    id: "after",
    title: "When You Return",
    subtitle: "Rise + Rebuild",
    highlights: [
      "Tailored 90-day integration plan",
      "Regular check-ins with our team",
      "Post-retreat coaching platform access",
      "Ongoing community connection"
    ]
  }
];

export default function Timeline() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-light text-center mb-10">The ROOTED Journey</h2>

        <div className="overflow-x-auto">
          <div className="flex gap-6 w-max pb-6">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className={clsx(
                  "relative min-w-[250px] max-w-[340px] flex-shrink-0 bg-[#fefbe8] border border-[#d4af37] rounded-xl px-6 py-4 transition-all shadow-sm hover:shadow-md cursor-pointer",
                  activeId === phase.id && "bg-white shadow-lg border-[#caa63c]"
                )}
                onClick={() => toggleExpand(phase.id)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#4a4a4a]">{phase.title}</h3>
                  <p className="text-sm text-[#4a4a4a]/70">{phase.subtitle}</p>
                </div>

                {activeId === phase.id && (
                  <div className="mt-4 text-sm text-[#4a4a4a]/80 space-y-2">
                    <ul className="list-disc pl-5">
                      {phase.highlights.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}