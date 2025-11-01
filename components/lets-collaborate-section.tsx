"use client"

import type React from "react"
import { useState } from "react"
import { SectionTitle } from "./section-title"

export function LetsCollaborateSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const socialLinks = [
    { name: "GitHub", icon: "github", url: "https://github.com/mhfed" },
    { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/mhfed" },
    { name: "Twitter", icon: "twitter", url: "#" },
    { name: "Dribbble", icon: "dribbble", url: "#" },
  ]

  return (
    <section id="collaborate" className="py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-background scroll-mt-0">
      <div className="max-w-6xl mx-auto w-full">
        {/* Mobile: Full width sticky title */}
        <div className="md:hidden scroll-animate sticky top-[var(--header-height)] z-40 -mx-4 px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/10 mb-6">
          <SectionTitle title="LET'S COLLABORATE" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Desktop: Left Column - Title */}
          <div className="hidden md:block scroll-animate sticky top-[var(--header-height)] self-start">
            <SectionTitle title="LET'S COLLABORATE" />
            <p className="text-lg text-foreground/70 mt-6">
              Have an exciting project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
          </div>

          {/* Mobile: Description below title */}
          <div className="md:hidden mb-6">
            <p className="text-base md:text-lg text-foreground/70">
              Have an exciting project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
          </div>

          {/* Right Column - Contact Form */}
          <div className="md:col-span-2">
            <div className="scroll-animate">
              {/* Contact Card */}
              <div className="bg-background border border-border/30 rounded-2xl p-8 md:p-12 space-y-8">
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {submitted ? "Message Sent! 🎉" : "Send Message"}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-border/30"></div>
                  <span className="text-sm text-muted-foreground">OR CONNECT ON</span>
                  <div className="flex-1 h-px bg-border/30"></div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="px-4 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary font-semibold transition-all hover:scale-105 text-center text-sm md:text-base"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                {/* Direct Contact */}
                <div className="pt-6 border-t border-border/20 space-y-3 text-center">
                  <p className="text-foreground/70">
                    Or reach me directly at <span className="font-semibold text-primary">nmhieu04091999@gmail.com</span>
                  </p>
                  <p className="text-foreground/70">
                    Phone: <span className="font-semibold text-primary">0982084197</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
