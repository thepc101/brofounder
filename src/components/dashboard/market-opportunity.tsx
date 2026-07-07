"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";

export function MarketOpportunity() {
  const research = useStore((s) => s.marketResearch);

  return (
    <Card className="border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-[13px] font-medium text-white/55">Market Opportunity</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {research ? (
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Target, label: "TAM", value: research.tam },
              { icon: TrendingUp, label: "SAM", value: research.sam },
              { icon: DollarSign, label: "SOM", value: research.som },
              { icon: BarChart3, label: "Trends", value: `${research.trends.length} identified` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5"
              >
                <div className="flex items-center gap-1 text-[10px] text-white/20">
                  <item.icon size={10} />
                  {item.label}
                </div>
                <p className="mt-1 truncate text-[13px] font-medium text-white/55">{item.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <TrendingUp size={20} className="text-white/8" />
            <p className="mt-2 text-[13px] text-white/18">No research yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
