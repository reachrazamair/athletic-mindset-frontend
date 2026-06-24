"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { ParentHero } from "@/components/parents/ParentHero";
import { ParentWhatYouGet } from "@/components/parents/ParentWhatYouGet";
import { ParentBridge } from "@/components/parents/ParentBridge";
import { ParentTestimonials } from "@/components/parents/ParentTestimonials";
import { ParentPricing } from "@/components/parents/ParentPricing";
import { ParentCTA } from "@/components/parents/ParentCTA";

export default function ParentsPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <ParentHero />
        <ParentWhatYouGet />
        <ParentBridge />
        <ParentTestimonials />
        <ParentPricing />
        <ParentCTA />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
