"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { HeroSection } from "@/components/landing/Hero";
import { StatsSection } from "@/components/landing/Stats";
import { ReportPreview } from "@/components/landing/ReportPreview";
import { WhatWeMeasure } from "@/components/landing/WhatWeMeasure";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SolutionsFor } from "@/components/landing/SolutionsFor";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTA";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/common/IntroAnimation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main className="pb-20 md:pb-0">
          <HeroSection />
          <StatsSection />
          <ReportPreview />
          <WhatWeMeasure />
          <HowItWorks />
          <SolutionsFor />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
        <BottomNav />
      </motion.div>
    </>
  );
}
