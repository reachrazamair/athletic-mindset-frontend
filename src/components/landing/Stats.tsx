"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { LazyVideo } from "@/components/common/LazyVideo";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const steps = 40;
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" ref={containerRef}>
      {/* Video background with parallax — more visible */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <LazyVideo
          src="/videos/parents.mp4"
          className="w-full h-full object-cover object-center opacity-[0.15]"
        />
      </motion.div>

      {/* Blue-tinted overlay for every-other-section contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-light via-surface-alt to-surface-light" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-display text-3xl md:text-5xl font-black mb-5 uppercase tracking-tight">
            The Most Comprehensive Mental
            <br className="hidden md:block" />
            <span className="gradient-text"> Performance Assessment</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-base md:text-lg">
            Our four-level scoring architecture gives athletes the deepest
            understanding of their mental game available anywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
              className="relative group"
            >
              <div className="rounded-2xl border border-border/30 bg-surface-card/60 backdrop-blur-sm p-6 md:p-8 text-center hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)]">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-2 font-display">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base font-semibold text-text-primary mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-text-muted">
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
