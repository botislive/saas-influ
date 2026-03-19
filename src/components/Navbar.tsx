"use client";

import React from "react";
import { Search, Bell, Megaphone, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-[280px] z-30 h-16 border-b border-black/5 bg-background-primary/80 backdrop-blur-md flex items-center justify-between px-8">
      {/* Title */}
      <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary group-focus-within:text-accent-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full h-10 bg-surface-interactive/50 border border-black/5 rounded-xl pl-10 pr-12 text-sm text-text-primary focus:outline-none focus:border-accent-primary/50 focus:bg-surface-interactive transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-elevated border border-black/10">
            <span className="text-[10px] font-medium text-text-tertiary">⌘</span>
            <span className="text-[10px] font-medium text-text-tertiary">K</span>
          </div>
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border-r border-black/5 pr-4">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
            <Megaphone className="h-4 w-4 text-text-secondary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
            <Bell className="h-4 w-4 text-text-secondary" />
          </Button>
        </div>
        
        <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-surface-interactive/50 transition-all group">
          <div className="h-8 w-8 rounded-lg bg-surface-elevated border border-black/10 flex items-center justify-center overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=easton" alt="Easton Cox" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col items-start sr-only sm:not-sr-only">
            <span className="text-sm font-medium text-text-primary">Easton Cox</span>
            <span className="text-[10px] text-text-tertiary">Creator Pro</span>
          </div>
          <ChevronDown className="h-4 w-4 text-text-tertiary group-hover:text-text-primary transition-all" />
        </button>
      </div>
    </header>
  );
}
