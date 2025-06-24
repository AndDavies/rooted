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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const currentSource = "October 5 Retreat Waitlist"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch('/api/interested', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: currentSource,
          message: formData.message || "Interested in joining the October 2025 ROOTED Retreat waitlist"
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
        // Hide success message after 5 seconds
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 flex items-center justify-center">
        {/* Background Image - Madeira coastline at sunset */}
        <div className="absolute inset-0">
          <Image
            src="/reset_vanity_bg.jpg"
            alt="Madeira coastline at golden hour - dramatic cliffs meeting wild ocean"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="brightness-75"
            priority
          />
        </div>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              <span className="block">ROOTED Retreat:</span>
              <span className="block text-[#D4AF37] font-normal">Reset. Realign. Rise.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Your heart knows the cost of always pushing forward.
            </p>

            {/* Quick value prop */}
            <p className="text-md md:text-lg text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
              On Madeira's wild shores, October 2025. ROOTED's first retreat to reconnect with your body, quiet your mind, and reclaim your fire. This isn't escape—it's a science-backed return to your core.
            </p>
          </div>
        </div>
      </section>

      {/* Main CTA Section with Form */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Left - CTA Content */}
              <div className="lg:pt-8">
                <h2 className="text-3xl md:text-4xl font-light text-[#4A4A4A] leading-tight mb-6">
                  The path to transformation is unfolding.
                </h2>
                
                <p className="text-xl md:text-2xl text-[#D4AF37] font-medium mb-8">
                  Will you step in?
                </p>

                <div className="space-y-6 text-[#4A4A4A]">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg">Feel the earth beneath your feet on coastal hikes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg">Breathe deeply under starlit skies</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-lg">Restore your energy with tailored nutrition and ocean immersion</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-[#D4AF37]/10 rounded-xl">
                  <p className="text-lg font-medium text-[#4A4A4A] mb-2">October 2025 • Madeira, Portugal</p>
                  <p className="text-[#4A4A4A]/70">Join the waitlist for early access and exclusive updates</p>
                </div>
              </div>

              {/* Right - Form */}
              <div className="bg-white shadow-2xl rounded-2xl p-8 border border-slate-100">
                {showSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-[#4A4A4A] mb-3">Welcome to the journey.</h3>
                    <p className="text-[#4A4A4A]/80 leading-relaxed">
                      You've taken the first step toward transformation. We'll keep you updated as October 2025 approaches.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl md:text-3xl font-light text-[#4A4A4A] mb-3">
                        Join the Waitlist
                      </h3>
                      <p className="text-[#4A4A4A]/70">
                        Reserve your place for the inaugural ROOTED retreat
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50"
                            placeholder="First Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50"
                          placeholder="your.email@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50"
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                          What draws you to this retreat?
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 resize-none text-[#4A4A4A] placeholder-[#4A4A4A]/50"
                          placeholder="Share what calls you to this experience..."
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#4A4A4A] hover:bg-[#333] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            JOINING...
                          </div>
                        ) : (
                          "JOIN THE WAITLIST"
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
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
