"use client";

import { ProfileSection } from "@/components/settings/sections/ProfileSection";
import { EmailSection } from "@/components/settings/sections/EmailSection";
import { PasswordSection } from "@/components/settings/sections/PasswordSection";
import { RoleSection } from "@/components/settings/sections/RoleSection";

/** The "Account" settings tab — profile, email, password and role. */
export function AccountTab() {
  return (
    <div className="space-y-5">
      <ProfileSection />
      <EmailSection />
      <PasswordSection />
      <RoleSection />
    </div>
  );
}
