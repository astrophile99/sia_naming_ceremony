"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Heart, Crown, Camera, Clock, Download, X, CheckSquare } from "lucide-react";
import { useSelection } from "@/context/SelectionContext";
import { photos, downloadPhotos } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { label: "Gallery", href: "#gallery", icon: Camera },
  { label: "Moments", href: "#timeline", icon: Clock },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const { selected, count, isSelecting, toggleSelecting, clearSelection } = useSelection();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadSelected = async () => {
    if (downloading || count === 0) return;
    setDownloading(true);
    const selectedPhotos = photos.filter((p) => selected.has(p.id));
    await downloadPhotos(selectedPhotos);
    setDownloading(false);
    clearSelection();
    toggleSelecting();
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 no-print"
      role="navigation"
      aria-label="Main navigation"
    >
      <motion.div
        className="absolute inset-0 glass border-b border-white/40 shadow-sm"
        style={{ opacity: bgOpacity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2 group z-10"
          whileHover={{ scale: 1.02 }}
          aria-label="Sia's Naming Ceremony - Home"
        >
          <Crown className="w-5 h-5 text-amber-400" />
          <span className="font-display italic text-rose-500 font-semibold text-lg">Sia</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 z-10">
          {navItems.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              className="flex items-center gap-1.5 font-body text-sm font-medium text-rose-500 hover:text-rose-700 transition-colors group"
              whileHover={{ y: -1 }}
            >
              <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="hidden sm:block">{label}</span>
            </motion.a>
          ))}

          {/* Select mode toggle */}
          <button
            onClick={toggleSelecting}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs font-semibold transition-all duration-200 border ${
              isSelecting
                ? "bg-rose-100 text-rose-600 border-rose-300"
                : "bg-white/50 backdrop-blur-sm text-rose-500 border-rose-200/60 hover:bg-white/70"
            }`}
            aria-pressed={isSelecting}
          >
            {isSelecting ? <X className="w-3 h-3" /> : <CheckSquare className="w-3 h-3" />}
            <span className="hidden xs:block">{isSelecting ? "Cancel" : "Select"}</span>
          </button>

          {/* Download selected */}
          <AnimatePresence>
            {count > 0 && (
              <motion.button
                onClick={handleDownloadSelected}
                disabled={downloading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs font-semibold text-white disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #e91e63, #f48fb1)",
                  boxShadow: "0 4px 16px rgba(233,30,99,0.3)",
                }}
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {downloading ? (
                  <motion.div
                    className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <Download className="w-3 h-3" />
                )}
                <span>{downloading ? "Saving…" : `Download (${count})`}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
