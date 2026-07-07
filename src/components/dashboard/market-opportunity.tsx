"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";

export function MarketOpportunity() {
  const research = useStore((s) => s.marketResearch);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Market Opportunity</CardTitle>
      </CardHeader>
      <CardContent>
        {research ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Target size={12} />
                  TAM
                </div>
                <p className="text-sm font-semibold truncate">{research.tam}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <TrendingUp size={12} />
                  SAM
                </div>
                <p className="text-sm font-semibold truncate">{research.sam}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <DollarSign size={12} />
                  SOM
                </div>
                <p className="text-sm font-semibold truncate">{research.som}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <BarChart3 size={12} />
                  Trends
                </div>
                <p className="text-sm font-semibold truncate">{research.trends.length}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <TrendingUp size={24} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No research yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
