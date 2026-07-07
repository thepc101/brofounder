"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useStore } from "@/lib/store";
import { PositioningCard } from "@/components/marketing/positioning-card";
import { ContentCalendar } from "@/components/marketing/content-calendar";
import { LaunchChecklist } from "@/components/marketing/launch-checklist";
import { Button } from "@/components/ui/button";
import { Megaphone, RefreshCw, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";

export default function MarketingPage() {
  const marketingPlan = useStore((s) => s.marketingPlan);
  const setMarketingPlan = useStore((s) => s.setMarketingPlan);
  const addActivity = useStore((s) => s.addActivity);
  const [loading, setLoading] = useState(false);

  const generateMarketing = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2500));

    setMarketingPlan({
      positioning: "The only AI co-founder that helps you build a real business, not just generate text. We combine structured strategy with AI intelligence to take you from idea to launch.",
      tagline: "Your AI Co-Founder.",
      landingPageCopy: "Go from idea → validated business → MVP → launch. Your AI co-founder that helps you build, not just chat.",
      seoStrategy: "Target long-tail keywords around startup building, MVP planning, and idea validation. Focus on 'AI for founders' and 'startup tools' keywords.",
      launchStrategy: "Phase 1: Product Hunt launch with founder community. Phase 2: Content marketing on startups and building. Phase 3: Community-driven growth through founder forums.",
      socialPosts: [
        "Just launched brofounder — your free AI co-founder. From idea to launch in one place.",
        "Stop overthinking. Start building. brofounder helps you validate, plan, and launch faster.",
        "Your startup idea deserves more than a chatbot. Get an actual AI co-founder.",
      ],
      emailCampaign: {
        subject: "Your AI Co-Founder is ready",
        preview: "Start building your startup today",
        sequence: [
          { day: 1, subject: "Meet your AI co-founder", body: "Welcome to brofounder. Here's how to get started..." },
          { day: 3, subject: "Validate your idea", body: "Let's make sure you're building something people want..." },
          { day: 7, subject: "Plan your MVP", body: "Time to prioritize and build..." },
        ],
      },
      productHuntChecklist: [
        "Create eye-catching graphics",
        "Write compelling tagline",
        "Prepare demo video",
        "Schedule launch day",
        "Notify your network",
        "Prepare for comments",
        "Follow up with supporters",
      ],
      redditStrategy: "Post in r/startups, r/Entrepreneur, r/SaaS with value-first content. Share founder stories and lessons learned. Engage authentically without hard selling.",
      contentRoadmap: [
        { topic: "How to validate your startup idea in 24 hours", format: "Blog post", channel: "Blog", date: "Week 1" },
        { topic: "The complete guide to MVP planning", format: "Guide", channel: "Blog + Email", date: "Week 2" },
        { topic: "From idea to launch: A founder's journey", format: "Video", channel: "YouTube", date: "Week 3" },
        { topic: "10 questions to ask before building your MVP", format: "Twitter Thread", channel: "Twitter/X", date: "Week 4" },
      ],
    });

    addActivity({
      id: generateId(),
      type: "marketing",
      title: "Marketing plan generated",
      description: "Complete GTM strategy with content calendar",
      timestamp: new Date().toISOString(),
    });
    toast.success("Marketing plan generated");
    setLoading(false);
  };

  return (
    <div>
      <DashboardHeader title="Marketing" description="Go-to-market strategy and launch planning." />
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        {!marketingPlan ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Megaphone size={32} className="text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">No marketing plan yet.</p>
            <Button onClick={generateMarketing} disabled={loading} className="gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Megaphone size={16} />}
              Generate Marketing Plan
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-end">
              <Button onClick={generateMarketing} variant="outline" size="sm" disabled={loading} className="gap-2">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                Regenerate
              </Button>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <PositioningCard />
              <ContentCalendar />
              <LaunchChecklist />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
