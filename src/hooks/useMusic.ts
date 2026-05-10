"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export function useMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use a royalty-free lullaby-style audio from a public source
      // In production, replace with /public/music/lullaby.mp3
      audioRef.current = new Audio("/music/lullaby.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = volume;

      audioRef.current.addEventListener("canplaythrough", () => {
        setIsLoaded(true);
      });

      audioRef.current.addEventListener("error", () => {
        // Silently handle if music file not found
        setIsLoaded(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }, []);

  return { isPlaying, isLoaded, volume, toggle, changeVolume };
}
