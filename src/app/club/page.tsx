"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { ClubHero } from "@/components/club/ClubHero";
import { ClubWhatYouGet } from "@/components/club/ClubWhatYouGet";
import { ClubTeamMeasures } from "@/components/club/ClubTeamMeasures";
import { ClubWhoItsFor } from "@/components/club/ClubWhoItsFor";
import { ClubCTA } from "@/components/club/ClubCTA";

export default function ClubPage() {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        <ClubHero />
        <ClubWhatYouGet />
        <ClubTeamMeasures />
        <ClubWhoItsFor />
        <ClubCTA />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
