"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LazyVideo } from "@/components/LazyVideo";

const audiences = [
  "High School Programs",
  "Club & Travel Teams",
  "Colleges & Universities",
  "Professional Teams",
  "Entire School Systems",
  "Camps & Academies",
];

export function ClubWhoItsFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28" ref={ref}>
      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
              Who It&apos;s For
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-black mb-5 uppercase tracking-tight">
              Built for Programs of{" "}
              <span className="gradient-text">Every Size</span>
            </h2>
            <p className="text-[15px] md:text-base text-text-secondary leading-relaxed mb-8">
              Whether you run a single club team or an entire district&apos;s
              athletics, Athletic Mindset gives you the deepest level of
              understanding of your athletes and your teams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {audiences.map((audience, index) => (
                <motion.div
                  key={audience}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  className="rounded-xl border border-border/50 bg-surface-card/50 px-4 py-3.5 text-sm font-medium text-text-primary"
                >
                  {audience}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-video bg-surface-card shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <LazyVideo
                src="/videos/partnership.mp4"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
