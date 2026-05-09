"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="fixed bottom-24 right-6 z-40 glass-card w-11 h-11 rounded-full flex items-center justify-center border border-rose-200/50 shadow-dream no-print"
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollUp}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 text-rose-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
