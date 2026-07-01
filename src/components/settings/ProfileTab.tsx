"use client";

import { AthleteProfileSection } from "@/components/settings/sections/AthleteProfileSection";
import { RoleSection } from "@/components/settings/sections/RoleSection";
import { useAuth } from "@/lib/auth-context";

/** The "Profile" settings tab — role and (for athletes) sport demographics. */
export function ProfileTab() {
  const { user } = useAuth();
  const isAthlete = (user?.roles ?? []).some((r) => r.role === "athlete");

  return (
    <div className="space-y-5">
      <RoleSection />
      {isAthlete && <AthleteProfileSection />}
    </div>
  );
}
