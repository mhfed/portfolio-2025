"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, PlusCircle, Sun, Moon } from "lucide-react";
import { Drawer, DrawerContentLeft } from "@/components/ui/drawer";
import { AppAdminSidebar } from "@/components/admin/app-admin-sidebar";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  pathname: string;
}

export function AdminHeader({ pathname }: AdminHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (typeof document === "undefined") return;

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const displayIsDark = mounted ? isDark : false;

  const title = useMemo(() => {
    if (pathname === "/admin/add") return "Add project";
    if (pathname.startsWith("/admin/edit")) return "Edit project";
    if (pathname === "/admin/experiences") return "Work experience";
    if (pathname === "/admin/experiences/add") return "Add experience";
    if (pathname.startsWith("/admin/experiences/edit"))
      return "Edit experience";
    return "Dashboard";
  }, [pathname]);

  const description = useMemo(() => {
    if (pathname === "/admin/add") return "Create a new portfolio project";
    if (pathname.startsWith("/admin/edit"))
      return "Update an existing portfolio project";
    if (pathname === "/admin/experiences")
      return "Manage your work experience timeline";
    if (pathname === "/admin/experiences/add")
      return "Create a new work experience entry";
    if (pathname.startsWith("/admin/experiences/edit"))
      return "Update an existing work experience entry";
    return "Overview of your portfolio projects";
  }, [pathname]);

  const primaryAction = useMemo(() => {
    if (pathname === "/admin" || pathname.startsWith("/admin/edit")) {
      return {
        href: "/admin/add",
        label: "Add project",
      } as const;
    }

    if (
      pathname === "/admin/experiences" ||
      pathname.startsWith("/admin/experiences/edit")
    ) {
      return {
        href: "/admin/experiences/add",
        label: "Add experience",
      } as const;
    }

    return null;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 md:gap-3 md:px-6 md:py-3 lg:px-8">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
          {/* Mobile sidebar trigger */}
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden touch-manipulation"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/admin" className="hover:text-foreground">
                Admin
              </Link>
              <span className="text-border">/</span>
              <span className="text-foreground/80">{title}</span>
            </div>
            <h1 className="text-sm font-semibold leading-tight tracking-tight truncate md:text-base lg:text-lg">
              {title}
            </h1>
            <p className="hidden md:block text-xs text-muted-foreground md:text-sm">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/50 bg-background text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-manipulation"
            aria-label="Toggle theme"
          >
            {displayIsDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {primaryAction && (
            <Link
              href={primaryAction.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border border-primary/60 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground touch-manipulation",
                "md:px-3 md:text-sm",
              )}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{primaryAction.label}</span>
              <span className="sm:hidden">Add</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <Drawer
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        direction="left"
      >
        <DrawerContentLeft className="border-sidebar-border bg-sidebar text-sidebar-foreground">
          <AppAdminSidebar
            variant="mobile"
            onLinkClick={() => setMobileOpen(false)}
          />
        </DrawerContentLeft>
      </Drawer>
    </header>
  );
}
