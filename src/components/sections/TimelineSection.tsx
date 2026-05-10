"use client";

import { motion } from "framer-motion";
import { timelineItems } from "@/lib/utils";
import { useScrollFade } from "@/hooks/useParallax";

function TimelineCard({
  item,
  index,
}: {
  item: (typeof timelineItems)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`flex items-center gap-4 sm:gap-8 ${
        isEven ? "flex-row" : "flex-row-reverse"
      } w-full`}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Content card */}
      <motion.div
        className={`flex-1 ${isEven ? "text-right sm:pr-8" : "text-left sm:pl-8"}`}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div
          className={`glass-card rounded-2xl p-5 sm:p-6 inline-block w-full max-w-sm ${
            isEven ? "ml-auto" : "mr-auto"
          } shadow-dream`}
        >
          <div
            className={`flex items-center gap-3 mb-3 ${
              isEven ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs font-body font-semibold tracking-widest text-rose-400 uppercase bg-rose-50/80 px-3 py-1 rounded-full">
              {item.time}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl text-rose-600 mb-2">
            {item.title}
          </h3>
          <p className="font-body text-sm sm:text-base text-rose-400/80 leading-relaxed">
            {item.description}
          </p>
          {/* Decorative corner */}
          <div
            className={`absolute top-4 ${isEven ? "right-4" : "left-4"} w-2 h-2 rounded-full bg-gradient-to-br from-rose-300 to-pink-400`}
          />
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="relative flex-shrink-0 hidden sm:flex items-center justify-center w-16">
        <motion.div
          className="w-12 h-12 rounded-full glass-card border-2 border-rose-200/60 flex items-center justify-center text-2xl shadow-petal z-10"
          whileHover={{ scale: 1.2, rotate: 10 }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring", bounce: 0.5 }}
        >
          {item.icon}
        </motion.div>
        {/* Connector line */}
        {index < timelineItems.length - 1 && (
          <motion.div
            className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-16"
            style={{
              background:
                "linear-gradient(180deg, rgba(244,143,177,0.5) 0%, rgba(244,143,177,0) 100%)",
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          />
        )}
      </div>

      {/* Empty spacer on other side */}
      <div className="flex-1 hidden sm:block" />
    </motion.div>
  );
}

export default function TimelineSection() {
  const { ref, opacity, y } = useScrollFade();

  return (
    <section
      id="timeline"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Timeline of beautiful moments"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full opacity-20"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #f48fb1 10%, #f48fb1 90%, transparent 100%)",
          }}
        />
      </div>

      {/* Section header */}
      <motion.div
        ref={ref}
        className="text-center mb-16"
        style={{ opacity, y }}
      >
        <motion.div
          className="flex items-center justify-center gap-3 mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-rose-300" />
          <span className="text-sm font-body tracking-[0.3em] text-rose-400 uppercase">
            The Journey
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-rose-300" />
        </motion.div>

        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-gradient-pink mb-4">
          Beautiful Moments
        </h2>
        <p className="font-body text-rose-400/70 max-w-lg mx-auto">
          A journey through the most precious moments of Sia&apos;s naming
          ceremony — from the first light of morning to the warm evening glow.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-0">
        {timelineItems.map((item, index) => (
          <TimelineCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* End decoration */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <div className="glass-card rounded-full px-6 py-3 border border-rose-200/60 shadow-petal">
          <p className="font-display italic text-rose-500 text-lg">
            And so a beautiful story begins... 🌸
          </p>
        </div>
      </motion.div>
    </section>
  );
}
