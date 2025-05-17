"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';

interface ProgramStage {
  id: string;
  title: string;
  iconSrc: string;
  description: string;
  bgColor: string;
  textColor: string;
  pinButtonColor: string;
}

const programStagesData: ProgramStage[] = [
  {
    id: 'journey',
    title: "The Journey",
    iconSrc: "/icons/icon_onboard.png",
    description: "Your journey begins with a comprehensive onboarding process to benchmark your wellness. We assess hormone levels, bloodwork, gut biome, and HRV using medical-grade wearables like Oura Ring. This data-driven approach helps us craft a tailored plan for your 6-day reset, ensuring every activity and meal aligns with your unique needs.",
    bgColor: "bg-[#FBEDD9]", // Antique White
    textColor: "text-neutral-800",
    pinButtonColor: "text-neutral-500 hover:text-neutral-700",
  },
  {
    id: 'reset',
    title: "The Reset",
    iconSrc: "/icons/icon_reset.png",
    description: "Immerse yourself in a science-backed reset amidst Madeira's stunning landscapes. Experience nature immersion through guided hikes, walks, and ocean activities like free diving and surfing. Reconnect with your body through breathwork (Wim Hof Method), movement in nature (trail running, HIIT, yoga), and nourishing meals prepared by world-renowned chefs using local, anti-inflammatory ingredients tailored to your biometrics. Daily coaching and evening rituals ensure deep rest and clarity.",
    bgColor: "bg-[#FFF8EB]", // Cosmic Latte
    textColor: "text-neutral-800",
    pinButtonColor: "text-neutral-500 hover:text-neutral-700",
  },
  {
    id: 'tribegrowth',
    title: "The Tribe",
    iconSrc: "/icons/icon_coach.png",
    description: "After the reset, our digital platform supports your journey with a place to record progress, set and track goals, and integrate with health wearables. Access on-demand responses through our AI-powered system, weekly coaching check-in calls, and a community of like-minded leaders. Join global expeditions (alpine summits, jungle treks) to stay connected and inspired in the Rooted Tribe™.",
    bgColor: "bg-[#FFF1D4]", // Papaya Whip
    textColor: "text-neutral-800",
    pinButtonColor: "text-neutral-500 hover:text-neutral-700",
  },
];

export function Program() {
  const [pinnedCards, setPinnedCards] = useState<Record<string, boolean>>({});

  const togglePin = (id: string) => {
    setPinnedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="program-overview" className="py-16 md:py-24 bg-natural-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-shadow-md">
            Program Overview: Your Journey to Transformation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Rooted™ offers a three-stage approach to reset, realign, and rise as a leader. From personalized onboarding to a transformative 6-day reset in Madeira, Portugal, and ongoing support through our digital platform, we guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programStagesData.map((stage) => {
            const isPinned = pinnedCards[stage.id] || false;
            return (
              <div 
                key={stage.id} 
                className={`group relative ${stage.bgColor} ${stage.textColor} rounded-3xl shadow-xl p-6 pt-8 h-[440px] overflow-hidden flex flex-col text-center transition-all duration-500 ease-in-out`}
              >
                <button 
                  onClick={() => togglePin(stage.id)}
                  className={`absolute top-4 right-4 z-30 p-1 rounded-full ${stage.pinButtonColor} transition-colors duration-200`}
                  aria-label={isPinned ? "Unpin details" : "Pin details"}
                >
                  {isPinned ? <X size={20} /> : <Plus size={20} />}
                </button>

                <h3 className={`text-2xl font-semibold mb-4 ${stage.textColor}`}>
                  {stage.title}
                </h3>

                <div className="relative flex-grow w-full">
                  <div 
                    className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-300 ease-in-out 
                                ${isPinned 
                                  ? 'opacity-0 scale-90 pointer-events-none' 
                                  : 'opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-90 group-hover:pointer-events-none'}`}
                  >
                    <div className="w-20 h-20 relative bg-transparent">
                      <Image src={stage.iconSrc} alt={`${stage.title} icon`} layout="fill" className="bg-transparent" objectFit="contain" />
                    </div>
                  </div>

                  <div 
                    className={`absolute inset-0 flex flex-col justify-center items-center p-4 pt-0 transition-all duration-300 ease-in-out delay-100 
                                ${isPinned 
                                  ? 'opacity-100 scale-100 pointer-events-auto' 
                                  : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'}`}
                  >
                    <p className={`text-sm leading-relaxed overflow-y-auto max-h-[calc(100%-1rem)] scrollbar-hide ${stage.textColor}`}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}