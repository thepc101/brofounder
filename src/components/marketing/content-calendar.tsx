"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ContentCalendar() {
  const marketingPlan = useStore((s) => s.marketingPlan);

  if (!marketingPlan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Content Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketingPlan.contentRoadmap.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">{item.topic}</p>
                <p className="text-xs text-muted-foreground">{item.channel} · {item.format}</p>
              </div>
              <Badge variant="secondary" className="text-xs">{item.date}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
