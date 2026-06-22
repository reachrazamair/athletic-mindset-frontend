"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

const sampleScores = [
  { label: "Mental Toughness", score: 68, band: "High" },
  { label: "Focus", score: 55, band: "Average" },
  { label: "Drive", score: 72, band: "Very High" },
  { label: "Coachability", score: 61, band: "High" },
  { label: "Grit", score: 48, band: "Average" },
  { label: "Leadership", score: 58, band: "Above Average" },
  { label: "Work Style", score: 44, band: "Below Average" },
  { label: "Team Orientation", score: 63, band: "High" },
];

function ScoreBar({ label, score, band, index }: { label: string; score: number; band: string; index: number }) {
  const percentage = ((score - 20) / 60) * 100; // T-score range 20-80 mapped to 0-100%
  const getColor = (s: number) => {
    if (s >= 61) return "from-primary to-accent";
    if (s >= 45) return "from-primary/70 to-primary";
    return "from-orange-500/70 to-orange-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs md:text-sm text-text-secondary font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">{band}</span>
          <span className="text-sm font-bold text-text-primary">{score}</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-surface-light overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.08, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${getColor(score)}`}
        />
      </div>
    </motion.div>
  );
}

export function ReportPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-light/50 to-surface" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            Your Report
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">
            See What You&apos;ll{" "}
            <span className="gradient-text">Discover</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-lg">
            A snapshot of your personalized mental performance profile. Scored
            across 8 factors and 22 dimensions using T-scores.
          </p>
        </motion.div>

        {/* Report Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-2xl md:rounded-3xl border border-border/50 bg-surface-card/80 overflow-hidden">
            {/* Report Header */}
            <div className="p-5 md:p-8 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                    Sample Athlete Report
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-text-primary">
                    Athletic Mindset Profile
                  </h3>
                </div>
                <div className="text-center">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-lg md:text-xl">62</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-text-muted mt-1">Total AM Score</p>
                </div>
              </div>
            </div>

            {/* Score Bars */}
            <div className="p-5 md:p-8 space-y-4">
              {isInView &&
                sampleScores.map((score, index) => (
                  <ScoreBar
                    key={score.label}
                    label={score.label}
                    score={score.score}
                    band={score.band}
                    index={index}
                  />
                ))}
            </div>

            {/* Blurred/Locked section */}
            <div className="relative p-5 md:p-8 border-t border-border/50">
              <div className="blur-sm pointer-events-none select-none">
                <p className="text-sm text-text-secondary mb-2">
                  <strong>Personalized Gameplan:</strong> Based on your scores,
                  here are the mental skills routines recommended for your
                  development...
                </p>
                <p className="text-sm text-text-secondary">
                  Your primary focus areas are Visualization and Self-Talk
                  techniques applied to competition pressure scenarios...
                </p>
              </div>
              {/* Lock overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-surface-card/60">
                <div className="text-center">
                  <Lock className="h-6 w-6 text-primary-light mx-auto mb-2" />
                  <p className="text-sm font-medium text-text-primary mb-3">
                    Take the assessment to unlock your full Gameplan
                  </p>
                  <Link
                    href="#assessment"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-light transition-all active:scale-95"
                  >
                    Get My Report
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
