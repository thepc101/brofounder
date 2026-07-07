"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ResearchForm } from "@/components/research/research-form";
import { ResearchResult } from "@/components/research/research-result";
import { useStore } from "@/lib/store";

export default function ResearchPage() {
  const marketResearch = useStore((s) => s.marketResearch);

  return (
    <div>
      <DashboardHeader
        title="Research"
        description="Deep market research and competitive analysis."
      />
      <div className="mx-auto max-w-4xl space-y-8 p-6">
        <ResearchForm />
        {marketResearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResearchResult />
          </motion.div>
        )}
      </div>
    </div>
  );
}
