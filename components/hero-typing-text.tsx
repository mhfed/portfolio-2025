"use client";

import { useRef, useLayoutEffect } from "react";

interface HeroTypingTextProps {
  frontText: string;
  middleText: string;
  endText: string;
}

export function HeroTypingText({
  frontText,
  middleText,
  endText,
}: HeroTypingTextProps) {
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!line1Ref.current || !line2Ref.current) return;

    // Dynamically import GSAP only when needed
    import("gsap").then(({ gsap }) => {
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      if (!line1 || !line2) return;

      // Clear previous content
      line1.innerHTML = "";
      line2.innerHTML = "";

      // Get text color
      const textColor = window.getComputedStyle(line1).color;

      // Helper function to create character wrapper
      const createCharWrapper = (char: string) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        wrapper.style.paddingRight = "2px"; // Add small padding to prevent clipping

        // Create stroke layer (always visible)
        const stroke = document.createElement("span");
        stroke.textContent = char === " " ? "\u00A0" : char;
        stroke.style.position = "absolute";
        stroke.style.left = "0";
        stroke.style.top = "0";
        stroke.style.color = "transparent";
        stroke.style.webkitTextStroke = `2px ${textColor}`;

        // Create fill layer (fade in)
        const fill = document.createElement("span");
        fill.textContent = char === " " ? "\u00A0" : char;
        fill.style.position = "relative";
        fill.style.color = textColor;
        fill.style.opacity = "0";

        wrapper.appendChild(stroke);
        wrapper.appendChild(fill);

        return { wrapper, fill, stroke };
      };

      // Line 1: frontText + middleText
      const line1Text = `${frontText} ${middleText}`;
      const line1Wrappers: HTMLSpanElement[] = [];
      const line1Fills: HTMLSpanElement[] = [];
      const line1Strokes: HTMLSpanElement[] = [];

      line1Text.split("").forEach((char) => {
        const { wrapper, fill, stroke } = createCharWrapper(char);
        gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" });
        line1.appendChild(wrapper);
        line1Wrappers.push(wrapper);
        line1Fills.push(fill);
        line1Strokes.push(stroke);
      });

      // Line 2: endText
      const line2Wrappers: HTMLSpanElement[] = [];
      const line2Fills: HTMLSpanElement[] = [];
      const line2Strokes: HTMLSpanElement[] = [];

      endText.split("").forEach((char) => {
        const { wrapper, fill, stroke } = createCharWrapper(char);
        gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" });
        line2.appendChild(wrapper);
        line2Wrappers.push(wrapper);
        line2Fills.push(fill);
        line2Strokes.push(stroke);
      });

      const allWrappers = [...line1Wrappers, ...line2Wrappers];
      const allFills = [...line1Fills, ...line2Fills];
      const allStrokes = [...line1Strokes, ...line2Strokes];

      // Create animation timeline
      const tl = gsap.timeline();

      // Animate typing effect (reveal each character)
      // Use slightly negative right value to ensure no clipping
      tl.to(allWrappers, {
        clipPath: "inset(0 -1px 0 -1px)",
        duration: 0.3,
        ease: "none",
        stagger: 0.08,
      });

      // Fill color by fading in the fill layer
      tl.to(
        allFills,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0.2",
      );

      // Watch for theme changes
      const updateColors = () => {
        const newTextColor = window.getComputedStyle(line1).color;
        allFills.forEach((fill) => {
          fill.style.color = newTextColor;
        });
        allStrokes.forEach((stroke) => {
          stroke.style.webkitTextStroke = `2px ${newTextColor}`;
        });
      };

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
  }, [frontText, middleText, endText]);

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3 overflow-visible w-full">
      <h1
        ref={line1Ref}
        className="text-display text-primary text-left min-h-[1.2em] leading-tight tracking-tight overflow-visible w-full"
      />
      <h1
        ref={line2Ref}
        className="text-display text-primary text-left min-h-[1.2em] leading-tight tracking-tight overflow-visible w-full"
      />
    </div>
  );
}
