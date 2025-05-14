"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc?: string; // For the mobile app mockup
  imageAlt?: string;
}

interface Section3Props {
  id?: string; // Add id as an optional prop
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, imageSrc, imageAlt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageZoom, setImageZoom] = useState(1);

  // TODO: Implement scroll-triggered zoom for image if imageSrc is present
  useEffect(() => {
    if (!imageSrc || !cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageZoom(1.05); // Zoom in slightly
        } else {
          setImageZoom(1); // Reset zoom
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [imageSrc]);

  return (
    <div 
      ref={cardRef}
      className={`bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group
                  ${isHovered ? 'bg-gradient-to-br from-white to-[#f5f5f0]' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-4xl mb-4 text-gray-700 group-hover:text-gray-900 transition-colors duration-300 
                      ${isHovered ? 'transform scale-110 rotate-3' : ''}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3 font-sans">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 font-sans">{description}</p>
      {imageSrc && imageAlt && (
        <div className="mt-4 rounded-md overflow-hidden shadow-inner aspect-[9/16] max-w-xs mx-auto">
          <Image 
            src={imageSrc} 
            alt={imageAlt} 
            width={400} 
            height={800} // Proportions for a phone screen
            className="object-contain object-center w-full h-full transition-transform duration-500 ease-out"
            style={{ transform: `scale(${imageZoom})` }}
          />
        </div>
      )}
    </div>
  );
};

export function Section3({ id }: Section3Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [fadeInCopy, setFadeInCopy] = useState(false);

  // TODO: Refine fade-in logic for copy after image
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFadeInCopy(true);
        } else {
         // setFadeInCopy(false); // Optional: reset on scroll out
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the full-width image is visible
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Observe the section, or a specific element before the copy
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


  const features = [
    {
      icon: <span role="img" aria-label="heartbeat icon">❤️</span>, // Placeholder icon
      title: "Science-Driven Reset",
      description: "Personalized biometric intake and tracking (HRV, sleep) to tailor your journey and measure tangible improvements in stress and energy levels.",
      imageSrc: "/images/mobile-app-hrv.png",
      imageAlt: "Mobile app screen showing HRV tracking data",
    },
    {
      icon: <span role="img" aria-label="balance icon">☯️</span>, // Placeholder icon
      title: "Taoist-Inspired Balance",
      description: "Integrate ancient Taoist principles for mind-body harmony, blending dynamic movement like Qigong with profound stillness through meditation.",
    },
    {
      icon: <span role="img" aria-label="community icon">🤝</span>, // Placeholder icon
      title: "Rooted Tribe™ Platform",
      description: "Gain lifelong access to our exclusive digital platform for ongoing coaching, resources, and a global community of like-minded leaders.",
    },
  ];

  return (
    <section id={id} ref={sectionRef} className="font-sans bg-white">
      {/* Full-width Image */} 
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image 
          src="/images/madeira-coastline-wide.jpg" 
          alt="Scenic view of Madeira coastline"
          fill
          className="object-cover"
          priority // Consider priority if this is an early visual element
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
      </div>

      {/* Content Section - Fades in */} 
      <div className={`container mx-auto px-4 md:px-8 py-16 md:py-24 text-center transition-opacity duration-1000 ease-in-out ${fadeInCopy ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 text-shadow-md">
          Rooted™: Your Path to Balance
        </h2>
        <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
          Rooted™ transforms leaders through a 6-day retreat in Madeira. Personalized: Biometric intake tailors your reset. Balanced: Taoist practices blend movement and calm. Lasting: The Rooted Tribe™ offers lifelong support via our tech platform. Experience nature immersion, expert coaching, and world-class cuisine. This isn't a break—it's a breakthrough.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
            />
          ))}
        </div>

        <div className="mt-16">
          <button 
            className="px-10 py-4 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}