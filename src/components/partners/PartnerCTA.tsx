"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LazyVideo } from "@/components/common/LazyVideo";

export function PartnerCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="join" className="relative py-20 md:py-28" ref={ref}>
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
              src="/videos/skating.mp4"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 border border-primary/20 rounded-2xl md:rounded-3xl" />

          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-accent/10 blur-[60px]" />

          {/* Content */}
          <div className="relative px-6 py-14 md:px-16 md:py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight"
            >
              Stop Coaching for Free.
              <br />
              <span className="gradient-text">Start Earning.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text-secondary text-sm md:text-lg max-w-lg mx-auto mb-8"
            >
              Your athletes need mental performance training. You get paid to
              give them access. Everyone wins.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Join the Partner Program
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-border-light px-8 py-4 text-base font-medium text-text-primary hover:border-primary/50 transition-all duration-300"
              >
                Talk to Us First
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-text-muted"
            >
              <span>✓ No approval needed</span>
              <span>✓ Earn 30–40% forever</span>
              <span>✓ Monthly payouts via Stripe</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
