"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/lib/utils";
import type { TeamSize } from "@/types";

const teams: { value: TeamSize; label: string }[] = [
  { value: "solo", label: "Solo founder" },
  { value: "2-3", label: "2-3 people" },
  { value: "4-10", label: "4-10 people" },
  { value: "11-50", label: "11-50 people" },
  { value: "50+", label: "50+ people" },
];

export function StepTeam() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 8
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        What's your team size?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Including co-founders and any early employees.
      </p>
      <div className="space-y-3">
        {teams.map((team) => (
          <button
            key={team.value}
            onClick={() => updateField("team", team.value)}
            className={cn(
              "w-full rounded-lg border border-border p-4 text-left transition-all",
              onboardingData.team === team.value
                ? "border-foreground bg-accent"
                : "hover:border-muted-foreground/30"
            )}
          >
            <div className="font-medium">{team.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
