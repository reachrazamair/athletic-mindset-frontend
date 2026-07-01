"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RoleSelection } from "@/components/auth/RoleSelection";
import { AuthTransition } from "@/components/auth/AuthTransition";
import { setRole } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function RoleSelectionPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleRoleSelect = async (role: string) => {
    setIsLoading(true);

    const result = await setRole(role);

    if (result.error) {
      setIsLoading(false);
      return;
    }

    if (result.data) {
      // Sync app-wide auth state with the new role
      await refresh();

      // Show cinematic transition
      setShowTransition(true);

      setTimeout(() => {
        // Athletes continue to demographic onboarding; others go home.
        if (role === "athlete") {
          router.push("/signup/profile");
        } else {
          router.push("/");
        }
      }, 2500);
    }
  };

  return (
    <>
      <AuthTransition show={showTransition} message="Building your experience..." />
      <AuthLayout>
        <RoleSelection onSelect={handleRoleSelect} isLoading={isLoading} />
      </AuthLayout>
    </>
  );
}
