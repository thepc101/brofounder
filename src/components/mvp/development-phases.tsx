"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DevelopmentPhases() {
  const mvpPlan = useStore((s) => s.mvpPlan);

  if (!mvpPlan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Development Phases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mvpPlan.phases.map((phase, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{phase.name}</span>
                <Badge variant="secondary" className="text-xs">{phase.duration}</Badge>
              </div>
              <div className="mb-2">
                <p className="text-xs text-muted-foreground mb-1">Tasks</p>
                <ul className="space-y-0.5">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="text-sm text-muted-foreground">• {task}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Deliverables</p>
                <ul className="space-y-0.5">
                  {phase.deliverables.map((d, j) => (
                    <li key={j} className="text-sm text-muted-foreground">• {d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
