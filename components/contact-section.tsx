"use client"

import type React from "react"

import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/mhfed", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/mhfed", icon: "linkedin" },
    { name: "Twitter", url: "#", icon: "twitter" },
    { name: "Dribbble", url: "#", icon: "dribbble" },
    { name: "Behance", url: "#", icon: "behance" },
  ]

  return (
    <section id="contact" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <span className="text-accent text-4xl md:text-5xl font-black">&lt;</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground text-balance">GET IN TOUCH</h2>
          <span className="text-accent text-4xl md:text-5xl font-black">/&gt;</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contact Form */}
          <div className="bg-background-secondary dark:bg-background/50 border border-border/20 rounded-2xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
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
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
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

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
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
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="px-6 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary font-semibold transition-all hover:scale-105 text-center"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Other Ways To Reach Me</h3>
              <div className="space-y-3 text-foreground/70">
                <p>
                  <span className="font-semibold text-foreground">Email:</span> nmhieu04091999@gmail.com
                </p>
                <p>
                  <span className="font-semibold text-foreground">Phone:</span> 0982084197
                </p>
                <p>
                  <span className="font-semibold text-foreground">Location:</span> Ha Noi, Vietnam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
