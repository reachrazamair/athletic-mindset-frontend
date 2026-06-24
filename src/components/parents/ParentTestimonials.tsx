"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I really enjoyed taking this survey. I thought it was very accurate and useful. It definitely made me take a step back to see what I have been doing and gives me ways I can perform better, focus more, and help more with my mental health.",
    author: "Adam Hidais",
    role: "Athlete",
  },
  {
    quote:
      "The Athletic Mindset assessment was very accurate. I agree one hundred percent with my results and reading it was crazy to see how accurate it was. I found myself taking pictures of my results and sending them to old teammates and recommending the test to them as well.",
    author: "Kayla Mieranda",
    role: "Athlete",
  },
];

export function ParentTestimonials() {
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
            What Families Say
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black mb-4 uppercase tracking-tight">
            Trusted by Athletes &{" "}
            <span className="gradient-text">Their Families</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="rounded-2xl border border-border-light bg-surface-card p-6 md:p-8 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <Quote className="h-7 w-7 text-primary/30 mb-4 flex-shrink-0" />
              <p className="text-[15px] text-text-secondary leading-relaxed mb-5 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
