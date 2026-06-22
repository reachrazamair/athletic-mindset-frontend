"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardCheck, BarChart3, LineChart, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Take the Assessment",
    description:
      "Complete our psychologist-designed assessment covering all 22 dimensions of mental performance. Takes about 15 minutes.",
    visual: "assessment",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Get Your Scores",
    description:
      "Receive your T-scores across all 8 factors, benchmarked against thousands of athletes. See exactly where you stand.",
    visual: "scores",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Read Your Gameplan",
    description:
      "Get a personalized report with actionable steps — written differently for athletes, parents, and coaches.",
    visual: "gameplan",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Train & Improve",
    description:
      "Follow your mental skills routines, track progress over time, and reassess to see your growth.",
    visual: "improve",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-20 md:py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            How It Works
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">
            From Assessment to{" "}
            <span className="gradient-text">Action</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-lg">
            A clear path from understanding your mental game to actively
            improving it — backed by science, guided by experts.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - desktop */}
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%+2.5rem)] right-[calc(12.5%+2.5rem)] h-px z-0">
            <div className="h-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30" />
          </div>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-8 bottom-8 left-8 w-px bg-gradient-to-b from-primary/30 via-accent/30 to-primary/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative md:text-center group flex md:flex-col items-start md:items-center gap-4 md:gap-0 pl-14 md:pl-0"
                >
                  {/* Step Number + Icon */}
                  <div className="relative inline-flex flex-col items-center md:mb-6 absolute left-0 md:relative">
                    <div className="relative z-10 h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-surface-card border border-border/50 flex items-center justify-center group-hover:border-primary/50 group-hover:glow transition-all duration-300">
                      <Icon className="h-5 w-5 md:h-7 md:w-7 text-primary-light" />
                    </div>
                    <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-20 text-[10px] md:text-xs font-bold text-primary-light bg-surface border border-primary/30 rounded-full h-5 w-5 md:h-7 md:w-7 flex items-center justify-center shadow-md">
                      {step.number}
                    </span>
                  </div>

                  <div className="md:text-center">
                    <h3 className="text-base md:text-lg font-semibold text-text-primary mb-1 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
