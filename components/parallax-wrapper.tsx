"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  className = "",
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const offset = rect.top + scrolled;
      const yPos = -(scrolled - offset) * speed;

      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    };

    // Throttle scroll events for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
