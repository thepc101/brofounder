"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useStore } from "@/lib/store";
import { RoadmapTimeline } from "@/components/mvp/roadmap-timeline";
import { MoscowPriorities } from "@/components/mvp/moscow-priorities";
import { DevelopmentPhases } from "@/components/mvp/development-phases";
import { Button } from "@/components/ui/button";
import { Rocket, RefreshCw, Loader2, Lightbulb } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";

export default function MVPPage() {
  const mvpPlan = useStore((s) => s.mvpPlan);
  const setMvpPlan = useStore((s) => s.setMvpPlan);
  const addActivity = useStore((s) => s.addActivity);
  const [loading, setLoading] = useState(false);

  const generateMVP = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2500));

    setMvpPlan({
      roadmap: [
        { phase: "Foundation", tasks: ["Set up project structure", "Authentication system", "Database schema", "CI/CD pipeline"], duration: "2 weeks" },
        { phase: "Core Features", tasks: ["User onboarding flow", "Workspace CRUD", "AI integration", "Real-time collaboration"], duration: "4 weeks" },
        { phase: "MVP Launch", tasks: ["Payment integration", "Analytics setup", "Beta testing", "Launch marketing"], duration: "3 weeks" },
      ],
      priorities: [
        { category: "must-have", features: ["Authentication", "Workspace creation", "AI chat", "Basic research tools", "Export functionality"] },
        { category: "should-have", features: ["Template library", "Collaboration", "Advanced search", "API access"] },
        { category: "could-have", features: ["Mobile app", "Dark mode toggle", "Custom branding", "Analytics dashboard"] },
        { category: "wont-have", features: ["Native desktop apps", "Enterprise SSO", "White-labeling", "AI training custom"] },
      ],
      phases: [
        { name: "Alpha", duration: "6 weeks", tasks: ["Core platform", "Basic AI features", "User management"], deliverables: ["Functional web app", "AI chat integration", "User auth"] },
        { name: "Beta", duration: "4 weeks", tasks: ["Research engine", "Template system", "Performance optimization"], deliverables: ["Full feature set", "Documentation", "Test suite"] },
        { name: "Launch", duration: "2 weeks", tasks: ["Final QA", "Marketing site", "Launch prep"], deliverables: ["Production app", "Landing page", "Launch plan"] },
      ],
      technicalSuggestions: ["Use Next.js 14 with App Router", "Implement streaming for AI responses", "Use edge functions for low latency", "Implement caching layer for API calls"],
      timeline: "12 weeks to MVP launch",
    });

    addActivity({
      id: generateId(),
      type: "mvp",
      title: "MVP plan generated",
      description: "12-week plan with prioritization and phases",
      timestamp: new Date().toISOString(),
    });
    toast.success("MVP plan generated");
    setLoading(false);
  };

  return (
    <div>
      <DashboardHeader title="MVP" description="Plan and prioritize your minimum viable product." />
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        {!mvpPlan ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Rocket size={32} className="text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">No MVP plan yet.</p>
            <Button onClick={generateMVP} disabled={loading} className="gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />}
              Generate MVP Plan
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Estimated timeline: <span className="font-medium text-foreground">{mvpPlan.timeline}</span>
              </p>
              <Button onClick={generateMVP} variant="outline" size="sm" disabled={loading} className="gap-2">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                Regenerate
              </Button>
            </div>

            {mvpPlan.technicalSuggestions.length > 0 && (
              <div className="rounded-lg border border-border bg-accent/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={14} />
                  <span className="text-sm font-medium">Technical Suggestions</span>
                </div>
                <ul className="space-y-1">
                  {mvpPlan.technicalSuggestions.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                  ))}
                </ul>
              </div>
            )}

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <RoadmapTimeline />
              <MoscowPriorities />
              <DevelopmentPhases />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
