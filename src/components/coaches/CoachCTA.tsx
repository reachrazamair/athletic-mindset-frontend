"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LazyVideo } from "@/components/LazyVideo";

export function CoachCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-card to-surface-card" />
          <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
            <LazyVideo
              src="/videos/coaching.mp4"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 border border-primary/20 rounded-2xl md:rounded-3xl" />

          <div className="relative px-6 py-14 md:px-16 md:py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight"
            >
              Coach the Whole{" "}
              <span className="gradient-text">Athlete</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[15px] md:text-lg text-text-secondary max-w-xl mx-auto mb-8"
            >
              Give your program the mental readiness picture that physical
              training alone can&apos;t provide. Book a demo and we&apos;ll walk you
              through it with your team in mind.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base md:text-lg font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Book a Team Demo
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
