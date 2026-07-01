"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { LazyVideo } from "@/components/common/LazyVideo";
import {
  Zap,
  Target,
  Brain,
  Users,
  TrendingUp,
  Shield,
  Focus,
  Flame,
} from "lucide-react";

const phases = [
  {
    name: "Preparation",
    description: "How athletes prepare, train, and receive coaching",
    color: "from-blue-500 to-blue-600",
    factors: ["Work Style", "Coachability", "Grit"],
  },
  {
    name: "Competition",
    description: "How athletes perform and compete under pressure",
    color: "from-cyan-500 to-blue-500",
    factors: ["Drive", "Focus", "Mental Toughness"],
  },
  {
    name: "Teamwork",
    description: "Team contribution, leadership, and situational response",
    color: "from-blue-400 to-cyan-400",
    factors: ["Leadership Potential", "Team Orientation"],
  },
];

const factors = [
  {
    name: "Work Style",
    icon: Zap,
    description: "Approach to training and practice habits",
    phase: "Preparation",
  },
  {
    name: "Coachability",
    icon: Users,
    description: "Receptiveness to feedback and instruction",
    phase: "Preparation",
  },
  {
    name: "Grit",
    icon: Flame,
    description: "Perseverance and passion for long-term goals",
    phase: "Preparation",
  },
  {
    name: "Drive",
    icon: TrendingUp,
    description: "Internal motivation and competitive desire",
    phase: "Competition",
  },
  {
    name: "Focus",
    icon: Focus,
    description: "Concentration and attention management",
    phase: "Competition",
  },
  {
    name: "Mental Toughness",
    icon: Shield,
    description: "Resilience under pressure and adversity",
    phase: "Competition",
  },
  {
    name: "Leadership Potential",
    icon: Target,
    description: "Ability to inspire and guide teammates",
    phase: "Teamwork",
  },
  {
    name: "Team Orientation",
    icon: Brain,
    description: "Collaboration and team-first mentality",
    phase: "Teamwork",
  },
];

export function WhatWeMeasure() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState("Preparation");

  const filteredFactors = factors.filter((f) => f.phase === activePhase);

  return (
    <section id="what-we-measure" className="relative py-24 md:py-32 lg:py-36 overflow-hidden" ref={ref}>
      {/* Video bg + blue tint for alternating section */}
      <div className="absolute inset-0">
        <LazyVideo
          src="/videos/athlete-1.mp4"
          className="w-full h-full object-cover object-center opacity-[0.1]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface-light via-surface-alt to-surface-light" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            What We Measure
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">
            Three Phases of{" "}
            <span className="gradient-text">Mental Performance</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-lg">
            Every athlete is scored across preparation, competition, and teamwork
            — giving a complete picture of mental readiness from training to game day.
          </p>
        </motion.div>

        {/* Phase Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {phases.map((phase) => (
            <button
              key={phase.name}
              onClick={() => setActivePhase(phase.name)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activePhase === phase.name
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : "bg-surface-card border border-border/50 text-text-secondary hover:text-text-primary hover:border-primary/30"
              }`}
            >
              {phase.name}
            </button>
          ))}
        </motion.div>

        {/* Phase Description */}
        <motion.p
          key={activePhase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center text-text-secondary mb-12"
        >
          {phases.find((p) => p.name === activePhase)?.description}
        </motion.p>

        {/* Factor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {filteredFactors.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <motion.div
                key={factor.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group rounded-2xl border border-border/50 bg-surface-card/80 p-6 hover:border-primary/40 transition-all duration-300 hover:glow cursor-default"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary-light" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {factor.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {factor.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-text-muted">
            Each factor breaks down into multiple dimensions — totaling{" "}
            <span className="text-primary-light font-medium">
              22 granular measures
            </span>{" "}
            of your mental game.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
