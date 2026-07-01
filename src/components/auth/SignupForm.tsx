"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { FieldHint } from "@/components/common/FieldHint";
import { isValidEmail, isValidPassword, MIN_PASSWORD_LENGTH } from "@/lib/validation";

interface SignupFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function SignupForm({ onSubmit, isLoading, error }: SignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const emailValid = isValidEmail(email);
  const passwordValid = isValidPassword(password);
  const confirmValid = confirmPassword.length > 0 && confirmPassword === password;
  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    emailValid &&
    passwordValid &&
    confirmValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!canSubmit) return;
    await onSubmit({ firstName, lastName, email, password });
  };

  const displayError = localError || error;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-sm space-y-5"
    >
      {/* Error message */}
      {displayError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3"
        >
          <p className="text-sm text-red-400">{displayError}</p>
        </motion.div>
      )}

      {/* Name */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-text-secondary mb-2">
            First name
          </label>
          <input
            id="first-name"
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-xl border border-border/50 bg-surface-card/50 px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            placeholder="Jordan"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-text-secondary mb-2">
            Last name
          </label>
          <input
            id="last-name"
            type="text"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-xl border border-border/50 bg-surface-card/50 px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            placeholder="Lee"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-text-secondary mb-2">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-border/50 bg-surface-card/50 px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          placeholder="you@email.com"
          disabled={isLoading}
        />
        <FieldHint
          value={email}
          valid={emailValid}
          invalidText="Enter a valid email address"
          validText="Looks good"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-text-secondary mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border/50 bg-surface-card/50 px-4 py-3.5 pr-11 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            placeholder="Min 8 characters"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <FieldHint
          value={password}
          valid={passwordValid}
          invalidText={`Must be at least ${MIN_PASSWORD_LENGTH} characters`}
          validText="Password looks good"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-text-secondary mb-2">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type={showPassword ? "text" : "password"}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-border/50 bg-surface-card/50 px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          placeholder="••••••••"
          disabled={isLoading}
        />
        <FieldHint
          value={confirmPassword}
          valid={confirmValid}
          invalidText="Passwords don't match"
          validText="Passwords match"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isLoading || !canSubmit}
        className="w-full group flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-light transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            Create Account
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      {/* Login link */}
      <p className="text-center text-sm text-text-muted pt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-light hover:text-white transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </motion.form>
  );
}
