"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Globe2,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin",
    icon: FolderKanban,
  },
  {
    label: "Add project",
    href: "/admin/add",
    icon: PlusCircle,
  },
  {
    label: "Work experience",
    href: "/admin/experiences",
    icon: Briefcase,
  },
  {
    label: "Add experience",
    href: "/admin/experiences/add",
    icon: PlusCircle,
  },
];

export function AppAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold uppercase">
          HM
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">
            Admin
          </span>
          <span className="text-xs text-sidebar-foreground/60">
            Portfolio CMS
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin" || pathname.startsWith("/admin/edit")
              : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-4 py-3 text-xs text-sidebar-foreground/60 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-sidebar-foreground/90"
        >
          <Globe2 className="h-3.5 w-3.5" />
          <span>View site</span>
        </Link>
        <span className="text-[10px] uppercase tracking-wide">v1 Admin</span>
      </div>
    </aside>
  );
}
