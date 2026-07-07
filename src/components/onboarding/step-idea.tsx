"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Textarea } from "@/components/ui/textarea";

export function StepIdea() {
  const { onboardingData, updateField } = useOnboarding();

  return (
    <div className="animate-fade-in">
      <div className="mb-2 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        Step 1
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        What's your startup idea?
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Describe your idea in as much detail as you can. The more context you give, the better your AI co-founder can help.
      </p>
      <div className="space-y-4">
        <Textarea
          placeholder="e.g., A platform that helps remote teams manage async communication and stay aligned across time zones..."
          className="min-h-[200px] resize-y text-base"
          value={onboardingData.idea}
          onChange={(e) => updateField("idea", e.target.value)}
          autoFocus
        />
        <div className="flex gap-2">
          {[
            "AI-powered expense tracking for freelancers",
            "Marketplace for local artisan goods",
            "SaaS for restaurant inventory management",
          ].map((example) => (
            <button
              key={example}
              onClick={() => updateField("idea", example)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
