"use client";

import { motion } from "framer-motion";
import { LazyVideo } from "@/components/common/LazyVideo";

export function ResearchHero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0">
        <LazyVideo
          src="/videos/athlete-3.mp4"
          className="w-full h-full object-cover opacity-[1.5]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/70 to-surface" />
      <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            The Science Behind Athletic Mindset
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6 uppercase">
            Built on{" "}
            <span className="gradient-text">Real Science</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Our platform sits at the intersection of sport psychology,
            organizational psychology, and psychometrics — three disciplines
            that together create the most comprehensive mental performance
            assessment available to athletes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
