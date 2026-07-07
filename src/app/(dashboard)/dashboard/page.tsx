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

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader
        title="Home"
        description="Your startup command center."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-6 p-6"
      >
        <motion.div variants={fadeIn} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProjectCard />
          </div>
          <ProgressSection />
        </motion.div>

        <motion.div variants={fadeIn} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Recommendations />
            <ActivityFeed />
          </div>
          <div className="space-y-6">
            <TasksToday />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ValidationScore />
          <MarketOpportunity />
        </motion.div>
      </motion.div>
    </div>
  );
}
