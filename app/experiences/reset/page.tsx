// app/experiences/reset/page.tsx
// This is the page for the Reset Retreat waitlist
// It is a simple form that allows users to join the waitlist
// It is a static page that does not require any data from the database
// It is a simple form that allows users to join the waitlist
"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"
import Gallery from "@/components/Gallery"
import VisualMap from "@/components/fall-reset/visualMap"

export default function ResetRetreatPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    message: ""
  })
  const [addToNewsletter, setAddToNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const currentSource = "October 5 Retreat Waitlist"

  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const groups = ["OCT_RESET"];
    if (addToNewsletter) groups.push("NEWSLETTER");

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: currentSource,
          message: formData.message || "Interested in joining the October 2025 ROOTED Retreat waitlist",
          groups
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          email: "",
          message: ""
        })
        setTimeout(() => setShowSuccess(false), 5000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>ROOTED Fall Reset – Health & Clarity Reset Retreat</title>
        <meta
          name="description"
          content="ROOTED is a science-backed, soul-infused retreat for high performers ready to reset and rebuild. Experience a personalized, data-informed, nature-grounded reset this October 2025 in Portugal’s Estrela mountains."
        />
        <meta
          name="keywords"
          content="ROOTED retreat, burnout recovery, executive wellness, nervous system reset, HRV diagnostics, Serra Estrela Portugal, high-performer healing, 2025 retreat, breathwork, sleep optimization, functional medicine, post-retreat integration"
        />
        <meta property="og:title" content="ROOTED Fall Reset – Clarity, Healing, and Leadership" />
        <meta property="og:description" content="October 2025 | A guided, research-backed, nature-immersive retreat for ambitious professionals seeking physiological recovery and a renewed inner compass." />
        <meta property="og:image" content="https://therootedway.co/experiences/reset/opengraph-image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">

        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          >
            <source src="/events/rooted_reset_hero_retreat.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
        </div>
        <div className="relative z-10 container px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tighter text-shadow-hero-h1 mb-6 whitespace-nowrap">
            THE ROOTED FALL RETREAT 
          </h1>
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#D4AF37] tracking-tighter text-shadow-hero-h1 mb-6 whitespace-nowrap">Reset. Realign. Rise.</h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">October 10-15, 2025 | Serra da Estrela Natural Park – UNESCO geopark</p>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-8">
            A science-backed, nature-immersive retreat for high performers ready to reclaim their health, clarity, and energy
          </p>
          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => handleScroll('form')}
              className="inline-block bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full backdrop-blur-sm transition-all"
            >
            Start the Conversation
            </button>
            <button 
              onClick={() => handleScroll('how-we-deliver')}
              className="flex flex-col items-center text-white/60 hover:text-white/90 transition-colors group"
            >
              <span className="text-sm mb-2">Read More</span>
              <div className="w-8 h-8 flex items-center justify-center">
                <svg 
                  className="w-6 h-6 animate-bounce group-hover:animate-none" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Static Section Navigation */}
      <section className="bg-[#fff8ea] border-b border-slate-200 py-3 sticky top-[70px] z-30">
        <div className="container mx-auto px-6 max-w-6xl flex justify-center items-center">
          <ul className="flex flex-wrap gap-3 text-sm font-medium text-[#4A4A4A] tracking-tight items-center">
            <li><a href="#itinerary" className="hover:text-[#D4AF37] transition">Retreat Itinerary</a></li>
            <li>|</li>
            <li><a href="#experience" className="hover:text-[#D4AF37] transition">Transformation</a></li>
            <li>|</li>
            <li><a href="#expect" className="hover:text-[#D4AF37] transition">What to Expect</a></li>
            <li>|</li>
            <li><a href="#who" className="hover:text-[#D4AF37] transition">Who It's For</a></li>
            <li>|</li>
            <li><a href="#location" className="hover:text-[#D4AF37] transition">Estrela Serenity Resort</a></li>
            <li>|</li>
            <li><a href="#faq" className="hover:text-[#D4AF37] transition">FAQ</a></li>
            <li>
              <a
                href="#form"
                className="ml-4 bg-[#317039] hover:bg-[#285B2F] text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                Start the Conversation
              </a>
            </li>
          </ul>
        </div>
      </section>

    
      {/* Visual Map Section */}
      <VisualMap />

      {/* How We Deliver the ROOTED Reset Section */}
      <section id="experience" className="scroll-mt-[90px] bg-white py-10 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col-reverse lg:flex-row items-start gap-10">
          {/* Left: Steps */}
          <div className="w-full lg:w-7/12 space-y-10">
            <h3 className="scroll-mt-[90px] text-3xl md:text-4xl font-light text-[#4A4A4A] mb-6">A Transformative Experience</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-mono">
                  01
                </div>
                <div>
                  <h3 id="baseline" className="text-lg font-semibold text-[#4A4A4A] mb-1">Establishing Your Baseline</h3>
                  <p className="text-sm text-[#4A4A4A]/80 mb-1 font-bold">Get clear on where you are, so you can reset with precision.</p>
                  <ul className="list-disc list-inside text-[#4A4A4A]/80 text-sm space-y-1">
                    <li>Comprehensive biomarker review (hormonal & metabolic panels)</li>
                    <li>Functional movement assessment and personalized sleep evaluation</li>
                    <li>Individual goal setting with expert practitioners and dedicated coaches</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-mono">
                  02
                </div>
                <div>
                  <h3 id="grounding" className="text-lg font-semibold text-[#4A4A4A] mb-1">Grounding in Your Body</h3>
                  <p className="text-sm text-[#4A4A4A]/80 mb-1 font-bold">Reconnect to your physical foundation for energy and presence.</p>
                  <ul className="list-disc list-inside text-[#4A4A4A]/80 text-sm space-y-1">
                    <li>Daily mobility and mindful movement practices</li>
                    <li>Personalized training protocols</li>
                    <li>Guided meditation and nervous system-focused breathwork</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-mono">
                  03
                </div>
                <div>
                  <h3 id="purpose" className="text-lg font-semibold text-[#4A4A4A] mb-1">Reflecting on Your Purpose</h3>
                  <p className="text-sm text-[#4A4A4A]/80 mb-1 font-bold">Clarify your story and reclaim what matters most.</p>
                  <ul className="list-disc list-inside text-[#4A4A4A]/80 text-sm space-y-1">
                    <li>Explore the personal narrative that has shaped who you are</li>
                    <li>Identify the values and patterns that define your unique identity</li>
                    <li>Begin writing the next chapter with intention and clarity</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-mono">
                  04
                </div>
                <div>
                  <h3 id="change" className="text-lg font-semibold text-[#4A4A4A] mb-1">Creating Lasting Change</h3>
                  <p className="text-sm text-[#4A4A4A]/80 mb-1 font-bold">Leave with a new operating system, not just fleeting inspiration.</p>
                  <ul className="list-disc list-inside text-[#4A4A4A]/80 text-sm space-y-1">
                    <li>Detox with nourishing, anti-inflammatory meals</li>
                    <li>Reboot your metabolism through intentional, sustainable practices</li>
                    <li>Build a personalized post-retreat integration plan with accountability and support</li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="mt-10 text-center lg:text-left animate-bounce text-[#4A4A4A]/60 text-xs tracking-tight">
              ↓ read more below
            </div>
          </div>

          {/* Right: Visual */}
          <div className="w-full lg:w-5/12">
            <div className="aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/events/retreat_how.jpg"
                alt="Retreat participants grounding in nature"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        {/* CTA Button: Start the Conversation */}
        <div className="text-center mt-10">
          <button
            onClick={() => handleScroll('form')}
            className="inline-block bg-[#D4AF37] hover:bg-[#C19B25] text-white text-sm font-medium px-6 py-3 rounded-full tracking-wide transition-colors"
          >
            Start the Conversation
          </button>
        </div>
      </section>

      {/* Fall Reset Section - Full Width Image */}
      <section className="relative">
        <div className="h-[70vh] relative">
          <Image
            src="/events/retreat_2.jpg"
            alt="Fall reset experience"
            fill
            style={{ objectFit: "cover" }}
            className="brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Fall Is for Shedding</h2>
                
                <p className="text-lg text-white/90 mb-8"><span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0"></span>Your calendar is full, your inbox overflows, but you feel like you’re running on half a battery.</p>
                <p className="text-lg text-white/90 mb-8"><span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0"></span>You’re not alone. Most high-functioning adults in their late 30s, 40s, and 50s feel the same: stretched thin, foggy, disconnected from themselves and their health. This retreat is your pause. A reset grounded in nature, guided by science, and built for real life.</p>
                <p className="text-lg text-white/90 mb-8"><span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0"></span>You will release what’s no longer serving you, with daily detoxifying practices like hot-cold contrast therapy, mindful movement, mountain hikes, waterfalls, lake plunges and quiet reflections in nature. This is not just rest; it’s recalibration and reconnection.</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section - Offset Grid */}
      <section id="expect" className="scroll-mt-[90px] py-10 bg-[#fefbe8]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 lg:col-start-1">
                <div className="sticky top-20">
                  <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-6">What You Can Expect</h2>
                  <p className="text-lg text-[#4A4A4A]/80 mb-8">From the moment you arrive, your reset is uniquely yours.</p>
                  <div className="space-y-4">
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>You’ll begin with 1:1 assessments across bloodwork, movement, sleep, breath, and nervous system balance - all designed to build a personalized foundation for deep transformation.</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>Each day weaves together mindful movement, contrast therapy, and nature immersion - from lakeside mobility sessions to nature hikes and bike rides through quiet mountain towns.</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>And it doesn’t start on arrival; your coach will guide you through a tailored pre-reset protocol the week before departure, so your mind and body are fully prepared to receive.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 space-y-8">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                  <Image
                    src="/estrella/4.jpg"
                    alt="Reset retreat experience"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section - Overlapping Elements */}
      <section id="who" className="scroll-mt-[90px] py-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 lg:col-start-1 relative">
                <div className="aspect-[16/9] relative rounded-xl overflow-hidden border-2 border-gray-500">
                  <Image
                    src="/events/retreat_girl_forest.jpg"
                    alt="Target audience visualization"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="absolute -bottom-12 -right-12 w-2/3 aspect-square rounded-xl overflow-hidden border-2 border-gray-500 shadow-xl hidden lg:block">
                  <Image
                    src="/events/retreat_man_forest.jpg"
                    alt="Additional retreat imagery"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-6">Who This Is For</h2>
                  <p className="text-lg text-[#4A4A4A]/80 mb-8">This isn't for everyone — and that's the point. Each cohort is small, curated, and deeply intentional.</p>
                  <div className="space-y-4">
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0 self-start mt-2"></span>
                      <span>You're outwardly successful but inwardly running on fumes</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0 self-start mt-2"></span>
                      <span>You've optimized your career, but not your health</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0 self-start mt-2"></span>
                      <span>You're ready to trade burnout for clarity and purpose</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0 self-start mt-2"></span>
                      <span>You’re craving a circle of peers who understand the tension between performance and purpose, and are choosing to live with more intention.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estrela Resort & Gallery Section */}
      <section id="location" className="scroll-mt-[90px] py-20 bg-[#6C4F57] text-white">
        <div className="container mx-auto px-0 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Estrela Serenity Resort</h2>
            <h4 className="text-lg font-medium mb-2">Why Serra da Estrela?</h4>
            <p className="mt-2 text-white/70">
              We’ve chosen a premium mountain resort tucked inside Portugal’s UNESCO Global Geopark — the breathtaking Serra da Estrela. This tranquil haven offers the ideal setting for transformation: peaceful, powerful, and far from daily noise.
            </p>
            <p className="mt-2 text-white/70">
              Surrounded by 375 km of marked trails, it’s a playground for hiking, trail running, gravel biking, or simply wandering in stillness.
            </p>
            <p className="mt-2 text-white/70">
              On-site, you’ll find everything needed to support your reset:
            </p>
            <ul className="list-disc list-inside text-white/70 mt-2 space-y-1 pl-4">
              <li>A heated pool, two saunas, Turkish bath, and gym</li>
              <li>A lake and ice bath for daily hot-cold therapy</li>
              <li>Optional massage treatments</li>
              <li>And a private chef crafting anti-inflammatory meals and outdoor picnics, all designed to nourish and restore</li>
            </ul>
            <p className="mt-4 text-white/80">
              This is more than a retreat center; it’s a sanctuary for deep reset, movement, and reconnection.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Gallery />
          </div>
        </div>
      </section>

      {/* Form & Calendly Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 scroll-mt-[90px]" id="form">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Let’s Start With a Conversation</h2>
            <p className="text-lg text-white/70">Send your details and we will be in touch or book a time directly</p>
          </div>

          {/* Options Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80 text-center mb-8">
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-1">Submit Your Details</h3>
              <p className="text-sm">Send us your details and we’ll follow up to share more</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-1">Book a Call</h3>
              <p className="text-sm">Schedule a call directly to begin the conversation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left: Form */}
            <div>
          {showSuccess ? (
            <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
                  <h3 className="text-2xl font-light text-white mb-2">You're on the list</h3>
                  <p className="text-white/70">We'll be in touch soon with next steps</p>
            </div>
          ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/80 mb-1">First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        placeholder="Last name"
                      />
              </div>
              </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      placeholder="you@example.com"
                    />
              </div>
              <div>
                    <label className="block text-sm text-white/80 mb-1">Message (Optional)</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      placeholder="What brings you to ROOTED?"
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" checked={addToNewsletter} onChange={(e) => setAddToNewsletter(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span className="text-white/70 text-sm">Subscribe to occasional ROOTED updates</span>
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-[#D4AF37] hover:bg-[#C19B25] text-white text-sm font-semibold px-6 py-3 rounded-md transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Apply & Schedule a Call"}
                </button>
                </form>
              )}
            </div>

            {/* Right: Calendly Embed */}
            {!showSuccess && (
              <div className="w-full">
                <div
                  className="calendly-inline-widget rounded-lg shadow-md overflow-hidden"
                  data-url="https://calendly.com/andrew-therootedway/30min?background_color=fefbe8&text_color=222222&primary_color=cc4823"
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            )}
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section id="faq" className="bg-white py-20 scroll-mt-[90px]">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12 items-start">
          {/* Image Side */}
          <div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/estrella/4.jpg"
                alt="Nature bird calmness"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* FAQ Content Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-4">
              Program FAQs: <em className="italic">Your guide to a seamless journey</em>
            </h2>
            <p className="text-[#4A4A4A]/80 mb-8">
              We know stepping into a transformational retreat comes with questions. Here are answers to a few we hear often. Still wondering something? Just reach out.
            </p>

            <div className="divide-y divide-slate-200">
              {[
                {
                  q: "Who is this program designed for?",
                  a: "The ROOTED Reset is for high-functioning professionals who feel burned out, unbalanced, or misaligned — and are ready to reset physically, mentally, and emotionally."
                },
                {
                  q: "What kind of people book this experience?",
                  a: "Entrepreneurs, executives, founders, and high-achieving creatives. People who are used to pushing through — and are ready to pause and come home to themselves."
                },
                {
                  q: "Is this a physically demanding retreat?",
                  a: "There are daily movement and nature-based activities, but each session is adapted to your needs. No extreme fitness levels are required — just openness and curiosity."
                },
                {
                  q: "Do I have to attend every session?",
                  a: "We recommend full participation, but everything is optional. This is your time to recalibrate, and we honor your autonomy."
                },
                // Additional FAQs
                {
                  q: "How is ROOTED different from other wellness retreats?",
                  a: "ROOTED goes beyond rest. We integrate science (HRV, biometrics, mindset frameworks) with soul (ritual, breathwork, nature immersion) for embodied, lasting transformation. This isn’t inspiration — it’s recalibration."
                },
                {
                  q: "What happens before I even arrive?",
                  a: "Your journey begins with a pre-retreat intake: optional bloodwork, HRV & sleep tracking, a guided values inventory, and a personalized coaching check-in to ensure you arrive grounded and ready to receive."
                },
                {
                  q: "What kind of follow-up support is included?",
                  a: "After the retreat, you’ll receive a 90-day integration plan, weekly check-ins with a guide, and access to our private community space — because transformation requires support, not a login and luck."
                },
                {
                  q: "I’m not in burnout, but I’m feeling unfulfilled. Is this for me?",
                  a: "Yes. ROOTED isn’t just for people in crisis — it’s for those at a threshold: ready to reclaim presence, realign health, and lead with clarity."
                },
                {
                  q: "Is ROOTED religious or spiritual?",
                  a: "ROOTED is not affiliated with any religion, but we create space for spiritual exploration through nature, breath, reflection, and embodied presence. Guests of all beliefs (or none) are welcomed."
                },
                {
                  q: "How physically demanding is the retreat?",
                  a: "ROOTED is intentionally designed with rhythm, not rigor. All movement and hikes are optional and scalable to your baseline. The goal is restoration, not exhaustion."
                }
              ].map(({ q, a }, i) => (
                <details key={i} className="py-4 group">
                  <summary className="cursor-pointer text-[#4A4A4A] font-medium flex justify-between items-center">
                    <span>{q}</span>
                    <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-[#4A4A4A]/80 mt-2">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
