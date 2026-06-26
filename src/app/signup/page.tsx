"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { register } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    const result = await register(email, password);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    if (result.data) {
      // Store token
      localStorage.setItem("token", result.data.access_token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      // Go to role selection
      router.push("/signup/role");
    }
  };

  return (
    <AuthLayout>
      <SignupForm onSubmit={handleSignup} isLoading={isLoading} error={error} />
    </AuthLayout>
  );
}
