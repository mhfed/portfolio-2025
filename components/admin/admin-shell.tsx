"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppAdminSidebar } from "@/components/admin/app-admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background md:pl-64">
      {/* Sidebar */}
      <AppAdminSidebar />

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col border-l border-sidebar-border bg-background">
        <AdminHeader pathname={pathname} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex h-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
