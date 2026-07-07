"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/lib/utils";
import type { ExperienceLevel } from "@/types";

const levels: { value: ExperienceLevel; label: string; description: string }[] = [
  { value: "first-time", label: "First-time founder", description: "This is your first startup" },
  { value: "some-experience", label: "Some experience", description: "You've worked at or started a company before" },
  { value: "experienced", label: "Experienced", description: "Multiple ventures under your belt" },
  { value: "serial-entrepreneur", label: "Serial entrepreneur", description: "You've built and exited companies" },
];

export function StepExperience() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 9
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        What's your experience level?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        This helps us adjust the level of guidance and detail.
      </p>
      <div className="space-y-3">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => updateField("experience", level.value)}
            className={cn(
              "w-full rounded-lg border border-border p-4 text-left transition-all",
              onboardingData.experience === level.value
                ? "border-foreground bg-accent"
                : "hover:border-muted-foreground/30"
            )}
          >
            <div className="font-medium">{level.label}</div>
            <div className="mt-1 text-sm text-muted-foreground">{level.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
