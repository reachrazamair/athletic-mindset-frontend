"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

interface FieldHintProps {
  /** Current field value — drives visibility and re-triggers on change. */
  value: string;
  /** Is the field currently valid? Controls red vs green + the icon. */
  valid: boolean;
  /** Message to show while invalid. */
  invalidText: string;
  /** Message to show once valid (auto-hides after a moment). */
  validText: string;
  /** How long the green confirmation stays before fading out (ms). */
  autoHideMs?: number;
}

/**
 * A small inline hint under an input.
 *
 * - While invalid (and the user has typed), shows a red warning that stays put.
 * - Once valid, shows a green tick, then quietly fades out after a couple of
 *   seconds. It reappears if the field is edited again.
 */
export function FieldHint({ value, valid, invalidText, validText, autoHideMs = 2500 }: FieldHintProps) {
  // Remembers the value for which the green hint has already been auto-hidden,
  // so editing the field (changing the value) brings the green tick back.
  const [dismissedValue, setDismissedValue] = useState<string | null>(null);

  useEffect(() => {
    // Only the green (valid) hint auto-hides. Nothing to do otherwise.
    if (!valid || value.length === 0) return;
    if (dismissedValue === value) return;

    const timer = setTimeout(() => setDismissedValue(value), autoHideMs);
    return () => clearTimeout(timer);
  }, [value, valid, dismissedValue, autoHideMs]);

  const greenDismissed = valid && dismissedValue === value;
  const visible = value.length > 0 && !greenDismissed;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {visible && (
        <motion.p
          key={valid ? "valid" : "invalid"}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className={`mt-1.5 flex items-center gap-1.5 text-xs ${
            valid ? "text-green-400" : "text-red-400"
          }`}
        >
          {valid ? <Check size={13} /> : <AlertCircle size={13} />}
          {valid ? validText : invalidText}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
