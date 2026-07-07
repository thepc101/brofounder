"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const milestones = [
  { key: "workspace", label: "Workspace Created" },
  { key: "research", label: "Market Research" },
  { key: "validation", label: "Idea Validation" },
  { key: "competitors", label: "Competitor Analysis" },
  { key: "personas", label: "Customer Personas" },
  { key: "mvp", label: "MVP Planning" },
  { key: "marketing", label: "Marketing Plan" },
  { key: "documents", label: "Documents" },
];

export function ProgressSection() {
  const store = useStore();
  const completedFlags = [
    !!store.project, !!store.marketResearch, !!store.validationResult,
    store.competitors.length > 0, store.personas.length > 0,
    !!store.mvpPlan, !!store.marketingPlan, store.documents.length > 0,
  ];
  const completedCount = completedFlags.filter(Boolean).length;
  const progress = Math.round((completedCount / 8) * 100);

  return (
    <Card className="border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-[13px] font-medium text-white/55">Progress</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex items-baseline gap-2">
          <span
            className="text-3xl font-normal tracking-tight text-white/75"
            style={{ fontFamily: "var(--font-display-face)" }}
          >
            {progress}%
          </span>
          <span className="text-[11px] text-white/20">complete</span>
        </div>
        <Progress value={progress} className="mt-2.5 h-1 bg-white/[0.04]" />
        <div className="mt-3 space-y-1.5">
          {milestones.map((m, i) => (
            <div key={m.key} className="flex items-center gap-2 text-[11px]">
              <div
                className="h-1 w-1 rounded-full transition-colors"
                style={{
                  backgroundColor: completedFlags[i]
                    ? "rgba(99, 140, 255, 0.5)"
                    : "rgba(255,255,255,0.08)",
                }}
              />
              <span className={completedFlags[i] ? "text-white/45" : "text-white/18"}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
