"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function PartnerHero() {
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
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        >
          <source src="/videos/partnership.mp4" type="video/mp4" />
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-card/60 backdrop-blur-sm px-4 py-1.5 mb-5 md:mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-text-secondary">
            Revenue Share Partner Program
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-[28px] sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4 md:mb-5 text-center uppercase"
        >
          Earn While You{" "}
          <span className="gradient-text">Coach.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-md md:max-w-xl text-[14px] md:text-base lg:text-lg text-text-secondary leading-relaxed mb-6 md:mb-8 text-center"
        >
          Coaches and club directors who partner with Athletic Mindset earn
          recurring revenue by sharing a platform their athletes already need.
          No selling. No upfront cost. Just share a link.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="#join"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm md:text-base font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Join the Partner Program
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <p className="mt-3 text-xs md:text-sm text-text-muted">
            No approval required · Free to join · Earn from day one
          </p>
        </motion.div>
      </div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 pb-20 md:pb-24"
      >
        <div className="flex items-start justify-center gap-3 sm:gap-8 md:gap-12 text-center px-6">
          <div className="flex-1 min-w-0">
            <p className="text-xl md:text-2xl font-bold text-text-primary leading-tight">30%+</p>
            <p className="mt-1 text-[10px] md:text-xs text-text-muted">Rev Share</p>
          </div>
          <div className="h-8 w-px shrink-0 bg-border-light" />
          <div className="flex-1 min-w-0">
            <p className="text-xl md:text-2xl font-bold text-text-primary leading-tight">$0</p>
            <p className="mt-1 text-[10px] md:text-xs text-text-muted">Upfront Cost</p>
          </div>
          <div className="h-8 w-px shrink-0 bg-border-light" />
          <div className="flex-1 min-w-0">
            <p className="text-xl md:text-2xl font-bold text-text-primary leading-tight">Monthly</p>
            <p className="mt-1 text-[10px] md:text-xs text-text-muted">Payouts</p>
          </div>
          <div className="h-8 w-px shrink-0 bg-border-light" />
          <div className="flex-1 min-w-0">
            <p className="text-xl md:text-2xl font-bold text-text-primary leading-tight">Forever</p>
            <p className="mt-1 text-[10px] md:text-xs text-text-muted">Recurring</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
