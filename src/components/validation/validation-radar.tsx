"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreCard } from "./score-card";

export function ValidationRadar() {
  const validation = useStore((s) => s.validationResult);

  if (!validation) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">No validation data yet.</p>
        <p className="text-xs text-muted-foreground mt-1">Ask your AI co-founder to validate your idea.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        <ScoreCard label="Idea Score" score={validation.ideaScore} />
        <ScoreCard label="Demand" score={validation.demandScore} />
        <ScoreCard label="Execution" score={validation.executionDifficulty} />
        <ScoreCard label="Revenue" score={validation.revenuePotential} />
        <ScoreCard label="Competition" score={validation.competitionLevel} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">AI Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">AI Confidence: {validation.aiConfidence}%</p>
            <div className="h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-1000"
                style={{ width: `${validation.aiConfidence}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Strengths</p>
              <ul className="space-y-1">
                {validation.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Weaknesses</p>
              <ul className="space-y-1">
                {validation.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {w}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Recommendations</p>
            <ul className="space-y-1">
              {validation.recommendations.map((r, i) => (
                <li key={i} className="text-sm text-muted-foreground">• {r}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
