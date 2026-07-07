"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, RefreshCw, Loader2, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";
import { cn } from "@/lib/utils";

const defaultMilestones = [
  { name: "Idea Validation", description: "Validate your idea with AI scoring", duration: "Week 1-2", completed: false },
  { name: "Market Research", description: "Deep market and competitor analysis", duration: "Week 2-3", completed: false },
  { name: "Customer Personas", description: "Define your ideal customer profiles", duration: "Week 3-4", completed: false },
  { name: "MVP Planning", description: "Prioritize features and plan development", duration: "Week 4-5", completed: false },
  { name: "Marketing Strategy", description: "Build your go-to-market plan", duration: "Week 5-6", completed: false },
  { name: "Launch Prep", description: "Finalize everything and launch", duration: "Week 6-8", completed: false },
];

export default function RoadmapPage() {
  const [milestones, setMilestones] = useState(defaultMilestones);
  const project = useStore((s) => s.project);

  const toggleMilestone = (index: number) => {
    setMilestones((prev) =>
      prev.map((m, i) => (i === index ? { ...m, completed: !m.completed } : m))
    );
  };

  const completedCount = milestones.filter((m) => m.completed).length;

  return (
    <div>
      <DashboardHeader
        title="Roadmap"
        description="Your startup building roadmap with key milestones."
      />
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {milestones.length} milestones completed
            </p>
            <div className="mt-2 h-1.5 w-48 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-500"
                style={{ width: `${(completedCount / milestones.length) * 100}%` }}
              />
            </div>
          </div>
          <Badge variant="secondary">
            {project?.stage ? `${project.stage.replace("-", " ")}` : "Getting started"}
          </Badge>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-8 before:absolute before:left-[11px] before:top-8 before:h-[calc(100%+16px)] before:w-[1px] before:bg-border last:before:hidden"
            >
              <button
                onClick={() => toggleMilestone(i)}
                className="absolute left-0 top-1"
              >
                {milestone.completed ? (
                  <CheckCircle2 size={24} className="text-foreground" />
                ) : (
                  <Circle size={24} className="text-muted-foreground/40" />
                )}
              </button>
              <Card className={cn("transition-all", milestone.completed && "opacity-60")}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{milestone.name}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {milestone.duration}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
