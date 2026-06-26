"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RoleSelection } from "@/components/auth/RoleSelection";
import { AuthTransition } from "@/components/auth/AuthTransition";
import { setRole } from "@/lib/api";

export default function RoleSelectionPage() {
  const router = useRouter();
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
      // Update stored user with new role
      localStorage.setItem("user", JSON.stringify(result.data));

      // Show cinematic transition
      setShowTransition(true);

      setTimeout(() => {
        router.push("/");
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
