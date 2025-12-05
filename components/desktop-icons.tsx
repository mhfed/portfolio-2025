import { Laptop, Monitor } from "lucide-react";

export function DesktopIcons() {
  return (
    <div className="flex gap-3 md:gap-4">
      {/* Laptop Icon */}
      <div className="border-2 border-[var(--cyan)] rounded-md px-4 md:px-6 py-3 md:py-4 hover:bg-[var(--cyan)]/5 transition-colors">
        <Laptop className="w-8 h-8 md:w-10 md:h-10 text-[var(--cyan)]" />
      </div>

      {/* Desk Icon */}
      <div className="border-2 border-[var(--green)] rounded-md px-4 md:px-6 py-3 md:py-4 hover:bg-[var(--green)]/5 transition-colors">
        <Monitor className="w-8 h-8 md:w-10 md:h-10 text-[var(--green)]" />
      </div>
    </div>
  );
}
