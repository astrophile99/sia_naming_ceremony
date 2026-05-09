"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Heart,
  Download,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { photos, downloadPhoto } from "@/lib/utils";
import type { Photo } from "@/lib/utils";
import { useScrollFade } from "@/hooks/useParallax";
import { useSelection } from "@/context/SelectionContext";

const CATEGORIES = ["all", "ceremony", "family", "candid", "details"];

// ─── PHOTO CARD ───────────────────────────────────────────────────────────────
function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: (photo: Photo) => void;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isSelecting, selected, toggle } = useSelection();
  const isSelected = selected.has(photo.id);

  // Taller photos span 2 grid rows
  const isTall = photo.height > 700;

  const handleCardClick = () => {
    if (isSelecting) {
      toggle(photo.id);
    } else {
      onClick(photo);
    }
  };

  return (
    <motion.div
      className={`relative group cursor-pointer rounded-xl overflow-hidden transition-shadow duration-300 ${
        isTall ? "row-span-2" : "row-span-1"
      } ${
        isSelected
          ? "ring-2 ring-rose-400 ring-offset-1"
          : "hover:shadow-[0_12px_40px_rgba(233,30,99,0.18)]"
      }`}
      style={{
        background: "linear-gradient(135deg,rgba(255,255,255,0.65) 0%,rgba(255,255,255,0.35) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.75)",
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: Math.min((index % 9) * 0.05, 0.35) }}
      whileHover={!isSelecting ? { y: -4, scale: 1.01 } : undefined}
      onClick={handleCardClick}
    >
      {/* Shimmer skeleton */}
      {!imageLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-pink-50 via-white to-pink-50"
          style={{ backgroundSize: "200% 100%", animation: "shimmer 2s linear infinite" }}
        />
      )}

      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          quality={75}
        />
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* ── SELECT BUTTON (top-right) ── */}
      <div
        className={`absolute top-1.5 right-1.5 z-20 transition-opacity duration-200 ${
          isSelecting || isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle(photo.id);
          }}
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 shadow-md ${
            isSelected
              ? "bg-rose-500 border-2 border-white"
              : "bg-white/80 border-2 border-white/60 backdrop-blur-sm"
          }`}
          aria-label={isSelected ? "Deselect photo" : "Select photo"}
        >
          {isSelected ? (
            <CheckCircle2 className="w-4 h-4 text-white" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full border-2 border-rose-400" />
          )}
        </button>
      </div>

      {/* Bottom action bar on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
        <span className="text-[10px] font-body text-white/90 capitalize tracking-wider bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {photo.category}
        </span>
        <div className="flex gap-1">
          {/* Zoom hint */}
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ZoomIn className="w-3 h-3 text-white" />
          </div>
          {/* Like */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
            className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <Heart className={`w-3 h-3 ${isLiked ? "text-rose-400 fill-rose-400" : "text-white"}`} />
          </button>
        </div>
      </div>

      {/* Selected overlay tint */}
      {isSelected && (
        <div className="absolute inset-0 bg-rose-400/15 pointer-events-none" />
      )}
    </motion.div>
  );
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function LightboxModal({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  };

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    await downloadPhoto(photo);
    setDownloading(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(30, 8, 15, 0.88)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="relative w-full max-w-4xl mx-3 rounded-2xl overflow-hidden"
        style={{
          maxHeight: "92vh",
          background: "linear-gradient(135deg,rgba(255,255,255,0.75) 0%,rgba(255,255,255,0.5) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
        }}
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/30">
          <span className="font-body text-sm text-rose-500 font-medium">
            {currentIndex + 1} / {totalPhotos}
          </span>
          <div className="flex gap-2">
            {/* Download button */}
            <motion.button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs font-semibold text-white"
              style={{
                background: downloading
                  ? "rgba(156,163,175,1)"
                  : "linear-gradient(135deg,#e91e63,#f48fb1)",
                boxShadow: "0 3px 10px rgba(233,30,99,0.3)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownload}
              disabled={downloading}
              aria-label="Download this photo"
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
              <span>{downloading ? "Saving…" : "Download"}</span>
            </motion.button>

            <motion.button
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/50 border border-white/60"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
            </motion.button>

            <motion.button
              className="w-8 h-8 rounded-full flex items-center justify-center bg-rose-100/70 border border-rose-300/40"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <X className="w-3.5 h-3.5 text-rose-500" />
            </motion.button>
          </div>
        </div>

        {/* Image */}
        <div className="relative" style={{ height: "min(65vh, 560px)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
                quality={90}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-sm border border-white/70 shadow-md hover:bg-white/80 transition-colors"
            onClick={onPrev}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 text-rose-500" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-sm border border-white/70 shadow-md hover:bg-white/80 transition-colors"
            onClick={onNext}
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 text-rose-500" />
          </button>
        </div>

        {/* Caption */}
        <div className="px-4 py-2.5 border-t border-white/30">
          <p className="font-body text-xs text-rose-400/80 text-center italic truncate">
            {photo.alt}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── GALLERY SECTION ──────────────────────────────────────────────────────────
export default function GallerySection() {
  const { ref, opacity, y } = useScrollFade();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isSelecting, selected, selectAll, clearSelection } = useSelection();

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = useCallback(
    (photo: Photo) => {
      const index = filteredPhotos.findIndex((p) => p.id === photo.id);
      setSelectedPhoto(photo);
      setSelectedIndex(index);
    },
    [filteredPhotos]
  );

  const closeLightbox = useCallback(() => setSelectedPhoto(null), []);

  const prevPhoto = useCallback(() => {
    const newIndex = (selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  }, [selectedIndex, filteredPhotos]);

  const nextPhoto = useCallback(() => {
    const newIndex = (selectedIndex + 1) % filteredPhotos.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  }, [selectedIndex, filteredPhotos]);

  const allFilteredSelected =
    filteredPhotos.length > 0 &&
    filteredPhotos.every((p) => selected.has(p.id));

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      clearSelection();
    } else {
      selectAll(filteredPhotos.map((p) => p.id));
    }
  };

  return (
    <section
      id="gallery"
      className="relative py-16 px-3 sm:px-6 lg:px-8"
      aria-label="Photo gallery"
    >
      {/* Section header */}
      <motion.div
        ref={ref}
        className="text-center mb-10"
        style={{ opacity, y }}
      >
        <motion.div
          className="flex items-center justify-center gap-3 mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-rose-300" />
          <span className="text-xs font-body tracking-[0.3em] text-rose-400 uppercase">
            Photo Collection
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-rose-300" />
        </motion.div>
        <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] text-gradient-pink mb-3">
          Cherished Memories
        </h2>
        <p className="font-body text-sm text-rose-400/70 max-w-lg mx-auto">
          Every photograph tells a story of love. Browse through our collection
          of precious moments from Sia&apos;s special day.
        </p>
      </motion.div>

      {/* Filter + select-all row */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-3 mb-6 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-body text-xs font-semibold transition-all duration-200 capitalize border ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white border-transparent shadow-sm"
                  : "bg-white/50 backdrop-blur-sm text-rose-500 border-rose-200/50 hover:bg-white/70"
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Select-all (only in select mode) */}
        <AnimatePresence>
          {isSelecting && (
            <motion.button
              onClick={toggleSelectAll}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-4 py-1.5 rounded-full font-body text-xs font-semibold border bg-white/60 backdrop-blur-sm text-rose-500 border-rose-200/60 hover:bg-white/80 transition-all"
            >
              {allFilteredSelected ? "Deselect all" : `Select all (${filteredPhotos.length})`}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── MASONRY GRID ── */}
      {/* Mobile: 3 cols, ~90px rows → shows 9 photos above fold
          sm:   3 cols, 120px rows
          lg:   4 cols, 155px rows
          xl:   5 cols, 170px rows */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="sia-gallery-grid grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 sm:gap-2 lg:gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                onClick={openLightbox}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <LightboxModal
            photo={selectedPhoto}
            currentIndex={selectedIndex}
            totalPhotos={filteredPhotos.length}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
