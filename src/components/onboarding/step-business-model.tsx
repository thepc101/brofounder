"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { cn } from "@/lib/utils";
import type { BusinessModel } from "@/types";

const models: { value: BusinessModel; label: string; icon: string }[] = [
  { value: "saas", label: "SaaS", icon: "☁️" },
  { value: "marketplace", label: "Marketplace", icon: "🔄" },
  { value: "ecommerce", label: "Ecommerce", icon: "🛒" },
  { value: "ai", label: "AI", icon: "🤖" },
  { value: "agency", label: "Agency", icon: "🏢" },
  { value: "consumer", label: "Consumer", icon: "👤" },
  { value: "other", label: "Other", icon: "📦" },
];

export function StepBusinessModel() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 6
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        What's your business model?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Select the model that best describes how you'll generate revenue.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {models.map((model) => (
          <button
            key={model.value}
            onClick={() => updateField("businessModel", model.value)}
            className={cn(
              "rounded-lg border border-border p-4 text-center transition-all",
              onboardingData.businessModel === model.value
                ? "border-foreground bg-accent"
                : "hover:border-muted-foreground/30"
            )}
          >
            <div className="mb-1 text-xl">{model.icon}</div>
            <div className="text-sm font-medium">{model.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
