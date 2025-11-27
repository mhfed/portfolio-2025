"use client";

import { useEffect } from "react";

export function ScrollObserver() {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll as EventListener);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll as EventListener);
      });
    };
  }, []);

  return null;
}
