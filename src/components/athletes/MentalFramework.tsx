"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { LazyVideo } from "@/components/common/LazyVideo";

const phases = [
  {
    name: "Preparation",
    tagline: "Building the Foundation",
    color: "from-blue-500 to-blue-600",
    factors: [
      {
        name: "Grit",
        description: "Perseverance and motivation for long-term goals",
        dimensions: ["Intrinsic Motivation", "Persistence"],
      },
      {
        name: "Work Style",
        description: "Attitude and mindset during practice and preparation",
        dimensions: ["Mastery Approach", "Growth Mindset"],
      },
      {
        name: "Coachability",
        description: "Receptiveness to learning and feedback",
        dimensions: ["Cooperation", "Feedback Acceptance", "Modesty"],
      },
    ],
  },
  {
    name: "Competition",
    tagline: "Executing Under Pressure",
    color: "from-cyan-500 to-blue-500",
    factors: [
      {
        name: "Drive",
        description: "Short-term motivation to compete and win",
        dimensions: ["Competitiveness", "Challenge Approach"],
      },
      {
        name: "Focus",
        description: "Maintaining positive concentration during events",
        dimensions: ["Concentration", "Presence", "Visualization Ability"],
      },
      {
        name: "Mental Toughness",
        description: "Confidence, emotional control, and bouncing back",
        dimensions: ["Positive Coping Style", "Stress Management", "Confidence"],
      },
    ],
  },
  {
    name: "Teamwork",
    tagline: "Excelling as Part of the Unit",
    color: "from-blue-400 to-cyan-400",
    factors: [
      {
        name: "Leadership Potential",
        description: "Ability to elevate others and earn trust",
        dimensions: ["Integrity", "Assertiveness"],
      },
      {
        name: "Team Orientation",
        description: "Contributing to team success and supporting others",
        dimensions: ["Team Preference", "Reliance", "Team Goal Focus", "Sociability"],
      },
    ],
  },
];

export function MentalFramework() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      {/* Background video */}
      <div className="absolute inset-0">
        <LazyVideo
          src="/videos/coaching.mp4"
          className="w-full h-full object-cover object-center opacity-[0.18]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            The Framework
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">
            3 Phases. 8 Factors.{" "}
            <span className="gradient-text">22 Dimensions.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-lg">
            Every dimension of your mental game mapped, measured, and connected
            to specific development strategies.
          </p>
        </motion.div>

        {/* Phase Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 md:gap-3 mb-10 md:mb-14"
        >
          {phases.map((phase, index) => (
            <button
              key={phase.name}
              onClick={() => setActivePhase(index)}
              className={`relative rounded-full px-5 py-2.5 text-xs md:text-sm font-medium transition-all duration-300 ${
                activePhase === index
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : "bg-surface-card border border-border/50 text-text-secondary hover:text-text-primary hover:border-primary/30"
              }`}
            >
              {phase.name}
            </button>
          ))}
        </motion.div>

        {/* Phase Content */}
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-center text-text-secondary mb-8 md:mb-10 text-sm md:text-base">
            <span className="text-primary-light font-medium">
              {phases[activePhase].tagline}
            </span>{" "}
            — {phases[activePhase].factors.length} factors measured
          </p>

          <div className={`grid grid-cols-1 gap-5 md:gap-6 max-w-5xl mx-auto ${
            phases[activePhase].factors.length === 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2 md:max-w-3xl"
          }`}>
            {phases[activePhase].factors.map((factor, index) => (
              <motion.div
                key={factor.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-border/50 bg-surface-card/80 p-6"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {factor.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {factor.description}
                </p>
                <div className="space-y-2">
                  {factor.dimensions.map((dim) => (
                    <div
                      key={dim}
                      className="flex items-center gap-2 text-xs text-text-muted"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-light" />
                      {dim}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
