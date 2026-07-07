"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Textarea } from "@/components/ui/textarea";

export function StepCustomer() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 4
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        Who is your customer?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Describe your ideal customer. Demographics, role, company size, or any relevant details.
      </p>
      <Textarea
        placeholder="e.g., Engineering managers at mid-to-large tech companies with 50+ remote employees. They're responsible for team productivity and struggle with communication fragmentation."
        className="min-h-[150px] resize-y text-base"
        value={onboardingData.customer}
        onChange={(e) => updateField("customer", e.target.value)}
        autoFocus
      />
    </div>
  );
}
