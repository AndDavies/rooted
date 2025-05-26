import Image from "next/image"
import { HeartPulse, Scale, Users } from 'lucide-react';
import React from 'react';

export function AboutUs() {

  const features = [
    {
      icon: <HeartPulse />,
      title: "Science-Driven Reset",
      description: "Personalized biometric intake and tracking (HRV, sleep) to tailor your journey and measure tangible improvements in stress and energy levels.",
      initialIconColor: "text-neutral-800",
      hoverIconColorClass: "group-hover:text-[#CC4824]",
    },
    {
      icon: <Scale />,
      title: "Taoist-Inspired Balance",
      description: "Integrate ancient Taoist principles for mind-body harmony, blending dynamic movement like Qigong with profound stillness through meditation.",
      initialIconColor: "text-neutral-800",
      hoverIconColorClass: "group-hover:text-[#FFF1D4]",
    },
    {
      icon: <Users />,
      title: "Rooted Tribe Platform",
      description: "Gain access to our exclusive digital platform for ongoing coaching, resources, and a global community of like-minded leaders.",
      initialIconColor: "text-neutral-800",
      hoverIconColorClass: "group-hover:text-[#FFF8EB]",
    },
  ];

  return (
    <>
      <section className="bg-white py-16 md:py-24" id="about">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
            <div className="md:w-3/5 text-center md:text-left">
              <div className="mb-6">
                <h1 className="text-4xl tracking-tighter italic mb-3 text-neutral-900">
                  Rest. Recharge. Recover.
                </h1>
              </div>
              <div className="space-y-6">
                <p className="text-gray-700 text-sm leading-relaxed font-light tracking-tight antialiased">
                  At <span className="font-medium">Rooted</span>, we empower visionary leaders to thrive through a
                  science-backed, nature-driven reset. Built on six pillars—
                  <span className="font-medium">Breathing</span>,
                  <span className="font-medium"> Sleep Optimization</span>,
                  <span className="font-medium"> Nutrition</span>,
                  <span className="font-medium"> Movement and Training</span>,
                  <span className="font-medium"> Mindset and Focus</span>, and
                  <span className="font-medium"> Relaxation and Joy</span>
                  —our 6-day retreats in Madeira, Portugal, recalibrate your nervous system, restore metabolic health, and
                  reconnect you to your core.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed font-light tracking-tight antialiased">
                  We bridge high-performance activation with deep rest, guiding you to lead from the inside out with
                  clarity, resilience, and purpose.
                </p>
              </div>
              <div className="mt-10 md:mt-12 w-24 h-[2px] bg-[#c0c0b0] mx-auto md:mx-0"></div>
            </div>

            <div className="md:w-2/5 w-full">
              <div className="w-full h-80 md:h-[400px] border-2 border-neutral-700 rounded-3xl shadow-md overflow-hidden relative">
                <Image
                  src="/rooted_site_600_600.jpg"
                  alt="Serene natural environment at Rooted Executive Retreats"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#F1BE49" }} className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 rounded-lg text-center">
                <div className="mb-6 inline-block">
                  {React.cloneElement(feature.icon, {
                    className: `w-10 h-10 ${feature.initialIconColor} ${feature.hoverIconColorClass} transition-colors duration-300`,
                  })}
                </div>
                <h3 className="text-xl mb-3 text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
