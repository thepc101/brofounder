"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useStore } from "@/lib/store";
import { PersonaCard } from "@/components/audience/persona-card";
import { Button } from "@/components/ui/button";
import { Users, RefreshCw, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";

export default function AudiencePage() {
  const personas = useStore((s) => s.personas);
  const setPersonas = useStore((s) => s.setPersonas);
  const addActivity = useStore((s) => s.addActivity);
  const project = useStore((s) => s.project);
  const [loading, setLoading] = useState(false);

  const generatePersonas = async () => {
    setLoading(true);

    // Simulate AI generation
    await new Promise((r) => setTimeout(r, 2000));

    const newPersonas = [
      {
        name: "Sarah Chen",
        age: "32",
        role: "Engineering Manager",
        goals: ["Improve team productivity", "Reduce communication overhead", "Maintain async culture"],
        painPoints: ["Too many tools to manage", "Time zone coordination", "Context switching"],
        objections: ["Already invested in existing tools", "Team resistance to change", "Budget constraints"],
        buyingTriggers: ["Team scaling challenges", "Missed deadlines", "Employee feedback"],
        preferredPlatforms: ["Slack", "Linear", "GitHub", "Notion"],
        dailyWorkflow: "Starts with async check-ins, reviews PRs, attends 2-3 sync meetings, does deep work in afternoon blocks.",
        messagingStrategy: "Focus on time saved and reduced meetings. Emphasize async-first culture benefits.",
      },
      {
        name: "Marcus Johnson",
        age: "28",
        role: "Product Designer",
        goals: ["Streamline design feedback", "Better collaboration with engineers", "Portfolio growth"],
        painPoints: ["Design feedback lost in chat", "Version control confusion", "Context switching between tools"],
        objections: ["Design tools are complex", "Afraid of losing creative freedom"],
        buyingTriggers: ["Design review bottlenecks", "Team growth", "New project kickoff"],
        preferredPlatforms: ["Figma", "Slack", "Notion", "Linear"],
        dailyWorkflow: "Morning review of feedback, design sprints in afternoon, async collaboration through shared docs.",
        messagingStrategy: "Highlight design collaboration features and reduced feedback cycles.",
      },
    ];

    setPersonas(newPersonas);
    addActivity({
      id: generateId(),
      type: "audience",
      title: "Customer personas generated",
      description: "Generated 2 customer personas",
      timestamp: new Date().toISOString(),
    });
    toast.success("Personas generated");
    setLoading(false);
  };

  return (
    <div>
      <DashboardHeader
        title="Audience"
        description="Customer personas and target audience analysis."
      />
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        {personas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users size={32} className="text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">No customer personas yet.</p>
            <Button onClick={generatePersonas} disabled={loading} className="gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              Generate Personas
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-end">
              <Button onClick={generatePersonas} variant="outline" size="sm" disabled={loading} className="gap-2">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                Regenerate
              </Button>
            </div>
            <div className="space-y-4">
              {personas.map((p, i) => (
                <PersonaCard key={p.name} persona={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
