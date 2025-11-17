"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const t = useTranslations("collaborate");
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      toast({
        variant: "success",
        title: t("form.messageSent"),
        description: "I'll get back to you soon!",
      });

      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            {t("form.yourName")}
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`w-full px-4 py-3 bg-background border rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors ${
              errors.name ? "border-destructive" : "border-border/30"
            }`}
            placeholder={t("form.namePlaceholder")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground mb-3"
          >
            {t("form.emailAddress")}
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full px-4 py-3 bg-background border rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors ${
              errors.email ? "border-destructive" : "border-border/30"
            }`}
            placeholder={t("form.emailPlaceholder")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-foreground mb-3"
        >
          {t("form.message")}
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          className={`w-full px-4 py-3 bg-background border rounded-none text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none ${
            errors.message ? "border-destructive" : "border-border/30"
          }`}
          placeholder={t("form.messagePlaceholder")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          t("form.sendMessage")
        )}
      </button>
    </form>
  );
}
