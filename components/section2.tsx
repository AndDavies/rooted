"use client";

import React from 'react';
import { Moon, Heart, Zap } from 'lucide-react';

interface CardData {
  id: number;
  icon: React.ReactElement;
  title: string;
  copy: string;
  stat: string;
}

const cardDetails: CardData[] = [
  {
    id: 1,
    icon: <Moon className="w-12 h-12 text-primary group-hover:text-[#317039] transition-colors duration-300" />,
    title: "Sleep Deeply, Think Clearly",
    copy: "Our Sleep Optimization pillar uses biometric tracking and expert-led workshops to calm your racing mind and restore restful sleep. Through breathwork, yin yoga, and nature immersion in Madeira, we help you break the cycle of mental overload and wake up refreshed.",
    stat: "85% of participants report improved sleep quality within 6 days, with a 20% increase in deep sleep stages.",
  },
  {
    id: 2,
    icon: <Heart className="w-12 h-12 text-primary group-hover:text-[#CC4824] transition-colors duration-300" />,
    title: "Find Calm, Release Tension",
    copy: "Our Breathing and Relaxation and Joy pillars guide you to emotional balance with practices like Wim Hof breathwork, ice baths, and massage. We ease tight muscles and emotional volatility, helping you feel grounded and at peace in high-pressure moments.",
    stat: "90% of participants experience reduced stress and tension, with a 15% decrease in cortisol levels after 6 days.",
  },
  {
    id: 3,
    icon: <Zap className="w-12 h-12 text-primary group-hover:text-[#F1BE49] transition-colors duration-300" />,
    title: "Boost Energy, Stay Sharp",
    copy: "Our Movement and Training and Nutrition pillars energize you with high-performance activities like trail running and free diving, paired with anti-inflammatory meals tailored to your biometrics. Say goodbye to afternoon crashes and hello to sustained vitality.",
    stat: "80% of participants report increased energy, with a 25% reduction in fatigue symptoms within 6 days.",
  },
];

export function Section2() {
  const parseStat = (statString: string) => {
    const match = statString.match(/^(\d+%|\d+X|\d+x|\d+)/);
    let bigNum = "";
    let smallText = statString;
    if (match && match[0]) {
      bigNum = match[0];
      smallText = statString.substring(match[0].length).trim();
    }
    return { bigNum, smallText };
  };

  return (
    <section 
      id="problem" 
      className="min-h-screen py-16 md:py-24 bg-natural-50 text-gray-800"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
            <span className="block text-gray-500 text-sm font-medium tracking-wider uppercase mb-2 text-shadow-sm">
              The Unseen Toll
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-shadow-md">
              The High Cost of Always-On Leadership
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardDetails.map((card) => {
            const { bigNum, smallText } = parseStat(card.stat);
            return (
              <div 
                key={card.id} 
                className="group bg-white rounded-xl shadow-lg p-6 md:p-8 overflow-hidden cursor-default transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col"
              >
                <div className="transition-transform duration-300 ease-in-out group-hover:scale-105 flex-grow flex flex-col">
                  <div className="flex justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-base text-gray-700 mb-6 leading-relaxed flex-grow">
                    {card.copy}
                  </p>
                  <div className="bg-[#F1BE49] p-6 rounded-lg text-center mt-auto">
                    {bigNum && (
                      <div className="text-6xl font-bold text-black">
                        {bigNum}
                      </div>
                    )}
                    <p className={`text-base text-black ${bigNum ? 'mt-2' : ''}`}>
                      {smallText}
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