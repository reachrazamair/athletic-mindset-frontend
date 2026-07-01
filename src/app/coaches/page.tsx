"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CoachHero } from "@/components/coaches/CoachHero";
import { CoachWhatYouGet } from "@/components/coaches/CoachWhatYouGet";
import { CoachHowItWorks } from "@/components/coaches/CoachHowItWorks";
import { CoachRecruitment } from "@/components/coaches/CoachRecruitment";
import { CoachTestimonials } from "@/components/coaches/CoachTestimonials";
import { CoachPricing } from "@/components/coaches/CoachPricing";
import { CoachCTA } from "@/components/coaches/CoachCTA";

export default function CoachesPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <CoachHero />
        <CoachWhatYouGet />
        <CoachHowItWorks />
        <CoachRecruitment />
        <CoachTestimonials />
        <CoachPricing />
        <CoachCTA />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
