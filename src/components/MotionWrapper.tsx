"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export function MotionWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // GSAP Staggered Reveal
    gsap.fromTo(
      ".reveal",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1, 
        ease: "power4.out",
        delay: 0.2
      }
    );
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
