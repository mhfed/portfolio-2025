export function DesktopIcons() {
  return (
    <div className="flex gap-3 md:gap-4">
      {/* Laptop Icon */}
      <div className="border-2 border-accent rounded-none px-4 md:px-6 py-3 md:py-4 hover:bg-accent/5 transition-colors">
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <path d="M2 17h20" />
          <path d="M6 20h12" />
        </svg>
      </div>

      {/* Desk Icon */}
      <div className="border-2 border-accent rounded-none px-4 md:px-6 py-3 md:py-4 hover:bg-accent/5 transition-colors">
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M12 8v8" />
          <rect x="4" y="16" width="16" height="2" />
        </svg>
      </div>
    </div>
  );
}
