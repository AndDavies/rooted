import Image from "next/image"
import { HeartPulse, Scale, Users } from 'lucide-react';
import React from 'react';

export function AboutUs() {

  const features = [
    {
      icon: <HeartPulse />,
      title: "Science-Backed TRAINING",
      subheading: "360 Recalibration",
      description: "We use biometrics to enhance mental cognition, cardiovascular fitness, stress resilience, and adrenal health. Rooted™ optimizes your metabolism, reduces inflammation, and boosts hormonal balance, shifting you from chronic output to sustainable vitality.",
      initialIconColor: "text-neutral-800",
      hoverIconColorClass: "group-hover:text-[#CC4824]",
    },
    {
      icon: <Scale />,
      title: "MIND-BODY RESTORATION",
      subheading: "Time-Rested Disciplines",
      description: "We guide you through breathwork, mindful movement, cold therapy, and meditation to restore physiological balance and sharpen mental clarity. These aren’t trends; they’re timeless tools for lasting transformation.",
      initialIconColor: "text-neutral-800",
      hoverIconColorClass: "group-hover:text-[#FFF1D4]",
    },
    {
      icon: <Users />,
      title: "SUSTAINED CHANGE",
      subheading: "We Don’t Do It Alone",
      description: "We pair personalized coaching with community support to sustain your momentum long after the reset. Rooted™ fosters lasting transformation, empowering you to lead with balance and impact.",
      initialIconColor: "text-neutral-800",
      hoverIconColorClass: "group-hover:text-[#FFF8EB]",
    },
  ];

  return (
    <>
      <section className="bg-white relative py" id="about">
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

      <section className="py-20 md:py-28 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm mb-6">
            <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-4 tracking-tight">
            Why Choose <span className="font-medium">ROOTED</span>
          </h2>
          <div className="w-16 h-px bg-stone-300 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              {/* Icon Container */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  {React.cloneElement(feature.icon, {
                    className: "w-7 h-7 text-amber-600 group-hover:text-amber-700 transition-colors duration-300",
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-light text-stone-800 leading-tight">{feature.title}</h3>

                {/* Subheading */}
                <div className="relative">
                  <h4 className="text-sm font-medium text-amber-700 tracking-wide uppercase">{feature.subheading}</h4>
                  <div className="w-8 h-px bg-amber-300 mx-auto mt-2"></div>
                </div>

                {/* Description */}
                <p className="text-stone-600 leading-relaxed max-w-sm mx-auto">{feature.description}</p>
              </div>

              {/* Subtle bottom accent */}
              <div className="mt-8 flex justify-center">
                <div className="w-1 h-1 bg-stone-300 rounded-full opacity-60"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Element */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-stone-500 text-xs font-light tracking-widest">
            <div className="w-6 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
            <span>TRANSFORM WITH PURPOSE</span>
            <div className="w-6 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
