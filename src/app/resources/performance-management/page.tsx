"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { LazyVideo } from "@/components/common/LazyVideo";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardCheck,
  BookOpen,
  TrendingUp,
  Zap,
  Brain,
  Target,
  BarChart3,
  Eye,
  Lightbulb,
  RefreshCw,
  Activity,
} from "lucide-react";

const pillars = [
  {
    id: "assess",
    icon: ClipboardCheck,
    title: "Assess",
    tagline: "Quantify the mental game",
    color: "from-blue-500 to-cyan-500",
    sections: [
      {
        title: "Designed for Development",
        content:
          "Unlike other sport psychology assessments on the market (designed for scouting), our system was designed for developing athletes. We focus on both traits — stable attributes athletes must learn to manage — and states — dynamic attributes like focus and motivation that can be shaped with practice and mental skills.",
      },
      {
        title: "Athlete Self-Evaluation",
        content:
          "The Athletic MindSET measures key areas identified in the latest scientific sport psychology research that drive individual performance, including preparation-related variables (motivation), competition-related variables (focus), and teamwork-related variables (team orientation).",
      },
      {
        title: "Team Assessment",
        content:
          "The Team Mentalytics Assessment measures dimensions that drive team performance, including team process (conflict management), team culture (values), and team attributes (collective confidence). It measures characteristics that only exist at the group level — dimensions like culture and cohesion that are inaccurate when assessed by a single person.",
      },
    ],
  },
  {
    id: "learn",
    icon: BookOpen,
    title: "Learn",
    tagline: "Master mental skills",
    color: "from-violet-500 to-purple-500",
    sections: [
      {
        title: "Beyond Scores and Numbers",
        content:
          "To optimize an athlete's entire skill set, they need to learn mental skills — just like physical ones. Our reports go far beyond numbers to provide instruction and actionable feedback specific to each athlete, helping them manage their own mental game and learn sport psychology techniques.",
      },
      {
        title: "Personalized Reports",
        content:
          "Based on assessment results, we prepare reports for each member of an athlete's supportive network. For teams, we provide insights into unique aspects of team interaction with coach-directed feedback and guidance. Reports help athletes, parents, and coaches focus directly on the areas requiring the most attention.",
      },
    ],
  },
  {
    id: "develop",
    icon: TrendingUp,
    title: "Develop",
    tagline: "Build mental strength",
    color: "from-emerald-500 to-teal-500",
    sections: [
      {
        title: "Self-Awareness",
        content:
          "Most athletes know their physical strengths because they're observable. Mental strengths are harder to quantify. When an athlete understands their mental limitations, they can focus directly on developing weaknesses and recognize situations where those weaknesses are most problematic.",
      },
      {
        title: "Six Mental Skills",
        content:
          "We use six types of mental skills to help athletes manage weaknesses and improve mental strength: Self-talk, Arousal Control, Visualization, Routines, Goal Setting, and Re-Framing. Each skill can address multiple performance dimensions. Our reports are customized so the appropriate skill is used in the correct situation.",
      },
      {
        title: "Team Development",
        content:
          "For teams, we provide development activities targeting specific team processes. We inform coaches about team coordination, cohesion, and what they can do to improve those areas — from setting process goals during practice simulations to cross-training players. Coaches can create the team chemistry they want.",
      },
    ],
  },
  {
    id: "perform",
    icon: Zap,
    title: "Perform",
    tagline: "Execute under pressure",
    color: "from-amber-500 to-orange-500",
    sections: [
      {
        title: "Practice First",
        content:
          "Athletes and teams should always implement techniques in practice first. We don't recommend making changes during competitions before having a chance to practice. Add mental skills to your training schedule and work on them every preparation session. When comfortable, implement in competition.",
      },
      {
        title: "Monitor and Adjust",
        content:
          "Our strategy and development system equips athletes with new ways of thinking and controlling mental performance. All athletes should monitor performance during preparation AND competition over several months. You may see small but steady improvements that eventually translate to competition results.",
      },
      {
        title: "Strategic Monitoring",
        content:
          "By comparing mid-season assessment data against pre-season baselines, teams can pinpoint when burnout sets in or where communication breakdown occurs. This predictive capability allows for pre-habilitative mental work — addressing issues before they manifest as losses on the scoreboard.",
      },
    ],
  },
];

const mentalSkills = [
  { icon: Brain, name: "Self-Talk", description: "Control your inner narrative" },
  { icon: Activity, name: "Arousal Control", description: "Manage energy and anxiety" },
  { icon: Eye, name: "Visualization", description: "See success before it happens" },
  { icon: RefreshCw, name: "Routines", description: "Build consistent preparation" },
  { icon: Target, name: "Goal Setting", description: "Direct focus and effort" },
  { icon: Lightbulb, name: "Re-Framing", description: "Transform setbacks into fuel" },
];

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PerformanceManagementPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        {/* Hero */}
        <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <LazyVideo
              src="/videos/athlete-2.mp4"
              className="w-full h-full object-cover opacity-[1.5]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/70 to-surface" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                <BarChart3 size={14} className="text-primary-light" />
                <span className="text-xs font-medium text-primary-light">
                  Performance Management System
                </span>
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Assess. Learn. Develop.{" "}
                <span className="gradient-text">Perform.</span>
              </h1>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Our four-pillar performance management system transforms mental
                performance from an intangible concept into a measurable,
                trainable skill set — backed by decades of sport psychology
                research.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Four Pillars Overview */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {pillars.map((pillar, i) => (
                <motion.a
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-2xl border border-border/50 bg-surface-card/50 p-5 md:p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]"
                >
                  <div
                    className={`inline-flex rounded-xl bg-gradient-to-br ${pillar.color} p-2.5 mb-3`}
                  >
                    <pillar.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{pillar.title}</h3>
                  <p className="text-xs md:text-sm text-text-secondary">
                    {pillar.tagline}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Pillar Sections */}
        {pillars.map((pillar, pillarIndex) => (
          <section
            key={pillar.id}
            id={pillar.id}
            className="py-16 md:py-24 border-t border-border/30"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Section>
                <div className="flex items-center gap-4 mb-10 md:mb-14">
                  <div
                    className={`inline-flex rounded-xl bg-gradient-to-br ${pillar.color} p-3`}
                  >
                    <pillar.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                      Pillar {pillarIndex + 1}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold">
                      {pillar.title}
                    </h2>
                  </div>
                </div>
              </Section>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {pillar.sections.map((section, i) => (
                  <Section key={i}>
                    <div className="rounded-2xl border border-border/50 bg-surface-card/30 p-6 md:p-8 h-full">
                      <h3 className="text-lg font-semibold mb-3 text-text-primary">
                        {section.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </Section>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Mental Skills Grid */}
        <section className="py-16 md:py-24 border-t border-border/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Section className="text-center mb-12 md:mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
                The Toolkit
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Six Mental Skills for{" "}
                <span className="gradient-text">Peak Performance</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Each skill is prescribed based on your unique assessment results
                and targeted to the dimensions that need the most attention.
              </p>
            </Section>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {mentalSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-border/50 bg-surface-card/50 p-5 md:p-6 text-center hover:border-primary/30 transition-all duration-300"
                >
                  <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-3">
                    <skill.icon size={22} className="text-primary-light" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-text-muted">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Science Section */}
        <section className="py-16 md:py-24 border-t border-border/30 bg-surface-light/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Section className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-4 block">
                The Science
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                Mental Skill Acquisition
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Mental skills are acquired through the same neurological pathways
                as physical ones. When an athlete engages in mental performance
                training, they are rewiring their stress response and focus
                mechanisms. This biological shift requires high-repetition
                practice and deliberate reflection.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our system focuses on Transfer of Training — ensuring techniques
                learned in reports move onto the field. By identifying specific
                triggers like a missed shot or a bad call, athletes apply
                pre-learned Re-Framing or Arousal Control techniques in
                real-time. This transforms a reactive athlete into a proactive
                one who dictates the tempo of the game.
              </p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
