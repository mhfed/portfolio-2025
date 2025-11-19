"use client";

export { HeroTypingText } from "@/components/magicui/hero-typing-text";

// Keep the old GSAP implementation for HeroDeveloperText
import { useRef, useLayoutEffect } from "react";

export function HeroDeveloperText({
  developerText,
}: {
  developerText: string;
}) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const fillsRef = useRef<HTMLSpanElement[]>([]);
  const strokesRef = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    // Dynamically import GSAP only when needed
    import("gsap").then(({ gsap }) => {
      const container = textRef.current;
      if (!container) return;

      container.innerHTML = "";
      fillsRef.current = [];
      strokesRef.current = [];

      // Function to update colors based on current theme
      const updateColors = () => {
        const textColor = window.getComputedStyle(container).color;
        fillsRef.current.forEach((fill) => {
          fill.style.color = textColor;
        });
        strokesRef.current.forEach((stroke) => {
          stroke.style.webkitTextStroke = `2px ${textColor}`;
        });
      };

      const textColor = window.getComputedStyle(container).color;

      // Split into characters
      const wrappers: HTMLSpanElement[] = [];
      const fills: HTMLSpanElement[] = [];

      developerText.split("").forEach((char) => {
        // Create wrapper
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";

        // Create stroke layer
        const stroke = document.createElement("span");
        stroke.textContent = char === " " ? "\u00A0" : char;
        stroke.style.position = "absolute";
        stroke.style.left = "0";
        stroke.style.top = "0";
        stroke.style.color = "transparent";
        stroke.style.webkitTextStroke = `2px ${textColor}`;

        // Create fill layer
        const fill = document.createElement("span");
        fill.textContent = char === " " ? "\u00A0" : char;
        fill.style.position = "relative";
        fill.style.color = textColor;
        fill.style.opacity = "0";

        wrapper.appendChild(stroke);
        wrapper.appendChild(fill);

        gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" });

        container.appendChild(wrapper);
        wrappers.push(wrapper);
        fills.push(fill);
        fillsRef.current.push(fill);
        strokesRef.current.push(stroke);
      });

      // Animate
      const tl = gsap.timeline();

      // Writing effect
      tl.to(wrappers, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.3,
        ease: "none",
        stagger: 0.1,
      });

      // Fill color by fading in
      tl.to(
        fills,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0.2",
      );

      // Watch for theme changes
      const observer = new MutationObserver(() => {
        updateColors();
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => {
        tl.kill();
        observer.disconnect();
      };
    });
  }, [developerText]);

  return <h2 ref={textRef} className="text-h1 text-primary min-h-[1.2em]" />;
}
