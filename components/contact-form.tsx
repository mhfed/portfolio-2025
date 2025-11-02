"use client"

import type React from "react"
import { useState } from "react"
import { useTranslations } from "next-intl"

export function ContactForm() {
  const t = useTranslations('collaborate')
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
            {t('form.yourName')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder={t('form.namePlaceholder')}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
            {t('form.emailAddress')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            placeholder={t('form.emailPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-3">
          {t('form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-background border border-border/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder={t('form.messagePlaceholder')}
        />
      </div>

      <button
        type="submit"
        disabled={submitted}
        className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-colors disabled:opacity-50"
      >
        {submitted ? t('form.messageSent') : t('form.sendMessage')}
      </button>
    </form>
  )
}

