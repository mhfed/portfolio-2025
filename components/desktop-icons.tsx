import { Laptop, Monitor } from "lucide-react";

export function DesktopIcons() {
  return (
    <div className="flex gap-3 md:gap-4">
      {/* Laptop Icon */}
      <div className="border-2 border-accent rounded-none px-4 md:px-6 py-3 md:py-4 hover:bg-accent/5 transition-colors">
        <Laptop className="w-8 h-8 md:w-10 md:h-10 text-accent" />
      </div>

      {/* Desk Icon */}
      <div className="border-2 border-accent rounded-none px-4 md:px-6 py-3 md:py-4 hover:bg-accent/5 transition-colors">
        <Monitor className="w-8 h-8 md:w-10 md:h-10 text-accent" />
      </div>
    </div>
  );
}
