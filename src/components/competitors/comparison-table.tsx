"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  "Real-time messaging",
  "Async communication",
  "Channel organization",
  "File sharing",
  "Video calls",
  "API/Integrations",
  "Search",
  "Team management",
];

const featureMatrix: Record<string, (string | boolean)[]> = {
  Slack: [true, false, true, true, true, true, true, true],
  Notion: [false, true, true, true, false, true, true, true],
  Linear: [false, true, false, false, false, true, false, true],
};

export function ComparisonTable() {
  const competitors = useStore((s) => s.competitors);

  if (competitors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">No competitors analyzed yet.</p>
        <p className="text-xs text-muted-foreground mt-1">Run research first to see competitor comparisons.</p>
      </div>
    );
  }

  const matrix = competitors.reduce((acc, c) => {
    acc[c.name] = features.map(() => Math.random() > 0.3);
    return acc;
  }, {} as Record<string, boolean[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Feature Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Feature</th>
                {competitors.map((c) => (
                  <th key={c.name} className="text-center py-2 px-3 text-xs font-medium text-muted-foreground">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={feature} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 text-sm">{feature}</td>
                  {competitors.map((c) => {
                    const has = matrix[c.name]?.[i];
                    return (
                      <td key={c.name} className="text-center py-2.5 px-3">
                        {has ? (
                          <Check size={16} className="mx-auto text-green-500" />
                        ) : (
                          <X size={16} className="mx-auto text-muted-foreground/40" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
