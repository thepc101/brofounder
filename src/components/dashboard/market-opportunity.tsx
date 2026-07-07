"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";

export function MarketOpportunity() {
  const research = useStore((s) => s.marketResearch);

  return (
    <Card className="border-white/[0.06] bg-white/[0.02]">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-[13px] font-medium text-white/60">Market Opportunity</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {research ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
              <div className="flex items-center gap-1 text-[10px] text-white/25">
                <Target size={10} />
                TAM
              </div>
              <p className="mt-1 truncate text-[13px] font-medium text-white/60">{research.tam}</p>
            </div>
            <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
              <div className="flex items-center gap-1 text-[10px] text-white/25">
                <TrendingUp size={10} />
                SAM
              </div>
              <p className="mt-1 truncate text-[13px] font-medium text-white/60">{research.sam}</p>
            </div>
            <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
              <div className="flex items-center gap-1 text-[10px] text-white/25">
                <DollarSign size={10} />
                SOM
              </div>
              <p className="mt-1 truncate text-[13px] font-medium text-white/60">{research.som}</p>
            </div>
            <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
              <div className="flex items-center gap-1 text-[10px] text-white/25">
                <BarChart3 size={10} />
                Trends
              </div>
              <p className="mt-1 truncate text-[13px] font-medium text-white/60">
                {research.trends.length} identified
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <TrendingUp size={20} className="text-white/10" />
            <p className="mt-2 text-[13px] text-white/20">No research yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
