"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";
import { SaaSToolWrapper } from "@/components/tools/saas-tool-wrapper";
import { useStore } from "@/lib/store";
import { generateId } from "@/lib/utils";

interface MarketingSection {
  id: string;
  title: string;
  content: string;
  type: string;
  editable?: boolean;
}

export default function MarketingPage() {
  const [sections, setSections] = useState<MarketingSection[]>([]);
  const [metrics, setMetrics] = useState<{ label: string; value: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const project = useStore((s) => s.project);
  const onboardingData = useStore((s) => s.onboardingData);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          projectName: project?.name,
          industry: onboardingData.industry,
        }),
      });
      const data = await response.json();
      if (data.sections) setSections(data.sections);
      if (data.metrics) setMetrics(data.metrics);
    } catch {
      setSections([
        {
          id: generateId(),
          title: "Error",
          content: "Failed to generate marketing plan. Please try again.",
          type: "error",
        },
      ]);
    }
    setIsGenerating(false);
  };

  const handleSectionEdit = (id: string, content: string) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  return (
    <SaaSToolWrapper
      title="Marketing Engine"
      description="AI-powered marketing plans, content calendars, and launch strategies"
      icon={Megaphone}
      placeholder="Describe your marketing goals... e.g., 'Create a launch strategy for my AI SaaS targeting product managers'"
      sections={sections}
      isGenerating={isGenerating}
      onGenerate={handleGenerate}
      onSectionEdit={handleSectionEdit}
      metrics={metrics}
    />
  );
}
