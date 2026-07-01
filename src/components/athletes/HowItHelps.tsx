"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { LazyVideo } from "@/components/common/LazyVideo";

const benefits = [
  "Identify areas of your mental approach that require improvement and use suggested strategies to fix them",
  "Understand the situations in competition that will be most challenging and how to maximize performance",
  "Learn how to be more effective and efficient with preparation time",
  "Communicate to scouts and coaches your mental strengths and development plan",
  "Track progress over time with reassessments to see real growth",
  "Get specific mental skills routines — Self-talk, Visualization, Emotional Control, Goal Setting",
];

export function HowItHelps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-first lg:order-first"
          >
            <div className="rounded-2xl overflow-hidden border border-border/50 aspect-video bg-surface-card">
              <LazyVideo
                src="/videos/athlete-3.mp4"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 80%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
              How It Helps
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Your Report Helps You{" "}
              <span className="gradient-text">Level Up</span>
            </h2>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
