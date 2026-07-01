"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "On Saturday we went to a 1v1 shootout and one of the girls in my lineup said, 'My assessment said I have a hard time under pressure and this is what I need to do.' She referenced her relaxation techniques, went out, and scored a huge goal for us.",
    name: "Christine Botti",
    role: "Field Hockey Coach · Friends Academy",
  },
  {
    quote:
      "All of our girls completed their individual assessment. I have LOVED seeing the individual results, and the summary is awesome — very helpful.",
    name: "Jen O'Brien",
    role: "Women's Lacrosse Coach · Virginia Commonwealth University",
  },
];

export function CoachTestimonials() {
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
            From the Sideline
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight">
            Coaches Are{" "}
            <span className="gradient-text">Seeing It Work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative rounded-2xl border border-border/50 bg-surface-card/60 p-7 md:p-8"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-[15px] md:text-lg text-text-secondary leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="border-t border-border/40 pt-4">
                <p className="text-base font-semibold text-text-primary">{t.name}</p>
                <p className="text-sm text-text-muted">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
