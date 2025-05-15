"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const testimonialsData = [
  {
    quote: "I lead with clarity I thought I\'d lost. Rooted gave me back my edge and my calm.",
    author: "Sarah L.",
    title: "CEO, Tech Solutions",
    imageColor: "/images/testimonial-sarah-color.jpg",
    imageBw: "/images/testimonial-sarah-bw.jpg",
    videoSrc: "/videos/testimonial-sarah.mp4",
  },
  {
    quote: "I\'m focused and present now, not just in work but with my family. This was a game-changer.",
    author: "Michael B.",
    title: "Founder, Creative Agency",
    imageColor: "/images/testimonial-michael-color.jpg",
    imageBw: "/images/testimonial-michael-bw.jpg",
    videoSrc: "/videos/testimonial-michael.mp4",
  },
  {
    quote: "The blend of science and holistic practices is unique. I\'m performing better and feeling whole.",
    author: "Alex C.",
    title: "Director, Finance Group",
    imageColor: "/images/testimonial-alex-color.jpg",
    imageBw: "/images/testimonial-alex-bw.jpg",
    videoSrc: "/videos/testimonial-alex.mp4",
  },
  // Add more testimonials if needed, carousel will loop
];

const trustBadgesData = [
  { src: "/images/badge-forbes.svg", alt: "Featured in Forbes" },
  { src: "/images/badge-gwi.svg", alt: "Global Wellness Institute Partner" },
  { src: "/images/badge-another.svg", alt: "Another Trust Badge" }, // Example
];

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
  </svg>
);

const VideoLightbox: React.FC<{ videoSrc: string; onClose: () => void }> = ({ videoSrc, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Optional: Auto-play when lightbox opens
    // videoRef.current?.play();
    // Handle escape key to close
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[60] p-4" onClick={onClose}>
      <div className="bg-black rounded-lg shadow-2xl max-w-3xl w-full aspect-video overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <video ref={videoRef} src={videoSrc} controls autoPlay className="w-full h-full" />
      </div>
            <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors"
          aria-label="Close video"
            >
          &times;
            </button>
          </div>
  );
};

const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0 opacity-50">
    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto absolute bottom-0 transform scale-y-[-1]">
      <path fill="#f5f5f0" fillOpacity="0.5" d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,133.3C672,117,768,107,864,117.3C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto absolute top-0">
       <path fill="#f5f5f0" fillOpacity="0.5" d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,133.3C672,117,768,107,864,117.3C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>
  </div>
);

interface Section5Props {
  id?: string; // Add id as an optional prop
}

export function Section5({ id }: Section5Props) { // Destructure id here
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Basic auto-scroll logic (can be enhanced with pause on hover)
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const itemWidth = scrollWidth / (testimonialsData.length * 2); // Assuming duplication for infinite effect
        let newScrollLeft = scrollLeft + itemWidth;
        if (newScrollLeft >= scrollWidth / 2) { // Reset when passed halfway through duplicated content
          newScrollLeft = 0;
          carouselRef.current.scrollTo({ left: 0, behavior: 'auto' }); // Instant scroll to start
        }
         carouselRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      }
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id={id} className="py-16 md:py-24 bg-[#f0f0e5] relative overflow-hidden font-sans">
      <WaveBackground />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-shadow-md">
            Leaders Like You, Transformed
          </h2>
          <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Rooted™ works—our founders are proof. Restored sleep and reduced stress. Improved vitality through movement. Join a movement redefining leadership through balance.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div 
          ref={carouselRef} 
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 md:space-x-8 pb-8"
          // onMouseEnter={() => /* pause scroll */}
          // onMouseLeave={() => /* resume scroll */}
        >
          {[...testimonialsData, ...testimonialsData].map((testimonial, index) => ( // Duplicate for infinite loop illusion
            <div key={index} className="snap-center flex-none w-[80vw] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(33.333%-2rem)] group">
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 h-full flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
                <blockquote className="italic text-gray-700 text-md md:text-lg leading-relaxed mb-6 font-sans">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md mr-4 shrink-0">
                    <Image 
                      src={testimonial.imageBw} 
                      alt={`${testimonial.author} headshot in grayscale`}
                      fill 
                      className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
                      sizes="80px"
                    />
                    <Image 
                      src={testimonial.imageColor} 
                      alt={`${testimonial.author} headshot in color`}
                      fill 
                      className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 font-sans">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 font-sans">{testimonial.title}</p>
                  </div>
                  {testimonial.videoSrc && (
            <button 
                      onClick={() => setCurrentVideo(testimonial.videoSrc)}
                      className="ml-auto p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-200/50"
                      aria-label={`Play video testimonial from ${testimonial.author}`}
            >
                      <PlayIcon />
            </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 md:mt-24 text-center">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-6">Trusted By Leaders & Industry Experts</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-0 animate-fadeInUpBounce" style={{animationDelay: '0.5s'}}>
            {trustBadgesData.map((badge, index) => (
              <div key={index} className="h-10 md:h-12 opacity-75 hover:opacity-100 transition-opacity">
                <Image src={badge.src} alt={badge.alt} width={120} height={48} className="object-contain h-full w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentVideo && <VideoLightbox videoSrc={currentVideo} onClose={() => setCurrentVideo(null)} />}
      
      <style jsx global>{`
        @keyframes fadeInUpBounce {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInUpBounce {
          animation: fadeInUpBounce 0.8s ease-out forwards;
        }
      `}</style>
      </section>
    );
}