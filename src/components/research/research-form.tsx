"use client";

import { useState } from "react";
import { Search, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { generateId } from "@/lib/utils";
import { toast } from "sonner";

export function ResearchForm() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    setMarketResearch,
    setCompetitors,
    setSwot,
    setPorterFiveForces,
    addActivity,
  } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      // Simulate API call with realistic data
      await new Promise((r) => setTimeout(r, 2000));

      setMarketResearch({
        tam: "$50B",
        sam: "$12B",
        som: "$850M",
        trends: [
          "Remote work adoption accelerating",
          "AI-powered tools becoming standard",
          "Asynchronous communication preferred",
          "Integration-first platforms winning",
        ],
        painPoints: [
          "Information overload from multiple tools",
          "Time zone coordination challenges",
          "Loss of context in async communication",
          "Difficulty maintaining team culture remote",
        ],
        searchIntent: "High — 45K monthly searches for 'async communication tools'",
        buyingBehavior: "Mid-market and enterprise teams are actively evaluating solutions. 60% prefer integrated platforms over point solutions.",
      });

      setCompetitors([
        {
          name: "Slack",
          description: "Leading team communication platform with channels, direct messaging, and integrations.",
          strengths: ["Massive user base", "Rich integrations", "Brand recognition"],
          weaknesses: ["Can be noisy", "Expensive at scale", "Limited async features"],
          pricing: "$8-$15/user/month",
        },
        {
          name: "Notion",
          description: "All-in-one workspace for docs, wikis, and project management.",
          strengths: ["Flexible", "Great for docs", "Strong API"],
          weaknesses: ["Not real-time comms", "Limited notifications", "Slow at scale"],
          pricing: "$10-$18/user/month",
        },
        {
          name: "Linear",
          description: "Issue tracking and project management for product teams.",
          strengths: ["Fast and polished", "Developer-friendly", "Clean UX"],
          weaknesses: ["Not general communication", "Limited integrations", "Team-only focus"],
          pricing: "$8-$12/user/month",
        },
      ]);

      setSwot({
        strengths: ["Strong product-market fit", "Experienced team", "Modern tech stack"],
        weaknesses: ["Brand new entrant", "Limited resources", "No existing user base"],
        opportunities: ["Remote work trend accelerating", "Companies consolidating tools", "AI features as differentiator"],
        threats: ["Well-funded competitors", "Market saturation", "Platform risk from big tech"],
      });

      setPorterFiveForces({
        threatOfNewEntrants: "Medium — Low barriers to entry but high bar for quality",
        bargainingPowerOfBuyers: "High — Many alternatives available, low switching costs",
        bargainingPowerOfSuppliers: "Low — Cloud infrastructure is commoditized",
        threatOfSubstitutes: "Medium — Email, video calls, and in-person meetings",
        rivalryIntensity: "High — Multiple well-funded competitors in the space",
      });

      addActivity({
        id: generateId(),
        type: "research",
        title: "Market research completed",
        description: `Researched: ${query}`,
        timestamp: new Date().toISOString(),
      });

      toast.success("Research complete");
    } catch (error) {
      toast.error("Research failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="e.g., AI-powered async communication tools for remote teams"
            className="pl-9 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading || !query.trim()} className="gap-2">
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Research
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          "AI in healthcare",
          "Fintech trends 2024",
          "Remote work tools",
          "SaaS pricing models",
          "Creator economy",
        ].map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setQuery(example)}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            {example}
          </button>
        ))}
      </div>
    </form>
  );
}
