"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/mhfed", icon: "github" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/mhfed",
      icon: "linkedin",
    },
    { name: "Twitter", url: "#", icon: "twitter" },
    { name: "Dribbble", url: "#", icon: "dribbble" },
    { name: "Behance", url: "#", icon: "behance" },
  ];

  return (
    <section id="contact" className="py-8 md:py-12 lg:py-16 px-6 scroll-mt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--cyan)]/5 via-transparent to-[var(--green)]/5" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-[var(--pink)]/5 to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <span className="text-[var(--cyan)] text-h2 font-bold">&lt;</span>
          <h2 className="text-h2 text-foreground text-balance">GET IN TOUCH</h2>
          <span className="text-[var(--cyan)] text-h2 font-bold">/&gt;</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Contact Form */}
          <div className="bg-background-secondary dark:bg-background/50 border border-[var(--cyan)]/50 rounded-lg p-8 md:p-10 hover:border-[var(--green)]/50 transition-colors">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message here..."
                />
              </div>

              <Button
                type="submit"
                disabled={submitted}
                className="w-full"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, idx) => {
                  const colorClasses = [
                    "bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary",
                    "bg-[var(--cyan)]/10 hover:bg-[var(--cyan)]/20 border-[var(--cyan)]/30 text-[var(--cyan)]",
                    "bg-[var(--green)]/10 hover:bg-[var(--green)]/20 border-[var(--green)]/30 text-[var(--green)]",
                    "bg-[var(--pink)]/10 hover:bg-[var(--pink)]/20 border-[var(--pink)]/30 text-[var(--pink)]",
                    "bg-[var(--orange)]/10 hover:bg-[var(--orange)]/20 border-[var(--orange)]/30 text-[var(--orange)]",
                  ];
                  return (
                    <Button
                      key={link.name}
                      variant="outline"
                      asChild
                      className={`${colorClasses[idx % colorClasses.length]} font-semibold hover:scale-105`}
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg font-bold text-foreground">
                Other Ways To Reach Me
              </h3>
              <div className="space-y-3 text-foreground/70">
                <p>
                  <span className="font-semibold text-foreground">Email:</span>{" "}
                  nmhieu04091999@gmail.com
                </p>
                <p>
                  <span className="font-semibold text-foreground">Phone:</span>{" "}
                  0982084197
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Location:
                  </span>{" "}
                  Ha Noi, Vietnam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
