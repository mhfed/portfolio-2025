"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroTypingTextProps {
  frontText: string;
  middleText: string;
  endText: string;
  className?: string;
}

export function HeroTypingText({
  frontText,
  middleText,
  endText,
  className,
}: HeroTypingTextProps) {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(line1Ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [textColor, setTextColor] = useState("currentColor");

  useEffect(() => {
    const updateColor = () => {
      if (line1Ref.current) {
        const color = window.getComputedStyle(line1Ref.current).color;
        setTextColor(color);
      }
    };

    updateColor();

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      updateColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const line1Text = `${frontText} ${middleText}`;
  const line1Chars = line1Text.split("");
  const line2Chars = endText.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const characterVariants = {
    hidden: {
      clipPath: "inset(0 100% 0 0)",
    },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      transition: {
        duration: 0.3,
        ease: "linear",
      },
    },
  };

  const fillVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-col items-start gap-2 md:gap-3", className)}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <h1
        ref={line1Ref}
        className="text-display text-primary text-center min-h-[1.2em]"
      >
        {line1Chars.map((char, index) => (
          <motion.span
            key={`line1-${index}`}
            className="inline-block relative"
            variants={characterVariants}
          >
            <span
              className="absolute inset-0"
              style={{
                color: "transparent",
                WebkitTextStroke: `2px ${textColor}`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            <motion.span
              className="relative"
              style={{ color: textColor }}
              variants={fillVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </motion.span>
        ))}
      </h1>
      <h1
        ref={line2Ref}
        className="text-display text-primary text-center min-h-[1.2em]"
      >
        {line2Chars.map((char, index) => (
          <motion.span
            key={`line2-${index}`}
            className="inline-block relative"
            variants={characterVariants}
          >
            <span
              className="absolute inset-0"
              style={{
                color: "transparent",
                WebkitTextStroke: `2px ${textColor}`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            <motion.span
              className="relative"
              style={{ color: textColor }}
              variants={fillVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </motion.span>
        ))}
      </h1>
    </motion.div>
  );
}

