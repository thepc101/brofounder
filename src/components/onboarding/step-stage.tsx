"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/lib/utils";
import type { StartupStage } from "@/types";

const stages: { value: StartupStage; label: string; description: string }[] = [
  { value: "idea", label: "Just an idea", description: "You have a concept but haven't started building" },
  { value: "validating", label: "Validating", description: "Talking to customers and testing assumptions" },
  { value: "building-mvp", label: "Building MVP", description: "Actively building the first version" },
  { value: "growing", label: "Growing", description: "You have users and are scaling" },
  { value: "scaling", label: "Scaling", description: "Established product with significant traction" },
];

export function StepStage() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 2
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        Which stage are you in?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        This helps us tailor the experience to where you are right now.
      </p>
      <div className="space-y-3">
        {stages.map((stage) => (
          <button
            key={stage.value}
            onClick={() => updateField("stage", stage.value)}
            className={cn(
              "w-full rounded-lg border border-border p-4 text-left transition-all",
              onboardingData.stage === stage.value
                ? "border-foreground bg-accent"
                : "hover:border-muted-foreground/30"
            )}
          >
            <div className="font-medium">{stage.label}</div>
            <div className="mt-1 text-sm text-muted-foreground">{stage.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
