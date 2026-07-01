"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LazyVideo } from "@/components/common/LazyVideo";

export function AthleteCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl"
        >
          {/* Background video */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-card to-accent/10" />
          <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
            <LazyVideo
              src="/videos/parents.mp4"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 border border-primary/20 rounded-2xl md:rounded-3xl" />

          {/* Content */}
          <div className="relative px-6 py-14 md:px-16 md:py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold mb-4 md:mb-6"
            >
              Ready to Discover Your
              <br />
              <span className="gradient-text">Athletic Mindset?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text-secondary text-sm md:text-lg max-w-md mx-auto mb-8"
            >
              15 minutes. 22 dimensions. A personalized gameplan to train your
              mind like you train your body.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#buy"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-[0.98]"
              >
                Get Your Report
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-text-muted"
            >
              <span>✓ Instant results</span>
              <span>✓ 60+ sports supported</span>
              <span>✓ Science-backed</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
