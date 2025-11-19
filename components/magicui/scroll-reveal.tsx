"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  distance?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.1,
  });

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    fade: { x: 0, y: 0 },
  };

  const initial = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

