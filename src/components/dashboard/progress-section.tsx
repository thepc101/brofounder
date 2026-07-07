"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const milestones = [
  { key: "workspace", label: "Workspace Created", weight: 10 },
  { key: "research", label: "Market Research", weight: 15 },
  { key: "validation", label: "Idea Validation", weight: 15 },
  { key: "competitors", label: "Competitor Analysis", weight: 10 },
  { key: "personas", label: "Customer Personas", weight: 10 },
  { key: "mvp", label: "MVP Planning", weight: 15 },
  { key: "marketing", label: "Marketing Plan", weight: 10 },
  { key: "documents", label: "Documents", weight: 10 },
  { key: "launch", label: "Launch Ready", weight: 5 },
];

export function ProgressSection() {
  const store = useStore();

  const completedCount = [
    !!store.project,
    !!store.marketResearch,
    !!store.validationResult,
    store.competitors.length > 0,
    store.personas.length > 0,
    !!store.mvpPlan,
    !!store.marketingPlan,
    store.documents.length > 0,
  ].filter(Boolean).length;

  const progress = Math.round((completedCount / 8) * 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">{progress}%</span>
          <span className="text-sm text-muted-foreground">complete</span>
        </div>
        <Progress value={progress} className="mt-3 h-1.5" />
        <div className="mt-4 space-y-2">
          {milestones.slice(0, 5).map((m) => (
            <div key={m.key} className="flex items-center gap-2 text-xs">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: completedCount >= milestones.indexOf(m) + 1
                    ? "var(--foreground)"
                    : "var(--border)",
                }}
              />
              <span
                className={
                  completedCount >= milestones.indexOf(m) + 1
                    ? "text-foreground"
                    : "text-muted-foreground"
                }
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
