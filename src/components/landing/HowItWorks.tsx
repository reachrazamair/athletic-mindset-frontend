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
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Get Your Scores",
    description:
      "Receive your T-scores across all 8 factors, benchmarked against thousands of athletes. See exactly where you stand.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Read Your Gameplan",
    description:
      "Get a personalized report with actionable steps — written differently for athletes, parents, and coaches.",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Train & Improve",
    description:
      "Follow your mental skills routines, track progress over time, and reassess to see your growth.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      ref={ref}
    >
      {/* Blue-tinted contrast background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508] via-[#0a0e14] to-[#030508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.05)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            How It Works
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-5 uppercase tracking-tight">
            From Assessment to{" "}
            <span className="gradient-text">Action</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-lg">
            A clear path from understanding your mental game to actively
            improving it — backed by science, guided by experts.
          </p>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting Line - desktop */}
          <div className="hidden lg:block absolute top-14 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 origin-left"
            />
          </div>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-8 bottom-8 left-7 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 origin-top"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.18 }}
                  className="relative md:text-center group flex md:flex-col items-start md:items-center gap-5 md:gap-0 pl-20 md:pl-0"
                >
                  {/* Step Icon */}
                  <div className="absolute left-0 top-0 md:relative inline-flex flex-col items-center md:mb-7">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="relative z-10 h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-surface-card border border-border/40 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-500"
                    >
                      <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary-light" />
                    </motion.div>
                    <span className="absolute -top-2.5 -right-2.5 z-20 text-[10px] md:text-xs font-black text-primary-light bg-surface border border-primary/30 rounded-full h-6 w-6 md:h-7 md:w-7 flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  <div className="md:text-center">
                    <h3 className="text-base md:text-lg font-bold text-text-primary mb-2 md:mb-3">
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
