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
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const fillsRef = useRef<HTMLSpanElement[]>([]);
  const strokesRef = useRef<HTMLSpanElement[]>([]);

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
      fillsRef.current = [];
      strokesRef.current = [];

      // Function to update colors based on current theme
      const updateColors = () => {
        const textColor = window.getComputedStyle(line1).color;
        fillsRef.current.forEach((fill) => {
          fill.style.color = textColor;
        });
        strokesRef.current.forEach((stroke) => {
          stroke.style.webkitTextStroke = `2px ${textColor}`;
        });
      };

      // Get initial text color
      const textColor = window.getComputedStyle(line1).color;

      // Split text into characters for line 1 (frontText + middleText)
      const line1Text = `${frontText} ${middleText}`;
      const line1Wrappers: HTMLSpanElement[] = [];
      const line1Fills: HTMLSpanElement[] = [];

      line1Text.split("").forEach((char) => {
        // Create wrapper
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";

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

        gsap.set(wrapper, { clipPath: "inset(0 100% 0 0)" });

        line1.appendChild(wrapper);
        line1Wrappers.push(wrapper);
        line1Fills.push(fill);
        fillsRef.current.push(fill);
        strokesRef.current.push(stroke);
      });

      // Split text into characters for line 2 (endText)
      const line2Wrappers: HTMLSpanElement[] = [];
      const line2Fills: HTMLSpanElement[] = [];

      endText.split("").forEach((char) => {
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

        line2.appendChild(wrapper);
        line2Wrappers.push(wrapper);
        line2Fills.push(fill);
        fillsRef.current.push(fill);
        strokesRef.current.push(stroke);
      });

      const allFills = [...line1Fills, ...line2Fills];

      // Create animation timeline
      const tl = gsap.timeline();

      // Animate line 1 characters (writing effect)
      tl.to(line1Wrappers, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.3,
        ease: "none",
        stagger: 0.08,
      });

      // Animate line 2 characters (writing effect)
      tl.to(
        line2Wrappers,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.3,
          ease: "none",
          stagger: 0.08,
        },
        "-=0.2"
      );

      // Fill color by fading in the fill layer
      tl.to(
        allFills,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0.2"
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
  }, [frontText, middleText, endText]);

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <h1
        ref={line1Ref}
        className="text-display text-primary text-center min-h-[1.2em]"
      />
      <h1
        ref={line2Ref}
        className="text-display text-primary text-center min-h-[1.2em]"
      />
    </div>
  );
}

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
        "+=0.2"
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
