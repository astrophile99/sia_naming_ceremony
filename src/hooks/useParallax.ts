"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useParallax(distance: number = 100): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return { ref, y };
}

export function useScrollFade(): {
  ref: React.RefObject<HTMLDivElement>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  return { ref, opacity, y };
}
