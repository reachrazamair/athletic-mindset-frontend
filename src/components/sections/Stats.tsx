"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { number: 3, suffix: "", label: "Phases", description: "Preparation · Competition · Teamwork" },
  { number: 8, suffix: "", label: "Factors", description: "Core mental performance drivers" },
  { number: 22, suffix: "", label: "Dimensions", description: "Granular mental skill measures" },
  { number: 7, suffix: "", label: "Situational Mindsets", description: "Context-specific mental states" },
];

export function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Athletic video background - more visible, positioned to show faces */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[center_20%] opacity-[0.12]"
        >
          <source src="/videos/athlete-2.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div ref={containerRef} className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Most Comprehensive Mental
            <br />
            Performance Assessment
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Our four-level scoring architecture gives athletes the deepest
            understanding of their mental game available anywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="rounded-2xl border border-border/50 bg-surface-card/50 p-6 md:p-8 text-center hover:border-primary/30 transition-all duration-300 hover:glow">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-base md:text-lg font-semibold text-text-primary mb-1">
                  {stat.label}
                </div>
                <div className="text-xs md:text-sm text-text-muted">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
