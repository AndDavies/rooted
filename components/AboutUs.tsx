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
      <section className="bg-white relative" id="about">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left pl-4 md:pl-8 lg:pl-16 py-16 md:py-24">
            <div className="max-w-2xl">
              <div className="mb-6">
                <h1 className="text-4xl tracking-tighter italic mb-3 text-neutral-900">
                The hidden cost of high performance
                </h1>
              </div>
              <div className="space-y-6">
              <p className="font-sans text-base md:text-lg lg:text-xl leading-relaxed tracking-tight">
              Success often comes with a silent price. Running full steam on adrenaline, digital overload, and a "push-through" mentality.
            </p>
            <p className="font-sans text-base md:text-lg lg:text-xl leading-relaxed tracking-tight">
              Maybe outwardly thriving, but inwardly drained, afraid of what will happen if we step off the treadmill. At ROOTED we believe there is another way.
            </p>
              </div>
              <div className="mt-10 md:mt-12 w-24 h-[2px] bg-[#c0c0b0]"></div>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="w-[500px] h-[500px] overflow-hidden relative ml-auto">
              <Image
                src="/rooted_about_us_section.jpg"
                alt="Serene natural environment at Rooted Executive Retreats"
                width={500}
                height={500}
                objectFit="cover"
              />
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
