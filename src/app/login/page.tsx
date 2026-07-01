"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthTransition } from "@/components/auth/AuthTransition";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

function LoginInner() {
  const router = useRouter();
  const { login: setSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Notice shown when the user was redirected here by an expired session.
  const expired = useSearchParams().get("expired") === "1";

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    const result = await login(email, password);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    if (result.data) {
      // Store token + sync app-wide auth state
      setSession(result.data.access_token, result.data.user);

      const user = result.data.user;

      // Unverified users go straight to the verify screen — no transition needed.
      if (!user.is_verified) {
        router.push("/verify-email");
        return;
      }

      // Show cinematic transition
      setShowTransition(true);

      // Route based on roles + onboarding state
      const roles = user.roles.map((r) => r.role);
      const isAthlete = roles.includes("athlete");
      const hasProfile = Boolean(user.athlete_profile?.primary_sport);

      setTimeout(() => {
        if (roles.length === 0) {
          // No role yet — send to role selection
          router.push("/signup/role");
        } else if (isAthlete && !hasProfile) {
          // Athlete hasn't completed demographic onboarding yet
          router.push("/signup/profile");
        } else {
          // Has roles — go home for now (dashboards come later)
          router.push("/");
        }
      }, 2500);
    }
  };

  return (
    <>
      <AuthTransition show={showTransition} message="Welcome back..." />
      <AuthLayout>
        {expired && (
          <div className="w-full max-w-sm mb-5 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3">
            <p className="text-sm text-amber-300">Your session expired. Please sign in again.</p>
          </div>
        )}
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </AuthLayout>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
