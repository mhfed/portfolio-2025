"use client";

import { ParallaxWrapper } from "./parallax-wrapper";

export function HeroBackground() {
  return (
    <>
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient overlay with subtle Dracula colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        
        {/* Animated gradient mesh - more vibrant */}
        <div className="absolute inset-0 opacity-40 dark:opacity-25">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/15 via-transparent to-[var(--cyan)]/12" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[var(--pink)]/12 via-transparent to-[var(--green)]/10" />
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-radial from-[var(--yellow)]/8 via-transparent to-transparent -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <ParallaxWrapper
        speed={0.3}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Large animated glows - more vibrant */}
        <div className="absolute top-24 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-24 right-10 w-[500px] h-[500px] bg-[var(--pink)]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[var(--cyan)]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse delay-2000" />
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-[var(--green)]/8 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Medium glows */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[var(--orange)]/6 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-[var(--yellow)]/5 rounded-full blur-2xl" />

        {/* Floating accent shapes - more dynamic */}
        <div className="absolute top-1/3 right-[18%] w-10 h-10 rounded-full bg-primary/30 shadow-lg animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 right-[8%] w-6 h-6 rotate-12 rounded-md bg-[var(--pink)]/40 shadow-lg animate-bounce delay-1000" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-[15%] w-5 h-5 -rotate-6 rounded-full bg-primary/40 shadow-lg animate-bounce delay-2000" style={{ animationDuration: '3.5s' }} />
        <div className="absolute top-1/4 left-[20%] w-8 h-8 rotate-45 rounded-md bg-[var(--green)]/35 shadow-lg animate-bounce delay-500" style={{ animationDuration: '4.5s' }} />
        <div className="absolute bottom-1/4 right-[25%] w-7 h-7 -rotate-12 rounded-full bg-[var(--orange)]/30 shadow-lg animate-bounce delay-1500" style={{ animationDuration: '3.8s' }} />
        <div className="absolute top-2/3 left-[10%] w-4 h-4 rotate-6 rounded-full bg-[var(--yellow)]/45 shadow-lg animate-bounce delay-2500" style={{ animationDuration: '4.2s' }} />
        <div className="absolute top-1/5 right-[30%] w-6 h-6 rotate-45 rounded-md bg-[var(--cyan)]/35 shadow-lg animate-bounce delay-3000" style={{ animationDuration: '3.2s' }} />
      </ParallaxWrapper>
    </>
  );
}
