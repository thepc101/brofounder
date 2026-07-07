"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProjectCard } from "@/components/dashboard/project-card";
import { ProgressSection } from "@/components/dashboard/progress-section";
import { Recommendations } from "@/components/dashboard/recommendations";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { TasksToday } from "@/components/dashboard/tasks-today";
import { ValidationScore } from "@/components/dashboard/validation-score";
import { MarketOpportunity } from "@/components/dashboard/market-opportunity";
import { useStore } from "@/lib/store";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function DashboardPage() {
  const project = useStore((s) => s.project);

  return (
    <div className="flex h-full flex-col">
      <DashboardHeader
        title="Home"
        description="Your startup command center."
        actions={
          !project ? (
            <Link href="/onboarding">
              <Button
                size="sm"
                className="h-7 gap-1.5 rounded-lg bg-white/[0.08] text-[11px] hover:bg-white/[0.12]"
              >
                <Rocket size={12} />
                Get Started
              </Button>
            </Link>
          ) : undefined
        }
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex-1 space-y-3 overflow-y-auto p-4"
      >
        <motion.div variants={fadeIn} className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProjectCard />
          </div>
          <ProgressSection />
        </motion.div>

        <motion.div variants={fadeIn} className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            <Recommendations />
            <ActivityFeed />
          </div>
          <div className="space-y-3">
            <TasksToday />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ValidationScore />
          <MarketOpportunity />
        </motion.div>
      </motion.div>
    </div>
  );
}
