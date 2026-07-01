"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Send, ClipboardCheck, FileText, Trophy } from "lucide-react";

const steps = [
  {
    icon: Send,
    step: "01",
    title: "Invite Your Roster",
    description:
      "Send one link to your team. Each athlete completes the 15-minute assessment on their own phone.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Athletes Get Assessed",
    description:
      "The psychologist-engineered assessment scores each athlete across 22 dimensions of their mental game.",
  },
  {
    icon: FileText,
    step: "03",
    title: "You Get the Reports",
    description:
      "Receive a coach report for every athlete plus a team report — insights, not raw numbers.",
  },
  {
    icon: Trophy,
    step: "04",
    title: "Coach the Mental Game",
    description:
      "Use the plans to develop each athlete and strengthen your team's culture all season long.",
  },
];

export function CoachHowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28" ref={ref}>
      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            How It Works
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight">
            Mental Readiness,{" "}
            <span className="gradient-text">Without the Extra Hours</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-lg">
            No new software to learn and no hours added to your week. Invite your
            team and let the reports do the heavy lifting.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector — horizontal draw on desktop */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] -translate-y-1/2 z-0 pointer-events-none">
            <motion.div
              aria-hidden
              className="h-full w-full origin-left rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(37,99,235,0.45), rgba(96,165,250,0.75) 50%, rgba(37,99,235,0.45))",
                boxShadow: "0 0 14px rgba(37,99,235,0.35)",
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
            <motion.span
              aria-hidden
              className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary-light"
              style={{ boxShadow: "0 0 12px rgba(59,130,246,0.9), 0 0 24px rgba(59,130,246,0.5)" }}
              initial={{ left: "0%", opacity: 0 }}
              animate={isInView ? { left: "100%", opacity: [0, 1, 1, 0] } : {}}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          {/* Connector — vertical draw on mobile (left-aligned timeline) */}
          <div className="md:hidden absolute top-8 bottom-8 left-8 w-[2px] z-0 pointer-events-none">
            <motion.div
              aria-hidden
              className="h-full w-full origin-top rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(37,99,235,0.45), rgba(96,165,250,0.75) 50%, rgba(37,99,235,0.45))",
                boxShadow: "0 0 12px rgba(37,99,235,0.3)",
              }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 pl-20 md:pl-0 md:text-center"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, rotateX: -40 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.18,
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                    }}
                    style={{ perspective: 800 }}
                    className="absolute left-0 top-0 md:relative md:mb-5 inline-flex items-center justify-center"
                  >
                    <div className="relative z-10 h-16 w-16 rounded-2xl bg-surface-card border border-border/50 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                      <Icon className="h-7 w-7 text-primary-light" />
                    </div>
                    <span className="absolute z-20 -top-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </motion.div>

                  {/* Text */}
                  <div className="md:text-center">
                    <h3 className="text-base md:text-lg font-semibold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed md:max-w-xs md:mx-auto">
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
