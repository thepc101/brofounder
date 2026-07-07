"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Textarea } from "@/components/ui/textarea";

export function StepChallenge() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 10
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        What's your biggest challenge right now?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Be honest — this helps us prioritize what to work on first.
      </p>
      <Textarea
        placeholder="e.g., I'm not sure if there's real demand for my idea, and I need to validate before spending months building."
        className="min-h-[150px] resize-y text-base"
        value={onboardingData.challenge}
        onChange={(e) => updateField("challenge", e.target.value)}
        autoFocus
      />
    </div>
  );
}
