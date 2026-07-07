"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function LaunchChecklist() {
  const marketingPlan = useStore((s) => s.marketingPlan);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  if (!marketingPlan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Product Hunt Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketingPlan.productHuntChecklist.map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={checked[i] || false}
                onCheckedChange={(v) => setChecked((prev) => ({ ...prev, [i]: !!v }))}
                className="mt-0.5"
              />
              <span className={`text-sm ${checked[i] ? "text-muted-foreground line-through" : ""}`}>
                {item}
              </span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
