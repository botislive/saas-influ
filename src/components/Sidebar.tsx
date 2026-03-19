"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText,
  Link2,
  Zap
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: FileText, label: "All Posts", href: "/all-posts" },
  { icon: Link2, label: "Connect Accounts", href: "/connect-accounts" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[280px] border-r border-black/5 bg-background-primary flex flex-col p-6">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="h-8 w-8 rounded-lg bg-accent-primary flex items-center justify-center">
          <Zap className="h-5 w-5 text-text-primary fill-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-text-primary">INFLU</span>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                isActive 
                  ? "bg-surface-interactive text-text-primary border-l-4 border-accent-primary" 
                  : "text-text-secondary hover:bg-surface-interactive/50 hover:text-text-primary"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-accent-primary" : "text-text-tertiary group-hover:text-text-secondary"
              )} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
