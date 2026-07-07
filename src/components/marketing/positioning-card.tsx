"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PositioningCard() {
  const marketingPlan = useStore((s) => s.marketingPlan);

  if (!marketingPlan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Positioning & Tagline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Positioning</p>
          <p className="text-sm">{marketingPlan.positioning}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Tagline</p>
          <p className="text-lg font-semibold">{marketingPlan.tagline}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Landing Page Copy</p>
          <p className="text-sm text-muted-foreground">{marketingPlan.landingPageCopy}</p>
        </div>
      </CardContent>
    </Card>
  );
}
