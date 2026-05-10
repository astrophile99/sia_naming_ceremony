"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    id: 1,
    className: "top-[5%] left-[5%] w-[400px] h-[400px]",
    color: "rgba(252, 228, 236, 0.6)",
    delay: 0,
  },
  {
    id: 2,
    className: "top-[20%] right-[5%] w-[300px] h-[300px]",
    color: "rgba(232, 245, 233, 0.5)",
    delay: 2,
  },
  {
    id: 3,
    className: "bottom-[30%] left-[10%] w-[350px] h-[350px]",
    color: "rgba(255, 248, 225, 0.5)",
    delay: 4,
  },
  {
    id: 4,
    className: "bottom-[10%] right-[15%] w-[250px] h-[250px]",
    color: "rgba(248, 187, 208, 0.4)",
    delay: 1,
  },
  {
    id: 5,
    className: "top-[50%] left-[45%] w-[200px] h-[200px]",
    color: "rgba(255, 236, 179, 0.4)",
    delay: 3,
  },
];

export default function FloatingBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute ${blob.className} blob`}
          style={{ backgroundColor: blob.color, filter: "blur(60px)" }}
          animate={{
            borderRadius: [
              "60% 40% 70% 30% / 50% 60% 40% 70%",
              "40% 60% 30% 70% / 70% 40% 60% 30%",
              "70% 30% 40% 60% / 30% 70% 50% 50%",
              "60% 40% 70% 30% / 50% 60% 40% 70%",
            ],
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 12 + blob.id * 2,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
