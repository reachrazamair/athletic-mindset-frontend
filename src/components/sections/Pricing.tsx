"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    subtitle: "Get Started",
    price: "$0",
    period: "forever",
    description: "Take the assessment and see where you stand.",
    features: [
      "Full 22-dimension assessment",
      "8-factor score overview",
      "Basic report with top strengths",
      "Overall percentile ranking",
      "One assessment per year",
    ],
    cta: "Start Free Assessment",
    href: "#assessment",
    featured: false,
  },
  {
    name: "Elite",
    subtitle: "Most Popular",
    price: "$125",
    period: "/year",
    description: "The complete mental performance experience.",
    features: [
      "Everything in Free, plus:",
      "Full detailed report across all 22 dimensions",
      "Personalized Gameplan with mental skills routines",
      "Sport-specific benchmarking",
      "Elite athlete comparison",
      "Unlimited reassessments",
      "Parent & Coach report versions",
      "Progress tracking over time",
      "Priority support",
    ],
    cta: "Get Elite Access",
    href: "#assessment",
    featured: true,
  },
  {
    name: "Team",
    subtitle: "For Clubs & Programs",
    price: "Custom",
    period: "",
    description: "Scale across your entire organization.",
    features: [
      "Everything in Elite, plus:",
      "Bulk athlete onboarding (CSV, links, QR codes)",
      "Coach dashboard with roster view",
      "Organization-wide mental readiness analytics",
      "At-risk athlete identification",
      "Partner revenue share program",
      "Dedicated account support",
    ],
    cta: "Contact Sales",
    href: "#contact",
    featured: false,
  },
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="gradient-text">Level</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Start free. Upgrade when you&apos;re ready to unlock the full depth of
            your mental performance profile.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.featured
                  ? "gradient-border bg-surface-card glow scale-[1.02]"
                  : "border border-border/50 bg-surface-card/50"
              }`}
            >
              {/* Popular Badge */}
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1">
                    <Sparkles size={12} className="text-white" />
                    <span className="text-xs font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              {/* Tier Info */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-primary">
                    {tier.price}
                  </span>
                  <span className="text-text-muted text-sm">{tier.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className={`mt-0.5 flex-shrink-0 ${
                        tier.featured ? "text-primary-light" : "text-text-muted"
                      }`}
                    />
                    <span className="text-sm text-text-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.href}
                className={`block text-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  tier.featured
                    ? "bg-primary text-white hover:bg-primary-light hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                    : "border border-border-light text-text-primary hover:border-primary/50 hover:bg-surface-card"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-sm text-text-muted mt-12"
        >
          All plans include our psychologist-engineered 22-dimension assessment.
          No credit card required for free tier.
        </motion.p>
      </div>
    </section>
  );
}
