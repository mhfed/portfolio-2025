"use client";

import { useRef, useLayoutEffect, useState } from "react";

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
  const [line1Complete, setLine1Complete] = useState(false);
  const fillsRef1 = useRef<HTMLSpanElement[]>([]);
  const strokesRef1 = useRef<HTMLSpanElement[]>([]);
  const fillsRef2 = useRef<HTMLSpanElement[]>([]);
  const strokesRef2 = useRef<HTMLSpanElement[]>([]);

  const line1Text = `${frontText} ${middleText}`;

  useLayoutEffect(() => {
    if (!line1Ref.current) return;

    // Dynamically import GSAP only when needed
    import("gsap").then(({ gsap }) => {
      const container = line1Ref.current;
      if (!container) return;

      container.innerHTML = "";
      fillsRef1.current = [];
      strokesRef1.current = [];

      // Function to update colors based on current theme
      const updateColors = () => {
        const textColor = window.getComputedStyle(container).color;
        fillsRef1.current.forEach((fill) => {
          fill.style.color = textColor;
        });
        strokesRef1.current.forEach((stroke) => {
          stroke.style.webkitTextStroke = `2px ${textColor}`;
        });
      };

      const textColor = window.getComputedStyle(container).color;

      // Split into characters
      const wrappers: HTMLSpanElement[] = [];
      const fills: HTMLSpanElement[] = [];

      line1Text.split("").forEach((char) => {
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
        fillsRef1.current.push(fill);
        strokesRef1.current.push(stroke);
      });

      // Animate
      const tl = gsap.timeline({
        onComplete: () => {
          setLine1Complete(true);
        },
      });

      // Writing effect
      tl.to(wrappers, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.3,
        ease: "none",
        stagger: 0.08,
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
  }, [line1Text]);

  useLayoutEffect(() => {
    if (!line1Complete || !line2Ref.current) return;

    // Dynamically import GSAP only when needed
    import("gsap").then(({ gsap }) => {
      const container = line2Ref.current;
      if (!container) return;

      container.innerHTML = "";
      fillsRef2.current = [];
      strokesRef2.current = [];

      // Function to update colors based on current theme
      const updateColors = () => {
        const textColor = window.getComputedStyle(container).color;
        fillsRef2.current.forEach((fill) => {
          fill.style.color = textColor;
        });
        strokesRef2.current.forEach((stroke) => {
          stroke.style.webkitTextStroke = `2px ${textColor}`;
        });
      };

      const textColor = window.getComputedStyle(container).color;

      // Split into characters
      const wrappers: HTMLSpanElement[] = [];
      const fills: HTMLSpanElement[] = [];

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

        container.appendChild(wrapper);
        wrappers.push(wrapper);
        fills.push(fill);
        fillsRef2.current.push(fill);
        strokesRef2.current.push(stroke);
      });

      // Animate
      const tl = gsap.timeline();

      // Writing effect
      tl.to(wrappers, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.3,
        ease: "none",
        stagger: 0.08,
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
  }, [line1Complete, endText]);

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <h1 ref={line1Ref} className="text-display text-primary text-center min-h-[1.2em]" />
      {line1Complete && (
        <h1 ref={line2Ref} className="text-display text-primary text-center min-h-[1.2em]" />
      )}
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
