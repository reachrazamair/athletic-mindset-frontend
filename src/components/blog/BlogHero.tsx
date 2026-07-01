"use client";

import { motion } from "framer-motion";
import { LazyVideo } from "@/components/common/LazyVideo";

export function BlogHero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <LazyVideo
          src="/videos/coaching.mp4"
          className="w-full h-full object-cover opacity-[0.1]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/80 to-surface" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            Reading Room
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6 uppercase">
            The Mental{" "}
            <span className="gradient-text">Performance Lab</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Curated research, expert articles, and evidence-based resources on
            sport psychology, mental toughness, and athlete development — from
            leading institutions and researchers worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
