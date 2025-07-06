"use client"
import { useState } from "react"
import { Mail, CheckCircle } from "lucide-react"

interface NewsletterSignupBannerProps {
  source?: string;
}

export function NewsletterSignupBanner({ source = "archive" }: NewsletterSignupBannerProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "I'd like to subscribe to The ROOTED Weekly newsletter."
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          company: "", // Not needed for newsletter signup
          source: source // Use the provided source prop
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "I'd like to subscribe to The ROOTED Weekly newsletter."
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

  if (showSuccess) {
    return (
      <div className="bg-gradient-to-r from-[#F1BE49] to-[#D4AF37] py-8 mb-8 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
            <h3 className="text-2xl font-bold text-white">Welcome to The ROOTED Weekly!</h3>
          </div>
          <p className="text-white/90 text-base max-w-2xl mx-auto">
            Thank you for subscribing! You'll receive our weekly insights on leadership, wellbeing, and personal growth directly in your inbox.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 mb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-[#CC4824]" />
              <h3 className="text-2xl md:text-3xl font-bold text-[#4A4A4A]">
              Want The ROOTED Weekly in your inbox weekly?
              </h3>
            </div>
            <p className="text-base text-[#4A4A4A]/80 max-w-2xl mx-auto">
              Get weekly insights on leadership, wellbeing, and personal growth delivered directly to your inbox. 
              Join thousands of high-performing leaders on their journey to authentic alignment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50 min-h-[44px] text-base"
                  placeholder="First Name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50 min-h-[44px] text-base"
                  placeholder="Last Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#4A4A4A]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 text-[#4A4A4A] placeholder-[#4A4A4A]/50 min-h-[44px] text-base"
                  placeholder="your.email@company.com"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#CC4824] hover:bg-[#e05c3a] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#CC4824] focus:ring-offset-2 min-h-[44px] text-base"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </div>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-[#4A4A4A]/60">
                By subscribing, you agree to our{' '}
                <a href="/privacy" className="text-[#CC4824] hover:underline">Privacy Policy</a>.
                You can unsubscribe at any time.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 