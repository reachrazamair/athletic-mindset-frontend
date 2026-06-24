"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  HeartHandshake,
  Languages,
  TrendingUp,
  ShieldCheck,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Languages,
    title: "Zero Jargon",
    description:
      "Clear, simple language written for parents — no psychology degree required. Just an honest picture of your child's mental game.",
  },
  {
    icon: MessageSquare,
    title: "Know What to Say",
    description:
      "Specific guidance for the conversations that matter — including the toughest one of all: the car ride home after a tough game.",
  },
  {
    icon: HeartHandshake,
    title: "Support, Don't Pressure",
    description:
      "Understand your child's strengths and growth areas so you can encourage without adding pressure or undermining their coach.",
  },
  {
    icon: TrendingUp,
    title: "Track Their Growth",
    description:
      "Watch your athlete develop over time with reassessments — celebrate real progress in mental skills, not just the scoreboard.",
  },
  {
    icon: ShieldCheck,
    title: "Never Framed as Failure",
    description:
      "Low scores are always presented as opportunities to develop — never as deficiencies. Your child stays motivated and confident.",
  },
  {
    icon: Bell,
    title: "Stay in the Loop",
    description:
      "Get simplified summaries of your athlete's results and notifications so you're always part of their development journey.",
  },
];

export function ParentWhatYouGet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-light/30 to-surface" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            The Parent Report
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight">
            Finally Understand What&apos;s{" "}
            <span className="gradient-text">In Their Head</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-[15px] md:text-lg">
            Your athlete takes the assessment. You get a report built just for
            parents — focused on how to support them, not on performance metrics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-border/50 bg-surface-card/60 p-6 hover:border-primary/40 transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary-light" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
