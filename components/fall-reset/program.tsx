

"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

const phases = [
  {
    id: "before",
    title: "Before You Arrive",
    subtitle: "Reveal + Reclaim",
    summary:
      "Your reset begins the moment you say yes. Before arrival, you’ll move through a short but powerful intake that brings your baseline into focus.",
    content: [
      "Optional bloodwork (inflammation, hormones, micronutrients)",
      "HRV, sleep, and stress tracking",
      "A personal inventory across our six ROOTED pillars",
      "A guided reflection to ask: what’s been running the show — and what’s ready to shift?"
    ]
  },
  {
    id: "during",
    title: "On the Ground",
    subtitle: "Reset + Rewire",
    summary:
      "Estrela Serenity in Serra da Estrela provides the space to reset. Over six days, you’ll train, reflect, nourish and reconnect.",
    content: [
      "Breath and nervous system training",
      "Daily strength and mobility sessions",
      "Cold exposure and sauna therapy",
      "Food-as-ritual meals that fuel and restore",
      "Mindset and values alignment",
      "Structured reflection — not just to process, but to reset"
    ]
  },
  {
    id: "after",
    title: "When You Return",
    subtitle: "Rise + Rebuild",
    summary:
      "The retreat ends, but your transformation doesn’t. You’ll leave with a 90-day plan and ongoing community support.",
    content: [
      "Tailored 90-day integration plan",
      "Regular check-ins with our team",
      "Post-retreat coaching platform access",
      "Ongoing community connection"
    ]
  }
];

export default function ProgramTimeline() {
  const [selectedPhase, setSelectedPhase] = useState(null);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-light mb-8 text-center">The ROOTED Program</h2>

        <div className="overflow-x-auto">
          <div className="flex gap-6 w-max py-4">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase)}
                className="min-w-[220px] bg-[#fefbe8] border border-[#d4af37] rounded-xl px-6 py-4 text-left shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-[#4a4a4a]">{phase.title}</h3>
                <p className="text-sm text-[#4a4a4a]/70">{phase.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedPhase && (
            <Dialog
              as="div"
              open={true}
              onClose={() => setSelectedPhase(null)}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
            >
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-xl"
              >
                <Dialog.Title className="text-2xl font-semibold mb-2 text-[#4a4a4a]">{selectedPhase.title}</Dialog.Title>
                <p className="text-sm text-[#4a4a4a]/70 mb-4">{selectedPhase.summary}</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-[#4a4a4a]/80">
                  {selectedPhase.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPhase(null)}
                  className="mt-6 inline-block text-sm text-[#d4af37] hover:underline"
                >
                  Close
                </button>
              </Dialog.Panel>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}