"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthTransition } from "@/components/auth/AuthTransition";
import { login } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login: setSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      // Show cinematic transition
      setShowTransition(true);

      // Route based on roles
      const roles = result.data.user.roles.map((r) => r.role);

      setTimeout(() => {
        if (roles.length === 0) {
          // No role yet — send to role selection
          router.push("/signup/role");
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
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </AuthLayout>
    </>
  );
}
