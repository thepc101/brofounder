"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
}

export function ScoreCard({ label, score, maxScore = 100, color }: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-5">
        <div className="relative flex items-center justify-center mb-2">
          <svg width="70" height="70" className="-rotate-90">
            <circle
              cx="35" cy="35" r="28"
              fill="none"
              stroke="var(--border)"
              strokeWidth="4"
            />
            <circle
              cx="35" cy="35" r="28"
              fill="none"
              stroke={color || "var(--foreground)"}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-lg font-bold">{score}</span>
        </div>
        <p className="text-xs text-center text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
