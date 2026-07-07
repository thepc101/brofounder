"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Textarea } from "@/components/ui/textarea";

export function StepProblem() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 3
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        What problem are you solving?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Be specific. Who experiences this problem and why is it worth solving?
      </p>
      <Textarea
        placeholder="e.g., Remote teams struggle to stay aligned across time zones. Async communication tools are either too noisy or too slow, causing missed updates and duplicate work."
        className="min-h-[180px] resize-y text-base"
        value={onboardingData.problem}
        onChange={(e) => updateField("problem", e.target.value)}
        autoFocus
      />
    </div>
  );
}
