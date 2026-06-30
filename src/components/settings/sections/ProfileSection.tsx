"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { updateProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { SettingsCard } from "@/components/settings/SettingsCard";

const inputClass =
  "w-full rounded-xl border border-border/50 bg-surface-card/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

export function ProfileSection() {
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.last_name ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmedFirst = firstName.trim();
  const trimmedLast = lastName.trim();
  const valid = trimmedFirst.length > 0 && trimmedLast.length > 0;
  const dirty = trimmedFirst !== (user?.first_name ?? "") || trimmedLast !== (user?.last_name ?? "");

  const handleSave = async () => {
    setError(null);
    setSaved(false);
    setSaving(true);

    const result = await updateProfile(trimmedFirst, trimmedLast);
    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.data) {
      updateUser(result.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <SettingsCard title="Profile" description="Your name as it appears across Athletic Mindset.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="set-first" className="block text-sm font-medium text-text-secondary mb-2">
            First name
          </label>
          <input
            id="set-first"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            disabled={saving}
          />
        </div>
        <div>
          <label htmlFor="set-last" className="block text-sm font-medium text-text-secondary mb-2">
            Last name
          </label>
          <input
            id="set-last"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
            disabled={saving}
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!valid || !dirty || saving}
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
