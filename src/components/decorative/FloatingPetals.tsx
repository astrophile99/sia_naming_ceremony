"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const PETAL_COLORS = [
  "#fce4ec", "#f8bbd0", "#f48fb1", "#f06292",
  "#a5d6a7", "#fff8e1", "#ffe082",
];

const petalPaths = [
  "M10,0 Q15,5 10,20 Q5,5 10,0",
  "M10,0 C20,5 20,15 10,20 C0,15 0,5 10,0",
  "M5,0 Q15,0 15,10 Q15,20 5,20 Q0,15 0,10 Q0,5 5,0",
];

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  path: string;
  endX: number;
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 10 + Math.random() * 8,
    size: 8 + Math.random() * 14,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    path: petalPaths[Math.floor(Math.random() * petalPaths.length)],
    endX: (Math.random() - 0.5) * 25,
  }));
}

export default function FloatingPetals({ count = 10 }: { count?: number }) {
  const petals = useMemo(() => generatePetals(count), [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.x}%`, top: "-4%" }}
          animate={{
            y: "110vh",
            x: petal.endX,
            rotate: [0, 180, 360],
            opacity: [0, 0.75, 0.8, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 8,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 20 20"
            width={petal.size}
            height={petal.size}
            fill={petal.color}
            opacity={0.65}
          >
            <path d={petal.path} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
