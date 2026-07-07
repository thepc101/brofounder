"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/lib/utils";
import type { FounderGoal } from "@/types";

const goals: { value: FounderGoal; label: string; description: string }[] = [
  { value: "generate-mvp", label: "Generate MVP", description: "Build the first version of your product" },
  { value: "validate", label: "Validate", description: "Test if your idea has real demand" },
  { value: "raise-funding", label: "Raise funding", description: "Prepare for your next round" },
  { value: "find-pmf", label: "Find PMF", description: "Achieve product-market fit" },
  { value: "launch", label: "Launch", description: "Take your product to market" },
  { value: "scale", label: "Scale", description: "Grow your existing business" },
];

export function StepGoals() {
  const { onboardingData, updateField } = useOnboarding();

  const toggleGoal = (value: FounderGoal) => {
    const current = onboardingData.goals;
    if (current.includes(value)) {
      updateField("goals", current.filter((g) => g !== value));
    } else {
      updateField("goals", [...current, value]);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 11
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        What are your goals?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Select all that apply. This helps us build the right plan for you.
      </p>
      <div className="space-y-3">
        {goals.map((goal) => {
          const selected = onboardingData.goals.includes(goal.value);
          return (
            <button
              key={goal.value}
              onClick={() => toggleGoal(goal.value)}
              className={cn(
                "w-full rounded-lg border border-border p-4 text-left transition-all",
                selected
                  ? "border-foreground bg-accent"
                  : "hover:border-muted-foreground/30"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{goal.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{goal.description}</div>
                </div>
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded border transition-all",
                    selected ? "border-foreground bg-foreground" : "border-border"
                  )}
                >
                  {selected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6l2.5 2.5 4.5-5" stroke="var(--background)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
