"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { updateAthleteProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { ProfileFormFields, profileToDraft, type ProfileDraft } from "@/components/profile/ProfileFormFields";

export function AthleteProfileSection() {
  const { user, refresh } = useAuth();
  const [draft, setDraft] = useState<ProfileDraft>(profileToDraft(user?.athlete_profile));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const original = profileToDraft(user?.athlete_profile);
  const dirty = JSON.stringify(draft) !== JSON.stringify(original);

  const handleSave = async () => {
    setError(null);
    setSaved(false);
    setSaving(true);

    // Send every field (empty string clears it → null).
    const payload = Object.fromEntries(
      Object.entries(draft).map(([k, v]) => [k, v === "" ? null : v]),
    );
    const result = await updateAthleteProfile(payload);
    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    await refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SettingsCard
      title="Athlete Profile"
      description="Your sport details, used for benchmarking and personalized reports."
    >
      <ProfileFormFields draft={draft} onChange={setDraft} disabled={saving} />

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!dirty || saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : null}
          Save changes
        </button>

        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-sm text-green-400"
            >
              <Check size={15} /> Saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </SettingsCard>
  );
}
