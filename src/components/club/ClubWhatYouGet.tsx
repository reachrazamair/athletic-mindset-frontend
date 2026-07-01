"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  GraduationCap,
  BarChart3,
  UserPlus,
  Layers,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Every Athlete Assessed",
    description:
      "A complete 22-dimension mental profile and personalized gameplan for every athlete across your program.",
  },
  {
    icon: GraduationCap,
    title: "Every Coach Equipped",
    description:
      "Coach and summary reports for every team, so your staff can develop the mental game, not just the physical one.",
  },
  {
    icon: BarChart3,
    title: "Program-Wide View",
    description:
      "See mental readiness across every team from one place — spot patterns, gaps, and standout leaders program-wide.",
  },
  {
    icon: UserPlus,
    title: "Bulk Onboarding",
    description:
      "Invite entire rosters at once with a simple import. Get your whole program set up in minutes, not weeks.",
  },
  {
    icon: Layers,
    title: "Unlimited Teams",
    description:
      "One system for every squad, level, and season — from your youngest club team to your varsity roster.",
  },
  {
    icon: ShieldCheck,
    title: "A Culture That Lasts",
    description:
      "Build shared language and mental standards across teams, so culture carries from one season to the next.",
  },
];

export function ClubWhatYouGet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="what-you-get" className="relative py-20 md:py-28" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-light/30 to-surface" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            A System for the Whole Program
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight">
            One Platform,{" "}
            <span className="gradient-text">Every Team</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-[15px] md:text-lg">
            Athletic Mindset scales from a single team to an entire school
            system — with the tools to assess, equip, and track everyone.
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
