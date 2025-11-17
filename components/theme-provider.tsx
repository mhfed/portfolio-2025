"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = localStorage.getItem("theme");

      // Nếu không có theme được lưu, sử dụng system preference
      if (!savedTheme) {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        if (systemPrefersDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else {
        // Nếu có theme được set manually, sử dụng theme đó
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    // Apply theme lần đầu
    applyTheme();
    setMounted(true);

    // Listen to system preference changes (chỉ khi không có theme được set manually)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      // Chỉ update nếu không có theme được set manually
      if (!localStorage.getItem("theme")) {
        applyTheme();
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
