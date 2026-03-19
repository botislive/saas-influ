"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const prefix = value.match(/^[^0-9]*/)?.[0] || "";
  const suffix = value.match(/[kKmM%]*$/)?.[0] || "";

  useEffect(() => {
    if (!counterRef.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericValue,
      duration: 2,
      ease: "power4.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = prefix + (Math.floor(obj.val)).toLocaleString() + suffix;
        }
      },
    });
  }, [numericValue, prefix, suffix]);

  return <span ref={counterRef} className={className}>{value}</span>;
}
