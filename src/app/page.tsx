"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { HeroSection } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/Stats";
import { ReportPreview } from "@/components/sections/ReportPreview";
import { WhatWeMeasure } from "@/components/sections/WhatWeMeasure";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SolutionsFor } from "@/components/sections/SolutionsFor";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <HeroSection />
        <StatsSection />
        <ReportPreview />
        <WhatWeMeasure />
        <HowItWorks />
        <SolutionsFor />
        <Pricing />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
