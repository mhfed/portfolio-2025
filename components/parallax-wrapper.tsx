"use client";

// Simple wrapper component without parallax effect
export function ParallaxWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
