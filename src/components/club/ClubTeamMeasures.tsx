"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const groups = [
  {
    label: "Team Process",
    title: "How your teams work together",
    points: [
      "Preparation — how teams plan, strategize, and align on goals",
      "Competition — how athletes coordinate and execute in the moment",
      "Interpersonal — the trust and harmony that hold a team together",
    ],
  },
  {
    label: "Teamwork Culture",
    title: "The identity that shapes behavior",
    points: [
      "Values — the principles your team truly identifies with",
      "Expectations — the unspoken standards for how things get done",
      "Consistency between coach strategy and team culture",
    ],
  },
  {
    label: "Team Strength",
    title: "What drives results on the field",
    points: [
      "Leadership strength across your designated leaders",
      "Team cohesion, collective confidence, and shared commitment",
      "Role clarity — everyone knowing and owning their part",
    ],
  },
];

export function ClubTeamMeasures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-surface-light via-surface-alt to-surface-light" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            Team Measures
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight">
            Go Beyond the{" "}
            <span className="gradient-text">Sum of Individuals</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-[15px] md:text-lg">
            The Team Mindset assessment reveals what makes your teams tick —
            cohesion, culture, collective confidence, and the dynamics that
            decide whether a group of athletes becomes a real team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {groups.map((group, index) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="rounded-2xl border border-border/50 bg-surface-card/60 p-6 md:p-7"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-light">
                {group.label}
              </span>
              <h3 className="mt-2 mb-5 text-lg font-semibold text-text-primary">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-[14px] text-text-secondary leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
