"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Input } from "@/components/ui/input";

export function StepIndustry() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 5
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        What industry are you in?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        This helps us provide industry-specific insights and benchmarks.
      </p>
      <Input
        placeholder="e.g., SaaS, Fintech, Healthtech, Edtech, Ecommerce..."
        value={onboardingData.industry}
        onChange={(e) => updateField("industry", e.target.value)}
        autoFocus
        className="text-base"
      />
    </div>
  );
}
