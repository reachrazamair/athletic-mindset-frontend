"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { LazyVideo } from "@/components/common/LazyVideo";

const points = [
  "Look past the highlight reel — evaluate coachability and growth mindset before you offer a spot",
  "Predict how a recruit will handle the jump to a more demanding level of play",
  "Identify high-ceiling athletes with the grit to push through development plateaus",
  "Assess stress management and self-talk before they ever step in your locker room",
  "Minimize the risk of a bad fit and protect the mental fabric of your roster",
  "Manage psychological traits as rigorously as physical conditioning",
];

export function CoachRecruitment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-surface-light via-surface-alt to-surface-light" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-video bg-surface-card shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <LazyVideo
                src="/videos/athlete-2.mp4"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
              Recruiting & Psychological Fit
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-black mb-5 uppercase tracking-tight">
              Recruit the Mindset,{" "}
              <span className="gradient-text">Not Just the Measurables</span>
            </h2>
            <p className="text-[15px] md:text-base text-text-secondary leading-relaxed mb-8">
              The right athlete is more than stats and film. Athletic Mindset
              gives you the final piece of the scouting puzzle — objective data
              on the mental traits that decide who thrives at the next level.
            </p>

            <ul className="space-y-4">
              {points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary-light flex-shrink-0 mt-0.5" />
                  <span className="text-[15px] md:text-base text-text-secondary leading-relaxed">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
