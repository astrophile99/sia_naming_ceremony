"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Sparkles, Star, Crown } from "lucide-react";

const CrownSVG = () => (
  <svg
    viewBox="0 0 120 80"
    width="120"
    height="80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="glow-gold"
  >
    <motion.path
      d="M10 70 L10 45 L30 20 L60 55 L90 20 L110 45 L110 70 Z"
      stroke="url(#crownGrad)"
      strokeWidth="2.5"
      fill="rgba(255, 202, 40, 0.15)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
    />
    <motion.circle
      cx="10" cy="45" r="5"
      fill="#ffd54f"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
    />
    <motion.circle
      cx="60" cy="55" r="7"
      fill="#ffd54f"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.7, type: "spring" }}
    />
    <motion.circle
      cx="110" cy="45" r="5"
      fill="#ffd54f"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.6, type: "spring" }}
    />
    <motion.circle
      cx="30" cy="20" r="5"
      fill="#f48fb1"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.9, type: "spring" }}
    />
    <motion.circle
      cx="90" cy="20" r="5"
      fill="#f48fb1"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2.1, type: "spring" }}
    />
    <defs>
      <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffd54f" />
        <stop offset="50%" stopColor="#ffca28" />
        <stop offset="100%" stopColor="#f9a825" />
      </linearGradient>
    </defs>
  </svg>
);

const FloralAccent = ({ className }: { className?: string }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.ellipse
          key={i}
          cx={40 + 18 * Math.cos((angle * Math.PI) / 180)}
          cy={40 + 18 * Math.sin((angle * Math.PI) / 180)}
          rx="10"
          ry="16"
          fill={i % 2 === 0 ? "rgba(244,143,177,0.3)" : "rgba(165,214,167,0.3)"}
          transform={`rotate(${angle}, ${40 + 18 * Math.cos((angle * Math.PI) / 180)}, ${40 + 18 * Math.sin((angle * Math.PI) / 180)})`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}
      <circle cx="40" cy="40" r="8" fill="rgba(255,202,40,0.4)" />
    </svg>
  </motion.div>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section - Welcome to Sia's Naming Ceremony"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)]" />
      </motion.div>

      {/* Floating floral accents */}
      <FloralAccent className="top-[10%] left-[5%] opacity-60" />
      <FloralAccent className="bottom-[15%] right-[8%] opacity-50" />

      {/* Floating decorative rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-pink-200/40"
          style={{
            width: 200 + i * 150,
            height: 200 + i * 150,
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
          transition={{
            rotate: { duration: 20 + i * 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        {/* Crown */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ y: -60, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <CrownSVG />
        </motion.div>

        {/* Sparkle row */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </motion.div>
          <span className="text-sm sm:text-base font-body font-medium tracking-[0.3em] text-rose-400 uppercase">
            A Magical Celebration
          </span>
          <motion.div animate={{ rotate: [0, -360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-body font-light text-lg sm:text-xl text-rose-400 tracking-widest mb-2">
            Welcome to
          </h2>
          <h1
            className="font-display text-[clamp(3rem,10vw,6.5rem)] leading-none mb-2"
            style={{
              background: "linear-gradient(135deg, #e91e63 0%, #f48fb1 40%, #ab47bc 70%, #e91e63 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "300% 100%",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Sia
          </h1>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
            <Sparkles className="w-5 h-5 text-rose-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300" />
          </div>
          <p className="font-display italic text-[clamp(1.2rem,3vw,2rem)] text-rose-500 mb-2">
            Naming Ceremony
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-body text-base sm:text-lg text-rose-400/80 max-w-xl mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          A day filled with love, laughter, and the sweetest beginnings.
          <br />
          Every moment captured, every memory treasured forever.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToGallery}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-semibold text-white overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-300/50"
          style={{
            background: "linear-gradient(135deg, #e91e63 0%, #f48fb1 50%, #e91e63 100%)",
            backgroundSize: "200% 100%",
            boxShadow: "0 8px 32px rgba(233,30,99,0.35), 0 2px 8px rgba(0,0,0,0.1)",
          }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(233,30,99,0.5)" }}
          whileTap={{ scale: 0.97 }}
          aria-label="View photo gallery"
        >
          <span className="relative z-10">✨ View Memories</span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <ChevronDown className="w-5 h-5 animate-bounce relative z-10" />
        </motion.button>

        {/* Date/stats row */}
        <motion.div
          className="flex items-center justify-center gap-6 sm:gap-10 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {[
            { value: "30+", label: "Memories" },
            { value: "💝", label: "With Love" },
            { value: "∞", label: "Cherished" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-rose-500">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-body text-rose-400/70 tracking-widest uppercase mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-rose-300/60 flex items-start justify-center pt-2"
          animate={{ boxShadow: ["0 0 0 0 rgba(244,143,177,0.4)", "0 0 0 8px rgba(244,143,177,0)"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-2.5 rounded-full bg-rose-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
