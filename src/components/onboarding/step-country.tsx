"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Input } from "@/components/ui/input";

export function StepCountry() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 7
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        Where are you based?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Your location helps us provide relevant market insights and regulatory context.
      </p>
      <Input
        placeholder="e.g., United States, United Kingdom, Germany, India..."
        value={onboardingData.country}
        onChange={(e) => updateField("country", e.target.value)}
        autoFocus
        className="text-base"
      />
    </div>
  );
}
