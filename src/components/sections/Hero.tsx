"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-[100dvh] flex flex-col justify-between overflow-hidden">
      {/* Background Video - covers full viewport */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/athlete-1.mp4" type="video/mp4" />
        </video>
        {/* Overlay - enough to read text but see the action */}
        <div className="absolute inset-0 bg-surface/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-surface/40" />
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

      {/* Center: Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-card/60 backdrop-blur-sm px-4 py-1.5 mb-5 md:mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-text-secondary">
            Trusted by 10,000+ athletes nationwide
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[32px] sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4 md:mb-6 text-center"
        >
          We Measure Your
          <br />
          <span className="gradient-text">Athletic Mindset</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-md md:max-w-2xl text-[15px] md:text-xl text-text-secondary leading-relaxed mb-7 md:mb-10 text-center"
        >
          The most comprehensive mental performance assessment in sports.{" "}
          <span className="text-text-primary font-medium">22 dimensions</span>.
          Personalized gameplan. 15 minutes.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="#assessment"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base md:text-lg font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Take Free Assessment
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <p className="mt-3 text-xs md:text-sm text-text-muted">
            No credit card required · 15 min · Instant results
          </p>
        </motion.div>
      </div>

      {/* Bottom: Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 pb-20 md:pb-24"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-text-muted text-xs md:text-sm px-6">
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-primary-light" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Engineered by Psychologists</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Science-Backed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <span>Used by Universities & Clubs</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-muted">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border border-border-light flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-primary-light"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
