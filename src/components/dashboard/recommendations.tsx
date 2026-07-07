"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";

const getRecommendations = (store: ReturnType<typeof useStore.getState>) => {
  const recs: { text: string; href: string }[] = [];
  if (!store.project) recs.push({ text: "Complete onboarding to set up your workspace", href: "/onboarding" });
  if (!store.marketResearch) recs.push({ text: "Run market research to understand your opportunity", href: "/research" });
  if (!store.validationResult) recs.push({ text: "Validate your idea with AI-powered scoring", href: "/validation" });
  if (store.competitors.length === 0) recs.push({ text: "Analyze competitors to find market gaps", href: "/competitors" });
  if (store.personas.length === 0) recs.push({ text: "Define your customer personas for better targeting", href: "/audience" });
  if (!store.mvpPlan) recs.push({ text: "Plan your MVP with prioritized features", href: "/mvp" });
  if (!store.marketingPlan) recs.push({ text: "Create a marketing plan for your launch", href: "/marketing" });
  return recs.slice(0, 5);
};

export function Recommendations() {
  const store = useStore();
  const recommendations = getRecommendations(store);

  return (
    <Card className="border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center gap-2 text-[13px] font-medium text-white/55">
          <Lightbulb size={13} className="text-amber-400/40" />
          Next Steps
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {recommendations.length === 0 ? (
          <p className="text-[13px] text-white/25">You're all caught up!</p>
        ) : (
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <Link
                key={i}
                href={rec.href}
                className="group flex items-start gap-2 text-[13px] text-white/30 transition-colors hover:text-white/50"
              >
                <ArrowRight
                  size={12}
                  className="mt-0.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                />
                <span>{rec.text}</span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
