"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { changePassword } from "@/lib/api";
import { FieldHint } from "@/components/auth/FieldHint";
import { isValidPassword, MIN_PASSWORD_LENGTH } from "@/lib/validation";
import { SettingsCard } from "@/components/settings/SettingsCard";

const inputClass =
  "w-full rounded-xl border border-border/50 bg-surface-card/50 px-4 py-3 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

export function PasswordSection() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextValid = isValidPassword(next);
  const confirmValid = confirm.length > 0 && confirm === next;
  const canSubmit = current.length > 0 && nextValid && confirmValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError(null);
    setSaved(false);
    setSaving(true);

    const result = await changePassword(current, next);
    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSaved(true);
    setCurrent("");
    setNext("");
    setConfirm("");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SettingsCard title="Password" description="Change the password you use to sign in.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="current-pw" className="block text-sm font-medium text-text-secondary mb-2">
            Current password
          </label>
          <div className="relative">
            <input
              id="current-pw"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
              disabled={saving}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="new-pw" className="block text-sm font-medium text-text-secondary mb-2">
            New password
          </label>
          <input
            id="new-pw"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            className={inputClass.replace(" pr-11", "")}
            placeholder="Min 8 characters"
            disabled={saving}
          />
          <FieldHint
            value={next}
            valid={nextValid}
            invalidText={`Must be at least ${MIN_PASSWORD_LENGTH} characters`}
            validText="Password looks good"
          />
        </div>

        <div>
          <label htmlFor="confirm-pw" className="block text-sm font-medium text-text-secondary mb-2">
            Confirm new password
          </label>
          <input
            id="confirm-pw"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputClass.replace(" pr-11", "")}
            placeholder="••••••••"
            disabled={saving}
          />
          <FieldHint
            value={confirm}
            valid={confirmValid}
            invalidText="Passwords don't match"
            validText="Passwords match"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={!canSubmit || saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : null}
            Update password
          </button>

          <AnimatePresence>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-sm text-green-400"
              >
                <Check size={15} /> Updated
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </form>
    </SettingsCard>
  );
}
