"use client";

import { motion } from "framer-motion";
import type { CompetitorInfo } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompetitorCardProps {
  competitor: CompetitorInfo;
  index: number;
}

export function CompetitorCard({ competitor, index }: CompetitorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base">{competitor.name}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{competitor.description}</p>
            </div>
            {competitor.pricing && (
              <Badge variant="secondary" className="shrink-0">{competitor.pricing}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Strengths</p>
              <ul className="space-y-1">
                {competitor.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Weaknesses</p>
              <ul className="space-y-1">
                {competitor.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {w}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
