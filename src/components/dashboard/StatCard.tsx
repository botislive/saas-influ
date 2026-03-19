"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  progress?: number;
  icon?: React.ReactNode;
  chartColor?: string;
  sparklineData?: number[]; // Keeping this for backward compatibility if used anywhere else
}

export function StatCard({ title, value, change, trend, progress = Math.floor(Math.random() * 60) + 30, icon, chartColor, sparklineData }: StatCardProps) {
  const isUp = trend === "up";
  const strokeColor = chartColor || (isUp ? "var(--color-success)" : "var(--color-danger)");

  return (
    <Card className="hover:shadow-level-2 hover:-translate-y-1 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">{title}</span>
          <div className="h-10 w-10 rounded-xl bg-surface-interactive/50 border border-black/5 flex items-center justify-center text-text-tertiary group-hover:text-accent-primary transition-colors">
            {icon}
          </div>
        </div>

        <div className="flex flex-col z-10 w-full mb-4">
          <div className="text-3xl lg:text-4xl font-mono font-semibold text-text-primary tracking-tight leading-none mb-3">
            <AnimatedCounter value={value} />
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Badge 
              variant="outline" 
              className={cn(
                "h-5 px-1.5 gap-1 border-none bg-opacity-20", 
                isUp ? "text-success bg-success/10" : "text-danger bg-danger/10"
              )}
              style={{ color: strokeColor, backgroundColor: `${strokeColor}20` }}
            >
              {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {change}
            </Badge>
            <span className="text-[10px] text-text-tertiary">vs last month</span>
          </div>
        </div>

        <div className="flex flex-col mt-2">
          <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: strokeColor }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] sm:text-xs text-text-tertiary">0%</span>
            <span className="text-[10px] sm:text-xs text-text-tertiary">{progress}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
