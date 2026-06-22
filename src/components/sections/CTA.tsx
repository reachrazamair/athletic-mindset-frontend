"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="assessment" className="relative py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-card to-accent/10" />
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover opacity-25"
            >
              <source src="/videos/athlete-3.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 border border-primary/20 rounded-3xl" />

          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-accent/10 blur-[60px]" />

          {/* Content */}
          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Ready to Discover Your
              <br />
              <span className="gradient-text">Athletic Mindset?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text-secondary text-lg max-w-xl mx-auto mb-10"
            >
              Take the free assessment and get your mental performance profile in
              15 minutes. No credit card required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="#"
                className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02]"
              >
                Take Free Assessment
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-border-light px-8 py-4 text-base font-medium text-text-primary hover:border-primary/50 transition-all duration-300"
              >
                Request a Demo
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted"
            >
              <span>✓ Free to start</span>
              <span>✓ 15 min assessment</span>
              <span>✓ Instant results</span>
              <span>✓ 60+ sports supported</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
