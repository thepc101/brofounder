"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ValidationScore() {
  const validation = useStore((s) => s.validationResult);
  const score = validation?.ideaScore ?? 0;
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="border-white/[0.06] bg-white/[0.02]">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-[13px] font-medium text-white/60">Validation Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-4 pb-4">
        <div className="relative flex items-center justify-center">
          <svg width="90" height="90" className="-rotate-90">
            <circle
              cx="45"
              cy="45"
              r="36"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="5"
            />
            <circle
              cx="45"
              cy="45"
              r="36"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <span
            className="absolute text-xl font-normal text-white/70"
            style={{ fontFamily: "var(--font-display-face)" }}
          >
            {score}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-white/25">
          {validation ? "AI-powered score" : "Complete validation"}
        </p>
      </CardContent>
    </Card>
  );
}
