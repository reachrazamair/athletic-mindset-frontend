"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MailCheck, CheckCircle2, AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { verifyEmail, resendVerification, type User } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

/** Where to send a verified user next: onboarding if no role yet, else home. */
function destinationFor(user: User): string {
  return user.roles.length === 0 ? "/signup/role" : "/";
}

/**
 * Branch shown when the user opens the link from their email (?token=...).
 * Verifies the token, logs them in, and continues onboarding.
 */
function VerifyFromLink({ token }: { token: string }) {
  const router = useRouter();
  const { login } = useAuth();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    verifyEmail(token).then((res) => {
      if (!active) return;
      if (res.data) {
        login(res.data.access_token, res.data.user);
        setStatus("success");
        const dest = destinationFor(res.data.user);
        setTimeout(() => router.push(dest), 1800);
      } else {
        setErrorText(res.error ?? "Something went wrong.");
        setStatus("error");
      }
    });
    return () => {
      active = false;
    };
  }, [token, login, router]);

  if (status === "verifying") {
    return (
      <div className="w-full max-w-sm text-center">
        <Loader2 size={26} className="mx-auto mb-4 animate-spin text-primary-light" />
        <p className="text-sm text-text-muted">Verifying your email...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full max-w-sm text-center">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
          <AlertTriangle size={26} className="text-red-400" />
        </span>
        <h1 className="text-xl font-semibold text-text-primary mb-2">Verification failed</h1>
        <p className="text-sm text-text-muted">{errorText}</p>
        <Link
          href="/verify-email"
          className="mt-7 inline-block rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-all"
        >
          Get a new link
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm text-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.1 }}
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10"
      >
        <CheckCircle2 size={28} className="text-green-400" />
      </motion.span>
      <h1 className="text-xl font-semibold text-text-primary mb-2">Email verified</h1>
      <p className="text-sm text-text-muted flex items-center justify-center gap-2">
        <Loader2 size={14} className="animate-spin" />
        Setting up your experience...
      </p>
    </motion.div>
  );
}

/**
 * Branch shown right after signup (no token). Prompts the user to check their
 * inbox, lets them resend, and quietly polls so the screen advances on its own
 * once they verify (even from another device).
 */
function CheckEmailPrompt() {
  const router = useRouter();
  const { user, isLoading, refresh } = useAuth();
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendError, setResendError] = useState<string | null>(null);

  // Redirect away if there's nobody to verify, or they're already verified.
  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/signup");
      return;
    }
    if (user.is_verified) {
      router.replace(destinationFor(user));
    }
  }, [user, isLoading, router]);

  // Poll the backend so verifying elsewhere auto-advances this screen.
  useEffect(() => {
    if (!user || user.is_verified) return;
    const id = setInterval(() => void refresh(), 4000);
    return () => clearInterval(id);
  }, [user, refresh]);

  // Resend cooldown countdown.
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const handleResend = async () => {
    setResendError(null);
    setResending(true);
    const res = await resendVerification();
    setResending(false);
    if (res.error) {
      setResendError(res.error);
      return;
    }
    setResent(true);
    setCooldown(30);
  };

  // Transient state while the redirect effects decide where to go.
  if (isLoading || !user || user.is_verified) {
    return <Loader2 size={22} className="animate-spin text-text-muted" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm text-center"
    >
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
      >
        <MailCheck size={26} className="text-primary-light" />
      </motion.span>

      <h1 className="text-xl font-semibold text-text-primary mb-2 mt-8">Check your MailBox!</h1>
      <p className="text-sm text-text-muted">
        We sent a verification link to{" "}
        <span className="text-text-secondary font-medium">{user.email}</span>. Click it to confirm your
        account and continue.
      </p>

      <div className="mt-7 space-y-3">
        {resendError && <p className="text-sm text-red-400">{resendError}</p>}
        {resent && cooldown > 0 && (
          <p className="text-sm text-green-400 flex items-center justify-center gap-1.5">
            <CheckCircle2 size={14} /> Sent! Check your inbox.
          </p>
        )}

        <button
          onClick={handleResend}
          disabled={resending || cooldown > 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-surface-card/50 px-5 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resending ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <RefreshCw size={15} />
          )}
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
        </button>

        <p className="text-xs text-text-muted pt-1">
          Waiting for verification... this page updates automatically.
        </p>
      </div>
    </motion.div>
  );
}

function VerifyEmailInner() {
  const token = useSearchParams().get("token");
  return token ? <VerifyFromLink token={token} /> : <CheckEmailPrompt />;
}

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<Loader2 size={22} className="animate-spin text-text-muted" />}>
        <VerifyEmailInner />
      </Suspense>
    </AuthLayout>
  );
}
