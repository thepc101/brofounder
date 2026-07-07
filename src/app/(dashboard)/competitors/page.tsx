"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useStore } from "@/lib/store";
import { CompetitorCard } from "@/components/competitors/competitor-card";
import { ComparisonTable } from "@/components/competitors/comparison-table";

export default function CompetitorsPage() {
  const competitors = useStore((s) => s.competitors);

  return (
    <div>
      <DashboardHeader
        title="Competitors"
        description="Competitive analysis and market positioning."
      />
      <div className="mx-auto max-w-5xl space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {competitors.length > 0 ? (
            competitors.map((c, i) => (
              <CompetitorCard key={c.name} competitor={c} index={i} />
            ))
          ) : (
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-muted-foreground">No competitors analyzed yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Run research to see competitor analysis.</p>
            </div>
          )}
        </div>
        {competitors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ComparisonTable />
          </motion.div>
        )}
      </div>
    </div>
  );
}
