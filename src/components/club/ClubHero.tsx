"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ClubHero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/athlete-3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-surface/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-surface/40" />
      </div>

      {/* Top: Logo - mobile only */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 pt-[env(safe-area-inset-top)] md:hidden"
      >
        <div className="flex justify-center pt-6">
          <Image
            src="/athletic-mindset-logo.png"
            alt="Athletic Mindset"
            width={150}
            height={38}
            className="h-9 w-auto"
            priority
            unoptimized
          />
        </div>
      </motion.div>

      {/* Center: Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-8 pt-16 md:pt-20 pb-24 md:pb-0">
        {/* Bold Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-sm md:text-base text-text-secondary mb-4 md:mb-5 text-center"
        >
          The best athletic programs don&apos;t just manage programs. They build
          culture. And culture transforms lives.
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-[26px] sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4 md:mb-5 text-center uppercase"
        >
          Transform Your{" "}
          <span className="gradient-text">Program&apos;s Mentality.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-md md:max-w-xl text-[14px] md:text-base lg:text-lg text-text-secondary leading-relaxed mb-6 md:mb-8 text-center"
        >
          Athletic Mindset gives your program a complete mental performance
          system — every athlete assessed, every coach equipped, every team
          stronger.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:w-auto sm:max-w-none"
        >
          <Link
            href="/contact"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm md:text-base font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Talk to Our Team
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="#what-you-get"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border-light px-7 py-3.5 text-sm md:text-base font-semibold text-text-primary hover:border-primary/50 transition-all duration-300"
          >
            Explore the System
          </Link>
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 pb-20 md:pb-16"
      >
        <p className="text-center text-xs md:text-sm text-text-muted px-6">
          Built for high schools, clubs, colleges, and entire school systems.
        </p>
      </motion.div>
    </section>
  );
}
