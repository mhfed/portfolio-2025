"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Sun, Moon, Languages } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { routing } from "@/i18n/routing";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollProgress } from "./ui/scroll-progress";
import { useLenis } from "@/components/providers/lenis-provider";

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const t = useTranslations("header.nav");
  const tContact = useTranslations("hero.contact");
  const { locale, setLocale, isLoading } = useLocale();
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLanguageChange = (newLocale: "en" | "vi") => {
    setLocale(newLocale);
    setIsLanguageMenuOpen(false);
  };

  const navLinks = [
    { name: t("about"), href: "#about", key: "about" },
    { name: t("experience"), href: "#experience", key: "experience" },
    { name: t("projects"), href: "#projects", key: "projects" },
    { name: t("collaborate"), href: "#collaborate", key: "collaborate" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    const element = document.querySelector(href) as HTMLElement | null;
    if (element && lenis) {
      // Get header height for offset
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ) || "60",
      );
      lenis.scrollTo(element, {
        offset: -headerHeight,
        duration: 1.2,
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Render header immediately to prevent layout shift, use default values until mounted
  const displayIsDark = mounted ? isDark : false;

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/10 relative"
        style={{ height: "var(--header-height)" }}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          <ScrollProgress className="h-0.5 top-[var(--header-height)]" />

          {/* Contact Info - Left Side (2 columns) */}
          <div className="flex flex-row gap-6 md:gap-8 flex-shrink-0 min-w-0">
            {/* Based in */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] md:text-xs text-foreground/60 font-medium uppercase tracking-wider">
                {tContact("basedIn")}
              </span>
              <span className="text-xs md:text-sm text-foreground/80 font-semibold truncate">
                {tContact("location")}
              </span>
            </div>

            {/* Say hello */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] md:text-xs text-foreground/60 font-medium uppercase tracking-wider">
                {tContact("sayHello")}
              </span>
              <a
                href={`mailto:${tContact("email")}`}
                className="text-xs md:text-sm text-foreground/80 font-semibold underline hover:text-primary transition-colors truncate"
              >
                {tContact("email")}
              </a>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={handleNavClick}
                className="text-foreground/80 hover:text-primary transition-all duration-300 ease-in-out text-sm font-medium uppercase relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            {/* Language Switcher - Desktop only */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 rounded-md hover:bg-primary/10 transition-all duration-300 ease-in-out hover:scale-110 touch-manipulation cursor-pointer"
                aria-label="Change language"
              >
                <Languages className="w-4 h-4 text-foreground transition-transform duration-300" />
              </button>

              {isLanguageMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-background border border-border/30 rounded-lg shadow-lg z-50 min-w-[120px] overflow-hidden">
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-md cursor-pointer hover:scale-[1.02] ${
                          locale === loc ? "bg-primary/20 font-semibold" : ""
                        }`}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle - Desktop only */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 ease-in-out hover:scale-110 touch-manipulation cursor-pointer"
              aria-label="Toggle theme"
            >
              {displayIsDark ? (
                <Sun className="w-4 h-4 text-foreground transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-foreground transition-transform duration-300" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex flex-col gap-1.5 w-7 h-7 justify-center items-center touch-manipulation p-1 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Bottom Sheet */}
      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerContent className="max-h-[85vh]">
          <nav className="flex flex-col h-full">
            {/* Navigation Links */}
            <div className="flex flex-col p-6 gap-1 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-foreground hover:text-primary transition-all duration-300 ease-in-out text-base font-semibold uppercase py-4 px-4 rounded-md hover:bg-primary/10 active:bg-primary/20 touch-manipulation hover:scale-[1.02]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Actions - Language & Theme */}
            <div className="border-t border-border/30 p-4 space-y-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-md hover:bg-primary/10 transition-colors touch-manipulation cursor-pointer"
                  aria-label="Change language"
                >
                  <span className="text-sm font-medium text-foreground">
                    Language
                  </span>
                  <Languages className="w-5 h-5 text-foreground" />
                </button>

                {isLanguageMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsLanguageMenuOpen(false)}
                    />
                    <div className="absolute left-0 right-0 bottom-full mb-2 bg-background border border-border/30 rounded-lg shadow-lg z-50">
                      {routing.locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-primary/10 transition-colors rounded-md cursor-pointer ${
                            locale === loc ? "bg-primary/20 font-semibold" : ""
                          }`}
                        >
                          {loc.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors touch-manipulation cursor-pointer"
                aria-label="Toggle theme"
              >
                <span className="text-sm font-medium text-foreground">
                  Theme
                </span>
                {displayIsDark ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  );
}
