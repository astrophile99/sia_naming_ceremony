"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Music, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useMusic } from "@/hooks/useMusic";

export default function MusicPlayer() {
  const { isPlaying, volume, toggle, changeVolume } = useMusic();
  const [expanded, setExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.4);

  const toggleMute = () => {
    if (isMuted) {
      changeVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      changeVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 no-print"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.5, type: "spring", bounce: 0.4 }}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="glass-card rounded-2xl p-4 mb-3 w-56 shadow-dream border border-rose-200/40"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-body text-xs font-semibold text-rose-500 tracking-wide">
                  Ambient Lullaby
                </p>
                <p className="font-body text-xs text-rose-400/70">
                  For Sia 🌸
                </p>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-rose-400 hover:text-rose-600 transition-colors"
                aria-label="Close player"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Equalizer animation when playing */}
            {isPlaying && (
              <div className="flex items-end justify-center gap-0.5 h-6 mb-3">
                {[3, 5, 8, 5, 7, 4, 6, 3, 8, 5].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-rose-400 to-pink-300"
                    animate={{ height: [h, h * 1.8, h * 0.6, h] }}
                    transition={{
                      duration: 0.6 + i * 0.07,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ minHeight: 2 }}
                  />
                ))}
              </div>
            )}

            {/* Volume slider */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-rose-400 hover:text-rose-600 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  changeVolume(Number(e.target.value));
                  setIsMuted(Number(e.target.value) === 0);
                }}
                className="flex-1 accent-rose-400 h-1 cursor-pointer"
                aria-label="Volume control"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <div className="flex items-center gap-2">
        {/* Expand button */}
        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="glass-card w-9 h-9 rounded-full flex items-center justify-center border border-rose-200/50 shadow-petal"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open music controls"
        >
          <Music className="w-4 h-4 text-rose-400" />
        </motion.button>

        {/* Play/pause */}
        <motion.button
          onClick={toggle}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-dream border-2 transition-all duration-300 relative overflow-hidden ${
            isPlaying
              ? "bg-gradient-to-br from-rose-400 to-pink-500 border-rose-300/60"
              : "glass-card border-rose-200/60"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause ambient music" : "Play ambient lullaby"}
        >
          {/* Ripple when playing */}
          {isPlaying && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/10"
                animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
            </>
          )}

          {isPlaying ? (
            <Pause className="w-5 h-5 text-white relative z-10" />
          ) : (
            <Play className="w-5 h-5 text-rose-400 relative z-10 translate-x-0.5" />
          )}
        </motion.button>
      </div>

      {/* Tooltip */}
      {!isPlaying && (
        <motion.div
          className="absolute -top-9 right-0 glass px-2.5 py-1 rounded-lg text-xs font-body text-rose-500 whitespace-nowrap border border-rose-200/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, delay: 3 }}
        >
          🎵 Play ambient music
        </motion.div>
      )}
    </motion.div>
  );
}
