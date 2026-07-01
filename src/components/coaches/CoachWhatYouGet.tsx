"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardList,
  Users,
  AlertTriangle,
  Target,
  LineChart,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "A Report on Every Athlete",
    description:
      "Get a Coach Report for each athlete — their mental strengths, growth areas, and exactly how to coach them as an individual.",
  },
  {
    icon: Users,
    title: "Team Mindset Report",
    description:
      "See your roster as a unit: cohesion, collective confidence, leadership, and culture — not just a collection of individuals.",
  },
  {
    icon: AlertTriangle,
    title: "Spot At-Risk Athletes",
    description:
      "Identify who's struggling with pressure, confidence, or motivation before it shows up on the scoreboard.",
  },
  {
    icon: Target,
    title: "Tailored Development Plans",
    description:
      "Turn each athlete's profile into a clear plan — the right habits, mental skills, and feedback style for how they're wired.",
  },
  {
    icon: LineChart,
    title: "Track Progress Over Time",
    description:
      "Reassess through the season and watch mental skills develop, so you can adjust your approach with real data.",
  },
  {
    icon: Layers,
    title: "Coach Summary at a Glance",
    description:
      "A quick-read summary across your whole roster — the headline insights you need without hours of reading.",
  },
];

export function CoachWhatYouGet() {
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
            The Coach Toolkit
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight">
            A Blueprint for{" "}
            <span className="gradient-text">Every Athlete</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-[15px] md:text-lg">
            Your athletes take one assessment. You get individual coach reports,
            a team-level picture, and a plan for developing each of them.
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
