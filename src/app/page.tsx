"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import GallerySection from "@/components/sections/GallerySection";
import TimelineSection from "@/components/sections/TimelineSection";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { SelectionProvider } from "@/context/SelectionContext";

// Decorative components loaded client-side only
const FloatingPetals = dynamic(
  () => import("@/components/decorative/FloatingPetals"),
  { ssr: false }
);
const ParticleField = dynamic(
  () => import("@/components/decorative/ParticleField"),
  { ssr: false }
);
const FloatingBlobs = dynamic(
  () => import("@/components/decorative/FloatingBlobs"),
  { ssr: false }
);
const Butterflies = dynamic(
  () => import("@/components/decorative/Butterflies"),
  { ssr: false }
);
const MusicPlayer = dynamic(
  () => import("@/components/sections/MusicPlayer"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <SelectionProvider>
      {/* Loading screen */}
      <LoadingScreen />

      {/* Fixed background layers — reduced counts for performance */}
      <FloatingBlobs />
      <FloatingPetals count={10} />
      <Butterflies />
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        <HeroSection />
        <GallerySection />
        <TimelineSection />
      </main>

      <Footer />

      {/* Floating UI */}
      <MusicPlayer />
      <ScrollToTop />
    </SelectionProvider>
  );
}
