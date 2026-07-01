"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { LazyVideo } from "@/components/common/LazyVideo";
import {
  User,
  Users,
  GraduationCap,
  Building2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    id: "athlete",
    icon: User,
    title: "For Athletes",
    tagline: "Know your mental game. Own your mental game.",
    description:
      "Get a complete mental performance profile scored across 22 dimensions. Understand exactly where your strengths are and where to focus your mental training for the biggest gains.",
    features: [
      "Personal T-score across all 22 dimensions",
      "Benchmarked against thousands of athletes in your sport",
      "Personalized Gameplan with actionable mental skills",
      "Progress tracking with reassessment over time",
      "Mental training routines tailored to your weak spots",
    ],
    video: "/videos/athlete-2.mp4",
  },
  {
    id: "parent",
    icon: Users,
    title: "For Parents",
    tagline: "Finally understand what's happening inside your athlete's head.",
    description:
      "Get a jargon-free report that helps you support your child's mental development — without undermining their coach or adding pressure.",
    features: [
      "Simple, clear language — no psychology degree needed",
      "Understand your child's mental strengths and growth areas",
      "Communication tips to support without adding pressure",
      "Progress visibility over time",
      "Coaching tips so you know how to help at home",
    ],
    video: "/videos/parents.mp4",
  },
  {
    id: "coach",
    icon: GraduationCap,
    title: "For Coaches",
    tagline: "Coach the whole athlete. Not just the physical.",
    description:
      "See your entire roster's mental readiness at a glance. Know which athletes need attention, who's ready to lead, and how to communicate with each player based on their profile.",
    features: [
      "Roster-wide mental readiness dashboard",
      "Individual athlete reports with coaching language",
      "Identify at-risk athletes before performance drops",
      "Leadership potential and role recommendations",
      "Revenue share — earn from every athlete you bring in",
    ],
    video: "/videos/coaching.mp4",
  },
  {
    id: "organization",
    icon: Building2,
    title: "For Clubs & Organizations",
    tagline: "Scale mental performance across your entire program.",
    description:
      "Bulk onboard hundreds or thousands of athletes. Get organization-wide insights, benchmarking, and a branded experience that elevates your program.",
    features: [
      "Bulk athlete import — CSV, links, or QR codes",
      "Organization-wide analytics and benchmarks",
      "Dedicated account support",
      "Volume pricing with club-level billing",
    ],
    video: "/videos/athlete-3.mp4",
  },
];

export function SolutionsFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSolution, setActiveSolution] = useState("athlete");

  const active = solutions.find((s) => s.id === activeSolution)!;

  return (
    <section id="solutions" className="relative py-20 md:py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-light/30 to-surface" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            Built For Everyone
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">
            Solutions For Your{" "}
            <span className="gradient-text">Entire Team</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-lg">
            Same assessment data, different experiences — tailored for each
            person in the athlete&apos;s support system.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-16"
        >
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <button
                key={solution.id}
                onClick={() => setActiveSolution(solution.id)}
                className={`flex items-center gap-1.5 md:gap-2 rounded-full px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeSolution === solution.id
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    : "bg-surface-card border border-border/50 text-text-secondary hover:text-text-primary hover:border-primary/30"
                }`}
              >
                <Icon size={16} />
                {solution.title.replace("For ", "")}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSolution}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Video Visual - shows first on mobile */}
          <div className="relative order-first lg:order-last">
            <div className="rounded-2xl overflow-hidden border border-border/50 aspect-video md:aspect-[4/3] bg-surface-card">
              <LazyVideo
                key={active.video}
                src={active.video}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-surface/10 pointer-events-none" />
            </div>
            {/* Floating Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute bottom-3 right-3 md:bottom-6 md:right-6 rounded-xl glass border border-border/50 p-3 md:p-4 shadow-xl"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold text-xs md:text-sm">72</span>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-text-muted">Total AM Score</p>
                  <p className="text-xs md:text-sm font-semibold text-text-primary">
                    Above Average
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {active.tagline}
            </h3>
            <p className="text-text-secondary text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              {active.description}
            </p>
            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {active.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary-light" />
                  </div>
                  <span className="text-sm md:text-base text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#assessment"
              className="group inline-flex items-center gap-2 text-primary-light font-medium hover:text-white transition-colors"
            >
              Get Started Free
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
