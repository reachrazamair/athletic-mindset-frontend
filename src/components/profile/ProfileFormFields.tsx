"use client";

import type { AthleteProfile } from "@/lib/api";
import {
  SPORTS,
  COMPETITION_LEVELS,
  SEX_OPTIONS,
  ETHNICITY_OPTIONS,
  getPositions,
} from "@/lib/sports";
import { SelectField } from "@/components/common/SelectField";

export type ProfileDraft = {
  birth_date: string;
  sex: string;
  ethnicity: string;
  primary_sport: string;
  competition_level: string;
  position: string;
};

/** Turn an API profile (nullable fields) into a form-friendly draft. */
export function profileToDraft(profile: AthleteProfile | null | undefined): ProfileDraft {
  return {
    birth_date: profile?.birth_date ?? "",
    sex: profile?.sex ?? "",
    ethnicity: profile?.ethnicity ?? "",
    primary_sport: profile?.primary_sport ?? "",
    competition_level: profile?.competition_level ?? "",
    position: profile?.position ?? "",
  };
}

interface ProfileFormFieldsProps {
  draft: ProfileDraft;
  onChange: (next: ProfileDraft) => void;
  disabled?: boolean;
}

/** The demographic + sport fields, shared by onboarding and settings. */
export function ProfileFormFields({ draft, onChange, disabled }: ProfileFormFieldsProps) {
  const set = (patch: Partial<ProfileDraft>) => onChange({ ...draft, ...patch });

  const positions = getPositions(draft.primary_sport);
  const positionsDisabled =
    !draft.primary_sport || (positions.length === 1 && positions[0] === "Not Applicable");

  return (
    <div className="space-y-4">
      {/* Birth date — native date input gives the best cross-device picker */}
      <div>
        <label htmlFor="birth_date" className="block text-sm font-medium text-text-secondary mb-2">
          Birth date
        </label>
        <input
          id="birth_date"
          type="date"
          value={draft.birth_date}
          disabled={disabled}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => set({ birth_date: e.target.value })}
          className="w-full rounded-xl border border-border/50 bg-surface-card/60 px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all [color-scheme:dark]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          id="sex"
          label="Sex"
          value={draft.sex}
          onChange={(v) => set({ sex: v })}
          options={SEX_OPTIONS}
          disabled={disabled}
        />
        <SelectField
          id="ethnicity"
          label="Ethnicity"
          value={draft.ethnicity}
          onChange={(v) => set({ ethnicity: v })}
          options={ETHNICITY_OPTIONS}
          disabled={disabled}
        />
      </div>

      <SelectField
        id="primary_sport"
        label="Primary sport"
        value={draft.primary_sport}
        // Changing sport resets position (options differ per sport).
        onChange={(v) => set({ primary_sport: v, position: "" })}
        options={SPORTS}
        disabled={disabled}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          id="competition_level"
          label="Competition level"
          value={draft.competition_level}
          onChange={(v) => set({ competition_level: v })}
          options={COMPETITION_LEVELS}
          disabled={disabled}
        />
        <SelectField
          id="position"
          label="Position"
          value={draft.position}
          onChange={(v) => set({ position: v })}
          options={positions}
          placeholder={draft.primary_sport ? "Select one" : "Choose a sport first"}
          disabled={disabled || positionsDisabled}
        />
      </div>
    </div>
  );
}
