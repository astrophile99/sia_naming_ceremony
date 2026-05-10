export interface Photo {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
}

export interface TimelineItem {
  id: number;
  time: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface FloatingPetal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  color: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}
