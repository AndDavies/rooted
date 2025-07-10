// app/experiences/reset/page.tsx
// This is the page for the Reset Retreat waitlist
// It is a simple form that allows users to join the waitlist
// It is a static page that does not require any data from the database
// It is a simple form that allows users to join the waitlist
"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

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

    const groups = ["INTERESTED"];
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/reset_vanity_bg.jpg"
            alt="Madeira coastline at golden hour - dramatic cliffs meeting wild ocean"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
        </div>
        <div className="relative z-10 container px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight mb-6">
            THE ROOTED FALL RESET
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-[#D4AF37] leading-tight mb-6">Reset. Realign. Rise.</h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">October 2025 | Madeira, Portugal</p>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-8">
            A science-backed, nature-immersive retreat for high performers ready to reclaim their health, clarity, and energy
          </p>
          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => handleScroll('form')}
              className="inline-block bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full backdrop-blur-sm transition-all"
            >
            Apply for Your Spot Now
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

      {/* How We Deliver the ROOTED Reset Section */}
      <section id="how-we-deliver" className="bg-white py-10 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Left: Steps */}
          <div className="w-full lg:w-1/2 space-y-10">
            <h3 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-6">A Transformative Experience</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-mono">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#4A4A4A] mb-1">Establishing a Baseline</h3>
                  <ul className="list-disc list-inside text-[#4A4A4A]/80 text-sm space-y-1">
                    <li>Biomarker review – hormonal and metabolic panels</li>
                    <li>Movement assessment</li>
                    <li>Individual goal setting with coaches</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-mono">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#4A4A4A] mb-1">Grounding in Your Body</h3>
                  <ul className="list-disc list-inside text-[#4A4A4A]/80 text-sm space-y-1">
                    <li>Mobility exercises and mindful movement</li>
                    <li>Individualized strength training</li>
                    <li>Meditation and breathwork</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-mono">
                  03
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#4A4A4A] mb-1">Reflecting on Your Purpose</h3>
                  <ul className="list-disc list-inside text-[#4A4A4A]/80 text-sm space-y-1">
                    <li>Understanding your unique story</li>
                    <li>Reviewing components of your identity</li>
                    <li>Writing your next chapter</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center lg:text-left animate-bounce text-[#4A4A4A]/60 text-xs tracking-tight">
              ↓ read more below
            </div>
          </div>

          {/* Right: Visual */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-xl">
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
                <p className="text-lg text-white/90 mb-8">As the leaves fall, nature teaches us the beauty of release. This is your season to slow down, clear the fog, and come back to yourself.</p>
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-white/80">
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0"></span>
                    <span>Medical-grade bloodwork + biomarker testing</span>
                  </p>
                  <p className="flex items-center gap-3 text-white/80">
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0"></span>
                    <span>1:1 sleep and movement assessments</span>
                  </p>
                  <p className="flex items-center gap-3 text-white/80">
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0"></span>
                    <span>Anti-inflammatory, gut-healing nutrition</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section - Offset Grid */}
      <section className="py-20 bg-[#fefbe8]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 lg:col-start-1">
                <div className="sticky top-20">
                  <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] mb-6">What You Can Expect</h2>
                  <p className="text-lg text-[#4A4A4A]/80 mb-8">The ROOTED Fall Reset isn't a trendy escape. It's a scientifically grounded recalibration for your nervous system, metabolism, and mindset.</p>
                  <div className="space-y-4">
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>Breathwork & nervous system mastery</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>Nature immersion with hikes and ocean plunges</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>Personalized 90-day roadmap</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 space-y-8">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                  <Image
                    src="/events/retreat_3.jpg"
                    alt="Reset retreat experience"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section - Overlapping Elements */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 lg:col-start-1 relative">
                <div className="aspect-[16/9] relative rounded-xl overflow-hidden">
                  <Image
                    src="/events/retreat_5.jpg"
                    alt="Target audience visualization"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="absolute -bottom-12 -right-12 w-2/3 aspect-square rounded-xl overflow-hidden border-8 border-white shadow-xl hidden lg:block">
                  <Image
                    src="/events/retreat_6.png"
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
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>You're outwardly successful but inwardly running on fumes</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>You've optimized your career, but not your health</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></span>
                      <span>You're ready to trade burnout for clarity and purpose</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Calendly Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20" id="form">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Let’s Start With a Conversation</h2>
            <p className="text-lg text-white/70">Send your details and we will be in touch or book a time directly</p>
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

      {/* Bottom Social Proof Section */}
      <section className="py-12 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#4A4A4A]/60 font-light">
              Join industry leaders who are choosing transformation over burnout.
            </p>

          </div>
        </div>
      </section>
    </div>
  )
}
