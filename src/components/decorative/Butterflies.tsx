"use client";

import { motion } from "framer-motion";

const ButterflyIcon = ({
  color1,
  color2,
  size,
}: {
  color1: string;
  color2: string;
  size: number;
}) => (
  <svg
    width={size}
    height={size * 0.75}
    viewBox="0 0 60 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left wings */}
    <ellipse cx="20" cy="15" rx="18" ry="13" fill={color1} opacity="0.8" />
    <ellipse cx="15" cy="30" rx="13" ry="10" fill={color2} opacity="0.7" />
    {/* Right wings */}
    <ellipse cx="40" cy="15" rx="18" ry="13" fill={color1} opacity="0.8" />
    <ellipse cx="45" cy="30" rx="13" ry="10" fill={color2} opacity="0.7" />
    {/* Body */}
    <ellipse cx="30" cy="22" rx="3" ry="14" fill="#5d4037" opacity="0.6" />
    {/* Antennae */}
    <line
      x1="28"
      y1="10"
      x2="22"
      y2="3"
      stroke="#5d4037"
      strokeWidth="1"
      opacity="0.6"
    />
    <line
      x1="32"
      y1="10"
      x2="38"
      y2="3"
      stroke="#5d4037"
      strokeWidth="1"
      opacity="0.6"
    />
    <circle cx="22" cy="2" r="2" fill="#5d4037" opacity="0.6" />
    <circle cx="38" cy="2" r="2" fill="#5d4037" opacity="0.6" />
  </svg>
);

const butterflies = [
  {
    id: 1,
    initialX: "10%",
    initialY: "30%",
    color1: "#f48fb1",
    color2: "#f8bbd0",
    size: 40,
    duration: 18,
    delay: 0,
  },
  {
    id: 2,
    initialX: "75%",
    initialY: "20%",
    color1: "#a5d6a7",
    color2: "#c8e6c9",
    size: 30,
    duration: 22,
    delay: 3,
  },
  {
    id: 3,
    initialX: "50%",
    initialY: "60%",
    color1: "#ffd54f",
    color2: "#ffe082",
    size: 35,
    duration: 20,
    delay: 6,
  },
  {
    id: 4,
    initialX: "85%",
    initialY: "55%",
    color1: "#ce93d8",
    color2: "#f3e5f5",
    size: 28,
    duration: 25,
    delay: 9,
  },
];

export default function Butterflies() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: b.initialX, top: b.initialY }}
          animate={{
            x: [0, 80, 150, 80, -50, 30, 0],
            y: [0, -60, 20, 80, 40, -30, 0],
            rotate: [0, 10, -8, 5, -12, 3, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{ scaleX: [1, -1, 1, -1, 1] }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ButterflyIcon
              color1={b.color1}
              color2={b.color2}
              size={b.size}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
