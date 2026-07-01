"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthTransition } from "@/components/auth/AuthTransition";
import { ProfileFormFields, profileToDraft, type ProfileDraft } from "@/components/profile/ProfileFormFields";
import { updateAthleteProfile, type AthleteProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

function OnboardingForm({ initialProfile }: { initialProfile: AthleteProfile | null }) {
  const router = useRouter();
  const { refresh } = useAuth();
  const [draft, setDraft] = useState<ProfileDraft>(() => profileToDraft(initialProfile));
  const [saving, setSaving] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Core fields we ask everyone to complete before continuing.
  const canSubmit =
    draft.birth_date.length > 0 &&
    draft.primary_sport.length > 0 &&
    draft.competition_level.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError(null);
    setSaving(true);

    const payload = Object.fromEntries(Object.entries(draft).filter(([, v]) => v !== ""));
    const result = await updateAthleteProfile(payload);

    if (result.error) {
      setError(result.error);
      setSaving(false);
      return;
    }

    await refresh();
    setShowTransition(true);
    setTimeout(() => router.push("/"), 2400);
  };

  return (
    <>
      <AuthTransition show={showTransition} message="Personalizing your experience..." />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-7">
          <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-1.5">
            Tell us about your game
          </h1>
          <p className="text-sm text-text-muted">
            This helps us benchmark your results and personalize your reports. Kept private, never shared.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <ProfileFormFields draft={draft} onChange={setDraft} disabled={saving} />

        <motion.button
          type="submit"
          disabled={!canSubmit || saving}
          className="mt-7 w-full group flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          whileTap={{ scale: 0.98 }}
        >
          {saving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              Continue
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-3 w-full text-center text-xs text-text-muted hover:text-text-secondary transition-colors"
        >
          Skip for now
        </button>
      </motion.form>
    </>
  );
}

export default function ProfileOnboardingPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Require a logged-in user.
  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  return (
    <AuthLayout>
      {isLoading || !user ? (
        <Loader2 size={22} className="animate-spin text-text-muted" />
      ) : (
        <OnboardingForm initialProfile={user.athlete_profile} />
      )}
    </AuthLayout>
  );
}
