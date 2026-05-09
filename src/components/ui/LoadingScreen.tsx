"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #fce4ec 0%, #fdf6e3 50%, #e8f5e9 100%)",
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-live="polite"
          aria-label="Loading Sia's naming ceremony"
        >
          {/* Crown animation */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <svg
              viewBox="0 0 100 70"
              width="100"
              height="70"
              fill="none"
              className="mb-6"
            >
              <motion.path
                d="M8 62 L8 38 L25 16 L50 48 L75 16 L92 38 L92 62 Z"
                stroke="url(#loadCrownGrad)"
                strokeWidth="2.5"
                fill="rgba(255, 202, 40, 0.15)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {[
                { cx: 8, cy: 38, color: "#ffd54f" },
                { cx: 50, cy: 48, color: "#ffd54f" },
                { cx: 92, cy: 38, color: "#ffd54f" },
                { cx: 25, cy: 16, color: "#f48fb1" },
                { cx: 75, cy: 16, color: "#f48fb1" },
              ].map((gem, i) => (
                <motion.circle
                  key={i}
                  cx={gem.cx}
                  cy={gem.cy}
                  r="5"
                  fill={gem.color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
                />
              ))}
              <defs>
                <linearGradient
                  id="loadCrownGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffd54f" />
                  <stop offset="100%" stopColor="#f9a825" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl mb-2"
            style={{
              background:
                "linear-gradient(135deg, #e91e63, #f48fb1, #e91e63)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            Sia
          </motion.h1>

          <motion.p
            className="font-body text-rose-400/80 text-sm tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Naming Ceremony
          </motion.p>

          {/* Loading dots */}
          <motion.div
            className="flex gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-rose-300"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
