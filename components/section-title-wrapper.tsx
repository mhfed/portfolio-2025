import type React from "react";
import { SectionTitle } from "./section-title";

interface SectionTitleWrapperProps {
  title: string;
  desktopContent?: React.ReactNode;
  className?: string;
  sectionId?: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export function SectionTitleWrapper({
  title,
  desktopContent,
  className = "",
  sectionId,
  mobileOnly = false,
  desktopOnly = false,
}: SectionTitleWrapperProps) {
  return (
    <>
      {/* Mobile: Full width title - positioned outside grid, not sticky */}
      {!desktopOnly && (
        <div className={`md:hidden scroll-animate w-full py-6 ${className}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <SectionTitle title={title} />
          </div>
        </div>
      )}

      {/* Desktop: Left Column - Title */}
      {!mobileOnly && (
        <div
          className={`hidden md:block scroll-animate sticky top-[var(--header-height)] self-start min-w-0 max-w-full ${className}`}
        >
          <SectionTitle title={title} />
          {desktopContent}
        </div>
      )}
    </>
  );
}
