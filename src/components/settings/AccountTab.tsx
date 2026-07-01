"use client";

import { ProfileSection } from "@/components/settings/sections/ProfileSection";
import { EmailSection } from "@/components/settings/sections/EmailSection";
import { PasswordSection } from "@/components/settings/sections/PasswordSection";

/** The "Account" settings tab — name, email, and password. */
export function AccountTab() {
  return (
    <div className="space-y-5">
      <ProfileSection />
      <EmailSection />
      <PasswordSection />
    </div>
  );
}
