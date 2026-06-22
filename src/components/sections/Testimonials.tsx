"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "On Saturday I took my girls field hockey team to a 1v1 shootout and one of the players said 'My assessment said I have a hard time under pressure and this is what I have to do' — she was referring to one of the Athletic Mindset relaxation techniques, and then went out and scored a huge goal for us. From that moment on the rest of my girls bought into the program. I went on to be coach of the year, and now all juniors and seniors at Friends Academy utilize this amazing platform.",
    author: "Christine Botti",
    role: "Head Field Hockey Coach",
    org: "Friends Academy",
  },
  {
    quote:
      "I feel that the assessment is essential in self-reflection, something every athlete should have to take. It puts your strengths and weaknesses at the forefront of the mind. Besides the fact it promotes self-awareness, the fact that it puts words to one's behavior and actions is a big deal. It brings feelings into life, into reality. Having this can significantly increase the drive one has to improve themselves, which will then improve the team as a whole.",
    author: "Gail Banawis",
    role: "Athlete",
    org: "",
  },
  {
    quote:
      "This really was very accurate about me. Since I play soccer I've been told by other coaches what my flaws are and one major flaw is that I need to stay calm on the field and concentrate. This test helped me show what else I'm good at but also what I can improve on. I feel like the stuff that it told me to do to help myself and fix my flaws will make me a better player.",
    author: "Roko Radovani",
    role: "Soccer Player",
    org: "",
  },
  {
    quote:
      "To be frank, this assessment exam exposed the horrifying truth on some of my weaknesses and strengths. I was asked questions that was stimulating to my mind and allowed me to look at things from a different aspect. The results disclosed characteristics of myself, that I knew I had, but was in denial about.",
    author: "Damilola Odugbemi",
    role: "Athlete",
    org: "",
  },
  {
    quote:
      "I thought the test was mostly accurate. It is a good tool to use as a method of self evaluation & could be beneficial in improving one's work ethic in not only fitness but daily life.",
    author: "Montana Seccafico",
    role: "Athlete",
    org: "",
  },
  {
    quote:
      "The feedback that I have received in regards to the results of the assessment is informative about highlighting my strengths and weaknesses both extrinsically and intrinsically. Furthermore, it provides a detailed account of how my personal qualities measure up to the standards of a typical athlete. Additionally, my results extensively suggest as to how I should improve steadily and then gradually.",
    author: "Michael Ojeranti",
    role: "Athlete",
    org: "",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  const nextPage = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-light/30 to-surface" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Real Athletes.{" "}
            <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Hear from athletes and coaches who have used Athletic Mindset to
            unlock their mental performance.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border border-border/50 bg-surface-card/50 p-8 flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/30 mb-4 flex-shrink-0" />

              {/* Quote Text */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-light">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-text-muted">
                    {testimonial.role}
                    {testimonial.org && ` · ${testimonial.org}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevPage}
              className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-border-light hover:bg-primary/50"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all"
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
