"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ParentHero() {
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
          <source src="/videos/parents.mp4" type="video/mp4" />
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-8 pt-16 md:pt-20">
        {/* Bold Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-sm md:text-base text-text-secondary mb-4 md:mb-5 text-center"
        >
          Behind every athlete who overcomes pressure, there&apos;s a parent who
          knew what to say.
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-[28px] sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4 md:mb-5 text-center uppercase"
        >
          You Can Be{" "}
          <span className="gradient-text">That Parent.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-md md:max-w-xl text-[14px] md:text-base lg:text-lg text-text-secondary leading-relaxed mb-6 md:mb-8 text-center"
        >
          Athletic Mindset gives you the insight, the language, and the gameplan
          to support your athlete&apos;s mental game — not just their stats.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm md:text-base font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Get the Parent Report
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <p className="mt-3 text-xs md:text-sm text-text-muted">
            No psychology background needed · Clear, jargon-free guidance
          </p>
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
          Understand how your child thinks while they compete.
        </p>
      </motion.div>
    </section>
  );
}
