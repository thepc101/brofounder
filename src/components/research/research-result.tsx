"use client";

import { useStore } from "@/lib/store";
import { TrendingUp, Target, DollarSign, AlertCircle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ResearchResult() {
  const { marketResearch, swot, porterFiveForces } = useStore();

  if (!marketResearch) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* TAM/SAM/SOM */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Market Sizing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Target size={12} /> TAM
              </div>
              <p className="text-2xl font-bold">{marketResearch.tam}</p>
              <p className="text-xs text-muted-foreground">Total Addressable Market</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <TrendingUp size={12} /> SAM
              </div>
              <p className="text-2xl font-bold">{marketResearch.sam}</p>
              <p className="text-xs text-muted-foreground">Serviceable Addressable Market</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <DollarSign size={12} /> SOM
              </div>
              <p className="text-2xl font-bold">{marketResearch.som}</p>
              <p className="text-xs text-muted-foreground">Serviceable Obtainable Market</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trends & Pain Points */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp size={14} /> Key Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {marketResearch.trends.map((trend, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  {trend}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <AlertCircle size={14} /> Pain Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {marketResearch.painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Search Intent & Buying Behavior */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Search Intent & Buying Behavior</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Search Intent</p>
            <p className="text-sm">{marketResearch.searchIntent}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Buying Behavior</p>
            <p className="text-sm">{marketResearch.buyingBehavior}</p>
          </div>
        </CardContent>
      </Card>

      {/* SWOT */}
      {swot && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SWOT Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-3">
                <Badge variant="secondary" className="mb-2">Strengths</Badge>
                <ul className="space-y-1">
                  {swot.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border p-3">
                <Badge variant="secondary" className="mb-2">Weaknesses</Badge>
                <ul className="space-y-1">
                  {swot.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {w}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border p-3">
                <Badge variant="secondary" className="mb-2">Opportunities</Badge>
                <ul className="space-y-1">
                  {swot.opportunities.map((o, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {o}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border p-3">
                <Badge variant="secondary" className="mb-2">Threats</Badge>
                <ul className="space-y-1">
                  {swot.threats.map((t, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Porter's Five Forces */}
      {porterFiveForces && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Porter's Five Forces</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(porterFiveForces).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
