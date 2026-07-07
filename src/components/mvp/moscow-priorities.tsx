"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  "must-have": "bg-red-500/10 text-red-500 border-red-500/20",
  "should-have": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "could-have": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "wont-have": "bg-muted text-muted-foreground border-border",
};

export function MoscowPriorities() {
  const mvpPlan = useStore((s) => s.mvpPlan);

  if (!mvpPlan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">MoSCoW Prioritization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mvpPlan.priorities.map((p, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  "rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                  categoryColors[p.category]
                )}>
                  {p.category.replace("-", " ")}
                </span>
              </div>
              <ul className="space-y-1">
                {p.features.map((f, j) => (
                  <li key={j} className="text-sm text-muted-foreground">• {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
