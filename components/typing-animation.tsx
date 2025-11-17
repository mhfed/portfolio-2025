"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function TypingAnimation({
  text,
  speed = 100,
  className = "",
  showCursor = true,
  onComplete,
}: TypingAnimationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cursorTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const onCompleteRef = useRef(onComplete);
  const initializedRef = useRef(false);

  // Update callback ref when it changes
  useLayoutEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    if (!text || !containerRef.current || initializedRef.current) return;

    initializedRef.current = true;

    // Cleanup previous animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (cursorTimelineRef.current) {
      cursorTimelineRef.current.kill();
    }

    const container = containerRef.current;
    container.innerHTML = "";

    // Get color from parent
    const parentElement = container.parentElement;
    const computedStyle = parentElement
      ? window.getComputedStyle(parentElement)
      : null;
    const textColor = computedStyle?.color || "currentColor";

    // Create character spans
    const characters = text.split("");
    const spans: HTMLSpanElement[] = [];

    characters.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.color = "transparent";
      span.style.webkitTextStroke = `2px ${textColor}`;

      gsap.set(span, {
        clipPath: "inset(0 100% 0 0)",
      });

      container.appendChild(span);
      spans.push(span);
    });

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current?.();
      },
    });

    tl.to(spans, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.3,
      ease: "none",
      stagger: speed / 1000,
    });

    timelineRef.current = tl;

    // Cursor animation
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });

      const cursorTl = gsap.timeline({ repeat: -1 });
      cursorTl.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
      cursorTl.to(cursorRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      });

      cursorTimelineRef.current = cursorTl;

      tl.call(() => {
        cursorTl.kill();
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
        }
      });
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (cursorTimelineRef.current) {
        cursorTimelineRef.current.kill();
      }
    };
  }, [text, speed, showCursor]);

  return (
    <span className={className}>
      <span ref={containerRef} style={{ display: "inline-block" }} />
      {showCursor && (
        <span
          ref={cursorRef}
          className="inline-block w-0.5 h-full bg-current ml-1"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          |
        </span>
      )}
    </span>
  );
}
