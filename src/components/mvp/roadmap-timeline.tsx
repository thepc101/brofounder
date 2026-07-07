"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RoadmapTimeline() {
  const mvpPlan = useStore((s) => s.mvpPlan);

  if (!mvpPlan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mvpPlan.roadmap.map((phase, i) => (
            <div key={i} className="relative pl-6 before:absolute before:left-[7px] before:top-2 before:h-full before:w-[1px] before:bg-border before:last:hidden">
              <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-foreground bg-background" />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">{phase.phase}</span>
                <Badge variant="secondary" className="text-xs">{phase.duration}</Badge>
              </div>
              <ul className="space-y-1">
                {phase.tasks.map((task, j) => (
                  <li key={j} className="text-sm text-muted-foreground">• {task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
