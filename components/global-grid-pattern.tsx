"use client";

export function GlobalGridPattern() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 5,
        opacity: "var(--grid-opacity, 0.06)",
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        backgroundPosition: "0 0",
      }}
      aria-hidden="true"
    />
  );
}
