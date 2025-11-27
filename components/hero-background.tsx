"use client";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-none blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-none blur-3xl" />
    </div>
  );
}
