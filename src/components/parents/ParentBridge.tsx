"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { LazyVideo } from "@/components/common/LazyVideo";

const points = [
  "Shift the car-ride-home conversation from critiquing errors to supporting their mental approach",
  "Know whether your child is struggling with arousal control or simply needs a different style of feedback",
  "Offer targeted encouragement using real data — not generic questions",
  "Reduce the friction caused by subjective coaching from the sideline",
  "Speak the same language as the assessment, so your child feels understood rather than judged",
  "Spot early signs of burnout or declining motivation before they lead to quitting",
];

export function ParentBridge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      {/* Blue-tinted contrast background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-light via-surface-alt to-surface-light" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
              Bridge the Communication Gap
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-black mb-5 uppercase tracking-tight">
              Know What to Say on the{" "}
              <span className="gradient-text">Car Ride Home</span>
            </h2>
            <p className="text-[15px] md:text-base text-text-secondary leading-relaxed mb-8">
              One of the greatest challenges for sports parents is knowing what
              to say after a game. The Parent Report gives you a specific
              blueprint — so you can support your athlete&apos;s mental game while
              keeping your relationship strong.
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

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-first lg:order-last"
          >
            <div className="rounded-2xl overflow-hidden border border-border/50 aspect-video bg-surface-card shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <LazyVideo
                src="/videos/coaching.mp4"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
