"use client";

import { motion } from "framer-motion";

interface SettingsCardProps {
  title: string;
  description?: string;
  /** Optional element rendered top-right (e.g. a status badge). */
  action?: React.ReactNode;
  children: React.ReactNode;
}

/** Consistent card shell for every settings section. */
export function SettingsCard({ title, description, action, children }: SettingsCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-border/50 bg-surface-card/40 p-6"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  );
}
