"use client";

import { ParallaxWrapper } from "./parallax-wrapper";

export function HeroBackground() {
  return (
    <ParallaxWrapper
      speed={0.3}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Large soft glows */}
      <div className="absolute top-24 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Small floating accent shapes to mimic portfolio hero */}
      <div className="absolute top-1/3 right-[18%] w-8 h-8 rounded-full bg-primary/20 shadow-sm" />
      <div className="absolute top-1/2 right-[8%] w-5 h-5 rotate-12 rounded-md bg-accent/40 shadow-sm" />
      <div className="absolute bottom-1/3 left-[15%] w-4 h-4 -rotate-6 rounded-full bg-primary/30 shadow-sm" />
    </ParallaxWrapper>
  );
}
