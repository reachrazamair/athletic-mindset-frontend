"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Coach Free",
    price: "$0",
    priceNote: "",
    description: "Try it with a few of your athletes",
    features: [
      "Invite up to 3 athletes",
      "Coach report for each athlete",
      "Basic roster view",
      "One team snapshot",
    ],
    lockedFeatures: [
      "Full Team Mindset report",
      "Unlimited athletes & teams",
      "At-risk athlete alerts",
      "Season-long progress tracking",
    ],
    cta: "Start Free",
    href: "/signup",
    featured: false,
  },
  {
    name: "Team",
    price: "$499",
    priceNote: "/year · billed annually",
    description: "Everything your roster needs, all season",
    features: [
      "Everything in Free, plus:",
      "Coach report for every athlete",
      "Full Team Mindset report",
      "Coach Summary across your roster",
      "At-risk athlete detection",
      "Unlimited teams",
      "Season-long progress tracking",
      "Priority support",
    ],
    lockedFeatures: [],
    cta: "Book a Team Demo",
    href: "/contact",
    featured: true,
  },
];

export function CoachPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="relative py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            Team Pricing
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-5 uppercase tracking-tight">
            Equip Your{" "}
            <span className="gradient-text">Whole Roster</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-lg">
            Start free with a few athletes, or unlock the full team package with
            reports for every athlete and your complete Team Mindset picture.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className={`relative rounded-2xl p-6 md:p-8 flex flex-col ${
                tier.featured
                  ? "gradient-border bg-surface-card glow"
                  : "border border-border/50 bg-surface-card/50"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1">
                    <Sparkles size={12} className="text-white" />
                    <span className="text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-text-muted mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-text-primary">
                    {tier.price}
                  </span>
                  {tier.priceNote && (
                    <span className="text-text-muted text-sm">{tier.priceNote}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={15}
                      className={`mt-0.5 flex-shrink-0 ${
                        tier.featured ? "text-primary-light" : "text-text-muted"
                      }`}
                    />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.lockedFeatures.length > 0 && (
                <div className="mb-6 pt-4 border-t border-border/30">
                  <p className="text-xs font-medium text-text-muted mb-3 flex items-center gap-1.5">
                    <Lock size={11} />
                    Unlock with Team
                  </p>
                  <ul className="space-y-2">
                    {tier.lockedFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 opacity-50">
                        <Lock size={12} className="mt-0.5 flex-shrink-0 text-text-muted" />
                        <span className="text-xs text-text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href={tier.href}
                className={`group flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  tier.featured
                    ? "bg-primary text-white hover:bg-primary-light hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                    : "border border-border-light text-text-primary hover:border-primary/50"
                }`}
              >
                {tier.cta}
                {tier.featured && (
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-xs md:text-sm text-text-muted mt-8"
        >
          Running a full club or school?{" "}
          <Link href="/club" className="text-primary-light hover:text-white transition-colors font-medium">
            See Club &amp; School
          </Link>{" "}
          for program-wide pricing.
        </motion.p>
      </div>
    </section>
  );
}
