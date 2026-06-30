"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ShieldAlert, Loader2, RefreshCw, MailCheck } from "lucide-react";
import { resendVerification } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { SettingsCard } from "@/components/settings/SettingsCard";

export function EmailSection() {
  const { user, refresh } = useAuth();
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verified = user?.is_verified ?? false;

  // While unverified, quietly poll so the badge flips the moment they verify
  // (e.g. by clicking the link in another tab).
  useEffect(() => {
    if (verified) return;
    const id = setInterval(() => void refresh(), 5000);
    return () => clearInterval(id);
  }, [verified, refresh]);

  // Resend cooldown countdown.
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const handleResend = async () => {
    setError(null);
    setResending(true);
    const result = await resendVerification();
    setResending(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setSent(true);
    setCooldown(30);
  };

  const statusBadge = verified ? (
    <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
      <BadgeCheck size={14} /> Verified
    </span>
  ) : (
    <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
      <ShieldAlert size={14} /> Unverified
    </span>
  );

  return (
    <SettingsCard title="Email" description="The address you use to sign in." action={statusBadge}>
      <div className="rounded-xl border border-border/40 bg-surface-card/40 px-4 py-3 text-sm text-text-primary">
        {user?.email}
      </div>

      <AnimatePresence mode="wait">
        {verified ? (
          <motion.div
            key="verified"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2.5 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3"
          >
            <BadgeCheck size={18} className="text-green-400 shrink-0" />
            <p className="text-sm text-green-300">Your email is verified. You&apos;re all set.</p>
          </motion.div>
        ) : (
          <motion.div
            key="unverified"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-4"
          >
            <div className="flex items-start gap-2.5">
              <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-200">
                  Your email isn&apos;t verified yet. Verify it to secure your account and unlock
                  email notifications.
                </p>

                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                {sent && cooldown > 0 && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-green-400">
                    <MailCheck size={14} /> Sent! Check your inbox.
                  </p>
                )}

                <button
                  onClick={handleResend}
                  disabled={resending || cooldown > 0}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resending ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Verify email"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SettingsCard>
  );
}
