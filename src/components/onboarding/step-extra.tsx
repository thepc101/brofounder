"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Textarea } from "@/components/ui/textarea";

export function StepExtra() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 12
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        Anything else we should know?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Optional. Share any additional context, specific questions, or areas where you'd like extra help.
      </p>
      <Textarea
        placeholder="e.g., I'm bootstrapped and need to launch within 3 months. I'm particularly interested in your pricing strategy and go-to-market planning."
        className="min-h-[180px] resize-y text-base"
        value={onboardingData.extra}
        onChange={(e) => updateField("extra", e.target.value)}
        autoFocus
      />
    </div>
  );
}
