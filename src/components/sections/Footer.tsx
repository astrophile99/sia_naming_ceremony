"use client";

import { motion } from "framer-motion";
import { Heart, Star, Sparkles } from "lucide-react";

const FloralDivider = () => (
  <div className="flex items-center justify-center gap-4 my-6">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent max-w-24" />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 30 30" width="24" height="24" fill="none">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={15 + 7 * Math.cos((angle * Math.PI) / 180)}
            cy={15 + 7 * Math.sin((angle * Math.PI) / 180)}
            rx="4"
            ry="6"
            fill={i % 2 === 0 ? "rgba(244,143,177,0.5)" : "rgba(165,214,167,0.5)"}
            transform={`rotate(${angle}, ${15 + 7 * Math.cos((angle * Math.PI) / 180)}, ${15 + 7 * Math.sin((angle * Math.PI) / 180)})`}
          />
        ))}
        <circle cx="15" cy="15" r="3" fill="rgba(255,202,40,0.6)" />
      </svg>
    </motion.div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-200 to-transparent max-w-24" />
  </div>
);

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      role="contentinfo"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(252,228,236,0.8) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Crown icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 80 55"
              width="80"
              height="55"
              fill="none"
              className="glow-gold"
            >
              <path
                d="M5 50 L5 30 L20 12 L40 35 L60 12 L75 30 L75 50 Z"
                stroke="url(#footerCrownGrad)"
                strokeWidth="2"
                fill="rgba(255, 202, 40, 0.1)"
              />
              {[
                { cx: 5, cy: 30 },
                { cx: 40, cy: 35 },
                { cx: 75, cy: 30 },
                { cx: 20, cy: 12 },
                { cx: 60, cy: 12 },
              ].map((pos, i) => (
                <motion.circle
                  key={i}
                  cx={pos.cx}
                  cy={pos.cy}
                  r="4"
                  fill={i % 2 === 0 ? "#ffd54f" : "#f48fb1"}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                />
              ))}
              <defs>
                <linearGradient id="footerCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd54f" />
                  <stop offset="100%" stopColor="#f9a825" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Main text */}
        <motion.h2
          className="font-display text-3xl sm:text-4xl text-gradient-pink mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Sia
        </motion.h2>

        <motion.p
          className="font-display italic text-rose-400 text-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Our precious little star ✨
        </motion.p>

        <FloralDivider />

        {/* Main footer message */}
        <motion.div
          className="glass-card rounded-2xl p-6 sm:p-8 mb-8 border border-rose-200/40 shadow-dream"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 flex-wrap text-base sm:text-lg font-body text-rose-500">
            <span>Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.3, 1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 inline" />
            </motion.div>
            <span>for</span>
            <span className="font-display italic text-xl text-rose-600 font-semibold">
              Sia
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-3 text-sm text-rose-400/70 font-body">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>A lifetime of love begins today</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
        </motion.div>

        {/* Star decoration */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="font-display italic text-rose-400/80 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          &ldquo;A daughter is a miracle that never ceases to be miraculous —
          full of beauty and forever beautiful.&rdquo;
        </motion.blockquote>

        {/* Bottom bar */}
        <motion.div
          className="pt-6 border-t border-rose-200/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <p className="font-body text-xs text-rose-400/50 tracking-widest uppercase">
            © 2024 Sia&apos;s Naming Ceremony • All memories reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
