"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { LazyVideo } from "@/components/common/LazyVideo";

const sampleScores = [
  { label: "Mental Toughness", score: 68, band: "High" },
  { label: "Focus", score: 55, band: "Average" },
  { label: "Drive", score: 72, band: "Very High" },
  { label: "Coachability", score: 61, band: "High" },
  { label: "Grit", score: 48, band: "Average" },
  { label: "Leadership", score: 58, band: "Above Average" },
  { label: "Work Style", score: 44, band: "Below Avg" },
  { label: "Team Orientation", score: 63, band: "High" },
];

function ScoreBar({ label, score, band, index }: { label: string; score: number; band: string; index: number }) {
  const percentage = ((score - 20) / 60) * 100;
  const getColor = (s: number) => {
    if (s >= 61) return "from-primary to-primary-light";
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
          <span className="text-[10px] md:text-xs text-text-muted">{band}</span>
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

export function AthleteReportPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 md:py-36 overflow-hidden" ref={ref}>
      {/* Video background */}
      <div className="absolute inset-0">
        <LazyVideo
          src="/videos/athlete-2.mp4"
          className="w-full h-full object-cover object-center opacity-[0.12]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/75 to-surface/90" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            Report Preview
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-5 uppercase tracking-tight">
            See What Your Report{" "}
            <span className="gradient-text">Looks Like</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-lg">
            A real snapshot from the Athletic Mindset Athlete Report. Your actual
            results will be based on your unique assessment responses.
          </p>
        </motion.div>

        {/* Report Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-2xl md:rounded-3xl border border-border/50 bg-surface-card/90 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* Report Header — score circle centered */}
            <div className="p-6 md:p-8 border-b border-border/50">
              <div className="flex flex-col items-center text-center">
                {/* Score Circle */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                  className="relative mb-3"
                >
                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                    <span className="text-white font-black text-2xl md:text-3xl">62</span>
                  </div>
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-primary/40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                <p className="text-xs md:text-sm text-text-muted font-medium">
                  Total AM Score
                </p>
                <div className="mt-4 w-full text-left">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">
                    Sample Athlete Report
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-text-primary">
                    Athletic Mindset Profile
                  </h3>
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

            {/* Blurred/Locked Gameplan section */}
            <div className="relative p-5 md:p-8 border-t border-border/50">
              <div className="blur-sm pointer-events-none select-none">
                <p className="text-sm text-text-secondary mb-2">
                  <strong>Your Personalized Gameplan:</strong> Based on your Work
                  Style and Grit scores, your primary mental skills focus should
                  be on Visualization and Goal-Setting routines...
                </p>
                <p className="text-sm text-text-secondary">
                  Recommended routine: 5-minute pre-practice visualization
                  focusing on mastery cues. Add daily journaling...
                </p>
              </div>
              {/* Lock overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-surface-card/70 backdrop-blur-[2px]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-center"
                >
                  <Lock className="h-6 w-6 text-primary-light mx-auto mb-2" />
                  <p className="text-sm font-medium text-text-primary mb-3">
                    Your full Gameplan unlocks with your report
                  </p>
                  <Link
                    href="#buy"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-light transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
                  >
                    Get My Report
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
