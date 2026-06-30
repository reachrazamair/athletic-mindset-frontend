"use client";

import { Trophy, Users, GraduationCap, ShieldCheck, UserCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { SettingsCard } from "@/components/settings/SettingsCard";

// Icon + label per role.
const ROLE_META: Record<string, { label: string; icon: typeof Trophy }> = {
  athlete: { label: "Athlete", icon: Trophy },
  parent: { label: "Parent", icon: Users },
  coach: { label: "Coach", icon: GraduationCap },
  admin: { label: "Admin", icon: ShieldCheck },
};

export function RoleSection() {
  const { user } = useAuth();
  const roles = user?.roles ?? [];

  return (
    <SettingsCard title="Role" description="How you use Athletic Mindset.">
      {roles.length === 0 ? (
        <p className="text-sm text-text-muted">No role selected yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {roles.map((r) => {
            const meta = ROLE_META[r.role] ?? { label: r.role, icon: UserCircle };
            const Icon = meta.icon;
            return (
              <span
                key={r.role}
                className="flex items-center gap-2 rounded-xl border border-border/50 bg-surface-card/50 px-4 py-2.5 text-sm font-medium text-text-primary"
              >
                <Icon size={16} className="text-primary-light" />
                {meta.label}
              </span>
            );
          })}
        </div>
      )}
      <p className="mt-3 text-xs text-text-muted">Role changes aren&apos;t available yet.</p>
    </SettingsCard>
  );
}
