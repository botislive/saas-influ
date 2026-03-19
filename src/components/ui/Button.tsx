"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "paper";
  size?: "sm" | "md" | "lg" | "icon";
  isMagnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isMagnetic = true, children, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
      if (!isMagnetic || !buttonRef.current) return;

      const btn = buttonRef.current;
      const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        // Limited movement for magnetic effect
        xTo(x * 0.3);
        yTo(y * 0.3);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [isMagnetic]);

    const variants = {
      primary: "bg-accent-primary text-white shadow-[var(--shadow-level-1)] hover:brightness-110 active:scale-[0.98]",
      secondary: "border border-[var(--color-border-medium)] bg-transparent text-text-primary hover:bg-surface-interactive",
      ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-interactive active:border-l-[3px] active:border-accent-primary",
      paper: "group relative overflow-hidden bg-[#1E293B] text-white transition-all duration-300 shadow-[0_8px_16px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-[1.02] hover:brightness-110",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-6 py-3 text-sm font-medium",
      lg: "px-8 py-4 text-base font-semibold",
      icon: "h-10 w-10 flex items-center justify-center p-0",
    };

    return (
      <button
        ref={buttonRef}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {variant === "paper" && (
          <>
            {/* Gradient Border Mask */}
            <div className="absolute inset-0 p-[2px] rounded-inherit bg-[conic-gradient(from_180deg_at_50%_50%,#3B82F6_0deg,#8B5CF6_120deg,#EC4899_240deg,#3B82F6_360deg)] group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-[2px] rounded-[10px] bg-white/5 backdrop-blur-[20px] saturate-180 z-0" />
            
            {/* Animated Shimmer */}
            <div className="absolute inset-0 translate-x-[-100%] animate-[shimmer_3s_ease-in-out_infinite] bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.1),transparent)] z-10" />
          </>
        )}
        <span className="relative z-20">{children}</span>
        
        <style jsx>{`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
